// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPkDZbgS9ObAlTY6vbITscr-9GlVTtCko",
  authDomain: "bssp-36ba4.firebaseapp.com",
  projectId: "bssp-36ba4",
  storageBucket: "bssp-36ba4.appspot.com",
  messagingSenderId: "997307058360",
  appId: "1:997307058360:web:81c1db11f3b7ab120a4c4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export Firebase object
export default db;