<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const handleError = () => clearError({ redirect: '/' })

const errorTitle = computed(() => {
  if (props.error.statusCode === 404) return 'Hmm, I can\'t find that page'
  if (props.error.statusCode === 403) return 'Hmm, I can\'t find that page'
  return 'Uh oh, looks like something went wrong'
})

const errorDescription = computed(() => {
  if (props.error.statusCode === 404) return "Sorry, we couldn't find the page you're looking for."
  if (props.error.statusCode === 403) return "You don't have permission to access this page."
  return 'Something went wrong. Please try again later.'
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8 text-center">
      <div class="flex justify-center">
        <SiteLogo class="text-3xl" />
      </div>
      
      <div class="space-y-4">
        <h1 class="text-9xl font-black text-gray-200">
          {{ error.statusCode }}
        </h1>
        
        <h2 class="text-3xl font-bold tracking-tight text-gray-900">
          {{ errorTitle }}
        </h2>
        
        <p class="text-lg text-gray-600">
          {{ errorDescription }}
        </p>
      </div>

      <div class="mt-8">
        <UButton
          size="xl"
          color="primary"
          variant="solid"
          @click="handleError"
        >
          Go back home
        </UButton>
      </div>
    </div>
  </div>
</template>
