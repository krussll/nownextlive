<template>
  <UHeader>
    <template #title>
      <img src="/imgs/logo.png" style="height: 35px" />
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <div v-if="user">
        <UButton
          label="Sign out"
          color="neutral"
          variant="outline"
          @click="signOut"
          size="lg"
          class="hidden lg:inline-flex rounded-none font-semibold hover:shadow-lg"
        />
      </div>
      <div class="flex gap-1.5" v-else>
        <UButton
        icon="i-lucide-log-in"
        color="neutral"
        variant="ghost"
        to="/auth/login"
        class="lg:hidden"
        size="lg"
      />

      <UButton
        label="Sign in"
        color="neutral"
        variant="outline"
        to="/auth/login"
        size="lg"
        class="hidden lg:inline-flex rounded-none font-semibold hover:shadow-lg"
      />

      <UButton
        label="Sign up"
        color="neutral"
        trailing-icon="i-lucide-arrow-right"
        size="lg"
        class="hidden lg:inline-flex rounded-none font-semibold hover:shadow-lg"
        to="/auth/signup"
      />
      </div>
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
  <UMain>
    <NuxtPage />
  </UMain>
  
    <UFooter
      class="py-12 border-t border-gray-200"
      :ui="{ wrapper: 'border-none' }"
    >
      <template #left>
        <SiteLogo />
        <p class="text-sm text-gray-500">
          Simple, live “Now & Next” boards for sports clubs.
        </p>
      </template>

      <template #right>
        <div class="flex space-x-6 text-sm">
          <ULink to="/about" class="text-gray-600 hover:text-indigo-600"
            >About</ULink
          >
          <ULink to="/contact" class="text-gray-600 hover:text-indigo-600"
            >Contact</ULink
          >
          <ULink to="/privacy" class="text-gray-600 hover:text-indigo-600"
            >Privacy</ULink
          >
        </div>
      </template>
    </UFooter>
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

const user = useSupabaseUser()

const router = useRouter()

const supabase = useSupabaseClient()

const signOut = async () => {
  
  await supabase.auth.signOut();
  router.push('/')
}
</script>
