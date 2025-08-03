export default {
  testEnvironment: "node",
  transform: {},
  moduleNameMapper: { "^(.{1,2}/.*).js$": "$1" },
  verbose: true,
  silent: true, // Silences console logs during tests
  setupFilesAfterEnv: ["./tests/setup.js"],
};
