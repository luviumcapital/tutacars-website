/**
 * True Cost of Ownership & Price-Per-Use engine.
 *
 * Pure, framework-free calculation layer. No React, no fetch, no I/O —
 * everything here is deterministic given its inputs so it can be unit
 * tested directly and reused server-side (e.g. in a listing API route)
 * or client-side.
 */

export type DataQuality = "verified" | "estimated";

export interface CostField {
  value: number;
  quality: DataQuality;
}

export interface ListingCostInput {
  price_new: number;
  price_asking: number;
  /** Decimal years since first registration, e.g. 2.5 */
  age_years: number;
  odometer_km: number;
  maintenance_total?: number;
  tyres_total?: number;
  insurance_total?: number;
  other_costs?: number;
  /** Lookup default, e.g. 250000 for petrol/diesel */
  expected_lifespan_km: number;
  /** Corpus stat from the segment-benchmark job; undefined if not yet available */
  segment_avg_cost_per_km?: number;
  /** True if a full service history (not just current owner's costs) was uploaded */
  full_service_history?: boolean;
}

export interface SegmentDefaults {
  /** e.g. 0.03 => maintenance ~3% of price_new per year, used when maintenance_total is missing */
  maintenance_pct_of_new_per_year: number;
  /** e.g. 0.015 => tyres ~1.5% of price_new per year */
  tyres_pct_of_new_per_year: number;
  /** Flat annual estimate used when insurance_total is missing */
  insurance_estimate_per_year: number;
  /** Flat annual estimate for licensing/other running costs */
  other_costs_per_year: number;
}

export const DEFAULT_SEGMENT_DEFAULTS: SegmentDefaults = {
  maintenance_pct_of_new_per_year: 0.03,
  tyres_pct_of_new_per_year: 0.015,
  insurance_estimate_per_year: 14000,
  other_costs_per_year: 3000,
};

export type ValueBadge =
  | "Blue Chip Buy"
  | "Fair Market"
  | "Pay Attention"
  | "Money Pit Risk"
  | "Insufficient Data";

export interface CostOfOwnershipResult {
  // historical
  depreciation_total: number;
  tco: number;
  cost_per_km_historical: number | null;
  cost_per_year_historical: number | null;
  maintenance_per_year: number;
  maintenance_per_km: number | null;
  maintenance_quality: DataQuality;
  insurance_quality: DataQuality;
  history_scope: "current_owner" | "full_history";

  // forward-looking
  remaining_km: number;
  remaining_years: number | null;
  beyond_expected_lifespan: boolean;
  forward_price_per_km: number | null;
  forward_price_per_year: number | null;
  expected_future_maintenance_per_km: number;
  forward_total_cost_per_km: number | null;
  effective_monthly_equivalent: number | null;

  // composite
  value_score: number | null;
  badge: ValueBadge;
  insufficient_data: boolean;
}

function resolveField(
  reported: number | undefined,
  estimateIfMissing: number
): CostField {
  if (reported !== undefined && reported !== null && !Number.isNaN(reported)) {
    return { value: reported, quality: "verified" };
  }
  return { value: estimateIfMissing, quality: "estimated" };
}

/** Formula 1: depreciation_total = price_new - price_asking */
export function depreciationTotal(price_new: number, price_asking: number): number {
  return price_new - price_asking;
}

/**
 * Formula 6: age-based multiplier on this car's own maintenance trend —
 * maintenance cost rises with age, so weight forward projection accordingly.
 * Tune thresholds against real corpus data over time.
 */
export function ageAdjustmentFactor(age_years: number): number {
  if (age_years < 5) return 1.0;
  if (age_years <= 10) return 1.3;
  return 1.6;
}

/**
 * Formula 10 badge tiers. value_score is clamped to [5, 99] upstream;
 * thresholds below are tunable against real corpus data.
 */
export function badgeForScore(value_score: number | null): ValueBadge {
  if (value_score === null) return "Insufficient Data";
  if (value_score >= 80) return "Blue Chip Buy";
  if (value_score >= 55) return "Fair Market";
  if (value_score >= 35) return "Pay Attention";
  return "Money Pit Risk";
}

/**
 * Computes the full historical + forward-looking cost story for a listing.
 *
 * Missing-data rule: never blocks on missing maintenance/insurance/tyres —
 * falls back to segment-average estimates and flags the metric as
 * "estimated" vs "verified".
 *
 * Edge cases handled explicitly (see module docs / spec):
 *  - odometer_km <= 0 or missing -> historical/forward per-km figures are
 *    null and insufficient_data is set for those metrics.
 *  - age_years < 1 -> per-year figures are computed on the decimal year
 *    value directly (callers should pass e.g. 0.5 for 6 months), so no
 *    special-case branch is needed as long as age_years is never exactly 0.
 *  - remaining_km <= 0 (car past expected lifespan) -> beyond_expected_lifespan
 *    is flagged and a floor of 5% of expected_lifespan_km is used as the
 *    forward-calc denominator instead of dividing by zero / negative.
 *  - no segment benchmark yet -> value_score/badge fall back to
 *    "Insufficient Data" rather than a fabricated score.
 */
export function computeCostOfOwnership(
  input: ListingCostInput,
  defaults: SegmentDefaults = DEFAULT_SEGMENT_DEFAULTS
): CostOfOwnershipResult {
  const ageYears = Math.max(input.age_years, 1 / 365); // avoid div-by-zero for same-day listings

  const maintenanceField = resolveField(
    input.maintenance_total,
    input.price_new * defaults.maintenance_pct_of_new_per_year * ageYears
  );
  const tyresField = resolveField(
    input.tyres_total,
    input.price_new * defaults.tyres_pct_of_new_per_year * ageYears
  );
  const insuranceField = resolveField(
    input.insurance_total,
    defaults.insurance_estimate_per_year * ageYears
  );
  const otherField = resolveField(
    input.other_costs,
    defaults.other_costs_per_year * ageYears
  );

  const depreciation_total = depreciationTotal(input.price_new, input.price_asking);
  const tco =
    depreciation_total + maintenanceField.value + tyresField.value + insuranceField.value + otherField.value;

  const hasOdometer = input.odometer_km > 0;
  const cost_per_km_historical = hasOdometer ? tco / input.odometer_km : null;
  const cost_per_year_historical = tco / ageYears;

  const maintenanceAndTyres = maintenanceField.value + tyresField.value;
  const maintenance_per_year = maintenanceAndTyres / ageYears;
  const maintenance_per_km = hasOdometer ? maintenanceAndTyres / input.odometer_km : null;
  // "estimated" wins if either underlying figure was estimated
  const maintenance_quality: DataQuality =
    maintenanceField.quality === "estimated" || tyresField.quality === "estimated" ? "estimated" : "verified";

  // Remaining useful life, derived from this car's own historical km/year rate
  const kmPerYear = hasOdometer ? input.odometer_km / ageYears : 0;
  const rawRemainingKm = input.expected_lifespan_km - input.odometer_km;
  const beyond_expected_lifespan = rawRemainingKm <= 0;
  const remaining_km = beyond_expected_lifespan
    ? Math.round(input.expected_lifespan_km * 0.05) // floor, avoids div-by-zero while flagging the condition
    : rawRemainingKm;
  const remaining_years = kmPerYear > 0 ? remaining_km / kmPerYear : null;

  // odometer_km == 0 or missing blocks the forward calc entirely, per spec, since
  // remaining life can't be derived without a historical km/year rate.
  const forward_price_per_km = hasOdometer && remaining_km > 0 ? input.price_asking / remaining_km : null;
  const forward_price_per_year =
    hasOdometer && remaining_years !== null && remaining_years > 0 ? input.price_asking / remaining_years : null;

  const expected_future_maintenance_per_km =
    (maintenance_per_km ?? 0) * ageAdjustmentFactor(input.age_years);

  const forward_total_cost_per_km =
    forward_price_per_km !== null ? forward_price_per_km + expected_future_maintenance_per_km : null;

  const effective_monthly_equivalent =
    hasOdometer && remaining_years !== null && remaining_years > 0
      ? input.price_asking / (remaining_years * 12)
      : null;

  let value_score: number | null = null;
  if (input.segment_avg_cost_per_km !== undefined && forward_total_cost_per_km) {
    const relative_value = input.segment_avg_cost_per_km / forward_total_cost_per_km;
    value_score = Math.min(99, Math.max(5, Math.round(relative_value * 50)));
  }

  return {
    depreciation_total,
    tco,
    cost_per_km_historical,
    cost_per_year_historical,
    maintenance_per_year,
    maintenance_per_km,
    maintenance_quality,
    insurance_quality: insuranceField.quality,
    history_scope: input.full_service_history ? "full_history" : "current_owner",

    remaining_km,
    remaining_years,
    beyond_expected_lifespan,
    forward_price_per_km,
    forward_price_per_year,
    expected_future_maintenance_per_km,
    forward_total_cost_per_km,
    effective_monthly_equivalent,

    value_score,
    badge: badgeForScore(value_score),
    insufficient_data: !hasOdometer,
  };
}

/** Standard amortized monthly installment, for side-by-side comparison with effective_monthly_equivalent. */
export function amortizedMonthlyInstallment(
  price_asking: number,
  annualRatePct: number,
  termMonths: number
): number {
  const r = annualRatePct / 100 / 12;
  if (r === 0) return price_asking / termMonths;
  return (price_asking * r) / (1 - Math.pow(1 + r, -termMonths));
}
