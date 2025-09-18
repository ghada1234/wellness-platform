'use server';

/**
 * @fileOverview Analyzes a photo of a meal to identify food items, and estimate nutritional information.
 *
 * - analyzeFoodPhoto - A function that handles the food photo analysis process.
 * - AnalyzeFoodPhotoInput - The input type for the analyzeFoodPhoto function.
 * - AnalyzeFoodPhotoOutput - The return type for the analyzeFoodPhoto function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeFoodPhotoInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a meal, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeFoodPhotoInput = z.infer<typeof AnalyzeFoodPhotoInputSchema>;

const AnalyzeFoodPhotoOutputSchema = z.object({
  foodItems: z.array(z.object({
    name: z.string().describe('The identified name of the food item.'),
    portionSize: z.string().describe('The estimated portion size (e.g., "1 cup", "150g", "1 medium apple").'),
    weight: z.number().describe('The estimated weight in grams.'),
    // Macro Nutrients
    calories: z.number().describe('Estimated calories for the food item.'),
    protein: z.number().describe('Estimated protein in grams.'),
    carbohydrates: z.number().describe('Estimated carbohydrates in grams.'),
    fat: z.number().describe('Estimated fat in grams.'),
    sugar: z.number().describe('Estimated sugar in grams.'),
    fiber: z.number().describe('Estimated fiber in grams.'),
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
  })).describe('An array of food items identified in the photo with their comprehensive nutritional information.'),
});
export type AnalyzeFoodPhotoOutput = z.infer<typeof AnalyzeFoodPhotoOutputSchema>;


export async function analyzeFoodPhoto(input: AnalyzeFoodPhotoInput): Promise<AnalyzeFoodPhotoOutput> {
  const result = await analyzeFoodPhotoFlow(input);
  return result;
}

const prompt = ai.definePrompt({
  name: 'analyzeFoodPhotoPrompt',
  input: {schema: AnalyzeFoodPhotoInputSchema},
  output: {schema: AnalyzeFoodPhotoOutputSchema},
  prompt: `You are a nutrition expert with extensive knowledge of food composition and nutritional analysis. Analyze the provided photo of a meal and identify each food item with comprehensive nutritional information.

  For each food item identified, provide:
  - The name of the food item
  - The estimated portion size (e.g., "1 cup", "150g", "1 medium apple", "2 slices")
  - The estimated weight in grams
  - Complete macro and micro nutrient breakdown per the estimated portion

  Include these nutrients when available:
  MACRO NUTRIENTS: calories, protein (g), carbohydrates (g), fat (g), sugar (g), fiber (g)
  
  VITAMINS: Vitamin A (mcg), Vitamin C (mg), Vitamin D (mcg), Vitamin E (mg), Vitamin K (mcg), 
  Thiamine/B1 (mg), Riboflavin/B2 (mg), Niacin/B3 (mg), Folate (mcg), Vitamin B12 (mcg)
  
  MINERALS: Calcium (mg), Iron (mg), Magnesium (mg), Phosphorus (mg), Potassium (mg), 
  Sodium (mg), Zinc (mg), Copper (mg), Manganese (mg), Selenium (mcg)

  Provide accurate estimates based on the visible portion sizes and typical nutritional content of the identified foods. If a nutrient is not present in significant amounts or cannot be estimated, omit it from the response.

  Photo: {{media url=photoDataUri}}`,
});

const analyzeFoodPhotoFlow = ai.defineFlow(
  {
    name: 'analyzeFoodPhotoFlow',
    inputSchema: AnalyzeFoodPhotoInputSchema,
    outputSchema: AnalyzeFoodPhotoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
