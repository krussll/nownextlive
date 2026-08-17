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

    <!-- Sessions List -->
    <div class="flex-grow flex flex-col">
      <div
        v-for="session in sessions"
        :key="session.id"
        :class="[
          'px-4 py-4 border-b last:border-b-0 flex gap-4 relative overflow-hidden',
          session.id === nowSessionId ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
        ]"
      >
        <!-- Time Column -->
        <div class="w-20 flex-shrink-0">
          <span v-if="session.id === nowSessionId" class="text-xs uppercase tracking-widest font-semibold text-slate-300 block">Now</span>
          <span v-if="session.time" class="font-mono text-xs block" :class="session.id === nowSessionId ? 'text-slate-300' : 'text-slate-500'">{{ formatDisplayTime(session.time) }}</span>
        </div>

        <!-- Content Column -->
        <div class="flex-auto">
          <p :class="['font-semibold leading-tight', session.id === nowSessionId ? 'text-xl' : 'text-base']">
            {{ session.title }}
          </p>
          <p 
            v-if="session.subtitle" 
            :class="['text-sm mt-1', session.id === nowSessionId ? 'text-slate-300' : 'text-slate-500']"
          >
            {{ session.subtitle }}
          </p>
        </div>

        <!-- Duration Progress Bar for Active NOW Session -->
        <div
          v-if="session.id === nowSessionId && getSessionDurationSeconds(session.duration) > 0"
          class="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800 overflow-hidden"
        >
          <div
            class="h-full bg-emerald-500 rounded-r shadow-[0_0_8px_rgba(16,185,129,0.6)] progress-bar-fill"
            :style="{ animationDuration: `${getSessionDurationSeconds(session.duration)}s` }"
            :key="`fsc-progress-${session.id}-${session.duration}`"
          />
        </div>
      </div>
      
      <!-- Empty State if no sessions -->
      <div v-if="sessions.length === 0" class="p-4 text-center text-slate-400 text-sm">
        No sessions scheduled
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  sessions: {
    type: Array,
    default: () => []
  },
  nowSessionId: String
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

function getSessionDurationSeconds(durationStr) {
  if (!durationStr || typeof durationStr !== 'string') return 0
  const parts = durationStr.trim().split(':')
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
}
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

