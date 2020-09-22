module.exports = {
  extends: ['airbnb', 'airbnb/hooks'],
  'import/no-extraneous-dependencies': [
    'error',
    { devDependencies: ['cypress/**', '**/*.test.js'] },
  ],
};
