import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { headers } from 'next/headers'

// 定义站点数据的类型
interface SiteData {
  id: string
  name: string
  description: string
  icon: string
  iconBgClass: string
  features: Array<{
    text: string
    color: string
  }>
  buttonClass: string
  buttonHoverClass: string
  href: string
}

// 站点数据数组
const sitesData: SiteData[] = [
  {
    id: 'apple',
    name: 'Apple AI',
    description:
      '简洁优雅的侧边栏设计，专注于高效的 AI 工具集成。提供智能对话、数据分析、模型管理等核心功能。',
    icon: '🍎',
    iconBgClass: 'bg-gradient-to-r from-gray-100 to-slate-100',
    features: [
      { text: '侧边栏布局，可展开收起', color: 'bg-green-400' },
      { text: 'Clean & Minimalist Design', color: 'bg-blue-400' },
      { text: '专业级 AI 工具套件', color: 'bg-purple-400' },
    ],
    buttonClass: 'bg-slate-800 text-white',
    buttonHoverClass:
      'group-hover:bg-gradient-to-r group-hover:from-slate-800 group-hover:to-slate-700 hover:bg-slate-900',
    href: 'apple.ai',
  },
  {
    id: 'banana',
    name: 'Banana AI',
    description:
      '活力四射的顶部导航设计，注重用户交互体验。集成丰富的 AI 功能模块，让创作更有趣。',
    icon: '🍌',
    iconBgClass: 'bg-gradient-to-r from-yellow-100 to-orange-100',
    features: [
      { text: '顶部导航栏，下拉菜单', color: 'bg-yellow-400' },
      { text: 'Vibrant & Interactive UI', color: 'bg-orange-400' },
      { text: '创意驱动的 AI 平台', color: 'bg-red-400' },
    ],
    buttonClass: 'bg-yellow-500 text-white',
    buttonHoverClass:
      'group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-orange-500 hover:bg-yellow-600',
    href: 'banana.ai',
  },
  {
    id: 'flow',
    name: 'Flow AI',
    description: '基于 Flow 的 AI 平台，提供丰富的 AI 功能模块，让创作更有趣。',
    icon: '🌊',
    iconBgClass: 'bg-gradient-to-r from-blue-100 to-cyan-100',
    features: [
      { text: '基于 Flow 的 AI 平台', color: 'bg-blue-400' },
      { text: '可视化工作流设计', color: 'bg-cyan-400' },
      { text: '丰富的 AI 功能模块', color: 'bg-indigo-400' },
    ],
    buttonClass: 'bg-blue-500 text-white',
    buttonHoverClass:
      'group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-cyan-500 hover:bg-blue-600',
    href: 'flow.ai',
  },
  {
    id: 'doc',
    name: 'Doc AI',
    description:
      '专业的文档处理 AI 平台，支持智能文档分析、格式转换、内容提取等功能，让文档处理更高效。',
    icon: '📄',
    iconBgClass: 'bg-gradient-to-r from-emerald-100 to-teal-100',
    features: [
      { text: '智能文档分析处理', color: 'bg-emerald-400' },
      { text: '多格式文档转换', color: 'bg-teal-400' },
      { text: '内容提取与总结', color: 'bg-green-400' },
    ],
    buttonClass: 'bg-emerald-500 text-white',
    buttonHoverClass:
      'group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-500 hover:bg-emerald-600',
    href: 'doc.ai',
  },
  {
    id: 'write',
    name: 'Writer AI',
    description:
      '智能写作助手平台，提供文案创作、内容优化、多语言翻译等功能，让写作更高效更有创意。',
    icon: '✍️',
    iconBgClass: 'bg-gradient-to-r from-purple-100 to-pink-100',
    features: [
      { text: '智能文案创作助手', color: 'bg-purple-400' },
      { text: '内容优化与润色', color: 'bg-pink-400' },
      { text: '多语言翻译支持', color: 'bg-violet-400' },
    ],
    buttonClass: 'bg-purple-500 text-white',
    buttonHoverClass:
      'group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 hover:bg-purple-600',
    href: 'writer.ai',
  },
]

export async function SiteNavigationCard() {
  const host = (await headers()).get('host')

  return (
    <div
      className={`
        flex min-h-screen items-center justify-center bg-gradient-to-br
        from-indigo-50 via-white to-cyan-50 p-4
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
                  <Link href={`http://${site.href}.${host}`}>
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
