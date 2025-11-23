import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Driveon E20 — Asphalt Sovereign',
  description: 'Hardware-first E20 compatibility upgrade for carbureted motorcycles. PTFE hoses, brass jets, Viton O-rings — zero ECU modifications.',
  keywords: ['E20 fuel', 'motorcycle upgrade', 'carburetor tuning', 'ethanol compatibility', 'bike service'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <script src="/dashboard-console-capture.js" async></script>
      </head>
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}