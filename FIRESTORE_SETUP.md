# Firestore Database Setup Guide

## Overview
I've successfully removed Google authentication and prepared your app to use Firestore as the database for email/password authentication. Your user data will now be stored in Firestore instead of the local JSON file.

## What's Been Changed

### ✅ Removed:
- Google authentication buttons from login/signup forms
- All Google authentication JavaScript code
- Google authentication CSS styles  
- Google authentication backend route (`/api/auth/google-signin`)
- Firebase Auth scripts (replaced with Firestore)

### ✅ Added:
- `models/User-Firestore.js` - New Firestore-based user model
- Firebase Firestore scripts in HTML
- Firestore configuration in `firebase-config.js`

## Firebase Console Setup

### 1. Create/Configure Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. **Project name**: "GroceryCompare-Firestore" (or similar)

### 2. Enable Firestore Database
1. Go to **Firestore Database** in the sidebar
2. Click **"Create database"**
3. **Choose security rules**:
   - Start in **production mode** (more secure)
   - Or **test mode** for easier development
4. **Choose location**: Select closest to your users (e.g., `us-central1`)

### 3. Set Up Security Rules (Important!)
In Firestore → Rules, add these rules for production:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Admin access (you can customize this)
    match /{document=**} {
      allow read, write: if request.auth != null && 
        request.auth.token.email in ['your-admin-email@gmail.com'];
    }
  }
}
```

### 4. Get Firebase Configuration
1. Go to **Project Settings** (gear icon) → **General**
2. Scroll to **"Your apps"** → Add web app
3. Register app: "GroceryCompare Web"
4. **Copy the configuration**

### 5. Update Your Code
Replace the placeholder in `firebase-config.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",  // ← IMPORTANT for Firestore
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 6. Environment Variables
Add to your `.env` file:
```
FIREBASE_PROJECT_ID=your-project-id
```

## Switching to Firestore Model

### Option A: Keep JSON as Backup (Recommended)
Keep your current `models/User.js` and gradually migrate:

1. Rename current model: `models/User-JSON.js`
2. Copy the new model: `cp models/User-Firestore.js models/User.js`
3. Test with Firestore
4. Migrate existing users (see migration script below)

### Option B: Direct Switch
Replace your current User model:
```bash
cp models/User-Firestore.js models/User.js
```

## Data Migration Script

To migrate your existing users from JSON to Firestore:

```javascript
// migration-script.js
const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin
admin.initializeApp({
  projectId: 'your-project-id'
});

const db = admin.firestore();
const oldUsers = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));

async function migrateUsers() {
  for (const user of oldUsers) {
    try {
      await db.collection('users').doc(user.id).set({
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(),
        lastLogin: user.lastLogin ? new Date(user.lastLogin) : null
      });
      console.log(`✅ Migrated user: ${user.email}`);
    } catch (error) {
      console.error(`❌ Failed to migrate ${user.email}:`, error);
    }
  }
}

migrateUsers();
```

## Firestore Collections Structure

### Users Collection: `/users/{userId}`
```javascript
{
  id: "uuid-string",
  name: "User Name",
  email: "user@example.com", 
  password: "hashed-password",  // bcrypt hash
  isPremium: false,
  createdAt: timestamp,
  updatedAt: timestamp,
  lastLogin: timestamp,
  aiMessagesUsed: 0,
  dailyLimit: 3,
  stripeCustomerId: "cus_...",  // if premium
  // ... other fields
}
```

## Advantages of Firestore

✅ **Scalable**: Handles millions of users  
✅ **Real-time**: Live updates across clients  
✅ **Secure**: Built-in authentication rules  
✅ **Reliable**: Google's infrastructure  
✅ **Indexed**: Fast queries and searching  
✅ **Offline**: Works without internet  

## Testing Your Setup

### 1. Update Firebase Config
Replace placeholders in `firebase-config.js` with your actual config

### 2. Set Environment Variable
```bash
export FIREBASE_PROJECT_ID=your-project-id
```

### 3. Switch User Model
```bash
cp models/User-Firestore.js models/User.js
```

### 4. Test Registration
1. Start your server: `npm run dev`
2. Open `http://localhost:3000`
3. Try creating a new account
4. Check Firestore console to see the new user

### 5. Test Login
Try logging in with the account you just created

## Troubleshooting

### Common Issues:

1. **"Firestore not initialized"**
   - Check your `FIREBASE_PROJECT_ID` environment variable
   - Verify Firebase config in `firebase-config.js`

2. **Permission denied**
   - Check Firestore security rules
   - Ensure you're using the correct project ID

3. **Users not saving**
   - Check console for Firestore errors
   - Verify your Firebase config is correct

## Next Steps

1. **Complete Firebase setup** following this guide
2. **Update your configuration** files
3. **Test email/password authentication**
4. **Migrate existing users** if needed
5. **Deploy with production security rules**

Your email/password authentication will work exactly the same way, but now with a scalable Firestore database! 🚀
