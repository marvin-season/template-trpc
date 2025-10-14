import {
  extractComponent,
  type TComponentMap,
  type TFieldJSONSchemaWithComponent,
} from '@/app/_components/ZodV4Form/extract-component'

interface ZodV4FieldProps<T = string, C extends TComponentMap = TComponentMap> {
  name: string
  fieldJsonSchema: TFieldJSONSchemaWithComponent<C>
  components: C
  value?: T
  error?: string
  isRequired?: boolean
  updateField: (name: string, value: T) => void
}

export function ZodV4Field<
  T = string,
  C extends TComponentMap = TComponentMap,
>({
  name,
  fieldJsonSchema,
  components,
  isRequired,
  value,
  error,
  updateField,
}: ZodV4FieldProps<T, C>) {
  // 根据类型渲染对应的组件
  const { component: FieldComponent, props } = extractComponent({
    fieldJsonSchema,
    components,
  })

  if (!FieldComponent) return null

  const { label, description } = fieldJsonSchema

  // 将 FieldComponent 转换为 React.ComponentType 以避免类型问题
  const Component = FieldComponent as React.ComponentType<any>

  return (
    <div key={name} className='mb-4'>
      <label className='mb-2 block font-medium text-gray-700'>
        {label || name}
        {isRequired && <span className='ml-1 text-red-500'>*</span>}
      </label>

      {description && (
        <p className='mb-2 text-sm text-gray-500'>{description}</p>
      )}

      <Component
        name={name}
        value={value}
        error={error}
        onChange={(newValue: T) => updateField(name, newValue)}
        {...props}
      />

      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
    </div>
  )
}
