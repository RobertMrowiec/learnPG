module.exports = {
    "modulePaths": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.ts?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(^((?!integration).)*(\\.|/)(test|spec))\\.tsx?$)",
    "moduleFileExtensions": [
        "ts",
        "js",
        "json",
        "node"
    ],
}
