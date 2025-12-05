<template>
  <UHeader>
    <template #title>
      <img src="/imgs/logo.png" style="height: 35px" />
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UButton
        icon="i-lucide-log-in"
        color="neutral"
        variant="ghost"
        to="/login"
        class="lg:hidden"
        size="lg"
      />

      <UButton
        label="Sign in"
        color="neutral"
        variant="outline"
        to="/login"
        size="lg"
        class="hidden lg:inline-flex rounded-none font-semibold hover:shadow-lg"
      />

      <UButton
        label="Sign up"
        color="neutral"
        trailing-icon="i-lucide-arrow-right"
        size="lg"
        class="hidden lg:inline-flex rounded-none font-semibold hover:shadow-lg"
        to="/signup"
      />
    </template>
  </UHeader>
  <UMain>
    <NuxtPage />
  </UMain>
  <UFooter />
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'About',
    to: '/about',
    active: route.path.startsWith('/about')
  },
  {
    label: 'Pricing',
    to: '/pricing',
    active: route.path.startsWith('/pricing')
  },
  {
    label: 'Contact',
    to: '/contact',
    active: route.path.startsWith('/contact')
  }
])
</script>
