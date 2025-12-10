<script setup lang="ts">
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const supabase = useSupabaseClient()
const router = useRouter()

const signInWithOtp = async () => {
  
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  
  })
  if (error) {
    errorMessage.value = error.message
    return
  }
  router.push('/account')
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
          <p class="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        <!-- Login Card -->
        <UCard
          :ui="{
            base: 'rounded-none',
            ring: 'ring-1 ring-gray-200',
            body: 'p-8'
          }"
          class="bg-white shadow-xl"
        >
          <form @submit.prevent="signInWithOtp" class="space-y-6">
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
                class="w-full block"
                required
              />
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="p-4 bg-red-50 border border-red-200 rounded-none">
              <p class="text-sm text-red-600">{{ errorMessage }}</p>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                
              </div>

              <ULink
                to="/auth/forgot-password"
                class="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </ULink>
            </div>

            <!-- Submit Button -->
            <UButton
              type="submit"
              label="Sign in"
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

          <!-- Sign Up Link -->
          <div class="text-center">
            <p class="text-sm text-gray-600">
              Don't have an account?
              <ULink
                to="/auth/signup"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Sign up for free
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
