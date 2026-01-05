<template>
  <UHeader>
    <template #title>
      <img src="/imgs/logo.png" style="height: 35px" />
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <div v-if="user" class="flex gap-1.5">
        <UButton
          icon="i-lucide-user"
          color="neutral"
          variant="ghost"
          to="/account"
          class="lg:hidden"
          size="lg"
        />
        <UButton
          icon="i-lucide-log-out"
          color="neutral"
          variant="ghost"
          @click="signOut"
          class="lg:hidden"
          size="lg"
        />

        <UButton
          to="/account"
          label="Account"
          variant="ghost"
          color="gray"
          icon="i-heroicons-user-circle"
        />
        <UButton
          label="Sign out"
          color="neutral"
          variant="outline"
          @click="signOut"
          size="lg"
          class="hidden lg:inline-flex rounded-none font-semibold hover:shadow-lg"
        />
        <UButton
          label="Start new"
          to="/r/generate"
          color="primary"
          variant="solid"
          size="lg"
          class="hidden lg:inline-flex rounded-none font-semibold hover:shadow-lg ml-2"
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
        label="Try for free"
        to="/r/generate"
        color="primary"
        variant="solid"
        size="lg"
        class="hidden lg:inline-flex rounded-none font-semibold hover:shadow-lg ml-2"
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
      <template #top>
        <UContainer>
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <!-- Column 1: Logo & Description -->
            <div class="flex flex-col gap-4">
              <SiteLogo />
              <p class="text-sm text-gray-500">
                A real-time event and sports scheduling platform that shows what is happening now and what is coming next across multiple screens. Any internet connected device can use it.
              </p>
              <div class="text-xs text-gray-400 mt-2">
                Version {{ config.public.version }}
              </div>
            </div>

            <!-- Column 2: Product -->
            <div class="flex flex-col gap-4">
              <h3 class="font-semibold text-gray-900">Product</h3>
              <div class="flex flex-col gap-2 text-sm text-gray-600">
                <ULink to="/pricing" class="hover:text-indigo-600">Pricing</ULink>
                <ULink to="https://trello.com/b/LTEVR37i" target="_blank" class="hover:text-indigo-600">Public Roadmap</ULink>
                <ULink to="#" class="hover:text-indigo-600 collapse">Features</ULink>
              </div>
              
              <h3 class="font-semibold text-gray-900 mt-4 collapse">Compare</h3>
              <div class="flex flex-col gap-2 text-sm text-gray-600">
                <ULink to="#" class="hover:text-indigo-600 collapse">Why Now Next Live?</ULink>
                <ULink to="#" class="hover:text-indigo-600 collapse">Shoflo Alternative</ULink>
                <ULink to="#" class="hover:text-indigo-600 collapse">ProPresenter Alternative</ULink>
                <ULink to="#" class="hover:text-indigo-600 collapse">Cuez Alternative</ULink>
              </div>
            </div>

            <!-- Column 3: Use Cases -->
            <div class="flex flex-col gap-4 collapse">
              <h3 class="font-semibold text-gray-900">Use Cases</h3>
              <div class="flex flex-col gap-2 text-sm text-gray-600">
                <ULink to="#" class="hover:text-indigo-600">Presentations</ULink>
                <ULink to="#" class="hover:text-indigo-600">Meetings</ULink>
                <ULink to="#" class="hover:text-indigo-600">Livestreams</ULink>
                <ULink to="#" class="hover:text-indigo-600">Video Productions</ULink>
                <ULink to="#" class="hover:text-indigo-600">Events</ULink>
                <ULink to="#" class="hover:text-indigo-600">Conferences</ULink>
                <ULink to="#" class="hover:text-indigo-600">Broadcasting</ULink>
                <ULink to="#" class="hover:text-indigo-600">Education</ULink>
                <ULink to="#" class="hover:text-indigo-600">More...</ULink>
              </div>
            </div>

            <!-- Column 4: Resources -->
            <div class="flex flex-col gap-4">
              <h3 class="font-semibold text-gray-900">Resources</h3>
              <div class="flex flex-col gap-2 text-sm text-gray-600">
                <ULink to="#" class="hover:text-indigo-600">Documentation</ULink>
                <ULink to="#" class="hover:text-indigo-600">Blog</ULink>
                <ULink to="#" class="hover:text-indigo-600 collapse">FAQ</ULink>
                <ULink to="#" class="hover:text-indigo-600 collapse">What experts say</ULink>
                <ULink to="#" class="hover:text-indigo-600 collapse">Testimonials</ULink>
              </div>
            </div>
          </div>
        </UContainer>
      </template>

      <template #bottom>
        <UContainer>
          <div class="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-500 mt-8 pt-8 border-t border-gray-100">
            <div class="flex gap-6">
              <ULink to="/contact" class="hover:text-indigo-600">Contact</ULink>
              <ULink to="#" class="hover:text-indigo-600 collapse collapse">Imprint</ULink>
              <ULink to="#" class="hover:text-indigo-600 collapse collapse">Terms of Service</ULink>
              <ULink to="/privacy" class="hover:text-indigo-600 collapse">Privacy Policy</ULink>
              <ULink to="#" class="hover:text-indigo-600 collapse">Cookie Policy</ULink>
              <ULink to="#" class="hover:text-indigo-600 collapse">Security & Compliance</ULink>
            </div>
            <div class="flex items-center gap-2">
               Made in England
            </div>
          </div>
        </UContainer>
      </template>
    </UFooter>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const config = useRuntimeConfig()

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
