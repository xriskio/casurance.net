import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Shield, 
  Building2, 
  Briefcase, 
  Umbrella, 
  Lock,
  ArrowRight,
  CheckCircle2,
  Award,
  Globe,
  Phone,
  Star,
  Users,
  FileText
} from "lucide-react";

const chubbProducts = [
  {
    title: "Business Owner's Policy (BOP)",
    slug: "chubb-bop",
    icon: Building2,
    description: "Comprehensive property and liability protection bundled for small to mid-sized businesses. Get bindable quotes in minutes with Chubb Express Quote.",
    highlights: [
      "Nearly 400 eligible business classes",
      "Express Quote available",
      "Property and liability bundled",
      "Business income coverage"
    ],
    color: "from-blue-600 to-blue-800"
  },
  {
    title: "Workers' Compensation",
    slug: "chubb-workers-comp",
    icon: Users,
    description: "Protect your employees and business with comprehensive workers' compensation coverage backed by Chubb's claims expertise and risk management services.",
    highlights: [
      "Competitive rates",
      "Risk management services",
      "Return-to-work programs",
      "Claims advocacy"
    ],
    color: "from-green-600 to-green-800"
  },
  {
    title: "Commercial Umbrella",
    slug: "chubb-umbrella",
    icon: Umbrella,
    description: "Extra liability protection that goes beyond your primary policies. Essential coverage for businesses facing significant liability exposure.",
    highlights: [
      "Excess liability limits",
      "Broad coverage territory",
      "Drop-down coverage",
      "Defense cost coverage"
    ],
    color: "from-purple-600 to-purple-800"
  },
  {
    title: "Cyber Liability",
    slug: "chubb-cyber",
    icon: Lock,
    description: "Protect your business from cyber threats, data breaches, and digital risks with Chubb's industry-leading cyber insurance solutions.",
    highlights: [
      "Data breach response",
      "Business interruption",
      "Cyber extortion coverage",
      "24/7 incident response"
    ],
    color: "from-red-600 to-red-800"
  }
];

const whyChubb = [
  {
    icon: Award,
    title: "Financial Strength",
    description: "Chubb is the world's largest publicly traded P&C insurer with A++ (Superior) AM Best rating"
  },
  {
    icon: Globe,
    title: "Global Expertise",
    description: "Operating in 54 countries and territories with local knowledge and global resources"
  },
  {
    icon: Shield,
    title: "Claims Excellence",
    description: "Industry-leading claims handling with dedicated adjusters and fast resolution"
  },
  {
    icon: FileText,
    title: "Broad Coverage",
    description: "Comprehensive policies with fewer exclusions and more protection for your business"
  }
];

const eligibleIndustries = [
  "Professional Services",
  "Healthcare & Medical",
  "Technology & IT",
  "Financial Services",
  "Manufacturing",
  "Retail & Wholesale",
  "Life Sciences",
  "Food Manufacturing",
  "Cultural Institutions",
  "Clubs & Associations"
];

export default function ChubbPartnersLanding() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "Casurance - Authorized Chubb Agent",
    "description": "Casurance is an Authorized Chubb Agent offering Business Owner's Policy (BOP), Workers' Compensation, Commercial Umbrella, and Cyber Liability insurance for businesses nationwide.",
    "url": "https://casurance.net/partners/chubb",
    "telephone": "+1-888-254-0089",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "714 W Olympic Blvd Suite 906",
      "addressLocality": "Los Angeles",
      "addressRegion": "CA",
      "postalCode": "90015",
      "addressCountry": "US"
    },
    "makesOffer": chubbProducts.map(product => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": `Chubb ${product.title}`,
        "description": product.description
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>Chubb Insurance Partner | Authorized Chubb Agent | Casurance</title>
        <meta name="description" content="Casurance is an Authorized Chubb Agent offering BOP, Workers' Comp, Umbrella, and Cyber insurance. Get comprehensive commercial coverage from the world's largest P&C insurer." />
        <meta name="keywords" content="Chubb insurance, Chubb agent, business owners policy, workers compensation, commercial umbrella, cyber liability, Chubb BOP, authorized agent" />
        <link rel="canonical" href="https://casurance.net/partners/chubb" />
        <meta property="og:title" content="Chubb Insurance Partner | Authorized Chubb Agent | Casurance" />
        <meta property="og:description" content="Access Chubb's industry-leading commercial insurance products through Casurance. BOP, Workers' Comp, Umbrella, and Cyber coverage available." />
        <meta property="og:url" content="https://casurance.net/partners/chubb" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main id="main-content">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-[#003366] via-[#004080] to-[#0066b3] text-white py-20 md:py-28 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0xMHY2aDZ2LTZoLTZ6bTAgMTB2Nmg2di02aC02em0tMTAgMHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
                  <Award className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm font-medium">Authorized Chubb Agent</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="text-hero-title">
                  Chubb Insurance Solutions
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto" data-testid="text-hero-subtitle">
                  Access world-class commercial insurance from the world's largest publicly traded property and casualty insurer through your trusted local agent.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-lg px-4 py-2">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span>A++ AM Best Rating</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-lg px-4 py-2">
                    <Globe className="h-5 w-5 text-blue-300" />
                    <span>54 Countries</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-lg px-4 py-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    <span>$200B+ Assets</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a href="#products">
                    <Button size="lg" className="bg-white text-[#003366] hover:bg-white/90 w-full sm:w-auto" data-testid="button-explore-products">
                      Explore Products <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <a href="tel:18882540089">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto" data-testid="button-call-hero">
                      <Phone className="mr-2 h-4 w-4" /> 1-888-254-0089
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Products Section */}
          <section id="products" className="py-16 md:py-24 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-products-title">
                  Chubb Commercial Insurance Products
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive coverage solutions for businesses of all sizes, backed by Chubb's financial strength and claims expertise.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {chubbProducts.map((product, index) => (
                  <Card key={index} className="hover-elevate overflow-hidden" data-testid={`card-product-${product.slug}`}>
                    <div className={`bg-gradient-to-r ${product.color} p-6 text-white`}>
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-lg">
                          <product.icon className="h-8 w-8" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{product.title}</h3>
                          <span className="text-white/80 text-sm">Chubb Insurance</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">{product.description}</p>
                      <ul className="space-y-2 mb-6">
                        {product.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      <Link href={`/partners/${product.slug}`}>
                        <Button className="w-full" data-testid={`button-learn-more-${product.slug}`}>
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Why Chubb Section */}
          <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-why-chubb-title">
                  Why Choose Chubb?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Chubb stands apart with unmatched financial strength, global expertise, and a commitment to exceptional claims service.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {whyChubb.map((reason, index) => (
                  <Card key={index} className="text-center p-6" data-testid={`card-reason-${index}`}>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <reason.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold mb-2">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground">{reason.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Eligible Industries */}
          <section className="py-16 bg-[#003366] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-industries-title">
                  Industries We Serve
                </h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  Chubb provides specialized coverage for a wide range of business types and industries.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {eligibleIndustries.map((industry, index) => (
                  <div 
                    key={index} 
                    className="bg-white/10 backdrop-blur rounded-lg p-4 text-center hover:bg-white/20 transition-colors"
                    data-testid={`industry-${index}`}
                  >
                    <Briefcase className="h-6 w-6 mx-auto mb-2 text-white/80" />
                    <span className="text-sm font-medium">{industry}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-cta-title">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Contact Casurance today to learn more about Chubb insurance solutions for your business. Our experienced agents will help you find the right coverage.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/quote">
                  <Button size="lg" data-testid="button-get-quote-cta">
                    Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a href="tel:18882540089">
                  <Button size="lg" variant="outline" data-testid="button-call-cta">
                    <Phone className="mr-2 h-4 w-4" /> 1-888-254-0089
                  </Button>
                </a>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                714 W Olympic Blvd Suite 906, Los Angeles, CA 90015 | CA License #6005562
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
