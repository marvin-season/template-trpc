import { userAPI, attachRetry } from '@/utils/index'
import type { User, UpdateUserRequest } from '@/types/api'

/**
 * 使用示例：获取用户信息
 */
export async function exampleFetchUser() {
  try {
    // 获取当前用户信息
    const currentUser = await userAPI.fetchUser()
    console.log('当前用户:', currentUser)

    // 获取指定用户信息
    const specificUser = await userAPI.fetchUser('user123')
    console.log('指定用户:', specificUser)

    return currentUser
  } catch (error) {
    console.error('获取用户信息失败:', error)
    throw error
  }
}

/**
 * 使用示例：更新用户信息
 */
export async function exampleUpdateUser() {
  try {
    const updateData: UpdateUserRequest = {
      name: '新用户名',
      email: 'newemail@example.com',
      avatar: 'https://example.com/avatar.jpg',
    }

    const updatedUser = await userAPI.updateUser('user123', updateData)
    console.log('更新后的用户:', updatedUser)

    return updatedUser
  } catch (error) {
    console.error('更新用户信息失败:', error)
    throw error
  }
}

/**
 * 使用示例：自定义重试逻辑
 */
export async function exampleCustomRetry() {
  // 创建一个自定义的异步函数
  const customAsyncFunction = async (id: string) => {
    // 模拟可能失败的操作
    if (Math.random() > 0.5) {
      throw new Error('随机失败')
    }
    return { id, success: true }
  }

  // 使用 attachRetry 包装函数
  const retryFunction = attachRetry(customAsyncFunction, {
    retryCount: 5,
    delay: 1000,
    backoff: 'exponential',
    shouldRetry: (error) => {
      // 只对特定错误进行重试
      return error instanceof Error && error.message === '随机失败'
    },
    onRetry: (attempt, error) => {
      console.log(`第 ${attempt} 次重试失败:`, error)
    },
  })

  try {
    const result = await retryFunction('test123')
    console.log('最终结果:', result)
    return result
  } catch (error) {
    console.error('所有重试都失败了:', error)
    throw error
  }
}

/**
 * 使用示例：批量操作
 */
export async function exampleBatchOperations() {
  const userIds = ['user1', 'user2', 'user3']
  const results: User[] = []

  for (const userId of userIds) {
    try {
      const user = await userAPI.fetchUser(userId)
      results.push(user)
    } catch (error) {
      console.error(`获取用户 ${userId} 失败:`, error)
      // 继续处理其他用户
    }
  }

  console.log('批量获取结果:', results)
  return results
}
