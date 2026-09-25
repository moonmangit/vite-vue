import type { NavigationGroup } from '../../shared/navigation/main'

export const dashboardNavigation: NavigationGroup[] = [
  {
    titleKey: 'nav.groups.core',
    items: [
      {
        id: 'dashboard',
        labelKey: 'nav.dashboard',
        icon: 'pi pi-th-large',
        to: '/',
        statusState: 'notify',
        badge: { value: 'LIVE', severity: 'success', pulse: true },
      },
      {
        id: 'analytics-parent',
        labelKey: 'nav.analytics',
        icon: 'pi pi-chart-line',
        children: [
          {
            id: 'realtime-metrics',
            label: 'Realtime Telemetry',
            icon: 'pi pi-bolt',
            to: '/analytics/realtime',
          },
          {
            id: 'data-warehousing-level2',
            label: 'Data Warehousing',
            icon: 'pi pi-database',
            statusState: 'notify',
            children: [
              {
                id: 'bq-realtime-level3',
                label: 'BigQuery Stream',
                icon: 'pi pi-cloud',
                to: '/analytics/bigquery',
                badge: { value: '99.9%', severity: 'success' },
              },
              {
                id: 'snowflake-level3',
                label: 'Snowflake Storage',
                icon: 'pi pi-box',
                to: '/snowflake',
                statusState: 'muted',
              },
              {
                id: 'clickhouse-level3',
                label: 'ClickHouse Sync',
                icon: 'pi pi-sync',
                to: '/clickhouse',
                statusState: 'loading',
              },
            ],
          },
          {
            id: 'historical-reports',
            label: 'Historical Reports',
            icon: 'pi pi-file',
            to: '/reports',
            statusState: 'muted',
          },
        ],
      },
    ],
  },
  {
    titleKey: 'nav.groups.system',
    items: [
      {
        id: 'cluster-nodes-level1',
        labelKey: 'nav.clusterNodes',
        icon: 'pi pi-server',
        children: [
          {
            id: 'k8s-regional-level2',
            label: 'Kubernetes Pods',
            icon: 'pi pi-box',
            children: [
              {
                id: 'node-us-east-level3',
                label: 'US-East (Prod Cluster)',
                icon: 'pi pi-globe',
                to: '/nodes/us-east',
              },
              {
                id: 'node-eu-west-level3',
                label: 'EU-West (Staging Cluster)',
                icon: 'pi pi-globe',
                to: '/nodes/eu-west',
                badge: { value: 'WARN', severity: 'warn' },
              },
              {
                id: 'node-ap-south-level3',
                label: 'AP-South (Dev Cluster)',
                icon: 'pi pi-globe',
                to: '/nodes/ap-south',
              },
            ],
          },
        ],
      },
      {
        id: 'security-audit',
        labelKey: 'nav.securityAudit',
        icon: 'pi pi-shield',
        statusState: 'notify',
        badge: { value: '3 Alerts', severity: 'danger', pulse: true },
      },
    ],
  },
  {
    titleKey: 'nav.groups.app',
    items: [
      {
        id: 'system-settings',
        labelKey: 'nav.systemSettings',
        icon: 'pi pi-cog',
        children: [
          {
            id: 'general-settings',
            label: 'General Preferences',
            icon: 'pi pi-sliders-h',
            to: '/settings/general',
          },
          {
            id: 'i18n-settings',
            label: 'Language & Locale',
            icon: 'pi pi-language',
            to: '/settings/i18n',
          },
        ],
      },
    ],
  },
]
