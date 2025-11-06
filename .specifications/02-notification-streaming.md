# Notification Streaming and Triggering

## Goal

Enable live notification updates in the app without manual refresh.
Notifications are delivered via a Server-Sent Events (SSE) endpoint that clients subscribe to.
An external API allows adding new notifications that are broadcast to all connected clients.

## Endpoints

### `GET /notifications/stream`

- Implements Server-Sent Events (SSE).
- Keeps the connection open and streams events to connected clients.
- Each event is a JSON object representing a single notification:

```json
{
  "title": "Server Update",
  "text": "The backend was restarted successfully.",
  "icon": "server"
}
```

- The endpoint does not persist data — only clients connected at the time of the event receive it.

### `POST /notifications`

- Allows external systems (e.g., a script or another service) to send a notification while the app is running.
- Request body:

```json
{
  "title": "Build Completed",
  "text": "Frontend build completed successfully.",
  "icon": "check-circle"
}
```

- When received, the backend broadcasts the notification to ALL connected SSE clients.
- Notifications are ephemeral (in-memory only).
- No authentication required for now (can be added later).
- Use a shared in-memory array or Set to track connected SSE clients.

### Backend Implementation Notes

- Can be implemented in Next.js under /app/api/notifications.
- Use a shared array (e.g., clients) in module scope to track connected SSE clients.
- Clean up client connections on close.

## Client-Side Integration

### SSE Connection

- The NotificationBell component (or its parent) connects to /notifications/stream via an `EventSource`
- Initially, the list of notifications must be empty (do not add e.g. a notification "connected" when started)
- On receiving a notification:
  - Append it to the in-memory notifications list.
  - Increment the unread counter (unreadCount).
  - Trigger visual cue (badge).

### In-Memory Storage

Store notifications in the existing React Context:

### Display
- In the popup (NotificationPopup.tsx), list notifications:
- Show icon (if provided) using Lucide.
- Show title in bold, text below it.

## Interaction Logic
- The SSE connection should open once per session and remain active.
- The popup automatically updates when new notifications arrive.
- Closing and reopening the popup does not reset notifications.
- The badge count reflects the total number of received (unread) notifications.
- Clearing notifications is not required in this step.

## AGENTS.md

After implementation:

- Document the new API endpoints (GET /notifications/stream, POST /notifications).
- Describe how the Notification Context now listens to the SSE endpoint.
- Mention that persistence and authentication are intentionally left out at this stage.
