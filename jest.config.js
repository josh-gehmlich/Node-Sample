module.exports = {
  preset: 'ts-jest',
  verbose: false,
  globalSetup: './jest/setup.js',
  globalTeardown: './jest/teardown.js',
  testEnvironment: './jest/mongo.js'
}
