import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, CheckCircle, Home, Building2, Flame } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import californiaFairPlanLogo from "@assets/images_(5)_1765349979547.png";

const PROPERTY_TYPES = [
  { value: "dwelling", label: "Dwelling (1-4 units)", icon: Home },
  { value: "habitational", label: "Habitational Building (5+ units)", icon: Building2 },
  { value: "retail", label: "Retail Mercantile", icon: Building2 },
  { value: "manufacturing", label: "Manufacturing", icon: Building2 },
  { value: "office", label: "Office Building", icon: Building2 },
  { value: "construction", label: "Building Under Construction", icon: Building2 },
  { value: "farm-winery", label: "Farm or Winery", icon: Building2 },
];

const CONSTRUCTION_TYPES = [
  "Frame",
  "Masonry",
  "Fire Resistive",
  "Non-Combustible",
  "Mixed",
];

const ROOF_TYPES = [
  "Composition Shingle",
  "Tile",
  "Metal",
  "Built-Up",
  "Wood Shake",
  "Other",
];

export default function FairPlanQuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    propertyType: "",
    effectiveDate: "",
    namedInsured: "",
    email: "",
    phone: "",
    mailingAddress: "",
    mailingCity: "",
    mailingState: "CA",
    mailingZip: "",
    propertyAddress: "",
    propertyCity: "",
    propertyZip: "",
    sameAsMailingAddress: false,
    yearBuilt: "",
    squareFootage: "",
    constructionType: "",
    roofType: "",
    roofAge: "",
    numberOfStories: "",
    numberOfUnits: "",
    occupancyType: "",
    buildingCoverage: "",
    personalPropertyCoverage: "",
    lossOfUseCoverage: "",
    businessPersonalProperty: "",
    businessIncome: "",
    currentCarrier: "",
    currentPremium: "",
    reasonForFairPlan: "",
    hasDeclinedCoverage: "",
    declinedDetails: "",
    brushClearance: "",
    distanceToFireHydrant: "",
    distanceToFireStation: "",
    fireResistantRoof: "",
    hasDefensibleSpace: "",
    defensibleSpaceDetails: "",
    priorLosses: "",
    lossDetails: "",
    vandalismCoverage: false,
    additionalComments: "",
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === "sameAsMailingAddress" && value === true) {
      setFormData(prev => ({
        ...prev,
        sameAsMailingAddress: true,
        propertyAddress: prev.mailingAddress,
        propertyCity: prev.mailingCity,
        propertyZip: prev.mailingZip,
      }));
    }
  };

  const isResidential = formData.propertyType === "dwelling";
  const totalSteps = 5;

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const propertyTypeLabel = PROPERTY_TYPES.find(p => p.value === formData.propertyType)?.label || formData.propertyType;
      
      const messageDetails = [
        `CALIFORNIA FAIR PLAN QUOTE REQUEST`,
        ``,
        `PROPERTY TYPE: ${propertyTypeLabel}`,
        `Effective Date: ${formData.effectiveDate}`,
        ``,
        `PROPERTY LOCATION:`,
        `${formData.propertyAddress}`,
        `${formData.propertyCity}, CA ${formData.propertyZip}`,
        ``,
        `PROPERTY DETAILS:`,
        `Year Built: ${formData.yearBuilt}`,
        `Square Footage: ${formData.squareFootage}`,
        `Construction Type: ${formData.constructionType}`,
        `Roof Type: ${formData.roofType}`,
        `Roof Age: ${formData.roofAge} years`,
        `Number of Stories: ${formData.numberOfStories}`,
        formData.numberOfUnits ? `Number of Units: ${formData.numberOfUnits}` : '',
        `Occupancy: ${formData.occupancyType}`,
        ``,
        `COVERAGE REQUESTED:`,
        formData.buildingCoverage ? `Building Coverage: $${formData.buildingCoverage}` : '',
        formData.personalPropertyCoverage ? `Personal Property: $${formData.personalPropertyCoverage}` : '',
        formData.lossOfUseCoverage ? `Loss of Use: $${formData.lossOfUseCoverage}` : '',
        formData.businessPersonalProperty ? `Business Personal Property: $${formData.businessPersonalProperty}` : '',
        formData.businessIncome ? `Business Income: $${formData.businessIncome}` : '',
        `Vandalism Coverage: ${formData.vandalismCoverage ? 'Yes' : 'No'}`,
        ``,
        `CURRENT INSURANCE:`,
        `Current Carrier: ${formData.currentCarrier || 'None/Unknown'}`,
        `Current Premium: ${formData.currentPremium || 'N/A'}`,
        `Reason for FAIR Plan: ${formData.reasonForFairPlan}`,
        formData.hasDeclinedCoverage === 'yes' ? `Declined Details: ${formData.declinedDetails}` : '',
        ``,
        `FIRE SAFETY & MITIGATION:`,
        `Brush Clearance: ${formData.brushClearance}`,
        `Distance to Fire Hydrant: ${formData.distanceToFireHydrant}`,
        `Distance to Fire Station: ${formData.distanceToFireStation}`,
        `Fire Resistant Roof: ${formData.fireResistantRoof}`,
        `Defensible Space: ${formData.hasDefensibleSpace}`,
        formData.defensibleSpaceDetails ? `Defensible Space Details: ${formData.defensibleSpaceDetails}` : '',
        ``,
        `LOSS HISTORY:`,
        `Prior Losses in Last 5 Years: ${formData.priorLosses}`,
        formData.lossDetails ? `Loss Details: ${formData.lossDetails}` : '',
        ``,
        formData.additionalComments ? `ADDITIONAL COMMENTS:\n${formData.additionalComments}` : '',
      ].filter(Boolean).join('\n');

      const payload = {
        businessName: formData.namedInsured,
        contactName: formData.namedInsured,
        email: formData.email,
        phone: formData.phone,
        state: "CA",
        insuranceType: "California FAIR Plan",
        message: messageDetails,
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

      const data = await response.json();
      if (data.referenceNumber) {
        setReferenceNumber(data.referenceNumber);
      }
      
      setSubmitted(true);
      toast({
        title: "Quote Request Submitted",
        description: `Your California FAIR Plan quote request has been received. Reference: ${data.referenceNumber}`,
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Quote Request Submitted!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for your California FAIR Plan quote request. Our team will review your application and contact you within 1-2 business days.
          </p>
          {referenceNumber && (
            <div className="bg-muted p-4 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground">Your Reference Number</p>
              <p className="text-xl font-mono font-bold text-foreground">{referenceNumber}</p>
            </div>
          )}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-left">
            <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
              <Flame className="h-5 w-5" />
              Important Information
            </h3>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>The FAIR Plan provides basic fire coverage only (fire, lightning, internal explosion)</li>
              <li>Additional coverage options like liability and theft require separate policies</li>
              <li>We recommend a Difference in Conditions (DIC) policy to supplement FAIR Plan coverage</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Property Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROPERTY_TYPES.map((type) => {
                  const Icon = type.icon;
                  return (
                    <div
                      key={type.value}
                      onClick={() => handleInputChange("propertyType", type.value)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover-elevate ${
                        formData.propertyType === type.value
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                      data-testid={`select-property-type-${type.value}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          formData.propertyType === type.value
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium">{type.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="effectiveDate">Requested Effective Date *</Label>
                <Input
                  id="effectiveDate"
                  type="date"
                  value={formData.effectiveDate}
                  onChange={(e) => handleInputChange("effectiveDate", e.target.value)}
                  data-testid="input-effective-date"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="namedInsured">Named Insured / Property Owner *</Label>
                <Input
                  id="namedInsured"
                  value={formData.namedInsured}
                  onChange={(e) => handleInputChange("namedInsured", e.target.value)}
                  placeholder="Full legal name"
                  data-testid="input-named-insured"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="email@example.com"
                  data-testid="input-email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="(555) 555-5555"
                  data-testid="input-phone"
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-medium mb-4">Mailing Address</h4>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mailingAddress">Street Address *</Label>
                  <Input
                    id="mailingAddress"
                    value={formData.mailingAddress}
                    onChange={(e) => handleInputChange("mailingAddress", e.target.value)}
                    data-testid="input-mailing-address"
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mailingCity">City *</Label>
                    <Input
                      id="mailingCity"
                      value={formData.mailingCity}
                      onChange={(e) => handleInputChange("mailingCity", e.target.value)}
                      data-testid="input-mailing-city"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mailingState">State</Label>
                    <Input
                      id="mailingState"
                      value="California"
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mailingZip">ZIP Code *</Label>
                    <Input
                      id="mailingZip"
                      value={formData.mailingZip}
                      onChange={(e) => handleInputChange("mailingZip", e.target.value)}
                      data-testid="input-mailing-zip"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Checkbox
                  id="sameAddress"
                  checked={formData.sameAsMailingAddress}
                  onCheckedChange={(checked) => handleInputChange("sameAsMailingAddress", checked as boolean)}
                  data-testid="checkbox-same-address"
                />
                <Label htmlFor="sameAddress" className="cursor-pointer">Property address is same as mailing address</Label>
              </div>
              
              {!formData.sameAsMailingAddress && (
                <>
                  <h4 className="font-medium mb-4">Property Location</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="propertyAddress">Street Address *</Label>
                      <Input
                        id="propertyAddress"
                        value={formData.propertyAddress}
                        onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                        data-testid="input-property-address"
                      />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="propertyCity">City *</Label>
                        <Input
                          id="propertyCity"
                          value={formData.propertyCity}
                          onChange={(e) => handleInputChange("propertyCity", e.target.value)}
                          data-testid="input-property-city"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="propertyState">State</Label>
                        <Input
                          id="propertyState"
                          value="California"
                          disabled
                          className="bg-muted"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="propertyZip">ZIP Code *</Label>
                        <Input
                          id="propertyZip"
                          value={formData.propertyZip}
                          onChange={(e) => handleInputChange("propertyZip", e.target.value)}
                          data-testid="input-property-zip"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Property Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="yearBuilt">Year Built *</Label>
                <Input
                  id="yearBuilt"
                  value={formData.yearBuilt}
                  onChange={(e) => handleInputChange("yearBuilt", e.target.value)}
                  placeholder="e.g., 1985"
                  data-testid="input-year-built"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="squareFootage">Square Footage *</Label>
                <Input
                  id="squareFootage"
                  value={formData.squareFootage}
                  onChange={(e) => handleInputChange("squareFootage", e.target.value)}
                  placeholder="e.g., 2,500"
                  data-testid="input-square-footage"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numberOfStories">Number of Stories *</Label>
                <Input
                  id="numberOfStories"
                  value={formData.numberOfStories}
                  onChange={(e) => handleInputChange("numberOfStories", e.target.value)}
                  placeholder="e.g., 2"
                  data-testid="input-number-stories"
                />
              </div>
            </div>

            {!isResidential && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="numberOfUnits">Number of Units</Label>
                  <Input
                    id="numberOfUnits"
                    value={formData.numberOfUnits}
                    onChange={(e) => handleInputChange("numberOfUnits", e.target.value)}
                    placeholder="For habitational buildings"
                    data-testid="input-number-units"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="constructionType">Construction Type *</Label>
                <Select value={formData.constructionType} onValueChange={(value) => handleInputChange("constructionType", value)}>
                  <SelectTrigger data-testid="select-construction-type">
                    <SelectValue placeholder="Select construction type" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONSTRUCTION_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="roofType">Roof Type *</Label>
                <Select value={formData.roofType} onValueChange={(value) => handleInputChange("roofType", value)}>
                  <SelectTrigger data-testid="select-roof-type">
                    <SelectValue placeholder="Select roof type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROOF_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="roofAge">Roof Age (years) *</Label>
                <Input
                  id="roofAge"
                  value={formData.roofAge}
                  onChange={(e) => handleInputChange("roofAge", e.target.value)}
                  placeholder="e.g., 10"
                  data-testid="input-roof-age"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupancyType">Occupancy Type *</Label>
                <Select value={formData.occupancyType} onValueChange={(value) => handleInputChange("occupancyType", value)}>
                  <SelectTrigger data-testid="select-occupancy-type">
                    <SelectValue placeholder="Select occupancy" />
                  </SelectTrigger>
                  <SelectContent>
                    {isResidential ? (
                      <>
                        <SelectItem value="owner-occupied">Owner Occupied</SelectItem>
                        <SelectItem value="tenant-occupied">Tenant Occupied</SelectItem>
                        <SelectItem value="vacant">Vacant</SelectItem>
                        <SelectItem value="seasonal">Seasonal/Secondary</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="owner-occupied">Owner Occupied</SelectItem>
                        <SelectItem value="tenant-occupied">Tenant Occupied</SelectItem>
                        <SelectItem value="mixed-use">Mixed Use</SelectItem>
                        <SelectItem value="vacant">Vacant</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-medium mb-4">Coverage Amounts Requested</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="buildingCoverage">Building Coverage *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="buildingCoverage"
                      value={formData.buildingCoverage}
                      onChange={(e) => handleInputChange("buildingCoverage", e.target.value)}
                      className="pl-7"
                      placeholder="e.g., 500,000"
                      data-testid="input-building-coverage"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {isResidential ? "Max $3,000,000 per location" : "Max $20,000,000 (standard) or $100,000,000 (high-value)"}
                  </p>
                </div>
                
                {isResidential ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="personalPropertyCoverage">Personal Property Coverage</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          id="personalPropertyCoverage"
                          value={formData.personalPropertyCoverage}
                          onChange={(e) => handleInputChange("personalPropertyCoverage", e.target.value)}
                          className="pl-7"
                          placeholder="e.g., 100,000"
                          data-testid="input-personal-property"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lossOfUseCoverage">Loss of Use Coverage</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          id="lossOfUseCoverage"
                          value={formData.lossOfUseCoverage}
                          onChange={(e) => handleInputChange("lossOfUseCoverage", e.target.value)}
                          className="pl-7"
                          placeholder="e.g., 50,000"
                          data-testid="input-loss-of-use"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="businessPersonalProperty">Business Personal Property</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          id="businessPersonalProperty"
                          value={formData.businessPersonalProperty}
                          onChange={(e) => handleInputChange("businessPersonalProperty", e.target.value)}
                          className="pl-7"
                          placeholder="e.g., 250,000"
                          data-testid="input-business-property"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessIncome">Business Income</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          id="businessIncome"
                          value={formData.businessIncome}
                          onChange={(e) => handleInputChange("businessIncome", e.target.value)}
                          className="pl-7"
                          placeholder="e.g., 100,000"
                          data-testid="input-business-income"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-2 mt-4">
                <Checkbox
                  id="vandalismCoverage"
                  checked={formData.vandalismCoverage}
                  onCheckedChange={(checked) => handleInputChange("vandalismCoverage", checked as boolean)}
                  data-testid="checkbox-vandalism"
                />
                <Label htmlFor="vandalismCoverage" className="cursor-pointer">
                  Add Vandalism & Malicious Mischief Coverage (optional endorsement)
                </Label>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Fire Safety & Mitigation</h3>
            
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6">
              <p className="text-sm text-amber-800">
                The California FAIR Plan offers discounts for properties with fire-resistant features and defensible space. Please provide accurate information about your property's fire safety measures.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="brushClearance">Brush Clearance Status *</Label>
                <Select value={formData.brushClearance} onValueChange={(value) => handleInputChange("brushClearance", value)}>
                  <SelectTrigger data-testid="select-brush-clearance">
                    <SelectValue placeholder="Select brush clearance status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compliant-100ft">Compliant - 100+ feet cleared</SelectItem>
                    <SelectItem value="compliant-30ft">Compliant - 30-100 feet cleared</SelectItem>
                    <SelectItem value="partial">Partial compliance</SelectItem>
                    <SelectItem value="not-applicable">Not applicable (urban area)</SelectItem>
                    <SelectItem value="non-compliant">Non-compliant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="distanceToFireHydrant">Distance to Fire Hydrant *</Label>
                <Select value={formData.distanceToFireHydrant} onValueChange={(value) => handleInputChange("distanceToFireHydrant", value)}>
                  <SelectTrigger data-testid="select-fire-hydrant">
                    <SelectValue placeholder="Select distance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-500ft">Under 500 feet</SelectItem>
                    <SelectItem value="500-1000ft">500-1,000 feet</SelectItem>
                    <SelectItem value="1000-2000ft">1,000-2,000 feet</SelectItem>
                    <SelectItem value="over-2000ft">Over 2,000 feet</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="distanceToFireStation">Distance to Fire Station *</Label>
                <Select value={formData.distanceToFireStation} onValueChange={(value) => handleInputChange("distanceToFireStation", value)}>
                  <SelectTrigger data-testid="select-fire-station">
                    <SelectValue placeholder="Select distance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-5mi">Under 5 miles</SelectItem>
                    <SelectItem value="5-10mi">5-10 miles</SelectItem>
                    <SelectItem value="10-15mi">10-15 miles</SelectItem>
                    <SelectItem value="over-15mi">Over 15 miles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Fire Resistant Roof? *</Label>
                <RadioGroup 
                  value={formData.fireResistantRoof} 
                  onValueChange={(value) => handleInputChange("fireResistantRoof", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="roof-yes" data-testid="radio-roof-yes" />
                    <Label htmlFor="roof-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="roof-no" data-testid="radio-roof-no" />
                    <Label htmlFor="roof-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unknown" id="roof-unknown" data-testid="radio-roof-unknown" />
                    <Label htmlFor="roof-unknown">Unknown</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Do you have defensible space around the property? *</Label>
              <RadioGroup 
                value={formData.hasDefensibleSpace} 
                onValueChange={(value) => handleInputChange("hasDefensibleSpace", value)}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="space-yes" data-testid="radio-space-yes" />
                  <Label htmlFor="space-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="partial" id="space-partial" data-testid="radio-space-partial" />
                  <Label htmlFor="space-partial">Partial</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="space-no" data-testid="radio-space-no" />
                  <Label htmlFor="space-no">No</Label>
                </div>
              </RadioGroup>
              
              {(formData.hasDefensibleSpace === "yes" || formData.hasDefensibleSpace === "partial") && (
                <div className="space-y-2">
                  <Label htmlFor="defensibleSpaceDetails">Describe defensible space measures</Label>
                  <Textarea
                    id="defensibleSpaceDetails"
                    value={formData.defensibleSpaceDetails}
                    onChange={(e) => handleInputChange("defensibleSpaceDetails", e.target.value)}
                    placeholder="e.g., fire-resistant landscaping, gravel borders, ember-resistant vents..."
                    data-testid="textarea-defensible-space"
                  />
                </div>
              )}
            </div>

            <div className="border-t pt-6">
              <h4 className="font-medium mb-4">Loss History</h4>
              <div className="space-y-4">
                <Label>Any fire or property losses in the last 5 years? *</Label>
                <RadioGroup 
                  value={formData.priorLosses} 
                  onValueChange={(value) => handleInputChange("priorLosses", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="losses-yes" data-testid="radio-losses-yes" />
                    <Label htmlFor="losses-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="losses-no" data-testid="radio-losses-no" />
                    <Label htmlFor="losses-no">No</Label>
                  </div>
                </RadioGroup>
                
                {formData.priorLosses === "yes" && (
                  <div className="space-y-2">
                    <Label htmlFor="lossDetails">Please describe the losses</Label>
                    <Textarea
                      id="lossDetails"
                      value={formData.lossDetails}
                      onChange={(e) => handleInputChange("lossDetails", e.target.value)}
                      placeholder="Describe date, type, and amount of each loss..."
                      data-testid="textarea-loss-details"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Insurance History & Additional Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="currentCarrier">Current Insurance Carrier</Label>
                <Input
                  id="currentCarrier"
                  value={formData.currentCarrier}
                  onChange={(e) => handleInputChange("currentCarrier", e.target.value)}
                  placeholder="e.g., State Farm, Allstate, None"
                  data-testid="input-current-carrier"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentPremium">Current Annual Premium</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="currentPremium"
                    value={formData.currentPremium}
                    onChange={(e) => handleInputChange("currentPremium", e.target.value)}
                    className="pl-7"
                    placeholder="e.g., 2,500"
                    data-testid="input-current-premium"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="reasonForFairPlan">Why are you seeking FAIR Plan coverage? *</Label>
              <Select value={formData.reasonForFairPlan} onValueChange={(value) => handleInputChange("reasonForFairPlan", value)}>
                <SelectTrigger data-testid="select-reason">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="non-renewal">Received non-renewal notice</SelectItem>
                  <SelectItem value="declined">Declined by insurance companies</SelectItem>
                  <SelectItem value="high-premium">Traditional coverage too expensive</SelectItem>
                  <SelectItem value="fire-zone">Located in high fire hazard zone</SelectItem>
                  <SelectItem value="brush-area">Located in brush area</SelectItem>
                  <SelectItem value="new-purchase">New property purchase - cannot find coverage</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Have you been declined coverage in the last 12 months? *</Label>
              <RadioGroup 
                value={formData.hasDeclinedCoverage} 
                onValueChange={(value) => handleInputChange("hasDeclinedCoverage", value)}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="declined-yes" data-testid="radio-declined-yes" />
                  <Label htmlFor="declined-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="declined-no" data-testid="radio-declined-no" />
                  <Label htmlFor="declined-no">No</Label>
                </div>
              </RadioGroup>
              
              {formData.hasDeclinedCoverage === "yes" && (
                <div className="space-y-2">
                  <Label htmlFor="declinedDetails">Which companies declined and why?</Label>
                  <Textarea
                    id="declinedDetails"
                    value={formData.declinedDetails}
                    onChange={(e) => handleInputChange("declinedDetails", e.target.value)}
                    placeholder="List the companies and reasons given..."
                    data-testid="textarea-declined-details"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalComments">Additional Comments</Label>
              <Textarea
                id="additionalComments"
                value={formData.additionalComments}
                onChange={(e) => handleInputChange("additionalComments", e.target.value)}
                placeholder="Any other information that may be helpful for your quote..."
                rows={4}
                data-testid="textarea-additional-comments"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Before You Submit</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>Please review all information for accuracy</li>
                <li>Our team will contact you within 1-2 business days</li>
                <li>We may request additional documentation (photos, prior declarations page)</li>
                <li>FAIR Plan coverage is designed as a temporary solution - we'll also explore alternatives</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.propertyType && formData.effectiveDate;
      case 2:
        return formData.namedInsured && formData.email && formData.phone && 
               formData.mailingAddress && formData.mailingCity && formData.mailingZip &&
               (formData.sameAsMailingAddress || (formData.propertyAddress && formData.propertyCity && formData.propertyZip));
      case 3:
        return formData.yearBuilt && formData.squareFootage && formData.constructionType && 
               formData.roofType && formData.roofAge && formData.numberOfStories && 
               formData.occupancyType && formData.buildingCoverage;
      case 4:
        return formData.brushClearance && formData.distanceToFireHydrant && 
               formData.distanceToFireStation && formData.fireResistantRoof && 
               formData.hasDefensibleSpace && formData.priorLosses;
      case 5:
        return formData.reasonForFairPlan && formData.hasDeclinedCoverage;
      default:
        return false;
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="text-center border-b">
        <div className="flex justify-center mb-4">
          <img 
            src={californiaFairPlanLogo} 
            alt="California FAIR Plan" 
            className="h-12 w-auto"
          />
        </div>
        <CardTitle className="text-2xl">California FAIR Plan Quote Request</CardTitle>
        <CardDescription>
          Basic fire insurance for California properties when traditional coverage is unavailable
        </CardDescription>
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`w-8 h-2 rounded-full transition-colors ${
                i + 1 <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-2">Step {step} of {totalSteps}</p>
      </CardHeader>
      <CardContent className="p-6">
        {renderStep()}

        <div className="flex justify-between mt-8 pt-6 border-t">
          {step > 1 ? (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              data-testid="button-previous"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              data-testid="button-next"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed() || isLoading}
              data-testid="button-submit-quote"
            >
              {isLoading ? "Submitting..." : "Submit Quote Request"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
