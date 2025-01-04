'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Plus, Minus, Clock, Settings, Zap } from 'lucide-react'
import NodeGrid from '@/components/layout/NodeGrid'
import DeploymentPanel from '@/components/layout/DeploymentPanel'

export default function DeployPage() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [duration, setDuration] = useState(30)
  const [serviceType, setServiceType] = useState<'MANUAL' | 'AUTO'>('MANUAL')

  return (
    <div className="min-h-screen bg-black pt-[60px]">
      {/* Promotional Banner */}
      <div className="bg-[rgb(59_130_246)] text-white text-center py-2">
        <p className="text-sm">🎉 Limited Time Offer: 60% savings on all node deployments!</p>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <h1 className="text-3xl font-bold text-white mb-8">Deploy Your Node</h1>
            
            {/* Node Grid */}
            <NodeGrid
              selectedNode={selectedNode}
              onSelectNode={setSelectedNode}
            />
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-4">
            <DeploymentPanel
              selectedNode={selectedNode}
              quantity={quantity}
              duration={duration}
              serviceType={serviceType}
              onQuantityChange={setQuantity}
              onDurationChange={setDuration}
              onServiceTypeChange={setServiceType}
            />
          </div>
        </div>
      </main>
    </div>
  )
} 