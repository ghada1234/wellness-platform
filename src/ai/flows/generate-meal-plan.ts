'use server';

/**
 * @fileOverview Generates personalized meal plans based on user profile and preferences.
 *
 * - generateMealPlan - A function that creates comprehensive meal plans.
 * - GenerateMealPlanInput - The input type for the generateMealPlan function.
 * - GenerateMealPlanOutput - The return type for the generateMealPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMealPlanInputSchema = z.object({
  // User Profile
  weight: z.number().describe('User weight in kg'),
  height: z.number().describe('User height in cm'),
  age: z.number().describe('User age in years'),
  gender: z.enum(['male', 'female', 'other']).describe('User gender'),
  activityLevel: z.enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active']).describe('User activity level'),
  
  // Goals
  goal: z.enum(['weight_loss', 'weight_gain', 'muscle_gain', 'maintenance', 'health_improvement']).describe('User fitness/nutrition goal'),
  targetWeight: z.number().optional().describe('Target weight in kg'),
  
  // Calculated Nutrition Targets
  targetCalories: z.number().describe('Daily calorie target based on BMR/TDEE'),
  targetProtein: z.number().describe('Daily protein target in grams'),
  targetCarbs: z.number().describe('Daily carbohydrates target in grams'),
  targetFat: z.number().describe('Daily fat target in grams'),
  bmr: z.number().describe('Basal Metabolic Rate'),
  tdee: z.number().describe('Total Daily Energy Expenditure'),
  
  // Preferences
  likes: z.array(z.string()).optional().describe('Foods the user likes'),
  dislikes: z.array(z.string()).optional().describe('Foods the user dislikes'),
  allergies: z.array(z.string()).optional().describe('Food allergies or intolerances'),
  cuisinePreferences: z.array(z.string()).optional().describe('Preferred cuisines (e.g., Mediterranean, Asian, etc.)'),
  dietaryRestrictions: z.array(z.string()).optional().describe('Dietary restrictions (e.g., vegan, keto, gluten-free)'),
  
  // Plan Configuration
  planName: z.string().optional().describe('Name for the meal plan'),
  planType: z.enum(['daily', 'weekly', 'monthly']).describe('Type of meal plan to generate'),
  numberOfDays: z.number().describe('Number of days to plan for'),
  includeSnacks: z.boolean().optional().describe('Whether to include snacks'),
});

export type GenerateMealPlanInput = z.infer<typeof GenerateMealPlanInputSchema>;

const MealSchema = z.object({
  name: z.string().describe('Name of the meal'),
  description: z.string().describe('Brief description of the meal'),
  category: z.enum(['breakfast', 'lunch', 'dinner', 'snack', 'dessert']).describe('Meal category'),
  cuisine: z.string().describe('Cuisine type of the meal (e.g., Mediterranean, Asian, Middle Eastern)'),
  // Macro Nutrients
  calories: z.number().describe('Total calories for the meal'),
  protein: z.number().describe('Protein in grams'),
  carbohydrates: z.number().describe('Carbohydrates in grams'),
  fat: z.number().describe('Fat in grams'),
  fiber: z.number().describe('Fiber in grams'),
  sugar: z.number().describe('Sugar in grams'),
  // Micro Nutrients
  sodium: z.number().describe('Sodium in mg'),
  vitaminA: z.number().optional().describe('Vitamin A in mcg'),
  vitaminC: z.number().optional().describe('Vitamin C in mg'),
  vitaminD: z.number().optional().describe('Vitamin D in mcg'),
  calcium: z.number().optional().describe('Calcium in mg'),
  iron: z.number().optional().describe('Iron in mg'),
  magnesium: z.number().optional().describe('Magnesium in mg'),
  potassium: z.number().optional().describe('Potassium in mg'),
  zinc: z.number().optional().describe('Zinc in mg'),
  // Recipe Information
  ingredients: z.array(z.object({
    name: z.string().describe('Ingredient name'),
    amount: z.string().describe('Amount needed (e.g., "1 cup", "200g")'),
    unit: z.string().describe('Unit of measurement'),
  })).describe('List of ingredients with amounts'),
  instructions: z.array(z.string()).describe('Step-by-step cooking instructions'),
  prepTime: z.number().describe('Preparation time in minutes'),
  cookTime: z.number().describe('Cooking time in minutes'),
  totalTime: z.number().describe('Total time in minutes'),
  servings: z.number().describe('Number of servings'),
  difficulty: z.enum(['easy', 'medium', 'hard']).describe('Cooking difficulty level'),
  tags: z.array(z.string()).describe('Meal tags (e.g., "vegetarian", "gluten-free", "high-protein")'),
});

const DayPlanSchema = z.object({
  date: z.string().describe('Date for this day plan (YYYY-MM-DD format)'),
  dayNumber: z.number().describe('Day number in the plan (1, 2, 3, etc.)'),
  meals: z.array(MealSchema).describe('Meals for this day'),
  dailyTotals: z.object({
    calories: z.number().describe('Total daily calories'),
    protein: z.number().describe('Total daily protein in grams'),
    carbohydrates: z.number().describe('Total daily carbohydrates in grams'),
    fat: z.number().describe('Total daily fat in grams'),
    fiber: z.number().describe('Total daily fiber in grams'),
    sugar: z.number().describe('Total daily sugar in grams'),
    sodium: z.number().describe('Total daily sodium in mg'),
  }).describe('Daily nutritional totals'),
});

const GenerateMealPlanOutputSchema = z.object({
  planId: z.string().describe('Unique identifier for this meal plan'),
  planName: z.string().describe('Name of the meal plan'),
  planType: z.enum(['daily', 'weekly', 'monthly']).describe('Type of meal plan'),
  startDate: z.string().describe('Start date of the plan (YYYY-MM-DD)'),
  endDate: z.string().describe('End date of the plan (YYYY-MM-DD)'),
  days: z.array(DayPlanSchema).describe('Daily meal plans'),
  planSummary: z.object({
    totalDays: z.number().describe('Total number of days in the plan'),
    averageDailyCalories: z.number().describe('Average daily calories'),
    averageDailyProtein: z.number().describe('Average daily protein in grams'),
    averageDailyCarbs: z.number().describe('Average daily carbohydrates in grams'),
    averageDailyFat: z.number().describe('Average daily fat in grams'),
    goalAlignment: z.string().describe('How well this plan aligns with the user\'s goals'),
    keyFeatures: z.array(z.string()).describe('Key features of this meal plan'),
  }).describe('Summary of the entire meal plan'),
  recommendations: z.array(z.string()).describe('Additional recommendations for the user'),
  shoppingList: z.array(z.object({
    category: z.string().describe('Category of ingredients (e.g., Proteins, Vegetables, Grains)'),
    items: z.array(z.object({
      name: z.string().describe('Ingredient name'),
      totalAmount: z.string().describe('Total amount needed across all meals'),
      unit: z.string().describe('Unit of measurement'),
    })).describe('Items in this category'),
  })).describe('Consolidated shopping list for the entire meal plan'),
});

export type GenerateMealPlanOutput = z.infer<typeof GenerateMealPlanOutputSchema>;

export async function generateMealPlan(input: GenerateMealPlanInput): Promise<GenerateMealPlanOutput> {
  const result = await generateMealPlanFlow(input);
  return result;
}

const prompt = ai.definePrompt({
  name: 'generateMealPlanPrompt',
  input: {schema: GenerateMealPlanInputSchema},
  output: {schema: GenerateMealPlanOutputSchema},
  prompt: `You are a world-class nutritionist and meal planning expert. Create a comprehensive, personalized meal plan based on the user's profile, preferences, and scientifically calculated nutrition targets.

  USER PROFILE:
  - Weight: {{weight}} kg
  - Height: {{height}} cm
  - Age: {{age}} years
  - Gender: {{gender}}
  - Activity Level: {{activityLevel}}
  - Goal: {{goal}}

  CALCULATED NUTRITION TARGETS (Pre-calculated using scientific formulas):
  - BMR (Basal Metabolic Rate): {{bmr}} calories/day
  - TDEE (Total Daily Energy Expenditure): {{tdee}} calories/day
  - Daily Calorie Target: {{targetCalories}} calories (adjusted for goal)
  - Daily Protein Target: {{targetProtein}}g
  - Daily Carbohydrate Target: {{targetCarbs}}g
  - Daily Fat Target: {{targetFat}}g

  PREFERENCES & RESTRICTIONS:
  - Cuisine Preferences: {{cuisinePreferences}} (PRIORITIZE these cuisines!)
  - Dietary Restrictions: {{dietaryRestrictions}} (MUST adhere to these!)
  - Allergies: {{allergies}} (ABSOLUTELY AVOID these ingredients!)
  - Dislikes: {{dislikes}} (Try to avoid these when possible)
  - Likes: {{likes}} (Include these when appropriate)

  PLAN CONFIGURATION:
  - Plan Name: {{planName}}
  - Plan Type: {{planType}}
  - Number of Days: {{numberOfDays}}
  - Include Snacks: {{includeSnacks}}

  CRITICAL REQUIREMENTS:
  1. **MATCH THE EXACT NUTRITION TARGETS**: Daily totals must closely match targetCalories, targetProtein, targetCarbs, and targetFat
  2. **RESPECT ALL RESTRICTIONS**: Never include ingredients from allergies or dietaryRestrictions
  3. **PRIORITIZE PREFERRED CUISINES**: Focus on cuisinePreferences - make meals authentically from these cultures
  4. **VARIETY IS KEY**: Each day should have different meals with diverse ingredients and flavors
  5. **PRACTICAL RECIPES**: Include clear step-by-step instructions that anyone can follow
  6. **COMPLETE NUTRITION DATA**: Provide accurate macro and micronutrient information for every meal
  7. **SHOPPING LIST**: Generate a consolidated shopping list organized by category

  MEAL DISTRIBUTION:
  - Breakfast: 25% of daily calories ({{targetCalories}} * 0.25 ≈ {{targetCalories * 0.25}} cal)
  - Lunch: 35% of daily calories ({{targetCalories}} * 0.35 ≈ {{targetCalories * 0.35}} cal)
  - Dinner: 30% of daily calories ({{targetCalories}} * 0.30 ≈ {{targetCalories * 0.30}} cal)
  - Snacks: 10% of daily calories (if includeSnacks is true)

  CUISINE-SPECIFIC INSTRUCTIONS:
  - If user prefers Mediterranean: Include olive oil, fish, vegetables, legumes, whole grains
  - If user prefers Asian: Include rice, noodles, stir-fries, curries, dumplings
  - If user prefers Middle Eastern: Include hummus, falafel, shawarma, kebabs, pita
  - If user prefers Mexican: Include beans, corn, peppers, avocado, salsa
  - Mix and match cuisines across different days for variety

  OUTPUT FORMAT:
  Generate a complete meal plan with:
  1. **Daily Plans**: {{numberOfDays}} days of meals, each with dayNumber (1, 2, 3...)
  2. **Detailed Recipes**: Name, description, cuisine type, full ingredients with amounts
  3. **Cooking Instructions**: Step-by-step numbered instructions
  4. **Nutrition Info**: Calories, protein, carbs, fat, fiber, sugar, sodium for each meal
  5. **Daily Totals**: Sum of all nutrients per day (must match targets!)
  6. **Shopping List**: Consolidated list organized by category (Proteins, Vegetables, Grains, Dairy, etc.)
  7. **Recommendations**: Practical tips for meal prep, storage, and success

  SHOPPING LIST CATEGORIES:
  - Proteins (meat, fish, eggs, tofu)
  - Vegetables
  - Fruits
  - Grains & Starches
  - Dairy & Alternatives
  - Pantry Staples (oils, spices, sauces)
  - Herbs & Seasonings

  Remember: This plan should be delicious, practical, culturally diverse, and perfectly aligned with the user's nutrition targets and preferences!

  Ensure the plan is practical, enjoyable, and sustainable for the user.`,
});

const generateMealPlanFlow = ai.defineFlow(
  {
    name: 'generateMealPlanFlow',
    inputSchema: GenerateMealPlanInputSchema,
    outputSchema: GenerateMealPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);