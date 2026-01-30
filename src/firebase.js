import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";   
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDD7dKBZ9LLIjmgP-lMAQaB-BZBVRIIrM",
  authDomain: "readytocook-32a64.firebaseapp.com",
  projectId: "readytocook-32a64",
  storageBucket: "readytocook-32a64.firebasestorage.app",
  messagingSenderId: "749037036068",
  appId: "1:749037036068:web:daf34bca0998c3162e6eb1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

