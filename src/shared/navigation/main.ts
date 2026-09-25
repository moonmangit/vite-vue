export interface NavigationBadge {
  value: string | number
  severity?: 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast'
  pulse?: boolean
}

export interface NavigationItem {
  id: string
  labelKey?: string
  label?: string
  icon?: string
  to?: string
  badge?: NavigationBadge
  statusState?: 'normal' | 'muted' | 'loading' | 'notify'
  children?: NavigationItem[]
  expanded?: boolean
}

export interface NavigationGroup {
  titleKey: string
  items: NavigationItem[]
}
