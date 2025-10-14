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
