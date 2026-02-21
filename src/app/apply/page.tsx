'use client'

import Link from 'next/link'
import { SMSProof } from '@/components/ui/sms-proof'
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function ApplyPage() {

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({});
            cal("ui", { "styles": { "branding": { "brandColor": "#000000" } }, "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, []);
    return (
        <main className="min-h-screen relative flex flex-col items-center font-sans bg-stone-50">
            {/* CSS Noise Overlay for tactile "Cardstock" feel */}
            <div
                className="fixed inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-multiply"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* ═══════════════════════════════════════════════════════════════
                HERO SECTION
            ═══════════════════════════════════════════════════════════════ */}
            <section className="relative flex flex-col items-center pt-24 pb-16 px-6 text-center z-10 w-full max-w-5xl overflow-hidden">
                {/* Badge */}
                <div className="z-10 mb-8 px-4 py-2 border border-stone-200 rounded-full bg-white shadow-sm">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400">
                        Private Beta • Independent Venues Only
                    </span>
                </div>

                {/* Main Headline */}
                <h1 className="z-10 font-serif text-5xl md:text-7xl text-stone-900 leading-[1.1] mb-8 tracking-tight max-w-5xl">
                    Stop Losing <span className="text-amber-700 italic">$3,000–$5,000 Deposits</span> to Slow Replies.
                </h1>

                {/* Subheadline */}
                <p className="z-10 max-w-2xl text-xl text-stone-600 leading-relaxed font-sans mb-8">
                    Venues that reply within 5 minutes book <span className="font-semibold text-stone-900">3x more tours</span> <span className="text-stone-400 text-sm">(based on data from 127+ independent venues)</span>.
                    <br className="hidden md:block" />
                    Venue Engine replies in <span className="font-semibold text-stone-900">14 seconds</span> — automatically.
                </p>

                {/* CTA */}
                <div className="z-10 flex flex-col sm:flex-row gap-4 items-center">
                    {/* Primary: Scroll to Calendar */}
                    <Link
                        href="#calendar"
                        className="h-16 px-8 bg-stone-900 text-stone-50 text-lg uppercase tracking-widest hover:bg-stone-800 shadow-xl rounded-sm flex items-center justify-center transition-all hover:scale-[1.02] text-white"
                    >
                        Book Your 15-Min Audit
                    </Link>

                    {/* Secondary: See How It Works */}
                    <Link
                        href="#how-it-works"
                        className="h-16 px-8 bg-white border border-stone-200 text-stone-900 text-lg uppercase tracking-widest hover:bg-stone-50 hover:border-stone-300 shadow-sm rounded-sm flex items-center justify-center transition-all"
                    >
                        See How It Works
                    </Link>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                 VISUAL PROOF - SMS Interface
             ═══════════════════════════════════════════════════════════════ */}
            <div className="w-full max-w-5xl mx-auto -mt-4 px-6 z-20 relative mb-24">
                <SMSProof />
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                VSL CONTAINER - "Restoration Hardware" Style
            ═══════════════════════════════════════════════════════════════ */}
            <section className="w-full px-6 mb-16 z-10">
                <div id="how-it-works" className="relative w-full max-w-4xl mx-auto aspect-video bg-stone-100 rounded-lg overflow-hidden shadow-2xl border border-stone-300 scroll-mt-32">
                    <iframe
                        src="https://www.youtube.com/embed/SVRNL4R95X8?rel=0&modestbranding=1"
                        title="Watch: Restore your sanity - The Anti-Ghosting Engine"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                        style={{ border: 'none' }}
                    />
                </div>
                <div className="text-center mt-6 text-stone-500 italic font-serif z-10 relative">
                    "It's like having a full-time sales manager who never sleeps."
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                 FEATURE COMPARISON - "Hey.com" Before/After Grid
             ═══════════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white border-y border-stone-100 w-full z-10">
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
                 BOTTOM CTA - The Calendar Embed
             ═══════════════════════════════════════════════════════════════ */}
            <section id="calendar" className="py-24 px-6 text-center z-10 w-full bg-stone-50">
                <h2 className="font-serif text-3xl md:text-5xl text-stone-900 mb-12 tracking-tight">
                    Book your <span className="italic text-amber-700 font-light">Audit</span> below.
                </h2>

                <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-stone-200">
                    <Cal
                        namespace="audit"
                        calLink="venue-engine/audit"
                        style={{ width: "100%", height: "100%", overflow: "scroll" }}
                        config={{ "layout": "month_view" }}
                    />
                </div>

                <p className="mt-8 text-sm text-stone-400">
                    No hard selling. Just a look at your current response benchmarks.
                </p>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                 FOOTER
             ═══════════════════════════════════════════════════════════════ */}
            <footer className="py-12 px-6 border-t border-stone-200 bg-white w-full z-10">
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
