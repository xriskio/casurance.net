# Casurance Commercial Insurance Agency

## Overview

Casurance is a B2B commercial insurance agency web application designed to streamline quote requests and service management across 15 US states. It serves as a comprehensive platform for businesses to obtain various commercial insurance types (e.g., commercial auto, general liability, workers' compensation) and provides detailed coverage information. The application features a public-facing site for clients and an authenticated agent portal for managing submissions. Key capabilities include specialized quote forms, an AI-powered blog, press releases, and industry-specific pages (e.g., Self Storage, Golf & Country Club, Auto Dealer & Garage Operations, Limousine & Chauffeured Transportation, NEMT). The platform emphasizes trust, professionalism, and efficiency in the commercial insurance process.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with React 18 and TypeScript, using Wouter for routing and Vite for fast builds. UI components are developed with Shadcn/ui (based on Radix UI primitives) and styled with Tailwind CSS, following a "New York" style variant with custom CSS variables for theming. The design system emphasizes a professional, enterprise aesthetic with a deep navy blue and corporate blue color palette and the Inter font family. State management primarily uses TanStack Query for server state and React hooks for local component state. Forms are handled with React Hook Form and Zod for type-safe validation, supporting multi-step wizards and dynamic sections. Accessibility is a core focus, adhering to WCAG 2.1 AA standards through keyboard navigation, semantic HTML, ARIA attributes, proper form labeling, and high contrast ratios.

### Backend Architecture

The backend is an Express.js server developed with TypeScript, featuring a modular route registration pattern and custom middleware for logging and error handling. It's designed for SSR with separate client/server build processes and integrates with Vite for development. The storage layer uses an abstract `IStorage` interface with an in-memory `MemStorage` implementation, designed for future database integration. The API follows a RESTful pattern with JSON request/response formats and is set up for credential-based authentication.

### Data Storage Solutions

The application utilizes PostgreSQL as its primary database, managed with Drizzle ORM for type-safe operations and schema migrations. Neon serverless PostgreSQL is the chosen database provider. Zod schemas generated from Drizzle tables ensure type-safe validation for all data operations.

### Agent Portal

The agent portal provides authenticated access for Casurance agents to manage all quote and service submissions. It features a table-based submission list with search, filtering, and status management functionalities. Authentication is handled via Passport.js with a local strategy, bcrypt for password hashing, and PostgreSQL for session management. The portal allows agents to view submission details, update statuses, and interact with features like AI-powered content generation for blogs and press releases.

### Content Management System (CMS)

The application includes a full-featured CMS for managing dynamic pages, navigation menus, and media assets:

**Database Schema** (`shared/schema.ts`):
- `cmsPages`: Stores page content with slug-based routing, markdown support, featured images, and publish status
- `cmsMenuItems`: Manages hierarchical navigation menus with parent-child relationships and ordering
- `cmsMedia`: Tracks uploaded media files with metadata (alt text, captions, file information)

**Backend API** (`server/routes/cms.ts`):
- RESTful endpoints for CRUD operations on pages, menus, and media
- All write operations (POST, PATCH, DELETE) protected with `ensureAuthenticated` middleware
- AI-powered page generation endpoint with brand validation and unique slug collision handling
- File upload functionality using Multer with authentication
- Public read endpoints for displaying published content

**Frontend Management** (`client/src/pages/CmsPages.tsx`):
- Agent-only CMS interface for managing pages (create, edit, delete, publish)
- AI-powered page generation with automatic brand compliance
- Manual page creation with markdown editor
- Search and filter capabilities for page management

**Public Display** (`client/src/pages/CmsPageDisplay.tsx`):
- Dynamic routing at `/page/:slug` for all CMS pages
- SEO optimization with react-helmet-async for meta tags
- Markdown rendering for rich content
- Only displays published pages (isPublished: 'true')
- Featured image support with responsive layouts

**Security**:
- All CMS write operations require agent authentication
- File uploads validated and stored in `attached_assets/uploads`
- Static file serving at `/uploads` endpoint
- AI-generated content validated for brand consistency before persistence

### SEO Implementation

All Tier 0 pages (10 critical pages) now include comprehensive SEO optimization:

**SEOHead Component** (`client/src/components/SEOHead.tsx`):
- Reusable component for consistent SEO across pages
- Accepts title, description, keywords, and canonical URL as props
- No window dependency (SSR-safe) - canonical URLs computed from props
- Includes Open Graph tags for social media sharing
- Twitter Card support
- InsuranceAgency structured data (JSON-LD)
- Robots meta tags for proper indexing

**Tier 0 Pages with SEO:**
1. Home (`/`) - InsuranceAgency schema, commercial insurance keywords
2. Quote (`/quote`) - Service-focused meta tags
3. Industries (`/industries`) - Industry-specific keywords (23+ industries)
4. Blog listing (`/blog`) - Blog-focused keywords
5. Blog detail (`/blog/:slug`) - Dynamic BlogPosting schema with article metadata
6. Press listing (`/press-releases`) - Company news keywords
7. Press detail (`/press-releases/:slug`) - Dynamic NewsArticle schema
8. About (`/about`) - Company information keywords
9. Contact (`/contact`) - Contact-focused keywords

**Dynamic Pages:**
- Blog posts: BlogPosting schema with headline, datePublished, author, articleSection, keywords
- Press releases: NewsArticle schema with headline, datePublished, articleSection, publisher
- All dynamic pages include canonical URLs, og:url, and article-specific metadata

**SEO Features:**
- Unique, descriptive title tags for every page
- Compelling meta descriptions (150-160 characters)
- Relevant keyword targeting for commercial insurance
- Canonical URLs prevent duplicate content issues
- Structured data helps search engines understand content types
- Optimized for AI chatbots (ChatGPT, Claude, Gemini, Google, Bing)

**Still Needed for Production:**
- sitemap.xml generation (build-time script)
- robots.txt configuration
- Tier 1 SEO (high-volume quote forms)
- Tier 2 SEO (long-tail forms and industry pages)

### AI Content Generation & Brand Protection

The application features AI-powered content generation for blog posts and press releases using OpenAI GPT-5. A comprehensive brand validation system ensures 100% brand consistency across all AI-generated content:

**Centralized Brand Management** (`server/lib/brand.ts`):
- All Casurance company information, contact details, and boilerplate text are centralized in a single source of truth
- Brand constants include: company name, email addresses (@casurance.net), phone numbers (323-546-3030, 1-888-254-0089), service area, and media contact information
- Helper functions provide formatted contact blocks and brand instructions for AI prompts

**Automated Brand Validation** (`server/lib/brand-validator.ts`):
- **Detection**: Identifies forbidden patterns (wrong company names, incorrect email domains, unapproved phone numbers)
- **Validation**: Treats incorrect contact information as hard errors, not warnings
- **Normalization**: Strips leading/trailing punctuation and quotes before validation to handle natural prose
- **Sanitization**: Automatically replaces incorrect branding with correct Casurance information
- **Enforcement**: All AI-generated content passes through validation → sanitization → re-validation before being persisted

**Integration**:
- Both blog generator and press release generator validate all text fields (content, excerpt, subtitle) before returning
- The system either automatically fixes incorrect branding or throws clear errors if content cannot be corrected
- No AI hallucinations can slip through to the database or public website

## External Dependencies

*   **UI Libraries**: Radix UI, Lucide React (icons), Embla Carousel, CMDK, class-variance-authority.
*   **Date Manipulation**: date-fns.
*   **Database & ORM**: Drizzle ORM, Drizzle Kit, Neon Serverless (PostgreSQL), connect-pg-simple.
*   **API Integration**: TanStack Query.
*   **AI Integration**: OpenAI GPT-5 (via Replit AI Integrations) for content generation (blog, press releases).
*   **Image Assets**: Pexels API for professional stock images.
*   **Typography**: Google Fonts (Inter).
*   **Build Tools**: Vite, ESBuild, PostCSS (with Tailwind and Autoprefixer).
*   **Authentication**: Passport.js, bcrypt.