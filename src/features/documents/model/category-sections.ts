import type {
  PracticeCategory,
  PracticeExample,
  PracticePriority,
} from '../../../shared/types/practice-example'

export interface CategorySection {
  category: PracticeCategory
  categoryPriority: PracticePriority
  summary: string
  sectionId: string
  examples: PracticeExample[]
}

interface CategoryMeta {
  category: PracticeCategory
  priority: PracticePriority
  summary: string
}

export const categoryMetaList: CategoryMeta[] = [
  {
    category: 'Eliminating Waterfalls',
    priority: 'Critical',
    summary: 'Prevent serialized async flows and start independent work in parallel.',
  },
  {
    category: 'Bundle Size Optimization',
    priority: 'Critical',
    summary: 'Keep the initial experience lean by limiting dependencies and splitting by feature.',
  },
  {
    category: 'Client-Side Data Fetching',
    priority: 'High',
    summary: 'Model request states explicitly and guard against stale response races.',
  },
  {
    category: 'React Hooks',
    priority: 'High',
    summary:
      'Keep hooks deterministic by using complete dependencies and moving event logic out of effects.',
  },
  {
    category: 'Re-render Optimization',
    priority: 'Medium',
    summary: 'Stabilize props and avoid redundant state synchronization work.',
  },
  {
    category: 'Rendering Performance',
    priority: 'Medium',
    summary: 'Keep render branches explicit and avoid unnecessary layout recalculation.',
  },
  {
    category: 'JavaScript Performance',
    priority: 'Low',
    summary: 'Apply micro-optimizations only after profiling confirms bottlenecks.',
  },
  {
    category: 'Advanced Patterns',
    priority: 'Low',
    summary: 'Use advanced React patterns only where measurable UX gains justify complexity.',
  },
  {
    category: 'Accessibility',
    priority: 'Critical',
    summary: 'Favor semantic HTML, keyboard access, and clear screen-reader semantics.',
  },
  {
    category: 'Fluent UI Patterns',
    priority: 'High',
    summary: 'Prefer Fluent primitives, appearance props, and token-based styling for consistency.',
  },
  {
    category: 'Forms & Validation',
    priority: 'High',
    summary:
      'Build accessible forms with clear required states and reliable submit-time normalization.',
  },
  {
    category: 'Code Review Guardrails',
    priority: 'High',
    summary:
      'Use review checklists to catch waterfalls, a11y regressions, and ownership leaks early.',
  },
  {
    category: 'Structure & Ownership',
    priority: 'High',
    summary: 'Organize by feature and keep shared code generic and intentionally promoted.',
  },
  {
    category: 'Style & Linting',
    priority: 'High',
    summary: 'Use linting rules as quality gates for maintainability and accessibility.',
  },
]
