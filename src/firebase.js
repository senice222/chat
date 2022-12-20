import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "chat-684d1.firebaseapp.com",
  projectId: "chat-684d1",
  storageBucket: "chat-684d1.appspot.com",
  messagingSenderId: "447838537714",
  appId: "1:447838537714:web:ff3eadde15b1b54efa4d6b"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
