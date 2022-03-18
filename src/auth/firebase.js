import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_kQBYyO8pIBhMTGOuEOxaoQzNrtI27m0",
  authDomain: "chatbot-c37e5.firebaseapp.com",
  projectId: "chatbot-c37e5",
  storageBucket: "chatbot-c37e5.appspot.com",
  messagingSenderId: "74166020444",
  appId: "1:74166020444:web:4d92b336b84a12f0f13999",
  measurementId: "G-PXFQRZR4KW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
  } catch (err) {
    console.error(err);
  }
};

export {
  auth,
  db,
  signInWithGoogle,
};