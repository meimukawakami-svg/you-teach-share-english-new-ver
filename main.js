import { handleLogin } from './js/Login.js';
import { handleLogout } from './js/LogoutButton.js';
import { uploadProduct } from './js/ProductUploader.js';
import { auth } from './firebase-config.js'; // 認証状態の監視のためにインポート
import { onAuthStateChanged } from "firebase/auth";

document.addEventListener('DOMContentLoaded', () => {
    // HTML elements
    const loginBtn = document.getElementById('loginButton');
    const logoutBtn = document.getElementById('logoutButton');
    const uploadBtn = document.getElementById('uploadButton');
    const userStatus = document.getElementById('userStatus');
    const uploaderArea = document.getElementById('uploaderArea');
    const productNameInput = document.getElementById('productName');
    const productImageInput = document.getElementById('productImage');

    // 1. Auth State Observer: Handles UI based on login status
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Logged in
            userStatus.textContent = `Current Status: **Logged in** (User: ${user.email})`;
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline';
            uploaderArea.style.display = 'block';
        } else {
            // Logged out
            userStatus.textContent = "Current Status: **Logged out**";
            loginBtn.style.display = 'inline';
            logoutBtn.style.display = 'none';
            uploaderArea.style.display = 'none';
        }
    });

    // 2. Event Listeners
    
    // Login
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Upload Product
    if (uploadBtn) {
        uploadBtn.addEventListener('click', async () => {
            const name = productNameInput.value;
            const file = productImageInput.files[0];
            
            await uploadProduct(name, file);

            // Upload successful, reset form
            productNameInput.value = '';
            productImageInput.value = '';
        });
    }
});