'use client'

import React from 'react'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer 
} from 'recharts'
import { motion } from 'framer-motion'

const data = [
  { name: 'Jan', earnings: 4000 },
  { name: 'Feb', earnings: 3000 },
  { name: 'Mar', earnings: 5000 },
  { name: 'Apr', earnings: 2780 },
  { name: 'May', earnings: 4890 },
  { name: 'Jun', earnings: 6390 },
]

const stats = [
  { name: 'Active Nodes', value: '12', change: '+2', changeType: 'increase' },
  { name: 'Total Earnings', value: '$12,456', change: '+15%', changeType: 'increase' },
  { name: 'Uptime', value: '99.9%', change: '0%', changeType: 'neutral' },
  { name: 'Network Score', value: '95', change: '-2', changeType: 'decrease' },
]

export default function Overview() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">{stat.name}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                {stat.value}
              </p>
              <span className={`text-sm ${
                stat.changeType === 'increase' ? 'text-green-500' :
                stat.changeType === 'decrease' ? 'text-red-500' :
                'text-slate-500'
              }`}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Earnings Chart */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Earnings Overview
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="earnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6'
                }}
              />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#earnings)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
} 