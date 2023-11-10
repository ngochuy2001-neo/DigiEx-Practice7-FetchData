// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GithubAuthProvider, getAuth } from "firebase/auth";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth/cordova";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyC2JlFTgbvAi73rVyT7ho3iiWrKYf0yJ9o",
  authDomain: "digiextraining.firebaseapp.com",
  projectId: "digiextraining",
  storageBucket: "digiextraining.appspot.com",
  messagingSenderId: "201042315792",
  appId: "1:201042315792:web:c8ad50a2f9f1f0f9359895",
  measurementId: "G-KGKZ6X38PX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

if (typeof window != "undefined") {
  const analytics = getAnalytics(app);
}

export { auth, googleProvider, facebookProvider, githubProvider };
