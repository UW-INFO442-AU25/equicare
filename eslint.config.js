import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  // Ignore common build/output folders
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['node_modules', 'dist'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettier, // disables stylistic rules Prettier will handle
    ],
    plugins: {
      react,
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      ecmaVersion: 2021,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react/react-in-jsx-scope': 'off', // not needed in React 17+
      'react/prop-types': 'off', // optional if not using PropTypes
      'jsx-a11y/alt-text': 'warn', // accessibility example
    },
  },
]);
