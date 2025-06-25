import { notFound } from 'next/navigation'

export default function BananaCatchAll() {
  // 对于任何不匹配的路由，触发 not-found 页面
  notFound()
}
