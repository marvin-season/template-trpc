import { useRef, useState } from 'react'

const content = `
Fast sites provide better user experiences. Users want and expect web experiences with content that is fast to load and smooth to interact with.
`
export const stream = new ReadableStream({
  start(controller) {
    let i = 0
    const interval = setInterval(() => {
      if (!content[i]) {
        controller.close()
        clearInterval(interval)
      }
      controller.enqueue({
        text: content[i],
      })

      i++
    }, 50)
  },
})

// polyfill for Promise.withResolvers
export function withResolvers() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })

  return {
    promise,
    resolve,
    reject,
  }
}
/**
 * @deprecated
 */
export function useResolvers() {
  const [status, setStatus] = useState('suspense')
  const promiseRef = useRef<any>(withResolvers)
  return {
    status,
    promiseRef,
    setStatus,
  }
}
