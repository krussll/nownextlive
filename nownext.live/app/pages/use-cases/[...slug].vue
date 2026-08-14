<script setup lang="ts">
const route = useRoute()
const { data: doc } = await useAsyncData(route.path, () => queryCollection('usecases').path(route.path).first())

useHead({
  title: computed(() => doc.value?.title ? `${doc.value.title} - Use Cases | NowNext.live` : 'Use Case - NowNext.live'),
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
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
          <NuxtLink to="/use-cases" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors gap-1">
            &larr; Back to Use Cases
          </NuxtLink>
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
            {{ doc.title }}
          </h1>
          <div class="flex flex-wrap gap-2 items-center text-gray-500 dark:text-gray-400 font-light text-sm pt-2 border-b border-gray-100 dark:border-gray-800 pb-4">
            <time :datetime="doc.date">{{ new Date(doc.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}</time>
            <template v-if="doc.author">
              <span>&middot;</span>
              <div class="flex items-center gap-1.5">
                <UAvatar :alt="doc.author" size="2xs" />
                <span class="text-gray-700 dark:text-gray-300 font-normal">{{ doc.author }}</span>
              </div>
            </template>
            <template v-if="doc.tags?.length">
              <span>&middot;</span>
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="tag in doc.tags"
                  :key="tag"
                  class="px-2 py-0.5 text-xs font-medium bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded"
                >
                  {{ tag }}
                </span>
              </div>
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
            Ready to Streamline Your Event?
          </h3>
          <p class="text-gray-600 dark:text-gray-300 max-w-lg mx-auto text-sm">
            Set up your live-updating court or venue schedules in under 10 minutes. No installation required.
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
          <NuxtLink to="/use-cases" class="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline gap-1">
            &larr; Back to all Use Cases
          </NuxtLink>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Use Case not found</h2>
        <NuxtLink to="/use-cases" class="text-indigo-600 dark:text-indigo-400 hover:underline">
          &larr; Return to Use Cases Overview
        </NuxtLink>
      </div>
    </UContainer>
  </main>
</template>
