'use client'

import { Document, Page, pdfjs } from 'react-pdf'
import { useState } from 'react'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

export default function PDFViewer() {
  const [allPages, setAllPages] = useState<number[]>([])

  return (
    <Document
      file={'demo.pdf'}
      onLoadSuccess={(pdf) => {
        setAllPages(new Array(pdf.numPages).fill(0).map((_, index) => index))
      }}
    >
      {allPages.map((page) => {
        return (
          <Page
            pageIndex={page}
            key={page}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          ></Page>
        )
      })}
    </Document>
  )
}
