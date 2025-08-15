import List from './List'
import { Provider } from './Provider'
import { apiCaller } from '@/trpc/server'

export default async function Page() {
  const list = await apiCaller.post.list()
  return (
    <Provider>
      <List list={list} />
    </Provider>
  )
}
