<script setup lang="ts">
// Ensure to replace 'YOUR_IMAGE_FILENAME.png' with the actual filename of your neon diagram image.
// Assuming a default primary color is configured (e.g., indigo or blue).

// Configuration to enforce sharp corners globally (best practice in a Nuxt UI project)
// You would put this in app.config.ts or your main.css, but for component-level
// enforcement, we use the rounded-none class.

const features = [
  {
    icon: 'i-lucide-zap',
    title: 'Instant updates',
    description:
      'Change what’s on now and what’s coming next — all screens update immediately.'
  },
  {
    icon: 'i-lucide-globe',
    title: 'No installs needed',
    description:
      'Runs in any browser on TVs, tablets, phones and laptops. Nothing to download.'
  },
  {
    icon: 'i-lucide-user-check',
    title: 'Easy for anyone to use',
    description: 'If you can type, you can use it. No tech knowledge required.'
  },
  {
    icon: 'i-lucide-trophy',
    title: 'Works on match days',
    description:
      'Perfect for bowls, tennis, squash, darts, pool and other club events.'
  },
  {
    icon: 'i-lucide-layout-dashboard',
    title: 'Simple control panel',
    description: 'Update all your rooms or courts in seconds.'
  }
]

const steps = [
  {
    number: 1,
    title: 'Create a board',
    description:
      'Start a new board for your club or event — it takes 10 seconds.'
  },
  {
    number: 2,
    title: 'Open the controller',
    description: 'Type what’s happening now and what’s next for each space.'
  },
  {
    number: 3,
    title: 'Every display updates instantly',
    description:
      'Put the display view on TVs or tablets around the venue — they follow your changes automatically.'
  }
]

const testimonials = [
  {
    quote:
      '“Perfect for clubs with no tech team. We had it running in minutes.”',
    author: 'Club Secretary'
  },
  {
    quote: '“Members instantly knew where to go. So much calmer on match day.”',
    author: 'Tournament Organiser'
  },
  {
    quote: '“The fact it’s just in the browser is brilliant. No downloads!”',
    author: 'Volunteer'
  }
]
</script>

<template>
  <div class="bg-white text-gray-900 antialiased min-h-screen">
    <section class="py-24 md:py-24 border-b border-gray-100">
      <UContainer class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <h1
            class="text-6xl md:text-6xl font-extrabold tracking-tighter leading-tight"
          >
            Ditch the paper.
            <div
              class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-600 to-cyan-500"
            >
              Your schedule. Updating everywhere. Instantly.
            </div>
          </h1>
          <p class="mt-6 text-xl text-gray-600 max-w-lg">
            Effortlessly display live schedules and updates across any screen. Change it once, and every device updates automatically.
          </p>

          <div class="mt-10 flex flex-col sm:flex-row gap-4">
            <UButton
              to="/r/generate"
              label="Try for free now"
              trailing-icon="i-lucide-arrow-right"
              color="primary"
              variant="solid"
              size="xl"
              class="rounded-none font-bold shadow-xl shadow-primary-200/50"
            />
          </div>
        </div>

        <div class="relative flex justify-center lg:justify-end">
          <div class="p-4 rounded-none">
            <img
              src="/imgs/neon-hero.png"
              alt="Diagram of NowNext live updating system"
              class="w-full h-auto max-w-xl rounded-none"
            />
          </div>
        </div>
      </UContainer>
    </section>

    

    <section class="py-24 border-b border-gray-100">
      <UContainer>
        <h2 class="text-4xl font-extrabold text-center mb-16">
          How It
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500"
            >Works</span
          >
        </h2>

        <div class="grid lg:grid-cols-3 gap-12">
          <div
            v-for="step in steps"
            :key="step.number"
            class="text-center p-6 border border-gray-200 rounded-none hover:shadow-xl transition-shadow"
          >
            <p
              class="text-8xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400 leading-none"
            >
              {{ step.number }}
            </p>
            <h3 class="text-2xl font-bold mb-3 text-gray-900">
              {{ step.title }}
            </h3>
            <p class="text-gray-600">{{ step.description }}</p>
          </div>
        </div>
      </UContainer>
    </section>

    <section class="py-24 bg-white border-b border-gray-100">
      <UContainer>
        <h2 class="text-4xl font-extrabold text-center mb-16">
          See It In
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500"
            >Action</span
          >
        </h2>

        <div class="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
          <div class="border border-gray-200 rounded-none p-6 hover:shadow-xl transition-shadow">
            <h3 class="text-2xl font-bold mb-6 text-gray-900">
              Controller View
            </h3>
            <img
              src="/imgs/demos/nownextlive-controller.png"
              alt="NowNext.live Controller Interface"
              class="w-full h-auto rounded-none shadow-lg"
            />
            <p class="mt-4 text-gray-600">
              Simple control panel to manage all your spaces and sessions in real-time.
            </p>
          </div>

          <div class="border border-gray-200 rounded-none p-6 hover:shadow-xl transition-shadow">
            <h3 class="text-2xl font-bold mb-6 text-gray-900">
              Display View
            </h3>
            <img
              src="/imgs/demos/nownextlive-display.png"
              alt="NowNext.live Display Screen"
              class="w-full h-auto rounded-none shadow-lg"
            />
            <p class="mt-4 text-gray-600">
              Clean, easy-to-read display that updates instantly across all screens.
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <section id="features" class="py-24 bg-gray-50 border-b border-gray-100">
      <UContainer>
        <h2 class="text-4xl font-extrabold text-center mb-16">
          Why Clubs Love <SiteLogo class="text-4xl font-extrabold tracking-tight" />
        </h2>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <UCard
            v-for="feature in features"
            :key="feature.title"
            :ui="{
              base: 'rounded-none', // Enforce sharp corners
              body: 'flex flex-col items-center text-center',
              ring: 'ring-1 ring-gray-200 hover:ring-indigo-300 transition-all',
              divide: 'divide-none' // Remove internal dividers
            }"
            class="hover:bg-indigo-50/50 transition-colors"
          >
            <div
              class="w-16 h-16 mb-4 flex items-center justify-center mx-auto bg-gradient-to-br from-indigo-500 to-cyan-400 p-1 rounded-none shadow-lg"
            >
              <UIcon :name="feature.icon" class="w-8 h-8 text-white" />
            </div>

            <h3 class="text-xl font-bold mb-2 text-gray-900">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </UCard>
        </div>
      </UContainer>
    </section>
    <section class="py-24 bg-gray-50 border-b border-gray-100">
      <UContainer>
        <h2 class="text-4xl font-extrabold text-center mb-16">
          What Clubs <span class="text-indigo-600">Say</span>
        </h2>

        <div class="grid md:grid-cols-3 gap-8">
          <UCard
            v-for="(testimonial, index) in testimonials"
            :key="index"
            :ui="{
              base: 'rounded-none', // Enforce sharp corners
              ring: 'ring-1 ring-gray-200',
              body: 'italic text-gray-700',
              header: 'pt-6 pb-2', // Use header for the quote mark styling
              footer: 'pt-2 pb-6'
            }"
            class="bg-white"
          >
            <template #header>
              <UIcon
                name="i-lucide-quote"
                class="w-8 h-8 text-indigo-400 mb-2"
              />
            </template>

            <blockquote class="text-lg leading-relaxed">
              {{ testimonial.quote }}
            </blockquote>

            <template #footer>
              <p class="mt-4 text-sm font-semibold text-indigo-600 not-italic">
                — {{ testimonial.author }}
              </p>
            </template>
          </UCard>
        </div>
      </UContainer>
    </section>






    <section class="py-24 border-b border-gray-100 bg-white">
      <UContainer>
        <h2 class="text-4xl font-extrabold text-center mb-16">
          Frequently Asked <span class="text-indigo-600">Questions</span>
        </h2>
        <div class="max-w-3xl mx-auto">
          <UAccordion
            multiple
            :items="[
              {
                label: 'What is NowNext.live?',
                content: `NowNext.live is a simple tool that lets you create live, auto-updating display boards for sports events, club days, tournaments, training sessions, and any schedule that needs to be shared clearly. Update once from a controller — every connected screen updates instantly.`
              },
              {
                label: 'Do I need to install anything?',
                content: `No. NowNext.live runs entirely in the browser. Open the controller on your laptop or phone, and open the display link on any screen, smart TV, tablet, projector, or device with a browser.`
              },
              {
                label: 'How do I set up my first event?',
                content: `Create a board → Add your spaces → Add your sessions → Share the display link. Whenever you update the controller, every connected display changes in real time.`
              },
              {
                label: 'Can multiple people manage the board?',
                content: `Yes. You can share the controller link with other organisers or coaches. Everyone sees changes instantly.`
              },
              {
                label: 'What types of events is this useful for?',
                content: `NowNext.live is perfect for sports tournaments, club nights, coaching sessions, livestreams, training days, corporate sessions, and community events — anywhere people need to see what’s happening now and next.`
              },
              {
                label: 'Does it work on smart TVs?',
                content: `Yes. Simply open the display link in the TV’s browser — it automatically scales to look like a modern digital screen.`
              },
              {
                label: 'Do spectators or players need accounts?',
                content: `No. Only the organiser needs controller access. Displays can be opened by anyone with the link — no login required.`
              },
              {
                label: 'What happens if my internet connection drops?',
                content: `Displays stay visible and reconnect automatically when the internet returns. Any updates sync instantly once reconnected.`
              },
              {
                label: 'Can I customise the look of the display?',
                content: `You can adjust layout, text size, and presentation style. More customisation options are coming soon.`
              },
              {
                label: 'Is this free to use?',
                content: `A free tier is available. Paid plans unlock more spaces, more sessions, and custom display features.`
              },
              {
                label: 'Do I need an account?',
                content: `You can start without one, but an account lets you save boards, manage displays, and upgrade your plan.`
              },
              {
                label: 'Can this replace printed schedules?',
                content: `Yes — that’s exactly what it’s built for. No more reprinting or rewriting boards. Update once, and all displays update instantly.`
              }
            ]"
            :ui="{
              wrapper: 'divide-y divide-gray-200',
              item: {
                base: 'py-2',
                size: 'text-base',
                color: 'text-gray-600',
                padding: 'pt-2 pb-6'
              },
              default: {
                class: 'text-left w-full py-4 text-lg font-bold text-gray-900 hover:text-indigo-600 transition-colors',
                openIcon: 'i-lucide-minus',
                closeIcon: 'i-lucide-plus'
              }
            }"
          />
        </div>
      </UContainer>
    </section>






    <UFooter
      class="py-12 border-t border-gray-200"
      :ui="{ wrapper: 'border-none' }"
    >
      <template #left>
        <SiteLogo />
        <p class="text-sm text-gray-500">
          Simple, live “Now & Next” boards for sports clubs.
        </p>
      </template>

      <template #right>
        <div class="flex space-x-6 text-sm">
          <ULink to="/about" class="text-gray-600 hover:text-indigo-600"
            >About</ULink
          >
          <ULink to="/contact" class="text-gray-600 hover:text-indigo-600"
            >Contact</ULink
          >
          <ULink to="/privacy" class="text-gray-600 hover:text-indigo-600"
            >Privacy</ULink
          >
        </div>
      </template>
    </UFooter>
  </div>
</template>
