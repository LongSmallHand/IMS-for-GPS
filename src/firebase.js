// import firebase from "firebase/app";
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";
import {getStorage} from "firebase/storage"

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyA9f7rLwGXsl6Ym6OP_yU7FMsOeepYhk3g",
  authDomain: "loca-4d172.firebaseapp.com",
  projectId: "loca-4d172",
  storageBucket: "loca-4d172.appspot.com",
  messagingSenderId: "844951431449",
  appId: "1:844951431449:web:ec2a4316f152d5ebbd7d88",
  measurementId: "G-46GFGMR0QZ"
    // apiKey: "AIzaSyB1vx2TC2M5I1sFVxrOsPNy-fhymp5Cpgk",
    // authDomain: "esp32-jpg.firebaseapp.com",
    // databaseURL: "https://esp32-jpg-default-rtdb.asia-southeast1.firebasedatabase.app",
    // projectId: "esp32-jpg",
    // storageBucket: "esp32-jpg.appspot.com",
    // messagingSenderId: "920690890951",
    // appId: "1:920690890951:web:3e512e0f9f2a09158fc6e2"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
//Cloud Firestore
export const db = getFirestore();

export {database};