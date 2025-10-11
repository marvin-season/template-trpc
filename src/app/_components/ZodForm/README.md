# ZodForm - 基于 Zod 的自动表单生成组件

一个基于 Zod Schema 的自动表单生成组件，无需额外依赖，使用原生 HTML Form 和 Zod 验证。

## ✨ 特性

- 🎯 **自动字段生成**：根据 Zod Schema 自动生成表单字段
- 🔍 **完整的类型支持**：支持 string、number、boolean、date、enum 等类型
- ✅ **Zod 验证集成**：支持所有 Zod 验证规则（min、max、email、url 等）
- 🎨 **友好的错误提示**：实时显示验证错误信息
- 🔧 **灵活配置**：支持自定义样式、提交文本等
- 📦 **零额外依赖**：仅依赖 Zod 和原生 HTML Form
- ✨ **完全 Schema 驱动**：所有默认值都直接从 Zod Schema 的 `.default()` 方法获取，无需在组件中重复定义

## 📦 安装

确保已安装 `zod`：

```bash
pnpm add zod
```

## 🚀 基础使用

```tsx
import { ZodForm } from '@/app/_components/ZodForm'
import { z } from 'zod'

const schema = z.object({
  username: z.string().min(3, '用户名至少3个字符'),
  email: z.string().email('请输入有效的邮箱'),
  age: z.number().min(18, '年龄必须大于18岁'),
})

function MyForm() {
  const handleSubmit = (data) => {
    console.log('表单数据:', data)
  }

  return <ZodForm schema={schema} onSubmit={handleSubmit} submitText='提交' />
}
```

## 📖 API

### ZodForm Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `schema` | `ZodObject<T>` | 必填 | Zod Schema 对象 |
| `onSubmit` | `(data: T) => void \| Promise<void>` | 必填 | 表单提交回调函数 |
| `defaultValues` | `Partial<T>` | `{}` | 表单默认值 |
| `submitText` | `string` | `'提交'` | 提交按钮文本 |
| `resetText` | `string` | `'重置'` | 重置按钮文本 |
| `className` | `string` | `''` | 表单容器样式类 |
| `fieldClassName` | `string` | `''` | 字段容器样式类 |
| `showReset` | `boolean` | `true` | 是否显示重置按钮 |

## 🎯 支持的字段类型

### 1. String（字符串）

```tsx
const schema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(), // 自动识别为 email 类型
  website: z.string().url(), // 自动识别为 url 类型
})
```

### 2. Number（数字）

```tsx
const schema = z.object({
  age: z.number().min(0).max(120),
  price: z.number().positive(),
  quantity: z.number().int(), // 整数
})
```

### 3. Boolean（布尔值）

```tsx
const schema = z.object({
  isActive: z.boolean(),
  subscribe: z.boolean().default(false),
})
```

### 4. Date（日期）

```tsx
const schema = z.object({
  birthDate: z.date(),
  startDate: z.date().optional(),
})
```

### 5. Enum（枚举）

```tsx
const schema = z.object({
  role: z.enum(['admin', 'user', 'guest']),
  status: z.enum(['active', 'inactive']).default('active'),
})
```

### 6. Native Enum（原生枚举）

```tsx
enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}

const schema = z.object({
  role: z.nativeEnum(UserRole),
})
```

## 🔧 高级用法

### Optional 字段

```tsx
const schema = z.object({
  name: z.string(),
  bio: z.string().optional(), // 非必填
  website: z.string().url().optional(),
})
```

### 默认值（完全 Schema 驱动）

ZodForm 完全依赖 Zod Schema 中的 `.default()` 方法，实现真正的单一数据源：

```tsx
const schema = z.object({
  // ✅ 在 Schema 中定义默认值 - 这是唯一的数据源
  username: z.string().default('guest_user'),      // 自动填充
  age: z.number().default(25),                     // 自动填充
  isActive: z.boolean().default(true),             // 自动勾选
  role: z.enum(['admin', 'user']).default('user'), // 自动选择
  bio: z.string().optional().default('默认简介'),   // 可选+默认值
})

// ✅ 直接使用 - 所有默认值都来自 Schema
<ZodForm schema={schema} onSubmit={handleSubmit} />
```

**设计理念：**
- 🎯 **单一数据源**：默认值只在 Schema 中定义一次
- 🔒 **类型安全**：Schema 即文档，默认值与验证规则在一起
- 🚫 **避免重复**：不需要在组件 props 中再次指定默认值
- ✨ **真正的 Schema First**：所有表单行为都由 Schema 驱动

**如果需要覆盖 Schema 默认值：**

```tsx
// 使用 defaultValues prop 可以覆盖 Schema 中的默认值
<ZodForm
  schema={schema}
  onSubmit={handleSubmit}
  defaultValues={{
    username: 'custom_user', // 覆盖 Schema 中的 'guest_user'
    isActive: false,         // 覆盖 Schema 中的 true
  }}
/>
```

**默认值优先级：**
1. `defaultValues` prop（覆盖层，用于特殊场景）
2. Schema 中的 `.default()` 值（主要数据源）
3. 根据类型的兜底默认值（`false` for boolean, `''` for string/number）

### 自定义样式

```tsx
<ZodForm
  schema={schema}
  onSubmit={handleSubmit}
  className='max-w-md mx-auto p-6 bg-white rounded-lg'
  fieldClassName='mb-6'
/>
```

### 异步提交

```tsx
const handleSubmit = async (data) => {
  try {
    await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    alert('提交成功！')
  } catch (error) {
    console.error('提交失败:', error)
  }
}

;<ZodForm schema={schema} onSubmit={handleSubmit} />
```

## 📝 完整示例

```tsx
import { ZodForm } from '@/app/_components/ZodForm'
import { z } from 'zod'

const userSchema = z.object({
  // 字符串验证
  username: z
    .string()
    .min(3, '用户名至少3个字符')
    .max(20, '用户名最多20个字符'),

  // Email 验证
  email: z.string().email('请输入有效的邮箱地址'),

  // 数字验证
  age: z.number().min(18, '年龄必须大于18岁').max(100, '年龄必须小于100岁'),

  // URL 验证（可选）
  website: z.string().url('请输入有效的网址').optional(),

  // 布尔值
  isActive: z.boolean().default(false),

  // 枚举选择
  role: z.enum(['admin', 'user', 'guest']).default('user'),

  // 可选字符串
  bio: z.string().max(200, '简介最多200个字符').optional(),
})

function UserForm() {
  const handleSubmit = (data) => {
    console.log('表单数据:', data)
    // data 的类型会自动推断为：
    // {
    //   username: string
    //   email: string
    //   age: number
    //   website?: string
    //   isActive: boolean
    //   role: "admin" | "user" | "guest"
    //   bio?: string
    // }
  }

  return (
    <div className='max-w-2xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>用户注册</h1>
      <ZodForm
        schema={userSchema}
        onSubmit={handleSubmit}
        defaultValues={{
          isActive: true,
          role: 'user',
        }}
        submitText='注册'
        resetText='重置表单'
        fieldClassName='mb-4'
      />
    </div>
  )
}
```

## 🎨 字段渲染规则

组件会根据 Zod 类型自动选择合适的输入控件：

| Zod 类型             | HTML 控件                 | 说明       |
| -------------------- | ------------------------- | ---------- |
| `z.string()`         | `<input type="text">`     | 文本输入   |
| `z.string().email()` | `<input type="email">`    | Email 输入 |
| `z.string().url()`   | `<input type="url">`      | URL 输入   |
| `z.number()`         | `<input type="number">`   | 数字输入   |
| `z.boolean()`        | `<input type="checkbox">` | 复选框     |
| `z.date()`           | `<input type="date">`     | 日期选择器 |
| `z.enum()`           | `<select>`                | 下拉选择   |
| `z.nativeEnum()`     | `<select>`                | 下拉选择   |

## 🔍 验证规则支持

支持的 Zod 验证规则：

- ✅ `min()` / `max()` - 最小/最大值或长度
- ✅ `email()` - Email 格式
- ✅ `url()` - URL 格式
- ✅ `int()` - 整数
- ✅ `positive()` / `negative()` - 正数/负数
- ✅ `optional()` - 可选字段
- ✅ `default()` - 默认值
- ✅ `nullable()` - 可为 null
- ✅ 自定义错误消息

## 🐛 错误处理

组件会自动显示 Zod 验证错误：

```tsx
const schema = z.object({
  email: z.string().email('这不是一个有效的邮箱地址'),
  age: z.number().min(18, '你必须年满18岁才能注册'),
})
```

错误消息会显示在对应字段下方，使用红色文本。

## 💡 提示

1. **类型安全**：`onSubmit` 回调的参数类型会自动从 schema 推断
2. **实时验证**：字段值改变时会清除该字段的错误提示
3. **提交状态**：提交期间按钮会显示禁用状态
4. **重置功能**：重置按钮会将表单恢复到默认值
5. **原生 HTML**：生成的是标准 HTML 表单，支持所有原生特性

## 📄 许可

MIT
