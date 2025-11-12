import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft, CheckCircle, Plus, X } from "lucide-react";

interface PriorInsurer {
  year: string;
  insuranceCompany: string;
  policyNumber: string;
  premium: string;
}

interface PriorLoss {
  dateOfLoss: string;
  amountPaid: string;
  amountReserved: string;
  description: string;
}

export default function GeneralLiabilityQuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Insured Information
    insuredName: "",
    mailingAddress: "",
    locationOfRisk: "",
    typeOfRisk: "",
    effectiveFrom: "",
    effectiveTo: "",
    yearsInBusiness: "",
    applicantType: "",
    applicantTypeOther: "",
    
    // Limits of Liability
    generalAggregate: "",
    productsOpsAggregate: "",
    personalAdvInjury: "",
    eachOccurrence: "",
    premisesRented: "",
    medicalExpense: "",
    otherCoverages: "",
    deductible: "",
    
    // Additional Insured
    additionalInsuredName: "",
    additionalInsuredInterest: "",
    
    // Business Operations
    businessOperations: "",
    
    // Premises Information
    premisesDetails: "",
    premisesInterest: "",
    partOccupied: "",
    hasParkingLot: "",
    parkingLotArea: "",
    parkingGrossReceipts: "",
    parkingSurface: "",
    parkingLighted: "",
    storesHazardous: "",
    hazardousDetails: "",
    lendsEquipment: "",
    equipmentDetails: "",
    subcontractsWork: "",
    subcontractType: "",
    requiresCertificates: "",
    
    // Financial Information
    estimatedGrossReceipts: "",
    estimatedPayroll: "",
    estimatedSubcontractCosts: "",
    subcontractorsInsured: "",
    
    // Prior Coverage
    hadPriorCoverage: "",
    hadPriorClaims: "",
    priorCancellation: "",
    cancellationExplanation: "",
    
    // Contact
    applicantPhone: "",
  });

  const [priorInsurers, setPriorInsurers] = useState<PriorInsurer[]>([
    { year: "", insuranceCompany: "", policyNumber: "", premium: "" }
  ]);

  const [priorLosses, setPriorLosses] = useState<PriorLoss[]>([
    { dateOfLoss: "", amountPaid: "", amountReserved: "", description: "" }
  ]);

  const addPriorInsurer = () => {
    setPriorInsurers([...priorInsurers, { year: "", insuranceCompany: "", policyNumber: "", premium: "" }]);
  };

  const removePriorInsurer = (index: number) => {
    setPriorInsurers(priorInsurers.filter((_, i) => i !== index));
  };

  const updatePriorInsurer = (index: number, field: keyof PriorInsurer, value: string) => {
    const updated = [...priorInsurers];
    updated[index][field] = value;
    setPriorInsurers(updated);
  };

  const addPriorLoss = () => {
    setPriorLosses([...priorLosses, { dateOfLoss: "", amountPaid: "", amountReserved: "", description: "" }]);
  };

  const removePriorLoss = (index: number) => {
    setPriorLosses(priorLosses.filter((_, i) => i !== index));
  };

  const updatePriorLoss = (index: number, field: keyof PriorLoss, value: string) => {
    const updated = [...priorLosses];
    updated[index][field] = value;
    setPriorLosses(updated);
  };

  const handleSubmit = () => {
    console.log("General Liability quote request submitted:", { formData, priorInsurers, priorLosses });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">General Liability Quote Request Received!</h3>
          <p className="text-muted-foreground mb-6">
            Thank you for your detailed submission. One of our general liability specialists will review your information and contact you within 24 hours with a competitive quote.
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
        <CardTitle>General Liability Insurance Quote Request</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Complete this comprehensive application to receive an accurate quote for your general liability insurance needs.
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
        {/* Step 1: Insured Information */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Insured Information</h3>
            
            <div>
              <Label htmlFor="insuredName">Insured Name (as it should appear on the policy) *</Label>
              <Input
                id="insuredName"
                value={formData.insuredName}
                onChange={(e) => setFormData({ ...formData, insuredName: e.target.value })}
                placeholder="Include any DBA, Trading As, Care of, Trustee, Executor, or Estate of names"
                data-testid="input-insured-name"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Please include any Doing Business As, Trading As, Care of, Trustee, Executor, or Estate of names
              </p>
            </div>

            <div>
              <Label htmlFor="mailingAddress">Mailing Address *</Label>
              <Input
                id="mailingAddress"
                value={formData.mailingAddress}
                onChange={(e) => setFormData({ ...formData, mailingAddress: e.target.value })}
                placeholder="Complete mailing address"
                data-testid="input-mailing-address"
              />
            </div>

            <div>
              <Label htmlFor="locationOfRisk">Location of Risk *</Label>
              <Input
                id="locationOfRisk"
                value={formData.locationOfRisk}
                onChange={(e) => setFormData({ ...formData, locationOfRisk: e.target.value })}
                placeholder="Physical location where business operates"
                data-testid="input-location-of-risk"
              />
            </div>

            <div>
              <Label htmlFor="typeOfRisk">Type of Risk/Occupancy *</Label>
              <Input
                id="typeOfRisk"
                value={formData.typeOfRisk}
                onChange={(e) => setFormData({ ...formData, typeOfRisk: e.target.value })}
                placeholder="e.g., Retail Store, Restaurant, Office, Manufacturing"
                data-testid="input-type-of-risk"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="effectiveFrom">Proposed Effective Date From *</Label>
                <Input
                  id="effectiveFrom"
                  type="date"
                  value={formData.effectiveFrom}
                  onChange={(e) => setFormData({ ...formData, effectiveFrom: e.target.value })}
                  data-testid="input-effective-from"
                />
              </div>
              <div>
                <Label htmlFor="effectiveTo">Proposed Effective Date To *</Label>
                <Input
                  id="effectiveTo"
                  type="date"
                  value={formData.effectiveTo}
                  onChange={(e) => setFormData({ ...formData, effectiveTo: e.target.value })}
                  data-testid="input-effective-to"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="yearsInBusiness">Years in Business *</Label>
              <Input
                id="yearsInBusiness"
                type="number"
                value={formData.yearsInBusiness}
                onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })}
                placeholder="0"
                data-testid="input-years-in-business"
              />
            </div>

            <div>
              <Label>Applicant Type *</Label>
              <RadioGroup
                value={formData.applicantType}
                onValueChange={(value) => setFormData({ ...formData, applicantType: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="individual" id="individual" data-testid="radio-individual" />
                  <Label htmlFor="individual" className="font-normal cursor-pointer">Individual</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="corporation" id="corporation" data-testid="radio-corporation" />
                  <Label htmlFor="corporation" className="font-normal cursor-pointer">Corporation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="partnership" id="partnership" data-testid="radio-partnership" />
                  <Label htmlFor="partnership" className="font-normal cursor-pointer">Partnership</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="joint-venture" id="joint-venture" data-testid="radio-joint-venture" />
                  <Label htmlFor="joint-venture" className="font-normal cursor-pointer">Joint Venture</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" data-testid="radio-other" />
                  <Label htmlFor="other" className="font-normal cursor-pointer">Other</Label>
                </div>
              </RadioGroup>
              {formData.applicantType === "other" && (
                <Input
                  className="mt-2"
                  value={formData.applicantTypeOther}
                  onChange={(e) => setFormData({ ...formData, applicantTypeOther: e.target.value })}
                  placeholder="Specify applicant type"
                  data-testid="input-applicant-type-other"
                />
              )}
            </div>

            <div>
              <Label htmlFor="applicantPhone">Contact Phone Number *</Label>
              <Input
                id="applicantPhone"
                type="tel"
                value={formData.applicantPhone}
                onChange={(e) => setFormData({ ...formData, applicantPhone: e.target.value })}
                placeholder="(555) 123-4567"
                data-testid="input-applicant-phone"
              />
            </div>
          </div>
        )}

        {/* Step 2: Limits of Liability */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Limits of Liability Requested</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="generalAggregate">General Aggregate *</Label>
                <Select
                  value={formData.generalAggregate}
                  onValueChange={(value) => setFormData({ ...formData, generalAggregate: value })}
                >
                  <SelectTrigger data-testid="select-general-aggregate">
                    <SelectValue placeholder="Select amount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500000">$500,000</SelectItem>
                    <SelectItem value="1000000">$1,000,000</SelectItem>
                    <SelectItem value="2000000">$2,000,000</SelectItem>
                    <SelectItem value="3000000">$3,000,000</SelectItem>
                    <SelectItem value="5000000">$5,000,000</SelectItem>
                    <SelectItem value="other">Other Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="productsOpsAggregate">Products & Completed Operations Aggregate *</Label>
                <Select
                  value={formData.productsOpsAggregate}
                  onValueChange={(value) => setFormData({ ...formData, productsOpsAggregate: value })}
                >
                  <SelectTrigger data-testid="select-products-ops-aggregate">
                    <SelectValue placeholder="Select amount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500000">$500,000</SelectItem>
                    <SelectItem value="1000000">$1,000,000</SelectItem>
                    <SelectItem value="2000000">$2,000,000</SelectItem>
                    <SelectItem value="3000000">$3,000,000</SelectItem>
                    <SelectItem value="5000000">$5,000,000</SelectItem>
                    <SelectItem value="other">Other Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="personalAdvInjury">Personal & Advertising Injury *</Label>
                <Select
                  value={formData.personalAdvInjury}
                  onValueChange={(value) => setFormData({ ...formData, personalAdvInjury: value })}
                >
                  <SelectTrigger data-testid="select-personal-adv-injury">
                    <SelectValue placeholder="Select amount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500000">$500,000</SelectItem>
                    <SelectItem value="1000000">$1,000,000</SelectItem>
                    <SelectItem value="2000000">$2,000,000</SelectItem>
                    <SelectItem value="other">Other Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="eachOccurrence">Each Occurrence *</Label>
                <Select
                  value={formData.eachOccurrence}
                  onValueChange={(value) => setFormData({ ...formData, eachOccurrence: value })}
                >
                  <SelectTrigger data-testid="select-each-occurrence">
                    <SelectValue placeholder="Select amount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500000">$500,000</SelectItem>
                    <SelectItem value="1000000">$1,000,000</SelectItem>
                    <SelectItem value="2000000">$2,000,000</SelectItem>
                    <SelectItem value="other">Other Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="premisesRented">Damage to Premises Rented to You</Label>
                <Select
                  value={formData.premisesRented}
                  onValueChange={(value) => setFormData({ ...formData, premisesRented: value })}
                >
                  <SelectTrigger data-testid="select-premises-rented">
                    <SelectValue placeholder="Select amount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100000">$100,000</SelectItem>
                    <SelectItem value="300000">$300,000</SelectItem>
                    <SelectItem value="500000">$500,000</SelectItem>
                    <SelectItem value="1000000">$1,000,000</SelectItem>
                    <SelectItem value="other">Other Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="medicalExpense">Medical Expense (any one person)</Label>
                <Select
                  value={formData.medicalExpense}
                  onValueChange={(value) => setFormData({ ...formData, medicalExpense: value })}
                >
                  <SelectTrigger data-testid="select-medical-expense">
                    <SelectValue placeholder="Select amount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5000">$5,000</SelectItem>
                    <SelectItem value="10000">$10,000</SelectItem>
                    <SelectItem value="25000">$25,000</SelectItem>
                    <SelectItem value="50000">$50,000</SelectItem>
                    <SelectItem value="other">Other Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="deductible">Deductible</Label>
              <Select
                value={formData.deductible}
                onValueChange={(value) => setFormData({ ...formData, deductible: value })}
              >
                <SelectTrigger data-testid="select-deductible">
                  <SelectValue placeholder="Select deductible" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">$0</SelectItem>
                  <SelectItem value="500">$500</SelectItem>
                  <SelectItem value="1000">$1,000</SelectItem>
                  <SelectItem value="2500">$2,500</SelectItem>
                  <SelectItem value="5000">$5,000</SelectItem>
                  <SelectItem value="other">Other Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="otherCoverages">Other Coverages, Restrictions, and/or Endorsements</Label>
              <Textarea
                id="otherCoverages"
                value={formData.otherCoverages}
                onChange={(e) => setFormData({ ...formData, otherCoverages: e.target.value })}
                placeholder="List any additional coverages or endorsements needed"
                rows={3}
                data-testid="textarea-other-coverages"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="additionalInsuredName">Additional Insured Name/Address</Label>
                <Textarea
                  id="additionalInsuredName"
                  value={formData.additionalInsuredName}
                  onChange={(e) => setFormData({ ...formData, additionalInsuredName: e.target.value })}
                  placeholder="Name and address of additional insured"
                  rows={2}
                  data-testid="textarea-additional-insured-name"
                />
              </div>
              <div>
                <Label htmlFor="additionalInsuredInterest">Interest of Additional Insured</Label>
                <Textarea
                  id="additionalInsuredInterest"
                  value={formData.additionalInsuredInterest}
                  onChange={(e) => setFormData({ ...formData, additionalInsuredInterest: e.target.value })}
                  placeholder="e.g., Landlord, Lessee, Mortgagee"
                  rows={2}
                  data-testid="textarea-additional-insured-interest"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Business Operations */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Business Operations & Premises</h3>
            
            <div>
              <Label htmlFor="businessOperations">Describe all business operations conducted by applicant *</Label>
              <Textarea
                id="businessOperations"
                value={formData.businessOperations}
                onChange={(e) => setFormData({ ...formData, businessOperations: e.target.value })}
                placeholder="Provide a detailed description of all business activities, products sold, services provided, etc."
                rows={4}
                data-testid="textarea-business-operations"
              />
            </div>

            <div>
              <Label htmlFor="premisesDetails">Locations, age and construction of all premises owned, rented or controlled *</Label>
              <Textarea
                id="premisesDetails"
                value={formData.premisesDetails}
                onChange={(e) => setFormData({ ...formData, premisesDetails: e.target.value })}
                placeholder="Include address, year built, construction type (frame, masonry, concrete, etc.), square footage"
                rows={4}
                data-testid="textarea-premises-details"
              />
            </div>

            <div>
              <Label>Interest of applicant in such premises *</Label>
              <RadioGroup
                value={formData.premisesInterest}
                onValueChange={(value) => setFormData({ ...formData, premisesInterest: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="owner" id="owner" data-testid="radio-owner" />
                  <Label htmlFor="owner" className="font-normal cursor-pointer">Owner</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="general-lessee" id="general-lessee" data-testid="radio-general-lessee" />
                  <Label htmlFor="general-lessee" className="font-normal cursor-pointer">General Lessee</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tenant" id="tenant" data-testid="radio-tenant" />
                  <Label htmlFor="tenant" className="font-normal cursor-pointer">Tenant</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Part occupied by the applicant *</Label>
              <RadioGroup
                value={formData.partOccupied}
                onValueChange={(value) => setFormData({ ...formData, partOccupied: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="entire" id="entire" data-testid="radio-entire" />
                  <Label htmlFor="entire" className="font-normal cursor-pointer">Entire</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="portion" id="portion" data-testid="radio-portion" />
                  <Label htmlFor="portion" className="font-normal cursor-pointer">Portion</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" data-testid="radio-none" />
                  <Label htmlFor="none" className="font-normal cursor-pointer">None</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {/* Step 4: Additional Premises Information */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Additional Premises & Operations Information</h3>
            
            <div>
              <Label>Does applicant have a parking lot? *</Label>
              <RadioGroup
                value={formData.hasParkingLot}
                onValueChange={(value) => setFormData({ ...formData, hasParkingLot: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="parking-yes" data-testid="radio-parking-yes" />
                  <Label htmlFor="parking-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="parking-no" data-testid="radio-parking-no" />
                  <Label htmlFor="parking-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.hasParkingLot === "yes" && (
              <div className="space-y-4 pl-4 border-l-2 border-muted">
                <div>
                  <Label htmlFor="parkingLotArea">Parking lot area (square feet)</Label>
                  <Input
                    id="parkingLotArea"
                    type="number"
                    value={formData.parkingLotArea}
                    onChange={(e) => setFormData({ ...formData, parkingLotArea: e.target.value })}
                    placeholder="0"
                    data-testid="input-parking-lot-area"
                  />
                </div>

                <div>
                  <Label htmlFor="parkingGrossReceipts">Gross receipts from parking (if charged)</Label>
                  <Input
                    id="parkingGrossReceipts"
                    type="number"
                    value={formData.parkingGrossReceipts}
                    onChange={(e) => setFormData({ ...formData, parkingGrossReceipts: e.target.value })}
                    placeholder="0"
                    data-testid="input-parking-gross-receipts"
                  />
                </div>

                <div>
                  <Label>Type of surface</Label>
                  <RadioGroup
                    value={formData.parkingSurface}
                    onValueChange={(value) => setFormData({ ...formData, parkingSurface: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="gravel" id="gravel" data-testid="radio-gravel" />
                      <Label htmlFor="gravel" className="font-normal cursor-pointer">Gravel</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="blacktop" id="blacktop" data-testid="radio-blacktop" />
                      <Label htmlFor="blacktop" className="font-normal cursor-pointer">Black top</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="concrete" id="concrete" data-testid="radio-concrete" />
                      <Label htmlFor="concrete" className="font-normal cursor-pointer">Concrete</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Is the lot lighted?</Label>
                  <RadioGroup
                    value={formData.parkingLighted}
                    onValueChange={(value) => setFormData({ ...formData, parkingLighted: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="lighted-yes" data-testid="radio-lighted-yes" />
                      <Label htmlFor="lighted-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="lighted-no" data-testid="radio-lighted-no" />
                      <Label htmlFor="lighted-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            <div>
              <Label>Does risk store L.P.G., flammable liquids, ammunition, or explosives on the premises? *</Label>
              <RadioGroup
                value={formData.storesHazardous}
                onValueChange={(value) => setFormData({ ...formData, storesHazardous: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="hazardous-yes" data-testid="radio-hazardous-yes" />
                  <Label htmlFor="hazardous-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="hazardous-no" data-testid="radio-hazardous-no" />
                  <Label htmlFor="hazardous-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.storesHazardous === "yes" && (
              <div className="pl-4 border-l-2 border-muted">
                <Label htmlFor="hazardousDetails">Type and quantity stored</Label>
                <Textarea
                  id="hazardousDetails"
                  value={formData.hazardousDetails}
                  onChange={(e) => setFormData({ ...formData, hazardousDetails: e.target.value })}
                  placeholder="Describe what is stored and quantities"
                  rows={3}
                  data-testid="textarea-hazardous-details"
                />
              </div>
            )}

            <div>
              <Label>Does risk lend, lease, or rent any equipment to others? *</Label>
              <RadioGroup
                value={formData.lendsEquipment}
                onValueChange={(value) => setFormData({ ...formData, lendsEquipment: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="equipment-yes" data-testid="radio-equipment-yes" />
                  <Label htmlFor="equipment-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="equipment-no" data-testid="radio-equipment-no" />
                  <Label htmlFor="equipment-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.lendsEquipment === "yes" && (
              <div className="pl-4 border-l-2 border-muted">
                <Label htmlFor="equipmentDetails">Type of equipment and gross receipts derived</Label>
                <Textarea
                  id="equipmentDetails"
                  value={formData.equipmentDetails}
                  onChange={(e) => setFormData({ ...formData, equipmentDetails: e.target.value })}
                  placeholder="Describe equipment type and annual revenue from this activity"
                  rows={3}
                  data-testid="textarea-equipment-details"
                />
              </div>
            )}

            <div>
              <Label>Does the applicant subcontract work? *</Label>
              <RadioGroup
                value={formData.subcontractsWork}
                onValueChange={(value) => setFormData({ ...formData, subcontractsWork: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="subcontract-yes" data-testid="radio-subcontract-yes" />
                  <Label htmlFor="subcontract-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="subcontract-no" data-testid="radio-subcontract-no" />
                  <Label htmlFor="subcontract-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.subcontractsWork === "yes" && (
              <div className="space-y-4 pl-4 border-l-2 border-muted">
                <div>
                  <Label htmlFor="subcontractType">Type of work subcontracted</Label>
                  <Input
                    id="subcontractType"
                    value={formData.subcontractType}
                    onChange={(e) => setFormData({ ...formData, subcontractType: e.target.value })}
                    placeholder="Describe the type of work"
                    data-testid="input-subcontract-type"
                  />
                </div>

                <div>
                  <Label>Are Certificates of Insurance required from all subcontractors?</Label>
                  <RadioGroup
                    value={formData.requiresCertificates}
                    onValueChange={(value) => setFormData({ ...formData, requiresCertificates: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="certificates-yes" data-testid="radio-certificates-yes" />
                      <Label htmlFor="certificates-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="certificates-no" data-testid="radio-certificates-no" />
                      <Label htmlFor="certificates-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 5: Financial Information */}
        {step === 5 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Financial Information</h3>
            
            <div>
              <Label htmlFor="estimatedGrossReceipts">Estimated Gross Receipts (Annual) *</Label>
              <Input
                id="estimatedGrossReceipts"
                type="number"
                value={formData.estimatedGrossReceipts}
                onChange={(e) => setFormData({ ...formData, estimatedGrossReceipts: e.target.value })}
                placeholder="0"
                data-testid="input-estimated-gross-receipts"
              />
            </div>

            <div>
              <Label htmlFor="estimatedPayroll">Estimated Employee Payroll (Annual)</Label>
              <Input
                id="estimatedPayroll"
                type="number"
                value={formData.estimatedPayroll}
                onChange={(e) => setFormData({ ...formData, estimatedPayroll: e.target.value })}
                placeholder="0"
                data-testid="input-estimated-payroll"
              />
            </div>

            <div>
              <Label htmlFor="estimatedSubcontractCosts">Estimated Sub-contracted Costs (Annual)</Label>
              <Input
                id="estimatedSubcontractCosts"
                type="number"
                value={formData.estimatedSubcontractCosts}
                onChange={(e) => setFormData({ ...formData, estimatedSubcontractCosts: e.target.value })}
                placeholder="0"
                data-testid="input-estimated-subcontract-costs"
              />
            </div>

            {formData.estimatedSubcontractCosts && Number(formData.estimatedSubcontractCosts) > 0 && (
              <div>
                <Label>Are subcontractors insured?</Label>
                <RadioGroup
                  value={formData.subcontractorsInsured}
                  onValueChange={(value) => setFormData({ ...formData, subcontractorsInsured: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="subcontractors-insured-yes" data-testid="radio-subcontractors-insured-yes" />
                    <Label htmlFor="subcontractors-insured-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="subcontractors-insured-no" data-testid="radio-subcontractors-insured-no" />
                    <Label htmlFor="subcontractors-insured-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            <div>
              <Label>During the past three years has any company ever cancelled, declined or refused to issue similar insurance? *</Label>
              <RadioGroup
                value={formData.priorCancellation}
                onValueChange={(value) => setFormData({ ...formData, priorCancellation: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="cancellation-yes" data-testid="radio-cancellation-yes" />
                  <Label htmlFor="cancellation-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="cancellation-no" data-testid="radio-cancellation-no" />
                  <Label htmlFor="cancellation-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.priorCancellation === "yes" && (
              <div className="pl-4 border-l-2 border-muted">
                <Label htmlFor="cancellationExplanation">Please explain</Label>
                <Textarea
                  id="cancellationExplanation"
                  value={formData.cancellationExplanation}
                  onChange={(e) => setFormData({ ...formData, cancellationExplanation: e.target.value })}
                  placeholder="Provide details about the cancellation, declination, or refusal"
                  rows={3}
                  data-testid="textarea-cancellation-explanation"
                />
              </div>
            )}
          </div>
        )}

        {/* Step 6: Prior Coverage and Loss History */}
        {step === 6 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Prior Coverage and Loss History</h3>
            
            <div>
              <Label>Has the insured or applicant had 3 years of prior coverage? *</Label>
              <RadioGroup
                value={formData.hadPriorCoverage}
                onValueChange={(value) => setFormData({ ...formData, hadPriorCoverage: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="coverage-yes" data-testid="radio-coverage-yes" />
                  <Label htmlFor="coverage-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="coverage-no" data-testid="radio-coverage-no" />
                  <Label htmlFor="coverage-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.hadPriorCoverage === "yes" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Prior Insurer Information (Past 3 Years)</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addPriorInsurer} data-testid="button-add-prior-insurer">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Year
                  </Button>
                </div>

                {priorInsurers.map((insurer, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Year {index + 1}</h4>
                      {priorInsurers.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removePriorInsurer(index)}
                          data-testid={`button-remove-prior-insurer-${index}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Year</Label>
                        <Input
                          value={insurer.year}
                          onChange={(e) => updatePriorInsurer(index, 'year', e.target.value)}
                          placeholder="2024"
                          data-testid={`input-prior-year-${index}`}
                        />
                      </div>
                      <div>
                        <Label>Insurance Company</Label>
                        <Input
                          value={insurer.insuranceCompany}
                          onChange={(e) => updatePriorInsurer(index, 'insuranceCompany', e.target.value)}
                          placeholder="Company name"
                          data-testid={`input-prior-company-${index}`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label>Policy Number</Label>
                        <Input
                          value={insurer.policyNumber}
                          onChange={(e) => updatePriorInsurer(index, 'policyNumber', e.target.value)}
                          placeholder="Policy #"
                          data-testid={`input-prior-policy-${index}`}
                        />
                      </div>
                      <div>
                        <Label>Premium</Label>
                        <Input
                          type="number"
                          value={insurer.premium}
                          onChange={(e) => updatePriorInsurer(index, 'premium', e.target.value)}
                          placeholder="0"
                          data-testid={`input-prior-premium-${index}`}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            <div className="mt-6">
              <Label>Has the insured or applicant had any prior claims or losses in the last 3 years? *</Label>
              <RadioGroup
                value={formData.hadPriorClaims}
                onValueChange={(value) => setFormData({ ...formData, hadPriorClaims: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="claims-yes" data-testid="radio-claims-yes" />
                  <Label htmlFor="claims-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="claims-no" data-testid="radio-claims-no" />
                  <Label htmlFor="claims-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.hadPriorClaims === "yes" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Loss Information</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addPriorLoss} data-testid="button-add-prior-loss">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Loss
                  </Button>
                </div>

                {priorLosses.map((loss, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Loss {index + 1}</h4>
                      {priorLosses.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removePriorLoss(index)}
                          data-testid={`button-remove-prior-loss-${index}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Date of Loss</Label>
                        <Input
                          type="date"
                          value={loss.dateOfLoss}
                          onChange={(e) => updatePriorLoss(index, 'dateOfLoss', e.target.value)}
                          data-testid={`input-loss-date-${index}`}
                        />
                      </div>
                      <div>
                        <Label>Amount Paid</Label>
                        <Input
                          type="number"
                          value={loss.amountPaid}
                          onChange={(e) => updatePriorLoss(index, 'amountPaid', e.target.value)}
                          placeholder="0"
                          data-testid={`input-loss-paid-${index}`}
                        />
                      </div>
                      <div>
                        <Label>Amount Reserved</Label>
                        <Input
                          type="number"
                          value={loss.amountReserved}
                          onChange={(e) => updatePriorLoss(index, 'amountReserved', e.target.value)}
                          placeholder="0"
                          data-testid={`input-loss-reserved-${index}`}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label>Description of Loss</Label>
                      <Textarea
                        value={loss.description}
                        onChange={(e) => updatePriorLoss(index, 'description', e.target.value)}
                        placeholder="Describe what happened and the outcome"
                        rows={2}
                        data-testid={`textarea-loss-description-${index}`}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            )}

            <div className="bg-muted/50 p-4 rounded-md mt-6">
              <h4 className="font-medium mb-2">What Happens Next?</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Your application will be reviewed by our underwriting team</li>
                <li>We'll contact you within 24-48 hours to discuss your needs</li>
                <li>You'll receive a competitive quote tailored to your operations</li>
                <li>Our team will assist with policy issuance and any questions</li>
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
              Submit Application
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
