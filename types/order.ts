export interface OrderRequest {
  pid: string
  mail: string
  status: 'pending'
  nodeName: string
  duration: number
  payamount: number
  nodeNum: number
  manual_Information: string
  payChianName: string
}

export interface OrderResponse {
  orderId: string
  amount: number
  receive: string // payment address
  code: number
  message?: string
}

export interface PaymentConfirmation {
  code: number
  message: string
  timeout?: boolean
}

export type PaymentStatus = 'idle' | 'creating' | 'awaiting_payment' | 'confirming' | 'completed' | 'error' 