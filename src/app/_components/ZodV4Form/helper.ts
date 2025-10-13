/**
 * 从 JSON Schema 中提取默认值
 */
export function extractDefaultValues(jsonSchema: any): Record<string, any> {
  const defaults: Record<string, any> = {}

  if (jsonSchema.properties) {
    for (const [key, field] of Object.entries<any>(jsonSchema.properties)) {
      if (field.default !== undefined) {
        defaults[key] = field.default
      }
    }
  }
  return defaults
}
