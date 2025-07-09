# ESLint Config

## Tailwind auto fixed

https://github.com/schoero/eslint-plugin-better-tailwindcss?tab=readme-ov-file#readme

```js
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'
import eslintParserTypeScript from '@typescript-eslint/parser'

export default [
  {
    ignores: ['.next'],
  },
  {
    files: ['**/*.{ts,tsx,cts,mts}'],
    languageOptions: {
      parser: eslintParserTypeScript,
      parserOptions: {
        project: true,
      },
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/styles/globals.css',
      },
    },
    plugins: {
      'better-tailwindcss': betterTailwindcss,
    },
    rules: {
      // enable all recommended rules to report a warning
      ...betterTailwindcss.configs['recommended-warn']?.rules,
    },
  },
]
```
