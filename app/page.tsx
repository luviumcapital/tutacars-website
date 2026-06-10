"use client";
import { useState, createContext, useContext } from "react";
import {
  Search, MapPin, ChevronDown, ArrowRight, Heart, Phone, Mail,
  Menu, X, SlidersHorizontal, Car, Fuel, Gauge, CheckCircle,
  ExternalLink, Sun, Moon,
} from "lucide-react";

const GOLD = "#D4AF37";
const GOLD_LIGHT = "#F0D060";
const RED = "#DC2626";
const RED_DARK = "#b91c1c";

const ThemeCtx = createContext(true);
function useDark() { return useContext(ThemeCtx); }

const BODY_TYPES = [
  { label: "Bakkie", icon: "🛻", count: 124 },
  { label: "SUV", icon: "🚙", count: 98 },
  { label: "Sedan", icon: "🚗", count: 87 },
  { label: "Hatchback", icon: "🚘", count: 76 },
  { label: "Luxury", icon: "✨", count: 43 },
  { label: "Van", icon: "🚐", count: 29 },
  { label: "Coupe", icon: "🏎️", count: 18 },
  { label: "Convertible", icon: "🌟", count: 12 },
];

const MAKES = ["All Makes","BMW","Ford","Haval","Honda","Hyundai","Isuzu","Kia","Mercedes-Benz","Nissan","Renault","Toyota","VW"];
const PROVINCES = ["All Provinces","Eastern Cape","Free State","Gauteng","KwaZulu-Natal","Limpopo","Mpumalanga","North West","Northern Cape","Western Cape"];
const PRICE_RANGES = ["Any Price","Under R100k","R100k – R200k","R200k – R350k","R350k – R500k","R500k – R750k","Over R750k"];

const LISTINGS = [
  { id:1, make:"Toyota", model:"Hilux 2.8 GD-6 RB Legend D/C Auto", year:2023, price:589900, km:"28,400", fuel:"Diesel", trans:"Automatic", location:"Sandton, Gauteng", dealer:"TC-JHB-001", bg:"#1a1a2e", verified:true, badge:"Finance Available" },
  { id:2, make:"BMW", model:"320i M Sport Auto", year:2022, price:489900, km:"41,200", fuel:"Petrol", trans:"Automatic", location:"Cape Town, WC", dealer:"TC-CPT-003", bg:"#16213e", verified:true, badge:"Low Mileage" },
  { id:3, make:"VW", model:"Tiguan 2.0 TSI R-Line 4Motion", year:2023, price:569900, km:"15,800", fuel:"Petrol", trans:"Automatic", location:"Pretoria, Gauteng", dealer:"TC-PTA-002", bg:"#0f3460", verified:true, badge:"New Arrival" },
  { id:4, make:"Ford", model:"Ranger Wildtrak 2.0 Bi-Turbo D/C 4x4", year:2023, price:619900, km:"22,100", fuel:"Diesel", trans:"Automatic", location:"Durban, KZN", dealer:"TC-DBN-001", bg:"#1a1a2e", verified:true, badge:"Finance Available" },
  { id:5, make:"Hyundai", model:"Tucson 2.0 Premium Auto", year:2022, price:329900, km:"55,300", fuel:"Petrol", trans:"Automatic", location:"Johannesburg, GP", dealer:"TC-JHB-003", bg:"#16213e", verified:true, badge:"Price Drop" },
  { id:6, make:"Mercedes-Benz", model:"C200 AMG Line Auto", year:2021, price:449900, km:"62,500", fuel:"Petrol", trans:"Automatic", location:"Sandton, Gauteng", dealer:"TC-JHB-001", bg:"#0f3460", verified:true, badge:"Certified" },
  { id:7, make:"Isuzu", model:"D-Max 300 LX Auto D/C 4x4", year:2023, price:559900, km:"18,200", fuel:"Diesel", trans:"Automatic", location:"Nelspruit, Mpumalanga", dealer:"TC-MPM-001", bg:"#1a1a2e", verified:true, badge:"New Arrival" },
  { id:8, make:"Kia", model:"Sportage 2.0 EX Auto", year:2022, price:359900, km:"38,900", fuel:"Petrol", trans:"Automatic", location:"Port Elizabeth, EC", dealer:"TC-ECP-001", bg:"#16213e", verified:false, badge:"" },
  { id:9, make:"Honda", model:"CR-V 1.5T Executive AWD Auto", year:2022, price:419900, km:"44,700", fuel:"Petrol", trans:"Automatic", location:"Pretoria, Gauteng", dealer:"TC-PTA-002", bg:"#0f3460", verified:true, badge:"Finance Available" },
];

const DEALERS = [
  { id:"TC-JHB-001", name:"Tuta Cars Sandton", location:"Sandton, Gauteng", units:18, rating:4.8, reviews:124 },
  { id:"TC-CPT-003", name:"Tuta Cars Cape Town", location:"Cape Town, WC", units:12, rating:4.9, reviews:89 },
  { id:"TC-DBN-001", name:"Tuta Cars Durban", location:"Durban, KZN", units:15, rating:4.7, reviews:67 },
];

function fmt(n: number) { return "R " + n.toLocaleString("en-ZA"); }

function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, background: RED, borderRadius: 5,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: `0 0 0 1px rgba(220,38,38,0.4), 0 2px 8px rgba(220,38,38,0.3)`,
      flexShrink: 0 }}>
      <span style={{ fontFamily: "Georgia, serif", fontWeight: 700, color: "white",
        fontSize: size * 0.55, lineHeight: 1 }}>T</span>
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p style={{ color: GOLD, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em",
      textTransform: "uppercase", marginBottom: 8 }}>{children}</p>
  );
}

function Navbar({ onToggle }: { onToggle: () => void }) {
  const dark = useDark();
  const [open, setOpen] = useState(false);
  const navBg = dark ? "rgba(5,5,5,0.96)" : "rgba(250,248,244,0.96)";
  const navBorder = dark ? "#1E1E1E" : "#E0D8CC";
  const textColor = dark ? "#9CA3AF" : "#6B7280";
  const textHover = dark ? "#FFFFFF" : "#1A1A1A";

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: navBg, borderBottom: `1px solid ${navBorder}`, backdropFilter: "blur(12px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              <LogoMark size={28} />
              <span style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 700,
                color: dark ? "#FFFFFF" : "#1A1A1A", letterSpacing: "0.04em" }}>TUTA CARS</span>
            </div>
            <div className="hidden lg:flex" style={{ gap: 2 }}>
              {["Buy","Sell","Finance","Dealers","About"].map(l => (
                <a key={l} href="#"
                  style={{ padding: "6px 12px", fontSize: 14, color: textColor, borderRadius: 6, transition: "color 0.15s", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = textHover)}
                  onMouseLeave={e => (e.currentTarget.style.color = textColor)}
                >{l}</a>
              ))}
            </div>
          </div>
          <div className="hidden md:flex" style={{ alignItems: "center", gap: 12 }}>
            <button onClick={onToggle}
              style={{ width: 36, height: 36, borderRadius: 8,
                border: `1px solid ${dark ? "#2A2A2A" : "#D0C9BE"}`,
                background: "transparent", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: textColor, transition: "all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = textHover; (e.currentTarget as HTMLButtonElement).style.borderColor = GOLD; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = textColor; (e.currentTarget as HTMLButtonElement).style.borderColor = dark ? "#2A2A2A" : "#D0C9BE"; }}
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <a href="https://capital.tutacars.co.za"
              style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: textColor,
                border: `1px solid ${dark ? "#2A2A2A" : "#D0C9BE"}`, padding: "6px 12px",
                borderRadius: 8, textDecoration: "none", transition: "all 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = textHover; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = textColor; }}
            ><ExternalLink size={12} /> Dealer Portal</a>
            <a href="#partner"
              style={{ background: RED, color: "white", fontSize: 14, fontWeight: 500,
                padding: "8px 16px", borderRadius: 8, textDecoration: "none", transition: "background 0.15s" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = RED_DARK)}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = RED)}
            >List Your Car</a>
          </div>
          <div className="flex md:hidden" style={{ alignItems: "center", gap: 8 }}>
            <button onClick={onToggle} style={{ color: textColor, background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={() => setOpen(!open)} style={{ color: dark ? "white" : "#1A1A1A", background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div style={{ background: dark ? "#0A0A0A" : "#FAFAF7", borderTop: `1px solid ${navBorder}`, padding: "16px" }}>
          {["Buy","Sell","Finance","Dealers","About"].map(l => (
            <a key={l} href="#" style={{ display: "block", fontSize: 14, color: textColor, padding: "8px 0", textDecoration: "none" }}>{l}</a>
          ))}
          <a href="#partner" style={{ display: "block", background: RED, color: "white", fontSize: 14,
            fontWeight: 500, padding: "10px 16px", borderRadius: 8, textAlign: "center", marginTop: 8, textDecoration: "none" }}>
            List Your Car
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const dark = useDark();
  const [active, setActive] = useState("All");
  const cats = ["All","Bakkie","SUV","Sedan","Hatchback","Luxury"];
  const sectionBg = dark ? "#050505" : "#F5F3EE";
  const cardBg = dark ? "#0F0F0F" : "#FFFFFF";
  const borderCol = dark ? "#2A2A2A" : "#D8D0C4";
  const inputBg = dark ? "#050505" : "#F9F7F4";
  const textMain = dark ? "#FFFFFF" : "#1A1A1A";
  const textMuted = dark ? "#9CA3AF" : "#6B7280";

  return (
    <section style={{ paddingTop: 64, background: sectionBg }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ maxWidth: 780 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.25)",
            borderRadius: 999, padding: "4px 12px", marginBottom: 24 }}>
            <div style={{ width: 6, height: 6, background: GOLD, borderRadius: "50%" }} />
            <span style={{ fontSize: 12, color: GOLD, fontWeight: 500 }}>487 vehicles available nationwide</span>
          </div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight: 700, color: textMain, lineHeight: 1.1, marginBottom: 20 }}>
            Find your next<br />
            <span style={{ color: RED }}>car with confidence</span>
          </h1>
          <p style={{ color: textMuted, fontSize: 18, marginBottom: 36, maxWidth: 520 }}>
            Verified dealers. Transparent pricing. Finance options on most vehicles.
            487 listings from 12 trusted dealer pods nationwide.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
            {cats.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                style={{ padding: "8px 18px", borderRadius: 999, fontSize: 14, fontWeight: 500,
                  cursor: "pointer", transition: "all 0.15s",
                  background: active === cat ? RED : (dark ? "#111111" : "#FFFFFF"),
                  color: active === cat ? "white" : textMuted,
                  border: active === cat ? `1px solid ${RED}` : `1px solid ${borderCol}` }}
              >{cat}</button>
            ))}
          </div>
          <div style={{ background: cardBg, border: `1px solid ${borderCol}`, borderRadius: 16,
            padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {[{ label: "Make", opts: MAKES }, { label: "Max Price", opts: PRICE_RANGES }, { label: "Province", opts: PROVINCES }].map(({ label, opts }) => (
                <div key={label} style={{ position: "relative" }}>
                  <select style={{ width: "100%", background: inputBg, border: `1px solid ${borderCol}`,
                    color: dark ? "#D1D5DB" : "#374151", fontSize: 14, borderRadius: 10,
                    padding: "10px 12px", appearance: "none", cursor: "pointer" }}>
                    {opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown size={13} style={{ position: "absolute", right: 10, top: 13, color: textMuted, pointerEvents: "none" }} />
                </div>
              ))}
            </div>
            <button
              style={{ background: RED, color: "white", fontWeight: 600, padding: "12px 32px",
                borderRadius: 10, border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                fontSize: 15, transition: "background 0.15s" }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = RED_DARK)}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = RED)}
            ><Search size={16} /> Search</button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 56 }}>
          {[{ value: "487", label: "Live Listings" }, { value: "12", label: "Verified Dealers" },
            { value: "9", label: "Provinces" }, { value: "100%", label: "Verified Stock" }].map(s => (
            <div key={s.label} style={{ background: dark ? "#0A0A0A" : "#FFFFFF",
              border: `1px solid ${dark ? "#1E1E1E" : "#E0D8CC"}`, borderRadius: 12, padding: "16px 20px" }}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 700, color: GOLD, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: textMuted }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrowseByType() {
  const dark = useDark();
  const sectionBg = dark ? "#080808" : "#EDE9E1";
  const cardBg = dark ? "#0F0F0F" : "#FFFFFF";
  const borderCol = dark ? "#1E1E1E" : "#D8D0C4";
  const textMuted = dark ? "#9CA3AF" : "#6B7280";

  return (
    <section style={{ padding: "56px 0", background: sectionBg }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: 32 }}>
          <SectionLabel>Browse</SectionLabel>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 700, color: dark ? "#FFFFFF" : "#1A1A1A" }}>By Vehicle Type</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {BODY_TYPES.map(t => (
            <button key={t.label}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                background: cardBg, border: `1px solid ${borderCol}`, borderRadius: 12,
                padding: 16, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = GOLD; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = borderCol; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
            >
              <span style={{ fontSize: 22 }}>{t.icon}</span>
              <span style={{ fontSize: 11, color: textMuted, fontWeight: 500 }}>{t.label}</span>
              <span style={{ fontSize: 10, color: dark ? "#4B5563" : "#9CA3AF" }}>{t.count}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ v }: { v: typeof LISTINGS[0] }) {
  const dark = useDark();
  const [saved, setSaved] = useState(false);
  const cardBg = dark ? "#0A0A0A" : "#FFFFFF";
  const borderCol = dark ? "#1E1E1E" : "#E0D8CC";
  const textMuted = dark ? "#9CA3AF" : "#6B7280";
  const textDim = dark ? "#4B5563" : "#9CA3AF";

  return (
    <div style={{ background: cardBg, border: `1px solid ${borderCol}`, borderRadius: 16,
      overflow: "hidden", transition: "border-color 0.2s" }}
      onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = dark ? "#2A2A2A" : "#C9BFA8")}
      onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = borderCol)}>
      <div style={{ position: "relative", height: 192,
        background: `linear-gradient(135deg, ${v.bg} 0%, #0a0a0a 100%)` }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Car size={72} style={{ color: "rgba(255,255,255,0.08)" }} />
        </div>
        {v.badge && (
          <div style={{ position: "absolute", top: 12, left: 12, background: RED, color: "white",
            fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6,
            letterSpacing: "0.06em", textTransform: "uppercase" }}>{v.badge}</div>
        )}
        {v.verified && (
          <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", alignItems: "center",
            gap: 4, background: "rgba(0,0,0,0.6)", color: "#34D399", fontSize: 10,
            padding: "4px 8px", borderRadius: 6, border: "1px solid rgba(52,211,153,0.2)" }}>
            <CheckCircle size={10} /> Verified
          </div>
        )}
        <button onClick={() => setSaved(!saved)}
          style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: saved ? RED : "rgba(0,0,0,0.4)", color: saved ? "white" : "#9CA3AF",
            border: "none", cursor: "pointer", backdropFilter: "blur(4px)" }}>
          <Heart size={14} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 11, color: textDim, marginBottom: 2 }}>{v.year} · {v.dealer}</p>
          <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 700, color: dark ? "#FFFFFF" : "#1A1A1A",
            fontSize: 15, lineHeight: 1.3 }}>{v.make} {v.model}</h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 12 }}>
          {[{ Icon: Gauge, val: v.km + " km" }, { Icon: Fuel, val: v.fuel }, { Icon: Car, val: v.trans }].map(({ Icon, val }) => (
            <div key={val} style={{ display: "flex", alignItems: "center", gap: 5, color: textMuted, fontSize: 11 }}>
              <Icon size={11} style={{ color: textDim, flexShrink: 0 }} />
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{val}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, color: textMuted, fontSize: 11, marginBottom: 16 }}>
          <MapPin size={11} style={{ color: textDim }} />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.location}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontWeight: 700, color: RED, fontSize: 18 }}>{fmt(v.price)}</div>
            <div style={{ fontSize: 10, color: GOLD }}>Finance from ~R{Math.round(v.price * 0.025).toLocaleString()}/pm</div>
          </div>
          <button style={{ background: RED, color: "white", fontSize: 12, fontWeight: 600,
            padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", transition: "background 0.15s" }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = RED_DARK)}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = RED)}
          >View</button>
        </div>
      </div>
    </div>
  );
}

function Listings() {
  const dark = useDark();
  const sectionBg = dark ? "#050505" : "#F5F3EE";
  const borderCol = dark ? "#2A2A2A" : "#D8D0C4";
  const textMain = dark ? "#FFFFFF" : "#1A1A1A";
  const textMuted = dark ? "#9CA3AF" : "#6B7280";
  const inputBg = dark ? "#0F0F0F" : "#FFFFFF";

  return (
    <section style={{ padding: "56px 0", background: sectionBg }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center",
          justifyContent: "space-between", gap: 16, marginBottom: 32 }}>
          <div>
            <SectionLabel>Browse</SectionLabel>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 700, color: textMain }}>487 Vehicles Available</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button style={{ display: "flex", alignItems: "center", gap: 8,
              border: `1px solid ${borderCol}`, color: textMuted, fontSize: 14,
              padding: "8px 14px", borderRadius: 10, background: "transparent", cursor: "pointer" }}
            ><SlidersHorizontal size={14} /> Filters</button>
            <div style={{ position: "relative" }}>
              <select style={{ background: inputBg, border: `1px solid ${borderCol}`,
                color: dark ? "#D1D5DB" : "#374151", fontSize: 14,
                borderRadius: 10, padding: "8px 32px 8px 12px", appearance: "none" }}>
                <option>Newest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Lowest Mileage</option>
              </select>
              <ChevronDown size={13} style={{ position: "absolute", right: 10, top: 11, color: textMuted, pointerEvents: "none" }} />
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {LISTINGS.map(v => <Card key={v.id} v={v} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button style={{ border: `1px solid ${borderCol}`, color: textMuted, fontSize: 14,
            fontWeight: 500, padding: "14px 40px", borderRadius: 12,
            background: "transparent", cursor: "pointer" }}
          >Load more listings</button>
        </div>
      </div>
    </section>
  );
}

function Dealers() {
  const dark = useDark();
  const sectionBg = dark ? "#080808" : "#EDE9E1";
  const cardBg = dark ? "#0A0A0A" : "#FFFFFF";
  const borderCol = dark ? "#1E1E1E" : "#D8D0C4";
  const textMain = dark ? "#FFFFFF" : "#1A1A1A";
  const textMuted = dark ? "#6B7280" : "#9CA3AF";

  return (
    <section style={{ padding: "56px 0", background: sectionBg,
      borderTop: `1px solid ${borderCol}`, borderBottom: `1px solid ${borderCol}` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: 32 }}>
          <SectionLabel>Our Network</SectionLabel>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 700, color: textMain }}>Featured Dealers</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {DEALERS.map(d => (
            <div key={d.id}
              style={{ background: cardBg, border: `1px solid ${borderCol}`, borderRadius: 16, padding: 20 }}
              onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = GOLD)}
              onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = borderCol)}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%",
                  background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <LogoMark size={22} />
                </div>
                <span style={{ fontSize: 11, color: "#34D399", background: "rgba(52,211,153,0.1)",
                  border: "1px solid rgba(52,211,153,0.25)", padding: "2px 8px", borderRadius: 999 }}>Verified</span>
              </div>
              <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 700, color: textMain, marginBottom: 4 }}>{d.name}</h3>
              <p style={{ fontSize: 12, color: textMuted, display: "flex", alignItems: "center", gap: 4, marginBottom: 16 }}>
                <MapPin size={10} />{d.location}
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                fontSize: 12, color: textMuted, borderTop: `1px solid ${borderCol}`, paddingTop: 16 }}>
                <span>{d.units} vehicles</span>
                <span style={{ color: GOLD }}>★ {d.rating} ({d.reviews})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Finance() {
  const dark = useDark();
  const sectionBg = dark ? "#050505" : "#F5F3EE";
  const borderCol = dark ? "#2A2A2A" : "#D8D0C4";
  const textMain = dark ? "#FFFFFF" : "#1A1A1A";
  const textMuted = dark ? "#9CA3AF" : "#6B7280";

  return (
    <section style={{ padding: "56px 0", background: sectionBg }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ background: dark ? "#0F0F0F" : "#FFFFFF", border: `1px solid ${borderCol}`, borderRadius: 20,
          padding: "48px", display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between", gap: 32 }}>
          <div>
            <SectionLabel>Tuta Capital</SectionLabel>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
              fontWeight: 700, color: textMain, marginBottom: 12 }}>Get pre-approved in minutes</h2>
            <p style={{ color: textMuted, maxWidth: 500 }}>
              Finance options available on most vehicles. Competitive rates, flexible terms.
              Tuta Capital makes vehicle ownership accessible to all South Africans.
            </p>
          </div>
          <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            <button style={{ background: RED, color: "white", fontWeight: 600, padding: "14px 32px",
              borderRadius: 12, border: "none", cursor: "pointer", whiteSpace: "nowrap" }}
            >Apply for Finance</button>
            <button style={{ border: `1px solid ${borderCol}`, color: textMuted, fontSize: 14,
              padding: "12px 32px", borderRadius: 12, background: "transparent",
              cursor: "pointer", whiteSpace: "nowrap" }}
            >Calculate Repayment</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Partner() {
  const dark = useDark();
  const [done, setDone] = useState(false);
  const [f, setF] = useState({ name: "", email: "", phone: "", province: "", type: "individual" });
  const sectionBg = dark ? "#0A0A0A" : "#EDE9E1";
  const cardBg = dark ? "#0F0F0F" : "#FFFFFF";
  const borderCol = dark ? "#2A2A2A" : "#D8D0C4";
  const inputBg = dark ? "#050505" : "#FAF8F5";
  const textMain = dark ? "#FFFFFF" : "#1A1A1A";
  const textMuted = dark ? "#9CA3AF" : "#6B7280";
  const textDim = dark ? "#6B7280" : "#9CA3AF";

  return (
    <section id="partner" style={{ padding: "64px 0", background: sectionBg, borderTop: `1px solid ${borderCol}` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            <SectionLabel>Dealer Opportunity</SectionLabel>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              fontWeight: 700, color: textMain, marginBottom: 20 }}>
              Sell cars under the Tuta Cars brand
            </h2>
            <p style={{ color: textMuted, marginBottom: 32, lineHeight: 1.7 }}>
              We are expanding our dealer network across South Africa. If you are looking to operate
              a professional, technology-backed dealership with access to floor plan finance and a
              national buyer base, we want to hear from you.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
              {["Exclusive territory - one pod per area",
                "Technology platform to manage your entire stock",
                "Access to vehicle floor plan finance",
                "Nationwide marketing and lead generation",
                "RMI & NADA compliance support"].map(b => (
                <div key={b} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <CheckCircle size={16} style={{ color: RED, flexShrink: 0 }} />
                  <span style={{ color: textMuted, fontSize: 14 }}>{b}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, color: GOLD, fontStyle: "italic",
              borderLeft: `2px solid ${GOLD}`, paddingLeft: 12, opacity: 0.8 }}>
              Complete the form to receive our full dealer information pack, territory map, and fee structure.
            </p>
          </div>
          <div style={{ background: cardBg, border: `1px solid ${borderCol}`, borderRadius: 20, padding: 24 }}>
            {done ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <CheckCircle size={48} style={{ color: RED, margin: "0 auto 16px" }} />
                <h3 style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700, color: textMain, marginBottom: 8 }}>Interest Registered!</h3>
                <p style={{ color: textMuted, fontSize: 14 }}>We will send our full dealer pack to {f.email} within 1 business day.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 700, color: textMain, marginBottom: 4 }}>Register Your Interest</h3>
                <p style={{ color: textDim, fontSize: 14, marginBottom: 24 }}>Takes 60 seconds. No commitment required.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[{ key: "name", label: "Full Name", ph: "Your name" }, { key: "phone", label: "Phone", ph: "+27 ..." }].map(({ key, label, ph }) => (
                      <div key={key}>
                        <label style={{ fontSize: 12, color: textDim, display: "block", marginBottom: 4 }}>{label}</label>
                        <input value={(f as Record<string, string>)[key]} onChange={e => setF({ ...f, [key]: e.target.value })} placeholder={ph}
                          style={{ width: "100%", background: inputBg, border: `1px solid ${borderCol}`,
                            color: textMain, fontSize: 14, borderRadius: 10, padding: "10px 12px", boxSizing: "border-box" }} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: textDim, display: "block", marginBottom: 4 }}>Email Address</label>
                    <input value={f.email} onChange={e => setF({ ...f, email: e.target.value })} placeholder="you@example.com"
                      style={{ width: "100%", background: inputBg, border: `1px solid ${borderCol}`,
                        color: textMain, fontSize: 14, borderRadius: 10, padding: "10px 12px", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: textDim, display: "block", marginBottom: 4 }}>Preferred Territory</label>
                    <div style={{ position: "relative" }}>
                      <select value={f.province} onChange={e => setF({ ...f, province: e.target.value })}
                        style={{ width: "100%", background: inputBg, border: `1px solid ${borderCol}`,
                          color: dark ? "#D1D5DB" : "#374151", fontSize: 14,
                          borderRadius: 10, padding: "10px 32px 10px 12px", appearance: "none" }}>
                        <option value="">Select province</option>
                        {PROVINCES.slice(1).map(p => <option key={p}>{p}</option>)}
                      </select>
                      <ChevronDown size={13} style={{ position: "absolute", right: 10, top: 13, color: textDim, pointerEvents: "none" }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: textDim, display: "block", marginBottom: 8 }}>I am interested as a</label>
                    <div style={{ display: "flex", gap: 10 }}>
                      {["individual", "existing dealer", "investor"].map(t => (
                        <button key={t} onClick={() => setF({ ...f, type: t })}
                          style={{ flex: 1, fontSize: 12, padding: "8px", borderRadius: 8,
                            border: `1px solid ${f.type === t ? "rgba(212,175,55,0.5)" : borderCol}`,
                            background: f.type === t ? "rgba(212,175,55,0.08)" : "transparent",
                            color: f.type === t ? GOLD : textDim, cursor: "pointer",
                            textTransform: "capitalize" }}
                        >{t}</button>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => f.name && f.email && setDone(true)}
                    style={{ width: "100%", background: RED, color: "white", fontWeight: 600,
                      padding: 14, borderRadius: 12, border: "none", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                  >Send Me the Dealer Pack <ArrowRight size={15} /></button>
                  <p style={{ textAlign: "center", color: textDim, fontSize: 11 }}>
                    We respond within 1 business day. Your details are never shared.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const dark = useDark();
  const footerBg = dark ? "#030303" : "#1A1A1A";
  const borderCol = dark ? "#111111" : "#2A2A2A";
  const textMuted = dark ? "#4B5563" : "#6B7280";
  const textDim = dark ? "#374151" : "#4B5563";

  return (
    <footer style={{ background: footerBg, borderTop: `1px solid ${borderCol}` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <LogoMark size={26} />
              <span style={{ fontFamily: "Georgia, serif", fontSize: 17, fontWeight: 700, color: "white" }}>TUTA CARS</span>
            </div>
            <p style={{ color: textMuted, fontSize: 13, marginBottom: 8, lineHeight: 1.6 }}>
              South Africa's verified dealer network. 487 listings. 12 trusted dealers. Nationwide.
            </p>
            <p style={{ color: textDim, fontSize: 12 }}>A Luvium Holdings Company</p>
          </div>
          <div>
            <h4 style={{ fontFamily: "Georgia, serif", color: "white", fontWeight: 700, marginBottom: 16, fontSize: 14 }}>Buy</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {["Browse All Cars","Bakkies & Trucks","SUVs","Luxury Cars","Under R200k","Under R300k"].map(l => (
                <li key={l}><a href="#" style={{ color: textMuted, fontSize: 13, textDecoration: "none" }}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: "Georgia, serif", color: "white", fontWeight: 700, marginBottom: 16, fontSize: 14 }}>Services</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {["Vehicle Finance","Trade-In Valuation","Dealer Portal","Become a Partner","About Tuta Cars"].map(l => (
                <li key={l}><a href="#" style={{ color: textMuted, fontSize: 13, textDecoration: "none" }}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: "Georgia, serif", color: "white", fontWeight: 700, marginBottom: 16, fontSize: 14 }}>Contact</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {[{ Icon: Mail, text: "info@tutacars.co.za" }, { Icon: Phone, text: "+27 (0)11 000 0000" }, { Icon: MapPin, text: "Sandton, Johannesburg" }].map(({ Icon, text }) => (
                <li key={text} style={{ display: "flex", alignItems: "center", gap: 8, color: textMuted, fontSize: 13 }}>
                  <Icon size={13} style={{ color: GOLD }} />{text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${borderCol}`, paddingTop: 32 }}>
          <p style={{ color: textDim, fontSize: 11, textAlign: "center" }}>
            © 2025 Tuta Cars, a Luvium Holdings Company. RMI Member. NCR Registration Pending.
            All transactions subject to the National Credit Act 34 of 2005.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [dark, setDark] = useState(true);
  return (
    <ThemeCtx.Provider value={dark}>
      <main style={{ minHeight: "100vh", background: dark ? "#050505" : "#F5F3EE" }}>
        <Navbar onToggle={() => setDark(d => !d)} />
        <Hero />
        <BrowseByType />
        <Listings />
        <Dealers />
        <Finance />
        <Partner />
        <Footer />
      </main>
    </ThemeCtx.Provider>
  );
}
