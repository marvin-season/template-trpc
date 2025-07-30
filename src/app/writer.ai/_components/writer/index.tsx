'use client'

import RichEditorProvider from '../rich-editor'
import { type EditorProviderProps } from '@tiptap/react'
import GenerativeBubbleMenu from '../bubble/generative-bubble-menu'
import {
  ColorSelector,
  NodeSelector,
  TextButtons,
} from '@/app/writer.ai/_components/rich-editor/selector'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
export default function NovelEditor({
  content,
  children,
  ...props
}: EditorProviderProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <RichEditorProvider
        key={1}
        content={content}
        editorContainerProps={{
          className:
            'flex-1 no-scrollbar overflow-y-auto flex items-center rounded-[16px] mb-8 mt-2 p-4',
        }}
        {...props}
      >
        {children}
        <GenerativeBubbleMenu open={open} onOpenChange={setOpen}>
          <Separator className='h-auto' orientation='vertical' />
          {/* <AssistantSelector /> */}
          <Separator className='h-auto' orientation='vertical' />
          <NodeSelector />
          <Separator className='h-auto' orientation='vertical' />
          <TextButtons />
          <Separator className='h-auto' orientation='vertical' />
          <ColorSelector />
        </GenerativeBubbleMenu>
      </RichEditorProvider>
    </>
  )
}
