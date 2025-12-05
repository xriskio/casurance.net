import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, CheckCircle, Building2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SERVICE_STATES } from "@shared/constants/states";

export default function OfficeQuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    namedInsured: "",
    email: "",
    phone: "",
    mailingAddress: "",
    city: "",
    state: "",
    zipCode: "",
    effectiveDate: "",
    websiteAddress: "",
    contactPerson: "",
    contactTitle: "",
    feinNumber: "",
    
    propertyAddress: "",
    propertyCity: "",
    propertyState: "",
    propertyZipCode: "",
    buildingType: "",
    numberOfStories: "",
    numberOfFloors: "",
    yearBuilt: "",
    yearRenovated: "",
    grossSquareFeet: "",
    netLeasableSquareFeet: "",
    numberOfElevators: "",
    numberOfTenants: "",
    
    constructionType: "",
    roofType: "",
    roofAge: "",
    hvacType: "",
    hvacAge: "",
    electricalUpdateYear: "",
    plumbingUpdateYear: "",
    
    sprinklered: "",
    sprinklerCoverage: "",
    fireAlarmType: "",
    fireAlarmMonitored: "",
    hasStandpipes: "",
    hasFirePump: "",
    hasFireRisers: "",
    hasFireDoors: "",
    hasEmergencyLighting: "",
    hasEmergencyGenerator: "",
    
    securityType: "",
    hasSecurityDesk: "",
    hasSecurityCameras: "",
    hasAccessControl: "",
    hasKeyCardEntry: "",
    
    buildingLimit: "",
    businessPersonalProperty: "",
    businessIncome: "",
    rentalIncome: "",
    propertyDeductible: "",
    valuationType: "",
    liabilityLimit: "",
    umbrellaLimit: "",
    
    parkingType: "",
    numberOfParkingSpaces: "",
    parkingGarage: "",
    garageType: "",
    
    additionalComments: "",
  });

  const [checkboxes, setCheckboxes] = useState({
    hasCafeteria: false,
    hasRestaurant: false,
    hasFitnessCenter: false,
    hasChildcare: false,
    hasDataCenter: false,
    hasMedicalTenant: false,
    hasLaboratory: false,
    hasConferenceCenter: false,
    classABuilding: false,
    leedCertified: false,
    energyStarRated: false,
    hasAsbestos: false,
    hasMold: false,
    underRenovation: false,
    hasDeferredMaintenance: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/office-quotes", {
        ...formData,
        payload: { ...formData, checkboxes }
      });
      
      setReferenceNumber(response.referenceNumber);
      setSubmitted(true);
      toast({
        title: "Quote Request Submitted",
        description: `Your reference number is ${response.referenceNumber}`,
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
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">Office Building Quote Request Received!</h3>
          <p className="text-muted-foreground mb-4">
            Thank you for your detailed submission.
          </p>
          <p className="text-lg font-semibold mb-2">
            Reference Number: {referenceNumber}
          </p>
          <p className="text-muted-foreground mb-6">
            Our commercial property insurance specialists will review your office building information and contact you within 24-48 hours with a competitive quote.
          </p>
          <Button onClick={() => { setSubmitted(false); setStep(1); }} data-testid="button-submit-another">
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Building2 className="h-6 w-6 text-primary" />
          <CardTitle>Office Building Insurance Quote Request</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Complete this application for mid-rise (7-14 stories) and high-rise (15+ stories) office buildings. Fire-resistive construction required for high-rise buildings.
        </p>
        <div className="flex gap-2 mt-4">
          {[1, 2, 3, 4, 5].map((s) => (
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
          <div key="step-1" className="space-y-4">
            <h3 className="font-semibold text-lg">Account Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="namedInsured">Named Insured *</Label>
                <Input
                  id="namedInsured"
                  value={formData.namedInsured}
                  onChange={(e) => setFormData({ ...formData, namedInsured: e.target.value })}
                  placeholder="Legal entity name"
                  data-testid="input-named-insured"
                />
              </div>
              <div>
                <Label htmlFor="effectiveDate">Effective Date *</Label>
                <Input
                  id="effectiveDate"
                  type="date"
                  value={formData.effectiveDate}
                  onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                  data-testid="input-effective-date"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@company.com"
                  data-testid="input-email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  data-testid="input-phone"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="mailingAddress">Mailing Address *</Label>
              <Input
                id="mailingAddress"
                value={formData.mailingAddress}
                onChange={(e) => setFormData({ ...formData, mailingAddress: e.target.value })}
                placeholder="Street address"
                data-testid="input-mailing-address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="City"
                  data-testid="input-city"
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Select 
                  value={formData.state} 
                  onValueChange={(value) => setFormData({ ...formData, state: value })}
                >
                  <SelectTrigger data-testid="select-state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_STATES.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  placeholder="12345"
                  data-testid="input-zip-code"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="Full name"
                  data-testid="input-contact-person"
                />
              </div>
              <div>
                <Label htmlFor="contactTitle">Title</Label>
                <Input
                  id="contactTitle"
                  value={formData.contactTitle}
                  onChange={(e) => setFormData({ ...formData, contactTitle: e.target.value })}
                  placeholder="Property Manager"
                  data-testid="input-contact-title"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="websiteAddress">Website</Label>
                <Input
                  id="websiteAddress"
                  type="url"
                  value={formData.websiteAddress}
                  onChange={(e) => setFormData({ ...formData, websiteAddress: e.target.value })}
                  placeholder="https://www.example.com"
                  data-testid="input-website"
                />
              </div>
              <div>
                <Label htmlFor="feinNumber">FEIN Number</Label>
                <Input
                  id="feinNumber"
                  value={formData.feinNumber}
                  onChange={(e) => setFormData({ ...formData, feinNumber: e.target.value })}
                  placeholder="XX-XXXXXXX"
                  data-testid="input-fein"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div key="step-2" className="space-y-4">
            <h3 className="font-semibold text-lg">Building Information</h3>
            
            <div>
              <Label htmlFor="propertyAddress">Property Address *</Label>
              <Input
                id="propertyAddress"
                value={formData.propertyAddress}
                onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                placeholder="Street address of building"
                data-testid="input-property-address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="propertyCity">City *</Label>
                <Input
                  id="propertyCity"
                  value={formData.propertyCity}
                  onChange={(e) => setFormData({ ...formData, propertyCity: e.target.value })}
                  placeholder="City"
                  data-testid="input-property-city"
                />
              </div>
              <div>
                <Label htmlFor="propertyState">State *</Label>
                <Select 
                  value={formData.propertyState} 
                  onValueChange={(value) => setFormData({ ...formData, propertyState: value })}
                >
                  <SelectTrigger data-testid="select-property-state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_STATES.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="propertyZipCode">ZIP Code *</Label>
                <Input
                  id="propertyZipCode"
                  value={formData.propertyZipCode}
                  onChange={(e) => setFormData({ ...formData, propertyZipCode: e.target.value })}
                  placeholder="12345"
                  data-testid="input-property-zip"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="buildingType">Building Type *</Label>
                <Select 
                  value={formData.buildingType} 
                  onValueChange={(value) => setFormData({ ...formData, buildingType: value })}
                >
                  <SelectTrigger data-testid="select-building-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single-tenant">Single Tenant</SelectItem>
                    <SelectItem value="multi-tenant">Multi-Tenant</SelectItem>
                    <SelectItem value="medical-office">Medical Office</SelectItem>
                    <SelectItem value="mixed-use">Mixed Use</SelectItem>
                    <SelectItem value="corporate-headquarters">Corporate Headquarters</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="numberOfStories">Number of Stories *</Label>
                <Input
                  id="numberOfStories"
                  type="number"
                  value={formData.numberOfStories}
                  onChange={(e) => setFormData({ ...formData, numberOfStories: e.target.value })}
                  placeholder="15"
                  data-testid="input-stories"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="yearBuilt">Year Built *</Label>
                <Input
                  id="yearBuilt"
                  type="number"
                  value={formData.yearBuilt}
                  onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
                  placeholder="2000"
                  data-testid="input-year-built"
                />
              </div>
              <div>
                <Label htmlFor="yearRenovated">Year Renovated</Label>
                <Input
                  id="yearRenovated"
                  type="number"
                  value={formData.yearRenovated}
                  onChange={(e) => setFormData({ ...formData, yearRenovated: e.target.value })}
                  placeholder="2020"
                  data-testid="input-year-renovated"
                />
              </div>
              <div>
                <Label htmlFor="numberOfElevators">Number of Elevators</Label>
                <Input
                  id="numberOfElevators"
                  type="number"
                  value={formData.numberOfElevators}
                  onChange={(e) => setFormData({ ...formData, numberOfElevators: e.target.value })}
                  placeholder="4"
                  data-testid="input-elevators"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="grossSquareFeet">Gross Square Feet *</Label>
                <Input
                  id="grossSquareFeet"
                  value={formData.grossSquareFeet}
                  onChange={(e) => setFormData({ ...formData, grossSquareFeet: e.target.value })}
                  placeholder="250,000"
                  data-testid="input-gross-sqft"
                />
              </div>
              <div>
                <Label htmlFor="netLeasableSquareFeet">Net Leasable Square Feet</Label>
                <Input
                  id="netLeasableSquareFeet"
                  value={formData.netLeasableSquareFeet}
                  onChange={(e) => setFormData({ ...formData, netLeasableSquareFeet: e.target.value })}
                  placeholder="200,000"
                  data-testid="input-net-sqft"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="numberOfTenants">Number of Tenants</Label>
              <Input
                id="numberOfTenants"
                type="number"
                value={formData.numberOfTenants}
                onChange={(e) => setFormData({ ...formData, numberOfTenants: e.target.value })}
                placeholder="25"
                data-testid="input-tenants"
              />
            </div>

            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium mb-3">Construction Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="constructionType">Construction Type *</Label>
                  <Select 
                    value={formData.constructionType} 
                    onValueChange={(value) => setFormData({ ...formData, constructionType: value })}
                  >
                    <SelectTrigger data-testid="select-construction">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fire-resistive">Fire Resistive (Required for 15+ stories)</SelectItem>
                      <SelectItem value="non-combustible">Non-Combustible</SelectItem>
                      <SelectItem value="masonry">Masonry Non-Combustible</SelectItem>
                      <SelectItem value="modified-fire-resistive">Modified Fire Resistive</SelectItem>
                      <SelectItem value="steel-frame">Steel Frame</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="roofType">Roof Type</Label>
                  <Select 
                    value={formData.roofType} 
                    onValueChange={(value) => setFormData({ ...formData, roofType: value })}
                  >
                    <SelectTrigger data-testid="select-roof">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="built-up">Built-Up</SelectItem>
                      <SelectItem value="membrane">Single-Ply Membrane</SelectItem>
                      <SelectItem value="metal">Metal</SelectItem>
                      <SelectItem value="modified-bitumen">Modified Bitumen</SelectItem>
                      <SelectItem value="concrete">Concrete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <Label htmlFor="roofAge">Roof Age (years)</Label>
                  <Input
                    id="roofAge"
                    type="number"
                    value={formData.roofAge}
                    onChange={(e) => setFormData({ ...formData, roofAge: e.target.value })}
                    placeholder="5"
                    data-testid="input-roof-age"
                  />
                </div>
                <div>
                  <Label htmlFor="electricalUpdateYear">Electrical Update Year</Label>
                  <Input
                    id="electricalUpdateYear"
                    type="number"
                    value={formData.electricalUpdateYear}
                    onChange={(e) => setFormData({ ...formData, electricalUpdateYear: e.target.value })}
                    placeholder="2020"
                    data-testid="input-electrical-year"
                  />
                </div>
                <div>
                  <Label htmlFor="plumbingUpdateYear">Plumbing Update Year</Label>
                  <Input
                    id="plumbingUpdateYear"
                    type="number"
                    value={formData.plumbingUpdateYear}
                    onChange={(e) => setFormData({ ...formData, plumbingUpdateYear: e.target.value })}
                    placeholder="2018"
                    data-testid="input-plumbing-year"
                  />
                </div>
                <div>
                  <Label htmlFor="hvacAge">HVAC Age (years)</Label>
                  <Input
                    id="hvacAge"
                    type="number"
                    value={formData.hvacAge}
                    onChange={(e) => setFormData({ ...formData, hvacAge: e.target.value })}
                    placeholder="10"
                    data-testid="input-hvac-age"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div key="step-3" className="space-y-4">
            <h3 className="font-semibold text-lg">Fire Protection & Safety Systems</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sprinklered">Sprinkler System *</Label>
                <Select 
                  value={formData.sprinklered} 
                  onValueChange={(value) => setFormData({ ...formData, sprinklered: value })}
                >
                  <SelectTrigger data-testid="select-sprinkler">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes - Fully Sprinklered</SelectItem>
                    <SelectItem value="partial">Partially Sprinklered</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.sprinklered === "yes" && (
                <div>
                  <Label htmlFor="sprinklerCoverage">Sprinkler Coverage</Label>
                  <Select 
                    value={formData.sprinklerCoverage} 
                    onValueChange={(value) => setFormData({ ...formData, sprinklerCoverage: value })}
                  >
                    <SelectTrigger data-testid="select-sprinkler-coverage">
                      <SelectValue placeholder="Select coverage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100% Coverage</SelectItem>
                      <SelectItem value="75-99">75-99% Coverage</SelectItem>
                      <SelectItem value="50-74">50-74% Coverage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fireAlarmType">Fire Alarm Type *</Label>
                <Select 
                  value={formData.fireAlarmType} 
                  onValueChange={(value) => setFormData({ ...formData, fireAlarmType: value })}
                >
                  <SelectTrigger data-testid="select-fire-alarm">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="central-station">Central Station</SelectItem>
                    <SelectItem value="local-alarm">Local Alarm</SelectItem>
                    <SelectItem value="proprietary">Proprietary Station</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fireAlarmMonitored">24/7 Monitoring</Label>
                <Select 
                  value={formData.fireAlarmMonitored} 
                  onValueChange={(value) => setFormData({ ...formData, fireAlarmMonitored: value })}
                >
                  <SelectTrigger data-testid="select-monitoring">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium mb-3">High-Rise Requirements (15+ stories)</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Required for buildings 15+ stories: Central station fire alarm, full sprinkler system, standpipes, fire pump, fire risers, fire doors, and emergency lighting.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="hasStandpipes">Standpipes</Label>
                  <Select 
                    value={formData.hasStandpipes} 
                    onValueChange={(value) => setFormData({ ...formData, hasStandpipes: value })}
                  >
                    <SelectTrigger data-testid="select-standpipes">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="hasFirePump">Fire Pump</Label>
                  <Select 
                    value={formData.hasFirePump} 
                    onValueChange={(value) => setFormData({ ...formData, hasFirePump: value })}
                  >
                    <SelectTrigger data-testid="select-fire-pump">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="hasFireRisers">Fire Risers</Label>
                  <Select 
                    value={formData.hasFireRisers} 
                    onValueChange={(value) => setFormData({ ...formData, hasFireRisers: value })}
                  >
                    <SelectTrigger data-testid="select-fire-risers">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <Label htmlFor="hasFireDoors">Fire Doors</Label>
                  <Select 
                    value={formData.hasFireDoors} 
                    onValueChange={(value) => setFormData({ ...formData, hasFireDoors: value })}
                  >
                    <SelectTrigger data-testid="select-fire-doors">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="hasEmergencyLighting">Emergency Lighting</Label>
                  <Select 
                    value={formData.hasEmergencyLighting} 
                    onValueChange={(value) => setFormData({ ...formData, hasEmergencyLighting: value })}
                  >
                    <SelectTrigger data-testid="select-emergency-lighting">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="hasEmergencyGenerator">Emergency Generator</Label>
                  <Select 
                    value={formData.hasEmergencyGenerator} 
                    onValueChange={(value) => setFormData({ ...formData, hasEmergencyGenerator: value })}
                  >
                    <SelectTrigger data-testid="select-generator">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium mb-3">Security Features</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="securityType">Security Type</Label>
                  <Select 
                    value={formData.securityType} 
                    onValueChange={(value) => setFormData({ ...formData, securityType: value })}
                  >
                    <SelectTrigger data-testid="select-security">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24-7-guard">24/7 Security Guard</SelectItem>
                      <SelectItem value="daytime-guard">Daytime Security Only</SelectItem>
                      <SelectItem value="lobby-attendant">Lobby Attendant</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="hasSecurityDesk">Security Desk/Concierge</Label>
                  <Select 
                    value={formData.hasSecurityDesk} 
                    onValueChange={(value) => setFormData({ ...formData, hasSecurityDesk: value })}
                  >
                    <SelectTrigger data-testid="select-security-desk">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <Label htmlFor="hasSecurityCameras">Security Cameras</Label>
                  <Select 
                    value={formData.hasSecurityCameras} 
                    onValueChange={(value) => setFormData({ ...formData, hasSecurityCameras: value })}
                  >
                    <SelectTrigger data-testid="select-cameras">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="hasAccessControl">Access Control System</Label>
                  <Select 
                    value={formData.hasAccessControl} 
                    onValueChange={(value) => setFormData({ ...formData, hasAccessControl: value })}
                  >
                    <SelectTrigger data-testid="select-access-control">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="hasKeyCardEntry">Key Card Entry</Label>
                  <Select 
                    value={formData.hasKeyCardEntry} 
                    onValueChange={(value) => setFormData({ ...formData, hasKeyCardEntry: value })}
                  >
                    <SelectTrigger data-testid="select-keycard">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div key="step-4" className="space-y-4">
            <h3 className="font-semibold text-lg">Coverage & Parking Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="buildingLimit">Building Limit *</Label>
                <Input
                  id="buildingLimit"
                  value={formData.buildingLimit}
                  onChange={(e) => setFormData({ ...formData, buildingLimit: e.target.value })}
                  placeholder="$50,000,000"
                  data-testid="input-building-limit"
                />
                <p className="text-xs text-muted-foreground mt-1">Max $100M per location</p>
              </div>
              <div>
                <Label htmlFor="businessPersonalProperty">Business Personal Property</Label>
                <Input
                  id="businessPersonalProperty"
                  value={formData.businessPersonalProperty}
                  onChange={(e) => setFormData({ ...formData, businessPersonalProperty: e.target.value })}
                  placeholder="$500,000"
                  data-testid="input-bpp"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessIncome">Business Income</Label>
                <Input
                  id="businessIncome"
                  value={formData.businessIncome}
                  onChange={(e) => setFormData({ ...formData, businessIncome: e.target.value })}
                  placeholder="$2,000,000"
                  data-testid="input-business-income"
                />
              </div>
              <div>
                <Label htmlFor="rentalIncome">Rental Income</Label>
                <Input
                  id="rentalIncome"
                  value={formData.rentalIncome}
                  onChange={(e) => setFormData({ ...formData, rentalIncome: e.target.value })}
                  placeholder="$3,000,000"
                  data-testid="input-rental-income"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="propertyDeductible">Property Deductible</Label>
                <Select 
                  value={formData.propertyDeductible} 
                  onValueChange={(value) => setFormData({ ...formData, propertyDeductible: value })}
                >
                  <SelectTrigger data-testid="select-deductible">
                    <SelectValue placeholder="Select deductible" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10000">$10,000</SelectItem>
                    <SelectItem value="25000">$25,000</SelectItem>
                    <SelectItem value="50000">$50,000</SelectItem>
                    <SelectItem value="100000">$100,000</SelectItem>
                    <SelectItem value="250000">$250,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="valuationType">Valuation Type</Label>
                <Select 
                  value={formData.valuationType} 
                  onValueChange={(value) => setFormData({ ...formData, valuationType: value })}
                >
                  <SelectTrigger data-testid="select-valuation">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="replacement-cost">Replacement Cost</SelectItem>
                    <SelectItem value="actual-cash-value">Actual Cash Value</SelectItem>
                    <SelectItem value="agreed-value">Agreed Value</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="liabilityLimit">General Liability Limit</Label>
                <Select 
                  value={formData.liabilityLimit} 
                  onValueChange={(value) => setFormData({ ...formData, liabilityLimit: value })}
                >
                  <SelectTrigger data-testid="select-liability">
                    <SelectValue placeholder="Select limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1000000">$1,000,000 / $2,000,000</SelectItem>
                    <SelectItem value="2000000">$2,000,000 / $4,000,000</SelectItem>
                    <SelectItem value="5000000">$5,000,000 / $10,000,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="umbrellaLimit">Umbrella Limit</Label>
                <Select 
                  value={formData.umbrellaLimit} 
                  onValueChange={(value) => setFormData({ ...formData, umbrellaLimit: value })}
                >
                  <SelectTrigger data-testid="select-umbrella">
                    <SelectValue placeholder="Select limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="5000000">$5,000,000</SelectItem>
                    <SelectItem value="10000000">$10,000,000</SelectItem>
                    <SelectItem value="25000000">$25,000,000</SelectItem>
                    <SelectItem value="50000000">$50,000,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium mb-3">Parking Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parkingType">Parking Type</Label>
                  <Select 
                    value={formData.parkingType} 
                    onValueChange={(value) => setFormData({ ...formData, parkingType: value })}
                  >
                    <SelectTrigger data-testid="select-parking-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="surface">Surface Lot</SelectItem>
                      <SelectItem value="garage">Parking Garage</SelectItem>
                      <SelectItem value="underground">Underground</SelectItem>
                      <SelectItem value="both">Surface + Garage</SelectItem>
                      <SelectItem value="none">No Parking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="numberOfParkingSpaces">Number of Parking Spaces</Label>
                  <Input
                    id="numberOfParkingSpaces"
                    type="number"
                    value={formData.numberOfParkingSpaces}
                    onChange={(e) => setFormData({ ...formData, numberOfParkingSpaces: e.target.value })}
                    placeholder="500"
                    data-testid="input-parking-spaces"
                  />
                </div>
              </div>

              {(formData.parkingType === "garage" || formData.parkingType === "both" || formData.parkingType === "underground") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="parkingGarage">Parking Garage Included in Building?</Label>
                    <Select 
                      value={formData.parkingGarage} 
                      onValueChange={(value) => setFormData({ ...formData, parkingGarage: value })}
                    >
                      <SelectTrigger data-testid="select-garage-included">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes - Same Structure</SelectItem>
                        <SelectItem value="no">No - Separate Structure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="garageType">Garage Construction</Label>
                    <Select 
                      value={formData.garageType} 
                      onValueChange={(value) => setFormData({ ...formData, garageType: value })}
                    >
                      <SelectTrigger data-testid="select-garage-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="concrete">Concrete</SelectItem>
                        <SelectItem value="steel">Steel</SelectItem>
                        <SelectItem value="precast">Precast Concrete</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 5 && (
          <div key="step-5" className="space-y-4">
            <h3 className="font-semibold text-lg">Building Features & Additional Information</h3>
            
            <div className="space-y-3">
              <h4 className="font-medium">Building Amenities & Special Tenants</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasCafeteria"
                    checked={checkboxes.hasCafeteria}
                    onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, hasCafeteria: checked as boolean })}
                    data-testid="checkbox-cafeteria"
                  />
                  <Label htmlFor="hasCafeteria" className="font-normal cursor-pointer">
                    Cafeteria/Food Service
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasRestaurant"
                    checked={checkboxes.hasRestaurant}
                    onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, hasRestaurant: checked as boolean })}
                    data-testid="checkbox-restaurant"
                  />
                  <Label htmlFor="hasRestaurant" className="font-normal cursor-pointer">
                    Restaurant on Premises
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasFitnessCenter"
                    checked={checkboxes.hasFitnessCenter}
                    onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, hasFitnessCenter: checked as boolean })}
                    data-testid="checkbox-fitness"
                  />
                  <Label htmlFor="hasFitnessCenter" className="font-normal cursor-pointer">
                    Fitness Center
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasChildcare"
                    checked={checkboxes.hasChildcare}
                    onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, hasChildcare: checked as boolean })}
                    data-testid="checkbox-childcare"
                  />
                  <Label htmlFor="hasChildcare" className="font-normal cursor-pointer">
                    Childcare Facility
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasDataCenter"
                    checked={checkboxes.hasDataCenter}
                    onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, hasDataCenter: checked as boolean })}
                    data-testid="checkbox-datacenter"
                  />
                  <Label htmlFor="hasDataCenter" className="font-normal cursor-pointer">
                    Data Center
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasMedicalTenant"
                    checked={checkboxes.hasMedicalTenant}
                    onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, hasMedicalTenant: checked as boolean })}
                    data-testid="checkbox-medical"
                  />
                  <Label htmlFor="hasMedicalTenant" className="font-normal cursor-pointer">
                    Medical Tenant
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasLaboratory"
                    checked={checkboxes.hasLaboratory}
                    onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, hasLaboratory: checked as boolean })}
                    data-testid="checkbox-laboratory"
                  />
                  <Label htmlFor="hasLaboratory" className="font-normal cursor-pointer">
                    Laboratory Space
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasConferenceCenter"
                    checked={checkboxes.hasConferenceCenter}
                    onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, hasConferenceCenter: checked as boolean })}
                    data-testid="checkbox-conference"
                  />
                  <Label htmlFor="hasConferenceCenter" className="font-normal cursor-pointer">
                    Conference Center
                  </Label>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 mt-4 space-y-3">
              <h4 className="font-medium">Building Certifications</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="classABuilding"
                    checked={checkboxes.classABuilding}
                    onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, classABuilding: checked as boolean })}
                    data-testid="checkbox-class-a"
                  />
                  <Label htmlFor="classABuilding" className="font-normal cursor-pointer">
                    Class A Building
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="leedCertified"
                    checked={checkboxes.leedCertified}
                    onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, leedCertified: checked as boolean })}
                    data-testid="checkbox-leed"
                  />
                  <Label htmlFor="leedCertified" className="font-normal cursor-pointer">
                    LEED Certified
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="energyStarRated"
                    checked={checkboxes.energyStarRated}
                    onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, energyStarRated: checked as boolean })}
                    data-testid="checkbox-energy-star"
                  />
                  <Label htmlFor="energyStarRated" className="font-normal cursor-pointer">
                    ENERGY STAR Rated
                  </Label>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 mt-4 space-y-3">
              <h4 className="font-medium">Property Conditions</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasAsbestos"
                    checked={checkboxes.hasAsbestos}
                    onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, hasAsbestos: checked as boolean })}
                    data-testid="checkbox-asbestos"
                  />
                  <Label htmlFor="hasAsbestos" className="font-normal cursor-pointer">
                    Known Asbestos Present
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasMold"
                    checked={checkboxes.hasMold}
                    onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, hasMold: checked as boolean })}
                    data-testid="checkbox-mold"
                  />
                  <Label htmlFor="hasMold" className="font-normal cursor-pointer">
                    Known Mold Issues
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="underRenovation"
                    checked={checkboxes.underRenovation}
                    onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, underRenovation: checked as boolean })}
                    data-testid="checkbox-renovation"
                  />
                  <Label htmlFor="underRenovation" className="font-normal cursor-pointer">
                    Currently Under Renovation
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasDeferredMaintenance"
                    checked={checkboxes.hasDeferredMaintenance}
                    onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, hasDeferredMaintenance: checked as boolean })}
                    data-testid="checkbox-deferred-maintenance"
                  />
                  <Label htmlFor="hasDeferredMaintenance" className="font-normal cursor-pointer">
                    Deferred Maintenance
                  </Label>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium mb-4">Required Documents</h4>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="colorPhotos">Building Photos *</Label>
                  <Input
                    id="colorPhotos"
                    type="file"
                    accept="image/*"
                    multiple
                    data-testid="input-photos"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Include exterior and lobby photos</p>
                </div>

                <div>
                  <Label htmlFor="lossRuns">Loss Runs (5 years currently valued) *</Label>
                  <Input
                    id="lossRuns"
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    data-testid="input-loss-runs"
                  />
                </div>

                <div>
                  <Label htmlFor="statementOfValues">Statement of Values *</Label>
                  <Input
                    id="statementOfValues"
                    type="file"
                    accept=".pdf,.xls,.xlsx,.doc,.docx"
                    data-testid="input-sov"
                  />
                </div>

                <div>
                  <Label htmlFor="rentRoll">Current Rent Roll</Label>
                  <Input
                    id="rentRoll"
                    type="file"
                    accept=".pdf,.xls,.xlsx"
                    data-testid="input-rent-roll"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Label htmlFor="additionalComments">Additional Comments</Label>
              <Textarea
                id="additionalComments"
                value={formData.additionalComments}
                onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                placeholder="Please provide any additional information about the property, recent upgrades, tenant information, or specific coverage needs..."
                rows={5}
                data-testid="textarea-additional-comments"
              />
            </div>

            <div className="bg-muted/50 p-4 rounded-md">
              <h4 className="font-medium mb-2">What Happens Next?</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Your submission will be reviewed by our commercial property specialists</li>
                <li>We'll analyze building details, fire protection, and coverage needs</li>
                <li>You'll receive a competitive quote within 24-48 hours</li>
                <li>Our team will discuss coverage options tailored to your building</li>
              </ul>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} disabled={isLoading} data-testid="button-back">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          {step < 5 ? (
            <Button onClick={() => setStep(step + 1)} className="ml-auto" data-testid="button-next">
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="ml-auto" disabled={isLoading} data-testid="button-submit-quote">
              {isLoading ? "Submitting..." : "Submit Office Building Quote Request"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
