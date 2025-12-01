<template>

  <UContainer class="py-10">
  <div v-if="showloading" class="flex justify-center items-center h-screen fixed top-0 left-0 right-0 bottom-0 w-full z-50 overflow-hidden bg-gray-700 opacity-75">
    <p class="text-slate-500">Loading...</p>
  </div>

    <!-- Header -->
    <div class="flex items-center justify-between mb-10">
      <div>
          <h1 class="text-4xl font-semibold text-slate-900">
            Unnamed
          </h1>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

      <!-- SIDEBAR -->
      <aside class="lg:col-span-3 space-y-6 order-2 lg:order-1">

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
      <main class="lg:col-span-9 order-1 lg:order-2">

        <div class="px-6 py-6 rounded-none overflow-hidden bg-default ring ring-default">

        <!-- Top Header -->
        <div class="mb-8">
          <!-- Status + Room -->
          <div class="flex justify-between items-center mt-6">

            <UBadge
              color="red"
              variant="subtle"
              class="px-3 py-1"
            >
              Disconnected
            </UBadge>

            <p class="text-sm text-slate-500">
              Room: <span class="font-semibold text-slate-700">NDST3</span>
            </p>

          </div>
        </div>


        <!-- Accordion List -->
        <div class="flex justify-end mb-4">
          <UButton
            icon="i-heroicons-plus"
            size="sm"
            color="primary"
            variant="soft"
            label="Add Space"
            @click="addSpace"
          />
        </div>

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
              {{ item.title }}
            </span>

            <div class="flex items-center gap-2" @click.stop>
              <ModalSpace
                    :title="`Editing space ${item.title}`"
                    :data="item"
                    @update:space="$s => (item = $s)"
                  />
              <UButton
                color="white"
                variant="solid"
                icon="i-heroicons-forward"
              />
            </div>
            
          </template>

          <!-- EXPANDED CONTENT VIEW -->
          <template #body="{ item }">
            <div class="space-y-4 px-4">

              <!-- Session Card Loop -->
              <div
                v-for="session in item.sessions"
                :key="session.id"
                class="flex justify-between items-center border rounded-none bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden group"
              >

                <!-- Left Colour Bar -->
                <div
                  class="w-1 h-full absolute left-0 top-0 transition-colors duration-300"
                  :class="session.active ? 'bg-green-500' : 'bg-transparent'"
                ></div>

                <!-- Session Number -->
                <div class="pl-6 py-5">
                   <p class="font-semibold text-slate-700">
                    {{ session.title }}
                  </p>
                  <p v-if="session.subtitle" class="text-xs text-slate-500 mt-0.5">
                    {{ session.subtitle }}
                  </p>
                </div>
               

                <!-- Controls -->
                <div class="flex items-center space-x-2 pr-4">

                <Modal
                  :title="`Editing session ${session.title}`"
                  :data="session"
                  @update:session="$s => (session = $s)"
                />

                  <UTooltip text="Set Live">
                    <UButton
                      color="white"
                      variant="solid"
                      icon="i-heroicons-play"
                      class="!rounded-none"
                    />
                  </UTooltip>
                </div>
              </div>

              <!-- Add Session Button -->
              <div class="flex justify-center pt-2">
                 <UButton
                  icon="i-heroicons-plus"
                  size="xs"
                  color="gray"
                  variant="ghost"
                  label="Add Session"
                  @click="addSession(item)"
                />
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
  import Modal from '~/components/ModalSessionEdit.vue'
  import ModalSpace from '~/components/ModalSpaceEdit.vue'
  definePageMeta({
    layout: 'app'
  })

  const showloading = ref(false);

const spaces = ref([
  {
    title: "Rink 1",
    now: "1",
    sessions: [
      {
        id: "1",
        title: "Test 1",
        subtitle: "Group A",
        time: ""
      },
      {
        id: "2",
        title: "Test 2",
        subtitle: "Group B",
        time: ""
      }
    ]
  }
]);

const addSpace = () => {
  spaces.value.push({
    title: `New Space ${spaces.value.length + 1}`,
    now: "",
    sessions: []
  })
}

const addSession = (space) => {
  space.sessions.push({
    id: Date.now().toString(),
    title: "New Session",
    subtitle: "",
    time: ""
  })
}

showloading.value = false;
</script>
