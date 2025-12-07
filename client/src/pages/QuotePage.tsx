import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteRequestForm from "@/components/QuoteRequestForm";
import SEOHead from "@/components/SEOHead";
import TrustedCarriers from "@/components/TrustedCarriers";
import { Clock, Shield, Award, CheckCircle, Building2, Car, Users, Briefcase, Home, Zap, FileText, Umbrella } from "lucide-react";
import { Link } from "wouter";

const coverageTypes = [
  { name: "Commercial Auto", href: "/coverages/commercial-auto", icon: Car },
  { name: "General Liability", href: "/coverages/general-liability", icon: Shield },
  { name: "Workers Compensation", href: "/coverages/workers-compensation", icon: Users },
  { name: "Commercial Property", href: "/coverages/commercial-property", icon: Building2 },
  { name: "Professional Liability", href: "/coverages/professional-liability", icon: Briefcase },
  { name: "Cyber Liability", href: "/coverages/cyber-liability", icon: Zap },
  { name: "Directors & Officers", href: "/coverages/directors-officers", icon: FileText },
  { name: "Employment Practices", href: "/coverages/epli", icon: Users },
  { name: "Commercial Umbrella", href: "/coverages/commercial-umbrella", icon: Umbrella },
  { name: "Inland Marine", href: "/coverages/inland-marine", icon: Building2 },
];

const propertyPrograms = [
  { name: "Apartments", href: "/industries/apartments" },
  { name: "Habitational", href: "/industries/habitational" },
  { name: "Condos & HOA", href: "/industries/condo-hoa" },
  { name: "Affordable Housing", href: "/industries/affordable-housing" },
  { name: "Self Storage", href: "/industries/self-storage" },
  { name: "Hotels & Motels", href: "/industries/hotels-motels" },
];

export default function QuotePage() {
  return (
    <>
      <SEOHead
        title="Get Free Commercial Insurance Quote"
        description="Request a free commercial insurance quote from licensed agents. Fast, competitive rates for general liability, workers comp, commercial auto, and 40+ insurance products. 24-hour response time guaranteed."
        keywords="commercial insurance quote, business insurance quote, free insurance quote, commercial auto quote, general liability quote, workers compensation quote"
        canonical="/quote"
      />
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <div className="bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#1e40af] py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              
              <div className="text-white">
                <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Zap className="h-4 w-4" />
                  <span>Fast & Easy Quotes</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Save up to <span className="text-blue-300">20%</span><br />
                  on Commercial<br />
                  Insurance
                </h1>
                
                <p className="text-lg lg:text-xl text-white/80 mb-8 max-w-lg">
                  Get a free, no-obligation quote in under 2 minutes. Flexible payment plans and low down payments available for qualified policies. We work with 27+ A-rated carriers.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/30 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Same-Day Quotes</p>
                      <p className="text-xs text-white/60">Fast turnaround</p>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/30 rounded-full flex items-center justify-center">
                      <Shield className="h-5 w-5 text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">A-Rated Carriers</p>
                      <p className="text-xs text-white/60">Top-tier coverage</p>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/30 rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">15+ Years Experience</p>
                      <p className="text-xs text-white/60">Since 2010</p>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/30 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Licensed Agents</p>
                      <p className="text-xs text-white/60">Expert guidance</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-8">
                  <p className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wide">Coverage Types:</p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {coverageTypes.map((coverage, index) => (
                      <Link 
                        key={index} 
                        href={coverage.href}
                        className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
                        data-testid={`link-coverage-${index}`}
                      >
                        <coverage.icon className="h-3.5 w-3.5 text-blue-400 group-hover:text-blue-300" />
                        {coverage.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/20 pt-6 mt-6">
                  <p className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wide">Property Programs:</p>
                  <div className="flex flex-wrap gap-2">
                    {propertyPrograms.map((program, index) => (
                      <Link 
                        key={index} 
                        href={program.href}
                        className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 py-1.5 text-xs text-white/80 hover:text-white transition-all"
                        data-testid={`link-property-${index}`}
                      >
                        <Home className="h-3 w-3" />
                        {program.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:sticky lg:top-8">
                <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-blue-600 px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-2 text-primary-foreground text-sm font-medium mb-1">
                      <Zap className="h-4 w-4" />
                      Free Instant Quote
                    </div>
                    <h2 className="text-xl font-bold text-white">GET YOUR FREE QUOTE NOW</h2>
                    <p className="text-white/80 text-sm">No commitment required • Takes 2 minutes</p>
                  </div>
                  <div className="p-6">
                    <QuoteRequestForm compact />
                  </div>
                  <div className="px-6 pb-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5" />
                      Secure
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5" />
                      No Spam
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      24hr Response
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main id="main-content" className="flex-1">
        </main>
        <TrustedCarriers />
        <Footer />
      </div>
    </>
  );
}
