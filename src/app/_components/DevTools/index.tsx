import { sites } from '@/config/site'

import Link from 'next/link'

export function SiteSwitcher() {
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className='fixed top-0 right-0 bg-transparent'>
      {sites.map((site) => (
        <Link key={site.path} href={`/${site.path}`}>
          {site.name}
        </Link>
      ))}
    </div>
  )
}
