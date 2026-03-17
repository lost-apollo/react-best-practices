import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Text,
} from '@fluentui/react-components'
import { Delete24Regular, Edit24Regular } from '@fluentui/react-icons'
import { memo, useMemo } from 'react'
import type { WorkItem, WorkItemInput } from '../model/item'
import { ItemFormDialog } from './ItemFormDialog'

interface ItemsTableProps {
  isSaving: boolean
  items: WorkItem[]
  onDelete: (id: string) => Promise<void>
  onEdit: (id: string, input: WorkItemInput) => Promise<void>
}

function ItemsTableComponent({ isSaving, items, onDelete, onEdit }: ItemsTableProps) {
  const hasItems = items.length > 0

  // Best practice: memoize derived row references used in heavy list rendering paths.
  const rows = useMemo(() => items, [items])

  if (!hasItems) {
    return (
      <div className="items-table-empty-state">
        <Text>No items found. Add your first work item to start tracking.</Text>
      </div>
    )
  }

  return (
    // Best practice: Fluent Table + descriptive aria-label improves screen-reader context.
    <Table aria-label="Work items" className="items-table">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Title</TableHeaderCell>
          <TableHeaderCell>Owner</TableHeaderCell>
          <TableHeaderCell>Priority</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.owner}</TableCell>
            <TableCell>
              <Badge
                appearance="tint"
                color={
                  item.priority === 'High'
                    ? 'danger'
                    : item.priority === 'Medium'
                      ? 'warning'
                      : 'informative'
                }
              >
                {item.priority}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                appearance="outline"
                color={item.status === 'Done' ? 'success' : 'informative'}
              >
                {item.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="items-table-actions">
                <ItemFormDialog
                  isSaving={isSaving}
                  item={item}
                  onSubmit={async (input) => {
                    // Best practice: keep mutation handlers explicit at the callsite for traceability.
                    await onEdit(item.id, input)
                  }}
                  triggerLabel="Edit"
                />
                <Button
                  appearance="subtle"
                  icon={<Delete24Regular />}
                  aria-label={`Delete ${item.title}`}
                  onClick={() => {
                    // Best practice: avoid unhandled async void by intentionally marking fire-and-forget.
                    void onDelete(item.id)
                  }}
                >
                  Delete
                </Button>
                <span className="items-table-icon-helper" aria-hidden="true">
                  <Edit24Regular />
                </span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const ItemsTable = memo(ItemsTableComponent)
