import { Position } from 'reactflow'
import type { FlowNode } from '../types'
import { CUSTOM_NODE } from '../nodes/constant'

export const generateNewNode = ({
  data,
  position,
  id,
  zIndex,
  type,
  ...rest
}: any) => {
  return {
    id: id || `${Date.now()}`,
    type: type || CUSTOM_NODE,
    data,
    position,
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    zIndex,
    ...rest,
  } as FlowNode
}

const specialKeysCodeMap: Record<string, string | undefined> = {
  ctrl: 'meta',
}
export const isMac = () => {
  return navigator.userAgent.toUpperCase().includes('MAC')
}

export const getKeyboardKeyCodeBySystem = (key: string) => {
  if (isMac()) return specialKeysCodeMap[key] || key

  return key
}
