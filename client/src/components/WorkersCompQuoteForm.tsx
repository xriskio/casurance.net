import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft, CheckCircle, Plus, Trash2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  classCode: string;
  description: string;
  fullTimeCount: string;
  partTimeCount: string;
  annualPayroll: string;
  location: string;
}

interface PriorCarrier {
  id: string;
  year: string;
  carrier: string;
  policyNumber: string;
  annualPremium: string;
  modFactor: string;
  claimsCount: string;
  amountPaid: string;
  reserve: string;
}

export default function WorkersCompQuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Agency Information
    agencyName: "",
    agencyAddress: "",
    producerName: "",
    producerPhone: "",
    producerEmail: "",
    
    // Applicant Information
    businessName: "",
    phone: "",
    mobilePhone: "",
    email: "",
    mailingAddress: "",
    yearsInBusiness: "",
    sic: "",
    naics: "",
    website: "",
    
    // Business Structure
    businessStructure: "",
    federalEin: "",
    ncciRiskId: "",
    stateRegistrationNumber: "",
    
    // Policy Information
    effectiveDate: "",
    expirationDate: "",
    ratingDate: "",
    policyType: "",
    
    // Coverage Limits (Employer's Liability)
    eachAccident: "",
    diseasePolicyLimit: "",
    diseaseEachEmployee: "",
    
    // Billing Information
    billingPlan: "",
    paymentPlan: "",
    auditFrequency: "",
    
    // Deductibles
    medicalDeductible: "",
    indemnityDeductible: "",
    
    // Additional Coverages
    uslh: false,
    voluntaryComp: false,
    foreignCoverage: false,
    managedCareOption: false,
    
    // Nature of Business
    businessDescription: "",
    manufacturingDetails: "",
    contractorDetails: "",
    mercantileDetails: "",
    serviceDetails: "",
    
    // Premium Estimates
    totalEstimatedPremium: "",
    minimumPremium: "",
    depositPremium: "",
  });

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      classCode: "",
      description: "",
      fullTimeCount: "",
      partTimeCount: "",
      annualPayroll: "",
      location: "",
    }
  ]);

  const [priorCarriers, setPriorCarriers] = useState<PriorCarrier[]>([
    {
      id: "1",
      year: "",
      carrier: "",
      policyNumber: "",
      annualPremium: "",
      modFactor: "",
      claimsCount: "",
      amountPaid: "",
      reserve: "",
    }
  ]);

  const [locations, setLocations] = useState([""]);

  const [generalInfo, setGeneralInfo] = useState({
    aircraftWatercraft: "",
    hazardousMaterial: "",
    workAbove15Feet: "",
    workOverWater: "",
    otherBusiness: "",
    useSubcontractors: "",
    subcontractorPercent: "",
    workWithoutCerts: "",
    safetyProgram: "",
    groupTransportation: "",
    employeesUnder16Over60: "",
    seasonalEmployees: "",
    volunteerLabor: "",
    physicalHandicaps: "",
    outOfStateTravel: "",
    athleticTeams: "",
    physicalsRequired: "",
    otherInsurance: "",
    priorDeclined: "",
    healthPlans: "",
    workForOthers: "",
    leaseEmployees: "",
    workFromHome: "",
    workFromHomeCount: "",
  });

  const addEmployee = () => {
    setEmployees([...employees, {
      id: Date.now().toString(),
      classCode: "",
      description: "",
      fullTimeCount: "",
      partTimeCount: "",
      annualPayroll: "",
      location: "",
    }]);
  };

  const removeEmployee = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const updateEmployee = (id: string, field: keyof Employee, value: string) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, [field]: value } : emp
    ));
  };

  const addPriorCarrier = () => {
    setPriorCarriers([...priorCarriers, {
      id: Date.now().toString(),
      year: "",
      carrier: "",
      policyNumber: "",
      annualPremium: "",
      modFactor: "",
      claimsCount: "",
      amountPaid: "",
      reserve: "",
    }]);
  };

  const removePriorCarrier = (id: string) => {
    setPriorCarriers(priorCarriers.filter(carrier => carrier.id !== id));
  };

  const updatePriorCarrier = (id: string, field: keyof PriorCarrier, value: string) => {
    setPriorCarriers(priorCarriers.map(carrier => 
      carrier.id === id ? { ...carrier, [field]: value } : carrier
    ));
  };

  const addLocation = () => {
    setLocations([...locations, ""]);
  };

  const removeLocation = (index: number) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  const updateLocation = (index: number, value: string) => {
    setLocations(locations.map((loc, i) => i === index ? value : loc));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/workers-comp-quotes", {
        ...formData,
        payload: { ...formData, employees, priorCarriers, locations, generalInfo }
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
          <h3 className="text-2xl font-bold text-foreground mb-4">Workers Compensation Application Submitted!</h3>
          <p className="text-muted-foreground mb-4">
            Thank you for your comprehensive submission.
          </p>
          <p className="text-lg font-semibold mb-2">
            Reference Number: {referenceNumber}
          </p>
          <p className="text-muted-foreground mb-6">
            Our workers compensation specialists will review your employee classifications, payroll data, and risk factors to provide an accurate quote within 24-48 hours.
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
        <CardTitle>Workers Compensation Insurance Application</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Complete this ACORD 130 application for workers compensation coverage. Provide detailed employee classifications, payroll information, and operational details for accurate pricing.
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
        {/* Step 1: Business Information */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Business & Contact Information</h3>
            
            <div>
              <Label htmlFor="businessName">Applicant Business Name *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="Legal business name"
                data-testid="input-applicant-name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Office Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  data-testid="input-office-phone"
                />
              </div>
              <div>
                <Label htmlFor="mobilePhone">Mobile Phone</Label>
                <Input
                  id="mobilePhone"
                  type="tel"
                  value={formData.mobilePhone}
                  onChange={(e) => setFormData({ ...formData, mobilePhone: e.target.value })}
                  placeholder="(555) 987-6543"
                  data-testid="input-mobile-phone"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="mailingAddress">Mailing Address *</Label>
              <Input
                id="mailingAddress"
                value={formData.mailingAddress}
                onChange={(e) => setFormData({ ...formData, mailingAddress: e.target.value })}
                placeholder="Street address, City, State, ZIP+4"
                data-testid="input-mailing-address"
              />
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
                  data-testid="input-email"
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://www.example.com"
                  data-testid="input-website"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="yearsInBusiness">Years in Business *</Label>
                <Input
                  id="yearsInBusiness"
                  type="number"
                  value={formData.yearsInBusiness}
                  onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })}
                  placeholder="0"
                  data-testid="input-years-business"
                />
              </div>
              <div>
                <Label htmlFor="sic">SIC Code</Label>
                <Input
                  id="sic"
                  value={formData.sic}
                  onChange={(e) => setFormData({ ...formData, sic: e.target.value })}
                  placeholder="0000"
                  data-testid="input-sic"
                />
              </div>
              <div>
                <Label htmlFor="naics">NAICS Code</Label>
                <Input
                  id="naics"
                  value={formData.naics}
                  onChange={(e) => setFormData({ ...formData, naics: e.target.value })}
                  placeholder="000000"
                  data-testid="input-naics"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="businessStructure">Business Structure *</Label>
              <Select
                value={formData.businessStructure}
                onValueChange={(value) => setFormData({ ...formData, businessStructure: value })}
              >
                <SelectTrigger data-testid="select-business-structure">
                  <SelectValue placeholder="Select business structure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sole-proprietor">Sole Proprietor</SelectItem>
                  <SelectItem value="corporation">Corporation</SelectItem>
                  <SelectItem value="llc">LLC</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="s-corp">Subchapter S Corporation</SelectItem>
                  <SelectItem value="joint-venture">Joint Venture</SelectItem>
                  <SelectItem value="trust">Trust</SelectItem>
                  <SelectItem value="unincorporated">Unincorporated Association</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="federalEin">Federal Employer ID Number *</Label>
                <Input
                  id="federalEin"
                  value={formData.federalEin}
                  onChange={(e) => setFormData({ ...formData, federalEin: e.target.value })}
                  placeholder="00-0000000"
                  data-testid="input-federal-ein"
                />
              </div>
              <div>
                <Label htmlFor="ncciRiskId">NCCI Risk ID Number</Label>
                <Input
                  id="ncciRiskId"
                  value={formData.ncciRiskId}
                  onChange={(e) => setFormData({ ...formData, ncciRiskId: e.target.value })}
                  placeholder="Optional"
                  data-testid="input-ncci-risk"
                />
              </div>
            </div>

            <div>
              <Label>Business Locations *</Label>
              <p className="text-xs text-muted-foreground mb-2">List all locations where employees work</p>
              {locations.map((location, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={location}
                    onChange={(e) => updateLocation(index, e.target.value)}
                    placeholder="Street, City, County, State, ZIP"
                    data-testid={`input-location-${index}`}
                  />
                  {locations.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeLocation(index)}
                      data-testid={`button-remove-location-${index}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addLocation}
                className="mt-2"
                data-testid="button-add-location"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Location
              </Button>
            </div>

            <h4 className="font-medium mt-6">Agency Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="agencyName">Agency Name</Label>
                <Input
                  id="agencyName"
                  value={formData.agencyName}
                  onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                  placeholder="Insurance agency name"
                  data-testid="input-agency-name"
                />
              </div>
              <div>
                <Label htmlFor="producerName">Producer Name</Label>
                <Input
                  id="producerName"
                  value={formData.producerName}
                  onChange={(e) => setFormData({ ...formData, producerName: e.target.value })}
                  placeholder="Agent/broker name"
                  data-testid="input-producer-name"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Policy Information */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Policy Information & Coverage</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="effectiveDate">Proposed Effective Date *</Label>
                <Input
                  id="effectiveDate"
                  type="date"
                  value={formData.effectiveDate}
                  onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                  data-testid="input-effective-date"
                />
              </div>
              <div>
                <Label htmlFor="expirationDate">Proposed Expiration Date *</Label>
                <Input
                  id="expirationDate"
                  type="date"
                  value={formData.expirationDate}
                  onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                  data-testid="input-expiration-date"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="policyType">Policy Type *</Label>
              <Select
                value={formData.policyType}
                onValueChange={(value) => setFormData({ ...formData, policyType: value })}
              >
                <SelectTrigger data-testid="select-policy-type">
                  <SelectValue placeholder="Select policy type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="participating">Participating</SelectItem>
                  <SelectItem value="non-participating">Non-Participating</SelectItem>
                  <SelectItem value="retro">Retrospective Rating Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <h4 className="font-medium mt-6">Employer's Liability Limits</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="eachAccident">Each Accident ($) *</Label>
                <Select
                  value={formData.eachAccident}
                  onValueChange={(value) => setFormData({ ...formData, eachAccident: value })}
                >
                  <SelectTrigger data-testid="select-each-accident">
                    <SelectValue placeholder="Select limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100000">$100,000</SelectItem>
                    <SelectItem value="500000">$500,000</SelectItem>
                    <SelectItem value="1000000">$1,000,000</SelectItem>
                    <SelectItem value="2000000">$2,000,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="diseasePolicyLimit">Disease - Policy Limit ($) *</Label>
                <Select
                  value={formData.diseasePolicyLimit}
                  onValueChange={(value) => setFormData({ ...formData, diseasePolicyLimit: value })}
                >
                  <SelectTrigger data-testid="select-disease-policy">
                    <SelectValue placeholder="Select limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100000">$100,000</SelectItem>
                    <SelectItem value="500000">$500,000</SelectItem>
                    <SelectItem value="1000000">$1,000,000</SelectItem>
                    <SelectItem value="2000000">$2,000,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="diseaseEachEmployee">Disease - Each Employee ($) *</Label>
                <Select
                  value={formData.diseaseEachEmployee}
                  onValueChange={(value) => setFormData({ ...formData, diseaseEachEmployee: value })}
                >
                  <SelectTrigger data-testid="select-disease-employee">
                    <SelectValue placeholder="Select limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100000">$100,000</SelectItem>
                    <SelectItem value="500000">$500,000</SelectItem>
                    <SelectItem value="1000000">$1,000,000</SelectItem>
                    <SelectItem value="2000000">$2,000,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <h4 className="font-medium mt-6">Billing & Audit Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="billingPlan">Billing Plan</Label>
                <Select
                  value={formData.billingPlan}
                  onValueChange={(value) => setFormData({ ...formData, billingPlan: value })}
                >
                  <SelectTrigger data-testid="select-billing-plan">
                    <SelectValue placeholder="Select billing plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agency-bill">Agency Bill</SelectItem>
                    <SelectItem value="direct-bill">Direct Bill</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="paymentPlan">Payment Plan</Label>
                <Select
                  value={formData.paymentPlan}
                  onValueChange={(value) => setFormData({ ...formData, paymentPlan: value })}
                >
                  <SelectTrigger data-testid="select-payment-plan">
                    <SelectValue placeholder="Select payment plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Annual</SelectItem>
                    <SelectItem value="semi-annual">Semi-Annual</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="auditFrequency">Audit Frequency</Label>
                <Select
                  value={formData.auditFrequency}
                  onValueChange={(value) => setFormData({ ...formData, auditFrequency: value })}
                >
                  <SelectTrigger data-testid="select-audit-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expiration">At Expiration</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="semi-annual">Semi-Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <h4 className="font-medium mt-6">Deductibles (if applicable)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="medicalDeductible">Medical Deductible</Label>
                <Select
                  value={formData.medicalDeductible}
                  onValueChange={(value) => setFormData({ ...formData, medicalDeductible: value })}
                >
                  <SelectTrigger data-testid="select-medical-deductible">
                    <SelectValue placeholder="Select deductible" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No Deductible</SelectItem>
                    <SelectItem value="500">$500</SelectItem>
                    <SelectItem value="1000">$1,000</SelectItem>
                    <SelectItem value="2500">$2,500</SelectItem>
                    <SelectItem value="5000">$5,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="indemnityDeductible">Indemnity Deductible</Label>
                <Select
                  value={formData.indemnityDeductible}
                  onValueChange={(value) => setFormData({ ...formData, indemnityDeductible: value })}
                >
                  <SelectTrigger data-testid="select-indemnity-deductible">
                    <SelectValue placeholder="Select deductible" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No Deductible</SelectItem>
                    <SelectItem value="500">$500</SelectItem>
                    <SelectItem value="1000">$1,000</SelectItem>
                    <SelectItem value="2500">$2,500</SelectItem>
                    <SelectItem value="5000">$5,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <h4 className="font-medium mt-6">Additional Coverages</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uslh"
                  checked={formData.uslh}
                  onCheckedChange={(checked) => setFormData({ ...formData, uslh: checked as boolean })}
                  data-testid="checkbox-uslh"
                />
                <Label htmlFor="uslh" className="font-normal cursor-pointer">
                  U.S. Longshore and Harbor Workers' Compensation Act Coverage
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="voluntaryComp"
                  checked={formData.voluntaryComp}
                  onCheckedChange={(checked) => setFormData({ ...formData, voluntaryComp: checked as boolean })}
                  data-testid="checkbox-voluntary-comp"
                />
                <Label htmlFor="voluntaryComp" className="font-normal cursor-pointer">
                  Voluntary Compensation
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="foreignCoverage"
                  checked={formData.foreignCoverage}
                  onCheckedChange={(checked) => setFormData({ ...formData, foreignCoverage: checked as boolean })}
                  data-testid="checkbox-foreign"
                />
                <Label htmlFor="foreignCoverage" className="font-normal cursor-pointer">
                  Foreign Coverage
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="managedCareOption"
                  checked={formData.managedCareOption}
                  onCheckedChange={(checked) => setFormData({ ...formData, managedCareOption: checked as boolean })}
                  data-testid="checkbox-managed-care"
                />
                <Label htmlFor="managedCareOption" className="font-normal cursor-pointer">
                  Managed Care Option
                </Label>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Employee Classifications */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Employee Classifications & Payroll</h3>
            <p className="text-sm text-muted-foreground">
              List all employee classifications with accurate payroll information for proper rating
            </p>
            
            {employees.map((employee, index) => (
              <Card key={employee.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Classification {index + 1}</h4>
                    {employees.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeEmployee(employee.id)}
                        data-testid={`button-remove-employee-${index}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Class Code *</Label>
                      <Input
                        value={employee.classCode}
                        onChange={(e) => updateEmployee(employee.id, 'classCode', e.target.value)}
                        placeholder="e.g., 8810"
                        data-testid={`input-class-code-${index}`}
                      />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Select
                        value={employee.location}
                        onValueChange={(value) => updateEmployee(employee.id, 'location', value)}
                      >
                        <SelectTrigger data-testid={`select-location-${index}`}>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((loc, i) => (
                            <SelectItem key={i} value={`location-${i}`}>
                              {loc || `Location ${i + 1}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Classification Description *</Label>
                    <Input
                      value={employee.description}
                      onChange={(e) => updateEmployee(employee.id, 'description', e.target.value)}
                      placeholder="e.g., Clerical Office Employees"
                      data-testid={`input-description-${index}`}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Full-Time Employees</Label>
                      <Input
                        type="number"
                        value={employee.fullTimeCount}
                        onChange={(e) => updateEmployee(employee.id, 'fullTimeCount', e.target.value)}
                        placeholder="0"
                        data-testid={`input-ft-count-${index}`}
                      />
                    </div>
                    <div>
                      <Label>Part-Time Employees</Label>
                      <Input
                        type="number"
                        value={employee.partTimeCount}
                        onChange={(e) => updateEmployee(employee.id, 'partTimeCount', e.target.value)}
                        placeholder="0"
                        data-testid={`input-pt-count-${index}`}
                      />
                    </div>
                    <div>
                      <Label>Estimated Annual Payroll ($) *</Label>
                      <Input
                        type="number"
                        value={employee.annualPayroll}
                        onChange={(e) => updateEmployee(employee.id, 'annualPayroll', e.target.value)}
                        placeholder="0"
                        data-testid={`input-payroll-${index}`}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={addEmployee}
              className="w-full"
              data-testid="button-add-classification"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Employee Classification
            </Button>

            <div className="bg-muted/50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Common Classification Codes</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>8810:</strong> Clerical Office Employees</li>
                <li><strong>8742:</strong> Salespersons - Outside</li>
                <li><strong>5183:</strong> Plumbing</li>
                <li><strong>5403:</strong> Carpentry</li>
                <li><strong>5213:</strong> Concrete Construction</li>
                <li><strong>3724:</strong> Millwright Work</li>
                <li><strong>8227:</strong> Construction - General Contractors</li>
              </ul>
            </div>

            <h4 className="font-medium mt-6">Premium Estimates</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="totalEstimatedPremium">Total Estimated Annual Premium ($)</Label>
                <Input
                  id="totalEstimatedPremium"
                  type="number"
                  value={formData.totalEstimatedPremium}
                  onChange={(e) => setFormData({ ...formData, totalEstimatedPremium: e.target.value })}
                  placeholder="0"
                  data-testid="input-total-premium"
                />
              </div>
              <div>
                <Label htmlFor="minimumPremium">Minimum Premium ($)</Label>
                <Input
                  id="minimumPremium"
                  type="number"
                  value={formData.minimumPremium}
                  onChange={(e) => setFormData({ ...formData, minimumPremium: e.target.value })}
                  placeholder="0"
                  data-testid="input-min-premium"
                />
              </div>
              <div>
                <Label htmlFor="depositPremium">Deposit Premium ($)</Label>
                <Input
                  id="depositPremium"
                  type="number"
                  value={formData.depositPremium}
                  onChange={(e) => setFormData({ ...formData, depositPremium: e.target.value })}
                  placeholder="0"
                  data-testid="input-deposit-premium"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Prior Coverage & Loss History */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Prior Coverage & Loss History</h3>
            <p className="text-sm text-muted-foreground">
              Provide information for the past 5 years
            </p>
            
            {priorCarriers.map((carrier, index) => (
              <Card key={carrier.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Year {index + 1}</h4>
                    {priorCarriers.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removePriorCarrier(carrier.id)}
                        data-testid={`button-remove-carrier-${index}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Policy Year</Label>
                      <Input
                        type="number"
                        value={carrier.year}
                        onChange={(e) => updatePriorCarrier(carrier.id, 'year', e.target.value)}
                        placeholder="YYYY"
                        data-testid={`input-carrier-year-${index}`}
                      />
                    </div>
                    <div>
                      <Label>Carrier Name</Label>
                      <Input
                        value={carrier.carrier}
                        onChange={(e) => updatePriorCarrier(carrier.id, 'carrier', e.target.value)}
                        placeholder="Insurance company"
                        data-testid={`input-carrier-name-${index}`}
                      />
                    </div>
                    <div>
                      <Label>Policy Number</Label>
                      <Input
                        value={carrier.policyNumber}
                        onChange={(e) => updatePriorCarrier(carrier.id, 'policyNumber', e.target.value)}
                        placeholder="Policy #"
                        data-testid={`input-policy-number-${index}`}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Annual Premium ($)</Label>
                      <Input
                        type="number"
                        value={carrier.annualPremium}
                        onChange={(e) => updatePriorCarrier(carrier.id, 'annualPremium', e.target.value)}
                        placeholder="0"
                        data-testid={`input-carrier-premium-${index}`}
                      />
                    </div>
                    <div>
                      <Label>Experience Mod Factor</Label>
                      <Input
                        value={carrier.modFactor}
                        onChange={(e) => updatePriorCarrier(carrier.id, 'modFactor', e.target.value)}
                        placeholder="e.g., 1.00"
                        data-testid={`input-mod-factor-${index}`}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Number of Claims</Label>
                      <Input
                        type="number"
                        value={carrier.claimsCount}
                        onChange={(e) => updatePriorCarrier(carrier.id, 'claimsCount', e.target.value)}
                        placeholder="0"
                        data-testid={`input-claims-count-${index}`}
                      />
                    </div>
                    <div>
                      <Label>Amount Paid ($)</Label>
                      <Input
                        type="number"
                        value={carrier.amountPaid}
                        onChange={(e) => updatePriorCarrier(carrier.id, 'amountPaid', e.target.value)}
                        placeholder="0"
                        data-testid={`input-amount-paid-${index}`}
                      />
                    </div>
                    <div>
                      <Label>Reserve ($)</Label>
                      <Input
                        type="number"
                        value={carrier.reserve}
                        onChange={(e) => updatePriorCarrier(carrier.id, 'reserve', e.target.value)}
                        placeholder="0"
                        data-testid={`input-reserve-${index}`}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={addPriorCarrier}
              className="w-full"
              data-testid="button-add-prior-carrier"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Prior Year Coverage
            </Button>

            <div className="mt-6">
              <Label htmlFor="businessDescription">Nature of Business / Description of Operations *</Label>
              <Textarea
                id="businessDescription"
                value={formData.businessDescription}
                onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                placeholder="Provide detailed description of business operations, products, services, equipment used, etc."
                rows={5}
                data-testid="textarea-business-description"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Include: Manufacturing processes, raw materials, contractor work types, merchandise types, service locations, etc.
              </p>
            </div>
          </div>
        )}

        {/* Step 5: General Information Questionnaire */}
        {step === 5 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">General Information & Risk Assessment</h3>
            <p className="text-sm text-muted-foreground">
              Please answer all questions accurately for proper underwriting
            </p>
            
            <div className="space-y-4">
              <div>
                <Label>1. Does applicant own, operate or lease aircraft/watercraft? *</Label>
                <RadioGroup
                  value={generalInfo.aircraftWatercraft}
                  onValueChange={(value) => setGeneralInfo({ ...generalInfo, aircraftWatercraft: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="aircraft-yes" />
                    <Label htmlFor="aircraft-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="aircraft-no" />
                    <Label htmlFor="aircraft-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>2. Do operations involve storing, treating, or transporting hazardous materials? *</Label>
                <RadioGroup
                  value={generalInfo.hazardousMaterial}
                  onValueChange={(value) => setGeneralInfo({ ...generalInfo, hazardousMaterial: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="hazardous-yes" />
                    <Label htmlFor="hazardous-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="hazardous-no" />
                    <Label htmlFor="hazardous-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>3. Any work performed underground or above 15 feet? *</Label>
                <RadioGroup
                  value={generalInfo.workAbove15Feet}
                  onValueChange={(value) => setGeneralInfo({ ...generalInfo, workAbove15Feet: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="height-yes" />
                    <Label htmlFor="height-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="height-no" />
                    <Label htmlFor="height-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>4. Any work performed on barges, vessels, docks, or bridges over water? *</Label>
                <RadioGroup
                  value={generalInfo.workOverWater}
                  onValueChange={(value) => setGeneralInfo({ ...generalInfo, workOverWater: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="water-yes" />
                    <Label htmlFor="water-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="water-no" />
                    <Label htmlFor="water-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>5. Is applicant engaged in any other type of business? *</Label>
                <RadioGroup
                  value={generalInfo.otherBusiness}
                  onValueChange={(value) => setGeneralInfo({ ...generalInfo, otherBusiness: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="other-business-yes" />
                    <Label htmlFor="other-business-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="other-business-no" />
                    <Label htmlFor="other-business-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>6. Are sub-contractors used? *</Label>
                <RadioGroup
                  value={generalInfo.useSubcontractors}
                  onValueChange={(value) => setGeneralInfo({ ...generalInfo, useSubcontractors: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="subs-yes" />
                    <Label htmlFor="subs-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="subs-no" />
                    <Label htmlFor="subs-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
                {generalInfo.useSubcontractors === "yes" && (
                  <div className="mt-2">
                    <Label htmlFor="subcontractorPercent">Percentage of work subcontracted (%)</Label>
                    <Input
                      id="subcontractorPercent"
                      type="number"
                      value={generalInfo.subcontractorPercent}
                      onChange={(e) => setGeneralInfo({ ...generalInfo, subcontractorPercent: e.target.value })}
                      placeholder="0"
                      data-testid="input-sub-percent"
                    />
                  </div>
                )}
              </div>

              <div>
                <Label>7. Any work sublet without certificates of insurance? *</Label>
                <RadioGroup
                  value={generalInfo.workWithoutCerts}
                  onValueChange={(value) => setGeneralInfo({ ...generalInfo, workWithoutCerts: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="no-certs-yes" />
                    <Label htmlFor="no-certs-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no-certs-no" />
                    <Label htmlFor="no-certs-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
                <p className="text-xs text-muted-foreground mt-1">
                  If YES, payroll for this work must be included in classifications
                </p>
              </div>

              <div>
                <Label>8. Is a written safety program in operation? *</Label>
                <RadioGroup
                  value={generalInfo.safetyProgram}
                  onValueChange={(value) => setGeneralInfo({ ...generalInfo, safetyProgram: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="safety-yes" />
                    <Label htmlFor="safety-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="safety-no" />
                    <Label htmlFor="safety-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>9. Any group transportation provided? *</Label>
                <RadioGroup
                  value={generalInfo.groupTransportation}
                  onValueChange={(value) => setGeneralInfo({ ...generalInfo, groupTransportation: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="transport-yes" />
                    <Label htmlFor="transport-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="transport-no" />
                    <Label htmlFor="transport-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>10. Any employees under 16 or over 60 years of age? *</Label>
                <RadioGroup
                  value={generalInfo.employeesUnder16Over60}
                  onValueChange={(value) => setGeneralInfo({ ...generalInfo, employeesUnder16Over60: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="age-yes" />
                    <Label htmlFor="age-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="age-no" />
                    <Label htmlFor="age-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>11. Any seasonal employees? *</Label>
                <RadioGroup
                  value={generalInfo.seasonalEmployees}
                  onValueChange={(value) => setGeneralInfo({ ...generalInfo, seasonalEmployees: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="seasonal-yes" />
                    <Label htmlFor="seasonal-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="seasonal-no" />
                    <Label htmlFor="seasonal-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>12. Is there any volunteer or donated labor? *</Label>
                <RadioGroup
                  value={generalInfo.volunteerLabor}
                  onValueChange={(value) => setGeneralInfo({ ...generalInfo, volunteerLabor: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="volunteer-yes" />
                    <Label htmlFor="volunteer-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="volunteer-no" />
                    <Label htmlFor="volunteer-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>13. Any employees with physical handicaps? *</Label>
                <RadioGroup
                  value={generalInfo.physicalHandicaps}
                  onValueChange={(value) => setGeneralInfo({ ...generalInfo, physicalHandicaps: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="handicaps-yes" />
                    <Label htmlFor="handicaps-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="handicaps-no" />
                    <Label htmlFor="handicaps-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>14. Do employees travel out of state? *</Label>
                <RadioGroup
                  value={generalInfo.outOfStateTravel}
                  onValueChange={(value) => setGeneralInfo({ ...generalInfo, outOfStateTravel: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="travel-yes" />
                    <Label htmlFor="travel-yes" className="font-normal cursor-pointer">Yes (specify states in comments)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="travel-no" />
                    <Label htmlFor="travel-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>15. Are athletic teams sponsored? *</Label>
                <RadioGroup
                  value={generalInfo.athleticTeams}
                  onValueChange={(value) => setGeneralInfo({ ...generalInfo, athleticTeams: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="athletic-yes" />
                    <Label htmlFor="athletic-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="athletic-no" />
                    <Label htmlFor="athletic-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>16. Are physicals required after offers of employment are made? *</Label>
                <RadioGroup
                  value={generalInfo.physicalsRequired}
                  onValueChange={(value) => setGeneralInfo({ ...generalInfo, physicalsRequired: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="physicals-yes" />
                    <Label htmlFor="physicals-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="physicals-no" />
                    <Label htmlFor="physicals-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>17. Any other insurance with this insurer? *</Label>
                <RadioGroup
                  value={generalInfo.otherInsurance}
                  onValueChange={(value) => setGeneralInfo({ ...generalInfo, otherInsurance: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="other-insurance-yes" />
                    <Label htmlFor="other-insurance-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="other-insurance-no" />
                    <Label htmlFor="other-insurance-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>18. Any prior coverage declined/cancelled/non-renewed in last 3 years? *</Label>
                <RadioGroup
                  value={generalInfo.priorDeclined}
                  onValueChange={(value) => setGeneralInfo({ ...generalInfo, priorDeclined: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="declined-yes" />
                    <Label htmlFor="declined-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="declined-no" />
                    <Label htmlFor="declined-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="na" id="declined-na" />
                    <Label htmlFor="declined-na" className="font-normal cursor-pointer">N/A (Missouri applicants)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>19. Are employee health plans provided? *</Label>
                <RadioGroup
                  value={generalInfo.healthPlans}
                  onValueChange={(value) => setGeneralInfo({ ...generalInfo, healthPlans: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="health-yes" />
                    <Label htmlFor="health-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="health-no" />
                    <Label htmlFor="health-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>20. Do employees perform work for other businesses or subsidiaries? *</Label>
                <RadioGroup
                  value={generalInfo.workForOthers}
                  onValueChange={(value) => setGeneralInfo({ ...generalInfo, workForOthers: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="work-others-yes" />
                    <Label htmlFor="work-others-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="work-others-no" />
                    <Label htmlFor="work-others-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>21. Do you lease employees to or from other employers? *</Label>
                <RadioGroup
                  value={generalInfo.leaseEmployees}
                  onValueChange={(value) => setGeneralInfo({ ...generalInfo, leaseEmployees: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="lease-yes" />
                    <Label htmlFor="lease-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="lease-no" />
                    <Label htmlFor="lease-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>22. Do any employees predominantly work at home? *</Label>
                <RadioGroup
                  value={generalInfo.workFromHome}
                  onValueChange={(value) => setGeneralInfo({ ...generalInfo, workFromHome: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="wfh-yes" />
                    <Label htmlFor="wfh-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="wfh-no" />
                    <Label htmlFor="wfh-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
                {generalInfo.workFromHome === "yes" && (
                  <div className="mt-2">
                    <Label htmlFor="workFromHomeCount">Number of employees working from home</Label>
                    <Input
                      id="workFromHomeCount"
                      type="number"
                      value={generalInfo.workFromHomeCount}
                      onChange={(e) => setGeneralInfo({ ...generalInfo, workFromHomeCount: e.target.value })}
                      placeholder="0"
                      data-testid="input-wfh-count"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Document Upload */}
        {step === 6 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Supporting Documents & Additional Information</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="lossRuns">Loss Runs (5 years) *</Label>
                <Input
                  id="lossRuns"
                  type="file"
                  accept=".pdf,.xls,.xlsx"
                  data-testid="input-loss-runs"
                />
                <p className="text-xs text-muted-foreground mt-1">Currently valued company loss runs from prior carriers</p>
              </div>

              <div>
                <Label htmlFor="experienceMod">Experience Modification Worksheet</Label>
                <Input
                  id="experienceMod"
                  type="file"
                  accept=".pdf"
                  data-testid="input-exp-mod"
                />
                <p className="text-xs text-muted-foreground mt-1">If experience rating applies</p>
              </div>

              <div>
                <Label htmlFor="safetyManual">Safety Program Manual</Label>
                <Input
                  id="safetyManual"
                  type="file"
                  accept=".pdf"
                  data-testid="input-safety-manual"
                />
                <p className="text-xs text-muted-foreground mt-1">If written safety program is in operation</p>
              </div>

              <div>
                <Label htmlFor="subcontractorCerts">Subcontractor Certificates</Label>
                <Input
                  id="subcontractorCerts"
                  type="file"
                  accept=".pdf"
                  multiple
                  data-testid="input-sub-certs"
                />
                <p className="text-xs text-muted-foreground mt-1">Certificates of insurance for all subcontractors</p>
              </div>

              <div>
                <Label htmlFor="payrollRecords">Payroll Records</Label>
                <Input
                  id="payrollRecords"
                  type="file"
                  accept=".pdf,.xls,.xlsx"
                  data-testid="input-payroll"
                />
                <p className="text-xs text-muted-foreground mt-1">Recent payroll reports by classification</p>
              </div>

              <div>
                <Label htmlFor="federalReturns">Federal Tax Returns (941s)</Label>
                <Input
                  id="federalReturns"
                  type="file"
                  accept=".pdf"
                  data-testid="input-941s"
                />
                <p className="text-xs text-muted-foreground mt-1">Quarterly federal tax returns</p>
              </div>

              <div>
                <Label htmlFor="stateReturns">State Unemployment Returns</Label>
                <Input
                  id="stateReturns"
                  type="file"
                  accept=".pdf"
                  data-testid="input-state-returns"
                />
                <p className="text-xs text-muted-foreground mt-1">State unemployment insurance returns</p>
              </div>

              <div>
                <Label htmlFor="contractSamples">Sample Contracts</Label>
                <Input
                  id="contractSamples"
                  type="file"
                  accept=".pdf"
                  data-testid="input-contracts"
                />
                <p className="text-xs text-muted-foreground mt-1">For contractors: Sample contracts with hold harmless agreements</p>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-md">
              <h4 className="font-medium mb-2">What Happens Next?</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Your application will be reviewed by our workers compensation underwriters</li>
                <li>We'll verify employee classifications and calculate appropriate rates</li>
                <li>Experience modification factors will be confirmed if applicable</li>
                <li>You'll receive a comprehensive quote within 24-48 hours</li>
                <li>Our team can assist with safety programs and risk management</li>
                <li>Payroll audits will be scheduled according to your selected frequency</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-md border border-yellow-200 dark:border-yellow-900">
              <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Important Notes</h4>
              <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                <li>• All payroll must be accurately reported by proper classification</li>
                <li>• Certificates of insurance required for all subcontractors</li>
                <li>• Payroll for uninsured subcontractors must be included</li>
                <li>• Officers/owners can be included or excluded per state regulations</li>
                <li>• Premium audit will verify actual vs. estimated payroll</li>
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
              Submit Workers Compensation Application
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}