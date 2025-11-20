import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function CommercialPackageQuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Policy Information
    effectiveDate: "",
    expirationDate: "",
    targetPremium: "",
    agencyControlsAccount: "",
    inspectionFee: "",
    adminFee: "",
    
    // Insured Information
    businessName: "",
    email: "",
    phone: "",
    dba: "",
    mailingAddress: "",
    mailingAddressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    legalEntityType: "",
    lessorsRiskOnly: "",
    websiteAddress: "",
    businessBeganUnder3Years: "",
    fein: "",
    gapInCoverage: "",
    financialInterestOthers: "",
    subsidiaryOfAnother: "",
    bankruptcyJudgmentLien: "",
    excludedOperations: "",
    
    // Location Information
    locationAddress: "",
    locationLine2: "",
    locationCity: "",
    locationState: "",
    locationZipCode: "",
    aopDeductible: "",
    firstFloorLocation: "",
    squareFeet: "",
    buildingConstructionType: "",
    yearBuilt: "",
    sprinklered: "",
    roofUpdated: "",
    plumbingUpdated: "",
    electricalUpdated: "",
    hvacUpdated: "",
    neighborsVacant: "",
    burglarAlarm: "",
    fireAlarm: "",
    closesAfterMidnight: "",
    
    // Building Coverage
    buildingValuation: "replacement-cost",
    buildingLimit: "",
    vacancyPercentage: "",
    roofType: "",
    numberOfTenants: "",
    outdoorSignCoverage: "",
    financialInterestBuilding: "",
    mortgageHolder: "",
    buildingPremium: "",
    
    // Business Personal Property
    bppLimit: "",
    bppValuation: "replacement-cost",
    bppLossPayee: "",
    bppPremium: "",
    
    // Business Income
    businessIncomeLimit: "",
    businessIncomePremium: "",
    
    // District Limit Coverage
    districtLimitCoverage: "50000",
    districtLimitPremium: "",
    
    // Additional Coverages
    utilityServicesDirectDamage: false,
    utilityServicesTimeElement: false,
    backupWaterSump: false,
    perishableProduct: false,
    equipmentBreakdown: false,
    employeeDishonesty: false,
    contractorsToolsEquipment: false,
    terrorismCoverage: false,
    
    // Liability Coverage
    liabilityDeductible: "0",
    additionalInsuredVendor: "",
    liabilityPremium: "",
    liquorLiability: false,
    additionalInsuredBlanket: false,
    employeeBenefitsLiability: false,
    waiverOfSubrogation: false,
    
    // Claims
    hasClaimsLast3Years: "",
    claimsDetails: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/commercial-package-quotes", {
        ...formData,
        payload: { ...formData }
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
          <h3 className="text-2xl font-bold text-foreground mb-4">Commercial Package Application Submitted!</h3>
          <p className="text-muted-foreground mb-4">
            Thank you for your comprehensive submission.
          </p>
          <p className="text-lg font-semibold mb-2">
            Reference Number: {referenceNumber}
          </p>
          <p className="text-muted-foreground mb-6">
            Our commercial package specialists will review your property and liability coverage needs to provide an accurate quote within 24-48 hours.
          </p>
          <Button onClick={() => { setSubmitted(false); setStep(1); }} data-testid="button-submit-another">
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Commercial Package Insurance Application</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Complete this comprehensive application for commercial package coverage including property, liability, and additional coverages. Provide detailed information for accurate pricing.
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
        {/* Step 1: Policy & Insured Information */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Policy & Insured Information</h3>
            
            <h4 className="font-medium mt-6">Policy Information</h4>
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
                <Label htmlFor="expirationDate">Expiration Date *</Label>
                <Input
                  id="expirationDate"
                  type="date"
                  value={formData.expirationDate}
                  onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                  data-testid="input-expiration-date"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="targetPremium">Target Premium ($) *</Label>
                <Input
                  id="targetPremium"
                  type="number"
                  value={formData.targetPremium}
                  onChange={(e) => setFormData({ ...formData, targetPremium: e.target.value })}
                  placeholder="0"
                  data-testid="input-target-premium"
                />
              </div>
              <div>
                <Label htmlFor="inspectionFee">Inspection Fee ($)</Label>
                <Input
                  id="inspectionFee"
                  type="number"
                  value={formData.inspectionFee}
                  onChange={(e) => setFormData({ ...formData, inspectionFee: e.target.value })}
                  placeholder="0"
                  data-testid="input-inspection-fee"
                />
              </div>
              <div>
                <Label htmlFor="adminFee">Administration Fee ($)</Label>
                <Input
                  id="adminFee"
                  type="number"
                  value={formData.adminFee}
                  onChange={(e) => setFormData({ ...formData, adminFee: e.target.value })}
                  placeholder="0"
                  data-testid="input-admin-fee"
                />
              </div>
            </div>

            <div>
              <Label>Does your agency currently control this account? *</Label>
              <RadioGroup
                value={formData.agencyControlsAccount}
                onValueChange={(value) => setFormData({ ...formData, agencyControlsAccount: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="agency-yes" />
                  <Label htmlFor="agency-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="agency-no" />
                  <Label htmlFor="agency-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            <h4 className="font-medium mt-6">Insured Information</h4>
            <div>
              <Label htmlFor="businessName">Full Legal Name of the Business *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="Legal business name"
                data-testid="input-business-name"
              />
            </div>

            <div>
              <Label htmlFor="dba">Doing Business As (DBA)</Label>
              <Input
                id="dba"
                value={formData.dba}
                onChange={(e) => setFormData({ ...formData, dba: e.target.value })}
                placeholder="DBA name if different"
                data-testid="input-dba"
              />
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

            <div>
              <Label htmlFor="mailingAddressLine2">Address Line 2</Label>
              <Input
                id="mailingAddressLine2"
                value={formData.mailingAddressLine2}
                onChange={(e) => setFormData({ ...formData, mailingAddressLine2: e.target.value })}
                placeholder="Suite, Unit, etc."
                data-testid="input-mailing-line2"
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
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="CA"
                  maxLength={2}
                  data-testid="input-state"
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  placeholder="90001"
                  data-testid="input-zipcode"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="legalEntityType">Select the Legal Entity type of the business *</Label>
              <Select
                value={formData.legalEntityType}
                onValueChange={(value) => setFormData({ ...formData, legalEntityType: value })}
              >
                <SelectTrigger data-testid="select-entity-type">
                  <SelectValue placeholder="Select legal entity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corporation">Corporation</SelectItem>
                  <SelectItem value="llc">LLC</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="sole-proprietor">Sole Proprietor</SelectItem>
                  <SelectItem value="nonprofit">Nonprofit</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fein">FEIN # (please no SSN's)</Label>
                <Input
                  id="fein"
                  value={formData.fein}
                  onChange={(e) => setFormData({ ...formData, fein: e.target.value })}
                  placeholder="00-0000000"
                  data-testid="input-fein"
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
              <Label>Is this Lessor's Risk Only? *</Label>
              <RadioGroup
                value={formData.lessorsRiskOnly}
                onValueChange={(value) => setFormData({ ...formData, lessorsRiskOnly: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="lessor-yes" />
                  <Label htmlFor="lessor-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="lessor-no" />
                  <Label htmlFor="lessor-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Did this business begin under the applicant's ownership within the last 3 years? *</Label>
              <RadioGroup
                value={formData.businessBeganUnder3Years}
                onValueChange={(value) => setFormData({ ...formData, businessBeganUnder3Years: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="began-yes" />
                  <Label htmlFor="began-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="began-no" />
                  <Label htmlFor="began-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {/* Step 2: Risk Assessment Questions */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Risk Assessment & Underwriting</h3>
            
            <div>
              <Label>Has the applicant experienced a gap of coverage, been cancelled or non-renewed in the past 5 years? *</Label>
              <RadioGroup
                value={formData.gapInCoverage}
                onValueChange={(value) => setFormData({ ...formData, gapInCoverage: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="gap-yes" />
                  <Label htmlFor="gap-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="gap-no" />
                  <Label htmlFor="gap-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Does the applicant have a financial interest of 50% or more in other businesses? *</Label>
              <RadioGroup
                value={formData.financialInterestOthers}
                onValueChange={(value) => setFormData({ ...formData, financialInterestOthers: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="financial-yes" />
                  <Label htmlFor="financial-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="financial-no" />
                  <Label htmlFor="financial-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Is the applicant a subsidiary of another entity? *</Label>
              <RadioGroup
                value={formData.subsidiaryOfAnother}
                onValueChange={(value) => setFormData({ ...formData, subsidiaryOfAnother: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="subsidiary-yes" />
                  <Label htmlFor="subsidiary-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="subsidiary-no" />
                  <Label htmlFor="subsidiary-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Has the applicant had a judgment, lien, bankruptcy, or foreclosure in the past 5 years? *</Label>
              <RadioGroup
                value={formData.bankruptcyJudgmentLien}
                onValueChange={(value) => setFormData({ ...formData, bankruptcyJudgmentLien: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="bankruptcy-yes" />
                  <Label htmlFor="bankruptcy-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="bankruptcy-no" />
                  <Label htmlFor="bankruptcy-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Does the operation perform any excluded businesses? *</Label>
              <p className="text-xs text-muted-foreground mb-2">
                Including: Daycare, concert/arenas, kids clubs, shelters, general contractor, habitational tenants, assisted living, nursing, mentoring, trade contractors on roads/highways, prison fence work, foundation/structural repair, or adult entertainment products
              </p>
              <RadioGroup
                value={formData.excludedOperations}
                onValueChange={(value) => setFormData({ ...formData, excludedOperations: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="excluded-yes" />
                  <Label htmlFor="excluded-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="excluded-no" />
                  <Label htmlFor="excluded-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Have you made any claims on this address or other risks in the last 3 years? *</Label>
              <RadioGroup
                value={formData.hasClaimsLast3Years}
                onValueChange={(value) => setFormData({ ...formData, hasClaimsLast3Years: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="claims-yes" />
                  <Label htmlFor="claims-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="claims-no" />
                  <Label htmlFor="claims-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
              {formData.hasClaimsLast3Years === "yes" && (
                <div className="mt-4">
                  <Label htmlFor="claimsDetails">Please describe all claims</Label>
                  <Textarea
                    id="claimsDetails"
                    value={formData.claimsDetails}
                    onChange={(e) => setFormData({ ...formData, claimsDetails: e.target.value })}
                    placeholder="Provide details of all claims including dates, amounts, and descriptions"
                    rows={4}
                    data-testid="textarea-claims-details"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Location & Property Details */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Location & Property Information</h3>
            
            <div>
              <Label htmlFor="locationAddress">Location Street Address *</Label>
              <Input
                id="locationAddress"
                value={formData.locationAddress}
                onChange={(e) => setFormData({ ...formData, locationAddress: e.target.value })}
                placeholder="Risk location street address"
                data-testid="input-location-address"
              />
            </div>

            <div>
              <Label htmlFor="locationLine2">Address Line 2</Label>
              <Input
                id="locationLine2"
                value={formData.locationLine2}
                onChange={(e) => setFormData({ ...formData, locationLine2: e.target.value })}
                placeholder="Suite, Unit, etc."
                data-testid="input-location-line2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="locationCity">City *</Label>
                <Input
                  id="locationCity"
                  value={formData.locationCity}
                  onChange={(e) => setFormData({ ...formData, locationCity: e.target.value })}
                  placeholder="City"
                  data-testid="input-location-city"
                />
              </div>
              <div>
                <Label htmlFor="locationState">State *</Label>
                <Input
                  id="locationState"
                  value={formData.locationState}
                  onChange={(e) => setFormData({ ...formData, locationState: e.target.value })}
                  placeholder="CA"
                  maxLength={2}
                  data-testid="input-location-state"
                />
              </div>
              <div>
                <Label htmlFor="locationZipCode">Risk ZIP Code *</Label>
                <Input
                  id="locationZipCode"
                  value={formData.locationZipCode}
                  onChange={(e) => setFormData({ ...formData, locationZipCode: e.target.value })}
                  placeholder="90001"
                  data-testid="input-location-zipcode"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="aopDeductible">All Other Perils/AOP Deductible *</Label>
              <Select
                value={formData.aopDeductible}
                onValueChange={(value) => setFormData({ ...formData, aopDeductible: value })}
              >
                <SelectTrigger data-testid="select-aop-deductible">
                  <SelectValue placeholder="Select AOP deductible" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500">$500</SelectItem>
                  <SelectItem value="1000">$1,000</SelectItem>
                  <SelectItem value="2500">$2,500</SelectItem>
                  <SelectItem value="5000">$5,000</SelectItem>
                  <SelectItem value="10000">$10,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Is the applicant's business located on the first floor? *</Label>
              <RadioGroup
                value={formData.firstFloorLocation}
                onValueChange={(value) => setFormData({ ...formData, firstFloorLocation: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="firstfloor-yes" />
                  <Label htmlFor="firstfloor-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="firstfloor-no" />
                  <Label htmlFor="firstfloor-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="squareFeet">Square Feet *</Label>
                <Input
                  id="squareFeet"
                  type="number"
                  value={formData.squareFeet}
                  onChange={(e) => setFormData({ ...formData, squareFeet: e.target.value })}
                  placeholder="0"
                  data-testid="input-square-feet"
                />
              </div>
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
            </div>

            <div>
              <Label htmlFor="buildingConstructionType">Building Construction Type *</Label>
              <Select
                value={formData.buildingConstructionType}
                onValueChange={(value) => setFormData({ ...formData, buildingConstructionType: value })}
              >
                <SelectTrigger data-testid="select-construction-type">
                  <SelectValue placeholder="Select construction type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frame">Frame</SelectItem>
                  <SelectItem value="joisted-masonry">Joisted Masonry</SelectItem>
                  <SelectItem value="non-combustible">Non-Combustible</SelectItem>
                  <SelectItem value="masonry-non-combustible">Masonry Non-Combustible</SelectItem>
                  <SelectItem value="modified-fire-resistive">Modified Fire Resistive</SelectItem>
                  <SelectItem value="fire-resistive">Fire Resistive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Is the premises sprinklered? *</Label>
              <RadioGroup
                value={formData.sprinklered}
                onValueChange={(value) => setFormData({ ...formData, sprinklered: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="sprinkler-yes" />
                  <Label htmlFor="sprinkler-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="sprinkler-no" />
                  <Label htmlFor="sprinkler-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            <h4 className="font-medium mt-6">Building Systems Updates</h4>
            <p className="text-xs text-muted-foreground mb-2">Enter the year each system was last updated (leave blank if unknown)</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="roofUpdated">Roof Last Updated</Label>
                <Input
                  id="roofUpdated"
                  type="number"
                  value={formData.roofUpdated}
                  onChange={(e) => setFormData({ ...formData, roofUpdated: e.target.value })}
                  placeholder="YYYY"
                  data-testid="input-roof-updated"
                />
              </div>
              <div>
                <Label htmlFor="plumbingUpdated">Plumbing Last Updated</Label>
                <Input
                  id="plumbingUpdated"
                  type="number"
                  value={formData.plumbingUpdated}
                  onChange={(e) => setFormData({ ...formData, plumbingUpdated: e.target.value })}
                  placeholder="YYYY"
                  data-testid="input-plumbing-updated"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="electricalUpdated">Electrical/Wiring Updated</Label>
                <Input
                  id="electricalUpdated"
                  type="number"
                  value={formData.electricalUpdated}
                  onChange={(e) => setFormData({ ...formData, electricalUpdated: e.target.value })}
                  placeholder="YYYY"
                  data-testid="input-electrical-updated"
                />
              </div>
              <div>
                <Label htmlFor="hvacUpdated">Heating/HVAC Updated</Label>
                <Input
                  id="hvacUpdated"
                  type="number"
                  value={formData.hvacUpdated}
                  onChange={(e) => setFormData({ ...formData, hvacUpdated: e.target.value })}
                  placeholder="YYYY"
                  data-testid="input-hvac-updated"
                />
              </div>
            </div>

            <h4 className="font-medium mt-6">Security & Safety</h4>
            
            <div>
              <Label>Are the applicant's immediate neighboring properties vacant? *</Label>
              <RadioGroup
                value={formData.neighborsVacant}
                onValueChange={(value) => setFormData({ ...formData, neighborsVacant: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="neighbors-yes" />
                  <Label htmlFor="neighbors-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="neighbors-no" />
                  <Label htmlFor="neighbors-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Does the applicant have a burglar alarm? *</Label>
                <RadioGroup
                  value={formData.burglarAlarm}
                  onValueChange={(value) => setFormData({ ...formData, burglarAlarm: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="burglar-yes" />
                    <Label htmlFor="burglar-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="burglar-no" />
                    <Label htmlFor="burglar-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label>Does the applicant have a fire alarm? *</Label>
                <RadioGroup
                  value={formData.fireAlarm}
                  onValueChange={(value) => setFormData({ ...formData, fireAlarm: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="fire-yes" />
                    <Label htmlFor="fire-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="fire-no" />
                    <Label htmlFor="fire-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div>
              <Label>Does the applicant's business close after midnight?</Label>
              <RadioGroup
                value={formData.closesAfterMidnight}
                onValueChange={(value) => setFormData({ ...formData, closesAfterMidnight: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="midnight-yes" />
                  <Label htmlFor="midnight-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="midnight-no" />
                  <Label htmlFor="midnight-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {/* Step 4: Building Coverage */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Building & Property Coverage</h3>
            
            <h4 className="font-medium">Building Coverage</h4>
            
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
              <Label htmlFor="buildingValuation">Building Valuation</Label>
              <Select
                value={formData.buildingValuation}
                onValueChange={(value) => setFormData({ ...formData, buildingValuation: value })}
              >
                <SelectTrigger data-testid="select-building-valuation">
                  <SelectValue placeholder="Select valuation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="replacement-cost">Replacement Cost</SelectItem>
                  <SelectItem value="actual-cash-value">Actual Cash Value</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vacancyPercentage">Vacancy percentage (now or within 30 days) *</Label>
                <Input
                  id="vacancyPercentage"
                  type="number"
                  value={formData.vacancyPercentage}
                  onChange={(e) => setFormData({ ...formData, vacancyPercentage: e.target.value })}
                  placeholder="0"
                  min="0"
                  max="100"
                  data-testid="input-vacancy-percentage"
                />
              </div>
              <div>
                <Label htmlFor="numberOfTenants">Number of tenants/units</Label>
                <Input
                  id="numberOfTenants"
                  type="number"
                  value={formData.numberOfTenants}
                  onChange={(e) => setFormData({ ...formData, numberOfTenants: e.target.value })}
                  placeholder="0"
                  data-testid="input-tenants"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="roofType">What type of roof does the applicant have? *</Label>
              <Select
                value={formData.roofType}
                onValueChange={(value) => setFormData({ ...formData, roofType: value })}
              >
                <SelectTrigger data-testid="select-roof-type">
                  <SelectValue placeholder="Select roof type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shingle">Shingle</SelectItem>
                  <SelectItem value="tile">Tile</SelectItem>
                  <SelectItem value="metal">Metal</SelectItem>
                  <SelectItem value="tar-gravel">Tar & Gravel</SelectItem>
                  <SelectItem value="rubber">Rubber/EPDM</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Does the applicant wish to add outdoor/detached sign coverage? *</Label>
              <p className="text-xs text-muted-foreground mb-2">Limit per sign: $1,000</p>
              <RadioGroup
                value={formData.outdoorSignCoverage}
                onValueChange={(value) => setFormData({ ...formData, outdoorSignCoverage: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="sign-yes" />
                  <Label htmlFor="sign-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="sign-no" />
                  <Label htmlFor="sign-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="financialInterestBuilding">Applicant's financial interest in the BUILDING *</Label>
              <Select
                value={formData.financialInterestBuilding}
                onValueChange={(value) => setFormData({ ...formData, financialInterestBuilding: value })}
              >
                <SelectTrigger data-testid="select-financial-interest">
                  <SelectValue placeholder="Select financial interest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="tenant">Tenant</SelectItem>
                  <SelectItem value="mortgage">Mortgage Holder</SelectItem>
                  <SelectItem value="contract-purchaser">Contract Purchaser</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Is there a Mortgage Holder on the Building? *</Label>
              <RadioGroup
                value={formData.mortgageHolder}
                onValueChange={(value) => setFormData({ ...formData, mortgageHolder: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="mortgage-yes" />
                  <Label htmlFor="mortgage-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="mortgage-no" />
                  <Label htmlFor="mortgage-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            <h4 className="font-medium mt-6">Business Personal Property (Contents)</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bppLimit">Business Personal Property Limit ($) *</Label>
                <Input
                  id="bppLimit"
                  type="number"
                  value={formData.bppLimit}
                  onChange={(e) => setFormData({ ...formData, bppLimit: e.target.value })}
                  placeholder="0"
                  data-testid="input-bpp-limit"
                />
              </div>
              <div>
                <Label htmlFor="bppValuation">BPP Valuation *</Label>
                <Select
                  value={formData.bppValuation}
                  onValueChange={(value) => setFormData({ ...formData, bppValuation: value })}
                >
                  <SelectTrigger data-testid="select-bpp-valuation">
                    <SelectValue placeholder="Select valuation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="replacement-cost">Replacement Cost</SelectItem>
                    <SelectItem value="actual-cash-value">Actual Cash Value</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Is there an additional interest or loss payee for the BPP?</Label>
              <RadioGroup
                value={formData.bppLossPayee}
                onValueChange={(value) => setFormData({ ...formData, bppLossPayee: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="payee-yes" />
                  <Label htmlFor="payee-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="payee-no" />
                  <Label htmlFor="payee-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            <h4 className="font-medium mt-6">Business Income with Extra Expense</h4>
            
            <div>
              <Label htmlFor="businessIncomeLimit">Business Income Limit ($)</Label>
              <Input
                id="businessIncomeLimit"
                type="number"
                value={formData.businessIncomeLimit}
                onChange={(e) => setFormData({ ...formData, businessIncomeLimit: e.target.value })}
                placeholder="0"
                data-testid="input-business-income"
              />
            </div>

            <h4 className="font-medium mt-6">District Limit Coverage</h4>
            <p className="text-xs text-muted-foreground mb-2">Coverage enhancement including debris removal, accounts receivable, etc.</p>
            
            <div>
              <Label htmlFor="districtLimitCoverage">District Limit Coverage Limit ($) *</Label>
              <Select
                value={formData.districtLimitCoverage}
                onValueChange={(value) => setFormData({ ...formData, districtLimitCoverage: value })}
              >
                <SelectTrigger data-testid="select-district-limit">
                  <SelectValue placeholder="Select limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25000">$25,000</SelectItem>
                  <SelectItem value="50000">$50,000</SelectItem>
                  <SelectItem value="75000">$75,000</SelectItem>
                  <SelectItem value="100000">$100,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 5: Additional Coverages */}
        {step === 5 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Additional Coverages</h3>
            
            <h4 className="font-medium">Optional Property Coverages</h4>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="utilityDirect"
                  checked={formData.utilityServicesDirectDamage}
                  onCheckedChange={(checked) => setFormData({ ...formData, utilityServicesDirectDamage: checked as boolean })}
                  data-testid="checkbox-utility-direct"
                />
                <Label htmlFor="utilityDirect" className="font-normal cursor-pointer">
                  Utility Services Direct Damage
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="utilityTime"
                  checked={formData.utilityServicesTimeElement}
                  onCheckedChange={(checked) => setFormData({ ...formData, utilityServicesTimeElement: checked as boolean })}
                  data-testid="checkbox-utility-time"
                />
                <Label htmlFor="utilityTime" className="font-normal cursor-pointer">
                  Utility Services Time Element
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="backupWater"
                  checked={formData.backupWaterSump}
                  onCheckedChange={(checked) => setFormData({ ...formData, backupWaterSump: checked as boolean })}
                  data-testid="checkbox-backup-water"
                />
                <Label htmlFor="backupWater" className="font-normal cursor-pointer">
                  Back up Water and Sump
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="perishable"
                  checked={formData.perishableProduct}
                  onCheckedChange={(checked) => setFormData({ ...formData, perishableProduct: checked as boolean })}
                  data-testid="checkbox-perishable"
                />
                <Label htmlFor="perishable" className="font-normal cursor-pointer">
                  Perishable Product
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="equipment"
                  checked={formData.equipmentBreakdown}
                  onCheckedChange={(checked) => setFormData({ ...formData, equipmentBreakdown: checked as boolean })}
                  data-testid="checkbox-equipment"
                />
                <Label htmlFor="equipment" className="font-normal cursor-pointer">
                  Equipment Breakdown
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="dishonesty"
                  checked={formData.employeeDishonesty}
                  onCheckedChange={(checked) => setFormData({ ...formData, employeeDishonesty: checked as boolean })}
                  data-testid="checkbox-dishonesty"
                />
                <Label htmlFor="dishonesty" className="font-normal cursor-pointer">
                  Employee Dishonesty
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="contractors"
                  checked={formData.contractorsToolsEquipment}
                  onCheckedChange={(checked) => setFormData({ ...formData, contractorsToolsEquipment: checked as boolean })}
                  data-testid="checkbox-contractors"
                />
                <Label htmlFor="contractors" className="font-normal cursor-pointer">
                  Contractor's Installation, Tools and Equipment
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terrorism"
                  checked={formData.terrorismCoverage}
                  onCheckedChange={(checked) => setFormData({ ...formData, terrorismCoverage: checked as boolean })}
                  data-testid="checkbox-terrorism"
                />
                <Label htmlFor="terrorism" className="font-normal cursor-pointer">
                  Terrorism (TRIA) Coverage
                </Label>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Liability Coverage */}
        {step === 6 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Liability Coverage</h3>
            
            <div className="bg-muted/50 p-4 rounded-md mb-4">
              <p className="text-sm font-medium">Liability Coverage: $1M/$2M</p>
            </div>

            <div>
              <Label htmlFor="liabilityDeductible">BI/PD Deductible</Label>
              <Select
                value={formData.liabilityDeductible}
                onValueChange={(value) => setFormData({ ...formData, liabilityDeductible: value })}
              >
                <SelectTrigger data-testid="select-liability-deductible">
                  <SelectValue placeholder="Select deductible" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">$0</SelectItem>
                  <SelectItem value="500">$500</SelectItem>
                  <SelectItem value="1000">$1,000</SelectItem>
                  <SelectItem value="2500">$2,500</SelectItem>
                  <SelectItem value="5000">$5,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Is the applicant named as additional insured on vendor/subcontractor policies? *</Label>
              <RadioGroup
                value={formData.additionalInsuredVendor}
                onValueChange={(value) => setFormData({ ...formData, additionalInsuredVendor: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="vendor-yes" />
                  <Label htmlFor="vendor-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="vendor-no" />
                  <Label htmlFor="vendor-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            <h4 className="font-medium mt-6">Additional Liability Coverages</h4>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="liquor"
                  checked={formData.liquorLiability}
                  onCheckedChange={(checked) => setFormData({ ...formData, liquorLiability: checked as boolean })}
                  data-testid="checkbox-liquor"
                />
                <Label htmlFor="liquor" className="font-normal cursor-pointer">
                  Liquor Liability
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="blanketAI"
                  checked={formData.additionalInsuredBlanket}
                  onCheckedChange={(checked) => setFormData({ ...formData, additionalInsuredBlanket: checked as boolean })}
                  data-testid="checkbox-blanket-ai"
                />
                <Label htmlFor="blanketAI" className="font-normal cursor-pointer">
                  Additional Insured (Blanket AI)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="benefits"
                  checked={formData.employeeBenefitsLiability}
                  onCheckedChange={(checked) => setFormData({ ...formData, employeeBenefitsLiability: checked as boolean })}
                  data-testid="checkbox-benefits"
                />
                <Label htmlFor="benefits" className="font-normal cursor-pointer">
                  Employee Benefits Liability
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="waiver"
                  checked={formData.waiverOfSubrogation}
                  onCheckedChange={(checked) => setFormData({ ...formData, waiverOfSubrogation: checked as boolean })}
                  data-testid="checkbox-waiver"
                />
                <Label htmlFor="waiver" className="font-normal cursor-pointer">
                  Waiver of Subrogation
                </Label>
              </div>
            </div>

            <div className="mt-6">
              <Label htmlFor="documents">Supporting Documents</Label>
              <Input
                id="documents"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                data-testid="input-documents"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Upload any relevant documents (ACORD applications, loss runs, property details, etc.)
              </p>
            </div>

            <div className="bg-muted/50 p-4 rounded-md mt-6">
              <h4 className="font-medium mb-2">What Happens Next?</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Your application will be reviewed by our commercial package underwriters</li>
                <li>We'll evaluate your property and liability coverage needs</li>
                <li>Risk assessment will be completed based on location and operations</li>
                <li>You'll receive a comprehensive quote within 24-48 hours</li>
                <li>Our team can customize coverage to fit your specific needs</li>
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
              Submit Commercial Package Application
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}