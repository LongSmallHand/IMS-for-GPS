import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    // apiKey: "AIzaSyAEysMQiP1hcPfMj1cSpoiH3rMJ_t0C274",
    // authDomain: "doan-ce758.firebaseapp.com",
    // databaseURL: "https://doan-ce758-default-rtdb.asia-southeast1.firebasedatabase.app",
    // projectId: "doan-ce758",
    // storageBucket: "doan-ce758.appspot.com",
    // messagingSenderId: "773218346659",
    // appId: "1:773218346659:web:c0ed997f8663cb27da4116",
    // measurementId: "G-EGRL6BF5T0"
    apiKey: "AIzaSyB1vx2TC2M5I1sFVxrOsPNy-fhymp5Cpgk",
    authDomain: "esp32-jpg.firebaseapp.com",
    databaseURL: "https://esp32-jpg-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "esp32-jpg",
    storageBucket: "esp32-jpg.appspot.com",
    messagingSenderId: "920690890951",
    appId: "1:920690890951:web:3e512e0f9f2a09158fc6e2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export {database};