// @ts-nocheck

// https://www.figma.com/design/a8KkXFthBNIzeOtFg3QdQH/template?node-id=0-1&t=4hQAaXAqvv8WiVXF-1
import path from 'node:path'
import { loadFigmaIconSets } from 'tailwindcss-plugin-iconify/figma-icon-sets/node'

const token = process.env.FIGMA_ACCESS_TOKEN
if (!token) {
  throw new Error('FIGMA_ACCESS_TOKEN is not set')
}

console.log('load token from FIGMA_ACCESS_TOKEN', token)
// importFigmaIconSets({
//   files: [
//     {
//       id: 'a8KkXFthBNIzeOtFg3QdQH',
//       prefix: 'cus',
//     },
//   ],
//   token,
//   preserveColorsGroup: 'un-colored',
//   cache: true,
//   cacheOptions: {
//     ifModifiedSince: true,
//   },
// }).then((...params) => {
//   console.log('params', params)
// })
loadFigmaIconSets({
  import: {
    files: [
      {
        id: 'a8KkXFthBNIzeOtFg3QdQH',
        prefix: 'cus',
      },
    ],
    token,
    preserveColorsGroup: 'un-colored',
    cache: true,
    cacheOptions: {
      ifModifiedSince: true,
    },
  },
  write: {
    outputDir: path.join(process.cwd(), 'src', 'assets', 'figma'),
  },
})
