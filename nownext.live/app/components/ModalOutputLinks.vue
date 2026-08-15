<template>
  <UModal title="Output Links" v-model:open="isOpen">
    <template #body>
      <div class="space-y-4 py-2">
        <p class="text-sm text-slate-600 dark:text-slate-300">
          Share or display this link to present live sessions and schedule output.
        </p>

        <UFormField label="Display Output URL">
          <div class="flex items-center gap-2 w-full mt-1">
            <UInput
              :model-value="outputUrl"
              readonly
              class="w-full h-12 font-mono text-sm"
              @focus="$event.target.select()"
            />
            <UButton
              :color="copied ? 'green' : 'primary'"
              :icon="copied ? 'i-heroicons-check' : 'i-heroicons-clipboard-document'"
              :label="copied ? 'Copied' : 'Copy'"
              class="h-12 px-4 rounded-none cursor-pointer flex-shrink-0"
              @click="copyToClipboard"
            />
          </div>
        </UFormField>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end w-full">
        <UButton
          label="Close"
          color="neutral"
          variant="outline"
          class="rounded-none cursor-pointer"
          @click="isOpen = false"
        />
      </div>
    </template>
  </UModal>
</template>

<script setup>
const props = defineProps({
  eventId: {
    type: String,
    required: true
  }
})

const isOpen = defineModel('open', { default: false })
const toast = useToast()
const copied = ref(false)

const outputUrl = computed(() => {
  if (import.meta.client) {
    return `${window.location.origin}/r/${props.eventId}`
  }
  return `https://www.nownext.live/r/${props.eventId}`
})

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(outputUrl.value)
    copied.value = true
    toast.add({
      title: 'Copied to clipboard',
      description: 'Output link has been copied to your clipboard.',
      color: 'green'
    })
    setTimeout(() => {
      copied.value = false
    }, 2500)
  } catch (err) {
    toast.add({
      title: 'Failed to copy',
      description: 'Could not copy link to clipboard.',
      color: 'red'
    })
  }
}
</script>
