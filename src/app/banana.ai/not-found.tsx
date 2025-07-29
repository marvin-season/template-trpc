import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function BananaNotFound() {
  return (
    <div className={`
      flex min-h-screen items-center justify-center bg-gradient-to-br
      from-yellow-50 to-orange-100
    `}>
      <div className='text-center'>
        <div className='mb-8'>
          <div className='mb-4 text-9xl font-bold text-yellow-500'>404</div>
          <div className='mb-4 text-6xl'>🍌</div>
          <h1 className='mb-2 text-4xl font-bold text-gray-800'>
            页面走丢了！
          </h1>
          <p className='mx-auto mb-8 max-w-md text-xl text-gray-600'>
            哎呀！这个页面好像被猴子偷走了，我们正在香蕉树上寻找它...
          </p>
        </div>

        <div className='space-y-4'>
          <div className={`
            flex flex-col justify-center gap-4
            sm:flex-row
          `}>
            <Button
              asChild
              className={`
                bg-yellow-500 text-white
                hover:bg-yellow-600
              `}
            >
              <Link href='/'>🏠 回到首页</Link>
            </Button>
            <Button
              asChild
              variant='outline'
              className={`
                border-yellow-500 text-yellow-600
                hover:bg-yellow-50
              `}
            >
              <Link href='/chat'>💬 开始对话</Link>
            </Button>
          </div>

          <div className='mt-8 text-sm text-gray-500'>
            <p>或者尝试这些热门功能：</p>
            <div className='mt-2 flex flex-wrap justify-center gap-2'>
              <Link
                href='/analysis'
                className={`
                  text-yellow-600 underline
                  hover:text-yellow-800
                `}
              >
                数据分析
              </Link>
              <span className='text-gray-300'>•</span>
              <Link
                href='/generator'
                className={`
                  text-yellow-600 underline
                  hover:text-yellow-800
                `}
              >
                内容生成
              </Link>
              <span className='text-gray-300'>•</span>
              <Link
                href='/models/library'
                className={`
                  text-yellow-600 underline
                  hover:text-yellow-800
                `}
              >
                模型库
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
