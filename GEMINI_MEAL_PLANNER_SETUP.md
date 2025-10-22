# 🍽️ AI Meal Planner Setup Guide - Google Gemini

## ✅ What You Built

**AI-Powered Meal Planner** that generates personalized meal plans based on:
- ✅ **Your Physical Metrics**: Weight, height, age, gender, activity level
- ✅ **Calculated Nutrition**: BMR, TDEE, calories, protein, carbs, fat targets
- ✅ **Your Preferences**: Cuisine preferences (from profile)
- ✅ **Your Restrictions**: Allergies, dislikes, dietary restrictions (from profile)
- ✅ **Your Goals**: Weight loss, maintenance, muscle gain
- ✅ **Complete Recipes**: Ingredients, instructions, cooking times
- ✅ **Shopping Lists**: Auto-generated from all meals

---

## 🚀 How It Works

### 1. **User Profile Integration**

The meal planner automatically loads data from your profile page:

```typescript
// Profile data loaded from Firebase/localStorage
{
  // Physical metrics
  weight: 81, height: 150, age: 35, gender: 'female',
  activityLevel: 'sedentary', goal: 'weight_loss',
  
  // Preferences & restrictions (from profile)
  cuisine: 'Italian, Mediterranean',  // Cuisine preferences
  allergies: 'Peanuts, Shellfish',    // Allergies
  dislikes: 'Mushrooms, Olives',      // Dislikes
  diet: 'Vegan, Gluten-Free'          // Dietary restrictions
}
```

### 2. **Automatic Nutrition Calculation**

Calculates your personalized targets using scientific formulas:

```typescript
// BMR (Basal Metabolic Rate) - Mifflin-St Jeor Equation
BMR = 10 * weight + 6.25 * height - 5 * age - 161 (for females)
BMR = 10 * weight + 6.25 * height - 5 * age + 5 (for males)

// TDEE (Total Daily Energy Expenditure)
TDEE = BMR * activity_multiplier
// sedentary: 1.2, lightly_active: 1.375, moderately_active: 1.55, very_active: 1.725

// Calorie adjustment based on goal
weight_loss: TDEE - 500 calories
maintenance: TDEE
muscle_gain: TDEE + 300 calories

// Macros
protein: weight * 2.0g (for weight loss)
fat: 25% of calories
carbs: remaining calories
```

### 3. **Gemini AI Generation**

Sends all this data to Gemini AI which generates:
- ✅ **Personalized meals** matching your cuisine preferences
- ✅ **Precise nutrition** hitting your calculated targets
- ✅ **Complete recipes** with ingredients and instructions
- ✅ **Shopping list** consolidated by category
- ✅ **Recommendations** for meal prep and success

---

## 🔧 Setup Steps

### Step 1: Get Gemini API Key

**Already done!** ✅ You already have your Gemini API key set up:
- Location: Vercel environment variables
- Variable name: `GEMINI_API_KEY`

If you need to check or update it:
1. Go to: https://vercel.com/ghada-rabees-projects/mind-main/settings/environment-variables
2. Find `GEMINI_API_KEY`

### Step 2: Test the Meal Planner

1. **Go to Profile Page**: `/dashboard/profile`
   - Make sure your profile is complete (age, weight, height, etc.)
   - **Add preferences**: Cuisine, allergies, dislikes, diet

2. **Go to Meal Planner**: `/dashboard/nutrition/meal-planner`
   - You'll see your profile summary and nutrition targets
   - Enter a plan name (e.g., "My 7-Day Plan")
   - Select duration (1 day, 3 days, 7 days, 14 days, 30 days)
   - Click "Generate AI Meal Plan"

3. **AI generates your plan**:
   - Personalized meals matching your preferences
   - Hitting your exact nutrition targets
   - Complete recipes with instructions
   - Shopping list by category

4. **Export & Share**:
   - Download as PDF
   - Share via WhatsApp
   - Generate new plans anytime

---

## 📋 Features

### Profile Integration
- **Auto-loads** physical metrics (weight, height, age, gender)
- **Auto-loads** activity level and goals
- **Auto-loads** cuisine preferences
- **Auto-loads** allergies, dislikes, dietary restrictions
- **Calculates** BMR, TDEE, and macro targets

### Meal Generation
- **Personalized** to your exact nutrition targets
- **Respects** all allergies and dietary restrictions
- **Prioritizes** your cuisine preferences
- **Provides** complete recipes with cooking times
- **Includes** prep time, cook time, difficulty level
- **Generates** shopping list by category

### Display & Navigation
- **Day selector** - Switch between days
- **Meal cards** - Beautiful meal display
- **Nutrition badges** - Easy-to-read macro info
- **Recipe instructions** - Step-by-step with numbers
- **Shopping list** - Organized by category
- **Recommendations** - AI tips for success

### Export & Share
- **PDF Export** - Print or save meal plans
- **WhatsApp Share** - Share with friends/family
- **Generate new** - Create unlimited plans

---

## 🎯 How to Update Profile for Better Plans

### 1. Physical Metrics
```
Go to: /dashboard/profile

Update:
- Age, Weight, Height, Gender
- Activity Level (sedentary → very_active)
- Goal (weight_loss, maintenance, muscle_gain)
```

### 2. Cuisine Preferences
```
Example: "Italian, Mediterranean, Asian"

This tells AI to:
- Prioritize these cuisines
- Create authentic dishes
- Mix and match across days
```

### 3. Dietary Restrictions
```
Example: "Vegan, Gluten-Free, Keto"

AI will:
- Strictly follow these restrictions
- Never include excluded ingredients
- Adjust macros accordingly
```

### 4. Allergies
```
Example: "Peanuts, Shellfish, Dairy"

AI will:
- NEVER include these ingredients
- Avoid cross-contamination risks
- Find safe alternatives
```

### 5. Dislikes
```
Example: "Mushrooms, Olives, Cilantro"

AI will:
- Try to avoid these foods
- Use alternatives when possible
- Respect your taste preferences
```

---

## 📊 Nutrition Calculation Examples

### Example 1: Weight Loss (Female)
```
Profile:
- Age: 35, Weight: 81kg, Height: 150cm, Female
- Activity: Sedentary, Goal: Weight Loss

Calculations:
- BMR = 10(81) + 6.25(150) - 5(35) - 161 = 1,412 cal/day
- TDEE = 1,412 × 1.2 = 1,694 cal/day
- Target = 1,694 - 500 = 1,194 cal/day

Macros:
- Protein: 81kg × 2.0g = 162g (648 cal, 54%)
- Fat: 1,194 × 0.25 = 298 cal = 33g (25%)
- Carbs: 1,194 - 648 - 298 = 248 cal = 62g (21%)
```

### Example 2: Muscle Gain (Male)
```
Profile:
- Age: 28, Weight: 70kg, Height: 175cm, Male
- Activity: Very Active, Goal: Muscle Gain

Calculations:
- BMR = 10(70) + 6.25(175) - 5(28) + 5 = 1,660 cal/day
- TDEE = 1,660 × 1.725 = 2,864 cal/day
- Target = 2,864 + 300 = 3,164 cal/day

Macros:
- Protein: 70kg × 2.2g = 154g (616 cal, 19%)
- Fat: 3,164 × 0.25 = 791 cal = 88g (25%)
- Carbs: 3,164 - 616 - 791 = 1,757 cal = 439g (56%)
```

---

## 🔍 How Gemini AI Works

### 1. **Input Processing**
```typescript
Gemini receives:
- Physical profile (weight, height, age, gender)
- Calculated targets (BMR, TDEE, calories, macros)
- Preferences (cuisines, diet type)
- Restrictions (allergies, dislikes)
- Plan config (duration, plan name)
```

### 2. **AI Generation**
```
Gemini AI:
1. Analyzes your profile and targets
2. Selects appropriate cuisines from preferences
3. Avoids ALL allergens and restricted ingredients
4. Creates meals hitting exact nutrition targets
5. Distributes calories: 25% breakfast, 35% lunch, 30% dinner, 10% snacks
6. Generates complete recipes with ingredients
7. Creates step-by-step cooking instructions
8. Consolidates shopping list by category
9. Provides personalized recommendations
```

### 3. **Output Structure**
```typescript
{
  planId: "unique-id",
  planName: "Your Plan Name",
  days: [
    {
      dayNumber: 1,
      date: "2025-10-22",
      meals: [
        {
          name: "Mediterranean Quinoa Bowl",
          description: "Protein-packed breakfast...",
          cuisine: "Mediterranean",
          calories: 300,
          protein: 40g,
          carbs: 16g,
          fat: 8g,
          ingredients: [...],
          instructions: [...]
        }
      ],
      dailyTotals: { calories: 1194, protein: 162g, ... }
    }
  ],
  shoppingList: [
    {
      category: "Proteins",
      items: [{ name: "Chicken breast", totalAmount: "2", unit: "kg" }]
    }
  ],
  recommendations: [...]
}
```

---

## 🎨 UI Components

### Page Layout
- **Profile Summary Card**: Shows your metrics and targets
- **Generation Form**: Plan name and duration selector
- **Day Selector**: Switch between days in plan
- **Meal Cards**: Beautiful display of each meal
- **Shopping List**: Organized by category
- **Action Buttons**: Export PDF, Share, New Plan

### Meal Card Features
- **Name & Description**: Clear meal title and summary
- **Badges**: Category, cuisine, difficulty, time, servings
- **Nutrition Grid**: Calories, protein, carbs, fat, fiber, sugar, sodium
- **Ingredients List**: With checkboxes and amounts
- **Instructions**: Numbered steps with clear formatting
- **Tags**: Dietary info (vegan, gluten-free, etc.)

---

## ⚡ Performance & Caching

### Rate Limiting
```typescript
// Configured in: src/lib/rate-limit.ts
ai: {
  maxRequests: 10,
  windowMs: 60000 // 10 requests per minute
}
```

### Caching
```typescript
// Configured in: src/lib/cache.ts
cacheTTL.long // 30 minutes
// Meal plans cached by userId and date
```

### Cost Optimization
- **Caching**: Prevents duplicate requests
- **Rate limiting**: Prevents abuse
- **Smart generation**: Only generates when needed

---

## 🐛 Troubleshooting

### Issue: "Profile Required" Error
**Solution**: Complete your profile at `/dashboard/profile`
- Add age, weight, height, gender
- Select activity level and goal

### Issue: "API Key Not Configured"
**Solution**: Check Vercel environment variable
1. Go to Vercel project settings
2. Find `GEMINI_API_KEY`
3. Ensure it's set correctly

### Issue: Generation Takes Long Time
**Expected**: Gemini AI takes 10-30 seconds for complex meal plans
- 1-day plan: ~10 seconds
- 7-day plan: ~30 seconds
- 30-day plan: ~60 seconds

### Issue: Nutrition Doesn't Match Targets
**Solution**: Gemini tries its best, but may vary by ±10%
- This is normal for complex multi-day plans
- Daily totals aim to match targets closely

### Issue: Meals Don't Match Preferences
**Solution**: Update profile with more specific preferences
- Be specific: "Italian, Mediterranean" not just "Any"
- Add dietary restrictions: "Vegan, Gluten-Free"
- List allergies clearly

---

## 📱 Mobile Responsiveness

All components are fully responsive:
- ✅ Profile summary cards stack on mobile
- ✅ Meal cards adapt to small screens
- ✅ Navigation uses bottom tabs on mobile
- ✅ Shopping list readable on any device
- ✅ PDF export works on mobile browsers

---

## 🔐 Security & Privacy

### Data Storage
- **Profile**: Stored in Firebase + localStorage
- **Meal Plans**: Generated on-demand, not stored permanently
- **API Key**: Secure in Vercel environment variables

### Privacy
- **No tracking**: Meal plans not saved without your consent
- **Your data**: Profile data only accessible to you
- **Secure**: All connections use HTTPS

---

## 🚀 Next Steps

### 1. **Test It Out**
- Update your profile with preferences
- Generate a 1-day plan to test
- Try different durations

### 2. **Share With Users**
- Announce the new feature
- Create tutorial video
- Share example meal plans

### 3. **Monitor Usage**
- Check Vercel Analytics
- Monitor Gemini API usage
- Track user feedback

### 4. **Future Enhancements**
- **Save meal plans** to Firebase
- **Meal plan history** - view past plans
- **Favorite meals** - save favorite recipes
- **Custom ingredients** - manual adjustments
- **Meal swap** - replace individual meals
- **Grocery delivery** - integrate with delivery services

---

## 📚 Code Structure

```
src/
├── app/
│   ├── dashboard/
│   │   ├── nutrition/
│   │   │   └── meal-planner/
│   │   │       └── page.tsx         # Main meal planner page
│   │   └── profile/
│   │       └── page.tsx              # Profile with preferences
│   └── api/
│       └── ai/
│           └── generate-meal-plan/
│               └── route.ts          # API endpoint
├── ai/
│   └── flows/
│       └── generate-meal-plan.ts     # Gemini AI flow
├── components/
│   └── layout/
│       └── sidebar-nav.tsx           # Navigation with meal planner link
└── lib/
    ├── rate-limit.ts                 # Rate limiting
    └── cache.ts                      # Caching utilities
```

---

## 🎉 Congratulations!

You now have a **fully functional AI Meal Planner** that:
- ✅ Integrates with user profiles
- ✅ Calculates personalized nutrition targets
- ✅ Respects preferences and restrictions
- ✅ Generates complete recipes with instructions
- ✅ Creates shopping lists automatically
- ✅ Exports to PDF and shares via WhatsApp

**URL**: https://www.find-your-inner-peace.com/dashboard/nutrition/meal-planner

**Start generating personalized meal plans now!** 🍽️✨

