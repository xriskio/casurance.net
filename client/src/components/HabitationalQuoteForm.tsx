import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function HabitationalQuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Account Information
    namedInsured: "",
    email: "",
    phone: "",
    coName: "",
    effectiveDate: "",
    websiteAddress: "",
    mailingAddress: "",
    physicalAddress: "",
    contactPerson: "",
    contactPosition: "",
    faxNumber: "",
    billingContact: "",
    billingPhone: "",
    feinNumber: "",
    
    // Property Details
    communityType: "",
    numberOfBuildings: "",
    numberOfUnits: "",
    numberOfStories: "",
    yearBuilt: "",
    yearRenovated: "",
    grossSquareFeet: "",
    netLeaseableSquareFeet: "",
    
    // Coverage Information
    buildingLimit: "",
    propertyDeductible: "",
    coinsurance: "",
    valuationType: "",
    businessPersonalProperty: "",
    maintenanceFees: "",
    rents: "",
    grossPotentialRents: "",
    buildingOrdinance: "",
    windDeductible: "",
    earthquakeLimit: "",
    earthquakeDeductible: "",
    floodZone: "",
    floodLimit: "",
    floodDeductible: "",
    boilerCoverage: "",
    
    // Crime Coverage
    employeeDishonesty: "",
    depositorsForgery: "",
    computerFraud: "",
    moneySecurities: "",
    
    // Liability Coverage
    liabilityLimit: "",
    liabilityDeductible: "",
    umbrellaLimit: "",
    
    // Occupancy Information
    ownerOccupiedUnits: "",
    rentedUnits: "",
    shortTermRentals: "",
    vacantUnits: "",
    averageSalePrice: "",
    averageMonthlyRate: "",
    percentOccupied: "",
    commercialUnits: "",
    commercialSquareFeet: "",
    officeUnits: "",
    officeSquareFeet: "",
    
    // Building Construction
    constructionType: "",
    roofConstruction: "",
    wiringType: "",
    wiringUpdateYear: "",
    roofUpdateYear: "",
    plumbingUpdateYear: "",
    hvacUpdateYear: "",
    sprinklered: "",
    
    // Safety Features
    smokeDetectorsCommon: "",
    smokeDetectorsUnits: "",
    coDetectors: "",
    centralFireAlarm: "",
    securityPatrol: "",
    gatedProperty: "",
    
    // Management
    managementType: "",
    
    // Special Features
    numberOfPools: "",
    restaurantOnSite: "",
    hasCommercialCooking: "",
    studentHousing: "",
    subsidizedHousing: "",
    seniorHousing: "",
    
    // Additional Information
    additionalComments: "",
  });

  const [checkboxes, setCheckboxes] = useState({
    requireTenantInsurance: false,
    requireOwnerHO6: false,
    oneNightRentals: false,
    bankOwnedUnits: false,
    developerOwnedUnits: false,
    dogsAllowed: false,
    dogPark: false,
    deferredMaintenance: false,
    graffiti: false,
    renovation: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/habitational-quotes", {
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
          <h3 className="text-2xl font-bold text-foreground mb-4">Habitational Quote Request Received!</h3>
          <p className="text-muted-foreground mb-4">
            Thank you for your detailed submission.
          </p>
          <p className="text-lg font-semibold mb-2">
            Reference Number: {referenceNumber}
          </p>
          <p className="text-muted-foreground mb-6">
            Our habitational insurance specialists will review your property information and contact you within 24-48 hours with a competitive quote tailored to your apartment, condominium, or mixed-use property.
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
        <CardTitle>Habitational Insurance Quote Request</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Complete this application for apartments, condominiums, co-ops, townhouses, and mixed-use properties. Please provide detailed information for accurate pricing.
        </p>
        <div className="flex gap-2 mt-4">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full ${s <= step ? 'bg-primary' : 'bg-muted'}`}
              data-testid={`progress-step-${s}`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Step 1: Account Information */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Account Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="namedInsured">Name Insured *</Label>
                <Input
                  id="namedInsured"
                  value={formData.namedInsured}
                  onChange={(e) => setFormData({ ...formData, namedInsured: e.target.value })}
                  placeholder="Legal entity name"
                  data-testid="input-insured-name"
                />
              </div>
              <div>
                <Label htmlFor="coName">C/O (if applicable)</Label>
                <Input
                  id="coName"
                  value={formData.coName}
                  onChange={(e) => setFormData({ ...formData, coName: e.target.value })}
                  placeholder="Care of"
                  data-testid="input-co-name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div>
                <Label htmlFor="websiteAddress">Website Address</Label>
                <Input
                  id="websiteAddress"
                  type="url"
                  value={formData.websiteAddress}
                  onChange={(e) => setFormData({ ...formData, websiteAddress: e.target.value })}
                  placeholder="https://www.example.com"
                  data-testid="input-website"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="mailingAddress">Mailing Address *</Label>
              <Input
                id="mailingAddress"
                value={formData.mailingAddress}
                onChange={(e) => setFormData({ ...formData, mailingAddress: e.target.value })}
                placeholder="Full mailing address"
                data-testid="input-mailing-address"
              />
            </div>

            <div>
              <Label htmlFor="physicalAddress">Physical Location Address *</Label>
              <Input
                id="physicalAddress"
                value={formData.physicalAddress}
                onChange={(e) => setFormData({ ...formData, physicalAddress: e.target.value })}
                placeholder="Property street address"
                data-testid="input-physical-address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="Full name"
                  data-testid="input-contact-person"
                />
              </div>
              <div>
                <Label htmlFor="contactPosition">Position</Label>
                <Input
                  id="contactPosition"
                  value={formData.contactPosition}
                  onChange={(e) => setFormData({ ...formData, contactPosition: e.target.value })}
                  placeholder="Title/Position"
                  data-testid="input-contact-position"
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
                  placeholder="email@example.com"
                  data-testid="input-contact-email"
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
                  data-testid="input-contact-phone"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="faxNumber">Fax Number</Label>
                <Input
                  id="faxNumber"
                  type="tel"
                  value={formData.faxNumber}
                  onChange={(e) => setFormData({ ...formData, faxNumber: e.target.value })}
                  placeholder="(555) 123-4567"
                  data-testid="input-fax"
                />
              </div>
              <div>
                <Label htmlFor="feinNumber">FEIN Number *</Label>
                <Input
                  id="feinNumber"
                  value={formData.feinNumber}
                  onChange={(e) => setFormData({ ...formData, feinNumber: e.target.value })}
                  placeholder="XX-XXXXXXX"
                  data-testid="input-fein"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="billingContact">Billing Contact Person</Label>
                <Input
                  id="billingContact"
                  value={formData.billingContact}
                  onChange={(e) => setFormData({ ...formData, billingContact: e.target.value })}
                  placeholder="Full name"
                  data-testid="input-billing-contact"
                />
              </div>
              <div>
                <Label htmlFor="billingPhone">Billing Phone Number</Label>
                <Input
                  id="billingPhone"
                  type="tel"
                  value={formData.billingPhone}
                  onChange={(e) => setFormData({ ...formData, billingPhone: e.target.value })}
                  placeholder="(555) 123-4567"
                  data-testid="input-billing-phone"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Property Details */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Property Details</h3>
            
            <div>
              <Label htmlFor="communityType">Community Type *</Label>
              <Select
                value={formData.communityType}
                onValueChange={(value) => setFormData({ ...formData, communityType: value })}
              >
                <SelectTrigger data-testid="select-community-type">
                  <SelectValue placeholder="Select community type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential-condo">Residential Condominium</SelectItem>
                  <SelectItem value="cooperative">Cooperative Apartment</SelectItem>
                  <SelectItem value="timeshare">Timeshare</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="mixed-use">Mixed Use</SelectItem>
                  <SelectItem value="income-restricted">Income Restricted</SelectItem>
                  <SelectItem value="age-restricted">Age Restricted</SelectItem>
                  <SelectItem value="student-housing">Student Housing</SelectItem>
                  <SelectItem value="senior-housing">Senior Housing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="numberOfBuildings">Number of Buildings *</Label>
                <Input
                  id="numberOfBuildings"
                  type="number"
                  value={formData.numberOfBuildings}
                  onChange={(e) => setFormData({ ...formData, numberOfBuildings: e.target.value })}
                  placeholder="0"
                  data-testid="input-buildings"
                />
              </div>
              <div>
                <Label htmlFor="numberOfUnits">Number of Residential Units *</Label>
                <Input
                  id="numberOfUnits"
                  type="number"
                  value={formData.numberOfUnits}
                  onChange={(e) => setFormData({ ...formData, numberOfUnits: e.target.value })}
                  placeholder="0"
                  data-testid="input-units"
                />
              </div>
              <div>
                <Label htmlFor="numberOfStories">Number of Stories *</Label>
                <Input
                  id="numberOfStories"
                  type="number"
                  value={formData.numberOfStories}
                  onChange={(e) => setFormData({ ...formData, numberOfStories: e.target.value })}
                  placeholder="0"
                  data-testid="input-stories"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="yearBuilt">Year Built *</Label>
                <Input
                  id="yearBuilt"
                  type="number"
                  value={formData.yearBuilt}
                  onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
                  placeholder="YYYY"
                  data-testid="input-year-built"
                />
              </div>
              <div>
                <Label htmlFor="yearRenovated">Year Converted/Renovated</Label>
                <Input
                  id="yearRenovated"
                  type="number"
                  value={formData.yearRenovated}
                  onChange={(e) => setFormData({ ...formData, yearRenovated: e.target.value })}
                  placeholder="YYYY"
                  data-testid="input-year-renovated"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="grossSquareFeet">Gross Square Feet</Label>
                <Input
                  id="grossSquareFeet"
                  type="number"
                  value={formData.grossSquareFeet}
                  onChange={(e) => setFormData({ ...formData, grossSquareFeet: e.target.value })}
                  placeholder="0"
                  data-testid="input-gross-sqft"
                />
              </div>
              <div>
                <Label htmlFor="netLeaseableSquareFeet">Net Leaseable Square Feet</Label>
                <Input
                  id="netLeaseableSquareFeet"
                  type="number"
                  value={formData.netLeaseableSquareFeet}
                  onChange={(e) => setFormData({ ...formData, netLeaseableSquareFeet: e.target.value })}
                  placeholder="0"
                  data-testid="input-net-sqft"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="managementType">Management Type *</Label>
              <Select
                value={formData.managementType}
                onValueChange={(value) => setFormData({ ...formData, managementType: value })}
              >
                <SelectTrigger data-testid="select-management-type">
                  <SelectValue placeholder="Select management type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="self-managed">Self Managed</SelectItem>
                  <SelectItem value="onsite-firm">On Site Property Management Firm</SelectItem>
                  <SelectItem value="offsite-firm">Off Site Property Management Firm</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 3: Coverage Information */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Coverage Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="buildingLimit">Building Limit ($) *</Label>
                <Input
                  id="buildingLimit"
                  type="number"
                  value={formData.buildingLimit}
                  onChange={(e) => setFormData({ ...formData, buildingLimit: e.target.value })}
                  placeholder="0"
                  data-testid="input-building-limit"
                />
              </div>
              <div>
                <Label htmlFor="businessPersonalProperty">Business Personal Property ($)</Label>
                <Input
                  id="businessPersonalProperty"
                  type="number"
                  value={formData.businessPersonalProperty}
                  onChange={(e) => setFormData({ ...formData, businessPersonalProperty: e.target.value })}
                  placeholder="0"
                  data-testid="input-bpp"
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
                  <SelectTrigger data-testid="select-property-deductible">
                    <SelectValue placeholder="Select deductible" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2500">$2,500</SelectItem>
                    <SelectItem value="5000">$5,000</SelectItem>
                    <SelectItem value="10000">$10,000</SelectItem>
                    <SelectItem value="15000">$15,000</SelectItem>
                    <SelectItem value="25000">$25,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="coinsurance">Coinsurance/Coverage</Label>
                <Select
                  value={formData.coinsurance}
                  onValueChange={(value) => setFormData({ ...formData, coinsurance: value })}
                >
                  <SelectTrigger data-testid="select-coinsurance">
                    <SelectValue placeholder="Select coinsurance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="80">80%</SelectItem>
                    <SelectItem value="90">90%</SelectItem>
                    <SelectItem value="100">100%</SelectItem>
                    <SelectItem value="blanket">Blanket</SelectItem>
                    <SelectItem value="agreed">Agreed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="valuationType">Valuation Type</Label>
                <Select
                  value={formData.valuationType}
                  onValueChange={(value) => setFormData({ ...formData, valuationType: value })}
                >
                  <SelectTrigger data-testid="select-valuation-type">
                    <SelectValue placeholder="Select valuation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acv">Actual Cash Value (A/C/V)</SelectItem>
                    <SelectItem value="rc">Replacement Cost (RC)</SelectItem>
                    <SelectItem value="extended-rc">Extended RC</SelectItem>
                    <SelectItem value="guaranteed-rc">Guaranteed RC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="grossPotentialRents">Gross Potential Rents ($)</Label>
                <Input
                  id="grossPotentialRents"
                  type="number"
                  value={formData.grossPotentialRents}
                  onChange={(e) => setFormData({ ...formData, grossPotentialRents: e.target.value })}
                  placeholder="0"
                  data-testid="input-gross-rents"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maintenanceFees">Maintenance Fees ($)</Label>
                <Input
                  id="maintenanceFees"
                  type="number"
                  value={formData.maintenanceFees}
                  onChange={(e) => setFormData({ ...formData, maintenanceFees: e.target.value })}
                  placeholder="0"
                  data-testid="input-maintenance-fees"
                />
              </div>
              <div>
                <Label htmlFor="buildingOrdinance">Building Ordinance - Increased Cost ($)</Label>
                <Input
                  id="buildingOrdinance"
                  type="number"
                  value={formData.buildingOrdinance}
                  onChange={(e) => setFormData({ ...formData, buildingOrdinance: e.target.value })}
                  placeholder="0"
                  data-testid="input-building-ordinance"
                />
              </div>
            </div>

            <h4 className="font-medium mt-6">Crime Coverage</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employeeDishonesty">Employee Dishonesty ($)</Label>
                <Input
                  id="employeeDishonesty"
                  type="number"
                  value={formData.employeeDishonesty}
                  onChange={(e) => setFormData({ ...formData, employeeDishonesty: e.target.value })}
                  placeholder="0"
                  data-testid="input-employee-dishonesty"
                />
              </div>
              <div>
                <Label htmlFor="computerFraud">Computer Fraud ($)</Label>
                <Input
                  id="computerFraud"
                  type="number"
                  value={formData.computerFraud}
                  onChange={(e) => setFormData({ ...formData, computerFraud: e.target.value })}
                  placeholder="0"
                  data-testid="input-computer-fraud"
                />
              </div>
            </div>

            <h4 className="font-medium mt-6">Liability Coverage</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="liabilityLimit">General Liability Limit</Label>
                <Select
                  value={formData.liabilityLimit}
                  onValueChange={(value) => setFormData({ ...formData, liabilityLimit: value })}
                >
                  <SelectTrigger data-testid="select-liability-limit">
                    <SelectValue placeholder="Select limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1m-2m">$1,000,000 / $2,000,000</SelectItem>
                    <SelectItem value="1m-3m">$1,000,000 / $3,000,000</SelectItem>
                    <SelectItem value="2m-4m">$2,000,000 / $4,000,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="umbrellaLimit">Umbrella Limit</Label>
                <Select
                  value={formData.umbrellaLimit}
                  onValueChange={(value) => setFormData({ ...formData, umbrellaLimit: value })}
                >
                  <SelectTrigger data-testid="select-umbrella-limit">
                    <SelectValue placeholder="Select limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1m">$1,000,000</SelectItem>
                    <SelectItem value="2m">$2,000,000</SelectItem>
                    <SelectItem value="3m">$3,000,000</SelectItem>
                    <SelectItem value="5m">$5,000,000</SelectItem>
                    <SelectItem value="10m">$10,000,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Occupancy Information */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Occupancy Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ownerOccupiedUnits">Owner Occupied Units</Label>
                <Input
                  id="ownerOccupiedUnits"
                  type="number"
                  value={formData.ownerOccupiedUnits}
                  onChange={(e) => setFormData({ ...formData, ownerOccupiedUnits: e.target.value })}
                  placeholder="0"
                  data-testid="input-owner-occupied"
                />
              </div>
              <div>
                <Label htmlFor="rentedUnits">Rented Units</Label>
                <Input
                  id="rentedUnits"
                  type="number"
                  value={formData.rentedUnits}
                  onChange={(e) => setFormData({ ...formData, rentedUnits: e.target.value })}
                  placeholder="0"
                  data-testid="input-rented-units"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="shortTermRentals">Short-Term Rentals (less than 1 year)</Label>
                <Input
                  id="shortTermRentals"
                  type="number"
                  value={formData.shortTermRentals}
                  onChange={(e) => setFormData({ ...formData, shortTermRentals: e.target.value })}
                  placeholder="0"
                  data-testid="input-short-term-rentals"
                />
              </div>
              <div>
                <Label htmlFor="vacantUnits">Vacant Units</Label>
                <Input
                  id="vacantUnits"
                  type="number"
                  value={formData.vacantUnits}
                  onChange={(e) => setFormData({ ...formData, vacantUnits: e.target.value })}
                  placeholder="0"
                  data-testid="input-vacant-units"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="averageSalePrice">Average Sale/Resell Price ($)</Label>
                <Input
                  id="averageSalePrice"
                  type="number"
                  value={formData.averageSalePrice}
                  onChange={(e) => setFormData({ ...formData, averageSalePrice: e.target.value })}
                  placeholder="0"
                  data-testid="input-avg-sale-price"
                />
              </div>
              <div>
                <Label htmlFor="averageMonthlyRate">Average Monthly Rate ($)</Label>
                <Input
                  id="averageMonthlyRate"
                  type="number"
                  value={formData.averageMonthlyRate}
                  onChange={(e) => setFormData({ ...formData, averageMonthlyRate: e.target.value })}
                  placeholder="0"
                  data-testid="input-avg-monthly-rate"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="percentOccupied">Percent Occupied (%)</Label>
              <Input
                id="percentOccupied"
                type="number"
                min="0"
                max="100"
                value={formData.percentOccupied}
                onChange={(e) => setFormData({ ...formData, percentOccupied: e.target.value })}
                placeholder="0"
                data-testid="input-percent-occupied"
              />
            </div>

            <h4 className="font-medium mt-6">Commercial/Office Occupancy</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="commercialUnits">Number of Commercial Units</Label>
                <Input
                  id="commercialUnits"
                  type="number"
                  value={formData.commercialUnits}
                  onChange={(e) => setFormData({ ...formData, commercialUnits: e.target.value })}
                  placeholder="0"
                  data-testid="input-commercial-units"
                />
              </div>
              <div>
                <Label htmlFor="commercialSquareFeet">Commercial Square Footage</Label>
                <Input
                  id="commercialSquareFeet"
                  type="number"
                  value={formData.commercialSquareFeet}
                  onChange={(e) => setFormData({ ...formData, commercialSquareFeet: e.target.value })}
                  placeholder="0"
                  data-testid="input-commercial-sqft"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="officeUnits">Number of Office Units</Label>
                <Input
                  id="officeUnits"
                  type="number"
                  value={formData.officeUnits}
                  onChange={(e) => setFormData({ ...formData, officeUnits: e.target.value })}
                  placeholder="0"
                  data-testid="input-office-units"
                />
              </div>
              <div>
                <Label htmlFor="officeSquareFeet">Office Square Footage</Label>
                <Input
                  id="officeSquareFeet"
                  type="number"
                  value={formData.officeSquareFeet}
                  onChange={(e) => setFormData({ ...formData, officeSquareFeet: e.target.value })}
                  placeholder="0"
                  data-testid="input-office-sqft"
                />
              </div>
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requireTenantInsurance"
                  checked={checkboxes.requireTenantInsurance}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, requireTenantInsurance: checked as boolean })}
                  data-testid="checkbox-require-tenant-insurance"
                />
                <Label htmlFor="requireTenantInsurance" className="font-normal cursor-pointer">
                  Are tenants required to obtain insurance?
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requireOwnerHO6"
                  checked={checkboxes.requireOwnerHO6}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, requireOwnerHO6: checked as boolean })}
                  data-testid="checkbox-require-ho6"
                />
                <Label htmlFor="requireOwnerHO6" className="font-normal cursor-pointer">
                  Are unit owners required to maintain individual liability insurance (HO6)?
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="oneNightRentals"
                  checked={checkboxes.oneNightRentals}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, oneNightRentals: checked as boolean })}
                  data-testid="checkbox-one-night-rentals"
                />
                <Label htmlFor="oneNightRentals" className="font-normal cursor-pointer">
                  Any one night rental units?
                </Label>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Building Construction & Safety */}
        {step === 5 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Building Construction & Safety Features</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="constructionType">Construction Type *</Label>
                <Select
                  value={formData.constructionType}
                  onValueChange={(value) => setFormData({ ...formData, constructionType: value })}
                >
                  <SelectTrigger data-testid="select-construction-type">
                    <SelectValue placeholder="Select construction type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frame-joisted-masonry">Frame Joisted Masonry</SelectItem>
                    <SelectItem value="noncombustible">Noncombustible</SelectItem>
                    <SelectItem value="masonry-noncombustible">Masonry Noncombustible</SelectItem>
                    <SelectItem value="fire-resistive">Fire Resistive</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="roofConstruction">Roof Construction</Label>
                <Input
                  id="roofConstruction"
                  value={formData.roofConstruction}
                  onChange={(e) => setFormData({ ...formData, roofConstruction: e.target.value })}
                  placeholder="e.g., Composition, Metal, Tile"
                  data-testid="input-roof-construction"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="wiringType">Wiring Type</Label>
                <Select
                  value={formData.wiringType}
                  onValueChange={(value) => setFormData({ ...formData, wiringType: value })}
                >
                  <SelectTrigger data-testid="select-wiring-type">
                    <SelectValue placeholder="Select wiring type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="copper">Copper</SelectItem>
                    <SelectItem value="aluminum">Aluminum</SelectItem>
                    <SelectItem value="knob-tube">Knob & Tube</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="sprinklered">Sprinklered</Label>
                <Select
                  value={formData.sprinklered}
                  onValueChange={(value) => setFormData({ ...formData, sprinklered: value })}
                >
                  <SelectTrigger data-testid="select-sprinklered">
                    <SelectValue placeholder="Select sprinkler status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes-100">Yes - 100%</SelectItem>
                    <SelectItem value="yes-partial">Yes - Partial</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <h4 className="font-medium mt-6">Update Years</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="wiringUpdateYear">Wiring Update Year</Label>
                <Input
                  id="wiringUpdateYear"
                  type="number"
                  value={formData.wiringUpdateYear}
                  onChange={(e) => setFormData({ ...formData, wiringUpdateYear: e.target.value })}
                  placeholder="YYYY"
                  data-testid="input-wiring-update"
                />
              </div>
              <div>
                <Label htmlFor="roofUpdateYear">Roof Update Year</Label>
                <Input
                  id="roofUpdateYear"
                  type="number"
                  value={formData.roofUpdateYear}
                  onChange={(e) => setFormData({ ...formData, roofUpdateYear: e.target.value })}
                  placeholder="YYYY"
                  data-testid="input-roof-update"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="plumbingUpdateYear">Plumbing Update Year</Label>
                <Input
                  id="plumbingUpdateYear"
                  type="number"
                  value={formData.plumbingUpdateYear}
                  onChange={(e) => setFormData({ ...formData, plumbingUpdateYear: e.target.value })}
                  placeholder="YYYY"
                  data-testid="input-plumbing-update"
                />
              </div>
              <div>
                <Label htmlFor="hvacUpdateYear">HVAC Update Year</Label>
                <Input
                  id="hvacUpdateYear"
                  type="number"
                  value={formData.hvacUpdateYear}
                  onChange={(e) => setFormData({ ...formData, hvacUpdateYear: e.target.value })}
                  placeholder="YYYY"
                  data-testid="input-hvac-update"
                />
              </div>
            </div>

            <h4 className="font-medium mt-6">Safety & Security Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="smokeDetectorsCommon">Smoke Detectors in Common Areas</Label>
                <Select
                  value={formData.smokeDetectorsCommon}
                  onValueChange={(value) => setFormData({ ...formData, smokeDetectorsCommon: value })}
                >
                  <SelectTrigger data-testid="select-smoke-common">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hardwired">Hardwired</SelectItem>
                    <SelectItem value="battery">Battery</SelectItem>
                    <SelectItem value="na">N/A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="smokeDetectorsUnits">Smoke Detectors in Units</Label>
                <Select
                  value={formData.smokeDetectorsUnits}
                  onValueChange={(value) => setFormData({ ...formData, smokeDetectorsUnits: value })}
                >
                  <SelectTrigger data-testid="select-smoke-units">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hardwired">Hardwired</SelectItem>
                    <SelectItem value="battery">Battery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="coDetectors">CO Detectors</Label>
                <Select
                  value={formData.coDetectors}
                  onValueChange={(value) => setFormData({ ...formData, coDetectors: value })}
                >
                  <SelectTrigger data-testid="select-co-detectors">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="centralFireAlarm">Central Station Fire Alarm</Label>
                <Select
                  value={formData.centralFireAlarm}
                  onValueChange={(value) => setFormData({ ...formData, centralFireAlarm: value })}
                >
                  <SelectTrigger data-testid="select-fire-alarm">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="securityPatrol">Security Patrol</Label>
                <Select
                  value={formData.securityPatrol}
                  onValueChange={(value) => setFormData({ ...formData, securityPatrol: value })}
                >
                  <SelectTrigger data-testid="select-security-patrol">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="gatedProperty">Gated Property</Label>
                <Select
                  value={formData.gatedProperty}
                  onValueChange={(value) => setFormData({ ...formData, gatedProperty: value })}
                >
                  <SelectTrigger data-testid="select-gated">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="numberOfPools">Number of Swimming Pools</Label>
              <Input
                id="numberOfPools"
                type="number"
                value={formData.numberOfPools}
                onChange={(e) => setFormData({ ...formData, numberOfPools: e.target.value })}
                placeholder="0"
                data-testid="input-pools"
              />
            </div>
          </div>
        )}

        {/* Step 6: Additional Information & Documents */}
        {step === 6 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Additional Information & Document Upload</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="bankOwnedUnits"
                  checked={checkboxes.bankOwnedUnits}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, bankOwnedUnits: checked as boolean })}
                  data-testid="checkbox-bank-owned"
                />
                <Label htmlFor="bankOwnedUnits" className="font-normal cursor-pointer">
                  Any bank owned units?
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="developerOwnedUnits"
                  checked={checkboxes.developerOwnedUnits}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, developerOwnedUnits: checked as boolean })}
                  data-testid="checkbox-developer-owned"
                />
                <Label htmlFor="developerOwnedUnits" className="font-normal cursor-pointer">
                  Any developer owned units?
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="dogsAllowed"
                  checked={checkboxes.dogsAllowed}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, dogsAllowed: checked as boolean })}
                  data-testid="checkbox-dogs-allowed"
                />
                <Label htmlFor="dogsAllowed" className="font-normal cursor-pointer">
                  Dogs allowed?
                </Label>
              </div>
              {checkboxes.dogsAllowed && (
                <div className="flex items-center space-x-2 ml-6">
                  <Checkbox
                    id="dogPark"
                    checked={checkboxes.dogPark}
                    onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, dogPark: checked as boolean })}
                    data-testid="checkbox-dog-park"
                  />
                  <Label htmlFor="dogPark" className="font-normal cursor-pointer">
                    Dog park with rules posted?
                  </Label>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="deferredMaintenance"
                  checked={checkboxes.deferredMaintenance}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, deferredMaintenance: checked as boolean })}
                  data-testid="checkbox-deferred-maintenance"
                />
                <Label htmlFor="deferredMaintenance" className="font-normal cursor-pointer">
                  Any deferred maintenance?
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="graffiti"
                  checked={checkboxes.graffiti}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, graffiti: checked as boolean })}
                  data-testid="checkbox-graffiti"
                />
                <Label htmlFor="graffiti" className="font-normal cursor-pointer">
                  Graffiti present?
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="renovation"
                  checked={checkboxes.renovation}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, renovation: checked as boolean })}
                  data-testid="checkbox-renovation"
                />
                <Label htmlFor="renovation" className="font-normal cursor-pointer">
                  Property under renovation?
                </Label>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-4">Required Documents</h4>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="colorPhotos">Color Photos (Representative buildings and auxiliary buildings) *</Label>
                  <Input
                    id="colorPhotos"
                    type="file"
                    accept="image/*"
                    multiple
                    data-testid="input-photos"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Upload multiple photos showing all buildings</p>
                </div>

                <div>
                  <Label htmlFor="lossRuns">Loss Runs (4-5 years currently valued) *</Label>
                  <Input
                    id="lossRuns"
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    data-testid="input-loss-runs"
                  />
                  <p className="text-xs text-muted-foreground mt-1">5 years required for accounts over $100,000</p>
                </div>

                <div>
                  <Label htmlFor="plotPlan">Plot Plan *</Label>
                  <Input
                    id="plotPlan"
                    type="file"
                    accept=".pdf,.dwg,.jpg,.png"
                    data-testid="input-plot-plan"
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
                  <p className="text-xs text-muted-foreground mt-1">Include auxiliary buildings and specific street addresses</p>
                </div>

                <div>
                  <Label htmlFor="financialStatement">Current Financial Statement</Label>
                  <Input
                    id="financialStatement"
                    type="file"
                    accept=".pdf,.xls,.xlsx"
                    data-testid="input-financial-statement"
                  />
                </div>

                <div>
                  <Label htmlFor="condoDocs">Condo/HOA Documents (if applicable)</Label>
                  <Input
                    id="condoDocs"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    multiple
                    data-testid="input-condo-docs"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Include bylaws, CC&Rs, and insurance section</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Label htmlFor="additionalComments">Additional Comments</Label>
              <Textarea
                id="additionalComments"
                value={formData.additionalComments}
                onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                placeholder="Please provide any additional information about the property, special features, ongoing improvements, or specific coverage needs..."
                rows={5}
                data-testid="textarea-additional-comments"
              />
            </div>

            <div className="bg-muted/50 p-4 rounded-md">
              <h4 className="font-medium mb-2">What Happens Next?</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Your submission will be reviewed by our habitational insurance specialists</li>
                <li>We'll analyze property details, coverage needs, and loss history</li>
                <li>You'll receive a competitive quote within 24-48 hours</li>
                <li>Our team will discuss coverage options and answer questions</li>
                <li>We can provide recommendations for property improvements that may reduce premiums</li>
              </ul>
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
          {step < 6 ? (
            <Button onClick={() => setStep(step + 1)} className="ml-auto" data-testid="button-next">
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="ml-auto" data-testid="button-submit-quote">
              Submit Habitational Quote Request
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
