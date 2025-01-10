import { Order, OrderResponse } from '@/types/order'

// Mock data for testing
const MOCK_ORDERS: Order[] = [
  {
    orderId: "9qul2spsdw9beerz89kue1cjc24e4y09",
    pid: "1bslhuqvrn9uk1q1",
    mail: "test@qq.com",
    status: "deployed",
    nodeName: "beranode",
    duration: 30,
    payamount: 72,
    actual: 73.701953,
    nodeNum: 1,
    manual_Information: "key:sqsadsd,email:dqwdsad,wallet:dqwdasassd",
    createAt: "2024-01-07T13:12:21.735+08:00",
    payChianName: "SOL",
    txhash: "5FmH7t5YhPcgxxxxxxxHRcgh1GpsJodcmWxxxxxScQXYFzN2RogiMYHBRUsbWrNCoDnAFdn",
    parsed_Manual_information: {
      email: "dqwdsad",
      key: "sqsadsd",
      wallet: "dqwdasassd"
    }
  },
  {
    orderId: "8xkl1rpsew8aeerz79jte0cic23e3x08",
    pid: "2aslgtqvrn8tk0q0",
    mail: "test@qq.com",
    status: "pending",
    nodeName: "opnode",
    duration: 60,
    payamount: 144,
    actual: 145.5,
    nodeNum: 2,
    manual_Information: "key:abc123,email:test@example.com,wallet:0x123456",
    createAt: "2024-01-08T15:30:00.000+08:00",
    payChianName: "ETH",
    txhash: "",
    parsed_Manual_information: {
      email: "test@example.com",
      key: "abc123",
      wallet: "0x123456"
    }
  },
  {
    orderId: "7wjk0qosev7zeerz69ite9chc22e2w07",
    pid: "3rslftqvrn7sj9p9",
    mail: "test@qq.com",
    status: "failed",
    nodeName: "arbitrumnode",
    duration: 90,
    payamount: 216,
    actual: 0,
    nodeNum: 3,
    manual_Information: "key:xyz789,email:another@example.com,wallet:0xabcdef",
    createAt: "2024-01-09T10:45:00.000+08:00",
    payChianName: "ETH",
    txhash: "",
    parsed_Manual_information: {
      email: "another@example.com",
      key: "xyz789",
      wallet: "0xabcdef"
    }
  }
]

class OrderService {
  private static instance: OrderService
  private readonly API_BASE_URL = 'http://43.134.94.194:1314'

  private constructor() {}

  static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService()
    }
    return OrderService.instance
  }

  async fetchUserOrders(apiKey: string): Promise<Order[]> {
    // Return mock data for testing
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_ORDERS)
      }, 1000) // Simulate network delay
    })

    // Uncomment below for real API call
    /*
    try {
      const response = await fetch(`${this.API_BASE_URL}/user/orders`, {
        method: 'GET',
        headers: {
          'Authorization': apiKey,
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch orders')
      }

      const data: OrderResponse = await response.json()

      if (data.code !== 0 || !data.data) {
        throw new Error(data.message || 'Failed to fetch orders')
      }

      return data.data
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw error
    }
    */
  }
}

export const orderService = OrderService.getInstance() 