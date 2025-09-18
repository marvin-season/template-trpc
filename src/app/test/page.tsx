'use client'
import { useClickAway } from 'ahooks'
import { useRef, useState } from 'react'

export default function Page() {
  const [isOpen, setIsOpen] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)
  useClickAway(
    (e) => {
      console.log('click away', e)
      if (isOpen) {
        setIsOpen(false)
      }
    },
    divRef,
    'click',
  )
  return (
    <>
      <form
        onSubmit={(e) => {
          e.stopPropagation()
          e.preventDefault()
          console.log('submit')
        }}
        className={`
          flex h-[200px] w-[200px] flex-col items-center justify-center border
        `}
      >
        <button
          type='button'
          className={`size-10 bg-red-300`}
          onClick={(e) => {
            console.log('click 1')
            e.preventDefault()
            e.stopPropagation()
            setIsOpen(!isOpen)
          }}
        >
          {isOpen ? 'open' : 'close'}
        </button>
        <div ref={divRef} className='h-10 w-10 bg-red-100'>
          target
        </div>
        <div className='h-10 w-10 bg-red-200'></div>
        <div>
          <input type='text' placeholder='please input' />
          <button type='submit'>submit</button>
        </div>
      </form>
    </>
  )
}
