"use client";
import { useState } from "react";
import { Search, MapPin, ChevronDown, ArrowRight, Heart, Phone, Mail, Menu, X, SlidersHorizontal, Car, Fuel, Gauge, CheckCircle, ExternalLink } from "lucide-react";

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

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/95 backdrop-blur border-b border-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-3 h-3 bg-[#DC2626] rounded-sm"/>
              <span className="font-serif text-xl font-bold text-white tracking-tight">TUTA CARS</span>
            </div>
            <div className="hidden lg:flex items-center gap-1">
              {["Buy","Sell","Finance","Dealers","About"].map(l => (
                <a key={l} href="#" className="px-3 py-1.5 text-sm text-gray-400 hover:text-white rounded-md hover:bg-white/5 transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="https://capital.tutacars.co.za" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white border border-[#2A2A2A] hover:border-[#444] px-3 py-1.5 rounded-lg transition-colors">
              <ExternalLink size={12}/> Dealer Portal
            </a>
            <a href="#partner" className="bg-[#DC2626] hover:bg-[#b91c1c] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">List Your Car</a>
          </div>
          <button className="md:hidden text-white" onClick={() => setOpen(!open)}>{open ? <X size={22}/> : <Menu size={22}/>}</button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-[#1E1E1E] px-4 py-4 space-y-2">
          {["Buy","Sell","Finance","Dealers","About"].map(l => <a key={l} href="#" className="block text-sm text-gray-300 hover:text-white py-2">{l}</a>)}
          <a href="#partner" className="block bg-[#DC2626] text-white text-sm font-medium px-4 py-2.5 rounded-lg text-center mt-2">List Your Car</a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [active, setActive] = useState("All");
  const cats = ["All","Bakkie","SUV","Sedan","Hatchback","Luxury"];
  return (
    <section className="pt-16 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#DC2626]/10 border border-[#DC2626]/20 rounded-full px-3 py-1 mb-6">
            <div className="w-1.5 h-1.5 bg-[#DC2626] rounded-full animate-pulse"/>
            <span className="text-xs text-[#DC2626] font-medium">487 vehicles available nationwide</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5">
            Find your next<br/><span className="text-[#DC2626]">car with confidence</span>
          </h1>
          <p className="text-gray-400 text-lg mb-10 max-w-xl">Verified dealers. Transparent pricing. Finance options on most vehicles. 487 listings from 12 trusted dealer pods nationwide.</p>
          <div className="flex gap-2 flex-wrap mb-6">
            {cats.map(c => (
              <button key={c} onClick={() => setActive(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${active===c?"bg-[#DC2626] text-white":"bg-[#111] border border-[#2A2A2A] text-gray-400 hover:text-white hover:border-[#444]"}`}>{c}</button>
            ))}
          </div>
          <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-3 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[{label:"Make",opts:MAKES},{label:"Max Price",opts:PRICE_RANGES},{label:"Province",opts:PROVINCES}].map(({label,opts}) => (
                <div key={label} className="relative">
                  <select className="w-full bg-[#050505] border border-[#1E1E1E] text-gray-300 text-sm rounded-xl px-3 py-3 appearance-none focus:border-[#DC2626] focus:outline-none cursor-pointer">
                    {opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown size={13} className="absolute right-3 top-3.5 text-gray-600 pointer-events-none"/>
                </div>
              ))}
            </div>
            <button className="bg-[#DC2626] hover:bg-[#b91c1c] text-white font-semibold px-8 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 flex-shrink-0">
              <Search size={16}/> Search
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
          {[{value:"487",label:"Live Listings"},{value:"12",label:"Verified Dealers"},{value:"9",label:"Provinces"},{value:"100%",label:"Verified Stock"}].map(s => (
            <div key={s.label} className="bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl p-4">
              <div className="font-serif text-2xl font-bold text-[#DC2626] mb-1">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrowseByType() {
  return (
    <section className="py-14 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8"><p className="text-[#DC2626] text-xs uppercase tracking-widest mb-2">Browse</p><h2 className="font-serif text-2xl font-bold text-white">By Vehicle Type</h2></div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {BODY_TYPES.map(t => (
            <button key={t.label} className="flex flex-col items-center gap-2 bg-[#0F0F0F] hover:bg-[#161616] border border-[#1E1E1E] hover:border-[#DC2626]/40 rounded-xl p-4 transition-all group">
              <span className="text-2xl">{t.icon}</span>
              <span className="text-xs text-gray-400 group-hover:text-white font-medium">{t.label}</span>
              <span className="text-[10px] text-gray-600">{t.count}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ v }: { v: typeof LISTINGS[0] }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="bg-[#0A0A0A] border border-[#1E1E1E] rounded-2xl overflow-hidden hover:border-[#2A2A2A] transition-all">
      <div className="relative h-48" style={{ background: `linear-gradient(135deg, ${v.bg} 0%, #0a0a0a 100%)` }}>
        <div className="absolute inset-0 flex items-center justify-center"><Car size={72} className="text-white/10"/></div>
        {v.badge && <div className="absolute top-3 left-3 bg-[#DC2626] text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">{v.badge}</div>}
        {v.verified && <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 text-emerald-400 text-[10px] px-2 py-1 rounded-md border border-emerald-900/50"><CheckCircle size={10}/> Verified</div>}
        <button onClick={() => setSaved(!saved)} className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${saved?"bg-[#DC2626] text-white":"bg-black/40 text-gray-400 hover:text-white"}`}>
          <Heart size={14} fill={saved?"currentColor":"none"}/>
        </button>
      </div>
      <div className="p-4">
        <div className="mb-3"><p className="text-gray-500 text-xs mb-0.5">{v.year} · {v.dealer}</p><h3 className="font-serif font-bold text-white text-base leading-tight">{v.make} {v.model}</h3></div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[{icon:Gauge,val:v.km+" km"},{icon:Fuel,val:v.fuel},{icon:Car,val:v.trans}].map(({icon:Icon,val}) => (
            <div key={val} className="flex items-center gap-1.5 text-gray-500 text-xs"><Icon size={11} className="text-gray-600 flex-shrink-0"/><span className="truncate">{val}</span></div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-4"><MapPin size={11} className="text-gray-600"/><span className="truncate">{v.location}</span></div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold text-[#DC2626] text-lg">{fmt(v.price)}</div>
            <div className="text-[10px] text-gray-600">Finance from ~R{Math.round(v.price*0.025).toLocaleString()}/pm</div>
          </div>
          <button className="bg-[#DC2626] hover:bg-[#b91c1c] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">View</button>
        </div>
      </div>
    </div>
  );
}

function Listings() {
  return (
    <section className="py-14 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div><p className="text-[#DC2626] text-xs uppercase tracking-widest mb-2">Browse</p><h2 className="font-serif text-2xl font-bold text-white">487 Vehicles Available</h2></div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 border border-[#2A2A2A] hover:border-[#444] text-gray-400 hover:text-white text-sm px-3 py-2 rounded-xl transition-colors"><SlidersHorizontal size={14}/> Filters</button>
            <div className="relative">
              <select className="bg-[#0F0F0F] border border-[#2A2A2A] text-gray-300 text-sm rounded-xl px-3 py-2 pr-8 appearance-none focus:outline-none focus:border-[#DC2626]">
                <option>Newest First</option><option>Price: Low → High</option><option>Price: High → Low</option><option>Lowest Mileage</option>
              </select>
              <ChevronDown size={13} className="absolute right-3 top-3 text-gray-600 pointer-events-none"/>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LISTINGS.map(v => <Card key={v.id} v={v}/>)}
        </div>
        <div className="text-center mt-10">
          <button className="border border-[#2A2A2A] hover:border-white text-gray-300 hover:text-white text-sm font-medium px-10 py-3.5 rounded-xl transition-colors">Load more listings</button>
        </div>
      </div>
    </section>
  );
}

function Dealers() {
  return (
    <section className="py-14 bg-[#080808] border-y border-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8"><p className="text-[#DC2626] text-xs uppercase tracking-widest mb-2">Our Network</p><h2 className="font-serif text-2xl font-bold text-white">Featured Dealers</h2></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {DEALERS.map(d => (
            <div key={d.id} className="bg-[#0A0A0A] border border-[#1E1E1E] hover:border-[#2A2A2A] rounded-2xl p-5 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-[#DC2626]/10 border border-[#DC2626]/20 flex items-center justify-center"><div className="w-2 h-2 bg-[#DC2626] rounded-sm"/></div>
                <span className="text-xs text-emerald-400 bg-emerald-900/20 border border-emerald-900/40 px-2 py-0.5 rounded-full">Verified</span>
              </div>
              <h3 className="font-serif font-bold text-white mb-1">{d.name}</h3>
              <p className="text-xs text-gray-500 flex items-center gap-1 mb-4"><MapPin size={10}/>{d.location}</p>
              <div className="flex items-center justify-between text-xs text-gray-400 border-t border-[#1E1E1E] pt-4">
                <span>{d.units} vehicles</span><span className="text-amber-400">★ {d.rating} ({d.reviews})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Finance() {
  return (
    <section className="py-14 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0F0F0F] to-[#141414] border border-[#2A2A2A] rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[#DC2626] text-xs uppercase tracking-widest mb-3">Tuta Capital</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">Get pre-approved in minutes</h2>
            <p className="text-gray-400 max-w-lg">Finance options available on most vehicles. Competitive rates, flexible terms. Tuta Capital makes vehicle ownership accessible to all South Africans.</p>
          </div>
          <div className="flex-shrink-0 flex flex-col gap-3">
            <button className="bg-[#DC2626] hover:bg-[#b91c1c] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors whitespace-nowrap">Apply for Finance</button>
            <button className="border border-[#2A2A2A] hover:border-white text-gray-300 hover:text-white text-sm px-8 py-3 rounded-xl transition-colors whitespace-nowrap text-center">Calculate Repayment</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Partner() {
  const [done, setDone] = useState(false);
  const [f, setF] = useState({ name:"", email:"", phone:"", province:"", type:"individual" });
  return (
    <section id="partner" className="py-16 bg-[#0A0A0A] border-t border-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[#DC2626] text-xs uppercase tracking-widest mb-3">Dealer Opportunity</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-5">Sell cars under the Tuta Cars brand</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">We're expanding our dealer network across South Africa. If you're looking to operate a professional, technology-backed dealership with access to floor plan finance and a national buyer base — we want to hear from you.</p>
            <div className="space-y-4 mb-8">
              {["Exclusive territory — one pod per area","Technology platform to manage your entire stock","Access to vehicle floor plan finance","Nationwide marketing and lead generation","RMI & NADA compliance support"].map(b => (
                <div key={b} className="flex items-center gap-3"><CheckCircle size={16} className="text-[#DC2626] flex-shrink-0"/><span className="text-gray-300 text-sm">{b}</span></div>
              ))}
            </div>
            <p className="text-gray-600 text-sm italic">Complete the form to receive our full dealer information pack, territory map, and fee structure.</p>
          </div>
          <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6">
            {done ? (
              <div className="text-center py-10">
                <CheckCircle size={48} className="text-[#DC2626] mx-auto mb-4"/>
                <h3 className="font-serif text-xl font-bold text-white mb-2">Interest Registered!</h3>
                <p className="text-gray-400 text-sm">We'll send our full dealer pack to {f.email} within 1 business day.</p>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-lg font-bold text-white mb-1">Register Your Interest</h3>
                <p className="text-gray-500 text-sm mb-6">Takes 60 seconds. No commitment required.</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="text-xs text-gray-500 mb-1 block">Full Name</label><input value={f.name} onChange={e=>setF({...f,name:e.target.value})} placeholder="Your name" className="w-full bg-[#050505] border border-[#2A2A2A] text-white text-sm rounded-xl px-3 py-2.5 focus:border-[#DC2626] focus:outline-none placeholder:text-gray-700"/></div>
                    <div><label className="text-xs text-gray-500 mb-1 block">Phone</label><input value={f.phone} onChange={e=>setF({...f,phone:e.target.value})} placeholder="+27 ..." className="w-full bg-[#050505] border border-[#2A2A2A] text-white text-sm rounded-xl px-3 py-2.5 focus:border-[#DC2626] focus:outline-none placeholder:text-gray-700"/></div>
                  </div>
                  <div><label className="text-xs text-gray-500 mb-1 block">Email Address</label><input value={f.email} onChange={e=>setF({...f,email:e.target.value})} placeholder="you@example.com" className="w-full bg-[#050505] border border-[#2A2A2A] text-white text-sm rounded-xl px-3 py-2.5 focus:border-[#DC2626] focus:outline-none placeholder:text-gray-700"/></div>
                  <div><label className="text-xs text-gray-500 mb-1 block">Preferred Territory</label><div className="relative"><select value={f.province} onChange={e=>setF({...f,province:e.target.value})} className="w-full bg-[#050505] border border-[#2A2A2A] text-gray-300 text-sm rounded-xl px-3 py-2.5 appearance-none focus:border-[#DC2626] focus:outline-none"><option value="">Select province</option>{PROVINCES.slice(1).map(p=><option key={p}>{p}</option>)}</select><ChevronDown size={13} className="absolute right-3 top-3 text-gray-600 pointer-events-none"/></div></div>
                  <div><label className="text-xs text-gray-500 mb-2 block">I am interested as a</label><div className="flex gap-3">{["individual","existing dealer","investor"].map(t=><button key={t} onClick={()=>setF({...f,type:t})} className={`flex-1 text-xs py-2 rounded-lg border transition-colors capitalize ${f.type===t?"bg-[#DC2626]/10 border-[#DC2626]/40 text-white":"border-[#2A2A2A] text-gray-500 hover:border-[#444]"}`}>{t}</button>)}</div></div>
                  <button onClick={()=>f.name&&f.email&&setDone(true)} className="w-full bg-[#DC2626] hover:bg-[#b91c1c] text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">Send Me the Dealer Pack <ArrowRight size={15}/></button>
                  <p className="text-center text-gray-600 text-[11px]">We respond within 1 business day. Your details are never shared.</p>
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
  return (
    <footer className="bg-[#030303] border-t border-[#111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div><div className="flex items-center gap-2 mb-4"><div className="w-3 h-3 bg-[#DC2626] rounded-sm"/><span className="font-serif text-lg font-bold text-white">TUTA CARS</span></div><p className="text-gray-600 text-sm mb-3">South Africa's verified dealer network. 487 listings. 12 trusted dealers. Nationwide.</p><p className="text-gray-700 text-xs">A Luvium Holdings Company</p></div>
          <div><h4 className="font-serif text-white font-bold mb-4 text-sm">Buy</h4><ul className="space-y-2">{["Browse All Cars","Bakkies & Trucks","SUVs","Luxury Cars","Under R200k","Under R300k"].map(l=><li key={l}><a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">{l}</a></li>)}</ul></div>
          <div><h4 className="font-serif text-white font-bold mb-4 text-sm">Services</h4><ul className="space-y-2">{["Vehicle Finance","Trade-In Valuation","Dealer Portal","Become a Partner","About Tuta Cars"].map(l=><li key={l}><a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">{l}</a></li>)}</ul></div>
          <div><h4 className="font-serif text-white font-bold mb-4 text-sm">Contact</h4><ul className="space-y-3"><li className="flex items-center gap-2 text-gray-500 text-sm"><Mail size={13} className="text-[#DC2626]"/>info@tutacars.co.za</li><li className="flex items-center gap-2 text-gray-500 text-sm"><Phone size={13} className="text-[#DC2626]"/>+27 (0)11 000 0000</li><li className="flex items-center gap-2 text-gray-500 text-sm"><MapPin size={13} className="text-[#DC2626]"/>Sandton, Johannesburg</li></ul></div>
        </div>
        <div className="border-t border-[#111] pt-8"><p className="text-gray-700 text-xs text-center">© 2025 Tuta Cars, a Luvium Holdings Company. RMI Member. NCR Registration Pending. All transactions subject to the National Credit Act 34 of 2005.</p></div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen">
      <Navbar/><Hero/><BrowseByType/><Listings/><Dealers/><Finance/><Partner/><Footer/>
    </main>
  );
        }
