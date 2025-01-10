'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Minus, Clock, Settings, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import LoginModal from '@/components/modals/LoginModal'
import PaymentModal from '@/components/modals/PaymentModal'

interface DeploymentPanelProps {
  selectedNode: string | null
  quantity: number
  duration: number
  serviceType: 'MANUAL' | 'AUTO'
  onQuantityChange: (quantity: number) => void
  onDurationChange: (duration: number) => void
  onServiceTypeChange: (type: 'MANUAL' | 'AUTO') => void
}

export default function DeploymentPanel({
  selectedNode,
  quantity,
  duration,
  serviceType,
  onQuantityChange,
  onDurationChange,
  onServiceTypeChange,
}: DeploymentPanelProps) {
  const router = useRouter()
  const { isAuthenticated, apiKey } = useAuth()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Calculate price based on duration and quantity
  const basePrice = duration === 30 ? 100 : duration === 60 ? 180 : 240
  const discount = duration === 30 ? 0 : duration === 60 ? 10 : 20
  const totalPrice = (basePrice * quantity * (100 - discount)) / 100

  // Function to check login status
  const checkLoginStatus = () => {
    if (!isAuthenticated || !apiKey) {
      setIsLoginModalOpen(true)
      return false
    }
    return true
  }

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false)
    handleDeploy()
  }

  // Function to handle successful payment
  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false)
    router.push('/dashboard')
  }

  const handleDeploy = async () => {
    if (!checkLoginStatus()) return
    setIsPaymentModalOpen(true)
  }

  return (
    <>
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
            {[
              { days: 30, price: 100, discount: 0 },
              { days: 60, price: 180, discount: 10 },
              { days: 90, price: 240, discount: 20 },
            ].map(({ days, price, discount }) => (
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

        {/* Total Price */}
        <div className="mb-6 text-center">
          <p className="text-gray-400">Total Price</p>
          <p className="text-2xl font-bold text-white">${totalPrice}</p>
        </div>

        {/* Deploy Button */}
        <button
          onClick={handleDeploy}
          disabled={!selectedNode || isProcessing}
          className={`w-full py-3 rounded-lg text-white font-semibold ${
            selectedNode && !isProcessing
              ? 'bg-[rgb(59_130_246)] hover:bg-[rgb(29_78_216)]'
              : 'bg-gray-800 cursor-not-allowed'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          ) : !selectedNode ? (
            'Select a Node'
          ) : (
            'Deploy Node'
          )}
        </button>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
        projectId="default_project" // Replace with actual project ID
        nodeName={selectedNode || ''}
        duration={duration}
        amount={totalPrice}
        quantity={quantity}
        manualInfo={`key:value,email:${isAuthenticated ? 'user@example.com' : ''}`} // Replace with actual user email
      />
    </>
  )
} 