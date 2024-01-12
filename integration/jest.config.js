module.exports = {
    preset: "jest-puppeteer",
    testRegex: "./*\\.test\\.js$",
    setupFilesAfterEnv: ["./setupTests.js"],
    "extends": ["plugin:jest/recommended"],
    "plugins": ["jest"]
};