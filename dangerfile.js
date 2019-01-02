// eslint-disable-next-line import/no-extraneous-dependencies
import { danger, warn, fail } from 'danger';

const hasCHANGELOGChanges = danger.git.modified_files.some((filePath) => {
  const srcFilePattern = /CHANGELOG.md/i;
  return srcFilePattern.test(filePath);
});

const hasModifiedConfigFile = danger.git.modified_files.some((filePath) => {
  const scriptFilePattern = /stylelint.config.js/i;
  return scriptFilePattern.test(filePath);
});

const hasModifiedRulesFiles = danger.git.modified_files.some((filePath) => {
  const srcFilePattern = /lib\/rules/i;
  return srcFilePattern.test(filePath);
});

const addedRules = danger.git.created_files.filter((filePath) => {
  const srcFilePattern = /lib\/rules/i;
  return srcFilePattern.test(filePath);
});

const hasNewRules = addedRules.length > 0;

// Fail if there are rule additions or changes without a CHANGELOG update
if ((hasModifiedConfigFile || hasModifiedRulesFiles || hasNewRules) && !hasCHANGELOGChanges) {
  fail('Please include a CHANGELOG entry with this PR.');
}

if (hasNewRules) {
  const addedDocForRules = danger.git.created_files.filter((filePath) => {
    const srcFilePattern = /README.md$/i;
    return srcFilePattern.test(filePath);
  });

  let hasDocForEachNewRule = false;
  if (addedDocForRules.length !== 0) {
    hasDocForEachNewRule = addedRules.every((ruleFile) => {
      const ruleDir = ruleFile.replace(/lib\/rules\//, '').split('/')[0];
      return addedDocForRules.every(docFile => docFile.includes(`${ruleDir}/README.md`));
    });
  }

  // Fail if a new rule is added without its corresponding documentent changes
  if (hasNewRules && !hasDocForEachNewRule) {
    fail('Please include the corresponding rule documentation.');
  }

  const hasREADMEChanges = danger.git.modified_files.some((filePath) => {
    const srcFilePattern = /^README.md/i;
    return srcFilePattern.test(filePath);
  });

  // Fail if the new rule(s) were not added to the README
  if (hasNewRules && !hasREADMEChanges) {
    fail('Please add the new rule(s) to the rule list in the README.');
  }
}

if (process.env.CI || process.env.TRAVIS) {
  // Warn when there is a big PR
  const bigPRThreshold = 1000;
  if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
    warn(':exclamation: Big PR. Consider breaking this into smaller PRs if applicable');
  }
}
