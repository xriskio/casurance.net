import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { apiRequest } from "@/lib/queryClient";
import SEOHead from "@/components/SEOHead";

export default function UnsubscribePage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  // Extract token from URL query params
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");

  useEffect(() => {
    const unsubscribe = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid unsubscribe link. Please check the link in your email.");
        return;
      }

      try {
        const response = await apiRequest("POST", `/api/newsletter/unsubscribe/${token}`, {});
        const data = await response.json();
        setStatus("success");
        setEmail(data.email);
        setMessage(data.message || "You have been successfully unsubscribed from our newsletter.");
      } catch (error: any) {
        setStatus("error");
        setMessage(error.message || "An error occurred while unsubscribing. Please try again or contact support.");
      }
    };

    unsubscribe();
  }, [token]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Unsubscribe from Newsletter"
        description="Manage your email preferences and unsubscribe from Casurance newsletter communications."
        keywords="unsubscribe, email preferences, newsletter"
        canonical="/unsubscribe"
      />
      <Header />
      <main id="main-content" className="py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          {status === "loading" && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <Loader2 className="h-16 w-16 text-primary mb-4 animate-spin" aria-hidden="true" />
                  <h1 className="text-2xl font-semibold mb-2">Processing...</h1>
                  <p className="text-muted-foreground">
                    Please wait while we unsubscribe you from our newsletter.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {status === "success" && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-6 w-6 text-primary" aria-hidden="true" />
                  <CardTitle className="text-2xl">Successfully Unsubscribed</CardTitle>
                </div>
                <CardDescription>
                  {email && `${email} has been removed from our mailing list.`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  {message}
                </p>
                
                <div className="rounded-lg border border-muted bg-muted/30 p-4">
                  <h3 className="font-medium mb-2">We're sorry to see you go</h3>
                  <p className="text-sm text-muted-foreground">
                    You will no longer receive commercial insurance news and updates from Casurance. 
                    If you change your mind, you can always subscribe again from our homepage.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild className="flex-1" data-testid="button-return-home">
                    <a href="/">
                      Return to Homepage
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="flex-1" data-testid="button-contact-us">
                    <a href="/contact">
                      Contact Us
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {status === "error" && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-6 w-6 text-destructive" aria-hidden="true" />
                  <CardTitle className="text-2xl">Unsubscribe Failed</CardTitle>
                </div>
                <CardDescription>
                  We encountered an issue while processing your request.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  {message}
                </p>

                <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                  <h3 className="font-medium mb-2">Need Help?</h3>
                  <p className="text-sm text-muted-foreground">
                    If you continue to experience issues, please contact our support team at{" "}
                    <a href="mailto:support@casurance.com" className="text-primary hover:underline">
                      support@casurance.com
                    </a>
                    {" "}or call us at{" "}
                    <a href="tel:18882540089" className="text-primary hover:underline">
                      1-888-254-0089
                    </a>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild className="flex-1" data-testid="button-return-home">
                    <a href="/">
                      Return to Homepage
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="flex-1" data-testid="button-contact-support">
                    <a href="/contact">
                      Contact Support
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
