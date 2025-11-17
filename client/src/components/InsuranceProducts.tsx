import { Card, CardContent } from "@/components/ui/card";
import generalLiabilityImg from "@assets/stock_images/business_storefront__13355656.jpg";
import workersCompImg from "@assets/stock_images/workers_compensation_4558873f.jpg";
import commercialAutoImg from "@assets/stock_images/delivery_van_commerc_5fbbbbba.jpg";
import businessOwnersImg from "@assets/stock_images/business_owners_offi_bcbeb4ef.jpg";
import commercialPropertyImg from "@assets/stock_images/commercial_property__6f849862.jpg";
import truckingImg from "@assets/stock_images/trucking_semi_truck__ad45ae4c.jpg";
import cyberLiabilityImg from "@assets/stock_images/cyber_security_data__4564571e.jpg";
import professionalLiabilityImg from "@assets/stock_images/professional_liabili_7a573a51.jpg";

const products = [
  {
    image: generalLiabilityImg,
    title: "General Liability",
    description: "Protect your business from claims of bodily injury, property damage, and advertising injury.",
  },
  {
    image: workersCompImg,
    title: "Workers Compensation",
    description: "Required coverage for employee injuries and illnesses that occur on the job.",
  },
  {
    image: commercialAutoImg,
    title: "Commercial Auto",
    description: "Coverage for vehicles used in your business operations, including cars, trucks, and vans.",
  },
  {
    image: businessOwnersImg,
    title: "Business Owners Policy (BOP)",
    description: "Bundled coverage combining property and liability protection for small to medium businesses.",
  },
  {
    image: commercialPropertyImg,
    title: "Commercial Property",
    description: "Protection for your business building, equipment, inventory, and other physical assets.",
  },
  {
    image: truckingImg,
    title: "Truck & Trucking",
    description: "Specialized coverage for commercial trucking operations and transportation businesses.",
  },
  {
    image: cyberLiabilityImg,
    title: "Cyber Liability",
    description: "Protection against data breaches, cyber attacks, and digital business interruptions.",
  },
  {
    image: professionalLiabilityImg,
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
            return (
              <Card key={index} className="hover-elevate cursor-pointer overflow-hidden" data-testid={`card-product-${index}`}>
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={`${product.title} insurance coverage`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
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
