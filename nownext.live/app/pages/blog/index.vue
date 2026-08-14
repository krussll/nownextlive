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
  <UContainer class="pt-2 pb-12">
    <div v-if="list?.length" class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mt-0 mb-4">
      <NuxtLink v-for="article in list" :key="article.path" :to="article.path" class="rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition block">
        <article class="text-lg px-6 py-5 flex flex-col justify-between h-full">
          <div>
            <h2 class="font-semibold mb-2 text-gray-900 dark:text-white text-xl">{{ article.title }}</h2>
            <p class="font-light text-gray-500 dark:text-gray-400 mb-4 text-base">{{ article.description }}</p>
          </div>
          <footer class="flex items-center text-sm pt-2">
            <div class="mr-4" v-if="article.author">
              <UAvatar :alt="article.author" size="md" />
            </div>
            <div>
              <p class="text-gray-900 dark:text-white font-medium" v-if="article.author">{{ article.author }}</p>
              <p class="text-gray-500 dark:text-gray-400">{{ new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}</p>
            </div>
          </footer>
        </article>
      </NuxtLink>
    </div>
    <div v-else class="text-gray-500">
      No blog posts found.
    </div>
  </UContainer>
</template>
