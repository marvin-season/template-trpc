'use client'

import { Properties } from '@/app/flow.ai/_components/workflow/nodes/components/properties'
import type { JavaScriptNodeData } from '@flow.ai/_components/workflow/types'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
const MDN_PREFIX =
  'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects'
export default function Node({ data }: { data: JavaScriptNodeData }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className='flex items-center justify-between gap-2 text-sm'>
        <span>{data.label}</span>
        <span className='text-blue-400'>{data.constructor.name}</span>
      </div>
      <div className='mt-2 border-t pt-2'>
        <div
          className={`
            mb-2 flex cursor-pointer items-center justify-between gap-2 border-b
            pb-2 text-sm
          `}
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(!isOpen)
          }}
        >
          <span>{'Props'}</span>
          {!isOpen ? (
            <ChevronRight className='size-4' />
          ) : (
            <ChevronDown className={`size-4`} />
          )}
        </div>
        {isOpen && (
          <Properties
            properties={data.properties}
            name={data.constructor.name}
          />
        )}
      </div>
    </>
  )
}
