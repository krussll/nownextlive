<template>
  <div class="flex items-center justify-center h-screen w-screen bg-white">
    <p class="text-slate-700 text-lg font-medium animate-pulse">Generating your event...</p>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'app'
})

const router = useRouter()

onMounted(async () => {
  try {
    const newEventId = await $fetch('/api/generate', {
      method: 'POST'
    })
    
    if (newEventId) {
      router.push(`/r/${newEventId}/controller`)
    }
  } catch (error) {
    console.error('Failed to generate event:', error)
    alert('Failed to generate event. Please try again.')
  }
})
</script>
