# Secret Data Waste - Digital Pollution Assessment App

## Overview

This is a modern web application focused on digital pollution awareness and education. The app provides users with a questionnaire to assess their digital habits, offers personalized feedback, and includes educational content about reducing digital environmental impact. Built with React, TypeScript, and Express, it features a clean, responsive design with interactive elements.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Radix UI components with shadcn/ui styling
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React hooks with custom questionnaire hook
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Built-in support for connect-pg-simple
- **API Design**: RESTful endpoints with /api prefix
- **Development**: Hot module replacement via Vite integration

### Data Storage
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured via DATABASE_URL)
- **Schema**: Centralized in shared/schema.ts for type consistency
- **Storage Interface**: Abstracted IStorage interface with MemStorage fallback

## Key Components

### Pages
- **Home**: Landing page with app introduction, video section, and navigation
- **Questionnaire**: Interactive assessment with 12 questions about digital habits
- **Results**: Personalized pollution score with CO2 equivalents and recommendations
- **Tips**: Interactive tips page with floating bubbles showing eco-friendly actions
- **Mini-Game**: Fully functional "Server Clean-up" drag-and-drop game with real-time scoring

### Core Features
- **Progress Tracking**: Dynamic progress bar that changes color based on pollution level
- **Pollution Calculator**: Converts user responses to environmental impact metrics
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Interactive Elements**: Animated components and hover effects
- **Video Section**: Placeholder video area on landing page with play button
- **Drag-and-Drop Game**: Real-time mini-game with scoring system and timer

### UI Components
- **Navigation**: Sticky header with responsive mobile menu
- **Progress Bar**: Color-coded pollution indicator (green/yellow/red)
- **Form Elements**: Radio groups, buttons, and cards for questionnaire
- **Tooltips & Dialogs**: Enhanced user experience with contextual information

## Data Flow

1. **User Assessment**: Questions answered through radio button selections
2. **State Management**: Answers stored in React state and localStorage
3. **Score Calculation**: Pollution level computed based on weighted responses
4. **Results Display**: Environmental impact metrics and personalized advice
5. **Navigation**: Seamless transitions between assessment stages

## External Dependencies

### Frontend Dependencies
- **@radix-ui/***: Accessible UI primitives
- **@tanstack/react-query**: Server state management
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight routing library
- **lucide-react**: Icon library

### Backend Dependencies
- **express**: Web application framework
- **drizzle-orm**: Type-safe SQL toolkit
- **@neondatabase/serverless**: PostgreSQL client
- **tsx**: TypeScript execution environment

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **@replit/vite-plugin-***: Replit-specific development enhancements

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **Development**: `NODE_ENV=development` with hot reloading
- **Production**: Optimized builds with static file serving
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable

### Scripts
- `dev`: Start development server with hot reloading
- `build`: Create production builds for both frontend and backend
- `start`: Run production server
- `db:push`: Apply database schema changes

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 07, 2025. Initial setup
- July 07, 2025. Added fully functional mini-game with drag-and-drop mechanics, real-time scoring, and timer system
- July 07, 2025. Added video section to landing page with interactive play button and placeholder for video content