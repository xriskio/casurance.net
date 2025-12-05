import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";

const coverageCategories = [
  { name: "Commercial Auto", slug: "commercial-auto" },
  { name: "General Liability", slug: "general-liability" },
  { name: "Workers Compensation", slug: "workers-compensation" },
  { name: "Commercial Property", slug: "commercial-property" },
  { name: "Professional Liability", slug: "professional-liability" },
  { name: "Cyber Liability", slug: "cyber-liability" },
  { name: "Directors & Officers", slug: "directors-officers" },
  { name: "Employment Practices", slug: "employment-practices" },
  { name: "Commercial Umbrella", slug: "commercial-umbrella" },
  { name: "Inland Marine", slug: "inland-marine" },
];

const industryCategories = [
  { name: "Transportation", slug: "transportation" },
  { name: "NEMT & Paratransit", slug: "nemt-paratransit" },
  { name: "TNC & Shared Economy", slug: "tnc-shared-economy" },
  { name: "Healthcare", slug: "healthcare" },
  { name: "Construction", slug: "construction" },
  { name: "Manufacturing", slug: "manufacturing" },
  { name: "Real Estate", slug: "real-estate" },
  { name: "Hospitality", slug: "hospitality" },
  { name: "Retail", slug: "retail" },
  { name: "Cannabis", slug: "cannabis" },
  { name: "Agribusiness", slug: "agribusiness-industry" },
  { name: "Religious Organizations", slug: "religious-organizations" },
];

const personalLinesCategories = [
  { name: "Personal Auto", slug: "personal-auto" },
  { name: "Homeowners", slug: "homeowners" },
  { name: "Landlord Protector", slug: "landlord-protector" },
  { name: "High Value Home", slug: "high-value-home" },
  { name: "Wildfire & Brush Area", slug: "wildfire-brush-area" },
  { name: "Residential Earthquake", slug: "residential-earthquake" },
];

const aboutLinks = [
  { name: "About Us", href: "/about" },
  { name: "News & Blog", href: "/blog" },
  { name: "Press Releases", href: "/press" },
];

interface DropdownProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  children: React.ReactNode;
  testId?: string;
}

function NavDropdown({ label, isOpen, onToggle, onClose, children, testId }: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition-colors py-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
        data-testid={testId}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-xl border border-gray-200 py-2 min-w-[220px] z-50">
          {children}
        </div>
      )}
    </div>
  );
}

function MegaMenuDropdown({ label, isOpen, onToggle, onClose, children, testId }: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition-colors py-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
        data-testid={testId}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-xl border border-gray-200 py-4 px-6 z-50 min-w-[500px]">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeDropdowns = () => {
    setOpenDropdown(null);
  };

  const handleLinkClick = () => {
    closeDropdowns();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a1628] shadow-lg" role="banner">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" onClick={handleLinkClick}>
            <div className="flex flex-col cursor-pointer" data-testid="link-home">
              <span className="text-2xl font-bold tracking-tight text-white" style={{ letterSpacing: '-0.02em' }}>
                CASURANCE
              </span>
              <span className="text-[10px] font-medium text-white/70 tracking-wider" style={{ letterSpacing: '0.1em' }}>
                INSURANCE AGENCY SERVICES
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6" role="navigation" aria-label="Main navigation">
            <MegaMenuDropdown
              label="Coverage"
              isOpen={openDropdown === 'coverage'}
              onToggle={() => toggleDropdown('coverage')}
              onClose={closeDropdowns}
              testId="dropdown-coverage"
            >
              <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Coverage Types</h3>
                  {coverageCategories.slice(0, 5).map((item) => (
                    <Link key={item.slug} href={`/coverage/${item.slug}`} onClick={handleLinkClick}>
                      <span className="block py-1.5 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded px-2 -mx-2 cursor-pointer">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Specialty Lines</h3>
                  {coverageCategories.slice(5).map((item) => (
                    <Link key={item.slug} href={`/coverage/${item.slug}`} onClick={handleLinkClick}>
                      <span className="block py-1.5 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded px-2 -mx-2 cursor-pointer">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link href="/coverages" onClick={handleLinkClick}>
                  <span className="text-sm font-medium text-primary hover:text-primary/80 cursor-pointer">
                    View All Coverage Types →
                  </span>
                </Link>
              </div>
            </MegaMenuDropdown>

            <MegaMenuDropdown
              label="Industries"
              isOpen={openDropdown === 'industries'}
              onToggle={() => toggleDropdown('industries')}
              onClose={closeDropdowns}
              testId="dropdown-industries"
            >
              <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Transportation</h3>
                  {industryCategories.slice(0, 6).map((item) => (
                    <Link key={item.slug} href={`/industry/${item.slug}`} onClick={handleLinkClick}>
                      <span className="block py-1.5 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded px-2 -mx-2 cursor-pointer">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Commercial</h3>
                  {industryCategories.slice(6).map((item) => (
                    <Link key={item.slug} href={`/industry/${item.slug}`} onClick={handleLinkClick}>
                      <span className="block py-1.5 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded px-2 -mx-2 cursor-pointer">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link href="/industries" onClick={handleLinkClick}>
                  <span className="text-sm font-medium text-primary hover:text-primary/80 cursor-pointer">
                    View All Industries →
                  </span>
                </Link>
              </div>
            </MegaMenuDropdown>

            <NavDropdown
              label="Personal Lines"
              isOpen={openDropdown === 'personal'}
              onToggle={() => toggleDropdown('personal')}
              onClose={closeDropdowns}
              testId="dropdown-personal"
            >
              {personalLinesCategories.map((item) => (
                <Link key={item.slug} href={`/coverage/${item.slug}`} onClick={handleLinkClick}>
                  <span className="block px-4 py-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 cursor-pointer">
                    {item.name}
                  </span>
                </Link>
              ))}
              <div className="border-t border-gray-100 mt-2 pt-2">
                <Link href="/personal-lines" onClick={handleLinkClick}>
                  <span className="block px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 cursor-pointer">
                    View All Personal Lines →
                  </span>
                </Link>
              </div>
            </NavDropdown>

            <NavDropdown
              label="About"
              isOpen={openDropdown === 'about'}
              onToggle={() => toggleDropdown('about')}
              onClose={closeDropdowns}
              testId="dropdown-about"
            >
              {aboutLinks.map((item) => (
                <Link key={item.href} href={item.href} onClick={handleLinkClick}>
                  <span className="block px-4 py-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 cursor-pointer">
                    {item.name}
                  </span>
                </Link>
              ))}
            </NavDropdown>

            <Link href="/contact" onClick={handleLinkClick} data-testid="link-contact">
              <span className="text-sm font-medium text-white/90 hover:text-white cursor-pointer">Contact</span>
            </Link>

            <Link href="/quote" onClick={handleLinkClick} data-testid="link-quote">
              <span className="text-sm font-medium text-white/90 hover:text-white cursor-pointer">Get a Quote</span>
            </Link>

            <Link href="/service" onClick={handleLinkClick} data-testid="link-service">
              <span className="text-sm font-medium text-white/90 hover:text-white cursor-pointer">Service Request</span>
            </Link>

            <a 
              href="tel:18882540089" 
              className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white" 
              data-testid="link-phone" 
              aria-label="Call us at 1-888-254-0089"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>1-888-254-0089</span>
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/quote" onClick={handleLinkClick}>
              <Button 
                data-testid="button-get-quote" 
                className="hidden lg:flex bg-primary hover:bg-primary/90 text-white"
              >
                Get a Quote
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-white hover:bg-white/10" 
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
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a1628] border-t border-white/10">
          <nav className="max-w-7xl mx-auto px-6 py-6" role="navigation" aria-label="Mobile navigation">
            <div className="flex flex-col gap-1">
              <div className="py-2">
                <button 
                  onClick={() => toggleDropdown('mobile-coverage')}
                  className="flex items-center justify-between w-full text-base font-medium text-white/90 hover:text-white py-2"
                >
                  Coverage
                  <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === 'mobile-coverage' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'mobile-coverage' && (
                  <div className="pl-4 py-2 space-y-1">
                    {coverageCategories.map((item) => (
                      <Link key={item.slug} href={`/coverage/${item.slug}`}>
                        <div 
                          className="text-sm text-white/70 hover:text-white py-1.5 cursor-pointer"
                          onClick={handleLinkClick}
                        >
                          {item.name}
                        </div>
                      </Link>
                    ))}
                    <Link href="/coverages">
                      <div 
                        className="text-sm font-medium text-primary py-1.5 cursor-pointer"
                        onClick={handleLinkClick}
                      >
                        View All Coverage →
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <div className="py-2">
                <button 
                  onClick={() => toggleDropdown('mobile-industries')}
                  className="flex items-center justify-between w-full text-base font-medium text-white/90 hover:text-white py-2"
                >
                  Industries
                  <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === 'mobile-industries' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'mobile-industries' && (
                  <div className="pl-4 py-2 space-y-1">
                    {industryCategories.map((item) => (
                      <Link key={item.slug} href={`/industry/${item.slug}`}>
                        <div 
                          className="text-sm text-white/70 hover:text-white py-1.5 cursor-pointer"
                          onClick={handleLinkClick}
                        >
                          {item.name}
                        </div>
                      </Link>
                    ))}
                    <Link href="/industries">
                      <div 
                        className="text-sm font-medium text-primary py-1.5 cursor-pointer"
                        onClick={handleLinkClick}
                      >
                        View All Industries →
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <div className="py-2">
                <button 
                  onClick={() => toggleDropdown('mobile-personal')}
                  className="flex items-center justify-between w-full text-base font-medium text-white/90 hover:text-white py-2"
                >
                  Personal Lines
                  <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === 'mobile-personal' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'mobile-personal' && (
                  <div className="pl-4 py-2 space-y-1">
                    {personalLinesCategories.map((item) => (
                      <Link key={item.slug} href={`/coverage/${item.slug}`}>
                        <div 
                          className="text-sm text-white/70 hover:text-white py-1.5 cursor-pointer"
                          onClick={handleLinkClick}
                        >
                          {item.name}
                        </div>
                      </Link>
                    ))}
                    <Link href="/personal-lines">
                      <div 
                        className="text-sm font-medium text-primary py-1.5 cursor-pointer"
                        onClick={handleLinkClick}
                      >
                        View All Personal Lines →
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <div className="py-2">
                <button 
                  onClick={() => toggleDropdown('mobile-about')}
                  className="flex items-center justify-between w-full text-base font-medium text-white/90 hover:text-white py-2"
                >
                  About
                  <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === 'mobile-about' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'mobile-about' && (
                  <div className="pl-4 py-2 space-y-1">
                    {aboutLinks.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <div 
                          className="text-sm text-white/70 hover:text-white py-1.5 cursor-pointer"
                          onClick={handleLinkClick}
                        >
                          {item.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/contact">
                <div 
                  className="text-base font-medium text-white/90 hover:text-white py-3"
                  onClick={handleLinkClick}
                  data-testid="link-contact-mobile"
                >
                  Contact
                </div>
              </Link>

              <Link href="/quote">
                <div 
                  className="text-base font-medium text-white/90 hover:text-white py-3"
                  onClick={handleLinkClick}
                  data-testid="link-quote-mobile"
                >
                  Get a Quote
                </div>
              </Link>

              <Link href="/service">
                <div 
                  className="text-base font-medium text-white/90 hover:text-white py-3"
                  onClick={handleLinkClick}
                  data-testid="link-service-mobile"
                >
                  Service Request
                </div>
              </Link>

              <a 
                href="tel:18882540089" 
                className="flex items-center gap-2 text-base font-medium text-white py-3" 
                data-testid="link-phone-mobile" 
                aria-label="Call us at 1-888-254-0089"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>1-888-254-0089</span>
              </a>

              <Link href="/quote">
                <Button 
                  data-testid="button-get-quote-mobile" 
                  className="w-full mt-4 bg-primary hover:bg-primary/90"
                  onClick={handleLinkClick}
                >
                  Get a Quote
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
