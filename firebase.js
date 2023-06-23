// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsNtcezWFYaiaiqrYAYKdILUGDZ2khkK4",
  authDomain: "signal-clone-a97a5.firebaseapp.com",
  projectId: "signal-clone-a97a5",
  storageBucket: "signal-clone-a97a5.appspot.com",
  messagingSenderId: "1082463836838",
  appId: "1:1082463836838:web:a8369819257b2ece7c3267",
  measurementId: "G-4EH50H3L9J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const db = getDatabase(app);

export { auth, db };
