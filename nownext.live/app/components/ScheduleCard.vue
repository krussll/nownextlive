<template>
  <UCard class="rounded-xl shadow-sm overflow-hidden">

    <!-- Header -->
    <div class="px-4 py-3 bg-white text-xs uppercase tracking-wider text-slate-500 font-semibold border-b">
      <h3>{{ title }}</h3>
    </div>

    <!-- NOW -->
    <div class="bg-slate-900 text-white px-4 py-6">
      <p class="text-xs uppercase tracking-widest font-semibold text-slate-300 mb-1">
        Now
      </p>
      <p class="text-xl font-semibold">{{ now }}</p>
      <p v-if="group" class="text-sm text-slate-300 mt-1">{{ group }}</p>
    </div>

    <!-- NEXT -->
    <div class="px-4 py-4 bg-white">
      <p class="text-xs uppercase tracking-widest font-semibold text-slate-400 mb-1">
        Next
      </p>
      <p class="text-slate-700 font-medium">{{ next }}</p>
    </div>
  </UCard>
</template>

<script setup>
defineProps({
  title: String,
  now: String,
  group: String,
  next: String
})
</script>
