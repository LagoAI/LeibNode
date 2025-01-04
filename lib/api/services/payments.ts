import { apiClient } from '../client'

interface Payment {
  id: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
  timestamp: string
  type: 'reward' | 'withdrawal' | 'deposit'
}

export const paymentService = {
  async getPaymentHistory(page = 1, limit = 10) {
    return apiClient.get<Payment[]>('/payments', {
      params: { page, limit }
    })
  },

  async initiateWithdrawal(amount: number, address: string) {
    return apiClient.post<Payment>('/payments/withdraw', {
      amount,
      address
    })
  },

  async getPaymentStatus(paymentId: string) {
    return apiClient.get<Payment>(`/payments/${paymentId}`)
  },
} 