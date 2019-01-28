const browserslist = require('browserslist-config-terra');

module.exports = {
  extends: 'stylelint-config-sass-guidelines',
  plugins: [
    'stylelint-suitcss',
    'stylelint-no-unsupported-browser-features',
    './lib/rules/custom-property-no-duplicate-declaration/custom-property-no-duplicate-declaration',
    './lib/rules/custom-property-name/custom-property-name',
    './lib/rules/custom-property-pattern/custom-property-pattern',
    './lib/rules/custom-property-pseudo-selectors/custom-property-pseudo-selectors',
    './lib/rules/custom-property-namespace/custom-property-namespace',
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
    'terra/custom-property-name': true,
    'terra/custom-property-no-duplicate-declaration': true,
    'terra/custom-property-pattern': true,
    'terra/custom-property-pseudo-selectors': true,
    'terra/custom-property-namespace': true,
    'plugin/no-unsupported-browser-features': [
      true,
      {
        browsers: browserslist,
        ignore: [
          'calc', // "calc" is only partially supported by Android Browser 4.4.3-4.4.4
          'cursor', // "css3-cursors" is not supported by iOS Safari 10.0-10.2,10.3,11.0-11.2,11.3-11.4, Android Browser 4.4.3-4.4.4
          'flexbox', // "flexbox" is only partially supported by IE 10,11
          'outline', // "outline" is only partially supported by IE 10,11
          'rem', // "rem" is only partially supported by IE 10
          'word-break', // "word-break" is only partially supported by Android Browser 4.3.4-4.4.4
        ],
        severity: 'warning',
      },
    ],
  },
};
