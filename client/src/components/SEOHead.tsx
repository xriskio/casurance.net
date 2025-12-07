import { Helmet } from "react-helmet-async";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
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
}: SEOHeadProps) {
  const fullTitle = `${title} | Casurance - Commercial Insurance Agency`;
  const siteUrl = "https://casurance.net";
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
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Casurance Commercial Insurance",
      "url": siteUrl
    }
  };

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
      <meta property="og:site_name" content="Casurance Commercial Insurance" />
      <meta property="og:locale" content="en_US" />

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

      {/* Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify(businessSchema)}
      </script>

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
    </Helmet>
  );
}
