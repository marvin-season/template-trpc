export default function Answer(props: { answer: string }) {
  return (
    <div className='mt-4 whitespace-pre-wrap rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-700'>
      {props.answer}
    </div>
  )
}
