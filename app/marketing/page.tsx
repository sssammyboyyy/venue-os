'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  Zap, 
  DollarSign, 
  BarChart3 
} from 'lucide-react';

// --- COMPONENTS ---

const ROICalculator = () => {
  const [bays, setBays] = useState(4);
  const [rate, setRate] = useState(60);
  const [ghosts, setGhosts] = useState(5); // Missed hours per week

  const monthlyLoss = ghosts * rate * 4.33;
  // const annualLoss = monthlyLoss * 12; // Unused variable
  // const softwareCost = 2500; // Used in calculation directly
  // const roi = monthlyLoss - softwareCost; // Unused variable

  return (
    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl backdrop-blur-sm">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Revenue Recovery Calculator</h3>
        <p className="text-slate-400 text-sm">See how much "Ghost Bookings" are actually costing you.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Number of Simulators</label>
          <input 
            type="range" min="1" max="20" value={bays} onChange={(e) => setBays(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="text-right text-emerald-400 font-mono mt-1">{bays} Bays</div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Hourly Rate ($)</label>
          <input 
            type="range" min="20" max="150" value={rate} onChange={(e) => setRate(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="text-right text-emerald-400 font-mono mt-1">${rate} / hr</div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Unfilled "Prime" Hours / Week</label>
          <input 
            type="range" min="0" max="20" value={ghosts} onChange={(e) => setGhosts(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="text-right text-emerald-400 font-mono mt-1">{ghosts} Hours</div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-slate-800">
        <div className="flex justify-between items-end mb-2">
          <span className="text-slate-400">Monthly Revenue Lost</span>
          <span className="text-2xl font-bold text-red-500 font-mono">- ${monthlyLoss.toLocaleString('en-US', {maximumFractionDigits:0})}</span>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-slate-400">Venue Engine Cost</span>
          <span className="text-emerald-500 font-mono">$2,500</span>
        </div>
        <div className="mt-4 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg text-center">
          <p className="text-sm text-emerald-400 font-medium">Month 1 Profit after Recovery</p>
          <p className="text-3xl font-bold text-white mt-1">+ ${(monthlyLoss - 2500).toLocaleString('en-US', {maximumFractionDigits:0})}</p>
        </div>
      </div>
    </div>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-slate-300 font-sans selection:bg-emerald-500/30">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-50 border-b border-white/5 bg-[#0B0C10]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            <span className="text-white font-bold tracking-tight text-lg">Venue Engine</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
            <a href="#roi" className="hover:text-emerald-400 transition-colors">ROI</a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
          </div>
          <Link href="/dashboard" className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium border border-white/10 transition-all">
            Client Login
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Copy */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                System Online: v2.4
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                The Operating System for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Modern Golf Venues</span>
              </h1>
              
              <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                Automate bookings, secure 40% deposits instantly, and fill empty slots with AI-driven revenue operations. Stop trading time for admin.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-[#0B0C10] font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 group">
                  Deploy Venue Engine
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg border border-white/10 transition-all">
                  View Live Demo
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 pt-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#0B0C10] flex items-center justify-center text-[10px] text-white">
                      {String.fromCharCode(64+i)}
                    </div>
                  ))}
                </div>
                <p>Trusted by 12+ High-Volume Venues</p>
              </div>
            </div>

            {/* Right Column: Visual (The Command Center) */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-20"></div>
              
              {/* The "Card" simulating the Screenshot */}
              <div className="relative bg-[#15171C] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                {/* Mock Browser Header */}
                <div className="h-10 bg-[#0B0C10] border-b border-white/5 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                  </div>
                  <div className="ml-4 px-3 py-1 bg-white/5 rounded text-[10px] text-slate-500 font-mono w-full max-w-[200px]">
                    app.venueengine.co/dashboard
                  </div>
                </div>
                
                {/* Content - The Dashboard Image */}
                <div className="bg-[#0B0C10] relative group overflow-hidden">
                   {/* The Image */}
                   <img 
                     src="/dashboard.png" 
                     alt="Venue Engine Command Center" 
                     className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                   />
                   
                   {/* Live Activity Toast (Animation) - Kept on top */}
                   <div className="absolute bottom-6 right-6 bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 p-4 rounded-lg shadow-2xl max-w-xs animate-in slide-in-from-bottom-5 fade-in duration-1000">
                      <div className="flex items-start gap-3">
                         <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                         <div>
                            <p className="text-sm font-medium text-white">New Booking Verified</p>
                            <p className="text-xs text-slate-400">Simulator 3 • 4 Players • $50 Deposit</p>
                            <p className="text-[10px] text-emerald-400 mt-1">Revenue Captured</p>
                         </div>
                      </div>
                   </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 border-t border-white/5 bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Not Just a Calendar. <br/>A Revenue Engine.</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Legacy software was built for 1990s country clubs. Venue Engine is built for high-throughput, automated entertainment centers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="text-emerald-400" />}
              title="0ms Double-Book Protection"
              desc="Our database locks slots in milliseconds using Edge Runtime logic. You never have to refund an angry customer again."
            />
            <FeatureCard 
              icon={<DollarSign className="text-emerald-400" />}
              title="40% Auto-Deposits"
              desc="We secure cash upfront. No more 'I forgot to pay' excuses. Ghost bookings go to zero."
            />
             <FeatureCard 
              icon={<Zap className="text-emerald-400" />}
              title="Rainy Day Algorithms"
              desc="System detects gaps in your calendar and automatically triggers n8n workflows to email your waitlist."
            />
          </div>
        </div>
      </section>

      {/* --- ROI CALCULATOR SECTION --- */}
      <section id="roi" className="py-24 bg-[#0F1116] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stop Bleeding Revenue.</h2>
              <p className="text-lg text-slate-400 mb-8">
                Most venue owners don't realize that 3 missed "Prime Time" hours a week costs them over $10,000 a year. 
                <br/><br/>
                Venue Engine pays for itself if it saves just <strong>one booking per month</strong>.
              </p>
              <ul className="space-y-4">
                {['Eliminate No-Shows', 'Automate Weather Alerts', 'Fill Cancellations Instantly'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Calculator Component */}
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl rounded-full opacity-20"></div>
              <ROICalculator />
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-white/5 bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <div className="mb-4 md:mb-0">
            <span className="text-white font-bold text-lg">Venue Engine</span>
            <p className="mt-1">Automated Revenue Operations.</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact Sales</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors group">
      <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {React.cloneElement(icon, { className: "w-6 h-6 text-emerald-400" })}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{desc}</p>
    </div>
  )
}