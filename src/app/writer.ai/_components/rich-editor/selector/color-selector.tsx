import { Check, ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useCurrentEditor } from '@tiptap/react'
import { useState } from 'react'
export interface BubbleColorMenuItem {
  name: string
  color: string
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: 'Default',
    color: 'var(--novel-black)',
  },
  {
    name: 'Purple',
    color: '#9333EA',
  },
  {
    name: 'Red',
    color: '#E00000',
  },
  {
    name: 'Yellow',
    color: '#EAB308',
  },
  {
    name: 'Blue',
    color: '#2563EB',
  },
  {
    name: 'Green',
    color: '#008A00',
  },
  {
    name: 'Orange',
    color: '#FFA500',
  },
  {
    name: 'Pink',
    color: '#BA4081',
  },
  {
    name: 'Gray',
    color: '#A8A29E',
  },
]

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: 'Default',
    color: 'var(--novel-black)',
  },
  {
    name: 'Purple',
    color: '#9333EA',
  },
  {
    name: 'Red',
    color: '#E00000',
  },
  {
    name: 'Yellow',
    color: '#EAB308',
  },
  {
    name: 'Blue',
    color: '#2563EB',
  },
  {
    name: 'Green',
    color: '#008A00',
  },
  {
    name: 'Orange',
    color: '#FFA500',
  },
  {
    name: 'Pink',
    color: '#BA4081',
  },
  {
    name: 'Gray',
    color: '#A8A29E',
  },
]

interface ColorSelectorProps {}

export const ColorSelector = ({}: ColorSelectorProps) => {
  const { editor } = useCurrentEditor()
  const [open, onOpenChange] = useState(false)
  if (!editor) return null
  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive('textStyle', { color }),
  )

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive('highlight', { color }),
  )

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size='sm' className='gap-2 rounded-none' variant='ghost'>
          <span
            className='rounded-sm px-1'
            style={{
              color: activeColorItem?.color,
              backgroundColor: activeHighlightItem?.color,
            }}
          >
            A
          </span>
          <ChevronDown className='h-4 w-4' />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={5}
        className={`
          my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto
          rounded border p-1 shadow-xl
        `}
        align='start'
      >
        <div className='flex flex-col'>
          <div className='my-1 px-2 text-sm font-semibold text-muted-foreground'>
            Color
          </div>
          {TEXT_COLORS.map(({ name, color }) => (
            <div
              key={name}
              onClick={() => {
                editor.commands.unsetColor()
                name !== 'Default' &&
                  editor
                    .chain()
                    .focus()
                    .setColor(color || '')
                    .run()
                onOpenChange(false)
              }}
              className={`
                flex cursor-pointer items-center justify-between px-2 py-1
                text-sm
                hover:bg-accent
              `}
            >
              <div className='flex items-center gap-2'>
                <div
                  className='rounded-sm border px-2 py-px font-medium'
                  style={{ color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className='my-1 px-2 text-sm font-semibold text-muted-foreground'>
            Background
          </div>
          {HIGHLIGHT_COLORS.map(({ name, color }) => (
            <div
              key={name}
              onClick={() => {
                editor.commands.unsetHighlight()
                name !== 'Default' &&
                  editor.chain().focus().setHighlight({ color }).run()
                onOpenChange(false)
              }}
              className={`
                flex cursor-pointer items-center justify-between px-2 py-1
                text-sm
                hover:bg-accent
              `}
            >
              <div className='flex items-center gap-2'>
                <div
                  className='rounded-sm border px-2 py-px font-medium'
                  style={{ backgroundColor: color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive('highlight', { color }) && (
                <Check className='h-4 w-4' />
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
