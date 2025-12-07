import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ReligiousOrgQuoteForm from "@/components/ReligiousOrgQuoteForm";
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
  CheckCircle2
} from "lucide-react";

export default function ReligiousOrgQuote() {
  return (
    <>
      <SEOHead
        title="Religious Organization Insurance | Churches, Temples & Places of Worship"
        description="Comprehensive insurance coverage for religious institutions including churches, mosques, temples, and synagogues. Property, liability, auto, umbrella, and management liability coverage with limits up to $10 million."
        keywords="religious organization insurance, church insurance, temple insurance, mosque insurance, synagogue insurance, nonprofit insurance, religious institution coverage"
        canonical="/quote/religious-organization"
      />
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b5998] py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4" data-testid="text-religious-org-title">
                Religious Organization Insurance
              </h1>
              <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
                Coverage tailored for the specific exposure characteristic of religious institutions
              </p>
            </div>
          </div>
        </div>

        <main id="main-content" className="flex-1 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <Card className="mb-8">
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed">
                  Casurance delivers an unbeatable combination of sound coverage, stable pricing, and exceptional 
                  service to both insureds and agents. It pays to work with people who fully understand nonprofits 
                  and religious institutions. Our specialized programs provide comprehensive protection for churches, 
                  mosques, temples, synagogues, and all places of worship.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Coverage and Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>Property and Liability</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Car className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>Auto</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>Inland Marine</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Umbrella className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>Umbrella</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Briefcase className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>Management Liability and Privacy Coverage</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-primary" />
                    Product Basics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Primary Liability Insurance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Standard limits are $1 million per occurrence for General Liability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>$1 million per occurrence for Sex Abuse</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>$1 million per occurrence for Social Work/Professional</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>$3 million policy aggregate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Umbrella limits up to $10 million*</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Fundraising Events Coverage included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium">Management Liability:</span>
                        <ul className="mt-1 ml-4 space-y-1 text-muted-foreground">
                          <li>- EPLI, D&O, Cyber, Fiduciary available packaged or separately</li>
                          <li>- Up to $10 million limit available*</li>
                          <li>- *Defense outside limit of liability</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
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
                    <span>Extensive Online Resources and Information</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>Driver Qualification Training and Monitoring</span>
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

            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Enhanced Coverages for Religious Institutions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Broad additional insureds</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Damage to Premises Rented to You</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>HNO Auto under GL</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Limited Rental Lease Agreement</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Equipment Breakdown</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Water Coverage $30,000</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Newly Acquired Property</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Earthquake SL $30,000</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Ordinance Law $1 million</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Property Off Premises $500,000</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Emergency Vacating Expense</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Employee Indemnification Defense</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Lease Cancellation Expense</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Employee Benefits Coverage</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Business Income $300,000</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Employment Practices Liability</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Green Consultant Expense</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Employee Theft</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>AEDs $5,000</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Money & Securities</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Workplace Violence</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Reward Reimbursement</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Fine Arts $100,000 (includes stained glass)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator className="my-12" />

            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Request a Quote</h2>
              <ReligiousOrgQuoteForm />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
