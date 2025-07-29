import type { JavaScriptNodeData } from '@flow.ai/_components/workflow/types'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function Node({ data }: { data: JavaScriptNodeData }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <span>{'Name:'}</span>
          <span>{data.label}</span>
        </div>
        <div>
          <div className={`flex cursor-pointer items-center gap-2`} onClick={() => setIsOpen(!isOpen)}>
            <span>{'Props'}</span>
            {
              isOpen ? <ChevronRight className='size-4' /> : <ChevronDown className={`
                size-4
              `} />
            }
          </div>
          {isOpen && (
            <div className='text-gray-500'>
              {data.properties.map((property) => (
                <div key={property}>{property}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
