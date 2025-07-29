import {
  Popover as PopoverRoot,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface IPopoverProps {
  content: React.ReactNode
  trigger: React.ReactNode
}

export default function usePopover(props: IPopoverProps) {
  return props
}

export function Popover(props: IPopoverProps) {
  const { content, trigger } = props

  return (
    <PopoverRoot defaultOpen={false}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className='p-2'>{content}</PopoverContent>
    </PopoverRoot>
  )
}
