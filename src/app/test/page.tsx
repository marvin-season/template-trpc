'use client'

import React from 'react'
import { z } from 'zod/v4'
import ZodV4Form from '@/app/_components/ZodV4Form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui'

// 全局组件映射
const customComponents = {
  // 类型级别的映射
  string: Input,
  boolean: Switch,

  // 字段级别的自定义组件（通过 meta.component 指定）
  fancyInput: (props: any) => (
    <div className='relative'>
      <Input {...props} className='pl-10' />
      <span className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-400'>
        👤
      </span>
    </div>
  ),
}

// 演示各种默认值的 schema
const demoSchema = z.object({
  // 使用自定义组件的字段 - 通过 meta 指定
  // username: z.string().min(3, '用户名至少3个字符').default('guest_user').meta({
  //   component: 'fancyInput',
  //   description: '使用自定义 Input 组件',
  // }),

  // 单选枚举
  framework: z.enum(['react', 'vue', 'angular']).default('react').meta({
    type: 'select',
  }),

  // ✨ 多选 - 使用数组 + 枚举
  skills: z
    .array(z.enum(['typescript', 'javascript', 'python', 'go', 'rust']))
    .min(1, '至少选择一项技能')
    .meta({
      type: 'multi-select',
    })
    .default(['typescript', 'javascript']),

  // Email
  email: z.email().default('test@gmail.com'),

  // 数字
  age: z.number().min(18, '年龄必须大于18岁').default(25),

  // 可选的布尔值
  isActive: z.boolean().optional(),

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
      <h1 className='mb-6 text-3xl font-bold'>Zod V4 动态表单演示</h1>

      <div className='mb-8'>
        <h4 className='mb-2 text-xl font-semibold'>
          示例 1: 使用原生 HTML 组件
        </h4>
        <p className='mb-4 text-gray-600'>
          默认使用原生 input、select、checkbox 等组件
        </p>
        <ZodV4Form schema={demoSchema} onSubmit={handleDemoSubmit} />
      </div>

      <hr className='my-8' />

      <div className='mb-8'>
        <h4 className='mb-2 text-xl font-semibold'>
          示例 2: 使用自定义 shadcn/ui 组件
        </h4>
        <p className='mb-4 text-gray-600'>
          通过 components 配置使用 @/components/ui 中的组件
        </p>
        <ZodV4Form
          schema={demoSchema}
          onSubmit={handleDemoSubmit}
          components={customComponents}
        />
      </div>
    </div>
  )
}
