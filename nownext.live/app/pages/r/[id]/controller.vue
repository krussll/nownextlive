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
        <h1 
          class="text-4xl font-semibold text-slate-600 cursor-pointer hover:underline hover:decoration-dashed"
          @click="isEditingEvent = true"
        >
          {{ event.title || 'Unnamed' }}
        </h1>
        <ModalEventEdit
          v-model="isEditingEvent"
          :title="event.title || 'Unnamed'"
          @save="updateEventTitle"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- SIDEBAR -->
      <aside class="lg:col-span-3 space-y-6 order-2 lg:order-1">
        <!-- Displays -->
        <UCard class="rounded-none">
          
         <div class="relative w-full h-48 overflow-hidden">
          <iframe
  id="inlineFrameExample"
  title="Inline Frame Example"
  height="200"
  class="origin-top-left absolute top-0 left-0 w-[1920px] h-[1080px] scale-[0.14] pointer-events-none"
  :src="`http://localhost:3000/r/${eventId}?nopresence=true`" />
          <UButton
            color="white"
            variant="solid"
            class="absolute top-2 right-2"
            icon="i-heroicons-arrow-top-right-on-square"
            :to="`/r/${eventId}`"
            target="_blank"
          >
          </UButton>

         </div>

        </UCard>

    

        <!-- Connected Users -->
        <UCard class="rounded-none">
          <p
            class="text-xs uppercase font-semibold tracking-wider text-slate-500 mb-3"
          >
            Connected Users
          </p>

          <div v-if="connectedUsers.length === 0">
            <p class="text-slate-400 text-sm">No connected users yet</p>
          </div>
          
          <div v-else class="space-y-2">
            <div
              v-for="user in connectedUsers"
              :key="user.user_id"
              class="flex items-center gap-2 text-sm transition-opacity"
              :class="getConnectionAge(user.online_at) > 60 ? 'opacity-50' : 'opacity-100'"
            >
              <UBadge 
                :color="user.user_type === 'controller' ? 'blue' : 'green'" 
                variant="subtle"
              >
                {{ user.user_type }}
              </UBadge>
              <span class="text-slate-600 font-mono text-xs">
                {{ user.user_id.substring(0, 8) }}
              </span>
              <span class="text-slate-400 text-xs ml-auto">
                {{ formatConnectionAge(user.online_at) }}
              </span>
            </div>
          </div>
        </UCard>

        <!-- Footer -->
        <div class="z-50 pointer-events-none">
          <UContainer>
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div class="lg:col-span-3 pb-6 pointer-events-auto flex items-center justify-between text-xs text-slate-400">
                <div class="flex items-center gap-2">
                  <NuxtLink to="/" class="hover:text-slate-600 transition-colors underline decoration-dotted underline-offset-2">
                    nownext.live
                  </NuxtLink>
                  <span>v{{ config.public.version }}</span>
                </div>
                <UBadge :color="connectionStatusColor" variant="subtle" size="xs">
                  {{ connectionStatusLabel }}
                </UBadge>
              </div>
            </div>
          </UContainer>
        </div>
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
              :class="{ 'opacity-50': !canAddSpace }"
              @click="handleAddSpace"
            />
          </div>

          <div class="space-y-6" ref="spacesContainer">
            <UCollapsible
              v-for="(item, index) in event.spaces"
              :key="item.id"
              :default-open="index === 0"
              class="space-y-4 border border-gray-200 rounded-none bg-white shadow-sm"
              :ui="{
                header: {
                  base: 'flex justify-between w-full px-4 py-4 text-left cursor-pointer items-center'
                },
                body: { base: 'px-0 pb-4 bg-gray-50 border-t border-gray-100' }
              }"
            >
              <template #default="{ open }">
                  <div class="flex items-center gap-3 cursor-pointer w-full px-6 py-5">
                    <UIcon
                      name="i-heroicons-bars-3"
                      class="w-5 h-5 text-gray-400 space-drag-handle cursor-move hover:text-gray-600"
                      @click.stop
                    />
                    <span class="text-slate-700 font-semibold tracking-wide">
                      {{ item.title }}
                    </span>
                  <UIcon
                    name="i-heroicons-chevron-down"
                    class="w-5 h-5 text-gray-500 transition-transform duration-200 ml-auto"
                    :class="[open && 'transform rotate-180']"
                  />
                </div>

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
              <template #content>
                <div class="space-y-4 px-4" :key="item.now" :ref="(el) => setSessionContainerRef(el, item.id)">
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

                    <!-- Drag Handle -->
                    <div class="pl-4 py-5 flex items-center">
                       <UIcon
                        name="i-heroicons-bars-3"
                        class="w-4 h-4 text-gray-300 session-drag-handle cursor-move hover:text-gray-500"
                      />
                    </div>

                    <!-- Session Number -->
                    <div class="pl-2 py-5">
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
                      :class="{ 'opacity-50': !canAddSession(item) }"
                      @click="handleAddSession(item)"
                    />
                  </div>
                </div>
              </template>
            </UCollapsible>
          </div>
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

    <!-- Beta Mode Modal -->
    <UModal
      v-model:open="showBetaModal"
      title="Beta Mode"
      prevent-close
    >
      <template #body>
        <div class="py-4">
          <p class="text-sm text-gray-500">
            This product is currently in beta mode. You may experience some bugs or incomplete features.
          </p>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-end">
          <UButton color="primary" @click="dismissBetaModal">
            I Understand
          </UButton>
        </div>
      </template>
    </UModal>
  </UContainer>
</template>

<script setup>
import Modal from '~/components/ModalSessionEdit.vue'
import ModalSpace from '~/components/ModalSpaceEdit.vue'
import ModalEventEdit from '~/components/ModalEventEdit.vue'
import ModalConfirm from '~/components/ModalConfirm.vue'
import { createClient } from '@supabase/supabase-js'
import Sortable from 'sortablejs'

const SUPABASE_URL = 'https://xsijzyhfivzknrpxmtfk.supabase.co'
const SUPABASE_KEY = 'sb_publishable_f7LEykuQEqIaa30-x718nQ_jVoJ-txz'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const route = useRoute()
const config = useRuntimeConfig()

const myChannel = supabase.channel(`events/${route.params.id}`)
/**
 * Sending a message before subscribing will use HTTP
 */

// Connected users tracking
const connectedUsers = ref([])
const currentTime = ref(new Date())
const myUserId = generateId()
let heartbeatInterval

// Update current time every 5 seconds for connection age display (client-side only)
onMounted(() => {
  setInterval(() => {
    currentTime.value = new Date()
  }, 5000)

  const STALE_MS = 2 * 60 * 1000;
  
  // Subscribe to presence events (client-side only to prevent SSR duplicates)
  myChannel
    .on('presence', { event: 'sync' }, () => {
      const state = myChannel.presenceState()
      const now = Date.now();
      // Convert presence state to array of users and sort by most recent first
      connectedUsers.value = Object.keys(state)
        .flatMap(key => state[key])
        .filter(meta => {
    const ts = new Date(meta.online_at).getTime();
    return now - ts < STALE_MS; // keep only recent presence
  })
        .sort((a, b) => new Date(b.online_at) - new Date(a.online_at))
    })
    .on('presence', { event: 'join' }, ({ newPresences }) => {
      // User joined
    }).on('presence', { event: 'leave' }, ({ leftPresences }) => {
      // User left
    })
    .subscribe(async (status) => {
      connectionStatus.value = status
      if (status === 'SUBSCRIBED') {
        const trackPresence = async () => {
          await myChannel.track({
            user_id: myUserId,
            user_type: 'controller',
            online_at: new Date().toISOString()
          })
        }

        // Track initial presence
        await trackPresence()

        // Set up heartbeat
        heartbeatInterval = setInterval(trackPresence, 30000)
      }
    })
})

const connectionStatus = ref('CONNECTING')

const connectionStatusColor = computed(() => {
  switch (connectionStatus.value) {
    case 'SUBSCRIBED':
      return 'green'
    case 'CLOSED':
    case 'CHANNEL_ERROR':
    case 'TIMED_OUT':
      return 'red'
    default:
      return 'orange'
  }
})

const connectionStatusLabel = computed(() => {
  switch (connectionStatus.value) {
    case 'SUBSCRIBED':
      return 'Connected'
    case 'CLOSED':
      return 'Disconnected'
    case 'CHANNEL_ERROR':
      return 'Error'
    case 'TIMED_OUT':
      return 'Timed Out'
    default:
      return 'Connecting...'
  }
})

// Helper function to get connection age in seconds
const getConnectionAge = (onlineAt) => {
  const connectedTime = new Date(onlineAt)
  return Math.floor((currentTime.value - connectedTime) / 1000)
}

// Helper function to format connection age
const formatConnectionAge = (onlineAt) => {
  return ''
  const ageInSeconds = getConnectionAge(onlineAt)
  
  if (ageInSeconds < 10) return 'just now'
  if (ageInSeconds < 60) return `${ageInSeconds}s ago`
  
  const ageInMinutes = Math.floor(ageInSeconds / 60)
  if (ageInMinutes < 60) return `${ageInMinutes}m ago`
  
  const ageInHours = Math.floor(ageInMinutes / 60)
  return `${ageInHours}h ago`
}




definePageMeta({
  layout: 'app'
})

const showloading = ref(true)
const showBetaModal = ref(false)

const dismissBetaModal = () => {
  showBetaModal.value = false
  sessionStorage.setItem('beta_modal_dismissed', 'true')
}

onMounted(() => { 
      showloading.value = false 
      
      if (config.public.enableBetaModal && !sessionStorage.getItem('beta_modal_dismissed')) {
        showBetaModal.value = true
      }
    });

const eventId = route.params.id
const { data, error } = await useFetch(`/api/events/${route.params.id}`, {
  lazy: true,
})

const { data: userSession } = await useFetch(`/api/user/me`, {
  lazy: true,
})

const localEvent = ref({ spaces: [] })

watch(data, (newData) => {
  if (newData) {
    localEvent.value = JSON.parse(JSON.stringify(newData))
  }
}, { immediate: true, deep: true })

const event = computed(() => localEvent.value)

// Set page title with event title prefix
useHead(() => ({
  title: `${event.value?.title || 'Unnamed'} - Controller`
}))

const toast = useToast()

const saveEvent = async () => {
  try {
    await $fetch(`/api/events/${eventId}`, {
      method: 'POST',
      body: {
        ...localEvent.value,
        spaces: localEvent.value.spaces
      }
    })
    
    myChannel
      .send({
        type: 'broadcast',
        event: 'update',
        payload: { message: 'update' },
      })
  .then((resp) => toast.add({ title: 'Event saved', color: 'green' }))
  } catch (e) {
    toast.add({ title: 'Error saving event', description: e.message, color: 'red' })
  }
}

watch(error, (newError) => {
  if (newError) {
    showloading.value = false
  }
}, { immediate: true })

const canAddSpace = computed(() => {
  if (!userSession.value?.capabilities) return false
  return event.value.spaces.length < userSession.value.capabilities.max_spaces
})

const handleAddSpace = () => {
  if (!canAddSpace.value) {
    toast.add({
      title: 'Upgrade Required',
      description: `You have reached the maximum number of spaces (${userSession.value.capabilities.max_spaces}) for your plan.`,
      color: 'amber'
    })
    return
  }
  addSpace()
}

const addSpace = () => {
  localEvent.value.spaces.push({
    id: generateId(),
    title: `New Space ${localEvent.value.spaces.length + 1}`,
    now: '',
    sessions: []
  })
  saveEvent()
}

const canAddSession = (space) => {
  if (!userSession.value?.capabilities) return false
  return space.sessions.length < userSession.value.capabilities.max_sessions
}

const handleAddSession = (space) => {
  if (!canAddSession(space)) {
    toast.add({
      title: 'Upgrade Required',
      description: `You have reached the maximum number of sessions (${userSession.value.capabilities.max_sessions}) for this space.`,
      color: 'amber'
    })
    return
  }
  addSession(space)
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
    event.value.spaces = event.value.spaces.filter((s) => s.id !== space.id)
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
  const index = event.value.spaces.findIndex((s) => s.id === space.id)
  if (index !== -1) {
    event.value.spaces[index] = newSpace
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
  const spaceIndex = localEvent.value.spaces.findIndex((s) => s.id === space.id)
  if (spaceIndex !== -1) {
    localEvent.value.spaces[spaceIndex].now = sessionId
    saveEvent()
  }
}

// Event Title Editing
const isEditingEvent = ref(false)

const updateEventTitle = (newTitle) => {
  if (event.value) {
    event.value.title = newTitle
    saveEvent()
  }
}

// Cleanup presence tracking on unmount
onUnmounted(() => {
  myChannel.untrack()
})

// Drag and Drop Logic
const spacesContainer = ref(null)
const sessionSortableInstances = new Map()

watch(spacesContainer, (el) => {
  if (el) {
    Sortable.create(el, {
      animation: 150,
      handle: '.space-drag-handle',
      onEnd: (evt) => {
        const item = localEvent.value.spaces.splice(evt.oldIndex, 1)[0]
        localEvent.value.spaces.splice(evt.newIndex, 0, item)
        saveEvent()
      }
    })
  }
})

const setSessionContainerRef = (el, spaceId) => {
  if (el) {
    if (!sessionSortableInstances.has(spaceId)) {
      const sortable = Sortable.create(el, {
        animation: 150,
        handle: '.session-drag-handle',
        group: {
          name: `sessions-${spaceId}`,
          pull: false,
          put: false
        },
        onEnd: (evt) => {
          const space = localEvent.value.spaces.find(s => s.id === spaceId)
          if (space) {
            const item = space.sessions.splice(evt.oldIndex, 1)[0]
            space.sessions.splice(evt.newIndex, 0, item)
            saveEvent()
          }
        }
      })
      sessionSortableInstances.set(spaceId, sortable)
    }
  } else {
    const instance = sessionSortableInstances.get(spaceId)
    if (instance) {
      instance.destroy()
      sessionSortableInstances.delete(spaceId)
    }
  }
}
</script>
