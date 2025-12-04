import type { Metadata } from "next"
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { venueConfig } from "@/lib/venue-config"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: {
    default: venueConfig.name,
    template: `%s | ${venueConfig.name}`
  },
  description: venueConfig.description,
  icons: {
    icon: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
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