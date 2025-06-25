export interface NavigationItem {
  id: string
  title: string
  href?: string
  items?: NavigationSubItem[]
}

export interface NavigationSubItem {
  id: string
  title: string
  href: string
  description?: string
}

export interface NavigationConfig {
  items: NavigationItem[]
}
