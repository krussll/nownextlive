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
            <UInputTime v-model="localData.time" class="w-full h-12" />
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
const open = ref(false)

const props = defineProps(['title', 'data'])
const emit = defineEmits(['update:session'])

const error = ref('')
const localData = ref({ title: '', subtitle: '', time: '', duration: '', timerType: 'duration', appearance: 'countdown' })

watch(open, (newValue) => {
  if (newValue) {
    // Create a deep copy of the data when modal opens
    localData.value = JSON.parse(JSON.stringify(props.data))
    error.value = ''
  }
})

function formatTimeToHHMM(timeVal) {
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

function submit() {
  if (!localData.value.title || localData.value.title.trim() === '') {
    error.value = 'Title is required'
    return
  }
  error.value = ''
  if (localData.value.time) {
    localData.value.time = formatTimeToHHMM(localData.value.time)
  }
  emit('update:session', localData.value)
  open.value = false
}
</script>
