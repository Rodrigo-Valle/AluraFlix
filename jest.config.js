module.exports = {
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/**/index.ts",
    "!<rootDir>/src/main/**/*"
  ],
  moduleNameMapper: {
    "@/tests/(.+)": "<rootDir>/tests/$1",
    "@/(.+)": "<rootDir>/src/$1"
  },
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  transform: {
    "\\.ts$": "ts-jest"
  }
};
