'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import { paymentService } from '@/lib/services/payment'
import { PaymentStatus, OrderResponse } from '@/types/order'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  projectId: string
  nodeName: string
  duration: number
  amount: number
  quantity: number
  manualInfo: string
}

export default function PaymentModal({
  isOpen,
  onClose,
  onSuccess,
  projectId,
  nodeName,
  duration,
  amount,
  quantity,
  manualInfo,
}: PaymentModalProps) {
  const { apiKey } = useAuth()
  const [status, setStatus] = useState<PaymentStatus>('idle')
  const [error, setError] = useState('')
  const [orderDetails, setOrderDetails] = useState<OrderResponse | null>(null)
  const [selectedWallet, setSelectedWallet] = useState<'metamask' | 'okx' | null>(null)

  useEffect(() => {
    if (isOpen && status === 'idle') {
      createOrder()
    }
  }, [isOpen])

  const createOrder = async () => {
    if (!apiKey) return

    setStatus('creating')
    setError('')

    try {
      const orderData = {
        pid: projectId,
        mail: 'user@example.com', // Get from auth context
        status: 'pending' as const,
        nodeName,
        duration,
        payamount: amount,
        nodeNum: quantity,
        manual_Information: manualInfo,
        payChianName: 'SOL', // Or get from user selection
      }

      const response = await paymentService.createOrder(orderData)
      setOrderDetails(response)
      setStatus('awaiting_payment')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order')
      setStatus('error')
    }
  }

  const handleWalletSelect = async (wallet: 'metamask' | 'okx') => {
    setSelectedWallet(wallet)
    if (!orderDetails) return

    try {
      setStatus('confirming')
      const txHash = await paymentService.sendTransaction(
        orderDetails.receive,
        orderDetails.amount,
        'SOL' // Or get from user selection
      )

      // Start polling for payment confirmation
      let attempts = 0
      const maxAttempts = 60 // 10 minutes with 10-second intervals
      const pollInterval = 10000 // 10 seconds

      const pollPayment = async () => {
        if (attempts >= maxAttempts) {
          setError('Payment confirmation timeout')
          setStatus('error')
          return
        }

        try {
          const confirmation = await paymentService.confirmPayment(
            orderDetails.orderId,
            txHash,
            await window.ethereum.request({ method: 'eth_accounts' })[0]
          )

          if (confirmation.code === 0) {
            if (confirmation.timeout) {
              attempts++
              setTimeout(pollPayment, pollInterval)
            } else {
              setStatus('completed')
              onSuccess()
            }
          } else {
            setError(confirmation.message)
            setStatus('error')
          }
        } catch (err) {
          setError('Failed to confirm payment')
          setStatus('error')
        }
      }

      // Start polling
      pollPayment()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process payment')
      setStatus('error')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
          <div className="absolute right-4 top-4">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
              disabled={status === 'confirming'}
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Complete Your Payment
            </h3>

            {status === 'creating' && (
              <div className="mt-4">
                <div className="animate-spin h-8 w-8 mx-auto border-4 border-blue-500 border-t-transparent rounded-full" />
                <p className="mt-2 text-sm text-gray-500">Creating your order...</p>
              </div>
            )}

            {status === 'awaiting_payment' && orderDetails && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-4">
                  Select your wallet to complete the payment
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => handleWalletSelect('metamask')}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Pay with MetaMask
                  </button>
                  <button
                    onClick={() => handleWalletSelect('okx')}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Pay with OKX Wallet
                  </button>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>Amount: {orderDetails.amount} SOL</p>
                  <p className="mt-1">Payment Address:</p>
                  <p className="font-mono text-xs break-all">{orderDetails.receive}</p>
                </div>
              </div>
            )}

            {status === 'confirming' && (
              <div className="mt-4">
                <div className="animate-spin h-8 w-8 mx-auto border-4 border-blue-500 border-t-transparent rounded-full" />
                <p className="mt-2 text-sm text-gray-500">
                  Confirming your payment...
                  <br />
                  This may take up to 10 minutes
                </p>
              </div>
            )}

            {status === 'completed' && (
              <div className="mt-4 text-green-500">
                <svg
                  className="h-12 w-12 mx-auto text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="mt-2">Payment completed successfully!</p>
              </div>
            )}

            {status === 'error' && (
              <div className="mt-4">
                <div className="text-red-500 text-sm">
                  {error}
                </div>
                <button
                  onClick={createOrder}
                  className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 