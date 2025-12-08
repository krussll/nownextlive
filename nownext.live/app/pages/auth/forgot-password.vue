<script setup lang="ts">
const email = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

useSeoMeta({
  title: 'Forgot Password - NowNext',
  description: 'Reset your NowNext account password'
})

const handleForgotPassword = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  
  if (!email.value) {
    errorMessage.value = 'Please enter your email address'
    return
  }
  
  isLoading.value = true
  
  // TODO: Implement actual password reset logic
  // For now, this is a placeholder
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Placeholder logic - replace with actual password reset
    // Send password reset email
    
    successMessage.value = 'If an account exists with this email, you will receive password reset instructions.'
  } catch (error) {
    errorMessage.value = 'Failed to send reset email. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="bg-white text-gray-900 antialiased min-h-screen flex items-center justify-center">
    <UContainer>
      <div class="max-w-md mx-auto">
        <!-- Logo/Brand -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-extrabold tracking-tight">
            <SiteLogo class="text-4xl font-extrabold tracking-tight" />
          </h1>
          <p class="mt-2 text-gray-600">Reset your password</p>
        </div>

        <!-- Forgot Password Card -->
        <UCard
          :ui="{
            base: 'rounded-none',
            ring: 'ring-1 ring-gray-200',
            body: 'p-8'
          }"
          class="bg-white shadow-xl"
        >
          <form @submit.prevent="handleForgotPassword" class="space-y-6">
            <!-- Instructions -->
            <div class="text-sm text-gray-600">
              <p>Enter your email address and we'll send you instructions to reset your password.</p>
            </div>

            <!-- Email Input -->
            <div>
              <label for="email" class="block text-sm font-semibold text-gray-900 mb-2">
                Email address
              </label>
              <UInput
                id="email"
                v-model="email"
                type="email"
                placeholder="you@example.com"
                size="lg"
                :disabled="isLoading"
                :ui="{
                  base: 'rounded-none h-12'
                }"
                class="w-full block"
                required
              />
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="p-4 bg-red-50 border border-red-200 rounded-none">
              <p class="text-sm text-red-600">{{ errorMessage }}</p>
            </div>

            <!-- Success Message -->
            <div v-if="successMessage" class="p-4 bg-green-50 border border-green-200 rounded-none">
              <p class="text-sm text-green-600">{{ successMessage }}</p>
            </div>

            <!-- Submit Button -->
            <UButton
              type="submit"
              label="Send reset instructions"
              color="primary"
              variant="solid"
              size="xl"
              :loading="isLoading"
              :disabled="isLoading"
              block
              class="w-full rounded-none font-bold shadow-xl shadow-primary-200/50 hover:shadow-2xl transition-shadow"
            />
          </form>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <!-- Back to Login Link -->
          <div class="text-center">
            <p class="text-sm text-gray-600">
              Remember your password?
              <ULink
                to="/auth/login"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </ULink>
            </p>
          </div>
        </UCard>

        <!-- Back to Home -->
        <div class="mt-6 text-center">
          <ULink
            to="/"
            class="text-sm text-gray-600 hover:text-indigo-600 inline-flex items-center gap-1"
          >
            <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
            Back to home
          </ULink>
        </div>
      </div>
    </UContainer>
  </div>
</template>
