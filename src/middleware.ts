import { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {}
export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico|.*\\..*).*)'],
}
