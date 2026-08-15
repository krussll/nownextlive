<script setup lang="ts">
const route = useRoute()
const { data: doc } = await useAsyncData(route.path, () => queryCollection('docs').path(route.path).first())
const { data: allDocs } = await useAsyncData('all-docs-list', () => queryCollection('docs').all())

// Group all docs by category for sidebar navigation
const navigationCategories = computed(() => {
  if (!allDocs.value) return []
  
  const map = new Map<string, typeof allDocs.value>()
  const sorted = [...allDocs.value].sort((a, b) => (a.order || 99) - (b.order || 99))
  
  for (const item of sorted) {
    const cat = item.category || 'General'
    if (!map.has(cat)) {
      map.set(cat, [])
    }
    map.get(cat)!.push(item)
  }
  
  return Array.from(map.entries()).map(([name, articles]) => ({ name, articles }))
})

// Calculate prev/next article navigation
const prevArticle = computed(() => {
  if (!allDocs.value || !doc.value) return null
  const sorted = [...allDocs.value].sort((a, b) => (a.order || 99) - (b.order || 99))
  const index = sorted.findIndex(item => item.path === doc.value?.path)
  return index > 0 ? sorted[index - 1] : null
})

const nextArticle = computed(() => {
  if (!allDocs.value || !doc.value) return null
  const sorted = [...allDocs.value].sort((a, b) => (a.order || 99) - (b.order || 99))
  const index = sorted.findIndex(item => item.path === doc.value?.path)
  return index >= 0 && index < sorted.length - 1 ? sorted[index + 1] : null
})

const mobileMenuOpen = ref(false)

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
  <main class="py-8 md:py-12 border-t border-gray-100 dark:border-gray-800">
    <UContainer class="max-w-7xl mx-auto px-4 md:px-6">
      <!-- Mobile Sidebar Toggle -->
      <div class="lg:hidden mb-6 flex justify-between items-center bg-gray-50 dark:bg-gray-800/60 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
        <NuxtLink to="/docs" class="text-sm font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
          &larr; Back to Docs
        </NuxtLink>
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen" 
          class="text-sm font-medium text-gray-700 dark:text-gray-200 px-3 py-1 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600"
        >
          {{ mobileMenuOpen ? 'Hide Docs Menu' : 'Menu / Topics' }}
        </button>
      </div>

      <div class="flex flex-col lg:flex-row gap-10">
        <!-- Sidebar Navigation -->
        <aside 
          :class="[
            'w-full lg:w-64 flex-shrink-0 space-y-6',
            mobileMenuOpen ? 'block' : 'hidden lg:block'
          ]"
        >
          <div class="sticky top-20">
            <div class="mb-4 hidden lg:block">
              <NuxtLink to="/docs" class="text-sm font-semibold text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
                &larr; Documentation Hub
              </NuxtLink>
            </div>

            <nav class="space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
              <div v-for="category in navigationCategories" :key="category.name" class="space-y-2">
                <h3 class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-2">
                  {{ category.name }}
                </h3>
                <ul class="space-y-1">
                  <li v-for="article in category.articles" :key="article.path">
                    <NuxtLink 
                      :to="article.path"
                      :class="[
                        'block px-3 py-2 text-sm rounded-lg transition-colors font-medium',
                        route.path === article.path 
                          ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold border-l-4 border-indigo-600 dark:border-indigo-400 pl-2'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/80 hover:text-gray-900 dark:hover:text-white'
                      ]"
                    >
                      {{ article.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </aside>

        <!-- Main Documentation Article -->
        <div class="flex-1 min-w-0">
          <div v-if="doc">
            <!-- Article Header -->
            <header class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
              <div class="flex flex-wrap gap-2 items-center text-gray-500 dark:text-gray-400 font-light text-sm mb-3">
                <NuxtLink to="/docs" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  Documentation
                </NuxtLink>
                <span v-if="doc.category">&middot;</span>
                <span v-if="doc.category" class="font-medium text-gray-700 dark:text-gray-300">{{ doc.category }}</span>
                <template v-if="doc.date">
                  <span>&middot;</span>
                  <time :datetime="doc.date">{{ new Date(doc.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}</time>
                </template>
              </div>

              <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
                {{ doc.title }}
              </h1>

              <p v-if="doc.description" class="text-lg text-gray-600 dark:text-gray-300 mb-4 font-normal">
                {{ doc.description }}
              </p>

              <div v-if="doc.tags?.length" class="flex flex-wrap gap-1.5 pt-2">
                <span
                  v-for="tag in doc.tags"
                  :key="tag"
                  class="px-2.5 py-1 text-xs font-medium bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-md"
                >
                  {{ tag }}
                </span>
              </div>
            </header>

            <!-- Article Content Body -->
            <article class="prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 [&>h1:first-child]:hidden">
              <ContentRenderer :value="doc" />
            </article>

            <!-- Article Footer Navigation -->
            <div class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <NuxtLink 
                v-if="prevArticle" 
                :to="prevArticle.path" 
                class="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline gap-1"
              >
                &larr; {{ prevArticle.title }}
              </NuxtLink>
              <div v-else></div>

              <NuxtLink 
                v-if="nextArticle" 
                :to="nextArticle.path" 
                class="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline gap-1"
              >
                {{ nextArticle.title }} &rarr;
              </NuxtLink>
            </div>
          </div>

          <div v-else class="text-center py-20">
            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Documentation Page Not Found</h2>
            <NuxtLink to="/docs" class="text-indigo-600 dark:text-indigo-400 hover:underline">
              &larr; Return to Documentation Hub
            </NuxtLink>
          </div>
        </div>
      </div>
    </UContainer>
  </main>
</template>
