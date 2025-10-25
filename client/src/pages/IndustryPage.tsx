import { useRoute } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CoverageDetail from "@/components/CoverageDetail";
import { getCoverageBySlug } from "@shared/content/coverages";
import NotFound from "./not-found";

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
      <Header />
      <main className="flex-1">
        <CoverageDetail coverage={industry} />
      </main>
      <Footer />
    </div>
  );
}
