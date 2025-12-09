# Casurance Commercial Insurance Agency

## Overview

Casurance is a B2B commercial insurance agency web application designed to streamline quote requests and service management nationwide across all 50 US states. It provides a comprehensive platform for businesses to obtain various commercial insurance types (e.g., commercial auto, general liability, workers' compensation) and detailed coverage information. The application also offers Personal Lines insurance products including Personal Auto, Homeowners, Landlord Protector, High Value Home (up to $30M), Wildfire & Brush Area, and Residential Earthquake coverage. The application features a public-facing site for clients and an authenticated agent portal for managing submissions. Key capabilities include specialized quote forms, an AI-powered blog, press releases, and industry-specific pages (e.g., Self Storage, Golf & Country Club). The platform emphasizes trust, professionalism, and efficiency in the commercial insurance process.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with React 18 and TypeScript, using Wouter for routing and Vite for fast builds. UI components are developed with Shadcn/ui (based on Radix UI primitives) and styled with Tailwind CSS, following a "New York" style variant with custom CSS variables for theming. The design system uses a deep navy blue and corporate blue color palette and the Inter font family. State management primarily uses TanStack Query for server state and React hooks for local component state. Forms are handled with React Hook Form and Zod for type-safe validation, supporting multi-step wizards and dynamic sections. Accessibility adheres to WCAG 2.1 AA standards. Navigation features a consistent header and footer across all pages and forms.

### Backend Architecture

The backend is an Express.js server developed with TypeScript, featuring a modular route registration pattern and custom middleware. It's designed for SSR with separate client/server build processes. The API follows a RESTful pattern with JSON request/response formats and is set up for credential-based authentication.

### Data Storage Solutions

The application utilizes PostgreSQL as its primary database, managed with Drizzle ORM for type-safe operations and schema migrations. Neon serverless PostgreSQL is the chosen database provider. Zod schemas generated from Drizzle tables ensure type-safe validation for all data operations.

### Agent Portal

The agent portal provides authenticated access for Casurance agents to manage all quote and service submissions. It features a table-based submission list with search, filtering, and status management. Authentication is handled via Passport.js with a local strategy, bcrypt for password hashing, and PostgreSQL for session management. The portal also allows agents to view submission details and interact with features like AI-powered content generation.

### Content Management System (CMS)

The application includes a full-featured CMS for managing dynamic pages, navigation menus, and media assets. This is supported by `cmsPages`, `cmsMenuItems`, and `cmsMedia` database schemas, with RESTful APIs for CRUD operations. An agent-only CMS interface allows for managing pages, including AI-powered generation and manual creation with a markdown editor. Public display of content is dynamic and SEO-optimized. All CMS write operations require agent authentication.

### SEO Implementation

The application includes comprehensive SEO optimization for critical pages, utilizing an `SEOHead` component for consistent meta tags, Open Graph, Twitter Card, and JSON-LD structured data (e.g., InsuranceAgency, BlogPosting, NewsArticle schemas). Features include unique titles, meta descriptions, keyword targeting, canonical URLs, and optimization for AI chatbots. A dynamic sitemap.xml and static robots.txt are implemented to guide search engines and AI crawlers, including over 140 URLs for coverages, industries, quote forms, and dynamic content.

### Analytics & Tracking

The application uses Google Analytics 4 (GA4) with both client-side and server-side tracking:
- **Client-side**: gtag.js implementation in index.html (Measurement ID: G-ZMFP47KVV3)
- **Server-side**: GA4 Measurement Protocol (`server/lib/ga4-measurement-protocol.ts`) for accurate conversion tracking of form submissions (quote requests, service requests, contact forms)
- **Events tracked**: `generate_lead` for quote submissions, `service_request` for service requests, `contact_form_submission` for contact forms
- **IndexNow**: Automatic URL submission to Bing, Yandex, and other participating search engines

### GEICO Partnership Pages

Casurance operates as a "Local Agent with GEICO" offering two product lines:
- **Commercial Auto** (`/geico-commercial-auto`): Available in 14 states - Arizona, Arkansas, Colorado, Florida, Illinois, Kansas, Nevada, New Jersey, New Mexico, Ohio, Oregon, Pennsylvania, South Carolina, Texas. Covers business vehicles, fleet operations, service vehicles, and delivery vehicles.
- **Private Passenger Auto** (`/geico-private-passenger`): Available in select states including Montana, Oregon, Minnesota, Indiana, Kentucky, Pennsylvania, Ohio, Virginia, West Virginia, Georgia. Covers personal vehicles with full coverage options.

Branding requirements: Heritage Blue GEICO logo on light backgrounds, White GEICO logo on dark backgrounds. SEO terminology must use "Local Agent with GEICO" per GEICO guidelines.

### AI Content Generation & Brand Protection

The application features AI-powered content generation for blog posts and press releases using OpenAI GPT-5. A centralized brand management system (`server/lib/brand.ts`) and an automated brand validation system (`server/lib/brand-validator.ts`) ensure 100% brand consistency. This system detects, validates, normalizes, and sanitizes AI-generated content, replacing incorrect branding with correct Casurance information before persistence, preventing brand-inconsistent content from being published.

## External Dependencies

*   **UI Libraries**: Radix UI, Lucide React, Embla Carousel, CMDK, class-variance-authority.
*   **Date Manipulation**: date-fns.
*   **Database & ORM**: Drizzle ORM, Drizzle Kit, Neon Serverless (PostgreSQL), connect-pg-simple.
*   **API Integration**: TanStack Query.
*   **AI Integration**: OpenAI GPT-5 (via Replit AI Integrations) for content generation.
*   **Typography**: Google Fonts (Inter).
*   **Build Tools**: Vite, ESBuild, PostCSS (with Tailwind and Autoprefixer).
*   **Authentication**: Passport.js, bcrypt.