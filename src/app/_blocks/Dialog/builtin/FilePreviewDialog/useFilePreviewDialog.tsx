import { useDialogStore } from '@/app/_store/store-dialog'
import { FilePreview } from '.'

export function useFilePreviewDialog() {
  const show = useDialogStore((state) => state.show)

  return {
    show: () => {
      show({
        title: 'File Preview',
        content: <FilePreview />,
      })
    },
  }
}
