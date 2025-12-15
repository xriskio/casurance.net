import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Phone, 
  Clock, 
  Shield, 
  CheckCircle2, 
  Scale,
  Building2,
  ShieldCheck,
  BadgeCheck,
  Zap,
  Church,
  Users,
  Car,
  Umbrella,
  Lock,
  DollarSign,
  GraduationCap,
  AlertTriangle,
  FileCheck,
  Mail,
  Star
} from "lucide-react";

import propertyImage from "@assets/stock_images/church_interior_stai_6b566998.jpg";
import liabilityImage from "@assets/stock_images/church_exterior_buil_5148c578.jpg";
import managementImage from "@assets/stock_images/priest_pastor_clergy_8032a459.jpg";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];

const WORSHIP_TYPES = [
  "Church",
  "Mosque",
  "Synagogue",
  "Temple",
  "Cathedral",
  "Chapel",
  "Religious School",
  "Faith-Based Nonprofit",
  "Other"
];

export default function ReligiousOrgLanding() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    worshipType: ""
  });

  const handleQuickQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.organizationName || !formData.firstName || !formData.email || !formData.phone || !formData.state) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/quote-requests", {
        insuranceType: "Religious Organization Insurance",
        businessName: formData.organizationName,
        contactName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        state: formData.state,
        additionalInfo: {
          worshipType: formData.worshipType,
          source: "landing-page"
        }
      });

      setFormSubmitted(true);
      toast({
        title: "Quote Request Submitted!",
        description: "We'll contact you within 24 hours with your quote.",
      });
      
      queryClient.invalidateQueries({ queryKey: ["/api/quote-requests"] });
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToQuote = () => {
    document.getElementById("quick-quote-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const coverageCategories = [
    {
      icon: Scale,
      title: "General Liability",
      color: "bg-blue-600",
      items: [
        { name: "Bodily Injury & Property Damage", description: "$1M per occurrence, $3M aggregate" },
        { name: "Sexual Abuse & Molestation", description: "$1M per occurrence coverage" },
        { name: "Volunteer Coverage", description: "Protection for all volunteers" },
        { name: "Fundraising Events", description: "Coverage for church events and activities" }
      ]
    },
    {
      icon: Building2,
      title: "Property Protection",
      color: "bg-emerald-600",
      items: [
        { name: "Buildings & Contents", description: "Blanket limits coverage" },
        { name: "Stained Glass & Fine Arts", description: "Up to $100,000 coverage" },
        { name: "Equipment Breakdown", description: "HVAC, sound systems, and more" },
        { name: "Business Income", description: "Up to $300,000 coverage" }
      ]
    },
    {
      icon: ShieldCheck,
      title: "Management Liability",
      color: "bg-purple-600",
      items: [
        { name: "Directors & Officers", description: "Protection for church leadership" },
        { name: "Employment Practices", description: "EPLI coverage included" },
        { name: "Clergy Professional", description: "Counseling liability coverage" },
        { name: "Cyber Liability", description: "Data breach protection" }
      ]
    },
    {
      icon: BadgeCheck,
      title: "Crime & Fidelity",
      color: "bg-orange-600",
      items: [
        { name: "Employee Dishonesty", description: "Theft by staff or volunteers" },
        { name: "Money & Securities", description: "Collection plate protection" },
        { name: "Forgery Coverage", description: "Check and document fraud" },
        { name: "Computer Fraud", description: "Online financial protection" }
      ]
    }
  ];

  const housesOfWorship = [
    { icon: Church, name: "Churches", description: "All denominations" },
    { icon: Building2, name: "Mosques", description: "Islamic centers" },
    { icon: Building2, name: "Synagogues", description: "Jewish congregations" },
    { icon: Building2, name: "Temples", description: "Buddhist, Hindu, and more" },
    { icon: Church, name: "Cathedrals", description: "Large worship centers" },
    { icon: GraduationCap, name: "Religious Schools", description: "Faith-based education" },
    { icon: Users, name: "Faith-Based Nonprofits", description: "Charitable organizations" },
    { icon: Church, name: "Chapels", description: "Small worship spaces" }
  ];

  const programHighlights = [
    "Up to $10 million umbrella limits available",
    "Defense costs outside limit of liability",
    "$1 million sexual abuse coverage per occurrence",
    "15-passenger van coverage available",
    "Volunteer coverage included",
    "Fundraising events coverage included",
    "Stained glass and fine arts protection",
    "24/7 claims reporting"
  ];

  return (
    <>
      <Helmet>
        <title>Religious Organization Insurance | Churches, Mosques, Temples | Casurance</title>
        <meta name="description" content="Comprehensive insurance for houses of worship. Property, liability, management liability, and cyber coverage for churches, mosques, synagogues, and temples. Free quotes in minutes." />
        <meta name="keywords" content="church insurance, religious organization insurance, mosque insurance, synagogue insurance, temple insurance, nonprofit insurance, houses of worship coverage" />
        <link rel="canonical" href="https://casurance.com/lp/religious-organization" />
        <meta property="og:title" content="Religious Organization Insurance | Casurance" />
        <meta property="og:description" content="Comprehensive coverage for houses of worship. Property, Liability, Management, and Cyber protection. Get your free quote today." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />

      <main className="min-h-screen">
        <section className="relative min-h-[700px] flex items-center">
          <div className="absolute inset-0">
            <img 
              src={propertyImage} 
              alt="Church interior with stained glass" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-4 py-2 mb-6">
                  <Zap className="h-4 w-4 text-amber-400" />
                  <span className="text-amber-300 font-medium text-sm">Trusted by 1,000+ Religious Organizations</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Protect Your Place of Worship with Comprehensive Coverage
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Specialized insurance for churches, mosques, synagogues, temples, and all houses of worship. 
                  Coverage up to $10 million with defense costs outside the limit.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span>All 50 States</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span>All Faiths Welcome</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span>24hr Quotes</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                    onClick={scrollToQuote}
                    data-testid="button-hero-get-quote"
                  >
                    Get Your Free Quote
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                    asChild
                  >
                    <a href="tel:1-888-254-0089">
                      <Phone className="h-4 w-4 mr-2" />
                      1-888-254-0089
                    </a>
                  </Button>
                </div>
              </div>

              <div id="quick-quote-form">
                {formSubmitted ? (
                  <Card className="shadow-2xl">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Quote Request Submitted!</h3>
                      <p className="text-muted-foreground text-lg mb-6">
                        Thank you! One of our specialists will contact you within 24 hours.
                      </p>
                      <Link href="/quote/religious-organization">
                        <Button variant="outline" className="w-full">
                          View Full Coverage Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="shadow-2xl">
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 text-amber-600 mb-2">
                          <Zap className="h-5 w-5" />
                          <span className="font-semibold uppercase tracking-wide text-sm">Free Instant Quote</span>
                        </div>
                        <h2 className="text-2xl font-bold">Get Your Free Quote Now</h2>
                        <p className="text-muted-foreground text-sm">No commitment - Takes 2 minutes</p>
                      </div>

                      <form onSubmit={handleQuickQuote} className="space-y-4">
                        <div>
                          <Label htmlFor="organizationName">Organization Name *</Label>
                          <Input
                            id="organizationName"
                            value={formData.organizationName}
                            onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                            placeholder="Your Church/Temple/Mosque Name"
                            required
                            data-testid="input-lp-organization-name"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                              placeholder="First"
                              required
                              data-testid="input-lp-first-name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                              placeholder="Last"
                              data-testid="input-lp-last-name"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="you@organization.com"
                            required
                            data-testid="input-lp-email"
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="(555) 123-4567"
                            required
                            data-testid="input-lp-phone"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="state">State *</Label>
                            <Select
                              value={formData.state}
                              onValueChange={(value) => setFormData({ ...formData, state: value })}
                            >
                              <SelectTrigger id="state" data-testid="select-lp-state">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                {US_STATES.map((state) => (
                                  <SelectItem key={state} value={state}>
                                    {state}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="worshipType">Type</Label>
                            <Select
                              value={formData.worshipType}
                              onValueChange={(value) => setFormData({ ...formData, worshipType: value })}
                            >
                              <SelectTrigger id="worshipType" data-testid="select-lp-worship-type">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                {WORSHIP_TYPES.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-6 text-lg"
                          disabled={isSubmitting}
                          data-testid="button-lp-get-free-quote"
                        >
                          {isSubmitting ? "Submitting..." : "Get My Free Quote"}
                        </Button>

                        <div className="flex flex-wrap justify-center gap-4 pt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3" />
                            <span>Secure</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <span>No Spam</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>24hr Response</span>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Houses of Worship We Serve</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Casurance provides specialized insurance for all types of religious organizations and faith-based institutions.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {housesOfWorship.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Card key={item.name} className="text-center hover-elevate">
                    <CardContent className="pt-6">
                      <IconComponent className="h-10 w-10 text-primary mx-auto mb-3" />
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Comprehensive Coverage Options</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our religious organization program covers all your insurance needs in one comprehensive package.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coverageCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Card key={category.title} className="overflow-hidden">
                    <div className={`${category.color} p-4 flex items-center gap-3`}>
                      <IconComponent className="h-6 w-6 text-white" />
                      <h3 className="text-xl font-bold text-white">{category.title}</h3>
                    </div>
                    <CardContent className="pt-4">
                      <ul className="space-y-3">
                        {category.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-1 shrink-0" />
                            <div>
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Choose Casurance for Your Religious Organization?</h2>
                <ul className="space-y-4">
                  {programHighlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/quote/religious-organization">
                    <Button size="lg" data-testid="button-view-full-coverage">
                      View Full Coverage Details
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={liabilityImage} 
                  alt="Church exterior" 
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-card rounded-lg shadow-lg p-4 border">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 rounded-full p-2">
                      <Star className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-bold">A+ Rated Carriers</p>
                      <p className="text-sm text-muted-foreground">Trusted insurance partners</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 rounded-full p-6 mb-4">
                  <DollarSign className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Up to $10M</h3>
                <p className="text-muted-foreground">Umbrella Limits Available</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 rounded-full p-6 mb-4">
                  <Shield className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">$1M Abuse Coverage</h3>
                <p className="text-muted-foreground">Per Occurrence Protection</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 rounded-full p-6 mb-4">
                  <Clock className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">24hr Response</h3>
                <p className="text-muted-foreground">Fast Quote Turnaround</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b5998] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Protect Your House of Worship?</h2>
            <p className="text-xl text-white/90 mb-8">
              Get a free, no-obligation quote in minutes. Our specialists understand the unique needs of religious organizations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                onClick={scrollToQuote}
                data-testid="button-cta-get-quote"
              >
                Get Your Free Quote
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                asChild
              >
                <a href="tel:1-888-254-0089">
                  <Phone className="h-4 w-4 mr-2" />
                  Call 1-888-254-0089
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
