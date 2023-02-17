import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDKElmL9hJuSjwnIl5OKxC-Qo8htbqiNSc",
  authDomain: "next-firebase-353e7.firebaseapp.com",
  projectId: "next-firebase-353e7",
  storageBucket: "next-firebase-353e7.appspot.com",
  messagingSenderId: "4706336598",
  appId: "1:4706336598:web:c2b204b98ad88b13a360f7",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();
