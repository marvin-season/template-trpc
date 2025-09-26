import { HSlider } from '../Slider'
import { useCallback, useMemo, useState } from 'react'
import { Select, Button, Modal, Radio } from 'antd'
import config, { EConfigKey, type TConfigKey } from './config'

export type SummarySettingProps = {}

export function SummarySetting(props: SummarySettingProps) {
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

  const reset = useCallback(() => {
    setSetting(initSetting)
  }, [initSetting])

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
      <Radio.Group
        block
        options={config[EConfigKey.SUMMARY_TYPE]}
        value={setting.summaryType}
        onChange={(e) => onChange(EConfigKey.SUMMARY_TYPE, e.target.value)}
        optionType='button'
        buttonStyle='solid'
      />
      <HSlider
        value={setting.depth}
        onChange={(value) => onChange(EConfigKey.DEPTH, value)}
        options={config[EConfigKey.DEPTH]}
      />

      <HSlider
        value={setting.length}
        onChange={(value) => onChange(EConfigKey.LENGTH, value)}
        options={config[EConfigKey.LENGTH]}
      />

      <Select
        value={setting.tone}
        onChange={(value) => onChange(EConfigKey.TONE, value)}
        options={config[EConfigKey.TONE]}
        className='w-full'
      />
      <div>
        <Button onClick={reset}>Reset</Button>
        <Button onClick={() => console.log('cancel')}>Cancel</Button>
        <Button type='primary' onClick={save}>
          Save
        </Button>
      </div>
    </div>
  )
}
