import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await apiRequest("POST", "/api/newsletter/subscribe", { email });

      setIsSubscribed(true);
      setEmail("");
      
      toast({
        title: "Successfully Subscribed!",
        description: "You'll receive our latest insurance news and updates.",
      });
    } catch (error: any) {
      const errorMessage = error.message || "Failed to subscribe. Please try again.";
      
      toast({
        variant: "destructive",
        title: "Subscription Failed",
        description: errorMessage.includes("already subscribed") 
          ? "This email is already subscribed to our newsletter."
          : errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center py-8">
            <CheckCircle2 className="h-16 w-16 text-primary mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
            <p className="text-muted-foreground">
              You're now subscribed to our newsletter.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80" data-testid="card-newsletter">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
          <CardTitle className="text-xl">Stay Informed</CardTitle>
        </div>
        <CardDescription>
          Get the latest commercial insurance news, industry updates, and risk management insights delivered to your inbox.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubscribe} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              data-testid="input-newsletter-email"
              aria-label="Email address"
            />
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            data-testid="button-newsletter-subscribe"
          >
            <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
            {isLoading ? "Subscribing..." : "Subscribe to Newsletter"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            No spam. Unsubscribe anytime. Your privacy is important to us.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
