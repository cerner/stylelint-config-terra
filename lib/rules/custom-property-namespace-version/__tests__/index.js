const testRule = require('stylelint-test-rule-tape');
const { rule, ruleName, messages } = require('../custom-property-namespace-version.js');

testRule(rule, {
  ruleName,
  config: true,
  skipBasicChecks: true,

  accept: [
    { code: '.test { color: var(--stylelint-config-terra-v1-color) }' },
    { code: '.test { color: var(--stylelint-config-terra-v1-color) }' },
  ],

  reject: [
    {
      description: 'Should reject custom properties that do not include a namespace',
      code: '.test { color: var(--test-color) }',
      message: messages.expected('--test-color', 'stylelint-config-terra', 1),
      line: 1,
      column: 9,
    },
    {
      description: 'Should reject custom properties that do not include a version',
      code: '.test { color: var(--terra-example-color) }',
      message: messages.expected('--terra-example-color', 'stylelint-config-terra', 1),
      line: 1,
      column: 9,
    },
  ],
});

testRule(rule, {
  ruleName,
  config: [
    true,
    {
      namespace: 'mock-namespace',
      version: '4',
    }],
  skipBasicChecks: true,

  accept: [
    { code: '.test { color: var(--mock-namespace-v4-color) }' },
    { code: '.test { color: var(--mock-namespace-v5-color) }' },
  ],

  reject: [
    {
      description: 'Should reject custom properties that do not include a namespace',
      code: '.test { color: var(--test-color) }',
      message: messages.expected('--test-color', 'mock-namespace', 4),
      line: 1,
      column: 9,
    },
    {
      description: 'Should reject custom properties that do not include a version',
      code: '.test { color: var(--mock-namespace-color) }',
      message: messages.expected('--mock-namespace-color', 'mock-namespace', 4),
      line: 1,
      column: 9,
    },
  ],
});
