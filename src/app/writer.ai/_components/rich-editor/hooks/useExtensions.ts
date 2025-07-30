import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import Badge from '../extensions/badge'
import { Markdown } from 'tiptap-markdown'
import CodeBlockHighlight from '../extensions/code-block-highlight'
import Underline from '@tiptap/extension-underline'
import CharacterCount from '@tiptap/extension-character-count'
import { CHAR_LIMIT } from '@/constant'
import Highlight from '@tiptap/extension-highlight'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
export default function useExtensions() {
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
    TextStyle,
    Color,
    Highlight.configure({ multicolor: true }),
  ]
}
