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
  <div class="text-center">
    <UCard
      :ui="{
        base: `rounded-none ${backgroundClasses}`,
        ring: 'ring-0',
        body: 'p-12'
      }"
    >
      <h2 :class="`text-3xl md:text-4xl font-extrabold mb-4 ${titleClasses}`">
        {{ title }}
      </h2>
      <p :class="`text-xl mb-8 max-w-2xl mx-auto ${descriptionClasses}`">
        {{ description }}
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <UButton
          :label="buttonLabel"
          :to="buttonTo"
          color="neutral"
          variant="solid"
          size="xl"
          trailing-icon="i-lucide-arrow-right"
          class="rounded-none font-bold shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white text-gray-900 hover:bg-gray-100"
        />
      </div>
    </UCard>
  </div>
</template>
