module.exports = {
  '*.ts?(x)': [() => 'npm run typecheck', 'npm run lint-fix', 'npm run lint-imports-fix'],
  'package-lock.json': () => 'npm i --package-lock-only',
  '*': 'npm run prettier-fix',
};
