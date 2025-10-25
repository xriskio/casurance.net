import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold">C</span>
              </div>
              <span className="font-semibold text-foreground">Casurance Agency</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Casurance Inc d/b/a Casurance Agency Insurance Services. California's trusted independent commercial insurance agency since 2010.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Coverage Types</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/coverage/general-casualty" className="hover:text-foreground cursor-pointer">General Liability</Link></li>
              <li><Link href="/coverage/commercial-auto" className="hover:text-foreground cursor-pointer">Commercial Auto</Link></li>
              <li><Link href="/coverage/commercial-property" className="hover:text-foreground cursor-pointer">Commercial Property</Link></li>
              <li><Link href="/coverages" className="hover:text-foreground cursor-pointer">View All Coverage</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/quote" className="hover:text-foreground cursor-pointer">Request Quote</Link></li>
              <li><Link href="/service" className="hover:text-foreground cursor-pointer">Service Request</Link></li>
              <li><Link href="/industries" className="hover:text-foreground cursor-pointer">Industries</Link></li>
              <li><Link href="/" className="hover:text-foreground cursor-pointer">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>714 W. Olympic Blvd, Suite 906</li>
              <li>Los Angeles, CA 90015</li>
              <li><a href="tel:18882540089" className="hover:text-foreground">1-888-254-0089</a></li>
              <li><a href="mailto:info@casurance.com" className="hover:text-foreground">info@casurance.com</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Casurance Inc. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground cursor-pointer">Privacy Policy</Link>
              <Link href="/" className="hover:text-foreground cursor-pointer">Terms of Service</Link>
              <span>License # 6005562</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
