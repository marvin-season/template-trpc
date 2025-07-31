import { EditorProvider } from '@tiptap/react'
import type { EditorProviderProps } from '@tiptap/react'
import './styles.css'
import useExtensions from './hooks/useExtensions'
import { toast } from 'sonner'
import { useEffect } from 'react'

export default function RichEditorProvider({
  extensions = [],
  children,
  content,
  editable = true,
  editorProps,
  ...props
}: EditorProviderProps) {
  const defaultExtensions = useExtensions()

  useEffect(() => {
    toast.message('You can select some text to see the effect')
  }, [])
  return (
    <>
      <EditorProvider
        editable={editable}
        editorProps={{
          ...editorProps,
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none w-full max-w-full h-full`,
          },
        }}
        content={content}
        extensions={[...defaultExtensions, ...extensions]}
        {...props}
      >
        {children}
      </EditorProvider>
    </>
  )
}
