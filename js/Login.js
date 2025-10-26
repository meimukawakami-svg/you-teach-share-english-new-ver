import { auth } from '../firebase-config.js';
import { 
    signInWithEmailAndPassword, 
    setPersistence, 
    browserSessionPersistence, 
    setLanguageCode 
} from "firebase/auth"; 

/**
 * Executes login using email and password. 
 * Sets the Firebase UI language to English and redirects upon success.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 */
export const handleLogin = async (email, password) => {
  // Set Firebase Authentication UI language to English (for error messages, etc.)
  setLanguageCode(auth, 'en');
  
  // Set persistence to maintain the user session across browser closures
  await setPersistence(auth, browserSessionPersistence); 
  
  try {
    // Execute sign-in with email and password
    const result = await signInWithEmailAndPassword(auth, email, password);
    
    console.log("✅ Login Successful:", result.user.uid);
    
    window.location.href = 'products.html'; 

    return result.user;
  } catch (error) {
    let errorMessage = "An unknown login error occurred.";
    
    // Customize error messages based on Firebase error codes (in English)
    if (error.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password. Please try again.";
    } else if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        errorMessage = "The email or password you entered is incorrect.";
    } else if (error.code === 'auth/invalid-email') {
        errorMessage = "The email address format is invalid.";
    }
    
    console.error("❌ Login Error:", error.code, error.message);
    alert(`Login failed: ${errorMessage}`); 
    throw error;
  }
};