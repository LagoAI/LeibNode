import { OrderRequest, OrderResponse, PaymentConfirmation } from '@/types/order'

class PaymentService {
  private static instance: PaymentService
  private readonly API_BASE_URL = 'http://43.134.94.194:1314'

  private constructor() {}

  static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService()
    }
    return PaymentService.instance
  }

  async createOrder(orderData: OrderRequest): Promise<OrderResponse> {
    const response = await fetch(`${this.API_BASE_URL}/user/order/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      throw new Error('Failed to create order')
    }

    const data = await response.json()
    if (data.code !== 0) {
      throw new Error(data.message || 'Failed to create order')
    }

    return data
  }

  async confirmPayment(orderId: string, txHash: string, walletAddress: string): Promise<PaymentConfirmation> {
    const response = await fetch(
      `${this.API_BASE_URL}/user/order/pay/${orderId}?txhash=${txHash}&wallet=${walletAddress}`,
      {
        method: 'GET',
      }
    )

    if (!response.ok) {
      throw new Error('Failed to confirm payment')
    }

    const data = await response.json()
    return {
      code: data.code,
      message: data.message,
      timeout: data.code === 0 && data.message?.includes('timeout'),
    }
  }

  async getWalletBalance(address: string, chain: string): Promise<number> {
    // Implement balance check based on chain (SOL, ETH, etc.)
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest'],
        })
        return parseInt(balance, 16) / 1e18 // Convert from wei to ETH
      } catch (error) {
        console.error('Error getting wallet balance:', error)
        throw error
      }
    }
    throw new Error('No wallet found')
  }

  async sendTransaction(to: string, amount: number, chain: string): Promise<string> {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const from = accounts[0]
        
        // Convert amount to wei (for ETH)
        const amountInWei = `0x${(amount * 1e18).toString(16)}`
        
        const txHash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [{
            from,
            to,
            value: amountInWei,
          }],
        })
        
        return txHash
      } catch (error) {
        console.error('Error sending transaction:', error)
        throw error
      }
    }
    throw new Error('No wallet found')
  }
}

export const paymentService = PaymentService.getInstance() 