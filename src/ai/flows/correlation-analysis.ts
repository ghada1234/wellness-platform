'use server';

/**
 * @fileOverview Analyzes correlations between different wellness factors
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CorrelationAnalysisInputSchema = z.object({
  moodLogs: z.array(z.object({
    date: z.string(),
    mood: z.string(),
    score: z.number(),
  })).describe('User mood logs over time'),
  sleepLogs: z.array(z.object({
    date: z.string(),
    duration: z.number(),
    quality: z.string(),
  })).describe('User sleep logs over time'),
  activityLogs: z.array(z.object({
    date: z.string(),
    steps: z.number(),
    calories: z.number(),
  })).describe('User activity logs over time'),
  nutritionLogs: z.array(z.object({
    date: z.string(),
    calories: z.number(),
    protein: z.number(),
  })).describe('User nutrition logs over time'),
});

export type CorrelationAnalysisInput = z.infer<typeof CorrelationAnalysisInputSchema>;

const CorrelationAnalysisOutputSchema = z.object({
  correlations: z.array(z.object({
    factor1: z.string().describe('First wellness factor'),
    factor2: z.string().describe('Second wellness factor'),
    strength: z.enum(['Strong', 'Moderate', 'Weak']).describe('Correlation strength'),
    direction: z.enum(['Positive', 'Negative', 'Neutral']).describe('Correlation direction'),
    confidence: z.number().describe('Confidence level 0-100'),
    insight: z.string().describe('What this correlation means'),
    recommendation: z.string().describe('Actionable recommendation based on this correlation'),
  })).describe('Discovered correlations between wellness factors'),
  overallInsights: z.array(z.string()).describe('Overall insights from the analysis'),
});

export type CorrelationAnalysisOutput = z.infer<typeof CorrelationAnalysisOutputSchema>;

export async function analyzeCorrelations(input: CorrelationAnalysisInput): Promise<CorrelationAnalysisOutput> {
  return correlationAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'correlationAnalysisPrompt',
  input: { schema: CorrelationAnalysisInputSchema },
  output: { schema: CorrelationAnalysisOutputSchema },
  prompt: `You are a data scientist and wellness expert analyzing correlations in user wellness data.

Analyze the provided wellness data to identify meaningful correlations between different factors.

MOOD LOGS:
{{#each moodLogs}}
- Date: {{date}}, Mood: {{mood}}, Score: {{score}}
{{/each}}

SLEEP LOGS:
{{#each sleepLogs}}
- Date: {{date}}, Duration: {{duration}}h, Quality: {{quality}}
{{/each}}

ACTIVITY LOGS:
{{#each activityLogs}}
- Date: {{date}}, Steps: {{steps}}, Calories: {{calories}}
{{/each}}

NUTRITION LOGS:
{{#each nutritionLogs}}
- Date: {{date}}, Calories: {{calories}}, Protein: {{protein}}g
{{/each}}

Identify 3-5 meaningful correlations between these factors:
- Sleep duration vs Mood
- Activity level vs Sleep quality
- Nutrition vs Energy/Mood
- Exercise vs Mental wellbeing
- Any other significant patterns

For each correlation, provide:
1. Strength (Strong/Moderate/Weak)
2. Direction (Positive/Negative/Neutral)
3. Confidence level (0-100)
4. Clear insight explaining what it means
5. Actionable recommendation

Also provide 2-3 overall insights from the complete analysis.`,
});

const correlationAnalysisFlow = ai.defineFlow(
  {
    name: 'correlationAnalysisFlow',
    inputSchema: CorrelationAnalysisInputSchema,
    outputSchema: CorrelationAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

