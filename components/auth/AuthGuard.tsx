'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth'

const publicPaths = ['/', '/login']

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname() || '/'
  const { isAuthenticated, apiKey } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated && !publicPaths.includes(pathname)) {
      router.push(`/login?from=${encodeURIComponent(pathname)}`)
    } else {
      setIsLoading(false)
    }
  }, [isAuthenticated, pathname, router])

  // Show loading indicator while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    )
  }

  // If on a public path or authenticated, render children
  if (publicPaths.includes(pathname) || isAuthenticated) {
    return <>{children}</>
  }

  // Otherwise render nothing while redirecting
  return null
} 