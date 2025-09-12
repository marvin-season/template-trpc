import { Button } from '@/components/ui'
import Link from 'next/link'
import { conversationList } from '../mock/conversation-list'

// Fetch the static parameters
export async function generateStaticParams() {
  return conversationList.map((conversation) => ({
    conversationId: `${conversation.id}`,
  }))
}

export default async function CCPage({
  params,
}: {
  params: Promise<{ conversationId: string }>
}) {
  const { conversationId } = await params

  const conversation = conversationList.find(
    (conversation) => conversation.id === conversationId,
  )
  if (!conversation) {
    return 'Nothing here!'
  }

  return (
    <div className='flex h-full flex-col gap-4'>
      <div>
        <Button>
          <Link href={`/apple.ai/chat`}>Back</Link>
        </Button>
        <span>{conversation.title}</span>
      </div>
      <div
        className={`
          flex flex-1 flex-col items-center justify-center overflow-auto
        `}
      >
        {conversation.chatList.map((chat) => (
          <div key={chat.id}>{chat.content}</div>
        ))}
      </div>
    </div>
  )
}
