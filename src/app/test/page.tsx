'use client'

import { useEffect } from 'react'

export default function Page() {
  return (
    <>
      <A />
      <C />
    </>
  )
}
function A() {
  console.log('A')

  useEffect(() => {
    console.log('A mount')
    return () => {
      console.log('A unmount')
    }
  }, [])
  return (
    <div>
      A
      <B />
    </div>
  )
}
function B() {
  console.log('B')
  useEffect(() => {
    console.log('B mount')
    return () => {
      console.log('B unmount')
    }
  }, [])
  return <div>B</div>
}
function C() {
  console.log('C')
  useEffect(() => {
    console.log('C mount')
    return () => {
      console.log('C unmount')
    }
  }, [])
  return <div>C</div>
}
