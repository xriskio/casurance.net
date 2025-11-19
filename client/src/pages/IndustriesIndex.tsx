import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { industries } from "@shared/content/coverages";
import { getIndustryImage } from "@shared/industryImages";
import { Link, useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function IndustriesIndex() {
  const [, setLocation] = useLocation();
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const handleIndustrySelect = (slug: string) => {
    setSelectedIndustry(slug);
    if (slug && slug !== "all") {
      setLocation(`/industry/${slug}`);
    } else if (slug === "all") {
      // Stay on current page - already showing all industries
      setSelectedIndustry("");
    }
  };

  // Sort industries alphabetically by title
  const sortedIndustries = [...industries].sort((a, b) => a.title.localeCompare(b.title));

  // Featured industries to showcase (first 3 from sorted list)
  const featuredIndustries = sortedIndustries.slice(0, 3);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Learn about our expertise in your industry.
              </h1>
              <p className="text-lg text-primary-foreground/90 mb-8">
                We provide specialized insurance solutions tailored to the unique risks and challenges of your business.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <Select value={selectedIndustry} onValueChange={handleIndustrySelect}>
                  <SelectTrigger 
                    className="bg-background text-foreground h-12 text-base" 
                    data-testid="select-industry-hero"
                  >
                    <SelectValue placeholder="Choose your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortedIndustries.map((industry) => (
                      <SelectItem key={industry.slug} value={industry.slug}>
                        {industry.title}
                      </SelectItem>
                    ))}
                    <SelectItem value="all">All Industries</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions by Industry Section */}
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-12">
            Solutions by Industry
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Industry List - Left Column */}
            <div className="lg:col-span-4">
              <div className="space-y-1">
                {sortedIndustries.map((industry, index) => (
                  <Link key={industry.slug} href={`/industry/${industry.slug}`}>
                    <div
                      className={`px-4 py-3 rounded-md hover-elevate cursor-pointer transition-colors ${
                        index === 0 ? 'text-primary font-medium border-b-2 border-primary' : 'text-foreground'
                      }`}
                      data-testid={`link-industry-sidebar-${industry.slug}`}
                    >
                      {industry.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured Industry Showcases - Right Column */}
            <div className="lg:col-span-8">
              <div className="space-y-8">
                {featuredIndustries.map((industry) => {
                  const industryImage = getIndustryImage(industry.slug);
                  return (
                    <Link key={industry.slug} href={`/industry/${industry.slug}`}>
                      <Card className="overflow-hidden hover-elevate cursor-pointer" data-testid={`card-featured-${industry.slug}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <div className="aspect-video md:aspect-square relative overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                            {industryImage ? (
                              <img 
                                src={industryImage} 
                                alt={industry.title}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <div className="text-center p-8">
                                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                                    <ArrowRight className="h-8 w-8 text-primary" />
                                  </div>
                                  <p className="text-sm font-medium text-muted-foreground">
                                    {industry.title}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                          <CardContent className="p-6 flex flex-col justify-center">
                            <h3 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
                              {industry.title}
                              <ArrowRight className="h-5 w-5" />
                            </h3>
                            <p className="text-muted-foreground line-clamp-4">
                              {industry.description}
                            </p>
                          </CardContent>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>

              {/* View All Industries CTA */}
              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Explore all {industries.length} industries we serve and find the perfect coverage for your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
