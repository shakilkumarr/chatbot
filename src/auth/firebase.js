import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyA_kQBYyO8pIBhMTGOuEOxaoQzNrtI27m0",
//   authDomain: "chatbot-c37e5.firebaseapp.com",
//   projectId: "chatbot-c37e5",
//   storageBucket: "chatbot-c37e5.appspot.com",
//   messagingSenderId: "74166020444",
//   appId: "1:74166020444:web:4d92b336b84a12f0f13999",
//   measurementId: "G-PXFQRZR4KW"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDs9KjqrOvTFEDENF9sCZHgw-yrdbNDD6g",
  authDomain: "chat-d92da.firebaseapp.com",
  projectId: "chat-d92da",
  storageBucket: "chat-d92da.appspot.com",
  messagingSenderId: "161608936622",
  appId: "1:161608936622:web:500b8661200b294daf113f",
  measurementId: "G-VF8YY85PK3"
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