import { sites } from '@/config/site'
import { NextRequest, NextResponse } from 'next/server'

function rewriteSite(req: NextRequest) {
  const hostname = req.headers.get('host')
  const currentHost = hostname?.split(':')[0] || ''
  const subdomain = currentHost.replace('.localhost', '')
  // 如果是 localhost 本体就放行
  if (subdomain === 'localhost' || currentHost === 'localhost') {
    return NextResponse.next()
  }
  const site = sites.find((site) => site.path === subdomain)
  if (!site) {
    throw new Error('Not Found')
  }

  const { path } = site
  // 重写 URL 为路径形式，如：/apple.ai
  const url = req.nextUrl.clone()
  url.pathname = `/${path}${url.pathname}`
  return NextResponse.rewrite(url)
}

export function middleware(req: NextRequest) {
  return rewriteSite(req)
}
export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico|.*\\..*).*)'],
}
