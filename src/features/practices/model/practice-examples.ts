import type { PracticeExample } from '../../../shared/types/practice-example'

export const practiceExamples: PracticeExample[] = [
  {
    id: 'waterfall-parallel-start',
    category: 'Eliminating Waterfalls',
    priority: 'Critical',
    title: 'Start independent async work in parallel',
    doExample:
      'Kick off independent requests together and await late (for example with Promise.all) so one network wait does not block another.',
    dontExample:
      'Await request A before starting request B when B does not depend on A, creating a serialized waterfall.',
    rationale:
      'Removing avoidable waterfalls is the highest-impact way to improve perceived speed in client-rendered apps.',
    checklist: ['Independent requests start together', 'No avoidable sequential awaits', 'Loading states remain accurate'],
  },
  {
    id: 'waterfall-effect-chain-fetching',
    category: 'Eliminating Waterfalls',
    priority: 'Critical',
    title: 'Avoid effect chains that trigger follow-up fetches',
    doExample:
      'Drive requests from route/user intent and start known dependencies in one orchestrated flow, keeping effect usage minimal.',
    dontExample:
      'Fetch in one effect, set state, then trigger the next fetch in another effect based on that state, causing staged latency.',
    rationale:
      'Effect chains increase complexity and latency while making loading behavior harder to reason about.',
    checklist: ['No staged fetch-effect chains', 'Request flow is explicit', 'Interaction logic stays in handlers'],
  },
  {
    id: 'bundle-dependency-budget',
    category: 'Bundle Size Optimization',
    priority: 'Critical',
    title: 'Keep dependencies intentional and measurable',
    doExample:
      'Add libraries only when they solve a real problem better than local code, and document bundle impact in the PR.',
    dontExample:
      'Introduce heavy utility/UI packages for small one-off helpers without checking cost or overlap.',
    rationale:
      'Bundle size directly affects startup and interaction speed, especially on constrained devices.',
    checklist: ['Dependency has clear justification', 'Alternative evaluated', 'Bundle impact called out in review'],
  },
  {
    id: 'bundle-lazy-feature-entry',
    category: 'Bundle Size Optimization',
    priority: 'Critical',
    title: 'Split code by feature and lazy-load non-critical views',
    doExample:
      'Load rarely used routes or heavy feature modules lazily so core paths stay lean.',
    dontExample:
      'Eagerly import every feature in the first paint path, including screens users may never open.',
    rationale:
      'Feature-level code splitting reduces initial download and parse time for the main experience.',
    checklist: ['Main path stays small', 'Non-critical views are lazy', 'Fallback UI is accessible'],
  },
  {
    id: 'data-fetching-explicit-state',
    category: 'Client-Side Data Fetching',
    priority: 'High',
    title: 'Model loading/error/success states explicitly',
    doExample:
      'Represent request state clearly and render predictable UI for loading, error, and success branches.',
    dontExample:
      'Blend partial state and booleans ad hoc, making edge cases like stale errors hard to track.',
    rationale:
      'Explicit async state makes behavior easier to test, debug, and maintain.',
    checklist: ['Loading state is visible', 'Error state is actionable', 'Success state handles empty data'],
  },
  {
    id: 'data-fetching-cancel-stale',
    category: 'Client-Side Data Fetching',
    priority: 'High',
    title: 'Prevent stale responses from winning',
    doExample:
      'Cancel in-flight requests on invalidation/navigation or ignore outdated responses with request guards.',
    dontExample:
      'Allow slow previous requests to overwrite newer state after filters or route changes.',
    rationale:
      'Stale write protection preserves correctness and avoids confusing flicker in rapidly changing UIs.',
    checklist: ['Stale response guard exists', 'Unmount cleanup handles requests', 'Rapid filter changes stay correct'],
  },
  {
    id: 'rerender-stable-props',
    category: 'Re-render Optimization',
    priority: 'Medium',
    title: 'Pass stable props to memoized children',
    doExample:
      'Hoist constants and memoize callbacks only where reference stability avoids meaningful rerenders.',
    dontExample:
      'Create new object, array, or function props each render for expensive memoized child trees.',
    rationale:
      'Stable references reduce avoidable child work and improve interaction smoothness.',
    checklist: ['Memoized children receive stable props', 'No unnecessary inline object props', 'Profiling shows rerender reduction'],
  },
  {
    id: 'rerender-derived-state',
    category: 'Re-render Optimization',
    priority: 'Medium',
    title: 'Derive display state during render when possible',
    doExample:
      'Compute filtered labels/counts from source state in render and keep source of truth minimal.',
    dontExample:
      'Store redundant derived values in state and sync them via effects.',
    rationale:
      'Derived-on-render state removes synchronization bugs and reduces effect churn.',
    checklist: ['Single source of truth', 'No sync effects for derived values', 'Render computations remain lightweight'],
  },
  {
    id: 'rendering-explicit-branches',
    category: 'Rendering Performance',
    priority: 'Medium',
    title: 'Use explicit conditional branches',
    doExample:
      'Use clear conditional rendering for loading, empty, and success views with semantic containers.',
    dontExample:
      'Rely on brittle short-circuit chains that hide edge cases and complicate accessibility semantics.',
    rationale:
      'Explicit branches improve readability and prevent subtle rendering and a11y regressions.',
    checklist: ['Loading/empty/success paths are explicit', 'Semantics remain correct per branch', 'No fragile chained conditions'],
  },
  {
    id: 'rendering-avoid-layout-thrash',
    category: 'Rendering Performance',
    priority: 'Medium',
    title: 'Avoid layout thrashing from repeated DOM reads/writes',
    doExample:
      'Batch style updates via class changes and avoid per-frame layout measurements in interactive flows.',
    dontExample:
      'Mix repeated DOM reads and writes in loops, forcing frequent reflow under user interaction.',
    rationale:
      'Avoiding layout thrash protects frame consistency and keeps transitions responsive.',
    checklist: ['DOM writes are batched', 'No hot-path forced reflow', 'Interactions remain smooth'],
  },
  {
    id: 'js-perf-pragmatic-optimization',
    category: 'JavaScript Performance',
    priority: 'Low',
    title: 'Optimize JavaScript only after measuring hotspots',
    doExample:
      'Use profiler data to target real hotspots and keep code simple when wins are negligible.',
    dontExample:
      'Micro-optimize loops or object shapes preemptively while larger rendering/network costs dominate.',
    rationale:
      'Measured optimization avoids complexity and preserves maintainability.',
    checklist: ['Hotspot identified first', 'Optimization is measurable', 'Readability remains acceptable'],
  },
  {
    id: 'advanced-patterns-use-transition',
    category: 'Advanced Patterns',
    priority: 'Low',
    title: 'Use transitions for non-urgent updates',
    doExample:
      'Mark non-blocking UI updates as transitions when this improves responsiveness during input-heavy interactions.',
    dontExample:
      'Apply advanced React concurrency patterns everywhere without a demonstrated responsiveness issue.',
    rationale:
      'Advanced patterns should be justified by user experience impact, not novelty.',
    checklist: ['Non-urgent updates are identified', 'Input stays responsive', 'Complexity is justified'],
  },
  {
    id: 'advanced-patterns-avoid-over-abstraction',
    category: 'Advanced Patterns',
    priority: 'Low',
    title: 'Reach for advanced abstractions only when repetition is real',
    doExample:
      'Keep code straightforward first and extract advanced abstractions after concrete repeated use cases appear.',
    dontExample:
      'Introduce generic render-prop/hook frameworks for one isolated scenario.',
    rationale:
      'Delayed abstraction keeps features easier to evolve and reduces accidental complexity.',
    checklist: ['At least two real use cases exist', 'Abstraction cost is acceptable', 'Ownership remains clear'],
  },
  {
    id: 'a11y-semantic-controls',
    category: 'Accessibility',
    priority: 'Critical',
    title: 'Use semantic controls and explicit labels',
    doExample:
      'Use button for actions, pair inputs with labels, and provide meaningful alt text for informative images.',
    dontExample:
      'Use click handlers on generic divs, rely on placeholders as labels, or leave alt text empty when content matters.',
    codeLanguage: 'tsx',
    doCode: `<label htmlFor="display-name">Display name</label>
<input id="display-name" name="displayName" />

<button type="button" onClick={saveProfile}>
  Save profile
</button>`,
    dontCode: `<input placeholder="Display name" />
<div onClick={saveProfile}>Save</div>`,
    rationale:
      'Semantic HTML gives keyboard and assistive technology support by default.',
    checklist: ['Interactive controls are semantic', 'Inputs have labels', 'Image text alternatives are correct'],
  },
  {
    id: 'a11y-focus-and-headings',
    category: 'Accessibility',
    priority: 'Critical',
    title: 'Preserve focus visibility and heading hierarchy',
    doExample:
      'Keep visible focus styles and use logical heading levels within landmarks like main, header, and section.',
    dontExample:
      'Remove outlines globally or jump heading levels in ways that confuse keyboard and screen-reader navigation.',
    codeLanguage: 'tsx',
    doCode: `<main>
  <h1>Project Dashboard</h1>
  <section aria-labelledby="items-heading">
    <h2 id="items-heading">Work items</h2>
    <button className="save-button">Save</button>
  </section>
</main>

/* keep focus indicators visible */
.save-button:focus-visible {
  outline: 2px solid var(--theme-brand-primary);
}`,
    dontCode: `<div>
  <h3>Project Dashboard</h3>
  <h1>Work items</h1>
  <button className="save-button">Save</button>
</div>

button:focus {
  outline: none;
}`,
    rationale:
      'Focus and structure are core navigation tools for keyboard and assistive-tech users.',
    checklist: ['Focus indicators are visible', 'Heading order is logical', 'Landmarks are used intentionally'],
  },
  {
    id: 'a11y-dialog-focus-management',
    category: 'Accessibility',
    priority: 'Critical',
    title: 'Manage dialog focus and keyboard escape behavior',
    doExample:
      'Use accessible dialog primitives that trap focus while open, restore focus to trigger on close, and support Escape to dismiss.',
    dontExample:
      'Render custom overlays without focus management, leaving keyboard users trapped or dropped at unexpected page positions.',
    codeLanguage: 'tsx',
    doCode: `<Dialog open={open} onOpenChange={(_, data) => setOpen(data.open)}>
  <DialogTrigger disableButtonEnhancement>
    <Button>Edit item</Button>
  </DialogTrigger>
  <DialogSurface>
    <DialogBody>
      <DialogTitle>Edit item</DialogTitle>
      <DialogContent>...</DialogContent>
    </DialogBody>
  </DialogSurface>
</Dialog>`,
    dontCode: `{open ? (
  <div className="overlay">
    <div className="modal">...</div>
  </div>
) : null}

// No focus trap, no restore focus, no Escape handling`,
    rationale:
      'Predictable focus behavior is mandatory for modal accessibility and keyboard navigation trust.',
    checklist: ['Initial focus is intentional', 'Escape closes when appropriate', 'Focus returns to a sensible target'],
  },
  {
    id: 'a11y-icon-actions-named',
    category: 'Accessibility',
    priority: 'Critical',
    title: 'Give icon-only actions accessible names',
    doExample:
      'Provide descriptive aria-label values for icon-only buttons and ensure tooltip text matches the action intent.',
    dontExample:
      'Use unlabeled icon buttons where screen readers only announce generic button with no context.',
    codeLanguage: 'tsx',
    doCode: `<Button
  appearance="subtle"
  icon={<Delete24Regular />}
  aria-label="Delete work item"
/>

<Button
  appearance="subtle"
  icon={<Edit24Regular />}
  aria-label="Edit work item"
/>`,
    dontCode: `<Button icon={<Delete24Regular />} />
<Button icon={<Edit24Regular />} />`,
    rationale:
      'Icon-only controls need text alternatives to be usable with assistive technologies.',
    checklist: ['All icon-only actions have labels', 'Label text is action-oriented', 'Tooltips do not replace labels'],
  },
  {
    id: 'a11y-status-live-regions',
    category: 'Accessibility',
    priority: 'Critical',
    title: 'Announce async status and errors accessibly',
    doExample:
      'Expose important status updates with alert/status semantics so screen readers announce failures and state changes.',
    dontExample:
      'Show visual-only toasts or inline text with no live region semantics for async outcomes.',
    codeLanguage: 'tsx',
    doCode: `{errorMessage ? (
  <Text role="alert">{errorMessage}</Text>
) : null}

{isSaving ? <Text role="status">Saving changes…</Text> : null}`,
    dontCode: `<div className="toast">Save failed</div>
<span>Loading...</span>

// No role="alert" or role="status"`,
    rationale:
      'Users relying on assistive tech must receive the same feedback timing as sighted users.',
    checklist: ['Error messages are announced', 'Status updates have semantic roles', 'Announcements are concise'],
  },
  {
    id: 'a11y-table-semantics',
    category: 'Accessibility',
    priority: 'Critical',
    title: 'Use semantic tables for tabular data',
    doExample:
      'Use table headers, row grouping, and meaningful table labels for datasets with sortable/actionable rows.',
    dontExample:
      'Build table-like layouts from generic div containers where cell relationships are lost for assistive tech.',
    codeLanguage: 'tsx',
    doCode: `<Table aria-label="Work items">
  <TableHeader>
    <TableRow>
      <TableHeaderCell>Title</TableHeaderCell>
      <TableHeaderCell>Owner</TableHeaderCell>
    </TableRow>
  </TableHeader>
  <TableBody>{/* rows */}</TableBody>
</Table>`,
    dontCode: `<div className="grid-table">
  <div className="row header">Title Owner</div>
  <div className="row">Accessibility checklist Alex</div>
</div>`,
    rationale:
      'Table semantics communicate relationships between headers and cells for efficient navigation.',
    checklist: ['Headers are explicit', 'Table has an accessible name', 'Row actions are keyboard reachable'],
  },
  {
    id: 'a11y-contrast-do-not-rely-on-color',
    category: 'Accessibility',
    priority: 'Critical',
    title: 'Do not rely on color alone to convey meaning',
    doExample:
      'Pair color with text or icons for status and maintain sufficient contrast across all states.',
    dontExample:
      'Use only red or green chips without textual meaning or adequate contrast against backgrounds.',
    codeLanguage: 'tsx',
    doCode: `<Badge appearance="outline" color="success">
  <CheckmarkCircle24Regular aria-hidden="true" /> Done
</Badge>

<Badge appearance="outline" color="danger">
  <DismissCircle24Regular aria-hidden="true" /> Blocked
</Badge>`,
    dontCode: `<span className="status-dot status-dot-green" />
<span className="status-dot status-dot-red" />

// Meaning depends on color only`,
    rationale:
      'Color-only signals fail for low-vision and color-blind users and reduce clarity in varied displays.',
    checklist: ['Status has text labels', 'Contrast is sufficient', 'Meaning survives grayscale/low saturation'],
  },
  {
    id: 'fluent-prefer-primitives',
    category: 'Fluent UI Patterns',
    priority: 'High',
    title: 'Prefer Fluent primitives before custom controls',
    doExample:
      'Use Fluent Button, Field, Dialog, Table, and Badge first, then style via tokens and classes.',
    dontExample:
      'Rebuild common controls from generic elements when Fluent already provides accessible variants.',
    rationale:
      'Fluent primitives provide tested accessibility behavior and consistent interaction patterns.',
    checklist: ['Fluent primitive exists for control', 'Appearance props are used intentionally', 'Custom wrappers stay minimal'],
  },
  {
    id: 'fluent-theme-token-discipline',
    category: 'Fluent UI Patterns',
    priority: 'High',
    title: 'Use theme tokens and avoid ad-hoc inline styles',
    doExample:
      'Style components with existing theme variables and scoped classes to keep branding consistent.',
    dontExample:
      'Scatter one-off inline colors and spacing values directly in JSX across multiple features.',
    rationale:
      'Token-driven styling improves consistency and simplifies future design updates.',
    checklist: ['Theme variables are reused', 'Inline styles stay minimal', 'Visual language is consistent'],
  },
  {
    id: 'forms-field-validation-state',
    category: 'Forms & Validation',
    priority: 'High',
    title: 'Expose required and validation states directly in form fields',
    doExample:
      'Use labeled Field wrappers with required indicators and validation states tied to current input values.',
    dontExample:
      'Show invalid state only after submit with no field-level cues about what needs correction.',
    rationale:
      'Immediate and clear validation feedback reduces user friction and failed submissions.',
    checklist: ['Required fields are marked', 'Invalid state is visible', 'Validation message is actionable'],
  },
  {
    id: 'forms-trim-and-normalize-input',
    category: 'Forms & Validation',
    priority: 'High',
    title: 'Normalize user input at submit boundaries',
    doExample:
      'Trim text and normalize values once in submit handlers before creating or updating records.',
    dontExample:
      'Persist raw input directly with accidental whitespace and inconsistent casing across records.',
    rationale:
      'Boundary normalization preserves data quality without over-processing during each keystroke.',
    checklist: ['Normalization happens at submit', 'Stored values are consistent', 'Input behavior remains responsive'],
  },
  {
    id: 'review-reject-waterfalls-and-boundary-leaks',
    category: 'Code Review Guardrails',
    priority: 'High',
    title: 'Reject avoidable waterfalls and ownership boundary violations',
    doExample:
      'Call out serialized independent requests and cross-feature/shared import leaks during review.',
    dontExample:
      'Approve latent architecture debt that couples features and slows critical rendering paths.',
    rationale:
      'Early review guardrails prevent regressions that become expensive to unwind later.',
    checklist: ['Async flow is efficient', 'Feature boundaries stay clear', 'Shared remains domain-agnostic'],
  },
  {
    id: 'review-verify-a11y-and-loading-branches',
    category: 'Code Review Guardrails',
    priority: 'High',
    title: 'Verify accessibility and explicit loading/error branches in PRs',
    doExample:
      'Ensure keyboard paths, labeling, and explicit loading/error/success rendering are covered before merge.',
    dontExample:
      'Approve UI changes with silent failures, missing labels, or ambiguous conditional rendering.',
    rationale:
      'Review-time quality checks keep regressions out of demos and production paths.',
    checklist: ['Labels and keyboard paths verified', 'UI states are explicit', 'Error feedback is announced clearly'],
  },
  {
    id: 'structure-feature-first-boundaries',
    category: 'Structure & Ownership',
    priority: 'High',
    title: 'Organize by feature with clear ownership boundaries',
    doExample:
      'Keep UI, model, hooks, and api grouped inside each feature and route shared utilities through src/shared only when truly generic.',
    dontExample:
      'Split by file type globally or cross-import features directly without a stable boundary.',
    rationale:
      'Feature ownership improves discoverability and reduces accidental coupling.',
    checklist: ['Feature folders are domain-driven', 'Cross-feature imports are controlled', 'Shared code stays generic'],
  },
  {
    id: 'structure-promote-shared-on-second-use',
    category: 'Structure & Ownership',
    priority: 'High',
    title: 'Promote code to shared after second real use case',
    doExample:
      'Keep utilities in-feature first, then move to shared when another feature proves reuse.',
    dontExample:
      'Move code to shared preemptively and create vague ownership for one-off helpers.',
    rationale:
      'Delayed promotion keeps shared APIs small and meaningful.',
    checklist: ['Second use case verified', 'API is domain-agnostic', 'Ownership docs remain clear'],
  },
  {
    id: 'style-follow-lint-guardrails',
    category: 'Style & Linting',
    priority: 'High',
    title: 'Treat lint and style rules as quality guardrails',
    doExample:
      'Fix lint and style issues directly and document exceptions only when unavoidable.',
    dontExample:
      'Bypass warnings to ship quickly or disable rules without an explicit team reason.',
    rationale:
      'Consistent linting catches accessibility, performance, and maintainability regressions early.',
    checklist: ['No unexplained rule bypasses', 'CI checks stay green', 'Rule exceptions are documented'],
  },
  {
    id: 'style-keep-components-focused',
    category: 'Style & Linting',
    priority: 'High',
    title: 'Keep components small and single-purpose',
    doExample:
      'Split large components by responsibility early so UI logic and domain logic remain clear.',
    dontExample:
      'Accumulate unrelated concerns in one component until refactoring becomes risky and expensive.',
    rationale:
      'Small focused components are easier to test, review, and optimize.',
    checklist: ['Component has one primary job', 'Effects are minimal and explicit', 'Refactors stay localized'],
  },
]
