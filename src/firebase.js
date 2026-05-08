// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBmRIDZQB9zeXmtBAL98VudcQJS2TyN0Yg",
  authDomain: "portfolio-3bd13.firebaseapp.com",
  databaseURL: "https://portfolio-3bd13-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "portfolio-3bd13",
  storageBucket: "portfolio-3bd13.firebasestorage.app",
  messagingSenderId: "160066418348",
  appId: "1:160066418348:web:ba65cf7019fbab7311d109",
  measurementId: "G-YZDDQ7KK68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);