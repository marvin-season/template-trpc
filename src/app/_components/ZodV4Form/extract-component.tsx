import {
  NativeCheckbox,
  NativeInput,
  type INativeInputProps,
  NativeRadioGroup,
  NativeSelect,
  type TInputType,
  type TFieldJSONSchema,
} from './native'
export type NativeComponent = React.ComponentType<INativeInputProps>
export type TComponentMap = Record<string, NativeComponent> &
  Partial<Record<TInputType, NativeComponent>>
interface ExtractComponentParams<T> {
  (params: { fieldJsonSchema: TFieldJSONSchema; components: T }): {
    component: T[keyof T] | null
    props?: INativeInputProps
  }
}

export const extractComponent: ExtractComponentParams<TComponentMap> = (
  params,
) => {
  const { fieldJsonSchema, components } = params

  // 从 meta 中获取自定义类型，优先级高于 JSON Schema 的 type
  const { type, component, placeholder } = fieldJsonSchema
  // 如果 meta 中指定了 component，优先使用自定义组件
  if (component && components[component]) {
    const CustomComponent = components[component]
    return { component: CustomComponent, props: { fieldJsonSchema } }
  }

  // 处理数组类型
  if (type === 'select') {
    const enumOptions = fieldJsonSchema.enum || []

    if (enumOptions.length <= 3) {
      return { component: NativeRadioGroup, props: { options: enumOptions } }
    } else {
      return { component: NativeSelect, props: { options: enumOptions } }
    }
  } else if (type === 'boolean') {
    // 检查是否使用自定义组件
    const BoolComponent = components['radio']
    if (BoolComponent) {
      return { component: BoolComponent }
    } else {
      return { component: NativeCheckbox }
    }
  } else if (type === 'number' || type === 'integer') {
    const NumComponent = components['number']

    const props = {
      type: type,
      min: fieldJsonSchema.minimum,
      max: fieldJsonSchema.maximum,
    }
    if (NumComponent) {
      return {
        component: NumComponent,
        props,
      }
    } else {
      return {
        component: NativeInput,
        props,
      }
    }
  } else if (type === 'string') {
    const StrComponent = components['string']
    const props = {
      type: type,
      minLength: fieldJsonSchema.minLength,
      maxLength: fieldJsonSchema.maxLength,
      placeholder: placeholder,
    }
    if (StrComponent) {
      return {
        component: StrComponent,
        props,
      }
    } else {
      return {
        component: NativeInput,
        props,
      }
    }
  }
  return {
    component: null,
    props: {},
  }
}
