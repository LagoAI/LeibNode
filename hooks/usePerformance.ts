import { useEffect, useRef } from 'react'

interface PerformanceMetrics {
  fcp: number | null
  lcp: number | null
  fid: number | null
  cls: number | null
}

export function usePerformance() {
  const metrics = useRef<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    // First Contentful Paint
    const paintObserver = new PerformanceObserver((entries) => {
      entries.getEntries().forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          metrics.current.fcp = entry.startTime
        }
      })
    })
    paintObserver.observe({ entryTypes: ['paint'] })

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entries) => {
      const lastEntry = entries.getEntries().at(-1)
      if (lastEntry) {
        metrics.current.lcp = lastEntry.startTime
      }
    })
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

    // First Input Delay
    const fidObserver = new PerformanceObserver((entries) => {
      entries.getEntries().forEach((entry) => {
        metrics.current.fid = entry.processingStart - entry.startTime
      })
    })
    fidObserver.observe({ entryTypes: ['first-input'] })

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((entries) => {
      let clsScore = 0
      entries.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsScore += entry.value
        }
      })
      metrics.current.cls = clsScore
    })
    clsObserver.observe({ entryTypes: ['layout-shift'] })

    return () => {
      paintObserver.disconnect()
      lcpObserver.disconnect()
      fidObserver.disconnect()
      clsObserver.disconnect()
    }
  }, [])

  return metrics.current
} 