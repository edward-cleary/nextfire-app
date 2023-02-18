import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDocs, query, collection, where, limit } from "firebase/firestore";

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

/// Helper functions

/**
 * Gets a users/{uid} document with username
 * @param {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = collection(firestore, "users");
  const q = query(usersRef, where("username", "==", username));
  const userDoc = (await getDocs(q)).docs[0];
  return userDoc;
}

/**
 * Converts a firestore document to JSON
 * @param {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serailizable to JSON
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}

/**
 * Convers milliseconds to a firestore timestamp
 */
export const fromMillis = Timestamp.fromMillis;
