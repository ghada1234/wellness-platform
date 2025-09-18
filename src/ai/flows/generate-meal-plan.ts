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
  
  // Preferences
  likes: z.array(z.string()).describe('Foods the user likes'),
  dislikes: z.array(z.string()).describe('Foods the user dislikes'),
  allergies: z.array(z.string()).describe('Food allergies or intolerances'),
  cuisinePreferences: z.array(z.string()).describe('Preferred cuisines (e.g., Mediterranean, Asian, etc.)'),
  
  // Plan Configuration
  planType: z.enum(['daily', 'weekly', 'monthly']).describe('Type of meal plan to generate'),
  numberOfDays: z.number().describe('Number of days to plan for'),
});

export type GenerateMealPlanInput = z.infer<typeof GenerateMealPlanInputSchema>;

const MealSchema = z.object({
  name: z.string().describe('Name of the meal'),
  description: z.string().describe('Brief description of the meal'),
  category: z.enum(['breakfast', 'lunch', 'dinner', 'snack', 'dessert']).describe('Meal category'),
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
  prompt: `You are a world-class nutritionist and meal planning expert. Create a comprehensive, personalized meal plan based on the user's profile, preferences, and goals.

  USER PROFILE:
  - Weight: {{weight}} kg
  - Height: {{height}} cm
  - Age: {{age}} years
  - Gender: {{gender}}
  - Activity Level: {{activityLevel}}
  - Goal: {{goal}}
  - Target Weight: {{targetWeight}} kg (if specified)

  PREFERENCES:
  - Likes: {{likes}}
  - Dislikes: {{dislikes}}
  - Allergies: {{allergies}}
  - Cuisine Preferences: {{cuisinePreferences}}

  PLAN CONFIGURATION:
  - Plan Type: {{planType}}
  - Number of Days: {{numberOfDays}}

  REQUIREMENTS:
  1. Calculate appropriate daily caloric needs based on user profile using Harris-Benedict equation or similar
  2. Distribute calories appropriately across meals (breakfast: 25%, lunch: 35%, dinner: 30%, snacks: 10%)
  3. Ensure adequate macro and micronutrient distribution
  4. Respect user preferences, allergies, and dietary restrictions
  5. Include variety in meals to prevent boredom
  6. Provide detailed recipes with cooking instructions
  7. Consider meal prep feasibility
  8. Align with user's fitness goals

  MEAL CATEGORIES TO INCLUDE:
  - Breakfast: Energizing, protein-rich start to the day
  - Lunch: Balanced, satisfying midday meal
  - Dinner: Complete, nutrient-dense evening meal
  - Snacks: Healthy, portion-controlled options
  - Dessert: Occasional treats that fit within caloric goals

  NUTRITIONAL GUIDELINES:
  - Protein: 0.8-2.2g per kg body weight (adjust based on goals)
  - Carbohydrates: 45-65% of total calories
  - Fat: 20-35% of total calories
  - Fiber: 25-35g per day
  - Limit added sugars to <10% of total calories
  - Adequate micronutrients (vitamins, minerals)

  Generate a complete meal plan with:
  - Detailed recipes for each meal
  - Precise nutritional information
  - Cooking instructions
  - Ingredient lists with measurements
  - Time estimates for prep and cooking
  - Difficulty levels
  - Meal tags for easy categorization

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