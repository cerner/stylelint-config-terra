const browserslist = require('browserslist-config-terra');

module.exports = {
  extends: 'stylelint-config-sass-guidelines',
  plugins: [
    'stylelint-suitcss',
    'stylelint-no-unsupported-browser-features',
  ],
  rules: {
    'max-nesting-depth': 3,
    'scss/at-mixin-pattern': '^(terra-)[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    'suitcss/custom-property-no-outside-root': true,
    'custom-property-pattern': [
      'terra-[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
      {
        message: 'Custom property names should be written in lowercase with hyphens',
      },
    ],
    'plugin/no-unsupported-browser-features': [
      true,
      {
        browsers: browserslist,
        ignore: [
          'flexbox', // "flexbox" is only partially supported by IE 10,11
          'rem', // "rem" is only partially supported by IE 10
          'word-break', // "word-break" is only partially supported by Android Browser 4.3.4-4.4.4
        ],
        severity: 'warning',
      },
    ],
  },
};
