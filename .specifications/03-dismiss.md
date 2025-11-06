# Notification Dismiss Functionality

## Goal

Allow users to dismiss individual notifications directly from the popup.
When a notification is dismissed:
- It disappears from the popup list immediately.
- The unread notification badge count decreases accordingly.

## Functional Requirements

- Each notification item in the popup has a small dismiss icon (e.g., a “trash” icon from lucide) aligned to the right.
- When the user clicks the dismiss icon:
  - The notification is removed from the in-memory list.
  - The badge count (unreadCount) decreases by one.
  - The removal should happen instantly on the client side (no server communication).
- If all notifications are dismissed:
  - The popup shows a placeholder: “No notifications.”
  - The badge disappears from the bell icon.

## Animation

- Fade out animation when a notification is dismissed.

## State Management
- Extend the existing Notification Context to include a removeNotification(id: string) function.

## AGENTS.md

After code generation:

- Add an entry describing the client-side dismissal logic.
- Note that dismissal is purely in-memory (no backend call).
- Mention that each notification now includes a unique id for internal handling.
