import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiTcpdw1_LeamwNy1nMbSvEpXWMjpCdJQ",
  authDomain: "you-teach-share-english-new.firebaseapp.com",
  projectId: "you-teach-share-english-new",
  storageBucket: "you-teach-share-english-new.firebasestorage.app",
  messagingSenderId: "1020891562553",
  appId: "1:1020891562553:web:fb5de6b9e6cd53adcdc3e8"
};
// ----------------------------------------------------

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export instances for use in other files
export const auth = getAuth(app);
export const db = getFirestore(app); 
export const storage = getStorage(app);