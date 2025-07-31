export default function TxtViewer(props: { txt: string }) {
  const { txt } = props
  return (
    <div
      className={`
        h-full overflow-auto rounded border border-gray-300 bg-white p-4
        font-mono text-sm whitespace-pre-wrap text-gray-700 shadow-sm
      `}
    >
      {txt}
    </div>
  )
}
