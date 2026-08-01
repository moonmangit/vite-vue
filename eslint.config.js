import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import boundaries from 'eslint-plugin-boundaries'
import eslintPluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import typescriptEslint from 'typescript-eslint'

export default typescriptEslint.config(
  {
    ignores: ['dist', 'node_modules', 'coverage', '*.d.ts'],
  },
  {
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...eslintPluginVue.configs['flat/recommended'],
    ],
    plugins: {
      boundaries,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts', '.vue'],
        },
      },
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        {
          type: 'app',
          pattern: 'src/app/*',
          mode: 'folder',
        },
        {
          type: 'shared',
          pattern: 'src/shared/*',
          mode: 'folder',
        },
        {
          type: 'feature',
          pattern: 'src/feature/*',
          mode: 'folder',
          capture: ['featureName'],
        },
      ],
    },
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          checkUnknownLocals: true,
          message: 'Import from {{from.type}} to {{to.type}} is not allowed by project boundaries.',
          rules: [
            {
              from: { type: 'app' },
              allow: {
                to: { type: ['app', 'shared', 'feature'] },
              },
            },
            {
              from: { type: 'feature' },
              allow: {
                to: [
                  { type: 'shared' },
                  { type: 'feature', captured: { featureName: '{{from.featureName}}' } },
                ],
              },
            },
            {
              from: { type: 'shared' },
              allow: {
                to: { type: 'shared' },
              },
            },
          ],
        },
      ],
      'vue/multi-word-component-names': 'off',
    },
  },
  eslintConfigPrettier,
)
