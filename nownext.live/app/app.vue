<script setup lang="ts">
const route = useRoute()

useSeoMeta({
  ogImage: 'https://nownext.live/imgs/og-image.png',
  twitterImage: 'https://nownext.live/imgs/og-image.png',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [
    {
      rel: 'canonical',
      key: 'canonical',
      href: () => `https://nownext.live${route.path}`
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': 'https://nownext.live/#organization',
            name: 'Now. Next. Live.',
            url: 'https://nownext.live',
            logo: {
              '@type': 'ImageObject',
              url: 'https://nownext.live/imgs/logo.png'
            }
          },
          {
            '@type': 'WebSite',
            '@id': 'https://nownext.live/#website',
            url: 'https://nownext.live',
            name: 'Now. Next. Live.',
            publisher: {
              '@id': 'https://nownext.live/#organization'
            }
          }
        ]
      })
    }
  ]
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
