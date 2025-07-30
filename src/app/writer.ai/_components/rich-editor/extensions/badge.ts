import { Node, type CommandProps, mergeAttributes } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    badge: {
      /**
       * Set a badge mark
       */
      setBadge: (attributes: BadgeAttributes) => ReturnType
      /**
       * Toggle a badge mark
       */
      toggleBadge: (attributes: BadgeAttributes) => ReturnType
      /**
       * Unset a badge mark
       */
      unsetBadge: ({ text }: Pick<BadgeAttributes, 'text'>) => ReturnType
    }
  }
}

interface BadgeAttributes {
  color: string
  text: string
  HTMLAttributes?: Record<string, any>
}

const Badge = Node.create<BadgeAttributes>({
  name: 'badge',

  group: 'inline',

  inline: true,

  atom: true,
  addOptions() {
    return {
      HTMLAttributes: {
        'style':
          'color: white; font-size: 0.9em; padding: 2px 3px; margin: 0 1px; border-radius: 6px; cursor: pointer;',
        'data-type': this.name,
        'class': 'badge',
      },
      color: 'red',
      text: '',
    }
  },

  addAttributes() {
    return {
      color: {
        default: 'red',
        parseHTML: (element: HTMLElement) =>
          element.getAttribute('data-color') || 'red',
        renderHTML: (attributes: BadgeAttributes) => {
          return {
            'data-color': attributes.color,
            'style': `background-color: ${attributes.color};`,
          }
        },
      },
      text: {
        default: '',
        rendered: false,
        // 从 html 中解析 为 prosemirror 中的 state
        parseHTML: (element: HTMLElement) => element.textContent,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: `span[data-type=${this.name}]`,
      },
    ]
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes || {}, HTMLAttributes),
      node.attrs.text,
    ]
  },

  addCommands() {
    return {
      setBadge:
        (attributes) =>
        ({ commands }: CommandProps) => {
          return commands.insertContent({
            type: this.name,
            attrs: attributes,
          })
        },

      unsetBadge:
        ({ text }) =>
        ({ commands }: CommandProps) => {
          return commands.insertContent(text)
        },
    }
  },
})

export default Badge
