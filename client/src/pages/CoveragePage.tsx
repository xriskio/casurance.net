import { useRoute } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CoverageDetail from "@/components/CoverageDetail";
import { getCoverageBySlug } from "@shared/content/coverages";
import NotFound from "./not-found";

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
      <Header />
      <main className="flex-1">
        <CoverageDetail coverage={coverage} />
      </main>
      <Footer />
    </div>
  );
}
