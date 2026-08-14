<script setup lang="ts">
const route = useRoute()
const { data: doc } = await useAsyncData(route.path, () => queryCollection('docs').path(route.path).first())

useSeoMeta({
  title: () => doc.value?.title ? `${doc.value.title} - NowNext.live Documentation` : 'Documentation - NowNext.live',
  description: () => doc.value?.description || '',
  ogTitle: () => doc.value?.title,
  ogDescription: () => doc.value?.description,
  ogImage: () => doc.value?.image || 'https://nownext.live/imgs/logo.png',
  ogUrl: () => `https://nownext.live${route.path}`,
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: () => doc.value?.title,
  twitterDescription: () => doc.value?.description
})

useHead({
  link: [
    { rel: 'canonical', key: 'canonical', href: computed(() => `https://nownext.live${route.path}`) }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'TechArticle',
            headline: doc.value?.title,
            description: doc.value?.description,
            datePublished: doc.value?.date,
            author: {
              '@type': 'Organization',
              name: 'NowNext.live'
            }
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
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: doc.value?.title || 'Documentation Article',
                item: `https://nownext.live${route.path}`
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
  <UContainer class="py-12">
    <article v-if="doc" class="prose dark:prose-invert max-w-none">
      <h1>{{ doc.title }}</h1>
      <ContentRenderer :value="doc" />
    </article>
    <div v-else class="text-center py-16">
      <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Documentation Article Not Found</h2>
      <NuxtLink to="/docs" class="text-indigo-600 dark:text-indigo-400 hover:underline">
        &larr; Back to Documentation
      </NuxtLink>
    </div>
  </UContainer>
</template>
