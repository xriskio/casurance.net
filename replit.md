# Casurance Commercial Insurance Agency

## Overview

Casurance is a commercial insurance agency web application that provides quote requests, service requests, and information about various insurance coverage types and industries. The platform is built as a full-stack TypeScript application with a React frontend and Express backend, designed to help businesses across 13 states (California, Nevada, Arizona, Oregon, Ohio, Illinois, New York, New Jersey, Pennsylvania, North Carolina, Texas, Alaska, and Florida) obtain insurance quotes and manage their policies.

The application serves as a B2B platform for commercial insurance, emphasizing trust, professionalism, and efficiency in the quote process. It features multiple specialized quote forms for different insurance types (commercial auto, general liability, workers compensation, trucking, hotel, restaurant, limousine, NEMT, ambulance, TNC/rideshare, etc.) and comprehensive coverage information organized by category.

**Agent Portal**: Authenticated portal for Casurance agents to view and manage all quote and service submissions. Features table-based layout with filtering, search, status management, and detailed submission views.

**Latest Additions**: 
- Limousine & Chauffeured Transportation Insurance Quote Form (November 2025) - Comprehensive 6-step application based on Philadelphia Insurance Companies standards covering auto liability, general liability, hired/non-owned liability, physical damage, UM/UIM/PIP, operations, drivers, prior insurance, and vehicle schedules (1908 lines)
- NEMT and Paratransit industry page (November 2025) - Specialized insurance coverage information for Non-Emergency Medical Transportation and Paratransit operators

## User Preferences

Preferred communication style: Simple, everyday language.

## Accessibility Features (WCAG 2.1 AA Compliance)

The application implements comprehensive accessibility features to meet WCAG 2.1 AA standards:

**Keyboard Navigation (WCAG 2.1.1, 2.4.1, 2.4.7)**
- Skip-to-content link appears on focus, allowing keyboard users to bypass navigation
- All interactive elements accessible via keyboard (Tab, Enter, Space, Arrow keys)
- Visible focus indicators with 3:1 minimum contrast ratio on all focusable elements
- No keyboard traps in modals, dropdowns, or other interactive components (Radix UI handles focus management)

**Semantic HTML & ARIA (WCAG 1.3.1, 2.4.6, 4.1.2)**
- Proper semantic landmarks: `<header role="banner">`, `<nav role="navigation">`, `<main id="main-content">`, `<footer role="contentinfo">`
- ARIA labels on navigation: `aria-label="Main navigation"` on nav element
- ARIA labels on icon-only buttons: `aria-label="Open navigation menu"`, `aria-label="Call us at..."`
- Decorative icons marked with `aria-hidden="true"` to hide from screen readers
- Proper heading hierarchy throughout the site

**Forms & Labels (WCAG 1.3.1, 3.3.2)**
- All form fields have programmatically associated labels using `<Label htmlFor="id">` matching `<Input id="id">`
- Required fields marked with asterisk and `required` attribute
- Form validation with accessible error messages
- Multi-step forms include progress indicators and clear navigation

**Color & Contrast (WCAG 1.4.3)**
- Text color contrast ratios exceed WCAG AAA standards:
  - Light mode: 15.8:1 (foreground) and 7.6:1 (muted foreground)
  - Dark mode: 15.3:1 (foreground) and 8.2:1 (muted foreground)
- Information never conveyed by color alone
- High-contrast focus indicators (3:1 minimum)

**Images & Media (WCAG 1.1.1)**
- All meaningful images have descriptive alt text (e.g., "Casurance Insurance Agency - Return to homepage")
- Decorative icons use `aria-hidden="true"` to hide from assistive technology
- Industry images include descriptive alt text

**Language & Document Structure (WCAG 3.1.1)**
- HTML lang attribute set to "en" in index.html
- Clear document structure with proper heading levels (h1, h2, h3)
- Semantic sectioning elements used throughout

**Component Accessibility**
- Radix UI primitives provide built-in accessibility:
  - Dialogs: automatic focus trapping, Escape to close, screen reader announcements
  - Dropdowns: arrow key navigation, Escape to close, proper ARIA roles
  - Forms: programmatic labels, error announcements, field descriptions
- All Shadcn components maintain accessibility standards from Radix UI primitives

**Testing & Validation**
- Skip link tested with keyboard navigation (Tab on page load)
- Focus indicators visible on all interactive elements
- Color contrast verified using HSL lightness calculations
- Semantic HTML validated with proper landmark structure
- Form labels verified to be programmatically associated

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

## Agent Portal

The agent portal provides authenticated access for Casurance agents to view and manage all submission requests.

**Authentication System**
- Passport.js with local strategy for email/password authentication
- Bcrypt password hashing for secure credential storage
- PostgreSQL session management via connect-pg-simple
- Session persistence with 7-day expiration
- Default credentials: admin@casurance.com / admin123 (must be changed after first login)

**Database Schema**
- `agents` table: stores agent accounts (id, email, hashedPassword, fullName, role)
- `agent_sessions` table: manages session persistence
- `submission_status_history` table: tracks all status changes with audit trail

**Agent Portal Features**
- Table-based submission list with columns: Form Name, Name, Location, Date, Status, Actions
- Real-time search across business names, contacts, and locations
- Filter by submission type (general quotes, service requests, specialized insurance types)
- "Mark as Read" functionality to track reviewed submissions
- "View Details" page showing complete submission information
- Status management (pending, read, completed)
- Responsive design optimized for desktop use

**API Endpoints**
- POST `/api/auth/login` - authenticate agent with email/password
- POST `/api/auth/logout` - end agent session
- GET `/api/auth/me` - get current authenticated agent
- GET `/api/agent/submissions` - list all submissions with optional filtering
- PATCH `/api/agent/submissions/:type/:id/status` - update submission status

**Frontend Components**
- `AgentLogin` (/agent/login) - authentication form
- `AgentPortal` (/agent/portal) - main submissions dashboard
- `AgentSubmissionDetail` (/agent/submission/:type/:id) - detailed submission view
- Custom hook `useAgentAuth` - manages authentication state

**Security**
- Session-based authentication with httpOnly cookies
- CSRF protection via sameSite cookie attribute
- Password requirements enforced (minimum 1 character for development)
- Protected routes with authentication middleware
- Credential-based API requests