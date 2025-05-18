// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLJ_CU_6ch-oqQ9kaJSmgDJ-wulKnUauk",
  authDomain: "lankacrafts-c243e.firebaseapp.com",
  projectId: "lankacrafts-c243e",
  storageBucket: "lankacrafts-c243e.appspot.com", // ✅ fixed domain
  messagingSenderId: "1059220872077",
  appId: "1:1059220872077:web:48bec29df8d70988987bc4",
  measurementId: "G-755ZD45HSL",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
