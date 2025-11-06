# MCP Notification CLI

## Goal

Add a simple TypeScript stdio MCP server that can trigger notifications by sending an HTTP POST /notifications request to the running app backend.

Use your context7 MCP server to read on how to implement stdio MCP server (context7 library id `/modelcontextprotocol/typescript-sdk`) before you write any code.

## Folder and File Structure

Put a single `index.ts` file in the `/mcp-notification` folder.

## Functional Requirements

- The CLI must implement a Model Context Protocol (MCP) server using stdio.
- The server exposes one capability: sendNotification.
- The server accepts three parameters:
  - title (string) – required
  - text (string) – required
  - icon (string, optional) – name of a Lucide icon (e.g., bell, info, alert-circle)
  - If no icon is provided, use the default value "bell".
- When sendNotification is called:
  - The MCP server sends an HTTP POST request to /notifications (localhost, port 3000 by default).
  - The POST body:

    ```json
    {
    "title": "<title>",
    "text": "<text>",
    "icon": "<icon>"
    }
    ```

- If successful, the server responds with ok and echoes the sent notification.
- If an error occurs (e.g., connection refused), it returns an MCP error response.

## Configuration

Default Endpoint: http://localhost:3000/api/notifications

## Implementation Details

Use native fetch (global fetch in Node ≥18).

## AGENTS.md

After implementation, document the new MCP tool under Notification Tools.
