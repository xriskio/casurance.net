import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { categories, getCoveragesByCategory } from "@shared/content/coverages";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import constructionImg from "@assets/stock_images/commercial_construct_058fad45.jpg";
import professionalImg from "@assets/stock_images/business_professiona_81c0d3eb.jpg";
import cyberImg from "@assets/stock_images/cybersecurity_data_p_2ea9d9c7.jpg";
import healthcareImg from "@assets/stock_images/healthcare_medical_p_0d98da02.jpg";
import manufacturingImg from "@assets/stock_images/manufacturing_factor_ff9ac498.jpg";
import energyImg from "@assets/stock_images/energy_power_plant_i_b3f4b432.jpg";
import environmentalImg from "@assets/stock_images/environmental_nature_b719c171.jpg";
import restaurantImg from "@assets/stock_images/restaurant_food_serv_2b46c7dd.jpg";

const getCoverageImage = (title: string, category: string): string => {
  const titleLower = title.toLowerCase();
  const categoryLower = category.toLowerCase();
  
  if (titleLower.includes("construction") || titleLower.includes("builder")) {
    return constructionImg;
  }
  if (titleLower.includes("cyber")) {
    return cyberImg;
  }
  if (titleLower.includes("health") || titleLower.includes("medical") || titleLower.includes("allied health")) {
    return healthcareImg;
  }
  if (titleLower.includes("energy")) {
    return energyImg;
  }
  if (titleLower.includes("environmental")) {
    return environmentalImg;
  }
  if (titleLower.includes("manufacturing") || titleLower.includes("product")) {
    return manufacturingImg;
  }
  if (titleLower.includes("restaurant") || titleLower.includes("hospitality")) {
    return restaurantImg;
  }
  if (categoryLower.includes("professional")) {
    return professionalImg;
  }
  
  return professionalImg;
};

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
                  {coverages.map((coverage) => {
                    const imageUrl = getCoverageImage(coverage.title, category);
                    return (
                      <Link key={coverage.slug} href={`/coverage/${coverage.slug}`}>
                        <Card className="h-full hover-elevate cursor-pointer overflow-hidden" data-testid={`card-coverage-${coverage.slug}`}>
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={imageUrl} 
                              alt={coverage.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <h3 className="absolute bottom-4 left-4 right-4 font-semibold text-xl text-white">
                              {coverage.title}
                            </h3>
                          </div>
                          <CardContent className="p-6">
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
