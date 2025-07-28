import { JavaScriptNodeData } from '@/app/flow.ai/_components/workflow/types.ts'

export default function Node({ data }: { data: JavaScriptNodeData }) {
  console.log('🚀  data.proto', data.label)
  return (
    <>
      <div className='flex-col gap-2'>
        <div className='underline'>{data.label}</div>
        <div>{JSON.stringify(data.properties)}</div>
      </div>
    </>
  )
}
