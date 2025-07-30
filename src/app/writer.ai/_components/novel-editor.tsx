'use client'

import EditorBar from '@/app/writer.ai/_components/editor-bar'
import NovelBubbleMenu from '@/app/writer.ai/_components/novel-bubble-menu'
import { RichEditorProvider } from './rich-editor'
import { type EditorProviderProps } from '@tiptap/react'

export default function NovelEditor({
  content,
  children,
  ...props
}: EditorProviderProps) {
  return (
    <>
      <RichEditorProvider
        key={1}
        content={content}
        slotBefore={<EditorBar />}
        editorContainerProps={{
          className:
            'flex-1 no-scrollbar overflow-y-auto flex items-center rounded-[16px] mb-8 mt-2 p-4',
        }}
        {...props}
      >
        {children}
        <NovelBubbleMenu />
      </RichEditorProvider>
    </>
  )
}
