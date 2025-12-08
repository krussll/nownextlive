# Design and Styling Preferences

This document serves as a reference for the design and styling standards of the **Now. Next. Live.** application. It is intended to be a living document that evolves with the project.

## Tech Stack & Libraries

- **Framework**: Nuxt 4 (Vue 3)
- **UI Library**: [Nuxt UI v3](https://ui.nuxt.com) (Alpha/Beta versions detected as v4 in package.json, likely referring to Nuxt UI v3 which supports Nuxt 4)
- **Styling Engine**: Tailwind CSS v4 (via `@import "tailwindcss"`)
- **Fonts**: `@nuxt/fonts`
- **Icons**: Lucide Icons (via Nuxt UI, e.g., `i-lucide-log-in`)

## Core Design Principles

### Color Palette

- **Primary/Neutral**: The application heavily relies on `neutral` colors for a clean, modern look.
- **Preference**: `light` mode is currently set as the preference in `nuxt.config.ts`.

### Typography

- Fonts are managed via `@nuxt/fonts`.
- _To be populated: Specific font families used._

### Component Styling

- **Buttons**:
  - Usage of `UButton` component.
  - Common variants: `ghost`, `outline`.
  - Styling: `rounded-none` is observed, suggesting a preference for sharp, rectangular buttons over rounded ones.
  - Interactions: `hover:shadow-lg` is used to provide depth on interaction.
  - Sizes: `lg` is a common size for primary actions.

- **Form Fields**:
  - **Input Fields** (`UInput`):
    - **REQUIRED**: All input fields must have `class="w-full h-12"` for consistent full-width and fixed height (48px).
    - For inputs with `:ui` prop customization, include `h-12` in the `base` property: `:ui="{ base: 'rounded-none h-12' }"`.
    - Always include `class="w-full"` alongside the `:ui` prop when both are used.
  - **Textarea Fields** (`UTextarea`):
    - **REQUIRED**: Must have `class="w-full h-12"` at minimum.
    - The `h-12` provides a minimum height; use `rows` attribute for multi-line textareas as needed.
  - **Time Inputs** (`UInputTime`):
    - **REQUIRED**: Must have `class="w-full h-12"` for consistency with other form fields.
  - **General Rule**: All form input components should maintain consistent sizing with `w-full` (100% width) and `h-12` (48px height) classes.

### Layout

- **Structure**: The app is wrapped in `UApp`.
- **Standard Layout**: Uses `UHeader`, `UMain`, and `UFooter` for a consistent structure.
- **Responsive Design**: Tailwind utility classes (e.g., `lg:hidden`, `lg:inline-flex`) are used to handle responsiveness.

## Code Standards

- **Utility Classes**: Use Tailwind utility classes directly in the `class` attribute for layout and spacing.
- **Components**: Prefer using Nuxt UI components (`<UButton>`, `<UInput>`, etc.) over building custom HTML elements to ensure consistency.
- **Icons**: Use the `i-` prefix with Lucide icons (e.g., `i-lucide-home`).

## Future Additions

- [ ] Define specific font families.
- [ ] Add color codes for custom branding if introduced.
- [ ] Document specific spacing scales if they deviate from Tailwind defaults.
