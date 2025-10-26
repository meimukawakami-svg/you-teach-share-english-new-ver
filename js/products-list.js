import { db, auth } from '../firebase-config.js'; 
import { collection, getDocs, query } from "firebase/firestore";

const MAX_STARS = 5;

/**
 * 星の平均値を視覚的な文字列に変換する関数
 * @param {number} averageRating 
 * @returns {string} 視覚的な星の文字列 (例: "★★★★☆")
 */
const renderStars = (averageRating) => {
    const fullStars = Math.floor(averageRating);
    const emptyStars = MAX_STARS - fullStars;
    const filled = '★'.repeat(fullStars);
    const empty = '☆'.repeat(emptyStars);

    if (averageRating === 0 || averageRating === null) {
        return '☆'.repeat(MAX_STARS); 
    }

    return `${filled}${empty}`;
};


const fetchAndDisplayProducts = async () => {
    console.log("✅ Products List Page Loaded. Attempting to fetch products...");

    const productsListElement = document.getElementById('productsList');
    productsListElement.innerHTML = `<p>Loading materials...</p>`; // ローディング表示
    
    
    try {
        const productsRef = collection(db, "products");
        // Firestoreから 'products' コレクションの全ドキュメントを取得
        const q = query(productsRef);
        const querySnapshot = await getDocs(q);
        
        let productsHtml = '';
        
        if (querySnapshot.empty) {
            productsListElement.innerHTML = '<p>No educational materials are available yet.</p>';
            return;
        }

        querySnapshot.forEach(doc => {
            const product = doc.data();
            const rating = product.averageRating || 0; // 平均評価（データにない場合は0）
            const reviewCount = product.reviewCount || 0; // レビュー数
            
            // タグはproducts.htmlの仕様に合わせて表示
            const tagsArray = product.tags || [];
            const tagsHtml = tagsArray.map(tag => `#${tag}`).join(' ');

            // HTMLカードの生成
            productsHtml += `
                <div class="productCard" data-id="${doc.id}">
                    <img src="${product.imageUrl || 'placeholder.jpg'}" alt="${product.name}" style="width:100px; height:100px;">
                    <h3>${product.name}</h3>
                    <p>${product.description ? product.description.substring(0, 100) + '...' : 'No description provided.'}</p>
                    <p>Tags: ${tagsHtml}</p>
                    <p>
                        Rating: ${renderStars(rating)} 
                        (<strong>${rating.toFixed(1)}</strong> average based on ${reviewCount} reviews)
                    </p>
                    <button class="viewButton">View Details</button>
                </div>
                <hr>
            `;
        });
        
        productsListElement.innerHTML = productsHtml;

    } catch (error) {
        console.error("❌ Error fetching products:", error);
        productsListElement.innerHTML = '<p>An error occurred while loading materials. Please check the console.</p>';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayProducts();

    
});