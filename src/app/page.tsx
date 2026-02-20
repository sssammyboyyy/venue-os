import LandingPage from '@/components/landing-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wedding Venue Automation | Reply in 14 Seconds',
  description: 'Automate wedding lead replies in 14 seconds. Independent venues booking 3x more tours by responding instantly. No new software required.',
}

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Venue Engine',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Automate wedding lead replies in 14 seconds. Independent venues booking 3x more tours by responding instantly.',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPage />
    </>
  )
}
