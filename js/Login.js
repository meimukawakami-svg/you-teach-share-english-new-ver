import { auth } from '../firebase-config.js';
import { GoogleAuthProvider, signInWithPopup, setLanguageCode } from "firebase/auth"; 

/**
 * Executes Google login process. Sets language code to English for the popup.
 */
export const handleLogin = async () => {
  // Set Firebase Authentication UI language to English
  setLanguageCode(auth, 'en');
  
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("✅ Login Successful:", result.user.uid);
    return result.user;
  } catch (error) {
    console.error("❌ Login Error:", error.code, error.message);
    throw error;
  }
};
