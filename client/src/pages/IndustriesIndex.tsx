import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { industries } from "@shared/content/coverages";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function IndustriesIndex() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Industries We Serve
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized insurance solutions tailored to the unique needs of your industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <Link key={industry.slug} href={`/industry/${industry.slug}`}>
                <Card className="h-full hover-elevate cursor-pointer" data-testid={`card-industry-${industry.slug}`}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      {industry.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {industry.summary}
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
      </main>
      <Footer />
    </div>
  );
}
