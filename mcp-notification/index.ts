#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const DEFAULT_ENDPOINT = 'http://localhost:3000/api/notifications';

const server = new McpServer({
  name: 'notification-server',
  version: '1.0.0',
});

server.registerTool(
  'sendNotification',
  {
    title: 'Send Notification',
    description: 'Send a notification to the Doka application',
    inputSchema: {
      title: z.string().describe('Notification title'),
      text: z.string().describe('Notification text content'),
      icon: z.string().optional().describe('Lucide icon name (e.g., bell, info, alert-circle)'),
    },
    outputSchema: {
      success: z.boolean(),
      title: z.string(),
      text: z.string(),
      icon: z.string(),
    },
  },
  async ({ title, text, icon }) => {
    const iconName = icon || 'bell';
    const endpoint = process.env.NOTIFICATION_ENDPOINT || DEFAULT_ENDPOINT;

    const payload = {
      title,
      text,
      icon: iconName,
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const output = {
        success: true,
        title,
        text,
        icon: iconName,
      };

      return {
        content: [{ type: 'text', text: JSON.stringify(output, null, 2) }],
        structuredContent: output,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: 'text',
            text: `Error sending notification: ${errorMessage}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Connect via stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);
