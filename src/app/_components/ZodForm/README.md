# ZodForm - 基于 Zod v4 的自动表单生成组件

一个基于 Zod v4 Schema 的自动表单生成组件，使用原生 JSON Schema 标准和原生 HTML Form。

## ✨ 特性

- 🎯 **自动字段生成**：使用 Zod v4 原生 `toJSONSchema()` API 自动解析字段
- 🔍 **完整的类型支持**：支持 string、number、boolean、date、enum 等类型
- ✅ **Zod 验证集成**：支持所有 Zod 验证规则（min、max、email、url 等）
- 🎨 **友好的错误提示**：实时显示验证错误信息
- 🔧 **灵活配置**：支持自定义渲染函数和自定义组件
- 📦 **零额外依赖**：仅依赖 Zod v4 和原生 HTML Form
- ✨ **完全 Schema 驱动**：使用 JSON Schema 标准，所有默认值、验证规则都从 Schema 中自动提取
- 🎨 **自定义组件**：通过 `.meta()` 方法为任意字段指定自定义渲染组件，实现无限扩展性
- 🚀 **基于标准**：使用 JSON Schema 标准，稳定可靠，不依赖 Zod 内部 API

## 📦 安装

确保已安装 `zod` (v3.25+ with v4 support)：

```bash
pnpm add zod
```

## 🚀 基础使用

```tsx
import { ZodForm } from '@/app/_components/ZodForm'
import { z } from 'zod/v4'

const schema = z.object({
  username: z.string().min(3, '用户名至少3个字符').default('guest'),
  email: z.email().default('user@example.com'), // v4 使用 z.email() 而不是 z.string().email()
  age: z.number().min(18, '年龄必须大于18岁').default(25),
})

function MyForm() {
  const handleSubmit = (data) => {
    console.log('表单数据:', data)
  }

  return (
    <ZodForm
      schema={schema}
      onSubmit={handleSubmit}
      renderFooter={({ handleReset }) => (
        <div className='flex gap-4'>
          <button type='submit'>提交</button>
          <button type='button' onClick={handleReset}>
            重置
          </button>
        </div>
      )}
    />
  )
}
```

## 🔄 重构说明

**ZodForm 现在使用 Zod v4 的原生 JSON Schema 功能：**

- ✅ 使用 `toJSONSchema(schema)` 将 Zod Schema 转换为标准 JSON Schema
- ✅ 从 JSON Schema 中提取字段类型、验证规则、默认值等
- ✅ 不再依赖 Zod 内部 API（`_def`、`typeName` 等）
- ✅ 更稳定、更标准、更易维护

## 📖 API

### ZodForm Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `schema` | `ZodObject<T>` | 必填 | Zod Schema 对象 |
| `onSubmit` | `(data: T) => void \| Promise<void>` | 必填 | 表单提交回调函数 |
| `className` | `string` | `''` | 表单容器样式类 |
| `fieldClassName` | `string` | `''` | 字段容器样式类 |
| `customComponents` | `Record<string, CustomFieldComponent>` | `{}` | 自定义组件注册表 |
| `renderField` | `(field, value, error, onChange) => ReactNode` | - | 完全自定义字段渲染函数 |
| `renderFooter` | `({ handleReset }) => ReactNode` | 默认提交按钮 | 自定义表单底部渲染（提交、重置按钮等） |

## 🎯 支持的字段类型

### 1. String（字符串）

```tsx
import { z } from 'zod/v4'

const schema = z.object({
  name: z.string().min(3).max(20),
  email: z.email(), // ✅ v4 原生 email 类型
  website: z.url(), // ✅ v4 原生 url 类型
})
```

### 2. Number（数字）

```tsx
const schema = z.object({
  age: z.number().min(0).max(120),
  price: z.number().positive(),
  quantity: z.int(), // ✅ v4 使用 z.int() 表示整数
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
    isActive: false, // 覆盖 Schema 中的 true
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

### 自定义组件

ZodForm 支持为任意字段指定自定义渲染组件，通过 Zod v4 的 `.meta()` 方法传递元数据：

**步骤1: 创建自定义组件（必须符合 `CustomFieldProps` 接口）**

```tsx
import { type CustomFieldProps } from '@/app/_components/ZodForm'
import { Input } from '@/components/ui'

// 创建适配器组件
const CustomInput: React.FC<CustomFieldProps> = ({
  field,
  value,
  error,
  onChange,
  required,
}) => {
  return (
    <Input
      type='text'
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      required={required}
      aria-invalid={!!error}
    />
  )
}
```

**步骤2: 在 Schema 中通过 `.meta()` 指定使用的组件**

```tsx
import { z } from 'zod/v4'

const schema = z.object({
  // ✅ 使用 .meta() 方法指定自定义组件
  username: z
    .string()
    .min(3)
    .default('guest')
    .meta({
      component: 'customInput', // 组件名称
      description: '用户名字段', // 可选的描述文本
      props: { hint: '额外提示' }, // 可选的自定义属性
    }),

  // 普通字段 - 使用默认渲染
  email: z.email(),
})
```

**步骤3: 注册自定义组件**

```tsx
<ZodForm
  schema={schema}
  onSubmit={handleSubmit}
  customComponents={{
    customInput: CustomInput, // 注册组件
  }}
  renderFooter={({ handleReset }) => (
    <div className='flex gap-4'>
      <button type='submit'>提交</button>
      <button type='button' onClick={handleReset}>
        重置
      </button>
    </div>
  )}
/>
```

**FieldMeta 接口：**

```typescript
export interface FieldMeta {
  component?: string // 自定义组件名称
  description?: string // 字段描述（会覆盖 JSON Schema 的 description）
  props?: Record<string, any> // 传递给自定义组件的额外属性
}
```

**完整示例：**

```tsx
import { ZodForm, type CustomFieldProps } from '@/app/_components/ZodForm'
import { z } from 'zod/v4'
import { Input } from '@/components/ui'

// 1. 创建自定义组件
const FancyInput: React.FC<CustomFieldProps> = ({ field, value, onChange }) => {
  return (
    <div>
      <Input value={value || ''} onChange={(e) => onChange(e.target.value)} />
      {field.metadata?.props?.hint && (
        <p className='text-xs text-gray-500'>{field.metadata.props.hint}</p>
      )}
    </div>
  )
}

// 2. 定义 schema
const schema = z.object({
  username: z
    .string()
    .default('guest')
    .meta({
      component: 'fancyInput',
      props: { hint: '这是一个自定义输入框' },
    }),
})

// 3. 使用
function MyForm() {
  return (
    <ZodForm
      schema={schema}
      onSubmit={(data) => console.log(data)}
      customComponents={{
        fancyInput: FancyInput,
      }}
      renderFooter={({ handleReset }) => (
        <div>
          <button type='submit'>提交</button>
          <button type='button' onClick={handleReset}>
            重置
          </button>
        </div>
      )}
    />
  )
}
```

## 📝 完整示例

```tsx
import { ZodForm } from '@/app/_components/ZodForm'
import { z } from 'zod/v4'

const userSchema = z.object({
  // 字符串验证
  username: z
    .string()
    .min(3, '用户名至少3个字符')
    .max(20, '用户名最多20个字符')
    .default('guest_user'),

  // Email 验证（使用 v4 原生 email）
  email: z.email('请输入有效的邮箱地址').default('user@example.com'),

  // 数字验证
  age: z
    .number()
    .min(18, '年龄必须大于18岁')
    .max(100, '年龄必须小于100岁')
    .default(25),

  // URL 验证（使用 v4 原生 url）
  website: z.url('请输入有效的网址').optional(),

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
        fieldClassName='mb-4'
        renderFooter={({ handleReset }) => (
          <div className='flex gap-4'>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-600 text-white rounded'
            >
              注册
            </button>
            <button
              type='button'
              onClick={handleReset}
              className='px-4 py-2 bg-gray-200 rounded'
            >
              重置表单
            </button>
          </div>
        )}
      />
    </div>
  )
}
```

## 🎨 字段渲染规则

组件使用 JSON Schema 标准自动选择合适的输入控件：

| Zod v4 类型       | JSON Schema Type | HTML 控件                 | 说明           |
| ----------------- | ---------------- | ------------------------- | -------------- |
| `z.string()`      | `string`         | `<input type="text">`     | 文本输入       |
| `z.email()`       | `string` + format: `email` | `<input type="email">`    | Email 输入     |
| `z.url()`         | `string` + format: `uri`   | `<input type="url">`      | URL 输入       |
| `z.number()`      | `number`         | `<input type="number">`   | 数字输入       |
| `z.int()`         | `integer`        | `<input type="number">`   | 整数输入       |
| `z.boolean()`     | `boolean`        | `<input type="checkbox">` | 复选框         |
| `z.date()`        | `string` + format: `date`  | `<input type="date">`     | 日期选择器     |
| `z.enum([...])`   | `string` + enum  | `<select>`                | 下拉选择       |

## 🔍 验证规则支持

所有 Zod 验证规则都通过 JSON Schema 自动转换和支持：

- ✅ `min()` / `max()` - 转换为 `minimum` / `maximum` 或 `minLength` / `maxLength`
- ✅ `z.email()` - 转换为 `format: "email"`
- ✅ `z.url()` - 转换为 `format: "uri"`
- ✅ `z.int()` - 转换为 `type: "integer"`
- ✅ `positive()` / `negative()` - 转换为 `minimum` 约束
- ✅ `optional()` - 字段不在 `required` 数组中
- ✅ `default()` - 转换为 JSON Schema 的 `default` 属性
- ✅ `nullable()` - 支持 null 值
- ✅ 自定义错误消息

## 🐛 错误处理

组件会自动显示 Zod 验证错误：

```tsx
import { z } from 'zod/v4'

const schema = z.object({
  email: z.email('这不是一个有效的邮箱地址'),
  age: z.number().min(18, '你必须年满18岁才能注册'),
})
```

错误消息会显示在对应字段下方，使用红色文本。

## 💡 提示

1. **类型安全**：`onSubmit` 回调的参数类型会自动从 schema 推断
2. **实时验证**：字段值改变时会清除该字段的错误提示
3. **JSON Schema 标准**：使用 `toJSONSchema()` 转换，不依赖 Zod 内部 API
4. **重置功能**：通过 `renderFooter` 中的 `handleReset` 实现
5. **原生 HTML**：生成的是标准 HTML 表单，支持所有原生特性
6. **Zod v4 特性**：支持 `.meta()` 方法用于自定义组件

## 📄 许可

MIT
