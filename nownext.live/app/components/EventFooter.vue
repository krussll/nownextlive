<template>
  <div 
    v-if="subscriptionData && showSubscription"
    class="fixed bottom-0 left-0 right-0 bg-gray-100 z-40"
  >
    <UContainer class="flex justify-between items-center py-3">
      <div class="flex items-center gap-2">
        <UIcon name="i-heroicons-star" class="w-5 h-5 text-amber-500" v-if="subscriptionData.subscriptionLevel !== 'free'" />
        <p class="text-sm font-medium text-slate-400">
          Event Subscription: 
          <span class="text-slate-400 uppercase tracking-wider ml-1">
            {{ subscriptionData.subscriptionLevel }}
          </span>
        </p>
      </div>

      <div class="text-xs text-slate-400 font-medium">
        Display ID: {{ myUserId.substring(0, 8) }}
      </div>
      
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-1.5">
          <span class="text-xs text-slate-400 font-medium">
            {{ connectionStatus }}
          </span>
        </div>
        <span class="text-slate-300">|</span>
        <div class="text-xs text-slate-400 font-medium">
          Powered by NowNext.Live
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  subscriptionData: any
  showSubscription: boolean
  myUserId: string
  connectionStatus: string
}>()
</script>
