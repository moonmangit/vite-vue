export interface MetricItem {
  id: string
  title: string
  value: string
  trend: string
  trendType: 'up' | 'down' | 'neutral'
  icon: string
  subtitle: string
}

export interface ActivityRecord {
  id: string
  timestamp: string
  user: string
  action: string
  resource: string
  status: 'success' | 'pending' | 'warning' | 'error'
  ip: string
}

export interface SystemNode {
  name: string
  region: string
  cpu: number
  memory: number
  status: 'active' | 'warning' | 'error'
}

export const mockMetrics: MetricItem[] = [
  {
    id: 'm1',
    title: 'Monthly Revenue',
    value: '$148,920.00',
    trend: '+14.2%',
    trendType: 'up',
    icon: 'pi pi-dollar',
    subtitle: 'vs. $130,400 last month',
  },
  {
    id: 'm2',
    title: 'Active Sessions',
    value: '18,490',
    trend: '+8.7%',
    trendType: 'up',
    icon: 'pi pi-users',
    subtitle: '512 online concurrent users',
  },
  {
    id: 'm3',
    title: 'Req Throughput',
    value: '1.84M /s',
    trend: '-0.3%',
    trendType: 'down',
    icon: 'pi pi-bolt',
    subtitle: 'Avg latency 14ms (p99: 42ms)',
  },
  {
    id: 'm4',
    title: 'System Health',
    value: '99.98%',
    trend: 'Stable',
    trendType: 'neutral',
    icon: 'pi pi-shield',
    subtitle: '0 critical incidents (24h)',
  },
]

export const mockActivities: ActivityRecord[] = [
  {
    id: 'act-101',
    timestamp: '10:42:15',
    user: 'alex.morgan@admin.com',
    action: 'DEPLOY_SERVICE',
    resource: 'k8s-cluster-us-east',
    status: 'success',
    ip: '192.168.1.42',
  },
  {
    id: 'act-102',
    timestamp: '10:38:04',
    user: 'sarah.dev@company.com',
    action: 'FLUSH_CACHE',
    resource: 'redis-edge-cache',
    status: 'success',
    ip: '10.0.4.18',
  },
  {
    id: 'act-103',
    timestamp: '10:29:40',
    user: 'system.cron',
    action: 'DB_BACKUP',
    resource: 'postgres-primary-db',
    status: 'pending',
    ip: '127.0.0.1',
  },
  {
    id: 'act-104',
    timestamp: '10:15:12',
    user: 'sec.auditor@company.com',
    action: 'ROTATE_KEYS',
    resource: 'vault-secrets-prod',
    status: 'warning',
    ip: '172.16.0.88',
  },
  {
    id: 'act-105',
    timestamp: '09:58:33',
    user: 'guest_user_9',
    action: 'AUTH_FAILURE',
    resource: 'api-gateway/v1',
    status: 'error',
    ip: '203.0.113.195',
  },
]

export const mockNodes: SystemNode[] = [
  {
    name: 'us-east-cluster-01',
    region: 'US-East (N. Virginia)',
    cpu: 42,
    memory: 68,
    status: 'active',
  },
  {
    name: 'eu-west-cluster-02',
    region: 'EU-West (Frankfurt)',
    cpu: 78,
    memory: 84,
    status: 'warning',
  },
  {
    name: 'ap-southeast-01',
    region: 'AP-South (Singapore)',
    cpu: 31,
    memory: 52,
    status: 'active',
  },
]

export const trafficHours = [
  { hour: '00:00', load: 35, peak: 40 },
  { hour: '04:00', load: 22, peak: 28 },
  { hour: '08:00', load: 68, peak: 75 },
  { hour: '12:00', load: 94, peak: 98 },
  { hour: '16:00', load: 88, peak: 92 },
  { hour: '20:00', load: 56, peak: 62 },
]

export interface ChartSeriesData {
  time: string
  throughput: number
  latency: number
  errors: number
}

export const mockChartSeries: ChartSeriesData[] = [
  { time: '00:00', throughput: 420, latency: 18, errors: 2 },
  { time: '02:00', throughput: 530, latency: 16, errors: 1 },
  { time: '04:00', throughput: 310, latency: 14, errors: 0 },
  { time: '06:00', throughput: 680, latency: 22, errors: 3 },
  { time: '08:00', throughput: 950, latency: 28, errors: 5 },
  { time: '10:00', throughput: 1240, latency: 35, errors: 8 },
  { time: '12:00', throughput: 1480, latency: 42, errors: 12 },
  { time: '14:00', throughput: 1350, latency: 38, errors: 7 },
  { time: '16:00', throughput: 1420, latency: 39, errors: 6 },
  { time: '18:00', throughput: 1290, latency: 31, errors: 4 },
  { time: '20:00', throughput: 1100, latency: 25, errors: 3 },
  { time: '22:00', throughput: 850, latency: 20, errors: 2 },
]
