import React, { useState, useEffect, useCallback } from "react";
import {
  Shield, MapPin, Camera, Video, Home, Trees, Building2, Landmark,
  FileCheck, Users, ClipboardList, Stamp, ChevronRight, LogIn, LogOut,
  Plus, X, CheckCircle2, Clock, MessageSquare, Send, ExternalLink,
  UserPlus, User, Search, ArrowLeft, Sprout, Fence, Eye, EyeOff, Phone, Mail,
  KeyRound, AlertCircle, ArrowUp, MessageCircle, Pencil, Trash2, RefreshCw, Menu, ImageIcon, CreditCard, ChevronDown, Calculator, ShieldCheck, Gift, Tag
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
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
    <div id="areas-serving" className="px-6 sm:px-10 py-16 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
      <h2 className="tw-display font-bold text-2xl mb-2">Currently serving locations</h2>
      <p className="tw-body text-sm mb-4" style={{ opacity: 0.7 }}>A snapshot of properties we manage across Karnataka.</p>
      <div className="mb-8 tw-body text-sm font-semibold inline-flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ color: "var(--brass)", background: "rgba(184,134,59,0.1)", border: "1px solid rgba(184,134,59,0.2)" }}>
        ✨ We have dedicated field crews across Karnataka and serve anywhere and everywhere in the state.
      </div>
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
    { label: 'How to register?', response: 'To register your property, simply Contact or WhatsApp us at +91 9353010107 or +91 7676740107 and our team will get you onboarded instantly!' },
    { label: 'Is my property secure?', response: 'Yes! We log all visits and provide time-stamped photos and videos of your property, which you can view anytime in your secure customer dashboard.' },
    { label: 'Can I request an extra visit?', response: 'Absolutely. You can request an on-demand visit directly from your dashboard at any time at a discounted rate.' },
    { label: 'How do payments work?', response: 'We support secure online payments via Razorpay. You can track your monthly or annual billing cycles and view past payments in your dashboard.' }
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
        <a href="tel:+919353010107" className="p-2.5 rounded-full shadow-[0_4px_14px_rgba(0,102,255,0.4)] hover:scale-105 transition-transform flex items-center justify-center text-white" style={{ background: "#0066FF" }}>
          <Phone size={19} />
        </a>
        <a href="https://wa.me/919353010107" target="_blank" rel="noreferrer" className="p-2.5 rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:scale-105 transition-transform flex items-center justify-center text-white" style={{ background: "#25D366" }}>
          <WhatsAppIcon size={21} />
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

function calcFee(plan, sqft, cycle = '1_month', plansMap = {}) {
  const p = plansMap[plan];
  const s = parseFloat(sqft) || 0;
  if (!p || s <= 0) return null;
  const monthly = p.ratePerSqft * s;
  if (cycle === '12_months') return monthly * 12 * 0.90; // 10% discount
  if (cycle === '6_months') return monthly * 6 * 0.96; // 4% discount
  return monthly;
}

function calcExpiry(paymentDate, cycle = '1_month') {
  if (!paymentDate) return null;
  const d = new Date(paymentDate);
  const monthsToAdd = cycle === '12_months' ? 12 : cycle === '6_months' ? 6 : 1;
  d.setMonth(d.getMonth() + monthsToAdd);
  return d.toISOString();
}

async function processCheckout({ amount, description, prefill, couponCode, onSuccess, onError }) {
  try {
    const orderRes = await fetch('/api/razorpay/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Math.round(amount * 100), couponCode, phone: prefill?.contact }), // paise
    });
    const order = await orderRes.json();
    if (!orderRes.ok) throw new Error(order.error || 'Order creation failed');

    if (!window.Razorpay) {
      await new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://checkout.razorpay.com/v1/checkout.js';
        s.onload = resolve; s.onerror = reject;
        document.head.appendChild(s);
      });
    }

    const rzp = new window.Razorpay({
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_TYMgMaeAtpwHNh',
      amount: order.amount,
      currency: order.currency,
      order_id: order.orderId,
      name: 'TrustWork Property Care',
      description,
      prefill,
      theme: { color: '#16323F' },
      handler: async (response) => {
        const verRes = await fetch('/api/razorpay/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            couponCode,
            phone: prefill?.contact
          }),
        });
        const verData = await verRes.json();
        if (verData.success) {
          onSuccess(response.razorpay_payment_id);
        } else {
          onError(new Error('Payment verification failed. Please contact support.'));
        }
      },
      modal: { ondismiss: () => onError(new Error('Payment cancelled.')) },
    });
    rzp.open();
  } catch (err) {
    onError(err);
  }
}

const PROPERTY_TYPES = ["Vacant Plot", "Agricultural Land", "Commercial Land", "Flat / Apartment", "Independent House", "Villa", "Other"];

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

function Field({ label, required, children }) {
  return (
    <label className="block mb-4">
      <span className="block text-xs font-mono uppercase tracking-wider mb-1.5" style={{ color: "var(--ink)", opacity: 0.6 }}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
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
function Landing({ onLogin, dbs }) {
  const plansList = Object.values(dbs?.plans || {});
  const [policyModal, setPolicyModal] = useState(null);
  const [calcSize, setCalcSize] = useState('1200');
  const [calcPlan, setCalcPlan] = useState('essential');
  const [calcCycle, setCalcCycle] = useState('1_month');
  const [calcType, setCalcType] = useState('Flat / Apartment');
  const [checkoutModal, setCheckoutModal] = useState(null);
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '' });
  const [leadMsg, setLeadMsg] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  const activeCalcPlan = calcPlan || plansList[0]?.id || '';

  const handleApplyCoupon = async () => {
    if (!couponCode || !leadForm.phone) {
      setCouponMsg({ type: 'error', text: 'Please enter phone number and code.' });
      return;
    }
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, phone: leadForm.phone }),
      });
      const data = await res.json();
      if (!data.success) {
        setCouponMsg({ type: 'error', text: data.error });
        setDiscountAmount(0);
      } else {
        const c = data.coupon;
        let amt = 0;
        const baseAmount = Math.round(calcFee(activeCalcPlan, calcSize, calcCycle, dbs.plans));
        if (c.type === 'percentage') {
          amt = baseAmount * (c.value / 100);
        } else {
          amt = c.value;
        }
        setDiscountAmount(amt);
        setCouponMsg({ type: 'success', text: `Coupon applied! You saved ₹${amt.toLocaleString('en-IN')}` });
      }
    } catch (err) {
      setCouponMsg({ type: 'error', text: 'Error verifying coupon' });
    }
  };

  const handleLeadSubmit = async (action) => {
    setLeadMsg(null);
    if (!leadForm.name || !leadForm.phone) {
      setLeadMsg({ type: 'error', text: "Please provide your name and phone number." });
      return;
    }
    const leadId = `ld_${Date.now()}`;
    const baseAmount = Math.round(calcFee(activeCalcPlan, calcSize, calcCycle, dbs.plans));
    const finalAmount = Math.max(0, baseAmount - discountAmount);
    
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: leadId,
        name: leadForm.name,
        phone: leadForm.phone,
        propertyType: calcType,
        size: calcSize,
        plan: activeCalcPlan,
        cycle: calcCycle,
        amount: finalAmount,
        status: 'pending',
        createdAt: new Date().toISOString()
      })
    });

    if (action === 'callback') {
      setLeadMsg({ type: 'success', text: "Thank you! Our team has received your request and will contact you shortly." });
      setTimeout(() => {
        setCheckoutModal(null);
        setLeadMsg(null);
      }, 3500);
    } else {
      await processCheckout({
        amount: finalAmount,
        description: `Plan: ${dbs.plans[activeCalcPlan]?.name} for ${calcSize} sqft`,
        prefill: { name: leadForm.name, contact: leadForm.phone, email: leadForm.email },
        couponCode: discountAmount > 0 ? couponCode : undefined,
        onSuccess: async (paymentId) => {
          await fetch(`/api/leads/${leadId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'paid', paymentId })
          });
          setLeadMsg({ type: 'success', text: "Payment Successful! We will contact you to begin onboarding." });
          setTimeout(() => {
            setCheckoutModal(null);
            setLeadMsg(null);
          }, 4000);
        },
        onError: async () => {
          await fetch(`/api/leads/${leadId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'payment_failed' })
          });
          setLeadMsg({ type: 'error', text: "Payment failed or was cancelled. Your details are saved, and we will contact you." });
          setTimeout(() => {
            setCheckoutModal(null);
            setLeadMsg(null);
          }, 4000);
        }
      });
    }
  };

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
          <img src="/newlogo.png" alt="TrustWork" className="h-12 w-auto object-contain" />
          <div className="leading-tight mt-0.5">
            <div className="tw-display font-bold text-[21px]">TrustWork</div>
            <div className="text-[10px] tw-body tracking-wider uppercase font-bold" style={{ color: "var(--brass)", opacity: 0.9 }}>Property Care & Management</div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 tw-body font-bold text-[15px] mr-auto ml-16" style={{ color: "var(--ink)" }}>
          <button onClick={() => document.getElementById('about-us').scrollIntoView({ behavior: 'smooth' })} className="hover:text-[var(--brass)] transition-colors cursor-pointer">About Us</button>
          <button onClick={() => document.getElementById('areas-serving').scrollIntoView({ behavior: 'smooth' })} className="hover:text-[var(--brass)] transition-colors cursor-pointer">Areas Serving</button>
          <button onClick={() => document.getElementById('what-we-do').scrollIntoView({ behavior: 'smooth' })} className="hover:text-[var(--brass)] transition-colors cursor-pointer">What We Do</button>
          <button onClick={() => document.getElementById('care-plans').scrollIntoView({ behavior: 'smooth' })} className="hover:text-[var(--brass)] transition-colors cursor-pointer">Check the Plans</button>
        </div>

        <div className="flex items-center gap-5 sm:gap-8">
          <div className="hidden lg:flex items-center gap-4 mr-2">
            <a href="#" className="hover:scale-110 transition-transform" style={{ color: "#E1306C" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="hover:scale-110 transition-transform" style={{ color: "#1877F2" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="hover:scale-110 transition-transform" style={{ color: "var(--ink)" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
            </a>
            <a href="#" className="hover:scale-110 transition-transform" style={{ color: "#FF0000" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
            <a href="#" className="hover:scale-110 transition-transform" style={{ color: "#0A66C2" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="hover:scale-110 transition-transform" style={{ color: "#25D366" }}><MessageCircle size={18} /></a>
          </div>
          <div className="hidden sm:flex items-center gap-3 tw-body font-semibold text-sm" style={{ color: "var(--ink)" }}>
            <a href="tel:+919353010107" className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"><Phone size={15} /> +91 9353010107</a>
            <span style={{ opacity: 0.3 }}>|</span>
            <a href="tel:+917676740107" className="hover:opacity-70 transition-opacity">+91 7676740107</a>
          </div>
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
                <h1 className="tw-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1]">
                  Your Property,<br />Our Priority.
                </h1>
                <p className="tw-body mt-6 text-base sm:text-lg max-w-xl mx-auto lg:mx-0" style={{ color: "rgba(246,241,231,0.78)" }}>
                  We act as your trusted proxy on the ground. Whether you are an NRI or simply out-of-town, we provide professional oversight with a personal touch for your vacant plots, flats, and houses.
                </p>
              </div>
              <div className="col-start-1 row-start-1 pointer-events-none" style={{ opacity: 0, animation: "bgFade2 12s infinite" }}>
                <h1 className="tw-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1]">
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

            <div className="mt-8 flex flex-col items-center lg:items-start gap-2.5">
              <span className="font-bold tracking-widest uppercase text-[11px]" style={{ color: "rgba(255,255,255,0.6)" }}>Properties we manage:</span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2.5 tw-display font-bold text-lg sm:text-xl" style={{ color: "#E8D5B5" }}>
                <div className="flex items-center gap-1.5"><CheckCircle2 size={18} style={{ color: "var(--brass)" }} /> Plot</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 size={18} style={{ color: "var(--brass)" }} /> Flat</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 size={18} style={{ color: "var(--brass)" }} /> Independent House</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 size={18} style={{ color: "var(--brass)" }} /> Villas</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 size={18} style={{ color: "var(--brass)" }} /> Commercial Land</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 size={18} style={{ color: "var(--brass)" }} /> Agriculture Land</div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
              <button onClick={() => document.getElementById('care-plans').scrollIntoView({ behavior: 'smooth' })} className="tw-body flex items-center justify-center px-8 py-3.5 rounded-md font-bold text-[17px] shadow-lg transform hover:-translate-y-1 hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer" style={{ background: "var(--brass)", color: "var(--blueprint)", textDecoration: "none", border: "none" }}>
                Get your property watched
              </button>
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
      <div id="about-us" className="px-6 sm:px-10 py-20 max-w-6xl mx-auto overflow-hidden">
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
      <div id="what-we-do" className="relative px-6 sm:px-10 py-24 animate-fade-in-up bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/new3.jpg')", animationDelay: "0.2s" }}>
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
      <div id="care-plans" className="px-6 sm:px-10 py-16 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="tw-display font-bold text-2xl mb-2">Care plans</h2>
        <p className="tw-body text-sm mb-8" style={{ opacity: 0.7 }}>Pick a visit rhythm — change it anytime from your dashboard.</p>
        <div className="grid sm:grid-cols-3 gap-6">
          {plansList.map((p) => {
            const isPopular = p.id === 'premium';
            return (
            <div key={p.id} className="p-8 rounded-2xl relative transition-all duration-300 border-2 hover:-translate-y-2 hover:shadow-xl flex flex-col overflow-hidden group" style={{ borderColor: isPopular ? 'var(--brass)' : 'rgba(30,42,47,0.08)', boxShadow: isPopular ? '0 10px 40px rgba(184,134,59,0.15)' : '0 8px 30px rgba(0,0,0,0.06)' }}>
              <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110" style={{ background: `url('/${p.id}.png') center/cover` }} />
              <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.97))" }} />
              {isPopular && <div className="absolute top-0 right-0 z-20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white rounded-bl-2xl shadow-sm" style={{ background: "var(--brass)" }}>Most Popular</div>}
              <div className="relative z-10 flex flex-col h-full">
                <div className="tw-display font-bold text-2xl mb-2" style={{ color: "var(--ink)", opacity: 0.8 }}>{p.name}</div>
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="tw-display font-black text-4xl" style={{ color: isPopular ? "var(--brass)" : "var(--ink)" }}>₹{p.ratePerSqft}</span>
                  <span className="tw-body font-bold text-sm" style={{ opacity: 0.6 }}>/ sqft / month</span>
                </div>
                <div className="tw-body text-[17px] space-y-4 font-semibold flex-1" style={{ color: "rgba(30,42,47,0.85)" }}>
                  <div className="flex gap-3 items-center"><Eye size={20} style={{ color: isPopular ? "var(--brass)" : "var(--clay)" }} /> {p.numVisits} visits / month</div>
                  <div className="flex gap-3 items-center"><Camera size={20} style={{ color: isPopular ? "var(--brass)" : "var(--clay)" }} /> {p.numPhotos === 999 ? 'Unlimited' : p.numPhotos} photos &amp; {p.numVideos === 999 ? 'Unlimited' : p.numVideos} video(s)</div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* PRICE CALCULATOR */}
      <div className="px-6 sm:px-10 py-12 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5"><Calculator size={120} /></div>
          <h2 className="tw-display font-bold text-2xl mb-2 relative z-10">Estimate Your Cost</h2>
          <p className="tw-body text-sm mb-8 relative z-10 bg-[var(--brass)] text-[var(--blueprint)] inline-block px-4 py-2 rounded-md font-bold shadow-sm">
            Get an instant fee estimate based on your property size and selected care plan.
          </p>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 relative z-10 mb-8">
            <div className="flex flex-col gap-2">
              <label className="tw-body text-xs font-bold uppercase tracking-wider" style={{ opacity: 0.6 }}>Property Type</label>
              <select className="px-4 py-3 rounded-lg border border-gray-200 tw-body text-sm bg-gray-50 outline-none focus:border-[var(--brass)] transition-colors" value={calcType} onChange={e => setCalcType(e.target.value)}>
                {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="tw-body text-xs font-bold uppercase tracking-wider" style={{ opacity: 0.6 }}>Size (SqFt)</label>
              <input type="number" placeholder="e.g. 1200" className="px-4 py-3 rounded-lg border border-gray-200 tw-body text-sm bg-gray-50 outline-none focus:border-[var(--brass)] transition-colors" value={calcSize} onChange={e => setCalcSize(e.target.value)} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="tw-body text-xs font-bold uppercase tracking-wider" style={{ opacity: 0.6 }}>Select Plan</label>
              <select className="px-4 py-3 rounded-lg border border-gray-200 tw-body text-sm bg-gray-50 outline-none focus:border-[var(--brass)] transition-colors" value={activeCalcPlan} onChange={e => setCalcPlan(e.target.value)}>
                {plansList.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="tw-body text-xs font-bold uppercase tracking-wider" style={{ opacity: 0.6 }}>Billing Cycle</label>
              <select className="px-4 py-3 rounded-lg border border-gray-200 tw-body text-sm bg-gray-50 outline-none focus:border-[var(--brass)] transition-colors" value={calcCycle} onChange={e => setCalcCycle(e.target.value)}>
                <option value="1_month">Monthly</option>
                <option value="6_months">Bi-Annually (4% off)</option>
                <option value="12_months">Annually (10% off)</option>
              </select>
            </div>
          </div>

          {calcSize > 0 && dbs?.plans?.[activeCalcPlan] ? (
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-[var(--blueprint)] p-4 rounded-xl text-white relative z-10 shadow-md">
              <div className="flex-1 flex items-center gap-4 w-full">
                <div>
                  <div className="tw-body text-xs" style={{ opacity: 0.8 }}>Estimated {calcCycle === '1_month' ? 'Monthly' : calcCycle === '6_months' ? 'Bi-Annual' : 'Annual'} Cost</div>
                  <div className="tw-display font-black text-2xl mt-0.5" style={{ color: "var(--brass)" }}>
                    ₹{Math.round(calcFee(activeCalcPlan, calcSize, calcCycle, dbs.plans)).toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="hidden sm:block border-l border-white/20 pl-4">
                  <div className="tw-body text-[10px] uppercase tracking-widest" style={{ opacity: 0.6 }}>Plan Rate</div>
                  <div className="tw-mono text-xs">₹{dbs.plans[activeCalcPlan].ratePerSqft} / sqft</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                <button 
                  onClick={() => setCheckoutModal('callback')}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg font-bold text-sm hover:scale-105 transition-transform flex items-center justify-center gap-2 whitespace-nowrap border-2 border-white/20 hover:bg-white/10"
                >
                  Request Call Back
                </button>
                <button 
                  onClick={() => setCheckoutModal('payment')}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg font-bold text-sm hover:scale-105 transition-transform flex items-center justify-center gap-2 whitespace-nowrap shadow-lg" 
                  style={{ background: "var(--brass)", color: "var(--blueprint)" }}
                >
                  Secure Property Now <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl tw-body text-sm text-center relative z-10" style={{ color: "var(--ink)", opacity: 0.6 }}>
              Enter your property size to see your estimated cost
            </div>
          )}
        </div>
      </div>
      {/* FOOTER */}
      <div className="px-6 sm:px-10 py-10 flex flex-col items-center justify-center gap-6 animate-fade-in-up text-center" style={{ borderTop: "1px solid rgba(30,42,47,0.1)", animationDelay: "0.5s" }}>
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          <div className="tw-mono text-xs text-center" style={{ opacity: 0.55 }}>
            TrustWork Property Care · Karnataka &amp; across India
          </div>
          
          <div className="tw-mono text-xs flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3" style={{ opacity: 0.75 }}>
             <div className="flex items-center gap-1.5"><Phone size={11} /> +91 9353010107, +91 7676740107</div>
             <div className="hidden sm:block" style={{ opacity: 0.3 }}>|</div>
             <div className="flex items-center gap-1.5"><Mail size={11} /> <a href="mailto:care@trustwork.co.in" className="hover:underline">care@trustwork.co.in</a></div>
          </div>

          <div className="tw-mono text-xs flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3" style={{ opacity: 0.55 }}>
            <div className="flex items-center gap-1.5 text-center"><MapPin size={11} className="shrink-0" /> Rajajinagar 2nd Stage, Bangalore - 560010</div>
            <div className="hidden sm:block" style={{ opacity: 0.3 }}>|</div>
            <div>(Visitors: {dbs?.stats?.page_visits || 1})</div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {[
            { key: "terms", label: "Terms & Conditions" },
            { key: "privacy", label: "Privacy Policy" },
            { key: "refund", label: "Refund Policy" },
            { key: "cancellation", label: "Cancellation Policy" },
          ].map(({ key, label }) => (
            <button key={key} onClick={() => setPolicyModal(key)} className="tw-mono text-xs hover:underline cursor-pointer transition-opacity hover:opacity-100" style={{ opacity: 0.55, color: "var(--blueprint)" }}>
              {label}
            </button>
          ))}
        </div>
        
        <div className="tw-mono text-[10px]" style={{ opacity: 0.35 }}>© {new Date().getFullYear()} TrustWork Property Care Services. All rights reserved. · care.trustwork.co.in</div>
      </div>

      {policyModal && <PolicyModal type={policyModal} onClose={() => setPolicyModal(null)} />}
      {checkoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative animate-fade-in-up">
            <button onClick={() => setCheckoutModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"><X size={20} /></button>
            <div className="tw-display font-bold text-xl mb-1 text-[var(--ink)]">
              {checkoutModal === 'payment' ? 'Secure Your Property' : 'Request Call Back'}
            </div>
            <p className="tw-body text-sm mb-6 text-gray-500">
              {checkoutModal === 'payment' 
                ? `Provide your details to lock in your ${dbs.plans[activeCalcPlan]?.name} plan for ${calcSize} sqft.`
                : 'Provide your details and we will call you back shortly.'}
            </p>
            
            {leadMsg && (
              <div className={`p-4 mb-6 rounded-lg text-sm font-semibold flex items-center justify-center text-center ${leadMsg.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {leadMsg.text}
              </div>
            )}

            {!leadMsg?.type || leadMsg.type === 'error' ? (
              <>
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex flex-col gap-1.5">
                    <label className="tw-body text-xs font-bold uppercase tracking-wider text-gray-500">Full Name</label>
                    <input type="text" placeholder="John Doe" className="px-4 py-2.5 rounded-lg border border-gray-200 tw-body text-sm bg-gray-50 outline-none focus:border-[var(--brass)] transition-colors" value={leadForm.name} onChange={e => setLeadForm({...leadForm, name: e.target.value})} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="tw-body text-xs font-bold uppercase tracking-wider text-gray-500">Phone Number</label>
                    <input type="tel" placeholder="+91 90000 00000" className="px-4 py-2.5 rounded-lg border border-gray-200 tw-body text-sm bg-gray-50 outline-none focus:border-[var(--brass)] transition-colors" value={leadForm.phone} onChange={e => setLeadForm({...leadForm, phone: e.target.value})} />
                  </div>
                </div>

                {checkoutModal === 'payment' && (
                  <div className="mb-4">
                    <div className="flex gap-2">
                      <input type="text" placeholder="Promo Code" value={couponCode} onChange={e => {setCouponCode(e.target.value.toUpperCase()); setDiscountAmount(0); setCouponMsg(null)}} className="flex-1 px-3 py-2 border rounded-md tw-body text-sm uppercase bg-gray-50 outline-none focus:border-[var(--brass)]" />
                      <button onClick={handleApplyCoupon} className="px-4 py-2 rounded-md font-semibold text-white tw-body text-sm" style={{ background: "var(--blueprint)" }}>Apply</button>
                    </div>
                    {couponMsg && (
                      <div className={`mt-2 text-xs font-medium ${couponMsg.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                        {couponMsg.text}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  {checkoutModal === 'payment' ? (
                    <button 
                      onClick={() => handleLeadSubmit('payment')}
                      className="w-full py-3.5 rounded-lg font-bold text-sm hover:scale-105 transition-transform flex items-center justify-center shadow-lg" 
                      style={{ background: "var(--blueprint)", color: "white" }}
                    >
                      Proceed to Payment (₹{Math.max(0, Math.round(calcFee(activeCalcPlan, calcSize, calcCycle, dbs.plans)) - discountAmount).toLocaleString('en-IN')})
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleLeadSubmit('callback')}
                      className="w-full py-3.5 rounded-lg font-bold text-sm hover:scale-105 transition-transform flex items-center justify-center shadow-lg" 
                      style={{ background: "var(--blueprint)", color: "white" }}
                    >
                      Submit Request
                    </button>
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
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
function Shell({ title, subtitle, planInfo, onLogout, onSettings, onRefresh, children, tabs, activeTab, onTabChange, headerAction, hideContact }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshDone, setRefreshDone] = useState(false);
  const handleRefresh = async () => {
    if (refreshing) return;
    setRefreshing(true);
    setRefreshDone(false);
    await onRefresh();
    setRefreshing(false);
    setRefreshDone(true);
    setTimeout(() => setRefreshDone(false), 1800);
  };
  return (
    <div className="min-h-full flex flex-col" style={{ background: "var(--paper)", color: "var(--ink)" }}>
      <style>{`
        .tw-display { font-family: 'Zilla Slab', serif; } .tw-body { font-family: 'Source Sans 3', sans-serif; } .tw-mono { font-family: 'IBM Plex Mono', monospace; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 0.7s linear infinite; }
      `}</style>
      <div className="px-4 sm:px-8 py-3 shrink-0" style={{ background: "var(--blueprint)" }}>
        <div className="flex items-center gap-3">

          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <img src="/newlogo_light.png" alt="TrustWork" className="h-10 w-auto object-contain" />
            <div className="leading-tight mt-0.5">
              <div className="tw-display font-bold text-white text-[19px]">TrustWork</div>
              <div className="text-[9px] tw-body tracking-wider uppercase font-bold" style={{ color: "var(--brass)", opacity: 0.95 }}>Property Care & Management</div>
              {planInfo && (
                <div className="tw-mono text-[10px] mt-0.5 flex items-center gap-2 flex-wrap">
                  <span className="px-1.5 py-0.5 rounded" style={{ background: "rgba(184,134,59,0.3)", color: "#F6D88A" }}>{planInfo.planName}</span>
                  {planInfo.expiry && <span style={{ color: "rgba(246,241,231,0.55)" }}>Expires {new Date(planInfo.expiry).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' })}</span>}
                </div>
              )}
            </div>
          </div>

          {/* Desktop: tabs + actions — all inline */}
          <div className="hidden sm:flex items-center gap-4 flex-1 flex-wrap pl-4">
            {/* New Customer (or other headerAction) */}
            {headerAction && headerAction}

            {/* Tabs */}
            {tabs && tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => onTabChange(t.id)}
                className="tw-body px-3 py-2 rounded-md text-sm font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap hover:bg-white/10 hover:text-white"
                style={activeTab === t.id ? { background: "rgba(255,255,255,0.15)", color: "white" } : { color: "rgba(255,255,255,0.6)" }}
              >
                <t.icon size={14} /> {t.label}
              </button>
            ))}

            {/* Refresh */}
            {onRefresh && (
              <button onClick={handleRefresh} disabled={refreshing} className="tw-body flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-md cursor-pointer hover:bg-white/10 transition-colors" style={{ color: refreshDone ? "#86efac" : "#F6F1E7", opacity: refreshing ? 0.7 : 1 }} title="Refresh">
                <RefreshCw size={14} className={refreshing ? "spin" : ""} />
                {refreshDone ? "Refreshed ✓" : "Refresh"}
              </button>
            )}

            {!hideContact && (
              <div className="flex-1 flex justify-end items-center gap-5 tw-body font-semibold text-[13px] pr-2" style={{ color: "rgba(246,241,231,0.7)" }}>
                <div className="hidden lg:flex items-center gap-1.5">
                  <Phone size={13} />
                  <a href="tel:+919353010107" className="hover:text-white transition-colors cursor-pointer">+91 9353010107</a>
                  <span style={{ opacity: 0.5 }}>,</span>
                  <a href="tel:+917676740107" className="hover:text-white transition-colors cursor-pointer">+91 7676740107</a>
                </div>
                <a href="mailto:care@trustwork.co.in" className="hidden lg:flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                  <Mail size={13} /> care@trustwork.co.in
                </a>
              </div>
            )}

            {/* Menu (settings + logout) */}
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)} className="tw-body flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-md cursor-pointer hover:bg-white/10 transition-colors" style={{ color: "#F6F1E7" }}>
                <User size={14} /> Menu
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-50 border border-gray-100">
                  {onSettings && (
                    <button onClick={() => { setMenuOpen(false); onSettings(); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 cursor-pointer transition-colors" style={{ color: "var(--ink)" }}>
                      <User size={14} /> Admin settings
                    </button>
                  )}
                  <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 cursor-pointer transition-colors" style={{ color: "var(--ink)" }}>
                    <LogOut size={14} /> Log out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile: only hamburger menu — everything inside */}
          <div className="sm:hidden flex items-center gap-2 ml-auto relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="tw-body flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-md cursor-pointer hover:bg-white/10 transition-colors" style={{ color: "#F6F1E7" }}>
              <Menu size={18} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-md shadow-xl py-1 z-50 border border-gray-100">
                {/* headerAction (New Customer) in mobile menu */}
                {headerAction && (
                  <div className="px-3 py-2 border-b border-gray-100 [&>button]:!text-[var(--ink)] [&>button]:w-full [&>button]:justify-start [&>button]:!px-1">
                    {headerAction}
                  </div>
                )}
                {/* Tabs in menu on mobile */}
                {tabs && tabs.map((t) => (
                  <button key={t.id} onClick={() => { onTabChange(t.id); setMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors" style={{ color: activeTab === t.id ? "var(--blueprint)" : "var(--ink)", background: activeTab === t.id ? "rgba(22,50,63,0.05)" : "transparent" }}>
                    <t.icon size={14} /> {t.label}
                  </button>
                ))}
                {/* Divider */}
                {(tabs || headerAction) && <div className="border-t border-gray-100 my-1" />}
                {/* Refresh */}
                {onRefresh && (
                  <button onClick={() => { handleRefresh(); setMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 cursor-pointer transition-colors" style={{ color: refreshDone ? "#16a34a" : "var(--ink)" }}>
                    <RefreshCw size={14} className={refreshing ? "spin" : ""} />
                    {refreshDone ? "Refreshed ✓" : "Refresh"}
                  </button>
                )}
                {/* Settings */}
                {onSettings && (
                  <button onClick={() => { setMenuOpen(false); onSettings(); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 cursor-pointer transition-colors" style={{ color: "var(--ink)" }}>
                    <User size={14} /> Admin settings
                  </button>
                )}
                {/* Logout */}
                <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 cursor-pointer transition-colors" style={{ color: "var(--ink)" }}>
                  <LogOut size={14} /> Log out
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
      <div className="flex-1 px-6 sm:px-10 py-8 w-full max-w-5xl mx-auto">{children}</div>
    </div>
  );
}


function CustomerPropertyDetail({ p, customer, onBack, onChangePlan, onAgree, onUpdate, onLogout, dbs }) {
  const [agreed, setAgreed] = useState(p.agreed || false);
  const [showEdit, setShowEdit] = useState(false);
  const [paying, setPaying] = useState(false);



  const handleAgree = () => {
    setAgreed(true);
    if (onAgree) onAgree();
  };

  const handleRenew = () => {
    const fee = calcFee(p.plan, p.size, p.billingCycle, dbs.plans);
    if (!fee) return alert("Error calculating fee.");
    setPaying(true);
    processCheckout({
      amount: fee,
      description: `Renewal: ${dbs.plans[p.plan]?.name}`,
      onSuccess: async (paymentId) => {
        const paymentDate = new Date().toISOString();
        const expiryDate = calcExpiry(paymentDate, p.billingCycle);
        const updated = { ...p, paymentDate, expiryDate, paymentStatus: 'paid', paymentId };
        await onUpdate(updated);
        setPaying(false);
        alert("Plan renewed successfully!");
      },
      onError: (err) => {
        setPaying(false);
        alert(err.message);
      }
    });
  };

  const handleBuyExtraVisit = () => {
    const monthlyFee = calcFee(p.plan, p.size, '1_month', dbs.plans);
    const extraVisitCost = monthlyFee * 0.90; // 10% discount
    if (!extraVisitCost) return alert("Error calculating cost.");
    setPaying(true);
    processCheckout({
      amount: extraVisitCost,
      description: `Extra Visit (10% Off) - ${p.title}`,
      onSuccess: async (paymentId) => {
        const pendingExtraVisits = (p.pendingExtraVisits || 0) + 1;
        const updated = { ...p, pendingExtraVisits };
        await onUpdate(updated);
        setPaying(false);
        alert("Extra visit purchased successfully! Our team will be notified.");
      },
      onError: (err) => {
        setPaying(false);
        alert(err.message);
      }
    });
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
      title="TrustWork" subtitle={`${customer.name} · ${dbs.plans[p.plan]?.name || p.plan}`} onLogout={onLogout}>
      <div className="flex items-center justify-between mb-5">
        <button onClick={onBack} className="tw-body text-sm flex items-center gap-1" style={{ opacity: 0.6 }}>
          <ArrowLeft size={14} /> All properties
        </button>
        <div className="flex items-center gap-4">
          <button onClick={() => setShowEdit(true)} className="tw-body text-sm flex items-center gap-1.5 font-semibold transition-opacity hover:opacity-100" style={{ color: "var(--blueprint)", opacity: 0.8 }}>
            <Pencil size={14} /> Edit property
          </button>
          {p.status === "pending" && (
            <button onClick={() => window.confirm("Delete this pending property?") && onUpdate({ ...p, _delete: true })} className="tw-body text-sm flex items-center gap-1.5 font-semibold text-red-500 transition-opacity hover:opacity-100 opacity-80">
              <Trash2 size={14} /> Delete
            </button>
          )}
          {p.status === "active" && (
            <button onClick={() => window.confirm("Request deletion of this active property? Admin must approve.") && onUpdate({ ...p, status: "delete_pending" })} className="tw-body text-sm flex items-center gap-1.5 font-semibold text-red-500 transition-opacity hover:opacity-100 opacity-80">
              <Trash2 size={14} /> Request Delete
            </button>
          )}
          {p.status === "delete_pending" && (
            <span className="tw-body text-sm flex items-center gap-1.5 font-semibold text-orange-500 opacity-80">
               Deletion pending
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <div className="tw-mono text-[11px] uppercase tracking-wider mb-1" style={{ opacity: 0.5 }}>{p.id}</div>
          <div className="tw-display font-bold text-2xl">{p.title}</div>
          <div className="tw-body text-sm flex items-center gap-1.5 mt-1" style={{ opacity: 0.65 }}>
            <MapPin size={14} /> {p.address}
          </div>
        </div>
        <Badge tone={p.status === "active" ? "moss" : "brass"}>
          {p.status === "active" ? "Active" : "Pending approval"}
        </Badge>
      </div>

      <details className="bg-white rounded-lg mb-8 group" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
        <summary className="p-4 sm:p-5 cursor-pointer flex justify-between items-center list-none outline-none">
          <div className="tw-display font-bold text-lg">Property Details</div>
          <div className="text-gray-400 group-open:rotate-180 transition-transform duration-200">
            <ChevronDown size={20} />
          </div>
        </summary>
        <div className="p-4 sm:p-5 pt-0 grid sm:grid-cols-2 gap-y-4 gap-x-8 border-t" style={{ borderColor: "rgba(30,42,47,0.05)" }}>
          <div className="mt-4">
            <div className="tw-mono text-[10px] uppercase tracking-wider mb-1" style={{ opacity: 0.5 }}>Type</div>
            <div className="tw-body font-semibold text-sm">{p.type}</div>
          </div>
          <div className="mt-4">
            <div className="tw-mono text-[10px] uppercase tracking-wider mb-1" style={{ opacity: 0.5 }}>Size</div>
            <div className="tw-body font-semibold text-sm">{p.size} sq. ft</div>
          </div>
          <div className="sm:col-span-2">
            <div className="tw-mono text-[10px] uppercase tracking-wider mb-1" style={{ opacity: 0.5 }}>Map Link</div>
            {p.latlong ? <a href={p.latlong} target="_blank" rel="noreferrer" className="tw-body text-sm text-blue-600 hover:underline">{p.latlong}</a> : <div className="tw-body text-sm italic" style={{ opacity: 0.5 }}>Not provided</div>}
          </div>
          <div className="sm:col-span-2">
            <div className="tw-mono text-[10px] uppercase tracking-wider mb-1" style={{ opacity: 0.5 }}>Proof Document</div>
            {p.docLink ? <a href={p.docLink} target="_blank" rel="noreferrer" className="tw-body text-sm flex items-center gap-1.5 text-blue-600 hover:underline"><FileText size={14}/> {p.docName || 'View Document'}</a> : p.docName ? <div className="tw-body text-sm flex items-center gap-1.5"><FileText size={14}/> {p.docName}</div> : <div className="tw-body text-sm italic" style={{ opacity: 0.5 }}>Not provided</div>}
          </div>
          <div className="sm:col-span-2 mt-2">
            <div className="tw-mono text-[10px] uppercase tracking-wider mb-1" style={{ opacity: 0.5 }}>Description / Summary</div>
            {p.summary ? <p className="tw-body text-sm leading-relaxed">{p.summary}</p> : <div className="tw-body text-sm italic" style={{ opacity: 0.5 }}>Not provided</div>}
          </div>
        </div>
      </details>
      {!agreed ? (
        <div className="mb-8 p-5 rounded-lg bg-white" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
          <div className="tw-display font-bold text-lg mb-4">Agreement & Payment</div>
          
          <div className="mb-5">
            <div className="tw-body text-sm font-semibold mb-2" style={{ opacity: 0.8 }}>Choose or review your plan:</div>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.values(dbs.plans).map((pl) => (
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
            <span style={{ opacity: 0.7 }}>Payment Status:</span> 
            <Badge tone={p.paymentStatus === 'paid' ? "moss" : "brass"}>
              {p.paymentStatus === 'paid' ? "Paid" : "Pending verification"}
            </Badge>
          </div>
        </div>
      ) : (
        <div className="mb-8 p-5 rounded-lg bg-white" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="tw-display font-bold text-lg">Billing & Plan</div>
            <Badge tone="moss">Agreement signed & Paid</Badge>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div className="p-4 rounded-md" style={{ background: "rgba(30,42,47,0.02)", border: "1px solid rgba(30,42,47,0.05)" }}>
              <div className="tw-body text-xs font-semibold mb-1" style={{ opacity: 0.6 }}>CURRENT PLAN</div>
              <div className="tw-body font-bold text-base">{dbs.plans[p.plan]?.name || p.plan} — ₹{dbs.plans[p.plan]?.ratePerSqft || 0}/sqft/mo</div>
              <div className="tw-body text-sm mt-1" style={{ opacity: 0.8 }}>Cycle: {p.billingCycle === '12_months' ? 'Annually' : p.billingCycle === '6_months' ? 'Every 6 Months' : 'Monthly'} (₹{calcFee(p.plan, p.size, p.billingCycle, dbs.plans).toLocaleString('en-IN')})</div>
              <div className="tw-body text-[11px] mt-2 font-medium" style={{ opacity: 0.65 }}>
                {dbs.plans[p.plan]?.numVisits || 0} visits · {dbs.plans[p.plan]?.numPhotos === 999 ? 'Unlimited' : dbs.plans[p.plan]?.numPhotos || 0} photos · {dbs.plans[p.plan]?.numVideos === 999 ? 'Unlimited' : dbs.plans[p.plan]?.numVideos || 0} video(s)
              </div>
              <div className="tw-body text-[11px] mt-0.5 font-medium text-green-700">
                Extra Visit Cost: ₹{Math.round((dbs.plans[p.plan]?.ratePerSqft || 0) * p.size * 0.90).toLocaleString('en-IN')}
              </div>
            </div>
            
            <div className="p-4 rounded-md flex justify-between items-center" style={{ background: "rgba(30,42,47,0.02)", border: "1px solid rgba(30,42,47,0.05)" }}>
              <div>
                <div className="tw-body text-xs font-semibold mb-1 flex items-center gap-2" style={{ opacity: 0.6 }}>
                  NEXT RENEWAL {p.expiryDate && new Date() > new Date(p.expiryDate) && <Badge tone="tomato">OVERDUE</Badge>}
                </div>
                <div className="tw-body font-bold text-base" style={p.expiryDate && new Date() > new Date(p.expiryDate) ? { color: "red" } : {}}>{p.expiryDate ? fmtDate(p.expiryDate) : '—'}</div>
                <div className="tw-body text-[11px] mt-1 font-medium text-green-700">
                  Amount due: ₹{calcFee(p.plan, p.size, p.billingCycle, dbs.plans).toLocaleString('en-IN')}
                </div>
                <div className="tw-body text-[11px] mt-0.5" style={{ opacity: 0.7 }}>Last paid: {p.paymentDate ? fmtDate(p.paymentDate) : '—'}</div>
              </div>
              <button disabled={paying} onClick={handleRenew} className="px-3 py-1.5 rounded bg-white text-sm font-semibold tw-body shadow-sm border cursor-pointer hover:bg-gray-50 transition-colors disabled:opacity-50" style={{ color: 'var(--blueprint)', borderColor: 'rgba(30,42,47,0.1)' }}>{paying ? '...' : 'Renew'}</button>
            </div>
          </div>

          <div className="border-t pt-4 mt-2 flex justify-between items-center" style={{ borderColor: "rgba(30,42,47,0.1)" }}>
            <div>
              <div className="tw-body font-semibold text-sm">Need an extra visit this month?</div>
              <div className="tw-body text-xs mt-0.5" style={{ opacity: 0.7 }}>Purchase an on-demand visit for ₹{calcFee(p.plan, p.size, '1_month', dbs.plans) * 0.90} (10% off)</div>
            </div>
            <button disabled={paying} onClick={handleBuyExtraVisit} className="px-3 py-1.5 rounded text-sm font-semibold tw-body cursor-pointer transition-colors disabled:opacity-50" style={{ background: 'var(--brass)', color: 'var(--blueprint)' }}>{paying ? '...' : 'Buy Extra Visit'}</button>
          </div>
          {p.pendingExtraVisits > 0 && (
            <div className="mt-3 tw-body text-xs font-semibold px-3 py-2 rounded-md" style={{ background: 'rgba(75,93,69,0.1)', color: 'var(--moss)' }}>
              ✓ You have {p.pendingExtraVisits} pending extra visit(s) requested.
            </div>
          )}
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
          dbs={dbs}
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

/* ================= CUSTOMER REWARDS ================= */
function CustomerRewardsTab({ customer }) {
  const [coupons, setCoupons] = useState([]);

  const fetchCoupons = useCallback(async () => {
    try {
      const res = await fetch(`/api/my-coupons/${customer.phone}`);
      if (res.ok) setCoupons(await res.json());
    } catch (e) { console.error(e); }
  }, [customer.phone]);

  useEffect(() => { fetchCoupons(); }, [fetchCoupons]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl p-8 shadow-sm border" style={{ borderColor: 'rgba(30,42,47,0.1)' }}>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--blueprint)' }}>
            <Gift size={40} className="text-white" />
          </div>
          <div>
            <h2 className="tw-display font-bold text-2xl text-gray-900">Refer & Earn Rewards</h2>
            <p className="tw-body text-gray-600 mt-2 leading-relaxed">
              Share TrustWork Property Care with your friends and family. For every new property registered using your phone number as a referral code, you will earn exclusive discount coupons that you can use for your next renewals or new properties.
            </p>
            <div className="mt-4 flex gap-4">
              <div className="p-3 bg-green-50 text-green-800 rounded-lg border border-green-100 flex-1">
                <div className="text-xs font-bold uppercase tracking-wider mb-1">Your Referral Code</div>
                <div className="text-xl font-mono font-bold tracking-widest">{customer.phone}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="tw-display font-bold text-xl mt-8">My Coupons</h3>
      {coupons.length === 0 ? (
        <div className="text-center p-12 bg-white rounded-lg border" style={{ borderColor: 'rgba(30,42,47,0.1)' }}>
          <Tag size={32} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 tw-body">You don't have any available coupons right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coupons.map(c => (
            <div key={c.id} className="relative overflow-hidden rounded-xl bg-white border flex shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: 'rgba(184,134,59,0.3)' }}>
              <div className="w-24 flex-shrink-0 flex items-center justify-center text-white p-4" style={{ background: 'var(--brass)' }}>
                <span className="font-bold text-2xl -rotate-90 tracking-widest uppercase">COUPON</span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-center">
                <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Promo Code</div>
                <div className="text-2xl font-mono font-bold text-gray-900 mb-2">{c.code}</div>
                <div className="text-gray-600 font-medium">
                  {c.type === 'percentage' ? `${c.value}% OFF` : `₹${c.value} OFF`} on your next payment
                </div>
                {c.expiresAt && <div className="text-xs text-red-500 mt-2 font-semibold">Valid until: {new Date(c.expiresAt).toLocaleDateString()}</div>}
              </div>
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <Gift size={80} />
              </div>
            </div>
          ))}
        </div>
      )}
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

  const latestPhoto = myProps.flatMap(p => p.visits || []).flatMap(v => v.photos || [])[0];

  const addProperty = async (form) => {
    const existingCustProps = Object.values(dbs.properties || {}).filter(p => p.customerId === customer.id);
    const maxSeq = existingCustProps.reduce((max, p) => {
      const seq = parseInt(p.id.slice(customer.id.length), 10);
      return isNaN(seq) ? max : Math.max(max, seq);
    }, 0);
    const propId = `${customer.id}${String(maxSeq + 1).padStart(2, '0')}`;

    const newProp = {
      id: propId, customerId: customer.id, type: form.type, title: form.title,
      address: form.address, latlong: form.latlong, size: form.size, summary: form.summary, plan: form.plan,
      status: "pending", createdAt: todayISO(), visits: [],
      agreed: form.agreementSigned || false,
      agreementSigned: form.agreementSigned || false,
      paymentDate: form.paymentDate || null,
      expiryDate: form.expiryDate || null,
      paymentStatus: form.paymentStatus || null,
      paymentId: form.paymentId || null,
      docName: form.docName || null,
      docLink: form.docLink || null,
    };
    await fetch('/api/properties', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newProp) });
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
    if (updatedProp._delete) {
      await fetch(`/api/properties/${updatedProp.id}`, { method: 'DELETE' });
      setOpenProp(null);
    } else {
      const p = dbs.properties[updatedProp.id];
      const isPlanChanged = p.plan !== updatedProp.plan;
      await fetch(`/api/properties/${updatedProp.id}`, { method: 'PUT', body: JSON.stringify({ ...p, ...updatedProp, agreed: isPlanChanged ? false : p.agreed }) });
    }
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
    return <CustomerPropertyDetail p={p} customer={customer} onBack={() => setOpenProp(null)} onChangePlan={(planId) => changePlan(p.id, planId)} onAgree={() => handleAgree(p.id)} onUpdate={updateProperty} onLogout={onLogout} dbs={dbs} />;
  }
  return (
    <Shell 
      title="TrustWork" subtitle={customer.name} onLogout={onLogout} onRefresh={refresh}
      tabs={[
        { id: "profile", label: "Profile", icon: User },
        { id: "properties", label: "My properties", icon: Landmark },
        { id: "cases", label: "My cases", icon: MessageSquare },
        { id: "rewards", label: "Rewards", icon: Gift },
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
                    <div className="flex flex-wrap gap-2">
                      <Badge tone="ink">{p.type}</Badge>
                      <Badge tone="brass">{dbs.plans[p.plan]?.name || p.plan}</Badge>
                    </div>
                    <Badge tone={p.status === "active" ? "moss" : "brass"}>{p.status === "active" ? "Active" : "Pending"}</Badge>
                  </div>
                  <div className="tw-mono text-[10px] mt-3 uppercase tracking-wider" style={{ opacity: 0.5 }}>{p.id}</div>
                  <div className="tw-display font-bold text-lg mt-0.5">{p.title}</div>
                  <div className="tw-body text-sm flex items-center gap-1.5 mt-1" style={{ opacity: 0.6 }}>
                    <MapPin size={13} /> {p.address}
                  </div>
                  <div className="flex justify-between items-end mt-3">
                    <div className="tw-mono text-[11px]" style={{ opacity: 0.5 }}>
                      {(p.visits || []).length} visit(s) logged
                    </div>
                    {p.expiryDate && (
                      <div className="text-right">
                        <div className="tw-mono text-[9px] uppercase font-bold flex items-center justify-end gap-1.5" style={{ opacity: 0.5, color: "var(--ink)" }}>
                          {new Date() > new Date(p.expiryDate) && <Badge tone="tomato">OVERDUE</Badge>}
                          Next Renewal
                        </div>
                        <div className="tw-body font-bold text-[11px]" style={{ color: new Date() > new Date(p.expiryDate) ? "red" : "var(--brass)" }}>{fmtDate(p.expiryDate)}</div>
                        <div className="tw-body text-[9px] mt-0.5 font-bold" style={{ opacity: 0.5 }}>Last paid: {p.paymentDate ? fmtDate(p.paymentDate) : '—'}</div>
                      </div>
                    )}
                  </div>

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

      {tab === "rewards" && (
        <CustomerRewardsTab customer={customer} />
      )}

      {showAdd && <AddPropertyModal dbs={dbs} customer={customer} onClose={() => setShowAdd(false)} onSave={addProperty} />}
    </Shell>
  );
}

function AddPropertyModal({ onClose, onSave, initialData, dbs, customer }) {
  const [step, setStep] = useState(1); // 1=details, 2=agreement, 3=payment
  const [form, setForm] = useState(initialData || { type: PROPERTY_TYPES[0], title: "", address: "", latlong: "", size: "", summary: "", plan: "essential", billingCycle: "1_month" });
  const [docFile, setDocFile] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [paying, setPaying] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  const selectedPlan = dbs.plans[form.plan];
  const isLocked = initialData && initialData.status === 'active';
  const monthlyFee = calcFee(form.plan, form.size, '1_month', dbs.plans);
  const feeAmount = calcFee(form.plan, form.size, form.billingCycle, dbs.plans);

  const handleDetailsNext = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.address.trim() || !form.size.trim()) return;

    let updatedForm = { ...form };
    if (docFile) {
      setPaying(true); // use paying state to show loading button
      try {
        const formData = new FormData();
        formData.append('file', docFile);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        updatedForm = { ...updatedForm, docName: docFile.name, docLink: data.url };
      } catch (err) {
        alert("Failed to upload document. Please try again.");
        setPaying(false);
        return;
      }
      setPaying(false);
    }
    setForm(updatedForm);

    if (initialData) { onSave(updatedForm); return; } // edit mode — just save
    setStep(2);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, phone: customer?.phone }),
      });
      const data = await res.json();
      if (!data.success) {
        setCouponMsg({ type: 'error', text: data.error });
        setDiscountAmount(0);
      } else {
        const c = data.coupon;
        let amt = 0;
        if (c.type === 'percentage') {
          amt = feeAmount * (c.value / 100);
        } else {
          amt = c.value;
        }
        setDiscountAmount(amt);
        setCouponMsg({ type: 'success', text: `Coupon applied! You saved ₹${amt.toLocaleString('en-IN')}` });
      }
    } catch (err) {
      setCouponMsg({ type: 'error', text: 'Error verifying coupon' });
    }
  };

  const finalAmount = Math.max(0, feeAmount - discountAmount);

  const handlePayment = async () => {
    if (!feeAmount) return;
    setPaying(true);
    await processCheckout({
      amount: finalAmount,
      description: `${selectedPlan?.name} — ${form.title}`,
      prefill: customer ? { name: customer.name, contact: customer.phone, email: customer.email } : undefined,
      couponCode: discountAmount > 0 ? couponCode : undefined,
      onSuccess: (paymentId) => {
        const paymentDate = new Date().toISOString();
        const expiryDate = calcExpiry(paymentDate, form.billingCycle);
        onSave({ ...form, agreementSigned: true, paymentDate, expiryDate, paymentStatus: 'paid', paymentId });
        setPaying(false);
      },
      onError: (err) => {
        alert(err.message || 'Payment failed.');
        setPaying(false);
      }
    });
  };

  const STEP_LABELS = ['Property Details', 'Agreement', 'Payment'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(22,50,63,0.5)" }}>
      <div className="w-full max-w-xl rounded-lg p-6 max-h-[90vh] overflow-y-auto" style={{ background: "var(--paper)" }}>
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-5">
          {STEP_LABELS.map((label, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: step > i + 1 ? 'var(--moss)' : step === i + 1 ? 'var(--blueprint)' : 'rgba(30,42,47,0.1)', color: step >= i + 1 ? 'white' : 'rgba(30,42,47,0.4)' }}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className="tw-body text-xs font-semibold hidden sm:inline" style={{ color: step === i + 1 ? 'var(--blueprint)' : 'rgba(30,42,47,0.4)' }}>{label}</span>
              </div>
              {i < 2 && <div className="flex-1 h-px" style={{ background: step > i + 1 ? 'var(--moss)' : 'rgba(30,42,47,0.1)' }} />}
            </React.Fragment>
          ))}
          <button onClick={onClose} className="ml-2"><X size={18} /></button>
        </div>

        {/* Step 1: Property Details */}
        {step === 1 && (
          <form onSubmit={handleDetailsNext} className="grid sm:grid-cols-2 gap-x-4">
            <div className="sm:col-span-2 tw-display font-bold text-lg mb-2">{initialData ? 'Edit Property' : 'Register a property'}</div>
            <Field label="Property type" required>
              <select disabled={isLocked} className={inputCls} style={inputStyle} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Property name / nickname" required>
              <input className={inputCls} style={inputStyle} placeholder="e.g. Whitefield 30x40 site" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Address" required>
                <input disabled={isLocked} className={inputCls} style={inputStyle} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Google map location link">
                <input disabled={isLocked} className={inputCls} style={inputStyle} placeholder="e.g. https://maps.app.goo.gl/..." value={form.latlong} onChange={(e) => setForm({ ...form, latlong: e.target.value })} />
              </Field>
            </div>
            <Field label="Property Size (sq ft)" required>
              <input disabled={isLocked} className={inputCls} style={inputStyle} placeholder="e.g. 1200" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} required />
            </Field>
            <div className="sm:col-span-2">
              {isLocked && (
                <div className="mb-4 p-3 rounded-md bg-orange-50 border border-orange-100 flex items-start gap-2">
                  <AlertCircle size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                  <p className="tw-body text-xs text-orange-800 leading-relaxed">
                    Core property details (address, location, size, and type) are locked because this property is currently active. To update these details, please contact support.
                  </p>
                </div>
              )}
              <Field label="Ownership Proof Document (Max 5MB)">
                <input type="file" accept=".pdf,image/*" className={inputCls} style={inputStyle} onChange={(e) => {
                  const file = e.target.files[0];
                  if (file && file.size > 5 * 1024 * 1024) { alert("File size must be less than 5MB."); e.target.value = ""; setDocFile(null); } else if (file) { setDocFile(file); setForm({ ...form, docName: file.name }); }
                }} />
                {docFile && <div className="text-xs mt-1 text-green-700 font-medium flex items-center gap-1"><CheckCircle2 size={12} /> {docFile.name}</div>}
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Property Summary">
                <textarea className={inputCls} style={inputStyle} rows={3} maxLength={500} placeholder="Brief details about the property (max 500 characters)..." value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
                <div className="text-right mt-1 text-xs" style={{ opacity: 0.5 }}>{(form.summary || "").length} / 500</div>
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Care plan" required>
                <select className={inputCls} style={inputStyle} value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })}>
                  {Object.values(dbs.plans || {}).map((p) => <option key={p.id} value={p.id}>{p.name} — ₹{p.ratePerSqft}/sqft/month — {p.numVisits} visit(s)</option>)}
                </select>
              </Field>
              {form.size && monthlyFee && (
                <div className="mt-2 px-3 py-2 rounded-md text-sm tw-body" style={{ background: 'rgba(30,42,47,0.05)' }}>
                  Estimated monthly fee: <strong>₹{monthlyFee.toLocaleString('en-IN')}</strong> ({form.size} sqft × ₹{selectedPlan?.ratePerSqft}/sqft)
                </div>
              )}
            </div>
            <div className="sm:col-span-2 mt-3">
              <button type="submit" className="w-full py-2.5 rounded-md font-semibold text-white tw-body flex items-center justify-center gap-2 cursor-pointer hover:opacity-90" style={{ background: "var(--blueprint)" }}>
                {initialData ? 'Save changes' : 'Next: Agreement & Payment →'}
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Agreement */}
        {step === 2 && (
          <div>
            <div className="tw-display font-bold text-lg mb-4">TrustWork Property Care Agreement</div>
            <div className="rounded-md p-4 text-sm tw-body space-y-3 max-h-60 overflow-y-auto mb-4" style={{ background: 'rgba(30,42,47,0.04)', border: '1px solid rgba(30,42,47,0.1)', lineHeight: 1.7 }}>
              <p><strong>This Agreement</strong> is entered between <strong>TrustWork Property Care Services</strong> ("Company") and the customer ("Client") for property monitoring services.</p>
              <p><strong>1. Services:</strong> The Company agrees to provide property inspection visits, photographic documentation, and development updates as per the selected care plan.</p>
              <p><strong>2. Plan:</strong> Client has selected the <strong>{selectedPlan?.name}</strong> plan at ₹{selectedPlan?.ratePerSqft}/sqft/month. {monthlyFee ? `Monthly fee: ₹${monthlyFee.toLocaleString('en-IN')}.` : ''}</p>
              <p><strong>3. Payment:</strong> Monthly fees are due at the start of each service period. Services will be suspended upon non-payment.</p>
              <p><strong>4. Access:</strong> Client authorizes Company representatives to access and inspect the registered property for monitoring purposes.</p>
              <p><strong>5. Reports:</strong> Visit reports, photos, and videos will be made available through the TrustWork client portal at care.trustwork.co.in.</p>
              <p><strong>6. Termination:</strong> Either party may terminate this agreement with 30 days written notice. Unused fees will be refunded on a pro-rata basis.</p>
              <p><strong>7. Liability:</strong> The Company is not liable for any property damage or loss. Services are limited to monitoring and reporting.</p>
            </div>
            <label className="flex items-start gap-3 cursor-pointer mb-5">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1 cursor-pointer" style={{ width: 16, height: 16 }} />
              <span className="tw-body text-sm">I have read and agree to the TrustWork Property Care Agreement terms and conditions.</span>
            </label>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-2.5 rounded-md font-semibold tw-body cursor-pointer hover:opacity-80" style={{ background: 'rgba(30,42,47,0.08)', color: 'var(--ink)' }}>← Back</button>
              <button disabled={!agreed} onClick={() => setStep(3)} className="flex-1 py-2.5 rounded-md font-semibold text-white tw-body cursor-pointer hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed" style={{ background: "var(--blueprint)" }}>Proceed to Payment →</button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div>
            <div className="tw-display font-bold text-lg mb-4">Payment</div>
            <div className="rounded-lg p-5 mb-5" style={{ background: 'rgba(30,42,47,0.04)', border: '1px solid rgba(30,42,47,0.1)' }}>
              <div className="tw-body text-sm font-semibold mb-3" style={{ opacity: 0.6 }}>ORDER SUMMARY</div>
              <div className="flex justify-between tw-body text-sm mb-1"><span>{form.title}</span><span style={{ opacity: 0.6 }}>{form.address}</span></div>
              <div className="flex justify-between tw-body text-sm mb-1"><span>Plan</span><span className="font-semibold">{selectedPlan?.name}</span></div>
              <div className="flex justify-between tw-body text-sm mb-1"><span>Property size</span><span>{form.size} sq ft</span></div>
              <div className="flex justify-between tw-body text-sm mb-1"><span>Rate</span><span>₹{selectedPlan?.ratePerSqft}/sqft/month</span></div>
              
              <div className="mt-4 mb-2">
                <div className="tw-body text-xs font-semibold mb-2" style={{ opacity: 0.6 }}>SELECT BILLING CYCLE</div>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-3 p-2 rounded border cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: form.billingCycle === '1_month' ? 'var(--blueprint)' : 'rgba(30,42,47,0.1)' }}>
                    <input type="radio" name="cycle" checked={form.billingCycle === '1_month'} onChange={() => setForm({...form, billingCycle: '1_month'})} />
                    <span className="tw-body text-sm flex-1">Pay Monthly</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 rounded border cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: form.billingCycle === '6_months' ? 'var(--blueprint)' : 'rgba(30,42,47,0.1)' }}>
                    <input type="radio" name="cycle" checked={form.billingCycle === '6_months'} onChange={() => setForm({...form, billingCycle: '6_months'})} />
                    <span className="tw-body text-sm flex-1">Pay for 6 Months <Badge tone="moss">4% off</Badge></span>
                  </label>
                  <label className="flex items-center gap-3 p-2 rounded border cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: form.billingCycle === '12_months' ? 'var(--blueprint)' : 'rgba(30,42,47,0.1)' }}>
                    <input type="radio" name="cycle" checked={form.billingCycle === '12_months'} onChange={() => setForm({...form, billingCycle: '12_months'})} />
                    <span className="tw-body text-sm flex-1">Pay Annually <Badge tone="moss">10% off</Badge></span>
                  </label>
                </div>
              </div>

              <div className="border-t mt-4 pt-3 mb-4 flex justify-between tw-body font-bold" style={{ borderColor: 'rgba(30,42,47,0.1)' }}>
                <span>Total Amount</span>
                <span style={{ color: 'var(--blueprint)' }}>₹{feeAmount ? feeAmount.toLocaleString('en-IN') : '—'}</span>
              </div>

              <div className="mb-2">
                <div className="flex gap-2">
                  <input type="text" placeholder="Promo Code" value={couponCode} onChange={e => {setCouponCode(e.target.value.toUpperCase()); setDiscountAmount(0); setCouponMsg(null)}} className="flex-1 px-3 py-2 border rounded-md tw-body text-sm uppercase" />
                  <button onClick={handleApplyCoupon} className="px-4 py-2 rounded-md font-semibold text-white tw-body text-sm" style={{ background: "var(--blueprint)" }}>Apply</button>
                </div>
                {couponMsg && (
                  <div className={`mt-2 text-xs font-medium ${couponMsg.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                    {couponMsg.text}
                  </div>
                )}
              </div>

              {discountAmount > 0 && (
                <div className="border-t mt-3 pt-3 flex justify-between tw-body font-bold text-lg" style={{ borderColor: 'rgba(30,42,47,0.1)' }}>
                  <span>Final Amount</span>
                  <span className="text-green-700">₹{finalAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>
            <div className="rounded-md p-3 mb-4 text-xs tw-body flex items-start gap-2" style={{ background: 'rgba(184,134,59,0.08)', border: '1px solid rgba(184,134,59,0.2)', color: 'var(--brass)' }}>
              <span>ℹ️</span> Secure payment powered by Razorpay. Your card details are never stored by TrustWork.
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="py-2.5 px-4 rounded-md font-semibold tw-body cursor-pointer hover:opacity-80" style={{ background: 'rgba(30,42,47,0.08)', color: 'var(--ink)' }}>← Back</button>
              <button disabled={paying || !feeAmount} onClick={handlePayment} className="flex-1 py-2.5 rounded-md font-semibold text-white tw-body cursor-pointer hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2" style={{ background: paying ? 'gray' : '#2E7D32' }}>
                {paying ? 'Processing...' : `Pay ₹${finalAmount.toLocaleString('en-IN')} via Razorpay`}
              </button>
            </div>
            {!feeAmount && <p className="text-xs text-red-500 mt-2 tw-body">Please go back and enter the property size to calculate fee.</p>}
          </div>
        )}
      </div>
    </div>
  );
}

function AdminCouponsTab({ dbs }) {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({ code: '', type: 'percentage', value: '', tiedToPhone: '', isNewCustomerOnly: false, expiresAt: '' });
  const [loading, setLoading] = useState(false);

  const fetchCoupons = useCallback(async () => {
    try {
      const res = await fetch('/api/coupons');
      if (res.ok) setCoupons(await res.json());
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => { fetchCoupons(); }, [fetchCoupons]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.code || !form.value) return;
    setLoading(true);
    await fetch('/api/coupons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, value: Number(form.value) })
    });
    setForm({ code: '', type: 'percentage', value: '', tiedToPhone: '', isNewCustomerOnly: false, expiresAt: '' });
    await fetchCoupons();
    setLoading(false);
  };

  const inputCls = "w-full rounded-md px-3 py-2.5 tw-body text-sm border focus:outline-none transition-colors";
  const inputStyle = { borderColor: "rgba(30,42,47,0.15)", background: "var(--paper)" };

  return (
    <div>
      <div className="bg-white rounded-lg p-5 mb-6 shadow-sm" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
        <div className="tw-display font-bold text-lg mb-4">Create New Coupon</div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Coupon Code" required><input className={inputCls} style={inputStyle} value={form.code} onChange={e => setForm({...form, code: e.target.value.toUpperCase()})} placeholder="e.g. SUMMER20" required /></Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Type"><select className={inputCls} style={inputStyle} value={form.type} onChange={e => setForm({...form, type: e.target.value})}><option value="percentage">% Off</option><option value="fixed">Flat ₹ Off</option></select></Field>
            <Field label="Value" required><input type="number" className={inputCls} style={inputStyle} value={form.value} onChange={e => setForm({...form, value: e.target.value})} placeholder="e.g. 20" required /></Field>
          </div>
          <Field label="Tied to Phone Number (Optional)"><input className={inputCls} style={inputStyle} value={form.tiedToPhone} onChange={e => setForm({...form, tiedToPhone: e.target.value})} placeholder="e.g. 9448610107" /></Field>
          <Field label="Expiry Date (Optional)"><input type="date" className={inputCls} style={inputStyle} value={form.expiresAt} onChange={e => setForm({...form, expiresAt: e.target.value})} /></Field>
          <label className="flex items-center gap-2 md:col-span-2 tw-body text-sm cursor-pointer mt-2">
            <input type="checkbox" checked={form.isNewCustomerOnly} onChange={e => setForm({...form, isNewCustomerOnly: e.target.checked})} /> New Customers Only
          </label>
          <button type="submit" disabled={loading} className="md:col-span-2 py-2.5 mt-2 rounded-md font-semibold text-white tw-body" style={{ background: "var(--blueprint)" }}>{loading ? 'Creating...' : 'Create Coupon'}</button>
        </form>
      </div>

      <div className="bg-white rounded-lg overflow-hidden shadow-sm" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="tw-body text-xs uppercase tracking-wide bg-gray-50 border-b" style={{ color: "var(--ink)", borderColor: "rgba(30,42,47,0.1)" }}>
              <th className="p-4 font-bold">Code</th>
              <th className="p-4 font-bold">Discount</th>
              <th className="p-4 font-bold">Rules</th>
              <th className="p-4 font-bold">Redemptions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map(c => (
              <tr key={c.id} className="border-b last:border-0" style={{ borderColor: "rgba(30,42,47,0.05)" }}>
                <td className="p-4 tw-mono font-bold text-sm">{c.code}</td>
                <td className="p-4 tw-body text-sm font-semibold">{c.type === 'percentage' ? `${c.value}%` : `₹${c.value}`}</td>
                <td className="p-4 tw-body text-xs space-y-1">
                  {c.tiedToPhone && <div><Badge tone="brass">Tied to {c.tiedToPhone}</Badge></div>}
                  {c.isNewCustomerOnly === 1 && <div><Badge tone="moss">New Customers Only</Badge></div>}
                  {c.expiresAt && <div>Expires: {new Date(c.expiresAt).toLocaleDateString()}</div>}
                  {!c.tiedToPhone && !c.isNewCustomerOnly && !c.expiresAt && <span className="text-gray-400">None</span>}
                </td>
                <td className="p-4 tw-body text-sm font-semibold">{c.redemptionCount} times</td>
              </tr>
            ))}
            {coupons.length === 0 && <tr><td colSpan="4" className="p-8 text-center text-gray-500 tw-body text-sm">No coupons found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminSystemTestTab() {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const runTests = async () => {
    setRunning(true);
    setResults(null);
    setError(null);
    try {
      const res = await fetch('/api/tests/run');
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError(err.message || 'Failed to connect to test engine');
    }
    setRunning(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl p-8 shadow-sm border" style={{ borderColor: 'rgba(30,42,47,0.1)' }}>
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div>
            <h2 className="tw-display font-bold text-2xl text-gray-900">System Testing Engine</h2>
            <p className="tw-body text-gray-600 mt-2 leading-relaxed max-w-xl">
              Run automated integration tests against the live backend to verify database connectivity, lead flows, customer authentication, property state transitions, and the coupon/payment math engine. Dummy records are automatically created and cleaned up.
            </p>
          </div>
          <button 
            onClick={runTests} 
            disabled={running}
            className="flex-shrink-0 px-6 py-3 rounded-md font-bold text-white shadow-md hover:shadow-lg transition-all disabled:opacity-70 flex items-center gap-2" 
            style={{ background: running ? 'gray' : 'var(--blueprint)' }}
          >
            {running ? <><span className="animate-spin inline-block">↻</span> Running Tests...</> : <><CheckCircle2 size={18} /> Run All Tests</>}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 tw-body text-sm font-medium">
          {error}
        </div>
      )}

      {results && (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border" style={{ borderColor: 'rgba(30,42,47,0.1)' }}>
          <div className="p-5 border-b flex justify-between items-center" style={{ borderColor: 'rgba(30,42,47,0.1)', background: 'var(--paper)' }}>
            <div>
              <div className="tw-display font-bold text-lg mb-1">Test Results</div>
              <div className="tw-mono text-xs flex gap-4" style={{ color: "var(--ink)", opacity: 0.7 }}>
                <span>Total: {results.results?.length || 0}</span>
                <span className="text-green-700">Passed: {results.results?.filter(r => r.passed).length || 0}</span>
                <span className="text-red-600">Failed: {results.results?.filter(r => !r.passed).length || 0}</span>
              </div>
            </div>
            <Badge tone={results.success ? 'moss' : 'tomato'}>
              {results.success ? 'All Tests Passed' : 'Some Tests Failed'}
            </Badge>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="tw-body text-xs uppercase tracking-wide bg-gray-50 border-b" style={{ color: "var(--ink)", borderColor: "rgba(30,42,47,0.1)" }}>
                <th className="p-4 font-bold">Test Suite</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold">Duration</th>
                <th className="p-4 font-bold">Logs</th>
              </tr>
            </thead>
            <tbody>
              {results.results?.map((r, i) => (
                <tr key={i} className="border-b last:border-0" style={{ borderColor: "rgba(30,42,47,0.05)" }}>
                  <td className="p-4 tw-body font-bold text-sm">{r.name}</td>
                  <td className="p-4">
                    {r.passed ? (
                      <span className="inline-flex items-center gap-1 text-green-700 text-sm font-semibold"><CheckCircle2 size={16} /> Passed</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-600 text-sm font-semibold"><AlertCircle size={16} /> Failed</span>
                    )}
                  </td>
                  <td className="p-4 tw-mono text-xs text-gray-500">{r.time}ms</td>
                  <td className="p-4 tw-mono text-xs max-w-xs truncate text-red-600">
                    {r.error || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function AdminLeadsTab({ dbs, refresh }) {
  const leads = Object.values(dbs.leads || {}).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  const [selected, setSelected] = useState(new Set());
  
  const toggleSelect = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };
  
  const toggleAll = () => {
    if (selected.size === leads.length) setSelected(new Set());
    else setSelected(new Set(leads.map(l => l.id)));
  };

  const updateStatus = async (lead, status) => {
    await fetch(`/api/leads/${lead.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    refresh();
  };

  const clearSelected = async () => {
    if (!confirm(`Are you sure you want to delete ${selected.size} leads?`)) return;
    await Promise.all(Array.from(selected).map(id => fetch(`/api/leads/${id}`, { method: 'DELETE' })));
    setSelected(new Set());
    refresh();
  };

  const clearAll = async () => {
    if (!confirm('Are you sure you want to delete ALL leads?')) return;
    await fetch('/api/leads', { method: 'DELETE' });
    setSelected(new Set());
    refresh();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <div className="tw-display font-bold text-lg">Sales Leads ({leads.length})</div>
        <div className="flex gap-2">
          {selected.size > 0 && (
            <button onClick={clearSelected} className="text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-red-50 text-red-600 transition-colors border border-red-100">
              Clear Selected ({selected.size})
            </button>
          )}
          {leads.length > 0 && (
            <button onClick={clearAll} className="text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-red-50 text-red-600 transition-colors border border-red-100">
              Clear All
            </button>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left tw-body text-sm">
          <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
            <tr>
              <th className="p-4 w-12"><input type="checkbox" checked={leads.length > 0 && selected.size === leads.length} onChange={toggleAll} className="rounded border-gray-300" /></th>
              <th className="p-4 font-bold">Date</th>
              <th className="p-4 font-bold">Contact</th>
              <th className="p-4 font-bold">Property Details</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(ld => (
              <tr key={ld.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="p-4"><input type="checkbox" checked={selected.has(ld.id)} onChange={() => toggleSelect(ld.id)} className="rounded border-gray-300" /></td>
                <td className="p-4 tw-mono text-xs whitespace-nowrap" style={{ opacity: 0.7 }}>{new Date(ld.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <div className="font-semibold" style={{ color: "var(--ink)" }}>{ld.name}</div>
                  <div className="text-xs text-gray-500">{ld.phone}</div>
                </td>
                <td className="p-4">
                  <div>{ld.propertyType} — {ld.size} sqft</div>
                  <div className="text-xs text-gray-500">{dbs.plans[ld.plan]?.name} ({ld.cycle?.replace('_', ' ')}) — ₹{ld.amount?.toLocaleString('en-IN')}</div>
                </td>
                <td className="p-4">
                  <Badge tone={ld.status === 'paid' ? 'moss' : ld.status === 'called_back' ? 'clay' : 'tomato'}>
                    {ld.status === 'paid' ? 'Paid' : ld.status === 'called_back' ? 'Contacted' : ld.status === 'payment_failed' ? 'Failed Payment' : 'Pending'}
                  </Badge>
                  {ld.paymentId && <div className="tw-mono text-[10px] mt-1 text-gray-400">{ld.paymentId}</div>}
                </td>
                <td className="p-4">
                  {(ld.status === 'pending' || ld.status === 'payment_failed') && (
                    <button onClick={() => updateStatus(ld, 'called_back')} className="text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-gray-200 bg-gray-100 transition-colors text-gray-700">
                      Mark Contacted
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr><td colSpan="6" className="p-8 text-center text-gray-400">No leads captured yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= ADMIN DASHBOARD ================= */
function AdminDashboard({ dbs, refresh, onLogout }) {
  const [tab, setTab] = useState("customers");
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openProp, setOpenProp] = useState(null);
  const [newCreds, setNewCreds] = useState(null);
  const [search, setSearch] = useState("");

  const [editCust, setEditCust] = useState(null);

  const customers = Object.values(dbs.customers || {}).filter(c => c.id !== 'admin');
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

  const deleteCustomer = async (custId) => {
    if (!window.confirm("Are you sure you want to permanently delete this customer and all their properties?")) return;
    await fetch(`/api/customers/${custId}`, { method: 'DELETE' });
    refresh();
    setEditCust(null);
  };

  const deleteProperty = async (propId) => {
    if (!window.confirm("Are you sure you want to permanently delete this property?")) return;
    await fetch(`/api/properties/${propId}`, { method: 'DELETE' });
    refresh();
    setOpenProp(null);
  };

  if (openProp) {
    const p = dbs.properties[openProp];
    const owner = dbs.customers[p.customerId];
    return (
      <Shell title="TrustWork" subtitle="Admin console" onLogout={onLogout} onRefresh={refresh}>
        <button onClick={() => setOpenProp(null)} className="tw-body text-sm flex items-center gap-1 mb-5" style={{ opacity: 0.6 }}>
          <ArrowLeft size={14} /> All properties
        </button>
        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
          <div>
            <div className="tw-display font-bold text-2xl">{p.title}</div>
            <div className="tw-body text-sm mt-1" style={{ opacity: 0.65 }}>{owner ? `${owner.name} · ${owner.id}` : p.customerId}</div>
          </div>
          <div className="flex gap-2 items-center">
            <Badge tone={p.status === "active" ? "moss" : p.status === "delete_pending" ? "tomato" : "brass"}>
              {p.status === "active" ? "Active" : p.status === "delete_pending" ? "Deletion Requested" : "Pending approval"}
            </Badge>
            {p.status !== "active" && p.status !== "delete_pending" && (
              <button onClick={() => approveProperty(p.id)} className="tw-body text-sm font-semibold px-3 py-1.5 rounded-md text-white cursor-pointer hover:opacity-90" style={{ background: "var(--moss)" }}>
                Approve
              </button>
            )}
            {p.status === "delete_pending" && (
              <button onClick={async () => {
                await fetch(`/api/properties/${p.id}`, { method: 'PUT', body: JSON.stringify({ ...p, status: "active" }) });
                refresh();
              }} className="tw-body text-sm font-semibold px-3 py-1.5 rounded-md text-gray-700 bg-gray-200 cursor-pointer hover:bg-gray-300">
                Reject Deletion
              </button>
            )}
            <button onClick={() => deleteProperty(p.id)} className="tw-body text-sm font-semibold px-3 py-1.5 rounded-md text-white cursor-pointer hover:opacity-90" style={{ background: "#e53e3e" }}>
              {p.status === "delete_pending" ? "Approve Deletion" : "Delete Property"}
            </button>
          </div>
        </div>
        <div className="tw-body text-sm flex items-center gap-1.5 mb-6" style={{ opacity: 0.6 }}>
          <MapPin size={13} /> {p.address}
        </div>

        <details className="bg-white rounded-lg mb-6 group" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
          <summary className="p-4 sm:p-5 cursor-pointer flex justify-between items-center list-none outline-none">
            <div className="tw-display font-bold text-lg">Property Details</div>
            <div className="text-gray-400 group-open:rotate-180 transition-transform duration-200">
              <ChevronDown size={20} />
            </div>
          </summary>
          <div className="p-4 sm:p-5 pt-0 grid sm:grid-cols-2 gap-y-4 gap-x-8 border-t" style={{ borderColor: "rgba(30,42,47,0.05)" }}>
            <div className="mt-4">
              <div className="tw-mono text-[10px] uppercase tracking-wider mb-1" style={{ opacity: 0.5 }}>Type</div>
              <div className="tw-body font-semibold text-sm">{p.type}</div>
            </div>
            <div className="mt-4">
              <div className="tw-mono text-[10px] uppercase tracking-wider mb-1" style={{ opacity: 0.5 }}>Size</div>
              <div className="tw-body font-semibold text-sm">{p.size} sq. ft</div>
            </div>
            <div>
              <div className="tw-mono text-[10px] uppercase tracking-wider mb-1" style={{ opacity: 0.5 }}>Requested Plan</div>
              <div className="tw-body font-semibold text-sm">{dbs.plans[p.plan]?.name || p.plan} (₹{dbs.plans[p.plan]?.ratePerSqft || 0}/sqft)</div>
            </div>
            <div>
              <div className="tw-mono text-[10px] uppercase tracking-wider mb-1" style={{ opacity: 0.5 }}>Billing Cycle</div>
              <div className="tw-body font-semibold text-sm capitalize">{p.billingCycle?.replace('_', ' ')} (₹{calcFee(p.plan, p.size, p.billingCycle, dbs.plans)?.toLocaleString('en-IN') || 0})</div>
            </div>
            <div className="sm:col-span-2">
              <div className="tw-mono text-[10px] uppercase tracking-wider mb-1" style={{ opacity: 0.5 }}>Map Link</div>
              {p.latlong ? <a href={p.latlong} target="_blank" rel="noreferrer" className="tw-body text-sm text-blue-600 hover:underline">{p.latlong}</a> : <div className="tw-body text-sm italic" style={{ opacity: 0.5 }}>Not provided</div>}
            </div>
            <div className="sm:col-span-2">
              <div className="tw-mono text-[10px] uppercase tracking-wider mb-1" style={{ opacity: 0.5 }}>Proof Document</div>
              {p.docLink ? <a href={p.docLink} target="_blank" rel="noreferrer" className="tw-body text-sm flex items-center gap-1.5 text-blue-600 hover:underline"><FileText size={14}/> {p.docName || 'View Document'}</a> : p.docName ? <div className="tw-body text-sm flex items-center gap-1.5"><FileText size={14}/> {p.docName}</div> : <div className="tw-body text-sm italic" style={{ opacity: 0.5 }}>Not provided</div>}
            </div>
            <div className="sm:col-span-2 mt-2">
              <div className="tw-mono text-[10px] uppercase tracking-wider mb-1" style={{ opacity: 0.5 }}>Description / Summary</div>
              {p.summary ? <p className="tw-body text-sm leading-relaxed">{p.summary}</p> : <div className="tw-body text-sm italic" style={{ opacity: 0.5 }}>Not provided</div>}
            </div>
          </div>
        </details>

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
      title="TrustWork" subtitle="Admin console" onLogout={onLogout} onRefresh={refresh}
      hideContact={true}
      onSettings={() => setEditCust(dbs.customers['admin'])}
      tabs={[
        { id: "customers", label: "Customers", icon: Users },
        { id: "properties", label: "Properties", icon: Landmark },
        { id: "leads", label: "Leads", icon: UserPlus },
        { id: "plans", label: "Plans", icon: ClipboardList },
        { id: "coupons", label: "Coupons", icon: CheckCircle2 },
        { id: "tests", label: "System Tests", icon: ShieldCheck },
        { id: "billing", label: "Billing & Visits", icon: CreditCard },
        { id: "cases", label: "Cases", icon: MessageSquare },
      ]}
      activeTab={tab} onTabChange={setTab}
      headerAction={
        <button onClick={() => setShowAddCustomer(true)} className="tw-body flex items-center gap-1.5 text-sm font-semibold opacity-80 hover:opacity-100 transition-opacity" style={{ color: "#F6F1E7" }}>
          <Plus size={16} /> New Customer
        </button>
      }
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
            <div className="tw-body text-sm font-bold uppercase tracking-wide mt-0.5" style={{ color: "var(--ink)" }}>{s.label}</div>
          </div>
        ))}
      </div>



      {tab === "customers" && (
        <div>
          {selectedCustomer ? (
            /* ── Customer Properties Drill-down ── */
            <div>
              <button onClick={() => setSelectedCustomer(null)} className="tw-body text-sm flex items-center gap-1 mb-5" style={{ opacity: 0.6 }}>
                <ArrowLeft size={14} /> All customers
              </button>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                <div>
                  <div className="tw-display font-bold text-xl">{selectedCustomer.name}</div>
                  <div className="tw-mono text-[11px] mt-0.5 flex items-center gap-3" style={{ opacity: 0.55 }}>
                    <span>{selectedCustomer.id}</span>
                    {selectedCustomer.phone && <span className="flex items-center gap-1"><Phone size={11} />{selectedCustomer.phone}</span>}
                    {selectedCustomer.email && <span className="flex items-center gap-1"><Mail size={11} />{selectedCustomer.email}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEditCust(selectedCustomer)} className="tw-body text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-1 cursor-pointer" style={{ color: "var(--blueprint)", border: "1px solid rgba(22,50,63,0.2)" }}>
                    Edit customer
                  </button>
                </div>
              </div>
              {(() => {
                const custProps = properties.filter(p => p.customerId === selectedCustomer.id);
                if (custProps.length === 0) return <p className="tw-body text-sm" style={{ opacity: 0.55 }}>No properties registered for this customer yet.</p>;
                return (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {custProps.map((p) => (
                      <button key={p.id} onClick={() => setOpenProp(p.id)} className="text-left p-5 rounded-lg bg-white transition-all duration-200 hover:shadow-xl hover:-translate-y-1" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex flex-wrap gap-2">
                            <Badge tone="ink">{p.type}</Badge>
                            <Badge tone="brass">{dbs.plans[p.plan]?.name || p.plan}</Badge>
                          </div>
                          <Badge tone={p.status === "active" ? "moss" : p.status === "delete_pending" ? "tomato" : "brass"}>
                            {p.status === "active" ? "Active" : p.status === "delete_pending" ? "Deletion Requested" : "Pending"}
                          </Badge>
                        </div>
                        <div className="tw-mono text-[10px] mt-3 uppercase tracking-wider" style={{ opacity: 0.5 }}>{p.id}</div>
                        <div className="tw-display font-bold text-lg mt-0.5">{p.title}</div>
                        <div className="tw-body text-sm mt-1 flex items-center gap-1" style={{ opacity: 0.6 }}><MapPin size={12} />{p.address}</div>

                      </button>
                    ))}
                  </div>
                );
              })()}
            </div>
          ) : (
            /* ── Customer List ── */
            <div>
              <div className="mb-4">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ opacity: 0.4 }} />
                  <input className={inputCls} style={{ ...inputStyle, paddingLeft: 32 }} placeholder="Search customers…" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2.5">
                {filteredCustomers.map((c) => {
                  const custPropCount = properties.filter(p => p.customerId === c.id).length;
                  return (
                    <div key={c.id} className="p-4 rounded-lg bg-white flex flex-wrap justify-between items-center gap-2 transition-all hover:shadow-md" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
                      <button className="flex-1 text-left cursor-pointer" onClick={() => setSelectedCustomer(c)}>
                        <div className="tw-body font-semibold text-sm hover:underline" style={{ color: "var(--blueprint)" }}>{c.name}</div>
                        <div className="tw-mono text-[11px] mt-0.5 flex items-center gap-3" style={{ opacity: 0.55 }}>
                          <span>{c.id}</span>
                          <span className="flex items-center gap-1"><Landmark size={10} /> {custPropCount} {custPropCount === 1 ? 'property' : 'properties'}</span>
                        </div>
                      </button>
                      <div className="flex items-center gap-4">
                        <div className="tw-body text-xs gap-4 hidden sm:flex" style={{ opacity: 0.6 }}>
                          {c.phone && <span className="flex items-center gap-1"><Phone size={12} />{c.phone}</span>}
                          {c.email && <span className="flex items-center gap-1"><Mail size={12} />{c.email}</span>}
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => setEditCust(c)} className="tw-body text-xs font-semibold px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-1 cursor-pointer" style={{ color: "var(--blueprint)" }}>
                            Edit
                          </button>
                          <button onClick={() => deleteCustomer(c.id)} className="p-1.5 rounded-md hover:bg-red-50 text-red-500 transition-colors cursor-pointer" title="Delete customer">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {filteredCustomers.length === 0 && <p className="tw-body text-sm" style={{ opacity: 0.55 }}>No customers yet — add the first one.</p>}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "properties" && (
        <div className="grid sm:grid-cols-2 gap-4">
          {properties.map((p) => {
            const owner = dbs.customers[p.customerId];
            return (
              <button key={p.id} onClick={() => setOpenProp(p.id)} className="text-left p-5 rounded-lg bg-white transition-all duration-200 hover:shadow-xl hover:-translate-y-1" style={{ border: "1px solid rgba(30,42,47,0.1)" }}>
                <div className="flex justify-between items-start gap-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge tone="ink">{p.type}</Badge>
                    <Badge tone="brass">{dbs.plans[p.plan]?.name || p.plan}</Badge>
                  </div>
                  <Badge tone={p.status === "active" ? "moss" : p.status === "delete_pending" ? "tomato" : "brass"}>
                    {p.status === "active" ? "Active" : p.status === "delete_pending" ? "Deletion Requested" : "Pending"}
                  </Badge>
                </div>
                <div className="tw-mono text-[10px] mt-3 uppercase tracking-wider" style={{ opacity: 0.5 }}>{p.id}</div>
                <div className="tw-display font-bold text-lg mt-0.5">{p.title}</div>
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

      {tab === "billing" && <AdminBillingTab dbs={dbs} refresh={refresh} />}
      {tab === "plans" && <AdminPlansTab dbs={dbs} refresh={refresh} />}
      {tab === "coupons" && <AdminCouponsTab dbs={dbs} />}
      {tab === "leads" && <AdminLeadsTab dbs={dbs} refresh={refresh} />}
      {tab === "tests" && <AdminSystemTestTab />}


      {showAddCustomer && <AddCustomerModal onClose={() => setShowAddCustomer(false)} onSave={addCustomer} dbs={dbs} />}
      {editCust && <EditCustomerModal customer={editCust} onClose={() => setEditCust(null)} onSave={updateCustomer} />}
      {newCreds && <CredsModal creds={newCreds} onClose={() => setNewCreds(null)} />}
    </Shell>
  );
}

function AddVisitForm({ onAdd }) {
  const [form, setForm] = useState({ kind: "inspection", date: todayISO(), notes: "" });
  // Each slot is either null (empty) or a File object
  const [photoSlots, setPhotoSlots] = useState([null]);
  const [videoSlots, setVideoSlots] = useState([null]);
  const [uploading, setUploading] = useState(false);

  const photos = photoSlots.filter(Boolean);
  const videos = videoSlots.filter(Boolean);

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
      const videoUrls = [];
      for (const v of videos) videoUrls.push(await uploadFile(v));
      
      onAdd({
        kind: form.kind, date: form.date, notes: form.notes,
        photos: photoUrls, videos: videoUrls,
      });
      setForm({ kind: "inspection", date: todayISO(), notes: "" });
      setPhotoSlots([null]);
      setVideoSlots([null]);
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
        {/* ── PHOTOS ── */}
        <div className="mb-4">
          <div className="tw-body text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ opacity: 0.65 }}>
            <ImageIcon size={12} /> Photos <span style={{ opacity: 0.5 }}>(max 5 MB each)</span>
            {photos.length > 0 && <span className="ml-1 px-1.5 py-0.5 rounded-full text-white text-[10px] font-bold" style={{ background: "var(--blueprint)" }}>{photos.length}</span>}
          </div>
          <div className="space-y-2">
            {photoSlots.map((file, i) => (
              <div key={i} className="flex items-center gap-2">
                <label className="flex-1 flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer transition-all" style={{ border: "1.5px dashed rgba(30,42,47,0.2)", background: file ? "rgba(75,93,69,0.06)" : "rgba(30,42,47,0.02)" }}>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files[0];
                      if (!f) return;
                      if (f.size > 5 * 1024 * 1024) { alert("Photo exceeds 5MB limit."); return; }
                      setPhotoSlots(prev => prev.map((s, idx) => idx === i ? f : s));
                      e.target.value = "";
                    }}
                  />
                  {file ? (
                    <span className="tw-body text-xs font-medium truncate flex-1" style={{ color: "var(--moss)" }}>✓ {file.name}</span>
                  ) : (
                    <span className="tw-body text-xs" style={{ opacity: 0.45 }}>Choose photo…</span>
                  )}
                </label>
                {(file || photoSlots.length > 1) && (
                  <button type="button" onClick={() => {
                    if (photoSlots.length === 1) { setPhotoSlots([null]); }
                    else { setPhotoSlots(prev => prev.filter((_, idx) => idx !== i)); }
                  }} className="p-1.5 rounded-md hover:bg-red-50 text-red-400 transition-colors flex-shrink-0">
                    <X size={13} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setPhotoSlots(prev => [...prev, null])} className="mt-2 flex items-center gap-1 tw-body text-xs font-semibold px-2.5 py-1.5 rounded-md transition-colors cursor-pointer hover:opacity-80" style={{ color: "var(--blueprint)", background: "rgba(22,50,63,0.07)" }}>
            <Plus size={13} /> Add photo
          </button>
        </div>

        {/* ── VIDEOS ── */}
        <div className="mb-4">
          <div className="tw-body text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ opacity: 0.65 }}>
            <Video size={12} /> Videos <span style={{ opacity: 0.5 }}>(max 50 MB each)</span>
            {videos.length > 0 && <span className="ml-1 px-1.5 py-0.5 rounded-full text-white text-[10px] font-bold" style={{ background: "var(--blueprint)" }}>{videos.length}</span>}
          </div>
          <div className="space-y-2">
            {videoSlots.map((file, i) => (
              <div key={i} className="flex items-center gap-2">
                <label className="flex-1 flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer transition-all" style={{ border: "1.5px dashed rgba(30,42,47,0.2)", background: file ? "rgba(75,93,69,0.06)" : "rgba(30,42,47,0.02)" }}>
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files[0];
                      if (!f) return;
                      if (f.size > 50 * 1024 * 1024) { alert("Video exceeds 50MB limit."); return; }
                      setVideoSlots(prev => prev.map((s, idx) => idx === i ? f : s));
                      e.target.value = "";
                    }}
                  />
                  {file ? (
                    <span className="tw-body text-xs font-medium truncate flex-1" style={{ color: "var(--moss)" }}>✓ {file.name}</span>
                  ) : (
                    <span className="tw-body text-xs" style={{ opacity: 0.45 }}>Choose video…</span>
                  )}
                </label>
                {(file || videoSlots.length > 1) && (
                  <button type="button" onClick={() => {
                    if (videoSlots.length === 1) { setVideoSlots([null]); }
                    else { setVideoSlots(prev => prev.filter((_, idx) => idx !== i)); }
                  }} className="p-1.5 rounded-md hover:bg-red-50 text-red-400 transition-colors flex-shrink-0">
                    <X size={13} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setVideoSlots(prev => [...prev, null])} className="mt-2 flex items-center gap-1 tw-body text-xs font-semibold px-2.5 py-1.5 rounded-md transition-colors cursor-pointer hover:opacity-80" style={{ color: "var(--blueprint)", background: "rgba(22,50,63,0.07)" }}>
            <Plus size={13} /> Add video
          </button>
        </div>
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
  const twIds = Object.keys(dbs?.customers || {})
    .filter(id => id.startsWith('TW'))
    .map(id => parseInt(id.replace('TW', ''), 10))
    .filter(n => !isNaN(n));
  const maxN = twIds.length > 0 ? Math.max(...twIds) : 0;
  const defaultId = `TW${pad(maxN + 1, 2)}`;
  const [form, setForm] = useState({ id: defaultId, name: "", phone: "", email: "", password: "" });
  const submit = (e) => { e.preventDefault(); if (!form.name.trim() || !form.id.trim()) return; onSave(form); };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(22,50,63,0.5)" }}>
      <div className="w-full max-w-md rounded-lg p-6 max-h-screen overflow-y-auto" style={{ background: "var(--paper)" }}>
        <div className="flex justify-between items-center mb-5">
          <div className="tw-display font-bold text-lg">New customer</div>
          <button onClick={onClose} className="cursor-pointer hover:opacity-70 transition-opacity"><X size={18} /></button>
        </div>
        <form onSubmit={submit}>
          <Field label="Customer ID" required><input className={inputCls} style={inputStyle} value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} required /></Field>
          <Field label="Full name" required><input className={inputCls} style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></Field>
          <Field label="Phone" required><input className={inputCls} style={inputStyle} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></Field>
          <Field label="Email"><input className={inputCls} style={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
          <Field label="Password (leave blank for random)"><input className={inputCls} style={inputStyle} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Auto-generate" /></Field>
          <button type="submit" className="w-full mt-2 py-2.5 rounded-md font-semibold text-white tw-body cursor-pointer hover:opacity-90 transition-opacity" style={{ background: "var(--blueprint)" }}>
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}

function EditCustomerModal({ customer, onClose, onSave, onDelete }) {
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
          <div className="flex gap-2 mt-4">
            <button type="submit" className="flex-1 py-2.5 rounded-md font-semibold text-white tw-body cursor-pointer hover:opacity-90 transition-opacity" style={{ background: "var(--blueprint)" }}>
              Save changes
            </button>
          </div>
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

function AdminBillingTab({ dbs, refresh }) {
  const [filter, setFilter] = useState("all");
  const properties = Object.values(dbs.properties || {});
  
  const now = new Date();
  const next7Days = new Date(now);
  next7Days.setDate(next7Days.getDate() + 7);

  const getStatus = (p) => {
    if (!p.expiryDate) return "unknown";
    const exp = new Date(p.expiryDate);
    if (exp < now) return "overdue";
    if (exp <= next7Days) return "upcoming";
    return "active";
  };

  const filteredProps = properties.filter(p => {
    if (filter === "all") return true;
    if (filter === "pending_extra") return p.pendingExtraVisits > 0;
    return getStatus(p) === filter;
  });

  const completeExtraVisit = async (p) => {
    if (!window.confirm("Mark one extra visit as completed for this property?")) return;
    const updated = { ...p, pendingExtraVisits: Math.max(0, (p.pendingExtraVisits || 0) - 1) };
    await fetch(`/api/properties/${p.id}`, { method: 'PUT', body: JSON.stringify(updated) });
    refresh();
  };

  return (
    <div>
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {[{id: 'all', label: 'All'}, {id: 'overdue', label: 'Overdue'}, {id: 'upcoming', label: 'Upcoming Renewals'}, {id: 'active', label: 'Active'}, {id: 'pending_extra', label: 'Pending Extra Visits'}].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} className="tw-body text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-colors" style={{ background: filter === f.id ? "var(--blueprint)" : "white", color: filter === f.id ? "white" : "var(--ink)", border: "1px solid rgba(30,42,47,0.1)" }}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg overflow-hidden border" style={{ borderColor: 'rgba(30,42,47,0.1)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="tw-body text-xs text-gray-500 bg-gray-50 border-b">
                <th className="p-4 font-semibold uppercase tracking-wider">Property & Customer</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Plan & Cycle</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Payment Status</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Extra Visits</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProps.map(p => {
                const owner = dbs.customers[p.customerId];
                const status = getStatus(p);
                const statusTone = status === 'overdue' ? 'tomato' : status === 'upcoming' ? 'brass' : 'moss';
                const statusLabel = status === 'overdue' ? 'Overdue' : status === 'upcoming' ? 'Upcoming' : 'Active';
                
                return (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="tw-body font-bold text-sm text-gray-900">{p.title}</div>
                      <div className="tw-body text-xs text-gray-500 mt-1">{owner?.name || p.customerId}</div>
                      <div className="tw-mono text-[10px] text-gray-400 mt-0.5">{p.id}</div>
                    </td>
                    <td className="p-4">
                      <div className="tw-body text-sm font-medium">{dbs.plans[p.plan]?.name || p.plan} (₹{dbs.plans[p.plan]?.ratePerSqft || 0}/sqft)</div>
                      <div className="tw-body text-[11px] text-gray-500 mt-1">{p.billingCycle === '12_months' ? 'Annually' : p.billingCycle === '6_months' ? 'Semi-Annually' : 'Monthly'}</div>
                      <div className="tw-body text-[10px] text-gray-400 mt-1.5">
                        {dbs.plans[p.plan]?.numVisits || 0} visits · {dbs.plans[p.plan]?.numPhotos === 999 ? 'Unl.' : dbs.plans[p.plan]?.numPhotos || 0} imgs · {dbs.plans[p.plan]?.numVideos === 999 ? 'Unl.' : dbs.plans[p.plan]?.numVideos || 0} vids
                      </div>
                      <div className="tw-body text-[10px] text-green-600 mt-0.5">
                        Extra Visit: ₹{Math.round((dbs.plans[p.plan]?.ratePerSqft || 0) * p.size * 0.90).toLocaleString('en-IN')}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge tone={statusTone}>{statusLabel}</Badge>
                      </div>
                      <div className="tw-body text-xs text-gray-600 mt-1">Due: {p.expiryDate ? fmtDate(p.expiryDate) : '—'}</div>
                      <div className="tw-body text-[11px] text-gray-400 mt-0.5">Last Paid: {p.paymentDate ? fmtDate(p.paymentDate) : '—'}</div>
                    </td>
                    <td className="p-4">
                      {p.pendingExtraVisits > 0 ? (
                        <div>
                          <Badge tone="clay">{p.pendingExtraVisits} Pending</Badge>
                          <button onClick={() => completeExtraVisit(p)} className="block mt-2 text-[11px] font-semibold text-white px-2 py-1 rounded bg-green-600 hover:bg-green-700 transition-colors">
                            Mark Complete
                          </button>
                        </div>
                      ) : (
                        <span className="tw-body text-xs text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filteredProps.length === 0 && (
                <tr><td colSpan="4" className="p-8 text-center text-gray-400 text-sm">No properties found matching this filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("landing"); // landing | login | customer | admin
  const [session, setSession] = useState(null); // { role, customerId }
  const [dbs, setDbs] = useState({ admin: null, customers: {}, properties: {}, cases: {}, plans: {}, leads: {}, stats: {} });
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
          cases: data.cases,
          plans: data.plans,
          leads: data.leads,
          stats: data.stats
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
      {view === "landing" && <Landing onLogin={() => setView("login")} dbs={dbs} />}
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

function AdminPlansTab({ dbs, refresh }) {
  const plans = Object.values(dbs.plans || {});
  const [editing, setEditing] = useState(null); // null, or { ...planData }

  const handleSave = async (e) => {
    e.preventDefault();
    const isNew = !dbs.plans[editing.id];
    const method = isNew ? 'POST' : 'PUT';
    const url = isNew ? '/api/plans' : `/api/plans/${editing.id}`;
    
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...editing, ratePerSqft: parseFloat(editing.ratePerSqft), numVisits: parseInt(editing.numVisits, 10), numPhotos: parseInt(editing.numPhotos, 10), numVideos: parseInt(editing.numVideos, 10) }) });
    refresh();
    setEditing(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    await fetch(`/api/plans/${id}`, { method: 'DELETE' });
    refresh();
  };

  if (editing) {
    const inputCls = "w-full border p-2.5 rounded-md tw-body text-sm bg-white";
    return (
      <div className="bg-white p-6 rounded-xl border max-w-2xl" style={{ borderColor: 'rgba(30,42,47,0.1)' }}>
        <h3 className="tw-display font-bold text-xl mb-6">{dbs.plans[editing.id] ? "Edit Plan" : "Create New Plan"}</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Plan ID (e.g. 'premium')"><input required readOnly={!!dbs.plans[editing.id]} className={`${inputCls} ${dbs.plans[editing.id] ? 'opacity-50 bg-gray-50' : ''}`} value={editing.id || ''} onChange={e => setEditing({...editing, id: e.target.value})} /></Field>
            <Field label="Plan Name"><input required className={inputCls} value={editing.name || ''} onChange={e => setEditing({...editing, name: e.target.value})} /></Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Rate (₹ per sqft/month)"><input type="number" step="any" min="0" required className={inputCls} value={editing.ratePerSqft ?? ''} onChange={e => setEditing({...editing, ratePerSqft: e.target.value})} /></Field>
            <Field label="Number of Visits/month"><input type="number" min="0" required className={inputCls} value={editing.numVisits ?? ''} onChange={e => setEditing({...editing, numVisits: e.target.value})} /></Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Number of Photos (999 for Unl.)"><input type="number" required className={inputCls} value={editing.numPhotos ?? ''} onChange={e => setEditing({...editing, numPhotos: e.target.value})} /></Field>
            <Field label="Number of Videos (999 for Unl.)"><input type="number" required className={inputCls} value={editing.numVideos ?? ''} onChange={e => setEditing({...editing, numVideos: e.target.value})} /></Field>
          </div>
          <label className="flex items-center gap-2 tw-body text-sm cursor-pointer mt-4">
            <input type="checkbox" checked={editing.hasLiveCall} onChange={e => setEditing({...editing, hasLiveCall: e.target.checked})} className="w-4 h-4" />
            Includes Live Video Call?
          </label>
          <div className="pt-4 flex gap-3">
            <button type="submit" className="px-6 py-2 rounded text-white font-semibold tw-body transition-opacity hover:opacity-90" style={{ background: "var(--blueprint)" }}>Save Plan</button>
            <button type="button" onClick={() => setEditing(null)} className="px-6 py-2 rounded font-semibold tw-body border hover:bg-gray-50">Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="tw-display text-xl font-bold">Manage Plans</h2>
        <button onClick={() => setEditing({ id: '', name: '', ratePerSqft: 0, numVisits: 0, numPhotos: 0, numVideos: 0, hasLiveCall: false })} className="flex items-center gap-2 px-4 py-2 rounded-md text-white font-semibold tw-body hover:opacity-90 transition-opacity" style={{ background: "var(--blueprint)" }}>
          <Plus size={16} /> Add New Plan
        </button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {plans.map(p => (
          <div key={p.id} className="bg-white p-5 rounded-lg border relative flex flex-col justify-between" style={{ borderColor: 'rgba(30,42,47,0.1)' }}>
            <div>
              <div className="flex justify-between items-start mb-2">
                <div className="tw-display font-bold text-lg">{p.name}</div>
                <Badge tone="ink">₹{p.ratePerSqft}/sqft</Badge>
              </div>
              <ul className="tw-body text-sm space-y-1.5 mt-4" style={{ opacity: 0.8 }}>
                <li>• {p.numVisits} visits per month</li>
                <li>• {p.numPhotos === 999 ? 'Unlimited' : p.numPhotos} photos</li>
                <li>• {p.numVideos === 999 ? 'Unlimited' : p.numVideos} video(s)</li>
                {p.hasLiveCall && <li>• Includes live video call</li>}
              </ul>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setEditing(p)} className="flex-1 py-1.5 border rounded tw-body text-sm font-semibold hover:bg-gray-50 transition-colors">Edit</button>
              <button onClick={() => handleDelete(p.id)} className="px-3 py-1.5 border border-red-200 text-red-600 rounded tw-body text-sm font-semibold hover:bg-red-50 transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
