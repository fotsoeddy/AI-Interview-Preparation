// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

