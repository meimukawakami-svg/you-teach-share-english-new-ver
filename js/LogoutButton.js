import { auth } from '../firebase-config.js';
import { signOut } from "firebase/auth"; 

/**
 * Executes the user logout process.
 */
export const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log("✅ Logout Successful.");
  } catch (error) {
    console.error("❌ Logout Error:", error);
    throw error;
  }
};