'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, CheckCircle2, Terminal, Loader2, 
  Building, DollarSign, Cpu, AlertTriangle, ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';

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
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 hidden md:block"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16,185,129,0.15), transparent 80%)`
      }}
    />
  );
};

// --- FORM COMPONENT ---
export default function PartnerPage() {
  const [step, setStep] = useState(0); // 0 = Intro Screen
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    venueName: '',
    monthlyRevenue: '',
    bays: 4,
    hardware: '',
    currentPain: ''
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    
    try {
        // 1. Save to DB
        await supabase.from('leads').insert({
            full_name: formData.name,
            email: formData.email,
            venue_name: formData.venueName,
            hardware_stack: formData.hardware,
            bay_count: formData.bays,
            pain_point: formData.currentPain,
            status: 'new',
            notes: `Revenue: ${formData.monthlyRevenue}`
        });

        // 2. Trigger Email Sequence (n8n)
        if (N8N_WEBHOOK_URL) {
            await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    ...formData, 
                    timestamp: new Date().toISOString() 
                })
            });
        }
        
        await new Promise(resolve => setTimeout(resolve, 1500)); // Fake processing delay
        setIsSubmitting(false);
        setIsComplete(true);

    } catch (error) {
        console.error("Error:", error);
        setIsSubmitting(false);
        setIsComplete(true); // Fail forward
    }
  };

  // Animation Variants
  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <main className="min-h-screen bg-[#020202] text-zinc-100 font-sans selection:bg-emerald-500/30 flex flex-col relative overflow-hidden">
      <div className="noise-bg fixed inset-0 z-50 pointer-events-none opacity-[0.03]"></div>
      <MouseSpotlight />

      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center relative z-20">
        <Link href="/" className="flex items-center gap-2 group text-zinc-500 hover:text-white transition-colors">
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span className="text-xs font-mono uppercase tracking-widest">Back to Base</span>
        </Link>
        <div className="text-xs font-mono text-emerald-500 uppercase tracking-widest animate-pulse">
            Encrypted Connection
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 relative z-10 pb-20">
        <div className="w-full max-w-2xl">
            
            {/* PROGRESS (Only show after intro) */}
            {step > 0 && !isComplete && (
                <div className="mb-12">
                    <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-emerald-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${(step / 4) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>
            )}

            <AnimatePresence mode="wait">
                
                {/* STEP 0: THE MANIFESTO (Qualification) */}
                {step === 0 && (
                    <motion.div key="step0" variants={slideUp} initial="hidden" animate="visible" exit="exit" className="text-center">
                        <div className="inline-block border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 rounded-full text-[10px] font-mono uppercase text-zinc-400 mb-8">
                            Limited Availability: Q1 2025
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
                            Apply for Partnership
                        </h1>
                        <p className="text-lg text-zinc-400 max-w-lg mx-auto leading-relaxed mb-10">
                            We only work with <strong>3 elite founders per quarter</strong>. 
                            If you're ready to reclaim your mental bandwidth and automate your revenue, tell us about your business.
                        </p>
                        
                        <div className="bg-zinc-900/30 border border-white/10 p-4 rounded-lg mb-10 text-left max-w-md mx-auto flex gap-4">
                             <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                             <p className="text-xs text-zinc-500 leading-relaxed">
                                <strong>Qualification Criteria:</strong> We partner with founders making $10K+/month who are committed to operational freedom. If there's not a fit, we'll tell you honestly.
                             </p>
                        </div>

                        <button 
                            onClick={handleNext}
                            className="group h-14 px-8 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold inline-flex items-center justify-center gap-3 rounded-sm hover:bg-emerald-400 transition-all"
                        >
                            Start Application <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                )}

                {/* STEP 1: IDENTITY & REVENUE */}
                {step === 1 && (
                    <motion.div key="step1" variants={slideUp} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-serif text-white mb-2">The Basics.</h2>
                            <p className="text-zinc-400">Let's establish your current operational baseline.</p>
                        </div>
                        
                        <div className="grid gap-6">
                            <input 
                                autoFocus
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-transparent border-b border-zinc-800 py-4 text-xl focus:outline-none focus:border-emerald-500 transition-colors placeholder-zinc-700"
                            />
                            <input 
                                placeholder="Venue Name"
                                value={formData.venueName}
                                onChange={(e) => setFormData({...formData, venueName: e.target.value})}
                                className="w-full bg-transparent border-b border-zinc-800 py-4 text-xl focus:outline-none focus:border-emerald-500 transition-colors placeholder-zinc-700"
                            />
                            
                            <div className="pt-4">
                                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">Monthly Revenue Range</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['<$10k/mo', '$10k - $30k', '$30k - $50k', '$50k+'].map((range) => (
                                        <button
                                            key={range}
                                            onClick={() => setFormData({...formData, monthlyRevenue: range})}
                                            className={`p-4 border rounded-sm text-left transition-all ${formData.monthlyRevenue === range ? 'border-emerald-500 bg-emerald-500/10 text-white' : 'border-zinc-800 bg-zinc-900/20 text-zinc-500 hover:border-zinc-600'}`}
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between pt-8">
                             <button onClick={handleBack} className="text-zinc-600 hover:text-white text-sm">Back</button>
                             <button 
                                onClick={handleNext}
                                disabled={!formData.name || !formData.venueName || !formData.monthlyRevenue}
                                className="h-12 px-8 bg-white text-black font-bold rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-400 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 2: TECH STACK */}
                {step === 2 && (
                    <motion.div key="step2" variants={slideUp} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-serif text-white mb-2">Infrastructure Map.</h2>
                            <p className="text-zinc-400">We calibrate the Yield Engine to your specific hardware.</p>
                        </div>
                        
                        <div className="space-y-8">
                            <div>
                                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">Facility Size: <span className="text-white">{formData.bays} Bays</span></label>
                                <input 
                                    type="range" min="1" max="20" value={formData.bays} 
                                    onChange={(e) => setFormData({...formData, bays: parseInt(e.target.value)})}
                                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">Primary Launch Monitor</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['Trackman', 'Uneekor', 'Foresight', 'FlightScope', 'Other'].map((tech) => (
                                        <button
                                            key={tech}
                                            onClick={() => setFormData({...formData, hardware: tech})}
                                            className={`p-4 border rounded-sm text-left transition-all ${formData.hardware === tech ? 'border-emerald-500 bg-emerald-500/10 text-white' : 'border-zinc-800 bg-zinc-900/20 text-zinc-500 hover:border-zinc-600'}`}
                                        >
                                            {tech}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between pt-8">
                             <button onClick={handleBack} className="text-zinc-600 hover:text-white text-sm">Back</button>
                             <button 
                                onClick={handleNext}
                                className="h-12 px-8 bg-white text-black font-bold rounded-sm hover:bg-emerald-400 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: THE PAIN (Diagnosis) */}
                {step === 3 && (
                    <motion.div key="step3" variants={slideUp} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-serif text-white mb-2">The Bottleneck.</h2>
                            <p className="text-zinc-400">What is the single biggest drag on your mental bandwidth?</p>
                        </div>
                        
                        <div className="space-y-3">
                            {[
                                'Ghost Bookings (Revenue Loss)',
                                'Phone Tag / Admin Chaos',
                                'Low Weekend Utilization',
                                'Staffing Costs are too high',
                                'Access Control / Keys'
                            ].map((pain) => (
                                <button
                                    key={pain}
                                    onClick={() => setFormData({...formData, currentPain: pain})}
                                    className={`w-full p-4 border rounded-sm text-left flex justify-between items-center transition-all ${formData.currentPain === pain ? 'border-emerald-500 bg-emerald-500/10 text-white' : 'border-zinc-800 bg-zinc-900/20 text-zinc-400 hover:border-zinc-600'}`}
                                >
                                    <span>{pain}</span>
                                    {formData.currentPain === pain && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-between pt-8">
                             <button onClick={handleBack} className="text-zinc-600 hover:text-white text-sm">Back</button>
                             <button 
                                onClick={handleNext}
                                disabled={!formData.currentPain}
                                className="h-12 px-8 bg-white text-black font-bold rounded-sm disabled:opacity-50 hover:bg-emerald-400 transition-colors"
                            >
                                Last Step
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 4: CONTACT & SUBMIT */}
                {step === 4 && (
                    <motion.div key="step4" variants={slideUp} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-serif text-white mb-2">Finalize Protocol.</h2>
                            <p className="text-zinc-400">Where should we send your custom Revenue Blueprint?</p>
                        </div>
                        
                        <div className="space-y-6">
                            <input 
                                type="email"
                                autoFocus
                                placeholder="founder@venue.com"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-transparent border-b border-zinc-800 py-4 text-xl focus:outline-none focus:border-emerald-500 transition-colors placeholder-zinc-700"
                            />
                            
                            <div className="bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-sm flex gap-3">
                                <Terminal className="w-5 h-5 text-emerald-500 shrink-0" />
                                <p className="text-xs text-emerald-200/70 leading-relaxed">
                                    Upon submission, our system will perform a preliminary audit of your hardware stack and revenue potential.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between pt-8">
                             <button onClick={handleBack} className="text-zinc-600 hover:text-white text-sm">Back</button>
                             <button 
                                onClick={handleSubmit}
                                disabled={isSubmitting || !formData.email}
                                className="h-12 px-8 bg-emerald-500 text-black font-bold rounded-sm flex items-center gap-2 hover:bg-emerald-400 transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit Application'}
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* SUCCESS STATE */}
                {isComplete && (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/20">
                            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                        </div>
                        <h2 className="text-4xl font-serif text-white mb-4">Application Received.</h2>
                        <p className="text-zinc-400 max-w-md mx-auto leading-relaxed mb-8">
                            The system is analyzing your configuration. <br/>
                            You will receive a protocol briefing from <strong>our architecture team</strong> in your inbox shortly.
                        </p>
                        <Link href="/" className="text-emerald-500 font-mono text-xs uppercase tracking-widest hover:text-emerald-400 border-b border-emerald-500/30 pb-1">
                            Return to Command Center
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
      </div>
    </main>
  );
}