<template>
  <UContainer class="py-16 max-w-2xl space-y-10">
    <section class="text-center space-y-3">
      <h1 class="text-4xl font-bold">Contact Us</h1>
      <p class="text-gray-600">
        Have a question about NowNext.live? Send us a message and we'll get back to you.
      </p>
    </section>

    <UCard>
      <form @submit.prevent="submitForm" class="space-y-6">

        <!-- Name -->
        <UFormField label="Your Name" name="name">
          <UInput v-model="form.name" placeholder="John Smith" :ui="{
                  base: 'rounded-none h-12'
                }" class="w-full" required />
        </UFormField>

        <!-- Email -->
        <UFormField label="Email Address" name="email">
          <UInput v-model="form.email" type="email" placeholder="you@example.com":ui="{
                  base: 'rounded-none h-12'
                }" class="w-full" required />
        </UFormField>

        <!-- Message -->
        <UFormField label="Message" name="message">
          <UTextarea
            v-model="form.message"
            placeholder="How can we help?"
            rows="6"
            :ui="{
                  base: 'rounded-none h-12'
                }"
            class="w-full"
            required
          />
        </UFormField>

        <!-- Submit -->
        <UButton
          type="submit"
          color="primary"
          :loading="loading"
          class="w-full h-12 block"
        >
          Send Message
        </UButton>

        <!-- Feedback Messages -->
        <p v-if="success" class="text-green-600 text-center">
          Message sent successfully. We'll be in touch.
        </p>
        <p v-if="error" class="text-red-600 text-center">
          Something went wrong. Please try again later.
        </p>
      </form>
    </UCard>
  </UContainer>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const loading = ref(false)
const success = ref(false)
const error = ref(false)

async function submitForm() {
  loading.value = true
  success.value = false
  error.value = false

  const { data, error: fetchError } = await useFetch('/api/contact', {
    method: 'POST',
    body: form.value
  })

  loading.value = false

  if (fetchError.value) {
    error.value = true
  } else {
    success.value = true
    form.value = { name: '', email: '', message: '' }
  }
}
</script>
