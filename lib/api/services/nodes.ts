import { apiClient } from '../client'
import { Node, NodeMetrics } from '../types'

export const nodeService = {
  // Node Deployment
  async deployNode(type: Node['type'], config: any) {
    return apiClient.post<Node>('/nodes', { type, config })
  },

  // Node Status
  async getNodeStatus(nodeId: string) {
    return apiClient.get<Node>(`/nodes/${nodeId}`)
  },

  // Node Metrics
  async getNodeMetrics(nodeId: string, timeframe: 'hour' | 'day' | 'week' = 'day') {
    return apiClient.get<NodeMetrics[]>(`/nodes/${nodeId}/metrics`, {
      params: { timeframe }
    })
  },

  // Node Management
  async startNode(nodeId: string) {
    return apiClient.post<Node>(`/nodes/${nodeId}/start`, {})
  },

  async stopNode(nodeId: string) {
    return apiClient.post<Node>(`/nodes/${nodeId}/stop`, {})
  },

  async updateNode(nodeId: string, config: Partial<Node>) {
    return apiClient.put<Node>(`/nodes/${nodeId}`, config)
  },

  async deleteNode(nodeId: string) {
    return apiClient.delete<void>(`/nodes/${nodeId}`)
  },
} 