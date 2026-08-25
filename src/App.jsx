import React, { useState, useEffect, useCallback } from "react";
import {
  Shield, MapPin, Camera, Video, Home, Trees, Building2, Landmark,
  FileCheck, Users, ClipboardList, Stamp, ChevronRight, LogIn, LogOut,
  Plus, X, CheckCircle2, Clock, MessageSquare, Send, ExternalLink,
  UserPlus, Search, ArrowLeft, Sprout, Fence, Eye, Phone, Mail,
  KeyRound, AlertCircle, ArrowUp
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const mapIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--clay); fill: rgba(140,74,47,0.2);"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
const customIcon = new L.DivIcon({ html: mapIconSvg, className: '', iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -30] });
const MAP_LOCATIONS = [
  { name: "Rajajinagar 2nd Stage", type: "Apartment", coords: [12.9900, 77.5533] },
  { name: "Malleshwaram", type: "Independent House", coords: [13.0031, 77.5714] },
  { name: "Doddaballapur", type: "Plot", coords: [13.2924, 77.5430] },
  { name: "Nelamangala", type: "Plot", coords: [13.0978, 77.3941] },
  { name: "Dabaspet", type: "Industrial Land", coords: [13.2280, 77.2343] },
  { name: "KR Puram", type: "Flat in Apartment", coords: [13.0076, 77.6953] },
  { name: "Konanakunte Cross", type: "Flat in Apartment", coords: [12.8837, 77.5724] },
];

function LocationsMap() {
  return (
    <div className="px-6 sm:px-10 py-16 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
      <h2 className="tw-display font-bold text-2xl mb-2">Currently serving locations</h2>
      <p className="tw-body text-sm mb-8" style={{ opacity: 0.7 }}>A snapshot of properties we manage across Karnataka.</p>
      <div className="w-full h-[400px] sm:h-[500px] rounded-xl overflow-hidden shadow-sm relative z-0" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
        <MapContainer center={[13.05, 77.5]} zoom={10} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
          <TileLayer attribution='&amp;copy; &lt;a href="https://www.openstreetmap.org/copyright"&gt;OpenStreetMap&lt;/a&gt;' url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
          {MAP_LOCATIONS.map((loc, i) => (
            <Marker key={i} position={loc.coords} icon={customIcon}>
              <Popup>
                <div className="tw-body font-semibold">{loc.name}</div>
                <div className="tw-mono text-[10px] uppercase mt-1" style={{ color: "var(--clay)" }}>{loc.type}</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

const WhatsAppIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.22 5.22 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

function FloatingControls() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      setScrollProgress(scroll);
      setShowTopBtn(totalScroll > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 h-1.5 z-[100] transition-all duration-150" style={{ width: `${scrollProgress * 100}%`, background: "var(--brass)" }} />
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
        {showTopBtn && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="p-3 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.15)] border hover:scale-105 transition-transform" style={{ borderColor: "rgba(30,42,47,0.1)", color: "var(--ink)" }}>
            <ArrowUp size={20} />
          </button>
        )}
        <a href="https://wa.me/919448610107" target="_blank" rel="noreferrer" className="p-3.5 rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:scale-105 transition-transform flex items-center justify-center text-white" style={{ background: "#25D366" }}>
          <WhatsAppIcon size={26} />
        </a>
      </div>
    </>
  );
}

/* ---------- storage helpers ---------- */
const DB_KEYS = {
  admin: "trustwork-admin-account",
  customers: "trustwork-customers-db",
  properties: "trustwork-properties-db",
  cases: "trustwork-cases-db",
};

async function loadDb(key, fallback) {
  try {
    const res = await window.storage.get(key, true);
    return res ? JSON.parse(res.value) : fallback;
  } catch {
    return fallback;
  }
}
async function saveDb(key, value) {
  try {
    await window.storage.set(key, JSON.stringify(value), true);
  } catch (e) {
    console.error("storage save failed", e);
  }
}

const pad = (n, w) => String(n).padStart(w, "0");
const todayISO = () => new Date().toISOString().slice(0, 10);
const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

const PLANS = [
  { id: "essential", name: "Essential Watch", visits: "1 visit / month", media: "Up to 6 photos", price: "Entry tier" },
  { id: "standard", name: "Standard Watch", visits: "2 visits / month", media: "Unlimited photos + 1 video", price: "Mid tier" },
  { id: "premium", name: "Premium Watch", visits: "4 visits / month", media: "Unlimited photos + video + live call", price: "Top tier" },
];

const PROPERTY_TYPES = ["Vacant Plot", "Agricultural Land", "Commercial Land", "Flat / Apartment", "Independent House", "Villa"];

/* ---------- small UI atoms ---------- */
function Seal({ size = 44, label }) {
  return (
    <div
      className="relative shrink-0 rounded-full flex items-center justify-center border-2"
      style={{
        width: size, height: size,
        borderColor: "var(--brass)",
        background: "radial-gradient(circle at 35% 30%, rgba(184,134,59,0.18), rgba(184,134,59,0.05))",
      }}
    >
      <div className="absolute inset-1 rounded-full border" style={{ borderColor: "rgba(184,134,59,0.5)" }} />
      <Stamp size={size * 0.42} style={{ color: "var(--brass)" }} strokeWidth={1.6} />
      {label ? (
        <span className="absolute -bottom-2 text-[8px] tracking-[0.2em] font-mono" style={{ color: "var(--brass)" }}>
          {label}
        </span>
      ) : null}
    </div>
  );
}

function Badge({ children, tone = "moss" }) {
  const tones = {
    moss: { bg: "rgba(75,93,69,0.12)", fg: "var(--moss)" },
    brass: { bg: "rgba(184,134,59,0.14)", fg: "var(--brass)" },
    clay: { bg: "rgba(140,74,47,0.12)", fg: "var(--clay)" },
    ink: { bg: "rgba(30,42,47,0.08)", fg: "var(--ink)" },
  };
  const t = tones[tone] || tones.ink;
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wide uppercase"
      style={{ background: t.bg, color: t.fg }}
    >
      {children}
    </span>
  );
}

function Field({ label, children }) {
  return (
    <label className="block mb-4">
      <span className="block text-xs font-mono uppercase tracking-wider mb-1.5" style={{ color: "var(--ink)", opacity: 0.6 }}>
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full px-3.5 py-2.5 rounded-md border bg-white outline-none transition-colors focus:ring-2";
const inputStyle = { borderColor: "rgba(30,42,47,0.18)" };

const TESTIMONIALS = [
  { name: "Rahul S.", role: "NRI Investor", text: "TrustWork has given me absolute peace of mind. I get photos of my plot in Bangalore every month while sitting in Dubai." },
  { name: "Ananya M.", role: "Property Owner", text: "I used to worry about my vacant villa, but their regular visits and video walkthroughs are fantastic. Highly recommended!" },
  { name: "Vikram K.", role: "Landlord", text: "Finding a reliable person to check on my property was a headache. Now I just check the TrustWork dashboard." },
  { name: "Priya D.", role: "NRI Resident", text: "The team is very responsive. The video call support feature makes me feel like I'm standing right there on my land." },
  { name: "Suresh R.", role: "Plot Owner", text: "Best 1 rupee per sq ft I've ever spent. Kept my land safe from encroachments and dumping. True professionals." }
];

function StatItem({ end, label, suffix = "+" }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef();
  const animationRef = React.useRef(null);

  const runAnimation = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    let startTime = null;
    const duration = 2000;
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    animationRef.current = requestAnimationFrame(animate);
  }, [end]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
        runAnimation();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible, runAnimation]);

  return (
    <div ref={ref} onMouseEnter={runAnimation} className="text-center p-4 cursor-default">
      <div className="tw-display font-bold text-4xl mb-1 text-white">
        {count}{suffix}
      </div>
      <div className="tw-mono text-[11px] uppercase tracking-wider" style={{ color: "rgba(246,241,231,0.6)" }}>
        {label}
      </div>
    </div>
  );
}

function Stats() {
  return (
    <div className="px-6 sm:px-10 py-10 animate-fade-in-up w-full" style={{ background: "var(--blueprint)", borderTop: "1px solid rgba(246,241,231,0.1)", animationDelay: "0.15s" }}>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(246,241,231,0.1)]">
        <StatItem end={10} label="Years of experience" />
        <StatItem end={30} label="Projects currently handling" />
        <StatItem end={20} label="Dedicated Field Crew" />
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <div className="py-16 overflow-hidden animate-fade-in-up w-full flex flex-col" style={{ background: "rgba(184,134,59,0.03)", animationDelay: "0.35s" }}>
      <div className="max-w-5xl mx-auto px-6 sm:px-10 mb-8 w-full">
        <h2 className="tw-display font-bold text-2xl">What our clients say</h2>
        <p className="tw-body text-sm mt-1" style={{ opacity: 0.65 }}>Join hundreds of relaxed property owners</p>
      </div>
      <div className="relative w-full overflow-hidden flex">
        <div className="flex animate-marquee gap-6 px-6 w-max">
          {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div key={i} className={`w-[300px] sm:w-[340px] shrink-0 p-6 rounded-xl bg-white shadow-sm hover:-translate-y-1 transition-transform cursor-default ${i % 2 === 0 ? "rotate-2" : "-rotate-2"}`} style={{ border: "1px solid rgba(30,42,47,0.08)" }}>
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map(s => <span key={s} className="text-[14px]" style={{ color: "var(--brass)" }}>★</span>)}
              </div>
              <p className="tw-body text-[15px] mb-4 leading-relaxed" style={{ color: "var(--ink)", opacity: 0.85 }}>"{t.text}"</p>
              <div className="tw-body text-sm font-bold">{t.name}</div>
              <div className="tw-mono text-[10px] uppercase tracking-wide mt-1" style={{ opacity: 0.5 }}>{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= LANDING ================= */
function Landing({ onLogin }) {
  const services = [
    {
      icon: Trees, title: "Vacant Plot & Land",
      items: ["Physical site inspection, geo & time tagged photos/video", "Live video walkthrough on request",
        "Measurement by government-approved surveyor", "Fencing, compound wall & site cleaning",
        "Encroachment and neighbouring construction watch", "Tax, EC, Katha & certificate handling",
        "Buyer/seller matching when you're ready to trade"],
    },
    {
      icon: Home, title: "Flat, Villa & House",
      items: ["Physical inspection, geo & time tagged photos/video", "Tenant check-in, check-out & periodic inspection",
        "Rent collection & rental agreements", "To-let advertising & tenant scrutiny",
        "Tax, EC, Katha & certificate handling", "Buyer/seller matching when you're ready to trade"],
    },
  ];
  const steps = [
    { title: "Register", desc: "Sign a care agreement and add your property with its map location." },
    { title: "We watch", desc: "Our team visits on your chosen schedule and logs photos, video and notes." },
    { title: "You track", desc: "Open your dashboard anytime to see visit history, updates and nearby developments." },
  ];

  return (
    <div style={{ background: "var(--paper)", color: "var(--ink)" }} className="min-h-full">
      <FloatingControls />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;700&family=Source+Sans+3:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .tw-display { font-family: 'Zilla Slab', serif; }
        .tw-body { font-family: 'Source Sans 3', sans-serif; }
        .tw-mono { font-family: 'IBM Plex Mono', monospace; }
      `}</style>

      {/* NAV */}
      <div className="flex items-center justify-between px-6 sm:px-10 py-5 animate-fade-in-up" style={{ borderBottom: "1px solid rgba(30,42,47,0.1)" }}>
        <div className="flex items-center gap-2.5 tw-body">
          <Seal size={34} />
          <div className="leading-tight">
            <div className="tw-display font-bold text-[17px]">TrustWork</div>
            <div className="text-[10px] tw-mono tracking-[0.18em] uppercase" style={{ opacity: 0.6 }}>Property Care</div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <a href="tel:+919448610107" className="hidden sm:flex items-center gap-1.5 tw-body font-semibold text-sm hover:opacity-70 transition-opacity" style={{ color: "var(--ink)" }}>
            <Phone size={15} /> +91 9448610107
          </a>
          <button
            onClick={onLogin}
            className="tw-body flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold text-white"
            style={{ background: "var(--blueprint)" }}
          >
            <LogIn size={15} /> Login
          </button>
        </div>
      </div>

      {/* HERO */}
      <div className="px-6 sm:px-10 py-16 sm:py-24 animate-fade-in-up" style={{ background: "var(--blueprint)", animationDelay: "0.1s" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-col items-center justify-center mb-6 gap-5">
            <Seal size={64} label="EST. 2026" />
            <div className="inline-block px-4 py-1.5 rounded-full border tw-body text-sm font-semibold shadow-sm" style={{ borderColor: "rgba(184,134,59,0.4)", color: "var(--brass)", background: "rgba(184,134,59,0.15)" }}>
              ✨ Get Your Property Watched just @ ₹1/sq.ft per month
            </div>
          </div>
          <h1 className="tw-display font-bold text-white text-4xl sm:text-5xl md:text-6xl leading-[1.1]">
            Stay away.<br />Stay relaxed.
          </h1>
          <p className="tw-body mt-6 text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "rgba(246,241,231,0.78)" }}>
            We take care of your property like a family member. Enjoy absolute peace of mind with
            <span className="text-white font-semibold block mt-1">regular updates, continuous property watch, on-demand call support, and video walkthroughs.</span>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={onLogin} className="tw-body px-6 py-3 rounded-md font-semibold" style={{ background: "var(--brass)", color: "var(--blueprint)" }}>
              Get your property watched
            </button>
            <button onClick={onLogin} className="tw-body px-6 py-3 rounded-md font-semibold border" style={{ borderColor: "rgba(246,241,231,0.35)", color: "#F6F1E7" }}>
              Client / Admin login
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <Stats />

      {/* HOW IT WORKS */}
      <div className="px-6 sm:px-10 py-16 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="tw-display font-bold text-2xl mb-8">How it works</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="p-5 rounded-lg bg-white" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
              <div className="tw-mono text-xs mb-3" style={{ color: "var(--brass)" }}>STEP {pad(i + 1, 2)}</div>
              <div className="tw-display font-bold text-lg mb-1.5">{s.title}</div>
              <p className="tw-body text-sm" style={{ opacity: 0.72 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MAP */}
      <LocationsMap />

      {/* SERVICES */}
      <div className="px-6 sm:px-10 py-16 animate-fade-in-up" style={{ background: "rgba(30,42,47,0.03)", animationDelay: "0.3s" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="tw-display font-bold text-2xl mb-8">What we take off your plate</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((s) => (
              <div key={s.title} className="p-6 rounded-lg bg-white" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-md" style={{ background: "rgba(140,74,47,0.1)" }}>
                    <s.icon size={20} style={{ color: "var(--clay)" }} />
                  </div>
                  <div className="tw-display font-bold text-lg">{s.title}</div>
                </div>
                <ul className="space-y-2">
                  {s.items.map((it) => (
                    <li key={it} className="tw-body text-sm flex gap-2" style={{ opacity: 0.78 }}>
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: "var(--moss)" }} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6 p-5 rounded-lg bg-white flex items-start gap-3" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
            <Landmark size={20} className="mt-0.5 shrink-0" style={{ color: "var(--brass)" }} />
            <p className="tw-body text-sm" style={{ opacity: 0.78 }}>
              We also track local market rates, upcoming projects nearby and give you a
              read on new investment opportunities in and around your area.
            </p>
          </div>
        </div>
      </div>

      <Testimonials />

      {/* PLANS */}
      <div className="px-6 sm:px-10 py-16 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="tw-display font-bold text-2xl mb-2">Care plans</h2>
        <p className="tw-body text-sm mb-8" style={{ opacity: 0.7 }}>Pick a visit rhythm — change it anytime from your dashboard.</p>
        <div className="grid sm:grid-cols-3 gap-6">
          {PLANS.map((p) => (
            <div key={p.id} className="p-6 rounded-lg" style={{ background: "var(--blueprint)" }}>
              <Badge tone="brass">{p.price}</Badge>
              <div className="tw-display font-bold text-white text-xl mt-3">{p.name}</div>
              <div className="tw-body text-sm mt-3 space-y-1.5" style={{ color: "rgba(246,241,231,0.78)" }}>
                <div className="flex gap-2 items-center"><Eye size={14} /> {p.visits}</div>
                <div className="flex gap-2 items-center"><Camera size={14} /> {p.media}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 animate-fade-in-up" style={{ borderTop: "1px solid rgba(30,42,47,0.1)", animationDelay: "0.5s" }}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="tw-mono text-xs" style={{ opacity: 0.55 }}>TrustWork Property Care · Karnataka & across India</div>
            <div className="hidden sm:block text-xs" style={{ opacity: 0.3 }}>|</div>
            <div className="tw-mono text-xs flex items-center gap-1.5" style={{ opacity: 0.75 }}>
               <Phone size={11} /> +91 9448610107
            </div>
          </div>
          <div className="tw-mono text-xs flex items-center gap-1.5" style={{ opacity: 0.55 }}>
            <MapPin size={11} /> Rajajinagar 2nd Stage, Bangalore - 560010
          </div>
        </div>
        <button onClick={onLogin} className="tw-body text-sm font-semibold flex items-center gap-1 shrink-0" style={{ color: "var(--clay)" }}>
          Client / Admin login <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

/* ================= LOGIN ================= */
function LoginScreen({ onBack, onCustomerLogin, onAdminLogin, ensureAdminSeed, dbs }) {
  const [role, setRole] = useState("customer");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { ensureAdminSeed(); }, []);

  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (role === "admin") {
      const admin = dbs.admin;
      if (admin && id.trim() === admin.username && password === admin.password) {
        onAdminLogin();
      } else {
        setError("Incorrect admin username or password.");
      }
    } else {
      const cust = Object.values(dbs.customers || {}).find(
        (c) => c.id.toLowerCase() === id.trim().toLowerCase() && c.password === password
      );
      if (cust) onCustomerLogin(cust.id);
      else setError("We couldn't match that customer ID and password.");
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center px-6 py-16" style={{ background: "var(--paper)" }}>
      <style>{`
        .tw-display { font-family: 'Zilla Slab', serif; } .tw-body { font-family: 'Source Sans 3', sans-serif; } .tw-mono { font-family: 'IBM Plex Mono', monospace; }
      `}</style>
      <div className="w-full max-w-sm">
        <button onClick={onBack} className="tw-body text-sm flex items-center gap-1 mb-6" style={{ color: "var(--ink)", opacity: 0.6 }}>
          <ArrowLeft size={14} /> Back
        </button>
        <div className="flex justify-center mb-5"><Seal size={48} /></div>
        <h1 className="tw-display font-bold text-2xl text-center mb-1">Welcome back</h1>
        <p className="tw-body text-sm text-center mb-6" style={{ opacity: 0.65 }}>Log in to your property care dashboard.</p>

        <div className="flex rounded-md p-1 mb-6" style={{ background: "rgba(30,42,47,0.06)" }}>
          {["customer", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => { setRole(r); setError(""); }}
              className="flex-1 py-2 rounded-md text-sm font-semibold tw-body capitalize transition-colors"
              style={role === r ? { background: "var(--blueprint)", color: "white" } : { color: "var(--ink)", opacity: 0.6 }}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="p-6 rounded-lg bg-white" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
          <Field label={role === "admin" ? "Admin username" : "Customer ID"}>
            <input className={inputCls} style={inputStyle} value={id} onChange={(e) => setId(e.target.value)}
              placeholder={role === "admin" ? "admin" : "TW-2026-0001"} required />
          </Field>
          <Field label="Password">
            <input type="password" className={inputCls} style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Field>
          {error ? (
            <div className="flex items-center gap-2 text-sm mb-4" style={{ color: "var(--clay)" }}>
              <AlertCircle size={15} /> {error}
            </div>
          ) : null}
          <button type="submit" className="w-full py-2.5 rounded-md font-semibold text-white tw-body" style={{ background: "var(--brass)", color: "var(--blueprint)" }}>
            Log in
          </button>
          {role === "admin" ? (
            <p className="tw-mono text-[11px] mt-4 text-center" style={{ opacity: 0.5 }}>Demo admin — admin / admin123</p>
          ) : (
            <p className="tw-body text-[12px] mt-4 text-center" style={{ opacity: 0.55 }}>
              New here? Ask TrustWork admin to create your customer ID.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

/* ================= SHARED SHELL ================= */
function Shell({ title, subtitle, onLogout, children }) {
  return (
    <div className="min-h-full" style={{ background: "var(--paper)", color: "var(--ink)" }}>
      <style>{`
        .tw-display { font-family: 'Zilla Slab', serif; } .tw-body { font-family: 'Source Sans 3', sans-serif; } .tw-mono { font-family: 'IBM Plex Mono', monospace; }
      `}</style>
      <div className="px-6 sm:px-10 py-5 flex items-center justify-between" style={{ background: "var(--blueprint)" }}>
        <div className="flex items-center gap-3">
          <Seal size={36} />
          <div className="leading-tight">
            <div className="tw-display font-bold text-white text-[16px]">{title}</div>
            <div className="tw-mono text-[10px] tracking-widest uppercase" style={{ color: "rgba(246,241,231,0.6)" }}>{subtitle}</div>
          </div>
        </div>
        <button onClick={onLogout} className="tw-body flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#F6F1E7" }}>
          <LogOut size={15} /> Log out
        </button>
      </div>
      <div className="px-6 sm:px-10 py-8 max-w-5xl mx-auto">{children}</div>
    </div>
  );
}

function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 mb-7 p-1 rounded-md w-fit" style={{ background: "rgba(30,42,47,0.06)" }}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className="tw-body px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-1.5 transition-colors"
          style={active === t.id ? { background: "var(--blueprint)", color: "white" } : { color: "var(--ink)", opacity: 0.6 }}
        >
          <t.icon size={14} /> {t.label}
        </button>
      ))}
    </div>
  );
}

/* ================= CUSTOMER DASHBOARD ================= */
function CustomerDashboard({ customer, dbs, refresh, onLogout }) {
  const [tab, setTab] = useState("properties");
  const [showAdd, setShowAdd] = useState(false);
  const [openProp, setOpenProp] = useState(null);
  const [caseForm, setCaseForm] = useState({ subject: "", message: "", propertyId: "" });

  const myProps = Object.values(dbs.properties || {}).filter((p) => p.customerId === customer.id);
  const myCases = Object.values(dbs.cases || {}).filter((c) => c.customerId === customer.id)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const addProperty = async (form) => {
    const props = { ...dbs.properties };
    const propId = `PLOT-${Date.now().toString().slice(-6)}`;
    props[propId] = {
      id: propId, customerId: customer.id, type: form.type, title: form.title,
      address: form.address, mapLink: form.mapLink, plan: form.plan,
      status: "pending", createdAt: todayISO(), visits: [],
    };
    await saveDb(DB_KEYS.properties, props);
    refresh();
    setShowAdd(false);
  };

  const changePlan = async (propId, planId) => {
    const props = { ...dbs.properties };
    props[propId] = { ...props[propId], plan: planId };
    await saveDb(DB_KEYS.properties, props);
    refresh();
  };

  const submitCase = async (e) => {
    e.preventDefault();
    if (!caseForm.subject.trim() || !caseForm.message.trim()) return;
    const cases = { ...dbs.cases };
    const caseId = `CASE-${Date.now().toString().slice(-6)}`;
    cases[caseId] = {
      id: caseId, customerId: customer.id, propertyId: caseForm.propertyId || null,
      subject: caseForm.subject, message: caseForm.message, status: "open",
      response: "", createdAt: todayISO(),
    };
    await saveDb(DB_KEYS.cases, cases);
    refresh();
    setCaseForm({ subject: "", message: "", propertyId: "" });
  };

  if (openProp) {
    const p = dbs.properties[openProp];
    return (
      <Shell title="TrustWork" subtitle={`Customer · ${customer.id}`} onLogout={onLogout}>
        <button onClick={() => setOpenProp(null)} className="tw-body text-sm flex items-center gap-1 mb-5" style={{ opacity: 0.6 }}>
          <ArrowLeft size={14} /> All properties
        </button>
        <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
          <div>
            <div className="tw-display font-bold text-2xl">{p.title}</div>
            <div className="tw-body text-sm flex items-center gap-1.5 mt-1" style={{ opacity: 0.65 }}>
              <MapPin size={14} /> {p.address}
              {p.mapLink ? (
                <a href={p.mapLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 underline" style={{ color: "var(--clay)" }}>
                  map <ExternalLink size={11} />
                </a>
              ) : null}
            </div>
          </div>
          <Badge tone={p.status === "active" ? "moss" : "brass"}>
            {p.status === "active" ? "Active" : "Pending approval"}
          </Badge>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-8">
          {PLANS.map((pl) => (
            <button key={pl.id} onClick={() => changePlan(p.id, pl.id)}
              className="p-4 rounded-lg text-left transition-colors"
              style={p.plan === pl.id ? { background: "var(--blueprint)", color: "white" } : { background: "white", border: "1px solid rgba(30,42,47,0.1)" }}>
              <div className="tw-body font-semibold text-sm">{pl.name}</div>
              <div className="tw-mono text-[11px] mt-1" style={{ opacity: 0.7 }}>{pl.visits}</div>
            </button>
          ))}
        </div>

        <div className="tw-display font-bold text-lg mb-4">Visit &amp; update log</div>
        {(!p.visits || p.visits.length === 0) ? (
          <div className="p-6 rounded-lg text-center tw-body text-sm" style={{ background: "white", border: "1px dashed rgba(30,42,47,0.2)", opacity: 0.6 }}>
            No visits logged yet — once TrustWork's caretaker visits, entries will appear here.
          </div>
        ) : (
          <div className="space-y-4">
            {[...p.visits].reverse().map((v, i) => (
              <div key={i} className="p-5 rounded-lg bg-white flex gap-4" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
                <Seal size={40} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="tw-body font-semibold text-sm">{v.kind === "development" ? "Development update" : "Inspection visit"}</span>
                    <span className="tw-mono text-[11px]" style={{ opacity: 0.55 }}>{fmtDate(v.date)}</span>
                  </div>
                  <p className="tw-body text-sm mt-1.5" style={{ opacity: 0.78 }}>{v.notes}</p>
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    {(v.photos || []).map((url, idx) => (
                      <a key={idx} href={url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-md tw-mono" style={{ background: "rgba(75,93,69,0.1)", color: "var(--moss)" }}>
                        <Camera size={11} /> photo {idx + 1}
                      </a>
                    ))}
                    {v.video ? (
                      <a href={v.video} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-md tw-mono" style={{ background: "rgba(140,74,47,0.1)", color: "var(--clay)" }}>
                        <Video size={11} /> video
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Shell>
    );
  }

  return (
    <Shell title="TrustWork" subtitle={`Customer · ${customer.id}`} onLogout={onLogout}>
      <div className="mb-6">
        <div className="tw-display font-bold text-2xl">Hello, {customer.name.split(" ")[0]}</div>
        <p className="tw-body text-sm mt-1" style={{ opacity: 0.65 }}>Here's what's happening with your property.</p>
      </div>

      <Tabs
        tabs={[
          { id: "properties", label: "My properties", icon: Landmark },
          { id: "cases", label: "My cases", icon: MessageSquare },
        ]}
        active={tab} onChange={setTab}
      />

      {tab === "properties" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="tw-mono text-xs" style={{ opacity: 0.55 }}>{myProps.length} PROPERT{myProps.length === 1 ? "Y" : "IES"}</div>
            <button onClick={() => setShowAdd(true)} className="tw-body flex items-center gap-1.5 text-sm font-semibold px-3.5 py-2 rounded-md text-white" style={{ background: "var(--blueprint)" }}>
              <Plus size={15} /> Register property
            </button>
          </div>
          {myProps.length === 0 ? (
            <div className="p-10 rounded-lg text-center" style={{ background: "white", border: "1px dashed rgba(30,42,47,0.2)" }}>
              <Landmark size={28} className="mx-auto mb-2" style={{ opacity: 0.4 }} />
              <p className="tw-body text-sm" style={{ opacity: 0.6 }}>No properties yet. Register one to get started.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {myProps.map((p) => (
                <button key={p.id} onClick={() => setOpenProp(p.id)} className="text-left p-5 rounded-lg bg-white hover:shadow-sm transition-shadow" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
                  <div className="flex justify-between items-start gap-2">
                    <Badge tone="ink">{p.type}</Badge>
                    <Badge tone={p.status === "active" ? "moss" : "brass"}>{p.status === "active" ? "Active" : "Pending"}</Badge>
                  </div>
                  <div className="tw-display font-bold text-lg mt-3">{p.title}</div>
                  <div className="tw-body text-sm flex items-center gap-1.5 mt-1" style={{ opacity: 0.6 }}>
                    <MapPin size={13} /> {p.address}
                  </div>
                  <div className="tw-mono text-[11px] mt-3" style={{ opacity: 0.5 }}>{(p.visits || []).length} visit(s) logged</div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "cases" && (
        <div className="grid sm:grid-cols-2 gap-6">
          <form onSubmit={submitCase} className="p-5 rounded-lg bg-white h-fit" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
            <div className="tw-display font-bold text-base mb-4">Raise a case</div>
            {myProps.length > 0 && (
              <Field label="Property (optional)">
                <select className={inputCls} style={inputStyle} value={caseForm.propertyId} onChange={(e) => setCaseForm({ ...caseForm, propertyId: e.target.value })}>
                  <option value="">General query</option>
                  {myProps.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
                </select>
              </Field>
            )}
            <Field label="Subject">
              <input className={inputCls} style={inputStyle} value={caseForm.subject} onChange={(e) => setCaseForm({ ...caseForm, subject: e.target.value })} required />
            </Field>
            <Field label="Message">
              <textarea className={inputCls} style={inputStyle} rows={4} value={caseForm.message} onChange={(e) => setCaseForm({ ...caseForm, message: e.target.value })} required />
            </Field>
            <button type="submit" className="w-full py-2.5 rounded-md font-semibold text-white tw-body flex items-center justify-center gap-2" style={{ background: "var(--brass)", color: "var(--blueprint)" }}>
              <Send size={14} /> Submit case
            </button>
          </form>

          <div className="space-y-3">
            {myCases.length === 0 ? (
              <div className="p-8 rounded-lg text-center tw-body text-sm" style={{ background: "white", border: "1px dashed rgba(30,42,47,0.2)", opacity: 0.6 }}>No cases raised yet.</div>
            ) : myCases.map((c) => (
              <div key={c.id} className="p-4 rounded-lg bg-white" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
                <div className="flex justify-between items-start gap-2">
                  <div className="tw-body font-semibold text-sm">{c.subject}</div>
                  <Badge tone={c.status === "resolved" ? "moss" : c.status === "in-progress" ? "brass" : "clay"}>{c.status}</Badge>
                </div>
                <p className="tw-body text-sm mt-1.5" style={{ opacity: 0.72 }}>{c.message}</p>
                {c.response ? (
                  <div className="mt-3 p-3 rounded-md" style={{ background: "rgba(75,93,69,0.08)" }}>
                    <div className="tw-mono text-[10px] uppercase tracking-wide mb-1" style={{ color: "var(--moss)" }}>TrustWork replied</div>
                    <p className="tw-body text-sm" style={{ opacity: 0.85 }}>{c.response}</p>
                  </div>
                ) : null}
                <div className="tw-mono text-[10px] mt-2" style={{ opacity: 0.45 }}>{c.id} · {fmtDate(c.createdAt)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAdd && <AddPropertyModal onClose={() => setShowAdd(false)} onSave={addProperty} />}
    </Shell>
  );
}

function AddPropertyModal({ onClose, onSave }) {
  const [form, setForm] = useState({ type: PROPERTY_TYPES[0], title: "", address: "", mapLink: "", plan: "essential" });
  const submit = (e) => { e.preventDefault(); if (!form.title.trim() || !form.address.trim()) return; onSave(form); };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(22,50,63,0.5)" }}>
      <div className="w-full max-w-md rounded-lg p-6" style={{ background: "var(--paper)" }}>
        <div className="flex justify-between items-center mb-5">
          <div className="tw-display font-bold text-lg">Register a property</div>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={submit}>
          <Field label="Property type">
            <select className={inputCls} style={inputStyle} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Property name / nickname">
            <input className={inputCls} style={inputStyle} placeholder="e.g. Whitefield 30x40 site" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </Field>
          <Field label="Address">
            <input className={inputCls} style={inputStyle} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
          </Field>
          <Field label="Google Maps link (optional)">
            <input className={inputCls} style={inputStyle} placeholder="https://maps.google.com/..." value={form.mapLink} onChange={(e) => setForm({ ...form, mapLink: e.target.value })} />
          </Field>
          <Field label="Care plan">
            <select className={inputCls} style={inputStyle} value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })}>
              {PLANS.map((p) => <option key={p.id} value={p.id}>{p.name} — {p.visits}</option>)}
            </select>
          </Field>
          <button type="submit" className="w-full mt-2 py-2.5 rounded-md font-semibold text-white tw-body" style={{ background: "var(--blueprint)" }}>
            Submit for approval
          </button>
        </form>
      </div>
    </div>
  );
}

/* ================= ADMIN DASHBOARD ================= */
function AdminDashboard({ dbs, refresh, onLogout }) {
  const [tab, setTab] = useState("customers");
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [openProp, setOpenProp] = useState(null);
  const [newCreds, setNewCreds] = useState(null);
  const [search, setSearch] = useState("");

  const customers = Object.values(dbs.customers || {});
  const properties = Object.values(dbs.properties || {});
  const cases = Object.values(dbs.cases || {}).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const filteredCustomers = customers.filter((c) =>
    (c.name + c.id + c.phone).toLowerCase().includes(search.toLowerCase())
  );

  const addCustomer = async (form) => {
    const customersDb = { ...dbs.customers };
    const n = Object.keys(customersDb).length + 1;
    const custId = `TW-${new Date().getFullYear()}-${pad(n, 4)}`;
    const tempPassword = Math.random().toString(36).slice(2, 8);
    customersDb[custId] = { id: custId, name: form.name, phone: form.phone, email: form.email, password: tempPassword, createdAt: todayISO() };
    await saveDb(DB_KEYS.customers, customersDb);
    refresh();
    setShowAddCustomer(false);
    setNewCreds({ id: custId, password: tempPassword, name: form.name });
  };

  const approveProperty = async (propId) => {
    const props = { ...dbs.properties };
    props[propId] = { ...props[propId], status: "active" };
    await saveDb(DB_KEYS.properties, props);
    refresh();
  };

  const addVisit = async (propId, visit) => {
    const props = { ...dbs.properties };
    const p = props[propId];
    props[propId] = { ...p, visits: [...(p.visits || []), visit] };
    await saveDb(DB_KEYS.properties, props);
    refresh();
  };

  const respondCase = async (caseId, response, status) => {
    const cs = { ...dbs.cases };
    cs[caseId] = { ...cs[caseId], response, status };
    await saveDb(DB_KEYS.cases, cs);
    refresh();
  };

  if (openProp) {
    const p = dbs.properties[openProp];
    const owner = dbs.customers[p.customerId];
    return (
      <Shell title="TrustWork" subtitle="Admin console" onLogout={onLogout}>
        <button onClick={() => setOpenProp(null)} className="tw-body text-sm flex items-center gap-1 mb-5" style={{ opacity: 0.6 }}>
          <ArrowLeft size={14} /> All properties
        </button>
        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
          <div>
            <div className="tw-display font-bold text-2xl">{p.title}</div>
            <div className="tw-body text-sm mt-1" style={{ opacity: 0.65 }}>{owner ? `${owner.name} · ${owner.id}` : p.customerId}</div>
          </div>
          <div className="flex gap-2 items-center">
            <Badge tone={p.status === "active" ? "moss" : "brass"}>{p.status === "active" ? "Active" : "Pending approval"}</Badge>
            {p.status !== "active" && (
              <button onClick={() => approveProperty(p.id)} className="tw-body text-sm font-semibold px-3 py-1.5 rounded-md text-white" style={{ background: "var(--moss)" }}>
                Approve
              </button>
            )}
          </div>
        </div>
        <div className="tw-body text-sm flex items-center gap-1.5 mb-6" style={{ opacity: 0.6 }}>
          <MapPin size={13} /> {p.address}
        </div>

        <AddVisitForm onAdd={(v) => addVisit(p.id, v)} />

        <div className="tw-display font-bold text-lg mt-8 mb-4">Logged visits</div>
        {(!p.visits || p.visits.length === 0) ? (
          <p className="tw-body text-sm" style={{ opacity: 0.55 }}>Nothing logged yet.</p>
        ) : (
          <div className="space-y-3">
            {[...p.visits].reverse().map((v, i) => (
              <div key={i} className="p-4 rounded-lg bg-white flex gap-3" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
                <Seal size={32} />
                <div>
                  <div className="tw-body text-sm font-semibold">{v.kind === "development" ? "Development update" : "Inspection visit"} <span className="tw-mono text-[11px] font-normal" style={{ opacity: 0.5 }}>· {fmtDate(v.date)}</span></div>
                  <p className="tw-body text-sm mt-1" style={{ opacity: 0.72 }}>{v.notes}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Shell>
    );
  }

  return (
    <Shell title="TrustWork" subtitle="Admin console" onLogout={onLogout}>
      <div className="grid grid-cols-3 gap-4 mb-7">
        {[
          { label: "Customers", value: customers.length, icon: Users },
          { label: "Properties", value: properties.length, icon: Landmark },
          { label: "Open cases", value: cases.filter((c) => c.status !== "resolved").length, icon: MessageSquare },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-lg bg-white" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
            <s.icon size={16} style={{ color: "var(--brass)" }} />
            <div className="tw-display font-bold text-2xl mt-2">{s.value}</div>
            <div className="tw-mono text-[10px] uppercase tracking-wide" style={{ opacity: 0.55 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <Tabs
        tabs={[
          { id: "customers", label: "Customers", icon: Users },
          { id: "properties", label: "Properties", icon: Landmark },
          { id: "cases", label: "Cases", icon: MessageSquare },
        ]}
        active={tab} onChange={setTab}
      />

      {tab === "customers" && (
        <div>
          <div className="flex justify-between items-center gap-3 mb-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ opacity: 0.4 }} />
              <input className={inputCls} style={{ ...inputStyle, paddingLeft: 32 }} placeholder="Search customers…" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <button onClick={() => setShowAddCustomer(true)} className="tw-body flex items-center gap-1.5 text-sm font-semibold px-3.5 py-2 rounded-md text-white" style={{ background: "var(--blueprint)" }}>
              <UserPlus size={15} /> New customer
            </button>
          </div>
          <div className="space-y-2.5">
            {filteredCustomers.map((c) => (
              <div key={c.id} className="p-4 rounded-lg bg-white flex flex-wrap justify-between items-center gap-2" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
                <div>
                  <div className="tw-body font-semibold text-sm">{c.name}</div>
                  <div className="tw-mono text-[11px] mt-0.5" style={{ opacity: 0.55 }}>{c.id}</div>
                </div>
                <div className="tw-body text-xs flex gap-4" style={{ opacity: 0.6 }}>
                  {c.phone && <span className="flex items-center gap-1"><Phone size={12} />{c.phone}</span>}
                  {c.email && <span className="flex items-center gap-1"><Mail size={12} />{c.email}</span>}
                </div>
              </div>
            ))}
            {filteredCustomers.length === 0 && <p className="tw-body text-sm" style={{ opacity: 0.55 }}>No customers yet — add the first one.</p>}
          </div>
        </div>
      )}

      {tab === "properties" && (
        <div className="grid sm:grid-cols-2 gap-4">
          {properties.map((p) => {
            const owner = dbs.customers[p.customerId];
            return (
              <button key={p.id} onClick={() => setOpenProp(p.id)} className="text-left p-5 rounded-lg bg-white hover:shadow-sm transition-shadow" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
                <div className="flex justify-between items-start gap-2">
                  <Badge tone="ink">{p.type}</Badge>
                  <Badge tone={p.status === "active" ? "moss" : "brass"}>{p.status === "active" ? "Active" : "Pending"}</Badge>
                </div>
                <div className="tw-display font-bold text-lg mt-3">{p.title}</div>
                <div className="tw-body text-sm mt-1" style={{ opacity: 0.6 }}>{owner ? owner.name : p.customerId}</div>
              </button>
            );
          })}
          {properties.length === 0 && <p className="tw-body text-sm" style={{ opacity: 0.55 }}>No properties registered yet.</p>}
        </div>
      )}

      {tab === "cases" && (
        <div className="space-y-3">
          {cases.map((c) => <CaseRow key={c.id} c={c} customer={dbs.customers[c.customerId]} onRespond={respondCase} />)}
          {cases.length === 0 && <p className="tw-body text-sm" style={{ opacity: 0.55 }}>No cases raised yet.</p>}
        </div>
      )}

      {showAddCustomer && <AddCustomerModal onClose={() => setShowAddCustomer(false)} onSave={addCustomer} />}
      {newCreds && <CredsModal creds={newCreds} onClose={() => setNewCreds(null)} />}
    </Shell>
  );
}

function AddVisitForm({ onAdd }) {
  const [form, setForm] = useState({ kind: "inspection", date: todayISO(), notes: "", photos: "", video: "" });
  const submit = (e) => {
    e.preventDefault();
    if (!form.notes.trim()) return;
    onAdd({
      kind: form.kind, date: form.date, notes: form.notes,
      photos: form.photos.split(",").map((s) => s.trim()).filter(Boolean),
      video: form.video.trim() || null,
    });
    setForm({ kind: "inspection", date: todayISO(), notes: "", photos: "", video: "" });
  };
  return (
    <form onSubmit={submit} className="p-5 rounded-lg bg-white" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
      <div className="tw-display font-bold text-base mb-4">Log a visit or update</div>
      <div className="grid sm:grid-cols-2 gap-x-4">
        <Field label="Type">
          <select className={inputCls} style={inputStyle} value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value })}>
            <option value="inspection">Inspection visit</option>
            <option value="development">Nearby development update</option>
          </select>
        </Field>
        <Field label="Date">
          <input type="date" className={inputCls} style={inputStyle} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        </Field>
      </div>
      <Field label="Notes">
        <textarea className={inputCls} style={inputStyle} rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} required />
      </Field>
      <div className="grid sm:grid-cols-2 gap-x-4">
        <Field label="Photo links (comma separated)">
          <input className={inputCls} style={inputStyle} value={form.photos} onChange={(e) => setForm({ ...form, photos: e.target.value })} placeholder="https://…, https://…" />
        </Field>
        <Field label="Video link">
          <input className={inputCls} style={inputStyle} value={form.video} onChange={(e) => setForm({ ...form, video: e.target.value })} placeholder="https://…" />
        </Field>
      </div>
      <button type="submit" className="py-2.5 px-5 rounded-md font-semibold text-white tw-body" style={{ background: "var(--brass)", color: "var(--blueprint)" }}>
        Add to log
      </button>
    </form>
  );
}

function CaseRow({ c, customer, onRespond }) {
  const [response, setResponse] = useState(c.response || "");
  return (
    <div className="p-4 rounded-lg bg-white" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
      <div className="flex justify-between items-start gap-2 flex-wrap">
        <div>
          <div className="tw-body font-semibold text-sm">{c.subject}</div>
          <div className="tw-mono text-[11px] mt-0.5" style={{ opacity: 0.5 }}>{customer ? customer.name : c.customerId} · {c.id} · {fmtDate(c.createdAt)}</div>
        </div>
        <Badge tone={c.status === "resolved" ? "moss" : c.status === "in-progress" ? "brass" : "clay"}>{c.status}</Badge>
      </div>
      <p className="tw-body text-sm mt-2" style={{ opacity: 0.75 }}>{c.message}</p>
      <div className="mt-3 flex gap-2 flex-wrap items-center">
        <input className={inputCls + " flex-1 min-w-[180px] !py-2 text-sm"} style={inputStyle} placeholder="Write a response…" value={response} onChange={(e) => setResponse(e.target.value)} />
        <button onClick={() => onRespond(c.id, response, "in-progress")} className="tw-body text-xs font-semibold px-3 py-2 rounded-md" style={{ background: "rgba(184,134,59,0.14)", color: "var(--brass)" }}>Reply</button>
        <button onClick={() => onRespond(c.id, response, "resolved")} className="tw-body text-xs font-semibold px-3 py-2 rounded-md" style={{ background: "rgba(75,93,69,0.14)", color: "var(--moss)" }}>Mark resolved</button>
      </div>
    </div>
  );
}

function AddCustomerModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const submit = (e) => { e.preventDefault(); if (!form.name.trim()) return; onSave(form); };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(22,50,63,0.5)" }}>
      <div className="w-full max-w-md rounded-lg p-6" style={{ background: "var(--paper)" }}>
        <div className="flex justify-between items-center mb-5">
          <div className="tw-display font-bold text-lg">New customer</div>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={submit}>
          <Field label="Full name"><input className={inputCls} style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></Field>
          <Field label="Phone"><input className={inputCls} style={inputStyle} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
          <Field label="Email"><input className={inputCls} style={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
          <button type="submit" className="w-full mt-2 py-2.5 rounded-md font-semibold text-white tw-body" style={{ background: "var(--blueprint)" }}>
            Create account &amp; generate ID
          </button>
        </form>
      </div>
    </div>
  );
}

function CredsModal({ creds, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(22,50,63,0.5)" }}>
      <div className="w-full max-w-sm rounded-lg p-6 text-center" style={{ background: "var(--paper)" }}>
        <div className="flex justify-center mb-3"><Seal size={44} /></div>
        <div className="tw-display font-bold text-lg mb-1">Account created</div>
        <p className="tw-body text-sm mb-5" style={{ opacity: 0.65 }}>Share these credentials with {creds.name}.</p>
        <div className="p-4 rounded-md space-y-2 text-left" style={{ background: "white", border: "1px solid rgba(30,42,47,0.1)" }}>
          <div className="flex items-center gap-2 tw-mono text-sm"><KeyRound size={14} style={{ color: "var(--brass)" }} /> ID: <b>{creds.id}</b></div>
          <div className="flex items-center gap-2 tw-mono text-sm"><KeyRound size={14} style={{ color: "var(--brass)" }} /> Password: <b>{creds.password}</b></div>
        </div>
        <button onClick={onClose} className="w-full mt-5 py-2.5 rounded-md font-semibold text-white tw-body" style={{ background: "var(--blueprint)" }}>Done</button>
      </div>
    </div>
  );
}

/* ================= ROOT APP ================= */
export default function App() {
  const [view, setView] = useState("landing"); // landing | login | customer | admin
  const [session, setSession] = useState(null); // { role, customerId }
  const [dbs, setDbs] = useState({ admin: null, customers: {}, properties: {}, cases: {} });
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const [admin, customers, properties, cases] = await Promise.all([
      loadDb(DB_KEYS.admin, null),
      loadDb(DB_KEYS.customers, {}),
      loadDb(DB_KEYS.properties, {}),
      loadDb(DB_KEYS.cases, {}),
    ]);
    setDbs({ admin, customers, properties, cases });
  }, []);

  useEffect(() => { refresh().then(() => setLoading(false)); }, [refresh]);

  const ensureAdminSeed = useCallback(async () => {
    if (!dbs.admin) {
      const seed = { username: "admin", password: "admin123" };
      await saveDb(DB_KEYS.admin, seed);
      refresh();
    }
  }, [dbs.admin, refresh]);

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center py-24" style={{ background: "var(--paper)" }}>
        <div className="tw-mono text-sm" style={{ opacity: 0.5 }}>Loading…</div>
      </div>
    );
  }

  const cssVars = {
    "--ink": "#1E2A2F", "--blueprint": "#16323F", "--paper": "#F6F1E7",
    "--brass": "#B8863B", "--clay": "#8C4A2F", "--moss": "#4B5D45",
  };

  return (
    <div style={{ ...cssVars, minHeight: "100vh" }}>
      {view === "landing" && <Landing onLogin={() => setView("login")} />}
      {view === "login" && (
        <LoginScreen
          onBack={() => setView("landing")}
          ensureAdminSeed={ensureAdminSeed}
          dbs={dbs}
          onAdminLogin={() => { setSession({ role: "admin" }); setView("admin"); }}
          onCustomerLogin={(customerId) => { setSession({ role: "customer", customerId }); setView("customer"); }}
        />
      )}
      {view === "customer" && session && dbs.customers[session.customerId] && (
        <CustomerDashboard
          customer={dbs.customers[session.customerId]}
          dbs={dbs}
          refresh={refresh}
          onLogout={() => { setSession(null); setView("landing"); }}
        />
      )}
      {view === "admin" && session && (
        <AdminDashboard dbs={dbs} refresh={refresh} onLogout={() => { setSession(null); setView("landing"); }} />
      )}
    </div>
  );
}
