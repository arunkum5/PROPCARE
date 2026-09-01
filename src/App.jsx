import React, { useState, useEffect, useCallback } from "react";
import {
  Shield, MapPin, Camera, Video, Home, Trees, Building2, Landmark,
  FileCheck, Users, ClipboardList, Stamp, ChevronRight, LogIn, LogOut,
  Plus, X, CheckCircle2, Clock, MessageSquare, Send, ExternalLink,
  UserPlus, User, Search, ArrowLeft, Sprout, Fence, Eye, EyeOff, Phone, Mail,
  KeyRound, AlertCircle, ArrowUp, MessageCircle, Pencil
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
  { name: "Banashankari", type: "Independent House", coords: [12.9249, 77.5662] },
  { name: "Whitefield", type: "Villa", coords: [12.9698, 77.7499] },
  { name: "Magadi Road", type: "Plot", coords: [12.9756, 77.5554] },
  { name: "JP Nagar", type: "Independent House", coords: [12.9061, 77.5855] },
  { name: "Vidyaranyapura", type: "Independent House", coords: [13.0831, 77.5534] },
  { name: "Mahalakshmi Layout", type: "Independent House", coords: [13.0175, 77.5488] },
  { name: "Panathur", type: "Flat in Apartment", coords: [12.9361, 77.7055] },
  { name: "Gunjur", type: "Flat in Apartment", coords: [12.9266, 77.7335] },
  { name: "Tumkur", type: "Plot", coords: [13.3414, 77.1022] },
  { name: "Davanagere", type: "Plot", coords: [14.4663, 75.9238] },
  { name: "Hassan", type: "Plot", coords: [13.0072, 76.0962] },
  { name: "Mysore", type: "Plot", coords: [12.3086, 76.6531] },
  { name: "Tiptur", type: "Plot", coords: [13.2600, 76.4800] },
  { name: "Arsikere", type: "Independent House", coords: [13.3145, 76.2570] },
  { name: "Arsikere (Plot)", type: "Plot", coords: [13.3245, 76.2670] },
  { name: "Kunigal", type: "Agricultural Land", coords: [13.0232, 77.0252] },
  { name: "Chikkaballapura", type: "Agricultural Land", coords: [13.4300, 77.7200] },
];

function LocationsMap() {
  return (
    <div className="px-6 sm:px-10 py-16 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
      <h2 className="tw-display font-bold text-2xl mb-2">Currently serving locations</h2>
      <p className="tw-body text-sm mb-8" style={{ opacity: 0.7 }}>A snapshot of properties we manage across Karnataka.</p>
      <div className="w-full h-[400px] sm:h-[500px] rounded-xl overflow-hidden shadow-sm relative z-0" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
        <MapContainer center={[13.05, 77.5]} zoom={10} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
          <TileLayer attribution='&amp;copy; &lt;a href="https://www.openstreetmap.org/copyright"&gt;OpenStreetMap&lt;/a&gt; contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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
      <div className="w-full mt-10 overflow-hidden rounded-xl py-4 flex items-center shadow-inner" style={{ background: "rgba(184,134,59,0.08)", border: "1px solid rgba(184,134,59,0.15)" }}>
        <div className="flex animate-marquee-slow gap-10 px-4 w-max">
          {[...MAP_LOCATIONS, ...MAP_LOCATIONS, ...MAP_LOCATIONS].map((loc, i) => {
            const colors = ["#4B5D45", "#8C4A2F", "#1E2A2F", "#B8863B", "#4A5568", "#2F855A", "#B7791F"];
            return (
              <div key={i} className="flex items-center gap-2 whitespace-nowrap tw-body font-bold text-[15px]" style={{ color: colors[i % colors.length] }}>
                <MapPin size={16} /> {loc.name} <span style={{ opacity: 0.6, fontWeight: 500 }}>: {loc.type}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const WhatsAppIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.22 5.22 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! I am the TrustWork Assistant. How can I help you today?' }
  ]);
  const [showOptions, setShowOptions] = useState(true);

  const options = [
    { label: 'What we do?', response: 'We act as a highly professional proxy for NRI or out-of-town property owners. We provide absolute peace of mind by acting as your trusted eyes and ears on the ground.' },
    { label: 'Our Experience', response: 'We have 10+ Years of experience, with 28+ properties currently handling, and a dedicated team of 20+ field crew members.' },
    { label: 'Plans & Pricing', response: 'Our comprehensive property care plans start from just ₹1 / Sq.ft / Month.' },
    { label: 'How to register?', response: 'To register your property, simply Contact or WhatsApp us at +91 9448610107 and our team will get you onboarded instantly!' }
  ];

  const handleOptionClick = (option) => {
    setMessages(prev => [...prev, { type: 'user', text: option.label }]);
    setShowOptions(false);
    
    // Simulate typing delay
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: option.response }]);
      setTimeout(() => setShowOptions(true), 500);
    }, 600);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-[100] w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110 overflow-hidden border-2"
        style={{ background: "white", borderColor: "var(--blueprint)" }}
      >
        {isOpen ? <X size={28} style={{ color: "var(--blueprint)" }} /> : <img src="/chatbot-avatar.png" alt="Chatbot" className="w-full h-full object-cover bg-white" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-[4.5rem] right-[5rem] z-[100] w-80 sm:w-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden border animate-fade-in-up origin-bottom-right" style={{ background: "var(--paper)", borderColor: "rgba(30,42,47,0.1)", maxHeight: "calc(100vh - 120px)" }}>
          {/* Header */}
          <div className="px-5 py-4 flex items-center gap-3 text-white" style={{ background: "var(--blueprint)" }}>
            <img src="/chatbot-avatar.png" alt="Chatbot" className="w-8 h-8 rounded-full border border-white/50 bg-white object-cover" />
            <div>
              <div className="tw-display font-bold text-lg leading-tight">TrustWork Assistant</div>
              <div className="text-xs opacity-80 mt-0.5">Always here to help</div>
            </div>
            <button onClick={() => setIsOpen(false)} className="ml-auto opacity-70 hover:opacity-100">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4" style={{ maxHeight: "400px" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`px-4 py-2.5 rounded-2xl max-w-[85%] tw-body text-sm ${msg.type === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}
                  style={{
                    background: msg.type === 'user' ? "var(--brass)" : "white",
                    color: msg.type === 'user' ? "white" : "var(--ink)",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                    border: msg.type === 'user' ? "none" : "1px solid rgba(30,42,47,0.08)"
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Options Menu */}
            {showOptions && (
              <div className="flex flex-col gap-2 mt-2 animate-fade-in-up">
                <div className="text-xs font-semibold mb-1" style={{ color: "var(--blueprint)", opacity: 0.7 }}>Suggested Questions:</div>
                {options.map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => handleOptionClick(opt)}
                    className="text-left px-4 py-2 rounded-xl tw-body text-sm transition-all duration-300 border hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                    style={{ borderColor: "rgba(30,42,47,0.1)", color: "var(--blueprint)" }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

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
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4 items-center">
        {showTopBtn && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hidden sm:block p-3 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.15)] border hover:scale-105 transition-transform" style={{ borderColor: "rgba(30,42,47,0.1)", color: "var(--ink)" }}>
            <ArrowUp size={20} />
          </button>
        )}
        <Chatbot />
        <a href="tel:+919448610107" className="p-3.5 rounded-full shadow-[0_4px_14px_rgba(0,102,255,0.4)] hover:scale-105 transition-transform flex items-center justify-center text-white" style={{ background: "#0066FF" }}>
          <Phone size={24} />
        </a>
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
    const res = window.localStorage.getItem(key);
    return res ? JSON.parse(res) : fallback;
  } catch {
    return fallback;
  }
}
async function saveDb(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
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
      <div className="tw-display font-bold text-4xl mb-1">
        {count}{suffix}
      </div>
      <div className="tw-mono text-[11px] uppercase tracking-wider font-semibold opacity-75">
        {label}
      </div>
    </div>
  );
}

function Stats() {
  return (
    <div className="w-full flex justify-center py-12 px-6 sm:px-10 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
      <div className="max-w-2xl w-full rounded-2xl shadow-2xl py-6 px-4 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/20" style={{ background: "linear-gradient(135deg, #16323F, #B8863B)", color: "white", border: "1px solid rgba(255, 255, 255, 0.15)" }}>
        <StatItem end={10} label="Years of experience" />
        <StatItem end={28} label="Projects currently handling" />
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
          {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => {
            const bgs = ["#F4F7FB", "#F4FBF7", "#FEF8F0", "#FBF4FB", "#FDF4F4"];
            return (
            <div key={i} className="w-[300px] sm:w-[340px] shrink-0 p-6 rounded-xl shadow-sm hover:-translate-y-2 hover:rotate-2 hover:shadow-md transition-all duration-300 cursor-default" style={{ background: bgs[i % bgs.length], border: "1px solid rgba(30,42,47,0.08)" }}>
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map(s => <span key={s} className="text-[14px]" style={{ color: "var(--brass)" }}>★</span>)}
              </div>
              <p className="tw-body text-[15px] mb-4 leading-relaxed" style={{ color: "var(--ink)", opacity: 0.85 }}>"{t.text}"</p>
              <div className="tw-body text-sm font-bold">{t.name}</div>
              <div className="tw-mono text-[10px] uppercase tracking-wide mt-1" style={{ opacity: 0.5 }}>{t.role}</div>
            </div>
          )})}
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
    { title: "Register", desc: "Sign a care agreement and add your property with its map location.", img: "/step1.png" },
    { title: "We watch", desc: "Our team visits on your chosen schedule and logs photos, video and notes.", img: "/step2.png" },
    { title: "You track", desc: "Open your dashboard anytime to see visit history, updates and nearby developments.", img: "/step3.png" },
  ];

  return (
    <div style={{ background: "var(--paper)", color: "var(--ink)" }} className="min-h-full">
      <FloatingControls />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;700&family=Source+Sans+3:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .tw-display { font-family: 'Zilla Slab', serif; }
        .tw-body { font-family: 'Source Sans 3', sans-serif; }
        .tw-mono { font-family: 'IBM Plex Mono', monospace; }
        @keyframes bgFade1 { 0%, 45%, 100% { opacity: 1; } 50%, 95% { opacity: 0; } }
        @keyframes bgFade2 { 0%, 45%, 100% { opacity: 0; } 50%, 95% { opacity: 1; } }
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
        <div className="flex items-center gap-5 sm:gap-8">
          <div className="hidden lg:flex items-center gap-4 mr-2">
            <a href="#" className="hover:scale-110 transition-transform" style={{ color: "#E1306C" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="hover:scale-110 transition-transform" style={{ color: "#1877F2" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="hover:scale-110 transition-transform" style={{ color: "#1DA1F2" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="hover:scale-110 transition-transform" style={{ color: "#FF0000" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
            <a href="#" className="hover:scale-110 transition-transform" style={{ color: "#0A66C2" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="hover:scale-110 transition-transform" style={{ color: "#25D366" }}><MessageCircle size={18} /></a>
          </div>
          <a href="tel:+919448610107" className="hidden sm:flex items-center gap-1.5 tw-body font-semibold text-sm hover:opacity-70 transition-opacity" style={{ color: "var(--ink)" }}>
            <Phone size={15} /> +91 9448610107
          </a>
          <button
            onClick={onLogin}
            className="tw-body flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:opacity-90 active:scale-95"
            style={{ background: "var(--blueprint)" }}
          >
            <LogIn size={15} /> Login
          </button>
        </div>
      </div>

      {/* HERO */}
      <div className="relative px-6 sm:px-10 py-16 sm:py-24 animate-fade-in-up overflow-hidden" style={{ animationDelay: "0.1s" }}>
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('/new1.jpg')", animation: "bgFade1 12s infinite" }} />
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('/new2.jpg')", opacity: 0, animation: "bgFade2 12s infinite" }} />
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(rgba(22, 50, 63, 0.7), rgba(22, 50, 63, 0.95))" }} />
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Side: Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block px-6 py-2.5 rounded-full border-2 tw-body text-base font-bold shadow-lg transform hover:scale-105 transition-transform cursor-default mb-8" style={{ borderColor: "rgba(184,134,59,0.5)", color: "white", background: "var(--brass)" }}>
              ✨ Get Your Property Watched just @ ₹1/sq.ft per month
            </div>
            <div className="grid">
              <div className="col-start-1 row-start-1" style={{ animation: "bgFade1 12s infinite" }}>
                <h1 className="tw-display font-bold text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.1]">
                  Your Property,<br />Our Priority.
                </h1>
                <p className="tw-body mt-6 text-base sm:text-lg max-w-xl mx-auto lg:mx-0" style={{ color: "rgba(246,241,231,0.78)" }}>
                  We act as your trusted proxy on the ground. Whether you are an NRI or simply out-of-town, we provide professional oversight with a personal touch for your vacant plots, flats, and houses.
                </p>
              </div>
              <div className="col-start-1 row-start-1 pointer-events-none" style={{ opacity: 0, animation: "bgFade2 12s infinite" }}>
                <h1 className="tw-display font-bold text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.1]">
                  Stay away.<br />Stay relaxed.
                </h1>
                <p className="tw-body mt-6 text-base sm:text-lg max-w-xl mx-auto lg:mx-0" style={{ color: "rgba(246,241,231,0.78)" }}>
                  Entrust your property to a team that cares for it as deeply as you do. We blend professional oversight with a personal touch, ensuring absolute peace of mind through dedicated monitoring, regular visual updates, on-demand call support, and personalized video walkthroughs.
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 max-w-xl mx-auto lg:mx-0 tw-body text-[17px] text-white">
              <div className="flex items-center gap-3"><CheckCircle2 size={20} style={{ color: "var(--brass)" }} /> <span className="opacity-95">Monthly physical inspections & live video walkthroughs</span></div>
              <div className="flex items-center gap-3"><CheckCircle2 size={20} style={{ color: "var(--brass)" }} /> <span className="opacity-95">Complete tenant management & rent collection</span></div>
              <div className="flex items-center gap-3"><CheckCircle2 size={20} style={{ color: "var(--brass)" }} /> <span className="opacity-95">Fencing, cleaning & maintenance for plots</span></div>
              <div className="flex items-center gap-3"><CheckCircle2 size={20} style={{ color: "var(--brass)" }} /> <span className="opacity-95">Khata, property tax & legal certificate assistance</span></div>
            </div>

            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
              <a href="https://wa.me/919448610107" target="_blank" rel="noopener noreferrer" className="tw-body flex items-center justify-center px-8 py-3.5 rounded-md font-bold text-[17px] shadow-lg transform hover:-translate-y-1 hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95" style={{ background: "var(--brass)", color: "var(--blueprint)", textDecoration: "none" }}>
                Get your property watched
              </a>
            </div>
          </div>
          
          {/* Right Side: Images */}
          <div className="flex-1 w-full max-w-md lg:max-w-none relative aspect-[4/3] sm:aspect-video lg:aspect-square flex items-center justify-center">
             <img src="/home-hand.png" className="absolute w-full h-full object-cover drop-shadow-2xl rounded-2xl" style={{ animation: "bgFade1 12s infinite" }} alt="Property Care" />
             <img src="/home-hand-new.png" className="absolute w-full h-full object-contain drop-shadow-2xl rounded-2xl" style={{ opacity: 0, animation: "bgFade2 12s infinite" }} alt="Property Care" />
          </div>
        </div>
        
        {/* Barbed Wire Overlay */}
        <div 
          className="absolute bottom-0 left-0 w-full h-12 sm:h-16 z-20 pointer-events-none opacity-80" 
          style={{ 
            backgroundImage: "url('/barbed-wire.png')", 
            backgroundRepeat: "repeat-x", 
            backgroundSize: "contain",
            backgroundPosition: "center",
            mixBlendMode: "screen"
          }} 
        />
      </div>

      {/* STATS */}
      <Stats />

      {/* HOW IT WORKS */}
      <div className="px-6 sm:px-10 py-20 max-w-6xl mx-auto overflow-hidden">
        <h2 className="tw-display font-bold text-4xl mb-12 text-center animate-fade-in-up" style={{ animationDelay: "0.1s" }}>3 simple steps to total peace of mind</h2>
        <div className="grid sm:grid-cols-3 gap-8 relative">
          <div className="hidden sm:block absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 z-0" style={{ background: "rgba(184,134,59,0.2)" }} />
          {steps.map((s, i) => (
            <div key={s.title} className="p-8 rounded-2xl shadow-xl relative z-10 animate-fade-in-up hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 overflow-hidden group bg-cover bg-center border border-transparent hover:border-white/20" style={{ backgroundImage: `url(${s.img})`, color: "white", animationDelay: `${0.3 + (i * 0.2)}s`, animationFillMode: "both" }}>
              <div className="absolute inset-0 z-0 transition-all duration-300 bg-[#16323F] opacity-90 group-hover:opacity-60"></div>
              <div className="relative z-20">
                <div className="w-12 h-12 rounded-full flex items-center justify-center tw-display font-bold text-xl mb-6 shadow-md" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "white" }}>
                  {i + 1}
                </div>
                <div className="tw-display font-bold text-2xl mb-3">{s.title}</div>
                <p className="tw-body text-base leading-relaxed" style={{ opacity: 0.9 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAP */}
      <LocationsMap />

      {/* WHAT WE DO */}
      <div className="relative px-6 sm:px-10 py-24 animate-fade-in-up bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/new3.jpg')", animationDelay: "0.2s" }}>
        <div className="absolute inset-0 z-0" style={{ background: "rgba(246, 241, 231, 0.90)" }} />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="tw-display font-bold text-4xl sm:text-5xl mb-6" style={{ color: "var(--blueprint)" }}>What we do</h2>
            <p className="tw-body text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: "var(--ink)", opacity: 0.85 }}>
              TrustWork Property Care operates essentially as a highly professional proxy for NRI or out-of-town property owners. We provide absolute peace of mind by acting as your trusted eyes and ears on the ground.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Card 1: Detailed Plots */}
            <div className="rounded-3xl p-8 sm:p-12 shadow-xl relative z-10 transition-all hover:-translate-y-1 hover:shadow-2xl overflow-hidden group border" style={{ background: "linear-gradient(135deg, #16323F 0%, #2A3C42 60%, #5C4A2E 100%)", borderColor: "rgba(255,255,255,0.1)", color: "white" }}>
              <div className="flex items-center gap-5 mb-10 pb-6 border-b" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
                <div className="p-4 rounded-2xl shadow-sm" style={{ background: "rgba(255,255,255,0.15)", color: "var(--brass)" }}>
                  <Trees size={36} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="tw-display font-bold text-3xl sm:text-4xl" style={{ color: "white" }}>Vacant Plots & Land</h3>
                  <p className="tw-body text-sm font-bold uppercase tracking-wider mt-2" style={{ color: "var(--brass)" }}>Comprehensive Care</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-6 tw-body flex-1">
                <div>
                  <span className="font-bold text-lg" style={{ color: "var(--brass)" }}>Monitoring & Security:</span>
                  <p className="mt-1 text-[17px]" style={{ color: "white", opacity: 0.9 }}>Physical site inspections with geo/time-tagged media, live video walkthroughs, and keeping a strict watch against encroachments or unauthorized construction.</p>
                </div>
                <div>
                  <span className="font-bold text-lg" style={{ color: "var(--brass)" }}>Maintenance:</span>
                  <p className="mt-1 text-[17px]" style={{ color: "white", opacity: 0.9 }}>Fencing, building compound walls, and keeping the site clean.</p>
                </div>
                <div>
                  <span className="font-bold text-lg" style={{ color: "var(--brass)" }}>Administration & Surveying:</span>
                  <p className="mt-1 text-[17px]" style={{ color: "white", opacity: 0.9 }}>Professional measurement by government-approved surveyors, plus handling taxes, EC (Encumbrance Certificates), Katha, and other legal certificates.</p>
                </div>
                <div>
                  <span className="font-bold text-lg" style={{ color: "var(--brass)" }}>Real Estate:</span>
                  <p className="mt-1 text-[17px]" style={{ color: "white", opacity: 0.9 }}>Matching buyers and sellers when the owner is ready to trade.</p>
                </div>
              </div>
            </div>

            {/* Card 2: Detailed Flats */}
            <div className="rounded-3xl p-8 sm:p-12 shadow-xl relative z-10 transition-all hover:-translate-y-1 hover:shadow-2xl overflow-hidden group border" style={{ background: "linear-gradient(135deg, #16323F 0%, #2A3C42 60%, #5C4A2E 100%)", borderColor: "rgba(255,255,255,0.1)", color: "white" }}>
              <div className="flex items-center gap-5 mb-10 pb-6 border-b" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
                <div className="p-4 rounded-2xl shadow-sm" style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>
                  <Home size={36} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="tw-display font-bold text-3xl sm:text-4xl" style={{ color: "white" }}>Flats, Villas & Houses</h3>
                  <p className="tw-body text-sm font-bold uppercase tracking-wider mt-2" style={{ color: "var(--brass)" }}>Comprehensive Care</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-6 tw-body flex-1">
                <div>
                  <span className="font-bold text-lg" style={{ color: "var(--brass)" }}>Monitoring:</span>
                  <p className="mt-1 text-[17px]" style={{ color: "white", opacity: 0.9 }}>Routine physical inspections with geo/time-tagged photos and videos.</p>
                </div>
                <div>
                  <span className="font-bold text-lg" style={{ color: "var(--brass)" }}>Tenant Management:</span>
                  <p className="mt-1 text-[17px]" style={{ color: "white", opacity: 0.9 }}>Handling tenant check-ins/check-outs, conducting periodic inspections, collecting rent, and drawing up rental agreements.</p>
                </div>
                <div>
                  <span className="font-bold text-lg" style={{ color: "var(--brass)" }}>Vacancy Filling:</span>
                  <p className="mt-1 text-[17px]" style={{ color: "white", opacity: 0.9 }}>To-let advertising and thorough tenant scrutiny/background checks.</p>
                </div>
                <div>
                  <span className="font-bold text-lg" style={{ color: "var(--brass)" }}>Administration & Real Estate:</span>
                  <p className="mt-1 text-[17px]" style={{ color: "white", opacity: 0.9 }}>Handling property taxes and certificates, as well as buyer/seller matching for trading.</p>
                </div>
              </div>
            </div>


          </div>
          
          <div className="mt-16 max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-6 p-8 sm:p-10 rounded-3xl shadow-lg" style={{ background: "var(--blueprint)", color: "white" }}>
            <Landmark size={48} className="shrink-0" style={{ color: "var(--brass)" }} />
            <p className="tw-body text-lg sm:text-xl font-medium leading-relaxed" style={{ opacity: 0.95 }}>
              We also track local market rates, upcoming projects nearby and give you a read on new investment opportunities in and around your area.
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
            <div key={p.id} className="p-8 rounded-2xl relative transition-all duration-300 border-2 hover:-translate-y-2 hover:shadow-xl flex flex-col overflow-hidden group" style={{ borderColor: p.id === 'premium' ? 'var(--brass)' : 'rgba(30,42,47,0.08)', boxShadow: p.id === 'premium' ? '0 10px 40px rgba(184,134,59,0.15)' : '0 8px 30px rgba(0,0,0,0.06)' }}>
              <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110" style={{ background: `url('/${p.id}.png') center/cover` }} />
              <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.97))" }} />
              {p.id === 'premium' && <div className="absolute top-0 right-0 z-20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white rounded-bl-2xl shadow-sm" style={{ background: "var(--brass)" }}>Most Popular</div>}
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-5">
                  <Badge tone={p.id === 'premium' ? "brass" : "ink"}>{p.price}</Badge>
                </div>
                <div className="tw-display font-bold text-3xl mb-6" style={{ color: "var(--ink)" }}>{p.name}</div>
                <div className="tw-body text-[17px] space-y-4 font-semibold flex-1" style={{ color: "rgba(30,42,47,0.85)" }}>
                  <div className="flex gap-3 items-center"><Eye size={20} style={{ color: p.id === 'premium' ? "var(--brass)" : "var(--clay)" }} /> {p.visits}</div>
                  <div className="flex gap-3 items-center"><Camera size={20} style={{ color: p.id === 'premium' ? "var(--brass)" : "var(--clay)" }} /> {p.media}</div>
                </div>
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
        <button onClick={onLogin} className="tw-body text-sm font-semibold flex items-center gap-1 shrink-0 transition-all duration-300 hover:opacity-70 hover:translate-x-1" style={{ color: "var(--clay)" }}>
          Client / Admin login <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

/* ================= LOGIN ================= */
function LoginScreen({ onBack, onCustomerLogin, onAdminLogin, dbs }) {
  const [role, setRole] = useState("customer");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      if (cust) onCustomerLogin(cust);
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
              placeholder={role === "admin" ? "admin" : "TW01"} required />
          </Field>
          <Field label="Password">
            <div className="relative flex items-center">
              <input type={showPassword ? "text" : "password"} className={`${inputCls} pr-10`} style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
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
function Shell({ title, subtitle, onLogout, children, tabs, activeTab, onTabChange }) {
  return (
    <div className="min-h-full flex flex-col" style={{ background: "var(--paper)", color: "var(--ink)" }}>
      <style>{`
        .tw-display { font-family: 'Zilla Slab', serif; } .tw-body { font-family: 'Source Sans 3', sans-serif; } .tw-mono { font-family: 'IBM Plex Mono', monospace; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div className="px-6 sm:px-10 pt-5 pb-3 shrink-0" style={{ background: "var(--blueprint)" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Seal size={36} />
            <div className="leading-tight">
              <div className="tw-display font-bold text-white text-[16px]">{title}</div>
              <div className="tw-mono text-[10px] tracking-widest uppercase" style={{ color: "rgba(246,241,231,0.6)" }}>{subtitle}</div>
            </div>
          </div>
          <button onClick={onLogout} className="tw-body flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#F6F1E7" }}>
            <LogOut size={15} /> <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
        {tabs && (
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-2 px-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => onTabChange(t.id)}
                className="tw-body px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap hover:bg-white/10 hover:text-white"
                style={activeTab === t.id ? { background: "rgba(255,255,255,0.15)", color: "white" } : { color: "rgba(255,255,255,0.6)" }}
              >
                <t.icon size={14} /> {t.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex-1 px-6 sm:px-10 py-8 w-full max-w-5xl mx-auto">{children}</div>
    </div>
  );
}

function CustomerPropertyDetail({ p, customer, onBack, onChangePlan, onAgree, onUpdate, onLogout }) {
  const [agreed, setAgreed] = useState(p.agreed || false);
  const [showEdit, setShowEdit] = useState(false);

  const handleAgree = () => {
    setAgreed(true);
    if (onAgree) onAgree();
  };

  const groupedVisits = (p.visits || []).reduce((acc, v) => {
    const d = new Date(v.date);
    const m = d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    if (!acc[m]) acc[m] = [];
    acc[m].push(v);
    return acc;
  }, {});
  const months = Object.keys(groupedVisits).sort((a, b) => new Date(b) - new Date(a));
  const [activeMonth, setActiveMonth] = useState(months[0] || "");

  useEffect(() => {
    if (months.length > 0 && !activeMonth) setActiveMonth(months[0]);
  }, [months, activeMonth]);

  return (
    <Shell 
      title="TrustWork" subtitle={`${customer.name} · ${PLANS.find(pl => pl.id === p.plan)?.name || p.plan}`} onLogout={onLogout}>
      <div className="flex items-center justify-between mb-5">
        <button onClick={onBack} className="tw-body text-sm flex items-center gap-1" style={{ opacity: 0.6 }}>
          <ArrowLeft size={14} /> All properties
        </button>
        <button onClick={() => setShowEdit(true)} className="tw-body text-sm flex items-center gap-1.5 font-semibold transition-opacity hover:opacity-100" style={{ color: "var(--blueprint)", opacity: 0.8 }}>
          <Pencil size={14} /> Edit property
        </button>
      </div>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <div className="tw-display font-bold text-2xl">{p.title}</div>
          <div className="tw-body text-sm flex items-center gap-1.5 mt-1" style={{ opacity: 0.65 }}>
            <MapPin size={14} /> {p.address}
          </div>
        </div>
        <Badge tone={p.status === "active" ? "moss" : "brass"}>
          {p.status === "active" ? "Active" : "Pending approval"}
        </Badge>
      </div>

      {!agreed ? (
        <div className="mb-8 p-5 rounded-lg bg-white" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
          <div className="tw-display font-bold text-lg mb-4">Agreement & Payment</div>
          
          <div className="mb-5">
            <div className="tw-body text-sm font-semibold mb-2" style={{ opacity: 0.8 }}>Choose or review your plan:</div>
            <div className="grid md:grid-cols-3 gap-4">
              {PLANS.map((pl) => (
                <button key={pl.id} onClick={() => onChangePlan(pl.id)}
                  className="relative p-5 rounded-xl text-left transition-all overflow-hidden flex flex-col justify-between"
                  style={p.plan === pl.id ? { background: "var(--blueprint)", color: "white", boxShadow: "0 10px 25px -5px rgba(22,50,63,0.3)" } : { background: "white", border: "1px solid rgba(30,42,47,0.15)", color: "var(--ink)" }}>
                  {p.plan === pl.id && <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-5 rounded-bl-[100%]" />}
                  <div>
                    <div className="tw-body font-bold text-lg mb-1">{pl.name}</div>
                    <div className="tw-mono text-[11px] uppercase tracking-wide mb-4" style={{ opacity: p.plan === pl.id ? 0.7 : 0.5, color: p.plan === pl.id ? "var(--brass)" : "inherit" }}>{pl.price}</div>
                    <ul className="tw-body text-sm space-y-2 mb-6" style={{ opacity: p.plan === pl.id ? 0.9 : 0.75 }}>
                      <li className="flex items-start gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: p.plan === pl.id ? "var(--brass)" : "var(--moss)" }} /> <span>{pl.visits}</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: p.plan === pl.id ? "var(--brass)" : "var(--moss)" }} /> <span>{pl.media}</span></li>
                    </ul>
                  </div>
                  <div className="tw-body text-xs font-semibold py-2 rounded-lg text-center transition-colors" style={p.plan === pl.id ? { background: "var(--brass)", color: "var(--blueprint)" } : { background: "rgba(30,42,47,0.05)" }}>
                    {p.plan === pl.id ? "Selected Plan" : "Select Plan"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <label className="flex gap-2 items-start tw-body text-sm cursor-pointer p-3 rounded-md border" style={{ background: "rgba(30,42,47,0.02)" }}>
            <input type="checkbox" className="mt-1" onChange={handleAgree} />
            <span>I agree to the TrustWork Property Care Terms and Conditions and authorize inspections.</span>
          </label>
          <div className="text-sm tw-body mt-4 pt-4 flex items-center gap-2" style={{ borderTop: "1px solid rgba(30,42,47,0.1)" }}>
            <span style={{ opacity: 0.7 }}>Payment Status:</span> <Badge tone="brass">Pending verification</Badge>
          </div>
        </div>
      ) : (
        <div className="mb-8 flex items-center justify-between p-4 rounded-lg bg-white" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} style={{ color: "var(--moss)" }} />
            <div className="tw-body text-sm font-semibold">Care Plan Active: {PLANS.find(pl => pl.id === p.plan)?.name || p.plan}</div>
          </div>
          <Badge tone="moss">Agreement signed & Paid</Badge>
        </div>
      )}

      <div className="tw-display font-bold text-lg mb-4">Gallery & Visit Log</div>
      {months.length === 0 ? (
        <div className="p-6 rounded-lg text-center tw-body text-sm" style={{ background: "white", border: "1px dashed rgba(30,42,47,0.2)", opacity: 0.6 }}>
          No visits logged yet.
        </div>
      ) : (
        <div>
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {months.map(m => (
              <button key={m} onClick={() => setActiveMonth(m)} className="tw-body text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-colors" style={{ background: activeMonth === m ? "var(--blueprint)" : "white", color: activeMonth === m ? "white" : "var(--ink)", border: "1px solid rgba(30,42,47,0.1)" }}>
                {m}
              </button>
            ))}
          </div>
          <div className="space-y-6">
            {(groupedVisits[activeMonth] || []).reverse().map((v, i) => (
              <div key={i} className="p-5 rounded-lg bg-white" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <Seal size={32} />
                  <div>
                    <div className="tw-body font-semibold text-sm">{v.kind === "development" ? "Development update" : "Inspection visit"}</div>
                    <div className="tw-mono text-[11px]" style={{ opacity: 0.55 }}>{fmtDate(v.date)}</div>
                  </div>
                </div>
                <p className="tw-body text-sm mb-4" style={{ opacity: 0.78 }}>{v.notes}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(v.photos || []).map((url, idx) => (
                    <a key={idx} href={url} target="_blank" rel="noreferrer" className="block aspect-square bg-gray-100 rounded-lg overflow-hidden border hover:opacity-80 relative group flex items-center justify-center">
                      <img src={url} className="w-full h-full object-cover" alt="Property visit" onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='block'}} />
                      <div className="hidden text-xs text-gray-500 tw-mono text-center p-2 break-all">{url}</div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 text-white"><Camera size={24} /></div>
                    </a>
                  ))}
                  {v.video && (
                    <a href={v.video} target="_blank" rel="noreferrer" className="block aspect-square bg-gray-100 rounded-lg overflow-hidden border flex items-center justify-center hover:opacity-80">
                      <div className="text-center p-2"><Video size={24} className="mx-auto mb-1 text-gray-500" /><div className="text-xs text-gray-500 tw-body">Play Video</div></div>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {showEdit && (
        <AddPropertyModal 
          initialData={p} 
          onClose={() => setShowEdit(false)} 
          onSave={(updatedForm) => {
             onUpdate(updatedForm);
             setShowEdit(false);
          }} 
        />
      )}
    </Shell>
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

  const latestPhoto = myProps.flatMap(p => p.visits || []).flatMap(v => v.photos || [])[0];

  const addProperty = async (form) => {
    const propId = `PLOT-${Date.now().toString().slice(-6)}`;
    const newProp = {
      id: propId, customerId: customer.id, type: form.type, title: form.title,
      address: form.address, mapLink: form.mapLink, plan: form.plan,
      status: "pending", createdAt: todayISO(), visits: [],
    };
    await fetch('/api/properties', { method: 'POST', body: JSON.stringify(newProp) });
    refresh();
    setShowAdd(false);
  };

  const changePlan = async (propId, planId) => {
    const p = dbs.properties[propId];
    await fetch(`/api/properties/${propId}`, { method: 'PUT', body: JSON.stringify({ ...p, plan: planId }) });
    refresh();
  };

  const handleAgree = async (propId) => {
    const p = dbs.properties[propId];
    await fetch(`/api/properties/${propId}`, { method: 'PUT', body: JSON.stringify({ ...p, agreed: true }) });
    refresh();
  };

  const updateProperty = async (updatedProp) => {
    const p = dbs.properties[updatedProp.id];
    const isPlanChanged = p.plan !== updatedProp.plan;
    await fetch(`/api/properties/${updatedProp.id}`, { method: 'PUT', body: JSON.stringify({ ...p, ...updatedProp, agreed: isPlanChanged ? false : p.agreed }) });
    refresh();
  };

  const submitCase = async (e) => {
    e.preventDefault();
    if (!caseForm.subject.trim() || !caseForm.message.trim()) return;
    const caseId = `CASE-${Date.now().toString().slice(-6)}`;
    const newCase = {
      id: caseId, customerId: customer.id, propertyId: caseForm.propertyId || null,
      subject: caseForm.subject, message: caseForm.message, status: "open",
      response: "", createdAt: todayISO(),
    };
    await fetch('/api/cases', { method: 'POST', body: JSON.stringify(newCase) });
    refresh();
    setCaseForm({ subject: "", message: "", propertyId: "" });
  };

  if (openProp) {
    const p = dbs.properties[openProp];
    return <CustomerPropertyDetail p={p} customer={customer} onBack={() => setOpenProp(null)} onChangePlan={(planId) => changePlan(p.id, planId)} onAgree={() => handleAgree(p.id)} onUpdate={updateProperty} onLogout={onLogout} />;
  }

  return (
    <Shell 
      title="TrustWork" subtitle={customer.name} onLogout={onLogout}
      tabs={[
        { id: "properties", label: "My properties", icon: Landmark },
        { id: "cases", label: "My cases", icon: MessageSquare },
        { id: "profile", label: "Profile", icon: User },
      ]}
      activeTab={tab} onTabChange={setTab}
    >

      {tab === "profile" && (
        <div className="p-6 rounded-lg bg-white max-w-2xl" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
          <div className="tw-display font-bold text-xl mb-6">Identity Details</div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full name"><input className={inputCls} style={inputStyle} defaultValue={customer.name} required /></Field>
            <Field label="Phone"><input className={inputCls} style={inputStyle} defaultValue={customer.phone} required /></Field>
            <Field label="Email"><input className={inputCls} style={inputStyle} defaultValue={customer.email} /></Field>
            <Field label="Relationship to property"><input className={inputCls} style={inputStyle} defaultValue="Owner" /></Field>
            <Field label="Aadhaar"><input className={inputCls} style={inputStyle} placeholder="xxxx xxxx xxxx" /></Field>
            <Field label="PAN"><input className={inputCls} style={inputStyle} placeholder="ABCDE1234F" /></Field>
            <div className="sm:col-span-2">
              <Field label="Current residential address"><textarea className={inputCls} style={inputStyle} rows={3} placeholder="Full address..." /></Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Emergency/alternate contact"><input className={inputCls} style={inputStyle} placeholder="Name & Phone" /></Field>
            </div>
          </div>
          <button className="mt-4 py-2.5 px-6 rounded-md font-semibold text-white tw-body" style={{ background: "var(--blueprint)" }}>
            Save Profile
          </button>
        </div>
      )}

      {tab === "properties" && (
        <div>
          <div className="relative mb-8 rounded-xl overflow-hidden shadow-sm" style={{ minHeight: "160px", background: "var(--blueprint)" }}>
            {latestPhoto ? (
              <img src={latestPhoto} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" alt="Latest property visit" />
            ) : (
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--moss)] via-transparent to-transparent" />
            )}
            <div className="relative p-6 sm:p-8 flex flex-col justify-center h-full">
              <div className="tw-display font-bold text-2xl sm:text-3xl text-white mb-2">
                Hello, {customer.name.split(" ")[0]}
              </div>
              <p className="tw-body text-sm sm:text-base max-w-2xl leading-relaxed" style={{ color: "rgba(246,241,231,0.85)" }}>
                We are actively monitoring and taking care of your property. Relax and have peace of mind—we will instantly notify you if anything requires your attention.
              </p>
            </div>
          </div>

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
                <button key={p.id} onClick={() => setOpenProp(p.id)} className="text-left p-5 rounded-lg bg-white transition-all duration-200 hover:shadow-xl hover:-translate-y-1" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
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

function AddPropertyModal({ onClose, onSave, initialData }) {
  const [form, setForm] = useState(initialData || { type: PROPERTY_TYPES[0], title: "", address: "", latlong: "", size: "", summary: "", plan: "essential" });
  const [docFile, setDocFile] = useState(null);
  const submit = (e) => { e.preventDefault(); if (!form.title.trim() || !form.address.trim()) return; onSave(form); };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(22,50,63,0.5)" }}>
      <div className="w-full max-w-xl rounded-lg p-6 max-h-[90vh] overflow-y-auto" style={{ background: "var(--paper)" }}>
        <div className="flex justify-between items-center mb-5">
          <div className="tw-display font-bold text-lg">{initialData ? "Edit Property" : "Register a property"}</div>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={submit} className="grid sm:grid-cols-2 gap-x-4">
          <Field label="Property type">
            <select className={inputCls} style={inputStyle} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Property name / nickname">
            <input className={inputCls} style={inputStyle} placeholder="e.g. Whitefield 30x40 site" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Address">
              <input className={inputCls} style={inputStyle} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
            </Field>
          </div>
          <Field label="Location (Lat/Long)">
            <input className={inputCls} style={inputStyle} placeholder="e.g. 12.9716, 77.5946" value={form.latlong} onChange={(e) => setForm({ ...form, latlong: e.target.value })} />
          </Field>
          <Field label="Property Size">
            <input className={inputCls} style={inputStyle} placeholder="e.g. 1200 sq ft" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Ownership Proof Document">
              <input type="file" className={inputCls} style={inputStyle} onChange={(e) => setDocFile(e.target.files[0])} />
              {docFile && <div className="text-xs mt-1 text-green-700">Selected: {docFile.name}</div>}
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Property Summary">
              <textarea className={inputCls} style={inputStyle} rows={2} placeholder="Brief details about the property..." value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Care plan">
              <select className={inputCls} style={inputStyle} value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })}>
                {PLANS.map((p) => <option key={p.id} value={p.id}>{p.name} — {p.visits}</option>)}
              </select>
            </Field>
          </div>
          <div className="sm:col-span-2 mt-2">
            <button type="submit" className="w-full py-2.5 rounded-md font-semibold text-white tw-body" style={{ background: "var(--blueprint)" }}>
              {initialData ? "Save changes" : "Submit for approval"}
            </button>
          </div>
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

  const [editCust, setEditCust] = useState(null);

  const customers = Object.values(dbs.customers || {});
  const properties = Object.values(dbs.properties || {});
  const cases = Object.values(dbs.cases || {}).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const filteredCustomers = customers.filter((c) =>
    (c.name + c.id + c.phone).toLowerCase().includes(search.toLowerCase())
  );

  const addCustomer = async (form) => {
    const tempPassword = form.password || Math.random().toString(36).slice(2, 8);
    const newCust = { id: form.id, name: form.name, phone: form.phone, email: form.email, password: tempPassword, createdAt: todayISO() };
    await fetch('/api/customers', { method: 'POST', body: JSON.stringify(newCust) });
    refresh();
    setShowAddCustomer(false);
    setNewCreds({ id: form.id, password: tempPassword, name: form.name });
  };

  const updateCustomer = async (form) => {
    const cust = dbs.customers[form.id];
    if (cust) {
      const updated = { ...cust, name: form.name, phone: form.phone, email: form.email };
      if (form.password) updated.password = form.password;
      await fetch(`/api/customers/${form.id}`, { method: 'PUT', body: JSON.stringify(updated) });
      refresh();
    }
    setEditCust(null);
  };

  const approveProperty = async (propId) => {
    const p = dbs.properties[propId];
    await fetch(`/api/properties/${propId}`, { method: 'PUT', body: JSON.stringify({ ...p, status: "active" }) });
    refresh();
  };

  const addVisit = async (propId, visit) => {
    const v = { id: `VISIT-${Date.now()}`, propertyId: propId, ...visit };
    await fetch('/api/visits', { method: 'POST', body: JSON.stringify(v) });
    refresh();
  };

  const respondCase = async (caseId, response, status) => {
    const cs = dbs.cases[caseId];
    await fetch(`/api/cases/${caseId}`, { method: 'PUT', body: JSON.stringify({ ...cs, response, status }) });
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

  const propCounts = properties.reduce((acc, p) => { acc[p.type] = (acc[p.type] || 0) + 1; return acc; }, {});
  const totalProps = properties.length || 1;
  const propColors = ["#B8863B", "#16323F", "#4B5D45", "#8C4A2F", "#5C4A2E", "#2A3C42"];

  return (
    <Shell 
      title="TrustWork" subtitle="Admin console" onLogout={onLogout}
      tabs={[
        { id: "customers", label: "Customers", icon: Users },
        { id: "properties", label: "Properties", icon: Landmark },
        { id: "cases", label: "Cases", icon: MessageSquare },
      ]}
      activeTab={tab} onTabChange={setTab}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
        {[
          { label: "Customers", value: customers.length, icon: Users },
          { label: "Properties", value: properties.length, icon: Landmark },
          { label: "Open cases", value: cases.filter((c) => c.status !== "resolved").length, icon: MessageSquare },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-lg bg-white transition-all hover:shadow-lg hover:-translate-y-1" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
            <s.icon size={16} style={{ color: "var(--brass)" }} />
            <div className="tw-display font-bold text-2xl mt-2">{s.value}</div>
            <div className="tw-mono text-[10px] uppercase tracking-wide" style={{ opacity: 0.55 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mb-7 p-5 rounded-lg bg-white" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
        <div className="tw-display font-bold text-lg mb-4 flex items-center gap-2"><Landmark size={18} style={{ color: "var(--brass)" }} /> Properties by type</div>
        {properties.length === 0 ? (
          <p className="tw-body text-sm" style={{ opacity: 0.55 }}>No properties registered yet.</p>
        ) : (
          <div>
            <div className="w-full h-4 rounded-full flex overflow-hidden mb-3">
              {Object.entries(propCounts).map(([type, count], i) => (
                <div key={type} style={{ width: `${(count / totalProps) * 100}%`, background: propColors[i % propColors.length] }} title={`${type}: ${count}`} />
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-2">
              {Object.entries(propCounts).map(([type, count], i) => (
                <div key={type} className="flex items-center gap-1.5 tw-body text-xs" style={{ opacity: 0.8 }}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: propColors[i % propColors.length] }} />
                  {type} ({count})
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

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
              <div key={c.id} className="p-4 rounded-lg bg-white flex flex-wrap justify-between items-center gap-2 transition-all hover:shadow-md" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
                <div>
                  <div className="tw-body font-semibold text-sm">{c.name}</div>
                  <div className="tw-mono text-[11px] mt-0.5" style={{ opacity: 0.55 }}>{c.id}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="tw-body text-xs flex gap-4 hidden sm:flex" style={{ opacity: 0.6 }}>
                    {c.phone && <span className="flex items-center gap-1"><Phone size={12} />{c.phone}</span>}
                    {c.email && <span className="flex items-center gap-1"><Mail size={12} />{c.email}</span>}
                  </div>
                  <button onClick={() => setEditCust(c)} className="tw-body text-xs font-semibold px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-1" style={{ color: "var(--blueprint)" }}>
                     Edit
                  </button>
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
              <button key={p.id} onClick={() => setOpenProp(p.id)} className="text-left p-5 rounded-lg bg-white transition-all duration-200 hover:shadow-xl hover:-translate-y-1" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
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

      {showAddCustomer && <AddCustomerModal onClose={() => setShowAddCustomer(false)} onSave={addCustomer} dbs={dbs} />}
      {editCust && <EditCustomerModal customer={editCust} onClose={() => setEditCust(null)} onSave={updateCustomer} />}
      {newCreds && <CredsModal creds={newCreds} onClose={() => setNewCreds(null)} />}
    </Shell>
  );
}

function AddVisitForm({ onAdd }) {
  const [form, setForm] = useState({ kind: "inspection", date: todayISO(), notes: "" });
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    return data.url;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.notes.trim()) return;
    setUploading(true);
    try {
      const photoUrls = [];
      for (const p of photos) photoUrls.push(await uploadFile(p));
      const videoUrl = video ? await uploadFile(video) : null;
      
      onAdd({
        kind: form.kind, date: form.date, notes: form.notes,
        photos: photoUrls, video: videoUrl,
      });
      setForm({ kind: "inspection", date: todayISO(), notes: "" });
      setPhotos([]);
      setVideo(null);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
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
        <Field label="Photos">
          <input type="file" multiple accept="image/*" className={inputCls} style={inputStyle} onChange={(e) => setPhotos([...e.target.files])} />
        </Field>
        <Field label="Video">
          <input type="file" accept="video/*" className={inputCls} style={inputStyle} onChange={(e) => setVideo(e.target.files[0])} />
        </Field>
      </div>
      <button type="submit" disabled={uploading} className="py-2.5 px-5 rounded-md font-semibold text-white tw-body" style={{ background: uploading ? "gray" : "var(--brass)", color: uploading ? "white" : "var(--blueprint)" }}>
        {uploading ? "Uploading..." : "Add to log"}
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

function AddCustomerModal({ onClose, onSave, dbs }) {
  const n = Object.keys(dbs?.customers || {}).length + 1;
  const defaultId = `TW${pad(n, 2)}`;
  const [form, setForm] = useState({ id: defaultId, name: "", phone: "", email: "", password: "" });
  const submit = (e) => { e.preventDefault(); if (!form.name.trim() || !form.id.trim()) return; onSave(form); };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(22,50,63,0.5)" }}>
      <div className="w-full max-w-md rounded-lg p-6 max-h-screen overflow-y-auto" style={{ background: "var(--paper)" }}>
        <div className="flex justify-between items-center mb-5">
          <div className="tw-display font-bold text-lg">New customer</div>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={submit}>
          <Field label="Customer ID"><input className={inputCls} style={inputStyle} value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} required /></Field>
          <Field label="Full name"><input className={inputCls} style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></Field>
          <Field label="Phone"><input className={inputCls} style={inputStyle} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
          <Field label="Email"><input className={inputCls} style={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
          <Field label="Password (leave blank for random)"><input className={inputCls} style={inputStyle} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Auto-generate" /></Field>
          <button type="submit" className="w-full mt-2 py-2.5 rounded-md font-semibold text-white tw-body" style={{ background: "var(--blueprint)" }}>
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}

function EditCustomerModal({ customer, onClose, onSave }) {
  const [form, setForm] = useState({ ...customer, password: "" });
  const submit = (e) => { e.preventDefault(); if (!form.name.trim()) return; onSave(form); };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(22,50,63,0.5)" }}>
      <div className="w-full max-w-md rounded-lg p-6 max-h-screen overflow-y-auto" style={{ background: "var(--paper)" }}>
        <div className="flex justify-between items-center mb-5">
          <div className="tw-display font-bold text-lg">Edit customer {customer.id}</div>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={submit}>
          <Field label="Full name"><input className={inputCls} style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></Field>
          <Field label="Phone"><input className={inputCls} style={inputStyle} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
          <Field label="Email"><input className={inputCls} style={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
          <div className="mt-6 pt-4 border-t" style={{ borderColor: "rgba(30,42,47,0.1)" }}>
            <Field label="Reset Password (leave blank to keep current)">
              <input type="text" className={inputCls} style={inputStyle} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="New password" />
            </Field>
          </div>
          <button type="submit" className="w-full mt-4 py-2.5 rounded-md font-semibold text-white tw-body" style={{ background: "var(--blueprint)" }}>
            Save changes
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
    try {
      const res = await fetch('/api/data');
      if (res.ok) {
        const data = await res.json();
        setDbs({ 
          admin: { username: "admin", password: "admin123" }, 
          customers: data.customers, 
          properties: data.properties, 
          cases: data.cases 
        });
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  }, []);

  useEffect(() => { refresh().then(() => setLoading(false)); }, [refresh]);

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
          dbs={dbs}
          onAdminLogin={() => { setSession({ role: "admin" }); setView("admin"); }}
          onCustomerLogin={(cust) => { setSession({ role: "customer", customerId: cust.id }); setView("customer"); }}
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
