'use client'

import { CustomTabs } from '@/components/ui/tabs/tabs'
import type { TabsProps } from 'antd'

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '标签页 1',
    children: '内容 1',
  },
  {
    key: '2',
    label: '标签页 2',
    children: '内容 2',
  },
  {
    key: '3',
    label: '标签页 3',
    children: '内容 3',
  },
]

export default function Test() {
  return (
    <div className='flex flex-col items-center space-y-8 p-8'>
      <div className='space-y-4'>
        <h2 className='text-xl font-bold'>默认样式</h2>
        <CustomTabs items={items} />
      </div>

      <div className='space-y-4'>
        <h2 className='text-xl font-bold'>圆角卡片样式 (rounded-card)</h2>
        <CustomTabs items={items} variant='rounded-card' />
      </div>
    </div>
  )
}
