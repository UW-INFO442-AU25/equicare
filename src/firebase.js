// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFmgdBIS13T2UVsnHRHb1gkb2i0BtfZFQ",
  authDomain: "equicare-442.firebaseapp.com",
  projectId: "equicare-442",
  storageBucket: "equicare-442.firebasestorage.app",
  messagingSenderId: "544581394107",
  appId: "1:544581394107:web:10722b7cadde93ed90139e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
