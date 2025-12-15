import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ReligiousOrgQuoteForm from "@/components/ReligiousOrgQuoteForm";
import ReligiousOrgHeroQuoteForm from "@/components/ReligiousOrgHeroQuoteForm";
import SEOHead from "@/components/SEOHead";
import { 
  Shield, 
  Car, 
  Umbrella, 
  Building2, 
  Users, 
  FileCheck, 
  AlertTriangle,
  GraduationCap,
  Phone,
  Briefcase,
  CheckCircle2,
  Lock,
  Scale,
  Church,
  DollarSign,
  Globe
} from "lucide-react";

import propertyImage from "@assets/stock_images/church_interior_stai_6b566998.jpg";
import liabilityImage from "@assets/stock_images/church_exterior_buil_5148c578.jpg";
import managementImage from "@assets/stock_images/priest_pastor_clergy_8032a459.jpg";
import eplImage from "@assets/stock_images/diverse_church_congr_91b3db8d.jpg";
import crimeImage from "@assets/stock_images/church_collection_pl_ada4d7e4.jpg";
import cyberImage from "@assets/stock_images/person_working_compu_f3460ba4.jpg";

const coverageTabs = [
  {
    id: "property",
    label: "Property",
    image: propertyImage,
    title: "Property Insurance",
    description: "Comprehensive protection for your place of worship and all its sacred contents.",
    features: [
      "Blanket limits for buildings and contents",
      "Special causes of loss form (all-risk coverage)",
      "Sewer and drain backup coverage",
      "Sign and stained glass window protection",
      "Fine arts coverage up to $100,000",
      "Newly acquired property protection",
      "Equipment breakdown coverage",
      "Business income protection up to $300,000",
      "Ordinance or law coverage up to $1 million",
      "Property off-premises up to $500,000"
    ]
  },
  {
    id: "liability",
    label: "General Liability",
    image: liabilityImage,
    title: "General Liability Insurance",
    description: "Essential protection against third-party claims of bodily injury and property damage.",
    features: [
      "$1 million per occurrence limit",
      "$3 million aggregate limit",
      "Sexual abuse and molestation coverage",
      "Volunteer coverage included",
      "Fundraising events coverage",
      "Damage to premises rented to you",
      "Hired and non-owned auto under GL",
      "Broad additional insured provisions",
      "Personal and advertising injury",
      "Medical payments coverage"
    ]
  },
  {
    id: "management",
    label: "Management Liability",
    image: managementImage,
    title: "Management Liability Insurance",
    description: "Protection for your leadership team and professional staff members.",
    features: [
      "Directors & Officers (D&O) liability",
      "Clergy professional liability",
      "Teachers and educators coverage",
      "Childcare and nursery staff protection",
      "Counselors professional liability",
      "Fiduciary liability coverage",
      "Up to $10 million limits available",
      "Defense outside limit of liability",
      "Prior acts coverage available",
      "Third-party coverage options"
    ]
  },
  {
    id: "epl",
    label: "Employment Practices",
    image: eplImage,
    title: "Employment Practices Liability",
    description: "Safeguard against employment-related claims from staff and volunteers.",
    features: [
      "Wrongful termination coverage",
      "Discrimination claims protection",
      "Sexual harassment defense",
      "Retaliation claims coverage",
      "Wage and hour disputes",
      "Third-party liability coverage",
      "Employee benefits liability",
      "Employee indemnification defense",
      "EEOC defense costs",
      "Employment practices hotline access"
    ]
  },
  {
    id: "crime",
    label: "Crime & Fidelity",
    image: crimeImage,
    title: "Crime and Fidelity Insurance",
    description: "Protection for your offerings, funds, and financial assets.",
    features: [
      "Employee dishonesty coverage",
      "Money and securities protection",
      "Forgery and alteration coverage",
      "Computer fraud protection",
      "Funds transfer fraud coverage",
      "Collection plate protection",
      "Reward reimbursement",
      "Social engineering coverage",
      "Theft by volunteers coverage",
      "Credit card fraud protection"
    ]
  },
  {
    id: "cyber",
    label: "Cyber Liability",
    image: cyberImage,
    title: "Cyber Liability Insurance",
    description: "Digital protection for member data and online presence.",
    features: [
      "Data breach response coverage",
      "Member notification costs",
      "Credit monitoring services",
      "Ransomware and extortion coverage",
      "Business interruption from cyber events",
      "Website liability protection",
      "Social media liability",
      "Privacy liability coverage",
      "Network security liability",
      "PCI-DSS coverage for donations"
    ]
  }
];

const housesOfWorship = [
  { name: "Churches", icon: Church },
  { name: "Mosques", icon: Building2 },
  { name: "Synagogues", icon: Building2 },
  { name: "Temples", icon: Building2 },
  { name: "Cathedrals", icon: Church },
  { name: "Chapels", icon: Church },
  { name: "Religious Schools", icon: GraduationCap },
  { name: "Faith-Based Nonprofits", icon: Users }
];

export default function ReligiousOrgQuote() {
  return (
    <>
      <SEOHead
        title="Religious Organization Insurance | Churches, Mosques, Temples & Places of Worship"
        description="Comprehensive insurance coverage for religious institutions including churches, mosques, temples, and synagogues. Property, liability, auto, umbrella, and management liability coverage with limits up to $10 million."
        keywords="religious organization insurance, church insurance, temple insurance, mosque insurance, synagogue insurance, nonprofit insurance, religious institution coverage, houses of worship insurance"
        canonical="/quote/religious-organization"
      />
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <ReligiousOrgHeroQuoteForm heroImage={propertyImage} />

        <main id="main-content" tabIndex={-1} className="flex-1 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <Card className="mb-12">
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Casurance delivers an unbeatable combination of sound coverage, stable pricing, and exceptional 
                  service to religious institutions nationwide. It pays to work with people who fully understand 
                  the unique needs of houses of worship. Our specialized programs provide comprehensive protection 
                  for churches, mosques, temples, synagogues, and all places of worship across all 50 states.
                </p>
              </CardContent>
            </Card>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Houses of Worship We Serve</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {housesOfWorship.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Card key={item.name} className="text-center hover-elevate">
                      <CardContent className="pt-6">
                        <IconComponent className="h-10 w-10 text-primary mx-auto mb-3" />
                        <p className="font-medium">{item.name}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Comprehensive Coverage Options</h2>
              <Tabs defaultValue="property" className="w-full">
                <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-2 rounded-lg mb-6">
                  {coverageTabs.map((tab) => (
                    <TabsTrigger 
                      key={tab.id} 
                      value={tab.id}
                      className="flex-1 min-w-[140px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      data-testid={`tab-${tab.id}`}
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {coverageTabs.map((tab) => (
                  <TabsContent key={tab.id} value={tab.id} className="mt-0">
                    <Card>
                      <CardContent className="p-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                          <div className="relative h-64 lg:h-auto lg:min-h-[400px]">
                            <img 
                              src={tab.image} 
                              alt={tab.title}
                              className="absolute inset-0 w-full h-full object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/20 rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none" />
                            <div className="absolute bottom-4 left-4 lg:hidden">
                              <h3 className="text-2xl font-bold text-white">{tab.title}</h3>
                            </div>
                          </div>
                          <div className="p-6 lg:p-8">
                            <h3 className="text-2xl font-bold mb-3 hidden lg:block">{tab.title}</h3>
                            <p className="text-muted-foreground mb-6">{tab.description}</p>
                            <ul className="space-y-2">
                              {tab.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                                  <span className="text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-primary" />
                    Automobile Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Hired and non-owned auto liability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>15-passenger van coverage available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Church bus and fleet coverage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Driver qualification training included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Volunteer driver coverage</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Umbrella className="h-5 w-5 text-primary" />
                    Umbrella & Excess Liability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Umbrella limits up to $10 million</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Excess coverage over primary policies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Drops down for uninsured claims</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Worldwide coverage territory</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Defense outside the limit</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Bell Endorsement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Specialized coverage with $50,000 limits for:
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Business travel accident coverage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Conference and event cancellation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Mission trip protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Religious retreat coverage</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    Crisis Management Enhancement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm">
                    $25,000 limit for crisis response including:
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Crisis management consultant fees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Public relations support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Workplace violence response</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Emergency vacating expenses</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Risk Control Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <Car className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>Fleet assessment</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>Loss Control Engineering</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileCheck className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>Extensive Online Resources</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>Driver Qualification Training</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>Parking and Pedestrian Safety</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>Employment Practices Hot Line</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-12 bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">Program Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center">
                      <div className="bg-primary/10 rounded-full p-4 mb-3">
                        <DollarSign className="h-8 w-8 text-primary" />
                      </div>
                      <p className="font-semibold">Up to $10M</p>
                      <p className="text-sm text-muted-foreground">Umbrella Limits</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-primary/10 rounded-full p-4 mb-3">
                        <Scale className="h-8 w-8 text-primary" />
                      </div>
                      <p className="font-semibold">Defense Outside Limit</p>
                      <p className="text-sm text-muted-foreground">Management Liability</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-primary/10 rounded-full p-4 mb-3">
                        <Lock className="h-8 w-8 text-primary" />
                      </div>
                      <p className="font-semibold">Abuse Coverage</p>
                      <p className="text-sm text-muted-foreground">$1M Per Occurrence</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator className="my-12" />

            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Detailed Quote Application</h2>
              <p className="text-center text-muted-foreground mb-8">
                Need a more comprehensive quote? Complete the detailed application below for a tailored insurance proposal.
              </p>
              <ReligiousOrgQuoteForm />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
