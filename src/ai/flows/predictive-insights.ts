'use server';

/**
 * @fileOverview Generates predictive insights about user's wellness trajectory
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PredictiveInsightsInputSchema = z.object({
  historicalData: z.object({
    moodTrend: z.string().describe('Recent mood trend (improving/stable/declining)'),
    sleepTrend: z.string().describe('Recent sleep trend'),
    activityTrend: z.string().describe('Recent activity trend'),
    nutritionTrend: z.string().describe('Recent nutrition adherence trend'),
    averageMoodScore: z.number().describe('Average mood score'),
    averageSleepHours: z.number().describe('Average sleep duration'),
    averageSteps: z.number().describe('Average daily steps'),
  }).describe('Historical wellness trends'),
  goals: z.array(z.string()).describe('User wellness goals'),
  currentHabits: z.array(z.string()).describe('Current wellness habits'),
});

export type PredictiveInsightsInput = z.infer<typeof PredictiveInsightsInputSchema>;

const PredictiveInsightsOutputSchema = z.object({
  predictions: z.array(z.object({
    category: z.enum(['mood', 'sleep', 'activity', 'nutrition', 'overall']).describe('Wellness category'),
    timeframe: z.string().describe('Prediction timeframe (e.g., "Next 7 days", "Next month")'),
    prediction: z.string().describe('The actual prediction'),
    confidence: z.number().describe('Confidence level 0-100'),
    reasoning: z.string().describe('Why this prediction is being made'),
    actionableSteps: z.array(z.string()).describe('Steps to improve the predicted outcome'),
  })).describe('Wellness trajectory predictions'),
  riskFactors: z.array(z.string()).describe('Potential risk factors to watch for'),
  opportunities: z.array(z.string()).describe('Opportunities for improvement'),
});

export type PredictiveInsightsOutput = z.infer<typeof PredictiveInsightsOutputSchema>;

export async function generatePredictiveInsights(input: PredictiveInsightsInput): Promise<PredictiveInsightsOutput> {
  return predictiveInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictiveInsightsPrompt',
  input: { schema: PredictiveInsightsInputSchema },
  output: { schema: PredictiveInsightsOutputSchema },
  prompt: `You are a predictive analytics expert specializing in wellness and health trends.

Based on the user's historical wellness data and current patterns, generate predictions about their wellness trajectory.

HISTORICAL TRENDS:
- Mood: {{historicalData.moodTrend}} (avg: {{historicalData.averageMoodScore}}/5)
- Sleep: {{historicalData.sleepTrend}} (avg: {{historicalData.averageSleepHours}}h)
- Activity: {{historicalData.activityTrend}} (avg: {{historicalData.averageSteps}} steps)
- Nutrition: {{historicalData.nutritionTrend}}

USER GOALS:
{{#each goals}}
- {{this}}
{{/each}}

CURRENT HABITS:
{{#each currentHabits}}
- {{this}}
{{/each}}

Generate 4-6 predictions about:
1. Mood trajectory (next 7-30 days)
2. Sleep quality trends
3. Activity level progression
4. Nutrition adherence
5. Overall wellness trajectory
6. Goal achievement likelihood

For each prediction:
- Provide timeframe
- State the prediction clearly
- Explain reasoning based on data patterns
- Give confidence level
- Provide actionable steps to improve outcome

Also identify:
- Risk factors to watch for
- Opportunities for improvement`,
});

const predictiveInsightsFlow = ai.defineFlow(
  {
    name: 'predictiveInsightsFlow',
    inputSchema: PredictiveInsightsInputSchema,
    outputSchema: PredictiveInsightsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

