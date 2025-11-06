import { NextRequest, NextResponse } from 'next/server';
import { broadcastNotification } from './stream/route';

export async function GET() {
  return NextResponse.json({ count: 3 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, text, icon } = body;

    // Validate required fields
    if (!title || !text || !icon) {
      return NextResponse.json(
        { error: 'Missing required fields: title, text, icon' },
        { status: 400 }
      );
    }

    // Broadcast to all connected SSE clients
    broadcastNotification({ title, text, icon });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    );
  }
}
