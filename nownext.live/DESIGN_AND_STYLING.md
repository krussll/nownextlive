# Design and Styling Preferences

This document serves as a reference for the design and styling standards of the **Now. Next. Live.** application. It is intended to be a living document that evolves with the project.

## Tech Stack & Libraries

-   **Framework**: Nuxt 4 (Vue 3)
-   **UI Library**: [Nuxt UI v3](https://ui.nuxt.com) (Alpha/Beta versions detected as v4 in package.json, likely referring to Nuxt UI v3 which supports Nuxt 4)
-   **Styling Engine**: Tailwind CSS v4 (via `@import "tailwindcss"`)
-   **Fonts**: `@nuxt/fonts`
-   **Icons**: Lucide Icons (via Nuxt UI, e.g., `i-lucide-log-in`)

## Core Design Principles

### Color Palette
-   **Primary/Neutral**: The application heavily relies on `neutral` colors for a clean, modern look.
-   **Preference**: `light` mode is currently set as the preference in `nuxt.config.ts`.

### Typography
-   Fonts are managed via `@nuxt/fonts`.
-   *To be populated: Specific font families used.*

### Component Styling
-   **Buttons**:
    -   Usage of `UButton` component.
    -   Common variants: `ghost`, `outline`.
    -   Styling: `rounded-none` is observed, suggesting a preference for sharp, rectangular buttons over rounded ones.
    -   Interactions: `hover:shadow-lg` is used to provide depth on interaction.
    -   Sizes: `lg` is a common size for primary actions.

### Layout
-   **Structure**: The app is wrapped in `UApp`.
-   **Standard Layout**: Uses `UHeader`, `UMain`, and `UFooter` for a consistent structure.
-   **Responsive Design**: Tailwind utility classes (e.g., `lg:hidden`, `lg:inline-flex`) are used to handle responsiveness.

## Code Standards

-   **Utility Classes**: Use Tailwind utility classes directly in the `class` attribute for layout and spacing.
-   **Components**: Prefer using Nuxt UI components (`<UButton>`, `<UInput>`, etc.) over building custom HTML elements to ensure consistency.
-   **Icons**: Use the `i-` prefix with Lucide icons (e.g., `i-lucide-home`).

## Future Additions
-   [ ] Define specific font families.
-   [ ] Add color codes for custom branding if introduced.
-   [ ] Document specific spacing scales if they deviate from Tailwind defaults.
