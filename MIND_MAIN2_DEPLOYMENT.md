# 🚀 mind-main2 Deployment Setup

## ✅ New Vercel Project: mind-main2

If you created a new Vercel project called "mind-main2", here's how to set it up:

---

## 🔑 **STEP 1: Add ALL Environment Variables**

Go to: https://vercel.com/ghada-rabees-projects/mind-main2/settings/environment-variables

### **Add These Variables:**

#### **1. Gemini API Key (REQUIRED for AI features)**
```
Name: GEMINI_API_KEY
Value: AIzaSyDR54h--QKpVHWCuowWCjZXaK9OIUVHXBg
Environment: ✅ Production ✅ Preview ✅ Development
```

#### **2. Firebase Configuration (REQUIRED - 7 variables)**

Get these from: https://console.firebase.google.com/ → Your Project → Settings → Web App Config

```
Name: NEXT_PUBLIC_FIREBASE_API_KEY
Value: [from Firebase Console]
Environment: ✅ All three

Name: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
Value: [from Firebase Console]
Environment: ✅ All three

Name: NEXT_PUBLIC_FIREBASE_PROJECT_ID
Value: [from Firebase Console]
Environment: ✅ All three

Name: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
Value: [from Firebase Console]
Environment: ✅ All three

Name: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
Value: [from Firebase Console]
Environment: ✅ All three

Name: NEXT_PUBLIC_FIREBASE_APP_ID
Value: [from Firebase Console]
Environment: ✅ All three

Name: NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
Value: [from Firebase Console]
Environment: ✅ All three
```

#### **3. Google Analytics (OPTIONAL)**
```
Name: NEXT_PUBLIC_GA_MEASUREMENT_ID
Value: G-039YSYEG0Z
Environment: ✅ All three
```

#### **4. Fitbit API (OPTIONAL)**
```
Name: FITBIT_CLIENT_ID
Value: 23TGB6
Environment: ✅ All three

Name: FITBIT_CLIENT_SECRET
Value: ecb5e5ce4536f64113fa6c65002d09a9
Environment: ✅ All three
```

---

## 🚀 **STEP 2: Redeploy**

After adding all environment variables:

1. **Go to:** https://vercel.com/ghada-rabees-projects/mind-main2/deployments
2. **Click:** "⋮" (three dots) on the latest deployment
3. **Click:** "Redeploy"
4. **Wait:** 3 minutes for build

---

## 🌐 **STEP 3: Connect Your Domain**

1. **Go to:** https://vercel.com/ghada-rabees-projects/mind-main2/settings/domains

2. **Add primary domain:**
   - Type: `find-your-inner-peace.com`
   - Click: "Add"

3. **Add www subdomain:**
   - Type: `www.find-your-inner-peace.com`
   - Click: "Add"

4. **Wait:** 1-2 minutes for SSL certificate

---

## ✅ **STEP 4: Verify Everything Works**

### **Test These URLs:**

1. **Homepage:**
   - https://find-your-inner-peace.com/
   - Should show: AI Meal Planner with "NEW" badge ✅

2. **Your CV:**
   - https://find-your-inner-peace.com/cv
   - Should load: Your professional resume ✅

3. **Profile:**
   - https://find-your-inner-peace.com/dashboard/profile
   - Fill and save: Should see "Profile Saved!" ✅

4. **AI Meal Planner:**
   - https://find-your-inner-peace.com/dashboard/nutrition/meal-planner
   - Generate plan: Should create meal plan ✅

5. **AI Hub:**
   - https://find-your-inner-peace.com/dashboard/ai-hub
   - Should show: Recommendations (no errors!) ✅

6. **Nutrition Tracker:**
   - https://find-your-inner-peace.com/dashboard/nutrition
   - Should show: YOUR personalized goals ✅

---

## 📋 **Complete Variable Checklist:**

Copy this template and fill in your values:

```plaintext
✅ GEMINI_API_KEY = AIzaSyDR54h--QKpVHWCuowWCjZXaK9OIUVHXBg

Firebase (get from https://console.firebase.google.com/):
⬜ NEXT_PUBLIC_FIREBASE_API_KEY = 
⬜ NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 
⬜ NEXT_PUBLIC_FIREBASE_PROJECT_ID = 
⬜ NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = 
⬜ NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 
⬜ NEXT_PUBLIC_FIREBASE_APP_ID = 
⬜ NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = 

Optional:
⬜ NEXT_PUBLIC_GA_MEASUREMENT_ID = G-039YSYEG0Z
⬜ FITBIT_CLIENT_ID = 23TGB6
⬜ FITBIT_CLIENT_SECRET = ecb5e5ce4536f64113fa6c65002d09a9
```

---

## 🔥 **After Setup:**

Your "mind-main2" project will have:
- ✅ All 10 AI features working
- ✅ Professional CV page
- ✅ Google Analytics tracking
- ✅ Profile-driven personalization
- ✅ Firebase integration
- ✅ Your custom domain
- ✅ SSL certificate
- ✅ Ready for users!

---

## ⏱️ **Timeline:**

| Task | Time |
|------|------|
| Add env variables | 5 min |
| Redeploy | 3 min |
| Add domain | 2 min |
| Test features | 5 min |
| **TOTAL** | **15 min** |

---

## 🆘 **Need Firebase Config?**

### **Get It Here:**

1. **Go to:** https://console.firebase.google.com/
2. **Click:** Your project (Find Your Inner Peace)
3. **Click:** ⚙️ Settings → Project Settings
4. **Scroll down:** to "Your apps"
5. **Click:** Web app icon (</>)
6. **Copy:** All 7 config values

**You'll see something like:**
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456",
  appId: "1:123:web:abc",
  measurementId: "G-XXX"
};
```

**Copy each value** and add to Vercel!

---

## ✨ **After Deployment:**

**Your URLs:**
- **Homepage:** https://find-your-inner-peace.com/
- **Dashboard:** https://find-your-inner-peace.com/dashboard
- **Meal Planner:** https://find-your-inner-peace.com/dashboard/nutrition/meal-planner
- **Your CV:** https://find-your-inner-peace.com/cv

**All features will work!** 🎉

---

**Start adding environment variables now!** 🚀

