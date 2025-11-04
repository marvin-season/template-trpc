'use client'

import { sleep } from '@/utils/common'
import { Badge, Drawer } from 'antd'
import dynamic from 'next/dynamic'
import { useState } from 'react'
const NotificationPanel = dynamic(
  () => import('./FCM/_components/NotificationPanel'),
  { ssr: false, loading: () => <div>Loading...</div> },
)
export default function Test() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  return (
    <div>
      <button onClick={() => setIsDrawerOpen(true)}>
        <Badge size='small' count={0} overflowCount={99}>
          OPEN
        </Badge>
      </button>

      <Drawer
        closable={false}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        placement={'left'}
        width={400}
      >
        <NotificationPanel />
      </Drawer>
    </div>
  )
}
