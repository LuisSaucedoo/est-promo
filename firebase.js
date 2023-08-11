import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsNtexc60sDfbDsQwL3HElqX0nhiqalh4",
  authDomain: "estropical-promocodes.firebaseapp.com",
  projectId: "estropical-promocodes",
  storageBucket: "estropical-promocodes.appspot.com",
  messagingSenderId: "690374380798",
  appId: "1:690374380798:web:e45801e8632d9ad4ed69af"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };