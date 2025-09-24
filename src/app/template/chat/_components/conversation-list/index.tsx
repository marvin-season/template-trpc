'use client'

import { conversationList } from '../../mock/conversation-list'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export interface ConversationListProps {
  conversationId: string
}

export default function ConversationList() {
  const params = useParams()
  const conversationId = params.conversationId

  return conversationList.map((conversation) => (
    <div
      key={conversation.id}
      className={`
        truncate rounded-xl border border-gray-200 px-4 py-2 whitespace-nowrap
        hover:cursor-pointer hover:bg-gray-100
      `}
    >
      <Link
        href={`/template/chat/${conversation.id}`}
        className={`
          text-sm text-gray-500
          ${conversationId === conversation.id ? 'font-bold' : ''}
        `}
      >
        {conversation.title}
      </Link>
    </div>
  ))
}
