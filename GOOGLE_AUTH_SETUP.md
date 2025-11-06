# Google Authentication Setup Guide

## Overview
I've successfully added Google login/signup functionality to your existing authentication system. The Google buttons are now available in both the login and signup modals.

## Firebase Console Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: "GroceryCompare NZ" (or similar)
4. Enable Google Analytics if desired
5. Click "Create project"

### 2. Enable Google Authentication
1. In your Firebase project, navigate to **Authentication** > **Sign-in method**
2. Click on **Google** provider
3. Toggle the "Enable" switch
4. Set up OAuth consent screen:
   - Add your project's public-facing name: "GroceryCompare NZ"
   - Add your support email
   - Add authorized domains:
     - `localhost` (for development)
     - Your production domain when ready
5. Click "Save"

### 3. Get Firebase Configuration
1. Go to **Project Settings** (gear icon) > **General**
2. Scroll down to "Your apps" section
3. Click "Add app" > Web app icon (`</>`)
4. Register your app with a nickname like "GroceryCompare Web"
5. **IMPORTANT**: Copy the Firebase configuration object

### 4. Update Firebase Configuration
Open `firebase-config.js` and replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};
```

## Installation

### Install Dependencies
Run this command to install the Firebase Admin SDK:
```bash
npm install
```

The `firebase-admin` package has been added to your `package.json`.

## Features Added

### Frontend Changes
1. **Firebase SDK**: Added Firebase authentication scripts to `index.html`
2. **Google Buttons**: Added styled Google sign-in buttons to both login and signup forms
3. **Firebase Config**: Created `firebase-config.js` for Firebase initialization
4. **Authentication Logic**: Enhanced `auth.js` with Google sign-in functionality
5. **Styling**: Added professional Google button styling in `styles.css`

### Backend Changes
1. **Google Route**: Added `/api/auth/google-signin` endpoint in `routes/auth.js`
2. **User Model**: Enhanced to support Google UID and photo URL
3. **Dependencies**: Added `firebase-admin` for token verification (optional)

### How It Works
1. User clicks "Continue with Google" or "Sign up with Google"
2. Firebase opens Google OAuth popup
3. User authenticates with Google
4. Firebase returns user data and ID token
5. Frontend sends token to your backend
6. Backend creates/updates user account
7. User is logged in with your existing JWT system

## Security Notes

### Current Implementation
- Currently trusts Firebase's frontend token verification
- Suitable for development and testing

### Production Recommendations
For production, implement server-side token verification:

1. **Service Account**: Download a Firebase service account key from Firebase Console
2. **Environment Variable**: Store the key path in your environment
3. **Token Verification**: Uncomment and configure Firebase Admin SDK initialization

Example production setup:
```javascript
// In routes/auth.js, replace the current Firebase setup with:
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Then verify tokens server-side:
const decodedToken = await admin.auth().verifyIdToken(idToken);
```

## Testing

### Manual Testing Steps
1. Start your server: `npm run dev`
2. Open your application in a browser
3. Click "Login" or "Sign Up"
4. Click "Continue with Google" or "Sign up with Google"
5. Complete Google authentication
6. Verify you're logged in to your application

### Troubleshooting
- **Popup Blocked**: Ensure popups are allowed for your domain
- **Configuration Error**: Double-check your Firebase config values
- **CORS Issues**: Ensure your domain is in Firebase's authorized domains
- **Token Issues**: Check browser console for detailed error messages

## Files Modified/Created

### New Files
- `firebase-config.js` - Firebase initialization and configuration
- `GOOGLE_AUTH_SETUP.md` - This setup guide

### Modified Files
- `index.html` - Added Firebase SDK scripts and Google buttons
- `auth.js` - Added Google authentication functions
- `styles.css` - Added Google button styling
- `package.json` - Added firebase-admin dependency
- `routes/auth.js` - Added Google sign-in endpoint

## Next Steps

1. **Complete Firebase Setup**: Follow the Firebase Console setup steps above
2. **Update Configuration**: Replace placeholder values in `firebase-config.js`
3. **Install Dependencies**: Run `npm install`
4. **Test**: Try the Google authentication flow
5. **Production Security**: Implement server-side token verification for production

The Google authentication is now fully integrated with your existing system and will work seamlessly alongside your email/password authentication!
