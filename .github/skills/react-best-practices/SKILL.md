---
name: react-best-practices
description: React and Vite performance and accessibility guidelines for this repository. Use when writing, reviewing, or refactoring React code in this project.
metadata:
  author: team
  version: '1.0.0'
---

# React Best Practices Skill (Local)

Adapted from Vercel's react-best-practices skill structure for this reusable Vite + React + TypeScript scaffold.

## When to Apply

Use this skill when:

- Writing new React components.
- Refactoring feature UI or state logic.
- Reviewing PRs for performance and accessibility.
- Making tradeoffs around bundle size and rendering behavior.

## Rule Categories by Priority

1. Eliminating Waterfalls (CRITICAL)
2. Bundle Size Optimization (CRITICAL)
3. Client-Side Data Fetching (HIGH)
4. Re-render Optimization (MEDIUM)
5. Rendering Performance (MEDIUM)
6. JavaScript Performance (LOW-MEDIUM)
7. Advanced Patterns (LOW)

## Scope Constraints (This Repository)

- This project is a client-rendered Vite SPA (no SSR/SSG).
- Do not suggest server components, SSR hydration patterns, or server-rendering optimizations.
- Prefer browser-only React guidance and client data-fetching patterns.

## UI System Constraint (Fluent UI React)

- Do not add another UI component library unless explicitly requested.
- Prefer Fluent composition and props over custom component reinvention.
- Use `@fluentui/react-icons` for iconography and keep interactive icons labeled.
- Keep styling aligned with existing app theme variables and Fluent theming patterns.

## Project-Specific Defaults

- Accessibility-first decisions override minor performance gains.
- Keep feature ownership clear under src/features.
- Prefer semantic HTML and explicit labels.
- Avoid effect-driven interaction logic when handlers are sufficient.
- Start independent async work in parallel and await late.
- Keep props stable for memoized children.
- Keep dialogs and forms accessible: visible labels, required markers, meaningful validation states.
- Prefer class-based styling over large inline style objects in JSX.
- Keep Fluent imports narrow (import only used controls/icons) for bundle discipline.

## Folder Conventions (Feature-First)
aaaaaaa
### Design Rules

- Separate UI concerns from domain/model logic inside each feature.
- Keep files single-purpose and split large components early.
- Keep nesting shallow (target 3 levels, hard max 4).
- Co-locate tests and feature styles with the code they support.

### Recommended src Shape

- src/app: app bootstrap, route/layout composition, app-level providers, global styles.
- src/features/<feature-name>/ui: feature UI components only.
- src/features/<feature-name>/model: feature state, selectors, mappers, and types.
- src/features/<feature-name>/api: feature-scoped API calls and adapters.
- src/features/<feature-name>/hooks: feature-specific hooks.
- src/features/<feature-name>/styles: feature SCSS modules/partials when needed.
- src/shared/ui: generic reusable presentational components.
- src/shared/hooks: shared reusable hooks.
- src/shared/lib: pure helpers/utilities.
- src/shared/types: cross-feature generic types.
- public: static assets (icons, images, fonts).

### Naming and Boundaries

- Components and component folders use PascalCase.
- Hooks and utilities use camelCase.
- Tests are colocated with source files (_.test.ts, _.test.tsx).
- Use index.ts barrel exports only at feature/public boundaries.
- Feature code may import from its own feature and from src/shared.
- src/shared must never import from src/features.

## Additional Scaffold Guardrails

- Keep route-level pages in `src/app` composition and feature UI in `src/features/<name>/ui`.
- Keep reusable non-domain UI primitives in `src/shared/ui`; do not move feature-specific controls there early.

## References

- https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices
- https://react.dev
- https://vite.dev
