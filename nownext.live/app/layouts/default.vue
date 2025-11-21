<template>
    <UHeader>

      <template #title>
        <img src="/imgs/logo.png" style="height: 35px;" />
      </template>

      <UNavigationMenu :items="items" />

      <template #right>

      <UButton
        icon="i-lucide-log-in"
        color="neutral"
        variant="ghost"
        to="/login"
        class="lg:hidden"
      />

      <UButton
        label="Sign in"
        color="neutral"
        variant="outline"
        to="/login"
        class="hidden lg:inline-flex"
      />

      <UButton
        label="Sign up"
        color="neutral"
        trailing-icon="i-lucide-arrow-right"
        class="hidden lg:inline-flex"
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

const items = computed<NavigationMenuItem[]>(() => [{
  label: 'About',
  to: '/about',
  active: route.path.startsWith('/about')
}, {
  label: 'Contact',
  to: '/contact',
  active: route.path.startsWith('/contact')
}])
</script>