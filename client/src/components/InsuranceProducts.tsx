import { Card, CardContent } from "@/components/ui/card";
import { Building2, Car, Shield, Users, Home, Truck, Zap, Lock } from "lucide-react";

const products = [
  {
    icon: Shield,
    title: "General Liability",
    description: "Protect your business from claims of bodily injury, property damage, and advertising injury.",
  },
  {
    icon: Users,
    title: "Workers Compensation",
    description: "Required coverage for employee injuries and illnesses that occur on the job.",
  },
  {
    icon: Car,
    title: "Commercial Auto",
    description: "Coverage for vehicles used in your business operations, including cars, trucks, and vans.",
  },
  {
    icon: Building2,
    title: "Business Owners Policy (BOP)",
    description: "Bundled coverage combining property and liability protection for small to medium businesses.",
  },
  {
    icon: Home,
    title: "Commercial Property",
    description: "Protection for your business building, equipment, inventory, and other physical assets.",
  },
  {
    icon: Truck,
    title: "Truck & Trucking",
    description: "Specialized coverage for commercial trucking operations and transportation businesses.",
  },
  {
    icon: Zap,
    title: "Cyber Liability",
    description: "Protection against data breaches, cyber attacks, and digital business interruptions.",
  },
  {
    icon: Lock,
    title: "Professional Liability",
    description: "Errors and omissions coverage for professional services and advice-based businesses.",
  },
];

export default function InsuranceProducts() {
  return (
    <section className="py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Commercial Insurance Coverage
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive protection tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <Card key={index} className="hover-elevate cursor-pointer" data-testid={`card-product-${index}`}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{product.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
