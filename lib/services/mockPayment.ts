import { OrderRequest, OrderResponse, PaymentConfirmation } from '@/types/order'

// Mock data for testing
const MOCK_WALLET_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'

class MockPaymentService {
  private static instance: MockPaymentService

  private constructor() {}

  static getInstance(): MockPaymentService {
    if (!MockPaymentService.instance) {
      MockPaymentService.instance = new MockPaymentService()
    }
    return MockPaymentService.instance
  }

  async createOrder(orderData: OrderRequest): Promise<OrderResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Mock response
    return {
      orderId: `ORDER_${Math.random().toString(36).substr(2, 9)}`,
      amount: orderData.payamount,
      receive: MOCK_WALLET_ADDRESS,
      code: 0,
      message: 'Order created successfully'
    }
  }

  async confirmPayment(orderId: string, txHash: string, walletAddress: string): Promise<PaymentConfirmation> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Simulate successful payment
    return {
      code: 0,
      message: 'Payment confirmed',
      timeout: false
    }
  }

  async getWalletBalance(address: string, chain: string): Promise<number> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Return mock balance (2 ETH)
    return 2.0
  }

  async sendTransaction(to: string, amount: number, chain: string): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Return mock transaction hash
    return `0x${Math.random().toString(36).substr(2, 64)}`
  }
}

export const mockPaymentService = MockPaymentService.getInstance() 