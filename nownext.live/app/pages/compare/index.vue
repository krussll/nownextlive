<script setup lang="ts">
const { data: list } = await useAsyncData('compare-list', () => queryCollection('compare').all())

useSeoMeta({
  title: 'Product Alternatives & Comparisons | NowNext.live',
  description: 'Compare NowNext.live against Stagetimer.io, Yodeck, Tournify, and Google Slides. Discover why organizers choose our free real-time digital schedule & now/next display board.',
  ogTitle: 'NowNext.live Product Comparisons & Alternatives',
  ogDescription: 'Compare NowNext.live against stage timers, enterprise digital signage, tournament bracket managers, and static presentation slides.',
  ogImage: 'https://nownext.live/imgs/og-image.png',
  ogUrl: 'https://nownext.live/compare',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'NowNext.live Product Comparisons & Alternatives',
  twitterDescription: 'Compare NowNext.live against stage timers, enterprise digital signage, tournament bracket managers, and static presentation slides.',
  twitterImage: 'https://nownext.live/imgs/og-image.png'
})

useHead({
  link: [
    { rel: 'canonical', key: 'canonical', href: 'https://nownext.live/compare' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            name: 'NowNext.live Product Comparisons & Alternatives',
            url: 'https://nownext.live/compare',
            description: 'Compare NowNext.live against Stagetimer, Yodeck, Tournify, and static slides for real-time schedule displays.'
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
          PRODUCT COMPARISONS
        </span>
        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Why NowNext.live is Better
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Explore how NowNext.live compares to single-stage timers, complex digital signage, tournament bracket tools, and static presentation slides.
        </p>
      </div>

      <!-- Comparison Cards Grid -->
      <div v-if="list?.length" class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto pt-4">
        <NuxtLink
          v-for="item in list"
          :key="item.path"
          :to="item.path"
          class="group p-6 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all flex flex-col justify-between"
        >
          <div class="space-y-3">
            <div class="flex flex-wrap gap-1.5 items-center">
              <span
                v-if="item.competitorName"
                class="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80"
              >
                vs {{ item.competitorName }}
              </span>
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="px-2 py-0.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800"
              >
                {{ tag }}
              </span>
            </div>

            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {{ item.title }}
            </h2>

            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ item.subtitle || item.description }}
            </p>
          </div>

          <div class="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>By {{ item.author || 'NowNext.live Team' }}</span>
            <span class="font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
              Read comparison &rarr;
            </span>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="text-center py-12 text-gray-500">
        No comparison guides found.
      </div>

      <!-- Bottom CTA Card -->
      <div class="p-8 bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-gray-950 dark:to-gray-900 border border-indigo-100 dark:border-gray-800 rounded-none text-center space-y-4 max-w-4xl mx-auto">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
          Ready to See the NowNext.live Difference?
        </h3>
        <p class="text-gray-600 dark:text-gray-300 max-w-xl mx-auto text-sm">
          Set up real-time NOW & NEXT schedule displays across your venue screens in under 2 minutes. No app downloads or credit card required.
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
    </UContainer>
  </div>
</template>
