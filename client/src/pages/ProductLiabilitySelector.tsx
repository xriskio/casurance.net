import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Shield, Factory, Leaf, Cigarette, Target, Wrench, Package, UtensilsCrossed } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const productTypes = [
  {
    id: "general-manufacturing",
    title: "General Manufacturing & Distribution",
    description: "Comprehensive coverage for manufacturers and distributors of various products",
    icon: Factory,
    path: "/quote/product-liability/general"
  },
  {
    id: "cannabis-hemp",
    title: "Cannabis - Hemp/CBD Products",
    description: "Specialized coverage for hemp and CBD product manufacturers and distributors",
    icon: Leaf,
    path: "/quote/product-liability/cannabis-hemp"
  },
  {
    id: "cannabis-thc",
    title: "Cannabis - Marijuana/THC Products",
    description: "Coverage for THC and marijuana product manufacturers and distributors",
    icon: Leaf,
    path: "/quote/product-liability/cannabis-thc"
  },
  {
    id: "firearms",
    title: "Firearms Retail & Manufacturing",
    description: "Specialized coverage for firearms retailers, manufacturers, and distributors",
    icon: Target,
    path: "/quote/product-liability/firearms"
  },
  {
    id: "ecig-tobacco",
    title: "Electronic Cigarette & Tobacco Products",
    description: "Coverage for electronic cigarettes, vaping products, and tobacco items",
    icon: Cigarette,
    path: "/quote/product-liability/ecig-tobacco"
  },
  {
    id: "machine-shop",
    title: "Machine Shop Operations",
    description: "Specialized coverage for machine shops and precision manufacturing",
    icon: Wrench,
    path: "/quote/product-liability/machine-shop"
  },
  {
    id: "amusement-device",
    title: "Amusement Device Products",
    description: "Coverage for amusement device manufacturers and operators",
    icon: UtensilsCrossed,
    path: "/quote/product-liability/amusement-device"
  },
  {
    id: "discontinued-products",
    title: "Discontinued Products/Operations",
    description: "Coverage for discontinued products and ceased operations",
    icon: Package,
    path: "/quote/product-liability/discontinued"
  }
];

export default function ProductLiabilitySelector() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Product Liability Insurance Quote"
        description="Get product liability insurance quotes for manufacturers, distributors, and retailers. Coverage for general manufacturing, cannabis products, firearms, and specialty products."
        keywords="product liability insurance, manufacturer insurance, product recall, product defect coverage"
        canonical="/quote/product-liability"
      />
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">
            Product Liability Insurance Quote
          </h1>
          <p className="text-muted-foreground" data-testid="text-page-description">
            Select your product type to get started with your comprehensive insurance application
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {productTypes.map((productType) => {
            const Icon = productType.icon;
            return (
              <Card 
                key={productType.id} 
                className="hover-elevate cursor-pointer transition-all"
                onClick={() => setLocation(productType.path)}
                data-testid={`card-product-type-${productType.id}`}
              >
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg" data-testid={`text-product-title-${productType.id}`}>
                      {productType.title}
                    </CardTitle>
                    <CardDescription data-testid={`text-product-description-${productType.id}`}>
                      {productType.description}
                    </CardDescription>
                  </div>
                  <div className="p-3 rounded-md bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full" 
                    variant="default"
                    data-testid={`button-select-${productType.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLocation(productType.path);
                    }}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Not sure which product type applies to you?{" "}
            <Button 
              variant="ghost" 
              className="p-0 h-auto underline text-primary" 
              onClick={() => setLocation("/")}
              data-testid="link-contact-us"
            >
              Contact us for assistance
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
