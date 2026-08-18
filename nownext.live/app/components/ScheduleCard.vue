<template>
  <div
    class="border rounded-none overflow-hidden bg-white border-slate-300 flex flex-col h-full"
  >
    <!-- Header -->
    <div
      class="px-4 py-3 bg-white text-xs uppercase tracking-wider text-slate-500 font-semibold border-b"
    >
      <h3 class="text-base truncate">{{ title }}</h3>
    </div>

    <!-- Content -->
    <template v-if="now || next">
      <!-- NOW -->
      <div
        v-if="now"
        class="bg-slate-900 text-white px-4 py-6 flex gap-4 flex-1 relative overflow-hidden"
      >
        <div>
          <p
            class="py-1 text-xs uppercase tracking-widest font-semibold text-slate-300 mb-1"
          >
            Now
          </p>
          <span v-if="formattedNowTime" class="font-mono">{{ formattedNowTime }}</span>
        </div>
        <div class="flex-auto">
          <p class="text-xl font-semibold leading-tight">{{ now }}</p>
          <p v-if="nowGroup" class="text-sm text-slate-300 mt-1">
            {{ nowGroup }}
          </p>
        </div>

        <!-- Duration Progress Bar -->
        <div
          v-if="durationSeconds > 0"
          class="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800 overflow-hidden"
        >
          <div
            class="h-full bg-emerald-500 rounded-r shadow-[0_0_8px_rgba(16,185,129,0.6)] progress-bar-fill"
            :style="{ animationDuration: `${durationSeconds}s` }"
            :key="`sc-progress-${now}-${nowDuration}`"
          />
        </div>
      </div>

      <!-- NEXT -->
      <div
        v-if="next"
        class="px-4 py-4 bg-white flex gap-4 border-t border-slate-100 flex-1"
      >
        <div>
          <p
            class="py-1 text-xs uppercase tracking-widest font-semibold text-slate-400 mb-1"
          >
            Next
          </p>
          <span v-if="formattedNextTime" class="font-mono text-slate-600">{{
            formattedNextTime
          }}</span>
        </div>
        <div class="flex-auto">
          <p class="text-slate-700 font-medium leading-tight">{{ next }}</p>
          <p v-if="nextGroup" class="text-sm text-slate-500 mt-1">
            {{ nextGroup }}
          </p>
        </div>
      </div>
      <div v-else class="flex-1 bg-white border-t border-slate-100"></div>
    </template>
    
    <!-- Empty State -->
    <div v-else class="flex-grow flex items-center justify-center text-slate-400 text-sm p-4">
      No sessions scheduled
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  now: String,
  nowGroup: String,
  nowTime: [String, Object],
  nowDuration: String,
  next: String,
  nextGroup: String,
  nextTime: [String, Object]
})

function formatDisplayTime(timeVal) {
  if (!timeVal) return ''
  let obj = timeVal
  if (typeof timeVal === 'string') {
    const trimmed = timeVal.trim()
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      try {
        obj = JSON.parse(trimmed)
      } catch (e) {
        obj = timeVal
      }
    } else {
      const parts = trimmed.split(':')
      if (parts.length >= 2) {
        const h = String(parseInt(parts[0], 10) || 0).padStart(2, '0')
        const m = String(parseInt(parts[1], 10) || 0).padStart(2, '0')
        return `${h}:${m}`
      }
      return trimmed
    }
  }

  if (typeof obj === 'object' && obj !== null) {
    const hourVal = obj.hour ?? obj.hours ?? obj.h
    const minVal = obj.minute ?? obj.minutes ?? obj.m
    if (hourVal !== undefined || minVal !== undefined) {
      const h = String(parseInt(hourVal, 10) || 0).padStart(2, '0')
      const m = String(parseInt(minVal, 10) || 0).padStart(2, '0')
      return `${h}:${m}`
    }
  }

  return String(timeVal)
}

const formattedNowTime = computed(() => formatDisplayTime(props.nowTime))
const formattedNextTime = computed(() => formatDisplayTime(props.nextTime))

const durationSeconds = computed(() => {
  if (!props.nowDuration || typeof props.nowDuration !== 'string') return 0
  const parts = props.nowDuration.trim().split(':')
  if (parts.length === 3) {
    const h = parseInt(parts[0], 10) || 0
    const m = parseInt(parts[1], 10) || 0
    const s = parseInt(parts[2], 10) || 0
    return h * 3600 + m * 60 + s
  } else if (parts.length === 2) {
    const m = parseInt(parts[0], 10) || 0
    const s = parseInt(parts[1], 10) || 0
    return m * 60 + s
  } else if (parts.length === 1) {
    const val = parseInt(parts[0], 10) || 0
    return val * 60
  }
  return 0
})
</script>

<style scoped>
@keyframes progressLinear {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

.progress-bar-fill {
  width: 0%;
  animation-name: progressLinear;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
</style>

