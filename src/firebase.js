// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";   
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBypvy25taphD7NtfYruXzYp-RFaqsLNy0",
  authDomain: "greenwaycabpln-app.firebaseapp.com",
  projectId: "greenwaycabpln-app",
  storageBucket: "greenwaycabpln-app.firebasestorage.app",
  messagingSenderId: "23971546888",
  appId: "1:23971546888:web:e9e3368272bb0a77de8ebd"

};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);

