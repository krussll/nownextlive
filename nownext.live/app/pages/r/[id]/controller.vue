<template>
  <UContainer class="py-10">
    <div
      v-if="showloading"
      class="flex justify-center items-center h-screen fixed top-0 left-0 right-0 bottom-0 w-full z-50 overflow-hidden bg-gray-100"
    >
      <p class="text-slate-700">Loading...</p>
    </div>

    <!-- Error State -->
    <div
      v-if="error && error.statusCode === 404"
      class="flex flex-col items-center justify-center min-h-[50vh] text-center"
    >
      <UIcon
        name="i-heroicons-exclamation-circle"
        class="w-16 h-16 text-red-500 mb-4"
      />
      <h2 class="text-2xl font-bold text-slate-900 mb-2">
        Event can not be found
      </h2>
      <p class="text-slate-500">
        The event you are looking for does not exist or has been removed.
      </p>
    </div>

    <div v-else>
    <!-- Header -->
    <div class="flex items-center justify-between mb-10">
      <div>
        <h1 class="text-4xl font-semibold text-slate-600 cursor-pointer hover:underline hover:decoration-dashed">
          {{ data?.title || 'Unnamed' }}
        </h1>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- SIDEBAR -->
      <aside class="lg:col-span-3 space-y-6 order-2 lg:order-1">
        <!-- Displays -->
        <UCard class="rounded-none">
          <p
            class="text-xs uppercase font-semibold tracking-wider text-slate-500 mb-3"
          >
            Displays
          </p>

          <UButton
            color="white"
            variant="solid"
            class="w-full justify-between"
            icon="i-heroicons-arrow-top-right-on-square"
            :to="`/r/${eventId}`"
            target="_blank"
          >
            Open Display
          </UButton>
        </UCard>

        <!-- Connected Users -->
        <UCard class="rounded-none">
          <p
            class="text-xs uppercase font-semibold tracking-wider text-slate-500 mb-3"
          >
            Connected Users
          </p>

          <p class="text-slate-400 text-sm">No connected users yet</p>
        </UCard>
      </aside>

      <!-- MAIN CONTENT -->
      <main class="lg:col-span-9 order-1 lg:order-2">
        <div
          class="px-6 py-6 rounded-none overflow-hidden bg-default ring ring-default"
        >
          <!-- Top Header -->
          <div class="mb-8">
            <!-- Status + Room -->
            <div class="flex justify-between items-center mt-6">
              <UBadge color="red" variant="subtle" class="px-3 py-1">
                Disconnected
              </UBadge>

              <p class="text-sm text-slate-500">
                Room: <span class="font-semibold text-slate-700">{{ eventId }}</span>
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
              header: {
                base: 'flex justify-between w-full px-4 py-4 text-left'
              },
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
                  @update:space="updateSpace(item, $event)"
                />
                <UTooltip text="Advance to Next Session">
                  <UButton
                    color="white"
                    variant="solid"
                    icon="i-heroicons-forward"
                    class="cursor-pointer"
                    :disabled="!canGoNext(item)"
                    @click="setNextSession(item)"
                  />
                </UTooltip>
                <UTooltip text="Delete Space">
                  <UButton
                    color="red"
                    variant="ghost"
                    icon="i-heroicons-trash"
                    class="cursor-pointer"
                    @click="deleteSpace(item)"
                  />
                </UTooltip>
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
                    :class="
                      session.id === item.now
                        ? 'bg-green-500 animate-pulse'
                        : 'bg-transparent'
                    "
                  ></div>

                  <!-- Session Number -->
                  <div class="pl-6 py-5">
                    <p class="font-semibold text-slate-700">
                      {{ session.title }}
                    </p>
                    <p
                      v-if="session.subtitle"
                      class="text-xs text-slate-500 mt-0.5"
                    >
                      {{ session.subtitle }}
                    </p>
                  </div>

                  <!-- Controls -->
                  <div class="flex items-center space-x-2 pr-4">
                    <Modal
                      :title="`Editing session ${session.title}`"
                      :data="session"
                      @update:session="updateSession(item, session, $event)"
                    />

                    <UTooltip text="Set Live">
                      <UButton
                        color="white"
                        variant="solid"
                        icon="i-heroicons-play"
                        class="!rounded-none cursor-pointer"
                        :disabled="session.id === item.now"
                        @click="setLive(item, session.id)"
                      />
                    </UTooltip>

                    <UTooltip text="Delete Session">
                      <UButton
                        color="red"
                        variant="ghost"
                        icon="i-heroicons-trash"
                        class="!rounded-none cursor-pointer"
                        @click="deleteSession(item, session)"
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
    </div>
    <ModalConfirm
      v-model:open="confirmModalOpen"
      :title="confirmTitle"
      :message="confirmMessage"
      @confirm="handleConfirm"
    />
  </UContainer>
</template>

<script setup>
import Modal from '~/components/ModalSessionEdit.vue'
import ModalSpace from '~/components/ModalSpaceEdit.vue'
import ModalConfirm from '~/components/ModalConfirm.vue'

definePageMeta({
  layout: 'app'
})

const showloading = ref(true)

const route = useRoute()
const eventId = route.params.id
const { data, error } = await useFetch(`/api/events/${route.params.id}`, {
  lazy: true
})

const toast = useToast()

const saveEvent = async () => {
  try {
    await $fetch(`/api/events/${eventId}`, {
      method: 'POST',
      body: {
        ...data.value,
        spaces: spaces.value
      }
    })
    toast.add({ title: 'Event saved', color: 'green' })
  } catch (e) {
    toast.add({ title: 'Error saving event', description: e.message, color: 'red' })
  }
}

const spaces = ref([])

watch(
  data,
  (newData) => {
    if (newData?.spaces) {
      spaces.value = newData.spaces
      showloading.value = false
    }
  },
  { immediate: true }
)

watch(error, (newError) => {
  if (newError) {
    showloading.value = false
  }
}, { immediate: true })

const addSpace = () => {
  spaces.value.push({
    id: generateId(),
    title: `New Space ${spaces.value.length + 1}`,
    now: '',
    sessions: []
  })
  saveEvent()
}

const addSession = (space) => {
  space.sessions.push({
    id: generateId(),
    title: 'New Session',
    subtitle: '',
    time: ''
  })
  saveEvent()
}

const setNextSession = (space) => {
  const currentIndex = space.sessions.findIndex((s) => s.id === space.now)
  if (currentIndex === -1) {
    if (space.sessions.length > 0) {
      space.now = space.sessions[0].id
    }
  } else if (currentIndex < space.sessions.length - 1) {
    space.now = space.sessions[currentIndex + 1].id
  }
  saveEvent()
}

const canGoNext = (space) => {
  if (!space.sessions || space.sessions.length === 0) return false
  const currentIndex = space.sessions.findIndex((s) => s.id === space.now)
  // If not started, can go next (to first)
  if (currentIndex === -1) return true
  // If started, can go next if not last
  return currentIndex < space.sessions.length - 1
}

const deleteSpace = (space) => {
  confirmTitle.value = 'Delete Space'
  confirmMessage.value = `Are you sure you want to delete the space "${space.title}"? This action cannot be undone.`
  onConfirm.value = () => {
    spaces.value = spaces.value.filter((s) => s !== space)
    saveEvent()
  }
  confirmModalOpen.value = true
}

const deleteSession = (space, session) => {
  confirmTitle.value = 'Delete Session'
  confirmMessage.value = `Are you sure you want to delete the session "${session.title}"? This action cannot be undone.`
  onConfirm.value = () => {
    if (space.now === session.id) {
      space.now = ''
    }
    space.sessions = space.sessions.filter((s) => s.id !== session.id)
    saveEvent()
  }
  confirmModalOpen.value = true
}

// Confirmation Modal State
const confirmModalOpen = ref(false)
const confirmTitle = ref('')
const confirmMessage = ref('')
const onConfirm = ref(() => {})

const handleConfirm = () => {
  onConfirm.value()
}



const updateSpace = (space, newSpace) => {
  const index = spaces.value.indexOf(space)
  if (index !== -1) {
    spaces.value[index] = newSpace
    saveEvent()
  }
}

const updateSession = (space, session, newSession) => {
  const index = space.sessions.indexOf(session)
  if (index !== -1) {
    space.sessions[index] = newSession
    saveEvent()
  }
}

const setLive = (space, sessionId) => {
  space.now = sessionId
  saveEvent()
}
</script>
