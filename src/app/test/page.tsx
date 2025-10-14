'use client'

import React from 'react'
import { z } from 'zod/v4'
import ZodV4Form from '@/app/_components/ZodV4Form'
import { Input } from '@/components/ui/input'
import { defineComponentMap } from '@/app/_components/ZodV4Form/extract-component'
import {
  NativeCheckbox,
  NativeSelect,
} from '@/app/_components/ZodV4Form/native'
import { createMeta } from '@/app/_components/ZodV4Form/helper'

// ✨ 使用 defineComponentMap 定义组件映射以获得类型推断
const customComponents = defineComponentMap({
  // 类型级别的映射
  string: (props: any) => (
    <Input
      value={props.value}
      onChange={(e) => props.onChange?.(e.target.value)}
    />
  ),
  select: (props) => {
    const { fieldJsonSchema, ...restProps } = props
    return <NativeSelect {...restProps} options={fieldJsonSchema.enum} />
  },
  checkbox: NativeCheckbox,
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
  fancyInput: (props: any) => (
    <div className='relative'>
      <Input
        {...props}
        onChange={(e) => props.onChange?.(e.target.value)}
        className={`pl-10`}
      />
      <span className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-400'>
        👤
      </span>
    </div>
  ),
  emailInput: (props: any) => (
    <div className='relative'>
      <Input
        {...props}
        type='email'
        onChange={(e) => props.onChange?.(e.target.value)}
        className={`pl-10`}
      />
      <span className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-400'>
        ✉️
      </span>
    </div>
  ),
})

// 演示各种默认值的 schema
// ✨ 现在 component 字段有完整的类型支持和自动补全！
const demoSchema = z.object({
  // 使用自定义组件的字段 - 通过 meta 指定
  // 现在 component 会有自动补全：'fancyInput' | 'emailInput' | 'string' | 'select' | ...
  username: z
    .string()
    .min(3, '用户名至少3个字符')
    .default('guest_user')
    .meta(
      createMeta(customComponents, {
        component: 'fancyInput', // ✅ 类型安全，自动补全
        description: '使用自定义 Input 组件',
      }),
    ),

  // 单选枚举
  framework: z
    .enum(['react', 'vue', 'angular'])
    .default('react')
    .meta(
      createMeta(customComponents, {
        component: 'select', // ✅ 类型安全
      }),
    ),

  // ✨ 多选 - 使用数组 + 枚举
  skills: z
    .array(z.enum(['typescript', 'javascript', 'python', 'go', 'rust']))
    .min(1, '至少选择一项技能')
    .meta(
      createMeta(customComponents, {
        component: 'multiCheckbox', // ✅ 类型安全
      }),
    )
    .default(['typescript', 'javascript']),

  // Email - 使用自定义 emailInput 组件
  email: z
    .email()
    .default('test@gmail.com')
    .meta(
      createMeta(customComponents, {
        component: 'emailInput', // ✅ 类型安全
        description: '电子邮件地址',
      }),
    ),

  // 数字
  age: z.number().min(18, '年龄必须大于18岁').default(25),

  // 可选的布尔值
  isActive: z
    .boolean()
    .meta(
      createMeta(customComponents, {
        component: 'checkbox', // ✅ 类型安全
      }),
    )
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
