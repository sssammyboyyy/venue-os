import type { Metadata } from "next" // <--- This was the missing line
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { venueConfig } from "@/lib/venue-config"

// Load Fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

// Define SEO Metadata
export const metadata: Metadata = {
  title: {
    default: "Venue Engine | Revenue OS",
    template: "%s | Venue Engine"
  },
  description: venueConfig.description,
  icons: {
    icon: "/icon", // Uses the app/icon.tsx we created
  },
  openGraph: {
    title: "Venue Engine | Revenue OS",
    description: "Automated Revenue Infrastructure for Modern Venues.",
    url: "https://venueengine.co",
    siteName: "Venue Engine",
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // Dynamic Locale based on config
    <html lang={venueConfig.locale === 'en-US' ? 'en' : 'en-ZA'} className="dark">
      <body className={cn(
        inter.variable, 
        playfair.variable, 
        jetbrains.variable,
        "min-h-screen bg-background font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-50"
      )}>
        {/* Global Noise Texture for that 'Hardware' feel */}
        <div className="noise-bg" />
        
        {children}
      </body>
    </html>
  )
}