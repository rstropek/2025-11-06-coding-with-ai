import { NextRequest } from 'next/server';

// Store connected SSE clients
const clients = new Set<ReadableStreamDefaultController>();

export async function GET(request: NextRequest) {
  // Create a new ReadableStream for SSE
  const stream = new ReadableStream({
    start(controller) {
      // Add this client to the set
      clients.add(controller);

      // Send initial comment to establish connection
      const encoder = new TextEncoder();
      controller.enqueue(encoder.encode(': connected\n\n'));

      // Clean up on connection close
      request.signal.addEventListener('abort', () => {
        clients.delete(controller);
        try {
          controller.close();
        } catch {
          // Controller may already be closed
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

// Export function to broadcast notifications to all connected clients
export function broadcastNotification(notification: { title: string; text: string; icon: string }) {
  const encoder = new TextEncoder();
  const data = `data: ${JSON.stringify(notification)}\n\n`;
  const encoded = encoder.encode(data);

  clients.forEach((controller) => {
    try {
      controller.enqueue(encoded);
    } catch {
      // If enqueueing fails, remove the client
      clients.delete(controller);
    }
  });
}
