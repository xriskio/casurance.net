import { useState } from "react";
import { Megaphone, Building2, Home, ChevronRight, Shield, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const commercialSuccesses = [
  { business: "Non-profit Community Organization", coverage: "Package, Accident, D&O/EPLI", premium: 86543 },
  { business: "Non-profit Goodwill", coverage: "Package and D&O", premium: 85421 },
  { business: "Affordable Housing", coverage: "Commercial Package", premium: 62550 },
  { business: "Temp Staffing Agency", coverage: "Package and Umbrella", premium: 52949 },
  { business: "Mental Health Clinic", coverage: "Package and Umbrella", premium: 49579 },
  { business: "Home Healthcare", coverage: "Commercial Package", premium: 49441 },
  { business: "Condo Association in CA", coverage: "HOA Package", premium: 44714 },
  { business: "Private School", coverage: "Package and Umbrella", premium: 35427 },
  { business: "Premises Environmental E&S", coverage: "E&S Coverage", premium: 25694 },
  { business: "Stand-alone Excess (E&S)", coverage: "Excess Liability", premium: 24523 },
  { business: "Church", coverage: "Package and D&O/EPLI", premium: 17543 },
  { business: "Camp Operator", coverage: "Package and Umbrella", premium: 16975 },
  { business: "Craft Brewery", coverage: "Commercial Package", premium: 16541 },
  { business: "Stand-alone Private Company EPLI", coverage: "EPLI Only", premium: 10562 },
  { business: "Fitness Studio", coverage: "Commercial Package", premium: 9516 },
  { business: "Amateur Sports League", coverage: "Package, Umbrella, Accident", premium: 8428 },
];

const personalSuccesses = [
  { 
    property: "Beverly Hills Estate", 
    location: "Beverly Hills, CA", 
    coverage: "High Value Home - Brush Area", 
    premium: 19000,
    highlight: "High Brush Fire Zone"
  },
  { 
    property: "Luxury Estate", 
    location: "Orange, CA", 
    coverage: "High Value Home - Brush Area", 
    premium: 14500,
    highlight: "High Brush Fire Zone"
  },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function SuccessStories() {
  const [activeTab, setActiveTab] = useState("commercial");

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Megaphone className="h-4 w-4" />
            <span>Real Results for Real Businesses</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how we've helped businesses and homeowners secure comprehensive coverage at competitive rates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-2xl mx-auto">
          <div className="bg-card rounded-xl p-6 border border-border text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-full mb-3">
              <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{commercialSuccesses.length}+</div>
            <p className="text-sm text-muted-foreground">Commercial Packages Placed</p>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500/10 rounded-full mb-3">
              <Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">Brush Zone</div>
            <p className="text-sm text-muted-foreground">High Value Home Specialists</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="commercial" className="flex items-center gap-2" data-testid="tab-commercial">
              <Building2 className="h-4 w-4" />
              Commercial Lines
            </TabsTrigger>
            <TabsTrigger value="personal" className="flex items-center gap-2" data-testid="tab-personal">
              <Home className="h-4 w-4" />
              Personal Lines
            </TabsTrigger>
          </TabsList>

          <TabsContent value="commercial" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {commercialSuccesses.map((item, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-lg p-4 border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 group"
                  data-testid={`success-commercial-${index}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors">
                      {item.business}
                    </h4>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                  <p className="text-sm text-primary font-medium">{item.coverage}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="personal" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {personalSuccesses.map((item, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                  data-testid={`success-personal-${index}`}
                >
                  <div className="absolute top-0 right-0 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-semibold px-3 py-1 rounded-bl-lg uppercase tracking-wide">
                    {item.highlight}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Home className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.property}
                      </h4>
                      <p className="text-sm text-muted-foreground">{item.location}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{item.coverage}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(item.premium)}
                    </span>
                    <span className="text-xs text-muted-foreground">Annual Premium</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                Specializing in high-value homes in brush and wildfire areas across California
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-10">
          <p className="text-sm text-muted-foreground italic">
            *Examples shown are actual placed policies. Results may vary based on coverage needs and risk factors.
          </p>
        </div>
      </div>
    </section>
  );
}
