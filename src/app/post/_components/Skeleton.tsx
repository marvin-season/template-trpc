export default function Skeleton() {
  return (
    <div className='p-3 border rounded shadow-sm animate-pulse'>
      <div className='h-5 bg-gray-200 rounded w-1/3 mb-2'></div>
      <div className='h-4 bg-gray-100 rounded w-1/2'></div>
    </div>
  )
}

export function SkeletonList({ count }: { count: number }) {
  return (
    <div className='space-y-2'>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} />
      ))}
    </div>
  )
}
