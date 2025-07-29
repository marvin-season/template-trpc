import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

interface ISelectProps {
  placeholder?: string
  defaultValue?: string
  options: {
    label: string
    value: string
  }[]
  onSelected?: (value: string) => void
}

export default function useSelect(props: ISelectProps) {
  const { options, onSelected, placeholder, defaultValue } = props

  const [value, setValue] = useState(defaultValue)
  const select = <Select onValueChange={value => {
    setValue(value)
    onSelected?.(value)
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
  </Select>
  return {
    select,
    value
  }
}