'use client'

import { conversationList } from '../../mock/conversation-list'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ConversationOperator } from './ConversationOperator'
import { sleep } from 'aio-tool'

export default function ConversationList() {
  const params = useParams()
  const conversationId = params.conversationId
  return conversationList.map((conversation) => (
    <div
      key={conversation.id}
      className={`
        group flex items-center justify-between rounded-lg border
        border-gray-200 px-4 py-2 whitespace-nowrap
        hover:cursor-pointer hover:bg-slate-50
        ${conversationId === conversation.id ? 'bg-slate-50' : ''}
      `}
    >
      <div className='flex-1 overflow-x-hidden mask-r-from-70%'>
        <Link
          href={`/template/chat/${conversation.id}`}
          className={`text-sm text-gray-500`}
        >
          {conversation.title}
        </Link>
      </div>
      <ConversationOperator
        operations={[
          {
            label: 'Delete',
            value: 'delete',
          },
          {
            label: 'Share',
            value: 'share',
          },
        ]}
        onClick={async (params) => {
          console.log(params)
          await sleep(3000)
        }}
      />
    </div>
  ))
}
