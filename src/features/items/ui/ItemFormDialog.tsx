import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
  Select,
} from '@fluentui/react-components'
import { useMemo, useState, type SyntheticEvent } from 'react'
import type { WorkItem, WorkItemInput, ItemPriority, ItemStatus } from '../model/item'

const priorityOptions: ItemPriority[] = ['Low', 'Medium', 'High']
const statusOptions: ItemStatus[] = ['Planned', 'In Progress', 'Done']

interface ItemFormDialogProps {
  isSaving: boolean
  item?: WorkItem
  onSubmit: (input: WorkItemInput) => Promise<void>
  triggerLabel: string
}

export function ItemFormDialog({ isSaving, item, onSubmit, triggerLabel }: ItemFormDialogProps) {
  const [open, setOpen] = useState(false)

  // Best practice: derive initial state from props with memoized shape for predictable resets.
  const initialValues = useMemo<WorkItemInput>(
    () => ({
      title: item?.title ?? '',
      owner: item?.owner ?? '',
      priority: item?.priority ?? 'Medium',
      status: item?.status ?? 'Planned',
    }),
    [item],
  )

  const [title, setTitle] = useState(initialValues.title)
  const [owner, setOwner] = useState(initialValues.owner)
  const [priority, setPriority] = useState<ItemPriority>(initialValues.priority)
  const [status, setStatus] = useState<ItemStatus>(initialValues.status)

  const isTitleInvalid = title.trim().length === 0
  const isOwnerInvalid = owner.trim().length === 0

  const submitDisabled = isSaving || isTitleInvalid || isOwnerInvalid

  function resetForm() {
    // Best practice: a single reset path keeps create/edit behavior consistent.
    setTitle(initialValues.title)
    setOwner(initialValues.owner)
    setPriority(initialValues.priority)
    setStatus(initialValues.status)
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()

    if (submitDisabled) {
      return
    }

    await onSubmit({
      title: title.trim(),
      owner: owner.trim(),
      priority,
      status,
    })

    setOpen(false)
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)

    if (nextOpen) {
      // Best practice: reset form on open to avoid stale data between dialog sessions.
      resetForm()
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(_, data) => {
        handleOpenChange(data.open)
      }}
    >
      <DialogTrigger disableButtonEnhancement>
        <Button appearance={item ? 'subtle' : 'primary'} size="medium">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogSurface className="item-form-surface">
        <DialogBody>
          <DialogTitle>{item ? 'Edit item' : 'Create item'}</DialogTitle>
          <DialogContent>
            <p className="item-form-description">
              {item
                ? 'Update ownership, priority, and status for this work item.'
                : 'Add a new work item with clear ownership, priority, and delivery status.'}
            </p>
            <form
              className="item-form"
              onSubmit={(event) => {
                void handleSubmit(event)
              }}
            >
              <div className="item-form-grid">
                <Field
                  className="item-form-field item-form-field-title"
                  label="Title"
                  required
                  // Best practice: expose validation state directly on input fields.
                  validationState={isTitleInvalid ? 'error' : 'none'}
                >
                  <Input
                    value={title}
                    onChange={(_, data) => {
                      setTitle(data.value)
                    }}
                    placeholder="Enter task title"
                  />
                </Field>

                <Field
                  className="item-form-field"
                  label="Owner"
                  required
                  validationState={isOwnerInvalid ? 'error' : 'none'}
                >
                  <Input
                    value={owner}
                    onChange={(_, data) => {
                      setOwner(data.value)
                    }}
                    placeholder="Enter owner name"
                  />
                </Field>

                <Field className="item-form-field" label="Priority" required>
                  <Select
                    value={priority}
                    onChange={(event) => {
                      setPriority(event.currentTarget.value as ItemPriority)
                    }}
                  >
                    {priorityOptions.map((priorityOption) => (
                      <option key={priorityOption} value={priorityOption}>
                        {priorityOption}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field className="item-form-field" label="Status" required>
                  <Select
                    value={status}
                    onChange={(event) => {
                      setStatus(event.currentTarget.value as ItemStatus)
                    }}
                  >
                    {statusOptions.map((statusOption) => (
                      <option key={statusOption} value={statusOption}>
                        {statusOption}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>

              <DialogActions className="item-form-actions">
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="secondary">Cancel</Button>
                </DialogTrigger>
                <Button appearance="primary" type="submit" disabled={submitDisabled}>
                  {item ? 'Save changes' : 'Create'}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}
