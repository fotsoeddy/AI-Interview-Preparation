// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7KX92yqRU0NlvNdV4nJ4dQAIzQA6phUc",
  authDomain: "prepwise-22b6e.firebaseapp.com",
  projectId: "prepwise-22b6e",
  storageBucket: "prepwise-22b6e.firebasestorage.app",
  messagingSenderId: "870267865069",
  appId: "1:870267865069:web:278410c2b1aa66e86b09e4",
  measurementId: "G-TRZQG7SC32"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
// export const storage = getStorage(app);