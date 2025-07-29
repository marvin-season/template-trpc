import {
  Select as SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCallback, useState } from "react"

interface ISelectProps<T = string> {
  placeholder?: T
  defaultValue?: T
  options: {
    label: string
    value: T
  }[]
  onChange?: (value: T) => void
}

export default function useSelect<T = string>(props: ISelectProps<T>) {
  const { defaultValue, onChange } = props

  const [value, setValue] = useState<T | undefined>(defaultValue)

  const handleSelected = useCallback((value: T) => {
    setValue(value)
    onChange?.(value)
  }, [onChange])

  return {
    ...props,
    value,
    onChange: handleSelected,
  }
}

export function Select(props: ISelectProps<string>) {
  const { options, onChange, placeholder, defaultValue } = props

  return <SelectRoot onValueChange={value => {
    onChange?.(value)
  }} defaultValue={defaultValue}>
    <SelectTrigger className="w-[180px]">
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
}