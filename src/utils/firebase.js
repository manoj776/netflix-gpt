// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvay8EnYrm7p6VLvzTduTGac8Ta16UpfQ",
  authDomain: "netflixgpt-d2d60.firebaseapp.com",
  projectId: "netflixgpt-d2d60",
  storageBucket: "netflixgpt-d2d60.appspot.com",
  messagingSenderId: "160389739566",
  appId: "1:160389739566:web:a4624e23aa285079fddbbf",
  measurementId: "G-7J4C9KSBQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();