import { Router, Request, Response } from "express";
import { db } from "../db";
import { blogPosts, pressReleases, cmsPages } from "@shared/schema";
import { eq, isNotNull } from "drizzle-orm";
import { coverages, industries } from "@shared/content/coverages";
import { allLocations, insuranceTypes } from "@shared/content/locations";

const router = Router();

const SITE_URL = "https://casurance.net";

// Static routes that should be in the sitemap
const staticRoutes = [
  { url: "/", priority: "1.0", changefreq: "daily" },
  { url: "/quote", priority: "0.9", changefreq: "weekly" },
  { url: "/coverages", priority: "0.8", changefreq: "weekly" },
  { url: "/middle-market", priority: "0.8", changefreq: "weekly" },
  { url: "/industries", priority: "0.8", changefreq: "weekly" },
  { url: "/locations", priority: "0.8", changefreq: "weekly" },
  { url: "/personal-lines", priority: "0.8", changefreq: "weekly" },
  { url: "/blog", priority: "0.8", changefreq: "daily" },
  { url: "/press-releases", priority: "0.7", changefreq: "weekly" },
  { url: "/about", priority: "0.7", changefreq: "monthly" },
  { url: "/contact", priority: "0.7", changefreq: "monthly" },
  { url: "/service", priority: "0.7", changefreq: "monthly" },
  { url: "/accessibility", priority: "0.5", changefreq: "monthly" },
  { url: "/liquor-store-insurance", priority: "0.9", changefreq: "weekly" },
  { url: "/workers-comp-california-nevada", priority: "0.9", changefreq: "weekly" },
  { url: "/builders-risk-insurance", priority: "0.9", changefreq: "weekly" },
  { url: "/auto-services-insurance", priority: "0.9", changefreq: "weekly" },
  { url: "/geico-commercial-auto", priority: "0.9", changefreq: "weekly" },
  { url: "/geico-private-passenger", priority: "0.9", changefreq: "weekly" },
  { url: "/bristol-west-commercial-auto", priority: "0.9", changefreq: "weekly" },
  { url: "/bristol-west-private-passenger", priority: "0.9", changefreq: "weekly" },
  { url: "/berkshire-hathaway-commercial-auto", priority: "0.9", changefreq: "weekly" },
  { url: "/uber-black-insurance", priority: "0.9", changefreq: "weekly" },
  { url: "/restaurant-bar-insurance", priority: "0.9", changefreq: "weekly" },
  { url: "/technology-insurance", priority: "0.9", changefreq: "weekly" },
  { url: "/manufacturing-insurance", priority: "0.9", changefreq: "weekly" },
  { url: "/chubb-special-programs", priority: "0.9", changefreq: "weekly" },
  { url: "/partners/chubb", priority: "0.9", changefreq: "weekly" },
  { url: "/partners/chubb-bop", priority: "0.9", changefreq: "weekly" },
  { url: "/partners/chubb-workers-comp", priority: "0.9", changefreq: "weekly" },
  { url: "/partners/chubb-umbrella", priority: "0.9", changefreq: "weekly" },
  { url: "/partners/chubb-cyber", priority: "0.9", changefreq: "weekly" },
];

// Quote and application form routes (exact paths from App.tsx)
const quoteRoutes = [
  "/quote/commercial-auto",
  "/quote/general-liability",
  "/quote/workers-compensation",
  "/quote/habitational",
  "/quote/trucking",
  "/quote/hotel",
  "/quote/restaurant",
  "/quote/builders-risk",
  "/quote/vacant-building",
  "/quote/crane-riggers",
  "/quote/religious-organization",
  "/quote/commercial-property",
  "/quote/cyber-liability",
  "/quote/employment-practices",
  "/quote/professional-liability",
  "/quote/construction-casualty",
  "/quote/ocean-cargo",
  "/quote/self-storage",
  "/quote/film-production",
  "/quote/product-liability",
  "/quote/security-services",
  "/quote/high-value-home",
  "/quote/commercial-flood",
  "/quote/commercial-earthquake",
  "/quote/franchised-dealers",  // CORRECTED: plural
  "/quote/garage-service-centers",  // CORRECTED: full name
  "/quote/auto-dealer-garage",
  "/quote/golf-country-club",
  "/quote/limousine",
  "/quote/taxi",  // CORRECTED: just "taxi" not "taxi-black-car"
  "/quote/public-transportation",
  "/quote/fair-plan",  // California FAIR Plan quote form
  "/apply/nemt",  // CORRECTED: /apply/ not /quote/
  "/apply/ambulance",  // CORRECTED: /apply/ not /quote/
  "/apply/tnc-rideshare",  // CORRECTED: /apply/ not /quote/ and "tnc-rideshare"
].map(url => ({ url, priority: "0.9", changefreq: "weekly" }));

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function formatDate(date: Date | string | null): string {
  if (!date) return new Date().toISOString().split('T')[0];
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
}

router.get("/sitemap.xml", async (req: Request, res: Response) => {
  try {
    // Fetch dynamic content from database
    const [publishedBlogs, publishedPressReleases, publishedCmsPages] = await Promise.all([
      db.select().from(blogPosts).where(isNotNull(blogPosts.publishedAt)),
      db.select().from(pressReleases).where(isNotNull(pressReleases.publishedAt)),
      db.select().from(cmsPages).where(eq(cmsPages.isPublished, "true")),
    ]);

    // Industries and coverages are imported from shared/content/coverages.ts

    // Build sitemap XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static routes
    for (const route of staticRoutes) {
      xml += '  <url>\n';
      xml += `    <loc>${SITE_URL}${route.url}</loc>\n`;
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;
      xml += `    <lastmod>${formatDate(new Date())}</lastmod>\n`;
      xml += '  </url>\n';
    }

    // Add quote form routes
    for (const route of quoteRoutes) {
      xml += '  <url>\n';
      xml += `    <loc>${SITE_URL}${route.url}</loc>\n`;
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;
      xml += `    <lastmod>${formatDate(new Date())}</lastmod>\n`;
      xml += '  </url>\n';
    }

    // Add blog posts
    for (const post of publishedBlogs) {
      xml += '  <url>\n';
      xml += `    <loc>${SITE_URL}/blog/${escapeXml(post.slug)}</loc>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `    <lastmod>${formatDate(post.publishedAt || post.createdAt)}</lastmod>\n`;
      xml += '  </url>\n';
    }

    // Add press releases
    for (const release of publishedPressReleases) {
      xml += '  <url>\n';
      xml += `    <loc>${SITE_URL}/press-releases/${escapeXml(release.slug)}</loc>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `    <lastmod>${formatDate(release.publishedAt || release.createdAt)}</lastmod>\n`;
      xml += '  </url>\n';
    }

    // Add CMS pages
    for (const page of publishedCmsPages) {
      xml += '  <url>\n';
      xml += `    <loc>${SITE_URL}/page/${escapeXml(page.slug)}</loc>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `    <lastmod>${formatDate(page.updatedAt || page.createdAt)}</lastmod>\n`;
      xml += '  </url>\n';
    }

    // Add industry pages (note: routes use singular /industry/:slug)
    for (const industry of industries) {
      xml += '  <url>\n';
      xml += `    <loc>${SITE_URL}/industry/${escapeXml(industry.slug)}</loc>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `    <lastmod>${formatDate(new Date())}</lastmod>\n`;
      xml += '  </url>\n';
    }

    // Add coverage pages (note: routes use singular /coverage/:slug)
    for (const coverage of coverages) {
      xml += '  <url>\n';
      xml += `    <loc>${SITE_URL}/coverage/${escapeXml(coverage.slug)}</loc>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `    <lastmod>${formatDate(new Date())}</lastmod>\n`;
      xml += '  </url>\n';
    }

    // Add location pages (city + insurance type combinations)
    for (const location of allLocations) {
      for (const insurance of insuranceTypes) {
        xml += '  <url>\n';
        xml += `    <loc>${SITE_URL}/location/${escapeXml(location.slug)}/${escapeXml(insurance.slug)}</loc>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `    <lastmod>${formatDate(new Date())}</lastmod>\n`;
        xml += '  </url>\n';
      }
    }

    xml += '</urlset>';

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).send("Error generating sitemap");
  }
});

export default router;
