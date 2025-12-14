import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Phone, 
  Mail,
  CheckCircle2,
  Clock,
  Award,
  DollarSign,
  Building2,
  Scale,
  ShieldCheck,
  BadgeCheck,
  ChefHat,
  Wine,
  Utensils,
  Coffee,
  Store,
  Truck,
  Users,
  ChevronRight,
  MapPin,
  Star,
  FileText,
  Flame,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
  "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming"
];

const businessTypes = [
  { icon: Utensils, name: "Fine Dining", description: "White tablecloth establishments" },
  { icon: ChefHat, name: "Casual Dining", description: "Family-style restaurants" },
  { icon: Coffee, name: "Cafes & Coffee Shops", description: "Quick-service beverage establishments" },
  { icon: Store, name: "Fast Casual", description: "Quick-service restaurants" },
  { icon: Wine, name: "Bars & Lounges", description: "Nightlife and beverage-focused venues" },
  { icon: Truck, name: "Food Trucks", description: "Mobile food service operations" },
  { icon: Users, name: "Caterers", description: "Off-premises catering services" },
  { icon: Wine, name: "Nightclubs", description: "Entertainment venues with food & beverage" }
];

const coverageCategories = [
  {
    icon: Scale,
    title: "Liability",
    color: "bg-blue-600",
    items: [
      { name: "General Liability", description: "Protection against third-party bodily injury and property damage claims" },
      { name: "Liquor Liability", description: "Coverage for alcohol-related incidents and claims" },
      { name: "Employment Practices Liability", description: "Protection against wrongful termination, discrimination, and harassment claims" }
    ]
  },
  {
    icon: Building2,
    title: "Property & Business Interruption",
    color: "bg-emerald-600",
    items: [
      { name: "Property Damage", description: "Coverage for your building, equipment, and inventory" },
      { name: "Fire, Theft & Vandalism", description: "Protection against common perils" },
      { name: "Flood & Water Damage", description: "Coverage for water-related losses" },
      { name: "Wind & Hail", description: "Storm damage protection" },
      { name: "Equipment Breakdown", description: "Coverage for kitchen equipment, HVAC, and refrigeration failures" }
    ]
  },
  {
    icon: ShieldCheck,
    title: "Cyber",
    color: "bg-purple-600",
    items: [
      { name: "Cyber Liability", description: "Protection against data breaches and cyber attacks" },
      { name: "Data Compromise", description: "Coverage for customer payment card data breaches" },
      { name: "Incident Response", description: "Expert assistance for handling cyber incidents" }
    ]
  },
  {
    icon: BadgeCheck,
    title: "Workers' Compensation",
    color: "bg-orange-600",
    items: [
      { name: "Medical Expenses", description: "Coverage for employee injuries on the job" },
      { name: "Lost Wages", description: "Income replacement for injured workers" },
      { name: "Rehabilitation Costs", description: "Support for employee recovery and return to work" }
    ]
  }
];

const packageDesignedFor = [
  "Fine Dining",
  "Family/Casual with Full Table Service",
  "Fast Casual",
  "Wine Bars",
  "Off-premises Caterers",
  "Ghost Restaurants"
];

const policyStructure = [
  "Commercial General Liability",
  "Liquor Liability (available in most states)",
  "Impairment Liability (select states)",
  "ISO Occurrence & Claims-Made coverage forms",
  "ISO Liquor Liability coverage",
  "Customized coverage options",
  "Per location aggregate endorsement",
  "Hired & non-owned auto",
  "Blanket additional insured",
  "Employee Benefits Liability",
  "Stop Gap Liability",
  "$10M excess capacity available"
];

const weWelcome = [
  "Incidental Bakery, Market, Retail or Entertainment Exposure",
  "New Ventures Eligible with Prior Experience",
  "Sushi & Raw Bars",
  "Hibachi-style Cooking Exposure"
];

const restaurantTypes = [
  "Buffets", "Delis", "Cafés", "Diners", "Cafeterias", "Drive-ins",
  "Carry-out restaurants", "Fast food", "Coffee shops", "Food bars",
  "Fine dining restaurants", "Family-style", "Luncheonettes", "Sandwich shops", "Bars & Taverns"
];

const propertyCoverages = [
  "Buildings at Replacement Costs or Actual Cash Values",
  "Automatic Increase in Building Amount (inflation guard)",
  "Contents at Replacement Costs or Actual Cash Values",
  "Loss of income & extra expense on an actual loss sustained basis for 12 months",
  "Comprehensive equipment breakdown coverage",
  "Coverage extension to newly acquired buildings and contents",
  "Fire department service charge and extinguisher recharge cost",
  "Debris removal & Pollutant clean up cost",
  "Back up of sewers or drains",
  "Earthquake or earthquake sprinkler leakage",
  "Spoilage Coverage"
];

const crimeCoverages = [
  "Employee Dishonesty",
  "Forgery & Alteration",
  "Money & Securities - both inside and outside of the premises",
  "Money Orders & Counterfeit Currency"
];

const liabilityCoverages = [
  "Operations and Premise liability including parking lot liability",
  "Personal and Advertising injury liability",
  "Products and Completed Operations liability",
  "Contractual and Owners Protective liability",
  "Hired and Non-owned automobile liability",
  "Employee Benefits Liability",
  "Liquor legal liability"
];

const locations = [
  { 
    city: "Los Angeles", 
    state: "California",
    description: "LA's diverse dining scene from Hollywood fine dining to neighborhood taquerias requires specialized coverage for the unique risks of America's second-largest city."
  },
  { 
    city: "San Francisco", 
    state: "California",
    description: "From Michelin-starred restaurants to craft cocktail bars, San Francisco's culinary excellence demands comprehensive protection including earthquake coverage."
  },
  { 
    city: "San Diego", 
    state: "California",
    description: "San Diego's beachfront bars, craft breweries, and farm-to-table restaurants need tailored coverage for coastal risks and tourism-driven operations."
  },
  { 
    city: "Las Vegas", 
    state: "Nevada",
    description: "The Entertainment Capital's restaurants, bars, and nightclubs operate 24/7 and require robust liquor liability and high-volume coverage solutions."
  }
];

const faqs = [
  {
    question: "What types of restaurants do you insure?",
    answer: "We insure all types of food service establishments including fine dining, casual dining, fast casual, cafes, coffee shops, bars, taverns, nightclubs, food trucks, caterers, ghost kitchens, and more. Whether you're a small family restaurant or a large multi-location chain, we have coverage solutions for you."
  },
  {
    question: "Is liquor liability included in restaurant insurance?",
    answer: "Liquor liability is typically a separate coverage that can be added to your restaurant insurance policy. If you serve, sell, or manufacture alcoholic beverages, liquor liability insurance is essential to protect against claims arising from alcohol-related incidents."
  },
  {
    question: "What does business interruption insurance cover for restaurants?",
    answer: "Business interruption insurance covers lost income and ongoing expenses when your restaurant is forced to close due to a covered event like fire, storm damage, or equipment failure. This can include rent, payroll, loan payments, and lost profits during the closure period."
  },
  {
    question: "Do I need workers' compensation for my restaurant?",
    answer: "Yes, workers' compensation is required in almost all states if you have employees. Restaurant workers face unique risks including burns, cuts, slips, and repetitive strain injuries. Workers' comp covers medical expenses and lost wages for injured employees."
  },
  {
    question: "What is food contamination coverage?",
    answer: "Food contamination coverage protects your business from losses due to food spoilage from equipment breakdown, contaminated ingredients, or foodborne illness outbreaks. This includes costs for product recall, business interruption, and reputation repair."
  },
  {
    question: "How much does restaurant insurance cost?",
    answer: "Restaurant insurance costs vary based on factors like location, size, annual revenue, number of employees, type of cuisine, liquor sales percentage, and claims history. A small cafe might pay $2,000-$5,000 annually while a large bar could pay $10,000-$25,000 or more."
  }
];

export default function RestaurantBarIndustryPage() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    businessName: "",
    contactName: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    businessType: "",
    annualRevenue: "",
    liquorPercentage: ""
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/quote-requests", {
        insuranceType: "Restaurant & Bar Insurance",
        businessName: form.businessName,
        contactName: form.contactName,
        email: form.email,
        phone: form.phone,
        state: form.state,
        additionalInfo: {
          city: form.city,
          businessType: form.businessType,
          annualRevenue: form.annualRevenue,
          liquorPercentage: form.liquorPercentage,
          source: "restaurant-bar-industry-page"
        }
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Received!",
        description: "A restaurant insurance specialist will contact you within 1 business day."
      });
      setForm({
        businessName: "",
        contactName: "",
        phone: "",
        email: "",
        city: "",
        state: "",
        businessType: "",
        annualRevenue: "",
        liquorPercentage: ""
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "Please try again or call us at 1-888-254-0089."
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.businessName || !form.email || !form.phone) {
      toast({
        variant: "destructive",
        title: "Required Fields",
        description: "Please fill in all required fields."
      });
      return;
    }
    submitMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Restaurant, Bar & Tavern Insurance | Los Angeles, San Francisco, Las Vegas | Casurance"
        description="Comprehensive restaurant and bar insurance for California and Nevada. Liquor liability, property, workers' comp, and business interruption coverage for restaurants, bars, and taverns."
        keywords="restaurant insurance, bar insurance, tavern insurance, liquor liability, food service insurance, Los Angeles restaurant insurance, San Francisco bar insurance, Las Vegas nightclub insurance"
        canonical="/industry/restaurant-bar-tavern"
      />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0a1628] to-[#1a365d] text-white py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
                  California & Nevada Specialists
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                  Restaurant, Bar & Tavern Insurance
                </h1>
                <p className="text-xl text-gray-300 mb-6">
                  Casurance caters to the insurance needs of today's restaurant owners, offering quality coverage unique to the industry. Designed for full-service fine dining and family restaurants, our value is straightforward—we can better serve you because we specialize in and understand the restaurant industry.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span>Broad Industry-Specific Coverages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span>Competitive Pricing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span>Responsive Claims Service</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild className="bg-amber-500 hover:bg-amber-600 text-white">
                    <Link href="/quote/restaurant">
                      Get a Free Quote <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
                    <a href="tel:1-888-254-0089">
                      <Phone className="mr-2 h-5 w-5" />
                      1-888-254-0089
                    </a>
                  </Button>
                </div>
              </div>
              
              {/* Quick Quote Form */}
              <Card className="bg-white text-foreground" id="quick-quote">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Quick Quote Request</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="businessName">Business Name *</Label>
                        <Input
                          id="businessName"
                          value={form.businessName}
                          onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                          placeholder="Restaurant Name"
                          data-testid="input-business-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactName">Contact Name</Label>
                        <Input
                          id="contactName"
                          value={form.contactName}
                          onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                          placeholder="Your Name"
                          data-testid="input-contact-name"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="(555) 555-5555"
                          data-testid="input-phone"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="email@example.com"
                          data-testid="input-email"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={form.city}
                          onChange={(e) => setForm({ ...form, city: e.target.value })}
                          placeholder="Los Angeles"
                          data-testid="input-city"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Select value={form.state} onValueChange={(v) => setForm({ ...form, state: v })}>
                          <SelectTrigger data-testid="select-state">
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent>
                            {usStates.map(s => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="businessType">Business Type</Label>
                      <Select value={form.businessType} onValueChange={(v) => setForm({ ...form, businessType: v })}>
                        <SelectTrigger data-testid="select-business-type">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fine-dining">Fine Dining</SelectItem>
                          <SelectItem value="casual-dining">Casual Dining</SelectItem>
                          <SelectItem value="fast-casual">Fast Casual</SelectItem>
                          <SelectItem value="bar-tavern">Bar / Tavern</SelectItem>
                          <SelectItem value="nightclub">Nightclub</SelectItem>
                          <SelectItem value="cafe-coffee">Cafe / Coffee Shop</SelectItem>
                          <SelectItem value="food-truck">Food Truck</SelectItem>
                          <SelectItem value="catering">Catering</SelectItem>
                          <SelectItem value="ghost-kitchen">Ghost Kitchen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-primary" 
                      size="lg"
                      disabled={submitMutation.isPending}
                      data-testid="button-submit-quote"
                    >
                      {submitMutation.isPending ? "Submitting..." : "Get My Free Quote"}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Or call us at <a href="tel:1-888-254-0089" className="text-primary font-semibold">1-888-254-0089</a>
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Food & Beverage Businesses We Insure */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Food & Beverage Businesses We Insure</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From quick-service to fine dining, we have specialized coverage for every type of food service establishment.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {businessTypes.map((type, idx) => (
                <Card key={idx} className="text-center hover-elevate">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 mx-auto mb-4 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                      <type.icon className="h-6 w-6 text-amber-600" />
                    </div>
                    <h3 className="font-semibold mb-1">{type.name}</h3>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Package Info Cards */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Restaurant Package Designed For */}
              <Card className="bg-[#1a365d] text-white">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <ChefHat className="h-5 w-5" />
                    </div>
                    <CardTitle>Restaurant Package Designed For</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {packageDesignedFor.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Policy Structure */}
              <Card className="bg-[#0a1628] text-white">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5" />
                    </div>
                    <CardTitle>Policy Structure</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {policyStructure.slice(0, 8).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* We Welcome */}
              <Card className="bg-amber-500 text-white">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <Star className="h-5 w-5" />
                    </div>
                    <CardTitle>We Welcome</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {weWelcome.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm opacity-90 border-t border-white/20 pt-4">
                    No minimum premium. We tailor terms and pricing to every account.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Comprehensive Coverage Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Comprehensive Coverage for Restaurants & Bars</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Protect your food service business with our tailored insurance solutions designed specifically for the hospitality industry.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {coverageCategories.map((category, idx) => (
                <Card key={idx} className="overflow-hidden">
                  <CardHeader className={`${category.color} text-white`}>
                    <div className="flex items-center gap-3">
                      <category.icon className="h-6 w-6" />
                      <CardTitle>{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-3">
                      {category.items.map((item, iIdx) => (
                        <li key={iIdx}>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-medium">{item.name}</span>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Location-Specific Sections */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Restaurant Insurance by Location</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We specialize in restaurant and bar insurance across California and Nevada, with expertise in major metropolitan markets.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {locations.map((loc, idx) => (
                <Card key={idx} className="hover-elevate">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{loc.city} Restaurant & Bar Insurance</CardTitle>
                        <p className="text-sm text-muted-foreground">{loc.state}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{loc.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">General Liability</Badge>
                      <Badge variant="secondary">Liquor Liability</Badge>
                      <Badge variant="secondary">Property</Badge>
                      <Badge variant="secondary">Workers' Comp</Badge>
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/quote/restaurant">
                        Get {loc.city} Quote <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* State Coverage */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-blue-600" />
                    California Restaurant Insurance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    From LA's celebrity hotspots to San Francisco's Michelin-starred establishments, we provide comprehensive coverage for California's diverse restaurant industry including earthquake protection and specialized liquor liability.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Earthquake Coverage Available
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      California Liquor Liability Specialist
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Workers' Comp for Restaurant Staff
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-amber-600" />
                    Nevada Restaurant Insurance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Las Vegas restaurants, bars, and nightclubs require specialized coverage for 24/7 operations, high liquor sales, and entertainment venue exposures. We understand Nevada's unique hospitality market.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      High Liquor Revenue Accounts Welcome
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      24/7 Operation Coverage
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Entertainment Venue Specialist
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Restaurant Types We Insure */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Restaurant Types We Insure</h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {restaurantTypes.map((type, idx) => (
                <Badge key={idx} variant="secondary" className="text-sm py-2 px-4">
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Casurance */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Restaurant Owners Choose Casurance</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Industry Expertise</h3>
                <p className="text-muted-foreground">
                  Our team understands the unique risks facing restaurants and bars, from slip-and-fall claims to liquor liability.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Tailored Policies</h3>
                <p className="text-muted-foreground">
                  We customize coverage based on your specific operation—from ghost kitchens to fine dining establishments.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Competitive Rates</h3>
                <p className="text-muted-foreground">
                  Access to multiple A-rated carriers means we can find the best coverage at the most competitive price.
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Badge className="text-lg py-2 px-4 bg-amber-500">50+ Years Combined Experience</Badge>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Restaurant Insurance FAQs</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="border rounded-lg px-4 bg-background">
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#0a1628] to-[#1a365d] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Restaurant or Bar?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get a free, no-obligation quote tailored to your food service business. Our specialists are ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-amber-500 hover:bg-amber-600">
                <Link href="/quote/restaurant">
                  Get Your Free Quote <ChevronRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
                <a href="tel:1-888-254-0089">
                  <Phone className="h-5 w-5 mr-2" />
                  Call 1-888-254-0089
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
