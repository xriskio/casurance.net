import { Award, Clock, DollarSign, HeadphonesIcon } from "lucide-react";

const benefits = [
  {
    icon: Award,
    title: "Expert Guidance",
    description: "Our licensed agents have decades of experience in commercial insurance.",
  },
  {
    icon: DollarSign,
    title: "Competitive Rates",
    description: "We shop multiple carriers to find you the best coverage at the best price.",
  },
  {
    icon: Clock,
    title: "Fast Quotes",
    description: "Get your quote in minutes, not days. Quick turnaround on all requests.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    description: "Personal service from a team that knows your business and your needs.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose CASURANCE INSURANCE AGENCY SERVICES
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Independent agency. Personalized service. Unmatched expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center" data-testid={`benefit-${index}`}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
