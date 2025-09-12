import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { headers } from 'next/headers'
import { sites } from '@/constant/site'

const sitesData = sites
  .filter((item) => process.env.NODE_ENV !== 'production' || !item.hidden)
  .flatMap((item) => item.data)
  .filter((item) => item !== undefined)

export async function SiteNavigationCard() {
  const host = (await headers()).get('host')

  return (
    <div
      className={`
        invisible flex min-h-screen items-center justify-center
        bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4
      `}
    >
      <div className='w-full max-w-6xl'>
        {/* 标题部分 */}
        <div className='mb-16 text-center'>
          <h1
            className={`
              mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text
              text-5xl font-bold text-transparent
            `}
          >
            AI Platform Hub
          </h1>
          <p className='mx-auto max-w-2xl text-xl text-gray-600'>
            选择您需要的 AI 平台，开启智能化工作体验
          </p>
        </div>

        {/* 站点卡片 */}
        <div
          className={`
            mx-auto grid max-w-4xl gap-8
            md:grid-cols-2
          `}
        >
          {sitesData.map((site) => (
            <div
              key={site.id}
              className={`
                group overflow-hidden rounded-2xl border border-gray-100
                bg-white shadow-lg transition-all duration-300
                hover:shadow-2xl
              `}
            >
              <div className='p-8'>
                <div
                  className={`
                    mb-6 flex h-16 w-16 items-center justify-center rounded-2xl
                    ${site.iconBgClass}
                    transition-transform duration-300
                    group-hover:scale-110
                  `}
                >
                  <span className='text-3xl'>{site.icon}</span>
                </div>

                <h2 className='mb-3 text-2xl font-bold text-gray-800'>
                  {site.name}
                </h2>
                <p className='mb-6 leading-relaxed text-gray-600'>
                  {site.description}
                </p>

                <div className='mb-6 space-y-3'>
                  {site.features.map((feature, index) => (
                    <div
                      key={index}
                      className={`flex items-center text-sm text-gray-500`}
                    >
                      <span
                        className={`
                          mr-2 h-2 w-2 rounded-full
                          ${feature.color}
                        `}
                      ></span>
                      {feature.text}
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  className={`
                    w-full
                    ${site.buttonClass}
                    ${site.buttonHoverClass}
                  `}
                >
                  <Link href={`http://${host}/${site.href}`}>
                    进入 {site.name} →
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* 底部信息 */}
        <div className='mt-16 text-center'>
          <div
            className={`
              inline-flex items-center rounded-full border border-gray-200
              bg-white/60 px-4 py-2 backdrop-blur-sm
            `}
          >
            <span
              className={`mr-2 h-2 w-2 animate-pulse rounded-full bg-green-400`}
            ></span>
            <span className='text-sm text-gray-600'>
              所有平台均已就绪，随时为您服务
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
