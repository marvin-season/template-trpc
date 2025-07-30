import {
  Sheet as SheetRoot,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

interface ISheetProps {
  trigger: React.ReactNode
  children: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
}

export function Sheet(props: ISheetProps) {
  const { trigger, children, title, description } = props
  return (
    <SheetRoot>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
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
