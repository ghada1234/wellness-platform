import { NextRequest, NextResponse } from 'next/server';
import { scanNutritionLabel } from '@/ai/flows/scan-nutrition-label';

export async function POST(request: NextRequest) {
  try {
    console.log('API Key available:', !!process.env.GEMINI_API_KEY);
    const body = await request.json();
    console.log('Nutrition label scan request body:', body);
    const result = await scanNutritionLabel(body);
    console.log('Nutrition label scan result:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in nutrition label scan API:', error);
    return NextResponse.json(
      { error: 'Failed to scan nutrition label', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}








