import { NextRequest, NextResponse } from 'next/server';
import { analyzeCorrelations } from '@/ai/flows/correlation-analysis';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }
    
    const body = await request.json();
    const result = await analyzeCorrelations(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in correlation analysis:', error);
    return NextResponse.json(
      { error: 'Failed to analyze correlations', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

