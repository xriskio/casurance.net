import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

const insuranceTypes = [
  "Ambulance Services",
  "Auto Dealers / Used Car Dealers / Garage / Body Shop",
  "Builders Risk",
  "Business Owners Policy (BOP)",
  "Commercial Auto",
  "Commercial Property/Real Estate",
  "Contractors Insurance",
  "Crane & Riggers Liability",
  "Cyber Liability",
  "Employment Practices Liability",
  "Film Production",
  "General Liability",
  "Habitational (Apartments/Condos)",
  "Hotel/Motel/Hospitality",
  "Limousine Transportation",
  "NEMT / Paratransit",
  "Ocean Cargo/Marine",
  "Product Liability",
  "Professional Liability",
  "Public Transportation / Buses / Motorcoaches / School Buses",
  "Religious Organizations",
  "Restaurant Insurance",
  "Security Services",
  "Self Storage",
  "Taxi Insurance / Uber Black / Black Car",
  "TNC / Rideshare / Mobility",
  "Truck & Trucking",
  "Vacant Building & Land",
  "Workers Compensation",
];

const coverageOptions = [
  "General Liability",
  "Property Damage",
  "Professional Liability",
  "Cyber Security",
  "Equipment Coverage",
  "Business Interruption",
];

const comprehensiveFormLinks: Record<string, { url: string; title: string; description: string }> = {
  "General Liability": {
    url: "/quote/general-liability",
    title: "Use General Liability Application Form",
    description: "For General Liability insurance, we have a comprehensive application form that follows industry-standard underwriting requirements.",
  },
  "Commercial Auto": {
    url: "/quote/commercial-auto",
    title: "Use Commercial Auto Quote Form (Limousine/Taxi/TNC/Buses)",
    description: "For Commercial Auto insurance (including limousine, taxi, TNC, and bus operations), we have a specialized quote form that collects detailed information about your fleet, drivers, and operations.",
  },
  "Workers Compensation": {
    url: "/quote/workers-compensation",
    title: "Use Workers' Compensation Quote Form",
    description: "For Workers' Compensation insurance, we have a specialized form that collects payroll data, classification codes, claims history, and safety program information.",
  },
  "Truck & Trucking": {
    url: "/quote/trucking",
    title: "Use Transportation Insurance Application",
    description: "For Trucking & Transportation insurance, we have a specialized application that collects fleet details, driver information, DOT numbers, and specialized cargo coverage options.",
  },
  "Habitational (Apartments/Condos)": {
    url: "/quote/habitational",
    title: "Use Habitational Insurance Application",
    description: "For Habitational insurance (apartments, condominiums, co-ops, townhouses, and mixed-use properties), we have a comprehensive application that collects detailed property, occupancy, and safety information.",
  },
  "Hotel/Motel/Hospitality": {
    url: "/quote/hotel",
    title: "Use Hotel Insurance Application",
    description: "For Hotel, Motel, and Hospitality insurance, we have a specialized application that collects detailed information about your property, amenities, revenue streams, and operational risks.",
  },
  "Limousine Transportation": {
    url: "/quote/limousine",
    title: "Use Limousine Transportation Insurance Application",
    description: "For Limousine and Chauffeured Transportation insurance, we have a comprehensive application based on Philadelphia Insurance Companies standards. Covers auto liability, general liability, hired/non-owned liability, and physical damage coverage for luxury sedans, Mercedes Sprinters, party buses, and stretch limousines.",
  },
  "Restaurant Insurance": {
    url: "/quote/restaurant",
    title: "Use Restaurant BOP Application",
    description: "For Restaurant insurance, we have a comprehensive BOP application that evaluates your restaurant type, cooking methods, safety features, liquor service, and unique operational risks.",
  },
  "Religious Organizations": {
    url: "/quote/religious-organization",
    title: "Use Religious Organization Application",
    description: "For Religious Organizations (churches, mosques, temples, synagogues, and other places of worship), we have a comprehensive application that addresses the unique risks and coverage needs of faith-based organizations.",
  },
  "Commercial Property/Real Estate": {
    url: "/quote/commercial-property",
    title: "Use Commercial Property/Real Estate Application",
    description: "For Commercial Property and Real Estate insurance, we have a detailed application that covers property management, shopping centers, residential complexes, warehouses, and other real estate investments.",
  },
  "Builders Risk": {
    url: "/quote/builders-risk",
    title: "Use Builders Risk Application",
    description: "For Builders Risk insurance covering construction projects, we have a specialized application that addresses project details, construction specifications, and site protection measures.",
  },
  "Vacant Building & Land": {
    url: "/quote/vacant-building",
    title: "Use Vacant Building & Land Application",
    description: "For Vacant Building and Land insurance, we have an application that evaluates property conditions, security measures, development plans, and potential hazards.",
  },
  "Crane & Riggers Liability": {
    url: "/quote/crane-riggers",
    title: "Use Crane & Riggers Liability Application",
    description: "For Crane & Riggers Liability insurance, we have a specialized application covering equipment operations, safety protocols, and high-risk lifting operations across various industries.",
  },
  "Cyber Liability": {
    url: "/quote/cyber-liability",
    title: "Use Cyber Liability Application",
    description: "For Cyber Liability insurance, we have a comprehensive application that evaluates your cybersecurity posture, data handling practices, incident response capabilities, and coverage needs for cyber incidents and technology errors.",
  },
  "Employment Practices Liability": {
    url: "/quote/employment-practices",
    title: "Use Employment Practices Liability Application",
    description: "For Employment Practices Liability insurance, we have a comprehensive application that evaluates your workforce demographics, HR policies, claims history, and coverage needs for employment-related claims including wrongful termination, discrimination, and harassment.",
  },
  "Professional Liability": {
    url: "/quote/professional-liability",
    title: "Use Professional Liability Application",
    description: "For Professional Liability insurance (including Errors & Omissions coverage for professionals), we have a comprehensive application that evaluates your professional services, revenue, experience, and claims history.",
  },
  "Contractors Insurance": {
    url: "/quote/construction-casualty",
    title: "Use Construction Casualty (Contractors) Application",
    description: "For Contractors and Construction businesses, we have a specialized Construction Casualty application that collects information about your contractor's license, operations, projects, and risk management practices.",
  },
  "Ocean Cargo/Marine": {
    url: "/quote/ocean-cargo",
    title: "Use Ocean Cargo Application",
    description: "For Ocean Cargo and Marine insurance, we have a specialized application that covers cargo shipments, vessel details, commodity types, routing information, and risk management practices.",
  },
  "Self Storage": {
    url: "/quote/self-storage",
    title: "Use Self Storage Application",
    description: "For Self Storage facilities, we have a specialized application that evaluates your facility's security features, occupancy levels, climate control systems, and operational risks.",
  },
  "Film Production": {
    url: "/quote/film-production",
    title: "Use Film Production Application",
    description: "For Film Production, we have a comprehensive application covering all aspects of production insurance including general liability, equipment coverage, hired/non-owned auto, and winter weather protection.",
  },
  "Product Liability": {
    url: "/quote/product-liability",
    title: "Use Product Liability Application",
    description: "For Product Liability insurance, select your specific product type (manufacturing, cannabis, firearms, electronics, etc.) to access our specialized application tailored to your industry's unique risks and coverage requirements.",
  },
  "Public Transportation / Buses / Motorcoaches / School Buses": {
    url: "/quote/public-transportation",
    title: "Use Public Transportation Insurance Application",
    description: "For Public Transportation operations including Charter/Tour Buses, Municipal Transit, School Bus Contractors, and Motorcoaches, we have a comprehensive 6-step application based on RLI Fleet and Carolina Casualty standards. Covers auto liability up to $10M, physical damage, general liability, garage liability, operations details, safety programs, driver information, and vehicle schedules.",
  },
  "Security Services": {
    url: "/quote/security-services",
    title: "Use Security Services / Security Guard Application",
    description: "For Security Services and Security Guard companies, we have a comprehensive application that evaluates your guard operations, training programs, employee screening, weaponry policies, client contracts, and claims history.",
  },
  "Taxi Insurance / Uber Black / Black Car": {
    url: "/quote/taxi",
    title: "Use Taxi & Black Car Insurance Application",
    description: "For Taxi, Uber Black, Black Car, and for-hire vehicle operations, we have a comprehensive 6-step application based on AGMI Public Auto standards. Covers auto liability up to $5M, TNC participation (Uber/Lyft), dispatch operations, fleet details with meter requirements, driver classification (employee vs independent contractor), safety programs, and regulatory compliance.",
  },
  "NEMT / Paratransit": {
    url: "/apply/nemt",
    title: "Use NEMT / Paratransit Application",
    description: "For Non-Emergency Medical Transportation (NEMT) and Paratransit services, we have a specialized application that collects fleet details, driver information, coverage selections, and supporting documentation for vehicle lists, driver lists, and loss runs.",
  },
  "Ambulance Services": {
    url: "/apply/ambulance",
    title: "Use Ambulance Services Application",
    description: "For Ambulance and Emergency Medical Services, we have a comprehensive application that evaluates your fleet, driver qualifications, medical equipment, coverage needs, and operational risks specific to emergency medical transportation.",
  },
  "TNC / Rideshare / Mobility": {
    url: "/apply/tnc-rideshare",
    title: "Use TNC/Rideshare Application",
    description: "For Transportation Network Companies, rideshare platforms, and on-demand mobility services, we have a specialized application designed for sharing economy and gig-economy platforms with comprehensive coverage for platform operations, driver networks, and passenger transportation.",
  },
  "Auto Dealers / Used Car Dealers / Garage / Body Shop": {
    url: "/quote/auto-dealer-garage",
    title: "Use Auto Dealer & Garage Operations Application",
    description: "For Auto Dealerships (franchised and used car dealers), Garages, Body Shops, and Automotive Service Centers, we have a comprehensive 8-step application based on K2 Insurance standards. Covers dealer operations (sales, floor plan, dealer plates, test drives), garage liability, garagekeepers legal liability, dealers physical damage, garage operations, service shop coverage, and all aspects of automotive retail and service businesses.",
  },
};

interface QuoteRequestFormProps {
  compact?: boolean;
}

export default function QuoteRequestForm({ compact = false }: QuoteRequestFormProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string>("");
  const [showQuickQuote, setShowQuickQuote] = useState(false);
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

  const handleSubmit = async () => {
    try {
      const payload = {
        name: formData.contactName || formData.businessName || 'Quick Quote Request',
        email: formData.email,
        phone: formData.phone,
        insuranceType: formData.insuranceType,
        message: `Business: ${formData.businessName}\nIndustry: ${formData.industry}\nEmployees: ${formData.employeeCount}\nRevenue: ${formData.annualRevenue}\nCoverage Needs: ${formData.coverageNeeds.join(', ')}\nAdditional Info: ${formData.additionalInfo}`,
        status: 'pending'
      };

      const response = await fetch('/api/quick-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to submit quote request');
      }

      const result = await response.json();
      setReferenceNumber(result.referenceNumber || '');
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting quote:', error);
      setSubmitted(true);
    }
  };

  const comprehensiveForm = formData.insuranceType ? comprehensiveFormLinks[formData.insuranceType] : null;

  if (submitted) {
    const SuccessContent = (
      <div className={compact ? "text-center" : "p-12 text-center"}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className={`font-bold text-foreground mb-4 ${compact ? 'text-xl' : 'text-2xl'}`}>Quote Request Received!</h3>
        {referenceNumber && (
          <div className="bg-blue-50 dark:bg-blue-950 border-2 border-primary rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-1">Your Reference Number</p>
            <p className="text-2xl font-bold text-primary tracking-wider" data-testid="text-reference-number">{referenceNumber}</p>
            <p className="text-xs text-muted-foreground mt-2">Save this for reference</p>
          </div>
        )}
        <p className="text-muted-foreground mb-6 text-sm">
          One of our licensed agents will contact you within 24 hours with a competitive quote.
        </p>
        <Button onClick={() => { setSubmitted(false); setReferenceNumber(''); setStep(1); setShowQuickQuote(false); }} data-testid="button-submit-another">
          Submit Another Request
        </Button>
      </div>
    );

    if (compact) {
      return SuccessContent;
    }

    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent>{SuccessContent}</CardContent>
      </Card>
    );
  }

  const FormContent = (
    <div className="space-y-6">
        {/* Step 1: Insurance Type Selection */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="insuranceType">What type of insurance do you need? *</Label>
            <Select
              value={formData.insuranceType}
              onValueChange={(value) => {
                setFormData({ ...formData, insuranceType: value });
                setShowQuickQuote(false);
              }}
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

          {/* Show Comprehensive Application Notice */}
          {comprehensiveForm && (
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-900">
              <p className="text-sm text-blue-900 dark:text-blue-100 mb-4">
                {comprehensiveForm.description}
              </p>
              <Button
                onClick={() => window.location.href = comprehensiveForm.url}
                data-testid={`button-${formData.insuranceType.toLowerCase().replace(/[/\s&]+/g, '-')}-next`}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Quick Quote Toggle */}
          {formData.insuranceType && (
            <div className="border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowQuickQuote(!showQuickQuote)}
                className="w-full justify-between"
                data-testid="button-toggle-quick-quote"
              >
                <span>Or use Quick Quote Form</span>
                {showQuickQuote ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                For a faster quote, complete our simplified form below. Note: This may require additional follow-up for detailed underwriting.
              </p>
            </div>
          )}
        </div>

        {/* Quick Quote Form Steps */}
        {showQuickQuote && (
          <>
            {step === 1 && (
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold">Quick Quote - Business Information</h3>
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

            {step === 2 && (
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold">Quick Quote - Coverage Needs</h3>
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

            {step === 3 && (
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold">Quick Quote - Contact Information</h3>
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

            {/* Navigation Buttons for Quick Quote */}
            <div className="flex justify-between pt-4 border-t">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)} data-testid="button-back">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button onClick={() => setStep(step + 1)} className="ml-auto" data-testid="button-next">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="ml-auto" data-testid="button-submit-quote">
                  Submit Quick Quote
                </Button>
              )}
            </div>
          </>
        )}
    </div>
  );

  if (compact) {
    return FormContent;
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Request a Quote</CardTitle>
        {showQuickQuote && (
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full ${s <= step ? 'bg-primary' : 'bg-muted'}`}
                data-testid={`progress-step-${s}`}
              />
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {FormContent}
      </CardContent>
    </Card>
  );
}
