import { NextRequest, NextResponse } from 'next/server';
import { searchFood } from '@/ai/flows/search-food';

export async function POST(request: NextRequest) {
  try {
    console.log('API Key available:', !!process.env.GEMINI_API_KEY);
    const body = await request.json();
    console.log('Food search request body:', body);
    const result = await searchFood(body);
    console.log('Food search result:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in food search API:', error);
    return NextResponse.json(
      { error: 'Failed to search for food', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
