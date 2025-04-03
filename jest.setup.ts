global.importMetaEnv = {
    VITE_APP_FIREBASE_API_KEY: "mock-firebase-api-key",
    VITE_APP_FIREBASE_AUTH_DOMAIN: "mock-auth-domain",
    VITE_APP_FIREBASE_PROJECT_ID: "mock-project-id",
    VITE_APP_FIREBASE_STORAGE_BUCKET: "mock-storage-bucket",
    VITE_APP_FIREBASE_MESSAGING_SENDER_ID: "mock-messaging-sender-id",
    VITE_APP_FIREBASE_APP_ID: "mock-app-id"
  };
  
  // Override import.meta.env to use the mocked values
  Object.defineProperty(global, 'import.meta', {
    value: { env: global.importMetaEnv },
  });