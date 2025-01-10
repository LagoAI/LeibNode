export interface ParsedManualInformation {
  email: string;
  key: string;
  wallet: string;
}

export interface Order {
  orderId: string;
  pid: string;
  mail: string;
  status: string;
  nodeName: string;
  duration: number;
  payamount: number;
  actual: number;
  nodeNum: number;
  manual_Information: string;
  payChianName: string;
  createAt: string;
  txhash: string;
  parsed_Manual_information: ParsedManualInformation;
}

export interface OrderResponse {
  code: number;
  message?: string;
  data?: Order[];
}

export interface PaymentConfirmation {
  code: number
  message: string
  timeout?: boolean
}

export type PaymentStatus = 'idle' | 'creating' | 'awaiting_payment' | 'confirming' | 'completed' | 'error' 