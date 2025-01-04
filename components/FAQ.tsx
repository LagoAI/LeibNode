'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '@/components/animations/AnimatedSection'

const faqs = [
  {
    question: 'What is a blockchain node?',
    answer: 'A blockchain node is a participant in a blockchain network that maintains a copy of the blockchain and, in some cases, validates transactions.',
  },
  {
    question: 'How much can I earn?',
    answer: 'Earnings vary based on the blockchain network, node type, and market conditions. Our platform provides real-time earnings estimates.',
  },
  {
    question: 'Do I need technical knowledge?',
    answer: 'No, our platform handles all the technical aspects. You can deploy and manage nodes without any coding or technical expertise.',
  },
  {
    question: 'How secure is the platform?',
    answer: 'We implement enterprise-grade security measures including encryption, multi-factor authentication, and regular security audits.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Everything you need to know about our platform
          </p>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AnimatedSection
              key={index}
              delay={index * 0.1}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 text-slate-600 dark:text-slate-400"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
} 
