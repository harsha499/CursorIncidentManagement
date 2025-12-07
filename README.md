# Incident Management Tool

A full-stack incident management application built with React 18 (Rsbuild/TypeScript) frontend and Node.js/Express/TypeScript backend.

## Features

- **Create Incidents**: Add new incidents with team name, issue description, severity, environment, and status
- **List & Filter**: View all incidents with filtering by status, severity, environment, and search functionality
- **Update Incidents**: Edit existing incidents
- **Delete Incidents**: Remove incidents from the system
- **View Details**: See detailed information about each incident
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
incident-management/
├── frontend/              # React 18 + Rsbuild + TypeScript
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service layer
│   │   ├── types/         # TypeScript type definitions
│   │   ├── utils/         # Utility functions
│   │   └── App.tsx        # Main app component
│   └── package.json
├── backend/               # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── controllers/   # Business logic controllers
│   │   ├── services/      # Data service layer
│   │   ├── types/         # TypeScript type definitions
│   │   ├── data/          # JSON data storage
│   │   └── server.ts      # Express server entry point
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The backend server will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000` (or the next available port)

## API Endpoints

- `GET /api/incidents` - List all incidents (supports query params: status, severity, environment, search)
- `GET /api/incidents/:id` - Get single incident by ID
- `POST /api/incidents` - Create new incident
- `PUT /api/incidents/:id` - Update existing incident
- `DELETE /api/incidents/:id` - Delete incident

## Incident Model

```typescript
{
  id: string (UUID)
  teamName: string
  issueDescription: string
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info'
  environment: 'Production' | 'Staging' | 'Development' | 'Testing'
  status: 'Open' | 'In Progress' | 'Resolved'
  createdAt: string (ISO timestamp)
  updatedAt: string (ISO timestamp)
}
```

## Data Storage

Incidents are stored locally in `backend/src/data/incidents.json` as a JSON array. The data persists between server restarts.

## Development

- Backend uses `ts-node-dev` for hot reloading
- Frontend uses Rsbuild with React Fast Refresh
- Both projects use TypeScript for type safety

## Build for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## License

ISC

