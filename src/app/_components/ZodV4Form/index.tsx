'use client'

import React, { useMemo, useState } from 'react'
import { z } from 'zod/v4'
import { extractDefaultValues } from './helper'
import {
  NativeResetButton,
  NativeSubmitButton,
  type TFieldJSONSchema,
} from './native'
import { builtinComponents, type TComponentMap } from './builtin-components'
import { ZodV4Field } from './ZodV4Field'

type ZodSchema = z.ZodTypeAny

interface ZodV4FormProps<T extends ZodSchema> {
  schema: T
  onSubmit: (data: z.infer<T>) => void
  defaultValues?: Partial<z.infer<T>>
  components?: TComponentMap
  className?: string
  fieldClassName?: string

  renderFooter?: (props: {
    onReset: (resetFunc: () => void) => void
  }) => React.ReactNode
}

export default function ZodV4Form<T extends ZodSchema>(
  props: ZodV4FormProps<T>,
) {
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

  const handleReset = () => {
    setFormData(initialFormData)
    setErrors({})
  }

  return (
    <form
      onReset={handleReset}
      onSubmit={handleSubmit}
      className={`
        mx-auto max-w-2xl space-y-4 p-6
        ${className}
      `}
    >
      {Object.entries(jsonSchema.properties || {}).map(
        ([name, fieldJsonSchema]) => (
          <ZodV4Field
            key={name}
            name={name}
            className={fieldClassName}
            fieldJsonSchema={fieldJsonSchema as TFieldJSONSchema}
            components={components}
            value={formData[name]}
            error={errors[name]}
            updateField={updateField}
            isRequired={jsonSchema.required?.includes(name)}
          />
        ),
      )}

      {renderFooter({ onReset: handleReset })}
    </form>
  )
}
