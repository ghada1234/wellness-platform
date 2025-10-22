# 🔒 Firebase Firestore Rules Setup

## 🚨 IMPORTANT: Fix "Error Saving Profile"

If you're getting "error saving profile", you need to deploy these Firestore security rules!

---

## ✅ **Quick Fix (5 minutes)**

### **Option 1: Deploy via Firebase Console (EASIEST)**

1. **Go to:** https://console.firebase.google.com/
2. **Select** your project: "Find Your Inner Peace"
3. **Click:** Build → Firestore Database (left sidebar)
4. **Click:** "Rules" tab at the top
5. **Copy the rules** from `firestore.rules` file in your project
6. **Paste** into the rules editor
7. **Click:** "Publish" button

✅ **Done! Profile saves will work immediately!**

---

### **Option 2: Deploy via Firebase CLI**

If you have Firebase CLI installed:

```bash
# Install Firebase CLI (if not installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init firestore

# Deploy rules
firebase deploy --only firestore:rules
```

---

## 📋 **What These Rules Do:**

### **User Profiles**
✅ Users can read/write their OWN profile
❌ Users CANNOT read other users' profiles

### **Food Logs, Meal Plans, etc.**
✅ Users can read/write their OWN data
❌ Users CANNOT access other users' data

### **Security**
✅ Requires authentication for all operations
✅ Validates user ownership before allowing access
✅ Denies everything by default

---

## 🔍 **Current Rules in firestore.rules:**

The file includes rules for:
- ✅ User Profiles (`userProfiles`)
- ✅ Food Logs (`foodLog`)
- ✅ Meal Plans (`mealPlans`)
- ✅ Mood Logs (`moods`)
- ✅ Water Logs (`waterLogs`)
- ✅ Sleep Logs (`sleepLogs`)
- ✅ Activity Logs (`activityLogs`)
- ✅ Journal Entries (`journalEntries`)
- ✅ Habits (`habits`)
- ✅ Self-love Activities (`selfLoveActivities`)

---

## 🐛 **Troubleshooting**

### **Still Getting "Error Saving Profile"?**

1. **Check Authentication:**
   - Make sure you're signed in
   - Try signing out and back in
   - Check browser console for errors

2. **Check Firebase Console:**
   - Go to: Authentication → Users
   - Verify your account is listed

3. **Check Rules Are Deployed:**
   - Go to: Firestore Database → Rules
   - Verify the rules match `firestore.rules`
   - Check "Last deployment" timestamp

4. **Check Browser Console:**
   - Press F12 to open DevTools
   - Look for Firebase errors
   - Share the error message for help

---

## 🔒 **Security Best Practices**

### **These Rules Ensure:**

1. **Authentication Required**
   - All operations require sign-in
   - Anonymous access is denied

2. **User Isolation**
   - Users can only access their own data
   - No cross-user data access

3. **Ownership Validation**
   - `userId` field must match authenticated user
   - Prevents unauthorized access

4. **Default Deny**
   - Everything not explicitly allowed is denied
   - Secure by default

---

## 📝 **Rule Syntax Explained**

```javascript
// User Profiles Rule
match /userProfiles/{userId} {
  // Allow read if:
  // - User is authenticated AND
  // - User ID matches the document ID
  allow read: if isAuthenticated() && isOwner(userId);
  
  // Allow write if:
  // - User is authenticated AND
  // - User ID matches the document ID
  allow write: if isAuthenticated() && isOwner(userId);
}
```

---

## ✅ **After Deploying Rules**

Test that it works:

1. **Go to:** https://find-your-inner-peace.com/dashboard/profile
2. **Fill in** your profile information
3. **Click:** "Save Personal Information"
4. **You should see:** "Profile Saved! 💾" (green notification)
5. **Refresh page** - your data should persist

---

## 🚀 **Quick Deploy Checklist**

- [ ] Open Firebase Console
- [ ] Go to Firestore Database → Rules
- [ ] Copy rules from `firestore.rules`
- [ ] Paste into editor
- [ ] Click "Publish"
- [ ] Wait 10 seconds
- [ ] Test profile save
- [ ] See success message! ✅

---

## 💡 **Alternative: Test Mode (NOT RECOMMENDED FOR PRODUCTION)**

If you just want to test quickly (NOT SECURE, only for testing):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

⚠️ **WARNING:** This allows authenticated users to read/write ALL data!
Only use for testing, then deploy the secure rules from `firestore.rules`

---

## 📞 **Need Help?**

If rules deployment fails or errors persist:

1. **Check error message** in Firebase Console
2. **Verify syntax** - rules must be valid
3. **Check authentication** - user must be signed in
4. **Try test mode** temporarily (see above)
5. **Contact support** with error details

---

## ✨ **Expected Behavior After Fix**

### **Before (Error):**
```
❌ Error Saving Profile
Could not save your personal information
```

### **After (Success):**
```
✅ Profile Saved! 💾
Your information has been saved and will sync across devices
```

---

**Deploy these rules now to fix the profile save error!** 🚀

