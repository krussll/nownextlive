<script setup lang="ts">
const route = useRoute()
const { data: doc } = await useAsyncData(route.path, () => queryCollection('blog').path(route.path).first())

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.value?.title,
        description: doc.value?.description,
        datePublished: doc.value?.date,
        author: {
          '@type': 'Organization',
          name: 'Now. Next. Live.'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Now. Next. Live.',
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
  <main class="py-12 md:py-16">
    <UContainer class="max-w-3xl mx-auto px-4 md:px-6">
      <div v-if="doc">
        <!-- Header -->
        <header class="mb-10">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {{ doc.title }}
          </h1>
          <div class="flex flex-wrap gap-2 items-center text-gray-500 dark:text-gray-400 font-light text-sm">
            <NuxtLink to="/blog" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              &larr; Back
            </NuxtLink>
            <span>&middot;</span>
            <time :datetime="doc.date">{{ new Date(doc.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}</time>
            <template v-if="doc.author">
              <span>&middot;</span>
              <div class="flex items-center gap-1.5">
                <UAvatar :alt="doc.author" size="2xs" />
                <span class="text-gray-700 dark:text-gray-300 font-normal">{{ doc.author }}</span>
              </div>
            </template>
          </div>
        </header>
        <!-- Article Body -->
        <article class="prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 [&>h1:first-child]:hidden">
          <ContentRenderer :value="doc" />
        </article>

        <!-- Article Footer / Navigation -->
        <div class="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <NuxtLink to="/blog" class="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline gap-1">
            &larr; Back to all articles
          </NuxtLink>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Post not found</h2>
        <NuxtLink to="/blog" class="text-indigo-600 dark:text-indigo-400 hover:underline">
          &larr; Return to Blog
        </NuxtLink>
      </div>
    </UContainer>
  </main>
</template>
