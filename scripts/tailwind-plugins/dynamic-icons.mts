import path from 'node:path'
import { addDynamicIconSelectors } from 'tailwindcss-plugin-iconify'
import { getLocalIconSets } from 'tailwindcss-plugin-iconify/local-icon-sets'

export default addDynamicIconSelectors({
  prefix: 'i',
  iconSets: {
    ...getLocalIconSets({
      define: {
        cus: {
          iconifyJsonPath: path.join(
            __dirname,
            '../..',
            'src',
            'assets',
            'figma',
            'cus',
            'icons.json',
          ),
        },
        com: {
          iconifyJsonPath: path.join(
            __dirname,
            '../..',
            'src',
            'assets',
            'figma',
            'com',
            'icons.json',
          ),
        },
      },
    }),
  },
  preprocessSets: {
    'bx': '*',
    'svg-spinners': ['180-ring-with-bg'],
  },
})
