export default {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverage: true,
  collectCoverageFrom: ['routes/*.ts', 'util/*.ts'],
  globalSetup: './test/globalSetup.ts',
  globalTeardown: './test/globalTeardown.ts',
  setupFilesAfterEnv: ['./test/setupFile.ts'],
  maxWorkers: 1,
};
