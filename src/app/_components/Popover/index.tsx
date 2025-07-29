import {
  Popover as PopoverRoot,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface IPopoverProps {
  children: React.ReactNode
  trigger: React.ReactNode
}

export function Popover(props: IPopoverProps) {
  const { children, trigger } = props

  return (
    <PopoverRoot defaultOpen={false}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className='p-2'>{children}</PopoverContent>
    </PopoverRoot>
  )
}
