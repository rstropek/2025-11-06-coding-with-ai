## Project Overview

This is a Next.js 16 application for Doka, a construction formwork and scaffolding company. The application showcases system components (Schalungen/formwork) with a product catalog interface.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build production version
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### Technology Stack

- **Framework**: Next.js 16.0.1 with App Router
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Styling**: CSS Modules (no Tailwind)
- **Icons**: lucide-react

### Project Structure

```
src/
├── app/                   # Next.js App Router pages
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   └── page.module.css    # Page-specific styles
├── components/            # Reusable React components
│   └── ...
└── contexts/              # React Context providers
    └── NotificationContext.tsx
```

### Styling Architecture

**Important**: This project uses regular CSS Modules, NOT Tailwind CSS.

- Each component has its own `.module.css` file
- Global styles are in `src/app/globals.css`
- Color scheme:
  - Primary Yellow: `#FFD100` (header background)
  - Primary Blue: `#005AAA` (text, buttons, links)
  - Background Gray: `#f5f5f5`

### Component Architecture

**Layout Components**:

- `Header`: Yellow top bar with logo, vertical separator, navigation menu (left-aligned), and notification bell (right-aligned)
- `Breadcrumb`: Navigation breadcrumbs with consistent left-alignment to header logo
- `NotificationBell`: Bell icon with notification badge, displays in header right section
- `NotificationPopup`: Dropdown popup for notification details

**Content Components**:

- `Card`: Reusable product card with category label, title, description, primary CTA button, and secondary action links

**State Management**:

- `NotificationContext`: React Context API for managing notifications across the application
  - Provides `unreadCount` state and `setUnreadCount` function
  - Provides `notifications` array to store received notification objects
  - Provides `addNotification` function to add new notifications (automatically generates unique IDs)
  - Provides `removeNotification(id: string)` function to dismiss notifications
  - Listens to SSE endpoint `/api/notifications/stream` for live updates
  - Wrapped around the entire app in root layout
  - Each notification includes a unique `id` for internal handling (auto-generated from timestamp and random string)

**Container Pattern**:

All layout components (Header, Breadcrumb) use a consistent container pattern:

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
}
```

This ensures consistent alignment across the page.

### Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.json`:
- `@/*` maps to `./src/*`

Example: `import Header from '@/components/Header'`

## API Endpoints

### Notification API

**`GET /api/notifications/stream`**
- Server-Sent Events (SSE) endpoint for real-time notification streaming
- Keeps connection open and broadcasts events to all connected clients
- Event format: `data: {"title": "...", "text": "...", "icon": "..."}\n\n`
- Icon names should be in kebab-case (e.g., "check-circle", "server") matching Lucide icon names
- Notifications are in-memory only (not persisted)
- Connection automatically cleaned up on client disconnect

**`POST /api/notifications`**
- Accepts notification objects and broadcasts to all connected SSE clients
- Request body: `{ "title": string, "text": string, "icon": string }`
- All fields are required
- Returns `{ "success": true }` on success
- No authentication required (intentionally left out at this stage)

**`GET /api/notifications`**
- Legacy endpoint that returns `{ "count": 3 }` (kept for backwards compatibility)

### Notification Dismissal

**Client-Side Dismissal Logic**:
- Users can dismiss individual notifications by clicking the trash icon in the notification popup
- Dismissal is purely client-side and in-memory (no backend call)
- When a notification is dismissed:
  - A fade-out animation (300ms) is triggered
  - The notification is removed from the local state
  - The unread count badge decreases accordingly
- If all notifications are dismissed, the popup shows "No notifications." and the badge disappears
- Each notification has a unique `id` (auto-generated) used for tracking and removal

## Key Design Decisions

1. **No Tailwind**: Explicitly uses vanilla CSS/CSS Modules. Do not introduce Tailwind classes.
2. **Consistent Alignment**: All content containers use 1200px max-width and are horizontally centered.
3. **Component Modularity**: Each component is self-contained with its own styles and TypeScript types.
4. **No Persistence**: Notifications are stored in-memory only. Clients only receive notifications while connected.
5. **No Authentication**: POST /api/notifications is publicly accessible for simplicity (can be added later).
