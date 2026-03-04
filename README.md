# React Best Practices Demo (2026)

Vite + React + TypeScript demo for engineering teams to showcase **Do / Don't** examples with a strong focus on:

- Accessibility
- Performance
- Folder structure conventions
- AI-assisted coding guardrails via Copilot instructions

## Stack

- React 19
- Vite 7
- TypeScript 5
- ESLint 9 (type-aware, accessibility-focused)
- Stylelint + SCSS

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

## Folder structure

```text
src/
  app/
    App.tsx
    styles.scss
  features/
    practices/
      model/
        practice-examples.ts
      ui/
        PracticeCard.tsx
        PracticesShowcase.tsx
  shared/
    types/
      practice-example.ts
```

## Team conventions showcased

### Do

- Use semantic HTML (`main`, `section`, `header`, `button`)
- Keep feature code together by domain
- Keep data models typed and explicit
- Use linting to enforce accessibility and performance habits

### Don't

- Hide interactions in non-semantic elements
- Use flat, mixed folders with no ownership boundaries
- Pass unstable inline objects/functions deeply without need
- Leave accessibility checks for late QA

## Copilot guidance

Repository-specific AI guidance lives in [.github/copilot-instructions.md](.github/copilot-instructions.md).

This keeps generated code aligned with:

- Accessibility-first decisions
- Performance-safe React patterns
- Team folder conventions
