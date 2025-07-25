'use client'

import { useCallback, useState, type ReactNode } from 'react'

interface IUpload {
  className?: string
  children?: (props: {
    status: TStatus
    progress: number
    fileList: File[]
    remove: (file: File) => void
  }) => ReactNode

  beforeUpload?: (file: File) => Promise<File | undefined>

  action?: (file: File) => Promise<void>

  onSuccess?: (result: any) => void
}

type TStatus = 'pending' | 'rejected' | 'fulfilled' | undefined

function Upload(props: IUpload) {
  const {
    children,
    className,
    beforeUpload = (file) => file,
    action = async (file) => {
      // xhr upload
      const formData = new FormData()
      formData.append('file', file)
      return Object.fromEntries(formData)
    },
    onSuccess = () => {},
  } = props

  const [status, setStatus] = useState<TStatus>()
  const [progress, setProgress] = useState(0)
  const [fileList, setFileList] = useState<File[]>([])

  const remove = useCallback((file: File) => {
    setFileList((prev) => prev.filter((f) => f.name !== file.name))
  }, [])

  return (
    <>
      <label
        className={`
          block cursor-pointer
          ${className}
        `}
        htmlFor='upload'
      >
        {children?.({
          status,
          progress,
          fileList,
          remove,
        })}
      </label>
      <input
        id='upload'
        className='hidden'
        type='file'
        onChange={async (e) => {
          let file = e.target.files?.[0]
          if (!file) {
            setStatus('rejected')
            return
          }
          file = await beforeUpload(file)
          if (!file) {
            setStatus('rejected')
            return
          }

          const result = await action(file)
          setStatus('fulfilled')
          onSuccess(result)
          setFileList((prev) => prev.concat(file))
        }}
      ></input>
    </>
  )
}
export default function TestPage() {
  return (
    <Upload
      className='flex'
      onSuccess={(result) => {
        console.log('result', result)
      }}
    >
      {({ fileList, remove }) => (
        <div className='bg-pink-500'>
          <p>Upload</p>
          <ul
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            {fileList.map((file) => (
              <li key={file.name} onClick={() => remove(file)}>
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Upload>
  )
}
