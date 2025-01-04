import { apiClient } from '../client'

interface AnalyticsData {
  earnings: {
    daily: number[]
    monthly: number[]
  }
  performance: {
    uptime: number
    efficiency: number
  }
  network: {
    peers: number
    blockHeight: number
    syncStatus: number
  }
}

export const analyticsService = {
  async getNodeAnalytics(nodeId: string, timeframe: 'day' | 'week' | 'month') {
    return apiClient.get<AnalyticsData>(`/analytics/nodes/${nodeId}`, {
      params: { timeframe }
    })
  },

  async getAccountAnalytics(timeframe: 'day' | 'week' | 'month') {
    return apiClient.get<AnalyticsData>('/analytics/account', {
      params: { timeframe }
    })
  },
} 