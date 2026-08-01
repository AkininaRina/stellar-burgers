module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  moduleNameMapper: {
    '^@api$': '<rootDir>/src/utils/burger-api',
    '^@utils-types$': '<rootDir>/src/utils/types'
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx']
};
