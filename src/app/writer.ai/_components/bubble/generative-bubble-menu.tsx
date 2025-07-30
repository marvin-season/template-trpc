import { useCurrentEditor } from '@tiptap/react'
import { Fragment } from 'react'
import { Button } from '@/components/ui/button'
import { Magic } from '@/components/icon'
import EditorBubble from './editor-bubble'

const GenerativeBubbleMenu = ({ children, open, onOpenChange }: any) => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <EditorBubble
      tippyOptions={{
        placement: open ? 'bottom-start' : 'top',
        onHidden: () => {
          onOpenChange(false)
          editor.chain().unsetHighlight().run()
        },
      }}
      className={`
        flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted
        bg-background shadow-xl
      `}
    >
      {!open && (
        <Fragment>
          <Button
            className='gap-1 rounded-none text-purple-500'
            variant='ghost'
            onClick={() => onOpenChange(true)}
            size='sm'
          >
            <Magic className='h-5 w-5' />
            Ask AI
          </Button>
          {children}
        </Fragment>
      )}
    </EditorBubble>
  )
}

export default GenerativeBubbleMenu
