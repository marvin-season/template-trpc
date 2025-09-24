export const conversationList = [
  {
    id: 'conversation-1',
    title: 'Hello, how are you',
    chatList: [
      {
        id: 1,
        content: 'Hello, how are you?',
        role: 'user',
      },
      {
        id: 2,
        content: 'I am fine, thank you.',
        role: 'assistant',
      },
    ],
  },
  {
    id: 'conversation-2',
    title: 'What is the weather in Tokyo?  Xxxx Xxxx',
    chatList: [
      {
        id: 1,
        content: 'What is the weather in Tokyo?',
        role: 'user',
      },
      {
        id: 2,
        content: 'The weather in Tokyo is sunny.',
        role: 'assistant',
      },
    ],
  },
]

export type TConversation = (typeof conversationList)[number]
