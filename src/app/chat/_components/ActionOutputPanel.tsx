'use client'

import { useTRPC } from '@/trpc/react'
import type { ChatInputType } from '@/types/chat'
import { useMutation } from '@tanstack/react-query'
import { Button } from 'antd'
import { memo, useEffect, useState } from 'react'

const ActionPanel = memo(
  function ActionPanel(props: {
    isPending: boolean
    handleSubmit: () => void
  }) {
    const { isPending, handleSubmit } = props
    return (
      <Button disabled={isPending} onClick={handleSubmit}>
        {isPending ? '思考中...' : '提交问题'}
      </Button>
    )
  },
  (prev, next) => prev.isPending === next.isPending,
)

const content = `好的，用户问的是“What is the weather in 34.0522° N, -118.2437° W?”，我需要先确认用户的需求。他们可能想知道这个位置的天气情况，可能是在进行户外活动或者需要了解当地天气状况。首先，我需要检查输入的经纬度是否正确。34.0522° N和-118.2437° W，这两个坐标看起来都是正确的，没有输入错误。接下来，我需要考虑用户可能的用途。可能是想了解这个位置的天气，比如是否适合户外活动，或者需要帮助安排交通路线等。然后，我需要考虑用户可能的深层需求。他们可能想知道天气的具体情况，比如是否有雨、风速、温度等信息。但根据问题本身，用户并没有明确询问这些细节，而是直接询问天气状况。因此，我需要确认工具是否能够提供这些信息，或者是否有其他工具可以辅助回答。另外，我需要确保回答的准确性。可能需要查阅天气预报工具或API来验证数据。例如，使用开放数据平台或天气服务，如OpenWeatherMap，来获取该位置的实时天气信息。如果工具返回的数据是准确的，就可以直接回答用户的问题，否则可能需要进一步确认数据来源。同时，还要注意用户可能的隐私或数据安全问题，确保回答符合相关法规，比如GDPR或其他数据保护规定。不过，用户的问题看起来并不涉及敏感信息，因此无需额外考虑。最后，总结回答时，需要明确说明工具的使用情况，并提供进一步帮助的建议，确保用户满意。例如，可以建议他们使用天气服务来获取最新数据，或者询问是否有其他需求。`

export function useActionPanel(input: ChatInputType) {
  const trpc = useTRPC()
  const mutate = useMutation(trpc.chat.generate.mutationOptions())
  const [isPending, setIsPending] = useState(false)
  const [answer, setAnswer] = useState('')

  const handleAnswer = async (content: string) => {
    for (const chunk of content.split('')) {
      setAnswer((prev) => prev + chunk)
      await new Promise((resolve) => setTimeout(resolve, 0))
    }
  }
  useEffect(() => {
    handleAnswer(content)
  }, [])

  const handleSubmit = async () => {
    if (!input.text) {
      alert('请输入问题')
      return
    }
    setIsPending(true)
    setAnswer('')
    const asyncGenerator = await mutate.mutateAsync(input)
    try {
      for await (const chunk of asyncGenerator) {
        console.log('chunk', chunk)
        setAnswer((prev) => prev + chunk)
      }
    } catch (error) {
      console.error('error', error)
    } finally {
      setIsPending(false)
    }
  }
  return {
    render: () => {
      return <ActionPanel isPending={isPending} handleSubmit={handleSubmit} />
    },
    getter: {
      answer,
    },
  }
}
