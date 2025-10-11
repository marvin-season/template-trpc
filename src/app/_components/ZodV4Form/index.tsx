'use client'

import React, { useMemo, useState } from 'react'
import { z } from 'zod/v4'
import { Button } from '@/components/ui'

// ============ 类型定义 ============

type ZodSchema = z.ZodTypeAny

interface FieldMeta {
  type?: 'custom' | 'single-select' | 'multi-select' | 'textarea' | string
  component?: string
  description?: string
  label?: string
  placeholder?: string
  [key: string]: any
}

type ComponentMap = Record<string, React.ComponentType<any>>

interface ZodV4FormProps<T extends ZodSchema> {
  schema: T
  onSubmit: (data: z.infer<T>) => void
  defaultValues?: Partial<z.infer<T>>
  components?: ComponentMap
  className?: string
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

// ============ 默认组件 ============

const NativeInput: React.FC<any> = ({ value, onChange, ...props }) => (
  <input
    {...props}
    value={value ?? ''}
    onChange={(e) => onChange(e.target.value)}
    className={`
      w-full rounded-md border border-gray-300 px-3 py-2
      focus:ring-2 focus:ring-blue-500 focus:outline-none
    `}
  />
)

const NativeNumberInput: React.FC<any> = ({ value, onChange, ...props }) => (
  <input
    {...props}
    type='number'
    value={value ?? ''}
    onChange={(e) => onChange(Number(e.target.value))}
    className={`
      w-full rounded-md border border-gray-300 px-3 py-2
      focus:ring-2 focus:ring-blue-500 focus:outline-none
    `}
  />
)

const NativeCheckbox: React.FC<any> = ({ value, onChange }) => (
  <label className='flex cursor-pointer items-center gap-2'>
    <input
      type='checkbox'
      checked={value ?? false}
      onChange={(e) => onChange(e.target.checked)}
      className={`
        h-4 w-4 rounded border-gray-300 text-blue-600
        focus:ring-blue-500
      `}
    />
  </label>
)

const NativeRadioGroup: React.FC<any> = ({
  value,
  onChange,
  options,
  name,
}) => (
  <div className='flex flex-col gap-2'>
    {options.map((option: string) => (
      <label key={option} className='flex cursor-pointer items-center gap-2'>
        <input
          type='radio'
          name={name}
          value={option}
          checked={value === option}
          onChange={(e) => onChange(e.target.value)}
          className={`
            h-4 w-4 border-gray-300 text-blue-600
            focus:ring-blue-500
          `}
        />
        <span>{option}</span>
      </label>
    ))}
  </div>
)

const NativeSelect: React.FC<any> = ({ value, onChange, options }) => (
  <select
    value={value ?? ''}
    onChange={(e) => onChange(e.target.value)}
    className={`
      w-full rounded-md border border-gray-300 px-3 py-2
      focus:ring-2 focus:ring-blue-500 focus:outline-none
    `}
  >
    <option value=''>请选择...</option>
    {options.map((option: string) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
)

const NativeMultiSelect: React.FC<any> = ({
  value = [],
  onChange,
  options,
}) => (
  <div className='flex flex-col gap-2 rounded-md border border-gray-300 p-3'>
    {options.map((option: string) => (
      <label key={option} className='flex cursor-pointer items-center gap-2'>
        <input
          type='checkbox'
          checked={value.includes(option)}
          onChange={(e) => {
            if (e.target.checked) {
              onChange([...value, option])
            } else {
              onChange(value.filter((v: string) => v !== option))
            }
          }}
          className={`
            h-4 w-4 rounded border-gray-300 text-blue-600
            focus:ring-blue-500
          `}
        />
        <span>{option}</span>
      </label>
    ))}
  </div>
)

// ============ 主组件 ============

export default function ZodV4Form<T extends ZodSchema>({
  schema,
  onSubmit,
  defaultValues = {},
  components = {},
  className = '',
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
    debugger
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

      <div className='mt-6 flex gap-2'>
        <Button type='submit'>提交</Button>
        <Button
          type='button'
          variant='outline'
          onClick={() => {
            setFormData(initialFormData)
            setErrors({})
          }}
        >
          重置
        </Button>
      </div>
    </form>
  )
}
