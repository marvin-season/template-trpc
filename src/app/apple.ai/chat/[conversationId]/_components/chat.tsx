'use client'

import { type TConversation } from '../../mock/conversation-list'
import { sleep } from 'aio-tool'

import dynamic from 'next/dynamic'
const AnimatedContainer = dynamic(
  async () => {
    await sleep(5000)
    return import('@/app/_components/AnimationBox')
  },
  { ssr: false, loading: () => <div>Loading...</div> },
)

export default function Chat(props: { conversation: TConversation }) {
  const { conversation } = props

  return (
    <AnimatedContainer>
      {conversation.chatList.map((chat) => (
        <div key={chat.id}>{chat.content}</div>
      ))}
    </AnimatedContainer>
  )
}
