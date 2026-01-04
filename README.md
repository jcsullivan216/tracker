# DoD Engagement Tracker

A React-based CRM/engagement tracking application for managing Department of Defense EW/SIGINT customer relationships across operational units (Users) and acquisition programs (Buyers).

![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## Overview

This tool helps defense technology companies track engagement status across the DoD EW/SIGINT ecosystem, including:

- **Users (144 units)**: Operational units with EW/SIGINT missions across Army, Navy, Air Force, Marine Corps, Space Force, SOCOM, CYBERCOM, and other commands
- **Buyers (273 programs)**: Acquisition offices, program managers, and R&D organizations that procure EW/SIGINT capabilities

## Features

### Dual-Mode Interface
- **Users Mode**: Track operational units by service branch, location, mission, and systems
- **Buyers Mode**: Track acquisition programs by agency, category, and parent organization

### Engagement Pipeline
- **6 Status Levels**: Not Engaged → Contacted → Engaged → Deployed → Under Contract → On Ice
- **Kanban Board**: Drag-and-drop pipeline view for active engagements
- **List View**: Collapsible groups organized by service/agency

### Data Management
- **Search**: Filter by name, location, mission, organization, or category
- **Filters**: Service/agency, engagement status, category (buyers only)
- **Custom Entries**: Add custom units or organizations
- **Point of Contact**: Track POC information for each entry
- **Notes**: Add engagement notes and intelligence

### Visual Design
- Dark theme optimized for extended use
- Color-coded by service/agency (consistent across Users and Buyers)
- Status indicators and progress bars
- Responsive card-based layout

## Data Structure

### Users (Operational Units)
| Field | Description |
|-------|-------------|
| name | Unit designation |
| service | Service branch (Army, Navy, etc.) |
| componentType | Unit type (Brigade MI Company, etc.) |
| location | Base/installation |
| mission | Mission description |
| systems | Key systems/platforms |
| poc | Point of contact |
| status | Engagement status |
| notes | Engagement notes |

### Buyers (Programs/Organizations)
| Field | Description |
|-------|-------------|
| name | Program/office name |
| organization | Parent organization |
| service | Service/agency |
| category | Focus area (Electronic Warfare, Cyber, etc.) |
| description | Program description |
| poc | Point of contact |
| status | Engagement status |
| notes | Engagement notes |

## Project Structure

```
dod-engagement-tracker/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── AddBuyerModal.jsx    # Modal for adding custom buyers
│   │   ├── AddModal.jsx         # Wrapper for add modals
│   │   ├── AddUnitModal.jsx     # Modal for adding custom units
│   │   ├── BuyerCard.jsx        # Card component for buyers
│   │   ├── BuyerModal.jsx       # Detail modal for buyers
│   │   ├── FilterBar.jsx        # Search and filter controls
│   │   ├── Header.jsx           # App header with mode toggle
│   │   ├── ItemCard.jsx         # Wrapper for card components
│   │   ├── ItemModal.jsx        # Wrapper for detail modals
│   │   ├── KanbanView.jsx       # Pipeline/Kanban board view
│   │   ├── ListView.jsx         # Grouped list view
│   │   ├── UserCard.jsx         # Card component for users
│   │   ├── UserModal.jsx        # Detail modal for users
│   │   └── index.js             # Component exports
│   ├── data/
│   │   ├── buyers.json          # Buyer/program data (273 entries)
│   │   ├── config.js            # Colors and status configuration
│   │   └── users.json           # User/unit data (144 entries)
│   ├── utils/
│   │   └── helpers.js           # Utility functions
│   ├── App.jsx                  # Main application component
│   ├── index.css                # Global styles
│   └── main.jsx                 # Entry point
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dod-engagement-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Dependencies
- React 18+
- lucide-react (icons)
- Vite (build tool)

## Customization

### Adding Services/Agencies
Edit `src/data/config.js` to add new color schemes:

```javascript
export const serviceColors = {
  'New Agency': { bg: '#1a1a2e', border: '#6366f1', text: '#818cf8', badge: '#4338ca' },
  // ...
};
```

### Modifying Status Pipeline
Edit `statusConfig` and `kanbanColumns` in `src/data/config.js` to customize engagement stages:

```javascript
export const statusConfig = {
  'new-status': { label: 'Display Name', color: '#1a1a2e', border: '#6366f1', textColor: '#818cf8' },
  // ...
};
```

### Data Sources
Data is stored in JSON files in `src/data/`:
- `users.json` - Operational units data
- `buyers.json` - Acquisition programs data

To connect to external data sources (API, database), modify the data loading in `src/App.jsx`.

## Data Coverage

### Users by Service
- Army: 27 units
- Navy: 39 units
- Air Force: 26 units
- Marine Corps: 16 units
- Space Force: 6 units
- SOCOM: 10 units
- CYBERCOM: 6 units
- Joint: 9 units
- NSA: 4 units
- STRATCOM: 1 unit

### Buyers by Agency
- Army: 60+ programs
- Navy: 40+ programs
- Air Force: 35+ programs
- OSD/DARPA: 25+ programs
- SOCOM: 15+ programs
- Combatant Commands: 20+ programs
- OTA Consortiums: 8 programs

## License

MIT License - See LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

Built for defense technology business development and customer engagement tracking.
