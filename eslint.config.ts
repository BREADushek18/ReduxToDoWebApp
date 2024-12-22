// @ts-expect-error TS(7016): Could not find a declaration file for module '@esl... Remove this comment to see the full error message
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'esli... Remove this comment to see the full error message
import reactHooks from 'eslint-plugin-react-hooks'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'esli... Remove this comment to see the full error message
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
