'use client'

import React, { useState } from 'react'
import { 
  ChartBarIcon, 
  CogIcon, 
  CurrencyDollarIcon,
  BellIcon,
  ServerIcon,
  HomeIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: HomeIcon },
  { name: 'Nodes', href: '/dashboard/nodes', icon: ServerIcon },
  { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
  { name: 'Earnings', href: '/dashboard/earnings', icon: CurrencyDollarIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: CogIcon },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Node ETH-01 is running at optimal performance', time: '2m ago' },
    { id: 2, message: 'Monthly rewards distributed successfully', time: '1h ago' },
  ])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? '16rem' : '5rem' }}
        className="fixed top-0 left-0 h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-30"
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xl font-bold text-slate-900 dark:text-white"
                >
                  BlockNode
                </motion.h1>
              )}
            </AnimatePresence>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <ArrowLeftOnRectangleIcon 
                className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
                  !isSidebarOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>

        <nav className="mt-4 px-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-2 py-3 my-1 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 group"
            >
              <item.icon className="w-5 h-5 mr-3" />
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className={`transition-all duration-200 ${
        isSidebarOpen ? 'ml-64' : 'ml-20'
      }`}>
        {/* Top Navigation */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Dashboard
            </h2>
            
            {/* Notifications */}
            <div className="relative">
              <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
                <BellIcon className="w-6 h-6 text-slate-500" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 