import { ReactNode } from 'react'

interface ResponsiveGridProps {
  children: ReactNode
  columns?: {
    mobile?: number
    tablet?: number
    laptop?: number
    desktop?: number
  }
  gap?: string
  className?: string
}

export default function ResponsiveGrid({
  children,
  columns = {
    mobile: 1,
    tablet: 2,
    laptop: 3,
    desktop: 4
  },
  gap = '6',
  className = ''
}: ResponsiveGridProps) {
  return (
    <div
      className={`
        grid
        grid-cols-${columns.mobile}
        sm:grid-cols-${columns.tablet}
        md:grid-cols-${columns.laptop}
        lg:grid-cols-${columns.desktop}
        gap-${gap}
        ${className}
      `}
    >
      {children}
    </div>
  )
} 