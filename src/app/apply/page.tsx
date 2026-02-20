import ApplyPage from '@/components/apply-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Venue Engine | 15-Minute Audit',
    description: 'Fix your wedding venue reply speed. In 15 minutes, see exactly how many tours you’re losing to slow responses.',
}

export default function Page() {
    return <ApplyPage />
}
