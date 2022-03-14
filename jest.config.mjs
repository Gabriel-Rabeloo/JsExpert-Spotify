const defaultConfig = {
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: {
      branch: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  maxWorkers: '50%',
  watchPathIgnorePatterns: ['node_modules'],
  transformIgnorePatterns: ['node_modules'],
};

export default {
  projects: [
    {
      ...defaultConfig,
      testEnvironment: 'node',
      displayName: 'backend',
      collectCoverageFrom: ['backend/', 'backend/index.js'],
      transformIgnorePatterns: [...defaultConfig.transformIgnorePatterns, 'frontend'],
      testMatch: ['**/tests/**/backend/**/*.test.js'],
    },
    {
      ...defaultConfig,
      testEnvironment: 'jsdom',
      displayName: 'frontend',
      collectCoverageFrom: ['frontend/'],
      transformIgnorePatterns: [...defaultConfig.transformIgnorePatterns, 'backend'],
      testMatch: ['**/tests/**/frontend/**/*.test.js'],
    },
  ],
};
