<template>
  <UContainer class="py-16 space-y-16">
    <!-- Hero -->
    <section class="text-center space-y-4">
      <h1 class="text-4xl font-bold tracking-tight">
        About NowNext.live
      </h1>
      <p class="text-gray-600 max-w-2xl mx-auto">
        A simple, reliable way to keep players, teams, volunteers and spectators
        informed—without paper schedules, last-minute confusion, or shouting across the room.
      </p>
    </section>

    <!-- Mission -->
    <section class="grid md:grid-cols-2 gap-12 items-center">
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold">Why This Exists</h2>
        <p class="text-gray-600 leading-relaxed">
          At every grassroots sports club, tournament, local event or social competition,
          there’s always the same problem: schedules change, players lose track, and
          organisers get stuck answering the same questions over and over.
        </p>
        <p class="text-gray-600 leading-relaxed">
          NowNext.live removes all of that friction. One controller. Unlimited displays.
          Instant updates—wherever screens are placed.
        </p>
      </div>

      <div class="rounded-xl border bg-white p-6 shadow-sm">
        <h3 class="font-semibold text-lg mb-4">Built For</h3>
        <ul class="space-y-2 text-gray-700">
          <li>• Sports clubs & leagues</li>
          <li>• Tournament directors</li>
          <li>• Community events & charity days</li>
          <li>• Schools, halls & competitions</li>
          <li>• Anyone replacing messy paper schedules</li>
        </ul>
      </div>
    </section>

    <!-- How it works -->
    <section class="space-y-8">
      <h2 class="text-2xl font-semibold text-center">How It Works</h2>

      <div class="grid md:grid-cols-3 gap-10">
        <div class="text-center space-y-3">
          <div class="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
            <UIcon name="i-heroicons-rectangle-group" class="w-8 h-8 text-slate-600" />
          </div>
          <h3 class="font-semibold">1. Create Your Board</h3>
          <p class="text-gray-600 text-sm">
            Build out spaces and sessions for your event. Name them whatever you like.
          </p>
        </div>

        <div class="text-center space-y-3">
          <div class="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
            <UIcon name="i-heroicons-adjustments-horizontal" class="w-8 h-8 text-slate-600" />
          </div>
          <h3 class="font-semibold">2. Open The Controller</h3>
          <p class="text-gray-600 text-sm">
            Update matchups, sessions or timing with a single click. Everything syncs instantly.
          </p>
        </div>

        <div class="text-center space-y-3">
          <div class="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
            <UIcon name="i-heroicons-tv" class="w-8 h-8 text-slate-600" />
          </div>
          <h3 class="font-semibold">3. Displays Update Live</h3>
          <p class="text-gray-600 text-sm">
            Any connected display—TV, laptop, projector—updates automatically.
          </p>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-12 border-t">
      <h2 class="text-2xl font-semibold text-center mb-10">Our Principles</h2>

      <div class="grid md:grid-cols-3 gap-8">
        <div class="space-y-2">
          <h3 class="font-semibold">Simplicity First</h3>
          <p class="text-gray-600 text-sm">
            No bloated dashboards. No training required. A tool that simply does what it should.
          </p>
        </div>

        <div class="space-y-2">
          <h3 class="font-semibold">Designed for Real Clubs</h3>
          <p class="text-gray-600 text-sm">
            Built from real feedback from event volunteers, league organisers and club admins.
          </p>
        </div>

        <div class="space-y-2">
          <h3 class="font-semibold">Reliable and Fast</h3>
          <p class="text-gray-600 text-sm">
            Changes appear on every screen instantly—no refresh required.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="text-center py-16 space-y-6">
      <h2 class="text-2xl font-semibold">Ready to Run a Cleaner Event?</h2>
      <p class="text-gray-600 max-w-xl mx-auto">
        Try NowNext.live and replace confusion with clarity.
      </p>

      <UButton
        size="lg"
        color="primary"
        to="/"
      >
        Get Started
      </UButton>
    </section>
  </UContainer>
</template>

<script setup>
// No script logic needed, purely presentational
</script>
