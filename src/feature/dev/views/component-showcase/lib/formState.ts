export interface ShowcaseFormState {
  name: string
  email: string
  password: string
  description: string
  environment: string | null
  teams: string[]
  search: string
  quantity: number | null
  amount: number | null
  notifications: boolean
  permissions: string[]
  maintenanceMode: boolean
  plan: string
}

export function createShowcaseFormState(): ShowcaseFormState {
  return {
    name: '',
    email: 'invalid-email',
    password: '',
    description: '',
    environment: null,
    teams: [],
    search: '',
    quantity: 12,
    amount: 1250,
    notifications: true,
    permissions: ['read'],
    maintenanceMode: false,
    plan: 'growth',
  }
}
