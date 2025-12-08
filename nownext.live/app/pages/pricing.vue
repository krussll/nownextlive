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
    description: 'Perfect for trying out NowNextLive',
    features: [
      'Up to 3 active events',
      'Unlimited spaces per event',
      'Unlimited sessions',
      'Real-time updates',
      'Browser-based displays',
      'Community support'
    ],
    button: {
      label: 'Get Started',
      to: '/signup'
    },
    highlight: false
  },
  {
    title: 'Club',
    price: '£9',
    billingCycle: 'per month',
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
      label: 'Start Free Trial',
      to: '/signup'
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
    description: 'Perfect for trying out NowNextLive',
    features: [
      'Up to 3 active events',
      'Unlimited spaces per event',
      'Unlimited sessions',
      'Real-time updates',
      'Browser-based displays',
      'Community support'
    ],
    button: {
      label: 'Get Started',
      to: '/signup'
    },
    highlight: false
  },
  {
    title: 'Club',
    price: '£99',
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

        <!-- Billing Type Toggle -->
        <div class="flex justify-center mb-12">
          <UButtonGroup size="lg" orientation="horizontal">
            <UButton
              :variant="billingType === 'subscription' ? 'solid' : 'outline'"
              :color="billingType === 'subscription' ? 'primary' : 'neutral'"
              @click="billingType = 'subscription'"
              class="px-8"
            >
              Subscription
            </UButton>
            <UButton
              :variant="billingType === 'oneoff' ? 'solid' : 'outline'"
              :color="billingType === 'oneoff' ? 'primary' : 'neutral'"
              @click="billingType = 'oneoff'"
              class="px-8"
            >
              One-Off Payment
            </UButton>
          </UButtonGroup>
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
                color="neutral"
                variant="solid"
                size="xl"
                class="rounded-none font-bold shadow-xl"
              />
              <UButton
                label="Contact Sales"
                to="/contact"
                color="neutral"
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
