'use client'

import { Tabs } from '@/components/ui/tabs/tabs'
import type { TabsProps } from 'antd'

const items: TabsProps['items'] = Array.from({ length: 10 }, (_, i) => {
  const id = String(i)
  return {
    label: `Tab-${id}`,
    key: id,
    children: `Content of tab ${id}`,
  }
})

export default function Test() {
  return (
    <div className='flex flex-col items-center space-y-8 p-8'>
      <div className='w-[800px]'>
        <div className='space-y-4'>
          <h2 className='text-xl font-bold'>默认样式</h2>
          <Tabs defaultValue='1' items={items} size='small' />
        </div>

        <Tabs items={items} variant='outline' size='small' />
        <Tabs items={items} variant='primary' size='small' />
      </div>
    </div>
  )
}
