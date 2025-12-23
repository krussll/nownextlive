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
  <UContainer class="py-12">
    <article v-if="doc" class="prose dark:prose-invert max-w-none">
      <h1>{{ doc.title }}</h1>
      <ContentRenderer :value="doc" />
    </article>
    <div v-else>
      Post not found
    </div>
  </UContainer>
</template>
