/* eslint-disable @typescript-eslint/no-explicit-any */

import { PROVIDER_NAME, TEMP_MODEL_MAPPING } from '@/constant'
import { initDeepSeek, initOllamaProvider } from '@/server/provider'
import type { ChatInputType } from '@/types/chat'
import { TRPCError } from '@trpc/server'
import {
  streamText,
  type LanguageModelV1,
  experimental_createMCPClient as createMCPClient,
  generateText,
  type CoreMessage,
} from 'ai'
import { Experimental_StdioMCPTransport as StdioMCPTransport } from 'ai/mcp-stdio'
export const chatService = {
  ask: async ({ ctx, input }: { ctx: any; input: ChatInputType }) => {
    const {
      text,
      imageUrl,
      modelId = TEMP_MODEL_MAPPING.get(ctx.session.user.id),
      provider = process.env.NEXT_MODEL_PROVIDER,
      mcpServers,
    } = input
    let model: LanguageModelV1 | null = null
    switch (provider) {
      case PROVIDER_NAME.DEEPSEEK:
        model = initDeepSeek({
          model: modelId,
        })
        break
      case PROVIDER_NAME.OLLAMA:
        model = initOllamaProvider({
          model: modelId,
        })
        break
      default:
        model = initOllamaProvider({
          model: modelId,
        })
        break
    }
    if (!model) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: '模型不存在',
      })
    }

    let tools
    if (mcpServers) {
      const mcpClient = await createMCPClient({
        transport: new StdioMCPTransport({
          command: 'node',
          args: ['/Users/marvin/personal/mcp/server/build/index.js'],
        }),
      }).catch((error) => {
        console.error('error', error)
      })
      tools = await mcpClient?.tools()
    }

    const mcpResults = await generateText({
      model,
      messages: [
        {
          role: 'system',
          content: '你善于反思, 善于使用工具, 请使用合适的工具来回答用户的问题',
        },
        {
          role: 'system',
          content: `用户的问题是: ${text}`,
        },
      ],
      tools,
    })

    const finalMessages: CoreMessage[] = []
    finalMessages.push({
      role: 'system',
      content: `你是一个模型输出和工具输出的总结专家, 请结合用户的问题和工具的输出结果, 回答用户的问题`,
    })
    finalMessages.push({
      role: 'system',
      content: `用户的问题是: ${text}`,
    })

    if (imageUrl) {
      finalMessages.push({
        role: 'user',
        content: [{ type: 'image', image: imageUrl }],
      })
    }

    finalMessages.push({
      role: 'tool',
      content: mcpResults.toolResults,
    })

    const result = streamText({
      onError: (error) => {
        console.error('error', error)
      },
      model,
      messages: finalMessages,
    })

    return result.textStream
  },
}
