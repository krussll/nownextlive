<template>
  <UModal :title="props.title" v-model:open="open">
    <UButton
      color="white"
      variant="solid"
      icon="i-heroicons-cog-6-tooth"
      class="!rounded-none"
    />

    <template #body>
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <UFormField label="Title">
            <UInput v-model="props.data.title" />
          </UFormField>
        </div>
        <div class="sm:col-span-4">
          <UFormField label="Sub-title" hint="Optional">
            <UInput v-model="props.data.subtitle" />
          </UFormField>
        </div>
        <div class="sm:col-span-4">
          <UFormField label="Time" hint="Optional">
            <UInputTime v-model="props.data.time" />
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
const emit = defineEmits(['update:session'])

function submit(e) {
  emit('update:session', props.data)
  open.value = false
}
</script>
