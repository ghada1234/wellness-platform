# 🔑 Get Gemini API Key NOW - Quick Fix

## ⚡ Fix "Generation Failed - Gemini API Key" Error

---

## 🎯 **Quick Fix (3 minutes):**

### **Step 1: Get Your Gemini API Key** (1 minute)

1. **Go to:** https://aistudio.google.com/app/apikey

2. **Sign in** with your Google account (if needed)

3. **Click:** "Create API Key" button

4. **Select:** "Create API key in new project" (or use existing project)

5. **Copy** the API key (starts with `AIza...`)
   - Example: `AIzaSyDXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

6. **Save it** somewhere safe (you'll need it in 30 seconds)

---

### **Step 2: Add to Vercel** (1 minute)

**If you have a Vercel project deployed:**

1. **Go to:** https://vercel.com/ghada-rabees-projects/mind-main/settings/environment-variables

2. **Or if new project:** https://vercel.com/dashboard → Your Project → Settings → Environment Variables

3. **Click:** "Add New" button

4. **Fill in:**
   - **Name:** `GEMINI_API_KEY`
   - **Value:** Paste your API key (the `AIza...` string)
   - **Environment:** Select all (Production, Preview, Development)

5. **Click:** "Save"

---

### **Step 3: Redeploy** (1 minute)

**Option A: Automatic (if connected to GitHub)**
1. Go to: https://vercel.com/ghada-rabees-projects/mind-main/deployments
2. Click the "⋮" (three dots) on the latest deployment
3. Click "Redeploy"
4. Wait 3 minutes

**Option B: Via Dashboard**
1. Your project should auto-redeploy when you add env variable
2. Just wait 3 minutes

---

### **Step 4: Test It** (30 seconds)

1. **Go to:** https://find-your-inner-peace.com/dashboard/nutrition/meal-planner

2. **Click:** "Generate AI Meal Plan"

3. **You should see:** 
   - "🤖 Gemini AI Generating..." 
   - Wait 10-30 seconds
   - "🎉 Meal Plan Generated!"

4. **Success!** ✅

---

## 🆘 **If Still Getting Error:**

### **Check 1: API Key is Valid**

Test your API key:

1. **Go to:** https://aistudio.google.com/app/apikey
2. **Check:** Your key is listed and active
3. **If not:** Create a new key
4. **Copy** the new key
5. **Update** in Vercel environment variables

---

### **Check 2: Environment Variable Name is Correct**

**MUST BE EXACTLY:** `GEMINI_API_KEY`

**NOT:**
- ❌ `GEMINI_KEY`
- ❌ `GOOGLE_GEMINI_API_KEY`
- ❌ `NEXT_PUBLIC_GEMINI_API_KEY`

**CORRECT:**
- ✅ `GEMINI_API_KEY`

---

### **Check 3: Deployment Used New Env Variable**

1. Go to: Vercel → Deployments
2. Click on the latest deployment
3. Check the "Environment Variables" section
4. Verify `GEMINI_API_KEY` is listed

If NOT listed:
- The deployment was before you added the key
- Click "Redeploy" to use the new key

---

## 📝 **Complete Environment Variables Checklist**

For your app to work fully, you need ALL of these:

### **Required:**
```
✅ GEMINI_API_KEY                           (for AI meal plans)
✅ NEXT_PUBLIC_FIREBASE_API_KEY             (for database)
✅ NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
✅ NEXT_PUBLIC_FIREBASE_PROJECT_ID
✅ NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
✅ NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
✅ NEXT_PUBLIC_FIREBASE_APP_ID
✅ NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

### **Optional:**
```
⭕ NEXT_PUBLIC_GA_MEASUREMENT_ID            (for Google Analytics)
⭕ FITBIT_CLIENT_ID                         (for Fitbit integration)
⭕ FITBIT_CLIENT_SECRET                     (for Fitbit integration)
```

---

## 🔍 **How to Verify API Key is Working:**

### **After adding key and redeploying:**

1. **Open browser console** (F12)
2. **Go to meal planner** page
3. **Click** "Generate AI Meal Plan"
4. **Watch console** for messages

**Success messages:**
```
✅ "Sending request to Gemini AI: {...}"
✅ "Gemini AI Meal Plan Generated: {...}"
```

**Error messages:**
```
❌ "API key not configured"
❌ "GEMINI_API_KEY is not set"
❌ "Failed to generate meal plan"
```

---

## 💡 **Quick Test: Is Gemini API Working?**

### **Other AI Features Use Gemini Too:**

Try these to test if Gemini API is working:

1. **Food Photo Analysis:**
   - Go to: /dashboard/nutrition
   - Click "Analyze Food Photo"
   - Upload a food image
   - Should get AI analysis

2. **AI Hub:**
   - Go to: /dashboard/ai-hub
   - Should generate recommendations

If these work ✅ → Gemini API key is correct!
If these fail ❌ → Need to add/fix Gemini API key

---

## 🎯 **Expected Timeline:**

| Task | Time |
|------|------|
| Get Gemini API key | 1 min |
| Add to Vercel | 1 min |
| Redeploy | 3 min |
| Test meal planner | 30 sec |
| **Total** | **5-6 min** |

---

## ✅ **Success Indicators:**

You'll know it's working when:

1. ✅ Can generate meal plans without error
2. ✅ See "🤖 Gemini AI Generating..." message
3. ✅ Get complete meal plan with recipes
4. ✅ Shopping list appears
5. ✅ Can export to PDF

---

## 📞 **Still Stuck?**

**Share:**
1. Error message (exact text)
2. Screenshot of Vercel environment variables (hide values)
3. Browser console errors (F12)

---

**Get your Gemini API key now and add it to Vercel!** 🚀

**Link:** https://aistudio.google.com/app/apikey

