// Stripe Configuration for EggPrices NZ
// Frontend-only implementation with hardcoded keys

const STRIPE_CONFIG = {
    // Your Stripe publishable key (safe for frontend use)
    publishableKey: 'pk_test_51RvuRBPckqRRoOqZXe0FePk0WxsfRafxMqdShUSIsNXfUM1phByGIz2XYDF1ngs9S33TQdBaQNxO7ZoJ0PRZut7100OIxr8AbS',
    
    // Premium subscription pricing
    premiumPrice: {
        amount: 999, // $9.99 in cents
        currency: 'nzd',
        interval: 'month',
        productName: 'EggPrices NZ Premium'
    },
    
    // Initialize Stripe
    initialize: function() {
        if (typeof Stripe !== 'undefined') {
            return Stripe(this.publishableKey);
        } else {
            console.error('Stripe.js not loaded');
            return null;
        }
    }
};

// Make Stripe config globally available
window.STRIPE_CONFIG = STRIPE_CONFIG;
