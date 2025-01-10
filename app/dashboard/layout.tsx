'use client'

import { useAuth } from '@/lib/auth'
import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, apiKey } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('Dashboard layout auth state:', { isAuthenticated, apiKey })
    
    if (!isAuthenticated || !apiKey) {
      window.location.href = '/login?from=/dashboard'
      return
    }

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [isAuthenticated, apiKey])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <div className="text-gray-500">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  return <DashboardLayout>{children}</DashboardLayout>
} 