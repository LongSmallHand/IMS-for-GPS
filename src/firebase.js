// import firebase from "firebase/app";
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";
import {getStorage} from "firebase/storage"

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ########################
  // ########################
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