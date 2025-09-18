import { NextRequest, NextResponse } from 'next/server';
import { generateMealPlan } from '@/ai/flows/generate-meal-plan';

export async function POST(request: NextRequest) {
  try {
    console.log('API Key available:', !!process.env.GEMINI_API_KEY);
    
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set');
      return NextResponse.json(
        { error: 'API key not configured. Please set GEMINI_API_KEY environment variable.' },
        { status: 500 }
      );
    }
    
    const body = await request.json();
    console.log('Meal plan generation request:', body);
    
    console.log('Starting meal plan generation...');
    const result = await generateMealPlan(body);
    console.log('Meal plan generation successful');
    console.log('Generated meal plan result:', JSON.stringify(result, null, 2));
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in meal plan generation:', error);
    return NextResponse.json(
      { error: 'Failed to generate meal plan', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}








