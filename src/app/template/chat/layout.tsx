import ConversationList from './_components/conversation-list'
export default function ChatLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <div className='flex h-screen'>
      <div className='flex w-64 flex-col justify-start gap-4 p-4'>
        <ConversationList />
      </div>
      <div className='flex-1 overflow-auto'>{children}</div>
    </div>
  )
}
