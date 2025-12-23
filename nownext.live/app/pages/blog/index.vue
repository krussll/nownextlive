<script setup lang="ts">
const { data: list, error } = await useAsyncData('blog', () => queryCollection('blog').all())
console.log('Blog list:', list.value)
console.log('Blog error:', error)

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Now. Next. Live. Blog',
        url: 'https://nownext.live/blog',
        blogPost: list.value?.map(article => ({
          '@type': 'BlogPosting',
          headline: article.title,
          description: article.description,
          datePublished: article.date,
          url: `https://nownext.live${article.path}`
        }))
      }))
    }
  ]
})
</script>

<template>
  <UPageHero  
  title="Blog"
  description="Get to know the latest features, insights into development and tips to use NowNext.live to the fullest."
  />
  <UContainer class="py-12">
    <div v-if="list?.length" class="grid gap-10 md:grid-cols-2 divide-neutral-100 my-4">
      <UCard v-for="article in list" :key="article.path" :to="article.path">
        <template #header>
          <h2 class="text-xl font-semibold">
            <NuxtLink :to="article.path">{{ article.title }}</NuxtLink>
          </h2>
        </template>
        <p class="text-gray-600 dark:text-gray-300">{{ article.description }}</p>
        <template #footer>
          <span class="text-sm text-gray-500">{{ article.date }}</span>
        </template>
      </UCard>
    </div>
    <div v-else class="text-gray-500">
      No blog posts found.
    </div>
  </UContainer>
</template>
