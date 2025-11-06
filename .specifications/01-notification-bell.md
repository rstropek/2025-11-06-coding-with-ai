# Notification Icon Component

## Goal

Add a notification icon to the main navigation bar (Header.tsx) on the right side of the menu.
It should display the number of unread notifications dynamically and show a popup with placeholder text when clicked.

## Component Name

`NotificationBell`

## Functional Requirements

### Display

- A bell icon is displayed in the top navigation bar, aligned to the right (see red square in attached screenshot).
- The icon is visible on all pages where the header component is rendered.

### Notification Count

- A small badge (blue dot; same accent color as the menu items' text color) with a number is shown at the top-right corner of the icon if there are one or more unread notifications.
- The badge dynamically updates when the number of notifications changes.
- The notification count is stored in React state, accessible throughout the app lifecycle (via Context API).

### Popup Behavior

- When the user clicks the bell icon:
    - A custom popup appears below the icon.
    - The popup displays placeholder content (e.g., “You have no notifications yet” or mock items).
    - Clicking outside the popup or re-clicking the icon closes it.

## UI / Design Requirements

### Icon

Use lucide-react library for the bell icon.

### Badge

- Shape: Circular.
- Size: 16 px diameter.
- Background color: Blue.
- Text color: White.
- Positioned at the top-right of the bell icon.

### Popup

Build a standalone popup component (NotificationPopup.tsx).


### Interaction Logic

- Clicking the bell toggles popup visibility (useState).
- Badge visibility depends on unreadCount > 0.
- Count and content can be updated later from SSE events.

## AGENTS.md

After the code is generated, please update the AGENTS.md file accordingly if necessary.
