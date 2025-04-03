module.exports = {
    preset: 'ts-jest', // tells jest to use/expect typescript, not javascript
    testEnvironment: 'jsdom', // will run inside simulated javascript model of DOM
    moduleDirectories: ['node_modules', 'src'], // list of directories where jest should look for modules
    moduleNameMapper: {
        '^react-router-dom$': '<rootDir>/src/tests/__mocks__/react-router-dom.tsx',
        '^react-router-dom$': require.resolve('react-router-dom'),
    },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
  };