'use server'

import { Table } from '@/app/test/Table'

export default async function List({ list }: { list: any[] }) {
  return (
    <div className='p-4'>
      服务端渲染 {JSON.stringify(list)}
      <Table />
    </div>
  )
}
