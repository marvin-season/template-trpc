import List from '@/app/test/List'
import { Provider } from '@/app/test/Provider'
import { apiCaller } from '@/trpc/server'

export default async function Page() {
  const list = await apiCaller.post.list()
  return (
    <Provider>
      <List list={list} />
    </Provider>
  )
}
