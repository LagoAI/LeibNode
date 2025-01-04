// API Response Types
export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: string
  timestamp: number
}

// Node Types
export interface Node {
  id: string
  type: 'ETH' | 'BTC' | 'SOL' | 'DOT'
  status: 'running' | 'stopped' | 'error' | 'deploying'
  performance: {
    uptime: number
    cpu: number
    memory: number
    storage: number
  }
  rewards: {
    daily: number
    total: number
    lastPayout: string
  }
  createdAt: string
  updatedAt: string
}

// Metrics Types
export interface NodeMetrics {
  timestamp: string
  cpu: number
  memory: number
  storage: number
  peers: number
  blockHeight: number
  syncStatus: number
}

// User Types
export interface UserProfile {
  id: string
  email: string
  nodes: Node[]
  balance: number
  apiKeys: string[]
  twoFactorEnabled: boolean
} 