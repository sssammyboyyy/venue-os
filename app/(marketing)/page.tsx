'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowRight, Zap, Shield, CheckCircle2, XCircle, Terminal,
  BarChart3, Mic, Server, Lock, Globe, Cpu, ChevronRight, Play,
  Code2, PenTool, Hammer, MapPin, Database, Key, Wifi, CreditCard,
  FileText, UserCheck, TrendingUp, Quote, Network, Activity, Phone, Store, Crown, PartyPopper
} from 'lucide-react';

// --- SEO & SCHEMA ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Venue Engine",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Cloud",
  "offers": {
    "@type": "Offer",
    "price": "2500",
    "priceCurrency": "USD",
    "description": "Venue Management Software."
  },
  "creator": {
    "@type": "Person",
    "name": "Samuel Rencken",
    "jobTitle": "Lead Architect"
  },
  "description": "The definitive revenue operating system for high-volume golf simulators."
};

// --- VISUAL COMPONENTS ---

const MouseSpotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-500 hidden md:block"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16,185,129,0.15), transparent 80%)`
      }}
    />
  );
};

const CodeTerminal = () => {
  const logs = [
    "Checking Waitlist...",
    "Found 3 VIP Leads...",
    "Voice Agent: Call Initiated...",
    "Payment: $120.00 Captured (Stripe)",
    "Hardware: Projectors UNLOCKED",
    "Revenue_Guard: Active"
  ];
  return (
    <div className="w-full max-w-lg mx-auto bg-[#0A0A0A] border border-white/10 rounded-lg overflow-hidden shadow-2xl font-mono text-[10px] md:text-xs relative group">
      <div className="bg-[#111] px-4 py-2 flex gap-2 border-b border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        <div className="ml-auto text-zinc-500 font-bold uppercase tracking-widest text-[8px] md:text-[9px]">Revenue_Guard_Active</div>
      </div>
      <div className="p-4 h-40 md:h-48 flex flex-col justify-end text-zinc-400 space-y-2">
        {logs.map((log, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.6 }}
            className="flex items-center gap-2 md:gap-3 truncate"
          >
            <span className="text-emerald-500 shrink-0">➜</span>
            <span className={log.includes("Captured") || log.includes("Active") ? "text-white font-bold bg-emerald-900/20 px-1 rounded truncate" : "text-zinc-400 truncate"}>
              {log}
            </span>
          </motion.div>
        ))}
        <div className="text-emerald-500/50 animate-pulse mt-2">_watching_schedule...</div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, desc, icon, delay, highlight = false, badge, metric }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className={`group relative p-6 md:p-8 rounded-2xl border transition-all duration-500 overflow-hidden h-full flex flex-col ${highlight ? 'bg-emerald-950/10 border-emerald-500/30' : 'bg-zinc-900/40 border-white/5 hover:border-emerald-500/30'}`}
  >
    {highlight && <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg border flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${highlight ? 'bg-emerald-900/20 border-emerald-500/20 text-emerald-400' : 'bg-zinc-900 border-white/10 text-emerald-500'}`}>
          {icon}
        </div>
        {badge && (
          <span className="px-2 py-1 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-lg md:text-xl font-serif text-zinc-100 mb-3">{title}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed flex-grow">{desc}</p>
      {metric && (
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
          <TrendingUp className="w-3 h-3" />
          {metric}
        </div>
      )}
    </div>
  </motion.div>
);

// --- ORBITAL SYSTEM ---
const OrbitalSystem = () => {
  const OrbitIcon = ({ delay, radius, children, speed = 20 }: any) => (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        width: radius * 2,
        height: radius * 2,
        animation: `spin ${speed}s linear infinite`,
        animationDelay: `-${delay}s`
      }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ animation: `spin ${speed}s linear infinite reverse`, animationDelay: `-${delay}s` }}
      >
        <div className="bg-[#050505] border border-white/10 p-2 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all cursor-default group">
          {children}
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-zinc-400 font-mono whitespace-nowrap bg-black px-2 py-1 rounded border border-white/10 pointer-events-none">
            Connected
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center scale-75 md:scale-100">
      <div className="relative z-20 w-24 h-24 bg-gradient-to-br from-emerald-900 to-black rounded-full border border-emerald-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.2)]">
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center border border-white/10">
          <span className="font-serif font-bold text-2xl text-white">V</span>
        </div>
        <div className="absolute inset-0 border border-emerald-500/20 rounded-full animate-ping opacity-20"></div>
      </div>

      <div className="absolute inset-0 border border-white/5 rounded-full" />
      <div className="absolute inset-[15%] border border-white/5 rounded-full" />
      <div className="absolute inset-[30%] border border-white/5 rounded-full" />

      <OrbitIcon radius={100} delay={0} speed={25}>
        <div className="text-xs font-bold text-white px-2">STRIPE</div>
      </OrbitIcon>
      <OrbitIcon radius={100} delay={8} speed={25}>
        <div className="text-xs font-bold text-white px-2">TWILIO</div>
      </OrbitIcon>
      <OrbitIcon radius={100} delay={16} speed={25}>
        <div className="text-xs font-bold text-white px-2">OPENAI</div>
      </OrbitIcon>

      <OrbitIcon radius={180} delay={0} speed={40}>
        <div className="text-xs font-bold text-zinc-400 px-2">TRACKMAN</div>
      </OrbitIcon>
      <OrbitIcon radius={180} delay={10} speed={40}>
        <div className="text-xs font-bold text-zinc-400 px-2">UNEEKOR</div>
      </OrbitIcon>
      <OrbitIcon radius={180} delay={20} speed={40}>
        <div className="text-xs font-bold text-zinc-400 px-2">BRIVO</div>
      </OrbitIcon>
      <OrbitIcon radius={180} delay={30} speed={40}>
        <div className="text-xs font-bold text-zinc-400 px-2">HUBSPOT</div>
      </OrbitIcon>

      <style jsx global>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// --- SECTIONS ---

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 md:pt-32 px-4 md:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white opacity-[0.03] pointer-events-none" />

      <div className="relative z-10 text-center max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 rounded-full bg-zinc-900/50 border border-white/10 mb-8 md:mb-10 backdrop-blur-md"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-300">
            Operational <span className="text-emerald-600 px-2">|</span> <span className="text-white">Accepting Partners</span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-9xl font-serif text-emerald-400 tracking-tighter leading-[0.9] mb-6 md:mb-8 drop-shadow-2xl"
        >
          Venue Management Software
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-2xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed mb-10 md:mb-12 px-4"
        >
          <strong className="text-white block mb-4 text-3xl md:text-4xl">That Replaces Your General Manager.</strong>
          <span className="text-white border-b border-emerald-500/30 pb-1">Automate deposits, booking management, and ghost booking prevention through one unified system.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-8 md:gap-12 w-full"
        >
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
            <Link href="/partner" className="group relative h-12 md:h-14 px-8 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-3 overflow-hidden rounded-sm transition-all hover:bg-emerald-400 w-full sm:w-auto">
              <div className="absolute inset-0 w-full h-full bg-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center gap-2">Initialize Audit <ArrowRight className="w-4 h-4" /></span>
            </Link>
            <Link href="/demo" className="h-12 md:h-14 px-8 bg-zinc-900 border border-zinc-800 hover:border-white/20 text-zinc-300 font-mono text-xs uppercase tracking-widest font-bold transition-all rounded-sm flex items-center justify-center gap-2 group w-full sm:w-auto">
              <Play className="w-3 h-3 group-hover:text-emerald-500 transition-colors" /> Watch Demo
            </Link>
          </div>

          <p className="text-zinc-500 text-xs md:text-sm font-mono max-w-lg text-center px-4">
            Powering the next generation of <strong className="text-zinc-300">golf booking systems</strong>. Trusted by high-volume venues processing $5M+ annually.
          </p>

          <div className="relative w-full max-w-2xl px-2">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg blur opacity-20 animate-pulse"></div>
            <CodeTerminal />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const IntegrationSection = () => (
  <section className="py-24 border-y border-white/5 bg-black overflow-hidden relative">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-900/10 border border-emerald-500/20 rounded-full text-[10px] font-mono uppercase text-emerald-400 mb-6">
          <Network className="w-3 h-3" /> The Brain of Your Business
        </div>
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
          Your Entire <br />
          <span className="text-zinc-500">Golf Club Software System, Connected.</span>
        </h2>
        <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
          We don't just "integrate." We act as the brain of your <strong>venue scheduling software</strong>. When a booking drops in Stripe, we unlock the Brivo door, power on the Trackman PC, and log the customer in Salesforce. The only <strong>point of sale software</strong> logic you'll ever need.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {['Instant Updates', 'No Messy Plugins', 'Lightning Fast', 'Developer Ready'].map(item => (
            <div key={item} className="flex items-center gap-2 text-sm text-zinc-300">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <OrbitalSystem />
      </div>
    </div>
  </section>
);

const ComparisonSlider = () => {
  const [sliderVal, setSliderVal] = useState(50);
  return (
    <div className="relative w-full max-w-5xl mx-auto h-[350px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group cursor-ew-resize select-none touch-none">
      {/* LEFT: HELL */}
      <div className="absolute inset-0 bg-[#050000] flex items-center justify-center border-r border-white/5">
        <div className="text-center opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700 px-4">
          <XCircle className="w-12 h-12 md:w-20 md:h-20 text-red-900 mx-auto mb-4 md:mb-6" />
          <h3 className="text-red-800 font-serif text-3xl md:text-5xl mb-2">MANUAL CHAOS</h3>
          <p className="text-red-900/70 font-mono tracking-widest uppercase mt-2 md:mt-4 text-[10px] md:text-xs">
            Phone Tag • Empty Bays • No Deposits
          </p>
          <div className="mt-4 md:mt-6 text-red-600 font-mono text-lg md:text-xl">-$4,200 / Month</div>
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      </div>

      {/* RIGHT: HEAVEN */}
      <div
        className="absolute inset-0 bg-[#000502] flex items-center justify-center overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${sliderVal}%)` }}
      >
        <div className="text-center w-full max-w-5xl mx-auto px-4 md:px-10">
          <CheckCircle2 className="w-12 h-12 md:w-20 md:h-20 text-emerald-500 mx-auto mb-4 md:mb-6 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
          <h3 className="text-white font-serif text-3xl md:text-5xl mb-2 drop-shadow-xl">AUTOMATED GROWTH</h3>
          <p className="text-emerald-500 font-mono tracking-widest uppercase mt-2 md:mt-4 text-[10px] md:text-xs">
            40% Deposits • AI Booking • 100% Fill Rate
          </p>
          <div className="mt-6 md:mt-8 inline-flex items-center gap-2 px-4 py-2 bg-emerald-900/30 border border-emerald-500/30 rounded text-[10px] md:text-xs text-emerald-400 font-mono uppercase">
            <Terminal className="w-3 h-3" />
            <span>$240.00 Recovered</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      </div>

      {/* HANDLE */}
      <div className="absolute top-0 bottom-0 w-1 bg-white z-20 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.8)]" style={{ left: `${sliderVal}%` }}>
        <div className="w-8 h-8 md:w-12 md:h-12 bg-black border border-white rounded-full flex items-center justify-center shadow-2xl">
          <div className="flex gap-1">
            <div className="w-0.5 h-3 md:h-4 bg-white" />
            <div className="w-0.5 h-3 md:h-4 bg-white" />
          </div>
        </div>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderVal}
        onChange={(e) => setSliderVal(parseInt(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
        aria-label="Compare manual versus automated revenue"
      />
    </div>
  );
};

const BenefitCard = ({ item }: { item: any }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && item.slides && item.slides.length > 0) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % item.slides.length);
      }, 2500); // 2.5s per slide
    } else {
      setCurrentSlide(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, item.slides]);

  return (
    <motion.div
      layout
      className={`group relative bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors duration-500 flex flex-col justify-between ${isHovered ? 'z-50' : 'z-0'}`}
      style={{
        zIndex: isHovered ? 50 : 0
      }}
      animate={{
        height: isHovered ? 450 : 320, // Expand height on hover
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dimmer overlay for text readability */}
        {item.slides && item.slides.length > 0 ? (
          item.slides.map((slide: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide})` }}
            />
          ))
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-transparent to-transparent"></div>
        )}
      </div>

      {/* Hover Gradient Glow (Front) */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>

      <div className="relative z-20 p-8 h-full flex flex-col">
        {/* Header: Icon + Status */}
        <motion.div layout="position" className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-xl bg-zinc-900/80 backdrop-blur-sm border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
            {item.icon}
          </div>
          <div className="flex items-center gap-2 px-2 py-1 bg-zinc-900/80 backdrop-blur-sm rounded border border-white/5">
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[9px] font-mono text-zinc-500 uppercase">{item.status}</span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div layout="position" className="flex-grow">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-500 transition-colors duration-300 drop-shadow-md">{item.title}</h3>
          <p className="text-sm text-zinc-400 leading-relaxed mb-6 group-hover:text-white transition-colors drop-shadow-sm relative">
            <span className="relative z-10">{item.desc}</span>
          </p>
        </motion.div>

        {/* Footer: Technical Stat */}
        <motion.div layout="position" className="pt-4 border-t border-white/5 flex justify-between items-center bg-transparent group-hover:border-white/10 transition-colors mt-auto">
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest group-hover:text-zinc-500 transition-colors">Protocol</span>
          <span className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/5 backdrop-blur-sm">
            {item.stat}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

const BenefitMatrix = () => {
  const features = [
    {
      icon: <Key className="w-6 h-6 text-emerald-400" />,
      title: "Smart Access",
      desc: "Integrates with Kisi/Brivo. Doors unlock automatically 15 mins before booking.",
      stat: "Access Control",
      status: "Online",
      slides: [
        "/images/features/smart-access.png",
      ]
    },
    {
      icon: <CreditCard className="w-6 h-6 text-blue-400" />,
      title: "Split Payments",
      desc: "Players split bills instantly via Apple Pay. No more math at the counter.",
      stat: "Instant Payouts",
      status: "Active",
      slides: [
        "/images/features/split-payments.png",
      ]
    },
    {
      icon: <Database className="w-6 h-6 text-purple-400" />,
      title: "CRM Sync",
      desc: "Auto-tag 'Whales' and 'Churn Risks' in HubSpot based on spend velocity.",
      stat: "Live Sync",
      status: "Live",
      slides: [
        "/images/features/sub-gold.png", // Whales
        "/images/features/sub-silver-break.png", // Churn Risks
        "/images/features/sub-silver.png",
      ]
    },
    {
      icon: <Wifi className="w-6 h-6 text-amber-400" />,
      title: "Sim Kill Switch",
      desc: "We physically cut power to the projector if the booking isn't paid. Ultimate enforcement.",
      stat: "Hard Relay",
      status: "Armed",
      slides: [
        "/images/features/kill-switch.png",
      ]
    },
    {
      icon: <FileText className="w-6 h-6 text-pink-400" />,
      title: "Auto-Invoicing",
      desc: "Generate compliant PDF invoices and email them to finance automatically.",
      stat: "PDF Engine",
      status: "Ready",
      slides: [
        "/images/features/auto-invoicing.png",
      ]
    },
    {
      icon: <UserCheck className="w-6 h-6 text-cyan-400" />,
      title: "Member Portal",
      desc: "Self-service cancellations, upgrades, and subscription management.",
      stat: "Member Login",
      status: "Active",
      slides: [
        "/images/features/calendar-booking.png",
        "/images/features/calendar-cancel.png",
      ]
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-black relative z-10 border-t border-white/5 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-mono uppercase text-zinc-400 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            System Modules
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-tighter">
            The Ultimate <br /><span className="text-emerald-400">Booking System</span> Feature Matrix.
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            From the front door to the balance sheet. We handle the bits you hate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, i) => (
            <BenefitCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- NEW SECTION: BORN IN THE ARENA ---
const BornInTheArena = () => (
  <section className="py-24 border-t border-white/5 bg-[#050505] relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-black to-black"></div>
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono uppercase text-zinc-400 mb-6">
            <MapPin className="w-3 h-3" /> Origin Story
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            <span className="text-emerald-400">Venue Engine OS</span> was born in the arena. <br />
            <span className="text-zinc-500">Not a Cubicle.</span>
          </h2>
          <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
            Most software is built by developers who have never held a golf club.
            <strong className="text-white"> Venue Engine was forged inside a live, high-volume venue.</strong> We processed 500+ golfers every weekend. If the system crashed, *we* lost money. That fear is the best quality assurance in the world.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 text-emerald-500">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-white font-bold">Battle Tested</h4>
                <p className="text-sm text-zinc-500">Our code processes 500+ golfers every weekend. If it breaks, *we* lose money.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 text-emerald-500">
                <Hammer className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-white font-bold">Operator First</h4>
                <p className="text-sm text-zinc-500">Every feature exists because we needed it to survive. No fluff, just revenue tools.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl opacity-20 blur-lg"></div>
          <div className="relative aspect-video bg-zinc-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <img src="/images/footerimage.jpeg" alt="Our Venue" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <div className="text-white font-bold text-lg">Vanderbijlpark HQ</div>
                <div className="text-[10px] font-mono text-emerald-400 uppercase">Live Operations Node</div>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 bg-black/50 backdrop-blur border border-white/10 rounded">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-mono text-white">Occupancy: 98%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- UPGRADED MIGRATION TIMELINE (SCROLL LINKED) ---
const MigrationTimeline = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={ref} className="py-24 px-6 bg-black border-t border-white/5">
      <div className="max-w-4xl mx-auto relative">
        <h2 className="text-3xl md:text-5xl font-serif text-white mb-20 text-center">7-Day Implementation Protocol</h2>

        {/* Animated Vertical Line */}
        <div className="absolute left-[27px] top-24 bottom-24 w-[1px] bg-zinc-800">
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute top-0 left-0 w-full h-full bg-emerald-500"
          />
        </div>

        <div className="space-y-16">
          {[
            { day: "Day 1", title: "Strategy & Setup", desc: "We map your current pricing, hours, and hardware stack." },
            { day: "Day 3", title: "Shadow Mode", desc: "We deploy your shadow environment. You test bookings without affecting live revenue." },
            { day: "Day 5", title: "Connection", desc: "Our engineers connect remotely to your Trackman/Uneekor PCs to install the local bridge." },
            { day: "Day 7", title: "Go Live", desc: "DNS update. We flip the switch at 3AM local time. Zero downtime." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex gap-10 group"
            >
              {/* Node */}
              <div className="relative z-10 w-14 h-14 rounded-full bg-[#0A0A0A] border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-emerald-500 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-500">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-emerald-500 transition-colors" />
              </div>

              {/* Content */}
              <div className="pt-2">
                <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest mb-2 block">{item.day}</span>
                <h3 className="text-2xl text-white font-serif mb-3">{item.title}</h3>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ArchitectLetter = () => (
  <section className="py-16 md:py-24 bg-[#050505] border-y border-white/5 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-zinc-900/30 rounded-full blur-[120px] pointer-events-none"></div>
    <div className="max-w-4xl mx-auto px-6 relative z-10">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">

        {/* FOUNDER IMAGE COLUMN */}
        <div className="w-full md:w-1/3">
          <div className="aspect-[3/4] bg-zinc-900 rounded-lg border border-white/10 relative overflow-hidden group shadow-2xl max-h-[400px] md:max-h-none mx-auto md:mx-0 w-3/4 md:w-full">

            {/* THE IMAGE */}
            <img
              src="/images/founder.jpg"
              alt="Samuel Rencken - Founder of Venue Engine"
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100"
            />

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

            {/* Label */}
            <div className="absolute bottom-4 left-4">
              <p className="text-white font-serif text-lg tracking-wide">Samuel Rencken</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-emerald-500 text-xs font-mono uppercase tracking-widest">Lead Architect</p>
              </div>
            </div>
          </div>
        </div>

        {/* COPY COLUMN */}
        <div className="w-full md:w-2/3">
          <div className="mb-6"><Quote className="w-10 h-10 text-emerald-500/30" /></div>
          <h2 className="text-2xl md:text-4xl font-serif text-white mb-6 leading-tight">"We don't just sell software, we sell revenue."</h2>
          <div className="space-y-6 text-zinc-400 leading-relaxed text-base md:text-lg">
            <p>
              I didn't build Venue Engine to sell it. I built it because my own venue was bleeding cash. We had the best sims, great location, and expensive hardware. But we were dying.
            </p>
            <p>
              Why? Because 20% of our bookings were "Ghost Bookings"—people who reserved a slot and never showed up. When you charge premium hourly rates, that is death by a thousand cuts.
            </p>
            <p>
              I looked for software to fix it. I found clunky calendars from 2005. So I built <strong>Venue Engine</strong>.
            </p>
            <p>
              It is not just a booking calendar. It is a relentless revenue guard dog. It doesn't sleep, it doesn't forget to ask for a deposit, and it never lets a slot go to waste.
            </p>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
            <div className="h-px w-12 bg-emerald-500"></div>
            <p className="font-mono text-xs text-emerald-500 uppercase tracking-widest">End Transmission</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const BespokeFoundry = () => {
  return (
    <section className="py-16 md:py-32 px-6 bg-[#030303] border-t border-white/5 relative overflow-hidden group">
      {/* Background accent - Animated Blob */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[5000ms]"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">

        {/* LEFT COLUMN: COPY */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono uppercase text-emerald-400 mb-6 hover:bg-white/10 transition-colors cursor-default">
            <Hammer className="w-3 h-3" /> The Foundry Initiative
          </div>

          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tighter">
            Unlimited <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Engineering.</span>
          </h2>

          <p className="text-lg text-zinc-400 mb-10 leading-relaxed max-w-md">
            Other software forces you to adapt to <i>their</i> workflow. <br />
            <strong className="text-white">We code the software around yours.</strong>
          </p>

          <ul className="space-y-4 mb-12">
            {[
              {
                icon: <PenTool className="w-5 h-5 text-white" />,
                title: "Bespoke UI Design",
                desc: "We redesign the dashboard to match your brand's specific aesthetic perfectly."
              },
              {
                icon: <Code2 className="w-5 h-5 text-emerald-500" />,
                title: "Custom Integrations",
                desc: "Need to sync with a legacy POS or a specific camera system? We write the API connectors."
              }
            ].map((item, i) => (
              <li key={i} className="flex gap-5 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-500/30 transition-all duration-300 group/item cursor-default">
                <div className="w-12 h-12 rounded-lg bg-black border border-zinc-800 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform shadow-lg">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 group-hover/item:text-emerald-400 transition-colors">{item.title}</h4>
                  <p className="text-sm text-zinc-500 leading-snug">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <button className="flex items-center gap-2 text-emerald-500 border-b border-emerald-500/30 pb-1 hover:text-emerald-400 hover:border-emerald-400 transition-all font-mono text-xs uppercase tracking-widest group/btn">
                 // View Engineering Retainer Docs
            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* RIGHT COLUMN: THE VISUAL (Request -> Code) */}
        <div className="relative">
          {/* Glow behind the card */}
          <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-50"></div>

          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-2xl">

            {/* Grid Pattern inside Card */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>

            {/* Message 1 (The Client Request) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex justify-end mb-8 relative z-10"
            >
              <div className="bg-emerald-900/20 border border-emerald-500/30 text-emerald-100 px-5 py-4 rounded-2xl rounded-tr-sm text-sm max-w-sm shadow-[0_0_20px_rgba(16,185,129,0.1)] backdrop-blur-sm">
                "We need a custom leaderboard that tracks 'Longest Drive' from Trackman and displays it on the lobby TV."
              </div>
            </motion.div>

            {/* Message 2 (The System Response) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex justify-start mb-8 relative z-10"
            >
              <div className="bg-zinc-900 border border-zinc-700 text-zinc-300 px-4 py-2 rounded-full text-xs flex items-center gap-3 shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-mono">Ticket #492: <span className="text-white font-bold">In Progress</span></span>
              </div>
            </motion.div>

            {/* Code Block (The Solution) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0 }}
              className="bg-black/80 rounded-xl border border-white/10 p-5 font-mono text-[10px] md:text-xs text-zinc-500 overflow-hidden relative z-10 shadow-2xl"
            >
              {/* Window Controls */}
              <div className="flex gap-1.5 mb-4 border-b border-white/5 pb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
              </div>

              <div className="space-y-1">
                <p><span className="text-purple-400">import</span> <span className="text-white">{`{ TrackmanAPI }`}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'@venue/sdk'</span>;</p>
                <p className="h-2"></p>
                <p><span className="text-blue-400">export const</span> <span className="text-yellow-200">LeaderboardWidget</span> = <span className="text-white">async () ={`>`}</span> {'{'}</p>
                <p className="pl-4"><span className="text-zinc-500">// Fetch live telemetry</span></p>
                <p className="pl-4"><span className="text-blue-400">const</span> data = <span className="text-purple-400">await</span> TrackmanAPI.getMetrics('drive_distance');</p>
                <p className="pl-4"><span className="text-purple-400">return</span> <span className="text-white">{`<LobbyDisplay data={data} />`}</span></p>
                <p>{'}'}</p>
              </div>
            </motion.div>

            {/* Deployment Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-6 right-6 z-20"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-black text-[10px] font-bold font-mono uppercase tracking-widest rounded shadow-[0_0_20px_rgba(16,185,129,0.6)] animate-pulse">
                <CheckCircle2 className="w-3 h-3" />
                Deployed: 48 Hours
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- HARDWARE STACK ---
const HardwareStack = () => {
  return (
    <section className="py-24 bg-black relative border-t border-white/5 overflow-hidden">

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Works With Your Gear.</h2>
            <p className="text-zinc-400 max-w-xl text-lg">
              We don't replace your simulators. We build the <span className="text-emerald-400">revenue layer</span> on top of them. Compatible with all major launch monitors.
            </p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-zinc-900 border border-white/10 rounded-full">
            <div className="flex gap-1">
              <span className="w-1 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="w-1 h-3 bg-emerald-500/50 rounded-full"></span>
              <span className="w-1 h-3 bg-emerald-500/20 rounded-full"></span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Systems Connected</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "TRACKMAN", model: "IO / 4", status: "Connected", ping: "12ms" },
            { name: "UNEEKOR", model: "EYE XO 2", status: "Connected", ping: "18ms" },
            { name: "FORESIGHT", model: "GCQUAD / HAWK", status: "Standby", ping: "24ms" },
            { name: "FLIGHTSCOPE", model: "X3 / MEVO+", status: "Connected", ping: "31ms" }
          ].map((device, i) => (
            <motion.div
              key={device.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-zinc-900/40 border border-white/5 p-6 rounded-xl overflow-hidden hover:border-emerald-500/30 transition-all"
            >
              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000"></div>

              <div className="flex justify-between items-start mb-8">
                <div className="flex flex-col">
                  <span className="text-xl font-bold font-mono text-zinc-200 tracking-tighter">{device.name}</span>
                  <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono mt-1">Series: {device.model}</span>
                </div>
                {/* Status Light */}
                <div className={`w-2 h-2 rounded-full ${device.status === 'Connected' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-amber-500 shadow-[0_0_10px_#f59e0b]'} animate-pulse`}></div>
              </div>

              <div className="flex items-end justify-between border-t border-white/5 pt-4">
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono uppercase">
                  <Activity className="w-3 h-3" />
                  <span>Stream: {device.status === 'Connected' ? 'OK' : 'WAIT'}</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-500/70">{device.ping}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom "Cable" Visual */}
        <div className="mt-12 flex justify-center opacity-30">
          <div className="w-px h-12 bg-gradient-to-b from-emerald-500 via-emerald-500/50 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

// --- NEW USE CASES SECTION ---
const UseCases = () => (
  <section className="py-24 bg-[#050505] relative border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <div className="inline-block px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-6">
          Deployment Protocols
        </div>
        <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
          Engineered for <span className="text-emerald-400">Every Venue.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Card 1: Commercial */}
        <div className="group relative p-8 bg-zinc-900/30 border border-white/5 hover:border-emerald-500/30 rounded-2xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-black border border-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-emerald-500">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-white text-xl font-bold mb-3">Commercial Simulators</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Turnstile throughput. Maximize bays per hour with <strong>indoor golf booking software</strong> that autoscales pricing during peak times.
            </p>
            <ul className="text-xs text-zinc-500 space-y-2 font-mono uppercase">
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500 rounded-full"></div>Dynamic Yielding</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500 rounded-full"></div>Kiosk Mode</li>
            </ul>
          </div>
        </div>

        {/* Card 2: Private Clubs */}
        <div className="group relative p-8 bg-zinc-900/30 border border-white/5 hover:border-purple-500/30 rounded-2xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-black border border-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-purple-400">
              <Crown className="w-6 h-6" />
            </div>
            <h3 className="text-white text-xl font-bold mb-3">Private Clubs</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Member-first exclusivity. Biometric rules, monthly quotas, and guest pass management for the modern country club.
            </p>
            <ul className="text-xs text-zinc-500 space-y-2 font-mono uppercase">
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-500 rounded-full"></div>Member Portal</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-500 rounded-full"></div>Monthly Billing</li>
            </ul>
          </div>
        </div>

        {/* Card 3: Entertainment */}
        <div className="group relative p-8 bg-zinc-900/30 border border-white/5 hover:border-blue-500/30 rounded-2xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-black border border-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-blue-400">
              <PartyPopper className="w-6 h-6" />
            </div>
            <h3 className="text-white text-xl font-bold mb-3">Entertainment Venues</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Events and leagues. Handle clear-outs for corporate parties and weekly league play with automated bracketing.
            </p>
            <ul className="text-xs text-zinc-500 space-y-2 font-mono uppercase">
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full"></div>Event Deposits</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full"></div>League Manager</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- MAIN PAGE COMPONENT ---

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#020202] text-zinc-100 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="noise-bg fixed inset-0 z-50 pointer-events-none opacity-[0.03]"></div>
      <MouseSpotlight />

      {/* NAVBAR */}
      <nav className="fixed w-full z-40 top-0 border-b border-white/5 bg-[#020202]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="Venue Engine"
              className="h-8 w-auto object-contain"
            />
          </div>
          <Link href="/partner" className="flex items-center gap-2 px-3 md:px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-sm transition-all text-[10px] font-bold font-mono uppercase tracking-widest group">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Partner Access
            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </nav>

      <HeroSection />

      {/* REPLACED: Ticker with Orbital System */}
      <IntegrationSection />

      {/* THE PROBLEM */}
      <section className="py-16 md:py-32 px-6 relative border-b border-white/5 bg-[#050505]">
        <div className="max-w-5xl mx-auto mb-16 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-red-500/20 bg-red-900/10 rounded-full text-[10px] font-mono text-red-400 uppercase tracking-widest animate-pulse">
            Financial Alert
          </div>
          <h2 className="text-3xl md:text-5xl font-serif mb-6 text-white">The Hidden Cost of Generic <br /><span className="text-red-500">Booking Software.</span></h2>
          <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest max-w-lg mx-auto leading-loose">
            Most <strong>booking software</strong> is passive. It lets people book... and it lets them flake. <br className="hidden md:block" />
            You are losing $150/hr every time a customer "forgets" to show up. <strong>Venue Engine</strong> stops the bleeding.
          </p>
        </div>
        <ComparisonSlider />
      </section>

      {/* THE SOLUTION */}
      <section className="py-16 md:py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-8">
            <div>
              <h2 className="text-3xl md:text-6xl font-serif text-white mb-4">The Revenue Core</h2>
              <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Four Engines. Zero Leakage. The Ultimate <strong>Booking Sim Golf Management Software</strong>.</p>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <div className="text-xl md:text-2xl font-mono text-emerald-400">99.9%</div>
                <div className="text-[10px] text-zinc-600 uppercase tracking-widest">Uptime</div>
              </div>
              <div className="w-[1px] h-10 bg-white/10"></div>
              <div className="text-right">
                <div className="text-xl md:text-2xl font-mono text-white">24ms</div>
                <div className="text-[10px] text-zinc-600 uppercase tracking-widest">Latency</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <FeatureCard
                highlight={true}
                delay={0.1}
                icon={<Mic className="w-6 h-6" />}
                title="Neural Voice Agent"
                badge="Write-Access Enabled"
                desc="A 24/7 AI Receptionist that negotiates times and manages your golf scheduler autonomously. It handles 10,000 simultaneous calls."
              />
            </div>
            <div className="md:col-span-4">
              <FeatureCard
                delay={0.2}
                icon={<BarChart3 className="w-6 h-6" />}
                title="Yield Engine"
                badge="Dynamic Pricing"
                desc="Dynamic pricing based on demand. Raining? The system automatically adjusts rates. The smartest golf scheduler on the market."
                metric="+15% Margin"
              />
            </div>
            <div className="md:col-span-4">
              <FeatureCard
                delay={0.3}
                icon={<Shield className="w-6 h-6" />}
                title="Ghost Protocol"
                badge="Payment Security"
                desc="No deposit? No booking. We auto-cancel unpaid slots to keep your venue scheduling software efficiency at 100%."
                metric="0% No-Shows"
              />
            </div>
            <div className="md:col-span-8">
              <FeatureCard
                delay={0.4}
                icon={<Zap className="w-6 h-6" />}
                title="Flash-Fill Protocol"
                badge="n8n Automation"
                desc="Waitlist automation. When a slot opens, our golf booking system texts your high-value leads instantly."
              />
            </div>
          </div>
        </div>
      </section>

      <HardwareStack />
      <UseCases />
      <BenefitMatrix />
      <BornInTheArena />
      <MigrationTimeline />
      <BespokeFoundry />
      <ArchitectLetter />

      {/* FOUNDER'S GUARANTEE */}
      <section className="py-24 md:py-40 px-6 relative overflow-hidden bg-black">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-900 to-transparent"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-block border border-zinc-800 bg-zinc-900/50 backdrop-blur px-4 py-1 rounded-full text-[10px] font-mono uppercase text-zinc-400 mb-8">
            The Architect's Promise
          </div>
          <h2 className="text-3xl md:text-7xl font-serif text-white mb-8 tracking-tighter">
            We don't just sell software, <br /> <span className="text-zinc-600">we sell revenue.</span>
          </h2>
          <p className="text-base md:text-lg text-zinc-400 mb-12 max-w-xl mx-auto font-light leading-relaxed">
            If Venue Engine does not recover at least <strong>50% in revenue</strong> within the first 30 days, we will refund your entire implementation fee. <strong>Yes, you read that correctly - your entire implementation fee.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 justify-center">
            <Link href="/partner" className="group relative h-14 px-8 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-3 overflow-hidden rounded-sm transition-all hover:bg-emerald-400 w-full sm:w-auto">
              <div className="absolute inset-0 w-full h-full bg-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                Initialize Audit
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            <Link href="/demo" className="h-14 px-8 bg-zinc-900 border border-zinc-800 hover:border-white/20 text-zinc-300 font-mono text-xs uppercase tracking-widest font-bold transition-all rounded-sm flex items-center justify-center gap-2 group w-full sm:w-auto">
              <Play className="w-3 h-3 group-hover:text-emerald-500 transition-colors" />
              View Live Demo
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-8 md:py-12 border-t border-white/5 bg-black text-center relative z-10">
        <div className="flex flex-col items-center gap-4">
          <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
            © 2025 Venue Engine • Global Operations
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-[10px] text-zinc-700 font-mono uppercase max-w-2xl px-4">
            <span>System Status: Nominal</span>
            <span>•</span>
            <Link href="#" className="hover:text-zinc-500 transition-colors">Privacy Protocol</Link>
            <span>•</span>
            <Link href="#" className="hover:text-zinc-500 transition-colors">Best <strong>Golf Scheduling Software</strong> Practices</Link>
            <span>•</span>
            <Link href="#" className="hover:text-zinc-500 transition-colors"><strong>Venue Management Software</strong> Guide</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}