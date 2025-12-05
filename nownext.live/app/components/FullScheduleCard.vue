<template>
  <div
    class="border rounded-none overflow-hidden bg-white border-slate-300 flex flex-col h-full"
  >
    <!-- Header -->
    <div
      class="px-4 py-3 bg-white text-xs uppercase tracking-wider text-slate-500 font-semibold border-b"
    >
      <h3 class="text-base truncate">{{ title }}</h3>
    </div>

    <!-- Sessions List -->
    <div class="flex-grow flex flex-col">
      <div
        v-for="session in sessions"
        :key="session.id"
        :class="[
          'px-4 py-4 border-b last:border-b-0 flex gap-4',
          session.id === nowSessionId ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
        ]"
      >
        <!-- Time Column -->
        <div class="w-16 flex-shrink-0">
             <!-- We might want to add time here if available in the future, 
                  but based on ScheduleCard, time seems to be separate or computed.
                  For now, I'll stick to the structure of the data I have. 
                  If 'time' is needed, I'd need to know where it comes from.
                  ScheduleCard has 'nowTime' prop. 
                  I will assume for now we just list title and subtitle.
             -->
             <span v-if="session.id === nowSessionId" class="text-xs uppercase tracking-widest font-semibold text-slate-300">Now</span>
        </div>

        <!-- Content Column -->
        <div class="flex-auto">
          <p :class="['font-semibold leading-tight', session.id === nowSessionId ? 'text-xl' : 'text-base']">
            {{ session.title }}
          </p>
          <p 
            v-if="session.subtitle" 
            :class="['text-sm mt-1', session.id === nowSessionId ? 'text-slate-300' : 'text-slate-500']"
          >
            {{ session.subtitle }}
          </p>
        </div>
      </div>
      
      <!-- Empty State if no sessions -->
      <div v-if="sessions.length === 0" class="p-4 text-center text-slate-400 text-sm">
        No sessions scheduled
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  sessions: {
    type: Array,
    default: () => []
  },
  nowSessionId: String
})
</script>
