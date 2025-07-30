import { FloatingMenu } from '@tiptap/react'
import type { ComponentProps } from 'react'

export const EditorFloating = ({
  children,
  tippyOptions,
  className,
  ...props
}: ComponentProps<typeof FloatingMenu>) => {
  return (
    <>
      <FloatingMenu
        className={`
          overflow-hidden rounded-md p-2 shadow-xl
          ${className}
        `}
        tippyOptions={{
          placement: 'bottom-start',
          moveTransition: 'transform 0.15s ease-out',
          ...tippyOptions,
        }}
        {...props}
      >
        {children}
      </FloatingMenu>
    </>
  )
}
