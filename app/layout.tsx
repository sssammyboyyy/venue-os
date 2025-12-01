import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google" // Import Playfair
import "./globals.css"
import { cn } from "@/lib/utils"
import { venueConfig } from "@/lib/venue-config"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: `${venueConfig.name} | Book Online`,
  description: venueConfig.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, playfair.variable, "min-h-screen bg-background font-sans antialiased")}>
        {children}
      </body>
    </html>
  )
}