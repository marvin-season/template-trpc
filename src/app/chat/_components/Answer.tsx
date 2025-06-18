import { useMemo } from 'react'
import type { Components } from 'react-markdown'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

const components: Components & {
  think?: React.ElementType
} = {
  think: ({ node, ...props }) => <Think {...props} />,
}
const Think = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { 'data-status': status, 'data-value': value } = props as any
  return (
    <div
      className='rounded-lg p-4 bg-gray-50 shadow my-4 font-sans text-gray-900'
      {...props}
    >
      <span className='border text-green-400 rounded-md px-1 py-0.5 text-xs'>
        {status}
      </span>
      <div>{value}</div>
    </div>
  )
}
export default function Answer(props: { answer: string }) {
  const { answer } = props
  const answerWithThink = useMemo(() => {
    // 替换answer中的思考内容: 如下规则
    /* <think> xxx   => <think data-status="loading" data-value="xxx">
     * <think> xxx </think> => <think data-status="complete" data-value="xxx">
     */
    return answer
      .replace(/<think>\s*([^<]+?)\s*<\/think>/g, (_, value) => {
        return `<think data-status="complete" data-value="${value.trim()}"></think>`
      })
      .replace(/<think>\s*([^<]+?)\s*$/gm, (_, value) => {
        return `<think data-status="loading" data-value="${value.trim()}"></think>`
      })
  }, [answer])
  return (
    <div className='overflow-y-auto mt-4 whitespace-pre-wrap rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-700 flex-1'>
      <Markdown rehypePlugins={[rehypeRaw]} components={components}>
        {/* TODO: 换行符导致markdown解析自定义标签失败 */}
        {answerWithThink.replaceAll('\n', '')}
      </Markdown>
    </div>
  )
}
