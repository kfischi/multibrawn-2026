import type { Metadata } from 'next'
import LandingPage from './landing-page'

export const metadata: Metadata = {
  title: 'AI Automation for Your Business | Multibrawn',
  description:
    'Calculate how much money your business loses to manual processes. Get AI-powered automation that delivers results in 30 days.',
}

export default async function LPPage({
  searchParams,
}: {
  searchParams: Promise<{ niche?: string }>
}) {
  const { niche = 'default' } = await searchParams
  return <LandingPage niche={niche} />
}
