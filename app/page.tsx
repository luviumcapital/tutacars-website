"use client";
import { useState } from "react";
import { Car, ChevronDown, MapPin, Shield, Award, CheckCircle, ArrowRight, Menu, X, BarChart3, Phone, Mail, ExternalLink } from "lucide-react";

const STATS = [
  { value: "487", label: "Units Live on Site" },
  { value: "12", label: "Active Dealer Pods" },
  { value: "R2.4M", label: "Floor Plan Deployed" },
  { value: "54", label: "Franchise Territories" },
];
const VEHICLES = [
  { make: "Toyota", model: "Hilux 2.8 GD-6 D/C", year: 2023, price: "R485,000", location: "Sandton, GP", eligible: true },
  { make: "VW", model: "Polo Vivo 1.4 Trendline", year: 2022, price: "R189,000", location: "Pretoria, GP", eligible: true },
  { make: "BMW", model: "320i M Sport", year: 2021, price: "R410,000", location: "Cape Town, WC", eligible: true },
  { make: "Ford", model: "Ranger Wildtrak 2.0 Bi-T", year: 2023, price: "R520,000", location: "Johannesburg, GP", eligible: true },
  { make: "Hyundai", model: "Tucson 2.0 Executive", year: 2022, price: "R295,000", location: "Durban, KZN", eligible: false },
  { make: "Mercedes", model: "C200 AMG Line", year: 2020, price: "R380,000", location: "Bloemfontein, FS", eligible: true },
];
const TRUST = [
  { icon: Shield, label: "RMI Affiliated" }, { icon: Award, label: "NADA Member" },
  { icon: CheckCircle, label: "NCR Registered (Pending)" }, { icon: MapPin, label: "54 Verified Territories" },
  { icon: BarChart3, label: "Dolibarr ERP Powered" }, { icon: Car, label: "NaTIS Integrated" },
];
const FRANCHISE_CARDS = [
  { amount: "R200,000", period: "once-off", label: "Franchise Fee", desc: "Full territory exclusivity + brand license" },
  { amount: "R4,500", period: "/month", label: "Platform & ERP Fee", desc: "Multi-tenant Dolibarr + NaTIS + support" },
  { amount: "R100,000", period: "Month 6", label: "Surety Deposit", desc: "Unlocks floor plan credit facility" },
];
const BENEFITS = ["Exclusive geographic territory","Multi-tenant Dolibarr ERP system","NaTIS vehicle registration integration","Floor plan finance facility (Month 6)","RMI & NADA compliance framework","Dedicated Tuta Capital account manager"];
const STEPS = [
  { num: "01", title: "Apply & Qualify", desc: "Submit your application. We conduct a commercial credit assessment, background check, and territory feasibility review within 5 business days." },
  { num: "02", title: "Onboard & Launch", desc: "Your Dolibarr ERP is configured and branded. Compliance training, NaTIS access provisioned, first stock loaded. Go-live in 30 days." },
  { num: "03", title: "Scale with Finance", desc: "Hit the Month 6 milestone and unlock your Tuta Capital floor plan facility — up to R500,000 in vehicle stock financing." },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["Home","Inventory","Become a Dealer","About","Tuta Capital"];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A] border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#C41E3A] rounded-sm"/><span className="font-serif text-xl font-bold text-white">TUTA CARS</span></div>
          <div className="hidden md:flex items-center gap-8">
            {links.map(l=><a key={l} href={l==="Tuta Capital"?"https://capital.tutacars.co.za":"#"} className="text-sm text-gray-400 hover:text-white transition-colors">{l}</a>)}
          </div>
          <a href="#franchise" className="hidden md:block bg-[#C41E3A] hover:bg-[#a01830] text-white text-sm font-medium px-4 py-2 rounded transition-colors">Book a Consultation</a>
          <button className="md:hidden text-white" onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<Menu size={22}/>}</button>
        </div>
      </div>
      {open&&<div className="md:hidden bg-[#141414] border-t border-[#2A2A2A] px-4 py-4 space-y-3">
        {links.map(l=><a key={l} href="#" className="block text-sm text-gray-300 hover:text-white py-1">{l}</a>)}
        <a href="#franchise" className="block bg-[#C41E3A] text-white text-sm font-medium px-4 py-2 rounded text-center">Book a Consultation</a>
      </div>}
    </nav>
  );
}

function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-16 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="inline-flex items-center gap-2 bg-[#141414] border border-[#2A2A2A] rounded-full px-4 py-1.5 mb-8">
          <div className="w-2 h-2 bg-[#C41E3A] rounded-full animate-pulse"/>
          <span className="text-xs text-gray-400">54 Franchise Territories · Now Accepting Applications</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight max-w-4xl mb-6">
          South Africa's Franchise <span className="text-[#C41E3A]">Dealer Network</span>
        </h1>
        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mb-12">54 exclusive territories. Technology-backed operations. Floor plan finance from Month 6. Built on proven principles.</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {STATS.map(s=><div key={s.label} className="bg-[#141414] border border-[#2A2A2A] rounded-lg p-4"><div className="font-serif text-3xl font-bold text-[#C41E3A] mb-1">{s.value}</div><div className="text-xs text-gray-400">{s.label}</div></div>)}
        </div>
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[{label:"Make",opts:["All Makes","BMW","Ford","Hyundai","Mercedes","Toyota","VW"]},{label:"Price",opts:["Any Price","Under R150k","R150k–R250k","R250k–R400k","R400k–R600k"]},{label:"Province",opts:["All Provinces","Gauteng","Western Cape","KZN","Eastern Cape","Limpopo"]}].map(({label,opts})=>(
              <div key={label} className="relative">
                <select className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-gray-300 text-sm rounded-lg px-3 py-2.5 appearance-none focus:border-[#C41E3A] focus:outline-none">
                  {opts.map(o=><option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-3.5 text-gray-500 pointer-events-none"/>
              </div>
            ))}
            <button className="bg-[#C41E3A] hover:bg-[#a01830] text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors">Search Inventory</button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#inventory" className="border border-white/30 hover:border-white text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors text-center">Browse All 487 Listings</a>
          <a href="#franchise" className="bg-[#C41E3A] hover:bg-[#a01830] text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">Become a Franchisee <ArrowRight size={15}/></a>
        </div>
      </div>
    </section>
  );
}

function InventoryGrid() {
  return (
    <section id="inventory" className="py-20 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div><p className="text-[#C41E3A] text-sm mb-2 uppercase tracking-widest">Featured Stock</p><h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">Live Inventory</h2></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VEHICLES.map((v,i)=>(
            <div key={i} className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden hover:border-[#C41E3A]/40 transition-colors">
              <div className="relative h-48 bg-[#1A1A1A] flex items-center justify-center">
                <Car size={64} className="text-[#2A2A2A]"/>
                {v.eligible&&<span className="absolute top-3 left-3 bg-emerald-900/60 border border-emerald-700/50 text-emerald-400 text-[10px] font-medium px-2 py-0.5 rounded-full">Floor Plan Eligible</span>}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <div><h3 className="font-serif text-white font-bold text-lg">{v.make} {v.model}</h3><p className="text-gray-500 text-xs">{v.year}</p></div>
                  <span className="text-[#C41E3A] font-bold text-base">{v.price}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-xs mb-4"><MapPin size={11}/><span>{v.location}</span></div>
                <button className="w-full border border-[#2A2A2A] hover:border-white/40 text-gray-300 hover:text-white text-sm py-2 rounded-lg transition-colors">View Details</button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10"><a href="#" className="inline-flex items-center gap-2 bg-[#C41E3A] hover:bg-[#a01830] text-white text-sm font-medium px-8 py-3 rounded-lg transition-colors">View All 487 Listings <ArrowRight size={15}/></a></div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="py-10 bg-[#141414] border-y border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {TRUST.map(({icon:Icon,label})=><div key={label} className="flex items-center gap-2.5 text-gray-400"><Icon size={16} className="text-[#C41E3A]"/><span className="text-sm whitespace-nowrap">{label}</span></div>)}
        </div>
      </div>
    </section>
  );
}

function FranchiseSection() {
  return (
    <section id="franchise" className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#C41E3A] text-sm mb-3 uppercase tracking-widest">Franchise Opportunity</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">Own a Tuta Cars Franchise</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Join an established network of 12 operational dealer pods. Exclusive territory. Full ERP stack. Finance-ready from Month 6.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {FRANCHISE_CARDS.map(c=><div key={c.label} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6 text-center hover:border-[#C41E3A]/40 transition-colors"><div className="font-serif text-4xl font-bold text-[#C41E3A] mb-1">{c.amount}</div><div className="text-gray-500 text-xs mb-3">{c.period}</div><div className="text-white font-medium mb-2 font-serif">{c.label}</div><div className="text-gray-400 text-sm">{c.desc}</div></div>)}
        </div>
        <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
          <div className="flex-1"><h3 className="font-serif text-xl font-bold text-white mb-5">What's included</h3><ul className="space-y-3">{BENEFITS.map(b=><li key={b} className="flex items-center gap-3 text-gray-300 text-sm"><CheckCircle size={16} className="text-[#C41E3A] flex-shrink-0"/>{b}</li>)}</ul></div>
          <div className="lg:w-64 text-center lg:text-left">
            <p className="text-gray-400 text-sm mb-6">Applications reviewed within 5 business days. Limited territories available in Gauteng and Western Cape.</p>
            <a href="mailto:franchises@tutacars.co.za" className="block bg-[#C41E3A] hover:bg-[#a01830] text-white font-medium px-8 py-3.5 rounded-lg transition-colors text-center">Apply for a Franchise</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="py-24 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14"><p className="text-[#C41E3A] text-sm mb-3 uppercase tracking-widest">The Process</p><h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">How It Works</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s,i)=><div key={i} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6"><div className="font-serif text-5xl font-bold text-[#2A2A2A] mb-4">{s.num}</div><h3 className="font-serif text-lg font-bold text-white mb-3">{s.title}</h3><p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p></div>)}
        </div>
      </div>
    </section>
  );
}

function TutaCapitalStrip() {
  return (
    <section className="py-16 bg-[#8B0000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div>
          <p className="text-red-300 text-sm uppercase tracking-widest mb-2">Finance Arm</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">Finance Your Floor Plan with Tuta Capital</h2>
          <p className="text-red-200 max-w-xl">NCR-registered floor plan credit facility exclusively for Tuta Cars dealer pods. Unlock up to R500,000 at the Month 6 milestone.</p>
        </div>
        <a href="https://capital.tutacars.co.za" className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-[#8B0000] font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">Visit capital.tutacars.co.za <ExternalLink size={15}/></a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div><div className="flex items-center gap-2 mb-4"><div className="w-3 h-3 bg-[#C41E3A] rounded-sm"/><span className="font-serif text-lg font-bold text-white">TUTA CARS</span></div><p className="text-gray-500 text-sm mb-3">Built on Proven Principles.</p><p className="text-gray-600 text-xs">A Luvium Holdings Company</p></div>
          <div><h4 className="font-serif text-white font-bold mb-4">Quick Links</h4><ul className="space-y-2">{["Home","Inventory","Become a Dealer","About","Contact"].map(l=><li key={l}><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">{l}</a></li>)}</ul></div>
          <div><h4 className="font-serif text-white font-bold mb-4">Territories</h4><ul className="space-y-2">{["Gauteng North","Gauteng South","Western Cape","KwaZulu-Natal","Eastern Cape"].map(t=><li key={t} className="text-gray-400 text-sm">{t}</li>)}<li className="text-[#C41E3A] text-sm">+ 49 more</li></ul></div>
          <div><h4 className="font-serif text-white font-bold mb-4">Contact</h4><ul className="space-y-3"><li className="flex items-center gap-2 text-gray-400 text-sm"><Mail size={13} className="text-[#C41E3A]"/>info@tutacars.co.za</li><li className="flex items-center gap-2 text-gray-400 text-sm"><Phone size={13} className="text-[#C41E3A]"/>+27 (0)11 000 0000</li><li className="flex items-start gap-2 text-gray-400 text-sm"><MapPin size={13} className="text-[#C41E3A] mt-0.5 flex-shrink-0"/>Sandton, Johannesburg</li></ul></div>
        </div>
        <div className="border-t border-[#2A2A2A] pt-8"><p className="text-gray-600 text-xs text-center">© 2025 Tuta Cars, a Luvium Holdings Company. RMI Member. NCR Registration Pending. All transactions subject to the National Credit Act 34 of 2005.</p></div>
      </div>
    </footer>
  );
}

export default function Home() {
  return <main><Navbar/><Hero/><InventoryGrid/><TrustBar/><FranchiseSection/><HowItWorks/><TutaCapitalStrip/><Footer/></main>;
}
