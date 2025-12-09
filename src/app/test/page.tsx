'use client'

import { Tabs } from '@/components/ui/tabs/tabs'
import type { TabsProps } from 'antd'
const labels = [
  'For You',
  'Models',
  'Writing',
  'Productivity',
  'Business',
  'Research',
  'Education',
  'Images',
]
const items: TabsProps['items'] = labels.map((label, i) => {
  const id = String(i)
  return {
    label,
    key: id,
    children: `Content of tab ${id}`,
  }
})

export default function Test() {
  return (
    <div className='flex flex-col items-center space-y-8 p-8'>
      <div
        className={`
          w-full
          lg:w-[800px]
        `}
      >
        <Tabs defaultValue='1' items={items} showIndicator />
        <Tabs items={items} variant='outline' />
        <Tabs
          items={items}
          variant='primary'
          more={{
            icon: '^',
          }}
        />
      </div>
    </div>
  )
}
