'use client'

import type { ISelectProps } from '.'
import { useState, useCallback } from 'react'

export function useSelect<T = string>(props: ISelectProps<T>) {
  const { defaultValue, onChange } = props

  const [value, setValue] = useState<T | undefined>(defaultValue)

  const handleSelected = useCallback(
    (value: T) => {
      setValue(value)
      onChange?.(value)
    },
    [onChange],
  )

  return {
    ...props,
    value,
    onChange: handleSelected,
  }
}
