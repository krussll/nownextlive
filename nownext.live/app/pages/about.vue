<script setup lang="ts">
const features = [
  {
    icon: 'i-lucide-layout-dashboard',
    title: 'Create Your Board',
    description: 'Build out spaces and sessions for your event. Name them whatever you like.'
  },
  {
    icon: 'i-lucide-settings-2',
    title: 'Open The Controller',
    description: 'Update matchups, sessions or timing with a single click. Everything syncs instantly.'
  },
  {
    icon: 'i-lucide-tv',
    title: 'Displays Update Live',
    description: 'Any connected display—TV, laptop, projector—updates automatically.'
  }
]

const principles = [
  {
    title: 'Simplicity First',
    description: 'No bloated dashboards. No training required. A tool that simply does what it should.'
  },
  {
    title: 'Designed for Real Clubs',
    description: 'Built from real feedback from event volunteers, league organisers and club admins.'
  },
  {
    title: 'Reliable and Fast',
    description: 'Changes appear on every screen instantly—no refresh required.'
  }
]

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Now. Next. Live.',
        description: 'A simple, reliable way to keep players, teams, volunteers and spectators informed.',
        url: 'https://nownext.live/about'
      })
    }
  ]
})
</script>

<template>
  <div class="bg-white text-gray-900 antialiased min-h-screen">
    <!-- Hero -->
    <section class="py-24 border-b border-gray-100">
      <UContainer class="text-center space-y-8">
        <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight">
          About
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-600 to-cyan-500">
            NowNext.live
          </span>
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          A simple, reliable way to keep players, teams, volunteers and spectators
          informed—without paper schedules, last-minute confusion, or shouting across the room.
        </p>
      </UContainer>
    </section>

    <!-- Mission -->
    <section class="py-24 border-b border-gray-100">
      <UContainer class="grid md:grid-cols-2 gap-16 items-center">
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Why This Exists</h2>
          <p class="text-lg text-gray-600 leading-relaxed">
            At every grassroots sports club, tournament, local event or social competition,
            there’s always the same problem: schedules change, players lose track, and
            organisers get stuck answering the same questions over and over.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed">
            NowNext.live removes all of that friction. One controller. Unlimited displays.
            Instant updates—wherever screens are placed.
          </p>
        </div>

        <UCard :ui="{ base: 'rounded-none', ring: 'ring-1 ring-gray-200', shadow: 'shadow-xl' }">
          <h3 class="font-bold text-xl mb-6">Built For</h3>
          <ul class="space-y-4">
            <li v-for="item in ['Sports clubs & leagues', 'Tournament directors', 'Community events & charity days', 'Schools, halls & competitions', 'Anyone replacing messy paper schedules']" :key="item" class="flex items-center gap-3 text-gray-700">
              <UIcon name="i-lucide-check-circle-2" class="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </UCard>
      </UContainer>
    </section>

    <!-- How it works -->
    <section class="py-24 bg-gray-50 border-b border-gray-100">
      <UContainer>
        <h2 class="text-4xl font-extrabold text-center mb-16">
          How It <span class="text-indigo-600">Works</span>
        </h2>

        <div class="grid md:grid-cols-3 gap-8">
          <UCard
            v-for="(feature, index) in features"
            :key="index"
            :ui="{
              base: 'rounded-none',
              body: 'flex flex-col items-center text-center',
              ring: 'ring-1 ring-gray-200 hover:ring-indigo-300 transition-all',
              divide: 'divide-none'
            }"
            class="hover:bg-indigo-50/50 transition-colors"
          >
            <div class="w-16 h-16 mb-6 flex items-center justify-center mx-auto bg-gradient-to-br from-indigo-500 to-cyan-400 p-1 rounded-none shadow-lg">
              <UIcon :name="feature.icon" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Values -->
    <section class="py-24 border-b border-gray-100">
      <UContainer>
        <h2 class="text-4xl font-extrabold text-center mb-16">Our Principles</h2>
        <div class="grid md:grid-cols-3 gap-12">
          <div v-for="principle in principles" :key="principle.title" class="space-y-4 text-center md:text-left">
            <h3 class="text-xl font-bold text-gray-900">{{ principle.title }}</h3>
            <p class="text-gray-600 leading-relaxed">
              {{ principle.description }}
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- CTA -->
    <div class="mt-24">
      <CtaSection />
    </div>
  </div>
</template>
