'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth'
import { Order } from '@/types/order'
import { orderService } from '@/lib/services/order'
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/ui/Table'

export default function DashboardPage() {
  const { apiKey } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!apiKey) {
        setError('Not authenticated')
        setLoading(false)
        return
      }

      try {
        const data = await orderService.fetchUserOrders(apiKey)
        setOrders(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch orders')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [apiKey])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 bg-red-50 p-4 rounded-lg">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Purchased Nodes</h1>
      
      {orders.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No orders found. Start by deploying a new node!
        </div>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Order ID</Th>
              <Th>Node Name</Th>
              <Th>Status</Th>
              <Th>Duration</Th>
              <Th>Amount</Th>
              <Th>Nodes</Th>
              <Th>Created At</Th>
              <Th>Chain</Th>
              <Th>Transaction</Th>
              <Th>Details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr key={order.orderId}>
                <Td>{order.orderId}</Td>
                <Td>{order.nodeName}</Td>
                <Td>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'deployed' 
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </Td>
                <Td>{order.duration} days</Td>
                <Td>{order.payamount} USDC</Td>
                <Td>{order.nodeNum}</Td>
                <Td>{new Date(order.createAt).toLocaleString()}</Td>
                <Td>{order.payChianName}</Td>
                <Td>
                  {order.txhash && (
                    <a
                      href={`https://explorer.solana.com/tx/${order.txhash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 underline"
                    >
                      View
                    </a>
                  )}
                </Td>
                <Td>
                  <div className="space-y-1 text-xs">
                    {Object.entries(order.parsed_Manual_information).map(([key, value]) => (
                      <div key={key} className="flex">
                        <span className="font-medium mr-1">{key}:</span>
                        <span className="truncate">{value}</span>
                      </div>
                    ))}
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </div>
  )
} 