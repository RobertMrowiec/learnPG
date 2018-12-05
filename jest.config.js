module.exports = {
  "modulePaths": [
    "<rootDir>"
  ],
  "transform": {
    "^.+\\.ts?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(spec))\\.ts?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  watchman: false,
  bail: true,
  collectCoverage: true,
  cacheDirectory: __dirname + '/jest-cache',
  coverageDirectory: 'testCoverage',
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": -5
    }
  }
}
