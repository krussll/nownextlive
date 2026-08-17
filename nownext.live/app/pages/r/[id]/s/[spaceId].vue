<template>
  <UContainer class="py-10">
    <div
      v-if="showloading"
      class="flex justify-center items-center h-screen fixed top-0 left-0 right-0 bottom-0 w-full z-50 overflow-hidden bg-gray-100"
    >
      <p class="text-slate-700">Loading space display...</p>
    </div>

    <!-- Error State: Event Not Found -->
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

    <!-- Error State: Space Not Found -->
    <div
      v-else-if="!showloading && !targetSpace"
      class="flex flex-col items-center justify-center min-h-[50vh] text-center"
    >
      <UIcon
        name="i-heroicons-exclamation-triangle"
        class="w-16 h-16 text-amber-500 mb-4"
      />
      <h2 class="text-2xl font-bold text-slate-900 mb-2">
        Space not found
      </h2>
      <p class="text-slate-500 mb-6">
        The requested space could not be found in this event.
      </p>
      <UButton
        label="View All Spaces"
        color="primary"
        variant="solid"
        class="rounded-none cursor-pointer"
        :to="`/r/${route.params.id}`"
      />
    </div>

    <div v-else>
      <!-- Limit Exceeded Banner -->
      <div
        v-if="limitExceeded"
        class="bg-red-500 text-white px-4 py-2 text-center font-bold mb-4 rounded-md"
      >
        This display is not updating as too many displays are active for the given event
      </div>

      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <NuxtLink :to="`/r/${route.params.id}`" title="View all spaces">
            <img src="/imgs/now-next-live-logo.svg" alt="NowNext.live Logo" style="height: 55px" />
          </NuxtLink>
        </div>
        <div class="text-center">
          <p class="uppercase tracking-widest text-slate-400 text-xs font-semibold">
            {{ roomName }}
          </p>
          <h1 class="text-4xl font-semibold text-slate-900">
            {{ targetSpace?.title || 'Space Display' }}
          </h1>
        </div>

        <!-- Clock -->
        <div class="px-4 py-2 bg-white text-slate-700 font-mono text-lg border border-slate-200">
          {{ time }}
        </div>
      </div>

      <!-- Single Space Display Hero Card -->
      <div class="max-w-4xl mx-auto">
        <div class="border rounded-none overflow-hidden bg-white border-slate-300 flex flex-col shadow-lg">
          <!-- Space Header Bar -->
          <div class="px-6 py-4 bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-rectangle-stack" class="w-5 h-5 text-indigo-600" />
              <h2 class="text-xl font-bold tracking-wide uppercase">{{ targetSpace?.title }}</h2>
            </div>
            <span class="text-xs uppercase tracking-widest px-2.5 py-1 bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
              Live Output
            </span>
          </div>

          <!-- Content: NOW & NEXT -->
          <template v-if="spaceDisplay.now || spaceDisplay.next">
            <!-- NOW Section -->
            <div
              v-if="spaceDisplay.now"
              class="bg-slate-900 text-white px-8 py-10 flex flex-col md:flex-row gap-6 md:items-center justify-between relative overflow-hidden"
            >
              <div>
                <span class="inline-block px-3 py-1 text-xs uppercase tracking-widest font-bold bg-emerald-500 text-slate-950 mb-3">
                  NOW
                </span>
                <p v-if="spaceDisplay.nowTime" class="font-mono text-slate-300 text-sm mb-1">
                  {{ spaceDisplay.nowTime }}
                </p>
                <h3 class="text-3xl md:text-4xl font-bold leading-tight">
                  {{ spaceDisplay.now }}
                </h3>
                <p v-if="spaceDisplay.group" class="text-lg text-slate-300 mt-2 font-medium">
                  {{ spaceDisplay.group }}
                </p>
              </div>

              <!-- Duration Progress Bar -->
              <div
                v-if="nowDurationSeconds > 0"
                class="absolute bottom-0 left-0 right-0 h-2 bg-slate-800 overflow-hidden"
              >
                <div
                  class="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)] progress-bar-fill"
                  :style="{ animationDuration: `${nowDurationSeconds}s` }"
                  :key="`space-progress-${spaceDisplay.now}-${spaceDisplay.nowDuration}`"
                />
              </div>
            </div>

            <!-- NEXT Section -->
            <div
              v-if="spaceDisplay.next"
              class="px-8 py-8 bg-slate-50 flex flex-col md:flex-row gap-6 md:items-center justify-between border-t border-slate-200"
            >
              <div>
                <span class="inline-block px-3 py-1 text-xs uppercase tracking-widest font-bold bg-slate-300 text-slate-800 mb-2">
                  NEXT
                </span>
                <p v-if="spaceDisplay.nextTime" class="font-mono text-slate-500 text-sm mb-1">
                  {{ spaceDisplay.nextTime }}
                </p>
                <h4 class="text-2xl md:text-3xl font-semibold text-slate-800 leading-tight">
                  {{ spaceDisplay.next }}
                </h4>
                <p v-if="spaceDisplay.nextGroup" class="text-base text-slate-600 mt-1">
                  {{ spaceDisplay.nextGroup }}
                </p>
              </div>
            </div>
          </template>

          <!-- Empty State -->
          <div v-else class="py-20 flex flex-col items-center justify-center text-slate-400 text-center p-6 bg-white">
            <UIcon name="i-heroicons-calendar" class="w-12 h-12 mb-3 text-slate-300" />
            <p class="text-lg font-medium text-slate-500">No sessions scheduled for this space</p>
          </div>
        </div>
      </div>
    </div>
  </UContainer>

  <!-- Sticky Footer -->
  <EventFooter
    :subscriptionData="subscriptionData"
    :showSubscription="showSubscription"
    :myUserId="myUserId"
    :connectionStatus="connectionStatus"
  />
</template>

<script setup>
import { ref, onMounted, watch, computed, onUnmounted } from 'vue'
import EventFooter from '~/components/EventFooter.vue'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://xsijzyhfivzknrpxmtfk.supabase.co'
const SUPABASE_KEY = 'sb_publishable_f7LEykuQEqIaa30-x718nQ_jVoJ-txz'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

definePageMeta({
  layout: 'app'
})

useSeoMeta({
  title: 'Space Live Display | NowNext.live',
  robots: 'noindex, nofollow'
})

const showloading = ref(true)
const clockReady = ref(false)
const searchQuery = ref(0)
const showSubscription = ref(true)
const connectionStatus = ref('Connecting')
const activeConnections = ref(0)
const limitExceeded = ref(false)

const route = useRoute()
const { data, status, error, refresh } = await useFetch(
  `/api/events/${route.params.id}/display`,
  {
    query: { q: searchQuery },
    lazy: true
  }
)

const { data: subscriptionData } = await useFetch(
  `/api/events/${route.params.id}/subscription`
)

const myChannel = supabase.channel(`events/${route.params.id}`)

async function messageReceived(payload) {
  if (limitExceeded.value) return
  searchQuery.value++
}

const checkLoading = () => {
  if ((data.value || error.value) && clockReady.value) {
    showloading.value = false
  }
}

watch([data, error, clockReady], () => {
  checkLoading()
})

const roomName = computed(() => data.value?.title || 'Event')

const targetSpace = computed(() => {
  if (!data.value?.spaces) return null
  const param = String(route.params.spaceId).toLowerCase()
  return data.value.spaces.find(
    (s) =>
      String(s.id).toLowerCase() === param ||
      String(s.title).toLowerCase() === param ||
      encodeURIComponent(String(s.title)).toLowerCase() === param
  ) || null
})

const spaceDisplay = computed(() => {
  if (!targetSpace.value) return { now: '', group: '', nowTime: '', next: '', nextGroup: '', nextTime: '' }
  const space = targetSpace.value
  const nowSession = space.sessions?.find((s) => s.id === space.now)
  let nextSession = null

  if (nowSession) {
    const nowIndex = space.sessions.findIndex((s) => s.id === space.now)
    if (nowIndex !== -1 && nowIndex < space.sessions.length - 1) {
      nextSession = space.sessions[nowIndex + 1]
    }
  } else if (space.sessions && space.sessions.length > 0) {
    nextSession = space.sessions[0]
  }

  return {
    now: nowSession ? nowSession.title : '',
    group: nowSession ? nowSession.subtitle : '',
    nowTime: nowSession ? (nowSession.time) : '',
    nowDuration: nowSession ? nowSession.duration : null,
    next: nextSession ? nextSession.title : '',
    nextGroup: nextSession ? nextSession.subtitle : '',
    nextTime: nextSession ? (nextSession.time) : ''
  }
})

const nowDurationSeconds = computed(() => {
  const durationStr = spaceDisplay.value.nowDuration
  if (!durationStr || typeof durationStr !== 'string') return 0
  const parts = durationStr.trim().split(':')
  if (parts.length === 3) {
    const h = parseInt(parts[0], 10) || 0
    const m = parseInt(parts[1], 10) || 0
    const s = parseInt(parts[2], 10) || 0
    return h * 3600 + m * 60 + s
  } else if (parts.length === 2) {
    const m = parseInt(parts[0], 10) || 0
    const s = parseInt(parts[1], 10) || 0
    return m * 60 + s
  } else if (parts.length === 1) {
    const val = parseInt(parts[0], 10) || 0
    return val * 60
  }
  return 0
})

useHead(() => ({
  title: `${targetSpace.value?.title || 'Space'} - ${roomName.value} - Live Display`
}))

const time = ref('00:00')
const myUserId = generateId()
let heartbeatInterval

onMounted(() => {
  myChannel
    .on('broadcast', { event: 'update' }, (payload) => messageReceived(payload))
    .on('presence', { event: 'sync' }, () => {
      const state = myChannel.presenceState()
      const now = Date.now()
      const STALE_MS = 2 * 60 * 1000

      const users = Object.keys(state)
        .flatMap((key) => state[key])
        .filter((user) => {
          const isDisplay = user.user_type === 'viewer'
          const isActive = (now - new Date(user.online_at).getTime()) < STALE_MS
          return isDisplay && isActive
        })

      activeConnections.value = users.length

      if (subscriptionData.value?.restrictions?.concurrent_displays) {
        limitExceeded.value = activeConnections.value > subscriptionData.value.restrictions.concurrent_displays
      }
    })
    .subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        connectionStatus.value = 'Connected'
        if (route.query.nopresence === 'true') return

        const trackPresence = async () => {
          await myChannel.track({
            user_id: myUserId,
            user_type: 'viewer',
            online_at: new Date().toISOString()
          })
        }

        await trackPresence()
        heartbeatInterval = setInterval(trackPresence, 30000)
      } else if (status === 'TIMED_OUT' || status === 'CLOSED') {
        connectionStatus.value = 'Disconnected'
      } else if (status === 'CHANNEL_ERROR') {
        connectionStatus.value = 'Error'
      }
    })

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

onUnmounted(() => {
  if (heartbeatInterval) clearInterval(heartbeatInterval)
  myChannel.untrack()
})
</script>

<style scoped>
@keyframes progressLinear {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

.progress-bar-fill {
  width: 0%;
  animation-name: progressLinear;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
</style>
