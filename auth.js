// Authentication and User Management System
// This is a frontend-only demo - in production, you'd need a proper backend

// Stripe removed - using frontend-only demo authentication

// User state management
let currentUser = null;
let userSubscription = null;

// Initialize authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Auth system initializing...');
    checkAuthState();
    setupAuthEventListeners();
    

});

async function checkAuthState() {
    const savedUser = localStorage.getItem('grocerycompare_user');
    const token = localStorage.getItem('grocerycompare_token');
    
    if (savedUser && token) {
        // For demo purposes, just use cached data
        currentUser = JSON.parse(savedUser);
        checkSubscriptionStatus();
        updateUIForLoggedInUser();
    } else {
        updateUIForLoggedOutUser();
    }
}

function setupAuthEventListeners() {
    // Login button
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => showAuthModal('login'));
    }
    
    // Signup button
    const signupBtn = document.getElementById('signupBtn');
    if (signupBtn) {
        signupBtn.addEventListener('click', () => showAuthModal('signup'));
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Subscription status button
    const subscriptionBtn = document.getElementById('subscriptionStatus');
    if (subscriptionBtn) {
        subscriptionBtn.addEventListener('click', handleSubscriptionClick);
    }
}

function showAuthModal(mode = 'login') {
    console.log('🎭 Opening auth modal in mode:', mode);
    const modal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    console.log('📋 Modal elements found:', {
        modal: !!modal,
        loginForm: !!loginForm,
        signupForm: !!signupForm
    });
    
    if (modal && loginForm && signupForm) {
        modal.classList.remove('hidden');
        
        if (mode === 'login') {
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
        } else {
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
        }
        console.log('✅ Auth modal opened successfully');
    } else {
        console.error('❌ Could not find modal elements');
    }
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function switchToSignup() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm && signupForm) {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    }
}

function switchToLogin() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm && signupForm) {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    }
}

async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Demo authentication - accept any email/password combination
    if (email && password) {
        try {
            // Check if user exists in Firestore first
            let userData = null;
            if (window.firestoreUtils) {
                // For demo purposes, we'll create a user ID based on email
                const userId = 'user_' + email.replace(/[^a-zA-Z0-9]/g, '');
                const firestoreResult = await window.firestoreUtils.getUser(userId);
                
                if (firestoreResult.success) {
                    userData = firestoreResult.data;
                    console.log('✅ User found in Firestore');
                } else {
                    console.log('User not found in Firestore, creating new user');
                }
            }

            // If user not found in Firestore, create new user
            if (!userData) {
                userData = {
                    id: generateUserId(),
                    name: email.split('@')[0],
                    email: email,
                    isPremium: false,
                    createdAt: new Date().toISOString()
                };

                // Save user to Firestore if available
                if (window.firestoreUtils) {
                    console.log('🔄 Saving user to Firestore...');
                    const saveResult = await window.firestoreUtils.saveUser(userData);
                    if (!saveResult.success) {
                        console.warn('Failed to save user to Firestore:', saveResult.error);
                    } else {
                        console.log('✅ User saved to Firestore:', userData.email);
                    }
                } else {
                    console.log('⚠️ FirestoreUtils not available, using localStorage only');
                }
            }

            currentUser = userData;
            
            // Generate demo token
            const token = 'demo_token_' + Math.random().toString(36).substr(2, 9);
            
            // Save user data and token to localStorage
            localStorage.setItem('grocerycompare_token', token);
            localStorage.setItem('grocerycompare_user', JSON.stringify(currentUser));
            
            // Initialize free trial
            initializeFreeTrial();
            
            // Update UI and close modal
            updateUIForLoggedInUser();
            closeAuthModal();
            
            showToast('Welcome back! You\'re now logged in.', 'success');
        } catch (error) {
            console.error('Login error:', error);
            showToast('Login failed. Please try again.', 'error');
        }
    } else {
        showToast('Please enter both email and password', 'error');
    }
}

async function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // Demo authentication - accept any valid input
    if (name && email && password) {
        try {
            // Create new user
            const userData = {
                id: generateUserId(),
                name: name,
                email: email,
                isPremium: false,
                createdAt: new Date().toISOString()
            };

            // Save user to Firestore if available
            if (window.firestoreUtils) {
                console.log('🔄 Saving user to Firestore...');
                const saveResult = await window.firestoreUtils.saveUser(userData);
                if (!saveResult.success) {
                    console.warn('Failed to save user to Firestore:', saveResult.error);
                } else {
                    console.log('✅ User saved to Firestore:', userData.email);
                }
            } else {
                console.log('⚠️ FirestoreUtils not available, using localStorage only');
            }

            currentUser = userData;
            
            // Generate demo token
            const token = 'demo_token_' + Math.random().toString(36).substr(2, 9);
            
            // Save user data and token to localStorage
            localStorage.setItem('grocerycompare_token', token);
            localStorage.setItem('grocerycompare_user', JSON.stringify(currentUser));
            
            // Initialize free trial
            initializeFreeTrial();
            
            // Update UI and close modal
            updateUIForLoggedInUser();
            closeAuthModal();
            
            showToast('Account created successfully! Welcome to EggPrices NZ.', 'success');
        } catch (error) {
            console.error('Signup error:', error);
            showToast('Account creation failed. Please try again.', 'error');
        }
    } else {
        showToast('Please fill in all fields', 'error');
    }
}

function handleLogout() {
    // Clear user data
    currentUser = null;
    userSubscription = null;
    localStorage.removeItem('grocerycompare_user');
    localStorage.removeItem('grocerycompare_token');
    localStorage.removeItem('grocerycompare_subscription');
    
    // Update UI
    updateUIForLoggedOutUser();
    
    showToast('You\'ve been logged out successfully.', 'info');
}

function updateUIForLoggedInUser() {
    console.log('🔄 updateUIForLoggedInUser called for:', currentUser?.email);
    
    const userSection = document.getElementById('userSection');
    const authSection = document.getElementById('authSection');
    const userEmail = document.getElementById('userEmail');
    const subscriptionStatus = document.getElementById('subscriptionStatus');
    
    console.log('📍 UI Elements found:', {
        userSection: !!userSection,
        authSection: !!authSection,
        userEmail: !!userEmail,
        subscriptionStatus: !!subscriptionStatus
    });
    
    if (userSection && authSection && userEmail && subscriptionStatus) {
        console.log('👀 Showing user section, hiding auth section');
        userSection.classList.remove('hidden');
        authSection.classList.add('hidden');
        
        userEmail.textContent = currentUser.email;
        
        // Update subscription status
        if (userSubscription && userSubscription.status === 'active') {
            subscriptionStatus.textContent = 'Premium';
            subscriptionStatus.className = 'subscription-btn premium';
        } else {
            subscriptionStatus.textContent = 'Free';
            subscriptionStatus.className = 'subscription-btn free';
        }
        
        console.log('✅ UI updated successfully');
    } else {
        console.error('❌ Some UI elements not found');
    }
    
    
    
}

function updateUIForLoggedOutUser() {
    const userSection = document.getElementById('userSection');
    const authSection = document.getElementById('authSection');
    
    if (userSection && authSection) {
        userSection.classList.add('hidden');
        authSection.classList.remove('hidden');
    }
    
    
    showPremiumGateIfNeeded();
}

function generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}

function initializeFreeTrial() {
    // Initialize a free trial for new users
    if (currentUser && !userSubscription) {
        userSubscription = {
            id: 'trial_' + Math.random().toString(36).substr(2, 9),
            status: 'trial',
            planName: 'Free Trial',
            isPremium: false,
            trialEnds: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // 14 days
        };
        localStorage.setItem('grocerycompare_subscription', JSON.stringify(userSubscription));
    }
}

async function checkSubscriptionStatus() {
    const token = localStorage.getItem('grocerycompare_token');
    
    if (!token) return;
    
    try {
        // If Firestore is available, sync data from database
        if (window.firestoreUtils && currentUser) {
            console.log('🔄 Syncing subscription status from Firestore...');
            const syncResult = await window.firestoreUtils.syncUserData(currentUser.id);
            
            if (syncResult.success) {
                // Update current user with synced data
                currentUser = syncResult.data;
                
                // Get subscription data from localStorage (updated by sync)
                const savedSubscription = localStorage.getItem('grocerycompare_subscription');
                if (savedSubscription) {
                    userSubscription = JSON.parse(savedSubscription);
                }
                
                console.log('✅ Subscription status synced from Firestore');
                return;
            }
        }
        
        // Fallback to localStorage if Firestore not available
        const savedSubscription = localStorage.getItem('grocerycompare_subscription');
        if (savedSubscription) {
            userSubscription = JSON.parse(savedSubscription);
            
            // Update user object with premium status
            if (currentUser) {
                currentUser.isPremium = userSubscription.isPremium;
                localStorage.setItem('grocerycompare_user', JSON.stringify(currentUser));
            }
        }
    } catch (error) {
        console.error('Error checking subscription status:', error);
        
        // Fallback to localStorage on error
        const savedSubscription = localStorage.getItem('grocerycompare_subscription');
        if (savedSubscription) {
            userSubscription = JSON.parse(savedSubscription);
            
            if (currentUser) {
                currentUser.isPremium = userSubscription.isPremium;
                localStorage.setItem('grocerycompare_user', JSON.stringify(currentUser));
            }
        }
    }
}



function handleSubscriptionClick() {
    if (userSubscription && userSubscription.status === 'active') {
        // Show subscription management
        showSubscriptionManagement();
    } else {
        // Show upgrade modal
        showPremiumModal();
    }
}

// Add manual subscription refresh function for debugging
function refreshSubscriptionStatus() {
    try {
        showToast && showToast('Refreshing subscription status...', 'info');
        checkSubscriptionStatus();
        updateUIForLoggedInUser();
        
        const status = userSubscription && userSubscription.isPremium ? 'Premium' : 'Free';
        showToast && showToast(`Subscription status updated: ${status}`, 'success');
    } catch (error) {
        console.error('Error refreshing subscription:', error);
        showToast && showToast('Failed to refresh subscription status', 'error');
    }
}

// Make function available globally for manual testing
window.refreshSubscriptionStatus = refreshSubscriptionStatus;

function showPremiumModal() {
    const modal = document.getElementById('premiumModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closePremiumModal() {
    const modal = document.getElementById('premiumModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function handleSubscription() {
    if (!currentUser) {
        showAuthModal('signup');
        return;
    }
    
    // Use Stripe payment handler for premium subscription
    if (window.stripePaymentHandler) {
        showToast('Processing your premium subscription...', 'info');
        window.stripePaymentHandler.createPremiumSubscription();
    } else {
        // Fallback to demo subscription if Stripe not available
        showToast('Demo: Simulating premium subscription activation...', 'info');
        
        setTimeout(() => {
            simulateSuccessfulSubscription();
        }, 2000);
    }
}

// Removed createCheckoutSession - no longer needed for frontend-only demo

function simulateSuccessfulSubscription() {
    // Create subscription object
    const subscription = {
        id: 'sub_' + Math.random().toString(36).substr(2, 9),
        customerId: currentUser.id,
        status: 'active',
        planId: 'premium_monthly',
        planName: 'Premium Monthly',
        amount: 999, // $9.99 in cents
        currency: 'nzd',
        startDate: new Date().toISOString(),
        nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        isPremium: true
    };
    
    // Save subscription
    userSubscription = subscription;
    localStorage.setItem('grocerycompare_subscription', JSON.stringify(subscription));
    
    // Update current user with premium status
    currentUser.isPremium = true;
    localStorage.setItem('grocerycompare_user', JSON.stringify(currentUser));
    
    // Update UI
    updateUIForLoggedInUser();
    closePremiumModal();
    
    showToast('Welcome to Premium! You now have unlimited access to all features.', 'success');
}

function showSubscriptionManagement() {
    showToast('Subscription management coming soon! Contact support for changes.', 'info');
}

function showPremiumGateIfNeeded() {
    // This function can be used to show premium gates for non-logged-in users
    // For now, it's just a placeholder
}





















// Utility functions
function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}



// Export functions for use in other scripts
window.authSystem = {
    isLoggedIn: () => currentUser !== null,
    isPremium: () => userSubscription && userSubscription.status === 'active',
    getCurrentUser: () => currentUser,

    showPremiumModal: showPremiumModal
};



// Make functions globally available for onclick handlers
window.showAuthModal = showAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchToSignup = switchToSignup;
window.switchToLogin = switchToLogin;
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.showPremiumModal = showPremiumModal;
window.closePremiumModal = closePremiumModal;
window.handleSubscription = handleSubscription;
