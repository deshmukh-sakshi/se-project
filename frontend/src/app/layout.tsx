import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'Deshmukh Traders — Premium Building Materials | BMMS',
  description:
    'Deshmukh Traders is your trusted partner for premium building materials. Browse cement, steel, sand, and more with competitive pricing and fast delivery.',
  keywords: [
    'building materials',
    'cement supplier',
    'steel bars',
    'construction materials',
    'Deshmukh Traders',
    'BMMS',
  ],
  openGraph: {
    title: 'Deshmukh Traders — Premium Building Materials',
    description:
      'Quality building materials delivered to your site. Cement, Steel, Sand, Aggregates and more.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
