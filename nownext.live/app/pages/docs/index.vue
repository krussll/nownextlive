<script setup lang="ts">
const { data: list } = await useAsyncData('docs', () => queryCollection('docs').all())

useSeoMeta({
  title: 'Documentation & User Guides | NowNext.live',
  description: 'Official documentation and step-by-step guides for setting up real-time multi-screen schedule displays with NowNext.live.',
  ogTitle: 'NowNext.live Documentation & Guides',
  ogDescription: 'Learn how to set up multi-court displays, real-time controllers, and customized signage.',
  ogImage: 'https://nownext.live/imgs/logo.png',
  ogUrl: 'https://nownext.live/docs',
  ogType: 'website',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [
    { rel: 'canonical', key: 'canonical', href: 'https://nownext.live/docs' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            name: 'NowNext.live Documentation',
            url: 'https://nownext.live/docs',
            description: 'Official user documentation for NowNext.live schedule display platform.'
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
                name: 'Docs',
                item: 'https://nownext.live/docs'
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
    description="Get to know the latest features, setup instructions, and tips to use NowNext.live to the fullest."
  >
    <template #title>
      <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight">Documentation & User Guides</h1>
    </template>
  </UPageHero>
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
    <div v-else class="text-gray-500 text-center py-8">
      No documentation articles found yet.
    </div>
  </UContainer>
</template>
