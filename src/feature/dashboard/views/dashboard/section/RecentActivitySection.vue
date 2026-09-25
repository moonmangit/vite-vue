<script setup lang="ts">
import StatusBadge from '../../../../../shared/component/StatusBadge.vue'
import AppButton from '../../../../../shared/component/AppButton.vue'
import AppCard from '../../../../../shared/component/AppCard.vue'
import AppInputText from '../../../../../shared/component/AppInputText.vue'
import type { ActivityRecord } from '../../../lib/dashboardData'

defineProps<{
  auditLogs: ActivityRecord[]
}>()
</script>

<template>
  <AppCard>
    <template #title>
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-2">
          <i class="pi pi-shield app-text-sm text-primary-600" />
          <span class="app-text-xs app-text-normal font-bold uppercase tracking-wider">
            {{ $t('features.dashboard.audit.title') }}
          </span>
        </div>

        <div class="flex items-center gap-2">
          <AppInputText
            :placeholder="$t('features.dashboard.audit.filterPlaceholder')"
            class="w-36 app-text-xs"
          />
          <AppButton
            icon="pi pi-filter"
            tone="secondary"
            size="small"
            appearance="text"
            class="p-1"
          />
        </div>
      </div>
    </template>

    <template #content>
      <div class="overflow-x-auto">
        <table class="w-full text-left app-text-xs border-collapse">
          <thead>
            <tr class="border-b border-slate-200 app-text-muted app-dark:border-zinc-800">
              <th class="py-2 px-3 font-semibold">{{ $t('features.dashboard.audit.user') }}</th>
              <th class="py-2 px-3 font-semibold">{{ $t('features.dashboard.audit.action') }}</th>
              <th class="py-2 px-3 font-semibold">
                {{ $t('features.dashboard.audit.ipAddress') }}
              </th>
              <th class="py-2 px-3 font-semibold">{{ $t('features.dashboard.audit.status') }}</th>
              <th class="py-2 px-3 font-semibold text-right">
                {{ $t('features.dashboard.audit.timestamp') }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 app-dark:divide-zinc-800/60">
            <tr
              v-for="log in auditLogs"
              :key="log.id"
              class="hover:bg-slate-50 app-dark:hover:bg-zinc-900/50 transition"
            >
              <td class="py-2.5 px-3 font-bold app-text-normal">
                {{ log.user }}
              </td>
              <td class="py-2.5 px-3 app-text-muted">
                {{ log.action }}
              </td>
              <td
                class="py-2.5 px-3 font-mono app-text-custom app-text-muted"
                style="--app-font-size: 11px"
              >
                {{ log.ip }}
              </td>
              <td class="py-2.5 px-3">
                <StatusBadge :status="log.status" />
              </td>
              <td
                class="py-2.5 px-3 text-right app-text-custom app-text-muted"
                style="--app-font-size: 11px"
              >
                {{ log.timestamp }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </AppCard>
</template>
