# ZodV4Form TypeScript 支持

## 概述

ZodV4Form 现在提供完整的 TypeScript 支持，让你在使用自定义组件时获得类型安全和自动补全功能。

## 主要改进

### 1. 类型安全的组件映射

使用 `defineComponentMap` 函数定义组件映射，TypeScript 会自动推断所有组件名称：

```typescript
import { defineComponentMap } from '@/app/_components/ZodV4Form/extract-component'

const customComponents = defineComponentMap({
  fancyInput: (props) => <FancyInput {...props} />,
  emailInput: (props) => <EmailInput {...props} />,
  customSelect: (props) => <CustomSelect {...props} />,
})

// TypeScript 自动知道可用的组件名称：
// 'fancyInput' | 'emailInput' | 'customSelect'
```

### 2. 类型安全的 meta 配置

使用 `createMeta` 辅助函数在 Zod schema 中获得类型安全的 `component` 字段：

```typescript
import { createMeta } from '@/app/_components/ZodV4Form/helper'
import { z } from 'zod/v4'

const schema = z.object({
  username: z.string().meta(
    createMeta(customComponents, {
      component: 'fancyInput', // ✅ 自动补全，类型安全
      description: '用户名',
      placeholder: '请输入用户名',
    }),
  ),

  email: z
    .string()
    .email()
    .meta(
      createMeta(customComponents, {
        component: 'emailInput', // ✅ 自动补全
      }),
    ),

  // 如果输入错误的组件名，TypeScript 会报错
  password: z.string().meta(
    createMeta(customComponents, {
      component: 'wrongName', // ❌ TypeScript 错误！
    }),
  ),
})
```

## 完整示例

```typescript
'use client'

import React from 'react'
import { z } from 'zod/v4'
import ZodV4Form from '@/app/_components/ZodV4Form'
import { defineComponentMap } from '@/app/_components/ZodV4Form/extract-component'
import { createMeta } from '@/app/_components/ZodV4Form/helper'
import { Input } from '@/components/ui/input'

// 1️⃣ 定义组件映射
const customComponents = defineComponentMap({
  fancyInput: (props: any) => (
    <div className='relative'>
      <Input
        {...props}
        onChange={(e) => props.onChange?.(e.target.value)}
        className='pl-10'
      />
      <span className='absolute top-1/2 left-3 -translate-y-1/2'>👤</span>
    </div>
  ),
  emailInput: (props: any) => (
    <div className='relative'>
      <Input
        type='email'
        {...props}
        onChange={(e) => props.onChange?.(e.target.value)}
        className='pl-10'
      />
      <span className='absolute top-1/2 left-3 -translate-y-1/2'>✉️</span>
    </div>
  ),
})

// 2️⃣ 定义 Schema（带类型安全的 meta）
const schema = z.object({
  username: z
    .string()
    .min(3, '用户名至少3个字符')
    .meta(
      createMeta(customComponents, {
        component: 'fancyInput', // ✅ 自动补全
        description: '您的用户名',
      }),
    ),

  email: z
    .string()
    .email()
    .meta(
      createMeta(customComponents, {
        component: 'emailInput', // ✅ 自动补全
        description: '电子邮件地址',
      }),
    ),
})

// 3️⃣ 使用表单
export default function MyForm() {
  const handleSubmit = (data: z.infer<typeof schema>) => {
    console.log(data)
  }

  return (
    <ZodV4Form
      schema={schema}
      onSubmit={handleSubmit}
      components={customComponents}
    />
  )
}
```

## API 参考

### `defineComponentMap<T>(components: T)`

定义组件映射并获得类型推断。

**参数：**

- `components`: 组件映射对象

**返回：**

- 带有完整类型信息的组件映射

### `createMeta<C>(components: C, meta: MetaConfig)`

创建类型安全的 meta 配置。

**参数：**

- `components`: 组件映射（由 `defineComponentMap` 创建）
- `meta`: meta 配置对象
  - `component?`: 组件名称（会有自动补全）
  - `label?`: 字段标签
  - `description?`: 字段描述
  - `placeholder?`: 占位符
  - 其他自定义字段...

**返回：**

- meta 配置对象

## 类型定义

### `TComponentMap<T>`

```typescript
type TComponentMap<T extends Record<string, NativeComponent> = {}> =
  BaseComponentMap & T
```

### `ComponentName<T>`

```typescript
type ComponentName<T extends TComponentMap> = keyof T & string
```

### `TFieldJSONSchemaWithComponent<T>`

```typescript
type TFieldJSONSchemaWithComponent<
  T extends TComponentMap = TComponentMap<{}>,
> = TFieldJSONSchema & {
  component?: ComponentName<T>
}
```

## 迁移指南

### 从旧版本迁移

**之前：**

```typescript
const customComponents: TComponentMap = {
  fancyInput: (props) => <FancyInput {...props} />,
}

const schema = z.object({
  username: z.string().meta({
    component: 'fancyInput', // ⚠️ 没有类型检查
  }),
})
```

**现在：**

```typescript
const customComponents = defineComponentMap({
  fancyInput: (props) => <FancyInput {...props} />,
})

const schema = z.object({
  username: z.string().meta(
    createMeta(customComponents, {
      component: 'fancyInput', // ✅ 类型安全
    }),
  ),
})
```

## 常见问题

### Q: 我必须使用 `createMeta` 吗？

A: 不是必须的，但强烈建议使用。如果不使用 `createMeta`，你仍然可以直接传递对象给 `.meta()`，但会失去类型检查和自动补全功能。

### Q: 可以动态添加组件吗？

A: 可以，但为了保持类型安全，建议在定义时就包含所有组件。如果需要动态添加，可以使用类型断言：

```typescript
const dynamicComponents = {
  ...customComponents,
  newComponent: NewComponent as NativeComponent,
} as const
```

### Q: 如何处理可选的 component？

A: `component` 字段本身就是可选的。如果不指定 `component`，表单会使用默认的输入组件。

## 总结

通过使用 `defineComponentMap` 和 `createMeta`，你可以：

- ✅ 获得完整的类型检查
- ✅ 享受自动补全功能
- ✅ 在编译时捕获拼写错误
- ✅ 提高代码的可维护性

这使得 ZodV4Form 成为一个类型安全且易于使用的表单解决方案！
