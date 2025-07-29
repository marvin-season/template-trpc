import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { headers } from 'next/headers'
export async function SiteNavigationCard() {
  const host = (await headers()).get('host')
  return (
    <div className={`
      flex min-h-screen items-center justify-center bg-gradient-to-br
      from-indigo-50 via-white to-cyan-50 p-4
    `}>
      <div className='w-full max-w-6xl'>
        {/* 标题部分 */}
        <div className='mb-16 text-center'>
          <h1 className={`
            mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text
            text-5xl font-bold text-transparent
          `}>
            AI Platform Hub
          </h1>
          <p className='mx-auto max-w-2xl text-xl text-gray-600'>
            选择您需要的 AI 平台，开启智能化工作体验
          </p>
        </div>

        {/* 站点卡片 */}
        <div className={`
          mx-auto grid max-w-4xl gap-8
          md:grid-cols-2
        `}>
          {/* Apple AI 卡片 */}
          <div className={`
            group overflow-hidden rounded-2xl border border-gray-100 bg-white
            shadow-lg transition-all duration-300
            hover:shadow-2xl
          `}>
            <div className='p-8'>
              <div className={`
                mb-6 flex h-16 w-16 items-center justify-center rounded-2xl
                bg-gradient-to-r from-gray-100 to-slate-100 transition-transform
                duration-300
                group-hover:scale-110
              `}>
                <span className='text-3xl'>🍎</span>
              </div>

              <h2 className='mb-3 text-2xl font-bold text-gray-800'>
                Apple AI
              </h2>
              <p className='mb-6 leading-relaxed text-gray-600'>
                简洁优雅的侧边栏设计，专注于高效的 AI
                工具集成。提供智能对话、数据分析、模型管理等核心功能。
              </p>

              <div className='mb-6 space-y-3'>
                <div className='flex items-center text-sm text-gray-500'>
                  <span className='mr-2 h-2 w-2 rounded-full bg-green-400'></span>
                  侧边栏布局，可展开收起
                </div>
                <div className='flex items-center text-sm text-gray-500'>
                  <span className='mr-2 h-2 w-2 rounded-full bg-blue-400'></span>
                  Clean & Minimalist Design
                </div>
                <div className='flex items-center text-sm text-gray-500'>
                  <span className='mr-2 h-2 w-2 rounded-full bg-purple-400'></span>
                  专业级 AI 工具套件
                </div>
              </div>

              <Button
                asChild
                className={`
                  w-full bg-slate-800 text-white
                  group-hover:bg-gradient-to-r group-hover:from-slate-800
                  group-hover:to-slate-700
                  hover:bg-slate-900
                `}
              >
                <Link href={`http://apple.ai.${host}`}>进入 Apple AI →</Link>
              </Button>
            </div>
          </div>

          {/* Banana AI 卡片 */}
          <div className={`
            group overflow-hidden rounded-2xl border border-gray-100 bg-white
            shadow-lg transition-all duration-300
            hover:shadow-2xl
          `}>
            <div className='p-8'>
              <div className={`
                mb-6 flex h-16 w-16 items-center justify-center rounded-2xl
                bg-gradient-to-r from-yellow-100 to-orange-100
                transition-transform duration-300
                group-hover:scale-110
              `}>
                <span className='text-3xl'>🍌</span>
              </div>

              <h2 className='mb-3 text-2xl font-bold text-gray-800'>
                Banana AI
              </h2>
              <p className='mb-6 leading-relaxed text-gray-600'>
                活力四射的顶部导航设计，注重用户交互体验。集成丰富的 AI
                功能模块，让创作更有趣。
              </p>

              <div className='mb-6 space-y-3'>
                <div className='flex items-center text-sm text-gray-500'>
                  <span className='mr-2 h-2 w-2 rounded-full bg-yellow-400'></span>
                  顶部导航栏，下拉菜单
                </div>
                <div className='flex items-center text-sm text-gray-500'>
                  <span className='mr-2 h-2 w-2 rounded-full bg-orange-400'></span>
                  Vibrant & Interactive UI
                </div>
                <div className='flex items-center text-sm text-gray-500'>
                  <span className='mr-2 h-2 w-2 rounded-full bg-red-400'></span>
                  创意驱动的 AI 平台
                </div>
              </div>

              <Button
                asChild
                className={`
                  w-full bg-yellow-500 text-white
                  group-hover:bg-gradient-to-r group-hover:from-yellow-500
                  group-hover:to-orange-500
                  hover:bg-yellow-600
                `}
              >
                <Link href={`http://banana.ai.${host}`}>进入 Banana AI →</Link>
              </Button>
            </div>
          </div>

          {/* Flow AI 卡片 */}
          <div className={`
            group overflow-hidden rounded-2xl border border-gray-100 bg-white
            shadow-lg transition-all duration-300
            hover:shadow-2xl
          `}>
            <div className='p-8'>
              <div className={`
                mb-6 flex h-16 w-16 items-center justify-center rounded-2xl
                bg-gradient-to-r from-yellow-100 to-orange-100
                transition-transform duration-300
                group-hover:scale-110
              `}>
                <span className='text-3xl'>�</span>
              </div>

              <h2 className='mb-3 text-2xl font-bold text-gray-800'>
                Flow AI
              </h2>
              <p className='mb-6 leading-relaxed text-gray-600'>
                基于 Flow 的 AI 平台，提供丰富的 AI 功能模块，让创作更有趣。
              </p>

              <div className='mb-6 space-y-3'>
                <div className='flex items-center text-sm text-gray-500'>
                  <span className='mr-2 h-2 w-2 rounded-full bg-blue-400'></span>
                  基于 Flow 的 AI 平台
                </div>
                <div className='flex items-center text-sm text-gray-500'>
                  <span className='mr-2 h-2 w-2 rounded-full bg-blue-400'></span>
                  Flow 的 AI 平台
                </div>
                <div className='flex items-center text-sm text-gray-500'>
                  <span className='mr-2 h-2 w-2 rounded-full bg-red-400'></span>
                  丰富的 AI 功能模块
                </div>
              </div>

              <Button
                asChild
                className={`
                  w-full bg-blue-500 text-white
                  group-hover:bg-gradient-to-r group-hover:from-blue-500
                  group-hover:to-orange-500
                  hover:bg-blue-600
                `}
              >
                <Link href={`http://flow.ai.${host}`}>进入 Flow AI →</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* 底部信息 */}
        <div className='mt-16 text-center'>
          <div className={`
            inline-flex items-center rounded-full border border-gray-200
            bg-white/60 px-4 py-2 backdrop-blur-sm
          `}>
            <span className={`
              mr-2 h-2 w-2 animate-pulse rounded-full bg-green-400
            `}></span>
            <span className='text-sm text-gray-600'>
              所有平台均已就绪，随时为您服务
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
