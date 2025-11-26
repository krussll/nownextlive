<template>
  <div class="border rounded-none overflow-hidden bg-white border-slate-300">

    <!-- Header -->
    <div class="px-4 py-3 bg-white text-xs uppercase tracking-wider text-slate-500 font-semibold border-b">
      <h3 class="text-base">{{ title }}</h3>
    </div>

    <!-- NOW -->
    <div class="bg-slate-900 text-white px-4 py-6 flex gap-4">
      <div>
        <p class="py-1 text-xs uppercase tracking-widest font-semibold text-slate-300 mb-1">
          Now
        </p>
        <span>{{ nowTime}}</span>
      </div>
      <div class="flex-auto">
        <p class="text-xl font-semibold">{{ now }}</p>
        <p v-if="nowGroup" class="text-sm text-slate-300 mt-1">{{ nowGroup }}</p>
      </div>
    </div>

    <!-- NEXT -->
    <div class="px-4 py-4 bg-white flex gap-4">
      <div>
        <p class="py-1 text-xs uppercase tracking-widest font-semibold text-slate-400 mb-1">
          Next
        </p>
        <span>{{ nextTime }}</span>
      </div>
      <div class="flex-auto">
        <p class="text-slate-700 font-medium">{{ next }}</p>
        <p v-if="nextGroup" class="text-sm text-slate-300 mt-1">{{ nextGroup }}</p>
      </div>
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
