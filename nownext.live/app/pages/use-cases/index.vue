<script setup lang="ts">
const { data: list } = await useAsyncData('usecases', () => queryCollection('usecases').all())

useSeoMeta({
  title: 'Real-Time Schedule Display Use Cases | NowNext.live',
  description: 'Explore how sports clubs, tournaments, multi-track conferences, broadcast studios, and corporate events use NowNext.live for live-updating schedule signage.',
  ogTitle: 'NowNext.live Use Cases - Multi-Screen Real-Time Event Display Solutions',
  ogDescription: 'Eliminate paper schedule chaos across sports courts, conference stages, stream rundowns, and corporate breakout rooms.',
  ogImage: 'https://nownext.live/imgs/logo.png',
  ogUrl: 'https://nownext.live/use-cases',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'NowNext.live Use Cases',
  twitterDescription: 'Eliminate paper schedule chaos across sports courts, conference stages, stream rundowns, and corporate breakout rooms.'
})

useHead({
  link: [
    { rel: 'canonical', key: 'canonical', href: 'https://nownext.live/use-cases' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            name: 'NowNext.live Use Cases',
            url: 'https://nownext.live/use-cases',
            description: 'Real-time schedule display solutions for sports tournaments, conferences, streams, and corporate meetings.'
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
                name: 'Use Cases',
                item: 'https://nownext.live/use-cases'
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
  <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased min-h-screen py-12 md:py-16">
    <UContainer class="max-w-6xl mx-auto px-4 md:px-8 space-y-12">
      <!-- Title Block -->
      <div class="text-center space-y-4 max-w-3xl mx-auto">
        <span class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          VERSATILE REAL-TIME SIGNAGE
        </span>
        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          NowNext.live Use Cases
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Discover how sports clubs, tournaments, multi-track conferences, broadcasts, and workshops use NowNext.live to eliminate paper schedule chaos.
        </p>
      </div>

      <!-- Use Cases Grid (Stagetimer 2-column style) -->
      <div v-if="list?.length" class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto pt-4">
        <NuxtLink
          v-for="article in list"
          :key="article.path"
          :to="article.path"
          class="group p-6 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all flex flex-col justify-between"
        >
          <div class="space-y-3">
            <div v-if="article.tags?.length" class="flex flex-wrap gap-1.5">
              <span
                v-for="tag in article.tags"
                :key="tag"
                class="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80"
              >
                {{ tag }}
              </span>
            </div>

            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {{ article.title }}
            </h2>

            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ article.description }}
            </p>
          </div>

          <div class="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div class="flex items-center gap-2">
              <UAvatar v-if="article.author" :alt="article.author" size="2xs" />
              <span>{{ article.author || 'NowNext.live' }}</span>
            </div>
            <span class="font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
              Read guide &rarr;
            </span>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="text-center py-12 text-gray-500">
        No use cases found.
      </div>
    </UContainer>
  </div>
</template>
