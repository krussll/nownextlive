<script setup lang="ts">
useSeoMeta({
  title: 'Pricing - NowNext',
  description: 'Simple, transparent pricing for NowNext event management platform'
})

const billingType = ref<'subscription' | 'oneoff'>('subscription')

const subscriptionPlans = [
  {
    title: 'Free',
    price: '£0',
    billingCycle: 'forever',
    description: 'Use all basic features for free',
    features: [
      'No credit card or signup required',
      'Real-time updates',
      '2 Browser-based displays'
    ],
    button: {
      label: 'Create an Event Now',
      to: '/r/generate'
    },
    highlight: false
  },
  {
    title: 'Club',
    price: '£9',
    scale: true,
    description:"For clubs running regular events",
    billingCycle: 'per month',
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
    button: {
      label: 'Get Club access now',
      to: '/auth/signup'
    },
    highlight: true,
    badge: 'MOST POPULAR'
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    billingCycle: 'contact us',
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
    button: {
      label: 'Contact Sales',
      to: '/contact'
    },
    highlight: false
  }
]

const oneoffPlans = [
  {
    title: 'Free',
    price: '£0',
    billingCycle: 'forever',
    description: 'Use all basic features for free',
    features: [
      'No credit card or signup required',
      'Real-time updates',
      '2 Browser-based displays'
    ],
    button: {
      label: 'Create an Event Now',
      to: '/r/generate'
    },
    highlight: false
  },
  {
    title: 'Club',
    price: '£25',
    billingCycle: 'one-time payment',
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
    button: {
      label: 'Buy Now',
      to: '/signup'
    },
    highlight: true,
    badge: 'MOST POPULAR',
    scale: true,
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    billingCycle: 'contact us',
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
    button: {
      label: 'Contact Sales',
      to: '/contact'
    },
    highlight: false
  }
]

const plans = computed(() => {
  return billingType.value === 'subscription' ? subscriptionPlans : oneoffPlans
})

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
          <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Pricing
          </h1>
        </div>

        <!-- Billing Type Toggle -->
        <div class="flex justify-center mb-12">
          <div class="bg-white p-1 sm:p-2 rounded-full shadow-md inline-flex gap-1 sm:gap-2">
            <button
              @click="billingType = 'subscription'"
              :class="[
                'px-4 py-2 sm:px-8 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 cursor-pointer',
                billingType === 'subscription'
                  ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg'
                  : 'bg-transparent text-gray-700 hover:bg-gray-50'
              ]"
            >
              <span class="block sm:inline">Monthly</span>
              <span class="hidden sm:inline"> Subscription</span>
              <span class="block sm:inline sm:ml-2 text-xs sm:text-sm opacity-90">~15% off</span>
            </button>
            <button
              @click="billingType = 'oneoff'"
              :class="[
                'px-4 py-2 sm:px-8 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 cursor-pointer',
                billingType === 'oneoff'
                  ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg'
                  : 'bg-transparent text-gray-700 hover:bg-gray-50'
              ]"
            >
              <span class="block sm:inline">Single Event</span>
              <span class="block sm:inline sm:ml-2 text-xs opacity-90">One-off 30 day access</span>
            </button>
          </div>
        </div>

        <!-- Pricing Cards -->
        <UPricingPlans :plans="plans" scale class="mb-24" />

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
        <div class="mt-24">
          <CtaSection />
        </div>
      </div>
    </UContainer>
  </div>
</template>
