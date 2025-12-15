import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReligiousOrgHeroQuoteForm from "@/components/ReligiousOrgHeroQuoteForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Church,
  Building2,
  Users,
  Shield,
  Home,
  GraduationCap,
  Heart,
  Star,
  CheckCircle,
  Phone,
  ArrowRight,
  ShieldCheck,
  Banknote,
  FileText,
  Lock,
  Zap,
  Building
} from "lucide-react";

import churchHeroImage from "@assets/stock_images/church_interior_stai_6b566998.jpg";

const institutionTypes = [
  {
    name: "Churches",
    description: "All denominations",
    icon: Church
  },
  {
    name: "Mosques",
    description: "Islamic centers",
    icon: Building2
  },
  {
    name: "Synagogues",
    description: "Jewish congregations",
    icon: Building
  },
  {
    name: "Temples",
    description: "Buddhist, Hindu, and more",
    icon: Building2
  },
  {
    name: "Cathedrals",
    description: "Large worship centers",
    icon: Church
  },
  {
    name: "Religious Schools",
    description: "Faith-based education",
    icon: GraduationCap
  },
  {
    name: "Faith-Based Nonprofits",
    description: "Charitable organizations",
    icon: Heart
  },
  {
    name: "Chapels",
    description: "Small worship spaces",
    icon: Home
  }
];

const coverageCategories = [
  {
    title: "General Liability",
    color: "bg-blue-500",
    icon: Shield,
    items: [
      { name: "Bodily Injury & Property Damage", description: "$1M per occurrence, $3M aggregate" },
      { name: "Sexual Abuse & Molestation", description: "$1M per occurrence coverage" },
      { name: "Volunteer Coverage", description: "Protection for all volunteers" },
      { name: "Fundraising Events", description: "Coverage for church events and activities" }
    ]
  },
  {
    title: "Property Protection",
    color: "bg-amber-500",
    icon: Home,
    items: [
      { name: "Buildings & Contents", description: "Blanket limits coverage" },
      { name: "Stained Glass & Fine Arts", description: "Up to $100,000 coverage" },
      { name: "Equipment Breakdown", description: "HVAC, sound systems, and more" },
      { name: "Business Income", description: "Up to $300,000 coverage" }
    ]
  },
  {
    title: "Management Liability",
    color: "bg-green-500",
    icon: Users,
    items: [
      { name: "Directors & Officers", description: "Protection for church leadership" },
      { name: "Employment Practices", description: "EPLI coverage included" },
      { name: "Clergy Professional", description: "Counseling liability coverage" },
      { name: "Cyber Liability", description: "Data breach protection" }
    ]
  },
  {
    title: "Crime & Fidelity",
    color: "bg-orange-500",
    icon: Lock,
    items: [
      { name: "Employee Dishonesty", description: "Theft by staff or volunteers" },
      { name: "Money & Securities", description: "Collection plate protection" },
      { name: "Forgery Coverage", description: "Check and document fraud" },
      { name: "Computer Fraud", description: "Online financial protection" }
    ]
  }
];

const whyChooseUs = [
  {
    title: "50+ Years Combined Experience",
    description: "Our team has decades of experience insuring religious organizations of all sizes.",
    icon: Star
  },
  {
    title: "Specialized Coverage",
    description: "Policies designed specifically for the unique risks of houses of worship.",
    icon: ShieldCheck
  },
  {
    title: "Competitive Rates",
    description: "Access to multiple A-rated carriers to find you the best value.",
    icon: Banknote
  },
  {
    title: "Claims Support",
    description: "Dedicated claims assistance when you need it most.",
    icon: FileText
  }
];

export default function ReligiousOrgIndustryPage() {
  return (
    <>
      <Helmet>
        <title>Religious Organization Insurance | Churches, Mosques, Synagogues | Casurance</title>
        <meta name="description" content="Comprehensive insurance for churches, mosques, synagogues, temples, and faith-based organizations. Get specialized coverage including property, liability, and abuse protection." />
        <meta name="keywords" content="church insurance, mosque insurance, synagogue insurance, temple insurance, religious organization insurance, house of worship insurance" />
        <link rel="canonical" href="https://casurance.com/industry/religious-organizations" />
        <meta property="og:title" content="Religious Organization Insurance | Casurance" />
        <meta property="og:description" content="Specialized insurance for all types of religious organizations and houses of worship." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />

      <main id="main-content">
        <ReligiousOrgHeroQuoteForm heroImage={churchHeroImage} />

        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Houses of Worship We Serve</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Casurance provides specialized insurance for all types of religious organizations and faith-based institutions.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {institutionTypes.map((institution, index) => (
                <Card 
                  key={index} 
                  className="text-center hover-elevate transition-all"
                  data-testid={`card-institution-${index}`}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <institution.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{institution.name}</h3>
                    <p className="text-sm text-muted-foreground">{institution.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Coverage Options</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our religious organization program covers all your insurance needs in one comprehensive package.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coverageCategories.map((category, index) => (
                <Card 
                  key={index} 
                  className="overflow-hidden"
                  data-testid={`card-coverage-${index}`}
                >
                  <div className={`${category.color} px-6 py-4`}>
                    <div className="flex items-center gap-3">
                      <category.icon className="h-6 w-6 text-white" />
                      <h3 className="text-lg font-bold text-white">{category.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium">{item.name}</span>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
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

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Casurance?</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                We understand the unique needs of religious organizations and provide tailored solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUs.map((reason, index) => (
                <div 
                  key={index} 
                  className="text-center"
                  data-testid={`card-reason-${index}`}
                >
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <reason.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
                  <p className="text-sm opacity-80">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Protect Your Organization?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get a free quote today and discover how we can help protect your house of worship with comprehensive, affordable coverage.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/quote/religious-organization">
                  <Zap className="h-5 w-5 mr-2" />
                  Get Detailed Quote
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:1-888-254-0089">
                  <Phone className="h-5 w-5 mr-2" />
                  1-888-254-0089
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
