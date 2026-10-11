/** Numeric values for the `timestamp` format are milliseconds since the Unix epoch. */
export type DataTableFieldFormat =
  'date-time' | 'number' | 'currency' | 'text' | 'long-text' | 'timestamp' | 'custom'

export type DataTableSelectionMode = 'single' | 'multiple'

export type DataTableState = 'ready' | 'loading' | 'empty' | 'error'

export interface DataTableHeader {
  field: string
  header: string
  format: DataTableFieldFormat
  currency?: string
  slot?: string
  sortable?: boolean
}

export interface DataTableSort {
  sortField: string
  sortOrder: 1 | -1
}
