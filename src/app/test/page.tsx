'use client'

import React from 'react'
import { z } from 'zod/v4'
import ZodV4Form from '@/app/_components/ZodV4Form'
import { defineComponents } from '@/app/_components/ZodV4Form/builtin-components'
import { Slider } from 'antd'

// 全局组件映射
const customComponents = defineComponents({
  slider: (props) => {
    const { fieldJsonSchema, onChange, value } = props
    const enumValues = fieldJsonSchema.enum as string[]
    const marks = Object.fromEntries(
      enumValues?.map((item, index) => [index, item]) ?? [],
    )
    console.log('slider', marks)

    return (
      <Slider
        value={enumValues.indexOf(value)}
        min={0}
        max={enumValues.length - 1}
        step={1}
        marks={marks}
        onChange={(value) => onChange?.(enumValues[value])}
      />
    )
  },
})

// 演示各种默认值的 schema
const demoSchema = z.object({
  level: z
    .string()
    .refine((value) => value.length <= 2, {
      message: 'level must be less than 2 characters',
    })
    .default('aa'),
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
