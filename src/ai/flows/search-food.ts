'use server';

/**
 * @fileOverview Searches for food items and provides comprehensive nutritional information.
 *
 * - searchFood - A function that handles food search with nutritional analysis.
 * - SearchFoodInput - The input type for the searchFood function.
 * - SearchFoodOutput - The return type for the searchFood function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SearchFoodInputSchema = z.object({
  query: z.string().describe('The food item or dish to search for (e.g., "grilled chicken breast", "banana", "quinoa salad").'),
});
export type SearchFoodInput = z.infer<typeof SearchFoodInputSchema>;

const SearchFoodOutputSchema = z.object({
  foods: z.array(z.object({
    name: z.string().describe('The name of the food item.'),
    portionSize: z.string().describe('The standard portion size (e.g., "100g", "1 cup", "1 medium").'),
    weight: z.number().describe('The weight in grams for the portion size.'),
    // Macro Nutrients
    calories: z.number().describe('Calories for the specified portion.'),
    protein: z.number().describe('Protein in grams.'),
    carbohydrates: z.number().describe('Carbohydrates in grams.'),
    fat: z.number().describe('Fat in grams.'),
    sugar: z.number().describe('Sugar in grams.'),
    fiber: z.number().describe('Fiber in grams.'),
    // Micro Nutrients (Vitamins)
    vitaminA: z.number().optional().describe('Vitamin A in micrograms (mcg).'),
    vitaminC: z.number().optional().describe('Vitamin C in milligrams (mg).'),
    vitaminD: z.number().optional().describe('Vitamin D in micrograms (mcg).'),
    vitaminE: z.number().optional().describe('Vitamin E in milligrams (mg).'),
    vitaminK: z.number().optional().describe('Vitamin K in micrograms (mcg).'),
    thiamine: z.number().optional().describe('Thiamine (B1) in milligrams (mg).'),
    riboflavin: z.number().optional().describe('Riboflavin (B2) in milligrams (mg).'),
    niacin: z.number().optional().describe('Niacin (B3) in milligrams (mg).'),
    folate: z.number().optional().describe('Folate in micrograms (mcg).'),
    vitaminB12: z.number().optional().describe('Vitamin B12 in micrograms (mcg).'),
    // Micro Nutrients (Minerals)
    calcium: z.number().optional().describe('Calcium in milligrams (mg).'),
    iron: z.number().optional().describe('Iron in milligrams (mg).'),
    magnesium: z.number().optional().describe('Magnesium in milligrams (mg).'),
    phosphorus: z.number().optional().describe('Phosphorus in milligrams (mg).'),
    potassium: z.number().optional().describe('Potassium in milligrams (mg).'),
    sodium: z.number().optional().describe('Sodium in milligrams (mg).'),
    zinc: z.number().optional().describe('Zinc in milligrams (mg).'),
    copper: z.number().optional().describe('Copper in milligrams (mg).'),
    manganese: z.number().optional().describe('Manganese in milligrams (mg).'),
    selenium: z.number().optional().describe('Selenium in micrograms (mcg).'),
  })).describe('An array of food items matching the search query with comprehensive nutritional information.'),
});
export type SearchFoodOutput = z.infer<typeof SearchFoodOutputSchema>;

export async function searchFood(input: SearchFoodInput): Promise<SearchFoodOutput> {
  const result = await searchFoodFlow(input);
  return result;
}

const prompt = ai.definePrompt({
  name: 'searchFoodPrompt',
  input: {schema: SearchFoodInputSchema},
  output: {schema: SearchFoodOutputSchema},
  prompt: `You are a nutrition expert with comprehensive knowledge of food composition and nutritional databases. Search for food items matching the user's query and provide detailed nutritional information.

  For each food item found, provide:
  - The exact name of the food item
  - A standard portion size (e.g., "100g", "1 cup", "1 medium apple", "1 slice")
  - The weight in grams for that portion
  - Complete macro and micro nutrient breakdown per the specified portion

  Include these nutrients when available:
  MACRO NUTRIENTS: calories, protein (g), carbohydrates (g), fat (g), sugar (g), fiber (g)
  
  VITAMINS: Vitamin A (mcg), Vitamin C (mg), Vitamin D (mcg), Vitamin E (mg), Vitamin K (mcg), 
  Thiamine/B1 (mg), Riboflavin/B2 (mg), Niacin/B3 (mg), Folate (mcg), Vitamin B12 (mcg)
  
  MINERALS: Calcium (mg), Iron (mg), Magnesium (mg), Phosphorus (mg), Potassium (mg), 
  Sodium (mg), Zinc (mg), Copper (mg), Manganese (mg), Selenium (mcg)

  Provide accurate nutritional data based on USDA FoodData Central or equivalent authoritative nutrition databases. If a nutrient is not present in significant amounts, omit it from the response.

  Search query: {{query}}`,
});

const searchFoodFlow = ai.defineFlow(
  {
    name: 'searchFoodFlow',
    inputSchema: SearchFoodInputSchema,
    outputSchema: SearchFoodOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
