'use client'

import React, { useCallback, useMemo, useState } from 'react'
import { z } from 'zod/v4'
import { extractDefaultValues } from './helper'
import {
  NativeResetButton,
  NativeSubmitButton,
  type TFieldJSONSchema,
} from './native'
import { builtinComponents, type TComponentMap } from './builtin-components'
import { ZodV4Field, type ZodV4FieldProps } from './ZodV4Field'

type ZodSchema = z.ZodObject<Record<string, z.ZodTypeAny>>

interface ZodV4FormProps<T extends ZodSchema> {
  schema: T
  onSubmit: (data: z.infer<T>) => void
  defaultValues?: Partial<z.infer<T>>
  components?: TComponentMap
  className?: string
  fieldClassName?: string

  renderFooter?: (props: { onReset: () => void }) => React.ReactNode
  renderFields?: (props: ZodV4FieldProps) => React.ReactNode
}
export { defineComponents } from './builtin-components'

export function ZodV4Form<T extends ZodSchema>(props: ZodV4FormProps<T>) {
  const {
    schema,
    onSubmit,
    defaultValues = {},
    className = '',
    fieldClassName = '',
    renderFooter = () => (
      <div className='flex justify-end gap-2'>
        <NativeSubmitButton />
        <NativeResetButton />
      </div>
    ),
    renderFields,
  } = props

  const components = useMemo(
    () => Object.assign(builtinComponents, props.components),
    [props.components],
  )

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

  const handleValidate = useCallback(
    (args: {
      result: z.ZodSafeParseResult<unknown>
      name?: string
      bypassCallback?: (data: any) => void
    }) => {
      const { name, result, bypassCallback } = args
      if (result.success) {
        setErrors({})
        bypassCallback?.(result.data)
      } else {
        const newErrors: Record<string, string> = {}
        result.error.issues.forEach((issue) => {
          const path = name || issue.path.join('.')
          newErrors[path] = issue.message
        })
        setErrors(newErrors)
      }
    },
    [setErrors],
  )

  const onValidate = (name: string, value: any) => {
    const fieldSchema = schema.shape[name]!

    const result = fieldSchema?.safeParse(value)
    handleValidate({ result, name })
  }

  // 表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const result = schema.safeParse(formData)
    handleValidate({
      result,
      bypassCallback: (data) => {
        onSubmit(data)
      },
    })
  }

  const handleReset = () => {
    setFormData(initialFormData)
    setErrors({})
  }

  const fields = useMemo(() => {
    return Object.entries(jsonSchema.properties || {})
  }, [jsonSchema])
  return (
    <form
      onReset={handleReset}
      onSubmit={handleSubmit}
      className={`
        mx-auto max-w-2xl space-y-4 p-6
        ${className}
      `}
    >
      {fields.map(([name, fieldJsonSchema]) => {
        const props = {
          name,
          fieldJsonSchema,
          components,
          value: formData[name],
          error: errors[name],
          updateField,
          isRequired: jsonSchema.required?.includes(name),
          onValidate,
          className: fieldClassName,
          key: name,
        }
        return renderFields ? renderFields(props) : <ZodV4Field {...props} />
      })}

      {fields.length > 0 && renderFooter({ onReset: handleReset })}
    </form>
  )
}
