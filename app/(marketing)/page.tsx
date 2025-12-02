'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ArrowRight, Zap, Shield, CheckCircle2, XCircle, Terminal, 
  BarChart3, Mic, Server, Lock, Globe, Cpu, ChevronRight, Play,
  Code2, PenTool, MessageSquarePlus, Hammer
} from 'lucide-react';

// --- VISUALS ---

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
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16,185,129,0.06), transparent 40%)`
      }}
    />
  );
};

const CodeTerminal = () => {
  const logs = [
    "Initializing VenueOS Kernel...",
    "Connecting to Stripe Connect (Standard)...",
    "Loading Neural Voice Models (OpenAI Whisper)...",
    "Syncing with Trackman API...",
    "Yield Engine: ACTIVE",
    "Listening for inbound calls..."
  ];
  return (
    <div className="w-full max-w-lg mx-auto bg-[#0A0A0A] border border-white/10 rounded-lg overflow-hidden shadow-2xl font-mono text-[10px] md:text-xs relative group">
       <div className="bg-[#111] px-4 py-2 flex gap-2 border-b border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          <div className="ml-auto text-zinc-600">bash — v2.4</div>
       </div>
       <div className="p-4 h-48 flex flex-col justify-end text-zinc-400 space-y-1">
          {logs.map((log, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.8 }}
             >
                <span className="text-emerald-500 mr-2">➜</span>
                {log}
             </motion.div>
          ))}
          <div className="text-zinc-600 animate-pulse mt-2">awaiting_input...</div>
       </div>
       <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

const FeatureCard = ({ title, desc, icon, delay, highlight = false }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className={`group relative p-8 rounded-2xl border transition-all duration-500 overflow-hidden ${highlight ? 'bg-emerald-950/10 border-emerald-500/30' : 'bg-zinc-900/40 border-white/5 hover:border-emerald-500/30'}`}
  >
    {highlight && <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className={`w-12 h-12 rounded-lg border flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 ${highlight ? 'bg-emerald-900/20 border-emerald-500/20 text-emerald-400' : 'bg-zinc-900 border-white/10 text-emerald-500'}`}>
        {icon}
      </div>
      <h3 className="text-xl font-serif text-zinc-100 mb-3">{title}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const ComparisonSlider = () => {
  const [sliderVal, setSliderVal] = useState(50);
  return (
    <div className="relative w-full max-w-5xl mx-auto h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
      {/* LEFT: HELL */}
      <div className="absolute inset-0 bg-[#050000] flex items-center justify-center border-r border-white/5">
          <div className="text-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
             <XCircle className="w-20 h-20 text-red-900 mx-auto mb-6" />
             <h3 className="text-red-900 font-serif text-5xl mb-2">VOID</h3>
             <p className="text-red-900/50 font-mono tracking-widest">$0.00 REVENUE</p>
          </div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      </div>
      
      {/* RIGHT: HEAVEN (Clipped) */}
      <div 
         className="absolute inset-0 bg-[#000502] flex items-center justify-center overflow-hidden"
         style={{ clipPath: `inset(0 0 0 ${sliderVal}%)` }}
      >
          <div className="text-center w-full max-w-5xl mx-auto px-10">
             <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
             <h3 className="text-white font-serif text-5xl mb-2 drop-shadow-xl">CAPTURED</h3>
             <p className="text-emerald-500 font-mono tracking-widest">$240.00 RECOVERED</p>
             <div className="mt-8 inline-flex items-center gap-2 px-3 py-1 bg-emerald-900/30 border border-emerald-500/30 rounded text-[10px] text-emerald-400 font-mono uppercase">
                <Terminal className="w-3 h-3" />
                <span>Protocol: Flash-Fill Executed</span>
             </div>
          </div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      </div>

      {/* HANDLE */}
      <div className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.8)]" style={{ left: `${sliderVal}%` }}>
         <div className="w-12 h-12 bg-black border border-white rounded-full flex items-center justify-center">
            <div className="flex gap-1">
               <div className="w-0.5 h-4 bg-white" />
               <div className="w-0.5 h-4 bg-white" />
            </div>
         </div>
      </div>
      <input type="range" min="0" max="100" value={sliderVal} onChange={(e) => setSliderVal(parseInt(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30" />
    </div>
  );
};

// --- SECTIONS ---

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 px-6 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-white opacity-[0.03] pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Status Chip */}
        <motion.div 
           initial={{ opacity: 0, y: -20 }} 
           animate={{ opacity: 1, y: 0 }} 
           transition={{ duration: 0.8 }}
           className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-zinc-900/50 border border-white/10 mb-10 backdrop-blur-md"
        >
           <span className="flex h-2 w-2 relative">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
           </span>
           <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-300">
             Systems Nominal <span className="text-emerald-600 px-2">|</span> <span className="text-white">Accepting 2 Bespoke Partners</span>
           </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl md:text-9xl font-serif text-white tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl"
        >
          Revenue <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-emerald-900">Infrastructure.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed mb-12"
        >
          The operating system that replaces your General Manager.
          <br/>
          <span className="text-white border-b border-emerald-500/30 pb-1">Automate deposits, voice calls, and waitlists.</span>
        </motion.p>

        {/* CTA & Terminal */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-12"
        >
          <div className="flex flex-col sm:flex-row gap-5 w-full justify-center">
             <Link href="/demo" className="group relative h-14 px-8 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-3 overflow-hidden rounded-sm transition-all hover:bg-emerald-400">
                <div className="absolute inset-0 w-full h-full bg-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-2">Deploy System <ArrowRight className="w-4 h-4" /></span>
             </Link>
             <button className="h-14 px-8 bg-zinc-900 border border-zinc-800 hover:border-white/20 text-zinc-300 font-mono text-xs uppercase tracking-widest font-bold transition-all rounded-sm flex items-center justify-center gap-2 group">
                <Play className="w-3 h-3 group-hover:text-emerald-500 transition-colors" /> Watch Demo
             </button>
          </div>

          {/* Floating Terminal Code Block */}
          <div className="relative w-full max-w-2xl">
             <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg blur opacity-20 animate-pulse"></div>
             <CodeTerminal />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- NEW "BESPOKE" SECTION ---
const BespokeFoundry = () => {
   return (
      <section className="py-32 px-6 bg-[#030303] border-t border-white/5 relative overflow-hidden">
         {/* Background accent */}
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[100px] pointer-events-none"></div>

         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono uppercase text-emerald-400 mb-6">
                  <Hammer className="w-3 h-3" /> The Foundry Initiative
               </div>
               <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
                  Unlimited <br/> Engineering.
               </h2>
               <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                  Other software forces you to adapt to <i>their</i> workflow. <br/>
                  <strong>We code the software around yours.</strong>
               </p>
               <ul className="space-y-6 mb-10">
                  <li className="flex gap-4">
                     <div className="w-10 h-10 rounded bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0">
                        <PenTool className="w-5 h-5 text-white" />
                     </div>
                     <div>
                        <h4 className="text-white font-bold mb-1">Bespoke UI Design</h4>
                        <p className="text-sm text-zinc-500">Don't like our dashboard? We will redesign it to match your brand's specific aesthetic perfectly.</p>
                     </div>
                  </li>
                  <li className="flex gap-4">
                     <div className="w-10 h-10 rounded bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0">
                        <Code2 className="w-5 h-5 text-emerald-500" />
                     </div>
                     <div>
                        <h4 className="text-white font-bold mb-1">Custom Integrations</h4>
                        <p className="text-sm text-zinc-500">Need to sync with a legacy POS or a specific camera system? We write the API connectors for you.</p>
                     </div>
                  </li>
               </ul>
               <button className="text-emerald-500 border-b border-emerald-500/30 pb-1 hover:text-emerald-400 hover:border-emerald-400 transition-all font-mono text-xs uppercase tracking-widest">
                 //View Engineering Retainer Docs 
               </button>
            </div>

            {/* Visual: Request -> Code */}
            <div className="relative">
               <div className="absolute -inset-1 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl blur opacity-50"></div>
               <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                  {/* Message 1 */}
                  <div className="flex justify-end mb-6">
                     <div className="bg-emerald-600/20 border border-emerald-500/20 text-emerald-100 px-4 py-3 rounded-2xl rounded-tr-sm text-sm max-w-sm">
                        "We need a custom leaderboard that tracks 'Longest Drive' from Trackman and displays it on the lobby TV."
                     </div>
                  </div>
                  {/* Message 2 (System) */}
                  <div className="flex justify-start mb-6">
                     <div className="bg-zinc-800 border border-white/5 text-zinc-300 px-4 py-3 rounded-2xl rounded-tl-sm text-sm flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span>Engineering Team notified. Ticket #492 created.</span>
                     </div>
                  </div>
                  {/* Code Block */}
                  <div className="bg-black rounded-lg border border-white/10 p-4 font-mono text-[10px] text-zinc-500 overflow-hidden">
                     <p className="text-purple-400">import</p> <span className="text-white">{`{ TrackmanAPI }`}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'@venue/sdk'</span>;
                     <br/><br/>
                     <span className="text-blue-400">const</span> <span className="text-yellow-200">LeaderboardWidget</span> = <span className="text-white">async () ={`>`}</span> {'{'}
                     <br/>
                     &nbsp;&nbsp;<span className="text-blue-400">const</span> data = <span className="text-purple-400">await</span> TrackmanAPI.getMetrics('drive_distance');
                     <br/>
                     &nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-white">{`<LobbyDisplay data={data} />`}</span>
                     <br/>
                     {'}'}
                  </div>
                  {/* Overlay */}
                  <div className="absolute bottom-6 right-8">
                      <div className="px-3 py-1 bg-emerald-500 text-black text-[10px] font-bold font-mono uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                         Deployed: 48 Hours
                      </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

const IntegrationsTicker = () => (
   <div className="w-full bg-black border-y border-white/10 py-8 overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto px-6 mb-4 flex justify-center">
         <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">Deep Integration Ecosystem</span>
      </div>
      <div className="relative flex overflow-x-hidden group">
         <div className="animate-marquee whitespace-nowrap flex gap-16 items-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700">
            {/* Mock Logos - In real app use SVGs */}
            <span className="text-xl font-bold font-serif text-white">STRIPE <span className="text-[10px] font-mono font-normal text-zinc-500">CONNECT</span></span>
            <span className="text-xl font-bold font-serif text-white">TRACKMAN <span className="text-[10px] font-mono font-normal text-zinc-500">API</span></span>
            <span className="text-xl font-bold font-serif text-white">OPENAI <span className="text-[10px] font-mono font-normal text-zinc-500">WHISPER</span></span>
            <span className="text-xl font-bold font-serif text-white">TWILIO <span className="text-[10px] font-mono font-normal text-zinc-500">MESSAGING</span></span>
            <span className="text-xl font-bold font-serif text-white">UNEEKOR <span className="text-[10px] font-mono font-normal text-zinc-500">SDK</span></span>
            {/* Duplicate for infinite scroll */}
            <span className="text-xl font-bold font-serif text-white">STRIPE <span className="text-[10px] font-mono font-normal text-zinc-500">CONNECT</span></span>
            <span className="text-xl font-bold font-serif text-white">TRACKMAN <span className="text-[10px] font-mono font-normal text-zinc-500">API</span></span>
            <span className="text-xl font-bold font-serif text-white">OPENAI <span className="text-[10px] font-mono font-normal text-zinc-500">WHISPER</span></span>
         </div>
      </div>
   </div>
);

// --- MAIN PAGE COMPONENT ---

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#020202] text-zinc-100 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      <div className="noise-bg fixed inset-0 z-50 pointer-events-none opacity-[0.03]"></div>
      <MouseSpotlight />
      
      {/* NAVBAR */}
      <nav className="fixed w-full z-40 top-0 border-b border-white/5 bg-[#020202]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-zinc-100 text-black flex items-center justify-center font-serif font-bold rounded-sm">V</div>
              <span className="font-serif text-lg tracking-tight text-white">Venue Engine</span>
           </div>
           <Link href="/demo" className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-sm transition-all text-[10px] font-bold font-mono uppercase tracking-widest group">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Client Portal
              <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </nav>

      <HeroSection />
      
      <IntegrationsTicker />

      {/* THE PROBLEM */}
      <section className="py-32 px-6 relative border-b border-white/5 bg-[#050505]">
         <div className="max-w-5xl mx-auto mb-16 text-center">
            <div className="inline-block mb-4 px-3 py-1 border border-red-500/20 bg-red-900/10 rounded-full text-[10px] font-mono text-red-400 uppercase tracking-widest">
               Financial Alert
            </div>
            <h2 className="text-3xl md:text-5xl font-serif mb-6 text-white">The "Empty Bay" Hemorrhage.</h2>
            <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest max-w-lg mx-auto leading-loose">
               You are losing $150/hr every time a customer "forgets" to show up. <br/>
               Drag the slider to enable the Venue Engine protocols.
            </p>
         </div>
         <ComparisonSlider />
      </section>

      {/* THE SOLUTION (BENTO) */}
      <section className="py-32 px-6 relative z-10">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
               <div>
                  <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">The Revenue Core</h2>
                  <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Four Engines. Zero Leakage.</p>
               </div>
               <div className="flex gap-4">
                  <div className="text-right">
                     <div className="text-2xl font-mono text-emerald-400">99.9%</div>
                     <div className="text-[10px] text-zinc-600 uppercase tracking-widest">Uptime</div>
                  </div>
                  <div className="w-[1px] h-10 bg-white/10"></div>
                  <div className="text-right">
                     <div className="text-2xl font-mono text-white">24ms</div>
                     <div className="text-[10px] text-zinc-600 uppercase tracking-widest">Latency</div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
               {/* LARGE CARD: VOICE */}
               <div className="md:col-span-8">
                  <FeatureCard 
                     highlight={true}
                     delay={0.1}
                     icon={<Mic className="w-6 h-6" />}
                     title="Neural Voice Agent"
                     desc="A 24/7 AI Receptionist that negotiates times, answers FAQs about club specs, and texts Stripe payment links instantly. It handles 10,000 simultaneous calls."
                  />
               </div>
               
               {/* SMALL CARD: YIELD */}
               <div className="md:col-span-4">
                  <FeatureCard 
                     delay={0.2}
                     icon={<BarChart3 className="w-6 h-6" />}
                     title="Yield Engine"
                     desc="Raining? The system increases ad spend for 'Indoor Golf'. Efficiency is automated."
                  />
               </div>

               {/* SMALL CARD: GHOST */}
               <div className="md:col-span-4">
                  <FeatureCard 
                     delay={0.3}
                     icon={<Shield className="w-6 h-6" />}
                     title="Ghost Protocol"
                     desc="No deposit? No booking. We auto-cancel unpaid slots after 15 minutes."
                  />
               </div>

               {/* LARGE CARD: FLASH FILL */}
               <div className="md:col-span-8">
                  <FeatureCard 
                     delay={0.4}
                     icon={<Zap className="w-6 h-6" />}
                     title="Flash-Fill Protocol"
                     desc="When a slot opens, our n8n engine filters your waitlist by 'LTV' and texts a booking link. Slots refill in < 3 minutes."
                  />
               </div>
            </div>
         </div>
      </section>

      {/* NEW: BESPOKE ENGINEERING SECTION */}
      <BespokeFoundry />

      {/* FOUNDER'S GUARANTEE (Black Card) */}
      <section className="py-40 px-6 relative overflow-hidden bg-black">
         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-900 to-transparent"></div>
         <div className="max-w-4xl mx-auto relative z-10 text-center">
             <div className="inline-block border border-zinc-800 bg-zinc-900/50 backdrop-blur px-4 py-1 rounded-full text-[10px] font-mono uppercase text-zinc-400 mb-8">
                The Architect's Promise
             </div>
             <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 tracking-tighter">
                We don't sell software. <br/> <span className="text-zinc-600">We sell revenue.</span>
             </h2>
             <p className="text-lg text-zinc-400 mb-12 max-w-xl mx-auto font-light leading-relaxed">
                If Venue Engine does not recover its own monthly cost in captured "Ghost Revenue" within 30 days, I will refund your implementation fee in full.
             </p>
             <div className="flex flex-col items-center gap-6">
                <Link href="/demo" className="h-16 px-12 bg-white text-black hover:bg-zinc-200 font-mono text-sm uppercase tracking-widest font-bold transition-all flex items-center gap-3 rounded-sm shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                   Initiate Audit
                   <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center gap-4 opacity-50">
                    <Globe className="w-4 h-4 text-zinc-600" />
                    <Server className="w-4 h-4 text-zinc-600" />
                    <Cpu className="w-4 h-4 text-zinc-600" />
                    <Lock className="w-4 h-4 text-zinc-600" />
                </div>
             </div>
         </div>
      </section>

      <footer className="py-12 border-t border-white/5 bg-black text-center relative z-10">
         <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
            © 2025 Venue Engine • Johannesburg • New York
         </p>
      </footer>
    </main>
  );
}