import { marked } from 'marked'

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export function convertImageToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function validateSize(file: File, maxSize: number) {
  if (file.size > maxSize) {
    alert(`File size exceeds the maximum limit of ${maxSize} bytes`)
    return false
  }
  return true
}

export async function fetchData<T>(url: string): Promise<T> {
  return fetch(url).then((res) => res.json()) as Promise<T>
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function renderMarkdown(text: string) {
  return marked.parse(text) as string
}

export function devLog(...args: any) {
  const style = `
    color:#fff;font-size:12px;font-weight:bold;border-radius:8px;padding:2px 4px;margin:2px 0;
    background:linear-gradient(135deg, #12c2e9, #c471ed, #f64f59);
  `
  if (process.env.NODE_ENV === 'production' || typeof window === 'undefined') {
    return
  }

  console.log('%c🚀devLog', style, ...args)
}
