import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, CheckCircle } from "lucide-react";

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
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    insuranceType: "",
    businessName: "",
    contactFirstName: "",
    contactLastName: "",
    email: "",
    phone: "",
    zipCode: "",
  });

  const isFormValid = () => {
    return (
      formData.insuranceType &&
      formData.businessName.trim() &&
      formData.contactFirstName.trim() &&
      formData.contactLastName.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      formData.zipCode.trim()
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    
    setIsSubmitting(true);
    try {
      const payload = {
        businessName: formData.businessName,
        contactName: `${formData.contactFirstName} ${formData.contactLastName}`,
        email: formData.email,
        phone: formData.phone,
        state: formData.zipCode,
        insuranceType: formData.insuranceType,
        message: `Zip Code: ${formData.zipCode}`,
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
    } finally {
      setIsSubmitting(false);
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
        <p className="text-muted-foreground mb-4 text-sm">
          A confirmation email has been sent to <strong>{formData.email}</strong>.
        </p>
        <p className="text-muted-foreground mb-6 text-sm">
          One of our licensed agents will contact you within 24 hours with a competitive quote.
        </p>
        <Button onClick={() => { setSubmitted(false); setReferenceNumber(''); setFormData({ insuranceType: "", businessName: "", contactFirstName: "", contactLastName: "", email: "", phone: "", zipCode: "" }); }} data-testid="button-submit-another">
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Insurance Type Selection */}
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

      {/* Show Comprehensive Application Notice */}
      {comprehensiveForm && (
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-900">
          <p className="text-sm text-blue-900 dark:text-blue-100 mb-4">
            {comprehensiveForm.description}
          </p>
          <Button
            type="button"
            onClick={() => window.location.href = comprehensiveForm.url}
            data-testid={`button-${formData.insuranceType.toLowerCase().replace(/[/\s&]+/g, '-')}-next`}
          >
            Use Detailed Application
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Quick Quote Section - Always Visible */}
      {formData.insuranceType && (
        <div className="border-t pt-6 space-y-4">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              In a Hurry? Quick Quote Form
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Complete the form below for a fast quote. All fields are required.
            </p>
          </div>

          {/* Business Name */}
          <div>
            <Label htmlFor="businessName">Business Name *</Label>
            <Input
              id="businessName"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              placeholder="Your Company Name"
              required
              data-testid="input-business-name"
            />
          </div>

          {/* Contact Name - First & Last */}
          <div>
            <Label>Your Name *</Label>
            <div className="grid grid-cols-2 gap-3 mt-1">
              <div>
                <Input
                  id="contactFirstName"
                  value={formData.contactFirstName}
                  onChange={(e) => setFormData({ ...formData, contactFirstName: e.target.value })}
                  placeholder="First"
                  required
                  data-testid="input-first-name"
                />
              </div>
              <div>
                <Input
                  id="contactLastName"
                  value={formData.contactLastName}
                  onChange={(e) => setFormData({ ...formData, contactLastName: e.target.value })}
                  placeholder="Last"
                  required
                  data-testid="input-last-name"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@company.com"
              required
              data-testid="input-email"
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(555) 123-4567"
              required
              data-testid="input-phone"
            />
          </div>

          {/* Zip Code */}
          <div>
            <Label htmlFor="zipCode">5 Digit Zip *</Label>
            <Input
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value.replace(/\D/g, '').slice(0, 5) })}
              placeholder="Enter the zip code where you need insurance"
              maxLength={5}
              required
              data-testid="input-zip-code"
            />
            <p className="text-xs text-muted-foreground mt-1">Enter the zip code where you need insurance</p>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full"
            disabled={!isFormValid() || isSubmitting}
            data-testid="button-submit-quick-quote"
          >
            {isSubmitting ? "Submitting..." : "In a Hurry? Submit Now"}
            {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      )}
    </form>
  );

  if (compact) {
    return FormContent;
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Request a Quote</CardTitle>
      </CardHeader>
      <CardContent>
        {FormContent}
      </CardContent>
    </Card>
  );
}
