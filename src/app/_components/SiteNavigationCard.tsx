import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function SiteNavigationCard() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4'>
      <div className='max-w-6xl w-full'>
        {/* 标题部分 */}
        <div className='text-center mb-16'>
          <h1 className='text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4'>
            AI Platform Hub
          </h1>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            选择您需要的 AI 平台，开启智能化工作体验
          </p>
        </div>

        {/* 站点卡片 */}
        <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
          {/* Apple AI 卡片 */}
          <div className='group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100'>
            <div className='p-8'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-100 to-slate-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300'>
                <span className='text-3xl'>🍎</span>
              </div>

              <h2 className='text-2xl font-bold text-gray-800 mb-3'>
                Apple AI
              </h2>
              <p className='text-gray-600 mb-6 leading-relaxed'>
                简洁优雅的侧边栏设计，专注于高效的 AI
                工具集成。提供智能对话、数据分析、模型管理等核心功能。
              </p>

              <div className='space-y-3 mb-6'>
                <div className='flex items-center text-sm text-gray-500'>
                  <span className='w-2 h-2 bg-green-400 rounded-full mr-2'></span>
                  侧边栏布局，可展开收起
                </div>
                <div className='flex items-center text-sm text-gray-500'>
                  <span className='w-2 h-2 bg-blue-400 rounded-full mr-2'></span>
                  Clean & Minimalist Design
                </div>
                <div className='flex items-center text-sm text-gray-500'>
                  <span className='w-2 h-2 bg-purple-400 rounded-full mr-2'></span>
                  专业级 AI 工具套件
                </div>
              </div>

              <Button
                asChild
                className='w-full bg-slate-800 hover:bg-slate-900 text-white group-hover:bg-gradient-to-r group-hover:from-slate-800 group-hover:to-slate-700'
              >
                <Link href={`http://apple.ai.localhost:${process.env.PORT}`}>
                  进入 Apple AI →
                </Link>
              </Button>
            </div>
          </div>

          {/* Banana AI 卡片 */}
          <div className='group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100'>
            <div className='p-8'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300'>
                <span className='text-3xl'>🍌</span>
              </div>

              <h2 className='text-2xl font-bold text-gray-800 mb-3'>
                Banana AI
              </h2>
              <p className='text-gray-600 mb-6 leading-relaxed'>
                活力四射的顶部导航设计，注重用户交互体验。集成丰富的 AI
                功能模块，让创作更有趣。
              </p>

              <div className='space-y-3 mb-6'>
                <div className='flex items-center text-sm text-gray-500'>
                  <span className='w-2 h-2 bg-yellow-400 rounded-full mr-2'></span>
                  顶部导航栏，下拉菜单
                </div>
                <div className='flex items-center text-sm text-gray-500'>
                  <span className='w-2 h-2 bg-orange-400 rounded-full mr-2'></span>
                  Vibrant & Interactive UI
                </div>
                <div className='flex items-center text-sm text-gray-500'>
                  <span className='w-2 h-2 bg-red-400 rounded-full mr-2'></span>
                  创意驱动的 AI 平台
                </div>
              </div>

              <Button
                asChild
                className='w-full bg-yellow-500 hover:bg-yellow-600 text-white group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-orange-500'
              >
                <Link href={`http://banana.ai.localhost:${process.env.PORT}`}>
                  进入 Banana AI →
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* 底部信息 */}
        <div className='text-center mt-16'>
          <div className='inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200'>
            <span className='w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse'></span>
            <span className='text-sm text-gray-600'>
              所有平台均已就绪，随时为您服务
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
