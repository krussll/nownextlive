<script setup lang="ts">
interface Props {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: 'text-xl font-bold text-gray-900'
})
</script>

<template>
  <span :class="props.class">
    NowNext<span class="text-indigo-600">Live</span>
  </span>
</template>
