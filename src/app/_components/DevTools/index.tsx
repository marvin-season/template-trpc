import { sites } from '@/config/site'

export function SiteSwitcher() {
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className='fixed top-0 right-0 opacity-50 bg-green-400 flex gap-2 cursor-pointer z-50'>
      {sites.map((site) => (
        // 打开新的站点
        <a
          key={site.path}
          target='_blank'
          href={`http://${site.path}.localhost:${process.env.PORT}`}
        >
          {site.name}
        </a>
      ))}
    </div>
  )
}
