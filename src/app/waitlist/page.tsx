import Link from "next/link";

export default function WaitlistPage() {
    return (
        <main className="min-h-screen relative flex flex-col items-center justify-center py-24 px-6 text-center">
            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.06] bg-repeat pointer-events-none mix-blend-multiply z-0" style={{ backgroundImage: 'url(/paper-noise.svg)' }}></div>

            <div className="z-10 max-w-lg">
                <h1 className="font-serif text-5xl text-stone-900 mb-6">We are at capacity.</h1>
                <p className="text-lg text-stone-600 font-light leading-relaxed mb-10">
                    Thank you for your interest in Venue Engine. Due to high demand, we are currently only accepting venues with &gt;20 annual weddings.
                    <br /><br />
                    We have added you to our priority waitlist and will notify you as soon as spots open up.
                </p>

                <Link href="/" className="text-stone-400 hover:text-stone-900 underline underline-offset-4 text-sm uppercase tracking-widest transition-colors">
                    Back to Home
                </Link>
            </div>
        </main>
    )
}
