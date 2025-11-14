import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

export default function VacantBuildingQuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Basic Information
    applicantName: "",
    contactEmail: "",
    contactPhone: "",
    companyName: "",
    
    // Property Information
    propertyAddress: "",
    propertyCity: "",
    propertyState: "",
    propertyZip: "",
    propertyLegalDescription: "",
    
    // Development History
    developedLandPast12Months: "",
    developmentDetails: "",
    
    // Property Details
    acreage: "",
    frontage: "",
    intendedUse: "",
    previousUse: "",
    
    // Buildings & Structures
    buildingsOnPremises: "",
    buildingDescription: "",
    
    // Property Features
    waterFeatures: {
      rivers: false,
      creeks: false,
      lakes: false,
      ponds: false,
      pools: false,
      wells: false,
    },
    
    // Underground/Mining Features
    undergroundFeatures: {
      landfills: false,
      mines: false,
      quarries: false,
      dams: false,
    },
    
    // Farming
    currentlyFarmed: "",
    farmingDetails: "",
    
    // Security & Access
    propertyFenced: "",
    noTrespassingSignage: "",
    huntingFishingPermitted: "",
    accessPermissionType: "",
    
    // Environmental Concerns
    undergroundTanks: "",
    undergroundTanksDetails: "",
    
    // Recreation
    trailsOnProperty: "",
    trailTypes: "",
    
    // Sale & Lease
    landForSale: "",
    salePrice: "",
    landLeased: "",
    leaseDetails: "",
    
    // Development Plans
    preparingForDevelopment: "",
    developmentPlans: "",
    
    // Insurance History
    currentInsurance: "",
    currentCarrier: "",
    currentPremium: "",
    priorClaims: "",
    claimDetails: "",
    
    // Coverage Requested
    liabilityLimit: "",
    propertyLimit: "",
    umbrellaLimit: "",
    
    // Additional Information
    additionalComments: "",
  });

  const [files, setFiles] = useState<{[key: string]: File[]}>({
    surveyDocuments: [],
    propertyPhotos: [],
    legalDocuments: [],
    environmentalReports: [],
    claimHistory: [],
    additionalDocuments: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (category: string, item: string) => {
    setFormData({
      ...formData,
      [category]: {
        ...(formData[category as keyof typeof formData] as any),
        [item]: !(formData[category as keyof typeof formData] as any)[item],
      },
    });
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles({ ...files, [name]: Array.from(e.target.files) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Vacant Building form submitted:", formData, files);
    setSubmitted(true);
  };

  const nextStep = () => setStep(Math.min(step + 1, 6));
  const prevStep = () => setStep(Math.max(step - 1, 1));

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Quote Request Submitted!</h2>
          <p className="text-muted-foreground">
            Thank you for submitting your vacant building/land insurance quote request. Our team will review your information and contact you shortly.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= num
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
                data-testid={`step-indicator-${num}`}
              >
                {num}
              </div>
              {num < 6 && (
                <div
                  className={`w-20 h-1 ${
                    step > num ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="applicantName">Applicant Name *</Label>
                <Input
                  id="applicantName"
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleInputChange}
                  required
                  data-testid="input-applicant-name"
                />
              </div>
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  data-testid="input-company-name"
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Email *</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  required
                  data-testid="input-email"
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Phone *</Label>
                <Input
                  id="contactPhone"
                  name="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  required
                  data-testid="input-phone"
                />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Property Location</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="propertyAddress">Property Address *</Label>
                  <Input
                    id="propertyAddress"
                    name="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={handleInputChange}
                    required
                    data-testid="input-property-address"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="propertyCity">City *</Label>
                    <Input
                      id="propertyCity"
                      name="propertyCity"
                      value={formData.propertyCity}
                      onChange={handleInputChange}
                      required
                      data-testid="input-city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="propertyState">State *</Label>
                    <Input
                      id="propertyState"
                      name="propertyState"
                      value={formData.propertyState}
                      onChange={handleInputChange}
                      required
                      data-testid="input-state"
                    />
                  </div>
                  <div>
                    <Label htmlFor="propertyZip">ZIP Code *</Label>
                    <Input
                      id="propertyZip"
                      name="propertyZip"
                      value={formData.propertyZip}
                      onChange={handleInputChange}
                      required
                      data-testid="input-zip"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="propertyLegalDescription">Property Legal Description</Label>
                  <Textarea
                    id="propertyLegalDescription"
                    name="propertyLegalDescription"
                    value={formData.propertyLegalDescription}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="Lot number, block, subdivision, etc."
                    data-testid="textarea-legal-description"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="acreage">Acreage *</Label>
                <Input
                  id="acreage"
                  name="acreage"
                  type="number"
                  step="0.01"
                  value={formData.acreage}
                  onChange={handleInputChange}
                  required
                  placeholder="Acres"
                  data-testid="input-acreage"
                />
              </div>
              <div>
                <Label htmlFor="frontage">Frontage (Feet)</Label>
                <Input
                  id="frontage"
                  name="frontage"
                  type="number"
                  value={formData.frontage}
                  onChange={handleInputChange}
                  placeholder="Feet"
                  data-testid="input-frontage"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="intendedUse">Intended Use of Property *</Label>
              <Textarea
                id="intendedUse"
                name="intendedUse"
                value={formData.intendedUse}
                onChange={handleInputChange}
                required
                rows={2}
                placeholder="Describe the intended use of the property"
                data-testid="textarea-intended-use"
              />
            </div>
            
            <div>
              <Label htmlFor="previousUse">Previous Use of Property</Label>
              <Textarea
                id="previousUse"
                name="previousUse"
                value={formData.previousUse}
                onChange={handleInputChange}
                rows={2}
                placeholder="Describe the previous use of the property"
                data-testid="textarea-previous-use"
              />
            </div>
            
            <div>
              <Label>Have you developed any land over the past 12 months?</Label>
              <RadioGroup
                value={formData.developedLandPast12Months}
                onValueChange={(value) => handleRadioChange("developedLandPast12Months", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="developed-yes" data-testid="radio-developed-yes" />
                  <Label htmlFor="developed-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="developed-no" data-testid="radio-developed-no" />
                  <Label htmlFor="developed-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.developedLandPast12Months === "yes" && (
              <div>
                <Label htmlFor="developmentDetails">Development Details</Label>
                <Textarea
                  id="developmentDetails"
                  name="developmentDetails"
                  value={formData.developmentDetails}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Describe the development projects"
                  data-testid="textarea-development-details"
                />
              </div>
            )}
            
            <div>
              <Label>Are there any buildings on the premises?</Label>
              <RadioGroup
                value={formData.buildingsOnPremises}
                onValueChange={(value) => handleRadioChange("buildingsOnPremises", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="buildings-yes" data-testid="radio-buildings-yes" />
                  <Label htmlFor="buildings-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="buildings-no" data-testid="radio-buildings-no" />
                  <Label htmlFor="buildings-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.buildingsOnPremises === "yes" && (
              <div>
                <Label htmlFor="buildingDescription">Building Description</Label>
                <Textarea
                  id="buildingDescription"
                  name="buildingDescription"
                  value={formData.buildingDescription}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Describe the buildings (type, size, condition, use)"
                  data-testid="textarea-building-description"
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Property Features & Hazards</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="mb-3 block">Water Features on Property</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rivers"
                    checked={formData.waterFeatures.rivers}
                    onCheckedChange={() => handleCheckboxChange("waterFeatures", "rivers")}
                    data-testid="checkbox-rivers"
                  />
                  <Label htmlFor="rivers">River(s)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="creeks"
                    checked={formData.waterFeatures.creeks}
                    onCheckedChange={() => handleCheckboxChange("waterFeatures", "creeks")}
                    data-testid="checkbox-creeks"
                  />
                  <Label htmlFor="creeks">Creek(s)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lakes"
                    checked={formData.waterFeatures.lakes}
                    onCheckedChange={() => handleCheckboxChange("waterFeatures", "lakes")}
                    data-testid="checkbox-lakes"
                  />
                  <Label htmlFor="lakes">Lake(s)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ponds"
                    checked={formData.waterFeatures.ponds}
                    onCheckedChange={() => handleCheckboxChange("waterFeatures", "ponds")}
                    data-testid="checkbox-ponds"
                  />
                  <Label htmlFor="ponds">Pond(s)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pools"
                    checked={formData.waterFeatures.pools}
                    onCheckedChange={() => handleCheckboxChange("waterFeatures", "pools")}
                    data-testid="checkbox-pools"
                  />
                  <Label htmlFor="pools">Pool(s)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="wells"
                    checked={formData.waterFeatures.wells}
                    onCheckedChange={() => handleCheckboxChange("waterFeatures", "wells")}
                    data-testid="checkbox-wells"
                  />
                  <Label htmlFor="wells">Well(s)</Label>
                </div>
              </div>
            </div>
            
            <div>
              <Label className="mb-3 block">Underground/Mining Features</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="landfills"
                    checked={formData.undergroundFeatures.landfills}
                    onCheckedChange={() => handleCheckboxChange("undergroundFeatures", "landfills")}
                    data-testid="checkbox-landfills"
                  />
                  <Label htmlFor="landfills">Landfill(s)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mines"
                    checked={formData.undergroundFeatures.mines}
                    onCheckedChange={() => handleCheckboxChange("undergroundFeatures", "mines")}
                    data-testid="checkbox-mines"
                  />
                  <Label htmlFor="mines">Mine(s)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="quarries"
                    checked={formData.undergroundFeatures.quarries}
                    onCheckedChange={() => handleCheckboxChange("undergroundFeatures", "quarries")}
                    data-testid="checkbox-quarries"
                  />
                  <Label htmlFor="quarries">Quarry(ies)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dams"
                    checked={formData.undergroundFeatures.dams}
                    onCheckedChange={() => handleCheckboxChange("undergroundFeatures", "dams")}
                    data-testid="checkbox-dams"
                  />
                  <Label htmlFor="dams">Dam(s)</Label>
                </div>
              </div>
            </div>
            
            <div>
              <Label>Are there underground tanks on the property?</Label>
              <RadioGroup
                value={formData.undergroundTanks}
                onValueChange={(value) => handleRadioChange("undergroundTanks", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="tanks-yes" data-testid="radio-tanks-yes" />
                  <Label htmlFor="tanks-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="tanks-no" data-testid="radio-tanks-no" />
                  <Label htmlFor="tanks-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.undergroundTanks === "yes" && (
              <div>
                <Label htmlFor="undergroundTanksDetails">Underground Tanks Details</Label>
                <Textarea
                  id="undergroundTanksDetails"
                  name="undergroundTanksDetails"
                  value={formData.undergroundTanksDetails}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Type, size, contents, condition"
                  data-testid="textarea-tanks-details"
                />
              </div>
            )}
            
            <div>
              <Label>Is the property currently being farmed?</Label>
              <RadioGroup
                value={formData.currentlyFarmed}
                onValueChange={(value) => handleRadioChange("currentlyFarmed", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="farmed-yes" data-testid="radio-farmed-yes" />
                  <Label htmlFor="farmed-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="farmed-no" data-testid="radio-farmed-no" />
                  <Label htmlFor="farmed-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.currentlyFarmed === "yes" && (
              <div>
                <Label htmlFor="farmingDetails">Farming Details</Label>
                <Textarea
                  id="farmingDetails"
                  name="farmingDetails"
                  value={formData.farmingDetails}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Type of farming, crops, livestock, etc."
                  data-testid="textarea-farming-details"
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Security & Access Control</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Is the property fenced?</Label>
              <RadioGroup
                value={formData.propertyFenced}
                onValueChange={(value) => handleRadioChange("propertyFenced", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="fenced-yes" data-testid="radio-fenced-yes" />
                  <Label htmlFor="fenced-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="fenced-no" data-testid="radio-fenced-no" />
                  <Label htmlFor="fenced-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label>Is the property posted with 'No Trespassing' signage?</Label>
              <RadioGroup
                value={formData.noTrespassingSignage}
                onValueChange={(value) => handleRadioChange("noTrespassingSignage", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="signage-yes" data-testid="radio-signage-yes" />
                  <Label htmlFor="signage-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="signage-no" data-testid="radio-signage-no" />
                  <Label htmlFor="signage-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label>Is hunting or fishing permitted on the property?</Label>
              <RadioGroup
                value={formData.huntingFishingPermitted}
                onValueChange={(value) => handleRadioChange("huntingFishingPermitted", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="hunting-yes" data-testid="radio-hunting-yes" />
                  <Label htmlFor="hunting-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="hunting-no" data-testid="radio-hunting-no" />
                  <Label htmlFor="hunting-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.huntingFishingPermitted === "yes" && (
              <div>
                <Label>Is it private or public permission?</Label>
                <RadioGroup
                  value={formData.accessPermissionType}
                  onValueChange={(value) => handleRadioChange("accessPermissionType", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="private" data-testid="radio-private" />
                    <Label htmlFor="private">Private</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="public" data-testid="radio-public" />
                    <Label htmlFor="public">Public</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            
            <div>
              <Label>Are there any bike, ATV or motorcycle trails on the property?</Label>
              <RadioGroup
                value={formData.trailsOnProperty}
                onValueChange={(value) => handleRadioChange("trailsOnProperty", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="trails-yes" data-testid="radio-trails-yes" />
                  <Label htmlFor="trails-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="trails-no" data-testid="radio-trails-no" />
                  <Label htmlFor="trails-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.trailsOnProperty === "yes" && (
              <div>
                <Label htmlFor="trailTypes">Trail Types and Details</Label>
                <Textarea
                  id="trailTypes"
                  name="trailTypes"
                  value={formData.trailTypes}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Describe the types of trails and their use"
                  data-testid="textarea-trail-types"
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {step === 5 && (
        <Card>
          <CardHeader>
            <CardTitle>Business & Development Plans</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Is the land currently for sale?</Label>
              <RadioGroup
                value={formData.landForSale}
                onValueChange={(value) => handleRadioChange("landForSale", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="sale-yes" data-testid="radio-sale-yes" />
                  <Label htmlFor="sale-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="sale-no" data-testid="radio-sale-no" />
                  <Label htmlFor="sale-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.landForSale === "yes" && (
              <div>
                <Label htmlFor="salePrice">Asking Price</Label>
                <Input
                  id="salePrice"
                  name="salePrice"
                  type="number"
                  value={formData.salePrice}
                  onChange={handleInputChange}
                  placeholder="$"
                  data-testid="input-sale-price"
                />
              </div>
            )}
            
            <div>
              <Label>Is the land ever leased out to a third party?</Label>
              <RadioGroup
                value={formData.landLeased}
                onValueChange={(value) => handleRadioChange("landLeased", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="leased-yes" data-testid="radio-leased-yes" />
                  <Label htmlFor="leased-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="leased-no" data-testid="radio-leased-no" />
                  <Label htmlFor="leased-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.landLeased === "yes" && (
              <div>
                <Label htmlFor="leaseDetails">Lease Details</Label>
                <Textarea
                  id="leaseDetails"
                  name="leaseDetails"
                  value={formData.leaseDetails}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Lessee, purpose, terms"
                  data-testid="textarea-lease-details"
                />
              </div>
            )}
            
            <div>
              <Label>Is the land being prepared for real estate development?</Label>
              <RadioGroup
                value={formData.preparingForDevelopment}
                onValueChange={(value) => handleRadioChange("preparingForDevelopment", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="dev-yes" data-testid="radio-development-yes" />
                  <Label htmlFor="dev-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="dev-no" data-testid="radio-development-no" />
                  <Label htmlFor="dev-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.preparingForDevelopment === "yes" && (
              <div>
                <Label htmlFor="developmentPlans">Development Plans</Label>
                <Textarea
                  id="developmentPlans"
                  name="developmentPlans"
                  value={formData.developmentPlans}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Type of development, timeline, permits obtained"
                  data-testid="textarea-development-plans"
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {step === 6 && (
        <Card>
          <CardHeader>
            <CardTitle>Insurance & Coverage Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Do you currently have insurance on this property?</Label>
              <RadioGroup
                value={formData.currentInsurance}
                onValueChange={(value) => handleRadioChange("currentInsurance", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="insurance-yes" data-testid="radio-insurance-yes" />
                  <Label htmlFor="insurance-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="insurance-no" data-testid="radio-insurance-no" />
                  <Label htmlFor="insurance-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.currentInsurance === "yes" && (
              <>
                <div>
                  <Label htmlFor="currentCarrier">Current Insurance Carrier</Label>
                  <Input
                    id="currentCarrier"
                    name="currentCarrier"
                    value={formData.currentCarrier}
                    onChange={handleInputChange}
                    data-testid="input-current-carrier"
                  />
                </div>
                <div>
                  <Label htmlFor="currentPremium">Current Annual Premium</Label>
                  <Input
                    id="currentPremium"
                    name="currentPremium"
                    type="number"
                    value={formData.currentPremium}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-current-premium"
                  />
                </div>
              </>
            )}
            
            <div>
              <Label>Have you had any claims in the past 5 years?</Label>
              <RadioGroup
                value={formData.priorClaims}
                onValueChange={(value) => handleRadioChange("priorClaims", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="claims-yes" data-testid="radio-claims-yes" />
                  <Label htmlFor="claims-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="claims-no" data-testid="radio-claims-no" />
                  <Label htmlFor="claims-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.priorClaims === "yes" && (
              <div>
                <Label htmlFor="claimDetails">Claim Details</Label>
                <Textarea
                  id="claimDetails"
                  name="claimDetails"
                  value={formData.claimDetails}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Date, type of claim, amount paid"
                  data-testid="textarea-claim-details"
                />
              </div>
            )}
            
            <div>
              <h3 className="font-semibold mb-3">Coverage Limits Requested</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="liabilityLimit">General Liability Limit</Label>
                  <Input
                    id="liabilityLimit"
                    name="liabilityLimit"
                    type="number"
                    value={formData.liabilityLimit}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-liability-limit"
                  />
                </div>
                <div>
                  <Label htmlFor="propertyLimit">Property Limit (if applicable)</Label>
                  <Input
                    id="propertyLimit"
                    name="propertyLimit"
                    type="number"
                    value={formData.propertyLimit}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-property-limit"
                  />
                </div>
                <div>
                  <Label htmlFor="umbrellaLimit">Umbrella/Excess Limit</Label>
                  <Input
                    id="umbrellaLimit"
                    name="umbrellaLimit"
                    type="number"
                    value={formData.umbrellaLimit}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-umbrella-limit"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Supporting Documents</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="surveyDocuments">Survey/Plot Plan</Label>
                  <Input
                    id="surveyDocuments"
                    type="file"
                    onChange={(e) => handleFileChange("surveyDocuments", e)}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    multiple
                    data-testid="file-survey"
                  />
                </div>
                <div>
                  <Label htmlFor="propertyPhotos">Property Photos</Label>
                  <Input
                    id="propertyPhotos"
                    type="file"
                    onChange={(e) => handleFileChange("propertyPhotos", e)}
                    accept=".jpg,.png,.jpeg"
                    multiple
                    data-testid="file-photos"
                  />
                </div>
                <div>
                  <Label htmlFor="legalDocuments">Legal Documents (Deed, Title)</Label>
                  <Input
                    id="legalDocuments"
                    type="file"
                    onChange={(e) => handleFileChange("legalDocuments", e)}
                    accept=".pdf,.doc,.docx"
                    multiple
                    data-testid="file-legal"
                  />
                </div>
                <div>
                  <Label htmlFor="environmentalReports">Environmental Reports (if applicable)</Label>
                  <Input
                    id="environmentalReports"
                    type="file"
                    onChange={(e) => handleFileChange("environmentalReports", e)}
                    accept=".pdf,.doc,.docx"
                    multiple
                    data-testid="file-environmental"
                  />
                </div>
                {formData.priorClaims === "yes" && (
                  <div>
                    <Label htmlFor="claimHistory">Claim History Documents</Label>
                    <Input
                      id="claimHistory"
                      type="file"
                      onChange={(e) => handleFileChange("claimHistory", e)}
                      accept=".pdf,.doc,.docx"
                      multiple
                      data-testid="file-claim-history"
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="additionalDocuments">Additional Documents</Label>
                  <Input
                    id="additionalDocuments"
                    type="file"
                    onChange={(e) => handleFileChange("additionalDocuments", e)}
                    accept=".pdf,.doc,.docx,.jpg,.png,.xls,.xlsx"
                    multiple
                    data-testid="file-additional"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="additionalComments">Additional Comments</Label>
              <Textarea
                id="additionalComments"
                name="additionalComments"
                value={formData.additionalComments}
                onChange={handleInputChange}
                rows={4}
                placeholder="Any additional information you would like to provide"
                data-testid="textarea-comments"
              />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <Button type="button" onClick={prevStep} variant="outline" data-testid="button-previous">
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
        )}
        {step < 6 ? (
          <Button type="button" onClick={nextStep} className="ml-auto" data-testid="button-next">
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" className="ml-auto" data-testid="button-submit">
            Submit Quote Request
          </Button>
        )}
      </div>
    </form>
  );
}