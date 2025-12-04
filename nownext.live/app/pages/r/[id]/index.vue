<template>
  <UContainer class="py-10">
    <div
      v-if="showloading"
      class="flex justify-center items-center h-screen fixed top-0 left-0 right-0 bottom-0 w-full z-50 overflow-hidden bg-gray-100"
    >
      <p class="text-slate-700">Loading...</p>
    </div>

    <!-- Error State -->
    <div
      v-if="error && error.statusCode === 404"
      class="flex flex-col items-center justify-center min-h-[50vh] text-center"
    >
      <UIcon
        name="i-heroicons-exclamation-circle"
        class="w-16 h-16 text-red-500 mb-4"
      />
      <h2 class="text-2xl font-bold text-slate-900 mb-2">
        Event can not be found
      </h2>
      <p class="text-slate-500">
        The event you are looking for does not exist or has been removed.
      </p>
    </div>

    <div v-else>
    <!-- Header -->
    <div class="flex items-center justify-between mb-10">
      <div>
        <img src="/imgs/now-next-live-logo.svg" style="height: 55px" />
      </div>
      <div class="text-center">
        <p
          class="uppercase tracking-widest text-slate-400 text-xs font-semibold"
        >
          Live Schedule
        </p>
        <h1 class="text-4xl font-semibold text-slate-900">
          {{ roomName }}
        </h1>
      </div>

      <!-- Clock -->
      <div
        class="px-4 py-2 bg-white shadow rounded-md text-slate-700 font-mono text-lg"
      >
        {{ time }}
      </div>
    </div>

    <!-- Grid -->
    <div
      :class="[
        'grid gap-6',
        spaces.length < 3 
          ? 'grid-cols-1 sm:grid-cols-2 justify-items-center' 
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      ]"
    >
      <ScheduleCard
        v-for="space in spaces"
        :key="space.id"
        :title="space.title"
        :now="space.now"
        :nowGroup="space.group"
        :next="space.next"
        :class="spaces.length < 3 ? 'w-full max-w-md' : 'w-full'"
      />
    </div>
    </div>
  </UContainer>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import ScheduleCard from '~/components/ScheduleCard.vue'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://xsijzyhfivzknrpxmtfk.supabase.co'
const SUPABASE_KEY = 'sb_publishable_f7LEykuQEqIaa30-x718nQ_jVoJ-txz'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

definePageMeta({
  layout: 'app'
})

const showloading = ref(true)
const clockReady = ref(false)
const searchQuery = ref(0)

const route = useRoute()
const { data, status, error, refresh } = await useFetch(
  `/api/events/${route.params.id}`,
  {
  query: { q: searchQuery },
    lazy: true
  }
)

const myChannel = supabase.channel(`events/${route.params.id}`)
// Simple function to log any messages we receive
async function messageReceived(payload) {
  searchQuery.value++
}
// Subscribe to the Channel
myChannel
  .on(
    'broadcast',
    { event: 'update' }, // Listen for "shout". Can be "*" to listen to all events
    (payload) => messageReceived(payload)
  )
  .subscribe()

const checkLoading = () => {
  if ((data.value || error.value) && clockReady.value) {
    showloading.value = false
  }
}

watch([data, error, clockReady], () => {
  checkLoading()
})

const spaces = computed(() => {
  if (!data.value?.spaces) return []
  return data.value.spaces.map((space) => {
    const nowSession = space.sessions.find((s) => s.id === space.now)
    let nextSession = null

    if (nowSession) {
      const nowIndex = space.sessions.findIndex((s) => s.id === space.now)
      if (nowIndex !== -1 && nowIndex < space.sessions.length - 1) {
        nextSession = space.sessions[nowIndex + 1]
      }
    } else if (space.sessions.length > 0) {
      nextSession = space.sessions[0]
    }

    return {
      id: space.title, // Using title as ID for now since API doesn't have space IDs
      title: space.title,
      now: nowSession ? nowSession.title : '',
      group: nowSession ? nowSession.subtitle : '',
      next: nextSession ? nextSession.title : ''
    }
  })
})

/* Simple live clock */
const time = ref('00:00')
const roomName = computed(() => data.value?.title || 'North District Sports')

// Set page title with event title prefix
useHead(() => ({
  title: `${data.value?.title || 'North District Sports'} - Live Schedule`
}))
onMounted(() => {
  setInterval(() => {
    const d = new Date()
    time.value = d.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
    if (!clockReady.value) {
      clockReady.value = true
    }
  }, 1000)
})
</script>

<style>
.remove-padding > div {
  padding-left: 0px;
  padding-right: 0px;
  max-width: 85rem;
}
</style>
