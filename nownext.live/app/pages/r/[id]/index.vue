<template>
  <UContainer class="py-10">
    <div
      v-if="showloading"
      class="flex justify-center items-center h-screen fixed top-0 left-0 right-0 bottom-0 w-full z-50 overflow-hidden bg-gray-100"
    >
      <p class="text-slate-700">Loading...</p>
    </div>

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
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center"
    >
      <ScheduleCard
        v-for="space in spaces"
        :key="space.id"
        :title="space.title"
        :now="space.now"
        :nowGroup="space.group"
        :next="space.next"
        class="w-full"
      />
    </div>
  </UContainer>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import ScheduleCard from '~/components/ScheduleCard.vue'

definePageMeta({
  layout: 'app'
})

const showloading = ref(true)
const clockReady = ref(false)

const route = useRoute()
const { data, status, error, refresh } = await useFetch(
  `/api/events/${route.params.id}`,
  {
    lazy: true
  }
)

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
    const nowIndex = space.sessions.findIndex((s) => s.id === space.now)
    const nextSession =
      nowIndex !== -1 && nowIndex < space.sessions.length - 1
        ? space.sessions[nowIndex + 1]
        : null

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
