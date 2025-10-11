import { ConfigProvider, Slider } from 'antd'
import type { ComponentProps, CSSProperties } from 'react'
import { useMemo } from 'react'
import type { TOption } from '../SummarySetting/config'

export type SummarySliderProps = ComponentProps<typeof Slider>

export function SummarySlider(
  props: SummarySliderProps & {
    options: Array<TOption>
  },
) {
  const { options, ...restProps } = props

  const marks = useMemo(() => {
    if (restProps.marks) {
      return restProps.marks
    }
    return options.reduce(
      (acc, option, index) => {
        acc[index] = {
          style: {
            marginLeft: option.premium ? '-16px' : '16px',
          },
          label: option.label,
        }
        return acc
      },
      {} as Exclude<SummarySliderProps['marks'], undefined>,
    )
  }, [options])

  const { min, max, step } = useMemo(() => {
    if (!options) {
      return {}
    }
    return {
      min: options[0]?.value as number,
      max: options[options.length - 1]?.value as number,
      step: 1,
    }
  }, [options])

  return (
    <ConfigProvider
      theme={{
        components: {
          Slider: {
            dotActiveBorderColor: '#10B981',
            handleColor: '#10B981',
            handleActiveColor: '#10B981',
          },
        },
      }}
    >
      <Slider
        classNames={{
          track: '!bg-[#10B981]',
          rail: '!bg-[#9FA7A329]',
        }}
        min={min}
        max={max}
        step={step}
        marks={marks}
        {...restProps}
      />
    </ConfigProvider>
  )
}
