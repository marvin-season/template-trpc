import { useDialogStore } from '@/app/_store/store-dialog'

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

function FilePreview() {
  return <div>FilePreview</div>
}
