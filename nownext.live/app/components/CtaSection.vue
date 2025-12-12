<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  buttonLabel?: string
  buttonTo?: string
  variant?: 'gradient' | 'dark' | 'light'
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Ready to get started?',
  description: 'Join clubs already using NowNext to streamline their event management.',
  buttonLabel: 'Try NowNextLive for free now',
  buttonTo: '/r/generate',
  variant: 'gradient'
})

const backgroundClasses = computed(() => {
  switch (props.variant) {
    case 'dark':
      return 'bg-gray-900'
    case 'light':
      return 'bg-gray-50'
    case 'gradient':
    default:
      return 'bg-gradient-to-br from-indigo-600 to-cyan-500'
  }
})

const titleClasses = computed(() => {
  return props.variant === 'light' 
    ? 'text-gray-900' 
    : 'text-white'
})

const descriptionClasses = computed(() => {
  switch (props.variant) {
    case 'light':
      return 'text-gray-600'
    case 'dark':
      return 'text-gray-300'
    case 'gradient':
    default:
      return 'text-indigo-100'
  }
})
</script>

<template>
  <section class="py-24 text-center space-y-8 bg-white">
      <UContainer>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900">Ready to Run a Cleaner Event?</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Try NowNext.live and replace confusion with clarity.
        </p>

        <div class="mt-8">
          <UButton
            to="/r/generate"
            label="Get Started"
            trailing-icon="i-lucide-arrow-right"
            color="primary"
            variant="solid"
            size="xl"
            class="rounded-none font-bold shadow-xl shadow-primary-200/50"
          />
        </div>
      </UContainer>
    </section>
</template>
