import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50 relative">
      {/* CSS Noise Overlay for tactile "Cardstock" feel */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════
                HERO SECTION - "Aman" Typography + "Basecamp" Copy
            ═══════════════════════════════════════════════════════════════ */}
      <section className="relative flex flex-col items-center pt-32 pb-20 px-6 text-center overflow-hidden">
        {/* Badge */}
        <div className="z-10 mb-8 px-4 py-2 border border-stone-200 rounded-full bg-white shadow-sm">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400">
            Private Beta • Independent Venues Only
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="z-10 font-serif text-6xl md:text-8xl text-stone-900 leading-[1.1] mb-8 tracking-tight max-w-5xl">
          Stop <span className="text-amber-700">The Knot</span> from burning your budget.
        </h1>

        {/* Subheadline */}
        <p className="z-10 max-w-2xl text-xl text-stone-600 leading-relaxed font-sans">
          The <span className="font-semibold text-stone-800">"Anti-Ghosting Patch"</span> that manages your leads while you sleep.
          <br className="hidden md:block" /> No login required. Works with your existing email.
        </p>

        {/* CTA */}
        <div className="z-10 mt-12 flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/apply"
            className="h-16 px-10 bg-stone-900 text-stone-50 text-lg uppercase tracking-widest hover:bg-stone-800 shadow-2xl rounded-sm flex items-center justify-center transition-colors"
          >
            Apply for Access
          </Link>
          <div className="flex items-center justify-center gap-2 text-sm text-stone-500 font-medium">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            3 spots left for March
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
                VSL CONTAINER - "Restoration Hardware" Style
            ═══════════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-5xl mx-auto -mt-4 px-4 z-20 relative mb-24">
        <div className="aspect-video bg-stone-100 rounded-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-white ring-1 ring-stone-200 overflow-hidden relative">
          <iframe
            src="https://www.youtube.com/embed/MngcmTzWzeQ?rel=0&modestbranding=1"
            title="Watch: The Invisible Employee in action"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
                FEATURE COMPARISON - "Hey.com" Before/After Grid
            ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white border-y border-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 text-center mb-16">
            The <span className="italic font-light">difference</span> is automatic.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* The Villain (Old Way) */}
            <div className="opacity-60 grayscale">
              <h3 className="font-serif text-2xl mb-4 text-stone-400 italic">The Old Way</h3>
              <div className="p-8 border border-stone-200 rounded-sm bg-stone-50">
                <div className="text-stone-400 text-sm mb-2">📩 New Inquiry from The Knot</div>
                <div className="text-stone-900 font-bold text-lg mb-4">You reply 4 hours later...</div>
                <div className="text-red-400 font-medium">Result: They ghosted you.</div>
                <div className="mt-6 pt-6 border-t border-stone-200">
                  <div className="text-stone-400 text-sm">Average response time:</div>
                  <div className="text-2xl font-bold text-stone-500">4+ hours</div>
                </div>
              </div>
            </div>

            {/* The Hero (VenueEngine Way) */}
            <div className="relative transform md:-translate-x-4 md:scale-105 shadow-2xl rounded-sm bg-stone-50 border border-amber-900/10 p-8">
              <div className="absolute -top-4 -right-4 bg-amber-700 text-white text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-sm">
                Automated
              </div>
              <h3 className="font-serif text-2xl mb-4 text-stone-900">The VenueEngine Way</h3>
              <div className="space-y-4">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-xs flex-shrink-0">🤵</div>
                  <div className="bg-white p-3 rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-sm text-sm text-stone-600">
                    New Lead received at 3:00 AM.
                  </div>
                </div>
                <div className="flex gap-3 items-center justify-end">
                  <div className="bg-stone-900 text-white p-3 rounded-tl-xl rounded-bl-xl rounded-br-xl shadow-md text-sm">
                    Hi Sarah! Saw your inquiry. We have that date open! Want the brochure?
                  </div>
                  <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-xs text-white flex-shrink-0 font-bold">VE</div>
                </div>
                <div className="text-center text-xs text-stone-400 pt-2 uppercase tracking-widest">
                  Response time: 14 seconds
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-stone-200">
                <div className="text-stone-500 text-sm">Result:</div>
                <div className="text-2xl font-bold text-amber-700">+$12,000 booked</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
                BOTTOM CTA - The Ledger
            ═══════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 text-center">
        <h2 className="font-serif text-4xl md:text-6xl text-stone-900 mb-6 tracking-tight">
          Restore your <span className="italic text-amber-700 font-light">sanity.</span>
        </h2>
        <p className="max-w-xl mx-auto text-lg text-stone-600 mb-10">
          Join the private beta. No software to learn. No dashboard to check. Just relief.
        </p>
        <Link
          href="/apply"
          className="inline-flex h-16 px-12 bg-stone-900 text-stone-50 text-lg uppercase tracking-widest hover:bg-stone-800 shadow-2xl rounded-sm items-center justify-center transition-colors"
        >
          Request Access
        </Link>
        <p className="mt-6 text-sm text-stone-400">
          Limited spots available for Q1 2026.
        </p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
                FOOTER
            ═══════════════════════════════════════════════════════════════ */}
      <footer className="py-12 px-6 border-t border-stone-200 bg-white">
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
