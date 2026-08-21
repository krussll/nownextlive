<script setup lang="ts">
const { data: list } = await useAsyncData('docs', () => queryCollection('docs').all())

const categories = computed(() => {
  if (!list.value) return []
  
  const map = new Map<string, typeof list.value>()
  
  // Sort list by order property if available
  const sorted = [...list.value].sort((a, b) => (a.order || 99) - (b.order || 99))
  
  for (const item of sorted) {
    const cat = item.category || 'General'
    if (!map.has(cat)) {
      map.set(cat, [])
    }
    map.get(cat)!.push(item)
  }
  
  return Array.from(map.entries()).map(([name, articles]) => ({ name, articles }))
})

useSeoMeta({
  title: 'Documentation & User Guides | NowNext.live',
  description: 'Official user guides and step-by-step instructions for setting up free real-time digital schedules & now/next display boards with NowNext.live.',
  ogTitle: 'NowNext.live Documentation & Guides',
  ogDescription: 'Learn how to set up multi-screen displays, real-time controllers, Smart TV signage, and livestream overlays for any event.',
  ogImage: 'https://nownext.live/imgs/og-image.png',
  ogUrl: 'https://nownext.live/docs',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'NowNext.live Documentation & Guides',
  twitterDescription: 'Learn how to set up multi-screen displays, real-time controllers, Smart TV signage, and livestream overlays for any event.',
  twitterImage: 'https://nownext.live/imgs/og-image.png'
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
  <div>
    <!-- Hero Section -->
    <UPageHero  
      description="Step-by-step guides, controller documentation, and setup instructions to get the most out of NowNext.live."
    >
      <template #title>
        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight">Documentation & User Guides</h1>
      </template>
    </UPageHero>

    <!-- Overview Block: What is NowNext.live & What it's for -->
    <section class="bg-gray-50/70 dark:bg-gray-900/50 border-y border-gray-200/80 dark:border-gray-800 py-12 px-4">
      <UContainer class="max-w-6xl mx-auto space-y-8">
        <div class="max-w-3xl space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 rounded-full">
            Platform Overview
          </div>
          <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            What is NowNext.live?
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
            <strong>NowNext.live</strong> is a real-time event, sports club, and tournament schedule signage platform designed to broadcast what is happening <strong class="text-indigo-600 dark:text-indigo-400">NOW</strong> and what is coming <strong class="text-indigo-600 dark:text-indigo-400">NEXT</strong> across multiple venue screens simultaneously.
          </p>
          <p class="text-base text-gray-500 dark:text-gray-400 leading-relaxed font-light">
            Traditional events rely on paper sheets, whiteboards, or manual announcements that become outdated as soon as matches run late. NowNext.live replaces paper chaos with live-updating digital displays on Smart TVs, court-side tablets, and spectator mobile devices—controlled instantly from a single organizer dashboard.
          </p>
        </div>

        <!-- Core Value Pillars Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div class="bg-white dark:bg-gray-800/90 rounded-xl p-6 border border-gray-200/80 dark:border-gray-700/80 shadow-xs space-y-3">
            <div class="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <UIcon name="i-heroicons-bolt" class="w-6 h-6" />
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white text-lg">Instant Synchronization</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light">
              Schedule updates made in the organizer controller broadcast to all connected venue screens in under 200ms without page reloads.
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800/90 rounded-xl p-6 border border-gray-200/80 dark:border-gray-700/80 shadow-xs space-y-3">
            <div class="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <UIcon name="i-heroicons-device-tablet" class="w-6 h-6" />
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white text-lg">Zero App Downloads</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light">
              Runs directly in standard web browsers on Smart TVs, iPads, Android tablets, laptops, or spectator mobile phones via QR code.
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800/90 rounded-xl p-6 border border-gray-200/80 dark:border-gray-700/80 shadow-xs space-y-3">
            <div class="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <UIcon name="i-heroicons-tv" class="w-6 h-6" />
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white text-lg">Tailored Display Views</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light">
              Deploy entrance displays, dedicated per-court/room signage, or full timetable grids customized for each audience role.
            </p>
          </div>
        </div>

        <!-- Quick CTA Bar -->
        <div class="pt-2 flex flex-wrap items-center gap-4">
          <NuxtLink 
            to="/r/generate" 
            class="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg transition-colors shadow-xs"
          >
            <span>Create a Free Event</span>
            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
          </NuxtLink>
          <span class="text-xs text-gray-500 dark:text-gray-400">
            No credit card or download required. Instant browser setup.
          </span>
        </div>
      </UContainer>
    </section>

    <!-- Main Documentation Items List -->
    <UContainer class="py-12 max-w-6xl mx-auto">
      <div v-if="categories.length" class="space-y-12">
        <section v-for="category in categories" :key="category.name" class="space-y-4">
          <div class="border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
              <UIcon name="i-heroicons-document-text" class="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              {{ category.name }}
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NuxtLink 
              v-for="article in category.articles" 
              :key="article.path" 
              :to="article.path" 
              class="rounded-xl border border-gray-200/80 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-all duration-200 block p-6 hover:shadow-sm"
            >
              <article class="flex flex-col justify-between h-full">
                <div>
                  <div v-if="article.tags?.length" class="flex flex-wrap gap-1.5 mb-3">
                    <span
                      v-for="tag in article.tags"
                      :key="tag"
                      class="px-2 py-0.5 text-xs font-medium bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 rounded"
                    >
                      {{ tag }}
                    </span>
                  </div>
                  <h3 class="font-bold text-gray-900 dark:text-white text-xl mb-2 group-hover:text-indigo-600 transition-colors">
                    {{ article.title }}
                  </h3>
                  <p class="font-light text-gray-600 dark:text-gray-400 text-base mb-4 line-clamp-2">
                    {{ article.description }}
                  </p>
                </div>
                <footer class="flex items-center text-sm pt-2 text-indigo-600 dark:text-indigo-400 font-medium">
                  <span>Read User Guide &rarr;</span>
                </footer>
              </article>
            </NuxtLink>
          </div>
        </section>
      </div>

      <div v-else class="text-gray-500 text-center py-16">
        No documentation articles found.
      </div>
    </UContainer>
  </div>
</template>
