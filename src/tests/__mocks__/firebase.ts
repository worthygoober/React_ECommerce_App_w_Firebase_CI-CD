export const auth = {
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve({
      user: {
        uid: 'test-uid',
        email: 'test@example.com'
      }
    })),
    onAuthStateChanged: jest.fn(),
    signOut: jest.fn(),
    currentUser: null
  };
  
  export const firebaseConfig = {
    apiKey: process.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: 'test.firebaseapp.com',
    projectId: 'test-project',
    storageBucket: 'test.appspot.com',
    messagingSenderId: '123456789',
    appId: '1:123456789:web:abcdef123456',
    // Include all required config fields
  };
  
  // For default exports if your Firebase uses them
  export default {
    auth,
    firebaseConfig
  };