import { extractComponent } from './extract-component'
import { builtinComponents, type TComponentMap } from './builtin-components'
import type { INativeInputProps } from './native'
import { cn } from '@/lib/utils'

type ZodV4FieldProps<T = string> = INativeInputProps<T> & {
  components: TComponentMap
  isRequired?: boolean
  name: string
  updateField: (name: string, value: string) => void
  className?: string
}

export function ZodV4Field({
  name,
  fieldJsonSchema,
  components,
  isRequired,
  value,
  error,
  className,
  updateField,
}: ZodV4FieldProps) {
  // 根据类型渲染对应的组件
  const { component: FieldComponent, isCustom } = extractComponent({
    fieldJsonSchema,
    components,
  })

  if (!FieldComponent) return null

  const { label, description } = fieldJsonSchema

  if (isCustom) {
    return (
      <FieldComponent
        name={name}
        label={label || name}
        description={description}
        value={value}
        error={error}
        isRequired={isRequired}
        onChange={(newValue) => updateField(name, newValue)}
        fieldJsonSchema={fieldJsonSchema}
      />
    )
  }

  return (
    <div key={name} className={cn('mb-4', className)}>
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
        onChange={(newValue) => updateField(name, newValue)}
        fieldJsonSchema={fieldJsonSchema}
      />

      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
    </div>
  )
}
