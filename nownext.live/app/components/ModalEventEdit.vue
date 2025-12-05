<template>
  <UModal :title="props.title" v-model:open="open">
    <template #body>
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <UFormField label="Event Title" :error="error">
            <UInput v-model="localTitle" class="w-full" />
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
const props = defineProps(['modelValue', 'title'])
const emit = defineEmits(['update:modelValue', 'save'])

const open = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const localTitle = ref('')
const error = ref('')

watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    localTitle.value = props.title
    error.value = ''
  }
})

function submit() {
  if (!localTitle.value || localTitle.value.trim() === '') {
    error.value = 'Title is required'
    return
  }
  error.value = ''
  emit('save', localTitle.value)
  open.value = false
}
</script>
