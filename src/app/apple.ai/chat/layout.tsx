import Link from 'next/link'
import { conversationList } from './mock/conversation-list'

export default function ChatLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <div className='flex h-screen'>
      <div className='flex w-64 flex-col justify-start gap-4 p-4'>
        {conversationList.map((conversation) => (
          <div
            key={conversation.id}
            className={`
              truncate rounded-xl border border-gray-200 px-4 py-2
              whitespace-nowrap
              hover:cursor-pointer hover:bg-gray-100
            `}
          >
            <Link
              href={`/apple.ai/chat/${conversation.id}`}
              className={`text-sm text-gray-500`}
            >
              {conversation.title}
            </Link>
          </div>
        ))}
      </div>
      <div className='flex-1 overflow-auto'>{children}</div>
    </div>
  )
}
