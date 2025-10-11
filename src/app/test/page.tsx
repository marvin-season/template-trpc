'use client'

import React from 'react'
import { ZodForm, type CustomFieldProps } from '@/app/_components/ZodForm'
import { z } from 'zod/v4'
import { Button, Input } from '@/components/ui'

// 创建一个适配器，将 ui/Input 适配到 ZodForm 的 CustomFieldProps 接口
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

// 演示各种默认值的 schema
const demoSchema = z.object({
  // 使用自定义组件的字段 - 通过 meta 指定
  username: z.string().min(3, '用户名至少3个字符').default('guest_user').meta({
    component: 'fancyInput',
    description: '使用自定义 Input 组件',
  }),
  skills: z.enum(['react', 'vue', 'angular']).default('react'),
  email: z.email().default('test@gmail.com'),
  age: z.number().min(18, '年龄必须大于18岁').default(25),
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
    <ZodForm
      schema={demoSchema}
      onSubmit={handleDemoSubmit}
      fieldClassName='mb-4'
      customComponents={{
        fancyInput: CustomInput,
      }}
      renderFooter={({ handleReset }) => (
        <div className='flex justify-end gap-2'>
          <Button type='submit'>提交</Button>
          <Button type='button' onClick={() => handleReset()}>
            重置
          </Button>
        </div>
      )}
    />
  )
}
