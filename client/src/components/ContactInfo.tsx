import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactInfo() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            We're here to help you find the right coverage for your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card data-testid="card-location">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Office Location</h3>
              <p className="text-sm text-muted-foreground">
                714 W. Olympic Boulevard<br />
                Suite 906<br />
                Los Angeles, CA 90015
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-phone">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Phone</h3>
              <p className="text-sm text-muted-foreground">
                Toll Free: 1-888-254-0089<br />
                Local: 323-546-3030<br />
                Fax: 310-464-0633
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-email">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">
                info@casurance.net<br />
                quotes@casurance.net
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-hours">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Business Hours</h3>
              <p className="text-sm text-muted-foreground">
                Monday - Friday<br />
                9:00 AM - 5:00 PM PST
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
