import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SERVICE_STATES } from "@shared/constants/states";

export default function CraneRiggersQuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // General Information
    namedInsured: "",
    email: "",
    phone: "",
    brokerage: "",
    newVenture: "",
    renewal: "",
    policyNumber: "",
    currentEffectiveDate: "",
    currentExpiryDate: "",
    requestedEffectiveDate: "",
    requestedExpiryDate: "",
    website: "",
    mailingAddress: "",
    city: "",
    state: "",
    zipCode: "",
    
    // Current Carrier Information
    currentCarrier: "",
    currentLimit: "",
    currentDeductible: "",
    currentPremium: "",
    offeringRenewal: "",
    
    // Business Information
    businessType: "",
    yearsInBusiness: "",
    priorEntities: "",
    
    // Operations
    operations: {
      craneRentalWithOperator: false,
      craneRentalWithoutOperator: false,
      riggingNotPartOfCrane: false,
      millwrightMachinery: false,
      equipmentSalesNew: false,
      equipmentSalesUsed: false,
      hoistRentalWithOperator: false,
      hoistRentalWithoutOperator: false,
      equipmentRentalWithOperator: false,
      equipmentRentalWithoutOperator: false,
      steelErection: false,
      craneInspection: false,
      other: false,
    },
    operationsRevenue: {
      craneRentalWithOperator: "",
      craneRentalWithoutOperator: "",
      riggingNotPartOfCrane: "",
      millwrightMachinery: "",
      equipmentSalesNew: "",
      equipmentSalesUsed: "",
      hoistRentalWithOperator: "",
      hoistRentalWithoutOperator: "",
      equipmentRentalWithOperator: "",
      equipmentRentalWithoutOperator: "",
      steelErection: "",
      craneInspection: "",
      other: "",
    },
    otherOperationDescription: "",
    
    // Industries
    industries: {
      utilities: false,
      bridges: false,
      marine: false,
      construction: false,
      stevedoring: false,
      steelErection: false,
      oilfield: false,
      solarPanels: false,
      industrialPlants: false,
      windFarms: false,
      other: false,
    },
    industriesPercentage: {
      utilities: "",
      bridges: "",
      marine: "",
      construction: "",
      stevedoring: "",
      steelErection: "",
      oilfield: "",
      solarPanels: "",
      industrialPlants: "",
      windFarms: "",
      other: "",
    },
    otherIndustryDescription: "",
    
    // Payroll & Revenue
    payrollProjected: "",
    grossReceiptProjected: "",
    payrollLast12Months: "",
    grossReceiptLast12Months: "",
    
    // Job Information
    averageOnHookExposure: "",
    maximumOnHookExposure: "",
    typicalLiftWeight: "",
    maximumLiftHeight: "",
    annualJobCount: "",
    typicalJobDuration: "",
    currentJobsInProgress: "",
    jobsOutsideUSA: "",
    outsideUSALocation: "",
    
    // Largest Jobs (Past)
    largestJobsPast: [
      { client: "", dates: "", description: "" },
      { client: "", dates: "", description: "" },
      { client: "", dates: "", description: "" },
      { client: "", dates: "", description: "" },
      { client: "", dates: "", description: "" },
    ],
    
    // Largest Jobs (Current/Future)
    largestJobsCurrent: [
      { client: "", dates: "", description: "" },
      { client: "", dates: "", description: "" },
      { client: "", dates: "", description: "" },
      { client: "", dates: "", description: "" },
      { client: "", dates: "", description: "" },
    ],
    
    // Special Work
    workOffshore: "",
    majorityOffshore: "",
    offshoreDetails: "",
    workSubmerged: "",
    submergedDetails: "",
    bridgeDamWork: "",
    bridgeDamDetails: "",
    blastingDemolition: "",
    storeBlastingAgents: "",
    blastingInCompliance: "",
    blastingDetails: "",
    useSubcontractors: "",
    subcontractorDetails: "",
    
    // Rental Operations
    writtenRentalContract: "",
    rentalContractExplanation: "",
    lesseesInsureEquipment: "",
    lesseesInsureExplanation: "",
    holdHarmlessClause: "",
    collectCertificates: "",
    allowSubleasing: "",
    minimumSecurityMeasures: "",
    minimumSecurityExplanation: "",
    
    // Crane Inspection
    licensedForInspection: "",
    inspectionState: "",
    
    // Operator Information
    allOperatorsUnion: "",
    allOperatorsIOUE: "",
    unionName: "",
    unionHireFrequency: "",
    operatorScreeningProcess: "",
    operatorsFieldTested: "",
    newHiresWrittenExam: "",
    safetyTrainingFrequency: "",
    safetyRulesInLanguages: "",
    trainingIntervalsChange: "",
    trainingIntervalDetails: "",
    documentTraining: "",
    loadWeightResponsible: "",
    loadWeightProcedure: "",
    preEngineerLifts: "",
    liftEngineer: "",
    tandemCraneLifts: "",
    tandemDetails: "",
    dedicatedOperatorTeams: "",
    
    // Safety & Testing
    preDrugScreening: "",
    postAccidentScreening: "",
    annualPhysicalExams: "",
    screeningExplanation: "",
    
    // Equipment Information
    equipmentInspectedByLicensed: "",
    inspectionExplanation: "",
    maintenanceByEmployees: "",
    recordsKept: "",
    maintenanceFrequency: "",
    cranesCertified: "",
    certificationExplanation: "",
    recertificationFrequency: "",
    loadChartsPosted: "",
    craneLeveledBeforeLift: "",
    
    // Security
    storageFenced: "",
    storageLighted: "",
    storageLocked: "",
    securityGuards: "",
    otherSecurity: "",
    otherSecurityDetails: "",
    firmFoundations: "",
    safetyDevicesOperational: "",
    fireExtinguisher: "",
    automaticFireSuppression: "",
    coolDownProcedures: "",
    writtenAccidentForm: "",
    
    // Additional Information
    additionalComments: "",
  });

  const [files, setFiles] = useState<{[key: string]: File[]}>({
    lossRuns: [],
    trainingManuals: [],
    employeeHandbooks: [],
    oshaReports: [],
    operationsDescription: [],
    rentalContracts: [],
    tandemLiftDetails: [],
    additionalDocuments: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
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

  const handleRevenueChange = (category: string, item: string, value: string) => {
    setFormData({
      ...formData,
      [category]: {
        ...(formData[category as keyof typeof formData] as any),
        [item]: value,
      },
    });
  };

  const handleJobChange = (type: string, index: number, field: string, value: string) => {
    const jobs = type === "past" ? [...formData.largestJobsPast] : [...formData.largestJobsCurrent];
    jobs[index] = { ...jobs[index], [field]: value };
    setFormData({
      ...formData,
      [type === "past" ? "largestJobsPast" : "largestJobsCurrent"]: jobs,
    });
  };

  const handleFileChange = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles({ ...files, [name]: Array.from(e.target.files) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/crane-riggers-quotes", {
        ...formData,
        payload: { ...formData, files }
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

  const nextStep = () => setStep(Math.min(step + 1, 6));
  const prevStep = () => setStep(Math.max(step - 1, 1));

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Quote Request Submitted!</h2>
          <p className="text-muted-foreground mb-4">
            Thank you for submitting your crane and riggers liability insurance quote request.
          </p>
          <p className="text-lg font-semibold mb-2">
            Reference Number: {referenceNumber}
          </p>
          <p className="text-muted-foreground">
            Our team will review your information and contact you shortly.
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
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="namedInsured">Named Insured *</Label>
                <Input
                  id="namedInsured"
                  name="namedInsured"
                  value={formData.namedInsured}
                  onChange={handleInputChange}
                  required
                  data-testid="input-named-insured"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  data-testid="input-email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  data-testid="input-phone"
                />
              </div>
              <div>
                <Label htmlFor="brokerage">Brokerage/Broker</Label>
                <Input
                  id="brokerage"
                  name="brokerage"
                  value={formData.brokerage}
                  onChange={handleInputChange}
                  data-testid="input-brokerage"
                />
              </div>
              <div>
                <Label>New Venture?</Label>
                <RadioGroup
                  value={formData.newVenture}
                  onValueChange={(value) => handleSelectChange("newVenture", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="newVenture-yes" data-testid="radio-new-venture-yes" />
                    <Label htmlFor="newVenture-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="newVenture-no" data-testid="radio-new-venture-no" />
                    <Label htmlFor="newVenture-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label>Renewal?</Label>
                <RadioGroup
                  value={formData.renewal}
                  onValueChange={(value) => handleSelectChange("renewal", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="renewal-yes" data-testid="radio-renewal-yes" />
                    <Label htmlFor="renewal-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="renewal-no" data-testid="radio-renewal-no" />
                    <Label htmlFor="renewal-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              {formData.renewal === "yes" && (
                <div>
                  <Label htmlFor="policyNumber">Policy Number</Label>
                  <Input
                    id="policyNumber"
                    name="policyNumber"
                    value={formData.policyNumber}
                    onChange={handleInputChange}
                    data-testid="input-policy-number"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="requestedEffectiveDate">Requested Effective Date *</Label>
                <Input
                  id="requestedEffectiveDate"
                  name="requestedEffectiveDate"
                  type="date"
                  value={formData.requestedEffectiveDate}
                  onChange={handleInputChange}
                  required
                  data-testid="input-effective-date"
                />
              </div>
              <div>
                <Label htmlFor="requestedExpiryDate">Requested Expiry Date *</Label>
                <Input
                  id="requestedExpiryDate"
                  name="requestedExpiryDate"
                  type="date"
                  value={formData.requestedExpiryDate}
                  onChange={handleInputChange}
                  required
                  data-testid="input-expiry-date"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleInputChange}
                  data-testid="input-website"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="mailingAddress">Mailing Address *</Label>
                <Input
                  id="mailingAddress"
                  name="mailingAddress"
                  value={formData.mailingAddress}
                  onChange={handleInputChange}
                  required
                  data-testid="input-mailing-address"
                />
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  data-testid="input-city"
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => handleSelectChange("state", value)}
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
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  data-testid="input-zip"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="businessType">Business Type *</Label>
              <Select
                value={formData.businessType}
                onValueChange={(value) => handleSelectChange("businessType", value)}
              >
                <SelectTrigger data-testid="select-business-type">
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corporation">Corporation</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="municipality">Municipality</SelectItem>
                  <SelectItem value="for-profit">For Profit</SelectItem>
                  <SelectItem value="joint-venture">Joint Venture</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="yearsInBusiness">Years in Business *</Label>
              <Input
                id="yearsInBusiness"
                name="yearsInBusiness"
                type="number"
                value={formData.yearsInBusiness}
                onChange={handleInputChange}
                required
                data-testid="input-years-business"
              />
            </div>
            
            <div>
              <Label htmlFor="priorEntities">Prior Business Names/DBAs</Label>
              <Textarea
                id="priorEntities"
                name="priorEntities"
                value={formData.priorEntities}
                onChange={handleInputChange}
                rows={2}
                placeholder="List any prior entities or additional entities/DBAs to be covered"
                data-testid="textarea-prior-entities"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Operations & Revenue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="mb-3 block">Operations (Check all that apply and provide revenue %)</Label>
              <div className="space-y-3">
                {Object.entries({
                  craneRentalWithOperator: "Crane Rental - With Operator",
                  craneRentalWithoutOperator: "Crane Rental - Without Operator",
                  riggingNotPartOfCrane: "Rigging - Not Part of Crane Ops",
                  millwrightMachinery: "Millwright/Machinery Installation",
                  equipmentSalesNew: "Equipment Sales - New",
                  equipmentSalesUsed: "Equipment Sales - Used",
                  hoistRentalWithOperator: "Hoist Rental - With Operator",
                  hoistRentalWithoutOperator: "Hoist Rental - Without Operator",
                  equipmentRentalWithOperator: "Equipment Rental (other) - With Operator",
                  equipmentRentalWithoutOperator: "Equipment Rental (other) - Without Operator",
                  steelErection: "Steel Erection",
                  craneInspection: "Crane Inspection Services",
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={formData.operations[key as keyof typeof formData.operations]}
                        onCheckedChange={() => handleCheckboxChange("operations", key)}
                        data-testid={`checkbox-${key}`}
                      />
                      <Label htmlFor={key} className="w-64">{label}</Label>
                    </div>
                    {formData.operations[key as keyof typeof formData.operations] && (
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={formData.operationsRevenue[key as keyof typeof formData.operationsRevenue]}
                          onChange={(e) => handleRevenueChange("operationsRevenue", key, e.target.value)}
                          placeholder="Revenue %"
                          className="w-32"
                          data-testid={`input-revenue-${key}`}
                        />
                        <span>%</span>
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="other"
                      checked={formData.operations.other}
                      onCheckedChange={() => handleCheckboxChange("operations", "other")}
                      data-testid="checkbox-other"
                    />
                    <Label htmlFor="other">Other</Label>
                  </div>
                  {formData.operations.other && (
                    <>
                      <Input
                        value={formData.otherOperationDescription}
                        onChange={(e) => handleSelectChange("otherOperationDescription", e.target.value)}
                        placeholder="Describe operation"
                        className="flex-1"
                        data-testid="input-other-operation"
                      />
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={formData.operationsRevenue.other}
                          onChange={(e) => handleRevenueChange("operationsRevenue", "other", e.target.value)}
                          placeholder="Revenue %"
                          className="w-32"
                          data-testid="input-revenue-other"
                        />
                        <span>%</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Payroll & Gross Receipts</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="payrollProjected">Payroll - Projected Year</Label>
                  <Input
                    id="payrollProjected"
                    name="payrollProjected"
                    type="number"
                    value={formData.payrollProjected}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-payroll-projected"
                  />
                </div>
                <div>
                  <Label htmlFor="grossReceiptProjected">Gross Receipt - Projected Year</Label>
                  <Input
                    id="grossReceiptProjected"
                    name="grossReceiptProjected"
                    type="number"
                    value={formData.grossReceiptProjected}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-receipt-projected"
                  />
                </div>
                <div>
                  <Label htmlFor="payrollLast12Months">Payroll - Last 12 Months</Label>
                  <Input
                    id="payrollLast12Months"
                    name="payrollLast12Months"
                    type="number"
                    value={formData.payrollLast12Months}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-payroll-12months"
                  />
                </div>
                <div>
                  <Label htmlFor="grossReceiptLast12Months">Gross Receipt - Last 12 Months</Label>
                  <Input
                    id="grossReceiptLast12Months"
                    name="grossReceiptLast12Months"
                    type="number"
                    value={formData.grossReceiptLast12Months}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-receipt-12months"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Industries & Job Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="mb-3 block">Industries (Check all that apply and provide %)</Label>
              <div className="space-y-3">
                {Object.entries({
                  utilities: "Utilities",
                  bridges: "Bridges",
                  marine: "Marine",
                  construction: "Construction",
                  stevedoring: "Stevedoring",
                  steelErection: "Steel Erection",
                  oilfield: "Oilfield/Refineries",
                  solarPanels: "Solar Panels",
                  industrialPlants: "Industrial Plants",
                  windFarms: "Wind Farms",
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`industry-${key}`}
                        checked={formData.industries[key as keyof typeof formData.industries]}
                        onCheckedChange={() => handleCheckboxChange("industries", key)}
                        data-testid={`checkbox-industry-${key}`}
                      />
                      <Label htmlFor={`industry-${key}`} className="w-48">{label}</Label>
                    </div>
                    {formData.industries[key as keyof typeof formData.industries] && (
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={formData.industriesPercentage[key as keyof typeof formData.industriesPercentage]}
                          onChange={(e) => handleRevenueChange("industriesPercentage", key, e.target.value)}
                          placeholder="%"
                          className="w-24"
                          data-testid={`input-industry-percent-${key}`}
                        />
                        <span>%</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Job Specifications</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="averageOnHookExposure">Average On-Hook Exposure ($)</Label>
                  <Input
                    id="averageOnHookExposure"
                    name="averageOnHookExposure"
                    type="number"
                    value={formData.averageOnHookExposure}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-avg-hook-exposure"
                  />
                </div>
                <div>
                  <Label htmlFor="maximumOnHookExposure">Maximum On-Hook Exposure ($)</Label>
                  <Input
                    id="maximumOnHookExposure"
                    name="maximumOnHookExposure"
                    type="number"
                    value={formData.maximumOnHookExposure}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-max-hook-exposure"
                  />
                </div>
                <div>
                  <Label htmlFor="typicalLiftWeight">Typical Lift Weight (tons)</Label>
                  <Input
                    id="typicalLiftWeight"
                    name="typicalLiftWeight"
                    type="number"
                    value={formData.typicalLiftWeight}
                    onChange={handleInputChange}
                    placeholder="tons"
                    data-testid="input-typical-weight"
                  />
                </div>
                <div>
                  <Label htmlFor="maximumLiftHeight">Maximum Lift Height (feet)</Label>
                  <Input
                    id="maximumLiftHeight"
                    name="maximumLiftHeight"
                    type="number"
                    value={formData.maximumLiftHeight}
                    onChange={handleInputChange}
                    placeholder="feet"
                    data-testid="input-max-height"
                  />
                </div>
                <div>
                  <Label htmlFor="annualJobCount">Annual Job Count</Label>
                  <Input
                    id="annualJobCount"
                    name="annualJobCount"
                    type="number"
                    value={formData.annualJobCount}
                    onChange={handleInputChange}
                    data-testid="input-annual-jobs"
                  />
                </div>
                <div>
                  <Label htmlFor="typicalJobDuration">Typical Job Duration</Label>
                  <Input
                    id="typicalJobDuration"
                    name="typicalJobDuration"
                    value={formData.typicalJobDuration}
                    onChange={handleInputChange}
                    placeholder="e.g., 2 days, 1 week"
                    data-testid="input-job-duration"
                  />
                </div>
                <div>
                  <Label htmlFor="currentJobsInProgress">Current Jobs in Progress</Label>
                  <Input
                    id="currentJobsInProgress"
                    name="currentJobsInProgress"
                    type="number"
                    value={formData.currentJobsInProgress}
                    onChange={handleInputChange}
                    data-testid="input-current-jobs"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <Label>Do you have any jobs outside of the USA?</Label>
              <RadioGroup
                value={formData.jobsOutsideUSA}
                onValueChange={(value) => handleSelectChange("jobsOutsideUSA", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="outside-yes" data-testid="radio-outside-usa-yes" />
                  <Label htmlFor="outside-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="outside-no" data-testid="radio-outside-usa-no" />
                  <Label htmlFor="outside-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.jobsOutsideUSA === "yes" && (
              <div>
                <Label htmlFor="outsideUSALocation">Location(s) Outside USA</Label>
                <Input
                  id="outsideUSALocation"
                  name="outsideUSALocation"
                  value={formData.outsideUSALocation}
                  onChange={handleInputChange}
                  data-testid="input-outside-location"
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Job History & Special Operations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Five Largest Jobs (Past 5 Years)</h3>
              <div className="space-y-3">
                {formData.largestJobsPast.map((job, index) => (
                  <div key={index} className="p-3 border rounded-md space-y-2">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`past-client-${index}`}>Client</Label>
                        <Input
                          id={`past-client-${index}`}
                          value={job.client}
                          onChange={(e) => handleJobChange("past", index, "client", e.target.value)}
                          data-testid={`input-past-client-${index}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`past-dates-${index}`}>Dates (MM/YY)</Label>
                        <Input
                          id={`past-dates-${index}`}
                          value={job.dates}
                          onChange={(e) => handleJobChange("past", index, "dates", e.target.value)}
                          placeholder="e.g., 01/23 - 03/23"
                          data-testid={`input-past-dates-${index}`}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={`past-description-${index}`}>Brief Description</Label>
                      <Textarea
                        id={`past-description-${index}`}
                        value={job.description}
                        onChange={(e) => handleJobChange("past", index, "description", e.target.value)}
                        rows={2}
                        data-testid={`textarea-past-description-${index}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Five Largest Jobs (Current/Planned)</h3>
              <div className="space-y-3">
                {formData.largestJobsCurrent.map((job, index) => (
                  <div key={index} className="p-3 border rounded-md space-y-2">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`current-client-${index}`}>Client</Label>
                        <Input
                          id={`current-client-${index}`}
                          value={job.client}
                          onChange={(e) => handleJobChange("current", index, "client", e.target.value)}
                          data-testid={`input-current-client-${index}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`current-dates-${index}`}>Dates (MM/YY)</Label>
                        <Input
                          id={`current-dates-${index}`}
                          value={job.dates}
                          onChange={(e) => handleJobChange("current", index, "dates", e.target.value)}
                          placeholder="e.g., 01/24 - 03/24"
                          data-testid={`input-current-dates-${index}`}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={`current-description-${index}`}>Brief Description</Label>
                      <Textarea
                        id={`current-description-${index}`}
                        value={job.description}
                        onChange={(e) => handleJobChange("current", index, "description", e.target.value)}
                        rows={2}
                        data-testid={`textarea-current-description-${index}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Special Operations</h3>
              <div className="space-y-3">
                <div>
                  <Label>Do you have any work offshore?</Label>
                  <RadioGroup
                    value={formData.workOffshore}
                    onValueChange={(value) => handleSelectChange("workOffshore", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="offshore-yes" data-testid="radio-offshore-yes" />
                      <Label htmlFor="offshore-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="offshore-no" data-testid="radio-offshore-no" />
                      <Label htmlFor="offshore-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {formData.workOffshore === "yes" && (
                  <>
                    <div>
                      <Label>Is this the majority of your operations?</Label>
                      <RadioGroup
                        value={formData.majorityOffshore}
                        onValueChange={(value) => handleSelectChange("majorityOffshore", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="majority-yes" data-testid="radio-majority-yes" />
                          <Label htmlFor="majority-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="majority-no" data-testid="radio-majority-no" />
                          <Label htmlFor="majority-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <Label htmlFor="offshoreDetails">Offshore Work Details</Label>
                      <Textarea
                        id="offshoreDetails"
                        name="offshoreDetails"
                        value={formData.offshoreDetails}
                        onChange={handleInputChange}
                        rows={2}
                        data-testid="textarea-offshore-details"
                      />
                    </div>
                  </>
                )}
                
                <div>
                  <Label>Do you perform any bridge, dam, or overpass work?</Label>
                  <RadioGroup
                    value={formData.bridgeDamWork}
                    onValueChange={(value) => handleSelectChange("bridgeDamWork", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="bridge-yes" data-testid="radio-bridge-yes" />
                      <Label htmlFor="bridge-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="bridge-no" data-testid="radio-bridge-no" />
                      <Label htmlFor="bridge-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {formData.bridgeDamWork === "yes" && (
                  <div>
                    <Label htmlFor="bridgeDamDetails">Bridge/Dam Work Details</Label>
                    <Textarea
                      id="bridgeDamDetails"
                      name="bridgeDamDetails"
                      value={formData.bridgeDamDetails}
                      onChange={handleInputChange}
                      rows={2}
                      data-testid="textarea-bridge-details"
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 5 && (
        <Card>
          <CardHeader>
            <CardTitle>Safety & Equipment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Operator Information</h3>
              <div className="space-y-3">
                <div>
                  <Label>Are all crane operators Union?</Label>
                  <RadioGroup
                    value={formData.allOperatorsUnion}
                    onValueChange={(value) => handleSelectChange("allOperatorsUnion", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="union-yes" data-testid="radio-union-yes" />
                      <Label htmlFor="union-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="union-no" data-testid="radio-union-no" />
                      <Label htmlFor="union-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {formData.allOperatorsUnion === "yes" && (
                  <>
                    <div>
                      <Label>Are all Union operators IUOE?</Label>
                      <RadioGroup
                        value={formData.allOperatorsIOUE}
                        onValueChange={(value) => handleSelectChange("allOperatorsIOUE", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="iuoe-yes" data-testid="radio-iuoe-yes" />
                          <Label htmlFor="iuoe-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="iuoe-no" data-testid="radio-iuoe-no" />
                          <Label htmlFor="iuoe-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    {formData.allOperatorsIOUE === "no" && (
                      <div>
                        <Label htmlFor="unionName">Union Name</Label>
                        <Input
                          id="unionName"
                          name="unionName"
                          value={formData.unionName}
                          onChange={handleInputChange}
                          data-testid="input-union-name"
                        />
                      </div>
                    )}
                  </>
                )}
                
                <div>
                  <Label>Are operators required to pass operational/field test?</Label>
                  <RadioGroup
                    value={formData.operatorsFieldTested}
                    onValueChange={(value) => handleSelectChange("operatorsFieldTested", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="field-yes" data-testid="radio-field-test-yes" />
                      <Label htmlFor="field-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="field-no" data-testid="radio-field-test-no" />
                      <Label htmlFor="field-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label>Pre-employment drug and alcohol screening?</Label>
                  <RadioGroup
                    value={formData.preDrugScreening}
                    onValueChange={(value) => handleSelectChange("preDrugScreening", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="drug-yes" data-testid="radio-drug-yes" />
                      <Label htmlFor="drug-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="drug-no" data-testid="radio-drug-no" />
                      <Label htmlFor="drug-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label>Post-accident drug and alcohol screening?</Label>
                  <RadioGroup
                    value={formData.postAccidentScreening}
                    onValueChange={(value) => handleSelectChange("postAccidentScreening", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="post-yes" data-testid="radio-post-accident-yes" />
                      <Label htmlFor="post-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="post-no" data-testid="radio-post-accident-no" />
                      <Label htmlFor="post-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label>Annual physical exams required?</Label>
                  <RadioGroup
                    value={formData.annualPhysicalExams}
                    onValueChange={(value) => handleSelectChange("annualPhysicalExams", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="physical-yes" data-testid="radio-physical-yes" />
                      <Label htmlFor="physical-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="physical-no" data-testid="radio-physical-no" />
                      <Label htmlFor="physical-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Equipment Information</h3>
              <div className="space-y-3">
                <div>
                  <Label>Is all equipment inspected by licensed persons?</Label>
                  <RadioGroup
                    value={formData.equipmentInspectedByLicensed}
                    onValueChange={(value) => handleSelectChange("equipmentInspectedByLicensed", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="inspect-yes" data-testid="radio-inspect-yes" />
                      <Label htmlFor="inspect-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="inspect-no" data-testid="radio-inspect-no" />
                      <Label htmlFor="inspect-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label>Are all cranes certified?</Label>
                  <RadioGroup
                    value={formData.cranesCertified}
                    onValueChange={(value) => handleSelectChange("cranesCertified", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="certified-yes" data-testid="radio-certified-yes" />
                      <Label htmlFor="certified-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="certified-no" data-testid="radio-certified-no" />
                      <Label htmlFor="certified-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label htmlFor="maintenanceFrequency">Equipment Maintenance Frequency</Label>
                  <Input
                    id="maintenanceFrequency"
                    name="maintenanceFrequency"
                    value={formData.maintenanceFrequency}
                    onChange={handleInputChange}
                    placeholder="e.g., Weekly, Monthly"
                    data-testid="input-maintenance-frequency"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Storage Site Security</h3>
              <div className="space-y-3">
                <div>
                  <Label>Is equipment/vehicle storage site fenced?</Label>
                  <RadioGroup
                    value={formData.storageFenced}
                    onValueChange={(value) => handleSelectChange("storageFenced", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="fence-yes" data-testid="radio-fence-yes" />
                      <Label htmlFor="fence-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="fence-no" data-testid="radio-fence-no" />
                      <Label htmlFor="fence-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label>Is storage site lighted?</Label>
                  <RadioGroup
                    value={formData.storageLighted}
                    onValueChange={(value) => handleSelectChange("storageLighted", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="light-yes" data-testid="radio-light-yes" />
                      <Label htmlFor="light-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="light-no" data-testid="radio-light-no" />
                      <Label htmlFor="light-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label>Is storage site locked?</Label>
                  <RadioGroup
                    value={formData.storageLocked}
                    onValueChange={(value) => handleSelectChange("storageLocked", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="lock-yes" data-testid="radio-lock-yes" />
                      <Label htmlFor="lock-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="lock-no" data-testid="radio-lock-no" />
                      <Label htmlFor="lock-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label>Security guards or night watchmen?</Label>
                  <RadioGroup
                    value={formData.securityGuards}
                    onValueChange={(value) => handleSelectChange("securityGuards", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="guard-yes" data-testid="radio-guard-yes" />
                      <Label htmlFor="guard-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="guard-no" data-testid="radio-guard-no" />
                      <Label htmlFor="guard-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 6 && (
        <Card>
          <CardHeader>
            <CardTitle>Documents & Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Current Insurance Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentCarrier">Current Carrier</Label>
                  <Input
                    id="currentCarrier"
                    name="currentCarrier"
                    value={formData.currentCarrier}
                    onChange={handleInputChange}
                    data-testid="input-current-carrier"
                  />
                </div>
                <div>
                  <Label htmlFor="currentLimit">Current Limit of Insurance</Label>
                  <Input
                    id="currentLimit"
                    name="currentLimit"
                    value={formData.currentLimit}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-current-limit"
                  />
                </div>
                <div>
                  <Label htmlFor="currentDeductible">Current Deductible</Label>
                  <Input
                    id="currentDeductible"
                    name="currentDeductible"
                    value={formData.currentDeductible}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-current-deductible"
                  />
                </div>
                <div>
                  <Label htmlFor="currentPremium">Current Premium</Label>
                  <Input
                    id="currentPremium"
                    name="currentPremium"
                    value={formData.currentPremium}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-current-premium"
                  />
                </div>
              </div>
              <div>
                <Label>Is current carrier offering renewal?</Label>
                <RadioGroup
                  value={formData.offeringRenewal}
                  onValueChange={(value) => handleSelectChange("offeringRenewal", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="renew-yes" data-testid="radio-renew-yes" />
                    <Label htmlFor="renew-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="renew-no" data-testid="radio-renew-no" />
                    <Label htmlFor="renew-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Required Documents</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="lossRuns">5-Year Loss Runs *</Label>
                  <Input
                    id="lossRuns"
                    type="file"
                    onChange={(e) => handleFileChange("lossRuns", e)}
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    multiple
                    required
                    data-testid="file-loss-runs"
                  />
                </div>
                <div>
                  <Label htmlFor="trainingManuals">Training Manuals</Label>
                  <Input
                    id="trainingManuals"
                    type="file"
                    onChange={(e) => handleFileChange("trainingManuals", e)}
                    accept=".pdf,.doc,.docx"
                    multiple
                    data-testid="file-training"
                  />
                </div>
                <div>
                  <Label htmlFor="employeeHandbooks">Employee Handbooks</Label>
                  <Input
                    id="employeeHandbooks"
                    type="file"
                    onChange={(e) => handleFileChange("employeeHandbooks", e)}
                    accept=".pdf,.doc,.docx"
                    multiple
                    data-testid="file-handbooks"
                  />
                </div>
                <div>
                  <Label htmlFor="oshaReports">OSHA Violation Reports</Label>
                  <Input
                    id="oshaReports"
                    type="file"
                    onChange={(e) => handleFileChange("oshaReports", e)}
                    accept=".pdf,.doc,.docx"
                    multiple
                    data-testid="file-osha"
                  />
                </div>
                <div>
                  <Label htmlFor="operationsDescription">Operations Description/Marketing Materials</Label>
                  <Input
                    id="operationsDescription"
                    type="file"
                    onChange={(e) => handleFileChange("operationsDescription", e)}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    multiple
                    data-testid="file-operations"
                  />
                </div>
                {formData.tandemCraneLifts === "yes" && (
                  <div>
                    <Label htmlFor="tandemLiftDetails">Tandem/Dual Crane Lift Details</Label>
                    <Input
                      id="tandemLiftDetails"
                      type="file"
                      onChange={(e) => handleFileChange("tandemLiftDetails", e)}
                      accept=".pdf,.doc,.docx"
                      multiple
                      data-testid="file-tandem"
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="additionalDocuments">Additional Documents</Label>
                  <Input
                    id="additionalDocuments"
                    type="file"
                    onChange={(e) => handleFileChange("additionalDocuments", e)}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
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