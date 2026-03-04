# React Best Practices Demo App (2026)

Vite + React + TypeScript + Fluent UI demo scaffold for teams to explore modern **Do / Don't** practices in a real working app.

## What this demo includes

- Home route (`/`): full client-side Work Items CRUD flow.
- Documents route (`/documents`): wiki-style best-practices library with topic navigation, priorities, and rule-by-rule code examples.
- Feature-first architecture (`app`, `features`, `shared`) with explicit ownership boundaries.
- Accessibility-first UI patterns using Fluent UI React components.
- Custom lint guardrails demonstrating how teams can enforce architecture and rendering standards.

## Tech stack

- React 19
- Vite 7
- TypeScript 5
- Fluent UI React (`@fluentui/react-components`, `@fluentui/react-icons`)
- React Router (`react-router-dom`)
- ESLint 9 + custom local rules
- Stylelint + SCSS
- Prettier

## Scripts

- `npm run dev` — start local dev server
- `npm run build` — typecheck + production build
- `npm run typecheck` — TypeScript checks only
- `npm run lint` — ESLint with zero warnings allowed
- `npm run lint:fix` — auto-fix ESLint issues
- `npm run lint:styles` — Stylelint on CSS/SCSS
- `npm run lint:styles:fix` — auto-fix style issues
- `npm run format` — format files with Prettier
- `npm run format:check` — check formatting with Prettier
- `npm run check` — typecheck + eslint
- `npm run check:all` — typecheck + eslint + stylelint

## Custom ESLint rule demo

This repo includes a local custom rule:

- `react-best-practices/no-short-circuit-render-conditions`

Rule source:

- `eslint-rules/no-short-circuit-render-conditions.js`

Intentional violation example for demos:

- `src/features/custom-lint-example/RenderBranchRuleViolationDemo.tsx`

To demo the rule in action, run:

```bash
npm run lint
```

## Project structure

```text
src/
  app/
    App.tsx
    styles.scss
    theme.scss
  features/
    custom-lint-example/
      RenderBranchRuleViolationDemo.tsx
    items/
      api/
      hooks/
      model/
      styles/
      ui/
    practices/
      model/
      styles/
      ui/
  shared/
    types/
```

## Best-practice areas covered

- Eliminating waterfalls
- Bundle size optimization
- Client-side data fetching
- Re-render optimization
- Rendering performance
- JavaScript performance
- Advanced patterns
- Accessibility (expanded, multi-rule)
- Fluent UI patterns
- Forms & validation
- Code review guardrails
- Structure & ownership
- Style & linting

## Guidance files

- AI/project guidance: `.github/copilot-instructions.md`
- Local skill guidance: `.github/skills/react-best-practices/SKILL.md`
