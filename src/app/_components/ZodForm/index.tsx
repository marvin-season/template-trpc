'use client'

import React, { useState } from 'react'
import type { FormEvent } from 'react'
import { z, ZodObject, toJSONSchema } from 'zod/v4'
import type { ZodRawShape, ZodType } from 'zod/v4'

// JSON Schema 类型定义
type JSONSchema = {
  type?:
    | 'object'
    | 'array'
    | 'string'
    | 'number'
    | 'boolean'
    | 'null'
    | 'integer'
  properties?: Record<string, any>
  required?: string[]
  default?: any
  description?: string
  minimum?: number
  maximum?: number
  minLength?: number
  maxLength?: number
  enum?: Array<string | number | boolean | null>
  format?: string
  [key: string]: any
}

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

// 使用 JSON Schema 解析 Zod Schema 获取字段元数据
function parseZodSchema(schema: ZodObject<any>): FieldMetadata[] {
  // 将 Zod Schema 转换为 JSON Schema
  const jsonSchema = toJSONSchema(schema) as JSONSchema

  if (jsonSchema.type !== 'object' || !jsonSchema.properties) {
    return []
  }

  const fields: FieldMetadata[] = []
  const shape = schema.shape
  const required = jsonSchema.required || []

  for (const [fieldName, fieldSchema] of Object.entries(
    jsonSchema.properties,
  )) {
    const zodType = shape[fieldName]
    const field = parseJSONSchemaField(
      fieldName,
      fieldSchema as JSONSchema,
      required.includes(fieldName),
      zodType,
    )
    if (field) {
      fields.push(field)
    }
  }
  console.log('[ZodForm] JSON Schema:', jsonSchema)
  console.log('[ZodForm] Fields:', fields)
  return fields
}

// 从 JSON Schema 解析字段元数据
function parseJSONSchemaField(
  name: string,
  jsonSchema: JSONSchema,
  isRequired: boolean,
  zodType: any,
): FieldMetadata | null {
  let type = 'text'
  let options: Array<{ label: string; value: any }> | undefined

  // 根据 JSON Schema type 设置字段类型
  switch (jsonSchema.type) {
    case 'string':
      // 检查 format 来确定具体类型
      if (jsonSchema.format === 'email') {
        type = 'email'
      } else if (jsonSchema.format === 'uri' || jsonSchema.format === 'url') {
        type = 'url'
      } else if (jsonSchema.format === 'date') {
        type = 'date'
      } else if (jsonSchema.format === 'date-time') {
        type = 'datetime-local'
      } else {
        type = 'text'
      }
      break
    case 'number':
    case 'integer':
      type = 'number'
      break
    case 'boolean':
      type = 'checkbox'
      break
    case 'array':
      // 数组类型 - 检查子项是否有 enum
      const items = jsonSchema.items as JSONSchema | undefined
      if (items?.enum && items.enum.length > 0) {
        // 数组 + enum = 多选
        type = 'multiselect'
        options = items.enum.map((val: any) => ({
          label: String(val),
          value: val,
        }))
      } else {
        // 普通数组，暂时使用 text
        type = 'text'
      }
      break
    default:
      type = 'text'
  }

  // 如果有 enum（非数组），使用 select
  if (
    jsonSchema.type !== 'array' &&
    jsonSchema.enum &&
    jsonSchema.enum.length > 0
  ) {
    type = 'select'
    options = jsonSchema.enum.map((val: any) => ({
      label: String(val),
      value: val,
    }))
  }

  // 从 Zod 类型获取 metadata（包含自定义组件信息）
  const metadata = zodType?.meta?.()

  return {
    name,
    type,
    label:
      name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1'),
    placeholder: `请输入 ${name}`,
    description: jsonSchema.description,
    required: isRequired,
    options,
    min: jsonSchema.minimum,
    max: jsonSchema.maximum,
    minLength: jsonSchema.minLength,
    maxLength: jsonSchema.maxLength,
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

    case 'multiselect':
      // 多选 - 使用 checkbox group
      const selectedValues = Array.isArray(value) ? value : []
      return (
        <div className='space-y-2'>
          {field.options?.map((option) => {
            const isChecked = selectedValues.includes(option.value)
            return (
              <div key={option.value} className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  id={`${field.name}-${option.value}`}
                  checked={isChecked}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...selectedValues, option.value]
                      : selectedValues.filter((v) => v !== option.value)
                    onChange(field.name, newValue)
                  }}
                  className={`
                    h-4 w-4 rounded border-gray-300 text-blue-600
                    focus:ring-blue-500
                  `}
                />
                <label
                  htmlFor={`${field.name}-${option.value}`}
                  className='text-sm text-gray-700'
                >
                  {option.label}
                </label>
              </div>
            )
          })}
        </div>
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

    // 使用 JSON Schema 获取默认值
    const jsonSchema = toJSONSchema(schema) as JSONSchema
    const properties = jsonSchema.properties || {}

    fields.forEach((field) => {
      const fieldSchema = properties[field.name] as JSONSchema

      // 从 JSON Schema 中获取默认值
      if (fieldSchema?.default !== undefined) {
        initial[field.name] = fieldSchema.default
      } else {
        // 根据字段类型设置合适的默认值
        if (field.type === 'checkbox') {
          initial[field.name] = false
        } else if (field.type === 'multiselect') {
          initial[field.name] = [] // 多选默认为空数组
        } else if (field.type === 'number') {
          initial[field.name] = ''
        } else {
          initial[field.name] = ''
        }
      }
    })
    console.log('[ZodForm] 初始化表单数据:', initial)
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
        } else if (field.type === 'multiselect') {
          // 确保多选值是数组
          value = Array.isArray(value) ? value : []
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
