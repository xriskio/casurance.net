import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Phone, 
  Mail, 
  Clock, 
  Shield, 
  CheckCircle2, 
  Scale,
  Building2,
  ShieldCheck,
  BadgeCheck,
  Zap,
  ChefHat,
  Wine,
  Utensils,
  Coffee,
  Store,
  Truck,
  Users,
  FileText,
  ArrowRight,
  Star
} from "lucide-react";

import restaurantImage from "@assets/stock_images/modern_restaurant_in_af57fd7e.jpg";
import restaurantImage2 from "@assets/stock_images/fine_dining_restaura_f0b03829.jpg";
import barImage from "@assets/stock_images/bar_tavern_nightlife_4a7ab196.jpg";
import barImage2 from "@assets/stock_images/bar_tavern_nightlife_b63f37f0.jpg";

export default function RestaurantBarInsuranceLanding() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    state: "",
    businessType: "",
    annualRevenue: "",
    employees: "",
    comments: ""
  });

  const handleQuickQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.businessName || !formData.email || !formData.phone) {
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
        insuranceType: "Restaurant & Bar Insurance",
        businessName: formData.businessName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        state: formData.state,
        additionalInfo: {
          businessType: formData.businessType,
          annualRevenue: formData.annualRevenue,
          employees: formData.employees,
          comments: formData.comments
        }
      });

      toast({
        title: "Quote Request Submitted!",
        description: "We'll contact you within 24 hours with your quote.",
      });

      setFormData({
        businessName: "",
        contactName: "",
        email: "",
        phone: "",
        state: "",
        businessType: "",
        annualRevenue: "",
        employees: "",
        comments: ""
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

  const packageDesignedFor = [
    "Fine Dining",
    "Family/Casual with Full Table Service",
    "Fast Casual",
    "Wine Bars",
    "Off-premises Caterers",
    "Ghost Restaurants"
  ];

  const weWelcome = [
    "Incidental Bakery, Market, Retail or Entertainment Exposure",
    "New Ventures Eligible with Prior Experience",
    "Sushi & Raw Bars",
    "Hibachi-style Cooking Exposure"
  ];

  const policyFeatures = [
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

  return (
    <>
      <Helmet>
        <title>Restaurant & Bar Insurance | Casurance Commercial Insurance</title>
        <meta name="description" content="Comprehensive insurance coverage for restaurants, bars, and food service establishments. Get General Liability, Liquor Liability, Property, Cyber, and Workers' Comp coverage. Free quotes in minutes." />
        <meta name="keywords" content="restaurant insurance, bar insurance, liquor liability, food service insurance, commercial insurance, workers compensation restaurant" />
        <link rel="canonical" href="https://casurance.com/restaurant-bar-insurance" />
        <meta property="og:title" content="Restaurant & Bar Insurance | Casurance" />
        <meta property="og:description" content="Comprehensive coverage for restaurants and bars. Liability, Property, Cyber, and Workers' Comp. Get your free quote today." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[700px] flex items-center">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img 
              src={restaurantImage} 
              alt="Modern restaurant interior" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
          </div>

          <div className="relative z-10 container mx-auto px-4 py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="text-white">
                <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <ChefHat className="w-4 h-4" />
                  <span>Restaurant & Bar Specialists</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" data-testid="text-hero-title">
                  Restaurant & Bar
                  <span className="text-amber-400 block">Insurance Coverage</span>
                </h1>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
                  From fine dining to fast casual, bars to brewpubs - we provide comprehensive 
                  insurance solutions tailored for the food and beverage industry.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-6 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                    onClick={scrollToQuote}
                    data-testid="button-hero-quote"
                  >
                    Get a Free Quote
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10"
                    asChild
                  >
                    <a href="tel:888-254-0089" data-testid="link-call-hero">
                      <Phone className="mr-2 w-5 h-5" />
                      888-254-0089
                    </a>
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
                    <span>A-Rated Carriers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
                    <span>24-Hour Quotes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
                    <span>50 States Coverage</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Quick Quote Form */}
              <div id="quick-quote-form" className="bg-gradient-to-b from-blue-900 to-blue-950 rounded-2xl overflow-hidden shadow-2xl">
                {/* Form Header */}
                <div className="bg-blue-900 text-center py-6 px-4">
                  <div className="flex items-center justify-center gap-2 text-amber-400 mb-2">
                    <Zap className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-wider">Free Instant Quote</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2" data-testid="text-quick-quote-title">
                    GET YOUR FREE QUOTE NOW
                  </h2>
                  <p className="text-blue-200 text-sm">No commitment required - Takes 2 minutes</p>
                </div>

                {/* Form Body */}
                <div className="bg-white p-6 lg:p-8">
                  <div className="flex items-center gap-2 mb-4 text-blue-900">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">Quick Quote Form</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-6">Complete the form below for a fast quote.</p>

                  <form onSubmit={handleQuickQuote} className="space-y-4">
                    <div>
                      <Label htmlFor="businessName" className="text-gray-900 font-medium">Business Name *</Label>
                      <Input
                        id="businessName"
                        placeholder="Your Restaurant/Bar Name"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="mt-1 bg-white border-gray-300"
                        data-testid="input-business-name"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-gray-900 font-medium">Your Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="First"
                          value={formData.contactName.split(' ')[0] || ''}
                          onChange={(e) => {
                            const lastName = formData.contactName.split(' ').slice(1).join(' ');
                            setFormData({ ...formData, contactName: `${e.target.value} ${lastName}`.trim() });
                          }}
                          className="mt-1 bg-white border-gray-300"
                          data-testid="input-first-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-gray-900 font-medium invisible">Last</Label>
                        <Input
                          id="lastName"
                          placeholder="Last"
                          value={formData.contactName.split(' ').slice(1).join(' ') || ''}
                          onChange={(e) => {
                            const firstName = formData.contactName.split(' ')[0] || '';
                            setFormData({ ...formData, contactName: `${firstName} ${e.target.value}`.trim() });
                          }}
                          className="mt-1 bg-white border-gray-300"
                          data-testid="input-last-name"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-900 font-medium">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@restaurant.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 bg-white border-gray-300"
                        data-testid="input-email"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-gray-900 font-medium">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1 bg-white border-gray-300"
                        data-testid="input-phone"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="state" className="text-gray-900 font-medium">State *</Label>
                        <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                          <SelectTrigger className="mt-1 bg-white border-gray-300" data-testid="select-state">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AL">Alabama</SelectItem>
                            <SelectItem value="AK">Alaska</SelectItem>
                            <SelectItem value="AZ">Arizona</SelectItem>
                            <SelectItem value="AR">Arkansas</SelectItem>
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="CO">Colorado</SelectItem>
                            <SelectItem value="CT">Connecticut</SelectItem>
                            <SelectItem value="DE">Delaware</SelectItem>
                            <SelectItem value="FL">Florida</SelectItem>
                            <SelectItem value="GA">Georgia</SelectItem>
                            <SelectItem value="HI">Hawaii</SelectItem>
                            <SelectItem value="ID">Idaho</SelectItem>
                            <SelectItem value="IL">Illinois</SelectItem>
                            <SelectItem value="IN">Indiana</SelectItem>
                            <SelectItem value="IA">Iowa</SelectItem>
                            <SelectItem value="KS">Kansas</SelectItem>
                            <SelectItem value="KY">Kentucky</SelectItem>
                            <SelectItem value="LA">Louisiana</SelectItem>
                            <SelectItem value="ME">Maine</SelectItem>
                            <SelectItem value="MD">Maryland</SelectItem>
                            <SelectItem value="MA">Massachusetts</SelectItem>
                            <SelectItem value="MI">Michigan</SelectItem>
                            <SelectItem value="MN">Minnesota</SelectItem>
                            <SelectItem value="MS">Mississippi</SelectItem>
                            <SelectItem value="MO">Missouri</SelectItem>
                            <SelectItem value="MT">Montana</SelectItem>
                            <SelectItem value="NE">Nebraska</SelectItem>
                            <SelectItem value="NV">Nevada</SelectItem>
                            <SelectItem value="NH">New Hampshire</SelectItem>
                            <SelectItem value="NJ">New Jersey</SelectItem>
                            <SelectItem value="NM">New Mexico</SelectItem>
                            <SelectItem value="NY">New York</SelectItem>
                            <SelectItem value="NC">North Carolina</SelectItem>
                            <SelectItem value="ND">North Dakota</SelectItem>
                            <SelectItem value="OH">Ohio</SelectItem>
                            <SelectItem value="OK">Oklahoma</SelectItem>
                            <SelectItem value="OR">Oregon</SelectItem>
                            <SelectItem value="PA">Pennsylvania</SelectItem>
                            <SelectItem value="RI">Rhode Island</SelectItem>
                            <SelectItem value="SC">South Carolina</SelectItem>
                            <SelectItem value="SD">South Dakota</SelectItem>
                            <SelectItem value="TN">Tennessee</SelectItem>
                            <SelectItem value="TX">Texas</SelectItem>
                            <SelectItem value="UT">Utah</SelectItem>
                            <SelectItem value="VT">Vermont</SelectItem>
                            <SelectItem value="VA">Virginia</SelectItem>
                            <SelectItem value="WA">Washington</SelectItem>
                            <SelectItem value="WV">West Virginia</SelectItem>
                            <SelectItem value="WI">Wisconsin</SelectItem>
                            <SelectItem value="WY">Wyoming</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="businessType" className="text-gray-900 font-medium">Business Type</Label>
                        <Select value={formData.businessType} onValueChange={(value) => setFormData({ ...formData, businessType: value })}>
                          <SelectTrigger className="mt-1 bg-white border-gray-300" data-testid="select-business-type">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fine-dining">Fine Dining</SelectItem>
                            <SelectItem value="casual-dining">Casual Dining</SelectItem>
                            <SelectItem value="fast-food">Fast Food</SelectItem>
                            <SelectItem value="cafe">Cafe / Coffee Shop</SelectItem>
                            <SelectItem value="bar-tavern">Bar / Tavern</SelectItem>
                            <SelectItem value="brewpub">Brewpub / Wine Bar</SelectItem>
                            <SelectItem value="food-truck">Food Truck</SelectItem>
                            <SelectItem value="catering">Catering</SelectItem>
                            <SelectItem value="ghost-kitchen">Ghost Kitchen</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full text-lg py-6 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                      disabled={isSubmitting}
                      data-testid="button-quick-quote-submit"
                    >
                      {isSubmitting ? "Submitting..." : "Get My Free Quote"}
                    </Button>
                  </form>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-around items-center text-center">
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-600">Secure</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-600">No Spam</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-600">24hr Response</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Types We Serve */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Food & Beverage Businesses We Insure
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From quick-service to fine dining, we have specialized coverage for every type of food service establishment.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {businessTypes.map((type, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <type.icon className="w-7 h-7 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{type.name}</h3>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Restaurant Package Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Package Designed For */}
              <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <ChefHat className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Restaurant Package Designed For</h3>
                </div>
                <ul className="space-y-3">
                  {packageDesignedFor.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Policy Structure */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Policy Structure</h3>
                </div>
                <ul className="space-y-3">
                  {policyFeatures.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* We Welcome */}
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">We Welcome</h3>
                </div>
                <ul className="space-y-3">
                  {weWelcome.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-white/30">
                  <p className="text-sm text-white/90">
                    No minimum premium. We tailor terms and pricing to every account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coverage Categories Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Comprehensive Coverage for Restaurants & Bars
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Protect your food service business with our tailored insurance solutions designed specifically for the hospitality industry.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {coverageCategories.map((category, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className={`${category.color} p-6 flex items-center gap-4`}>
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-4">
                      {category.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-semibold text-gray-900">{item.name}</span>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Gallery Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative rounded-2xl overflow-hidden h-80">
                <img 
                  src={restaurantImage2} 
                  alt="Restaurant dining area" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">Restaurant Coverage</h3>
                    <p className="text-gray-300">Comprehensive protection for dining establishments of all sizes</p>
                  </div>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden h-80">
                <img 
                  src={barImage} 
                  alt="Bar and tavern interior" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">Bar & Tavern Coverage</h3>
                    <p className="text-gray-300">Specialized liquor liability and nightlife venue protection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Why Restaurant Owners Choose Casurance
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Industry Expertise</h3>
                      <p className="text-gray-600">Our team understands the unique risks facing restaurants and bars, from slip-and-fall claims to liquor liability.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Tailored Policies</h3>
                      <p className="text-gray-600">We customize coverage based on your specific operation - from ghost kitchens to fine dining establishments.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Star className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Competitive Rates</h3>
                      <p className="text-gray-600">Access to multiple A-rated carriers means we can find the best coverage at the most competitive price.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={barImage2} 
                  alt="Bar atmosphere" 
                  className="rounded-2xl shadow-xl w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-amber-500 text-slate-900 p-6 rounded-xl shadow-lg">
                  <div className="text-4xl font-bold">50+</div>
                  <div className="font-semibold">Years Combined Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Protect Your Restaurant or Bar?
            </h2>
            <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
              Get a customized quote in minutes. Our restaurant insurance specialists are standing by to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                onClick={scrollToQuote}
                data-testid="button-cta-quote"
              >
                Get Your Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10"
                asChild
              >
                <a href="tel:888-254-0089" data-testid="link-call-cta">
                  <Phone className="mr-2 w-5 h-5" />
                  Call 888-254-0089
                </a>
              </Button>
            </div>

            {/* License Info */}
            <div className="mt-10 pt-8 border-t border-white/20">
              <p className="text-white/80">CA License #6005562</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
