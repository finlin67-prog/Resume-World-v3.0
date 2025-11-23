# Career Theme Park

An interactive, Disney-inspired visualization of professional journeys using Next.js 14, Mapbox GL JS, and career data.

## Project Overview

This is a Next.js 14 application that creates an interactive map-based visualization of career paths. It features:

- **Interactive Mapbox visualization** with Career Island containing 6 themed career zones
- **Zone-based career organization**: Onboarding Forest, MarTech Mountain, Demand Gen Fields, RevOps Forge, ABM Kingdom, GTMstack Citadel
- **Animated role markers** with glowing effects and hover interactions
- **Minimap reference view** with light theme for navigation overview
- **Beautiful trail cards** with zone-based theming and Disney-inspired styling
- **MongoDB backend API** for status tracking

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Frontend**: React 18, Mapbox GL JS, Framer Motion
- **UI Components**: shadcn/ui (Radix UI primitives) + custom components
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Package Manager**: npm

## Project Structure

```
├── app/
│   ├── api/[[...path]]/route.js  # MongoDB API routes
│   ├── globals.css               # Global styles
│   ├── layout.js                 # Root layout
│   └── page.js                   # Main application page
├── components/
│   ├── Map.tsx                   # Main interactive Mapbox map
│   ├── MiniMap.tsx               # Standalone minimap reference
│   ├── TrailCard.tsx             # Career role cards with theming
│   └── ui/                       # Reusable UI components (shadcn)
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions
├── public/data/                  # Career data files
│   ├── career-world.geojson     # Map zones, island, role locations
│   ├── roles.json               # Role details
│   └── skills.json              # Skills inventory
└── next.config.js               # Next.js configuration
```

## Career Island Visualization

### Zone Design
Six themed career zones positioned across Career Island:

1. **Onboarding Forest** 🌲 - Sky Blue (#0ea5e9) - Entry-level roles
2. **MarTech Mountain** ⛰️ - Teal (#0d9488) - Marketing tech leadership
3. **Demand Gen Fields** 🌾 - Green (#16a34a) - Demand generation roles
4. **RevOps Forge** ⚒️ - Slate (#475569) - Revenue operations
5. **ABM Kingdom** 👑 - Violet (#7c3aed) - Account-based marketing
6. **GTMstack Citadel** 🏰 - Yellow (#eab308) - Go-to-market architecture

### Map Features
- **Career Island Base**: Sand-colored (#fef3c7) with gold outline
- **Animated Role Markers**: 22px glowing circles that bounce on load
- **Marker Interaction**: Scale up (1.25x) on hover with smooth transitions
- **Zone Overlays**: Semi-transparent zone fills with colored borders
- **Cinematic Camera**: Fly-to animation (1.2s) on map load with 3D perspective (45° pitch)
- **Fog Effects**: Disney-inspired atmospheric fog with blue sky gradient

### Map Layers
- Island base and outline (GeoJSON)
- 6 zone fills with opacity 0.28
- 6 zone outlines with zone-specific colors
- Role markers with zone-based color mapping
- Atmospheric fog and lighting effects

## Components

### Map.tsx
The main interactive map component featuring:
- Full Career Island rendering from GeoJSON source
- Zone-based layer system with dynamic coloring
- Animated glowing role markers
- Cinematic flyTo animation on load
- Responsive to attractions data

### MiniMap.tsx
Standalone minimap reference with:
- Light theme (mapbox/light-v11) for better visibility
- Non-interactive (disabled panning/zooming)
- Same zone visualization as main map
- Tiny pink attraction markers (8px)
- Perfect for sidebar reference

### TrailCard.tsx
Career role card component featuring:
- Zone-based emoji icons and theming
- Glowing shadow effects matching zone colors
- Ripple animation on click
- Scale hover animation (1.015x)
- Dark mode support
- Professional typography and spacing
- Optional location, summary, and metadata

## Environment Variables

The following environment variables are required:

### Required for Full Functionality

- `NEXT_PUBLIC_MAPBOX_TOKEN`: Your Mapbox API access token
  - Get one free at: https://account.mapbox.com/access-tokens/
  - Required for map visualization

### MongoDB Configuration

- `MONGO_URL`: MongoDB connection string
- `DB_NAME`: Database name (default: `career_park`)

### Optional

- `CORS_ORIGINS`: CORS allowed origins (default: `*`)

## Data Files

Located in `/public/data/`:

1. **career-world.geojson**: 
   - Career Island boundary polygon (sand-colored)
   - 6 zone polygons with zoneId properties
   - 13 role point markers with coordinates, titles, companies

2. **roles.json**: Array of role objects with metadata

3. **skills.json**: Skills inventory for filtering capabilities

## Development Setup

The application runs on port 5000 with Replit's environment:

1. **Development server**: `npm run dev` (automated via workflow)
2. **Port**: 5000 (required for Replit webview proxy)
3. **Host**: 0.0.0.0 (allows Replit proxy access)

## Deployment

Configured for Replit Autoscale deployment:

- **Build**: `npm run build`
- **Start**: `npm run start` (port 5000)
- **Type**: Autoscale (stateless web app)

## Design System

### Color Palette (Zones)
- Onboarding Forest: #0ea5e9 (Sky Blue)
- MarTech Mountain: #0d9488 (Teal)
- Demand Gen Fields: #16a34a (Green)
- RevOps Forge: #475569 (Slate)
- ABM Kingdom: #7c3aed (Violet)
- GTMstack Citadel: #eab308 (Yellow)

### Typography
- Headings: Tailwind semibold/bold
- Body: Tailwind regular/medium
- Card titles: lg font-semibold
- Metadata: sm text-gray-600/500

### Effects
- Glow shadows: `0 0 10px-20px ${color}66-AA`
- Hover scale: 1.015x
- Marker bounce: 0→1.3→1 scale over 550ms
- Animations: ease-out transitions
- Dark mode: Full support with gray-100/dark-[#121212]

## Recent Changes

### 2025-11-23 - Final Enhancement Pass
- **Map.tsx**: Replaced with enhanced version featuring:
  - GeoJSON-based zone rendering (6 zones)
  - Automated zone color mapping
  - Glowing role marker system
  - Cinematic flyTo animation (1.2s, 45° pitch)
  - Disney-inspired fog effects
  
- **MiniMap.tsx**: Rebuilt as standalone Mapbox component:
  - Light theme for reference view
  - Non-interactive mode for sidebar
  - Same zone system as main map
  
- **TrailCard.tsx**: Enhanced styling and functionality:
  - Added Onboarding Forest and GTMstack Citadel zones
  - Dark mode support
  - Improved animations and effects
  - Zone-based glow effects

- **career-world.geojson**: Restructured data:
  - Career Island outer boundary
  - 6 themed zone polygons
  - 13 role markers with consistent coordinates
  - Proper zoneId mapping for all features

- **Layout**: Removed missing NavBar component dependency

### 2025-11-22 - Initial Replit Setup
- Converted from yarn to npm
- Updated ports from 3000 to 5000
- Configured workflow for development
- Set up deployment configuration
- Added environment variables with Mapbox token

## User Preferences

- Clean, Disney-inspired aesthetic for career visualization
- Dark/light theme support throughout
- Smooth, cinematic animations
- Zone-based color theming for visual consistency
- Professional, approachable UI with emoji icons

## Notes

- The application requires a valid Mapbox token for map rendering
- All data loads from static GeoJSON and JSON files
- The map automatically flies to Career Island center on load
- Zone colors are used consistently across map layers and components
- Markers are positioned based on fictional coordinates in career-world.geojson
- The minimap serves as a perfect companion view in sidebars or panels
