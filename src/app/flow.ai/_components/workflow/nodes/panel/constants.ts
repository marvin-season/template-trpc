import { StartPanel, EndPanel, IfElsePanel, JavaScriptPanel } from '.'
import type { ComponentType } from 'react'

export const PanelComponentMap: Record<string, ComponentType<any>> = {
  'start': StartPanel,
  'end': EndPanel,
  'if-else': IfElsePanel,
  'javascript': JavaScriptPanel,
}
