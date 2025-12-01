import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Zap, Trophy, ShieldCheck, ArrowRight } from "lucide-react"
import BayStatusDisplay from "@/components/BayStatusDisplay"
import { venueConfig } from "@/lib/venue-config"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* NAVIGATION */}
      <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-white">
              {venueConfig.name}
            </Link>
            <span className="text-[10px] text-primary tracking-[0.2em] uppercase font-semibold">
              Venue OS
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Pricing</Link>
            <Button asChild className="bg-primary text-white hover:bg-primary/90 rounded-full px-6 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Link href="/booking">Book a Bay</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* LEFT: TEXT */}
            <div className="lg:w-1/2 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="text-xs font-medium text-primary tracking-wide uppercase">Revenue OS Online</span>
                </div>

                <h1 className="font-serif text-5xl md:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight text-white">
                  {venueConfig.tagline}
                </h1>

                <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  {venueConfig.description} <br/>
                  Stop trading time for admin. Automate your deposits, bookings, and customer retention.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button asChild size="lg" className="h-14 px-8 rounded-full text-base font-bold bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all">
                    <Link href="/booking">Launch Demo</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-full text-base font-medium border-white/10 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm">
                    <Link href="/admin">View Admin Dashboard</Link>
                  </Button>
                </div>
            </div>

            {/* RIGHT: MOCKUP INTERFACE */}
            <div className="lg:w-1/2 relative perspective-1000">
               {/* Decorative Blobs */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse" />
               
               {/* The Floating Card */}
               <div className="relative glass-panel rounded-2xl p-6 border-white/10 shadow-2xl transform rotate-y-12 rotate-x-6 hover:rotate-0 transition-transform duration-700 ease-out">
                  {/* Mockup Header */}
                  <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                     <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                     </div>
                     <div className="text-xs text-gray-500 font-mono">Live Session</div>
                  </div>
                  
                  {/* Mockup Content */}
                  <div className="space-y-4">
                     <div className="flex justify-between items-center bg-white/5 p-4 rounded-lg">
                        <div>
                           <p className="text-xs text-gray-400 uppercase">Current Session</p>
                           <p className="text-white font-bold">4-Ball: Pebble Beach</p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-none">Active</Badge>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-lg">
                           <p className="text-xs text-gray-400">Time Remaining</p>
                           <p className="text-2xl font-mono text-white">01:14:32</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg">
                           <p className="text-xs text-gray-400">Spend</p>
                           {/* DYNAMIC CURRENCY FIX HERE */}
                           <p className="text-2xl font-mono text-primary">{venueConfig.currency} 85.00</p>
                        </div>
                     </div>
                     <Button className="w-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20">
                        Extend Session (+30m)
                     </Button>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* LIVE STATUS DASHBOARD */}
      <section className="py-12 border-y border-white/5 bg-black/20">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Live Availability</h2>
                <p className="text-gray-400 text-sm">Real-time connection to venue database</p>
              </div>
              <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10 px-4 py-1">
                <Zap className="w-3 h-3 mr-2 fill-primary" />
                Live Feed Active
              </Badge>
           </div>
           <BayStatusDisplay />
        </div>
      </section>

      {/* BENTO GRID FEATURES */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold mb-4">Pro-Level Technology</h2>
            <p className="text-gray-400">Everything you need for the perfect round.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            {/* Card 1: Large */}
            <div className="md:col-span-2 glass-panel rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-all" />
              <Trophy className="w-12 h-12 text-secondary mb-6" />
              <h3 className="text-2xl font-bold mb-2">Championship Courses</h3>
              <p className="text-gray-400">Play Augusta, St Andrews, and 500+ other world-famous courses in 4K resolution.</p>
            </div>

            {/* Card 2 */}
            <div className="glass-panel rounded-3xl p-8 flex flex-col justify-center items-center text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Clock className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Zero Latency</h3>
              <p className="text-sm text-gray-400">Instant shot feedback <br/>with ProTee VX sensors.</p>
            </div>

            {/* Card 3 */}
            <div className="glass-panel rounded-3xl p-8 flex flex-col justify-center items-center text-center hover:border-primary/50 transition-colors cursor-pointer">
              <ShieldCheck className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Secure Booking</h3>
              <p className="text-sm text-gray-400">Bank-grade payments <br/>powered by Stripe.</p>
            </div>

            {/* Card 4: Wide */}
            <div className="md:col-span-2 glass-panel rounded-3xl p-8 flex flex-row items-center justify-between group cursor-pointer hover:bg-white/10 transition-all">
               <div>
                 <h3 className="text-2xl font-bold mb-2 text-white">4-Ball Special Offer</h3>
                 <p className="text-gray-400">Book for 4 players and save 20% instantly.</p>
               </div>
               <div className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                 <ArrowRight className="w-6 h-6" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-transparent to-black/50">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl font-bold mb-16 text-center">Simple Pricing</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { players: "1 Player", price: venueConfig.pricing.baseRate, popular: false },
              { players: "2 Players", price: venueConfig.pricing.twoPlayerRate, popular: false },
              { players: "3 Players", price: venueConfig.pricing.threePlayerRate, popular: false },
              { players: "4 Players", price: venueConfig.pricing.fourPlayerRate, popular: true },
            ].map((tier, i) => (
              <div key={i} className={`relative glass-panel rounded-2xl p-6 flex flex-col items-center ${tier.popular ? 'border-secondary/50 shadow-[0_0_30px_rgba(234,179,8,0.1)]' : ''}`}>
                {tier.popular && <Badge className="absolute -top-3 bg-secondary text-black hover:bg-secondary font-bold">BEST VALUE</Badge>}
                <h3 className="text-lg font-medium text-gray-300 mb-4">{tier.players}</h3>
                <div className="text-4xl font-bold text-white mb-1">
                  <span className="text-2xl align-top mr-1">{venueConfig.currency}</span>{tier.price}
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-6">Per Person / Hour</p>
                <Button asChild className="w-full bg-white/10 hover:bg-white text-white hover:text-black transition-all">
                  <Link href="/booking">Select</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR SECTION */}
      <section className="py-24 bg-gradient-to-t from-primary/10 to-transparent">
        <div className="container mx-auto px-6 text-center">
          <Badge className="mb-6 bg-primary text-white border-none px-4 py-1 text-sm">
            REVENUE ENGINE
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-white">
            Stop Losing <span className="text-primary">{venueConfig.currency}15,000+</span> / Month
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            Ghost bookings and empty slots kill your margins. Our automated deposit & waitlist system recovers revenue while you sleep.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="glass-panel p-8 rounded-2xl text-left border-l-4 border-l-primary">
              <div className="text-3xl font-bold text-white mb-2">40%</div>
              <div className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">Auto-Deposits</div>
              <p className="text-sm text-gray-400">
                We secure a 40% upfront deposit instantly. No more "I forgot to pay" excuses.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel p-8 rounded-2xl text-left border-l-4 border-l-secondary">
              <div className="text-3xl font-bold text-white mb-2">0ms</div>
              <div className="text-sm font-semibold text-secondary uppercase tracking-wide mb-4">Double-Book Protection</div>
              <p className="text-sm text-gray-400">
                Our database locks slots in milliseconds. You never have to refund an angry customer again.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel p-8 rounded-2xl text-left border-l-4 border-l-blue-500">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-sm font-semibold text-blue-500 uppercase tracking-wide mb-4">Revenue Operations</div>
              <p className="text-sm text-gray-400">
                The system fills empty slots automatically using our "Rainy Day" algorithms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>© 2026 {venueConfig.name}. All rights reserved.</p>
        <p className="mt-2">Powered by Venue OS</p>
      </footer>
    </div>
  )
}
