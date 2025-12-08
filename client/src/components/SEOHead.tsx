import { Helmet } from "react-helmet-async";

/**
 * SEOHead Component - Google Search Structured Data Implementation
 * 
 * IMPORTANT: Google Structured Data Policy Compliance
 * https://developers.google.com/search/docs/appearance/structured-data/sd-policies
 * 
 * Quality Guidelines:
 * 1. CONTENT VISIBILITY: All structured data must match visible page content
 *    - FAQs must be visible on the page (in an FAQ section or accordion)
 *    - Reviews/ratings must be from actual users, displayed on the page
 *    - Services must be described on the page
 * 
 * 2. NO FAKE DATA: Reviews and ratings must be from real users
 *    - Don't use aggregateRating unless actual user reviews are displayed
 *    - Fake reviews can result in Google manual action
 * 
 * 3. RELEVANCE: Structured data must describe the page content accurately
 * 
 * 4. SPECIFICITY: Use most specific schema types (InsuranceAgency, not LocalBusiness)
 * 
 * Title Link Best Practices (https://developers.google.com/search/docs/appearance/title-link):
 * - Keep titles descriptive and concise (avoid truncation)
 * - Brand concisely: "Page Title | Casurance" format
 * - Homepage uses full branding, other pages use short format
 * - Avoid keyword stuffing and boilerplate text
 * - Make main H1 heading distinctive and prominent
 * 
 * Site Name Best Practices (https://developers.google.com/search/docs/appearance/site-names):
 * - WebSite structured data defined ONCE in index.html (not dynamically per-page)
 * - Required: name, url (with trailing slash)
 * - Recommended: alternateName for acronyms or alternate names
 * - Use consistent site name across homepage (og:site_name should match)
 * - Site name should be concise ("Casurance" not "Casurance Insurance Agency")
 * 
 * Snippet Best Practices (https://developers.google.com/search/docs/appearance/snippet):
 * - Create unique, descriptive meta descriptions for each page
 * - Avoid keyword stuffing - descriptions should be human-readable
 * - Include relevant information: services, location, benefits
 * - Meta descriptions can be up to ~155-160 characters before truncation
 * - Use max-snippet meta tag to control snippet length if needed
 * 
 * Canonical URL Best Practices:
 * - Always use absolute URLs (https://casurance.net/...)
 * - Prefer HTTPS over HTTP
 * - Canonical URL in sitemap must match rel="canonical"
 * 
 * Structured Data Carousels (Beta - EEA/Turkey/South Africa only):
 * - Uses ItemList with LocalBusiness/Product/Event types
 * - Requires summary page with 3+ items linking to detail pages
 * - Not available in US as of Dec 2025
 * 
 * Supported Schema Types:
 * - InsuranceAgency (LocalBusiness subtype) - always included
 * - WebPage/Article - always included
 * - BreadcrumbList - when breadcrumbs prop provided
 * - FAQPage - when faqs prop provided (must be visible on page)
 * - WebSite with SearchAction - defined in index.html only (not here)
 * - Service with OfferCatalog - when services prop provided
 * - AggregateRating - ONLY when real reviews are displayed on page
 * - Review - when individual reviews prop provided
 * - HowTo - when howTo prop provided (step-by-step guides)
 * - Speakable - when speakable=true (for voice search)
 */

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ReviewItem {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished?: string;
}

interface ServiceItem {
  name: string;
  description: string;
  url: string;
  provider?: string;
}

interface HowToStep {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

interface HowToData {
  name: string;
  description: string;
  totalTime?: string;
  steps: HowToStep[];
}

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  ogType?: string;
  ogImage?: string;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  noindex?: boolean;
  reviews?: ReviewItem[];
  aggregateRating?: { ratingValue: number; reviewCount: number; bestRating?: number };
  services?: ServiceItem[];
  howTo?: HowToData;
  speakable?: boolean;
  isHomePage?: boolean;
}

export default function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogType = "website",
  ogImage = "https://casurance.net/og-image.jpg",
  breadcrumbs,
  faqs,
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  articleSection,
  noindex = false,
  reviews,
  aggregateRating,
  services,
  howTo,
  speakable = false,
  isHomePage = false,
}: SEOHeadProps) {
  const siteUrl = "https://casurance.net";
  const siteName = "Casurance";
  const fullTitle = isHomePage 
    ? `${siteName} - Commercial Insurance Agency | Business Insurance Quotes`
    : `${title} | ${siteName}`;
  const canonicalUrl = canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`;

  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`
    }))
  } : null;

  const faqSchema = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "Casurance Insurance Agency",
    "description": description,
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "telephone": "+1-323-546-3030",
    "email": "info@casurance.net",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "serviceType": "Commercial Insurance",
    "priceRange": "$$",
    "sameAs": [
      "https://www.linkedin.com/company/casurance",
      "https://twitter.com/casurance"
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-323-546-3030",
      "contactType": "customer service",
      "email": "info@casurance.net",
      "availableLanguage": ["English", "Spanish"]
    }
  };

  // WebPage schema without embedded WebSite (WebSite is defined once in index.html)
  // Using @id reference instead of inline WebSite to avoid duplication
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": ogType === "article" ? "Article" : "WebPage",
    "name": fullTitle,
    "description": description,
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Casurance Insurance Agency",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    ...(articlePublishedTime && { "datePublished": articlePublishedTime }),
    ...(articleModifiedTime && { "dateModified": articleModifiedTime }),
    ...(articleAuthor && { "author": { "@type": "Person", "name": articleAuthor } }),
    ...(articleSection && { "articleSection": articleSection }),
    "inLanguage": "en-US"
  };

  // Note: WebSite schema with site name and SearchAction is defined in index.html per Google guidelines
  // https://developers.google.com/search/docs/appearance/site-names
  // "avoid creating an additional WebSite structured data block on your home page if you can help it"
  const websiteSchema = null;

  const reviewSchema = reviews && reviews.length > 0 ? reviews.map(review => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": 5
    },
    "reviewBody": review.reviewBody,
    ...(review.datePublished && { "datePublished": review.datePublished }),
    "itemReviewed": {
      "@type": "InsuranceAgency",
      "name": "Casurance Insurance Agency"
    }
  })) : null;

  const aggregateRatingSchema = aggregateRating ? {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "Casurance Insurance Agency",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": aggregateRating.ratingValue,
      "reviewCount": aggregateRating.reviewCount,
      "bestRating": aggregateRating.bestRating || 5
    }
  } : null;

  const serviceSchema = services && services.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Commercial Insurance",
    "provider": {
      "@type": "InsuranceAgency",
      "name": "Casurance Insurance Agency",
      "url": siteUrl
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Commercial Insurance Products",
      "itemListElement": services.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description,
          "url": service.url.startsWith('http') ? service.url : `${siteUrl}${service.url}`
        }
      }))
    }
  } : null;

  const howToSchema = howTo ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": howTo.name,
    "description": howTo.description,
    ...(howTo.totalTime && { "totalTime": howTo.totalTime }),
    "step": howTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.url && { "url": step.url.startsWith('http') ? step.url : `${siteUrl}${step.url}` }),
      ...(step.image && { "image": step.image })
    }))
  } : null;

  const speakableSchema = speakable ? {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": fullTitle,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["article", "h1", "h2", ".speakable", "[data-speakable]"]
    },
    "url": canonicalUrl
  } : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots directive */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {/* og:site_name and og:locale are defined in index.html - don't duplicate */}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@casurance" />

      {/* Article Meta Tags */}
      {articlePublishedTime && <meta property="article:published_time" content={articlePublishedTime} />}
      {articleModifiedTime && <meta property="article:modified_time" content={articleModifiedTime} />}
      {articleSection && <meta property="article:section" content={articleSection} />}

      {/* Additional SEO Tags */}
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Casurance Insurance Agency" />
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="Los Angeles" />
      
      {/* Mobile optimization */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="theme-color" content="#0a1628" />

      {/* InsuranceAgency (Business) Schema is defined in index.html - don't duplicate */}

      {/* WebPage/Article Schema */}
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>

      {/* Breadcrumb Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {/* FAQ Schema */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

      {/* WebSite Schema with SearchAction - for homepage only */}
      {websiteSchema && (
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      )}

      {/* Review Schemas */}
      {reviewSchema && reviewSchema.map((review, index) => (
        <script key={`review-${index}`} type="application/ld+json">
          {JSON.stringify(review)}
        </script>
      ))}

      {/* Aggregate Rating Schema */}
      {aggregateRatingSchema && (
        <script type="application/ld+json">
          {JSON.stringify(aggregateRatingSchema)}
        </script>
      )}

      {/* Service Schema */}
      {serviceSchema && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      )}

      {/* HowTo Schema */}
      {howToSchema && (
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
      )}

      {/* Speakable Schema for Voice Search */}
      {speakableSchema && (
        <script type="application/ld+json">
          {JSON.stringify(speakableSchema)}
        </script>
      )}
    </Helmet>
  );
}
