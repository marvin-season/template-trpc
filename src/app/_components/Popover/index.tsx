import {
  Popover as PopoverRoot,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface IPopoverProps {
  children: React.ReactNode
  trigger: React.ReactNode
  asChild?: boolean
}

export function Popover(props: IPopoverProps) {
  const { children, trigger, asChild } = props

  return (
    <PopoverRoot defaultOpen={false}>
      <PopoverTrigger asChild={asChild}>{trigger}</PopoverTrigger>
      <PopoverContent className='p-2'>{children}</PopoverContent>
    </PopoverRoot>
  )
}
