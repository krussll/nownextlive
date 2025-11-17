---
layout: default
title: Now Next Live
---
<section class="hero">
  <div class="hero-card">
    <div class="hero-copy">
      <h1>Your Club Schedule, Live</h1>
      <p>Update every screen instantly from your phone or laptop — no apps, no setup.</p>
      <div class="cta-buttons">
        <a class="button cta-button" href="/r/NDST3" id="demo-cta">Try a Demo</a>
      </div>
    </div>
    <div class="hero-visual">
      <div class="card-grid two-column">
        <article class="card">
          <h3>Instant updates</h3>
          <p>Change what’s on now and what’s coming next — all screens update immediately.</p>
        </article>
        <article class="card">
          <h3>No installs needed</h3>
          <p>Runs in any browser on TVs, tablets, phones and laptops. Nothing to download.</p>
        </article>
      </div>
    </div>
  </div>
</section>

<div
  class="modal-overlay"
  id="demo-modal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="demo-modal-title"
  aria-hidden="true"
>
  <div class="modal" tabindex="-1">
    <h2 id="demo-modal-title">NowNext Live is in beta</h2>
    <p>
      This product is currently in beta testing. If you’d like to join, please email
      <a href="mailto:reece@reecewilliams.co">reece@reecewilliams.co</a>.
    </p>
    <div class="modal-actions">
      <button type="button" class="modal-close" data-close-modal>Close</button>
    </div>
  </div>
</div>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const ctaButton = document.getElementById("demo-cta");
    const modal = document.getElementById("demo-modal");
    const closeButtons = modal?.querySelectorAll("[data-close-modal]") || [];
    const modalCard = modal?.querySelector(".modal");

    if (!ctaButton || !modal) return;

    const openModal = (event) => {
      event.preventDefault();
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      modalCard?.focus();
    };

    const closeModal = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      ctaButton.focus();
    };

    ctaButton.addEventListener("click", openModal);

    closeButtons.forEach((button) => {
      button.addEventListener("click", closeModal);
    });

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });
  });
</script>

<section class="section">
  <div class="section-header">
    <h2>Why Clubs Love NowNext</h2>
    <p>Simple tools that keep every court, room, or table in sync.</p>
  </div>
  <div class="card-grid three-column">
    <article class="card">
      <h3>Easy for anyone to use</h3>
      <p>If you can type, you can use it. No tech knowledge required.</p>
    </article>
    <article class="card">
      <h3>Works on match days</h3>
      <p>Perfect for bowls, tennis, squash, darts, pool and other club events.</p>
    </article>
    <article class="card">
      <h3>Simple control panel</h3>
      <p>Update all your rooms or courts in seconds.</p>
    </article>
  </div>
</section>

<section class="section">
  <div class="section-header">
    <h2>How It Works</h2>
    <p>Three quick steps to keep everyone on the same page.</p>
  </div>
  <div class="card-grid three-column">
    <article class="card">
      <div class="meta">1. Create a board</div>
      <h3>Start in 10 seconds</h3>
      <p>Start a new board for your club or event — it takes 10 seconds.</p>
    </article>
    <article class="card">
      <div class="meta">2. Open the controller</div>
      <h3>Type what’s happening</h3>
      <p>Type what’s happening now and what’s next for each space.</p>
    </article>
    <article class="card">
      <div class="meta">3. Displays update</div>
      <h3>Instantly everywhere</h3>
      <p>Put the display view on TVs or tablets around the venue — they follow your changes automatically.</p>
    </article>
  </div>
</section>

<section class="section testimonials">
  <div class="section-header">
    <h2>What Clubs Say</h2>
  </div>
  <div class="card-grid two-column">
    <article class="card">
      <blockquote>
        <p>“Perfect for clubs with no tech team. We had it running in minutes.”</p>
        <cite>— Club Secretary</cite>
      </blockquote>
    </article>
    <article class="card">
      <blockquote>
        <p>“Members instantly knew where to go. So much calmer on match day.”</p>
        <cite>— Tournament Organiser</cite>
      </blockquote>
    </article>
    <article class="card">
      <blockquote>
        <p>“The fact it’s just in the browser is brilliant. No downloads!”</p>
        <cite>— Volunteer</cite>
      </blockquote>
    </article>
  </div>
</section>

<section class="section cta-section">
  <div class="section-header">
    <h2>About NowNext</h2>
    <p>Simple, live “Now & Next” boards for sports clubs.</p>
  </div>
  <div class="cta-buttons">
    <a class="button" href="/about">About</a>
    <a class="button secondary" href="/contact">Contact</a>
    <a class="button secondary" href="/privacy">Privacy</a>
  </div>
</section>
