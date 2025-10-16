import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DecisionTheme, DecisionOption, DecisionHistory } from '../_types'

interface DecisionStore {
  themes: DecisionTheme[]
  history: DecisionHistory[]
  isInitialized: boolean

  // 初始化
  initialize: () => void
  loadSampleData: () => void

  // 主题操作
  addTheme: (
    theme: Omit<DecisionTheme, 'id' | 'createdAt' | 'updatedAt'>,
  ) => string
  updateTheme: (id: string, theme: Partial<DecisionTheme>) => void
  deleteTheme: (id: string) => void
  getTheme: (id: string) => DecisionTheme | undefined

  // 选项操作
  addOption: (themeId: string, option: Omit<DecisionOption, 'id'>) => void
  updateOption: (
    themeId: string,
    optionId: string,
    option: Partial<DecisionOption>,
  ) => void
  deleteOption: (themeId: string, optionId: string) => void
  reorderOptions: (themeId: string, options: DecisionOption[]) => void

  // 历史记录
  addHistory: (
    history: Omit<
      DecisionHistory,
      'id' | 'createdAt' | 'year' | 'month' | 'day'
    >,
  ) => void
  clearHistory: () => void
  clearThemeHistory: (themeId: string) => void
  getThemeHistory: (themeId: string) => DecisionHistory[]
  getYearHistory: (year: number) => DecisionHistory[]
  getMonthHistory: (year: number, month: number) => DecisionHistory[]
}

const generateId = () => Math.random().toString(36).substring(2, 11)

export const useDecisionStore = create<DecisionStore>()(
  persist(
    (set, get) => ({
      themes: [],
      history: [],
      isInitialized: false,

      initialize: () => {
        const state = get()
        if (state.isInitialized) return

        // 如果没有主题，添加示例模板
        if (state.themes.length === 0) {
          get().loadSampleData()
        } else {
          set({ isInitialized: true })
        }
      },

      loadSampleData: () => {
        // 动态导入模板避免循环依赖
        import('../_data/templates').then(({ THEME_TEMPLATES }) => {
          const now = Date.now()
          const templates = THEME_TEMPLATES.slice(0, 2).map(
            (template, index) => ({
              ...template,
              id: generateId(),
              createdAt: now + index,
              updatedAt: now + index,
              options: template.options.map((opt) => ({
                ...opt,
                id: generateId(),
              })),
            }),
          )
          set((state) => ({
            themes: [...state.themes, ...templates],
            isInitialized: true,
          }))
        })
      },

      addTheme: (theme) => {
        const id = generateId()
        const now = Date.now()
        const newTheme: DecisionTheme = {
          ...theme,
          id,
          createdAt: now,
          updatedAt: now,
          options: theme.options || [],
        }
        set((state) => ({
          themes: [...state.themes, newTheme],
        }))
        return id
      },

      updateTheme: (id, updates) => {
        set((state) => ({
          themes: state.themes.map((theme) =>
            theme.id === id
              ? { ...theme, ...updates, updatedAt: Date.now() }
              : theme,
          ),
        }))
      },

      deleteTheme: (id) => {
        set((state) => ({
          themes: state.themes.filter((theme) => theme.id !== id),
          history: state.history.filter((h) => h.themeId !== id),
        }))
      },

      getTheme: (id) => {
        return get().themes.find((theme) => theme.id === id)
      },

      addOption: (themeId, option) => {
        const optionWithId: DecisionOption = {
          ...option,
          id: generateId(),
        }
        set((state) => ({
          themes: state.themes.map((theme) =>
            theme.id === themeId
              ? {
                  ...theme,
                  options: [...theme.options, optionWithId],
                  updatedAt: Date.now(),
                }
              : theme,
          ),
        }))
      },

      updateOption: (themeId, optionId, updates) => {
        set((state) => ({
          themes: state.themes.map((theme) =>
            theme.id === themeId
              ? {
                  ...theme,
                  options: theme.options.map((opt) =>
                    opt.id === optionId ? { ...opt, ...updates } : opt,
                  ),
                  updatedAt: Date.now(),
                }
              : theme,
          ),
        }))
      },

      deleteOption: (themeId, optionId) => {
        set((state) => ({
          themes: state.themes.map((theme) =>
            theme.id === themeId
              ? {
                  ...theme,
                  options: theme.options.filter((opt) => opt.id !== optionId),
                  updatedAt: Date.now(),
                }
              : theme,
          ),
        }))
      },

      reorderOptions: (themeId, options) => {
        set((state) => ({
          themes: state.themes.map((theme) =>
            theme.id === themeId
              ? { ...theme, options, updatedAt: Date.now() }
              : theme,
          ),
        }))
      },

      addHistory: (history) => {
        const now = new Date()
        const newHistory: DecisionHistory = {
          ...history,
          id: generateId(),
          createdAt: Date.now(),
          year: now.getFullYear(),
          month: now.getMonth() + 1,
          day: now.getDate(),
        }
        set((state) => ({
          history: [newHistory, ...state.history],
        }))
      },

      clearHistory: () => {
        set({ history: [] })
      },

      clearThemeHistory: (themeId) => {
        set((state) => ({
          history: state.history.filter((h) => h.themeId !== themeId),
        }))
      },

      getThemeHistory: (themeId) => {
        return get().history.filter((h) => h.themeId === themeId)
      },

      getYearHistory: (year) => {
        return get().history.filter((h) => h.year === year)
      },

      getMonthHistory: (year, month) => {
        return get().history.filter((h) => h.year === year && h.month === month)
      },
    }),
    {
      name: 'decision-storage',
    },
  ),
)
