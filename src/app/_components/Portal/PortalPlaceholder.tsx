import { createElement } from 'react'
import type PortalId from './portal-id'

export default function PortalPlaceholder({
  id,
  as = 'div',
  className,
}: {
  id: (typeof PortalId)[keyof typeof PortalId]
  as?: 'div' | 'span'
  className?: string
}) {
  return createElement(as, { id, className }, null)
}
