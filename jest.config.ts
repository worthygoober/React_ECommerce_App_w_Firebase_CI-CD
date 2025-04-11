// module.exports = {
//     preset: 'ts-jest', // tells jest to use/expect typescript, not javascript
//     testEnvironment: 'jsdom', // will run inside simulated javascript model of DOM
//     moduleDirectories: ['node_modules', 'src'], // list of directories where jest should look for modules
//     moduleNameMapper: {
//         '^react-router-dom$': '<rootDir>/src/tests/__mocks__/react-router-dom.tsx',
//         '^react-router-dom$': require.resolve('react-router-dom'),
//     },
//     transform: {
//         '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
//     },
//     transformIgnorePatterns: [
//         // Add any packages that need to be transformed
//         '/node_modules/(?!(@firebase|firebase|react-router-dom|@testing-library|uuid|other-esm-packages)/)'
//     ],
// };

import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    '^@/config/firebaseConfig$': '<rootDir>/__mocks__/firebase.ts',
    '^src/(.*)$': '<rootDir>/src/$1', // optional: for cleaner imports like `src/pages/...`
  },
  transform: {
    // '^.+\\.[jt]sx?$': 'ts-jest',
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // if you have it
};

export default config;
