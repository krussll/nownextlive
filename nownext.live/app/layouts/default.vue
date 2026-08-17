<template>
  <div>
    <UHeader>
      <template #title>
        <img src="/imgs/logo.png" alt="NowNext.live Logo" style="height: 35px" />
      </template>

      <UNavigationMenu
        :items="items"
        :ui="{
          content: 'w-auto max-w-none',
          childList: 'grid-cols-1 min-w-[260px]',
          childItemLabel: 'whitespace-nowrap'
        }"
      />

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
            class="lg:hidden"
            size="lg"
            @click="signOut"
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
            size="lg"
            class="hidden lg:inline-flex rounded-none font-semibold hover:shadow-lg"
            @click="signOut"
          />
          <UButton
            to="/r/generate"
            label="Start new"
            color="primary"
            variant="solid"
            size="lg"
            class="hidden lg:inline-flex rounded-none font-semibold hover:shadow-lg ml-2"
          />
        </div>
        <div v-else class="flex gap-1.5">
          <UButton
            icon="i-lucide-log-in"
            color="neutral"
            variant="ghost"
            to="/auth/login"
            class="lg:hidden"
            size="lg"
          />

          <UButton
            to="/auth/login"
            label="Sign in"
            color="neutral"
            variant="outline"
            size="lg"
            class="hidden lg:inline-flex rounded-none font-semibold hover:shadow-lg"
          />

          <UButton
            to="/r/generate"
            label="Try for free"
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
      class="py-8 border-t border-gray-200"
      :ui="{ wrapper: 'border-none', top: 'py-4', bottom: 'py-2' }"
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
              <div class="flex items-center gap-3">
                <ULink
                  to="https://www.youtube.com/@nownextlive"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel"
                  class="text-gray-400 hover:text-red-600 transition-colors flex items-center justify-center"
                >
                  <UIcon name="i-lucide-youtube" class="w-5 h-5" />
                </ULink>
              </div>
            </div>

            <!-- Column 2: Product -->
            <div class="flex flex-col gap-4">
              <h3 class="font-semibold text-gray-900">Product</h3>
              <div class="flex flex-col gap-2 text-sm text-gray-600">
                <ULink to="/pricing" class="hover:text-indigo-600">Pricing</ULink>
                <ULink to="/about" class="hover:text-indigo-600">About Us</ULink>
                <ULink to="/r/generate" class="hover:text-indigo-600">Create Event Board</ULink>
                <ULink to="https://trello.com/b/LTEVR37i" target="_blank" class="hover:text-indigo-600">Public Roadmap</ULink>
              </div>
            </div>

            <!-- Column 3: Use Cases -->
            <div class="flex flex-col gap-4">
              <h3 class="font-semibold text-gray-900">Use Cases</h3>
              <div class="flex flex-col gap-2 text-sm text-gray-600">
                <ULink to="/use-cases/sports-tournaments-and-clubs" class="hover:text-indigo-600">Sports & Tournaments</ULink>
                <ULink to="/use-cases/conferences-and-seminars" class="hover:text-indigo-600">Conferences & Seminars</ULink>
                <ULink to="/use-cases/broadcasts-and-livestreams" class="hover:text-indigo-600">Broadcasts & Livestreams</ULink>
                <ULink to="/use-cases/corporate-meetings-and-workshops" class="hover:text-indigo-600">Corporate & Workshops</ULink>
                <ULink to="/use-cases/educational-and-school-events" class="hover:text-indigo-600">School & Education</ULink>
                <ULink to="/use-cases" class="hover:text-indigo-600 font-medium text-indigo-600">View All Use Cases &rarr;</ULink>
              </div>
            </div>

            <!-- Column 4: Resources -->
            <div class="flex flex-col gap-4">
              <h3 class="font-semibold text-gray-900">Resources</h3>
              <div class="flex flex-col gap-2 text-sm text-gray-600">
                <ULink to="/blog" class="hover:text-indigo-600">Blog & Articles</ULink>
                <ULink to="/docs" class="hover:text-indigo-600">Documentation & Guides</ULink>
                <ULink to="/changelog" class="hover:text-indigo-600">Changelog & Release Notes</ULink>
                <ULink to="/contact" class="hover:text-indigo-600">Contact Support</ULink>
                <ULink to="/pricing" class="hover:text-indigo-600">Plans & Pricing</ULink>
                <ULink to="/about" class="hover:text-indigo-600">Why NowNext.live</ULink>
              </div>
            </div>
          </div>
        </UContainer>
      </template>

      <template #bottom>
        <UContainer>
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400 pt-4 border-t border-gray-100">
            <div>
              <ULink to="/changelog" class="hover:text-gray-600">Version {{ config.public.version }}</ULink>
            </div>
            <div class="flex items-center gap-4">
              <ULink to="/changelog" class="hover:text-gray-600">Changelog</ULink>
              <span>&bull;</span>
              <ULink to="/privacy" class="hover:text-gray-600">Privacy Policy</ULink>
              <span>&bull;</span>
              <ULink to="/terms" class="hover:text-gray-600">Terms & Conditions</ULink>
              <span>&bull;</span>
              <ULink
                to="https://www.youtube.com/@nownextlive"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Channel"
                class="hover:text-red-600 transition-colors inline-flex items-center"
              >
                <UIcon name="i-lucide-youtube" class="w-4 h-4" />
              </ULink>
              <span>&bull;</span>
              <span>Made in England</span>
            </div>
          </div>
        </UContainer>
      </template>
    </UFooter>
  </div>
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
    label: 'Use Cases',
    to: '/use-cases',
    active: route.path.startsWith('/use-cases'),
    children: [
      {
        label: 'Overview & All Use Cases',
        to: '/use-cases'
      },
      {
        label: 'Sports Clubs & Tournaments',
        to: '/use-cases/sports-tournaments-and-clubs'
      },
      {
        label: 'Conferences & Seminars',
        to: '/use-cases/conferences-and-seminars'
      },
      {
        label: 'Broadcasts & Livestreams',
        to: '/use-cases/broadcasts-and-livestreams'
      },
      {
        label: 'Corporate Meetings & Workshops',
        to: '/use-cases/corporate-meetings-and-workshops'
      },
      {
        label: 'School & Educational Events',
        to: '/use-cases/educational-and-school-events'
      }
    ]
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
