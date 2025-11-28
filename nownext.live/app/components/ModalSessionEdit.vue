<template>
  <UModal :title="props.title" v-model:open="open" >
    <UButton
        color="white"
        variant="solid"
        icon="i-heroicons-cog-6-tooth"
        class="!rounded-none"
    />

    <template #body>
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
                <label for="username" class="block text-sm/6 font-medium text-gray-900">Title</label>
                <div class="mt-2">
                    <UInput v-model="props.data.title" />
                </div>
            </div>

            <div class="sm:col-span-4">
                <label class="block text-sm/6 font-medium text-gray-900">Sub-title</label>
                <div class="mt-2">
                    <UInput v-model="props.data.subtitle" />
                </div>
            </div>

            <div class="sm:col-span-4">
                <label class="block text-sm/6 font-medium text-gray-900">Time</label>
                <div class="mt-2">
                    <UInputTime v-model="props.data.time" />
                </div>
            </div>
        </div>
    </template>

    <template #footer>
        <UButton label="Cancel" color="neutral" variant="outline" @click="open = false"  />
        <UButton label="Submit" color="neutral" @click="submit"  />
    </template>
    </UModal>
</template>

<script setup>
let open = ref(false)

const props = defineProps(['title','data'])
const emit = defineEmits(['update:session'])

function submit(e) {
    console.log('here')
    console.log(e)
    emit('update:session', props.data)
    open.value = false;
}
</script>
