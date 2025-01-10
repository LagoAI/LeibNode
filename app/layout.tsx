import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthGuard from '@/components/auth/AuthGuard'
import { Providers } from './providers'
import MainNav from '@/components/layout/MainNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LeibNode',
  description: 'Deploy your nodes with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthGuard>
            <MainNav />
            <main>{children}</main>
          </AuthGuard>
        </Providers>
      </body>
    </html>
  )
}
