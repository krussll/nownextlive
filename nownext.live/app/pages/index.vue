<script setup lang="ts">
const features = [
  {
    tag: 'SYNCHRONIZATION',
    title: 'Keep every court, stage, and pitch in sync with zero latency',
    description:
      'Forget manual whiteboard updates or reprinting paper schedules. When a match ends or a session shifts, update it once on your controller device and watch every connected screen across your venue update instantly.',
    icon: 'i-lucide-zap',
    image: '/imgs/demos/nownextlive-controller.png',
    reverse: false
  },
  {
    tag: 'ACCESSIBILITY',
    title: 'Runs on any browser—no apps, hardware, or downloads required',
    description:
      'Turn any Smart TV, iPad, tablet, or laptop into a dedicated high-visibility display board. Simply open a URL or scan a QR code. Participants can even track live schedules directly on their phones.',
    icon: 'i-lucide-globe',
    image: '/imgs/demos/nownextlive-display.png',
    reverse: true
  },
  {
    tag: 'SIMPLICITY',
    title: 'Set up your full event schedule in under 10 minutes',
    description:
      'Designed for busy event directors and non-technical volunteers. Create your courts or spaces, enter initial match times, and go live immediately with zero technical training or software installation.',
    icon: 'i-lucide-clock',
    image: '/imgs/demos/nownextlive-controller.png',
    reverse: false
  },
  {
    tag: 'CONTROL & PRIVACY',
    title: 'Full control over display views, schedules, and read-only sharing',
    description:
      'Switch effortlessly between dedicated single-court views or a master venue schedule. Keep full editing control on your phone while sharing clean, distraction-free read-only links with participants.',
    icon: 'i-lucide-shield-check',
    image: '/imgs/demos/nownextlive-display.png',
    reverse: true
  }
]

const steps = [
  {
    number: '01',
    title: 'Create Your Event',
    description: 'Set up your courts, rooms, or stages in under 2 minutes. Add initial match or session schedules effortlessly.'
  },
  {
    number: '02',
    title: 'Launch Display Links',
    description: 'Open the read-only display link on Smart TVs, iPads, monitors, or share a QR code for participant phones.'
  },
  {
    number: '03',
    title: 'Update Live & Relax',
    description: 'Advance match statuses or adjust times from your phone. Every screen across the venue updates in real time.'
  }
]

const useCases = [
  {
    icon: 'i-lucide-trophy',
    title: 'Sports Clubs & Tournaments',
    description: 'Badminton, tennis, squash, football, padel, pool, and martial arts tournaments.'
  },
  {
    icon: 'i-lucide-presentation',
    title: 'Conferences & Seminars',
    description: 'Multi-track speaker agendas, room schedules, and keynote transition boards.'
  },
  {
    icon: 'i-lucide-tv',
    title: 'Livestreams & Broadcast Studios',
    description: 'On-air confidence monitors, producer cues, and rundown status displays.'
  },
  {
    icon: 'i-lucide-users',
    title: 'Meetings & Workshops',
    description: 'Corporate break-out sessions, training schedules, and venue signage.'
  }
]

const herolinks = ref([
  {
    label: 'Try NowNext.live for free',
    to: '/r/generate',
    trailingIcon: 'i-lucide-arrow-right',
    color: 'primary',
    variant: 'solid',
    size: 'xl',
    class: 'rounded-none font-bold shadow-xl shadow-primary-500/20'
  },
  {
    label: 'See how it works',
    to: '#how-it-works',
    color: 'neutral',
    variant: 'outline',
    size: 'xl',
    class: 'rounded-none font-bold'
  }
])

useSeoMeta({
  title: 'NowNext.live - Real-Time Multi-Screen Event & Sports Schedule Display',
  description: 'Show a live-updating schedule on every court, stage, or pitch while managing everything effortlessly from one phone or laptop. Runs in any browser with zero setup.',
  ogTitle: 'NowNext.live - Real-Time Multi-Screen Event & Sports Schedule Display',
  ogDescription: 'Show a live-updating schedule on every court, stage, or pitch while managing everything effortlessly from one phone or laptop.',
  ogImage: 'https://nownext.live/imgs/logo.png',
  ogUrl: 'https://nownext.live/',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'NowNext.live - Real-Time Multi-Screen Event & Sports Schedule Display',
  twitterDescription: 'Show a live-updating schedule on every court, stage, or pitch while managing everything effortlessly from one phone or laptop.'
})

useHead({
  link: [
    { rel: 'canonical', key: 'canonical', href: 'https://nownext.live/' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': 'https://nownext.live/#website',
            url: 'https://nownext.live',
            name: 'NowNext.live',
            description: 'Real-Time Multi-Screen Event & Sports Schedule Display Platform'
          },
          {
            '@type': 'Organization',
            '@id': 'https://nownext.live/#organization',
            name: 'NowNext.live',
            url: 'https://nownext.live',
            logo: 'https://nownext.live/imgs/logo.png'
          },
          {
            '@type': 'WebApplication',
            '@id': 'https://nownext.live/#webapp',
            name: 'NowNext.live',
            url: 'https://nownext.live',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires HTML5 compatible browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Effortlessly display live schedules and updates across Smart TVs, tablets, and phones.'
          }
        ]
      })
    }
  ]
})
</script>

<template>
  <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased min-h-screen">
    <!-- Hero Section (2-Column) -->
    <section class="relative py-16 md:py-24 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-950 dark:to-gray-900">
      <UContainer class="max-w-7xl mx-auto px-4 md:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <!-- Hero Left Column -->
          <div class="lg:col-span-6 space-y-6 text-left">
            <div class="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800">
              <UIcon name="i-lucide-sparkles" class="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              Real-Time Schedule Signage
            </div>

            <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">
              Real-Time Multi-Screen <br />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500">
                Event & Sports Schedule Display.
              </span>
            </h1>

            <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl font-normal leading-relaxed">
              Show a live-updating schedule on every court, stage, or pitch while managing everything effortlessly from one phone or laptop.
            </p>

            <div class="pt-2 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <UButton
                v-for="link in herolinks"
                :key="link.label"
                v-bind="link"
              />
            </div>

            <p class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 pt-1">
              <UIcon name="i-lucide-check-circle-2" class="w-4 h-4 text-emerald-500" />
              No credit card or app download required
            </p>
          </div>

          <!-- Hero Right Column (Live Display Interactive Preview) -->
          <div class="lg:col-span-6 relative">
            <div class="relative mx-auto max-w-xl bg-gray-950 p-2 sm:p-3 shadow-2xl border border-gray-800">
              <div class="flex items-center justify-between px-3 py-2 bg-gray-900 border-b border-gray-800 text-xs text-gray-400 font-mono">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>LIVE COURT DISPLAY BOARD</span>
                </div>
                <span>nownext.live/r/demo</span>
              </div>
              <img
                src="/imgs/demos/nownextlive-display.png"
                alt="NowNext.live Real-Time Display Screen"
                class="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Social Proof Bar -->
    <section class="py-8 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/40">
      <UContainer class="max-w-6xl mx-auto text-center space-y-3">
        <p class="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          Trusted by tournament directors, sports clubs, event organizers & production teams
        </p>
      </UContainer>
    </section>

    <!-- How It Works (3-Step Guide) -->
    <section id="how-it-works" class="py-20 md:py-28 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
      <UContainer class="max-w-6xl mx-auto px-4 md:px-8 space-y-16">
        <div class="text-center space-y-4 max-w-2xl mx-auto">
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            SIMPLE SETUP
          </span>
          <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight">
            How NowNext.live Works in 3 Steps
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Up and running across your entire venue in less than 10 minutes.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="step in steps"
            :key="step.number"
            class="p-8 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 space-y-4 relative group hover:border-indigo-500 transition-colors"
          >
            <div class="text-5xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
              {{ step.number }}
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ step.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ step.description }}
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Core Features (Alternating 2-Column Blocks) -->
    <section id="features" class="py-20 md:py-28 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950">
      <UContainer class="max-w-6xl mx-auto px-4 md:px-8 space-y-24">
        <div class="text-center space-y-4 max-w-2xl mx-auto">
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            POWERFUL FEATURES
          </span>
          <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight">
            Built for Smooth, Stress-Free Events
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Everything you need to keep participants informed and your schedule running on time.
          </p>
        </div>

        <div class="space-y-24">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <!-- Content Column -->
            <div
              :class="[
                'lg:col-span-6 space-y-4',
                feature.reverse ? 'lg:order-2' : 'lg:order-1'
              ]"
            >
              <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <UIcon :name="feature.icon" class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                {{ feature.tag }}
              </div>
              <h3 class="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-snug">
                {{ feature.title }}
              </h3>
              <p class="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ feature.description }}
              </p>
            </div>

            <!-- Image/Preview Column -->
            <div
              :class="[
                'lg:col-span-6',
                feature.reverse ? 'lg:order-1' : 'lg:order-2'
              ]"
            >
              <div class="p-2 bg-gray-900 border border-gray-800 shadow-xl">
                <img
                  :src="feature.image"
                  :alt="feature.title"
                  class="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Use Cases Grid -->
    <section class="py-20 md:py-28 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
      <UContainer class="max-w-6xl mx-auto px-4 md:px-8 space-y-16">
        <div class="text-center space-y-4 max-w-2xl mx-auto">
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            USE CASES
          </span>
          <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight">
            Designed for Every Venue & Gathering
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            From local sports tournaments to major multi-track conferences.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="useCase in useCases"
            :key="useCase.title"
            class="p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 space-y-3 hover:border-indigo-500 transition-colors"
          >
            <div class="w-10 h-10 flex items-center justify-center bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              <UIcon :name="useCase.icon" class="w-5 h-5" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">
              {{ useCase.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ useCase.description }}
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- FAQ Accordion Section -->
    <section class="py-20 md:py-28 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950">
      <UContainer class="max-w-4xl mx-auto px-4 md:px-8 space-y-12">
        <div class="text-center space-y-4">
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            QUESTIONS & ANSWERS
          </span>
          <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <UAccordion
          multiple
          :items="[
            {
              label: 'What is NowNext.live?',
              content: `NowNext.live is a simple real-time tool that lets you create live, auto-updating schedule displays for sports tournaments, club days, conferences, and broadcasts. Update once from a controller device — every connected screen updates instantly.`
            },
            {
              label: 'Do I need to install software or apps?',
              content: `No. NowNext.live runs entirely inside web browsers. Open the controller on your phone or laptop, and open the read-only display link on Smart TVs, tablets, or monitors.`
            },
            {
              label: 'How fast is setup?',
              content: `You can create an event board, set up your courts/spaces, and launch your displays in under 10 minutes. No technical background required.`
            },
            {
              label: 'Can participants check schedules on their phones?',
              content: `Yes! You can share a direct read-only link or display a QR code at your venue so participants can check match times from anywhere.`
            },
            {
              label: 'What happens if my internet connection drops?',
              content: `Displays stay visible on screen and automatically reconnect when internet returns, immediately pulling the latest schedule.`
            },
            {
              label: 'Is there a free tier?',
              content: `Yes. You can start creating events for free. Paid plans unlock additional concurrent displays and custom branding.`
            }
          ]"
          :ui="{
            wrapper: 'divide-y divide-gray-200 dark:divide-gray-800',
            item: {
              base: 'py-2',
              size: 'text-base',
              color: 'text-gray-600 dark:text-gray-300',
              padding: 'pt-2 pb-6'
            },
            default: {
              class: 'text-left w-full py-4 text-lg font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors',
              openIcon: 'i-lucide-minus',
              closeIcon: 'i-lucide-plus'
            }
          }"
        />
      </UContainer>
    </section>

    <!-- Bottom CTA Banner Section -->
    <section class="py-20 md:py-28 bg-white dark:bg-gray-900 text-center">
      <UContainer class="max-w-4xl mx-auto px-4 md:px-8 space-y-8">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Ready to Run a Cleaner, Stress-Free Event?
        </h2>
        <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Replace paper schedules and volunteer chaos with live-updating display screens today.
        </p>

        <div>
          <UButton
            to="/r/generate"
            label="Create Your Free Event Now"
            trailing-icon="i-lucide-arrow-right"
            color="primary"
            variant="solid"
            size="xl"
            class="rounded-none font-bold shadow-xl shadow-primary-500/20"
          />
        </div>
      </UContainer>
    </section>
  </div>
</template>
