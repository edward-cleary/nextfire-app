import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDKElmL9hJuSjwnIl5OKxC-Qo8htbqiNSc",
  authDomain: "next-firebase-353e7.firebaseapp.com",
  projectId: "next-firebase-353e7",
  storageBucket: "next-firebase-353e7.appspot.com",
  messagingSenderId: "4706336598",
  appId: "1:4706336598:web:c2b204b98ad88b13a360f7",
});

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();
