import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Users, Target, Award, Mail, Newspaper, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function AboutPage() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter/subscribe", { email });
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    },
    onError: (error: Error) => {
      toast({
        title: "Subscription failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscribeMutation.mutate(email);
    }
  };

  return (
    <>
      <SEOHead
        title="About Casurance Insurance Agency"
        description="Learn about Casurance, California's trusted independent commercial insurance agency since 2010. We serve businesses across 15 states with specialized coverage for transportation, hospitality, and specialty industries."
        keywords="about Casurance, commercial insurance agency, California insurance, independent insurance broker, business insurance provider"
        canonical="/about"
      />
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
      <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b5998] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4" data-testid="text-about-title">
              About Casurance
            </h1>
            <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
              Your trusted partner for commercial insurance solutions across 15 states
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-3">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Casurance Insurance Agency Services is dedicated to providing businesses across California, Nevada, Arizona, Oregon, Ohio, Illinois, New York, New Jersey, Pennsylvania, North Carolina, Texas, Florida, Arkansas, Missouri, and Colorado with comprehensive commercial insurance solutions. We specialize in serving transportation, hospitality, and specialty industries with tailored coverage designed to protect your operations and support your growth.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Target className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-3">Our Expertise</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    With deep industry knowledge and strong carrier relationships across multiple states, we deliver competitive quotes and personalized service. Our team understands the unique risks facing businesses nationwide and works to secure the right coverage at the best value.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">What Sets Us Apart</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Industry Specialization</h3>
                <p className="text-muted-foreground text-sm">
                  Focused expertise in transportation, hospitality, film production, and specialty commercial risks
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Personalized Service</h3>
                <p className="text-muted-foreground text-sm">
                  Dedicated licensed agents who take time to understand your business and customize solutions
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Strong Carrier Network</h3>
                <p className="text-muted-foreground text-sm">
                  Access to leading insurance carriers ensuring competitive rates and comprehensive coverage options
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="mb-12" />

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Industries We Serve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="hover-elevate">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">Transportation & Logistics</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• NEMT & Paratransit Services</li>
                  <li>• Taxi & Black Car Services</li>
                  <li>• Limousine & Chauffeured Transportation</li>
                  <li>• TNC/Rideshare Operations</li>
                  <li>• Ambulance Services</li>
                  <li>• Public Transportation</li>
                  <li>• Trucking & Cargo</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">Hospitality & Services</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Hotels & Motels</li>
                  <li>• Restaurants & Food Service</li>
                  <li>• Security Services</li>
                  <li>• Property Management</li>
                  <li>• Self-Storage Facilities</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">Specialty Industries</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Film & Entertainment Production</li>
                  <li>• Product Manufacturing</li>
                  <li>• Professional Services</li>
                  <li>• Technology Companies</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">Construction & Contractors</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• General Contractors</li>
                  <li>• Builders Risk</li>
                  <li>• Construction Casualty</li>
                  <li>• Crane & Rigging Operations</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Ready to Protect Your Business?
              </h3>
              <p className="text-muted-foreground mb-6">
                Contact our team of licensed insurance professionals to discuss your coverage needs and receive a competitive quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover-elevate active-elevate-2"
                  data-testid="link-contact-us"
                >
                  Contact Us
                </a>
                <a
                  href="/coverages"
                  className="inline-flex items-center justify-center px-6 py-3 bg-card border border-border text-foreground font-medium rounded-md hover-elevate active-elevate-2"
                  data-testid="link-view-coverages"
                >
                  View Coverage Options
                </a>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-12" />

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Resources & News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <Card className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Blog</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Expert insights, industry trends, and practical advice for commercial insurance.
                      </p>
                      <a
                        href="/blog"
                        className="text-sm font-medium text-primary hover:underline"
                        data-testid="link-blog"
                      >
                        Read our blog →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Newspaper className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Press Releases</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Latest company news, coverage announcements, and service updates.
                      </p>
                      <a
                        href="/press-releases"
                        className="text-sm font-medium text-primary hover:underline"
                        data-testid="link-press-releases"
                      >
                        View press releases →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator className="my-12" />

          <div className="max-w-2xl mx-auto text-center py-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Mail className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <h3 className="text-lg font-medium text-foreground">Stay Informed</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Get commercial insurance news and industry updates delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={subscribeMutation.isPending}
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button
                type="submit"
                disabled={subscribeMutation.isPending}
                data-testid="button-newsletter-subscribe"
              >
                {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
}
