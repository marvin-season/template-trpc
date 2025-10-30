import { Bell } from 'lucide-react'

export default function BellBadge(props: { count?: number }) {
  const { count } = props

  return (
    <span className='relative inline-block'>
      <span className='relative inline-block align-middle'>
        <Bell className='size-5' />
        {typeof count === 'number' && count > 0 && (
          <span
            className={`
              pointer-events-none absolute -top-1.5 -right-1.5 flex h-4 min-w-4
              items-center justify-center rounded-full bg-destructive px-1
              text-[10px] leading-none font-bold text-white shadow
            `}
            style={{ zIndex: 1 }}
          >
            {count > 99 ? '99+' : count}
          </span>
        )}
      </span>
    </span>
  )
}
