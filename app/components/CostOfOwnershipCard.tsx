"use client";

import { TrendingDown, Gauge, Wrench, Calendar } from "lucide-react";
import type { CostOfOwnershipResult, ValueBadge } from "@/lib/pricingEngine";

const GOLD = "#D4AF37";
const RED = "#DC2626";
const GREEN = "#34D399";
const AMBER = "#F59E0B";

function fmtR(n: number) {
  return "R " + Math.round(n).toLocaleString("en-ZA");
}

function badgeColor(badge: ValueBadge): string {
  switch (badge) {
    case "Blue Chip Buy":
      return GREEN;
    case "Fair Market":
      return GOLD;
    case "Pay Attention":
      return AMBER;
    case "Money Pit Risk":
      return RED;
    default:
      return "#6B7280";
  }
}

function verdictLine(result: CostOfOwnershipResult, segmentLabel: string): string {
  if (result.insufficient_data || result.forward_total_cost_per_km === null) {
    return "Not enough data yet to calculate a per-km cost for this car.";
  }
  const perKm = result.forward_total_cost_per_km.toFixed(2);
  if (result.value_score === null) {
    return `This car will cost you ~R${perKm}/km to own. No ${segmentLabel} benchmark yet — showing car-level estimate only.`;
  }
  const pct = Math.round(Math.abs(result.value_score - 50) * 2);
  const direction = result.value_score >= 50 ? "cheaper" : "pricier";
  return `This car will cost you ~R${perKm}/km to own — ${pct}% ${direction} than similar ${segmentLabel} in this segment.`;
}

interface Props {
  result: CostOfOwnershipResult;
  segmentLabel: string;
  dark?: boolean;
  financeMonthlyInstallment?: number;
}

export default function CostOfOwnershipCard({ result, segmentLabel, dark = true, financeMonthlyInstallment }: Props) {
  const cardBg = dark ? "#0A0A0A" : "#FFFFFF";
  const borderCol = dark ? "#1E1E1E" : "#E0D8CC";
  const textMuted = dark ? "#9CA3AF" : "#6B7280";
  const textMain = dark ? "#FFFFFF" : "#1A1A1A";

  return (
    <div style={{ background: cardBg, border: `1px solid ${borderCol}`, borderRadius: 16, padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: GOLD }}>
          True Cost of Ownership
        </p>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: 999,
            color: "#0A0A0A",
            background: badgeColor(result.badge),
          }}
        >
          {result.badge}
        </div>
      </div>

      {/* Hero metric: forward-looking cost per km */}
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 11, color: textMuted, marginBottom: 4 }}>What this car will cost you, going forward</p>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontFamily: "Georgia, serif", fontSize: 32, fontWeight: 700, color: textMain }}>
            {result.forward_total_cost_per_km !== null ? `R${result.forward_total_cost_per_km.toFixed(2)}` : "—"}
          </span>
          <span style={{ fontSize: 13, color: textMuted }}>/ km</span>
        </div>
        <p style={{ fontSize: 12, color: textMuted, marginTop: 6, lineHeight: 1.5 }}>
          {verdictLine(result, segmentLabel)}
        </p>
      </div>

      {/* Effective monthly cost + finance comparison */}
      <div style={{ display: "grid", gridTemplateColumns: financeMonthlyInstallment ? "1fr 1fr" : "1fr", gap: 12, marginBottom: 16 }}>
        <div style={{ background: dark ? "#141414" : "#FAF8F4", borderRadius: 10, padding: 12 }}>
          <p style={{ fontSize: 10, color: textMuted, marginBottom: 4 }}>Effective monthly cost (cash)</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: textMain }}>
            {result.effective_monthly_equivalent !== null ? fmtR(result.effective_monthly_equivalent) + "/pm" : "—"}
          </p>
        </div>
        {financeMonthlyInstallment !== undefined && (
          <div style={{ background: dark ? "#141414" : "#FAF8F4", borderRadius: 10, padding: 12 }}>
            <p style={{ fontSize: 10, color: textMuted, marginBottom: 4 }}>If financed</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: textMain }}>{fmtR(financeMonthlyInstallment)}/pm</p>
          </div>
        )}
      </div>

      {/* Historical, supporting detail */}
      <div style={{ borderTop: `1px solid ${borderCol}`, paddingTop: 14 }}>
        <p style={{ fontSize: 10, color: textMuted, marginBottom: 10, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Lifetime so far {result.history_scope === "current_owner" ? "(current owner)" : "(full history)"}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <Stat
            icon={<TrendingDown size={12} />}
            label="Depreciation"
            value={fmtR(result.depreciation_total)}
            textMuted={textMuted}
            textMain={textMain}
          />
          <Stat
            icon={<Gauge size={12} />}
            label="Cost / km"
            value={result.cost_per_km_historical !== null ? `R${result.cost_per_km_historical.toFixed(2)}` : "—"}
            textMuted={textMuted}
            textMain={textMain}
          />
          <Stat
            icon={<Wrench size={12} />}
            label={`Maint./yr${result.maintenance_quality === "estimated" ? " (est.)" : ""}`}
            value={fmtR(result.maintenance_per_year)}
            textMuted={textMuted}
            textMain={textMain}
          />
        </div>
        {result.beyond_expected_lifespan && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, color: AMBER, fontSize: 11 }}>
            <Calendar size={12} />
            <span>Beyond typical lifespan for this model — forward figures are a conservative estimate.</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  textMuted,
  textMain,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  textMuted: string;
  textMain: string;
}) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, color: textMuted, fontSize: 10, marginBottom: 4 }}>
        {icon}
        <span>{label}</span>
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: textMain }}>{value}</div>
    </div>
  );
}
