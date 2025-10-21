# Design Guidelines for Casurance Commercial Insurance Agency Redesign

## Design Approach: Professional Enterprise System

**Selected Approach:** Design System with Corporate Financial Services aesthetics
**Rationale:** Commercial insurance requires trust, credibility, and efficiency. B2B decision-makers need clear information, professional presentation, and streamlined quote processes. This is a utility-focused application where credibility and usability drive conversions.

**Design Philosophy:** 
- Trust-first presentation with clean, corporate aesthetics
- Information clarity over decorative elements
- Efficiency in form completion and service requests
- Professional gravitas appropriate for business insurance decisions

---

## Core Design Elements

### A. Color Palette

**Primary Brand Colors:**
- Deep Navy Blue: 220 85% 25% (primary brand, headers, CTAs)
- Corporate Blue: 215 60% 45% (links, accents, trust elements)

**Supporting Colors:**
- Slate Gray: 215 15% 35% (body text, secondary elements)
- Light Gray: 210 20% 96% (backgrounds, cards)
- White: 0 0% 100% (primary backgrounds)

**Accent Colors:**
- Success Green: 145 65% 45% (form validation, success states)
- Alert Red: 5 75% 55% (errors, required fields)

**Semantic Usage:**
- Backgrounds: White primary, Light Gray for sections
- Text: Slate Gray for body, Deep Navy for headings
- CTAs: Deep Navy with white text
- Trust badges/carrier logos: Light Gray backgrounds

---

### B. Typography

**Font Families:**
- Primary: Inter (via Google Fonts) - clean, professional, excellent readability
- Headings: Inter Semi-Bold (600) and Bold (700)
- Body: Inter Regular (400) and Medium (500)

**Type Scale:**
- Hero Headlines: text-5xl to text-6xl (48-60px), font-bold
- Section Headings: text-3xl to text-4xl (30-36px), font-semibold
- Subsection Headings: text-2xl (24px), font-semibold
- Body Text: text-base (16px), font-normal
- Small Text: text-sm (14px) for captions, form labels
- Buttons/CTAs: text-lg (18px), font-medium

---

### C. Layout System

**Spacing Primitives:** Use Tailwind units: 4, 6, 8, 12, 16, 20, 24
- Component internal spacing: p-4, p-6, p-8
- Section padding: py-16, py-20, py-24
- Element gaps: gap-4, gap-6, gap-8
- Margins: mt-8, mb-12, mx-auto

**Grid System:**
- Container: max-w-7xl mx-auto px-6 lg:px-8
- Content sections: max-w-6xl
- Form containers: max-w-2xl (centered, focused)
- Multi-column grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

---

### D. Component Library

**Navigation:**
- Fixed header with white background, subtle shadow
- Logo left-aligned, main navigation center/right
- Primary CTA button in header: "Get a Quote"
- Phone number prominently displayed in header

**Hero Section:**
- Full-width hero with professional business imagery (office, handshake, business meeting)
- Left-aligned headline and description (60% width)
- Dual CTAs: Primary "Request Quote" + Secondary "Call Us"
- Trust indicator bar below: "Trusted by 500+ California Businesses" with carrier count

**Quote Request Forms:**
- Multi-step wizard design (Progress bar showing steps)
- Step 1: Business Type Selection (card-based selection with icons)
- Step 2: Business Details (company name, industry, employees, revenue)
- Step 3: Coverage Needs (checkbox selections for coverage types)
- Step 4: Contact Information
- Clean, spacious form fields with labels above inputs
- Generous spacing between form groups (space-y-6)
- Inline validation with green checkmarks/red error messages

**Service Request Forms:**
- Simpler single-page form for existing clients
- Account lookup by policy number or business name
- Request type dropdown (Policy Change, Certificate Request, Claims, General Inquiry)
- File upload capability for documents
- Priority selection field

**Insurance Products Cards:**
- Grid layout: 3 columns on desktop, 2 on tablet, 1 on mobile
- Card structure: Icon (64px), Title, 2-3 sentence description, "Learn More" link
- White cards with subtle hover elevation (shadow-md to shadow-lg)
- Icons in Corporate Blue color

**Trust Elements:**
- Carrier logos section: 6-8 logos per row, grayscale filter
- Social proof boxes: "A+ Rated", "Licensed in California", "20+ Years Experience"
- Testimonial cards with company logo, quote, name/title

**Footer:**
- Three-column layout: Company Info, Quick Links, Contact
- Office address with map icon
- Phone/email with click-to-call/email
- Social media icons
- Licensing information and disclaimers

---

### E. Page-Specific Layouts

**Homepage Sections (in order):**
1. Hero with business imagery and dual CTAs
2. Trust indicators bar (carriers, ratings, years)
3. Coverage Types grid (6-8 main commercial insurance products)
4. Why Choose Us (3-column benefits with icons)
5. Quote Request CTA section (full-width, Corporate Blue background, white text)
6. Featured Carriers showcase
7. Contact information with embedded map placeholder

**Quote Request Page:**
- Centered form container (max-w-2xl)
- Progress indicator at top
- Large, clear form fields
- Helpful tooltips/info icons for complex fields
- Step navigation buttons at bottom

**Service Request Page:**
- Similar centered layout
- Clear instructions at top
- Form grouped by sections with headings
- File upload dropzone with drag-and-drop

---

## Images

**Hero Section:**
- Large hero image (1920x800px minimum): Professional business setting - diverse business team in modern office, handshake deal, or California business exterior
- Image should convey trust, professionalism, and local California business presence
- Overlay: Subtle dark gradient (bottom to top, opacity 20-30%) for text readability

**Supporting Images:**
- Insurance type cards: Consider small icon illustrations (not photos) for clean look
- About/Why Us section: Team photo or office environment (optional)
- All images should be high quality, professional photography with business/corporate aesthetic

---

## Form Design Specifications

**Input Fields:**
- Height: h-12 (48px for touch-friendly interaction)
- Border: border border-gray-300 rounded-lg
- Focus state: ring-2 ring-corporate-blue border-corporate-blue
- Error state: border-red-500
- Success state: border-green-500 with checkmark icon

**Buttons:**
- Primary CTA: Deep Navy background, white text, h-12, px-8, rounded-lg
- Secondary: outline variant with Corporate Blue border
- Hover: subtle darkening, no dramatic effects
- Disabled: opacity-50 cursor-not-allowed

**Form Validation:**
- Inline validation on blur
- Required fields marked with red asterisk
- Error messages below fields in Alert Red
- Success indicators: green checkmark icons

---

## Interaction Guidelines

**Minimal Animation:**
- Form step transitions: simple fade-in (duration-200)
- Card hovers: elevation change (shadow transition)
- No parallax, no scroll-triggered animations, no complex interactions
- Focus on speed and clarity over visual effects

**Mobile Responsiveness:**
- Stack all multi-column layouts to single column on mobile
- Increase touch target sizes (minimum 44px)
- Adjust font sizes for mobile readability
- Simplify navigation to hamburger menu
- Form fields full-width on mobile with increased spacing

---

This design creates a trustworthy, professional commercial insurance platform that prioritizes lead capture through well-designed forms while maintaining the credibility essential for B2B insurance decisions.