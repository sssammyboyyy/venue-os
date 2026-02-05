export default function ConfirmedPage() {
    return (
        <main className="min-h-screen relative flex flex-col items-center justify-center py-24 px-6 text-center">
            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.06] bg-repeat pointer-events-none mix-blend-multiply z-0" style={{ backgroundImage: 'url(/paper-noise.svg)' }}></div>

            <div className="z-10 max-w-lg">
                <h1 className="font-serif text-5xl text-stone-900 mb-6">You are booked.</h1>
                <p className="text-lg text-stone-600 font-light leading-relaxed mb-6">
                    Your onboarding session is confirmed.
                    <br />
                    Please prepare the following before our call:
                </p>

                <ul className="text-left text-stone-600 font-light space-y-4 border-t border-b border-stone-200 py-8 mb-10">
                    <li className="flex items-start gap-3">
                        <span className="text-stone-400 font-serif italic">01.</span>
                        <span>Login credentials for The Knot / WeddingWire.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-stone-400 font-serif italic">02.</span>
                        <span>Your 2025 pricing PDF.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-stone-400 font-serif italic">03.</span>
                        <span>A list of your last 5 leads (and why they ghosted).</span>
                    </li>
                </ul>

                <p className="text-sm text-stone-400 uppercase tracking-widest">
                    Pack your bags.
                </p>
            </div>
        </main>
    )
}
