import { describe, expect, it } from "vitest";
import {
  ageAdjustmentFactor,
  amortizedMonthlyInstallment,
  badgeForScore,
  computeCostOfOwnership,
  depreciationTotal,
  type ListingCostInput,
} from "../pricingEngine";

const baseInput: ListingCostInput = {
  price_new: 600000,
  price_asking: 400000,
  age_years: 3,
  odometer_km: 60000,
  maintenance_total: 18000,
  tyres_total: 6000,
  insurance_total: 42000,
  other_costs: 9000,
  expected_lifespan_km: 250000,
  segment_avg_cost_per_km: 3.0,
};

describe("depreciationTotal", () => {
  it("subtracts asking price from new price", () => {
    expect(depreciationTotal(600000, 400000)).toBe(200000);
  });
});

describe("ageAdjustmentFactor", () => {
  it("returns 1.0 under 5 years", () => {
    expect(ageAdjustmentFactor(4.9)).toBe(1.0);
  });
  it("returns 1.3 between 5 and 10 years", () => {
    expect(ageAdjustmentFactor(5)).toBe(1.3);
    expect(ageAdjustmentFactor(10)).toBe(1.3);
  });
  it("returns 1.6 beyond 10 years", () => {
    expect(ageAdjustmentFactor(10.1)).toBe(1.6);
  });
});

describe("badgeForScore", () => {
  it("maps score ranges to tiers", () => {
    expect(badgeForScore(null)).toBe("Insufficient Data");
    expect(badgeForScore(85)).toBe("Blue Chip Buy");
    expect(badgeForScore(60)).toBe("Fair Market");
    expect(badgeForScore(40)).toBe("Pay Attention");
    expect(badgeForScore(10)).toBe("Money Pit Risk");
  });
});

describe("computeCostOfOwnership - happy path", () => {
  const result = computeCostOfOwnership(baseInput);

  it("computes TCO as depreciation + all running costs", () => {
    expect(result.depreciation_total).toBe(200000);
    expect(result.tco).toBe(200000 + 18000 + 6000 + 42000 + 9000);
  });

  it("computes historical cost per km and per year", () => {
    expect(result.cost_per_km_historical).toBeCloseTo(result.tco / 60000, 6);
    expect(result.cost_per_year_historical).toBeCloseTo(result.tco / 3, 6);
  });

  it("flags all fields as verified when fully reported", () => {
    expect(result.maintenance_quality).toBe("verified");
    expect(result.insurance_quality).toBe("verified");
  });

  it("computes remaining life and forward price per km", () => {
    expect(result.remaining_km).toBe(190000);
    expect(result.forward_price_per_km).toBeCloseTo(400000 / 190000, 6);
  });

  it("produces a value score and badge when a segment benchmark exists", () => {
    expect(result.value_score).not.toBeNull();
    expect(result.badge).not.toBe("Insufficient Data");
  });

  it("defaults to current_owner history scope", () => {
    expect(result.history_scope).toBe("current_owner");
  });
});

describe("computeCostOfOwnership - missing-data fallback", () => {
  it("falls back to segment estimates and flags them as estimated", () => {
    const input: ListingCostInput = {
      price_new: 600000,
      price_asking: 400000,
      age_years: 3,
      odometer_km: 60000,
      expected_lifespan_km: 250000,
    };
    const result = computeCostOfOwnership(input);
    expect(result.maintenance_quality).toBe("estimated");
    expect(result.insurance_quality).toBe("estimated");
    expect(result.maintenance_per_year).toBeGreaterThan(0);
    expect(result.tco).toBeGreaterThan(result.depreciation_total);
  });

  it("never blocks the calculation on missing fields", () => {
    const input: ListingCostInput = {
      price_new: 300000,
      price_asking: 250000,
      age_years: 1,
      odometer_km: 15000,
      expected_lifespan_km: 250000,
    };
    expect(() => computeCostOfOwnership(input)).not.toThrow();
  });
});

describe("computeCostOfOwnership - edge cases", () => {
  it("returns null per-km figures and flags insufficient_data when odometer is 0", () => {
    const input: ListingCostInput = {
      price_new: 300000,
      price_asking: 280000,
      age_years: 0.1,
      odometer_km: 0,
      expected_lifespan_km: 250000,
    };
    const result = computeCostOfOwnership(input);
    expect(result.cost_per_km_historical).toBeNull();
    expect(result.forward_price_per_km).toBeNull();
    expect(result.insufficient_data).toBe(true);
  });

  it("handles sub-1-year age without dividing by zero", () => {
    const input: ListingCostInput = {
      price_new: 300000,
      price_asking: 290000,
      age_years: 0.25,
      odometer_km: 5000,
      expected_lifespan_km: 250000,
    };
    const result = computeCostOfOwnership(input);
    expect(Number.isFinite(result.cost_per_year_historical)).toBe(true);
    expect(result.cost_per_year_historical).toBeGreaterThan(0);
  });

  it("flags beyond_expected_lifespan instead of producing negative/nonsensical numbers", () => {
    const input: ListingCostInput = {
      price_new: 300000,
      price_asking: 60000,
      age_years: 15,
      odometer_km: 280000,
      expected_lifespan_km: 250000,
    };
    const result = computeCostOfOwnership(input);
    expect(result.beyond_expected_lifespan).toBe(true);
    expect(result.remaining_km).toBeGreaterThan(0); // floored, not negative
    expect(result.forward_price_per_km).not.toBeNull();
    expect(Number.isFinite(result.forward_price_per_km as number)).toBe(true);
  });

  it("returns Insufficient Data badge when no segment benchmark is available", () => {
    const input: ListingCostInput = {
      price_new: 300000,
      price_asking: 250000,
      age_years: 2,
      odometer_km: 30000,
      expected_lifespan_km: 250000,
      // no segment_avg_cost_per_km
    };
    const result = computeCostOfOwnership(input);
    expect(result.value_score).toBeNull();
    expect(result.badge).toBe("Insufficient Data");
  });

  it("marks full_service_history scope when provided", () => {
    const result = computeCostOfOwnership({ ...baseInput, full_service_history: true });
    expect(result.history_scope).toBe("full_history");
  });
});

describe("amortizedMonthlyInstallment", () => {
  it("computes a standard amortized payment", () => {
    const payment = amortizedMonthlyInstallment(400000, 12, 72);
    expect(payment).toBeGreaterThan(400000 / 72); // interest makes it pricier than flat division
    expect(payment).toBeCloseTo(7820.08, 1);
  });

  it("falls back to flat division at 0% interest", () => {
    expect(amortizedMonthlyInstallment(120000, 0, 12)).toBeCloseTo(10000, 6);
  });
});
