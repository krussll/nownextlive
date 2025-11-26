<template>
  <UContainer class="py-10">

    <!-- Header -->
    <div class="flex items-center justify-between mb-10">
      <div>
          <h1 class="text-4xl font-semibold text-slate-900">
            Unnamed
          </h1>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-6">

      <!-- SIDEBAR -->
      <aside class="col-span-3 space-y-6">

        <!-- Displays -->
        <UCard class="rounded-none">
          <p class="text-xs uppercase font-semibold tracking-wider text-slate-500 mb-3">
            Displays
          </p>

          <UButton
            color="white"
            variant="solid"
            class="w-full justify-between"
            icon="i-heroicons-arrow-top-right-on-square"
            to="/r/NDST3"
            target="_blank"
            
          >
            Open NDST3 Display
          </UButton>
        </UCard>

        <!-- Connected Users -->
        <UCard class="rounded-none">
          <p class="text-xs uppercase font-semibold tracking-wider text-slate-500 mb-3">
            Connected Users
          </p>

          <p class="text-slate-400 text-sm">No connected users yet</p>
        </UCard>

      </aside>


      <!-- MAIN CONTENT -->
      <main class="col-span-9">

        <div class="px-6 py-6 rounded-none overflow-hidden bg-default ring ring-default">

        <!-- Top Header -->
        <div class="mb-8">
          <!-- Status + Room -->
          <div class="flex justify-between items-center mt-6">

            <UButton
              color="white"
              variant="solid"
              class="border border-slate-200 text-slate-700"
            >
              Connection Error
            </UButton>

            <p class="text-sm text-slate-500">
              Room: <span class="font-semibold text-slate-700">NDST3</span>
            </p>

          </div>
        </div>


        <!-- Accordion List -->
        <UAccordion
          :items="spaces"
          class="space-y-4"
          :ui="{
            item: { base: 'border rounded-none bg-white shadow-sm' },
            header: { base: 'flex justify-between w-full px-4 py-4 text-left' },
            body: { base: 'px-0 pb-4' }
          }"
        >
          <template #default="{ item, open }">
            <span class="text-slate-700 font-semibold tracking-wide">
              {{ item.label }}
            </span>

            <UButton
              color="white"
              variant="solid"
              class="border text-slate-700"
            >
              Advance to next session
            </UButton>
          </template>

          <!-- EXPANDED CONTENT VIEW -->
          <template #body="{ item }">
            <div class="space-y-4 px-4">

              <!-- Session Card Loop -->
              <div
                v-for="session in item.sessions"
                :key="session.id"
                class="flex justify-between items-center border rounded-none bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden"
              >

                <!-- Left Colour Bar -->
                <div
                  class="w-1 h-full absolute left-0 top-0"
                  :class="session.color"
                ></div>

                <!-- Session Number -->
                <p class="pl-6 py-5 font-semibold text-slate-700">
                  {{ session.number }}
                </p>

                <!-- Controls -->
                <div class="flex items-center space-x-2 pr-4">

                  <UButton
                    color="white"
                    variant="solid"
                    icon="i-heroicons-cog-6-tooth"
                    class="!rounded-none"
                  />

                  <UButton
                    color="white"
                    variant="solid"
                    :icon="session.icon"
                    class="!rounded-none"
                  />
                </div>

              </div>

            </div>
          </template>
        </UAccordion>
      </div>
      </main>

    </div>
  </UContainer>
</template>

<script setup>
  definePageMeta({
    layout: 'app'
  })

const spaces = [
  {
    label: "Rink 1",
    sessions: [
      {
        id: 1,
        number: "1",
        color: "bg-blue-600",
        icon: "i-heroicons-play-20-solid"
      },
      {
        id: 2,
        number: "2",
        color: "bg-orange-500",
        icon: "i-heroicons-play"
      },
      {
        id: 3,
        number: "3",
        color: "bg-slate-300",
        icon: "i-heroicons-play"
      },
      {
        id: 4,
        number: "4",
        color: "bg-slate-300",
        icon: "i-heroicons-play"
      }
    ]
  },

  {
    label: "Rink 2",
    sessions: [
      { id: 1, number: "1", color: "bg-blue-600", icon: "i-heroicons-play" },
      { id: 2, number: "2", color: "bg-orange-500", icon: "i-heroicons-play" },
    ]
  },

  {
    label: "Rink 3",
    sessions: [
      { id: 1, number: "1", color: "bg-blue-600", icon: "i-heroicons-play" },
    ]
  }
];
</script>
