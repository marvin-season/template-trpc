'use client'

import React, { useMemo, useState } from 'react'
import { z } from 'zod/v4'
import { Button } from '@/components/ui'
import {
  NativeMultiSelect,
  NativeRadioGroup,
  NativeSelect,
  NativeCheckbox,
  NativeNumberInput,
  NativeInput,
  NativeResetButton,
  NativeSubmitButton,
} from './native'

// ============ 类型定义 ============

type ZodSchema = z.ZodTypeAny

type ComponentMap = Record<string, React.ComponentType<any>>

interface ZodV4FormProps<T extends ZodSchema> {
  schema: T
  onSubmit: (data: z.infer<T>) => void
  defaultValues?: Partial<z.infer<T>>
  components?: ComponentMap
  className?: string

  renderFooter?: (props: {
    onReset: (resetFunc: () => void) => void
  }) => React.ReactNode
}

/**
 * 从 JSON Schema 中提取默认值
 */
function extractDefaultValues(jsonSchema: any): Record<string, any> {
  const defaults: Record<string, any> = {}

  if (jsonSchema.properties) {
    for (const [key, field] of Object.entries<any>(jsonSchema.properties)) {
      if (field.default !== undefined) {
        defaults[key] = field.default
      }
    }
  }
  return defaults
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
  console.log('jsonSchema', jsonSchema)
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
    const { type, component, label, description, placeholder } = fieldJsonSchema

    // 如果 meta 中指定了 component，优先使用自定义组件
    if (component && components[component]) {
      const CustomComponent = components[component]
      if (!CustomComponent) return null

      return (
        <div key={name} className='mb-4'>
          <label className='mb-2 block font-medium text-gray-700'>
            {label || name}
            {jsonSchema.required?.includes(name) && (
              <span className='ml-1 text-red-500'>*</span>
            )}
          </label>

          {description && (
            <p className='mb-2 text-sm text-gray-500'>{description}</p>
          )}

          <CustomComponent
            value={value}
            onChange={(newValue: any) => updateField(name, newValue)}
            error={error}
            {...fieldJsonSchema}
          />

          {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
        </div>
      )
    }

    // 根据类型渲染对应的组件
    let FieldComponent: React.ReactNode

    // 处理数组类型（多选）
    if (type === 'multi-select') {
      const enumOptions = fieldJsonSchema.items?.enum || []
      FieldComponent = (
        <NativeMultiSelect
          value={value}
          onChange={(newValue: any) => updateField(name, newValue)}
          options={enumOptions}
        />
      )
    }
    // 处理单选枚举
    else if (type === 'single-select') {
      const enumOptions = fieldJsonSchema.enum || []
      // 如果选项少于等于3个，使用 radio，否则使用 select
      if (enumOptions.length <= 3) {
        FieldComponent = (
          <NativeRadioGroup
            value={value}
            onChange={(newValue: any) => updateField(name, newValue)}
            options={enumOptions}
            name={name}
          />
        )
      } else {
        FieldComponent = (
          <NativeSelect
            value={value}
            onChange={(newValue: any) => updateField(name, newValue)}
            options={enumOptions}
          />
        )
      }
    }
    // 处理布尔类型
    else if (type === 'boolean') {
      // 检查是否使用自定义组件
      const BoolComponent = components['boolean'] || components['switch']
      if (BoolComponent) {
        FieldComponent = (
          <BoolComponent
            checked={value ?? false}
            onCheckedChange={(checked: boolean) => updateField(name, checked)}
          />
        )
      } else {
        FieldComponent = (
          <NativeCheckbox
            value={value}
            onChange={(newValue: any) => updateField(name, newValue)}
          />
        )
      }
    }
    // 处理数字类型
    else if (type === 'number' || type === 'integer') {
      const NumComponent = components['number'] || components['input']
      if (NumComponent) {
        FieldComponent = (
          <NumComponent
            type='number'
            value={value ?? ''}
            onChange={(e: any) => {
              const newValue =
                e.target?.value !== undefined ? e.target.value : e
              updateField(name, Number(newValue))
            }}
            min={fieldJsonSchema.minimum}
            max={fieldJsonSchema.maximum}
          />
        )
      } else {
        FieldComponent = (
          <NativeNumberInput
            value={value}
            onChange={(newValue: any) => updateField(name, newValue)}
            min={fieldJsonSchema.minimum}
            max={fieldJsonSchema.maximum}
          />
        )
      }
    }
    // 处理字符串类型
    else {
      const StrComponent = components['string'] || components['input']
      if (StrComponent) {
        FieldComponent = (
          <StrComponent
            type={fieldJsonSchema.format === 'email' ? 'email' : 'text'}
            value={value ?? ''}
            onChange={(e: any) => {
              const newValue =
                e.target?.value !== undefined ? e.target.value : e
              updateField(name, newValue)
            }}
            minLength={fieldJsonSchema.minLength}
            maxLength={fieldJsonSchema.maxLength}
            placeholder={placeholder}
          />
        )
      } else {
        FieldComponent = (
          <NativeInput
            type={fieldJsonSchema.format === 'email' ? 'email' : 'text'}
            value={value}
            onChange={(newValue: any) => updateField(name, newValue)}
            minLength={fieldJsonSchema.minLength}
            maxLength={fieldJsonSchema.maxLength}
            placeholder={placeholder}
          />
        )
      }
    }

    // 判断字段是否必填
    const isRequired = jsonSchema.required?.includes(name)

    return (
      <div key={name} className='mb-4'>
        <label className='mb-2 block font-medium text-gray-700'>
          {label || name}
          {isRequired && <span className='ml-1 text-red-500'>*</span>}
        </label>

        {description && (
          <p className='mb-2 text-sm text-gray-500'>{description}</p>
        )}

        {FieldComponent}

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
