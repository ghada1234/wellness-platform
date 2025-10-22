import { NextRequest, NextResponse } from 'next/server';
import { generatePredictiveInsights } from '@/ai/flows/predictive-insights';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }
    
    const body = await request.json();
    const result = await generatePredictiveInsights(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in predictive insights:', error);
    return NextResponse.json(
      { error: 'Failed to generate predictions', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

