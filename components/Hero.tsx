'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import AnimatedButton from '@/components/animations/AnimatedButton'

export default function Hero() {
  const router = useRouter()

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/grid-pattern.svg"
          alt="Grid Pattern"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              AI Infrastructure
              <span className="text-blue-500 block mt-2">Made Simple</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Deploy and scale your AI models instantly. Start building the future with zero infrastructure headaches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <AnimatedButton 
                variant="primary"
                onClick={() => router.push('/deploy')}
              >
                Start Building
              </AnimatedButton>
              <AnimatedButton variant="outline">
                Schedule Demo
              </AnimatedButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative h-[500px] w-full">
              <Image
                src="/ai-network.svg"
                alt="AI Network"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 