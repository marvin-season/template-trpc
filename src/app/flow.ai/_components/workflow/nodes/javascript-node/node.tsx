import type { JavaScriptNodeData } from '@flow.ai/_components/workflow/types'
import { devLog } from '@/utils/common'

export default function Node({ data }: { data: JavaScriptNodeData }) {
  devLog('🚀  data.proto', data.label)
  return (
    <>
      <div className='flex-col gap-2'>
        <div className='underline'>{data.label}</div>
        <div>{JSON.stringify(data.properties)}</div>
      </div>
    </>
  )
}
