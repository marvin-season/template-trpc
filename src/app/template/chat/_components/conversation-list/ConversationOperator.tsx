import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui'
import { useCallback, useMemo, useState } from 'react'
import { toast } from 'sonner'

export function ConversationOperator<
  T extends { value: string; label: string },
>(props: { operations: T[]; onClick: (operations: T) => PromiseLike<void> }) {
  const { onClick, operations } = props

  const [loading, setLoading] = useState(false)

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
        <span className={`
          i-[solar--password-minimalistic-linear] shrink-0 opacity-0
          transition-all
          group-hover:opacity-100
        `}></span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          {operations.map((operation) => {
            return (
              <Button
                disabled={loading}
                onClick={() => {
                  handleOperate(operation)
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
