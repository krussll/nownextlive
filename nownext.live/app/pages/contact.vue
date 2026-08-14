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

<script setup lang="ts">
import { ref } from 'vue'

useSeoMeta({
  title: 'Contact Us - Get Support & Feature Enquiries | NowNext.live',
  description: 'Have a question about NowNext.live or need help setting up live schedule displays for your event? Get in touch with our team.',
  ogTitle: 'Contact NowNext.live Support & Enquiries',
  ogDescription: 'Get in touch with the team behind NowNext.live real-time schedule signage platform.',
  ogImage: 'https://nownext.live/imgs/logo.png',
  ogUrl: 'https://nownext.live/contact',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Contact NowNext.live',
  twitterDescription: 'Get in touch with the team behind NowNext.live real-time schedule signage platform.'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://nownext.live/contact' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'ContactPage',
            name: 'Contact NowNext.live',
            description: 'Contact us for questions about NowNext.live real-time schedule signage platform.',
            url: 'https://nownext.live/contact'
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://nownext.live'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Contact',
                item: 'https://nownext.live/contact'
              }
            ]
          }
        ]
      })
    }
  ]
})

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
