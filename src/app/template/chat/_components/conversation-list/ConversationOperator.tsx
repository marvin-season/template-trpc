import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui'
import { useCallback, useMemo, useState } from 'react'
import { toast } from 'sonner'

export function ConversationOperator<T = 'delete' | 'share'>(props: {
  onClick: (operations: T) => PromiseLike<void>
}) {
  const { onClick } = props

  const [loading, setLoading] = useState(false)

  const operations = useMemo(() => {
    return [
      {
        label: 'Delete',
        value: 'delete',
      },
      {
        label: 'Share',
        value: 'share',
      },
    ] as {
      label: string
      value: T
    }[]
  }, [])

  const handleOperate = useCallback(async (operate: T) => {
    if (loading) {
      toast.warning('loading...')
      return
    }

    setLoading(true)
    try {
      await onClick(operate)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className='i-[solar--password-minimalistic-linear] shrink-0 opacity-0 group-hover:opacity-100 transition-all'></span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          {operations.map((operation) => {
            return (
              <Button
                disabled={loading}
                onClick={() => {
                  handleOperate(operation.value)
                }}
              >
                {operation.label}
              </Button>
            )
          })}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
