<template>
  <div class="flex items-center justify-center h-screen w-screen bg-white">
    <p class="text-slate-700 text-lg font-medium animate-pulse">
      Loading…
    </p>
  </div>
</template>

 <script setup>
  definePageMeta({
    layout: 'app'
  })

  await setTimeout(() => {window.location.replace("/r/NDST3/");}, 2000);
</script>
