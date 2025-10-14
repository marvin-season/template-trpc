import { Input } from 'antd'
import {
  NativeCheckbox,
  NativeSelect,
  type INativeInputProps,
  type NativeComponent,
} from './native'
export type TComponentType = 'string' | 'checkbox' | 'radio' | 'select'

export type TComponentMap<T = any> = Record<string, NativeComponent<T>> &
  Partial<Record<TComponentType, NativeComponent<T>>>

export function defineComponents<T extends TComponentMap>(components: T) {
  return components as T
}

export const builtinComponents = defineComponents({
  // 类型级别的映射
  string: (props: INativeInputProps<string>) => (
    <Input
      value={props.value}
      onChange={(e) => props.onChange?.(e.target.value)}
    />
  ),
  select: (props: INativeInputProps<string>) => {
    const { fieldJsonSchema, ...restProps } = props
    return <NativeSelect {...restProps} options={fieldJsonSchema.enum} />
  },
  checkbox: NativeCheckbox,
})
