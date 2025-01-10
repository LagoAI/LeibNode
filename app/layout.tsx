import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import MainNav from '@/components/layout/MainNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LeibNode - Node Deployment Platform',
  description: 'Deploy and manage your blockchain nodes with ease',
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
          <MainNav />
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
