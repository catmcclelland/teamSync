// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwTF3e0-SSB026F7HXDZMei54wDSQWoFE",
  authDomain: "teamsync-f3238.firebaseapp.com",
  projectId: "teamsync-f3238",
  storageBucket: "teamsync-f3238.appspot.com",
  messagingSenderId: "662889282711",
  appId: "1:662889282711:web:12a8895618e3d06e7ebdd2",
  measurementId: "G-3DNFLRLN89",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
