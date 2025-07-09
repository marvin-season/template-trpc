import { useDialog } from '@/app/_blocks/Dialog/useDialog'

export function useSignDialog() {
  const show = useDialog((state) => state.show)

  return {
    show: () => {
      show({
        title: '登陆注册',
        content: <>111</>,
      })
    },
  }
}
