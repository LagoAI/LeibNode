'use client'

import { useState, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  withBlur?: boolean
}

export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  withBlur = true,
  ...props 
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [blur, setBlur] = useState(withBlur)

  useEffect(() => {
    // Preload image
    const img = new window.Image()
    img.src = typeof src === 'string' ? src : src.src
  }, [src])

  return (
    <div className="relative">
      <AnimatePresence>
        {isLoading && blur && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-lg"
          />
        )}
      </AnimatePresence>
      
      <Image
        src={src}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoading && blur ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        onLoadingComplete={() => setIsLoading(false)}
        {...props}
      />
    </div>
  )
} 