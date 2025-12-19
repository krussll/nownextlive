<template>
  <UMain class="bg-gray-100 remove-padding">
    <NuxtPage />
  </UMain>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-gray-100'
  }
})
</script>
