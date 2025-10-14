import {
  NativeInput,
  type INativeInputProps,
  type TInputType,
  type TFieldJSONSchema,
} from './native'

export type NativeComponent = React.ComponentType<INativeInputProps>

// 定义基础的类型级别映射
export type BaseComponentMap = Partial<Record<TInputType, NativeComponent>>

// 扩展类型：支持自定义组件名称的类型推断
export type TComponentMap<T extends Record<string, NativeComponent> = {}> =
  BaseComponentMap & T

// 从 TComponentMap 中提取组件名称的联合类型
export type ComponentName<T extends TComponentMap> = keyof T & string

// 优化 TFieldJSONSchema，支持泛型约束
export type TFieldJSONSchemaWithComponent<
  T extends TComponentMap = TComponentMap<{}>,
> = TFieldJSONSchema & {
  component?: ComponentName<T>
}

interface ExtractComponentParams {
  <T extends TComponentMap>(params: {
    fieldJsonSchema: TFieldJSONSchemaWithComponent<T>
    components: T
  }): {
    component: T[keyof T] | typeof NativeInput
    props?: INativeInputProps
  }
}

export const extractComponent: ExtractComponentParams = (params) => {
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

// 帮助函数：定义组件映射并获得完整的类型推断
export function defineComponentMap<T extends Record<string, NativeComponent>>(
  components: T,
): TComponentMap<T> {
  return components as TComponentMap<T>
}
