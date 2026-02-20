'use client'

import Link from 'next/link'
import { SMSProof } from '@/components/ui/sms-proof'
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function HomePage() {

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", { "styles": { "branding": { "brandColor": "#000000" } }, "hideEventTypeDetails": false, "layout": "month_view" });
    })();
  }, []);

  return (
    <main className="min-h-screen bg-stone-50 relative font-sans text-stone-900">
      {/* CSS Noise Overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════
                HERO SECTION
            ═══════════════════════════════════════════════════════════════ */}
      <section className="relative flex flex-col items-center pt-24 md:pt-32 pb-16 px-6 text-center z-10 w-full max-w-5xl mx-auto">

        {/* Headline */}
        <h1 className="z-10 font-serif text-5xl md:text-7xl leading-[1.1] mb-8 tracking-tight max-w-4xl mx-auto">
          Stop Losing <span className="text-amber-700 italic">$3,000–$5,000</span> Wedding Deposits to Slow Email Replies.
        </h1>

        {/* Subhead */}
        <div className="z-10 max-w-2xl mx-auto space-y-2 mb-10">
          <p className="text-xl md:text-2xl text-stone-900 leading-snug font-medium">
            Venues replying within 5 minutes book 3x more tours.
          </p>
          <p className="text-sm md:text-base text-stone-500">
            Based on reply-time analysis across 127+ independent venues.
          </p>
          <p className="text-lg md:text-xl text-stone-800 font-semibold pt-2">
            Venue Engine replies in 14 seconds — automatically.
          </p>
        </div>

        {/* CTAs */}
        <div className="z-10 w-full max-w-md md:max-w-none flex flex-col md:flex-row gap-4 items-center justify-center">
          {/* Primary */}
          <div className="flex flex-col items-center gap-3 w-full md:w-auto">
            <Link
              href="#calendar"
              className="w-full md:w-auto h-16 px-8 bg-stone-900 text-stone-50 text-lg uppercase tracking-widest hover:bg-stone-800 shadow-xl rounded-sm flex items-center justify-center transition-all hover:scale-[1.02]"
            >
              Book Your 15-Min Audit
            </Link>
            <span className="text-xs text-stone-400 font-medium">
              No sales pitch. Just data on where you're losing bookings.
            </span>
          </div>

          {/* Secondary */}
          <Link
            href="#how-it-works"
            className="w-full md:w-auto h-16 px-8 bg-white border border-stone-200 text-stone-900 text-lg uppercase tracking-widest hover:bg-stone-50 hover:border-stone-300 shadow-sm rounded-sm flex items-center justify-center transition-all"
          >
            See How It Works
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
                 VISUAL PROOF SECTION
             ═══════════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-5xl mx-auto -mt-4 px-6 z-20 relative mb-24">
        <SMSProof />

        {/* Stats Below Proof */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8 text-sm font-mono text-stone-500 uppercase tracking-widest bg-white/50 backdrop-blur-sm py-4 rounded-full border border-stone-100 max-w-2xl mx-auto shadow-sm">
          <div className="flex items-center gap-2">
            <span className="opacity-50">Before:</span>
            <span className="text-stone-400 line-through decoration-red-400/50">Avg reply 2h 17m</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-stone-300"></div>
          <div className="flex items-center gap-2">
            <span className="text-amber-700 font-bold">After:</span>
            <span className="text-stone-900 font-bold bg-green-100 px-2 py-0.5 rounded-sm">Avg reply 18s</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
                VIDEO SECTION
            ═══════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="w-full px-6 mb-24 z-10 scroll-mt-32">
        <div className="max-w-4xl mx-auto text-center mb-6">
          <h3 className="font-serif text-2xl text-stone-900">How It Works (90 Seconds)</h3>
        </div>

        <div className="relative w-full max-w-4xl mx-auto aspect-video bg-stone-100 rounded-sm overflow-hidden shadow-2xl border border-stone-300">
          <iframe
            src="https://www.youtube.com/embed/MngcmTzWzeQ?rel=0&modestbranding=1"
            title="Watch: Venue Engine Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-8 text-stone-600 font-medium text-sm md:text-base">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span> Built for independent venues
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span> Works with your existing inbox
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span> No new software to learn
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
                 CALENDAR SECTION
             ═══════════════════════════════════════════════════════════════ */}
      <section id="calendar" className="py-24 px-6 text-center z-10 w-full bg-white border-t border-stone-100">
        <h2 className="font-serif text-3xl md:text-5xl text-stone-900 mb-4 tracking-tight">
          See exactly how many tours you're losing to slow replies.
        </h2>
        <p className="text-stone-500 mb-12">No sales pitch. Just data.</p>

        <div className="w-full max-w-4xl mx-auto bg-stone-50 rounded-xl shadow-inner overflow-hidden border border-stone-200 min-h-[600px]">
          <Cal
            namespace="audit"
            calLink="venue-engine/audit"
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ "layout": "month_view" }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
                FOOTER
            ═══════════════════════════════════════════════════════════════ */}
      <footer className="py-12 px-6 border-t border-stone-200 bg-stone-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-serif text-xl text-stone-900">VenueEngine</div>
          <div className="text-sm text-stone-400">
            © 2026 VenueEngine. The Anti-Ghosting Patch.
          </div>
        </div>
      </footer>
    </main>
  )
}
