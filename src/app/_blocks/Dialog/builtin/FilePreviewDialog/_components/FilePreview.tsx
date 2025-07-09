import ReactMarkdown from 'react-markdown'

const file = `
# Hello Markdown

This is a **demo** of using react-markdown.

- Item 1
- Item 2

[Link](https://www.google.com)
`

export function FilePreview() {
  return (
    <div>
      <ReactMarkdown>{file}</ReactMarkdown>
    </div>
  )
}
