import { NextRequest, NextResponse } from 'next/server';
import { analyzeFoodPhoto } from '@/ai/flows/analyze-food-photo';

export async function POST(request: NextRequest) {
  try {
    console.log('API Key available:', !!process.env.GEMINI_API_KEY);
    const body = await request.json();
    console.log('Food analysis request body:', body);
    const result = await analyzeFoodPhoto(body);
    console.log('Food analysis result:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in food analysis API:', error);
    return NextResponse.json(
      { error: 'Failed to analyze food photo', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}








