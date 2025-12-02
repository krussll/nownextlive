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
          <UFormField label="Title">
            <UInput v-model="props.data.title" />
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

function submit(e) {
  emit('update:space', props.data)
  open.value = false
}
</script>
