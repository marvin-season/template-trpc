import { createPortal } from 'react-dom'
import { useIsMounted } from 'usehooks-ts'

// Portal 组件，用于将子组件渲染到指定 DOM 节点上
export default function Portal(props: {
  children: React.ReactNode
  targetId: string
}) {
  const { children, targetId } = props
  const isMounted = useIsMounted()

  if (!isMounted || typeof window === 'undefined') {
    return null
  }

  const targetElement = document.getElementById(targetId)
  if (!targetElement) {
    return null
  }

  return createPortal(children, targetElement)
}
