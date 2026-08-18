<script setup lang="ts">
// HeroWorkflowDiagram.vue - Visualizing Controller -> Cloud -> Output workflow
</script>

<template>
  <div class="relative w-full max-w-xl mx-auto">
    <!-- Main Card Backdrop with Warm Studio Gradient -->
    <div class="relative overflow-hidden rounded-3xl border border-stone-200/80 dark:border-neutral-800 bg-gradient-to-br from-[#fcfaf7] via-[#f7f3ee] to-[#fbece7] dark:from-neutral-900 dark:via-neutral-900/90 dark:to-stone-900/80 p-5 sm:p-8 shadow-2xl transition-all duration-300">
      
      <!-- Ambient Glow Effects -->
      <div class="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-rose-200/40 via-amber-200/30 to-transparent dark:from-rose-900/20 dark:via-orange-900/10 rounded-full blur-3xl pointer-events-none" />
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-amber-200/40 to-transparent dark:from-amber-900/20 rounded-full blur-2xl pointer-events-none" />

      <!-- Relative Container for Diagram Elements -->
      <div class="relative z-10 min-h-[440px] sm:min-h-[470px] flex flex-col justify-between">

        <!-- Top Right: Cloud Node with Label -->
        <div class="flex justify-end pr-4 sm:pr-10 relative pt-1">
          <div class="relative flex flex-col items-center group">
            <div class="relative p-3 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-2xl border border-stone-200/90 dark:border-neutral-700 shadow-md">
              <svg class="w-10 h-10 sm:w-12 sm:h-12 text-stone-700 dark:text-stone-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              </svg>
            </div>
            <span class="mt-1 text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Cloud</span>
          </div>
        </div>

        <!-- SVG Dashed Flow Lines Overlay -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 500 460" fill="none">
          <!-- Cloud -> Controller -->
          <path
            d="M 390 70 C 310 70, 220 100, 215 135"
            stroke="#525252"
            stroke-width="2.5"
            stroke-dasharray="5 5"
            stroke-linecap="round"
            class="opacity-75 dark:opacity-60"
          />
          <!-- Cloud -> Tablet Display -->
          <path
            d="M 405 85 C 410 160, 335 230, 335 280"
            stroke="#525252"
            stroke-width="2.5"
            stroke-dasharray="5 5"
            stroke-linecap="round"
            class="opacity-75 dark:opacity-60"
          />
          <!-- Cloud -> Branch off to right -->
          <path
            d="M 435 70 C 465 80, 485 95, 500 110"
            stroke="#525252"
            stroke-width="2.5"
            stroke-dasharray="5 5"
            stroke-linecap="round"
            class="opacity-75 dark:opacity-60"
          />
          <!-- Controller -> Tablet Display -->
          <path
            d="M 315 240 L 315 280"
            stroke="#525252"
            stroke-width="2.5"
            stroke-dasharray="5 5"
            stroke-linecap="round"
            class="opacity-75 dark:opacity-60"
          />
        </svg>

        <!-- Middle Left: Controller Panel -->
        <div class="relative z-20 max-w-[300px] sm:max-w-[330px] ml-0 sm:ml-2 -mt-1 mb-4">
          <div class="bg-[#1c1c1e] text-white rounded-xl p-3 sm:p-4 shadow-2xl border border-neutral-800 space-y-2.5">
            <!-- Controller Header Badge -->
            <div class="flex items-center justify-between text-[10px] font-mono text-neutral-400 pb-1.5 border-b border-neutral-800">
              <span class="flex items-center gap-1.5 font-semibold uppercase tracking-wider text-emerald-400">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Controller
              </span>
              <span>Space 01</span>
            </div>

            <!-- Session Row 1 -->
            <div class="flex items-center justify-between bg-neutral-900 p-2.5 rounded-lg border border-neutral-800/80">
              <div class="flex items-center gap-3">
                <span class="font-mono font-bold text-sm sm:text-base text-white tracking-tight">10:00</span>
                <div class="flex items-baseline gap-1.5">
                  <span class="font-bold text-sm text-neutral-100">Opening</span>
                  <span class="text-xs text-neutral-400 font-normal">Pam</span>
                </div>
              </div>
              <div class="w-8 h-8 rounded-md bg-neutral-800 border border-neutral-700 flex items-center justify-center shadow-inner">
                <UIcon name="i-lucide-play" class="w-4 h-4 text-emerald-400 fill-emerald-400" />
              </div>
            </div>

            <!-- Session Row 2 -->
            <div class="flex items-center justify-between bg-neutral-900 p-2.5 rounded-lg border border-neutral-800/80">
              <div class="flex items-center gap-3">
                <span class="font-mono font-bold text-sm sm:text-base text-white tracking-tight border-b border-dashed border-neutral-500 pb-0.5">35:00</span>
                <div class="flex items-baseline gap-1.5">
                  <span class="font-bold text-sm text-neutral-100">Keynote</span>
                  <span class="text-xs text-neutral-400 font-normal">Kevin</span>
                </div>
              </div>
              <div class="w-8 h-8 rounded-md bg-neutral-800 border border-neutral-700 flex items-center justify-center shadow-inner">
                <UIcon name="i-lucide-play" class="w-4 h-4 text-emerald-400 fill-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Right: Output Tablet Device Mockup -->
        <div class="relative z-20 flex justify-end pr-0 sm:pr-2 mt-auto">
          <div class="relative w-full max-w-[320px] sm:max-w-[360px] bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-700 rounded-3xl p-3 sm:p-4 shadow-2xl">
            <!-- Tablet Bezel Camera Dots -->
            <div class="w-2.5 h-2.5 rounded-full border-2 border-neutral-800 bg-neutral-900 absolute left-3 top-1/2 -translate-y-1/2" />
            <div class="w-2.5 h-2.5 rounded-full border-2 border-neutral-800 bg-neutral-900 absolute right-3 top-1/2 -translate-y-1/2" />

            <!-- Tablet Screen Content -->
            <div class="bg-[#1c1c1e] rounded-2xl p-5 sm:p-6 flex flex-col justify-between items-center space-y-4 border border-neutral-800 shadow-inner">
              <div class="w-full flex items-center justify-between text-[10px] font-mono text-neutral-400 px-0.5">
                <span class="text-emerald-400 font-semibold tracking-wider flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  OUTPUT DISPLAY
                </span>
                <span>Court 1</span>
              </div>

              <!-- Main Digital Clock -->
              <div class="text-5xl sm:text-6xl font-mono font-bold tracking-tight text-white py-1">
                10:00
              </div>

              <!-- Multi-Segment Duration Progress Bar -->
              <div class="w-full space-y-1">
                <div class="w-full h-3.5 bg-neutral-800 rounded-md overflow-hidden flex p-0.5 border border-neutral-700/60">
                  <div class="bg-emerald-500 h-full rounded-l-sm transition-all duration-500 w-[72%]" />
                  <div class="bg-amber-500 h-full w-[18%]" />
                  <div class="bg-rose-600 h-full rounded-r-sm w-[10%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
