import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAlw7-xoxgSuYy-U2A0ckiWum3bRNIeWaI",
  authDomain: "task-manager-6e85e.firebaseapp.com",
  projectId: "task-manager-6e85e",
  storageBucket: "task-manager-6e85e.firebasestorage.app",
  messagingSenderId: "495580491676",
  appId: "1:495580491676:web:69848b38d1a59a0e892259",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth();
// db
export const db = getFirestore();
