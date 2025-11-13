// Firebase Configuration for EggPrices NZ
// Replace these placeholder values with your actual Firebase project configuration

const firebaseConfig = {
    apiKey: "AIzaSyDopAfV4n0tMtdvfG_HpovrZVyaXrEZybM",
    authDomain: "grocery-compare-nz.firebaseapp.com",
    projectId: "grocery-compare-nz",  // This is the most important one for Firestore
    storageBucket: "grocery-compare-nz.firebasestorage.app",
    messagingSenderId: "725627956886",
    appId: "1:725627956886:web:a00a06c97b0dbbc4315cb7"
};

// Initialize Firebase
console.log('🔄 Checking Firebase availability...');
console.log('Firebase object:', typeof firebase);

if (typeof firebase !== 'undefined') {
    try {
        firebase.initializeApp(firebaseConfig);
        console.log('✅ Firebase app initialized');
        
        // Initialize Firestore
        const db = firebase.firestore();
        console.log('✅ Firestore initialized');
        
        // Make Firestore globally available
        window.db = db;
        
        console.log('✅ Firebase initialized successfully');
    } catch (error) {
        console.error('❌ Firebase initialization failed:', error);
    }
} else {
    console.error('❌ Firebase SDK not loaded. Please include Firebase scripts in your HTML.');
    console.log('Available scripts:', document.querySelectorAll('script[src*="firebase"]'));
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { firebaseConfig };
}
