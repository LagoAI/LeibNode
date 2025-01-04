'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Server } from 'lucide-react'

interface NodeGridProps {
  selectedNode: string | null
  onSelectNode: (nodeId: string) => void
}

const nodes = [
  {
    id: 'node1',
    name: 'Basic Node',
    image: 'https://picsum.photos/200/200?random=1',
    price: '100',
  },
  {
    id: 'node2',
    name: 'Advanced Node',
    image: 'https://picsum.photos/200/200?random=2',
    price: '200',
  },
  // Add more nodes...
]

export default function NodeGrid({ selectedNode, onSelectNode }: NodeGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {nodes.map((node) => (
        <motion.button
          key={node.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectNode(node.id)}
          className={`relative p-4 rounded-xl border-2 transition-colors ${
            selectedNode === node.id
              ? 'border-green-500 bg-[#1A1A1A]'
              : 'border-gray-800 bg-[#1A1A1A] hover:border-gray-700'
          }`}
        >
          <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
            <Image
              src={node.image}
              alt={node.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">{node.name}</h3>
              <p className="text-gray-400">${node.price}/month</p>
            </div>
            <Server className={`w-6 h-6 ${
              selectedNode === node.id ? 'text-green-500' : 'text-gray-400'
            }`} />
          </div>
        </motion.button>
      ))}
    </div>
  )
} 