<template>
  <UContainer class="py-10">

    <!-- Header -->
    <div class="flex items-center justify-between mb-10">
    <div>
      <img src="/imgs/now-next-live-logo.svg"  style="height: 55px;" />
    </div>
      <div class="text-center">
        <p class="uppercase tracking-widest text-slate-400 text-xs font-semibold">
          Live Schedule
        </p>
        <h1 class="text-4xl font-semibold text-slate-900">
          {{ roomName }}
        </h1>
      </div>

      <!-- Clock -->
      <div class="px-4 py-2 bg-white shadow rounded-md text-slate-700 font-mono text-lg">
        {{ time }}
      </div>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
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
  import { ref, onMounted } from 'vue'
  import ScheduleCard from '~/components/ScheduleCard.vue'

  definePageMeta({
    layout: 'app'
  })

const spaces = [
  { id: 1, title: "Space 1", now: "Test 3", group: null, next: "Test 4" },
  { id: 2, title: "Space 2", now: "Test 4", group: "Group D", next: null },
  { id: 3, title: "Space 3", now: "Test 6", group: "Group F", next: null },
  { id: 4, title: "Space 4", now: "Test 8", group: "Group H", next: null },
  { id: 5, title: "Space 5", now: "Test 9", group: "Group I", next: "Test 10" },
  { id: 6, title: "Space 6", now: "Test 11", group: "Group K", next: "Test 12" },
]

/* Simple live clock */
const time = ref('00:00')
const roomName = ref('North District Sports')
onMounted(() => {
  setInterval(() => {
    const d = new Date()
    time.value = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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