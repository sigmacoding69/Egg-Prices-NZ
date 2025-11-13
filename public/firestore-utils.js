// Firestore Database Utilities for EggPrices NZ
// Handles all database operations for user management and premium status

class FirestoreUtils {
    constructor() {
        this.db = null;
        this.initializeFirestore();
    }

    initializeFirestore() {
        console.log('🔄 Initializing Firestore...');
        console.log('Firebase available:', typeof firebase !== 'undefined');
        console.log('Firebase apps:', firebase?.apps?.length || 0);
        
        if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
            this.db = firebase.firestore();
            console.log('✅ Firestore initialized successfully');
            console.log('Firestore instance:', this.db);
        } else {
            console.error('❌ Firebase not initialized. Please check firebase-config.js');
            console.log('Available globals:', Object.keys(window).filter(key => key.includes('firebase')));
        }
    }

    // Create or update user in Firestore
    async saveUser(userData) {
        if (!this.db) {
            console.error('Firestore not initialized');
            return { success: false, error: 'Database not initialized' };
        }

        try {
            const userRef = this.db.collection('users').doc(userData.id);
            await userRef.set({
                ...userData,
                updatedAt: new Date(),
                lastLogin: new Date()
            }, { merge: true });

            console.log('✅ User saved to Firestore:', userData.email);
            return { success: true };
        } catch (error) {
            console.error('❌ Error saving user to Firestore:', error);
            return { success: false, error: error.message };
        }
    }

    // Get user from Firestore
    async getUser(userId) {
        if (!this.db) {
            console.error('Firestore not initialized');
            return { success: false, error: 'Database not initialized' };
        }

        try {
            const userDoc = await this.db.collection('users').doc(userId).get();
            
            if (userDoc.exists) {
                const userData = userDoc.data();
                console.log('✅ User retrieved from Firestore:', userData.email);
                return { success: true, data: userData };
            } else {
                console.log('User not found in Firestore');
                return { success: false, error: 'User not found' };
            }
        } catch (error) {
            console.error('❌ Error getting user from Firestore:', error);
            return { success: false, error: error.message };
        }
    }

    // Update user premium status
    async updatePremiumStatus(userId, isPremium, subscriptionData = {}) {
        if (!this.db) {
            console.error('Firestore not initialized');
            return { success: false, error: 'Database not initialized' };
        }

        try {
            const userRef = this.db.collection('users').doc(userId);
            const updateData = {
                isPremium: isPremium,
                updatedAt: new Date(),
                ...subscriptionData
            };

            await userRef.update(updateData);
            
            console.log('✅ Premium status updated in Firestore:', { userId, isPremium });
            return { success: true };
        } catch (error) {
            console.error('❌ Error updating premium status:', error);
            return { success: false, error: error.message };
        }
    }

    // Create subscription record
    async createSubscription(userId, subscriptionData) {
        if (!this.db) {
            console.error('Firestore not initialized');
            return { success: false, error: 'Database not initialized' };
        }

        try {
            const subscriptionRef = this.db.collection('subscriptions').doc(subscriptionData.id);
            await subscriptionRef.set({
                ...subscriptionData,
                userId: userId,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            console.log('✅ Subscription created in Firestore:', subscriptionData.id);
            return { success: true };
        } catch (error) {
            console.error('❌ Error creating subscription:', error);
            return { success: false, error: error.message };
        }
    }

    // Get user subscription
    async getSubscription(userId) {
        if (!this.db) {
            console.error('Firestore not initialized');
            return { success: false, error: 'Database not initialized' };
        }

        try {
            const subscriptionQuery = await this.db
                .collection('subscriptions')
                .where('userId', '==', userId)
                .where('status', '==', 'active')
                .orderBy('createdAt', 'desc')
                .limit(1)
                .get();

            if (!subscriptionQuery.empty) {
                const subscriptionDoc = subscriptionQuery.docs[0];
                const subscriptionData = subscriptionDoc.data();
                console.log('✅ Subscription retrieved from Firestore:', subscriptionData.id);
                return { success: true, data: subscriptionData };
            } else {
                console.log('No active subscription found');
                return { success: false, error: 'No active subscription found' };
            }
        } catch (error) {
            console.error('❌ Error getting subscription:', error);
            return { success: false, error: error.message };
        }
    }

    // Update subscription status
    async updateSubscriptionStatus(subscriptionId, status, additionalData = {}) {
        if (!this.db) {
            console.error('Firestore not initialized');
            return { success: false, error: 'Database not initialized' };
        }

        try {
            const subscriptionRef = this.db.collection('subscriptions').doc(subscriptionId);
            await subscriptionRef.update({
                status: status,
                updatedAt: new Date(),
                ...additionalData
            });

            console.log('✅ Subscription status updated:', { subscriptionId, status });
            return { success: true };
        } catch (error) {
            console.error('❌ Error updating subscription status:', error);
            return { success: false, error: error.message };
        }
    }

    // Sync user data between localStorage and Firestore
    async syncUserData(userId) {
        try {
            // Get user from Firestore
            const firestoreResult = await this.getUser(userId);
            
            if (firestoreResult.success) {
                // Update localStorage with Firestore data
                localStorage.setItem('grocerycompare_user', JSON.stringify(firestoreResult.data));
                
                // Get subscription data
                const subscriptionResult = await this.getSubscription(userId);
                if (subscriptionResult.success) {
                    localStorage.setItem('grocerycompare_subscription', JSON.stringify(subscriptionResult.data));
                }
                
                console.log('✅ User data synced from Firestore');
                return { success: true, data: firestoreResult.data };
            } else {
                console.log('User not found in Firestore, keeping localStorage data');
                return { success: false, error: 'User not found in Firestore' };
            }
        } catch (error) {
            console.error('❌ Error syncing user data:', error);
            return { success: false, error: error.message };
        }
    }
}

// Initialize Firestore utilities after Firebase is loaded
function initializeFirestoreUtils() {
    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
        window.firestoreUtils = new FirestoreUtils();
        console.log('✅ FirestoreUtils initialized');
    } else {
        console.log('⏳ Waiting for Firebase to initialize...');
        setTimeout(initializeFirestoreUtils, 100);
    }
}

// Start initialization
initializeFirestoreUtils();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FirestoreUtils;
}
