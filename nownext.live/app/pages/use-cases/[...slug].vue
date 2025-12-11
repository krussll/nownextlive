<script setup lang="ts">
const route = useRoute()
const { data: doc } = await useAsyncData(route.path, () => queryCollection('blog').path(route.path).first())
</script>

<template>
  <UContainer class="py-12">
    <article v-if="doc" class="prose dark:prose-invert max-w-none">
      <h1>{{ doc.title }}</h1>
      <ContentRenderer :value="doc" />
    </article>
    <div v-else>
      Post not found
    </div>
  </UContainer>
</template>
