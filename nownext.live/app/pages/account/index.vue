<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { data: events, pending, error } = await useFetch('/api/events')
</script>

<template>
  <UContainer class="py-12">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Account</h1>
      <UButton to="/r/generate" color="primary" variant="solid" icon="i-heroicons-plus">
        Generate New Event
      </UButton>
    </div>
    
    <div v-if="pending" class="text-gray-500">Loading events...</div>
    <div v-else-if="error" class="text-red-500">Error loading events</div>
    <div v-else>
      <ul class="space-y-4">
        <li v-for="event in events" :key="event.id" class="p-4 border rounded-lg shadow-sm flex justify-between items-center bg-white dark:bg-gray-800">
          <div>
            <h2 class="text-xl font-semibold">{{ event.title }}</h2>
            <p class="text-sm text-gray-500">ID: {{ event.id }}</p>
          </div>
          <UButton :to="`/r/${event.id}/controller`" color="primary" variant="solid">
            Manage Event
          </UButton>
        </li>
      </ul>
      <div v-if="events?.length === 0" class="text-gray-500">
        No events found.
      </div>
    </div>
  </UContainer>
</template>
