'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import { mockPaymentService } from '@/lib/services/mockPayment'
import { PaymentStatus, OrderResponse } from '@/types/order'
import Web3 from 'web3'

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
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

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
        mail: 'test@example.com',
        status: 'pending' as const,
        nodeName,
        duration,
        payamount: amount,
        nodeNum: quantity,
        manual_Information: manualInfo,
        payChianName: 'ETH',
      }

      const response = await mockPaymentService.createOrder(orderData)
      setOrderDetails(response)
      setStatus('awaiting_payment')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order')
      setStatus('error')
    }
  }

  const connectMetaMask = async () => {
    console.log('Attempting to connect to MetaMask...')
    
    if (typeof window === 'undefined') {
      console.log('Window object not available')
      return false
    }

    if (!window.ethereum) {
      console.log('MetaMask not found in window.ethereum')
      setError('MetaMask not found. Please install MetaMask first.')
      return false
    }

    try {
      console.log('Requesting MetaMask accounts...')
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts',
        params: [] 
      })
      console.log('Received accounts:', accounts)

      if (!accounts || accounts.length === 0) {
        console.log('No accounts returned')
        setError('No accounts found in MetaMask')
        return false
      }

      setWalletAddress(accounts[0])
      console.log('Successfully connected to account:', accounts[0])
      return true
    } catch (err: any) {
      console.error('MetaMask connection error details:', {
        code: err.code,
        message: err.message,
        stack: err.stack,
        fullError: JSON.stringify(err, Object.getOwnPropertyNames(err))
      })

      // Handle specific MetaMask error codes
      if (err.code === 4001) {
        setError('Connection rejected. Please approve the MetaMask connection request.')
      } else if (err.code === -32002) {
        setError(`MetaMask connection already pending. Please:
1. Check for an existing MetaMask popup
2. Open MetaMask manually if no popup is visible
3. Complete or reject any pending requests
4. Try connecting again`)
      } else if (err.code === 4902) {
        setError('MetaMask is not connected to this network. Please check your network settings.')
      } else {
        setError(`Connection failed: ${err.message || 'Unknown error'}`)
      }
      return false
    }
  }

  const connectOKX = async () => {
    if (!window.okxwallet) {
      setError('OKX Wallet not found. Please install OKX Wallet first.')
      return false
    }

    try {
      // Request account access
      await window.okxwallet.request({ method: 'eth_requestAccounts' })
      const accounts = await window.okxwallet.request({ method: 'eth_accounts' })
      setWalletAddress(accounts[0])
      return true
    } catch (err) {
      setError('Failed to connect to OKX Wallet')
      return false
    }
  }

  const handleWalletSelect = async (wallet: 'metamask' | 'okx') => {
    console.log('Wallet selected:', wallet)
    setSelectedWallet(wallet)
    if (!orderDetails) {
      console.log('No order details available')
      return
    }

    try {
      // Connect to selected wallet
      console.log('Attempting to connect to wallet...')
      const connected = await (wallet === 'metamask' ? connectMetaMask() : connectOKX())
      console.log('Wallet connection result:', connected)
      
      if (!connected) {
        console.log('Failed to connect to wallet')
        return
      }

      setStatus('confirming')
      
      // Get the appropriate provider
      const provider = wallet === 'metamask' ? window.ethereum : window.okxwallet
      if (!provider) {
        const errorMsg = `${wallet === 'metamask' ? 'MetaMask' : 'OKX Wallet'} not found`
        console.log(errorMsg)
        setError(errorMsg)
        setStatus('error')
        return
      }

      console.log('Setting up Web3...')
      const web3 = new Web3(provider)

      // Convert amount to Wei
      const amountInWei = web3.utils.toWei(orderDetails.amount.toString(), 'ether')
      console.log('Amount in Wei:', amountInWei)

      // Send transaction
      console.log('Preparing transaction...')
      const txHash = await provider.request({
        method: 'eth_sendTransaction',
        params: [{
          from: walletAddress,
          to: orderDetails.receive,
          value: web3.utils.numberToHex(amountInWei),
          gas: '0x5208', // 21000 gas
        }],
      })
      console.log('Transaction hash:', txHash)

      // Start polling for payment confirmation
      let attempts = 0
      const maxAttempts = 30 // 5 minutes with 10-second intervals
      const pollInterval = 10000 // 10 seconds

      const pollPayment = async () => {
        if (attempts >= maxAttempts) {
          setError('Payment confirmation timeout')
          setStatus('error')
          return
        }

        try {
          const confirmation = await mockPaymentService.confirmPayment(
            orderDetails.orderId,
            txHash,
            walletAddress || ''
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
      console.error('Transaction error:', err)
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
                  <p>Amount: {orderDetails.amount} ETH</p>
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
                  Please confirm the transaction in your wallet
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