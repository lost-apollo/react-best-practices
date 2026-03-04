import { Badge, Card, CardHeader, Input, Spinner, Text } from '@fluentui/react-components'
import { Add24Regular, Search24Regular } from '@fluentui/react-icons'
import { useCallback } from 'react'
import { useItemsCrud } from '../hooks/useItemsCrud'
import { ItemFormDialog } from './ItemFormDialog'
import { ItemsTable } from './ItemsTable'

export function ItemsCrudPage() {
  const {
    addItem,
    allItemsCount,
    editItem,
    errorMessage,
    filteredItems,
    isFiltering,
    isLoading,
    isSaving,
    removeItem,
    searchQuery,
    setSearchValue,
  } = useItemsCrud()

  const handleCreate = useCallback(async (input: Parameters<typeof addItem>[0]) => {
    // Best practice: keep callbacks stable when passing handlers to child components.
    await addItem(input)
  }, [addItem])

  const handleEdit = useCallback(async (id: string, input: Parameters<typeof editItem>[1]) => {
    await editItem(id, input)
  }, [editItem])

  const handleDelete = useCallback(async (id: string) => {
    await removeItem(id)
  }, [removeItem])

  return (
    // Best practice: use semantic landmarks and headings for accessibility.
    <section aria-labelledby="items-crud-heading" className="items-crud">
      <Card className="items-crud-card">
        <CardHeader
          header={<Text as="h2" id="items-crud-heading" size={600} weight="semibold">Work Items CRUD</Text>}
          description={<Text>Feature-first React CRUD scaffold with accessibility and performance patterns.</Text>}
        />

        <div className="items-crud-header-meta" aria-label="List metrics">
          <Badge appearance="filled" color="informative">
            Total: {allItemsCount}
          </Badge>
          <Badge appearance="filled" color="success">
            Visible: {filteredItems.length}
          </Badge>
        </div>

        <div className="items-crud-toolbar">
          <Input
            className="items-crud-search"
            contentBefore={<Search24Regular />}
            value={searchQuery}
            onChange={(_, data) => {
              // Best practice: interaction intent stays in event handlers, not effects.
              setSearchValue(data.value)
            }}
            placeholder="Search by title, owner, priority, or status"
            aria-label="Search work items"
          />
          <ItemFormDialog
            isSaving={isSaving}
            onSubmit={handleCreate}
            triggerLabel="Create item"
          />
          <span className="items-crud-icon-helper" aria-hidden="true">
            <Add24Regular />
          </span>
        </div>

        {errorMessage ? (
          <Text role="alert" className="items-crud-error">
            {errorMessage}
          </Text>
        ) : null}

        {/* Best practice: explicit loading/success branches keep UI state predictable. */}
        {isLoading ? (
          <div className="items-crud-loading">
            <Spinner label="Loading items" />
          </div>
        ) : (
          <ItemsTable isSaving={isSaving} items={filteredItems} onDelete={handleDelete} onEdit={handleEdit} />
        )}

        {isFiltering ? <Text size={200}>Updating search results…</Text> : null}
      </Card>
    </section>
  )
}
