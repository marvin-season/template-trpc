import { apiCaller } from '@/trpc/server'
import TxtViewer from './_components/TxtViewer'

export default async function Page() {
  const txt = await apiCaller.post.getDemo({
    url: 'https://raw.githubusercontent.com/AmbroseRen/Picture/master/book/Literature/Poem/%E6%82%89%E8%BE%BE%E5%A4%9A.txt',
  })

  return <TxtViewer txt={txt} />
}
