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
  collectCoverageFrom: ['src/util/*.ts', 'src/redux/(reducers|selectors)/*.ts'],
  moduleNameMapper: {
    '@actions/(.*)': '<rootDir>/src/redux/actions/$1',
    '@util/(.*)': '<rootDir>/src/util/$1',
  },
};
