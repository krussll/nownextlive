# Project Rules & Guidelines

- **Testing & Building**:
  - When testing or building the solution, use `npm run dev`.
  - **Change Validation & Visual Review**: Use the headless Chrome / Puppeteer browser runner to test user workflows, verify UI rendering, take screenshots, and validate changes before completing tasks.
- **Feature Branching & Implementation Plans**:
  - Every new feature requiring an implementation plan MUST go into a new feature branch.
  - Creating and checking out the feature branch MUST be the very first action in the Implementation Plan.
  - Each feature plan MUST contain only ONE new item/feature.
  - If multiple things are requested at once, push back and confirm with the user which single action should be taken for the new plan.
  - For each feature request, create a Pull Request (PR) from the new feature branch to `release-staging`.
- **Project Documentation**: Refer to [.agents/PROJECT_CONTEXT.md](file:///home/reecewilliams8/dev%20work/nownext.live/nuxt/nownextlive/nownext.live/.agents/PROJECT_CONTEXT.md) for full context on application purpose, architecture, UI design standards, and marketing positioning.