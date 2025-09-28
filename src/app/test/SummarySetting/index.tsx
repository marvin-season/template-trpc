import { SummarySlider } from '../SummarySlider'
import { useCallback, useMemo, useState } from 'react'
import { Select, Button, Modal, Radio } from 'antd'
import config, { EConfigKey, type TConfigKey } from './config'

export type SummarySettingProps = {
  onCancel: () => void
}

export function SummarySetting(props: SummarySettingProps) {
  const { onCancel } = props
  const initSetting = useMemo(() => {
    return {
      summaryType: 'paragraph',
      depth: 1,
      length: 1,
      tone: 'formal',
    }
  }, [])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [setting, setSetting] = useState<Record<TConfigKey, any>>(initSetting)

  const convertedSettings = useMemo(() => {
    const newSetting = { ...setting }
    Object.keys(newSetting).forEach((key) => {
      const keyEnum = key as TConfigKey
      const option = config[keyEnum].find(
        (option) => option.value === setting[keyEnum],
      )
      if (option?.equals) {
        newSetting[keyEnum] = option.equals
      }
    })
    return newSetting
  }, [setting])

  const save = useCallback(() => {
    console.log('save', convertedSettings)
  }, [setting])

  const onChange = useCallback(
    (key: TConfigKey, value: any) => {
      setSetting((prev) => ({ ...prev, [key]: value }))
      const option = config[key].find((option) => option.value === value)
      if (option?.premium) {
        setIsModalOpen(true)
      }
    },
    [setSetting, setIsModalOpen],
  )

  return (
    <div>
      <Modal
        title='Basic Modal'
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <div className='flex items-center gap-3'>
        <span>{'Summary Type'}</span>
        <div className='flex gap-2'>
          {config[EConfigKey.SUMMARY_TYPE].map((option) => (
            <Button
              type={
                option.value === setting.summaryType ? 'primary' : 'default'
              }
              key={option.value}
              onClick={() => onChange(EConfigKey.SUMMARY_TYPE, option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <span>{'Depth'}</span>
          <span>i</span>
        </div>
        <div className='px-2'>
          <SummarySlider
            value={setting.depth}
            onChange={(value) => onChange(EConfigKey.DEPTH, value)}
            options={config[EConfigKey.DEPTH]}
          />
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <span>{'Length'}</span>
          <span>i</span>
        </div>
        <div className='px-2'>
          <SummarySlider
            value={setting.length}
            onChange={(value) => onChange(EConfigKey.LENGTH, value)}
            options={config[EConfigKey.LENGTH]}
          />
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <span>{'Tone'}</span>
          <span>i</span>
        </div>
        <Select
          value={setting.tone}
          onChange={(value) => onChange(EConfigKey.TONE, value)}
          options={config[EConfigKey.TONE]}
          className='w-full'
        />
      </div>
      <div>
        <Button
          onClick={() => {
            setSetting(initSetting)
          }}
        >
          Reset
        </Button>
        <Button onClick={() => onCancel()}>Cancel</Button>
        <Button type='primary' onClick={save}>
          Save
        </Button>
      </div>
    </div>
  )
}
