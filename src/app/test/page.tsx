'use client'

import React, { useRef, useState } from 'react'
import CanvasEditor from '@/app/_components/CanvasEditor'
import type { CanvasEditorRef } from '@/app/_components/CanvasEditor'

export default function Page() {
  const editorRef = useRef<CanvasEditorRef>(null)
  const [mask, setMask] = useState<string | null>(null)

  return (
    <div className='container mx-auto py-8'>
      <div className='mt-8 grid gap-4'>
        <h2 className='text-lg font-semibold'>Canvas Editor Demo</h2>
        <CanvasEditor
          editorRef={editorRef}
          src={'/dog.png'}
          viewportWidth={720}
          viewportHeight={480}
        />
        <div className='flex items-center gap-2'>
          <button
            className='rounded bg-white px-3 py-1 text-sm shadow'
            onClick={() => {
              const data = editorRef.current?.getMaskBase64() || null
              setMask(data)
            }}
          >
            导出 Mask
          </button>
          <button
            className='rounded bg-white px-3 py-1 text-sm shadow'
            onClick={() => editorRef.current?.clear()}
          >
            清空
          </button>
          <button
            className='rounded bg-white px-3 py-1 text-sm shadow'
            onClick={() => editorRef.current?.undo()}
          >
            撤销
          </button>
          <button
            className='rounded bg-white px-3 py-1 text-sm shadow'
            onClick={() => editorRef.current?.redo()}
          >
            重做
          </button>
        </div>
        {mask && (
          <div className='mt-2'>
            <div className='text-sm text-gray-500'>导出预览：</div>
            <img
              src={mask}
              alt='mask'
              className='mt-1 max-w-full rounded border'
            />
          </div>
        )}
      </div>
    </div>
  )
}
