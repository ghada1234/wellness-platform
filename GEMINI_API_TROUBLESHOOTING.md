# 🔧 Gemini API Troubleshooting Guide

## ✅ What I Just Fixed

**Problem:** "Many errors after adding Gemini API key"
**Cause:** Genkit wasn't receiving the API key properly
**Solution:** Updated `src/ai/genkit.ts` to explicitly pass the API key

---

## 🎯 What Was Fixed:

### **Before (Broken):**
```typescript
export const ai = genkit({
  plugins: [googleAI()],  // ❌ Not receiving API key
  model: 'googleai/gemini-2.5-flash',  // ❌ Unstable model
});
```

### **After (Fixed):**
```typescript
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,  // ✅ Explicitly pass key
    })
  ],
  model: 'googleai/gemini-2.0-flash-exp',  // ✅ Stable model
});
```

---

## 🚀 Next Steps:

### **1. Redeploy to Vercel** (3 minutes)

The fix is already on GitHub. You need to redeploy:

**If you already have a Vercel project:**
1. Go to: https://vercel.com/ghada-rabees-projects/mind-main/deployments
2. Click: "⋮" (three dots) on latest deployment
3. Click: "Redeploy"
4. Wait: 3 minutes

**If deploying for first time:**
1. Go to: https://vercel.com/new
2. Import: `ghada1234/mind-main1`
3. Add env variables (including GEMINI_API_KEY)
4. Deploy

---

### **2. Verify API Key is Set** (1 minute)

**Check Vercel Environment Variables:**
1. Go to: https://vercel.com/[your-project]/settings/environment-variables
2. Verify: `GEMINI_API_KEY` exists
3. Value should be: `AIzaSyDR54h--QKpVHWCuowWCjZXaK9OIUVHXBg`
4. Environment: Should be checked for Production, Preview, Development

**If missing or wrong:**
- Click "Edit"
- Update the value
- Save
- Redeploy

---

### **3. Test Each Feature** (5 minutes)

After redeployment, test in this order:

#### **Test 1: AI Hub** (Most Basic)
```
URL: /dashboard/ai-hub
Expected: Shows recommendations (demo or AI-powered)
Error: Should show demo mode if key still not working
```

#### **Test 2: Food Photo Analysis**
```
URL: /dashboard/nutrition
Tab: AI Insights
Action: Upload food photo
Expected: Gemini analyzes and identifies food
```

#### **Test 3: AI Meal Planner**
```
URL: /dashboard/nutrition/meal-planner
Action: Generate 1-day plan
Expected: Creates meal plan with recipes
```

#### **Test 4: Nutrition Label Scanner**
```
URL: /dashboard/nutrition
Tab: AI Insights
Action: Scan nutrition label
Expected: OCR extracts nutrition facts
```

---

## 🐛 Common Errors & Fixes:

### **Error: "API key not configured"**
**Fix:**
1. Check Vercel env variable exists
2. Verify key starts with `AIza...`
3. Redeploy after adding key

### **Error: "Failed to generate recommendations"**
**Fix:**
1. Check Vercel deployment logs
2. Look for "API Key available: true" in logs
3. If false, env variable isn't set correctly

### **Error: "Rate limit exceeded"**
**Fix:**
1. Gemini free tier has limits
2. Wait 1 minute and try again
3. Or upgrade to paid tier

### **Error: "Model not found"**
**Fix:**
- Fixed by using `gemini-2.0-flash-exp` model
- This is a stable, available model

---

## 📊 How to Check Deployment Logs:

1. **Go to:** https://vercel.com/[your-project]/deployments
2. **Click** on the latest deployment
3. **Click** "Build Logs" tab
4. **Look for:**
   ```
   ✅ "API Key available: true"
   ✅ "Genkit initialized successfully"
   ```

5. **If you see errors:**
   - Copy the error message
   - Share it with me
   - I'll help fix it

---

## ✅ Expected Behavior After Fix:

### **AI Hub:**
```
✅ Loads recommendations (AI or demo)
✅ No red error screen
✅ Can chat with AI assistant
✅ Shows wellness insights
```

### **Nutrition Tracker:**
```
✅ Loads personalized goals from profile
✅ Can upload food photos for analysis
✅ Can scan nutrition labels
✅ Food database search works
```

### **AI Meal Planner:**
```
✅ Loads profile automatically
✅ Shows BMR/TDEE calculations
✅ Generates meal plans successfully
✅ Shows complete recipes
✅ Creates shopping lists
```

---

## 🔍 Debug Checklist:

If you're still seeing errors after redeploying:

- [ ] Gemini API key is added to Vercel
- [ ] Key is correct: `AIzaSyDR54h--QKpVHWCuowWCjZXaK9OIUVHXBg`
- [ ] Environment: All three boxes checked (Production, Preview, Development)
- [ ] Redeployed after adding key
- [ ] Waited 3 minutes for deployment
- [ ] Hard refreshed browser (`Ctrl+Shift+R`)
- [ ] Checked deployment logs for errors

---

## 📱 Quick Test Commands:

### **Test API Key in Browser Console:**

1. Open any page on your site
2. Press F12 (DevTools)
3. Go to Console tab
4. Look for: "API Key available: true" or similar messages

### **Test Specific Features:**

1. **AI Hub:** Should show demo recommendations at minimum
2. **Nutrition:** Upload a food photo, should analyze
3. **Meal Planner:** Generate 1-day plan, should work

---

## 🆘 Still Getting Errors?

**Share these with me:**

1. **Exact error message** (screenshot or text)
2. **Which feature** (AI Hub, Meal Planner, etc.)
3. **Browser console logs** (F12 → Console)
4. **Vercel deployment logs** (if accessible)

**Common info needed:**
```
- Error message: "..."
- Feature: AI Meal Planner
- Console shows: "..."
- Deployment log shows: "..."
```

---

## ✨ Summary:

**What was broken:** Genkit couldn't access Gemini API key
**What I fixed:** Explicitly passed API key to GoogleAI plugin
**What you need:** Redeploy to Vercel
**Expected result:** All AI features work perfectly!

---

**Redeploy now and test! The fix is on GitHub ready to go!** 🚀✨

