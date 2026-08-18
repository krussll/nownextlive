<script setup lang="ts">
const route = useRoute()
const { data: doc } = await useAsyncData(route.path, () => queryCollection('compare').path(route.path).first())

useSeoMeta({
  title: () => doc.value?.title ? `${doc.value.title} | NowNext.live Compare` : 'Product Comparison - NowNext.live',
  description: () => doc.value?.description || '',
  ogTitle: () => doc.value?.title,
  ogDescription: () => doc.value?.description,
  ogImage: () => doc.value?.image || 'https://nownext.live/imgs/logo.png',
  ogUrl: () => `https://nownext.live${route.path}`,
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: () => doc.value?.title,
  twitterDescription: () => doc.value?.description,
  twitterImage: () => doc.value?.image || 'https://nownext.live/imgs/logo.png'
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
            '@type': 'Article',
            headline: doc.value?.title,
            description: doc.value?.description,
            datePublished: doc.value?.date,
            author: {
              '@type': 'Organization',
              name: 'NowNext.live'
            },
            publisher: {
              '@type': 'Organization',
              name: 'NowNext.live',
              logo: {
                '@type': 'ImageObject',
                url: 'https://nownext.live/imgs/logo.png'
              }
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
                name: 'Compare',
                item: 'https://nownext.live/compare'
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: doc.value?.title || 'Comparison',
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
  <main class="py-12 md:py-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
    <UContainer class="max-w-3xl mx-auto px-4 md:px-6">
      <div v-if="doc">
        <!-- Header -->
        <header class="mb-10 space-y-4">
          <NuxtLink to="/compare" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors gap-1">
            &larr; Back to Comparisons
          </NuxtLink>
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
            {{ doc.title }}
          </h1>
          <div class="flex flex-wrap gap-2 items-center text-gray-500 dark:text-gray-400 font-light text-sm pt-2 border-b border-gray-100 dark:border-gray-800 pb-4">
            <time v-if="doc.date" :datetime="doc.date">{{ new Date(doc.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}</time>
            <template v-if="doc.author">
              <span>&middot;</span>
              <div class="flex items-center gap-1.5">
                <UAvatar :alt="doc.author" size="2xs" />
                <span class="text-gray-700 dark:text-gray-300 font-normal">{{ doc.author }}</span>
              </div>
            </template>
            <template v-if="doc.competitorName">
              <span>&middot;</span>
              <span class="px-2 py-0.5 text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded">
                vs {{ doc.competitorName }}
              </span>
            </template>
          </div>
        </header>

        <!-- Article Body -->
        <article class="prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 [&>h1:first-child]:hidden">
          <ContentRenderer :value="doc" />
        </article>

        <!-- Bottom CTA Box -->
        <div class="mt-12 p-8 bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-gray-950 dark:to-gray-900 border border-indigo-100 dark:border-gray-800 rounded-none text-center space-y-4">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
            Ready to Upgrade Your Venue Displays?
          </h3>
          <p class="text-gray-600 dark:text-gray-300 max-w-lg mx-auto text-sm">
            Set up real-time NOW & NEXT court or stage displays in under 2 minutes. No app download or credit card required.
          </p>
          <div>
            <UButton
              to="/r/generate"
              label="Try NowNext.live For Free"
              trailing-icon="i-lucide-arrow-right"
              color="primary"
              variant="solid"
              size="lg"
              class="rounded-none font-bold"
            />
          </div>
        </div>

        <!-- Article Footer / Navigation -->
        <div class="mt-12 pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <NuxtLink to="/compare" class="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline gap-1">
            &larr; Back to all Product Comparisons
          </NuxtLink>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Comparison Guide Not Found</h2>
        <NuxtLink to="/compare" class="text-indigo-600 dark:text-indigo-400 hover:underline">
          &larr; Return to Product Comparisons Overview
        </NuxtLink>
      </div>
    </UContainer>
  </main>
</template>
