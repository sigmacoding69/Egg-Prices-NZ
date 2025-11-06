# Firebase Setup Instructions for EggPrices NZ

## Problem Fixed
The issue where Stripe payments weren't updating the user's premium status in the database has been resolved. The application now properly integrates with Firestore to persist user data and subscription information.

## What Was Fixed

### ✅ Issues Resolved:
1. **Missing Firestore Integration**: Added complete Firestore database integration
2. **Payment Success Handler**: Updated to save premium status to Firestore
3. **User Management**: Enhanced to sync data between localStorage and Firestore
4. **Subscription Tracking**: Added proper subscription record creation and management

### ✅ Files Created/Updated:
- `firebase-config.js` - Firebase configuration
- `firestore-utils.js` - Database utility functions
- `stripe-payment.js` - Updated payment handler
- `auth.js` - Enhanced user management
- `index.html` - Added Firebase SDK scripts

## Setup Steps

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or use existing project
3. Name: "EggPrices-NZ" (or your preferred name)
4. Enable Google Analytics (optional)

### 2. Enable Firestore Database
1. In Firebase Console, go to **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select location closest to your users (e.g., `us-central1`)

### 3. Get Firebase Configuration
1. Go to **Project Settings** (gear icon) → **General**
2. Scroll to **"Your apps"** section
3. Click **"Add app"** → **Web** (</> icon)
4. Register app: "EggPrices Web App"
5. **Copy the configuration object**

### 4. Update Firebase Configuration
Replace the placeholder values in `firebase-config.js`:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",  // ← Most important
    storageBucket: "your-project.firebasestorage.app",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

### 5. Set Up Security Rules (Important!)
In Firestore → Rules, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents for demo purposes
    // In production, implement proper authentication rules
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ WARNING**: The above rules allow public access. For production, implement proper authentication rules.

### 6. Test the Integration
1. Open your application in a browser
2. Create a new account or login
3. Try the Stripe payment flow
4. Check Firestore console to see user and subscription data

## How It Works Now

### Payment Flow:
1. User completes Stripe payment
2. `handleSuccessfulPayment()` is called
3. User premium status is updated in Firestore
4. Subscription record is created in Firestore
5. localStorage is updated as backup
6. UI refreshes to show premium status

### Data Structure:

#### Users Collection (`/users/{userId}`):
```javascript
{
  id: "user_123",
  name: "John Doe",
  email: "john@example.com",
  isPremium: true,
  subscriptionStatus: "active",
  subscriptionStartDate: "2024-01-01T00:00:00.000Z",
  subscriptionEndDate: "2024-02-01T00:00:00.000Z",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  lastLogin: "2024-01-01T00:00:00.000Z"
}
```

#### Subscriptions Collection (`/subscriptions/{subscriptionId}`):
```javascript
{
  id: "sub_1234567890_abc123",
  userId: "user_123",
  status: "active",
  planId: "premium_monthly",
  planName: "Premium Monthly",
  amount: 999,
  currency: "nzd",
  startDate: "2024-01-01T00:00:00.000Z",
  nextBilling: "2024-02-01T00:00:00.000Z",
  isPremium: true,
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

## Troubleshooting

### Common Issues:

1. **"Firebase not initialized"**
   - Check that Firebase SDK scripts are loaded before your config
   - Verify your Firebase configuration is correct

2. **"Permission denied"**
   - Check Firestore security rules
   - Ensure you're using test mode rules for development

3. **"User not found in Firestore"**
   - This is normal for new users
   - The system will create the user automatically

4. **Payment succeeds but status doesn't update**
   - Check browser console for errors
   - Verify Firestore rules allow writes
   - Check that Firebase config is correct

### Debug Mode:
Open browser console to see detailed logs:
- ✅ Success messages
- ❌ Error messages
- 🔄 Sync operations

## Production Considerations

1. **Security Rules**: Implement proper authentication-based rules
2. **Error Handling**: Add retry logic for failed database operations
3. **Backup Strategy**: Consider regular exports of Firestore data
4. **Monitoring**: Set up Firebase monitoring and alerts
5. **Authentication**: Implement proper user authentication (not demo mode)

## Testing Checklist

- [ ] Firebase project created
- [ ] Firestore database enabled
- [ ] Configuration updated in `firebase-config.js`
- [ ] Security rules set to test mode
- [ ] User registration works
- [ ] User login works
- [ ] Stripe payment flow works
- [ ] Premium status updates in Firestore
- [ ] UI shows correct premium status
- [ ] Data persists after page refresh

Your Stripe payment integration with Firestore is now complete! 🎉
