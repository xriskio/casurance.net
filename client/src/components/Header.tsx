import { Button } from "@/components/ui/button";
import { Phone, Menu } from "lucide-react";
import { Link } from "wouter";

export default function Header() {
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
            <Link href="/blog" data-testid="link-blog">
              <span className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer">Blog</span>
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
            <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-menu" aria-label="Open navigation menu">
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
