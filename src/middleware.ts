import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') // e.g. 'apple.ai.localhost:3000'

  const currentHost = hostname?.split(':')[0] || ''
  const subdomain = currentHost.replace('.localhost', '') // 获取子域名部分

  // 如果是 localhost 本体就放行
  if (subdomain === 'localhost' || currentHost === 'localhost') {
    return NextResponse.next()
  }

  // 重写 URL 为路径形式，如：/apple.ai
  const url = req.nextUrl.clone()
  url.pathname = `/${subdomain}${url.pathname}`
  return NextResponse.rewrite(url)
}
