import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AppleNotFound() {
  return (
    <div
      className={`
        flex min-h-screen items-center justify-center bg-gradient-to-br
        from-gray-50 to-slate-100
      `}
    >
      <div className='text-center'>
        <div className='mb-8'>
          <div className='mb-4 text-9xl font-bold text-slate-400'>404</div>
          <div className='mb-4 text-6xl'>🍎</div>
          <h1 className='mb-2 text-4xl font-bold text-slate-800'>页面不存在</h1>
          <p className='mx-auto mb-8 max-w-md text-xl text-slate-600'>
            抱歉，您访问的页面可能已被移动或删除。让我们帮您找到正确的方向。
          </p>
        </div>

        <div className='space-y-6'>
          <div
            className={`
              flex flex-col justify-center gap-4
              sm:flex-row
            `}
          >
            <Button
              asChild
              className={`
                bg-slate-800 text-white
                hover:bg-slate-900
              `}
            >
              <Link href='/'>回到主页</Link>
            </Button>
            <Button
              asChild
              variant='outline'
              className={`
                border-slate-300 text-slate-600
                hover:bg-slate-100
              `}
            >
              <Link href='/chat'>智能对话</Link>
            </Button>
          </div>

          <div
            className={`
              mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-6
              shadow-sm
            `}
          >
            <h3 className='mb-3 text-lg font-semibold text-slate-800'>
              推荐功能
            </h3>
            <div className='space-y-2 text-sm'>
              <Link
                href='/template/analysis'
                className={`
                  block rounded-md px-4 py-2 text-slate-600 transition-colors
                  hover:bg-slate-50 hover:text-slate-800
                `}
              >
                📊 数据分析工具
              </Link>
              <Link
                href='/template/generator'
                className={`
                  block rounded-md px-4 py-2 text-slate-600 transition-colors
                  hover:bg-slate-50 hover:text-slate-800
                `}
              >
                ✨ AI 内容生成
              </Link>
              <Link
                href='/template/models/library'
                className={`
                  block rounded-md px-4 py-2 text-slate-600 transition-colors
                  hover:bg-slate-50 hover:text-slate-800
                `}
              >
                🤖 模型库管理
              </Link>
            </div>
          </div>

          <p className='text-sm text-slate-500'>
            如果问题持续存在，请联系我们的技术支持团队
          </p>
        </div>
      </div>
    </div>
  )
}
