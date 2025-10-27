import { Button } from "@/components/ui/button";
import { Phone, Menu } from "lucide-react";
import { Link } from "wouter";
import casuranceLogo from "@assets/casurance-logo.png";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer" data-testid="link-home">
              <img 
                src={casuranceLogo} 
                alt="Casurance Insurance Agency" 
                className="h-12 w-auto"
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/coverages" data-testid="link-coverage">
              <span className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer">Coverage</span>
            </Link>
            <Link href="/industries" data-testid="link-industries">
              <span className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer">Industries</span>
            </Link>
            <Link href="/quote" data-testid="link-quote">
              <span className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer">Get a Quote</span>
            </Link>
            <Link href="/service" data-testid="link-service">
              <span className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer">Service Request</span>
            </Link>
            <a href="tel:18882540089" className="flex items-center gap-2 text-sm font-medium text-foreground" data-testid="link-phone">
              <Phone className="h-4 w-4" />
              <span>1-888-254-0089</span>
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/quote">
              <Button data-testid="button-get-quote" className="hidden md:flex">
                Get a Quote
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
