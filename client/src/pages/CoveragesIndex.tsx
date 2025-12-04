import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { categories, getCoveragesByCategory } from "@shared/content/coverages";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { getIndustryImage } from "@shared/industryImages";

export default function CoveragesIndex() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b5998] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Commercial Insurance Coverage
            </h1>
            <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
              Explore our comprehensive range of commercial insurance products tailored to protect your business.
            </p>
          </div>
        </div>
      </div>
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {categories.map((category) => {
            const coverages = getCoveragesByCategory(category);
            if (coverages.length === 0) return null;

            return (
              <div key={category} className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coverages.map((coverage) => {
                    const coverageImage = getIndustryImage(coverage.slug);
                    return (
                      <Link key={coverage.slug} href={`/coverage/${coverage.slug}`}>
                        <Card className="h-full cursor-pointer group border hover:border-primary/30 hover:shadow-lg transition-all duration-300" data-testid={`card-coverage-${coverage.slug}`}>
                          {coverageImage && (
                            <div className="relative h-40 overflow-hidden rounded-t-lg">
                              <img
                                src={coverageImage}
                                alt={coverage.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                              <div className="absolute bottom-3 left-4 right-4">
                                <span className="inline-block px-2 py-1 text-xs font-medium bg-white/90 text-[#0a1628] rounded">
                                  {category}
                                </span>
                              </div>
                            </div>
                          )}
                          <CardContent className={coverageImage ? "p-5" : "p-6"}>
                            <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                              {coverage.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                              {coverage.summary}
                            </p>
                            <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                              Learn More
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
