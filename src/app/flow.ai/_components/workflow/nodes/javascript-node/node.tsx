'use client'

import type { JavaScriptNodeData } from '@flow.ai/_components/workflow/types'
import { ChevronDown, ChevronRight, SquareArrowOutUpRight } from 'lucide-react'
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
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{'Props'}</span>
          {!isOpen ? (
            <ChevronRight className='size-4' />
          ) : (
            <ChevronDown className={`size-4`} />
          )}
        </div>
        {isOpen && (
          <div className='flex flex-col gap-1 text-sm text-gray-500'>
            {data.properties.map((property) => {
              return (
                <a
                  key={property}
                  className={`
                    group/item flex cursor-pointer items-center justify-between
                    hover:text-blue-400
                  `}
                  title='Click to view in MDN'
                  href={`${MDN_PREFIX}/${data.constructor.name}/${property}`}
                  target='_blank'
                >
                  <span>{property}</span>
                  <SquareArrowOutUpRight
                    size={12}
                    className={`
                      opacity-0 transition-opacity duration-200
                      group-hover/item:opacity-100
                    `}
                  />
                </a>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
