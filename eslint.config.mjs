/** @prettier */

// "off", 0, "warn", 1, "error", or 2.

// https://zenn.dev/keita_hino/articles/798bf62c6db663
// https://zenn.dev/babel/articles/eslint-flat-config-for-babel
// https://qiita.com/masakinihirota/items/ba54efa93989de68d2a0

import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import js from '@eslint/js';
import typeScriptESLint from '@typescript-eslint/eslint-plugin';
import typeScriptESLintParser from '@typescript-eslint/parser';

const compat = new FlatCompat();

export default [
  {
    files: ['**/*.js', '**/*.mjs'],
    ignores: ['**/theme/**', '**/dist/**'],
  },
  js.configs.recommended,
  eslintConfigPrettier,
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  {
    languageOptions: {
      parser: js.parser,
      globals: {
        ...globals.es2024,
        ...globals.commonjs,
        ...globals.node,
        ...globals.browser,
        module: 'readonly',
      },
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2024,
      },
    },
    rules: {
      strict: [2, 'function'],
      semi: 'error',
      eqeqeq: 'error',
      'space-before-blocks': [2, 'always'],
      'space-before-function-paren': [
        2,
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      'space-infix-ops': 'error',
      'keyword-spacing': 'error',
      'import/no-unresolved': 'off',
      indent: [
        'error',
        2,
        {
          SwitchCase: 1,
        },
      ],
      'linebreak-style': [2, 'unix'],
      quotes: [2, 'single'],
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'ignore',
        },
      ],
      curly: 'error',
      camelcase: 'error',
      'brace-style': 'error',
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': 'error',
      'no-nested-ternary': 'error',
      'no-var': 'error',
      'no-console': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      typeScriptESLint,
    },
    languageOptions: {
      parser: typeScriptESLintParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];
