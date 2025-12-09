import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Shield, 
  Car, 
  FileCheck, 
  Clock, 
  Users, 
  CheckCircle2,
  Building2,
  Star,
  Award,
  Zap,
  FileText,
  HeadphonesIcon,
  MapPin
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const availableStates = [
  { abbr: "CA", name: "California", highlight: true },
  { abbr: "NV", name: "Nevada", highlight: true },
  { abbr: "AZ", name: "Arizona", highlight: true },
];

const vehicleTypes = [
  {
    title: "Luxury Sedans",
    examples: "Lincoln Continental, Cadillac CT6, Mercedes S-Class, BMW 7 Series",
    icon: Car
  },
  {
    title: "Premium SUVs",
    examples: "Cadillac Escalade, Lincoln Navigator, Mercedes GLS, BMW X7",
    icon: Car
  },
  {
    title: "Executive Vehicles",
    examples: "Audi A8, Genesis G90, Lexus LS, Mercedes E-Class",
    icon: Car
  },
  {
    title: "Electric Luxury",
    examples: "Tesla Model S, Tesla Model X, Lucid Air, Mercedes EQS",
    icon: Zap
  },
  {
    title: "Stretch Limousines",
    examples: "Lincoln MKT Stretch, Cadillac Escalade Stretch, Chrysler 300 Limo",
    icon: Car
  },
  {
    title: "Executive Sprinters",
    examples: "Mercedes Sprinter Executive, Luxury Sprinter Vans",
    icon: Car
  },
  {
    title: "Ultra-Luxury Imports",
    examples: "Bentley, Rolls-Royce, Maybach, Range Rover",
    icon: Star
  },
  {
    title: "Airport Black Cars",
    examples: "Town Cars, Executive Sedans, Chauffeur Vehicles",
    icon: Building2
  }
];

const coverages = [
  {
    title: "Commercial Auto Liability",
    description: "Comprehensive protection up to $1.5M combined single limit covering third-party bodily injury, property damage, and legal defense costs if you're involved in an at-fault accident.",
    icon: Shield
  },
  {
    title: "Comprehensive & Collision",
    description: "Full physical damage coverage for your luxury vehicle whether you own or lease. Covers collision damage, theft, vandalism, fire, weather events, and more with flexible deductible options.",
    icon: Car
  },
  {
    title: "Hired & Non-Owned Auto",
    description: "Essential coverage for substitute vehicles while your primary vehicle is being serviced. Protects you when using rental or borrowed vehicles for business purposes.",
    icon: FileCheck
  },
  {
    title: "Uninsured/Underinsured Motorist",
    description: "Protection when other drivers lack adequate insurance. Covers your medical expenses and vehicle damage when the at-fault party cannot pay.",
    icon: Users
  }
];

const whyChooseUs = [
  {
    title: "TCP Gap Coverage",
    description: "Complete protection from app-on to ride complete, covering gaps in Uber's commercial coverage",
    icon: Shield
  },
  {
    title: "Competitive Rates",
    description: "Affordable pricing specifically tailored for luxury rideshare and livery operators",
    icon: Award
  },
  {
    title: "Fast Quote Turnaround",
    description: "Receive your customized quote within 24 hours with quick policy binding available",
    icon: Clock
  },
  {
    title: "Next Day CPUC Filings",
    description: "California CPUC filings submitted the next business day once your policy is bound",
    icon: FileText
  },
  {
    title: "Same Day Certificates",
    description: "Certificates of Insurance and Auto ID cards issued same day for immediate compliance",
    icon: Zap
  },
  {
    title: "Fleet Discounts",
    description: "Multi-vehicle discounts available for operators with 2+ luxury vehicles",
    icon: Car
  },
  {
    title: "A-Rated Carriers",
    description: "Coverage through top-rated insurance carriers for maximum financial security",
    icon: Star
  },
  {
    title: "24/7 Claims Support",
    description: "Round-the-clock claims assistance to get you back on the road quickly",
    icon: HeadphonesIcon
  }
];

const requirements = [
  "Must carry commercial auto insurance (personal auto does not qualify)",
  "Vehicle must meet Uber Black luxury standards (black exterior, leather interior)",
  "Vehicle must be no more than 5 years old",
  "Drivers must maintain a high star rating (typically 4.85+)",
  "Vehicle must pass Uber's vehicle inspection requirements",
  "Valid TCP authority required in California"
];

const faqs = [
  {
    question: "How much does Uber Black insurance cost?",
    answer: "Rates vary based on your location, vehicle type, driving history, and coverage needs. Contact Casurance at 1-888-254-0089 for a personalized quote tailored to your specific situation. We work with multiple carriers to find you the most competitive rates available for your luxury vehicle."
  },
  {
    question: "Does Uber Black insurance qualify as commercial auto insurance?",
    answer: "Yes. Our Uber Black policies are full commercial auto insurance policies that meet all Uber requirements and state regulations. Unlike personal auto with a rideshare endorsement, our policies are specifically designed for professional livery operations and satisfy TCP requirements."
  },
  {
    question: "What vehicles qualify for Uber Black?",
    answer: "Uber Black requires luxury vehicles with black exterior and leather interior, typically no more than 5 years old. Popular qualifying vehicles include Cadillac CT6/Escalade, Lincoln Continental/Navigator, Mercedes S-Class, BMW 7 Series, Audi A8, Tesla Model S/X, and other premium vehicles."
  },
  {
    question: "How quickly can I get my CPUC or state filings?",
    answer: "Once your policy is bound, we submit CPUC filings (California) and other state filings the next business day. Certificates of Insurance and Auto ID cards are issued same day, so you can get on the road and start earning quickly."
  },
  {
    question: "Can I also drive for Uber Black SUV with this insurance?",
    answer: "Yes! Our commercial auto insurance covers both Uber Black (sedan) and Uber Black SUV services. Just ensure your vehicle meets the platform requirements for each service tier you want to operate."
  },
  {
    question: "Why can't I use personal auto insurance for Uber Black?",
    answer: "Unlike standard Uber X, personal auto insurance policies explicitly exclude coverage for commercial livery operations like Uber Black. This creates dangerous coverage gaps that could leave you personally liable. Commercial auto insurance is required by Uber and state regulations for professional transportation services."
  }
];

export default function UberBlackInsuranceLanding() {
  return (
    <>
      <SEOHead
        title="Uber Black Insurance | Commercial Auto Coverage for Luxury Rideshare | Casurance"
        description="Specialized commercial auto insurance for Uber Black and Uber Black SUV drivers in California, Nevada, and Arizona. Get comprehensive liability, collision, and TCP gap coverage for your luxury vehicle. Call 1-888-254-0089."
        keywords="Uber Black insurance, commercial auto insurance, luxury rideshare insurance, TCP insurance, livery insurance, black car insurance, Uber Black SUV insurance, California, Nevada, Arizona"
        canonical="https://casurance.com/uber-black-insurance"
        ogType="website"
      />
      
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdi02aC02djZoNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 text-sm px-4 py-1">
                Special Programs - Commercial Auto
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Uber Black Insurance for{" "}
                <span className="text-primary">Professional Drivers</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Drive with confidence knowing your luxury vehicle and livelihood are protected. 
                Commercial auto coverage specifically designed for Uber Black, Uber Black SUV, 
                and premium rideshare operators.
              </p>
              
              {/* State Availability */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {availableStates.map((state) => (
                  <Badge 
                    key={state.abbr}
                    variant="outline" 
                    className="text-lg px-4 py-2 bg-white/10 border-white/30 text-white"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    {state.name}
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
                  asChild
                >
                  <Link href="/commercial-auto-insurance">
                    <FileCheck className="mr-2 h-5 w-5" />
                    Get Your Free Quote
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10"
                  asChild
                >
                  <a href="tel:1-888-254-0089">
                    <Phone className="mr-2 h-5 w-5" />
                    Call 1-888-254-0089
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What is Uber Black Insurance */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                What is Uber Black Insurance, and Do You Need It?
              </h2>
              
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p>
                  Uber Black insurance is specialized commercial auto coverage designed for professional 
                  drivers using luxury vehicles on the Uber Black platform. Unlike standard rideshare services, 
                  <strong className="text-foreground"> your personal auto policy does not qualify you to drive for Uber Black</strong>—you 
                  must carry commercial auto insurance to meet platform and state requirements.
                </p>
                
                <p>
                  Personal auto insurance policies typically exclude coverage for commercial livery operations. 
                  This creates a dangerous gap that could leave you personally liable for accidents, vehicle damage, 
                  and passenger injuries while working. Without proper commercial coverage, a single incident could 
                  result in devastating financial consequences.
                </p>
                
                <p>
                  Casurance's Uber Black insurance bridges this gap completely. From the moment you turn on the app 
                  until the ride is complete, you're fully protected against third-party claims, vehicle damage, 
                  and liability—even if you're at fault. Our policies meet all Uber requirements and state 
                  regulations for TCP (Transportation Charter-Party) operations.
                </p>
              </div>
              
              {/* Requirements Card */}
              <Card className="mt-10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                    Uber Black Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Coverage Includes */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comprehensive Coverage for Luxury Rideshare
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our Uber Black insurance policies include everything you need to operate professionally and safely.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {coverages.map((coverage, index) => (
                <Card key={index} className="hover-elevate">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <coverage.icon className="h-6 w-6 text-primary" />
                      </div>
                      {coverage.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{coverage.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Additional Coverage List */}
            <div className="mt-12 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Additional Coverage Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      "Personal Injury Protection (PIP)",
                      "Gap Coverage for Leased Vehicles",
                      "Zero Deductible Glass Coverage",
                      "Medical Payments Coverage",
                      "Rental Reimbursement",
                      "Towing & Labor Coverage"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Luxury Vehicles We Insure */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Luxury Vehicles We Insure
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We specialize in insuring premium vehicles that meet Uber Black and Uber Black SUV 
                platform requirements. Our policies cover a wide range of luxury and executive transportation vehicles.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {vehicleTypes.map((vehicle, index) => (
                <Card key={index} className="text-center hover-elevate">
                  <CardHeader className="pb-2">
                    <div className="w-14 h-14 mx-auto rounded-full bg-gray-900 flex items-center justify-center mb-3">
                      <vehicle.icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-lg">{vehicle.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{vehicle.examples}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Casurance */}
        <section className="py-16 lg:py-24 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Casurance for Uber Black Coverage?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                With decades of experience insuring limousines, black cars, and transportation network companies, 
                we understand what it takes to keep you on the road and protected.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {whyChooseUs.map((item, index) => (
                <Card key={index} className="bg-white/5 border-white/10 text-white hover-elevate">
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg text-white">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* State Availability */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Coverage Available in California, Nevada & Arizona
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Casurance provides Uber Black and luxury rideshare insurance across these western states. 
                Get protected no matter where you operate.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {availableStates.map((state) => (
                <Card key={state.abbr} className="text-center hover-elevate border-primary/20">
                  <CardHeader>
                    <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-3xl font-bold text-primary">{state.abbr}</span>
                    </div>
                    <CardTitle className="text-2xl">{state.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Uber Black Coverage
                      </li>
                      <li className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Uber Black SUV Coverage
                      </li>
                      <li className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        {state.abbr === "CA" ? "CPUC/TCP Filings" : "State Compliance"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Protect Your Uber Black Business?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get a free, no-obligation quote for your Uber Black or luxury rideshare vehicle. 
                Our specialists understand the unique needs of premium transportation operators and 
                can help you find the right coverage at a competitive price.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="text-lg px-8 py-6"
                  asChild
                >
                  <Link href="/commercial-auto-insurance">
                    <FileCheck className="mr-2 h-5 w-5" />
                    Start Your Quote
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 border-white text-white hover:bg-white/10"
                  asChild
                >
                  <a href="tel:1-888-254-0089">
                    <Phone className="mr-2 h-5 w-5" />
                    Call 1-888-254-0089
                  </a>
                </Button>
              </div>
              
              <p className="mt-8 text-sm opacity-75">
                Casurance Insurance Agency | CA License #6005562<br />
                714 W Olympic Blvd Suite 906, Los Angeles, CA 90015
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
