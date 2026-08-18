<script setup lang="ts">
const startPathways = [
  {
    icon: 'i-lucide-zap',
    tag: 'INSTANT GENERATOR',
    title: 'Create in 30 Seconds',
    description: 'No account, password, or credit card required. Generate an event board and start adding match schedules immediately.',
    linkText: 'Launch Quick Generator',
    to: '/r/generate',
    badge: 'Popular'
  },
  {
    icon: 'i-lucide-file-spreadsheet',
    tag: 'CSV & SPREADSHEET',
    title: 'Import Match Schedules',
    description: 'Bulk upload court assignments, player names, and timetables directly into your live controller with zero manual entry.',
    linkText: 'Import Fixtures',
    to: '/r/generate'
  },
  {
    icon: 'i-lucide-qr-code',
    tag: 'MOBILE SYNC',
    title: 'Venue QR Broadcast',
    description: 'Display or print instant QR codes for spectator phones. Attendees track live schedules anywhere in the venue.',
    linkText: 'See Mobile Flow',
    to: '#how-it-works'
  },
  {
    icon: 'i-lucide-monitor',
    tag: 'SMART TV SIGNAGE',
    title: 'Master TV Signage Link',
    description: 'Open clean, high-contrast display URLs on any Smart TV browser, monitor, or tablet. Zero software installation.',
    linkText: 'View Display Demo',
    to: '/r/generate'
  }
]

const features = [
  {
    tag: 'SYNCHRONIZATION',
    title: 'Keep every court, stage, and pitch in sync with zero latency',
    description:
      'Forget manual whiteboard updates or reprinting paper schedules. When a match ends or a session shifts, update it once on your controller device and watch every connected screen across your venue update instantly.',
    bullets: [
      'Sub-second real-time websocket synchronization',
      'Update match statuses, court numbers, and start times on the fly',
      'Multi-screen sync managed effortlessly from one master device'
    ],
    icon: 'i-lucide-zap',
    image: '/imgs/demos/nownextlive-controller.png',
    reverse: false
  },
  {
    tag: 'ACCESSIBILITY',
    title: 'Runs on any browser—no apps, hardware, or downloads required',
    description:
      'Turn any Smart TV, iPad, tablet, or laptop into a dedicated high-visibility display board. Simply open a URL or scan a QR code. Participants can even track live schedules directly on their phones.',
    bullets: [
      'Works natively in Chrome, Safari, Fire TV, and WebOS browsers',
      'Clean high-contrast mode engineered for venue visibility',
      'No app store downloads or IT permissions needed'
    ],
    icon: 'i-lucide-globe',
    image: '/imgs/demos/nownextlive-display.png',
    reverse: true
  },
  {
    tag: 'SIMPLICITY',
    title: 'Set up your full event schedule in under 10 minutes',
    description:
      'Designed for busy event directors and non-technical volunteers. Create your courts or spaces, enter initial match times, and go live immediately with zero technical training or software installation.',
    bullets: [
      'Intuitive touch-friendly controller interface',
      'Instant space & court generator wizards',
      'One-tap session progression (Pending → Live → Completed)'
    ],
    icon: 'i-lucide-clock',
    image: '/imgs/demos/nownextlive-controller.png',
    reverse: false
  },
  {
    tag: 'CONTROL & PRIVACY',
    title: 'Full control over display views, schedules, and read-only sharing',
    description:
      'Switch effortlessly between dedicated single-court views or a master venue schedule. Keep full editing control on your phone while sharing clean, distraction-free read-only links with participants.',
    bullets: [
      'Dedicated single-court or master multi-court screen layouts',
      'Secure read-only spectator display links',
      'Claim & lock event control with organizer passcodes'
    ],
    icon: 'i-lucide-shield-check',
    image: '/imgs/demos/nownextlive-display.png',
    reverse: true
  }
]

const steps = [
  {
    number: '1.',
    title: 'Create an event',
    description:
      'Create an event with multiple court or space schedules and match sessions. When logged-in, your event saves all your settings even if you close your browser.',
    image: '/imgs/demos/step-create-event.png',
    actionText: 'Create Event',
    actionIcon: 'i-lucide-arrow-right',
    reverse: false
  },
  {
    number: '2.',
    title: 'Share the link',
    description:
      'Simply share your unique "Viewer" link via Email, WhatsApp, or QR-Code with participants and spectators. You can see all connected devices with connection status.',
    image: '/imgs/demos/step-share-links.png',
    reverse: true
  },
  {
    number: '3.',
    title: 'Update live & control screens',
    description:
      'Advance sessions or adjust match times from your controller device. Every screen across the venue updates instantly with zero latency.',
    image: '/imgs/demos/step-update-live.png',
    reverse: false
  }
]

const activeTab = ref(0)

const useCasesDetailed = [
  {
    id: 'sports',
    icon: 'i-lucide-trophy',
    title: 'Sports Clubs & Tournaments',
    tagline: 'Badminton, Tennis, Squash, Martial Arts, Padel & Football',
    description: 'Eliminate player crowds around desk counters. Broadcast live court schedules, current match pairings, and next-up alerts directly to court-side TVs and player phones.',
    bullets: [
      'Court-by-court or master venue schedule views',
      'Instant court assignment shifts when matches finish early',
      'Printable & displayable QR codes for player mobile tracking'
    ],
    preview: {
      type: 'Match Display Board',
      court: 'Court 1 - Main Hall',
      now: { title: 'D. Miller / J. Smith vs A. Chen / R. Taylor', status: 'NOW PLAYING', time: 'Set 3' },
      next: { title: 'K. Patel / M. Vance vs T. Wilson / B. Ross', status: 'NEXT UP', time: 'Est. 14:30' }
    }
  },
  {
    id: 'conferences',
    icon: 'i-lucide-presentation',
    title: 'Conferences & Seminars',
    tagline: 'Multi-Track Speaker Agendas & Room Digital Signage',
    description: 'Keep conference attendees informed at every doorway and main stage. Display current keynote speakers, room session topics, and upcoming panel schedules in real time.',
    bullets: [
      'Multi-track hall and breakout room support',
      'Real-time schedule adjustments for speaker delays',
      'Clean typography visible from across conference halls'
    ],
    preview: {
      type: 'Auditorium Signage',
      court: 'Main Stage - Track A',
      now: { title: 'Keynote: Scaling Modern Web Infrastructure', status: 'IN PROGRESS', time: '45 mins remaining' },
      next: { title: 'Panel: AI Workflows in Production', status: 'UP NEXT', time: '15:00 Start' }
    }
  },
  {
    id: 'broadcast',
    icon: 'i-lucide-tv',
    title: 'Livestreams & Broadcast Studios',
    tagline: 'On-Air Confidence Monitors & Producer Cue Signage',
    description: 'Provide live rundown cues for hosts, presenters, and stream operators. Synchronize segment countdowns and next-up topics across broadcast studio monitors.',
    bullets: [
      'Distraction-free confidence monitor views',
      'Real-time producer updates without audio interruptions',
      'Works on any studio screen with a web browser'
    ],
    preview: {
      type: 'Studio Rundown Monitor',
      court: 'Studio B - Presenter View',
      now: { title: 'Segment 3: Tournament Final Highlights', status: 'ON AIR NOW', time: 'Live Stream' },
      next: { title: 'Segment 4: Post-Match Interview & Wrap-up', status: 'STANDBY', time: 'In 2 mins' }
    }
  },
  {
    id: 'meetings',
    icon: 'i-lucide-users',
    title: 'Corporate & Venue Signage',
    tagline: 'Training Workshops, Executive Halls & Event Space Signage',
    description: 'Guide attendees smoothly between meeting rooms and workshops. Display live room availability, presenter schedules, and break timers across venue displays.',
    bullets: [
      'Eliminate double-booking confusion at meeting doors',
      'Mobile control for venue managers and hosts',
      'Instant setup with zero hardware installation'
    ],
    preview: {
      type: 'Meeting Room Board',
      court: 'Executive Suite 4',
      now: { title: 'Q3 Product Strategy & Roadmap Review', status: 'OCCUPIED', time: 'Until 15:30' },
      next: { title: 'Engineering Leadership Standup', status: 'RESERVED', time: '16:00 Start' }
    }
  }
]

const stats = [
  { value: '100%', label: 'Browser-Based', subtext: 'Zero software or app installs' },
  { value: '< 1s', label: 'Real-Time Sync', subtext: 'Instant WebSocket updates' },
  { value: '0', label: 'Hardware Required', subtext: 'Use existing Smart TVs & devices' },
  { value: '10,000+', label: 'Sessions Displayed', subtext: 'Trusted at events worldwide' }
]

const trustTags = [
  { icon: 'i-lucide-tv', label: 'Smart TVs (Samsung WebOS, LG, FireTV)' },
  { icon: 'i-lucide-globe', label: 'iPad & Android Tablets' },
  { icon: 'i-lucide-qr-code', label: 'Spectator Mobile QR Sync' },
  { icon: 'i-lucide-trophy', label: 'Badminton & Tennis Leagues' },
  { icon: 'i-lucide-presentation', label: 'Multi-Track Conferences' },
  { icon: 'i-lucide-users', label: 'Corporate Event Signage' }
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
  title: 'NowNext.live - Free Real-Time Digital Schedule & Now/Next Display Board',
  description: 'Free real-time digital schedule & now/next display board for any event. Broadcast live-updating agendas, match schedules, and room boards across Smart TVs, tablets, and phones.',
  ogTitle: 'NowNext.live - Free Real-Time Digital Schedule & Now/Next Display Board',
  ogDescription: 'Free real-time digital schedule & now/next display board for any event. Show live-updating schedules across screens with zero setup.',
  ogImage: 'https://nownext.live/imgs/logo.png',
  ogUrl: 'https://nownext.live/',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'NowNext.live - Free Real-Time Digital Schedule & Now/Next Display Board',
  twitterDescription: 'Free real-time digital schedule & now/next display board for any event. Show live-updating schedules across screens with zero setup.'
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
    <!-- SECTION 1: HERO SECTION (2-Column Netlify Style) -->
    <section class="relative py-16 md:py-24 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-b from-gray-50/50 via-white to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-900">
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

          <!-- Hero Right Column (Workflow Diagram: Controller -> Cloud -> Output) -->
          <div class="lg:col-span-6 relative">
            <HeroWorkflowDiagram />
          </div>
        </div>
      </UContainer>
    </section>

    <!-- SECTION 2: ANIMATED TRUST & COMPATIBILITY TICKER (Netlify Style Marquee) -->
    <section class="py-6 border-b border-gray-100 dark:border-gray-800 bg-gray-900 text-white overflow-hidden">
      <UContainer class="max-w-7xl mx-auto px-4 md:px-8 mb-3 text-center">
        <p class="text-xs font-semibold uppercase tracking-widest text-indigo-400">
          COMPATIBLE WITH ALL SMART TVS, TABLETS, PHONES & VENUE DISPLAY SCREENS
        </p>
      </UContainer>
      
      <div class="relative w-full overflow-hidden py-2">
        <div class="ticker-wrapper flex w-max gap-8 animate-marquee">
          <div
            v-for="(tag, index) in [...trustTags, ...trustTags, ...trustTags]"
            :key="index"
            class="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-gray-800/80 border border-gray-700/60 rounded-none whitespace-nowrap text-gray-200"
          >
            <UIcon :name="tag.icon" class="w-4 h-4 text-indigo-400" />
            <span>{{ tag.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 3: HOW IT WORKS (3-Step Overview) -->
    <section id="how-it-works" class="py-20 md:py-28 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
      <UContainer class="max-w-6xl mx-auto px-4 md:px-8 space-y-16">
        <div class="text-center space-y-4 max-w-3xl mx-auto">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            It runs in the browser
          </h2>
          <p class="text-base md:text-lg text-gray-600 dark:text-gray-300 font-normal leading-relaxed">
            NowNext.live is a real-time event and sports schedule display system that runs directly in the browser. Any internet-connected device can use it. It works on all screen sizes, even tablets and phones.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end pt-4">
          <!-- Left Column: Laptop Mockup (Controller View) -->
          <div class="lg:col-span-7 space-y-6">
            <div class="relative mx-auto max-w-2xl group">
              <!-- Laptop Screen Frame -->
              <div class="relative bg-gray-950 rounded-t-2xl border-[10px] border-gray-800 dark:border-gray-700 shadow-2xl overflow-hidden">
                <!-- Camera dot bar -->
                <div class="h-4 bg-gray-900 flex items-center justify-center border-b border-gray-800">
                  <div class="w-2 h-2 rounded-full bg-gray-700"></div>
                </div>
                <img
                  src="/imgs/demos/nownextlive-controller.png"
                  alt="What the controller sees on NowNext.live"
                  class="w-full h-auto object-cover"
                />
              </div>
              <!-- Laptop Keyboard Base -->
              <div class="relative h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-b-xl border-t border-gray-400 dark:border-gray-600 shadow-lg mx-auto w-[104%] -ml-[2%] flex justify-center items-center">
                <div class="w-16 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
              </div>
              <!-- Shadow -->
              <div class="h-4 bg-black/10 dark:bg-black/40 blur-md rounded-full max-w-[90%] mx-auto mt-1"></div>
            </div>

            <div class="text-center space-y-2 pt-2">
              <UIcon name="i-lucide-arrow-up" class="w-5 h-5 mx-auto text-gray-400 dark:text-gray-500" />
              <p class="text-base font-bold text-gray-900 dark:text-white">
                What the controller sees
              </p>
            </div>
          </div>

          <!-- Right Column: Tablet Mockup (Audience / Speaker Display View) -->
          <div class="lg:col-span-5 space-y-6">
            <div class="relative mx-auto max-w-md group">
              <!-- Tablet Device Frame -->
              <div class="relative bg-gray-950 rounded-3xl border-[12px] border-gray-800 dark:border-gray-700 shadow-2xl p-1 overflow-hidden">
                <!-- Tablet Camera Dot -->
                <div class="absolute top-3 left-1/2 -translate-x-1/2 z-10 w-2.5 h-2.5 rounded-full bg-gray-800 border border-gray-700"></div>
                <div class="rounded-2xl overflow-hidden">
                  <img
                    src="/imgs/demos/nownextlive-display.png"
                    alt="What the audience sees on NowNext.live"
                    class="w-full h-auto object-cover"
                  />
                </div>
              </div>
              <!-- Tablet Shadow -->
              <div class="h-4 bg-black/15 dark:bg-black/50 blur-lg rounded-full max-w-[80%] mx-auto mt-2"></div>
            </div>

            <div class="text-center space-y-2 pt-2">
              <UIcon name="i-lucide-arrow-up" class="w-5 h-5 mx-auto text-gray-400 dark:text-gray-500" />
              <p class="text-base font-bold text-gray-900 dark:text-white">
                What the audience sees
              </p>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- How It Works (3-Step Guide) -->
    <section id="how-it-works" class="py-20 md:py-28 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
      <UContainer class="max-w-6xl mx-auto px-4 md:px-8 space-y-20">
        <div class="text-center space-y-4 max-w-3xl mx-auto">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Get started <br class="sm:hidden" />
            in three easy steps
          </h2>
        </div>

        <div class="space-y-20 lg:space-y-28">
          <div
            v-for="step in steps"
            :key="step.title"
            class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            <!-- Content Column -->
            <div
              :class="[
                'lg:col-span-6 space-y-4',
                step.reverse ? 'lg:order-2' : 'lg:order-1'
              ]"
            >
              <h3 class="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                {{ step.number }} {{ step.title }}
              </h3>
              <p class="text-base md:text-lg text-gray-600 dark:text-gray-300 font-normal leading-relaxed">
                {{ step.description }}
              </p>
            </div>

            <!-- UI Preview Column -->
            <div
              :class="[
                'lg:col-span-6 relative',
                step.reverse ? 'lg:order-1' : 'lg:order-2'
              ]"
            >
              <div class="relative group mx-auto max-w-xl">
                <!-- Action button overlay for step 1 matching reference style -->
                <div v-if="step.actionText" class="absolute -left-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-4 py-2.5 rounded-lg shadow-xl border border-emerald-400/30 transition-transform group-hover:scale-105">
                  <span>{{ step.actionText }}</span>
                  <UIcon :name="step.actionIcon" class="w-4 h-4" />
                </div>
                <div class="p-2 sm:p-3 bg-gray-950 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
                  <img
                    :src="step.image"
                    :alt="step.title"
                    class="w-full h-auto object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- SECTION 4: "START YOUR WAY" LAUNCH PATHWAYS (Netlify "Start your way" Intent Block) -->
    <section class="py-20 md:py-28 border-b border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-950">
      <UContainer class="max-w-6xl mx-auto px-4 md:px-8 space-y-16">
        <div class="text-center space-y-4 max-w-2xl mx-auto">
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            GET GOING
          </span>
          <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight">
            Start Your Way.
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Choose the workflow that fits how you run your event or tournament.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="pathway in startPathways"
            :key="pathway.title"
            class="p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col justify-between space-y-6 hover:border-indigo-500 transition-all hover:shadow-lg"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="w-10 h-10 flex items-center justify-center bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  <UIcon :name="pathway.icon" class="w-5 h-5" />
                </div>
                <span v-if="pathway.badge" class="px-2 py-0.5 text-[10px] font-bold uppercase bg-indigo-600 text-white tracking-wide">
                  {{ pathway.badge }}
                </span>
              </div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block font-mono">
                {{ pathway.tag }}
              </span>
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                {{ pathway.title }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ pathway.description }}
              </p>
            </div>

            <div>
              <NuxtLink
                :to="pathway.to"
                class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 group"
              >
                <span>{{ pathway.linkText }}</span>
                <UIcon name="i-lucide-arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- SECTION 5: CORE FEATURE SWITCHBACKS & QUOTE CALLOUT (Netlify Style Switchbacks) -->
    <section id="features" class="py-20 md:py-28 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
      <UContainer class="max-w-6xl mx-auto px-4 md:px-8 space-y-24">
        <div class="text-center space-y-4 max-w-2xl mx-auto">
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            POWERFUL PLATFORM
          </span>
          <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight">
            Built for Smooth, Stress-Free Events
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Everything you need to keep participants informed and your schedule running on time.
          </p>
        </div>

        <div class="space-y-24">
          <template v-for="(feature, idx) in features" :key="feature.title">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <!-- Content Column -->
              <div
                :class="[
                  'lg:col-span-6 space-y-5',
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

                <ul class="space-y-2 pt-2">
                  <li v-for="bullet in feature.bullets" :key="bullet" class="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-200">
                    <UIcon name="i-lucide-check-circle-2" class="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{{ bullet }}</span>
                  </li>
                </ul>
              </div>

              <!-- Image/Preview Column -->
              <div
                :class="[
                  'lg:col-span-6',
                  feature.reverse ? 'lg:order-1' : 'lg:order-2'
                ]"
              >
                <div class="p-2 bg-gray-950 border border-gray-800 shadow-2xl">
                  <div class="flex items-center justify-between px-3 py-1.5 bg-gray-900 border-b border-gray-800 text-[11px] text-gray-400 font-mono mb-2">
                    <span class="flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-emerald-500" />
                      {{ feature.tag }} MODULE
                    </span>
                    <span>nownext.live</span>
                  </div>
                  <img
                    :src="feature.image"
                    :alt="feature.title"
                    class="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

            <!-- Customer Quote Banner (Inserted after 2nd feature, matching Netlify structure) -->
            <div v-if="idx === 1" class="my-16 p-8 md:p-12 bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 text-white border border-gray-800 relative overflow-hidden">
              <div class="max-w-3xl space-y-4 relative z-10">
                <UIcon name="i-lucide-quote" class="w-10 h-10 text-indigo-400 opacity-60" />
                <blockquote class="text-xl md:text-2xl font-bold tracking-tight leading-snug">
                  "We replaced 3 paper whiteboards and 200 attendee questions with 2 Smart TVs showing live Now & Next match cards. It changed our entire tournament operation."
                </blockquote>
                <div class="pt-2 text-sm text-indigo-300 font-mono uppercase tracking-wider">
                  — Tournament Director, Regional Badminton Open
                </div>
              </div>
            </div>
          </template>
        </div>
      </UContainer>
    </section>

    <!-- SECTION 6: INTERACTIVE TABBED USE CASES SHOWCASE (Netlify "For every kind of web app" Intent Block) -->
    <section class="py-20 md:py-28 border-b border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-950">
      <UContainer class="max-w-6xl mx-auto px-4 md:px-8 space-y-16">
        <div class="text-center space-y-4 max-w-2xl mx-auto">
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            USE CASES & VERTICALS
          </span>
          <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight">
            Designed for Every Venue & Gathering
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Explore how different event organizers use NowNext.live to run on time.
          </p>
        </div>

        <!-- Interactive Tabs Navigation Bar -->
        <div class="flex flex-wrap justify-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
          <button
            v-for="(useCase, idx) in useCasesDetailed"
            :key="useCase.id"
            @click="activeTab = idx"
            :class="[
              'px-5 py-3 font-bold text-sm flex items-center gap-2 transition-all border-b-2 -mb-4',
              activeTab === idx
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 bg-white dark:bg-gray-900 shadow-sm'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            ]"
          >
            <UIcon :name="useCase.icon" class="w-4 h-4" />
            <span>{{ useCase.title }}</span>
          </button>
        </div>

        <!-- Active Tab Detailed Content Panel -->
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 md:p-12 shadow-xl">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <!-- Left Info Column -->
            <div class="lg:col-span-6 space-y-6">
              <div class="space-y-2">
                <span class="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {{ useCasesDetailed[activeTab].tagline }}
                </span>
                <h3 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                  {{ useCasesDetailed[activeTab].title }}
                </h3>
              </div>

              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ useCasesDetailed[activeTab].description }}
              </p>

              <ul class="space-y-2.5">
                <li
                  v-for="bullet in useCasesDetailed[activeTab].bullets"
                  :key="bullet"
                  class="flex items-start gap-2.5 text-sm font-medium text-gray-800 dark:text-gray-200"
                >
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <span>{{ bullet }}</span>
                </li>
              </ul>

              <div class="pt-2">
                <UButton
                  to="/r/generate"
                  label="Create Event Board For This Use Case"
                  trailing-icon="i-lucide-arrow-right"
                  color="primary"
                  variant="solid"
                  size="md"
                  class="rounded-none font-bold"
                />
              </div>
            </div>

            <!-- Right Interactive Display Mock Preview -->
            <div class="lg:col-span-6">
              <div class="bg-gray-950 p-6 border border-gray-800 font-sans space-y-6 text-white shadow-2xl">
                <div class="flex items-center justify-between border-b border-gray-800 pb-3 text-xs font-mono text-gray-400">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{{ useCasesDetailed[activeTab].preview.type }}</span>
                  </div>
                  <span class="text-indigo-400 font-bold">{{ useCasesDetailed[activeTab].preview.court }}</span>
                </div>

                <!-- NOW Display Card -->
                <div class="p-4 bg-indigo-950/80 border-l-4 border-indigo-500 space-y-2">
                  <div class="flex items-center justify-between text-xs font-bold font-mono">
                    <span class="px-2 py-0.5 bg-indigo-600 text-white uppercase">{{ useCasesDetailed[activeTab].preview.now.status }}</span>
                    <span class="text-indigo-300">{{ useCasesDetailed[activeTab].preview.now.time }}</span>
                  </div>
                  <p class="text-lg font-extrabold text-white">
                    {{ useCasesDetailed[activeTab].preview.now.title }}
                  </p>
                </div>

                <!-- NEXT Display Card -->
                <div class="p-4 bg-gray-900 border-l-4 border-cyan-500 space-y-2">
                  <div class="flex items-center justify-between text-xs font-bold font-mono">
                    <span class="px-2 py-0.5 bg-gray-800 text-cyan-400 border border-cyan-800 uppercase">{{ useCasesDetailed[activeTab].preview.next.status }}</span>
                    <span class="text-gray-400">{{ useCasesDetailed[activeTab].preview.next.time }}</span>
                  </div>
                  <p class="text-base font-bold text-gray-200">
                    {{ useCasesDetailed[activeTab].preview.next.title }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- SECTION 7: PLATFORM IMPACT & STATS BAR (Netlify Metric Numbers Intent Block) -->
    <section class="py-16 md:py-24 border-b border-gray-100 dark:border-gray-800 bg-gray-900 text-white">
      <UContainer class="max-w-6xl mx-auto px-4 md:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-800">
          <div v-for="stat in stats" :key="stat.label" class="pt-4 sm:pt-0 px-2 space-y-2">
            <div class="text-4xl md:text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              {{ stat.value }}
            </div>
            <div class="text-lg font-bold text-gray-100">
              {{ stat.label }}
            </div>
            <p class="text-xs text-gray-400">
              {{ stat.subtext }}
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- SECTION 8: FAQ ACCORDION SECTION -->
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

    <!-- SECTION 9: BOTTOM CTA BANNER -->
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

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-33.333%);
  }
}

.animate-marquee {
  animation: marquee 35s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
