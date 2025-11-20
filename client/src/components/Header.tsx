import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import { Link } from "wouter";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b" role="banner">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          <Link href="/">
            <div className="flex flex-col cursor-pointer" data-testid="link-home">
              <span className="text-3xl font-bold tracking-tight text-foreground" style={{ letterSpacing: '-0.02em' }}>
                CASURANCE
              </span>
              <span className="text-xs font-medium text-muted-foreground tracking-wide" style={{ letterSpacing: '0.05em' }}>
                INSURANCE AGENCY SERVICES
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
            <Link href="/coverages" data-testid="link-coverage">
              <span className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer">Coverage</span>
            </Link>
            <Link href="/industries" data-testid="link-industries">
              <span className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer">Industries</span>
            </Link>
            <Link href="/about" data-testid="link-about">
              <span className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer">About</span>
            </Link>
            <Link href="/contact" data-testid="link-contact">
              <span className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer">Contact</span>
            </Link>
            <Link href="/quote" data-testid="link-quote">
              <span className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer">Get a Quote</span>
            </Link>
            <Link href="/service" data-testid="link-service">
              <span className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer">Service Request</span>
            </Link>
            <a href="tel:18882540089" className="flex items-center gap-2 text-sm font-medium text-foreground" data-testid="link-phone" aria-label="Call us at 1-888-254-0089">
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>1-888-254-0089</span>
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/quote">
              <Button data-testid="button-get-quote" className="hidden md:flex">
                Get a Quote
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              data-testid="button-menu" 
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-6 border-t" role="navigation" aria-label="Mobile navigation">
            <div className="flex flex-col gap-4">
              <Link href="/coverages">
                <div 
                  className="text-base font-medium text-muted-foreground hover:text-foreground cursor-pointer py-2" 
                  data-testid="link-coverage-mobile"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Coverage
                </div>
              </Link>
              <Link href="/industries">
                <div 
                  className="text-base font-medium text-muted-foreground hover:text-foreground cursor-pointer py-2" 
                  data-testid="link-industries-mobile"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Industries
                </div>
              </Link>
              <Link href="/about">
                <div 
                  className="text-base font-medium text-muted-foreground hover:text-foreground cursor-pointer py-2" 
                  data-testid="link-about-mobile"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </div>
              </Link>
              <Link href="/contact">
                <div 
                  className="text-base font-medium text-muted-foreground hover:text-foreground cursor-pointer py-2" 
                  data-testid="link-contact-mobile"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </div>
              </Link>
              <Link href="/quote">
                <div 
                  className="text-base font-medium text-muted-foreground hover:text-foreground cursor-pointer py-2" 
                  data-testid="link-quote-mobile"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get a Quote
                </div>
              </Link>
              <Link href="/service">
                <div 
                  className="text-base font-medium text-muted-foreground hover:text-foreground cursor-pointer py-2" 
                  data-testid="link-service-mobile"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Service Request
                </div>
              </Link>
              <a 
                href="tel:18882540089" 
                className="flex items-center gap-2 text-base font-medium text-foreground py-2" 
                data-testid="link-phone-mobile" 
                aria-label="Call us at 1-888-254-0089"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>1-888-254-0089</span>
              </a>
              <Link href="/quote">
                <Button 
                  data-testid="button-get-quote-mobile" 
                  className="w-full mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get a Quote
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
