import React from 'react'
import AddNode from './add-node'

export default function () {
  return (
    <>
      <div
        className={`
          flex items-center rounded-lg border-[0.5px] border-gray-100 bg-white
          p-0.5 text-gray-500 shadow-lg
        `}
      >
        <AddNode />
      </div>
    </>
  )
}
