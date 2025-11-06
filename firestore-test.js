// Firestore Test Script
// Run this in the browser console to test Firestore connectivity

async function testFirestoreConnection() {
    console.log('🧪 Testing Firestore connection...');
    
    // Check if Firebase is loaded
    if (typeof firebase === 'undefined') {
        console.error('❌ Firebase SDK not loaded');
        return;
    }
    
    // Check if Firebase is initialized
    if (!firebase.apps.length) {
        console.error('❌ Firebase not initialized');
        return;
    }
    
    console.log('✅ Firebase SDK loaded and initialized');
    
    // Check if Firestore is available
    if (!firebase.firestore) {
        console.error('❌ Firestore not available');
        return;
    }
    
    console.log('✅ Firestore available');
    
    // Get Firestore instance
    const db = firebase.firestore();
    console.log('✅ Firestore instance created');
    
    // Test write operation
    try {
        console.log('🔄 Testing write operation...');
        const testDoc = db.collection('test').doc('connection-test');
        await testDoc.set({
            message: 'Hello Firestore!',
            timestamp: new Date(),
            testId: Math.random().toString(36).substr(2, 9)
        });
        console.log('✅ Write operation successful');
        
        // Test read operation
        console.log('🔄 Testing read operation...');
        const doc = await testDoc.get();
        if (doc.exists) {
            console.log('✅ Read operation successful:', doc.data());
        } else {
            console.error('❌ Document not found after write');
        }
        
        // Clean up test document
        await testDoc.delete();
        console.log('✅ Test document cleaned up');
        
    } catch (error) {
        console.error('❌ Firestore operation failed:', error);
        console.error('Error details:', {
            code: error.code,
            message: error.message,
            stack: error.stack
        });
        
        if (error.code === 'permission-denied') {
            console.error('🔒 Permission denied - check Firestore security rules');
            console.log('Current rules should allow read/write for testing:');
            console.log(`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
            `);
        }
    }
}

// Test user creation
async function testUserCreation() {
    console.log('🧪 Testing user creation...');
    
    if (!window.firestoreUtils) {
        console.error('❌ FirestoreUtils not available');
        return;
    }
    
    const testUser = {
        id: 'test_user_' + Date.now(),
        name: 'Test User',
        email: 'test@example.com',
        isPremium: false,
        createdAt: new Date().toISOString()
    };
    
    try {
        const result = await window.firestoreUtils.saveUser(testUser);
        if (result.success) {
            console.log('✅ User creation test successful');
            
            // Test reading the user back
            const getUserResult = await window.firestoreUtils.getUser(testUser.id);
            if (getUserResult.success) {
                console.log('✅ User retrieval test successful:', getUserResult.data);
            } else {
                console.error('❌ User retrieval failed:', getUserResult.error);
            }
        } else {
            console.error('❌ User creation failed:', result.error);
        }
    } catch (error) {
        console.error('❌ User creation test failed:', error);
    }
}

// Test subscription creation
async function testSubscriptionCreation() {
    console.log('🧪 Testing subscription creation...');
    
    if (!window.firestoreUtils) {
        console.error('❌ FirestoreUtils not available');
        return;
    }
    
    const testSubscription = {
        id: 'test_sub_' + Date.now(),
        status: 'active',
        planId: 'premium_monthly',
        planName: 'Premium Monthly',
        amount: 999,
        currency: 'nzd',
        startDate: new Date().toISOString(),
        nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        isPremium: true
    };
    
    try {
        const result = await window.firestoreUtils.createSubscription('test_user_123', testSubscription);
        if (result.success) {
            console.log('✅ Subscription creation test successful');
        } else {
            console.error('❌ Subscription creation failed:', result.error);
        }
    } catch (error) {
        console.error('❌ Subscription creation test failed:', error);
    }
}

// Run all tests
async function runAllTests() {
    console.log('🚀 Starting Firestore integration tests...');
    console.log('=====================================');
    
    await testFirestoreConnection();
    console.log('=====================================');
    await testUserCreation();
    console.log('=====================================');
    await testSubscriptionCreation();
    console.log('=====================================');
    
    console.log('🏁 All tests completed. Check the results above.');
}

// Make functions available globally
window.testFirestoreConnection = testFirestoreConnection;
window.testUserCreation = testUserCreation;
window.testSubscriptionCreation = testSubscriptionCreation;
window.runAllTests = runAllTests;

console.log('🧪 Firestore test functions loaded. Run runAllTests() to start testing.');





