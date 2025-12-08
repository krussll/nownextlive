<template>
  <UModal :title="props.title" v-model:open="open">
    <UTooltip text="Edit Space">
      <UButton
        color="white"
        variant="solid"
        icon="i-heroicons-cog-6-tooth"
        class="!rounded-none cursor-pointer"
      />
    </UTooltip>

    <template #body>
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <UFormField label="Title" :error="error">
            <UInput v-model="localData.title" class="w-full h-12" />
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
let open = ref(false)

const props = defineProps(['title', 'data'])
const emit = defineEmits(['update:space'])

const error = ref('')
const localData = ref({ title: '' })

watch(open, (newValue) => {
  if (newValue) {
    // Create a deep copy of the data when modal opens
    localData.value = JSON.parse(JSON.stringify(props.data))
    error.value = ''
  }
})

function submit(e) {
  if (!localData.value.title || localData.value.title.trim() === '') {
    error.value = 'Title is required'
    return
  }
  error.value = ''
  emit('update:space', localData.value)
  open.value = false
}
</script>
