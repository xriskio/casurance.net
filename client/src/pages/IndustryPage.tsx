import { useRoute } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CoverageDetail from "@/components/CoverageDetail";
import { getCoverageBySlug } from "@shared/content/coverages";
import NotFound from "./not-found";
import SEOHead from "@/components/SEOHead";

export default function IndustryPage() {
  const [, params] = useRoute("/industry/:slug");
  const slug = params?.slug;

  if (!slug) {
    return <NotFound />;
  }

  const industry = getCoverageBySlug(slug);

  if (!industry) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title={`${industry.title} Insurance`}
        description={industry.summary || `Learn about insurance solutions for the ${industry.title} industry. Get comprehensive coverage tailored to your business needs.`}
        keywords={`${industry.title.toLowerCase()} insurance, industry insurance, business insurance, commercial insurance`}
        canonical={`/industry/${industry.slug}`}
      />
      <Header />
      <main id="main-content" className="flex-1">
        <CoverageDetail coverage={industry} />
      </main>
      <Footer />
    </div>
  );
}
