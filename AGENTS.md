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
└── components/            # Reusable React components
    └── ...
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

**Content Components**:

- `Card`: Reusable product card with category label, title, description, primary CTA button, and secondary action links

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

## Key Design Decisions

1. **No Tailwind**: Explicitly uses vanilla CSS/CSS Modules. Do not introduce Tailwind classes.
2. **Consistent Alignment**: All content containers use 1200px max-width and are horizontally centered.
3. **Component Modularity**: Each component is self-contained with its own styles and TypeScript types.
