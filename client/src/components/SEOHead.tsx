import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  ogType?: string;
  ogImage?: string;
}

export default function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogType = "website",
  ogImage = "https://casurance.com/og-image.jpg",
}: SEOHeadProps) {
  const fullTitle = `${title} | Casurance - Commercial Insurance Agency`;
  const siteUrl = "https://casurance.com";
  const canonicalUrl = canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Casurance Commercial Insurance" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Casurance Insurance Agency" />
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="Los Angeles" />

      {/* Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "InsuranceAgency",
          "name": "Casurance Insurance Agency",
          "description": description,
          "url": siteUrl,
          "telephone": "+1-323-546-3030",
          "email": "info@casurance.com",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "CA",
            "addressCountry": "US"
          },
          "areaServed": [
            "Alabama", "Arizona", "Arkansas", "California", "Delaware",
            "Florida", "Georgia", "Illinois", "Indiana", "Kentucky",
            "Louisiana", "Michigan", "Minnesota", "Missouri", "Nevada"
          ],
          "serviceType": "Commercial Insurance",
          "priceRange": "$$"
        })}
      </script>
    </Helmet>
  );
}
