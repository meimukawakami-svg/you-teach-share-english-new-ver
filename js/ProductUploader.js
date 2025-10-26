import { db } from '../firebase-config.js';
import { auth } from '../firebase-config.js';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { uploadImage } from './ImageUploader.js';

/**
 * Uploads product details and an image to Firebase.
 * @param {string} productName - The name of the product.
 * @param {File} imageFile - The image file to upload.
 */
export const uploadProduct = async (productName, imageFile) => {
  const user = auth.currentUser;
  if (!user) {
    alert("Please log in before uploading a product.");
    console.error("❌ Upload Error: User not logged in.");
    return;
  }
  
  if (!productName || !imageFile) {
      alert("Please provide both a product name and an image.");
      return;
  }

  try {
    const imageUrl = await uploadImage(imageFile, user.uid);

    const docRef = await addDoc(collection(db, "products"), {
      name: productName,
      imageURL: imageUrl, // Storageから取得したURL
      uploaderId: user.uid,
      createdAt: serverTimestamp()
    });

    console.log("✅ Product uploaded successfully with ID:", docRef.id);
    alert("Product data uploaded successfully!");

  } catch (e) {
    console.error("❌ Error adding document or uploading image: ", e);
    alert("Failed to upload product. Check console for details.");
  }
};