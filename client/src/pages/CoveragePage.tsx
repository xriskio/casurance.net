import { useRoute } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CoverageDetail from "@/components/CoverageDetail";
import { getCoverageBySlug } from "@shared/content/coverages";
import NotFound from "./not-found";
import SEOHead from "@/components/SEOHead";

export default function CoveragePage() {
  const [, params] = useRoute("/coverage/:slug");
  const slug = params?.slug;

  if (!slug) {
    return <NotFound />;
  }

  const coverage = getCoverageBySlug(slug);

  if (!coverage) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title={`${coverage.title} Insurance`}
        description={coverage.summary || `Learn about ${coverage.title} insurance coverage options. Get comprehensive protection for your business with Casurance.`}
        keywords={`${coverage.title.toLowerCase()} insurance, ${coverage.category?.toLowerCase() || 'commercial'} insurance, business insurance`}
        canonical={`/coverage/${coverage.slug}`}
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <CoverageDetail coverage={coverage} />
      </main>
      <Footer />
    </div>
  );
}
