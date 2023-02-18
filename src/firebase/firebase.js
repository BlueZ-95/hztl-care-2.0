// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUzAG2GOU5TX8d_ps4RtpyIQtdBblHbbk",
  authDomain: "hztl-care.firebaseapp.com",
  projectId: "hztl-care",
  storageBucket: "hztl-care.appspot.com",
  messagingSenderId: "1088844107610",
  appId: "1:1088844107610:web:882d82658239b190fc2d63",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const firebaseAuth = getAuth();
export const firebaseStorage = getStorage();
