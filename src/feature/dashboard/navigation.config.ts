import type { NavigationGroup } from '../../shared/navigation/main'

export const dashboardNavigation: NavigationGroup[] = [
  {
    titleKey: 'nav.groups.core',
    items: [
      {
        id: 'dashboard',
        labelKey: 'features.dashboard.navigation.dashboard',
        icon: 'pi pi-th-large',
        to: '/',
        statusState: 'notify',
        badge: { value: 'LIVE', severity: 'success', pulse: true },
      },
      {
        id: 'analytics-parent',
        labelKey: 'features.dashboard.navigation.analytics',
        icon: 'pi pi-chart-line',
        children: [
          {
            id: 'realtime-metrics',
            labelKey: 'features.dashboard.navigation.realtimeTelemetry',
            icon: 'pi pi-bolt',
            to: '/analytics/realtime',
          },
          {
            id: 'data-warehousing-level2',
            labelKey: 'features.dashboard.navigation.dataWarehousing',
            icon: 'pi pi-database',
            statusState: 'notify',
            children: [
              {
                id: 'bq-realtime-level3',
                labelKey: 'features.dashboard.navigation.bigQueryStream',
                icon: 'pi pi-cloud',
                to: '/analytics/bigquery',
                badge: { value: '99.9%', severity: 'success' },
              },
              {
                id: 'snowflake-level3',
                labelKey: 'features.dashboard.navigation.snowflakeStorage',
                icon: 'pi pi-box',
                to: '/snowflake',
                statusState: 'muted',
              },
              {
                id: 'clickhouse-level3',
                labelKey: 'features.dashboard.navigation.clickHouseSync',
                icon: 'pi pi-sync',
                to: '/clickhouse',
                statusState: 'loading',
              },
            ],
          },
          {
            id: 'historical-reports',
            labelKey: 'features.dashboard.navigation.historicalReports',
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
        labelKey: 'features.dashboard.navigation.clusterNodes',
        icon: 'pi pi-server',
        children: [
          {
            id: 'k8s-regional-level2',
            labelKey: 'features.dashboard.navigation.kubernetesPods',
            icon: 'pi pi-box',
            children: [
              {
                id: 'node-us-east-level3',
                labelKey: 'features.dashboard.navigation.usEast',
                icon: 'pi pi-globe',
                to: '/nodes/us-east',
              },
              {
                id: 'node-eu-west-level3',
                labelKey: 'features.dashboard.navigation.euWest',
                icon: 'pi pi-globe',
                to: '/nodes/eu-west',
                badge: { value: 'WARN', severity: 'warn' },
              },
              {
                id: 'node-ap-south-level3',
                labelKey: 'features.dashboard.navigation.apSouth',
                icon: 'pi pi-globe',
                to: '/nodes/ap-south',
              },
            ],
          },
        ],
      },
      {
        id: 'security-audit',
        labelKey: 'features.dashboard.navigation.securityAudit',
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
        labelKey: 'features.dashboard.navigation.systemSettings',
        icon: 'pi pi-cog',
        children: [
          {
            id: 'general-settings',
            labelKey: 'features.dashboard.navigation.generalPreferences',
            icon: 'pi pi-sliders-h',
            to: '/settings/general',
          },
          {
            id: 'i18n-settings',
            labelKey: 'features.dashboard.navigation.languageLocale',
            icon: 'pi pi-language',
            to: '/settings/i18n',
          },
        ],
      },
    ],
  },
]
