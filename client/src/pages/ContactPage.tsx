import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Phone, Mail, Clock, CheckCircle2 } from "lucide-react";
import { insertContactRequestSchema } from "@shared/schema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type FormData = z.infer<typeof insertContactRequestSchema>;

const formSchema = insertContactRequestSchema.extend({
  contactName: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  message: z.string().min(10, "Please provide at least 10 characters"),
});

const topicOptions = [
  "General Liability",
  "Commercial Auto",
  "Workers Compensation",
  "Professional Liability",
  "Property Insurance",
  "Transportation Insurance",
  "Hospitality Insurance",
  "Other",
];

export default function ContactPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      contactName: "",
      email: "",
      phone: "",
      title: "",
      preferredContactMethod: "email",
      preferredContactTime: "",
      topicsOfInterest: [],
      message: "",
      sourcePath: "/contact",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await apiRequest("/api/contact-requests", "POST", data);
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "We'll be in touch within 24 hours.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit contact request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    const payload = {
      ...data,
      topicsOfInterest: selectedTopics,
    };
    mutation.mutate(payload);
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4" data-testid="text-success-title">
              Thank You for Reaching Out!
            </h2>
            <p className="text-muted-foreground mb-6">
              We've received your message and one of our licensed insurance professionals will contact you within 24 business hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => window.location.href = "/"} data-testid="button-return-home">
                Return to Home
              </Button>
              <Button variant="outline" onClick={() => window.location.href = "/coverages"} data-testid="button-view-coverages">
                View Coverage Options
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b5998] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4" data-testid="text-contact-title">
              Contact Us
            </h1>
            <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
              Get in touch with our team of licensed insurance professionals
            </p>
          </div>
        </div>
      </div>
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        {...form.register("businessName")}
                        placeholder="Your Company LLC"
                        data-testid="input-business-name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contactName">
                        Contact Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="contactName"
                        {...form.register("contactName")}
                        placeholder="John Doe"
                        required
                        data-testid="input-contact-name"
                      />
                      {form.formState.errors.contactName && (
                        <p className="text-sm text-destructive mt-1">
                          {form.formState.errors.contactName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register("email")}
                        placeholder="john@company.com"
                        required
                        data-testid="input-email"
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm text-destructive mt-1">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone">
                        Phone <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...form.register("phone")}
                        placeholder="(555) 123-4567"
                        required
                        data-testid="input-phone"
                      />
                      {form.formState.errors.phone && (
                        <p className="text-sm text-destructive mt-1">
                          {form.formState.errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="title">Title/Role</Label>
                      <Input
                        id="title"
                        {...form.register("title")}
                        placeholder="Owner, CFO, etc."
                        data-testid="input-title"
                      />
                    </div>

                    <div>
                      <Label htmlFor="preferredContactMethod">Preferred Contact Method</Label>
                      <Select
                        value={form.watch("preferredContactMethod") || "email"}
                        onValueChange={(value) => form.setValue("preferredContactMethod", value)}
                      >
                        <SelectTrigger id="preferredContactMethod" data-testid="select-contact-method">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="either">Either</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="preferredContactTime">Preferred Contact Time</Label>
                      <Input
                        id="preferredContactTime"
                        {...form.register("preferredContactTime")}
                        placeholder="Weekdays 9am-5pm, etc."
                        data-testid="input-contact-time"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block">Topics of Interest</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {topicOptions.map((topic) => (
                        <div key={topic} className="flex items-center space-x-2">
                          <Checkbox
                            id={`topic-${topic}`}
                            checked={selectedTopics.includes(topic)}
                            onCheckedChange={() => toggleTopic(topic)}
                            data-testid={`checkbox-topic-${topic.toLowerCase().replace(/\s+/g, '-')}`}
                          />
                          <label
                            htmlFor={`topic-${topic}`}
                            className="text-sm text-foreground cursor-pointer"
                          >
                            {topic}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      {...form.register("message")}
                      placeholder="Tell us about your insurance needs or questions..."
                      rows={6}
                      required
                      data-testid="textarea-message"
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={mutation.isPending}
                    data-testid="button-submit"
                  >
                    {mutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <a
                      href="tel:18882540089"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      data-testid="link-phone"
                    >
                      1-888-254-0089
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <a
                      href="mailto:info@casurance.net"
                      className="text-muted-foreground hover:text-primary transition-colors break-all"
                      data-testid="link-email"
                    >
                      info@casurance.net
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
                    <p className="text-muted-foreground text-sm">
                      Monday - Friday<br />
                      9:00 AM - 5:00 PM PST
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Need a Quote?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get a fast, competitive quote for your business insurance needs.
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.location.href = "/coverages"}
                  data-testid="button-request-quote"
                >
                  Request a Quote
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
