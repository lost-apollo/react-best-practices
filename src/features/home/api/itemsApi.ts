import type { WorkItem, WorkItemInput } from '../model/item'

const STORAGE_KEY = 'react-best-practices.items'

const seedItems: WorkItem[] = [
  {
    id: '1',
    title: 'Create accessibility checklist',
    owner: 'Alex',
    priority: 'High',
    status: 'In Progress',
    createdAt: new Date('2026-03-01T10:00:00Z').toISOString(),
    updatedAt: new Date('2026-03-02T14:00:00Z').toISOString(),
  },
  {
    id: '2',
    title: 'Audit rerender hotspots',
    owner: 'Casey',
    priority: 'Medium',
    status: 'Planned',
    createdAt: new Date('2026-03-01T11:00:00Z').toISOString(),
    updatedAt: new Date('2026-03-01T11:00:00Z').toISOString(),
  },
  {
    id: '3',
    title: 'Document feature folder boundaries',
    owner: 'Jordan',
    priority: 'Low',
    status: 'Done',
    createdAt: new Date('2026-03-01T09:00:00Z').toISOString(),
    updatedAt: new Date('2026-03-03T16:00:00Z').toISOString(),
  },
]

function delay() {
  // Best practice: small deterministic delay simulates network latency for realistic UI states.
  return new Promise<void>((resolve) => {
    setTimeout(resolve, 150)
  })
}

function readItems(): WorkItem[] {
  // Best practice: keep persistence concerns isolated in feature api adapters.
  const rawValue = localStorage.getItem(STORAGE_KEY)

  if (!rawValue) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedItems))
    return seedItems
  }

  try {
    const parsed = JSON.parse(rawValue) as WorkItem[]
    return parsed
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedItems))
    return seedItems
  }
}

function writeItems(items: WorkItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `${String(Date.now())}-${Math.random().toString(36).slice(2, 8)}`
}

export async function listItems() {
  await delay()
  return readItems()
}

export async function createItem(input: WorkItemInput) {
  await delay()

  const now = new Date().toISOString()
  const newItem: WorkItem = {
    id: generateId(),
    ...input,
    createdAt: now,
    updatedAt: now,
  }

  const nextItems = [newItem, ...readItems()]
  writeItems(nextItems)

  return newItem
}

export async function updateItem(id: string, input: WorkItemInput) {
  await delay()

  const nextItems = readItems().map((item) => {
    if (item.id !== id) {
      return item
    }

    return {
      ...item,
      ...input,
      updatedAt: new Date().toISOString(),
    }
  })

  writeItems(nextItems)

  return nextItems.find((item) => item.id === id) ?? null
}

export async function deleteItem(id: string) {
  await delay()

  const nextItems = readItems().filter((item) => item.id !== id)
  writeItems(nextItems)
}
