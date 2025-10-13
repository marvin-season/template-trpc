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
  const { component } = fieldJsonSchema
  // 如果 meta 中指定了 component，优先使用自定义组件
  if (component && components[component]) {
    const CustomComponent = components[component]
    return { component: CustomComponent, props: { fieldJsonSchema } }
  }

  return {
    component: NativeInput,
    props: {
      fieldJsonSchema,
    },
  }
}
