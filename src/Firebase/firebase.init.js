// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjRONuJmDeIwT5u0nq4-xjikGJua2jrcU",
  authDomain: "coffee-store-89076.firebaseapp.com",
  projectId: "coffee-store-89076",
  storageBucket: "coffee-store-89076.firebasestorage.app",
  messagingSenderId: "775606344752",
  appId: "1:775606344752:web:01df6e3892f169764621f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);