import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

const insuranceTypes = [
  "General Liability",
  "Workers Compensation",
  "Commercial Auto",
  "Truck & Trucking",
  "Habitational (Apartments/Condos)",
  "Hotel/Motel/Hospitality",
  "Restaurant Insurance",
  "Religious Organizations",
  "Commercial Property/Real Estate",
  "Builders Risk",
  "Vacant Building & Land",
  "Crane & Riggers Liability",
  "Business Owners Policy (BOP)",
  "Cyber Liability",
  "Employment Practices Liability",
  "Professional Liability",
  "Contractors Insurance",
];

const coverageOptions = [
  "General Liability",
  "Property Damage",
  "Professional Liability",
  "Cyber Security",
  "Equipment Coverage",
  "Business Interruption",
];

export default function QuoteRequestForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    insuranceType: "",
    businessName: "",
    industry: "",
    employeeCount: "",
    annualRevenue: "",
    coverageNeeds: [] as string[],
    contactName: "",
    email: "",
    phone: "",
    additionalInfo: "",
  });

  const handleCoverageToggle = (coverage: string) => {
    setFormData(prev => ({
      ...prev,
      coverageNeeds: prev.coverageNeeds.includes(coverage)
        ? prev.coverageNeeds.filter(c => c !== coverage)
        : [...prev.coverageNeeds, coverage]
    }));
  };

  const handleSubmit = () => {
    console.log("Quote request submitted:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">Quote Request Received!</h3>
          <p className="text-muted-foreground mb-6">
            Thank you for your interest. One of our licensed agents will review your information and contact you within 24 hours with a competitive quote.
          </p>
          <Button onClick={() => { setSubmitted(false); setStep(1); }} data-testid="button-submit-another">
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Request a Quote</CardTitle>
        <div className="flex gap-2 mt-4">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full ${s <= step ? 'bg-primary' : 'bg-muted'}`}
              data-testid={`progress-step-${s}`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="insuranceType">What type of insurance do you need? *</Label>
              <Select
                value={formData.insuranceType}
                onValueChange={(value) => setFormData({ ...formData, insuranceType: value })}
              >
                <SelectTrigger data-testid="select-insurance-type">
                  <SelectValue placeholder="Select insurance type" />
                </SelectTrigger>
                <SelectContent>
                  {insuranceTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formData.insuranceType === "Commercial Auto" && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100 mb-3">
                  For Commercial Auto insurance (including limousine, taxi, TNC, and bus operations), we have a specialized quote form that collects detailed information about your fleet, drivers, and operations.
                </p>
                <a
                  href="/quote/commercial-auto"
                  className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  data-testid="link-commercial-auto-form"
                >
                  Use Commercial Auto Quote Form (Limousine/Taxi/TNC/Buses)
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            )}
            {formData.insuranceType === "General Liability" && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100 mb-3">
                  For General Liability insurance, we have a comprehensive application form that follows industry-standard underwriting requirements.
                </p>
                <a
                  href="/quote/general-liability"
                  className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  data-testid="link-general-liability-form"
                >
                  Use General Liability Application Form
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            )}
            {formData.insuranceType === "Workers Compensation" && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100 mb-3">
                  For Workers' Compensation insurance, we have a specialized form that collects payroll data, classification codes, claims history, and safety program information.
                </p>
                <a
                  href="/quote/workers-compensation"
                  className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  data-testid="link-workers-comp-form"
                >
                  Use Workers' Compensation Quote Form
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            )}
            {formData.insuranceType === "Truck & Trucking" && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100 mb-3">
                  For Trucking & Transportation insurance, we have a specialized application that collects fleet details, driver information, DOT numbers, and specialized cargo coverage options.
                </p>
                <a
                  href="/quote/trucking"
                  className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  data-testid="link-trucking-form"
                >
                  Use Transportation Insurance Application
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            )}
            {formData.insuranceType === "Habitational (Apartments/Condos)" && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100 mb-3">
                  For Habitational insurance (apartments, condominiums, co-ops, townhouses, and mixed-use properties), we have a comprehensive application that collects detailed property, occupancy, and safety information.
                </p>
                <a
                  href="/quote/habitational"
                  className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  data-testid="link-habitational-form"
                >
                  Use Habitational Insurance Application
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            )}
            {formData.insuranceType === "Hotel/Motel/Hospitality" && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100 mb-3">
                  For Hotel, Motel, and Hospitality insurance, we have a specialized application that collects detailed information about your property, amenities, revenue streams, and operational risks.
                </p>
                <a
                  href="/quote/hotel"
                  className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  data-testid="link-hotel-form"
                >
                  Use Hotel Insurance Application
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            )}
            {formData.insuranceType === "Restaurant Insurance" && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100 mb-3">
                  For Restaurant insurance, we have a comprehensive BOP application that evaluates your restaurant type, cooking methods, safety features, liquor service, and unique operational risks.
                </p>
                <a
                  href="/quote/restaurant"
                  className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  data-testid="link-restaurant-form"
                >
                  Use Restaurant BOP Application
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            )}
            {formData.insuranceType === "Religious Organizations" && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100 mb-3">
                  For Religious Organizations (churches, mosques, temples, synagogues, and other places of worship), we have a comprehensive application that addresses the unique risks and coverage needs of faith-based organizations.
                </p>
                <a
                  href="/quote/religious-organization"
                  className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  data-testid="link-religious-org-form"
                >
                  Use Religious Organization Application
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            )}
            {formData.insuranceType === "Commercial Property/Real Estate" && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100 mb-3">
                  For Commercial Property and Real Estate insurance, we have a detailed application that covers property management, shopping centers, residential complexes, warehouses, and other real estate investments.
                </p>
                <a
                  href="/quote/commercial-property"
                  className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  data-testid="link-commercial-property-form"
                >
                  Use Commercial Property/Real Estate Application
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            )}
            {formData.insuranceType === "Cyber Liability" && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100 mb-3">
                  For Cyber Liability insurance, we have a comprehensive application that evaluates your cybersecurity posture, data handling practices, incident response capabilities, and coverage needs for cyber incidents and technology errors.
                </p>
                <a
                  href="/quote/cyber-liability"
                  className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  data-testid="link-cyber-liability-form"
                >
                  Use Cyber Liability Application
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            )}
            {formData.insuranceType === "Employment Practices Liability" && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100 mb-3">
                  For Employment Practices Liability insurance, we have a comprehensive application that evaluates your workforce demographics, HR policies, claims history, and coverage needs for employment-related claims including wrongful termination, discrimination, and harassment.
                </p>
                <a
                  href="/quote/employment-practices"
                  className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  data-testid="link-employment-practices-form"
                >
                  Use Employment Practices Liability Application
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            )}
            {formData.insuranceType === "Builders Risk" && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100 mb-3">
                  For Builders Risk insurance covering construction projects, we have a specialized application that addresses project details, construction specifications, and site protection measures.
                </p>
                <a
                  href="/quote/builders-risk"
                  className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  data-testid="link-builders-risk-form"
                >
                  Use Builders Risk Application
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            )}
            {formData.insuranceType === "Vacant Building & Land" && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100 mb-3">
                  For Vacant Building and Land insurance, we have an application that evaluates property conditions, security measures, development plans, and potential hazards.
                </p>
                <a
                  href="/quote/vacant-building"
                  className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  data-testid="link-vacant-building-form"
                >
                  Use Vacant Building & Land Application
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            )}
            {formData.insuranceType === "Crane & Riggers Liability" && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100 mb-3">
                  For Crane & Riggers Liability insurance, we have a specialized application covering equipment operations, safety protocols, and high-risk lifting operations across various industries.
                </p>
                <a
                  href="/quote/crane-riggers"
                  className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  data-testid="link-crane-riggers-form"
                >
                  Use Crane & Riggers Liability Application
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="Your Business Name"
                data-testid="input-business-name"
              />
            </div>
            <div>
              <Label htmlFor="industry">Industry *</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="e.g., Construction, Retail, Restaurant"
                data-testid="input-industry"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employeeCount">Number of Employees</Label>
                <Select
                  value={formData.employeeCount}
                  onValueChange={(value) => setFormData({ ...formData, employeeCount: value })}
                >
                  <SelectTrigger data-testid="select-employee-count">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">1-5</SelectItem>
                    <SelectItem value="6-10">6-10</SelectItem>
                    <SelectItem value="11-25">11-25</SelectItem>
                    <SelectItem value="26-50">26-50</SelectItem>
                    <SelectItem value="51+">51+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="annualRevenue">Annual Revenue</Label>
                <Select
                  value={formData.annualRevenue}
                  onValueChange={(value) => setFormData({ ...formData, annualRevenue: value })}
                >
                  <SelectTrigger data-testid="select-revenue">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-250k">Under $250K</SelectItem>
                    <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                    <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                    <SelectItem value="1m+">Over $1M</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <Label>Select additional coverage needs:</Label>
            <div className="space-y-3">
              {coverageOptions.map((coverage) => (
                <div key={coverage} className="flex items-center space-x-2">
                  <Checkbox
                    id={coverage}
                    checked={formData.coverageNeeds.includes(coverage)}
                    onCheckedChange={() => handleCoverageToggle(coverage)}
                    data-testid={`checkbox-${coverage.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                  <label
                    htmlFor={coverage}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {coverage}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                placeholder="Any specific requirements or questions?"
                rows={4}
                data-testid="textarea-additional-info"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="contactName">Contact Name *</Label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                placeholder="Full Name"
                data-testid="input-contact-name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                data-testid="input-email"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(555) 123-4567"
                data-testid="input-phone"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} data-testid="button-back">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          {step < 4 ? (
            <Button onClick={() => setStep(step + 1)} className="ml-auto" data-testid="button-next">
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="ml-auto" data-testid="button-submit-quote">
              Submit Quote Request
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
