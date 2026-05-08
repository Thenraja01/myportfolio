// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf70kUcb30y3lWLYDROGsIg5GkYzSceDo",
  authDomain: "portfoliodb-442e0.firebaseapp.com",
  databaseURL: "https://portfoliodb-442e0-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "portfoliodb-442e0",
  storageBucket: "portfoliodb-442e0.firebasestorage.app",
  messagingSenderId: "701002211846",
  appId: "1:701002211846:web:f3530a9a47ca87ca691987",
  measurementId: "G-Z3JWMLCM0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app);