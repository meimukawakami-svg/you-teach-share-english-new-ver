import { storage } from '../firebase-config.js';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Uploads an image file to Firebase Storage.
 * @param {File} imageFile - The file to upload.
 * @param {string} userId - The ID of the current user.
 * @returns {Promise<string>} The public URL of the uploaded image.
 */
export const uploadImage = async (imageFile, userId) => {
  // Storageのパスを定義 (例: images/user_id/timestamp_filename)
  const timestamp = Date.now();
  const storageRef = ref(storage, `images/${userId}/${timestamp}_${imageFile.name}`);

  try {
    const snapshot = await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log("✅ Image uploaded successfully. URL:", downloadURL);
    return downloadURL;

  } catch (error) {
    console.error("❌ Error uploading image to Storage:", error);
    throw new Error("Image upload failed.");
  }
};