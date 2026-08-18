<script setup lang="ts">
// HeroWorkflowDiagram.vue - Controller -> Cloud -> Output workflow with inline Cloud Sync node
</script>

<template>
  <div class="relative w-full max-w-2xl mx-auto">
    <!-- Main Card Backdrop with Warm Studio Gradient -->
    <div class="relative overflow-hidden rounded-3xl border border-stone-200/80 dark:border-neutral-800 bg-gradient-to-br from-[#fcfaf7] via-[#f7f3ee] to-[#fbece7] dark:from-neutral-900 dark:via-neutral-900/90 dark:to-stone-900/80 p-5 sm:p-8 shadow-2xl transition-all duration-300">
      
      <!-- Ambient Studio Glow Effects -->
      <div class="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-rose-200/40 via-amber-200/30 to-transparent dark:from-rose-900/20 dark:via-orange-900/10 rounded-full blur-3xl pointer-events-none" />
      <div class="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-amber-200/40 to-transparent dark:from-amber-900/20 rounded-full blur-2xl pointer-events-none" />

      <!-- Relative Container for Workflow Diagram -->
      <div class="relative z-10 min-h-[460px] sm:min-h-[500px] flex flex-col justify-between">

        <!-- Inline Cloud Sync Node (Positioned inline with the flow line junction) -->
        <div class="absolute top-[16%] right-[10%] sm:right-[13%] z-20">
          <div class="relative flex flex-col items-center group">
            <div class="relative p-3.5 bg-white/95 dark:bg-neutral-800/95 backdrop-blur-md rounded-2xl border border-stone-200/90 dark:border-neutral-700 shadow-xl transition-transform hover:scale-105">
              <svg class="w-9 h-9 sm:w-11 sm:h-11 text-stone-700 dark:text-stone-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              </svg>
            </div>
            <span class="mt-1.5 text-[10px] font-extrabold uppercase tracking-wider text-stone-600 dark:text-stone-400">Cloud Sync</span>
          </div>
        </div>

        <!-- SVG Dashed Flow Lines Overlay -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 600 500" fill="none">
          <!-- Cloud -> Controller -->
          <path
            d="M 450 115 C 370 115, 270 135, 240 160"
            stroke="#525252"
            stroke-width="2.5"
            stroke-dasharray="5 5"
            stroke-linecap="round"
            class="opacity-75 dark:opacity-60"
          />
          <!-- Cloud -> Display Board -->
          <path
            d="M 480 155 C 480 230, 420 310, 400 350"
            stroke="#525252"
            stroke-width="2.5"
            stroke-dasharray="5 5"
            stroke-linecap="round"
            class="opacity-75 dark:opacity-60"
          />
          <!-- Cloud -> Branch right to edge -->
          <path
            d="M 525 110 C 555 115, 580 130, 600 145"
            stroke="#525252"
            stroke-width="2.5"
            stroke-dasharray="5 5"
            stroke-linecap="round"
            class="opacity-75 dark:opacity-60"
          />
          <!-- Controller -> Display Board -->
          <path
            d="M 330 280 L 330 350"
            stroke="#525252"
            stroke-width="2.5"
            stroke-dasharray="5 5"
            stroke-linecap="round"
            class="opacity-75 dark:opacity-60"
          />
        </svg>

        <!-- Middle Left: Controller Screenshot Mockup -->
        <div class="relative z-20 max-w-[310px] sm:max-w-[360px] ml-0 sm:ml-2 mt-4 sm:mt-6 mb-4">
          <div class="bg-gray-950 rounded-xl p-2 shadow-2xl border border-gray-800 transition-transform hover:-translate-y-0.5">
            <!-- Window Header -->
            <div class="flex items-center justify-between px-3 py-1.5 bg-gray-900 border-b border-gray-800 text-[10px] text-gray-400 font-mono">
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-red-500/80" />
                <span class="w-2 h-2 rounded-full bg-yellow-500/80" />
                <span class="w-2 h-2 rounded-full bg-green-500/80" />
                <span class="ml-1 font-semibold text-gray-300">CONTROLLER</span>
              </div>
              <span class="text-emerald-400 font-semibold flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                ACTIVE
              </span>
            </div>
            <!-- Controller Real Project Screenshot -->
            <div class="overflow-hidden rounded-b-lg border-t border-gray-800 bg-gray-900">
              <img
                src="/imgs/demos/nownextlive-controller.png"
                alt="NowNext.live Controller Dashboard Screenshot"
                class="w-full h-auto object-cover max-h-[190px] sm:max-h-[220px] object-top"
              />
            </div>
          </div>
        </div>

        <!-- Bottom Right: Live Output Display Screenshot Mockup -->
        <div class="relative z-20 flex justify-end pr-0 sm:pr-2 mt-auto">
          <div class="relative w-full max-w-[330px] sm:max-w-[390px] bg-gray-950 rounded-xl p-2 shadow-2xl border border-gray-800 transition-transform hover:-translate-y-0.5">
            <!-- Window Header -->
            <div class="flex items-center justify-between px-3 py-1.5 bg-gray-900 border-b border-gray-800 text-[10px] text-gray-400 font-mono">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span class="font-semibold text-emerald-400">LIVE DISPLAY OUTPUT</span>
              </div>
              <span>nownext.live/r/demo</span>
            </div>
            <!-- Display Real Project Screenshot -->
            <div class="overflow-hidden rounded-b-lg border-t border-gray-800 bg-gray-900">
              <img
                src="/imgs/demos/nownextlive-display.png"
                alt="NowNext.live Live Display Screen Screenshot"
                class="w-full h-auto object-cover max-h-[190px] sm:max-h-[220px] object-top"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
