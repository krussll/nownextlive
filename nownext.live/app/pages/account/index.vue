<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { data: events, pending, error } = await useFetch('/api/events')
const { data: userData } = await useFetch('/api/user/me')
</script>

<template>
  <UContainer class="py-12">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Sidebar -->
      <aside class="md:col-span-1">
        <div v-if="userData" class="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-none border border-gray-200 dark:border-gray-700">
          <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Subscription</div>
          <UBadge 
            :color="userData.subscription === 'free' ? 'neutral' : 'primary'" 
            variant="soft"
            class="capitalize rounded-none"
          >
            {{ userData.subscription }}
          </UBadge>
        </div>

        <nav class="space-y-2">
          <ULink
            to="/account"
            class="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-none bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400"
            active-class="bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400"
          >
            <UIcon name="i-heroicons-user-circle" class="w-5 h-5" />
            My Events
          </ULink>
          <ULink
            to="https://now-next-live.lemonsqueezy.com/billing"
            target="_blank"
            class="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-none text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
          >
            <UIcon name="i-heroicons-credit-card" class="w-5 h-5" />
            Manage Subscription
          </ULink>
        </nav>
      </aside>

      <!-- Main Content -->
      <div class="md:col-span-3">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold">Account</h1>
          <UButton to="/r/generate" color="primary" variant="solid" icon="i-heroicons-plus" class="rounded-none">
            Generate New Event
          </UButton>
        </div>
        
        <div v-if="pending" class="text-gray-500">Loading events...</div>
        <div v-else-if="error" class="text-red-500">Error loading events</div>
        <div v-else>
          <ul class="space-y-4">
            <li v-for="event in events" :key="event.id" class="p-4 border border-gray-200 rounded-none flex justify-between items-center bg-white dark:bg-gray-800">
              <div>
                <h2 class="text-xl font-semibold">{{ event.title }}</h2>
                <p class="text-sm text-gray-500">ID: {{ event.id }}</p>
              </div>
              <UButton :to="`/r/${event.id}/controller`" color="primary" variant="solid" class="rounded-none">
                Manage Event
              </UButton>
            </li>
          </ul>
          <div v-if="events?.length === 0" class="text-gray-500">
            No events found.
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
