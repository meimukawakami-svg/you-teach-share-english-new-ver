import { handleLogin } from './js/Login.js';
import { handleLogout } from './js/LogoutButton.js';
import { uploadProduct } from './js/ProductUploader.js';
import { auth } from './firebase-config.js'; 
import { onAuthStateChanged } from "firebase/auth";

document.addEventListener('DOMContentLoaded', () => {

    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    
    const loginBtn = document.getElementById('loginButton');
    const logoutBtn = document.getElementById('logoutButton');
    const uploadBtn = document.getElementById('uploadButton');
    const userStatus = document.getElementById('userStatus');
    const uploaderArea = document.getElementById('uploaderArea');
    const loginForm = document.getElementById('loginForm'); 
    
    const productNameInput = document.getElementById('productName');
    const productImageInput = document.getElementById('productImage');

    // 1. Auth State Observer: Handles UI based on login status
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Logged in
            userStatus.textContent = `Current Status: **Logged in** (User: ${user.email})`;
            loginForm.style.display = 'none'; 
            logoutBtn.style.display = 'inline';
            uploaderArea.style.display = 'block';
        } else {
            // Logged out
            userStatus.textContent = "Current Status: **Logged out**";
            loginForm.style.display = 'block';
            logoutBtn.style.display = 'none';
            uploaderArea.style.display = 'none';
        }
    });

    // 2. Event Listeners
    
    // Login 
    if (loginBtn) {
        loginBtn.addEventListener('click', async () => {
            const email = emailInput.value;
            const password = passwordInput.value;
            
            if (email && password) {
                // 💡 handleLogin(email, password) を呼び出す
                await handleLogin(email, password); 
            } else {
                alert("Please enter both email and password.");
            }
        });
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