export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-clean-order',
    'stylelint-config-recess-order',
  ],
  overrides: [
    {
      files: ['**/*.{scss,css}'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    'selector-class-pattern':
      '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$',
    'color-function-notation': 'modern',
    'alpha-value-notation': 'number',
    'comment-empty-line-before': null,
  },
}
