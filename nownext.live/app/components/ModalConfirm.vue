<template>
  <UModal :title="title" v-model:open="isOpen">
    <template #body>
      <div class="py-4">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ message }}
        </p>
      </div>
    </template>

    <template #footer>
      <UButton label="Cancel" color="white" @click="isOpen = false" />
      <UButton label="Confirm" color="red" @click="confirm" />
    </template>
  </UModal>
</template>

<script setup>
const props = defineProps({
  title: String,
  message: String
})

const isOpen = defineModel('open', { default: false })
const emit = defineEmits(['confirm'])

const confirm = () => {
  emit('confirm')
  isOpen.value = false
}
</script>
