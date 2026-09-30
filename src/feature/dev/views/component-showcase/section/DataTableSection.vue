<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppDataTable from '../../../../../shared/component/AppDataTable.vue'
import AppButton from '../../../../../shared/component/AppButton.vue'
import AppInputText from '../../../../../shared/component/AppInputText.vue'
import AppSelect from '../../../../../shared/component/AppSelect.vue'
import AppTag from '../../../../../shared/component/AppTag.vue'
import type {
  DataTableHeader,
  DataTableSort,
  DataTableState,
} from '../../../../../shared/component/dataTable.types'
import ShowcaseArticle from '../component/ShowcaseArticle.vue'
import type { ShowcaseFormState } from '../lib/formState'

type Person = {
  id: number
  name: string
  team: string
  role: string
  joinedAt: string
  requests: number
  salary: number
  lastSeen: number
  status: 'active' | 'onLeave'
}

const { locale, t } = useI18n({ useScope: 'global' })
const props = defineProps<{ form: ShowcaseFormState }>()
const form = props.form
const rows: Person[] = [
  {
    id: 1,
    name: 'Avery Chen',
    team: 'Design',
    role: 'Product designer responsible for the design system and core product workflows.',
    joinedAt: '2023-05-12T09:30:00Z',
    requests: 1250,
    salary: 92000,
    lastSeen: Date.now() - 12 * 60 * 1000,
    status: 'active',
  },
  {
    id: 2,
    name: 'Jordan Lee',
    team: 'Design',
    role: 'UX researcher',
    joinedAt: '2022-10-03T14:15:00Z',
    requests: 842,
    salary: 88000,
    lastSeen: Date.now() - 2 * 60 * 60 * 1000,
    status: 'active',
  },
  {
    id: 3,
    name: 'Morgan Patel',
    team: 'Engineering',
    role: 'Frontend engineer',
    joinedAt: '2021-02-18T08:00:00Z',
    requests: 2416,
    salary: 118000,
    lastSeen: Date.now() - 1 * 24 * 60 * 60 * 1000,
    status: 'active',
  },
  {
    id: 4,
    name: 'Riley Kim',
    team: 'Engineering',
    role: 'Backend engineer',
    joinedAt: '2020-11-09T16:45:00Z',
    requests: 1873,
    salary: 124000,
    lastSeen: Date.now() - 4 * 24 * 60 * 60 * 1000,
    status: 'onLeave',
  },
]

const sortField = ref('name')
const sortOrder = ref<1 | -1>(1)
const tableState = ref<DataTableState>('ready')
const teams = [...new Set(rows.map((person) => person.team))]
const teamOptions = computed(() => [
  { label: t('features.dev.dataTable.allTeams'), value: '' },
  ...teams.map((team) => ({ label: team, value: team })),
])
const stateOptions = computed(() =>
  (['ready', 'loading', 'empty', 'error'] as const).map((value) => ({
    value,
    label: t(`features.dev.dataTable.${value === 'empty' ? 'emptyState' : value}`),
  })),
)

const headers = computed<DataTableHeader[]>(() => [
  { field: 'name', header: t('features.dev.dataTable.name'), format: 'text', sortable: true },
  { field: 'team', header: t('features.dev.dataTable.team'), format: 'text', sortable: true },
  { field: 'role', header: t('features.dev.dataTable.role'), format: 'long-text' },
  { field: 'joinedAt', header: t('features.dev.dataTable.joinedAt'), format: 'date-time' },
  {
    field: 'requests',
    header: t('features.dev.dataTable.requests'),
    format: 'number',
    sortable: true,
  },
  {
    field: 'salary',
    header: t('features.dev.dataTable.salary'),
    format: 'currency',
    currency: 'USD',
    sortable: true,
  },
  { field: 'lastSeen', header: t('features.dev.dataTable.lastSeen'), format: 'timestamp' },
  { field: 'status', header: t('features.dev.dataTable.status'), format: 'custom' },
])
const selectionHeaders = computed<DataTableHeader[]>(() => [
  { field: 'name', header: t('features.dev.dataTable.name'), format: 'text' },
  { field: 'team', header: t('features.dev.dataTable.team'), format: 'text' },
])
const groupHeaders = computed<DataTableHeader[]>(() => [
  { field: 'name', header: t('features.dev.dataTable.name'), format: 'text' },
  { field: 'role', header: t('features.dev.dataTable.role'), format: 'long-text' },
  { field: 'status', header: t('features.dev.dataTable.status'), format: 'custom' },
])
const filteredRows = computed(() => {
  const query = form.dataTableSearch.trim().toLocaleLowerCase(locale.value)
  return rows
    .filter((person) => !form.dataTableTeam || person.team === form.dataTableTeam)
    .filter(
      (person) =>
        !query ||
        `${person.name} ${person.team} ${person.role}`
          .toLocaleLowerCase(locale.value)
          .includes(query),
    )
    .sort((left, right) => {
      const a = left[sortField.value as keyof Person]
      const b = right[sortField.value as keyof Person]
      const result =
        typeof a === 'number' && typeof b === 'number'
          ? a - b
          : String(a ?? '').localeCompare(String(b ?? ''), locale.value)
      return result * sortOrder.value
    })
})

function updateSort(sort: DataTableSort) {
  sortField.value = sort.sortField
  sortOrder.value = sort.sortOrder
}

function statusLabel(value: unknown) {
  return t(value === 'onLeave' ? 'features.dev.dataTable.onLeave' : 'features.dev.dataTable.active')
}

function statusTone(value: unknown): 'success' | 'warning' {
  return value === 'onLeave' ? 'warning' : 'success'
}

function selectedName(row: unknown) {
  if (!row || typeof row !== 'object') return ''
  const name = (row as Record<string, unknown>).name
  return typeof name === 'string' ? name : ''
}
</script>

<template>
  <section id="table" class="space-y-8" aria-labelledby="data-table-title">
    <header class="space-y-1">
      <h2 id="data-table-title" class="app-text-lg app-text-normal font-semibold">
        {{ t('features.dev.dataTable.title') }}
      </h2>
      <p class="app-text-sm app-text-muted">{{ t('features.dev.dataTable.description') }}</p>
    </header>

    <ShowcaseArticle
      id="data-table-formats"
      :title="t('features.dev.dataTable.formats')"
      :card="false"
    >
      <div class="mb-3 flex flex-wrap items-end gap-3">
        <label class="grid gap-1 app-text-xs app-text-muted">
          {{ t('features.dev.dataTable.search') }}
          <AppInputText
            id="data-table-search"
            v-model="form.dataTableSearch"
            type="search"
            size="small"
          />
        </label>
        <label class="grid gap-1 app-text-xs app-text-muted">
          {{ t('features.dev.dataTable.team') }}
          <AppSelect
            v-model="form.dataTableTeam"
            input-id="data-table-team-filter"
            :options="teamOptions"
            option-label="label"
            option-value="value"
            size="small"
          />
        </label>
        <span class="app-text-xs app-text-muted">
          {{
            t('features.dev.dataTable.sortState', {
              field: sortField,
              direction: sortOrder > 0 ? '↑' : '↓',
            })
          }}
        </span>
      </div>
      <AppDataTable
        :rows="filteredRows"
        :headers="headers"
        :aria-label="t('features.dev.dataTable.title')"
        :sort-field="sortField"
        :sort-order="sortOrder"
        :empty-text="t('features.dev.dataTable.empty')"
        :selection-label="t('features.dev.dataTable.selectRow')"
        @sort="updateSort"
      >
        <template #status="{ value }">
          <AppTag :value="statusLabel(value)" :tone="statusTone(value)" rounded />
        </template>
      </AppDataTable>
    </ShowcaseArticle>

    <ShowcaseArticle
      id="data-table-selection"
      :title="t('features.dev.dataTable.selection')"
      :card="false"
    >
      <div class="grid gap-5 xl:grid-cols-2">
        <div class="min-w-0 space-y-2">
          <h3 class="app-text-sm app-text-normal font-medium">
            {{ t('features.dev.dataTable.singleSelection') }}
          </h3>
          <AppDataTable
            v-model:selection="form.dataTableSingleSelection"
            :rows="rows"
            :headers="selectionHeaders"
            :aria-label="t('features.dev.dataTable.singleSelection')"
            selection-mode="single"
            :selection-label="t('features.dev.dataTable.selectRow')"
          />
          <p class="app-text-xs app-text-muted" aria-live="polite">
            {{ t('features.dev.dataTable.selected') }}:
            {{ selectedName(form.dataTableSingleSelection) || t('features.dev.dataTable.none') }}
          </p>
        </div>
        <div class="min-w-0 space-y-2">
          <h3 class="app-text-sm app-text-normal font-medium">
            {{ t('features.dev.dataTable.multipleSelection') }}
          </h3>
          <AppDataTable
            v-model:selection="form.dataTableMultipleSelection"
            :rows="rows"
            :headers="selectionHeaders"
            :aria-label="t('features.dev.dataTable.multipleSelection')"
            selection-mode="multiple"
            :selection-label="t('features.dev.dataTable.selectRow')"
            :select-all-label="t('features.dev.dataTable.selectAll')"
          />
          <p class="app-text-xs app-text-muted" aria-live="polite">
            {{
              t('features.dev.dataTable.selectedCount', {
                count: form.dataTableMultipleSelection.length,
              })
            }}
          </p>
        </div>
      </div>
    </ShowcaseArticle>

    <ShowcaseArticle
      id="data-table-groups"
      :title="t('features.dev.dataTable.groups')"
      :card="false"
    >
      <AppDataTable
        :rows="rows"
        :headers="groupHeaders"
        :aria-label="t('features.dev.dataTable.groups')"
        group-by="team"
      >
        <template #group-header="{ value, rows: groupRows }">
          <span class="font-semibold">{{ value }}</span>
          <span class="ml-2 app-text-xs app-text-muted">({{ groupRows.length }})</span>
        </template>
        <template #status="{ value }">
          <AppTag :value="statusLabel(value)" :tone="statusTone(value)" rounded />
        </template>
      </AppDataTable>
    </ShowcaseArticle>

    <ShowcaseArticle
      id="data-table-states"
      :title="t('features.dev.dataTable.states')"
      :card="false"
    >
      <div class="mb-3 flex flex-wrap gap-2">
        <AppButton
          v-for="option in stateOptions"
          :key="option.value"
          type="button"
          :label="option.label"
          :tone="tableState === option.value ? 'primary' : 'secondary'"
          appearance="outlined"
          size="small"
          :aria-pressed="tableState === option.value"
          @click="tableState = option.value"
        />
      </div>
      <AppDataTable
        :rows="rows"
        :headers="selectionHeaders"
        :aria-label="t('features.dev.dataTable.states')"
        :state="tableState"
        :empty-text="t('features.dev.dataTable.empty')"
        :loading-text="t('features.dev.dataTable.loadingMessage')"
        :error-text="t('features.dev.dataTable.loadError')"
      />
    </ShowcaseArticle>
  </section>
</template>
