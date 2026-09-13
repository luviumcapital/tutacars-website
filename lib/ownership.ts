export type OwnershipInput = { price: number; fuelCost: number; serviceCost: number; years: number; annualKm: number }

export function calculateOwnership({ price, fuelCost, serviceCost, years, annualKm }: OwnershipInput) {
  const km = years * annualKm
  const total = price + fuelCost * km + serviceCost * years
  const perKm = total / km
  return { totalForwardCost: total, monthlyCost: total / (years * 12), costPerKm: perKm, valueScore: Math.max(1, Math.min(10, Math.round(10 - perKm * 2))), badge: perKm < 0.8 ? 'Smart buy' : perKm < 1.1 ? 'Strong value' : 'Worth a look' }
}
