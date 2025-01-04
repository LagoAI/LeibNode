import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import PageTransition from '@/components/animations/PageTransition'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lieb.AI - AI-Powered Infrastructure',
  description: 'Next-generation AI infrastructure and deployment platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  )
}
