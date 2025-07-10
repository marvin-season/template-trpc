import { useDialog } from '@/app/_blocks/Dialog/useDialog'
import { FilePreview } from '.'

export function useFilePreviewDialog() {
  const show = useDialog((state) => state.show)

  return {
    show: (context: { file: string }) => {
      show({
        title: 'File Preview',
        content: <FilePreview file={context.file} />,
      })
    },
  }
}
