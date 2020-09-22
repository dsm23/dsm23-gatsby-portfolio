module.exports = {
  ci: {
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      assertions: {
        'first-contentful-paint': ['error', { maxNumericValue: 3000 }],
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
      },
    },
  },
};
