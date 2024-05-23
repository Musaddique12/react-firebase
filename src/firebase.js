import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Database } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBQdfNvzG2--ZI4PssjjCfkPLIxQ1lR1ow",
  authDomain: "react-firebase-8cd35.firebaseapp.com",
  projectId: "react-firebase-8cd35",
  storageBucket: "react-firebase-8cd35.appspot.com",
  messagingSenderId: "787523402174",
  appId: "1:787523402174:web:4532e92c2b883366c221ef",
  measurementId: "G-ED1EKW13FL",
  DatabaseURL:"https://react-firebase-8cd35-default-rtdb.firebaseio.com"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);