interface EmptyStateProps {
  type: 'task' | 'system'
}

export default function EmptyState({ type }: EmptyStateProps) {
  const text = type === 'task' ? '暂无任务通知' : '暂无系统通知'

  return (
    <div className='flex h-full flex-col items-center justify-center py-12'>
      <div
        className={`
          mb-4 flex size-16 items-center justify-center rounded-full bg-muted
        `}
      >
        <svg
          className='size-8 text-muted-foreground'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
          />
        </svg>
      </div>
      <p className='text-sm text-muted-foreground'>{text}</p>
    </div>
  )
}
