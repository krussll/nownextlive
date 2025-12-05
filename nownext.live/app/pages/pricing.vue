<script setup lang="ts">
useSeoMeta({
  title: 'Pricing - NowNext',
  description: 'Simple, transparent pricing for NowNext event management platform'
})

const plans = [
  {
    name: 'Free',
    price: '£0',
    period: 'forever',
    description: 'Perfect for trying out NowNextLive',
    features: [
      'Up to 3 active events',
      'Unlimited spaces per event',
      'Unlimited sessions',
      'Real-time updates',
      'Browser-based displays',
      'Community support'
    ],
    cta: 'Get Started',
    ctaLink: '/signup',
    highlighted: false
  },
  {
    name: 'Club',
    price: '£9',
    period: 'per month',
    description: 'For clubs running regular events',
    features: [
      'Unlimited active events',
      'Unlimited spaces per event',
      'Unlimited sessions',
      'Real-time updates',
      'Browser-based displays',
      'Priority email support',
      'Custom branding',
      'Event templates'
    ],
    cta: 'Start Free Trial',
    ctaLink: '/signup',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For large organizations',
    features: [
      'Everything in Club',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantee',
      'Advanced analytics',
      'White-label options',
      'Training & onboarding',
      'Phone support'
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
    highlighted: false
  }
]

const faqs = [
  {
    question: 'Can I change plans later?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, the Club plan comes with a 14-day free trial. No credit card required to start.'
  },
  {
    question: 'What happens if I exceed my event limit?',
    answer: 'On the Free plan, you\'ll need to archive old events before creating new ones, or upgrade to Club for unlimited events.'
  },
  {
    question: 'Do you offer discounts for annual billing?',
    answer: 'Yes! Pay annually and get 2 months free. Contact us for details.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. Cancel anytime with no questions asked. Your data remains accessible for 30 days after cancellation.'
  }
]
</script>

<template>
  <div class="bg-white text-gray-900 antialiased min-h-screen">
    <UContainer>
      <div class="max-w-7xl mx-auto py-12">
        <!-- Header -->
        <div class="mb-16 text-center">
          <ULink
            to="/"
            class="text-sm text-gray-600 hover:text-indigo-600 inline-flex items-center gap-1 mb-6"
          >
            <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
            Back to home
          </ULink>
          
          <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Simple, 
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
              Transparent
            </span> 
            Pricing
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for your club. All plans include real-time updates and unlimited displays.
          </p>
        </div>

        <!-- Pricing Cards -->
        <div class="grid md:grid-cols-3 gap-8 mb-24">
          <UCard
            v-for="plan in plans"
            :key="plan.name"
            :ui="{
              base: 'rounded-none relative',
              ring: plan.highlighted 
                ? 'ring-2 ring-indigo-500 shadow-2xl' 
                : 'ring-1 ring-gray-200',
              body: 'p-8'
            }"
            :class="plan.highlighted ? 'transform scale-105 bg-gradient-to-br from-white to-indigo-50/30' : 'bg-white'"
          >
            <!-- Popular Badge -->
            <div
              v-if="plan.highlighted"
              class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-4 py-1 text-sm font-bold rounded-none shadow-lg"
            >
              MOST POPULAR
            </div>

            <div class="text-center mb-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">
                {{ plan.name }}
              </h3>
              <p class="text-gray-600 text-sm mb-4">
                {{ plan.description }}
              </p>
              <div class="mb-2">
                <span class="text-5xl font-extrabold text-gray-900">
                  {{ plan.price }}
                </span>
              </div>
              <p class="text-gray-500 text-sm">
                {{ plan.period }}
              </p>
            </div>

            <UButton
              :label="plan.cta"
              :to="plan.ctaLink"
              :color="plan.highlighted ? 'primary' : 'neutral'"
              :variant="plan.highlighted ? 'solid' : 'outline'"
              size="lg"
              class="w-full rounded-none font-semibold mb-6 hover:shadow-lg"
              block
            />

            <ul class="space-y-3">
              <li
                v-for="feature in plan.features"
                :key="feature"
                class="flex items-start gap-3 text-gray-700"
              >
                <UIcon
                  name="i-lucide-check"
                  class="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5"
                />
                <span>{{ feature }}</span>
              </li>
            </ul>
          </UCard>
        </div>

        <!-- FAQ Section -->
        <div class="max-w-3xl mx-auto">
          <h2 class="text-4xl font-extrabold text-center mb-12">
            Frequently Asked 
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
              Questions
            </span>
          </h2>

          <UAccordion
            :items="faqs.map((faq, index) => ({
              label: faq.question,
              slot: `faq-${index}`,
              defaultOpen: index === 0
            }))"
            :ui="{
              wrapper: 'space-y-4',
              item: {
                base: 'border border-gray-200 rounded-none bg-white hover:shadow-lg transition-shadow',
                padding: 'p-6'
              }
            }"
          >
            <template v-for="(faq, index) in faqs" :key="index" #[`faq-${index}`]>
              <p class="text-gray-700 leading-relaxed">
                {{ faq.answer }}
              </p>
            </template>
          </UAccordion>
        </div>

        <!-- CTA Section -->
        <div class="mt-24 text-center">
          <UCard
            :ui="{
              base: 'rounded-none bg-gradient-to-br from-indigo-600 to-cyan-500',
              ring: 'ring-0',
              body: 'p-12'
            }"
          >
            <h2 class="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ready to get started?
            </h2>
            <p class="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join clubs already using NowNext to streamline their event management.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <UButton
                label="Start Free Trial"
                to="/signup"
                color="white"
                variant="solid"
                size="xl"
                class="rounded-none font-bold shadow-xl"
              />
              <UButton
                label="Contact Sales"
                to="/contact"
                color="white"
                variant="outline"
                size="xl"
                class="rounded-none font-bold"
              />
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>
