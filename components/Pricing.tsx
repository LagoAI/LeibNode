'use client'

import AnimatedSection from '@/components/animations/AnimatedSection'
import AnimatedButton from '@/components/animations/AnimatedButton'

const plans = [
  {
    name: 'Starter',
    price: '49',
    features: [
      '1 Node Deployment',
      'Basic Monitoring',
      'Community Support',
      '99.9% Uptime',
    ],
  },
  {
    name: 'Professional',
    price: '99',
    features: [
      '5 Node Deployments',
      'Advanced Monitoring',
      'Priority Support',
      '99.99% Uptime',
      'API Access',
    ],
  },
  {
    name: 'Enterprise',
    price: '299',
    features: [
      'Unlimited Nodes',
      'Custom Solutions',
      'Dedicated Support',
      '99.999% Uptime',
      'Advanced Analytics',
      'Custom API Integration',
    ],
  },
]

export default function Pricing() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Choose the perfect plan for your needs
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <AnimatedSection
              key={plan.name}
              delay={index * 0.2}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-8"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {plan.name}
              </h3>
              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">
                  ${plan.price}
                </span>
                <span className="text-slate-600 dark:text-slate-400 ml-2">
                  /month
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center text-slate-600 dark:text-slate-400"
                  >
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <AnimatedButton
                variant={index === 1 ? 'primary' : 'outline'}
                className="w-full"
              >
                Get Started
              </AnimatedButton>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
