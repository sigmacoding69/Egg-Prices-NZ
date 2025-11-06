# Debugging Firestore Integration

## Quick Debug Steps

### 1. Open Browser Console
1. Open your website in a browser
2. Press `F12` or right-click → "Inspect" → "Console" tab
3. Look for Firebase initialization messages

### 2. Check Firebase Initialization
You should see these messages in the console:
```
✅ Firebase initialized successfully
🔄 Initializing Firestore...
Firebase available: true
Firebase apps: 1
✅ Firestore initialized successfully
```

### 3. Run Firestore Tests
In the browser console, run:
```javascript
runAllTests()
```

This will test:
- Firebase connection
- User creation
- Subscription creation

### 4. Check Firestore Security Rules
In your Firebase Console:
1. Go to **Firestore Database** → **Rules**
2. Make sure rules allow read/write:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 5. Test User Registration
1. Try creating a new account
2. Check console for messages like:
   - "✅ User saved to Firestore: user@example.com"
   - "✅ Firestore updates completed"

### 6. Test Stripe Payment
1. Try the Stripe payment flow
2. Check console for:
   - "🔄 Updating user premium status in Firestore..."
   - "✅ Firestore updates completed"

## Common Issues & Solutions

### Issue: "Firebase not initialized"
**Solution:** Check that Firebase SDK scripts are loaded before your config
- Make sure `firebase-config.js` is loaded after Firebase SDK
- Check network tab for failed script loads

### Issue: "Permission denied"
**Solution:** Update Firestore security rules
- Go to Firebase Console → Firestore → Rules
- Set rules to allow read/write for testing

### Issue: "Firestore not available"
**Solution:** Check Firebase SDK version
- Make sure you're using compatible versions
- Try updating to latest Firebase SDK

### Issue: Data not appearing in Firestore Console
**Possible causes:**
1. **Wrong project**: Check you're looking at the right Firebase project
2. **Security rules**: Rules might be blocking writes
3. **Network issues**: Check browser network tab for failed requests
4. **Timing issues**: Firebase might not be initialized when code runs

## Debug Commands

Run these in browser console:

```javascript
// Check Firebase status
console.log('Firebase:', typeof firebase !== 'undefined');
console.log('Firebase apps:', firebase?.apps?.length);

// Check FirestoreUtils
console.log('FirestoreUtils:', window.firestoreUtils);
console.log('FirestoreUtils db:', window.firestoreUtils?.db);

// Test basic Firestore operation
firebase.firestore().collection('test').doc('debug').set({test: true});

// Check for errors
window.addEventListener('error', e => console.error('Global error:', e));
```

## Expected Console Output

When everything works correctly, you should see:

```
✅ Firebase initialized successfully
🔄 Initializing Firestore...
Firebase available: true
Firebase apps: 1
✅ Firestore initialized successfully
Firestore instance: [Firestore object]
✅ User saved to Firestore: user@example.com
🔄 Updating user premium status in Firestore...
✅ Firestore updates completed
```

## Still Not Working?

1. **Check Network Tab**: Look for failed requests to Firebase
2. **Check Firebase Console**: Verify your project ID is correct
3. **Try Incognito Mode**: Rule out browser extension issues
4. **Check Browser Compatibility**: Ensure your browser supports Firebase

## Test Data Structure

After successful integration, you should see these collections in Firestore:

### `/users/{userId}`
```json
{
  "id": "user_123",
  "name": "John Doe",
  "email": "john@example.com",
  "isPremium": true,
  "subscriptionStatus": "active",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### `/subscriptions/{subscriptionId}`
```json
{
  "id": "sub_1234567890_abc123",
  "userId": "user_123",
  "status": "active",
  "planId": "premium_monthly",
  "amount": 999,
  "currency": "nzd",
  "isPremium": true,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```





