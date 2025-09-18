import { NextRequest, NextResponse } from 'next/server';
import { getPersonalizedRecommendations } from '@/ai/flows/personalized-recommendations';

export async function POST(request: NextRequest) {
  try {
    console.log('API Key available:', !!process.env.GEMINI_API_KEY);
    const body = await request.json();
    const result = await getPersonalizedRecommendations(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in personalized recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}









