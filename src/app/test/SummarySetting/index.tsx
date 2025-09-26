import { HSlider } from '../Slider'
import { useCallback, useMemo, useState } from 'react'
import { Select, Button, Modal, Radio } from 'antd'
import config, { EConfigKey } from './config'

export type SummarySettingProps = {}

export function SummarySetting(props: SummarySettingProps) {
  const initSettings = useMemo(() => {
    return {
      summaryType: 'paragraph',
      depth: 1,
      length: 1,
      tone: 'formal',
    }
  }, [])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [settings, setSettings] =
    useState<Record<EConfigKey, string | number>>(initSettings)

  const convertedSettings = useMemo(() => {
    const newSettings = { ...settings }
    Object.keys(newSettings).forEach((key) => {
      const keyEnum = key as EConfigKey
      const option = config[keyEnum].find(
        (option) => option.value === settings[keyEnum],
      )
      if (option?.equals) {
        newSettings[keyEnum] = option.equals
      }
    })
    return newSettings
  }, [settings])

  const reset = useCallback(() => {
    setSettings(initSettings)
  }, [initSettings])

  const save = useCallback(() => {
    console.log('save', convertedSettings)
  }, [settings])

  const onChange = useCallback(
    (key: EConfigKey, value: any) => {
      setSettings((prev) => ({ ...prev, [key]: value }))
      const option = config[key].find((option) => option.value === value)
      if (option?.premium) {
        setIsModalOpen(true)
      }
    },
    [setSettings, setIsModalOpen],
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
        value={settings.summaryType}
        onChange={(e) => onChange(EConfigKey.SUMMARY_TYPE, e.target.value)}
        optionType='button'
        buttonStyle='solid'
      />
      <HSlider
        value={settings.depth}
        onChange={(value) => onChange(EConfigKey.DEPTH, value)}
        options={config[EConfigKey.DEPTH]}
      />

      <HSlider
        value={settings.length}
        onChange={(value) => onChange(EConfigKey.LENGTH, value)}
        options={config[EConfigKey.LENGTH]}
      />

      <Select
        value={settings.tone}
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
