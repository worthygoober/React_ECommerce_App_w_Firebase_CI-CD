// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./config/firebaseConfig";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db = getFirestore(app);