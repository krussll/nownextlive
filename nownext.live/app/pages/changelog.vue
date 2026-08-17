<script setup lang="ts">
interface ChangelogItem {
  title: string
  description?: string
  tag?: string
}

interface Release {
  version: string
  date: string
  isLatest?: boolean
  features?: ChangelogItem[]
  improvements?: ChangelogItem[]
  fixes?: ChangelogItem[]
}

const releases: Release[] = [
  {
    version: 'Version 1.6.3-beta',
    date: '2026-08-17',
    isLatest: true,
    features: [
      {
        title: 'Single-Space Output Display Route',
        description: 'Added dedicated `/r/[id]/s/[spaceId]` display views so individual court or room screens can broadcast isolated session schedules.'
      },
      {
        title: 'Session Edit from Label Trigger',
        description: 'Clicking any session label in the controller dashboard now directly opens the session edit modal for rapid updates.'
      },
      {
        title: 'Session Duration Support',
        description: 'Full database migration, API payload, and stored procedure support added for tracking custom session durations.'
      },
      {
        title: 'Timer Edit Inputs',
        description: 'Added direct inline inputs to quickly adjust timer properties directly on the controller dashboard.'
      }
    ],
    fixes: [
      {
        title: 'Database Stored Procedure Ambiguity',
        description: 'Resolved candidate function ambiguity in Supabase by dropping obsolete overloaded `update_full_event` and `get_event` procedures.'
      },
      {
        title: 'Unauthenticated & Unclaimed Event Queries',
        description: 'Fixed profile table queries when viewing unclaimed events or browsing without authentication.'
      },
      {
        title: 'UUID Syntax Error Handling',
        description: 'Sanitized `now_session_id` and session payload fields to prevent invalid UUID syntax errors on empty strings.'
      },
      {
        title: 'Product Structured Data Logo Reference',
        description: 'Added missing logo image field to Product structured data on the pricing page for enhanced search snippet previews.'
      }
    ]
  },
  {
    version: 'Version 1.6.2',
    date: '2026-08-15',
    features: [
      {
        title: 'Timer Edit Popover Component',
        description: 'Integrated a popover editor into the controller dashboard for quick duration and label tweaks without leaving the main view.'
      }
    ],
    improvements: [
      {
        title: 'Start Time Placeholder Clarity',
        description: 'Updated start time input placeholder text to "Add start time" across event configuration forms.'
      },
      {
        title: 'Documentation & Workflow Enhancements',
        description: 'Updated developer documentation structure, feature branch guidelines, and release PR workflows.'
      }
    ]
  },
  {
    version: 'Version 1.6.1',
    date: '2026-08-14',
    features: [
      {
        title: 'Output Links Sharing Modal',
        description: 'Added a modal to instantly generate, copy, and share public output display links for viewers, schedule grids, and controllers.'
      },
      {
        title: 'Use Cases Knowledge Hub',
        description: 'Launched dedicated `/use-cases` guide pages for sports tournaments, conferences, broadcast studios, corporate meetings, and schools.'
      },
      {
        title: 'Blog Article Tagging',
        description: 'Added topic tags across blog posts for easy filtering and improved reader navigation.'
      }
    ],
    improvements: [
      {
        title: 'Homepage Layout & Copy Overhaul',
        description: 'Redesigned landing page section flow and value proposition copy inspired by modern event signage aesthetics.'
      },
      {
        title: 'Comprehensive Site SEO',
        description: 'Implemented canonical links, OpenGraph cards, Twitter preview cards, and JSON-LD schema markup across all public routes.'
      }
    ]
  },
  {
    version: 'Version 1.6.0',
    date: '2025-12-19',
    features: [
      {
        title: 'Display Footers & Connection Limits',
        description: 'Added subtle footer bars on display screens showing event connection status and helpful notifications when approaching plan limits.'
      },
      {
        title: 'Multi-Screen Access Control',
        description: 'Improved real-time presence checks and basic access controls for public display links.'
      }
    ]
  }
]

useSeoMeta({
  title: 'Changelog & Product Updates | NowNext.live',
  description: 'Track the latest features, improvements, and bug fixes added to NowNext.live real-time schedule displays.',
  ogTitle: 'NowNext.live Changelog & Release Notes',
  ogDescription: 'Track recent updates, new features, performance improvements, and bug fixes for NowNext.live.',
  ogImage: 'https://nownext.live/imgs/logo.png',
  ogUrl: 'https://nownext.live/changelog',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'NowNext.live Changelog',
  twitterDescription: 'Track recent updates, new features, and bug fixes on NowNext.live.'
})

useHead({
  link: [
    { rel: 'canonical', key: 'canonical', href: 'https://nownext.live/changelog' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            name: 'NowNext.live Changelog',
            url: 'https://nownext.live/changelog',
            description: 'Product updates and release history for NowNext.live real-time scheduling.'
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://nownext.live'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Changelog',
                item: 'https://nownext.live/changelog'
              }
            ]
          }
        ]
      })
    }
  ]
})
</script>

<template>
  <main class="py-12 md:py-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
    <UContainer class="max-w-3xl mx-auto px-4 md:px-6">
      <!-- Header -->
      <header class="mb-10 space-y-4">
        <NuxtLink to="/" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors gap-1">
          &larr; Back to Home
        </NuxtLink>
        <div class="flex items-center justify-between flex-wrap gap-3">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
            Changelog
          </h1>
          <span class="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800">
            Latest: v1.6.3-beta
          </span>
        </div>
        <p class="text-gray-600 dark:text-gray-300 text-base leading-relaxed border-b border-gray-100 dark:border-gray-800 pb-4">
          Stay up to date with new features, enhancements, and fixes deployed to NowNext.live.
        </p>
      </header>

      <!-- Release List -->
      <div class="space-y-12">
        <article
          v-for="(release, index) in releases"
          :key="release.version"
          class="space-y-6"
        >
          <!-- Release Version & Date Header -->
          <div class="flex items-baseline justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <div class="flex items-center gap-3">
              <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                {{ release.version }}
              </h2>
              <span
                v-if="release.isLatest"
                class="px-2 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded"
              >
                Latest Release
              </span>
            </div>
            <time :datetime="release.date" class="text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ new Date(release.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
            </time>
          </div>

          <!-- Features Section -->
          <div v-if="release.features?.length" class="space-y-3">
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900">
                <UIcon name="i-lucide-check-circle" class="w-3.5 h-3.5" />
                Features
              </span>
            </div>
            <ul class="space-y-3 pl-1">
              <li v-for="item in release.features" :key="item.title" class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex items-start gap-2.5">
                <span class="text-emerald-500 font-bold select-none pt-0.5">&bull;</span>
                <div>
                  <strong class="font-semibold text-gray-900 dark:text-white">{{ item.title }}</strong>
                  <span v-if="item.description" class="text-gray-600 dark:text-gray-400"> — {{ item.description }}</span>
                </div>
              </li>
            </ul>
          </div>

          <!-- Improvements Section -->
          <div v-if="release.improvements?.length" class="space-y-3">
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900">
                <UIcon name="i-lucide-layers" class="w-3.5 h-3.5" />
                Improvements
              </span>
            </div>
            <ul class="space-y-3 pl-1">
              <li v-for="item in release.improvements" :key="item.title" class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex items-start gap-2.5">
                <span class="text-blue-500 font-bold select-none pt-0.5">&bull;</span>
                <div>
                  <strong class="font-semibold text-gray-900 dark:text-white">{{ item.title }}</strong>
                  <span v-if="item.description" class="text-gray-600 dark:text-gray-400"> — {{ item.description }}</span>
                </div>
              </li>
            </ul>
          </div>

          <!-- Fixes Section -->
          <div v-if="release.fixes?.length" class="space-y-3">
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900">
                <UIcon name="i-lucide-wrench" class="w-3.5 h-3.5" />
                Fixes
              </span>
            </div>
            <ul class="space-y-3 pl-1">
              <li v-for="item in release.fixes" :key="item.title" class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex items-start gap-2.5">
                <span class="text-amber-500 font-bold select-none pt-0.5">&bull;</span>
                <div>
                  <strong class="font-semibold text-gray-900 dark:text-white">{{ item.title }}</strong>
                  <span v-if="item.description" class="text-gray-600 dark:text-gray-400"> — {{ item.description }}</span>
                </div>
              </li>
            </ul>
          </div>

          <hr v-if="index < releases.length - 1" class="border-gray-100 dark:border-gray-800 pt-4" />
        </article>
      </div>

      <!-- Bottom CTA Box (identical to use case template) -->
      <div class="mt-16 p-8 bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-gray-950 dark:to-gray-900 border border-indigo-100 dark:border-gray-800 rounded-none text-center space-y-4">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
          Ready to Streamline Your Event?
        </h3>
        <p class="text-gray-600 dark:text-gray-300 max-w-lg mx-auto text-sm">
          Set up your live-updating court or venue schedules in under 10 minutes. No installation required.
        </p>
        <div>
          <UButton
            to="/r/generate"
            label="Try NowNext.live For Free"
            trailing-icon="i-lucide-arrow-right"
            color="primary"
            variant="solid"
            size="lg"
            class="rounded-none font-bold"
          />
        </div>
      </div>

      <!-- Page Footer / Navigation -->
      <div class="mt-12 pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
        <NuxtLink to="/" class="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline gap-1">
          &larr; Return to Home
        </NuxtLink>
      </div>
    </UContainer>
  </main>
</template>
