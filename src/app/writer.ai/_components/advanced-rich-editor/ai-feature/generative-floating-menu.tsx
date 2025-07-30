import { type ReactNode, useRef } from 'react'
import { EditorFloating } from '../editor-floating'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Github, StepForward } from 'lucide-react'
import { useCompletion } from 'ai/react'
import { useCurrentEditor } from '@tiptap/react'
import type { Props, Instance } from 'tippy.js'
import { Magic } from '@/components/icon'
import { CrazySpinner } from '@/components/icon'
import AICompletionCommands from '@/app/writer.ai/_components/advanced-rich-editor/ai-feature/ai-completion-command'
export default function GenerativeFloatingMenu({
  children,
}: {
  children?: ReactNode
}) {
  const { editor } = useCurrentEditor()
  const instanceRef = useRef<Instance<Props> | null>(null)
  const { completion, complete, setCompletion, isLoading } = useCompletion({
    streamProtocol: 'data',
    fetch: () => Promise.resolve(new Response('')),
    onResponse: (response) => {
      if (response.status === 429) {
        // toast.error('You have reached your request limit for the day.')
        return
      }
    },
    onError: (e) => {
      // toast.error(e.message)
    },
  })
  return (
    <EditorFloating
      editor={editor}
      shouldShow={() => {
        // 未选中文本才显示
        const selection = editor?.state.selection
        // 且是否聚焦
        return !!selection?.empty && !!editor?.isFocused
      }}
      className={'max-w-[90vw] bg-white'}
      tippyOptions={{
        onCreate: (instance) => {
          instanceRef.current = instance
        },
        duration: [500, 200],
      }}
    >
      {completion}
      {isLoading && (
        <div
          className={`
            flex h-12 w-full items-center px-4 text-sm font-medium text-blue-500
          `}
        >
          <Magic className='mr-2 h-4 w-4 shrink-0' />
          AI is thinking
          <div className='mt-1 ml-2'>
            <CrazySpinner />
          </div>
        </div>
      )}
      <Command>
        {!completion && (
          <CommandGroup heading='Use AI to continue'>
            <CommandList>
              <CommandItem
                onSelect={async () => {
                  const context = editor?.storage.markdown.getMarkdown()
                  await complete('', {
                    body: { command: 'continue', context: context },
                  })
                  // hideMenu() // Hide the menu after completion
                }}
                value='continue'
                className='gap-2 px-4'
              >
                <StepForward className='h-4 w-4 text-purple-500' />
                AI writing
              </CommandItem>
              <CommandItem
                onSelect={(value) => {
                  window.open(value, '_blank')
                }}
                value='https://github.com/marvin-season/ai-novel'
                className='gap-2 px-4'
              >
                <Github className='h-4 w-4 text-purple-500' />
                Github
              </CommandItem>
            </CommandList>
          </CommandGroup>
        )}
        {completion && (
          <AICompletionCommands
            completion={completion}
            onSelect={() => {
              setCompletion('')
            }}
          />
        )}
      </Command>
      {children}
    </EditorFloating>
  )
}
