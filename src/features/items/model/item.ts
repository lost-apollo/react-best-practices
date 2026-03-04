export type ItemPriority = 'Low' | 'Medium' | 'High'
export type ItemStatus = 'Planned' | 'In Progress' | 'Done'

// Best practice: separate persisted entity shape from mutable form input contract.
export interface WorkItem {
  id: string
  title: string
  owner: string
  priority: ItemPriority
  status: ItemStatus
  createdAt: string
  updatedAt: string
}

export interface WorkItemInput {
  title: string
  owner: string
  priority: ItemPriority
  status: ItemStatus
}
