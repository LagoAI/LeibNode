import Image from 'next/image'

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export default function Logo({ className = '', width = 48, height = 48 }: LogoProps) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logo.svg"
        alt="BlockNode Logo"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </div>
  )
} 