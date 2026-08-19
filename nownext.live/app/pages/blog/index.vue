<script setup lang="ts">
const { data: list } = await useAsyncData('blog', () => queryCollection('blog').all())

useSeoMeta({
  title: 'Blog - Features, Guides & Event Scheduling Insights | NowNext.live',
  description: 'Discover event management tips, guides, and updates on running free real-time digital schedule & now/next display boards at any event.',
  ogTitle: 'NowNext.live Blog - Real-Time Digital Schedule Guides & News',
  ogDescription: 'Guides and insights on eliminating paper schedule chaos across all types of events, conferences, sports tournaments, and broadcast studios.',
  ogImage: 'https://nownext.live/imgs/logo.png',
  ogUrl: 'https://nownext.live/blog',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'NowNext.live Blog',
  twitterDescription: 'Guides and insights on eliminating paper schedule chaos across all types of events, conferences, sports tournaments, and broadcast studios.'
})

useHead({
  link: [
    { rel: 'canonical', key: 'canonical', href: 'https://nownext.live/blog' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Blog',
            name: 'NowNext.live Blog',
            url: 'https://nownext.live/blog',
            blogPost: list.value?.map(article => ({
              '@type': 'BlogPosting',
              headline: article.title,
              description: article.description,
              datePublished: article.date,
              url: `https://nownext.live${article.path}`
            }))
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://nownext.live'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: 'https://nownext.live/blog'
              }
            ]
          }
        ]
      }))
    }
  ]
})
</script>

<template>
  <UPageHero  
    description="Get to know the latest features, insights into development and tips to use NowNext.live to the fullest."
  >
    <template #title>
      <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight">NowNext.live Blog</h1>
    </template>
  </UPageHero>
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
