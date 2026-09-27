<script setup lang="ts">
import { computed, useId } from 'vue'
import AppButton from './AppButton.vue'
import AppCheckbox from './AppCheckbox.vue'
import AppDataTableField from './AppDataTableField.vue'
import AppRadioButton from './AppRadioButton.vue'
import type {
  DataTableHeader,
  DataTableSelectionMode,
  DataTableSort,
  DataTableState,
} from './dataTable.types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    rows: unknown[]
    headers: DataTableHeader[]
    ariaLabel?: string
    emptyText?: string
    loadingText?: string
    errorText?: string
    rowKey?: string
    selectionMode?: DataTableSelectionMode
    selection?: unknown | unknown[] | null
    selectionLabel?: string
    selectAllLabel?: string
    groupBy?: string
    state?: DataTableState
    sortField?: string
    sortOrder?: 1 | -1
  }>(),
  {
    emptyText: 'No rows',
    loadingText: 'Loading…',
    errorText: 'Could not load rows.',
    rowKey: 'id',
    selectionLabel: 'Select row',
    selectAllLabel: 'Select all rows',
    state: 'ready',
  },
)

const emit = defineEmits<{
  'update:selection': [selection: unknown | unknown[] | null]
  sort: [sort: DataTableSort]
}>()

const radioGroupName = `app-data-table-${useId()}`

type TableEntry =
  | { kind: 'group'; id: string; value: unknown; rows: unknown[] }
  | { kind: 'row'; id: string | number; row: unknown; rowIndex: number }

function valueFor(row: unknown, field: string) {
  if (row === null || typeof row !== 'object') return undefined
  return (row as Record<string, unknown>)[field]
}

function keyFor(row: unknown, index: number) {
  const key = valueFor(row, props.rowKey)
  return typeof key === 'string' || typeof key === 'number' ? key : index
}

function rowLabel(row: unknown, index: number) {
  const key = valueFor(row, props.rowKey)
  return `${props.selectionLabel} ${String(key ?? index + 1)}`
}

function rowsMatch(left: unknown, right: unknown) {
  if (left === right) return true
  const leftKey = valueFor(left, props.rowKey)
  const rightKey = valueFor(right, props.rowKey)
  return leftKey !== undefined && rightKey !== undefined && leftKey === rightKey
}

function isSelected(row: unknown) {
  if (props.selectionMode === 'single') {
    return (
      props.selection != null && !Array.isArray(props.selection) && rowsMatch(props.selection, row)
    )
  }

  return (
    Array.isArray(props.selection) && props.selection.some((selected) => rowsMatch(selected, row))
  )
}

function updateSelection(row: unknown, checked: boolean) {
  if (props.selectionMode === 'single') {
    emit('update:selection', checked ? row : null)
    return
  }

  const selectedRows = Array.isArray(props.selection) ? props.selection : []
  const nextSelection = selectedRows.filter((selected) => !rowsMatch(selected, row))
  if (checked) nextSelection.push(row)
  emit('update:selection', nextSelection)
}

const selectedRowsCount = computed(() => props.rows.filter(isSelected).length)
const allRowsSelected = computed(
  () => props.rows.length > 0 && selectedRowsCount.value === props.rows.length,
)
const someRowsSelected = computed(
  () => selectedRowsCount.value > 0 && selectedRowsCount.value < props.rows.length,
)

function updateAllSelection(checked: boolean) {
  const selectedRows = Array.isArray(props.selection) ? [...props.selection] : []
  const nextSelection = checked
    ? selectedRows
    : selectedRows.filter((selected) => !props.rows.some((row) => rowsMatch(selected, row)))

  if (checked) {
    for (const row of props.rows) {
      if (!nextSelection.some((selected) => rowsMatch(selected, row))) nextSelection.push(row)
    }
  }

  emit('update:selection', nextSelection)
}

function updateCheckboxSelection(entry: TableEntry, selectedKeys: Array<string | number>) {
  if (entry.kind !== 'row') return
  updateSelection(entry.row, selectedKeys.includes(keyFor(entry.row, entry.rowIndex)))
}

function sortBy(header: DataTableHeader) {
  if (!header.sortable) return
  const sortOrder = props.sortField === header.field && props.sortOrder === 1 ? -1 : 1
  emit('sort', { sortField: header.field, sortOrder })
}

function ariaSort(header: DataTableHeader) {
  if (!header.sortable || props.sortField !== header.field) return 'none'
  return props.sortOrder === 1 ? 'ascending' : 'descending'
}

const tableEntries = computed<TableEntry[]>(() => {
  const indexedRows = props.rows.map((row, rowIndex) => ({ row, rowIndex }))
  if (!props.groupBy) {
    return indexedRows.map(({ row, rowIndex }) => ({
      kind: 'row',
      id: keyFor(row, rowIndex),
      row,
      rowIndex,
    }))
  }

  const groups = new Map<unknown, { value: unknown; rows: typeof indexedRows }>()
  for (const entry of indexedRows) {
    const value = valueFor(entry.row, props.groupBy)
    const group = groups.get(value) ?? { value, rows: [] }
    group.rows.push(entry)
    groups.set(value, group)
  }

  return [...groups.values()].flatMap((group, groupIndex) => [
    {
      kind: 'group' as const,
      id: `group-${groupIndex}`,
      value: group.value,
      rows: group.rows.map(({ row }) => row),
    },
    ...group.rows.map(({ row, rowIndex }) => ({
      kind: 'row' as const,
      id: keyFor(row, rowIndex),
      row,
      rowIndex,
    })),
  ])
})
</script>

<template>
  <div
    v-bind="$attrs"
    class="app-data-table min-w-0 overflow-hidden rounded-lg border app-surface-border"
  >
    <table class="app-data-table__table app-text-sm app-text-normal" :aria-label="ariaLabel">
      <thead class="app-text-muted">
        <tr>
          <th v-if="selectionMode" class="app-data-table__selection-column" scope="col">
            <AppCheckbox
              v-if="selectionMode === 'multiple'"
              :model-value="allRowsSelected"
              :input-id="`${radioGroupName}-select-all`"
              :aria-label="selectAllLabel"
              :indeterminate="someRowsSelected"
              :disabled="state !== 'ready' || rows.length === 0"
              binary
              @update:model-value="updateAllSelection"
            />
            <span v-else class="sr-only">{{ selectionLabel }}</span>
          </th>
          <th
            v-for="header in headers"
            :key="header.field"
            scope="col"
            :aria-sort="header.sortable ? ariaSort(header) : undefined"
          >
            <AppButton
              v-if="header.sortable"
              type="button"
              appearance="text"
              tone="secondary"
              size="small"
              class="app-data-table__sort-button p-0"
              @click="sortBy(header)"
            >
              {{ header.header }}
              <span class="app-data-table__sort-indicator" aria-hidden="true">
                {{ sortField === header.field ? (sortOrder === 1 ? '↑' : '↓') : '↕' }}
              </span>
            </AppButton>
            <span v-else>{{ header.header }}</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="state === 'ready' && rows.length">
        <template v-for="entry in tableEntries" :key="entry.id">
          <tr v-if="entry.kind === 'group'" class="app-data-table__group-row">
            <th :colspan="headers.length + (selectionMode ? 1 : 0)" scope="rowgroup">
              <slot name="group-header" :value="entry.value" :rows="entry.rows" :field="groupBy">
                {{ entry.value == null ? '—' : String(entry.value) }}
              </slot>
            </th>
          </tr>
          <tr v-else>
            <td v-if="selectionMode" class="app-data-table__selection-column">
              <AppRadioButton
                v-if="selectionMode === 'single'"
                :model-value="isSelected(entry.row) ? keyFor(entry.row, entry.rowIndex) : undefined"
                :value="keyFor(entry.row, entry.rowIndex)"
                :input-id="`${radioGroupName}-${entry.rowIndex}`"
                :name="radioGroupName"
                :aria-label="rowLabel(entry.row, entry.rowIndex)"
                @update:model-value="updateSelection(entry.row, true)"
              />
              <AppCheckbox
                v-else
                :model-value="isSelected(entry.row) ? [keyFor(entry.row, entry.rowIndex)] : []"
                :value="keyFor(entry.row, entry.rowIndex)"
                :input-id="`${radioGroupName}-${entry.rowIndex}`"
                :aria-label="rowLabel(entry.row, entry.rowIndex)"
                @update:model-value="updateCheckboxSelection(entry, $event)"
              />
            </td>
            <td v-for="header in headers" :key="header.field">
              <slot
                v-if="header.format === 'custom'"
                :name="header.slot ?? header.field"
                :row="entry.row"
                :value="valueFor(entry.row, header.field)"
                :header="header"
                :row-index="entry.rowIndex"
              >
                <span class="app-text-muted">—</span>
              </slot>
              <AppDataTableField
                v-else
                :value="valueFor(entry.row, header.field)"
                :format="header.format"
                :currency="header.currency"
              />
            </td>
          </tr>
        </template>
      </tbody>
      <tbody v-else>
        <tr>
          <td
            :colspan="Math.max(headers.length + (selectionMode ? 1 : 0), 1)"
            class="app-data-table__state app-text-muted"
          >
            <div v-if="state === 'loading'" role="status">
              <slot name="loading">{{ loadingText }}</slot>
            </div>
            <div v-else-if="state === 'error'" role="alert">
              <slot name="error">{{ errorText }}</slot>
            </div>
            <slot v-else name="empty">{{ emptyText }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.app-data-table__table {
  width: 100%;
  min-width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  background: var(--app-surface-color);
}

.app-data-table__table th,
.app-data-table__table td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--app-surface-border-color);
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.app-data-table__table th {
  background: var(--p-surface-50);
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
}

.app-dark .app-data-table__table th {
  background: var(--p-surface-800);
}

.app-data-table__table th:not(:last-child),
.app-data-table__table td:not(:last-child) {
  border-inline-end: 1px solid var(--app-surface-border-color);
}

.app-data-table__table th.app-data-table__selection-column,
.app-data-table__table td.app-data-table__selection-column {
  width: 3rem;
  text-align: center;
  text-overflow: clip;
}

.app-data-table__sort-button {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  max-width: 100%;
  color: inherit;
  font: inherit;
  text-align: left;
}

.app-data-table__sort-button:focus-visible {
  border-radius: 0.125rem;
  outline: 2px solid var(--p-primary-color);
  outline-offset: 2px;
}

.app-data-table__sort-indicator {
  flex: none;
  color: var(--app-tone-muted);
}

.app-data-table__group-row th {
  background: var(--p-surface-100);
  font-weight: 600;
  text-align: left;
}

.app-dark .app-data-table__group-row th {
  background: var(--p-surface-800);
}

.app-data-table__group-row:hover {
  background: transparent !important;
}

.app-data-table__table tbody tr:last-child td {
  border-bottom: 0;
}

.app-data-table__table tbody tr:hover {
  background: var(--p-surface-50);
}

.app-dark .app-data-table__table tbody tr:hover {
  background: var(--p-surface-800);
}

.app-data-table__state {
  padding-block: 1.5rem !important;
  text-align: center;
}
</style>
