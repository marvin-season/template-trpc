# ZodV4Form - 基于 Zod v4 的动态表单组件

一个功能强大的动态表单组件，基于 Zod v4 的原生 JSON Schema 转换功能。

## ✨ 特性

- 🚀 **自动生成表单**：从 Zod v4 schema 自动生成表单字段
- 🎨 **双主题支持**：默认使用原生 HTML 组件，可配置使用自定义 UI 组件
- 🔧 **灵活配置**：支持全局和字段级别的组件自定义
- 📝 **类型安全**：完整的 TypeScript 类型支持
- ✅ **内置验证**：使用 Zod 进行表单验证，自动显示错误信息
- 🎯 **元数据支持**：通过 `.meta()` 自定义字段类型、标签、描述等

## 📦 安装

确保安装了 Zod v4：

```bash
pnpm add zod@v4
```

## 🚀 快速开始

### 基础用法

```tsx
import { z } from 'zod/v4'
import ZodV4Form from '@/app/_components/ZodV4Form'

const schema = z.object({
  username: z.string().min(3, '用户名至少3个字符'),
  email: z.email('请输入有效的邮箱'),
  age: z.number().min(18, '年龄必须大于18岁'),
})

function MyForm() {
  const handleSubmit = (data) => {
    console.log('提交数据:', data)
  }

  return <ZodV4Form schema={schema} onSubmit={handleSubmit} />
}
```

## 🎨 自定义组件主题

### 1. 全局类型映射

```tsx
import { Input, Switch } from '@/components/ui'

const customComponents = {
  string: Input,      // 所有 string 类型使用 Input 组件
  number: Input,      // 所有 number 类型使用 Input 组件
  boolean: Switch,    // 所有 boolean 类型使用 Switch 组件
}

<ZodV4Form
  schema={schema}
  onSubmit={handleSubmit}
  components={customComponents}
/>
```

### 2. 字段级别自定义

通过 `meta.component` 指定特定字段使用的组件：

```tsx
const schema = z.object({
  username: z.string().meta({
    component: 'fancyInput', // 使用自定义组件
    label: '用户名',
    description: '请输入您的用户名',
  }),
})

const customComponents = {
  string: Input,
  fancyInput: (props) => (
    <div className='relative'>
      <Input {...props} className='pl-10' />
      <span className='absolute left-3 top-1/2 -translate-y-1/2'>👤</span>
    </div>
  ),
}
```

## 🔧 Meta 配置

### 自定义字段类型

使用 `meta.type` 覆盖默认的 JSON Schema 类型：

```tsx
const schema = z.object({
  // 单选枚举
  framework: z
    .enum(['react', 'vue', 'angular'])
    .meta({ type: 'single-select' }),

  // 多选数组
  skills: z
    .array(z.enum(['typescript', 'javascript', 'python']))
    .meta({ type: 'multi-select' }),
})
```

### 支持的 Meta 字段

```typescript
interface FieldMeta {
  type?: 'custom' | 'single-select' | 'multi-select' | 'textarea' | string
  component?: string // 指定使用的组件名称
  label?: string // 字段标签
  description?: string // 字段描述
  placeholder?: string // 输入提示
  [key: string]: any // 其他自定义属性
}
```

## 📝 完整示例

```tsx
'use client'

import React from 'react'
import { z } from 'zod/v4'
import ZodV4Form from '@/app/_components/ZodV4Form'
import { Input } from '@/components/ui/input'
import { defineComponents } from '@/app/_components/ZodV4Form/builtin-components'

// 全局组件映射
const customComponents = defineComponents({
  multiCheckbox: (props) => {
    const { value, onChange, fieldJsonSchema } = props
    return fieldJsonSchema.items.enum?.map((option: string) => (
      <label key={option} className='flex cursor-pointer items-center gap-2'>
        <input
          type='checkbox'
          checked={value.includes(option)}
          onChange={(e) => {
            if (e.target.checked) {
              onChange?.([...value, option])
            } else {
              onChange?.(value.filter((v: string) => v !== option))
            }
          }}
          className={`
            h-4 w-4 rounded border-gray-300 text-blue-600
            focus:ring-blue-500
          `}
        />
        <span>{option}</span>
      </label>
    ))
  },

  // 字段级别的自定义组件（通过 meta.component 指定）
  fancyInput: (props) => (
    <div className='relative'>
      <label className='mb-2 block font-medium text-gray-700'>
        {props.label || props.name}
        {props.isRequired && <span className='ml-1 text-blue-500'>*</span>}
      </label>
      <Input
        {...props}
        onChange={(e) => props.onChange?.(e.target.value)}
        className={``}
      />

      {props.error && (
        <p className='mt-1 text-sm text-red-600'>{props.error}</p>
      )}
    </div>
  ),
})

// 演示各种默认值的 schema
const demoSchema = z.object({
  // 使用自定义组件的字段 - 通过 meta 指定
  username: z.string().min(3, '用户名至少3个字符').default('guest_user').meta({
    component: 'fancyInput',
    description: '使用自定义 Input 组件',
  }),

  // 单选枚举
  framework: z.enum(['react', 'vue', 'angular']).default('react').meta({
    component: 'select',
  }),

  // ✨ 多选 - 使用数组 + 枚举
  skills: z
    .array(z.enum(['typescript', 'javascript', 'python', 'go', 'rust']))
    .min(1, '至少选择一项技能')
    .meta({
      component: 'multiCheckbox',
    })
    .default(['typescript', 'javascript']),

  // Email
  email: z.email().default('test@gmail.com'),

  // 数字
  age: z.number().min(18, '年龄必须大于18岁').default(25),

  // 可选的布尔值
  isActive: z
    .boolean()
    .meta({
      component: 'checkbox',
    })
    .optional(),

  // 布尔值 - 订阅选项，默认为 false
  newsletter: z.boolean().default(false),
})
export default function Page() {
  const handleDemoSubmit = (data: z.infer<typeof demoSchema>) => {
    console.log('演示表单提交:', data)
    alert('提交成功！查看控制台了解详情\n\n' + JSON.stringify(data, null, 2))
  }

  return (
    <div className='container mx-auto py-8'>
      <div className='mb-8'>
        <ZodV4Form
          schema={demoSchema}
          onSubmit={handleDemoSubmit}
          components={customComponents}
        />
      </div>
    </div>
  )
}
```

## 🎯 字段类型自动识别

组件会自动根据 Zod schema 识别字段类型：

| Zod 类型 | 默认渲染 | Meta 自定义 |
| --- | --- | --- |
| `z.string()` | `<input type="text">` | `type: 'custom'` |
| `z.email()` | `<input type="email">` | - |
| `z.number()` | `<input type="number">` | - |
| `z.boolean()` | `<input type="checkbox">` | - |
| `z.enum([...])` | `<select>` 或 `<radio>` | `type: 'single-select'` |
| `z.array(z.enum([...]))` | 多选 checkbox | `type: 'multi-select'` |
| `z.optional()` | 字段标记为可选 | - |
| `z.default(value)` | 自动填充默认值 | - |

## 🔄 数据流

```
Zod v4 Schema
    ↓
z.toJSONSchema(schema) (Zod v4 内置方法)
    ↓
JSON Schema (包含默认值、验证规则等)
    ↓
动态表单渲染
    ↓
用户输入
    ↓
schema.parse() 验证
    ↓
onSubmit 回调
```

## 📋 API

### Props

```typescript
interface ZodV4FormProps<T extends ZodSchema> {
  schema: T // Zod v4 schema
  onSubmit: (data: z.infer<T>) => void // 提交回调
  defaultValues?: Partial<z.infer<T>> // 默认值（覆盖 schema 中的默认值）
  components?: ComponentMap // 自定义组件映射
  className?: string // 表单容器类名
}
```

### Components 映射

```typescript
type ComponentMap = Record<string, React.ComponentType<any>>

// 示例
const components = {
  // 按类型映射
  string: Input,
  number: Input,
  boolean: Switch,

  // 自定义组件名
  fancyInput: CustomInput,
  richText: RichTextEditor,
}
```

## 🎨 默认样式

组件使用 Tailwind CSS 类名，原生 HTML 组件包括：

- `<input>` - 文本和数字输入
- `<select>` - 下拉选择
- `<input type="radio">` - 单选按钮
- `<input type="checkbox">` - 多选框

所有原生组件都有一致的样式设计，可以通过自定义组件完全替换。

## 🔍 调试

表单底部包含一个可展开的调试面板，显示：

- 当前表单数据
- 转换后的 JSON Schema

## 📝 注意事项

1. **Zod v4 必需**：此组件依赖 Zod v4 的 `z.toJSONSchema(schema)` 方法
2. **默认值来源**：默认值从 JSON Schema 中自动提取，支持 `z.default(value)`
3. **Meta 优先级**：`meta.type` 的优先级高于 JSON Schema 的 `type`
4. **组件接口**：自定义组件应该接受 `value` 和 `onChange` props
5. **验证时机**：表单提交时进行验证，实时清除已修复的错误

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可

MIT
