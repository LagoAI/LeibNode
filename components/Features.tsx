'use client'

import AnimatedSection from '@/components/animations/AnimatedSection'
import AnimatedButton from '@/components/animations/AnimatedButton'
import { motion } from 'framer-motion'
import { 
  RocketLaunchIcon, 
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CogIcon,
  SignalIcon 
} from '@heroicons/react/24/outline'

const features = [
  {
    title: 'One-Click Deployment',
    description: 'Launch your blockchain node in seconds with our streamlined deployment process. No technical expertise required.',
    icon: RocketLaunchIcon,
  },
  {
    title: 'Passive Income',
    description: 'Earn consistent rewards by contributing to network security and validation. Automated payout system.',
    icon: CurrencyDollarIcon,
  },
  {
    title: 'Network Security',
    description: 'Help secure blockchain networks while earning rewards. Enterprise-grade infrastructure and protection.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Real-Time Monitoring',
    description: 'Track your node performance, rewards, and network status with our intuitive dashboard.',
    icon: ChartBarIcon,
  },
  {
    title: 'Automated Maintenance',
    description: 'Our system handles all updates, patches, and maintenance automatically. Zero manual intervention.',
    icon: CogIcon,
  },
  {
    title: 'Performance Analytics',
    description: 'Detailed insights into your node performance, uptime, and earnings with advanced analytics.',
    icon: SignalIcon,
  },
]

export default function Features() {
  return (
    <section className="py-24">
      <AnimatedSection className="text-center mb-12">
        <h2 className="text-3xl font-bold">Our Features</h2>
        <p className="text-slate-600 mt-4">Discover what makes us different</p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <AnimatedSection
            key={feature.title}
            delay={index * 0.1}
            className="p-6 bg-white rounded-lg shadow-sm"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mb-4"
            >
              <feature.icon className="w-12 h-12 text-blue-600" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-slate-600">{feature.description}</p>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.3} className="text-center mt-12">
        <AnimatedButton variant="primary">
          Get Started
        </AnimatedButton>
      </AnimatedSection>
    </section>
  )
} 