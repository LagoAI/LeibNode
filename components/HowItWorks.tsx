'use client'

import AnimatedSection from '@/components/animations/AnimatedSection'
import { motion } from 'framer-motion'
import { 
  CloudArrowUpIcon,
  CpuChipIcon,
  BanknotesIcon 
} from '@heroicons/react/24/outline'

const steps = [
  {
    title: 'Deploy Your Node',
    description: 'Choose your blockchain network and deploy your node with a single click. No technical setup required.',
    icon: CloudArrowUpIcon,
  },
  {
    title: 'Automatic Validation',
    description: 'Your node automatically starts validating transactions and securing the network.',
    icon: CpuChipIcon,
  },
  {
    title: 'Earn Rewards',
    description: 'Receive regular rewards for contributing to network security and validation.',
    icon: BanknotesIcon,
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Start earning passive income with blockchain nodes in three simple steps
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-blue-500/20" />

          {steps.map((step, index) => (
            <AnimatedSection
              key={step.title}
              delay={index * 0.2}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm"
              >
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <step.icon className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
} 