export type PracticePriority = 'Critical' | 'High' | 'Medium' | 'Low'

export type PracticeCategory =
  | 'Eliminating Waterfalls'
  | 'Bundle Size Optimization'
  | 'Client-Side Data Fetching'
  | 'Re-render Optimization'
  | 'Rendering Performance'
  | 'JavaScript Performance'
  | 'Advanced Patterns'
  | 'Accessibility'
  | 'Fluent UI Patterns'
  | 'Forms & Validation'
  | 'Code Review Guardrails'
  | 'Structure & Ownership'
  | 'Style & Linting'

export interface PracticeExample {
  id: string
  category: PracticeCategory
  priority: PracticePriority
  title: string
  doExample: string
  dontExample: string
  codeLanguage?: 'tsx' | 'ts'
  doCode?: string
  dontCode?: string
  rationale: string
  checklist: string[]
}
