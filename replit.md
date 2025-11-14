# Casurance Commercial Insurance Agency

## Overview

Casurance is a commercial insurance agency web application that provides quote requests, service requests, and information about various insurance coverage types and industries. The platform is built as a full-stack TypeScript application with a React frontend and Express backend, designed to help California businesses obtain insurance quotes and manage their policies.

The application serves as a B2B platform for commercial insurance, emphasizing trust, professionalism, and efficiency in the quote process. It features multiple specialized quote forms for different insurance types (commercial auto, general liability, workers compensation, trucking, hotel, restaurant, etc.) and comprehensive coverage information organized by category.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**
- React 18 with TypeScript for type-safe component development
- Wouter for lightweight client-side routing
- Vite as the build tool and development server for fast HMR and optimized production builds

**UI Component System**
- Shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- "New York" style variant from Shadcn with CSS variables for theming
- Custom color palette emphasizing professional enterprise aesthetics (Deep Navy Blue primary, Corporate Blue accents)
- Inter font family for clean, professional typography

**State Management**
- TanStack Query (React Query) for server state management and data fetching
- Local component state with React hooks for form data and UI state
- No global state management library (Redux/Zustand) - keeping state local and simple

**Form Handling**
- React Hook Form with Zod resolvers for type-safe form validation
- Multi-step form wizards for complex insurance applications
- Dynamic form sections with add/remove functionality for arrays (vehicles, drivers, employees)

**Design System**
- Follows design_guidelines.md for professional B2B aesthetics
- Trust-first presentation with corporate financial services feel
- Emphasis on information clarity over decorative elements
- Responsive design with mobile-first approach

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- Modular route registration pattern (routes.ts)
- Custom middleware for request/response logging
- Error handling middleware for consistent error responses

**Development Environment**
- Vite middleware integration for HMR in development
- SSR-ready architecture with separate client/server build processes
- Replit-specific plugins for development tools (cartographer, dev banner, runtime error overlay)

**Storage Layer**
- Abstract storage interface (IStorage) for CRUD operations
- In-memory storage implementation (MemStorage) as default
- Designed to be swapped for database implementation without changing application code
- Storage methods include user management (placeholder for future authentication)

**API Design**
- RESTful API pattern with /api prefix for all endpoints
- JSON request/response format
- Credential-based authentication ready (credentials: "include" in fetch)
- Centralized error handling with status codes and messages

### Data Storage Solutions

**Database Schema (PostgreSQL via Drizzle ORM)**
- Quote requests table: stores business information, contact details, insurance type, coverage needs
- Service requests table: stores policy changes, certificate requests, claims assistance
- Drizzle ORM for type-safe database operations
- Schema-first approach with TypeScript inference
- Migration support via drizzle-kit

**Database Provider**
- Neon serverless PostgreSQL (via @neondatabase/serverless)
- Environment-based configuration (DATABASE_URL)
- Connection pooling handled by Neon driver

**Schema Validation**
- Zod schemas generated from Drizzle tables (drizzle-zod)
- Type-safe insert operations with validation
- Shared schema definitions between client and server

### External Dependencies

**Third-Party UI Libraries**
- Radix UI: Comprehensive set of unstyled, accessible components (accordion, dialog, dropdown, select, etc.)
- Lucide React: Icon library for consistent iconography
- Embla Carousel: Carousel/slider functionality
- CMDK: Command menu component
- class-variance-authority: Type-safe variant styling
- date-fns: Date manipulation and formatting

**Development Tools**
- Replit-specific plugins: cartographer (navigation), dev-banner, runtime error modal
- ESBuild for production server bundling
- PostCSS with Tailwind and Autoprefixer
- TypeScript with strict mode enabled

**Database & ORM**
- Drizzle ORM: Type-safe PostgreSQL ORM
- Drizzle Kit: Schema management and migrations
- Neon Serverless: PostgreSQL database provider
- connect-pg-simple: PostgreSQL session store (for future session management)

**API Integration**
- TanStack Query for efficient data fetching and caching
- Custom fetch wrapper with error handling
- Credential-based requests for future authentication

**Design Assets**
- Google Fonts (Inter) for typography
- Custom Casurance logo (referenced in Header component)
- Professional color scheme based on design guidelines

**Content Management**
- Static content files for coverages and industries (TypeScript modules)
- Structured content types with SEO metadata
- Category-based organization for coverage types
- Slug-based routing for dynamic pages