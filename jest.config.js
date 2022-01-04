module.exports = {
    roots: [
      '<rootDir>/src',
    ],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
    transform: {
        "^.+\\.(ts)$": "ts-jest"
    },
}
