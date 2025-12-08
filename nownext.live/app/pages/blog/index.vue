<script setup lang="ts">
const { data: list, error } = await useAsyncData('blog', () => queryCollection('blog').all())
console.log('Blog list:', list.value)
console.log('Blog error:', error)
</script>

<template>
  <UContainer class="py-12">
    <h1 class="text-3xl font-bold mb-8">Blog</h1>
    <div v-if="list?.length" class="grid gap-6">
      <UCard v-for="article in list" :key="article.path" :to="article.path">
        <template #header>
          <h2 class="text-xl font-semibold">
            <NuxtLink :to="article.path">{{ article.title }}</NuxtLink>
          </h2>
        </template>
        <p class="text-gray-600 dark:text-gray-300">{{ article.description }}</p>
        <template #footer>
          <span class="text-sm text-gray-500">{{ new Date(article.date).toLocaleDateString() }}</span>
        </template>
      </UCard>
    </div>
    <div v-else class="text-gray-500">
      No blog posts found.
    </div>
  </UContainer>
</template>
