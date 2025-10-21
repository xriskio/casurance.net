import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "wouter";

export default function CallToAction() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
          Ready to Protect Your Business?
        </h2>
        <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
          Get a customized quote from our expert team. Quick, easy, and competitive rates guaranteed.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/quote">
            <Button size="lg" variant="secondary" className="group" data-testid="button-get-quote-cta">
              Request Your Quote
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <a href="tel:18882540089">
            <Button size="lg" variant="outline" className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20" data-testid="button-call-cta">
              <Phone className="mr-2 h-4 w-4" />
              Call 1-888-254-0089
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
