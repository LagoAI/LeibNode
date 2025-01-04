'use client'

import { motion } from 'framer-motion'
import { Plus, Minus, Clock, Settings, Zap } from 'lucide-react'

interface DeploymentPanelProps {
  selectedNode: string | null
  quantity: number
  duration: number
  serviceType: 'MANUAL' | 'AUTO'
  onQuantityChange: (quantity: number) => void
  onDurationChange: (duration: number) => void
  onServiceTypeChange: (type: 'MANUAL' | 'AUTO') => void
}

const durationPricing = [
  { days: 30, price: 100, discount: 0 },
  { days: 60, price: 180, discount: 10 },
  { days: 90, price: 240, discount: 20 },
]

export default function DeploymentPanel({
  selectedNode,
  quantity,
  duration,
  serviceType,
  onQuantityChange,
  onDurationChange,
  onServiceTypeChange,
}: DeploymentPanelProps) {
  return (
    <div className="bg-[#1A1A1A] rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Deployment Details</h2>

      {/* Quantity Selector */}
      <div className="mb-6">
        <label className="text-gray-400 mb-2 block">Quantity</label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-white text-lg font-semibold">{quantity}</span>
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            className="p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Duration Selector */}
      <div className="mb-6">
        <label className="text-gray-400 mb-2 block">Duration</label>
        <div className="grid grid-cols-3 gap-4">
          {durationPricing.map(({ days, price, discount }) => (
            <button
              key={days}
              onClick={() => onDurationChange(days)}
              className={`p-3 rounded-lg flex flex-col items-center ${
                duration === days
                  ? 'bg-[rgb(59_130_246)] text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <Clock className="w-4 h-4 mb-1" />
              <span className="font-semibold">{days} Days</span>
              <div className="mt-1 text-sm">
                <span className="font-medium">${price}</span>
                {discount > 0 && (
                  <span className="ml-1 text-green-400">(-{discount}%)</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Service Type Selector */}
      <div className="mb-6">
        <label className="text-gray-400 mb-2 block">Service Type</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onServiceTypeChange('MANUAL')}
            className={`p-3 rounded-lg flex items-center justify-center ${
              serviceType === 'MANUAL'
                ? 'bg-[rgb(59_130_246)] text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Settings className="w-4 h-4 mr-2" />
            Manual
          </button>
          <button
            onClick={() => onServiceTypeChange('AUTO')}
            className={`p-3 rounded-lg flex items-center justify-center ${
              serviceType === 'AUTO'
                ? 'bg-[rgb(59_130_246)] text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Zap className="w-4 h-4 mr-2" />
            Auto
          </button>
        </div>
      </div>

      {/* Deploy Button */}
      <button
        disabled={!selectedNode}
        className={`w-full py-3 rounded-lg text-white font-semibold ${
          selectedNode
            ? 'bg-[rgb(59_130_246)] hover:bg-[rgb(29_78_216)]'
            : 'bg-gray-800 cursor-not-allowed'
        }`}
      >
        Deploy Node
      </button>
    </div>
  )
} 