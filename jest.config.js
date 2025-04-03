const { transform } = require("typescript");

module.exports = {
    preset: 'ts-jest', // tells jest to use/expect typescript, not javascript
    testEnvironment: 'jsdom', // will run inside simulated javascript model of DOM
    moduleDirectories: ['node_modules', 'src'], // list of directories where jest should look for modules
    transform: {
        "^.+\\.(ts|tsx)$": "babel-jest",
    },
    setupFiles: ["<rootDir>/jest.setup.js"], // Add the setup file
    moduleNameMapper: {
        "^react-router-dom$": "<rootDir>/node_modules/react-router-dom", // Fixes missing react-router-dom
      },
  };