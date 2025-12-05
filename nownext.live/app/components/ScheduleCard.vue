<template>
  <div
    class="border rounded-none overflow-hidden bg-white border-slate-300 flex flex-col h-full"
  >
    <!-- Header -->
    <div
      class="px-4 py-3 bg-white text-xs uppercase tracking-wider text-slate-500 font-semibold border-b"
    >
      <h3 class="text-base truncate">{{ title }}</h3>
    </div>

    <!-- Content -->
    <template v-if="now || next">
      <!-- NOW -->
      <div
        v-if="now"
        class="bg-slate-900 text-white px-4 py-6 flex gap-4 flex-1"
      >
        <div>
          <p
            class="py-1 text-xs uppercase tracking-widest font-semibold text-slate-300 mb-1"
          >
            Now
          </p>
          <span v-if="nowTime" class="font-mono">{{ nowTime }}</span>
        </div>
        <div class="flex-auto">
          <p class="text-xl font-semibold leading-tight">{{ now }}</p>
          <p v-if="nowGroup" class="text-sm text-slate-300 mt-1">
            {{ nowGroup }}
          </p>
        </div>
      </div>

      <!-- NEXT -->
      <div
        v-if="next"
        class="px-4 py-4 bg-white flex gap-4 border-t border-slate-100 flex-1"
      >
        <div>
          <p
            class="py-1 text-xs uppercase tracking-widest font-semibold text-slate-400 mb-1"
          >
            Next
          </p>
          <span v-if="nextTime" class="font-mono text-slate-600">{{
            nextTime
          }}</span>
        </div>
        <div class="flex-auto">
          <p class="text-slate-700 font-medium leading-tight">{{ next }}</p>
          <p v-if="nextGroup" class="text-sm text-slate-500 mt-1">
            {{ nextGroup }}
          </p>
        </div>
      </div>
      <div v-else class="flex-1 bg-white border-t border-slate-100"></div>
    </template>
    
    <!-- Empty State -->
    <div v-else class="flex-grow flex items-center justify-center text-slate-400 text-sm p-4">
      No sessions scheduled
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  now: String,
  nowGroup: String,
  nowTime: String,
  next: String,
  nextGroup: String,
  nextTime: String
})
</script>
