<template>
  <ClientOnly>
    <UModal v-model:open="isOpen" title="NowNext.live is Brand New">
      <template #body>
        <div class="space-y-4 py-2">
          <div class="flex items-start gap-3 bg-indigo-50 dark:bg-indigo-950/40 p-3.5 border border-indigo-100 dark:border-indigo-900/60">
            <UIcon name="i-lucide-sparkles" class="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
            <p class="text-sm text-indigo-950 dark:text-indigo-200">
              Thanks for exploring our documentation and blog! NowNext.live is brand new and actively being improved.
            </p>
          </div>

          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            I'm actively building new features and would love to hear your thoughts. If you have any questions, suggestions, or need help setting up live displays for your event, please don't hesitate to reach out directly.
          </p>

          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-2 overflow-hidden">
              <UIcon name="i-lucide-mail" class="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span class="text-xs sm:text-sm font-mono text-gray-800 dark:text-gray-200 truncate select-all">
                reecewilliams8@googlemail.com
              </span>
            </div>
            <UButton
              :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
              :label="copied ? 'Copied' : 'Copy'"
              :color="copied ? 'success' : 'neutral'"
              variant="ghost"
              size="xs"
              class="rounded-none cursor-pointer flex-shrink-0"
              @click="copyEmail"
            />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex items-center justify-end gap-3 w-full">
          <UButton
            label="Close"
            color="neutral"
            variant="outline"
            class="rounded-none font-medium"
            @click="isOpen = false"
          />
          <UButton
            to="mailto:reecewilliams8@googlemail.com?subject=Question%20about%20NowNext.live"
            target="_blank"
            icon="i-lucide-mail"
            label="Send Email"
            color="primary"
            class="rounded-none font-semibold hover:shadow-lg"
          />
        </div>
      </template>
    </UModal>
  </ClientOnly>
</template>

<script setup lang="ts">
const route = useRoute()
const isOpen = ref(false)
const copied = ref(false)

const feedbackModalSeen = useCookie<string | null>('nn_feedback_modal_seen', {
  maxAge: 60 * 60 * 24 * 365,
  path: '/',
  default: () => null
})

const isEligibleRoute = (path: string): boolean => {
  return path.startsWith('/blog') || path.startsWith('/docs')
}

let timerInterval: ReturnType<typeof setInterval> | null = null
let accumulatedSeconds = 0
const TARGET_SECONDS = 15

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

const startTimer = () => {
  if (!import.meta.client) return
  if (timerInterval || feedbackModalSeen.value === 'true') return

  timerInterval = setInterval(() => {
    // If cookie was set in another tab or action, stop immediately
    if (feedbackModalSeen.value === 'true') {
      stopTimer()
      return
    }

    // Only count active time on eligible routes while tab is visible
    if (typeof document !== 'undefined' && document.hidden) {
      return
    }

    if (isEligibleRoute(route.path)) {
      accumulatedSeconds++
      if (accumulatedSeconds >= TARGET_SECONDS) {
        isOpen.value = true
        feedbackModalSeen.value = 'true'
        stopTimer()
      }
    }
  }, 1000)
}

const copyEmail = async () => {
  try {
    if (navigator?.clipboard) {
      await navigator.clipboard.writeText('reecewilliams8@googlemail.com')
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    }
  } catch (e) {
    console.error('Failed to copy email to clipboard', e)
  }
}

// Watch route changes to pause/resume tracking if navigating in and out of blog/docs
watch(
  () => route.path,
  (newPath) => {
    if (!import.meta.client) return
    if (feedbackModalSeen.value === 'true') {
      stopTimer()
      return
    }
    if (isEligibleRoute(newPath)) {
      startTimer()
    }
  }
)

// Ensure cookie is marked as seen when modal is opened or closed
watch(isOpen, (val) => {
  if (val && import.meta.client) {
    feedbackModalSeen.value = 'true'
  }
})

onMounted(() => {
  if (feedbackModalSeen.value !== 'true' && isEligibleRoute(route.path)) {
    startTimer()
  }
})

onBeforeUnmount(() => {
  stopTimer()
})
</script>
