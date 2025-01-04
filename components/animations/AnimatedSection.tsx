'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  once = true
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })
  const prefersReducedMotion = useReducedMotion()

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : duration,
        delay,
        ease: 'easeOut'
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
} 