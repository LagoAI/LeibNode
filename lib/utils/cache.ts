type CacheItem<T> = {
  value: T
  timestamp: number
}

export class Cache {
  private static instance: Cache
  private cache: Map<string, CacheItem<any>>
  private readonly defaultTTL: number

  private constructor() {
    this.cache = new Map()
    this.defaultTTL = 5 * 60 * 1000 // 5 minutes
  }

  static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache()
    }
    return Cache.instance
  }

  set<T>(key: string, value: T, ttl: number = this.defaultTTL): void {
    this.cache.set(key, {
      value,
      timestamp: Date.now() + ttl
    })
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    
    if (!item) return null
    
    if (Date.now() > item.timestamp) {
      this.cache.delete(key)
      return null
    }
    
    return item.value as T
  }

  clear(): void {
    this.cache.clear()
  }
}

export const cache = Cache.getInstance() 