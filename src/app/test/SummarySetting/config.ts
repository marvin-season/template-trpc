export type TOption = {
  label: string
  value: string | number
  premium?: boolean
  equals?: string
}

export enum EConfigKey {
  SUMMARY_TYPE = 'summaryType',
  DEPTH = 'depth',
  LENGTH = 'length',
  TONE = 'tone',
}

const summaryTypeOptions: TOption[] = [
  { label: 'Paragraph', value: 'paragraph' },
  { label: 'Bullet Point', value: 'bullet' },
]

const depthOptions: TOption[] = [
  { label: 'Quick', value: 0, equals: 'quick' },
  { label: 'Medium', value: 1, equals: 'medium' },
  { label: 'Deep', value: 2, premium: true, equals: 'deep' },
]

const lengthOptions: TOption[] = [
  { label: 'Short', value: 0, equals: 'short' },
  { label: 'Medium', value: 1, equals: 'medium' },
  { label: 'Long', value: 2, premium: true, equals: 'long' },
  { label: 'Very Long', value: 3, premium: true, equals: 'very long' },
]

const toneOptions: TOption[] = [
  { label: 'Formal', value: 'formal' },
  { label: 'Friendly', value: 'friendly' },
  { label: 'Professional', value: 'professional' },
  { label: 'Concise', value: 'concise' },
]

const config = {
  [EConfigKey.TONE]: toneOptions,
  [EConfigKey.DEPTH]: depthOptions,
  [EConfigKey.LENGTH]: lengthOptions,
  [EConfigKey.SUMMARY_TYPE]: summaryTypeOptions,
}
export default config
