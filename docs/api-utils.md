# API 工具函数优化说明

## 概述

我们对原有的重试机制进行了全面优化，提供了更强大、更灵活的 API 工具函数。

## 主要改进

### 1. 类型安全

- 添加了完整的 TypeScript 类型定义
- 创建了专门的类型文件 `src/types/api.ts`
- 所有函数都有明确的返回类型

### 2. 配置化重试机制

- 支持固定延迟和指数退避
- 可自定义重试条件
- 可配置重试回调函数

### 3. 错误处理

- 自定义 `HttpError` 类
- 更好的错误信息
- 类型安全的错误处理

### 4. 模块化设计

- 分离了类型定义
- 创建了专门的 API 类
- 提供了使用示例

## 核心功能

### attachRetry 函数

为任何异步函数添加重试机制：

```typescript
import { attachRetry } from '@/utils/index'

const retryFunction = attachRetry(originalFunction, {
  retryCount: 3,
  delay: 1000,
  backoff: 'exponential',
  shouldRetry: (error) => {
    // 自定义重试条件
    return error instanceof TypeError
  },
  onRetry: (attempt, error) => {
    console.log(`第 ${attempt} 次重试失败:`, error)
  },
})
```

### UserAPI 类

提供用户相关的 API 操作：

```typescript
import { userAPI } from '@/utils/index'

// 获取用户信息
const user = await userAPI.fetchUser('user123')

// 更新用户信息
const updatedUser = await userAPI.updateUser('user123', {
  name: '新用户名',
  email: 'new@example.com',
})
```

### fetchWithRetry

带重试机制的 fetch 包装器：

```typescript
import { fetchWithRetry } from '@/utils/index'

const response = await fetchWithRetry('/api/data', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
})
```

## 配置选项

### RetryConfig 接口

```typescript
interface RetryConfig {
  retryCount?: number // 重试次数，默认 3
  delay?: number // 延迟时间（毫秒），默认 1000
  backoff?: 'fixed' | 'exponential' // 退避策略，默认 'fixed'
  shouldRetry?: (error: unknown) => boolean // 重试条件
  onRetry?: (attempt: number, error: unknown) => void // 重试回调
}
```

## 使用示例

详细的使用示例请参考 `src/utils/api-example.ts` 文件。

## 最佳实践

1. **合理设置重试次数**：避免无限重试导致资源浪费
2. **使用指数退避**：对于网络请求，建议使用指数退避策略
3. **自定义重试条件**：只对可恢复的错误进行重试
4. **错误日志记录**：在 onRetry 回调中记录重试信息
5. **类型安全**：始终使用 TypeScript 类型定义

## 错误处理

所有函数都会抛出 `HttpError` 或标准 `Error`，建议使用 try-catch 进行错误处理：

```typescript
try {
  const user = await userAPI.fetchUser('user123')
} catch (error) {
  if (error instanceof HttpError) {
    console.error(`HTTP 错误: ${error.status} - ${error.message}`)
  } else {
    console.error('其他错误:', error)
  }
}
```
