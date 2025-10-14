import type { TComponentMap, ComponentName } from './extract-component'

/**
 * 从 JSON Schema 中提取默认值
 */
export function extractDefaultValues(jsonSchema: any): Record<string, any> {
  const defaults: Record<string, any> = {}

  if (!jsonSchema.properties) return defaults

  Object.entries(jsonSchema.properties).forEach(([key, schema]: [string, any]) => {
    if (schema.default !== undefined) {
      defaults[key] = schema.default
    }
  })

  return defaults
}

/**
 * 创建类型安全的 meta 配置
 * @example
 * ```ts
 * const components = defineComponentMap({
 *   fancyInput: FancyInputComponent,
 *   customSelect: CustomSelectComponent,
 * })
 * 
 * const schema = z.object({
 *   username: z.string().meta(
 *     createMeta(components, {
 *       component: 'fancyInput', // ✅ 自动补全
 *       description: '用户名',
 *     })
 *   ),
 * })
 * ```
 */
export function createMeta<C extends TComponentMap>(
  components: C,
  meta: {
    component?: ComponentName<C>
    label?: string
    description?: string
    placeholder?: string
    [key: string]: any
  },
) {
  return meta
}
