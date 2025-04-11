// Snapshot testing

import { render } from '@testing-library/react';
import Login from '../pages/Login/Login';

// mocks firebase authentication
jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({
      signInWithEmailAndPassword: jest.fn(() => Promise.resolve({
        user: {
          uid: 'test-uid',
          email: 'test@example.com'
        }
      })),
      onAuthStateChanged: jest.fn(),
      signOut: jest.fn(),
      currentUser: null
    }))
}));
  
jest.mock('firebase/app', () => ({
    initializeApp: jest.fn(() => {

        return {
          auth: jest.fn(() => ({
            signInWithEmailAndPassword: jest.fn(() => Promise.resolve({
              user: { uid: 'test-uid', email: '[test@example.com](mailto:test@example.com)' },
            })),
            onAuthStateChanged: jest.fn(),
            signOut: jest.fn(),
          })),
          firestore: jest.fn(() => ({})),
        };
    }),
}));

jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(() => ({})),
}));

// 2. Mock environment variables
beforeAll(() => {
    console.log('VITE_APP_FIREBASE_API_KEY', process.env.VITE_APP_FIREBASE_API_KEY)
    // Mock all Vite environment variables used in firebase.ts
    process.env = {
      ...process.env, // Preserve existing env vars
      VITE_APP_FIREBASE_API_KEY: process.env.VITE_APP_FIREBASE_API_KEY || 'test-api-key-mock',
      VITE_APP_FIREBASE_AUTH_DOMAIN: 'mock-project.firebaseapp.com',
      VITE_APP_FIREBASE_PROJECT_ID: 'mock-project-id',
      VITE_APP_FIREBASE_STORAGE_BUCKET: 'mock-project.appspot.com',
      VITE_APP_FIREBASE_MESSAGING_SENDER_ID: '1234567890',
      VITE_APP_FIREBASE_APP_ID: '1:1234567890:web:mockappid',
    };
  });


// 3. Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

// 4. Mock AuthContext if used
jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    currentUser: null,
    loading: false,
    login: jest.fn(),
    logout: jest.fn()
  }),
}));

// Cleanup after each test
afterEach(() => {
  jest.clearAllMocks();
});

describe('Login Component', () => {
  test('matches snapshot', () => {
    const { asFragment } = render(<Login />);
    expect(asFragment()).toMatchSnapshot();
  });
});