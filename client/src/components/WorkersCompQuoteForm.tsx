import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft, CheckCircle, Plus, X } from "lucide-react";

interface Classification {
  classCode: string;
  description: string;
  numberOfEmployees: string;
  annualPayroll: string;
}

export default function WorkersCompQuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Insured Information
    insuredName: "",
    dba: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    businessWebsite: "",
    yearsInBusiness: "",
    fein: "",
    mailingAddress: "",
    city: "",
    state: "",
    zipCode: "",
    typeOfBusiness: "",
    businessDescription: "",
    
    // Coverage Information
    effectiveDate: "",
    expirationDate: "",
    currentCarrier: "",
    currentPremium: "",
    experienceModifier: "",
    deductible: "",
    statesCoverage: "",
    uslhCoverage: "no",
    
    // Payroll Information
    totalEmployees: "",
    fullTimeEmployees: "",
    partTimeEmployees: "",
    contractors1099: "",
    
    // Claims History
    claimsLast5Years: "",
    totalIncurred: "",
    largestClaim: "",
    openClaims: "",
    
    // Safety Program
    writtenSafetyProgram: "",
    returnToWorkProgram: "",
    drugTesting: "",
    backgroundChecks: "",
    
    // Additional Comments
    additionalComments: "",
  });

  const [classifications, setClassifications] = useState<Classification[]>([
    { classCode: "", description: "", numberOfEmployees: "", annualPayroll: "" }
  ]);

  const addClassification = () => {
    setClassifications([...classifications, { classCode: "", description: "", numberOfEmployees: "", annualPayroll: "" }]);
  };

  const removeClassification = (index: number) => {
    setClassifications(classifications.filter((_, i) => i !== index));
  };

  const updateClassification = (index: number, field: keyof Classification, value: string) => {
    const updated = [...classifications];
    updated[index][field] = value;
    setClassifications(updated);
  };

  const handleSubmit = () => {
    console.log("Workers' Compensation quote request submitted:", { formData, classifications });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">Workers' Compensation Quote Request Received!</h3>
          <p className="text-muted-foreground mb-6">
            Thank you for your detailed submission. One of our workers' compensation specialists will review your information and contact you within 24 hours with a competitive quote.
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
        <CardTitle>Workers' Compensation Insurance Quote Request</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Complete this form to submit your workers' compensation risk for a quick quote. All information helps us provide the most accurate pricing.
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="insuredName">Insured Name *</Label>
                <Input
                  id="insuredName"
                  value={formData.insuredName}
                  onChange={(e) => setFormData({ ...formData, insuredName: e.target.value })}
                  placeholder="Legal business name"
                  data-testid="input-insured-name"
                />
              </div>
              <div>
                <Label htmlFor="dba">DBA (if applicable)</Label>
                <Input
                  id="dba"
                  value={formData.dba}
                  onChange={(e) => setFormData({ ...formData, dba: e.target.value })}
                  placeholder="Doing Business As"
                  data-testid="input-dba"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactName">Contact Name *</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="Full name"
                  data-testid="input-contact-name"
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Contact Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="email@example.com"
                  data-testid="input-contact-email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactPhone">Contact Phone *</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="(555) 123-4567"
                  data-testid="input-contact-phone"
                />
              </div>
              <div>
                <Label htmlFor="businessWebsite">Business Website</Label>
                <Input
                  id="businessWebsite"
                  type="url"
                  value={formData.businessWebsite}
                  onChange={(e) => setFormData({ ...formData, businessWebsite: e.target.value })}
                  placeholder="https://www.example.com"
                  data-testid="input-business-website"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="fein">FEIN/Tax ID *</Label>
                <Input
                  id="fein"
                  value={formData.fein}
                  onChange={(e) => setFormData({ ...formData, fein: e.target.value })}
                  placeholder="XX-XXXXXXX"
                  data-testid="input-fein"
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
                  data-testid="input-zip-code"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="typeOfBusiness">Type of Business *</Label>
              <Select
                value={formData.typeOfBusiness}
                onValueChange={(value) => setFormData({ ...formData, typeOfBusiness: value })}
              >
                <SelectTrigger data-testid="select-business-type">
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="restaurant">Restaurant/Food Service</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="professional">Professional Services</SelectItem>
                  <SelectItem value="transportation">Transportation</SelectItem>
                  <SelectItem value="warehouse">Warehouse/Distribution</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="businessDescription">Business Description *</Label>
              <Textarea
                id="businessDescription"
                value={formData.businessDescription}
                onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                placeholder="Describe your business operations, products, and services..."
                rows={4}
                data-testid="textarea-business-description"
              />
            </div>
          </div>
        )}

        {/* Step 2: Coverage Information */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Coverage Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="effectiveDate">Requested Effective Date *</Label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentCarrier">Current Carrier</Label>
                <Input
                  id="currentCarrier"
                  value={formData.currentCarrier}
                  onChange={(e) => setFormData({ ...formData, currentCarrier: e.target.value })}
                  placeholder="Current insurance carrier"
                  data-testid="input-current-carrier"
                />
              </div>
              <div>
                <Label htmlFor="currentPremium">Current Premium ($)</Label>
                <Input
                  id="currentPremium"
                  type="number"
                  value={formData.currentPremium}
                  onChange={(e) => setFormData({ ...formData, currentPremium: e.target.value })}
                  placeholder="0"
                  data-testid="input-current-premium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="experienceModifier">Experience Modifier</Label>
                <Input
                  id="experienceModifier"
                  type="number"
                  step="0.01"
                  value={formData.experienceModifier}
                  onChange={(e) => setFormData({ ...formData, experienceModifier: e.target.value })}
                  placeholder="1.00"
                  data-testid="input-experience-modifier"
                />
                <p className="text-xs text-muted-foreground mt-1">E.g., 0.85, 1.00, 1.15</p>
              </div>
              <div>
                <Label htmlFor="deductible">Deductible Requested</Label>
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
                    <SelectItem value="10000">$10,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="statesCoverage">States Where Coverage is Needed *</Label>
              <Input
                id="statesCoverage"
                value={formData.statesCoverage}
                onChange={(e) => setFormData({ ...formData, statesCoverage: e.target.value })}
                placeholder="e.g., CA, NY, FL"
                data-testid="input-states-coverage"
              />
              <p className="text-xs text-muted-foreground mt-1">Separate multiple states with commas</p>
            </div>

            <div>
              <Label>USL&H Coverage Needed? *</Label>
              <RadioGroup
                value={formData.uslhCoverage}
                onValueChange={(value) => setFormData({ ...formData, uslhCoverage: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="uslh-yes" data-testid="radio-uslh-yes" />
                  <Label htmlFor="uslh-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="uslh-no" data-testid="radio-uslh-no" />
                  <Label htmlFor="uslh-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
              <p className="text-xs text-muted-foreground mt-1">U.S. Longshoremen and Harbor Workers Coverage</p>
            </div>
          </div>
        )}

        {/* Step 3: Payroll Information */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Payroll Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="totalEmployees">Total Number of Employees *</Label>
                <Input
                  id="totalEmployees"
                  type="number"
                  value={formData.totalEmployees}
                  onChange={(e) => setFormData({ ...formData, totalEmployees: e.target.value })}
                  placeholder="0"
                  data-testid="input-total-employees"
                />
              </div>
              <div>
                <Label htmlFor="fullTimeEmployees">Number of Full-Time Employees *</Label>
                <Input
                  id="fullTimeEmployees"
                  type="number"
                  value={formData.fullTimeEmployees}
                  onChange={(e) => setFormData({ ...formData, fullTimeEmployees: e.target.value })}
                  placeholder="0"
                  data-testid="input-full-time-employees"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="partTimeEmployees">Number of Part-Time Employees</Label>
                <Input
                  id="partTimeEmployees"
                  type="number"
                  value={formData.partTimeEmployees}
                  onChange={(e) => setFormData({ ...formData, partTimeEmployees: e.target.value })}
                  placeholder="0"
                  data-testid="input-part-time-employees"
                />
              </div>
              <div>
                <Label htmlFor="contractors1099">Number of 1099 Contractors</Label>
                <Input
                  id="contractors1099"
                  type="number"
                  value={formData.contractors1099}
                  onChange={(e) => setFormData({ ...formData, contractors1099: e.target.value })}
                  placeholder="0"
                  data-testid="input-contractors-1099"
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold">Payroll by Classification</h4>
                  <p className="text-xs text-muted-foreground">Provide detailed payroll breakdown by job classification</p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addClassification} data-testid="button-add-classification">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Classification
                </Button>
              </div>

              {classifications.map((classification, index) => (
                <Card key={index} className="p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Classification {index + 1}</h4>
                    {classifications.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeClassification(index)}
                        data-testid={`button-remove-classification-${index}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Class Code *</Label>
                      <Input
                        value={classification.classCode}
                        onChange={(e) => updateClassification(index, 'classCode', e.target.value)}
                        placeholder="e.g., 8810, 5645"
                        data-testid={`input-class-code-${index}`}
                      />
                    </div>
                    <div>
                      <Label>Number of Employees *</Label>
                      <Input
                        type="number"
                        value={classification.numberOfEmployees}
                        onChange={(e) => updateClassification(index, 'numberOfEmployees', e.target.value)}
                        placeholder="0"
                        data-testid={`input-class-employees-${index}`}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label>Classification Description *</Label>
                    <Input
                      value={classification.description}
                      onChange={(e) => updateClassification(index, 'description', e.target.value)}
                      placeholder="e.g., Clerical Office, Construction - General, Manufacturing"
                      data-testid={`input-class-description-${index}`}
                    />
                  </div>

                  <div className="mt-4">
                    <Label>Annual Payroll ($) *</Label>
                    <Input
                      type="number"
                      value={classification.annualPayroll}
                      onChange={(e) => updateClassification(index, 'annualPayroll', e.target.value)}
                      placeholder="0"
                      data-testid={`input-class-payroll-${index}`}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Claims History */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Claims History</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="claimsLast5Years">Number of Claims in Last 5 Years *</Label>
                <Input
                  id="claimsLast5Years"
                  type="number"
                  value={formData.claimsLast5Years}
                  onChange={(e) => setFormData({ ...formData, claimsLast5Years: e.target.value })}
                  placeholder="0"
                  data-testid="input-claims-last-5-years"
                />
              </div>
              <div>
                <Label htmlFor="totalIncurred">Total Incurred Amount ($) *</Label>
                <Input
                  id="totalIncurred"
                  type="number"
                  value={formData.totalIncurred}
                  onChange={(e) => setFormData({ ...formData, totalIncurred: e.target.value })}
                  placeholder="0"
                  data-testid="input-total-incurred"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="largestClaim">Largest Claim Amount ($)</Label>
                <Input
                  id="largestClaim"
                  type="number"
                  value={formData.largestClaim}
                  onChange={(e) => setFormData({ ...formData, largestClaim: e.target.value })}
                  placeholder="0"
                  data-testid="input-largest-claim"
                />
              </div>
              <div>
                <Label htmlFor="openClaims">Number of Open Claims</Label>
                <Input
                  id="openClaims"
                  type="number"
                  value={formData.openClaims}
                  onChange={(e) => setFormData({ ...formData, openClaims: e.target.value })}
                  placeholder="0"
                  data-testid="input-open-claims"
                />
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-md">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> Detailed loss run information will be requested in the document upload section. Please have your 5-year loss runs available for a more accurate quote.
              </p>
            </div>
          </div>
        )}

        {/* Step 5: Safety Program */}
        {step === 5 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Safety Program</h3>
            <p className="text-sm text-muted-foreground">Safety programs can help reduce claims and may qualify for premium discounts</p>
            
            <div>
              <Label>Do you have a written safety program? *</Label>
              <Select
                value={formData.writtenSafetyProgram}
                onValueChange={(value) => setFormData({ ...formData, writtenSafetyProgram: value })}
              >
                <SelectTrigger data-testid="select-written-safety-program">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="in-development">In Development</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Do you have a return to work program? *</Label>
              <Select
                value={formData.returnToWorkProgram}
                onValueChange={(value) => setFormData({ ...formData, returnToWorkProgram: value })}
              >
                <SelectTrigger data-testid="select-return-to-work">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="informal">Informal/Not Written</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Do you conduct drug testing? *</Label>
              <Select
                value={formData.drugTesting}
                onValueChange={(value) => setFormData({ ...formData, drugTesting: value })}
              >
                <SelectTrigger data-testid="select-drug-testing">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes-pre-employment">Yes - Pre-Employment Only</SelectItem>
                  <SelectItem value="yes-random">Yes - Pre-Employment & Random</SelectItem>
                  <SelectItem value="yes-post-accident">Yes - Pre-Employment & Post-Accident</SelectItem>
                  <SelectItem value="yes-comprehensive">Yes - Comprehensive (All of the Above)</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Do you conduct background checks? *</Label>
              <Select
                value={formData.backgroundChecks}
                onValueChange={(value) => setFormData({ ...formData, backgroundChecks: value })}
              >
                <SelectTrigger data-testid="select-background-checks">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes-all">Yes - All Employees</SelectItem>
                  <SelectItem value="yes-selective">Yes - Select Positions</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 6: Document Upload & Additional Comments */}
        {step === 6 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Document Upload</h3>
            <p className="text-sm text-muted-foreground">Upload supporting documents to help us provide the most accurate quote</p>
            
            <div>
              <Label htmlFor="lossRuns">Upload Loss Runs (5 years) *</Label>
              <Input
                id="lossRuns"
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                multiple
                data-testid="input-loss-runs"
              />
              <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX, XLS, or XLSX format</p>
            </div>

            <div>
              <Label htmlFor="experienceMod">Upload Experience Modification Worksheet</Label>
              <Input
                id="experienceMod"
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                data-testid="input-experience-mod"
              />
              <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX, XLS, or XLSX format</p>
            </div>

            <div>
              <Label htmlFor="acordForms">Upload ACORD Forms</Label>
              <Input
                id="acordForms"
                type="file"
                accept=".pdf,.doc,.docx"
                multiple
                data-testid="input-acord-forms"
              />
              <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or DOCX format</p>
            </div>

            <div>
              <Label htmlFor="declarationsPage">Upload Current Declarations Page</Label>
              <Input
                id="declarationsPage"
                type="file"
                accept=".pdf,.doc,.docx"
                data-testid="input-declarations-page"
              />
              <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or DOCX format</p>
            </div>

            <div>
              <Label htmlFor="safetyProgram">Upload Safety Program (if available)</Label>
              <Input
                id="safetyProgram"
                type="file"
                accept=".pdf,.doc,.docx"
                data-testid="input-safety-program"
              />
              <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or DOCX format</p>
            </div>

            <div>
              <Label htmlFor="additionalDocs">Upload Additional Documents</Label>
              <Input
                id="additionalDocs"
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                multiple
                data-testid="input-additional-docs"
              />
              <p className="text-xs text-muted-foreground mt-1">Any additional supporting documents</p>
            </div>

            <div className="mt-6">
              <Label htmlFor="additionalComments">Additional Comments</Label>
              <Textarea
                id="additionalComments"
                value={formData.additionalComments}
                onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                placeholder="Please provide any additional information that may be helpful..."
                rows={5}
                data-testid="textarea-additional-comments"
              />
            </div>

            <div className="bg-muted/50 p-4 rounded-md">
              <h4 className="font-medium mb-2">What Happens Next?</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Your submission will be reviewed by our workers' compensation specialists</li>
                <li>We'll analyze your payroll, classification codes, and loss history</li>
                <li>You'll receive a competitive quote within 24 hours</li>
                <li>Our team will help with any questions about coverage options</li>
                <li>We can assist with safety program development if needed</li>
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
              Submit Workers' Compensation Risk
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
