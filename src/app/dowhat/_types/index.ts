export interface DecisionOption {
  id: string
  name: string
  description?: string
  weight: number
  imageUrl?: string
  order: number
}

export interface DecisionTheme {
  id: string
  name: string
  description?: string
  icon?: string
  createdAt: number
  updatedAt: number
  options: DecisionOption[]
}

export interface DecisionHistory {
  id: string
  themeId: string
  themeName: string
  optionName: string
  createdAt: number
}

export type DrawMode = 'wheel' | 'slot' | 'card'

