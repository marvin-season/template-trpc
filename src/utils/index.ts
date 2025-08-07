import { sleep } from '@/utils/common'
import type { RetryConfig, UpdateUserRequest, User } from '@/types/api'
import { HttpError } from '@/types/api'

// 默认重试配置
const DEFAULT_RETRY_CONFIG: Required<RetryConfig> = {
  retryCount: 3,
  delay: 1000,
  backoff: 'fixed',
  shouldRetry: () => true,
  onRetry: (attempt, error) => {
    console.warn(`重试第 ${attempt} 次失败:`, error)
  },
}

/**
 * 为异步函数添加重试机制
 * @param fn 要重试的异步函数
 * @param config 重试配置
 * @returns 包装后的函数
 */
function attachRetry<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  config: RetryConfig = {},
): T {
  const finalConfig = { ...DEFAULT_RETRY_CONFIG, ...config }

  return (async (...args: Parameters<T>) => {
    let lastError: any

    for (let attempt = 1; attempt <= finalConfig.retryCount; attempt++) {
      try {
        return await fn(...args)
      } catch (error) {
        lastError = error

        // 检查是否应该重试
        if (!finalConfig.shouldRetry(error)) {
          throw error
        }

        // 如果是最后一次尝试，直接抛出错误
        if (attempt === finalConfig.retryCount) {
          const errorMessage =
            error instanceof Error ? error.message : String(error)
          throw new Error(
            `重试 ${finalConfig.retryCount} 次后仍然失败: ${errorMessage}`,
          )
        }

        // 调用重试回调
        finalConfig.onRetry(attempt, error)

        // 计算延迟时间
        const delay =
          finalConfig.backoff === 'exponential'
            ? finalConfig.delay * Math.pow(2, attempt - 1)
            : finalConfig.delay

        await sleep(delay)
      }
    }

    throw lastError
  }) as T
}

/**
 * 带重试机制的 fetch 包装器
 */
const fetchWithRetry = attachRetry(fetch, {
  retryCount: 3,
  delay: 2000,
  backoff: 'exponential',
  shouldRetry: (error) => {
    // 只对网络错误和 5xx 错误进行重试
    if (error instanceof TypeError) return true
    if (error instanceof HttpError && error.status >= 500 && error.status < 600)
      return true
    return false
  },
  onRetry: (attempt, error) => {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.warn(`网络请求重试第 ${attempt} 次:`, errorMessage)
  },
})

/**
 * 用户相关的 API 函数
 */
class UserAPI {
  private baseURL: string

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL
  }

  /**
   * 获取用户信息
   */
  async fetchUser(userId?: string): Promise<User> {
    const url = userId
      ? `${this.baseURL}/users/${userId}`
      : `${this.baseURL}/users/me`

    const response = await fetchWithRetry(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new HttpError(
        `获取用户信息失败`,
        response.status,
        response.statusText,
      )
    }

    return response.json()
  }

  /**
   * 更新用户信息
   */
  async updateUser(userId: string, data: UpdateUserRequest): Promise<User> {
    const response = await fetchWithRetry(`${this.baseURL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new HttpError(
        `更新用户信息失败`,
        response.status,
        response.statusText,
      )
    }

    return response.json()
  }
}

// 创建用户 API 实例
export const userAPI = new UserAPI()

// 导出重试工具函数
export { attachRetry, fetchWithRetry }

// 使用示例（在实际项目中应该移除）
// const user = await userAPI.fetchUser()
// console.log('用户信息:', user)
