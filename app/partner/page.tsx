'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, CheckCircle2, Terminal, Mic, 
  ChevronRight, Loader2, Building, Users, Server
} from 'lucide-react';
import Link from 'next/link';

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
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    venueName: '',
    website: '',
    bays: 4,
    hardware: 'Trackman', // Default
    currentPain: ''
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // 1. SEND TO N8N WEBHOOK
    // Replace this URL with your actual n8n production webhook
    const N8N_WEBHOOK_URL = "https://your-n8n-instance.com/webhook/partner-application";
    
    try {
        // Simulate API call for demo purposes if no URL is set
        // await fetch(N8N_WEBHOOK_URL, {
        //     method: 'POST',
        //     body: JSON.stringify({ ...formData, timestamp: new Date().toISOString() })
        // });
        
        // Fake delay for "Processing" vibe
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsSubmitting(false);
        setIsComplete(true);
    } catch (error) {
        console.error("Submission error", error);
        setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020202] text-zinc-100 font-sans selection:bg-emerald-500/30 flex flex-col relative overflow-hidden">
      <div className="noise-bg fixed inset-0 z-50 pointer-events-none opacity-[0.03]"></div>
      <MouseSpotlight />

      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center relative z-20">
        <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 flex items-center justify-center rounded-sm group-hover:border-emerald-500/50 transition-colors">
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-500 rotate-180 transition-all" />
            </div>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest group-hover:text-white transition-colors">Abort Configuration</span>
        </Link>
        <div className="text-xs font-mono text-emerald-500 uppercase tracking-widest animate-pulse">
            Secure Channel Active
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 relative z-10">
        <div className="w-full max-w-xl">
            
            {/* PROGRESS BAR */}
            {!isComplete && (
                <div className="mb-12">
                    <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
                        <span>System Config</span>
                        <span>Step {step} / 3</span>
                    </div>
                    <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-emerald-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${(step / 3) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>
            )}

            <AnimatePresence mode="wait">
                {/* STEP 1: IDENTITY */}
                {step === 1 && (
                    <motion.div 
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div>
                            <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">Identify Venue Node.</h1>
                            <p className="text-zinc-400">Who is the Architect of this facility?</p>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="group">
                                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2 group-focus-within:text-emerald-500 transition-colors">Full Name</label>
                                <input 
                                    type="text" 
                                    autoFocus
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-transparent border-b border-zinc-800 py-3 text-xl focus:outline-none focus:border-emerald-500 transition-colors placeholder-zinc-800"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="group">
                                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2 group-focus-within:text-emerald-500 transition-colors">Work Email</label>
                                <input 
                                    type="email" 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full bg-transparent border-b border-zinc-800 py-3 text-xl focus:outline-none focus:border-emerald-500 transition-colors placeholder-zinc-800"
                                    placeholder="founder@venue.com"
                                />
                            </div>
                            <div className="group">
                                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2 group-focus-within:text-emerald-500 transition-colors">Venue Name</label>
                                <input 
                                    type="text" 
                                    value={formData.venueName}
                                    onChange={(e) => setFormData({...formData, venueName: e.target.value})}
                                    className="w-full bg-transparent border-b border-zinc-800 py-3 text-xl focus:outline-none focus:border-emerald-500 transition-colors placeholder-zinc-800"
                                    placeholder="Fairway Social"
                                />
                            </div>
                        </div>

                        <button 
                            onClick={handleNext}
                            disabled={!formData.name || !formData.email}
                            className="group w-full py-4 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Proceed <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                )}

                {/* STEP 2: INFRASTRUCTURE */}
                {step === 2 && (
                    <motion.div 
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div>
                            <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">Map Infrastructure.</h1>
                            <p className="text-zinc-400">We need to calibrate the Yield Engine to your hardware.</p>
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">Simulator Count: <span className="text-white">{formData.bays} Bays</span></label>
                                <input 
                                    type="range" 
                                    min="1" 
                                    max="20" 
                                    value={formData.bays} 
                                    onChange={(e) => setFormData({...formData, bays: parseInt(e.target.value)})}
                                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Primary Launch Monitor</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['Trackman', 'Uneekor', 'Foresight', 'FlightScope', 'Other'].map((tech) => (
                                        <button
                                            key={tech}
                                            onClick={() => setFormData({...formData, hardware: tech})}
                                            className={`p-4 border rounded-lg text-left transition-all ${formData.hardware === tech ? 'border-emerald-500 bg-emerald-500/10 text-white' : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-600'}`}
                                        >
                                            {tech}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                             <button 
                                onClick={handleBack}
                                className="px-6 py-4 border border-zinc-800 text-zinc-500 font-mono text-xs uppercase tracking-widest font-bold hover:text-white transition-colors"
                            >
                                Back
                            </button>
                            <button 
                                onClick={handleNext}
                                className="flex-1 group py-4 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-emerald-400 transition-colors"
                            >
                                Next <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: CALIBRATION (The Hook) */}
                {step === 3 && !isComplete && (
                    <motion.div 
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div>
                            <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">Final Calibration.</h1>
                            <p className="text-zinc-400">What is the primary inefficiency we need to solve?</p>
                        </div>
                        
                        <div className="space-y-3">
                            {[
                                'Ghost Bookings (No-Shows)',
                                'High Admin Time (Phone Tag)',
                                'Low Weekend Utilization',
                                'Payment Processing Fees',
                                'Staffing Costs'
                            ].map((pain) => (
                                <button
                                    key={pain}
                                    onClick={() => setFormData({...formData, currentPain: pain})}
                                    className={`w-full p-4 border rounded-lg text-left flex justify-between items-center transition-all ${formData.currentPain === pain ? 'border-emerald-500 bg-emerald-500/10 text-white' : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-600'}`}
                                >
                                    <span>{pain}</span>
                                    {formData.currentPain === pain && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-4 pt-4">
                             <button 
                                onClick={handleBack}
                                className="px-6 py-4 border border-zinc-800 text-zinc-500 font-mono text-xs uppercase tracking-widest font-bold hover:text-white transition-colors"
                            >
                                Back
                            </button>
                            <button 
                                onClick={handleSubmit}
                                disabled={isSubmitting || !formData.currentPain}
                                className="flex-1 group py-4 bg-emerald-500 text-black font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)] disabled:opacity-50 disabled:shadow-none"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>Initialize Audit <Terminal className="w-4 h-4" /></>
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* SUCCESS STATE */}
                {isComplete && (
                    <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                    >
                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/20">
                            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                        </div>
                        <h2 className="text-4xl font-serif text-white mb-4">Sequence Initiated.</h2>
                        <p className="text-zinc-400 max-w-md mx-auto leading-relaxed mb-8">
                            The Venue Engine team has received your configuration. We are analyzing your hardware stack against our yield models.
                            <br/><br/>
                            Expect a protocol briefing in your inbox within 15 minutes.
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