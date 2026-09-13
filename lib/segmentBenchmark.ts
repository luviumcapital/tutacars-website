/**
 * Segment benchmark corpus stats.
 *
 * segment_avg_cost_per_km is NOT a per-listing input — it's a stat computed
 * across all live listings in a segment/age-band. In production this runs
 * as a periodic batch job (e.g. a nightly cron or queue worker) reading the
 * listings table and writing the resulting lookup to a cache/table that the
 * pricing engine reads at request time. The functions here are the pure
 * compute step of that job, kept separate from scheduling/storage so they
 * can be unit tested without a database.
 */

export interface BenchmarkListingInput {
  make: string;
  model: string;
  /** Broad category, e.g. "Compact SUV", "Double-Cab Bakkie" */
  segment: string;
  age_years: number;
  /** Per-listing cost-per-km used to build the average (typically forward_total_cost_per_km) */
  cost_per_km: number;
}

export type AgeBand = "0-2" | "3-5" | "6-10" | "10+";

export function ageBand(age_years: number): AgeBand {
  if (age_years <= 2) return "0-2";
  if (age_years <= 5) return "3-5";
  if (age_years <= 10) return "6-10";
  return "10+";
}

interface Accumulator {
  sum: number;
  count: number;
}

/** Three granularities, from most to least specific, used for benchmark fallback. */
export interface SegmentBenchmarkIndex {
  byMakeModelAgeBand: Map<string, number>;
  bySegmentAgeBand: Map<string, number>;
  bySegment: Map<string, number>;
}

function accumulate(map: Map<string, Accumulator>, key: string, value: number) {
  const existing = map.get(key);
  if (existing) {
    existing.sum += value;
    existing.count += 1;
  } else {
    map.set(key, { sum: value, count: 1 });
  }
}

function averages(map: Map<string, Accumulator>): Map<string, number> {
  const out = new Map<string, number>();
  map.forEach(({ sum, count }, key) => out.set(key, sum / count));
  return out;
}

const makeModelAgeBandKey = (make: string, model: string, band: AgeBand) =>
  `${make.toLowerCase()}|${model.toLowerCase()}|${band}`;
const segmentAgeBandKey = (segment: string, band: AgeBand) => `${segment.toLowerCase()}|${band}`;
const segmentKey = (segment: string) => segment.toLowerCase();

/** Pure compute step: build the three-tier lookup from a batch of live listings. */
export function buildSegmentBenchmarks(listings: BenchmarkListingInput[]): SegmentBenchmarkIndex {
  const byMakeModelAgeBand = new Map<string, Accumulator>();
  const bySegmentAgeBand = new Map<string, Accumulator>();
  const bySegment = new Map<string, Accumulator>();

  for (const l of listings) {
    const band = ageBand(l.age_years);
    accumulate(byMakeModelAgeBand, makeModelAgeBandKey(l.make, l.model, band), l.cost_per_km);
    accumulate(bySegmentAgeBand, segmentAgeBandKey(l.segment, band), l.cost_per_km);
    accumulate(bySegment, segmentKey(l.segment), l.cost_per_km);
  }

  return {
    byMakeModelAgeBand: averages(byMakeModelAgeBand),
    bySegmentAgeBand: averages(bySegmentAgeBand),
    bySegment: averages(bySegment),
  };
}

export interface BenchmarkLookupCriteria {
  make: string;
  model: string;
  segment: string;
  age_years: number;
}

/**
 * Resolves segment_avg_cost_per_km for one listing, falling back to a
 * broader category when no benchmark exists yet for the exact
 * make/model/age-band (e.g. a rare model) — "compact SUV" instead of
 * "2019 XYZ 1.6", then the whole segment if needed.
 */
export function lookupSegmentAvgCostPerKm(
  index: SegmentBenchmarkIndex,
  criteria: BenchmarkLookupCriteria
): number | undefined {
  const band = ageBand(criteria.age_years);

  const exact = index.byMakeModelAgeBand.get(makeModelAgeBandKey(criteria.make, criteria.model, band));
  if (exact !== undefined) return exact;

  const bySegAndBand = index.bySegmentAgeBand.get(segmentAgeBandKey(criteria.segment, band));
  if (bySegAndBand !== undefined) return bySegAndBand;

  return index.bySegment.get(segmentKey(criteria.segment));
}
