import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react'
import { createItem, deleteItem, listItems, updateItem } from '../api/itemsApi'
import type { WorkItem, WorkItemInput } from '../model/item'

type CrudStatus = 'idle' | 'loading' | 'saving' | 'error'

export function useItemsCrud() {
  // Best practice: keep a minimal, explicit source of truth for async UI state.
  const [items, setItems] = useState<WorkItem[]>([])
  const [status, setStatus] = useState<CrudStatus>('idle')
  const [searchQuery, setSearchQuery] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  // Best practice: transition non-urgent updates to keep input interactions responsive.
  const [isFiltering, startFilteringTransition] = useTransition()
  // Best practice: guard against stale async responses by tracking the latest request id.
  const latestLoadRequestIdRef = useRef(0)

  useEffect(() => {
    let isActive = true

    async function load() {
      const requestId = latestLoadRequestIdRef.current + 1
      latestLoadRequestIdRef.current = requestId

      setStatus('loading')
      setErrorMessage(null)

      try {
        const response = await listItems()

        if (!isActive || latestLoadRequestIdRef.current !== requestId) {
          return
        }

        setItems(response)
        setStatus('idle')
      } catch {
        if (!isActive || latestLoadRequestIdRef.current !== requestId) {
          return
        }

        setErrorMessage('Unable to load items. Please refresh and try again.')
        setStatus('error')
      }
    }

    void load()

    return () => {
      isActive = false
    }
  }, [])

  // Best practice: defer expensive filtering work derived from user typing.
  const deferredSearchQuery = useDeferredValue(searchQuery)

  const filteredItems = useMemo(() => {
    if (!deferredSearchQuery.trim()) {
      return items
    }

    const normalizedQuery = deferredSearchQuery.trim().toLowerCase()

    return items.filter((item) => {
      const searchableText =
        `${item.title} ${item.owner} ${item.priority} ${item.status}`.toLowerCase()
      return searchableText.includes(normalizedQuery)
    })
  }, [deferredSearchQuery, items])

  // Best practice: mark search updates as non-urgent so rendering can prioritize typing.
  const setSearchValue = useCallback((value: string) => {
    startFilteringTransition(() => {
      setSearchQuery(value)
    })
  }, [])

  // Best practice: centralize mutation lifecycle handling for predictable UX and errors.
  const executeMutation = useCallback(
    async (operation: () => Promise<void>, failureMessage: string) => {
      setStatus('saving')
      setErrorMessage(null)

      try {
        await operation()
        setStatus('idle')
      } catch {
        setErrorMessage(failureMessage)
        setStatus('error')
      }
    },
    [],
  )

  const addItem = useCallback(
    async (input: WorkItemInput) => {
      await executeMutation(async () => {
        const createdItem = await createItem(input)
        // Best practice: functional state updates avoid stale closures during async writes.
        setItems((currentItems) => [createdItem, ...currentItems])
      }, 'Unable to create item. Please try again.')
    },
    [executeMutation],
  )

  const editItem = useCallback(
    async (id: string, input: WorkItemInput) => {
      await executeMutation(async () => {
        const updatedItem = await updateItem(id, input)

        if (updatedItem) {
          setItems((currentItems) =>
            currentItems.map((item) => (item.id === id ? updatedItem : item)),
          )
        }
      }, 'Unable to update item. Please try again.')
    },
    [executeMutation],
  )

  const removeItem = useCallback(
    async (id: string) => {
      await executeMutation(async () => {
        await deleteItem(id)
        setItems((currentItems) => currentItems.filter((item) => item.id !== id))
      }, 'Unable to delete item. Please try again.')
    },
    [executeMutation],
  )

  return {
    allItemsCount: items.length,
    errorMessage,
    filteredItems,
    isFiltering,
    isLoading: status === 'loading',
    isSaving: status === 'saving',
    searchQuery,
    setSearchValue,
    addItem,
    editItem,
    removeItem,
  }
}
