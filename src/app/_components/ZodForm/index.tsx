'use client'

import React, { useState } from 'react'
import type { FormEvent } from 'react'
import { z, ZodType, ZodObject } from 'zod/v4'
import type { ZodRawShape } from 'zod/v4'
import { Button } from '@/components/ui/button'

// 字段元数据配置（用于 .meta() 方法）
export interface FieldMeta {
  component?: string
  description?: string
  props?: Record<string, any>
}

// 字段元数据类型
interface FieldMetadata {
  name: string
  type: string
  label: string
  placeholder?: string
  description?: string
  required: boolean
  options?: Array<{ label: string; value: any }>
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  // 自定义元数据（从 Zod description 中解析）
  metadata?: Record<string, any>
}

// 自定义字段渲染器的 Props
export interface CustomFieldProps {
  field: FieldMetadata
  value: any
  error: string | null
  onChange: (value: any) => void
  required: boolean
}

// 自定义组件类型
export type CustomFieldComponent = React.ComponentType<CustomFieldProps>

// ZodForm 组件属性
interface ZodFormProps<T extends ZodRawShape> {
  schema: ZodObject<T>
  onSubmit: (data: z.infer<ZodObject<T>>) => void | Promise<void>
  className?: string
  fieldClassName?: string
  // 自定义组件注册表
  customComponents?: Record<string, CustomFieldComponent>
  // 完全自定义字段渲染
  renderField?: (
    field: FieldMetadata,
    value: any,
    error: string | null,
    onChange: (name: string, value: any) => void,
  ) => React.ReactNode

  renderFooter?: ({
    handleReset,
  }: {
    handleReset: () => void
  }) => React.ReactNode
}

// 从 Zod Schema 中提取字段的默认值
function extractDefaultValue(zodType: ZodType): any | undefined {
  let currentType: any = zodType

  // 遍历类型包装器，寻找 ZodDefault
  while (currentType) {
    const def = currentType._def || currentType.def
    if (!def) break

    // 检查构造函数名称来判断类型
    const constructorName = currentType.constructor?.name

    if (constructorName === 'ZodDefault') {
      // 找到默认值
      const defaultValue =
        typeof def.defaultValue === 'function'
          ? def.defaultValue()
          : def.defaultValue
      return defaultValue
    } else if (
      constructorName === 'ZodOptional' ||
      constructorName === 'ZodNullable'
    ) {
      // 继续向内查找
      currentType = def.innerType
    } else {
      // 其他类型，停止查找
      break
    }
  }

  return undefined
}

// 解析 Zod Schema 获取字段元数据
function parseZodSchema(schema: ZodObject<any>): FieldMetadata[] {
  const shape = schema.shape
  const fields: FieldMetadata[] = []

  for (const [key, zodType] of Object.entries(shape)) {
    const field = parseZodType(key, zodType as ZodType)
    if (field) {
      fields.push(field)
    }
  }

  return fields
}

// 解析单个 Zod 类型
function parseZodType(name: string, zodType: ZodType): FieldMetadata | null {
  let type = 'text'
  let required = true
  let description: string | undefined
  let options: Array<{ label: string; value: any }> | undefined
  let min: number | undefined
  let max: number | undefined
  let minLength: number | undefined
  let maxLength: number | undefined

  // 获取类型定义
  let currentType: any = zodType

  // 处理 optional、nullable 和 default
  while (currentType) {
    const def = currentType._def || currentType.def
    if (!def) break

    const constructorName = currentType.constructor?.name

    if (
      constructorName === 'ZodOptional' ||
      constructorName === 'ZodNullable'
    ) {
      required = false
      currentType = def.innerType
    } else if (constructorName === 'ZodDefault') {
      // 跳过 default，继续解析内部类型
      currentType = def.innerType
    } else {
      break
    }
  }

  // 根据类型设置字段类型
  const constructorName = currentType?.constructor?.name
  const def = currentType?._def || currentType?.def

  switch (constructorName) {
    case 'ZodString':
      type = 'text'
      // 检查是否是 email
      if (def?.checks) {
        for (const check of def.checks) {
          if (check.kind === 'email') {
            type = 'email'
          } else if (check.kind === 'url') {
            type = 'url'
          } else if (check.kind === 'min') {
            minLength = check.value
          } else if (check.kind === 'max') {
            maxLength = check.value
          }
        }
      }
      break
    case 'ZodNumber':
    case 'ZodInt':
    case 'ZodFloat32':
    case 'ZodFloat64':
    case 'ZodInt32':
    case 'ZodUInt32':
      type = 'number'
      if (def?.checks) {
        for (const check of def.checks) {
          if (check.kind === 'min') {
            min = check.value
          } else if (check.kind === 'max') {
            max = check.value
          } else if (check.kind === 'int') {
            type = 'number'
          }
        }
      }
      break
    case 'ZodBoolean':
      type = 'checkbox'
      break
    case 'ZodDate':
      type = 'date'
      break
    case 'ZodEnum':
      type = 'select'
      options = def?.values?.map((val: any) => ({
        label: String(val),
        value: val,
      }))
      break
    case 'ZodNativeEnum':
      type = 'select'
      const enumValues = def?.values
      if (enumValues) {
        options = Object.keys(enumValues)
          .filter((key) => isNaN(Number(key)))
          .map((key) => ({
            label: key,
            value: enumValues[key],
          }))
      }
      break
    default:
      type = 'text'
  }

  // 从原始类型获取 metadata
  const metadata = zodType.meta?.()
  console.log(`[ZodForm] 字段 "${name}" 的 metadata:`, metadata)

  return {
    name,
    type,
    label:
      name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1'),
    placeholder: `请输入 ${name}`,
    description,
    required,
    options,
    min,
    max,
    minLength,
    maxLength,
    metadata,
  }
}

// 渲染单个字段
function renderField(
  field: FieldMetadata,
  value: any,
  error: string | null,
  onChange: (name: string, value: any) => void,
  customComponents?: Record<string, CustomFieldComponent>,
) {
  // 如果字段指定了自定义组件，使用自定义组件渲染
  if (field.metadata?.component && customComponents) {
    const CustomComponent = customComponents[field.metadata?.component]
    if (CustomComponent) {
      return (
        <CustomComponent
          field={field}
          value={value}
          error={error}
          onChange={(newValue: any) => onChange(field.name, newValue)}
          required={field.required}
        />
      )
    } else {
      console.warn(`[ZodForm] 自定义组件 "${field.metadata.component}" 未注册`)
    }
  }

  // 默认渲染逻辑
  const commonProps = {
    id: field.name,
    name: field.name,
    required: field.required,
  }

  const fieldValue = value ?? ''

  switch (field.type) {
    case 'checkbox':
      return (
        <div className='flex items-center space-x-2'>
          <input
            {...commonProps}
            type='checkbox'
            checked={fieldValue}
            onChange={(e) => onChange(field.name, e.target.checked)}
            className={`
              h-4 w-4 rounded border-gray-300 text-blue-600
              focus:ring-blue-500
            `}
          />
          <label
            htmlFor={field.name}
            className='text-sm font-medium text-gray-700'
          >
            {field.label}
          </label>
        </div>
      )

    case 'select':
      return (
        <select
          {...commonProps}
          value={fieldValue}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={`
            w-full rounded-md border border-gray-300 px-3 py-2
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
            focus:outline-none
          `}
        >
          <option value=''>请选择</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )

    case 'number':
      return (
        <input
          {...commonProps}
          type='number'
          value={fieldValue}
          min={field.min}
          max={field.max}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.name, e.target.valueAsNumber || '')}
          className={`
            w-full rounded-md border border-gray-300 px-3 py-2
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
            focus:outline-none
          `}
        />
      )

    case 'date':
      return (
        <input
          {...commonProps}
          type='date'
          value={fieldValue}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={`
            w-full rounded-md border border-gray-300 px-3 py-2
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
            focus:outline-none
          `}
        />
      )

    case 'email':
    case 'url':
    case 'text':
    default:
      return (
        <input
          {...commonProps}
          type={field.type}
          value={fieldValue}
          placeholder={field.placeholder}
          minLength={field.minLength}
          maxLength={field.maxLength}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={`
            w-full rounded-md border border-gray-300 px-3 py-2
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
            focus:outline-none
          `}
        />
      )
  }
}

// ZodForm 主组件
export function ZodForm<T extends ZodRawShape>({
  schema,
  onSubmit,
  className = '',
  fieldClassName = '',
  customComponents,
  renderField: customRenderField,
  renderFooter = () => <button type='submit'></button>,
}: ZodFormProps<T>) {
  // 解析 schema
  const fields = parseZodSchema(schema)

  // 初始化表单数据的辅助函数
  const getInitialFormData = () => {
    const initial: Record<string, any> = {}
    const shape = schema.shape

    fields.forEach((field) => {
      // 从 schema 中提取默认值
      const zodType = shape[field.name] as ZodType
      const schemaDefaultValue = extractDefaultValue(zodType)

      if (schemaDefaultValue !== undefined) {
        initial[field.name] = schemaDefaultValue
      } else {
        // 根据字段类型设置合适的默认值
        if (field.type === 'checkbox') {
          initial[field.name] = false
        } else if (field.type === 'number') {
          initial[field.name] = ''
        } else {
          initial[field.name] = ''
        }
      }
    })
    return initial
  }

  // 表单状态
  const [formData, setFormData] =
    useState<Record<string, any>>(getInitialFormData)

  const [errors, setErrors] = useState<Record<string, string>>({})

  // 处理字段变化
  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    // 清除该字段的错误
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // 处理表单提交
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})

    try {
      // 数据类型转换
      const processedData: Record<string, any> = {}
      fields.forEach((field) => {
        let value = formData[field.name]

        // 类型转换
        if (field.type === 'number' && value !== '') {
          value = Number(value)
        } else if (field.type === 'checkbox') {
          value = Boolean(value)
        } else if (field.type === 'date' && value) {
          value = new Date(value)
        }

        processedData[field.name] = value
      })

      // Zod 验证
      const result = schema.safeParse(processedData)

      if (!result.success) {
        // 显示验证错误
        const newErrors: Record<string, string> = {}
        result.error.issues.forEach((err: any) => {
          const path = err.path.join('.')
          newErrors[path] = err.message
        })
        setErrors(newErrors)
      } else {
        // 验证成功，调用 onSubmit
        await onSubmit(result.data)
      }
    } catch (error) {
      console.error('表单提交错误:', error)
    } finally {
    }
  }

  // 重置表单
  const handleReset = () => {
    setFormData(getInitialFormData())
    setErrors({})
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        space-y-6
        ${className}
      `}
    >
      {fields.map((field) => (
        <div
          key={field.name}
          className={`
            space-y-2
            ${fieldClassName}
          `}
        >
          {field.type !== 'checkbox' && (
            <label
              htmlFor={field.name}
              className='block text-sm font-medium text-gray-700'
            >
              {field.label}
              {field.required && <span className='ml-1 text-red-500'>*</span>}
            </label>
          )}

          {customRenderField
            ? customRenderField(
                field,
                formData[field.name],
                errors[field.name] || null,
                handleFieldChange,
              )
            : renderField(
                field,
                formData[field.name],
                errors[field.name] || null,
                handleFieldChange,
                customComponents,
              )}

          {field.description && (
            <p className='text-sm text-gray-500'>{field.description}</p>
          )}

          {errors[field.name] && (
            <p className='text-sm text-red-600'>{errors[field.name]}</p>
          )}
        </div>
      ))}
      {renderFooter({ handleReset })}
    </form>
  )
}
