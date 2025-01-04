import { cache } from '@/lib/utils/cache'
import { ApiResponse } from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const data = await response.json()
  
  if (!response.ok) {
    throw new ApiError(
      data.error || 'An error occurred',
      response.status,
      data.code
    )
  }

  return {
    data: data.data,
    success: true,
    timestamp: Date.now()
  }
}

export const apiClient = {
  async get<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const cacheKey = `${endpoint}-${JSON.stringify(options)}`
    const cachedData = cache.get<ApiResponse<T>>(cacheKey)
    
    if (cachedData) {
      return cachedData
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
    
    const data = await handleResponse<T>(response)
    cache.set(cacheKey, data)
    return data
  },

  async post<T>(endpoint: string, data: any, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
    })
    return handleResponse<T>(response)
  },

  async put<T>(endpoint: string, data: any, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
    })
    return handleResponse<T>(response)
  },

  async delete<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
    return handleResponse<T>(response)
  },
} 