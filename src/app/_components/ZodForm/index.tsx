'use client'

import React, { useState } from 'react'
import type { FormEvent } from 'react'
import { z, ZodType, ZodObject } from 'zod'
import type { ZodRawShape } from 'zod'
import { Button } from '@/components/ui/button'

// 字段元数据类型
interface FieldMetadata {
  name: string
  type: string
  label: string
  placeholder?: string
  description?: string
  required: boolean
  defaultValue?: any
  options?: Array<{ label: string; value: any }>
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
}

// ZodForm 组件属性
interface ZodFormProps<T extends ZodRawShape> {
  schema: ZodObject<T>
  onSubmit: (data: z.infer<ZodObject<T>>) => void | Promise<void>
  defaultValues?: Partial<z.infer<ZodObject<T>>>
  submitText?: string
  resetText?: string
  className?: string
  fieldClassName?: string
  showReset?: boolean
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
  let defaultValue: any
  let options: Array<{ label: string; value: any }> | undefined
  let min: number | undefined
  let max: number | undefined
  let minLength: number | undefined
  let maxLength: number | undefined

  // 获取类型定义
  let currentType: any = zodType

  // 处理 optional 和 nullable
  while (currentType._def) {
    if (
      currentType._def.typeName === 'ZodOptional' ||
      currentType._def.typeName === 'ZodNullable'
    ) {
      required = false
      currentType = currentType._def.innerType
    } else if (currentType._def.typeName === 'ZodDefault') {
      defaultValue = currentType._def.defaultValue()
      currentType = currentType._def.innerType
    } else {
      break
    }
  }

  // 根据类型设置字段类型
  const typeName = currentType._def?.typeName

  switch (typeName) {
    case 'ZodString':
      type = 'text'
      // 检查是否是 email
      if (currentType._def.checks) {
        for (const check of currentType._def.checks) {
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
      type = 'number'
      if (currentType._def.checks) {
        for (const check of currentType._def.checks) {
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
      options = currentType._def.values.map((val: any) => ({
        label: String(val),
        value: val,
      }))
      break
    case 'ZodNativeEnum':
      type = 'select'
      const enumValues = currentType._def.values
      options = Object.keys(enumValues)
        .filter((key) => isNaN(Number(key)))
        .map((key) => ({
          label: key,
          value: enumValues[key],
        }))
      break
    default:
      type = 'text'
  }

  // 获取描述信息
  if (currentType.description) {
    description = currentType.description
  }

  return {
    name,
    type,
    label:
      name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1'),
    placeholder: `请输入 ${name}`,
    description,
    required,
    defaultValue,
    options,
    min,
    max,
    minLength,
    maxLength,
  }
}

// 渲染单个字段
function renderField(
  field: FieldMetadata,
  value: any,
  error: string | null,
  onChange: (name: string, value: any) => void,
) {
  const commonProps = {
    id: field.name,
    name: field.name,
    required: field.required,
  }

  const fieldValue = value ?? field.defaultValue ?? ''

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
  defaultValues = {},
  submitText = '提交',
  resetText = '重置',
  className = '',
  fieldClassName = '',
  showReset = true,
}: ZodFormProps<T>) {
  // 解析 schema
  const fields = parseZodSchema(schema)

  // 初始化表单数据的辅助函数
  const getInitialFormData = () => {
    const initial: Record<string, any> = {}
    fields.forEach((field) => {
      // 优先使用 props 中的 defaultValues，其次使用 schema 中的默认值
      if (defaultValues[field.name] !== undefined) {
        initial[field.name] = defaultValues[field.name]
      } else if (field.defaultValue !== undefined) {
        initial[field.name] = field.defaultValue
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
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    setIsSubmitting(true)

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
        result.error.errors.forEach((err) => {
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
      setIsSubmitting(false)
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

          {renderField(
            field,
            formData[field.name],
            errors[field.name] || null,
            handleFieldChange,
          )}

          {field.description && (
            <p className='text-sm text-gray-500'>{field.description}</p>
          )}

          {errors[field.name] && (
            <p className='text-sm text-red-600'>{errors[field.name]}</p>
          )}
        </div>
      ))}

      <div className='flex gap-4'>
        <Button
          type='submit'
          disabled={isSubmitting}
          className={`
            rounded-md bg-blue-600 px-4 py-2 text-white
            hover:bg-blue-700
            disabled:cursor-not-allowed disabled:bg-gray-400
          `}
        >
          {isSubmitting ? '提交中...' : submitText}
        </Button>

        {showReset && (
          <Button
            type='button'
            onClick={handleReset}
            disabled={isSubmitting}
            className={`
              rounded-md bg-gray-200 px-4 py-2 text-gray-700
              hover:bg-gray-300
              disabled:cursor-not-allowed
            `}
          >
            {resetText}
          </Button>
        )}
      </div>
    </form>
  )
}
