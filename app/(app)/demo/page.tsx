'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, Users, DollarSign, Calendar, Settings, Bell, 
  Zap, Clock, Terminal, Smartphone, ChevronRight, Mic, 
  PhoneIncoming, ShieldCheck, Wifi, MessageSquarePlus
} from 'lucide-react';

// --- TYPES & MOCK DATA ---
type BayStatus = 'active' | 'idle' | 'cleaning' | 'reserved';
interface Log {
  id: string;
  time: string;
  source: 'n8n' | 'STRIPE' | 'SYSTEM' | 'USER' | 'VOICE_AI';
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

const INITIAL_BAYS: any[] = [
  { id: 1, name: 'Bay 01 (Pebble Beach)', status: 'active', currentSession: { customer: 'M. Ross', timeLeft: '45m', value: 85 } },
  { id: 2, name: 'Bay 02 (St. Andrews)', status: 'active', currentSession: { customer: 'J. Specter', timeLeft: '15m', value: 120 } },
  { id: 3, name: 'Bay 03 (Augusta)', status: 'idle' },
  { id: 4, name: 'Bay 04 (Spyglass)', status: 'reserved', currentSession: { customer: 'L. Litt', timeLeft: 'Starts in 10m', value: 65 } },
  { id: 5, name: 'Bay 05 (Sawgrass)', status: 'active', currentSession: { customer: 'D. Paulsen', timeLeft: '1h 20m', value: 150 } },
  { id: 6, name: 'Bay 06 (Bethpage)', status: 'cleaning' },
];

const BOOT_SEQUENCE = [
  "INITIALIZING VENUE CORE v2.4...",
  "CONNECTING TO STRIPE CONNECT (US)...",
  "ESTABLISHING SECURE HANDSHAKE...",
  "LOADING NEURAL VOICE MODELS...",
  "CALIBRATING YIELD ENGINE...",
  "SYSTEM ONLINE."
];

// --- COMPONENTS ---

const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
   
  useEffect(() => {
    let delay = 0;
    BOOT_SEQUENCE.forEach((line, index) => {
      delay += Math.random() * 300 + 400; 
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (index === BOOT_SEQUENCE.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, delay);
    });
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center font-mono text-emerald-500 p-8 select-none">
      <div className="w-full max-w-md space-y-2">
        {lines.map((line, i) => (
          <div key={i} className="border-r-2 border-emerald-500 w-fit animate-pulse pr-1">
            {`> ${line}`}
          </div>
        ))}
        <div className="h-4 w-2 bg-emerald-500 animate-blink mt-2"></div>
      </div>
    </div>
  );
};

const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;
    
    const duration = 1000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      
      const current = Math.floor(start + (end - start) * ease);
      setDisplayValue(current);

      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);

  return <>{displayValue.toLocaleString()}</>;
};

const StatusBadge = ({ status }: { status: BayStatus }) => {
  const styles: any = {
    active: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    idle: 'bg-zinc-800 text-zinc-400 border-zinc-700',
    cleaning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    reserved: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border ${styles[status]} flex items-center gap-1.5`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-current animate-pulse' : 'bg-current'}`} />
      {status}
    </span>
  );
};

const BayCard = ({ bay }: { bay: any }) => (
  <div className="group relative bg-[#09090b] border border-white/5 hover:border-emerald-500/30 transition-all duration-300 p-5 rounded-lg overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="flex justify-between items-start mb-6">
      <div>
        <h3 className="text-sm font-medium text-zinc-200">{bay.name}</h3>
        <p className="text-[10px] text-zinc-500 font-mono mt-1 uppercase">Unit ID: {bay.id < 10 ? `0${bay.id}` : bay.id}</p>
      </div>
      <StatusBadge status={bay.status} />
    </div>
    {bay.status === 'active' || bay.status === 'reserved' ? (
      <div className="space-y-3">
         <div className="flex justify-between items-end">
            <div>
               <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Customer</p>
               <p className="text-sm text-white font-medium">{bay.currentSession?.customer}</p>
            </div>
            <div className="text-right">
               <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Value</p>
               <p className="text-sm text-emerald-400 font-mono">${bay.currentSession?.value}</p>
            </div>
         </div>
         <div className="bg-zinc-900 rounded-sm p-2 flex items-center justify-between border border-white/5">
            <span className="text-[10px] text-zinc-400 flex items-center gap-2"><Clock className="w-3 h-3" /> Time Remaining</span>
            <span className="text-xs font-mono text-white">{bay.currentSession?.timeLeft}</span>
         </div>
      </div>
    ) : (
      <div className="h-[86px] flex flex-col items-center justify-center border border-dashed border-white/5 rounded-sm bg-black/20">
         <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Available</p>
         <button className="mt-2 text-[10px] bg-white/5 hover:bg-white/10 text-white px-3 py-1 rounded transition-colors">Quick Book</button>
      </div>
    )}
  </div>
);

const LogStream = ({ logs }: { logs: Log[] }) => {
   const scrollRef = useRef<HTMLDivElement>(null);
   useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [logs]);
   return (
      <div className="h-full flex flex-col">
         <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#09090b]">
            <div className="flex items-center gap-2">
               <Terminal className="w-4 h-4 text-zinc-500" />
               <span className="text-xs font-mono uppercase text-zinc-400">System Activity</span>
            </div>
            <span className="flex h-2 w-2 relative">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
         </div>
         <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-[10px] h-[300px]">
            {logs.map((log) => (
               <div key={log.id} className="flex gap-3 animate-[fadeIn_0.3s_ease-out]">
                  <span className="text-zinc-600 shrink-0">{log.time}</span>
                  <div className="flex-1">
                     <span className={`uppercase font-bold tracking-wider mr-2 ${
                        log.source === 'n8n' ? 'text-blue-400' : 
                        log.source === 'STRIPE' ? 'text-indigo-400' : 
                        log.source === 'VOICE_AI' ? 'text-emerald-400' : 'text-zinc-500'
                     }`}>[{log.source}]</span>
                     <span className={`${
                        log.type === 'success' ? 'text-emerald-500' :
                        log.type === 'warning' ? 'text-amber-500' : 'text-zinc-300'
                     }`}>{log.message}</span>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

const VoiceNode = ({ active }: { active: boolean }) => (
  <div className="bg-[#09090b] border border-white/5 p-4 rounded-xl flex items-center justify-between overflow-hidden relative group w-full mb-6 z-0">
     {active && (
        <div className="absolute inset-0 bg-emerald-500/10 z-0 pointer-events-none">
           <div className="absolute inset-0 animate-pulse bg-emerald-500/5"></div>
        </div>
     )}
     
     <div className="relative z-10 flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${active ? 'bg-emerald-500 text-black border-emerald-400 scale-110 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-zinc-800 text-zinc-500 border-white/5'}`}>
           {active ? <PhoneIncoming className="w-5 h-5 animate-bounce" /> : <Mic className="w-5 h-5" />}
        </div>
        <div>
           <h4 className="text-sm font-medium text-white tracking-wide">Neural Voice</h4>
           <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mt-0.5">
              {active ? <span className="text-emerald-400 animate-pulse font-bold">Incoming Call...</span> : 'Standby Mode'}
           </p>
        </div>
     </div>

     <div className="flex gap-1 items-end h-6 relative z-10">
        {[1,2,3,4,5].map((i) => (
           <div 
             key={i} 
             className={`w-1 rounded-full transition-all duration-300 ${active ? 'bg-emerald-400 animate-[wave_1s_ease-in-out_infinite]' : 'h-1 bg-zinc-800'}`} 
             style={{ 
               height: active ? `${Math.random() * 20 + 5}px` : '4px', 
               animationDelay: `${i * 0.1}s` 
             }} 
           />
        ))}
     </div>
  </div>
);

export default function DemoPage() {
  const [booted, setBooted] = useState(false);
  const [bays, setBays] = useState<any[]>(INITIAL_BAYS);
  const [logs, setLogs] = useState<Log[]>([{ id: 'init', time: '10:42:00', source: 'SYSTEM', message: 'System Initialized. Monitoring.', type: 'info' }]);
  const [revenue, setRevenue] = useState(2450);

  const simulateFlashFill = () => {
     const now = new Date();
     const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
     
     setLogs(prev => [{ id: Math.random().toString(), time, source: 'VOICE_AI', message: 'Incoming Call: +1 (555) 012-3499', type: 'info' }, ...prev]);

     setTimeout(() => {
       setLogs(prev => [{ id: Math.random().toString(), time, source: 'VOICE_AI', message: 'Intent Detected: Booking (2 Players, 8PM)', type: 'info' }, ...prev]);
     }, 1200);

     setTimeout(() => {
       setLogs(prev => [{ id: Math.random().toString(), time, source: 'n8n', message: 'Stripe Payment Link sent via SMS', type: 'success' }, ...prev]);
     }, 2500);

     setTimeout(() => {
       setLogs(prev => [{ id: Math.random().toString(), time, source: 'STRIPE', message: 'Payment captured: $85.00', type: 'success' }, ...prev]);
       setRevenue(prev => prev + 85);
       setBays(prev => prev.map(bay => bay.id === 3 ? { ...bay, status: 'reserved', currentSession: { customer: 'Voice AI Capture', timeLeft: 'Starts in 10m', value: 85 } } : bay));
     }, 4000);
  };

  if (!booted) return <BootScreen onComplete={() => setBooted(true)} />;

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-emerald-500 selection:text-black animate-in fade-in duration-1000">
      
      {/* SIDEBAR */}
      <div className="fixed left-0 top-0 bottom-0 w-16 bg-[#050505] border-r border-white/5 flex flex-col items-center py-6 z-40">
         <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-serif font-bold rounded-sm mb-8">V</div>
         <div className="space-y-6">
            {[Activity, Calendar, Users, DollarSign].map((Icon, i) => (
                <button key={i} className={`p-2 rounded-lg transition-all ${i === 0 ? 'text-emerald-500 bg-emerald-500/10' : 'text-zinc-600 hover:text-white'}`}><Icon className="w-5 h-5" /></button>
            ))}
            <div className="my-4 w-8 h-[1px] bg-white/10"></div>
            <button className="p-2 text-amber-500 bg-amber-500/10 rounded-lg group relative">
                <MessageSquarePlus className="w-5 h-5" />
            </button>
         </div>
         <div className="mt-auto"><button className="p-2 text-zinc-600 hover:text-white"><Settings className="w-5 h-5" /></button></div>
      </div>

      <div className="pl-16 relative">
         <header className="h-16 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-50">
            <div>
               <h1 className="text-lg font-serif text-white tracking-tight">Command Center</h1>
               <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Venue: Main Street • <span className="text-emerald-500">System Online</span></p>
            </div>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-white/5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-mono text-zinc-400">Live Feed</span>
               </div>
            </div>
         </header>

         <main className="p-8 max-w-[1600px] mx-auto z-0 relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
               <div className="bg-[#09090b] p-6 rounded-xl border border-white/5">
                  <div className="flex justify-between items-start mb-2"><span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Gross Revenue</span><DollarSign className="w-4 h-4 text-emerald-500" /></div>
                  <div className="text-3xl font-serif text-white">$<AnimatedNumber value={revenue} /></div>
                  <div className="mt-2 text-[10px] text-emerald-500 font-mono flex items-center gap-1"><Activity className="w-3 h-3" /> +12% vs last Saturday</div>
               </div>
               <div className="bg-[#09090b] p-6 rounded-xl border border-white/5">
                  <div className="flex justify-between items-start mb-2"><span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Occupancy</span><Users className="w-4 h-4 text-blue-500" /></div>
                  <div className="text-3xl font-serif text-white">82%</div>
               </div>
               <div className="bg-[#09090b] p-6 rounded-xl border border-white/5">
                  <div className="flex justify-between items-start mb-2"><span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Ghost Rev</span><Zap className="w-4 h-4 text-amber-500" /></div>
                  <div className="text-3xl font-serif text-white">$420</div>
               </div>
               <div className="bg-gradient-to-br from-emerald-900/20 to-black p-6 rounded-xl border border-emerald-500/20 flex flex-col justify-center items-start relative overflow-hidden group hover:border-emerald-500/40 transition-all cursor-pointer" onClick={simulateFlashFill}>
                  <div className="absolute top-0 right-0 p-10 bg-emerald-500/10 blur-[50px] rounded-full group-hover:bg-emerald-500/20 transition-all"></div>
                  <h3 className="text-sm font-bold text-white mb-1 relative z-10">Simulate Chaos</h3>
                  <p className="text-[10px] text-zinc-400 mb-4 relative z-10">Trigger a "Voice Agent" event.</p>
                  <button className="w-full bg-white text-black hover:bg-zinc-200 text-xs font-bold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2 relative z-10">
                     <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" /> Trigger Event
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
               <div className="lg:col-span-8 flex flex-col">
                  <VoiceNode active={logs.length > 0 && logs[0].source === 'VOICE_AI'} />
                  <div className="flex justify-between items-center mb-6">
                     <h2 className="text-lg font-serif text-white">Venue Status</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {bays.map(bay => <BayCard key={bay.id} bay={bay} />)}
                  </div>
               </div>
               <div className="lg:col-span-4 bg-[#050505] border border-white/10 rounded-xl overflow-hidden flex flex-col">
                  <LogStream logs={logs} />
               </div>
            </div>
         </main>
      </div>
    </div>
  );
}