<template>
  <UPageHero
    class="bg-gradient-to-r from-blue-200 to-cyan-200"
    title="Your Club Schedule, Live"
    description="Update every screen instantly from your phone or laptop — no apps, no setup. Now Next Live keeps every court, room, and table aligned in real time."
    :links="links"
    orientation="horizontal"
  >
  <img
      src="/imgs/hero-image.svg"
      alt="App screenshot"
      class="rounded-lg"
      style="width: 460px"
    />
  </UPageHero>

  <UPageSection
    title="Beautiful Vue UI components"
    description="Nuxt UI provides a comprehensive suite of components and utilities to help you build beautiful and accessible web applications with Vue and Nuxt."
    orientation="horizontal"
    headline="Features"
  >

<img
      src="/imgs/placeholder.png"
      alt="App screenshot"
      class="rounded-lg"
      style="width: 460px"
    />
  </UPageSection>

  <UPageSection
    title="Beautiful Vue UI components"
    description="Nuxt UI provides a comprehensive suite of components and utilities to help you build beautiful and accessible web applications with Vue and Nuxt."
    orientation="horizontal"
    reverse
    headline="Features"
  >

<img
      src="/imgs/placeholder.png"
      alt="App screenshot"
      class="rounded-lg"
      style="width: 460px"
    />
  </UPageSection>


  <UPageSection
    title="Ready to simplify your events?"
    description="Nuxt UI provides a comprehensive suite of components and utilities to help you build beautiful and accessible web applications with Vue and Nuxt."
    :links="ctalinks"
    class="bg-gradient-to-r from-emerald-500 to-emerald-300" />
</template>

<script setup lang="ts">
const links = ref([
  {
    label: 'Try for free now',
    to: '/r/generate',
    trailingIcon: 'i-lucide-arrow-right'
  }
])

const ctalinks = ref([
  {
    label: 'Get started',
    to: '/r/generate',
    trailingIcon: 'i-lucide-square-play',
    color: 'neutral',
    size: 'xl',
    reverse: 'true'
  }
])
</script>