<template>
  <UModal title="Output Links" v-model:open="isOpen">
    <template #body>
      <div class="space-y-6 py-2">
        <p class="text-sm text-slate-600 dark:text-slate-300">
          Share or display these links to present live sessions and schedule output.
        </p>

        <!-- Main Display URL (All Spaces) -->
        <UFormField label="Main Display URL (All Spaces)">
          <div class="flex items-center gap-2 w-full mt-1">
            <UInput
              :model-value="outputUrl"
              readonly
              class="w-full h-12 font-mono text-sm"
              @focus="$event.target.select()"
            />
            <UButton
              :color="copiedMain ? 'green' : 'primary'"
              :icon="copiedMain ? 'i-heroicons-check' : 'i-heroicons-clipboard-document'"
              :label="copiedMain ? 'Copied' : 'Copy'"
              class="h-12 px-4 rounded-none cursor-pointer flex-shrink-0"
              @click="copyLink(outputUrl, 'main')"
            />
          </div>
        </UFormField>

        <!-- Full Schedule URL -->
        <UFormField label="Full Event Schedule URL">
          <div class="flex items-center gap-2 w-full mt-1">
            <UInput
              :model-value="scheduleUrl"
              readonly
              class="w-full h-12 font-mono text-sm"
              @focus="$event.target.select()"
            />
            <UButton
              :color="copiedSchedule ? 'green' : 'primary'"
              :icon="copiedSchedule ? 'i-heroicons-check' : 'i-heroicons-clipboard-document'"
              :label="copiedSchedule ? 'Copied' : 'Copy'"
              class="h-12 px-4 rounded-none cursor-pointer flex-shrink-0"
              @click="copyLink(scheduleUrl, 'schedule')"
            />
          </div>
        </UFormField>

        <!-- Single Space Displays -->
        <div v-if="spaces && spaces.length > 0" class="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
          <h4 class="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Single Space Display URLs
          </h4>
          <div class="space-y-3 max-h-60 overflow-y-auto pr-1">
            <div
              v-for="space in spaces"
              :key="space.id || space.title"
              class="bg-slate-50 dark:bg-slate-900 p-3 border border-slate-200 dark:border-slate-800 space-y-1.5"
            >
              <div class="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>{{ space.title }}</span>
                <span class="text-slate-400 font-mono">/s/{{ space.id }}</span>
              </div>
              <div class="flex items-center gap-2 w-full">
                <UInput
                  :model-value="getSpaceUrl(space)"
                  readonly
                  class="w-full h-10 font-mono text-xs"
                  @focus="$event.target.select()"
                />
                <UButton
                  :color="copiedSpaceId === (space.id || space.title) ? 'green' : 'primary'"
                  :icon="copiedSpaceId === (space.id || space.title) ? 'i-heroicons-check' : 'i-heroicons-clipboard-document'"
                  :label="copiedSpaceId === (space.id || space.title) ? 'Copied' : 'Copy'"
                  size="xs"
                  class="h-10 px-3 rounded-none cursor-pointer flex-shrink-0"
                  @click="copyLink(getSpaceUrl(space), space.id || space.title)"
                />
              </div>
            </div>
          </div>
        </div>
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
  },
  spaces: {
    type: Array,
    default: () => []
  }
})

const isOpen = defineModel('open', { default: false })
const toast = useToast()
const copiedMain = ref(false)
const copiedSchedule = ref(false)
const copiedSpaceId = ref(null)

const baseUrl = computed(() => {
  if (import.meta.client) {
    return window.location.origin
  }
  return 'https://www.nownext.live'
})

const outputUrl = computed(() => `${baseUrl.value}/r/${props.eventId}`)
const scheduleUrl = computed(() => `${baseUrl.value}/r/${props.eventId}/schedule`)

const getSpaceUrl = (space) => {
  const spaceIdentifier = space.id || space.title
  return `${baseUrl.value}/r/${props.eventId}/s/${spaceIdentifier}`
}

const copyLink = async (text, targetKey) => {
  try {
    await navigator.clipboard.writeText(text)
    if (targetKey === 'main') {
      copiedMain.value = true
      setTimeout(() => { copiedMain.value = false }, 2500)
    } else if (targetKey === 'schedule') {
      copiedSchedule.value = true
      setTimeout(() => { copiedSchedule.value = false }, 2500)
    } else {
      copiedSpaceId.value = targetKey
      setTimeout(() => { copiedSpaceId.value = null }, 2500)
    }
    toast.add({
      title: 'Copied to clipboard',
      description: 'Link has been copied to your clipboard.',
      color: 'green'
    })
  } catch (err) {
    toast.add({
      title: 'Failed to copy',
      description: 'Could not copy link to clipboard.',
      color: 'red'
    })
  }
}
</script>
