import {
  extractComponent,
  type TComponentMap,
} from '@/app/_components/ZodV4Form/extract-component'
import type { TFieldJSONSchema } from '@/app/_components/ZodV4Form/native'

interface ZodV4FieldProps<T = string> {
  name: string
  fieldJsonSchema: TFieldJSONSchema
  components: TComponentMap
  value?: T
  error?: string
  isRequired?: boolean
  updateField: (name: string, value: T) => void
}

export function ZodV4Field({
  name,
  fieldJsonSchema,
  components,
  isRequired,
  value,
  error,
  updateField,
}: ZodV4FieldProps) {
  // 根据类型渲染对应的组件
  const { component: FieldComponent, props } = extractComponent({
    fieldJsonSchema,
    components,
  })

  if (!FieldComponent) return null

  const { label, description } = fieldJsonSchema

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
        onChange={(newValue) => updateField(name, newValue)}
        {...props}
      />

      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
    </div>
  )
}
