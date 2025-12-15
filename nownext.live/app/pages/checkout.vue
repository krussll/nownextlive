<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Loading Overlay -->
    <div
      v-if="loading"
      class="flex justify-center items-center h-screen fixed top-0 left-0 right-0 bottom-0 w-full z-50 overflow-hidden bg-gray-100"
    >
      <p class="text-slate-700">Loading...</p>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex flex-col items-center justify-center min-h-screen text-center px-4"
    >
      <UIcon
        name="i-heroicons-exclamation-circle"
        class="w-16 h-16 text-red-500 mb-4"
      />
      <h2 class="text-2xl font-bold text-slate-900 mb-2">
        Invalid Checkout Link
      </h2>
      <p class="text-slate-500 mb-6">
        {{ error }}
      </p>
      <UButton to="/" color="primary" variant="solid">
        Go Home
      </UButton>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  const productId = route.query.id

  if (!productId) {
    loading.value = false
    error.value = 'No product ID specified. Please try again or contact support.'
    return
  }

  // Redirect to Lemon Squeezy
  await navigateTo(`https://now-next-live.lemonsqueezy.com/buy/${productId}`, {
    external: true
  })
})
</script>
