import js from '@eslint/js'
import globals from 'globals'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintConfigPrettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import noShortCircuitRenderConditions from './eslint-rules/no-short-circuit-render-conditions.js'
import preferFluentPrimitives from './eslint-rules/prefer-fluent-primitives.js'
import progressbarRequiresAccessibleName from './eslint-rules/progressbar-requires-accessible-name.js'

export default defineConfig([
  globalIgnores(['dist', 'coverage']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      'jsx-a11y': jsxA11y,
      'react-best-practices': {
        rules: {
          'no-short-circuit-render-conditions': noShortCircuitRenderConditions,
          'prefer-fluent-primitives': preferFluentPrimitives,
          'progressbar-requires-accessible-name': progressbarRequiresAccessibleName,
        },
      },
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      'react-best-practices/no-short-circuit-render-conditions': 'error',
      'react-best-practices/prefer-fluent-primitives': 'error',
      'react-best-practices/progressbar-requires-accessible-name': 'error',
    },
  },
  eslintConfigPrettier,
])
