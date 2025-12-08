<script setup lang="ts">
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

useSeoMeta({
  title: 'Sign Up - NowNext',
  description: 'Create your NowNext account to start managing events'
})

const handleSignup = async () => {
  errorMessage.value = ''
  
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Please fill in all fields'
    return
  }
  
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }
  
  if (password.value.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters long'
    return
  }
  
  isLoading.value = true
  
  // TODO: Implement actual signup logic
  // For now, this is a placeholder
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Placeholder logic - replace with actual registration
    // Signup attempt
    
    // On success, redirect to login or dashboard
    // navigateTo('/auth/login')
  } catch (error) {
    errorMessage.value = 'Signup failed. Please try again.'
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
          <p class="mt-2 text-gray-600">Create your account</p>
        </div>

        <!-- Signup Card -->
        <UCard
          :ui="{
            base: 'rounded-none',
            ring: 'ring-1 ring-gray-200',
            body: 'p-8'
          }"
          class="bg-white shadow-xl"
        >
          <form @submit.prevent="handleSignup" class="space-y-6">
            <!-- Name Input -->
            <div>
              <label for="name" class="block text-sm font-semibold text-gray-900 mb-2">
                Full name
              </label>
              <UInput
                id="name"
                v-model="name"
                type="text"
                placeholder="John Doe"
                size="lg"
                :disabled="isLoading"
                :ui="{
                  base: 'rounded-none h-12'
                }"
                class="w-full"
                required
              />
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
                class="w-full"
                required
              />
            </div>

            <!-- Password Input -->
            <div>
              <label for="password" class="block text-sm font-semibold text-gray-900 mb-2">
                Password
              </label>
              <UInput
                id="password"
                v-model="password"
                type="password"
                placeholder="••••••••"
                size="lg"
                :disabled="isLoading"
                :ui="{
                  base: 'rounded-none h-12'
                }"
                class="w-full"
                required
              />
              <p class="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
            </div>

            <!-- Confirm Password Input -->
            <div>
              <label for="confirm-password" class="block text-sm font-semibold text-gray-900 mb-2">
                Confirm password
              </label>
              <UInput
                id="confirm-password"
                v-model="confirmPassword"
                type="password"
                placeholder="••••••••"
                size="lg"
                :disabled="isLoading"
                :ui="{
                  base: 'rounded-none h-12'
                }"
                class="w-full"
                required
              />
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="p-4 bg-red-50 border border-red-200 rounded-none">
              <p class="text-sm text-red-600">{{ errorMessage }}</p>
            </div>

            <!-- Terms Agreement -->
            <div class="flex items-start">
              <input
                id="terms"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-none mt-1"
                :disabled="isLoading"
                required
              />
              <label for="terms" class="ml-2 block text-sm text-gray-700">
                I agree to the 
                <ULink
                  to="/terms"
                  class="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Terms of Service
                </ULink>
                and
                <ULink
                  to="/privacy"
                  class="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Privacy Policy
                </ULink>
              </label>
            </div>

            <!-- Submit Button -->
            <UButton
              type="submit"
              label="Create account"
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

          <!-- Login Link -->
          <div class="text-center">
            <p class="text-sm text-gray-600">
              Already have an account?
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
