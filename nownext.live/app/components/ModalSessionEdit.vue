<template>
  <UModal :title="props.title" v-model:open="open">
    <slot>
      <UTooltip text="Edit Session">
        <UButton
          color="white"
          variant="solid"
          icon="i-heroicons-cog-6-tooth"
          class="!rounded-none cursor-pointer"
        />
      </UTooltip>
    </slot>

    <template #body>
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <UFormField label="Title" :error="error">
            <UInput v-model="localData.title" class="w-full h-12" />
          </UFormField>
        </div>
        <div class="sm:col-span-4">
          <UFormField label="Sub-title" hint="Optional">
            <UInput v-model="localData.subtitle" class="w-full h-12" />
          </UFormField>
        </div>
        <div class="sm:col-span-4">
          <UFormField label="Time" hint="Optional">
            <UInputTime v-model="parsedTime" class="w-full h-12" />
          </UFormField>
        </div>
      </div>
    </template>

    <template #footer>
      <UButton
        label="Cancel"
        color="neutral"
        variant="outline"
        @click="open = false"
      />
      <UButton label="Submit" color="neutral" @click="submit" />
    </template>
  </UModal>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Time } from '@internationalized/date'

const open = ref(false)

const props = defineProps(['title', 'data'])
const emit = defineEmits(['update:session'])

const error = ref('')
const localData = ref({ title: '', subtitle: '', time: '', duration: '', timerType: 'duration', appearance: 'countdown' })
const parsedTime = ref(undefined)

watch(open, (newValue) => {
  if (newValue) {
    // Create a deep copy of the data when modal opens
    localData.value = JSON.parse(JSON.stringify(props.data || {}))
    parsedTime.value = parseToTimeInstance(localData.value.time)
    error.value = ''
  }
})

function parseToTimeInstance(val) {
  if (!val) return undefined
  if (val instanceof Time) return val
  if (typeof val === 'string') {
    const trimmed = val.trim()
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      try {
        const parsed = JSON.parse(trimmed)
        if (parsed && typeof parsed.hour === 'number' && typeof parsed.minute === 'number') {
          return new Time(parsed.hour, parsed.minute, parsed.second || 0)
        }
      } catch (e) {
        // fallback to regex / split
      }
    }
    const parts = trimmed.split(':')
    if (parts.length >= 2) {
      const h = parseInt(parts[0], 10)
      const m = parseInt(parts[1], 10)
      const s = parts.length >= 3 ? parseInt(parts[2], 10) : 0
      if (!isNaN(h) && !isNaN(m)) {
        return new Time(
          Math.max(0, Math.min(23, h)),
          Math.max(0, Math.min(59, m)),
          Math.max(0, Math.min(59, isNaN(s) ? 0 : s))
        )
      }
    }
  } else if (typeof val === 'object' && val !== null) {
    const h = val.hour ?? val.hours ?? val.h
    const m = val.minute ?? val.minutes ?? val.m
    const s = val.second ?? val.seconds ?? val.s ?? 0
    if (typeof h === 'number' && typeof m === 'number') {
      return new Time(
        Math.max(0, Math.min(23, h)),
        Math.max(0, Math.min(59, m)),
        Math.max(0, Math.min(59, s))
      )
    }
  }
  return undefined
}

function timeInstanceToHHMM(timeVal) {
  if (!timeVal) return ''
  if (typeof timeVal === 'object' && 'hour' in timeVal && 'minute' in timeVal) {
    const h = String(timeVal.hour).padStart(2, '0')
    const m = String(timeVal.minute).padStart(2, '0')
    return `${h}:${m}`
  }
  return String(timeVal)
}

function submit() {
  if (!localData.value.title || localData.value.title.trim() === '') {
    error.value = 'Title is required'
    return
  }
  error.value = ''
  localData.value.time = timeInstanceToHHMM(parsedTime.value)
  emit('update:session', localData.value)
  open.value = false
}
</script>
