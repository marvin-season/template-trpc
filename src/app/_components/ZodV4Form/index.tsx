'use client'

import React, { useMemo, useState } from 'react'
import { z } from 'zod/v4'
import { extractDefaultValues } from './helper'
import { NativeResetButton, NativeSubmitButton } from './native'
import { extractComponent, type TComponentMap } from './extract-component'

// ============ 类型定义 ============

type ZodSchema = z.ZodTypeAny

interface ZodV4FormProps<T extends ZodSchema> {
  schema: T
  onSubmit: (data: z.infer<T>) => void
  defaultValues?: Partial<z.infer<T>>
  components?: TComponentMap
  className?: string

  renderFooter?: (props: {
    onReset: (resetFunc: () => void) => void
  }) => React.ReactNode
}

// ============ 主组件 ============

export default function ZodV4Form<T extends ZodSchema>({
  schema,
  onSubmit,
  defaultValues = {},
  components = {},
  className = '',
  renderFooter = () => (
    <div className='flex justify-end gap-2'>
      <NativeSubmitButton />
      <NativeResetButton />
    </div>
  ),
}: ZodV4FormProps<T>) {
  // 使用 Zod v4 内置的 JSON Schema 转换
  const jsonSchema = useMemo(() => z.toJSONSchema(schema), [schema])
  // 初始化表单数据
  const initialFormData = useMemo(() => {
    const schemaDefaults = extractDefaultValues(jsonSchema)
    return { ...schemaDefaults, ...defaultValues }
  }, [jsonSchema, defaultValues])

  const [formData, setFormData] = useState<any>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // 更新字段值
  const updateField = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }))
    // 清除该字段的错误
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // 表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const validatedData = schema.parse(formData)
      setErrors({})
      onSubmit(validatedData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.issues.forEach((issue) => {
          const path = issue.path.join('.')
          newErrors[path] = issue.message
        })
        setErrors(newErrors)
      }
    }
  }

  // 渲染字段
  const renderField = (name: string, fieldJsonSchema: any) => {
    const value = formData[name]
    const error = errors[name]
    // 从 meta 中获取自定义类型，优先级高于 JSON Schema 的 type
    const { label, description } = fieldJsonSchema
    // 判断字段是否必填
    const isRequired = jsonSchema.required?.includes(name)

    // 根据类型渲染对应的组件
    const { component: FieldComponent, props } = extractComponent({
      fieldJsonSchema,
      components,
    })

    if (!FieldComponent) return null

    return (
      <div key={name} className='mb-4'>
        <label className='mb-2 block font-medium text-gray-700'>
          {label || name}
          {isRequired && <span className='ml-1 text-red-500'>*</span>}
        </label>

        {description && (
          <p className='mb-2 text-sm text-gray-500'>{description}</p>
        )}

        <FieldComponent
          name={name}
          value={value}
          error={error}
          onChange={(newValue: any) => updateField(name, newValue)}
          {...props}
        />

        {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
      </div>
    )
  }

  const handleReset = () => {
    setFormData(initialFormData)
    setErrors({})
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        mx-auto max-w-2xl p-6
        ${className}
      `}
    >
      <div className='space-y-4'>
        {Object.entries(jsonSchema.properties || {}).map(
          ([name, fieldJsonSchema]) => renderField(name, fieldJsonSchema),
        )}
      </div>

      {renderFooter({ onReset: handleReset })}
    </form>
  )
}
