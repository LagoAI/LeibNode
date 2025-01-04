'use client'

import AnimatedSection from '@/components/animations/AnimatedSection'
import AnimatedButton from '@/components/animations/AnimatedButton'

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of node operators earning passive income with our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton
              variant="secondary"
              className="text-blue-600 font-semibold px-8 py-3"
            >
              Start Free Trial
            </AnimatedButton>
            <AnimatedButton
              variant="outline"
              className="text-white border-white hover:bg-white/10 px-8 py-3"
            >
              Schedule Demo
            </AnimatedButton>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
} 