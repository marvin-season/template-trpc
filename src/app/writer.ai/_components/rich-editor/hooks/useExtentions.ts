import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import Badge from '../extentions/badge'
import { Markdown } from 'tiptap-markdown'
import CodeBlockHighlight from '../extentions/code-block-highlight'
import Underline from '@tiptap/extension-underline'
import CharacterCount from '@tiptap/extension-character-count'
import { CHAR_LIMIT } from '@/constant'
export default function useExtentions() {
  return [
    StarterKit.configure({
      heading: {
        HTMLAttributes: {
          type: 'tiptap-heading',
        },
      },
    }),
    Badge,
    Markdown,
    CharacterCount.configure({
      limit: CHAR_LIMIT,
    }),
    Underline,
    CodeBlockHighlight,
    Placeholder.configure({
      placeholder({ node }) {
        if (node.type.name === 'codeBlock') {
          return 'code here...'
        }
        return '妙笔生花'
      },
    }),
  ]
}
