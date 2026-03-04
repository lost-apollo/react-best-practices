import type { PracticeCategory, PracticeExample } from '../../../shared/types/practice-example'

interface TopicCodeExample {
  language: 'tsx' | 'ts'
  doCode: string
  dontCode: string
}

const topicCodeExamples: Record<PracticeCategory, TopicCodeExample> = {
  'Eliminating Waterfalls': {
    language: 'ts',
    doCode: `const usersPromise = fetchUsers()
const projectsPromise = fetchProjects()

const [users, projects] = await Promise.all([usersPromise, projectsPromise])
setDashboardData({ users, projects })`,
    dontCode: `const users = await fetchUsers()
const projects = await fetchProjects()

setDashboardData({ users, projects })`,
  },
  'Bundle Size Optimization': {
    language: 'tsx',
    doCode: `import { lazy, Suspense } from 'react'

const ReportsPage = lazy(() => import('../features/reports/ui/ReportsPage'))

<Suspense fallback={<p>Loading reports…</p>}>
  <ReportsPage />
</Suspense>`,
    dontCode: `import { ReportsPage } from '../features/reports/ui/ReportsPage'
import { AdminPage } from '../features/admin/ui/AdminPage'
import { AnalyticsPage } from '../features/analytics/ui/AnalyticsPage'

// All heavy pages load in the initial bundle`,
  },
  'Client-Side Data Fetching': {
    language: 'ts',
    doCode: `setRequestState('loading')

try {
  const items = await getItems(query)
  setRequestState('success')
  setItems(items)
} catch {
  setRequestState('error')
}`,
    dontCode: `setIsLoading(true)
getItems(query).then(setItems)

// Error and stale state handling are missing`,
  },
  'Re-render Optimization': {
    language: 'tsx',
    doCode: `const columns = useMemo(() => buildColumns(locale), [locale])
const onEdit = useCallback((id: string) => openEditor(id), [openEditor])

return <ItemsTable columns={columns} onEdit={onEdit} />`,
    dontCode: `return (
  <ItemsTable
    columns={buildColumns(locale)}
    onEdit={(id) => openEditor(id)}
  />
)`,
  },
  'Rendering Performance': {
    language: 'tsx',
    doCode: `if (status === 'loading') return <Spinner label="Loading items" />
if (status === 'error') return <ErrorBanner />
if (items.length === 0) return <EmptyState />

return <ItemsTable items={items} />`,
    dontCode: `return status !== 'loading' && items?.length
  ? <ItemsTable items={items} />
  : <p>Nothing to show</p>`,
  },
  'JavaScript Performance': {
    language: 'ts',
    doCode: `const profile = performance.now()
const nextItems = expensiveTransform(items)

if (performance.now() - profile > 8) {
  console.info('Transform hotspot confirmed')
}

setItems(nextItems)`,
    dontCode: `// Rewriting loop style without measuring real impact
for (let index = 0; index < items.length; index += 1) {
  process(items[index])
}`,
  },
  'Advanced Patterns': {
    language: 'tsx',
    doCode: `import { startTransition } from 'react'

function onSearchChange(nextValue: string) {
  setQuery(nextValue)
  startTransition(() => setFilteredItems(filterItems(nextValue)))
}`,
    dontCode: `function onSearchChange(nextValue: string) {
  setQuery(nextValue)
  setFilteredItems(filterItems(nextValue))
  setSelection([])
  setPanelOpen(true)
}`,
  },
  Accessibility: {
    language: 'tsx',
    doCode: `<label htmlFor="display-name">Display name</label>
<input id="display-name" name="displayName" />

<button type="button" onClick={saveProfile}>
  Save
</button>`,
    dontCode: `<div onClick={saveProfile}>Save</div>
<input placeholder="Display name" />`,
  },
  'Fluent UI Patterns': {
    language: 'tsx',
    doCode: `import { Button, Field, Input } from '@fluentui/react-components'

<Field label="Owner" required>
  <Input aria-label="Owner" />
</Field>
<Button appearance="primary">Create</Button>`,
    dontCode: `<label>Owner</label>
<input className="custom-input" />
<div className="button-like">Create</div>`,
  },
  'Forms & Validation': {
    language: 'tsx',
    doCode: `const isTitleInvalid = title.trim().length === 0

<Field label="Title" required validationState={isTitleInvalid ? 'error' : 'none'}>
  <Input value={title} onChange={(_, data) => setTitle(data.value)} />
</Field>`,
    dontCode: `<Input value={title} onChange={(_, data) => setTitle(data.value)} />
<Button onClick={save}>Submit</Button>

// No required marker or validation state`,
  },
  'Code Review Guardrails': {
    language: 'ts',
    doCode: `// PR checklist
// [ ] No avoidable async waterfalls
// [ ] Explicit loading/error/success branches
// [ ] Keyboard and labels verified
// [ ] No shared -> feature imports`,
    dontCode: `// LGTM
// (No checks for async flow, accessibility, or boundaries)`,
  },
  'Structure & Ownership': {
    language: 'ts',
    doCode: `// inside src/features/items/hooks/useItemsCrud.ts
import { createItem } from '../api/itemsApi'
import type { Item } from '../model/item'

// feature code uses feature model/api, shared only when generic`,
    dontCode: `// inside src/shared/lib/itemsHelpers.ts
import { createItem } from '../../features/items/api/itemsApi'

// shared now depends on a feature (boundary break)`,
  },
  'Style & Linting': {
    language: 'ts',
    doCode: `npm run check:all

// Fix reported issues before merge
// Keep rule disables rare and documented`,
    dontCode: `// eslint-disable-next-line
// stylelint-disable-next-line

shipFeatureQuickly()`,
  },
}

const exampleCodeExamples: Record<string, TopicCodeExample> = {
  'waterfall-parallel-start': {
    language: 'ts',
    doCode: `const teamsPromise = fetchTeams()
const roadmapPromise = fetchRoadmap()

const [teams, roadmap] = await Promise.all([teamsPromise, roadmapPromise])
setDashboard({ teams, roadmap })`,
    dontCode: `const teams = await fetchTeams()
const roadmap = await fetchRoadmap()

setDashboard({ teams, roadmap })`,
  },
  'waterfall-effect-chain-fetching': {
    language: 'tsx',
    doCode: `async function loadPageData() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()])
  setPageData({ profile, projects })
}

useEffect(() => {
  void loadPageData()
}, [])`,
    dontCode: `useEffect(() => {
  getProfile().then((profile) => setProfile(profile))
}, [])

useEffect(() => {
  if (profile) {
    getProjects(profile.id).then(setProjects)
  }
}, [profile])`,
  },
  'bundle-dependency-budget': {
    language: 'ts',
    doCode: `// Good: native utility for small operation
const ownerInitials = owner
  .split(' ')
  .map((name) => name[0])
  .join('')
  .toUpperCase()`,
    dontCode: `// Avoid: large package for tiny one-off transformation
import { initials } from 'some-heavy-utils-package'

const ownerInitials = initials(owner)`,
  },
  'bundle-lazy-feature-entry': {
    language: 'tsx',
    doCode: `const DocumentsPage = lazy(() => import('../features/practices/ui/DocumentsPage'))

<Suspense fallback={<Spinner label="Loading documents" />}>
  <DocumentsPage />
</Suspense>`,
    dontCode: `import { DocumentsPage } from '../features/practices/ui/DocumentsPage'
import { AnalyticsPage } from '../features/analytics/ui/AnalyticsPage'

// Both pages are eagerly loaded up front`,
  },
  'data-fetching-explicit-state': {
    language: 'ts',
    doCode: `setStatus('loading')
setError(null)

try {
  const items = await listItems()
  setItems(items)
  setStatus('success')
} catch {
  setStatus('error')
  setError('Unable to load items')
}`,
    dontCode: `setIsLoading(true)
listItems().then(setItems)

// No explicit error branch or success transition`,
  },
  'data-fetching-cancel-stale': {
    language: 'ts',
    doCode: `const requestId = latestRequestRef.current + 1
latestRequestRef.current = requestId

const results = await searchItems(query)
if (latestRequestRef.current !== requestId) return

setItems(results)`,
    dontCode: `const results = await searchItems(query)
setItems(results)

// Older responses can overwrite newer queries`,
  },
  'rerender-stable-props': {
    language: 'tsx',
    doCode: `const handleDelete = useCallback((id: string) => {
  void removeItem(id)
}, [removeItem])

return <ItemsTable onDelete={handleDelete} items={items} />`,
    dontCode: `return (
  <ItemsTable
    items={items}
    onDelete={(id) => {
      void removeItem(id)
    }}
  />
)`,
  },
  'rerender-derived-state': {
    language: 'tsx',
    doCode: `const visibleCount = filteredItems.length
const hasItems = visibleCount > 0

return <Text>{hasItems ? visibleCount : 'No items'}</Text>`,
    dontCode: `const [visibleCount, setVisibleCount] = useState(0)

useEffect(() => {
  setVisibleCount(filteredItems.length)
}, [filteredItems])`,
  },
  'rendering-explicit-branches': {
    language: 'tsx',
    doCode: `if (isLoading) return <Spinner label="Loading" />
if (error) return <Text role="alert">{error}</Text>
if (items.length === 0) return <EmptyState />

return <ItemsTable items={items} />`,
    dontCode: `return !isLoading && items?.length ? (
  <ItemsTable items={items} />
) : (
  <p>Nothing here</p>
)`,
  },
  'rendering-avoid-layout-thrash': {
    language: 'ts',
    doCode: `element.classList.add('items-expanded')
requestAnimationFrame(() => {
  element.classList.add('items-animated')
})`,
    dontCode: `for (const row of rows) {
  const rowHeight = row.getBoundingClientRect().height
  row.style.height = rowHeight + 12 + 'px'
}

// Read/write inside loop triggers layout thrash`,
  },
  'js-perf-pragmatic-optimization': {
    language: 'ts',
    doCode: `const start = performance.now()
const rankedItems = expensiveRank(items)
const duration = performance.now() - start

if (duration > 12) console.info('Rank hotspot:', duration)
setItems(rankedItems)`,
    dontCode: `// Premature micro-optimization without measurement
for (let i = 0; i < items.length; i += 1) {
  cache[i] = optimize(items[i])
}`,
  },
  'advanced-patterns-use-transition': {
    language: 'tsx',
    doCode: `const [isPending, startTransition] = useTransition()

function handleSearch(value: string) {
  setSearchInput(value)
  startTransition(() => {
    setFilteredItems(expensiveFilter(value))
  })
}`,
    dontCode: `function handleSearch(value: string) {
  setSearchInput(value)
  setFilteredItems(expensiveFilter(value))
}

// Urgent + expensive updates block typing`,
  },
  'advanced-patterns-avoid-over-abstraction': {
    language: 'tsx',
    doCode: `function ItemsList({ items }: { items: WorkItem[] }) {
  return items.map((item) => <ItemsRow key={item.id} item={item} />)
}`,
    dontCode: `function GenericRenderer<T>({
  data,
  getKey,
  render,
}: GenericRendererProps<T>) {
  return data.map((entry) => render(entry, getKey(entry)))
}

// Over-generalized for a single use case`,
  },
  'fluent-prefer-primitives': {
    language: 'tsx',
    doCode: `<Field label="Title" required>
  <Input value={title} onChange={(_, data) => setTitle(data.value)} />
</Field>
<Button appearance="primary">Create item</Button>`,
    dontCode: `<label>Title</label>
<input value={title} onChange={(event) => setTitle(event.target.value)} />
<div className="custom-button">Create item</div>`,
  },
  'fluent-theme-token-discipline': {
    language: 'tsx',
    doCode: `<Card className="items-crud-card">
  <Text>Token-based, themed surface</Text>
</Card>

/* .items-crud-card uses theme variables in SCSS */`,
    dontCode: `<Card style={{ background: '#fff0f5', border: '1px solid #ff00ff' }}>
  <Text>Inline one-off colors</Text>
</Card>`,
  },
  'forms-field-validation-state': {
    language: 'tsx',
    doCode: `<Field label="Owner" required validationState={isOwnerInvalid ? 'error' : 'none'}>
  <Input value={owner} onChange={(_, data) => setOwner(data.value)} />
</Field>`,
    dontCode: `<Input value={owner} onChange={(_, data) => setOwner(data.value)} />
<Button onClick={save}>Save</Button>

// No required indicator or invalid state`,
  },
  'forms-trim-and-normalize-input': {
    language: 'ts',
    doCode: `await onSubmit({
  title: title.trim(),
  owner: owner.trim(),
  priority,
  status,
})`,
    dontCode: `await onSubmit({
  title,
  owner,
  priority,
  status,
})

// Trailing spaces and inconsistent input are persisted`,
  },
  'review-reject-waterfalls-and-boundary-leaks': {
    language: 'ts',
    doCode: `// Reviewer checklist
// ✅ Parallelize independent requests
// ✅ No shared -> feature imports
// ✅ Feature boundaries remain intact`,
    dontCode: `// Approved without checking architecture or request flow
// Result: slower UI + tighter coupling`,
  },
  'review-verify-a11y-and-loading-branches': {
    language: 'tsx',
    doCode: `// Reviewer verifies:
// - role="alert" for errors
// - keyboard reachable actions
// - explicit loading/error/success branches`,
    dontCode: `// Reviewer checks only visual layout
// Missing: keyboard flow and async state coverage`,
  },
  'structure-feature-first-boundaries': {
    language: 'ts',
    doCode: `// src/features/items/hooks/useItemsCrud.ts
import { listItems } from '../api/itemsApi'
import type { WorkItem } from '../model/item'`,
    dontCode: `// src/features/items/hooks/useItemsCrud.ts
import { sharedItemsStore } from '../../../shared/legacy/itemsStore'

// Ownership is unclear and feature boundaries blur`,
  },
  'structure-promote-shared-on-second-use': {
    language: 'ts',
    doCode: `// First use: keep utility in feature scope
// src/features/items/lib/normalizeItem.ts

// Promote to src/shared/lib only after second feature adoption`,
    dontCode: `// Immediately moved to src/shared/lib for one feature
// Creates premature shared API surface`,
  },
  'style-follow-lint-guardrails': {
    language: 'ts',
    doCode: `npm run check:all
npm run format:check

// Fix issues before merging`,
    dontCode: `// eslint-disable-next-line
// stylelint-disable-next-line
publishFeature()`,
  },
  'style-keep-components-focused': {
    language: 'tsx',
    doCode: `function ItemsToolbar() {
  return <Input aria-label="Search work items" />
}

function ItemsList() {
  return <ItemsTable items={items} />
}`,
    dontCode: `function ItemsPage() {
  // search, CRUD, table rendering, modal state,
  // metrics, analytics hooks, and side effects all in one file
}`,
  },
}

export function getTopicCodeExamples(category: PracticeCategory) {
  return topicCodeExamples[category]
}

export function getPracticeCodeExamples(example: PracticeExample) {
  if (example.codeLanguage && example.doCode && example.dontCode) {
    return {
      language: example.codeLanguage,
      doCode: example.doCode,
      dontCode: example.dontCode,
    }
  }

  return exampleCodeExamples[example.id] ?? topicCodeExamples[example.category]
}