import { Code2, Redo2, Undo2, Upload } from 'lucide-react'
import { useCurrentEditor } from '@tiptap/react'
import { Separator } from '@/components/ui/separator'
import 'tippy.js/animations/shift-away.css'
import { Button } from '@/components/ui/button'
import { IconSizeSmall as size } from '@/constant'
import { TextButtons } from '@/app/writer.ai/_components/rich-editor/selector'
export default function EditorBar() {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div
      className={`
        flex items-start justify-end gap-2 border-b bg-background px-2
      `}
    >
      <div className='flex'>
        <TextButtons />
        <Button
          size='sm'
          className='rounded-none'
          variant='ghost'
          onClick={() => editor.chain().focus().setCodeBlock().run()}
        >
          <Code2 size={size} />
        </Button>
        <Separator orientation='vertical' />
      </div>
      <Separator orientation='vertical' />
      <div className='flex items-center gap-1'>
        <Separator orientation='vertical' />

        <Button
          size='sm'
          className='rounded-none'
          variant='ghost'
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 size={size} />
        </Button>
        <Button
          size='sm'
          className='rounded-none'
          variant='ghost'
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 size={size} />
        </Button>

        <Button size='sm' className='rounded-none' variant='ghost'>
          <label
            htmlFor='import-md'
            className='cursor-pointer rounded-sm bg-slate-50'
          >
            <Upload size={size} />
          </label>
        </Button>
      </div>
    </div>
  )
}
