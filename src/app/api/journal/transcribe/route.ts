import { NextRequest, NextResponse } from 'next/server';

/**
 * Transcribe audio for journal entries
 * Accepts audio blob and returns transcribed text
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // Check if API is disabled
    const enableApi = process.env.NEXT_PUBLIC_ENABLE_API?.toLowerCase() === 'true';
    if (!enableApi) {
      return NextResponse.json(
        { error: 'API temporarily disabled', message: 'Transcription is currently disabled.' },
        { status: 503 }
      );
    }

    // For now, we'll use a simple approach - you can integrate with Gemini's speech-to-text
    // or use a service like Google Cloud Speech-to-Text
    // This is a placeholder that returns a message
    
    // Convert audio to base64 for processing
    const arrayBuffer = await audioFile.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString('base64');

    // TODO: Integrate with actual transcription service
    // For now, return a placeholder response
    // In production, you would:
    // 1. Send audio to Gemini API's speech-to-text
    // 2. Or use Google Cloud Speech-to-Text API
    // 3. Or use Web Speech API on the client side
    
    return NextResponse.json({
      success: true,
      transcribedText: '[Transcription service not configured]',
      message: 'Please type your journal entry manually, or configure a transcription service.',
    });
  } catch (error) {
    console.error('Error transcribing audio:', error);
    return NextResponse.json(
      { error: 'Failed to transcribe audio', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
