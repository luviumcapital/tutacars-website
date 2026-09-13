import { describe, expect, it } from "vitest";
import { ageBand, buildSegmentBenchmarks, lookupSegmentAvgCostPerKm, type BenchmarkListingInput } from "../segmentBenchmark";

const listings: BenchmarkListingInput[] = [
  { make: "Toyota", model: "Hilux", segment: "Double-Cab Bakkie", age_years: 3, cost_per_km: 2.0 },
  { make: "Toyota", model: "Hilux", segment: "Double-Cab Bakkie", age_years: 4, cost_per_km: 2.4 },
  { make: "Ford", model: "Ranger", segment: "Double-Cab Bakkie", age_years: 3, cost_per_km: 2.8 },
  { make: "VW", model: "Tiguan", segment: "Compact SUV", age_years: 2, cost_per_km: 3.5 },
];

describe("ageBand", () => {
  it("buckets ages correctly", () => {
    expect(ageBand(0)).toBe("0-2");
    expect(ageBand(2)).toBe("0-2");
    expect(ageBand(3)).toBe("3-5");
    expect(ageBand(5)).toBe("3-5");
    expect(ageBand(6)).toBe("6-10");
    expect(ageBand(10)).toBe("6-10");
    expect(ageBand(11)).toBe("10+");
  });
});

describe("buildSegmentBenchmarks / lookupSegmentAvgCostPerKm", () => {
  const index = buildSegmentBenchmarks(listings);

  it("resolves an exact make/model/age-band average (age 3 and 4 both fall in the 3-5 band)", () => {
    const value = lookupSegmentAvgCostPerKm(index, {
      make: "Toyota",
      model: "Hilux",
      segment: "Double-Cab Bakkie",
      age_years: 3,
    });
    expect(value).toBe((2.0 + 2.4) / 2);
  });

  it("falls back to segment+age-band when make/model is unseen", () => {
    const value = lookupSegmentAvgCostPerKm(index, {
      make: "Isuzu",
      model: "D-Max",
      segment: "Double-Cab Bakkie",
      age_years: 3,
    });
    expect(value).toBe((2.0 + 2.4 + 2.8) / 3);
  });

  it("falls back to the whole segment when no age-band match exists", () => {
    const value = lookupSegmentAvgCostPerKm(index, {
      make: "Isuzu",
      model: "D-Max",
      segment: "Double-Cab Bakkie",
      age_years: 9,
    });
    expect(value).toBe((2.0 + 2.4 + 2.8) / 3);
  });

  it("returns undefined when the segment itself has no data", () => {
    const value = lookupSegmentAvgCostPerKm(index, {
      make: "Tesla",
      model: "Model 3",
      segment: "EV Sedan",
      age_years: 2,
    });
    expect(value).toBeUndefined();
  });
});
