<template>
  <UPopover v-model:open="isOpen" :popper="{ placement: 'bottom-start' }">
    <!-- Trigger Slot -->
    <slot />

    <!-- Popover Body -->
    <template #content>
      <div class="w-80 sm:w-96 p-5 bg-white border border-gray-200 shadow-xl text-slate-800 space-y-4 rounded-none">
        <!-- Top Mode Selector -->
        <div>
          <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Timer Mode
          </label>
          <select
            v-model="localType"
            class="w-full h-10 px-3 bg-gray-50 border border-gray-300 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-none cursor-pointer"
          >
            <option value="duration">Duration</option>
            <option value="tod">Time of Day</option>
            <option value="countup">Count Up</option>
          </select>
        </div>

        <!-- Duration Field (if mode === 'duration') -->
        <div v-if="localType === 'duration'" class="space-y-2">
          <div class="flex items-center gap-1.5">
            <span class="text-sm font-medium text-slate-700">Duration</span>
            <UTooltip text="Set duration in Hours : Minutes : Seconds">
              <UIcon name="i-heroicons-information-circle-20-solid" class="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-help" />
            </UTooltip>
          </div>

          <!-- HH : MM : SS Inputs -->
          <div class="flex items-center justify-between bg-gray-50 p-2.5 border border-gray-300 rounded-none">
            <div class="flex-1 text-center">
              <input
                v-model="hours"
                type="text"
                maxlength="2"
                placeholder="00"
                class="w-full text-center font-mono text-base font-semibold text-slate-800 bg-transparent focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 py-1"
                @blur="padInput('hours')"
                @input="validateNumeric('hours')"
              />
              <span class="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mt-0.5">HH</span>
            </div>
            <span class="font-mono text-lg font-bold text-slate-400 px-1">:</span>
            <div class="flex-1 text-center">
              <input
                v-model="minutes"
                type="text"
                maxlength="2"
                placeholder="00"
                class="w-full text-center font-mono text-base font-semibold text-slate-800 bg-transparent focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 py-1"
                @blur="padInput('minutes')"
                @input="validateNumeric('minutes')"
              />
              <span class="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mt-0.5">MM</span>
            </div>
            <span class="font-mono text-lg font-bold text-slate-400 px-1">:</span>
            <div class="flex-1 text-center">
              <input
                v-model="seconds"
                type="text"
                maxlength="2"
                placeholder="00"
                class="w-full text-center font-mono text-base font-semibold text-slate-800 bg-transparent focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 py-1"
                @blur="padInput('seconds')"
                @input="validateNumeric('seconds')"
              />
              <span class="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mt-0.5">SS</span>
            </div>
          </div>
        </div>

        <!-- Appearance Field -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium text-slate-700">Appearance</label>
            <button
              type="button"
              class="text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer underline decoration-dotted transition-colors"
              @click="handleApplyToAll"
            >
              Apply to all
            </button>
          </div>
          <select
            v-model="localAppearance"
            class="w-full h-10 px-3 bg-gray-50 border border-gray-300 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-none cursor-pointer"
          >
            <option value="countdown">Countdown</option>
            <option value="countup">Countup</option>
            <option value="tod">Time of day</option>
          </select>
        </div>

        <!-- Dynamic Summary Preview -->
        <div class="pt-1">
          <p class="text-xs text-slate-500 italic">
            {{ summaryText }}
          </p>
        </div>

        <!-- Actions Footer -->
        <div class="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
          <UButton
            label="Cancel"
            color="neutral"
            variant="outline"
            size="sm"
            class="cursor-pointer"
            @click="closePopover"
          />
          <UButton
            label="Save"
            color="primary"
            variant="outline"
            size="sm"
            class="cursor-pointer font-semibold text-emerald-600 border-emerald-500 hover:bg-emerald-50"
            @click="saveTimer"
          />
        </div>
      </div>
    </template>
  </UPopover>
</template>

<script setup>
const props = defineProps({
  session: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:session', 'apply-to-all'])

const isOpen = ref(false)

const localType = ref('duration')
const hours = ref('00')
const minutes = ref('00')
const seconds = ref('00')
const localAppearance = ref('countdown')

// Watch popover open state to load initial values from session prop
watch(isOpen, (newVal) => {
  if (newVal) {
    initFromSession()
  }
})

function initFromSession() {
  localType.value = props.session.timerType || 'duration'
  localAppearance.value = props.session.appearance || 'countdown'

  const durationStr = props.session.duration || ''
  if (durationStr) {
    const parts = durationStr.split(':')
    if (parts.length === 3) {
      hours.value = pad2(parts[0])
      minutes.value = pad2(parts[1])
      seconds.value = pad2(parts[2])
    } else if (parts.length === 2) {
      hours.value = '00'
      minutes.value = pad2(parts[0])
      seconds.value = pad2(parts[1])
    } else {
      hours.value = '00'
      minutes.value = '00'
      seconds.value = '00'
    }
  } else {
    hours.value = '00'
    minutes.value = '00'
    seconds.value = '00'
  }
}

function pad2(val) {
  const num = parseInt(val, 10)
  if (isNaN(num) || num < 0) return '00'
  return num < 10 ? `0${num}` : `${num}`
}

function padInput(field) {
  if (field === 'hours') hours.value = pad2(hours.value)
  if (field === 'minutes') minutes.value = pad2(minutes.value)
  if (field === 'seconds') seconds.value = pad2(seconds.value)
}

function validateNumeric(field) {
  let val = ''
  if (field === 'hours') val = hours.value
  if (field === 'minutes') val = minutes.value
  if (field === 'seconds') val = seconds.value

  val = val.replace(/\D/g, '')
  if (field === 'hours') hours.value = val
  if (field === 'minutes') minutes.value = val
  if (field === 'seconds') seconds.value = val
}

const totalSeconds = computed(() => {
  const h = parseInt(hours.value, 10) || 0
  const m = parseInt(minutes.value, 10) || 0
  const s = parseInt(seconds.value, 10) || 0
  return (h * 3600) + (m * 60) + s
})

const formattedDuration = computed(() => {
  if (totalSeconds.value === 0) return ''
  const h = pad2(hours.value)
  const m = pad2(minutes.value)
  const s = pad2(seconds.value)
  return `${h}:${m}:${s}`
})

const summaryText = computed(() => {
  if (localType.value === 'tod' || localAppearance.value === 'tod') {
    return 'Displaying current time of day.'
  }
  if (totalSeconds.value === 0) {
    return 'No duration set.'
  }

  const h = parseInt(hours.value, 10) || 0
  const m = parseInt(minutes.value, 10) || 0
  const s = parseInt(seconds.value, 10) || 0

  const parts = []
  if (h > 0) parts.push(`${h} hr${h > 1 ? 's' : ''}`)
  if (m > 0) parts.push(`${m} min${m > 1 ? 's' : ''}`)
  if (s > 0 && h === 0) parts.push(`${s} sec${s > 1 ? 's' : ''}`)

  const timeDesc = parts.join(' ') || `${totalSeconds.value} secs`

  if (localAppearance.value === 'countup') {
    return `Counting up to ${timeDesc}.`
  }
  return `Counting down from ${timeDesc}.`
})

function closePopover() {
  isOpen.value = false
}

function saveTimer() {
  const updatedSession = {
    ...props.session,
    duration: formattedDuration.value,
    timerType: localType.value,
    appearance: localAppearance.value
  }
  emit('update:session', updatedSession)
  isOpen.value = false
}

function handleApplyToAll() {
  emit('apply-to-all', {
    duration: formattedDuration.value,
    timerType: localType.value,
    appearance: localAppearance.value
  })
}
</script>
