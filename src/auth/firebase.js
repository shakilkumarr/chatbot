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
  apiKey: "AIzaSyA_LFQRHzPGnqPPLfmedqmP122ooZtz4n0",
  authDomain: "ece-chatbot-fb958.firebaseapp.com",
  projectId: "ece-chatbot-fb958",
  storageBucket: "ece-chatbot-fb958.appspot.com",
  messagingSenderId: "627878010553",
  appId: "1:627878010553:web:eb66c9847332aac3334568",
  measurementId: "G-7G45H1P8JJ"
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
    setTimeout(() => alert('You are not authorised to view this application!'), 0);
  }
};

export {
  auth,
  db,
  signInWithGoogle,
};