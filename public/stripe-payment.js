// Stripe Payment Handler for EggPrices NZ
// Frontend-only implementation for premium subscriptions
// 
// NOTE: This is a frontend-only implementation that simulates payments.
// For production use, you should:
// 1. Create a backend API endpoint to create PaymentIntents
// 2. Use stripe.confirmCardPayment() with the client_secret from your backend
// 3. Handle webhooks to verify payment completion
// 4. Store subscription data in a database

class StripePaymentHandler {
    constructor() {
        this.stripe = null;
        this.initializeStripe();
    }

    initializeStripe() {
        if (typeof Stripe !== 'undefined' && window.STRIPE_CONFIG) {
            this.stripe = window.STRIPE_CONFIG.initialize();
            console.log('✅ Stripe initialized successfully');
        } else {
            console.error('❌ Stripe not available');
        }
    }

    // Create a payment intent for premium subscription
    async createPremiumSubscription() {
        if (!this.stripe) {
            console.error('Stripe not initialized');
            return;
        }

        try {
            console.log('🚀 Creating premium subscription...');
            
            // Show payment form with Stripe Elements
            this.showPaymentForm();
            
        } catch (error) {
            console.error('Payment error:', error);
            this.handleFailedPayment(error.message);
            return { success: false, error: error.message };
        }
    }

    // Show payment form with Stripe Elements
    showPaymentForm() {
        const modal = document.createElement('div');
        modal.className = 'stripe-payment-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Subscribe to Premium</h2>
                    <span class="close" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</span>
                </div>
                <div class="payment-form">
                    <div class="price-display">
                        <h3>EggPrices NZ Premium</h3>
                        <div class="price">$${(window.STRIPE_CONFIG.premiumPrice.amount / 100).toFixed(2)} ${window.STRIPE_CONFIG.premiumPrice.currency.toUpperCase()}/month</div>
                    </div>
                    
                    <form id="payment-form">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="card-element">Card Information</label>
                            <div id="card-element">
                                <!-- Stripe Elements will create form elements here -->
                            </div>
                            <div id="card-errors" role="alert"></div>
                        </div>
                        
                        <button type="submit" id="submit-button" class="stripe-submit-btn">
                            <span id="button-text">Subscribe for $${(window.STRIPE_CONFIG.premiumPrice.amount / 100).toFixed(2)}</span>
                            <div id="spinner" class="spinner hidden"></div>
                        </button>
                    </form>
                    
                    <div class="payment-security">
                        <small><i class="fas fa-shield-alt"></i> Secure payment powered by Stripe</small>
                    </div>
                </div>
            </div>
        `;
        
        // Add styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        modal.querySelector('.modal-content').style.cssText = `
            background: white;
            border-radius: 10px;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
        `;
        
        modal.querySelector('.modal-header').style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #eee;
        `;
        
        modal.querySelector('.payment-form').style.cssText = `
            padding: 1.5rem;
        `;
        
        modal.querySelector('.price-display').style.cssText = `
            text-align: center;
            margin-bottom: 2rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;
        `;
        
        modal.querySelector('.form-group').style.cssText = `
            margin-bottom: 1.5rem;
        `;
        
        modal.querySelector('.form-group label').style.cssText = `
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #333;
        `;
        
        modal.querySelector('.form-group input').style.cssText = `
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
            box-sizing: border-box;
        `;
        
        modal.querySelector('#card-element').style.cssText = `
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: white;
        `;
        
        modal.querySelector('#card-errors').style.cssText = `
            color: #e74c3c;
            font-size: 14px;
            margin-top: 0.5rem;
        `;
        
        modal.querySelector('.stripe-submit-btn').style.cssText = `
            width: 100%;
            padding: 1rem;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 1rem;
        `;
        
        modal.querySelector('.payment-security').style.cssText = `
            text-align: center;
            margin-top: 1rem;
            color: #666;
        `;
        
        document.body.appendChild(modal);
        
        // Initialize Stripe Elements
        this.initializeStripeElements(modal);
    }

    // Initialize Stripe Elements for payment form
    initializeStripeElements(modal) {
        const elements = this.stripe.elements();
        
        // Create card element
        const cardElement = elements.create('card', {
            style: {
                base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                },
                invalid: {
                    color: '#9e2146',
                },
            },
        });

        // Mount card element
        cardElement.mount('#card-element');

        // Handle real-time validation errors from the card Element
        cardElement.on('change', ({error}) => {
            const displayError = document.getElementById('card-errors');
            if (error) {
                displayError.textContent = error.message;
            } else {
                displayError.textContent = '';
            }
        });

        // Handle form submission
        const form = document.getElementById('payment-form');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const {token, error} = await this.stripe.createToken(cardElement);
            
            if (error) {
                // Show error to customer
                const errorElement = document.getElementById('card-errors');
                errorElement.textContent = error.message;
            } else {
                // Token created successfully, process payment
                this.processPaymentWithToken(token);
            }
        });
    }

    // Process payment with Stripe token
    async processPaymentWithToken(token) {
        const submitButton = document.getElementById('submit-button');
        const buttonText = document.getElementById('button-text');
        const spinner = document.getElementById('spinner');
        
        // Show loading state
        submitButton.disabled = true;
        buttonText.textContent = 'Processing...';
        spinner.classList.remove('hidden');

        try {
            // In a real implementation, you would send the token to your backend
            // For frontend-only, we'll use Stripe's Payment Intents API directly
            const paymentIntent = await this.createPaymentIntent(token);
            
            if (paymentIntent.status === 'succeeded') {
                this.handleSuccessfulPayment();
            } else {
                this.handleFailedPayment('Payment was not completed');
            }
        } catch (error) {
            console.error('Payment processing error:', error);
            this.handleFailedPayment(error.message);
        } finally {
            // Reset button state
            submitButton.disabled = false;
            buttonText.textContent = `Subscribe for $${(window.STRIPE_CONFIG.premiumPrice.amount / 100).toFixed(2)}`;
            spinner.classList.add('hidden');
        }
    }

    // Create payment intent using Stripe's frontend API
    async createPaymentIntent(token) {
        console.log('Processing payment with token:', token.id);
        
        try {
            // Create a payment method from the token
            const {paymentMethod, error: pmError} = await this.stripe.createPaymentMethod({
                type: 'card',
                card: {
                    token: token.id
                },
                billing_details: {
                    email: document.getElementById('email').value,
                },
            });

            if (pmError) {
                throw new Error(pmError.message);
            }

            // For frontend-only implementation, we'll simulate a successful payment
            // In production, you would typically:
            // 1. Send the payment method to your backend
            // 2. Create a PaymentIntent on your backend
            // 3. Return the client_secret to the frontend
            // 4. Use stripe.confirmCardPayment() with the client_secret
            
            console.log('Payment method created:', paymentMethod.id);
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // For demo purposes, simulate successful payment
            // In real implementation, you would use:
            // const {paymentIntent, error} = await this.stripe.confirmCardPayment(clientSecret, {
            //     payment_method: paymentMethod.id,
            // });
            
            return {
                id: 'pi_' + Date.now(),
                status: 'succeeded',
                amount: window.STRIPE_CONFIG.premiumPrice.amount,
                currency: window.STRIPE_CONFIG.premiumPrice.currency,
                payment_method: paymentMethod.id
            };
            
        } catch (error) {
            console.error('Payment intent creation error:', error);
            throw error;
        }
    }

    // Handle successful payment
    async handleSuccessfulPayment() {
        console.log('✅ Payment successful!');
        
        // Close payment modal
        const paymentModal = document.querySelector('.stripe-payment-modal');
        if (paymentModal) {
            paymentModal.remove();
        }
        
        // Get current user data
        const user = JSON.parse(localStorage.getItem('grocerycompare_user') || '{}');
        if (!user.id) {
            console.error('No user found for payment processing');
            this.handleFailedPayment('User not found');
            return;
        }

        // Create subscription data
        const subscriptionData = {
            id: 'sub_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            status: 'active',
            planId: 'premium_monthly',
            planName: 'Premium Monthly',
            amount: window.STRIPE_CONFIG.premiumPrice.amount,
            currency: window.STRIPE_CONFIG.premiumPrice.currency,
            startDate: new Date().toISOString(),
            nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            isPremium: true
        };

        try {
            // Update user premium status in Firestore
            if (window.firestoreUtils) {
                console.log('🔄 Updating user premium status in Firestore...');
                
                // Update user premium status
                const userUpdateResult = await window.firestoreUtils.updatePremiumStatus(
                    user.id, 
                    true, 
                    {
                        subscriptionStatus: 'active',
                        subscriptionStartDate: subscriptionData.startDate,
                        subscriptionEndDate: subscriptionData.nextBilling
                    }
                );

                if (!userUpdateResult.success) {
                    console.error('Failed to update user in Firestore:', userUpdateResult.error);
                }

                // Create subscription record
                const subscriptionResult = await window.firestoreUtils.createSubscription(
                    user.id, 
                    subscriptionData
                );

                if (!subscriptionResult.success) {
                    console.error('Failed to create subscription in Firestore:', subscriptionResult.error);
                }

                console.log('✅ Firestore updates completed');
            } else {
                console.warn('Firestore utils not available, using localStorage only');
            }

            // Update localStorage as backup
            user.isPremium = true;
            user.subscriptionStatus = 'active';
            user.subscriptionStartDate = subscriptionData.startDate;
            user.subscriptionEndDate = subscriptionData.nextBilling;
            localStorage.setItem('grocerycompare_user', JSON.stringify(user));
            localStorage.setItem('grocerycompare_subscription', JSON.stringify(subscriptionData));

            // Show success message
            this.showPaymentSuccess();
            
            // Refresh the page to update UI
            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (error) {
            console.error('Error processing payment success:', error);
            this.handleFailedPayment('Payment processed but failed to update account. Please contact support.');
        }
    }

    // Handle failed payment
    handleFailedPayment(error) {
        console.error('❌ Payment failed:', error);
        
        // Close payment modal
        const paymentModal = document.querySelector('.stripe-payment-modal');
        if (paymentModal) {
            paymentModal.remove();
        }
        
        this.showPaymentError(error);
    }

    // Show payment success message
    showPaymentSuccess() {
        const modal = document.createElement('div');
        modal.className = 'payment-success-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="success-icon">✅</div>
                <h2>Payment Successful!</h2>
                <p>Welcome to EggPrices NZ Premium!</p>
                <p>You now have access to all premium features.</p>
                <button onclick="this.parentElement.parentElement.remove()" class="btn-primary">Continue</button>
            </div>
        `;
        
        // Add styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        modal.querySelector('.modal-content').style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 10px;
            text-align: center;
            max-width: 400px;
            width: 90%;
        `;
        
        modal.querySelector('.success-icon').style.cssText = `
            font-size: 3rem;
            margin-bottom: 1rem;
        `;
        
        document.body.appendChild(modal);
    }

    // Show payment error message
    showPaymentError(error) {
        const modal = document.createElement('div');
        modal.className = 'payment-error-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="error-icon">❌</div>
                <h2>Payment Failed</h2>
                <p>Sorry, there was an issue processing your payment.</p>
                <p class="error-details">${error}</p>
                <button onclick="this.parentElement.parentElement.remove()" class="btn-primary">Try Again</button>
            </div>
        `;
        
        // Add styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        modal.querySelector('.modal-content').style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 10px;
            text-align: center;
            max-width: 400px;
            width: 90%;
        `;
        
        modal.querySelector('.error-icon').style.cssText = `
            font-size: 3rem;
            margin-bottom: 1rem;
            color: #e74c3c;
        `;
        
        modal.querySelector('.error-details').style.cssText = `
            color: #e74c3c;
            font-size: 0.9rem;
            margin: 0.5rem 0;
        `;
        
        document.body.appendChild(modal);
    }

    // Get premium subscription info
    getSubscriptionInfo() {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        return {
            isPremium: user.isPremium || false,
            subscriptionStatus: user.subscriptionStatus || 'inactive',
            subscriptionStartDate: user.subscriptionStartDate,
            subscriptionEndDate: user.subscriptionEndDate
        };
    }
}

// Initialize Stripe payment handler
window.stripePaymentHandler = new StripePaymentHandler();

// Make functions globally accessible
window.createPremiumSubscription = () => window.stripePaymentHandler.createPremiumSubscription();
window.getSubscriptionInfo = () => window.stripePaymentHandler.getSubscriptionInfo();
