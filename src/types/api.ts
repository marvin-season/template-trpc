// API 响应基础类型
export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
  timestamp: string
}

// 用户相关类型
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  avatar?: string
}

// 重试配置类型
export interface RetryConfig {
  retryCount?: number
  delay?: number
  backoff?: 'fixed' | 'exponential'
  shouldRetry?: (error: unknown) => boolean
  onRetry?: (attempt: number, error: unknown) => void
}

// HTTP 错误类型
export class HttpError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

// API 客户端配置
export interface ApiClientConfig {
  baseURL: string
  timeout?: number
  headers?: Record<string, string>
  retryConfig?: RetryConfig
}
