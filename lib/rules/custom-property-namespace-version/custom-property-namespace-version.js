const fs = require('fs');
const findUp = require('find-up');
const stylelint = require('stylelint');
const valueParser = require('postcss-value-parser');

const ruleName = 'terra/custom-property-namespace-version';

const messages = stylelint.utils.ruleMessages(ruleName, {
  expected(property, namespace, version) {
    return `Expected ${property} to be prefixed with the namespace and version: --${namespace}-v${version}`;
  },
});

/**
 * Requires custom properties defined within var functions to be prefixed with a namespace and version.
 * @param {boolean} enabled - Indicates whether or not the rule is enabled.
 * @param {object} options - Custom rule configurations.
 * @return {func} - A rule function.
 */
const rule = (enabled, options = {}) => (root, result) => {
  if (!enabled) {
    return;
  }

  // Finds the nearest package json from the target file to obtain the package name and version.
  const packagePath = findUp.sync('package.json', { cwd: root.source.input.file });
  const packageJSON = JSON.parse(fs.readFileSync(packagePath));

  // If provided use the version and namespace. Fallback the the package json name and version.
  const version = parseInt(options.version || packageJSON.version.split('.').shift(), 10);
  const namespace = options.namespace || packageJSON.name;

  const regex = new RegExp(`--${namespace}-v(${version}|${version + 1})`);

  root.walkDecls((decl) => {
    valueParser(decl.value).nodes.forEach((node) => {
      if (node.type !== 'function' || node.value !== 'var') {
        return;
      }

      const { type, value } = node.nodes[0];
      if (type !== 'word' || value.slice(0, 2) !== '--' || regex.test(value)) {
        return;
      }

      stylelint.utils.report({
        message: messages.expected(value, namespace, version),
        node: decl,
        result,
        ruleName,
      });
    });
  });
};

module.exports = stylelint.createPlugin(ruleName, rule);
module.exports.ruleName = ruleName;
module.exports.messages = messages;
module.exports.primaryOptionArray = true;
