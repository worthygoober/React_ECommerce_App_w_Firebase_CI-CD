// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const env = typeof process !== "undefined" ? process.env : import.meta.env;

const firebaseConfig = {

  apiKey: env.VITE_APP_FIREBASE_API_KEY,

  authDomain: env.VITE_APP_FIREBASE_AUTH_DOMAIN,

  projectId: env.VITE_APP_FIREBASE_PROJECT_ID,

  storageBucket: env.VITE_APP_FIREBASE_STORAGE_BUCKET,

  messagingSenderId: env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,

  appId: env.VITE_APP_FIREBASE_APP_ID

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db = getFirestore(app);