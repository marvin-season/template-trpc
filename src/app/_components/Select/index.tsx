import {
  Select as SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export interface ISelectProps<T = string> {
  placeholder?: T
  defaultValue?: T
  options: {
    label: string
    value: T
  }[]
  onChange?: (value: T) => void
}

export function Select(props: ISelectProps<string>) {
  const { options, onChange, placeholder, defaultValue } = props

  return (
    <SelectRoot
      onValueChange={(value) => {
        onChange?.(value)
      }}
      defaultValue={defaultValue}
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  )
}

export * from './useSelect'
