'use client'

import { motion } from 'framer-motion'
import { ButtonHTMLAttributes } from 'react'

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  isLoading?: boolean
}

export default function AnimatedButton({
  children,
  className = '',
  variant = 'primary',
  isLoading = false,
  ...props
}: AnimatedButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-900 focus:ring-slate-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500'
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      <motion.div
        animate={isLoading ? { opacity: 0.5 } : { opacity: 1 }}
        className="flex items-center justify-center"
      >
        {isLoading && (
          <motion.div
            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )}
        {children}
      </motion.div>
    </motion.button>
  )
} 