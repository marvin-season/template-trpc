import {
  Sheet as SheetRoot,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

interface ISheetProps {
  trigger?: React.ReactNode
  children: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode

  open?: boolean

  onOpenChange?: (open: boolean) => void
}

export function Sheet(props: ISheetProps) {
  const { trigger, children, title, description, open, onOpenChange } = props
  return (
    <SheetRoot open={open} onOpenChange={onOpenChange}>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          {title && <SheetTitle>{title}</SheetTitle>}
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        {children}
      </SheetContent>
    </SheetRoot>
  )
}
