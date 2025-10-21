import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-6">
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary-foreground">Trusted by 500+ California Businesses</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Commercial Insurance Solutions for Your Business
          </h1>
          
          <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Protect your business with comprehensive coverage from California's most trusted independent insurance agency. Get competitive quotes in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/quote">
              <Button size="lg" variant="secondary" className="group" data-testid="button-request-quote">
                Request a Quote
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="tel:18882540089">
              <Button size="lg" variant="outline" className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20" data-testid="button-call-us">
                <Phone className="mr-2 h-4 w-4" />
                Call 1-888-254-0089
              </Button>
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary-foreground mb-1">20+</div>
              <div className="text-sm text-primary-foreground/80">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-foreground mb-1">A+</div>
              <div className="text-sm text-primary-foreground/80">BBB Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-foreground mb-1">50+</div>
              <div className="text-sm text-primary-foreground/80">Top Carriers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
