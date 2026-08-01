<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import StatusBadge from '../../../../shared/component/StatusBadge.vue'
import type { ActivityRecord } from '../../lib/dashboardData'

defineProps<{
  auditLogs: ActivityRecord[]
}>()
</script>

<template>
  <Card>
    <template #title>
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-2">
          <i class="pi pi-shield text-primary-600 text-sm" />
          <span
            class="text-xs font-bold uppercase tracking-wider text-slate-700 app-dark:text-zinc-300"
          >
            Security & Audit Trail
          </span>
        </div>

        <div class="flex items-center gap-2">
          <InputText placeholder="Filter logs..." class="w-36 text-xs" />
          <Button icon="pi pi-filter" severity="secondary" size="small" text class="p-1" />
        </div>
      </div>
    </template>

    <template #content>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr
              class="border-b border-slate-200 text-slate-400 app-dark:border-zinc-800 app-dark:text-zinc-500"
            >
              <th class="py-2 px-3 font-semibold">User</th>
              <th class="py-2 px-3 font-semibold">Action</th>
              <th class="py-2 px-3 font-semibold">IP Address</th>
              <th class="py-2 px-3 font-semibold">Status</th>
              <th class="py-2 px-3 font-semibold text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 app-dark:divide-zinc-800/60">
            <tr
              v-for="log in auditLogs"
              :key="log.id"
              class="hover:bg-slate-50 app-dark:hover:bg-zinc-900/50 transition"
            >
              <td class="py-2.5 px-3 font-bold text-slate-900 app-dark:text-white">
                {{ log.user }}
              </td>
              <td class="py-2.5 px-3 text-slate-600 app-dark:text-zinc-300">
                {{ log.action }}
              </td>
              <td class="py-2.5 px-3 font-mono text-[11px] text-slate-500 app-dark:text-zinc-400">
                {{ log.ip }}
              </td>
              <td class="py-2.5 px-3">
                <StatusBadge :status="log.status" />
              </td>
              <td class="py-2.5 px-3 text-right text-slate-400 app-dark:text-zinc-500 text-[11px]">
                {{ log.timestamp }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </Card>
</template>
