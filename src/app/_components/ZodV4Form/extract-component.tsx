import { NativeInput, type TFieldJSONSchema } from './native'
import type { TComponentMap } from './builtin-components'

interface ExtractComponentParams<T> {
  (params: { fieldJsonSchema: TFieldJSONSchema; components: T }): {
    component: T[keyof T]
    isCustom: boolean
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
    return {
      component: CustomComponent,
      isCustom: true,
    }
  }

  return {
    component: NativeInput,
    isCustom: false,
  }
}
