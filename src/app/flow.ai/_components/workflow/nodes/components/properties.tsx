import { SquareArrowOutUpRight } from 'lucide-react'
const MDN_PREFIX =
  'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects'
export function Properties(props: { properties: string[]; name: string }) {
  const { properties, name } = props
  return properties.map((property) => {
    return (
      <div className='flex flex-col gap-1 text-sm text-gray-500'>
        <a
          key={property}
          className={`
            group/item flex cursor-pointer items-center justify-between
            hover:text-blue-400
          `}
          title='Click to view in MDN'
          href={`${MDN_PREFIX}/${name}/${property}`}
          target='_blank'
        >
          <span>{property}</span>
          <SquareArrowOutUpRight
            size={12}
            className={`
              opacity-0 transition-opacity duration-200
              group-hover/item:opacity-100
            `}
          />
        </a>
      </div>
    )
  })
}
