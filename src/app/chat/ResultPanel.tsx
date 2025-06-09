import { api } from '@/trpc/react'

export default function ResultPanel() {
  const mutate = api.chat.generate.useMutation({})

  return (
    <>
      <button
        onClick={async () => {
          const asyncGenerator = await mutate.mutateAsync()
          for await (const chunk of asyncGenerator) {
            console.log('chunk', chunk)
          }
        }}
      >
        click
      </button>
    </>
  )
}
