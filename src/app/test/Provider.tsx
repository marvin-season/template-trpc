'use client'

import { createContext } from 'react'

export const TestContext = createContext({})

export function Provider({ children }: { children: React.ReactNode }) {
  return <TestContext.Provider value={{}}>{children}</TestContext.Provider>
}
