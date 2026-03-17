# Copilot Instructions — React Best Practices

## Goal

Use this repository as a reusable scaffold for **Do / Don't** patterns and standards for modern React (Vite + TypeScript) in 2026.

## When to apply these instructions

Use these rules when:

- Writing or refactoring React components.
- Reviewing PRs for performance or accessibility regressions.
- Implementing client-side data fetching and caching.
- Making choices that affect bundle size or render frequency.

## Engineering priorities

1. Accessibility first.
2. Predictable performance.
3. Clear feature ownership and maintainable folder structure.

## Priority model (adapted from Vercel React Best Practices)

Prioritize decisions in this order:

1. Eliminating waterfalls (critical)
2. Bundle size optimization (critical)
3. Client-side data fetching (high)
4. Re-render optimization (medium)
5. Rendering performance (medium)
6. JavaScript micro-optimizations (low-medium)
7. Advanced patterns (low; use only when justified)

## Scope for this app scaffold

- This app is a client-rendered Vite SPA (no SSR/SSG).
- Do not propose server components, SSR hydration strategies, or server rendering optimizations.
- Prefer guidance that applies to browser-rendered React only.

## UI framework standard (Fluent UI React)

- Do not introduce parallel UI component libraries (for example MUI, Chakra, Ant) unless explicitly requested.
- Keep visual consistency by preferring Fluent props/slots/appearances before custom wrappers.
- Use `FluentProvider` theme tokens and existing CSS variables; avoid hard-coded one-off colors unless already established in app theme.
- For icons, prefer `@fluentui/react-icons` and ensure icon-only actions always have accessible names (`aria-label`).

### Fluent UI implementation expectations

- Prefer semantic structure around Fluent controls (`main`, `section`, `header`, `form`).
- Avoid heavy inline style objects in JSX; prefer SCSS classes and theme variables for maintainable styling.

## Folder conventions

- `src/app`: app shell, app entry composition, global styles.
- `src/features/<feature-name>`: feature-specific model and UI.
- `src/shared`: generic reusable types/utilities only.

### Folder design rules (feature-first)

- Organize by feature/domain first, not by file type.
- Keep UI and business logic separated inside each feature.
- Keep files small and single-purpose; split large components early.
- Keep nesting shallow (target 3 levels, hard max 4).
- Prefer co-location: keep tests, styles, and feature utilities near the code they support.

### Recommended `src/` shape for this repo

- `src/app`: app bootstrap, route/layout composition, app-level providers, global styles.
- `src/features/<feature-name>/ui`: feature UI components only.
- `src/features/<feature-name>/model`: feature domain state, selectors, mappers, and types.
- `src/features/<feature-name>/api`: feature-scoped network calls and request adapters.
- `src/features/<feature-name>/hooks`: feature-scoped hooks.
- `src/features/<feature-name>/styles`: feature-scoped SCSS partials/modules when needed.
- `src/shared/ui`: generic reusable presentational components used by multiple features.
- `src/shared/hooks`: reusable hooks that are not feature-specific.
- `src/shared/lib`: framework-agnostic helpers and pure utilities.
- `src/shared/types`: cross-feature domain-agnostic types.
- `public/`: static assets (icons, images, fonts) served as-is.

### Naming and export conventions

- Components and component folders: `PascalCase` (for example, `PracticeCard.tsx`).
- Hooks/utilities/functions: `camelCase` (for example, `useAuthSession.ts`).
- SCSS files: kebab-case or module naming (`feature-name.scss`, `ComponentName.module.scss`) consistent per feature.
- Tests are colocated with source (`*.test.ts`, `*.test.tsx`).
- Use `index.ts` barrel exports only at feature/public boundaries; avoid deep wildcard barrels that hide ownership.

### Ownership boundaries

- Feature code may import from its own feature and from `src/shared`.
- `src/shared` must not import from `src/features`.
- Avoid cross-feature imports unless routed through stable public APIs.
- New reusable code starts in a feature; promote to `src/shared` only after a second real use case.

## React coding expectations

- Prefer semantic HTML over generic wrappers.
- Keep components focused and single-purpose.
- Use `type` imports where possible.
- Avoid avoidable new object/array/function literals in JSX props for memoized children.
- Keep side effects explicit and minimal.
- Put interaction-triggered logic in event handlers, not effects, when possible.
- Derive display state during render instead of storing redundant state.
- Prefer functional state updates when next value depends on previous value.

## Accessibility checklist

- Interactive elements must be keyboard accessible.
- Inputs must have labels.
- Images must have meaningful `alt` text.
- Preserve visible focus styles.
- Use landmarks (`main`, `header`, `section`) and heading hierarchy.
- Ensure Fluent components that need names/description (`Dialog`, icon buttons, inputs) have accessible labels.

## Performance checklist

- Avoid heavy work in render paths.
- Keep props stable for memoized children.
- Split by feature and lazily load when needed.
- Keep bundle dependencies intentional.
- Start independent async work in parallel; await as late as correctness allows.
- Prefer explicit conditional rendering over fragile short-circuit patterns.
- Use transitions for non-urgent updates when UI responsiveness matters.
- Avoid layout thrashing; prefer CSS classes and batched DOM/style changes.
- Import only Fluent components/icons actually used in the file to keep bundle impact intentional.

## Style and linting

- Respect existing ESLint and Stylelint rules.
- Prefer SCSS modules/partials for feature styling when complexity grows.
- Do not bypass lint warnings without a clear, documented reason.
- Use Prettier formatting as part of normal workflow (`format` / `format:check`).
