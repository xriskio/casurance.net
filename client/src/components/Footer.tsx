import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="text-2xl font-bold tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                CASURANCE
              </span>
              <p className="text-[10px] font-medium text-white/60 tracking-wider mt-1" style={{ letterSpacing: '0.1em' }}>
                INSURANCE AGENCY SERVICES
              </p>
            </div>
            <p className="text-sm text-white/70 mb-6 max-w-sm">
              Casurance Inc d/b/a Casurance Agency Insurance Services. Nationwide commercial and personal insurance specialists since 2010.
            </p>
            <div className="space-y-3">
              <a href="tel:18882540089" className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-primary" />
                <span>1-888-254-0089</span>
              </a>
              <a href="mailto:info@casurance.com" className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@casurance.com</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-white/80">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <p>714 W. Olympic Blvd, Suite 906</p>
                  <p>Los Angeles, CA 90015</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Commercial</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/coverage/commercial-auto" className="text-white/70 hover:text-white transition-colors cursor-pointer">Commercial Auto</Link></li>
              <li><Link href="/coverage/general-liability" className="text-white/70 hover:text-white transition-colors cursor-pointer">General Liability</Link></li>
              <li><Link href="/coverage/workers-compensation" className="text-white/70 hover:text-white transition-colors cursor-pointer">Workers Compensation</Link></li>
              <li><Link href="/coverage/commercial-property" className="text-white/70 hover:text-white transition-colors cursor-pointer">Commercial Property</Link></li>
              <li><Link href="/coverages" className="text-primary hover:text-primary/80 transition-colors cursor-pointer font-medium">View All →</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Personal Lines</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/coverage/personal-auto" className="text-white/70 hover:text-white transition-colors cursor-pointer">Personal Auto</Link></li>
              <li><Link href="/coverage/homeowners" className="text-white/70 hover:text-white transition-colors cursor-pointer">Homeowners</Link></li>
              <li><Link href="/coverage/landlord-protector" className="text-white/70 hover:text-white transition-colors cursor-pointer">Landlord Protector</Link></li>
              <li><Link href="/coverage/high-value-home" className="text-white/70 hover:text-white transition-colors cursor-pointer">High Value Home</Link></li>
              <li><Link href="/personal-lines" className="text-primary hover:text-primary/80 transition-colors cursor-pointer font-medium">View All →</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Industries</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/industry/transportation" className="text-white/70 hover:text-white transition-colors cursor-pointer">Transportation</Link></li>
              <li><Link href="/industry/healthcare" className="text-white/70 hover:text-white transition-colors cursor-pointer">Healthcare</Link></li>
              <li><Link href="/industry/construction" className="text-white/70 hover:text-white transition-colors cursor-pointer">Construction</Link></li>
              <li><Link href="/industry/hospitality" className="text-white/70 hover:text-white transition-colors cursor-pointer">Hospitality</Link></li>
              <li><Link href="/industries" className="text-primary hover:text-primary/80 transition-colors cursor-pointer font-medium">View All →</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/quote" className="text-white/70 hover:text-white transition-colors cursor-pointer">Request a Quote</Link></li>
              <li><Link href="/service" className="text-white/70 hover:text-white transition-colors cursor-pointer">Service Request</Link></li>
              <li><Link href="/locations" className="text-white/70 hover:text-white transition-colors cursor-pointer">Locations</Link></li>
              <li><Link href="/about" className="text-white/70 hover:text-white transition-colors cursor-pointer">About Us</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-white transition-colors cursor-pointer">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Landing Pages Section */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Advertising Landing Pages</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/get-quote" className="text-white/70 hover:text-white transition-colors cursor-pointer">Commercial Insurance Quote</Link>
            <span className="text-white/30">|</span>
            <Link href="/workers-comp-california-nevada" className="text-white/70 hover:text-white transition-colors cursor-pointer">Workers' Comp CA & NV</Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60">
              © 2025 Casurance Inc. All rights reserved. License # 6005562
            </p>
            <div className="flex gap-6 text-sm text-white/60">
              <Link href="/privacy" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors cursor-pointer">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
