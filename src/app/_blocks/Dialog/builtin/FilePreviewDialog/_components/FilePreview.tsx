import ReactMarkdown from 'react-markdown'

export function FilePreview(props: { file: string }) {
  return (
    <div>
      <ReactMarkdown>{props.file}</ReactMarkdown>
    </div>
  )
}
