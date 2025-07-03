// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsvhVxVcXG6P6ehNQIL2ZmQYIKobAsLlo",
  authDomain: "school-d9fe0.firebaseapp.com",
  projectId: "school-d9fe0",
  storageBucket: "school-d9fe0.firebasestorage.app",
  messagingSenderId: "74516905425",
  appId: "1:74516905425:web:15a61f649841653d05b4f0",
  measurementId: "G-1BJ1D18PNN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);