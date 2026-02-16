'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface FormState {
    errors?: {
        venueName?: string[]
        firstName?: string[]
        lastName?: string[]
        email?: string[]
        annualWeddings?: string[]
        painPoint?: string[]
    }
    message?: string | null
}

export default function ApplyPage() {
    const router = useRouter()
    const [state, setState] = useState<FormState>({ message: '', errors: {} })
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsSubmitting(true)
        setState({ message: '', errors: {} })

        const formData = new FormData(e.currentTarget)

        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                body: formData,
            })

            const result = await response.json()

            if (!response.ok) {
                setState({
                    errors: result.errors || {},
                    message: result.message + (result.step ? ` [${result.step}]` : '') + (result.code ? ` (${result.code})` : ''),
                })
                setIsSubmitting(false)
                return
            }

            if (result.redirect) {
                router.push(result.redirect)
            }
        } catch (error) {
            setState({
                message: 'Network error. Please try again.',
            })
            setIsSubmitting(false)
        }
    }

    return (
        <main className="min-h-screen relative flex flex-col items-center font-sans">

            {/* --- HERO SECTION --- */}
            <section className="relative flex flex-col items-center pt-24 pb-16 px-6 text-center z-10 w-full max-w-5xl">
                <span className="mb-6 px-4 py-2 border border-stone-300 rounded-full text-xs font-semibold tracking-widest uppercase text-stone-500 bg-white/50 backdrop-blur-sm">
                    Private Beta • Independent Venues Only
                </span>

                <h1 className="font-serif text-5xl md:text-7xl text-stone-900 leading-[1.1] mb-6 tracking-tight">
                    Restore your <span className="italic text-amber-700 font-light">sanity.</span>
                </h1>

                <p className="max-w-2xl text-lg md:text-xl text-stone-600 font-light leading-relaxed">
                    The "Anti-Ghosting" engine that manages your leads while you sleep.
                    <br className="hidden md:block" /> No login required. No new software. Just relief.
                </p>
            </section>

            {/* --- VSL CONTAINER --- */}
            <section className="w-full px-6 mb-16 z-10">
                <div className="relative w-full max-w-4xl mx-auto aspect-video bg-stone-100 rounded-lg overflow-hidden shadow-2xl border border-stone-300">
                    <iframe
                        src="https://www.youtube.com/embed/MngcmTzWzeQ?rel=0&modestbranding=1"
                        title="Watch: Restore your sanity - The Anti-Ghosting Engine"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                        style={{ border: 'none' }}
                    />
                </div>
            </section>

            {/* --- LEDGER FORM --- */}
            <section className="w-full px-6 pb-24 z-10">
                <div className="w-full max-w-xl mx-auto bg-white p-8 md:p-12 border border-stone-200 shadow-xl rounded-sm relative">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-stone-900" />

                    <h3 className="font-serif text-3xl md:text-4xl text-stone-800 mb-10 text-center">Request Access</h3>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {state?.message && (
                            <div className="p-4 bg-red-50 text-red-700 text-base border border-red-200 mb-4 text-center rounded-sm">
                                {state.message}
                            </div>
                        )}

                        {/* First + Last Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative pt-4">
                                <label htmlFor="firstName" className="text-xs font-bold uppercase tracking-widest text-stone-500">First Name</label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    autoComplete="given-name"
                                    required
                                    className="w-full border-b-2 border-stone-200 bg-transparent py-4 text-xl md:text-2xl text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-800 transition-colors rounded-none font-serif"
                                    placeholder="Jane"
                                />
                                {state?.errors?.firstName && <p className="text-sm text-red-500 mt-2">{state.errors.firstName[0]}</p>}
                            </div>
                            <div className="relative pt-4">
                                <label htmlFor="lastName" className="text-xs font-bold uppercase tracking-widest text-stone-500">Last Name</label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    autoComplete="family-name"
                                    required
                                    className="w-full border-b-2 border-stone-200 bg-transparent py-4 text-xl md:text-2xl text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-800 transition-colors rounded-none font-serif"
                                    placeholder="Doe"
                                />
                                {state?.errors?.lastName && <p className="text-sm text-red-500 mt-2">{state.errors.lastName[0]}</p>}
                            </div>
                        </div>

                        {/* Venue Name */}
                        <div className="relative pt-4">
                            <label htmlFor="venueName" className="text-xs font-bold uppercase tracking-widest text-stone-500">Venue Name</label>
                            <input
                                id="venueName"
                                name="venueName"
                                autoComplete="organization"
                                required
                                className="w-full border-b-2 border-stone-200 bg-transparent py-4 text-xl md:text-2xl text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-800 transition-colors rounded-none font-serif"
                                placeholder="The Barn at..."
                            />
                            {state?.errors?.venueName && <p className="text-sm text-red-500 mt-2">{state.errors.venueName[0]}</p>}
                        </div>

                        {/* Email */}
                        <div className="relative pt-4">
                            <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-stone-500">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="w-full border-b-2 border-stone-200 bg-transparent py-4 text-xl md:text-2xl text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-800 transition-colors rounded-none font-serif"
                                placeholder="owner@venue.com"
                            />
                            {state?.errors?.email && <p className="text-sm text-red-500 mt-2">{state.errors.email[0]}</p>}
                        </div>

                        {/* Annual Weddings */}
                        <div className="relative pt-4">
                            <label htmlFor="annualWeddings" className="text-xs font-bold uppercase tracking-widest text-stone-500">Annual Weddings</label>
                            <select
                                id="annualWeddings"
                                name="annualWeddings"
                                autoComplete="off"
                                required
                                defaultValue=""
                                className="w-full border-b-2 border-stone-200 bg-transparent py-4 text-xl md:text-2xl text-stone-900 focus:outline-none focus:border-stone-800 transition-colors rounded-none font-serif appearance-none cursor-pointer"
                            >
                                <option value="" disabled className="text-stone-300">Select Volume...</option>
                                <option value="0-5">0 - 5 (Hobbyist)</option>
                                <option value="6-20">6 - 20 (Seasonal)</option>
                                <option value="20+">20 - 50 (Professional)</option>
                                <option value="50+">50+ (High Volume)</option>
                            </select>
                        </div>

                        {/* Pain Point */}
                        <div className="relative pt-4">
                            <label htmlFor="painPoint" className="text-xs font-bold uppercase tracking-widest text-stone-500">Primary Challenge</label>
                            <select
                                id="painPoint"
                                name="painPoint"
                                autoComplete="off"
                                required
                                defaultValue=""
                                className="w-full border-b-2 border-stone-200 bg-transparent py-4 text-xl md:text-2xl text-stone-900 focus:outline-none focus:border-stone-800 transition-colors rounded-none font-serif appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select Pain Point...</option>
                                <option value="ghosting">Leads Ghosting Me</option>
                                <option value="admin">Too Much Admin Work</option>
                                <option value="quality">Poor Lead Quality</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-stone-900 text-stone-50 py-5 uppercase tracking-widest font-medium text-sm hover:bg-stone-800 transition-all active:scale-[0.99] mt-10 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </button>

                        <p className="text-center text-sm text-stone-400 pt-4">
                            Limited spots available for Q1 2026.
                        </p>
                    </form>
                </div>
            </section>
        </main>
    )
}
