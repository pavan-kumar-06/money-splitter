// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAke6ZJCeGEcAPpp4_2h-3Inv2PhC7Ke1g",
  authDomain: "splitwise-clone-4f855.firebaseapp.com",
  projectId: "splitwise-clone-4f855",
  storageBucket: "splitwise-clone-4f855.appspot.com",
  messagingSenderId: "129753233745",
  appId: "1:129753233745:web:5f3e4d00f81695a7d03b70",
  measurementId: "G-WL6Y117LVK"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()
