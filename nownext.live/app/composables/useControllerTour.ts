import { driver, type Driver, type DriveStep } from 'driver.js'
import '~/assets/css/driver-theme.css'

export const useControllerTour = () => {
  const tourCookie = useCookie<string | null>(
    'nownext_controller_tour_completed',
    {
      maxAge: 60 * 60 * 24 * 365,
      path: '/'
    }
  )

  let driverInstance: Driver | null = null

  const markTourCompleted = () => {
    tourCookie.value = 'true'
  }

  const startTour = (stepIndex = 0) => {
    if (!import.meta.client) return

    // Clean up any existing tour instance
    if (driverInstance) {
      driverInstance.destroy()
      driverInstance = null
    }

    const tourSteps: DriveStep[] = [
      {
        element: '#tour-event-title',
        popover: {
          title: 'Event Title',
          description:
            'Click the event title anytime to rename your event or tournament. Updates sync instantly to all connected screens.',
          side: 'bottom',
          align: 'start'
        }
      },
      {
        element: '#tour-output-links',
        popover: {
          title: 'Display & Output Links',
          description:
            'Generate public presentation links for TVs, court projectors, or spectator phones. You can preview displays or copy links to share with your team.',
          side: 'right',
          align: 'start'
        }
      },
      {
        element: '#tour-global-actions',
        popover: {
          title: 'Master Controls',
          description:
            'Quickly advance the active session across all spaces simultaneously with "Next Session (All)", or add new stages, courts, or tracks with "Add Space".',
          side: 'bottom',
          align: 'end'
        }
      },
      {
        element: '#tour-space-card',
        popover: {
          title: 'Spaces & Stages',
          description:
            'Each space holds its own scheduled session queue. You can drag to reorder spaces, adjust space settings, or advance sessions individually.',
          side: 'top',
          align: 'start'
        }
      },
      {
        element: '#tour-session-card',
        popover: {
          title: 'Session Management',
          description:
            'Each session includes a duration timer, title, and drag handle. Click the green Play button to immediately set a session LIVE on public screens.',
          side: 'top',
          align: 'start'
        }
      },
      {
        element: '#tour-connected-users',
        popover: {
          title: 'Real-Time Sync',
          description:
            'Monitor real-time status and see all active controllers and spectator displays receiving live updates via Supabase WebSockets.',
          side: 'right',
          align: 'start'
        }
      },
      {
        element: '#tour-help-trigger',
        popover: {
          title: 'Replay Anytime',
          description:
            'Need a quick refresher later? You can restart this interactive guide whenever you want by clicking this Tour button.',
          side: 'bottom',
          align: 'end'
        }
      }
    ]

    // Only include steps whose elements exist in the DOM
    const activeSteps = tourSteps.filter((step) => {
      if (typeof step.element === 'string') {
        return !!document.querySelector(step.element)
      }
      return !!step.element
    })

    if (activeSteps.length === 0) return

    driverInstance = driver({
      showProgress: true,
      animate: true,
      allowClose: true,
      overlayColor: 'rgba(15, 23, 42, 0.6)',
      nextBtnText: 'Next →',
      prevBtnText: '← Back',
      doneBtnText: 'Got It!',
      onDestroyed: () => {
        markTourCompleted()
      },
      steps: activeSteps
    })

    driverInstance.drive(stepIndex)
  }

  const maybeAutoStartTour = (delayMs = 600) => {
    if (!import.meta.client) return
    if (tourCookie.value === 'true') return

    setTimeout(() => {
      // Re-check cookie right before launching
      if (tourCookie.value !== 'true') {
        startTour(0)
      }
    }, delayMs)
  }

  return {
    tourCookie,
    isTourCompleted: computed(() => tourCookie.value === 'true'),
    startTour,
    maybeAutoStartTour,
    markTourCompleted
  }
}
