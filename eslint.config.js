import betterTailwindcss from 'eslint-plugin-better-tailwindcss'
import eslintParserTypeScript from '@typescript-eslint/parser'
import gitignore from 'eslint-config-flat-gitignore'
import { defineConfig } from 'eslint/config'
export default defineConfig([
  gitignore(),
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
])
