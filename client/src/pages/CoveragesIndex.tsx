import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { categories, getCoveragesByCategory } from "@shared/content/coverages";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function CoveragesIndex() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Commercial Insurance Coverage
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive range of commercial insurance products tailored to protect your business.
            </p>
          </div>

          {categories.map((category) => {
            const coverages = getCoveragesByCategory(category);
            if (coverages.length === 0) return null;

            return (
              <div key={category} className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coverages.map((coverage) => (
                    <Link key={coverage.slug} href={`/coverage/${coverage.slug}`}>
                      <Card className="h-full hover-elevate cursor-pointer" data-testid={`card-coverage-${coverage.slug}`}>
                        <CardContent className="p-6">
                          <h3 className="font-semibold text-lg text-foreground mb-2">
                            {coverage.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                            {coverage.summary}
                          </p>
                          <div className="flex items-center text-primary text-sm font-medium">
                            Learn More
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
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
