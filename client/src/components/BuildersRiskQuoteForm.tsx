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

export default function BuildersRiskQuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // General Information
    projectStartDate: "",
    projectCompletionDate: "",
    namedInsured: "",
    email: "",
    phone: "",
    websiteAddress: "",
    mailingAddress: "",
    projectLocationAddress: "",
    projectDescription: "",
    protectionClass: "",
    distanceFireHydrant: "",
    distanceFireDepartment: "",
    contractor: "",
    contractorWebsite: "",
    owner: "",
    constructionType: "",
    squareFootage: "",
    numberOfStories: "",
    
    // Limits
    hardCost: "",
    grossEarnings: "",
    extraExpense: "",
    softCosts: "",
    temporaryStorage: "",
    transit: "",
    flood: "",
    earthquake: "",
    coldTesting: "",
    includeHotTesting: "",
    
    // Deductibles
    hardCostDeductible: "",
    grossEarningsDeductible: "",
    waitingPeriod: "",
    softCostsWaitingPeriod: "",
    floodDeductible: "",
    earthquakeDeductible: "",
    coldTestingDeductible: "",
    hotTestingDeductible: "",
    
    // Project Details
    intendedOccupancy: "",
    multipleBuildings: "",
    plotPlanFile: "",
    fastTrack: "",
    waterDamagePrevention: "",
    waterPreventionPlan: "",
    sensorShutoffValves: "",
    centralBurglarAlarm: "",
    centralFireAlarm: "",
    watchperson: "",
    hourlyRounds: "",
    fenced: "",
    lighted: "",
    videoSurveillance: "",
    hotWork: "",
    firePreventionPlan: "",
    softCostsBreakdown: "",
    highValuedFinishes: "",
    contingencyPlan: "",
    materialsBelowGrade: "",
    offGroundStorage: "",
    midtermCoverage: "",
    projectPercentComplete: "",
    priorLosses: "",
    lossHistory: "",
    materialsInOpen: "",
    openStorageLocation: "",
    protectionMeasures: "",
    
    // Mortgagee/Loss Payee
    mortgageeType: "",
    mortgageeName: "",
    mortgageeAddress: "",
    
    // Additional Documents
    budget: "",
    timeline: "",
    artistRendering: "",
    geotechnicalReport: "",
    waterPreventionPlanDoc: "",
    
    // Additional Information
    additionalComments: "",
  });

  const [files, setFiles] = useState<{[key: string]: File[]}>({
    plotPlan: [],
    waterPreventionPlanDoc: [],
    firePreventionPlan: [],
    contingencyPlan: [],
    budget: [],
    timeline: [],
    artistRendering: [],
    geotechnicalReport: [],
    lossHistory: [],
    additionalDocuments: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
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
      const response = await apiRequest("POST", "/api/builders-risk-quotes", {
        ...formData,
        payload: { ...formData, files }
      });
      
      setReferenceNumber(response.referenceNumber);
      setSubmitted(true);
      
      toast({
        title: "Quote Request Submitted!",
        description: `Your reference number is ${response.referenceNumber}. We'll contact you shortly.`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message || "Failed to submit quote request. Please try again.",
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
          <p className="text-lg font-semibold text-primary mb-2">
            Reference Number: {referenceNumber}
          </p>
          <p className="text-muted-foreground">
            Thank you for submitting your builders risk insurance quote request. Our team will review your information and contact you shortly. Please save your reference number for future correspondence.
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
                <Label htmlFor="projectStartDate">Project Start Date *</Label>
                <Input
                  id="projectStartDate"
                  name="projectStartDate"
                  type="date"
                  value={formData.projectStartDate}
                  onChange={handleInputChange}
                  required
                  data-testid="input-project-start-date"
                />
              </div>
              <div>
                <Label htmlFor="projectCompletionDate">Project Completion Date *</Label>
                <Input
                  id="projectCompletionDate"
                  name="projectCompletionDate"
                  type="date"
                  value={formData.projectCompletionDate}
                  onChange={handleInputChange}
                  required
                  data-testid="input-project-completion-date"
                />
              </div>
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
                <Label htmlFor="websiteAddress">Website Address</Label>
                <Input
                  id="websiteAddress"
                  name="websiteAddress"
                  type="url"
                  value={formData.websiteAddress}
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
                <Label htmlFor="email">Email Address *</Label>
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
                <Label htmlFor="phone">Phone Number *</Label>
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
                <Label htmlFor="protectionClass">Protection Class</Label>
                <Input
                  id="protectionClass"
                  name="protectionClass"
                  value={formData.protectionClass}
                  onChange={handleInputChange}
                  data-testid="input-protection-class"
                />
              </div>
              <div>
                <Label htmlFor="distanceFireHydrant">Distance to Fire Hydrant (feet)</Label>
                <Input
                  id="distanceFireHydrant"
                  name="distanceFireHydrant"
                  type="number"
                  value={formData.distanceFireHydrant}
                  onChange={handleInputChange}
                  data-testid="input-fire-hydrant-distance"
                />
              </div>
              <div>
                <Label htmlFor="distanceFireDepartment">Distance to Fire Department (miles)</Label>
                <Input
                  id="distanceFireDepartment"
                  name="distanceFireDepartment"
                  type="number"
                  value={formData.distanceFireDepartment}
                  onChange={handleInputChange}
                  data-testid="input-fire-department-distance"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="projectLocationAddress">Project Location Address *</Label>
              <Textarea
                id="projectLocationAddress"
                name="projectLocationAddress"
                value={formData.projectLocationAddress}
                onChange={handleInputChange}
                required
                rows={2}
                data-testid="textarea-project-location"
              />
            </div>
            <div>
              <Label htmlFor="projectDescription">Project Description *</Label>
              <Textarea
                id="projectDescription"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleInputChange}
                required
                rows={3}
                data-testid="textarea-project-description"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Construction Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="contractor">Contractor *</Label>
                <Input
                  id="contractor"
                  name="contractor"
                  value={formData.contractor}
                  onChange={handleInputChange}
                  required
                  data-testid="input-contractor"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="contractorWebsite">Contractor Website</Label>
                <Input
                  id="contractorWebsite"
                  name="contractorWebsite"
                  type="url"
                  value={formData.contractorWebsite}
                  onChange={handleInputChange}
                  data-testid="input-contractor-website"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="owner">Owner *</Label>
                <Input
                  id="owner"
                  name="owner"
                  value={formData.owner}
                  onChange={handleInputChange}
                  required
                  data-testid="input-owner"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="constructionType">Construction Type *</Label>
                <Select
                  value={formData.constructionType}
                  onValueChange={(value) => handleSelectChange("constructionType", value)}
                >
                  <SelectTrigger data-testid="select-construction-type">
                    <SelectValue placeholder="Select construction type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fire-resistive">Fire Resistive</SelectItem>
                    <SelectItem value="modified-fire-resistive">Modified Fire Resistive</SelectItem>
                    <SelectItem value="masonry-non-combustible">Masonry Non-Combustible</SelectItem>
                    <SelectItem value="non-combustible">Non-Combustible</SelectItem>
                    <SelectItem value="joisted-masonry">Joisted Masonry</SelectItem>
                    <SelectItem value="frame">Frame</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="squareFootage">Square Footage *</Label>
                <Input
                  id="squareFootage"
                  name="squareFootage"
                  type="number"
                  value={formData.squareFootage}
                  onChange={handleInputChange}
                  required
                  data-testid="input-square-footage"
                />
              </div>
              <div>
                <Label htmlFor="numberOfStories">Number of Stories *</Label>
                <Input
                  id="numberOfStories"
                  name="numberOfStories"
                  type="number"
                  value={formData.numberOfStories}
                  onChange={handleInputChange}
                  required
                  data-testid="input-number-stories"
                />
              </div>
              <div>
                <Label htmlFor="intendedOccupancy">Intended Occupancy *</Label>
                <Input
                  id="intendedOccupancy"
                  name="intendedOccupancy"
                  value={formData.intendedOccupancy}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Office Building, Retail, Residential"
                  data-testid="input-intended-occupancy"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Multiple Buildings?</Label>
                <RadioGroup
                  value={formData.multipleBuildings}
                  onValueChange={(value) => handleSelectChange("multipleBuildings", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="multipleBuildings-yes" data-testid="radio-multiple-buildings-yes" />
                    <Label htmlFor="multipleBuildings-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="multipleBuildings-no" data-testid="radio-multiple-buildings-no" />
                    <Label htmlFor="multipleBuildings-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {formData.multipleBuildings === "yes" && (
                <div>
                  <Label htmlFor="plotPlan">Upload Plot Plan</Label>
                  <Input
                    id="plotPlan"
                    type="file"
                    onChange={(e) => handleFileChange("plotPlan", e)}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    multiple
                    data-testid="file-plot-plan"
                  />
                </div>
              )}
              
              <div>
                <Label>Is project on fast track (compressed schedule)?</Label>
                <RadioGroup
                  value={formData.fastTrack}
                  onValueChange={(value) => handleSelectChange("fastTrack", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="fastTrack-yes" data-testid="radio-fast-track-yes" />
                    <Label htmlFor="fastTrack-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="fastTrack-no" data-testid="radio-fast-track-no" />
                    <Label htmlFor="fastTrack-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Limits & Deductibles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Limits</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hardCost">Hard Cost (New Construction) *</Label>
                  <Input
                    id="hardCost"
                    name="hardCost"
                    type="number"
                    value={formData.hardCost}
                    onChange={handleInputChange}
                    required
                    placeholder="$"
                    data-testid="input-hard-cost"
                  />
                </div>
                <div>
                  <Label htmlFor="grossEarnings">Gross Earnings and Rental Income</Label>
                  <Input
                    id="grossEarnings"
                    name="grossEarnings"
                    type="number"
                    value={formData.grossEarnings}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-gross-earnings"
                  />
                </div>
                <div>
                  <Label htmlFor="extraExpense">Extra Expense</Label>
                  <Input
                    id="extraExpense"
                    name="extraExpense"
                    type="number"
                    value={formData.extraExpense}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-extra-expense"
                  />
                </div>
                <div>
                  <Label htmlFor="softCosts">Soft Costs</Label>
                  <Input
                    id="softCosts"
                    name="softCosts"
                    type="number"
                    value={formData.softCosts}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-soft-costs"
                  />
                </div>
                <div>
                  <Label htmlFor="temporaryStorage">Temporary Storage</Label>
                  <Input
                    id="temporaryStorage"
                    name="temporaryStorage"
                    type="number"
                    value={formData.temporaryStorage}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-temporary-storage"
                  />
                </div>
                <div>
                  <Label htmlFor="transit">Transit</Label>
                  <Input
                    id="transit"
                    name="transit"
                    type="number"
                    value={formData.transit}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-transit"
                  />
                </div>
                <div>
                  <Label htmlFor="flood">Flood</Label>
                  <Input
                    id="flood"
                    name="flood"
                    type="number"
                    value={formData.flood}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-flood"
                  />
                </div>
                <div>
                  <Label htmlFor="earthquake">Earthquake</Label>
                  <Input
                    id="earthquake"
                    name="earthquake"
                    type="number"
                    value={formData.earthquake}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-earthquake"
                  />
                </div>
                <div>
                  <Label htmlFor="coldTesting">Cold Testing</Label>
                  <Input
                    id="coldTesting"
                    name="coldTesting"
                    type="number"
                    value={formData.coldTesting}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-cold-testing"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Label>Include Hot Testing?</Label>
                <RadioGroup
                  value={formData.includeHotTesting}
                  onValueChange={(value) => handleSelectChange("includeHotTesting", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="hotTesting-yes" data-testid="radio-hot-testing-yes" />
                    <Label htmlFor="hotTesting-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="hotTesting-no" data-testid="radio-hot-testing-no" />
                    <Label htmlFor="hotTesting-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Deductibles</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hardCostDeductible">Hard Cost Deductible</Label>
                  <Input
                    id="hardCostDeductible"
                    name="hardCostDeductible"
                    type="number"
                    value={formData.hardCostDeductible}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-hard-cost-deductible"
                  />
                </div>
                <div>
                  <Label htmlFor="grossEarningsDeductible">Gross Earnings Deductible</Label>
                  <Input
                    id="grossEarningsDeductible"
                    name="grossEarningsDeductible"
                    type="number"
                    value={formData.grossEarningsDeductible}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-gross-earnings-deductible"
                  />
                </div>
                <div>
                  <Label htmlFor="waitingPeriod">Waiting Period (days)</Label>
                  <Input
                    id="waitingPeriod"
                    name="waitingPeriod"
                    type="number"
                    value={formData.waitingPeriod}
                    onChange={handleInputChange}
                    placeholder="Days"
                    data-testid="input-waiting-period"
                  />
                </div>
                <div>
                  <Label htmlFor="softCostsWaitingPeriod">Soft Costs Waiting Period (days)</Label>
                  <Input
                    id="softCostsWaitingPeriod"
                    name="softCostsWaitingPeriod"
                    type="number"
                    value={formData.softCostsWaitingPeriod}
                    onChange={handleInputChange}
                    placeholder="Days"
                    data-testid="input-soft-costs-waiting"
                  />
                </div>
                <div>
                  <Label htmlFor="floodDeductible">Flood Deductible</Label>
                  <Input
                    id="floodDeductible"
                    name="floodDeductible"
                    type="number"
                    value={formData.floodDeductible}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-flood-deductible"
                  />
                </div>
                <div>
                  <Label htmlFor="earthquakeDeductible">Earthquake Deductible</Label>
                  <Input
                    id="earthquakeDeductible"
                    name="earthquakeDeductible"
                    type="number"
                    value={formData.earthquakeDeductible}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-earthquake-deductible"
                  />
                </div>
                <div>
                  <Label htmlFor="coldTestingDeductible">Cold Testing Deductible</Label>
                  <Input
                    id="coldTestingDeductible"
                    name="coldTestingDeductible"
                    type="number"
                    value={formData.coldTestingDeductible}
                    onChange={handleInputChange}
                    placeholder="$"
                    data-testid="input-cold-testing-deductible"
                  />
                </div>
                {formData.includeHotTesting === "yes" && (
                  <div>
                    <Label htmlFor="hotTestingDeductible">Hot Testing Deductible</Label>
                    <Input
                      id="hotTestingDeductible"
                      name="hotTestingDeductible"
                      type="number"
                      value={formData.hotTestingDeductible}
                      onChange={handleInputChange}
                      placeholder="$"
                      data-testid="input-hot-testing-deductible"
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Site Protection & Safety</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label>Is water damage prevention plan in place?</Label>
                <RadioGroup
                  value={formData.waterDamagePrevention}
                  onValueChange={(value) => handleSelectChange("waterDamagePrevention", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="waterDamage-yes" data-testid="radio-water-damage-yes" />
                    <Label htmlFor="waterDamage-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="waterDamage-no" data-testid="radio-water-damage-no" />
                    <Label htmlFor="waterDamage-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {formData.waterDamagePrevention === "yes" && (
                <>
                  <div>
                    <Label htmlFor="waterPreventionPlanDoc">Upload Water Prevention Plan</Label>
                    <Input
                      id="waterPreventionPlanDoc"
                      type="file"
                      onChange={(e) => handleFileChange("waterPreventionPlanDoc", e)}
                      accept=".pdf,.doc,.docx"
                      multiple
                      data-testid="file-water-prevention"
                    />
                  </div>
                  <div>
                    <Label>Does your water prevention plan include sensor and/or shut off valves?</Label>
                    <RadioGroup
                      value={formData.sensorShutoffValves}
                      onValueChange={(value) => handleSelectChange("sensorShutoffValves", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="sensor-yes" data-testid="radio-sensor-yes" />
                        <Label htmlFor="sensor-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="sensor-no" data-testid="radio-sensor-no" />
                        <Label htmlFor="sensor-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </>
              )}
              
              <div>
                <Label className="mb-3 block">Building Safeguards & Job Site Protection</Label>
                <div className="space-y-3">
                  <div>
                    <Label>Central Station Burglar Alarm?</Label>
                    <RadioGroup
                      value={formData.centralBurglarAlarm}
                      onValueChange={(value) => handleSelectChange("centralBurglarAlarm", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="burglar-yes" data-testid="radio-burglar-yes" />
                        <Label htmlFor="burglar-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="burglar-no" data-testid="radio-burglar-no" />
                        <Label htmlFor="burglar-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label>Central Station Fire Alarm or Smoke Detection?</Label>
                    <RadioGroup
                      value={formData.centralFireAlarm}
                      onValueChange={(value) => handleSelectChange("centralFireAlarm", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="fire-yes" data-testid="radio-fire-alarm-yes" />
                        <Label htmlFor="fire-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="fire-no" data-testid="radio-fire-alarm-no" />
                        <Label htmlFor="fire-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label>Watchperson?</Label>
                    <RadioGroup
                      value={formData.watchperson}
                      onValueChange={(value) => handleSelectChange("watchperson", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="watchperson-yes" data-testid="radio-watchperson-yes" />
                        <Label htmlFor="watchperson-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="watchperson-no" data-testid="radio-watchperson-no" />
                        <Label htmlFor="watchperson-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {formData.watchperson === "yes" && (
                    <div>
                      <Label>Does watchperson make hourly, documented rounds during non-working hours?</Label>
                      <RadioGroup
                        value={formData.hourlyRounds}
                        onValueChange={(value) => handleSelectChange("hourlyRounds", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="rounds-yes" data-testid="radio-rounds-yes" />
                          <Label htmlFor="rounds-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="rounds-no" data-testid="radio-rounds-no" />
                          <Label htmlFor="rounds-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                  
                  <div>
                    <Label>Fenced?</Label>
                    <RadioGroup
                      value={formData.fenced}
                      onValueChange={(value) => handleSelectChange("fenced", value)}
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
                    <Label>Lighted?</Label>
                    <RadioGroup
                      value={formData.lighted}
                      onValueChange={(value) => handleSelectChange("lighted", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="lighted-yes" data-testid="radio-lighted-yes" />
                        <Label htmlFor="lighted-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="lighted-no" data-testid="radio-lighted-no" />
                        <Label htmlFor="lighted-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label>Video surveillance monitored in real time by third party?</Label>
                    <RadioGroup
                      value={formData.videoSurveillance}
                      onValueChange={(value) => handleSelectChange("videoSurveillance", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="video-yes" data-testid="radio-video-yes" />
                        <Label htmlFor="video-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="video-no" data-testid="radio-video-no" />
                        <Label htmlFor="video-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label>Is hot work part of this project?</Label>
                    <RadioGroup
                      value={formData.hotWork}
                      onValueChange={(value) => handleSelectChange("hotWork", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="hotWork-yes" data-testid="radio-hot-work-yes" />
                        <Label htmlFor="hotWork-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="hotWork-no" data-testid="radio-hot-work-no" />
                        <Label htmlFor="hotWork-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {formData.hotWork === "yes" && (
                    <div>
                      <Label htmlFor="firePreventionPlan">Upload Fire Prevention Plan</Label>
                      <Input
                        id="firePreventionPlan"
                        type="file"
                        onChange={(e) => handleFileChange("firePreventionPlan", e)}
                        accept=".pdf,.doc,.docx"
                        multiple
                        data-testid="file-fire-prevention"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 5 && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="softCostsBreakdown">Breakdown of Soft Costs</Label>
              <Textarea
                id="softCostsBreakdown"
                name="softCostsBreakdown"
                value={formData.softCostsBreakdown}
                onChange={handleInputChange}
                rows={3}
                placeholder="Please provide detailed breakdown of soft costs"
                data-testid="textarea-soft-costs-breakdown"
              />
            </div>
            
            <div>
              <Label>Are high valued finishes or unique/foreign source materials being used?</Label>
              <RadioGroup
                value={formData.highValuedFinishes}
                onValueChange={(value) => handleSelectChange("highValuedFinishes", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="finishes-yes" data-testid="radio-finishes-yes" />
                  <Label htmlFor="finishes-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="finishes-no" data-testid="radio-finishes-no" />
                  <Label htmlFor="finishes-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.highValuedFinishes === "yes" && (
              <div>
                <Label htmlFor="contingencyPlan">Contingency Plan to Obtain Materials</Label>
                <Textarea
                  id="contingencyPlan"
                  name="contingencyPlan"
                  value={formData.contingencyPlan}
                  onChange={handleInputChange}
                  rows={3}
                  data-testid="textarea-contingency-plan"
                />
              </div>
            )}
            
            <div>
              <Label>Will any materials be stored below grade?</Label>
              <RadioGroup
                value={formData.materialsBelowGrade}
                onValueChange={(value) => handleSelectChange("materialsBelowGrade", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="belowGrade-yes" data-testid="radio-below-grade-yes" />
                  <Label htmlFor="belowGrade-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="belowGrade-no" data-testid="radio-below-grade-no" />
                  <Label htmlFor="belowGrade-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.materialsBelowGrade === "yes" && (
              <div>
                <Label>Have measures been taken to store materials off the ground?</Label>
                <RadioGroup
                  value={formData.offGroundStorage}
                  onValueChange={(value) => handleSelectChange("offGroundStorage", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="offGround-yes" data-testid="radio-off-ground-yes" />
                    <Label htmlFor="offGround-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="offGround-no" data-testid="radio-off-ground-no" />
                    <Label htmlFor="offGround-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            
            <div>
              <Label>Is coverage being requested midterm for project already started?</Label>
              <RadioGroup
                value={formData.midtermCoverage}
                onValueChange={(value) => handleSelectChange("midtermCoverage", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="midterm-yes" data-testid="radio-midterm-yes" />
                  <Label htmlFor="midterm-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="midterm-no" data-testid="radio-midterm-no" />
                  <Label htmlFor="midterm-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.midtermCoverage === "yes" && (
              <div>
                <Label htmlFor="projectPercentComplete">Percentage of Project Complete (%)</Label>
                <Input
                  id="projectPercentComplete"
                  name="projectPercentComplete"
                  type="number"
                  value={formData.projectPercentComplete}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  data-testid="input-percent-complete"
                />
              </div>
            )}
            
            <div>
              <Label>Have there been any losses?</Label>
              <RadioGroup
                value={formData.priorLosses}
                onValueChange={(value) => handleSelectChange("priorLosses", value)}
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
            </div>
            
            {formData.priorLosses === "yes" && (
              <div>
                <Label htmlFor="lossHistory">Loss History Details</Label>
                <Textarea
                  id="lossHistory"
                  name="lossHistory"
                  value={formData.lossHistory}
                  onChange={handleInputChange}
                  rows={3}
                  data-testid="textarea-loss-history"
                />
              </div>
            )}
            
            <div>
              <Label>Will any materials be stored in the open?</Label>
              <RadioGroup
                value={formData.materialsInOpen}
                onValueChange={(value) => handleSelectChange("materialsInOpen", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="open-yes" data-testid="radio-open-storage-yes" />
                  <Label htmlFor="open-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="open-no" data-testid="radio-open-storage-no" />
                  <Label htmlFor="open-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.materialsInOpen === "yes" && (
              <div>
                <Label htmlFor="openStorageLocation">Open Storage Location</Label>
                <Input
                  id="openStorageLocation"
                  name="openStorageLocation"
                  value={formData.openStorageLocation}
                  onChange={handleInputChange}
                  data-testid="input-open-storage"
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="protectionMeasures">
                Measures to Protect Building Materials (copper, precious metals, etc.)
              </Label>
              <Textarea
                id="protectionMeasures"
                name="protectionMeasures"
                value={formData.protectionMeasures}
                onChange={handleInputChange}
                rows={3}
                data-testid="textarea-protection-measures"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {step === 6 && (
        <Card>
          <CardHeader>
            <CardTitle>Documents & Final Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Mortgagee/Loss Payee</Label>
              <RadioGroup
                value={formData.mortgageeType}
                onValueChange={(value) => handleSelectChange("mortgageeType", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mortgagee" id="mortgagee" data-testid="radio-mortgagee" />
                  <Label htmlFor="mortgagee">Mortgagee</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lossPayee" id="lossPayee" data-testid="radio-loss-payee" />
                  <Label htmlFor="lossPayee">Loss Payee</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" data-testid="radio-none" />
                  <Label htmlFor="none">None</Label>
                </div>
              </RadioGroup>
            </div>
            
            {(formData.mortgageeType === "mortgagee" || formData.mortgageeType === "lossPayee") && (
              <>
                <div>
                  <Label htmlFor="mortgageeName">Name</Label>
                  <Input
                    id="mortgageeName"
                    name="mortgageeName"
                    value={formData.mortgageeName}
                    onChange={handleInputChange}
                    data-testid="input-mortgagee-name"
                  />
                </div>
                <div>
                  <Label htmlFor="mortgageeAddress">Address</Label>
                  <Textarea
                    id="mortgageeAddress"
                    name="mortgageeAddress"
                    value={formData.mortgageeAddress}
                    onChange={handleInputChange}
                    rows={2}
                    data-testid="textarea-mortgagee-address"
                  />
                </div>
              </>
            )}
            
            <div>
              <h3 className="font-semibold mb-4">Required Documents (for projects over $50MM)</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="budget">Budget</Label>
                  <Input
                    id="budget"
                    type="file"
                    onChange={(e) => handleFileChange("budget", e)}
                    accept=".pdf,.xls,.xlsx,.doc,.docx"
                    multiple
                    data-testid="file-budget"
                  />
                </div>
                <div>
                  <Label htmlFor="timeline">Timeline</Label>
                  <Input
                    id="timeline"
                    type="file"
                    onChange={(e) => handleFileChange("timeline", e)}
                    accept=".pdf,.xls,.xlsx,.doc,.docx"
                    multiple
                    data-testid="file-timeline"
                  />
                </div>
                <div>
                  <Label htmlFor="artistRendering">Artist Rendering</Label>
                  <Input
                    id="artistRendering"
                    type="file"
                    onChange={(e) => handleFileChange("artistRendering", e)}
                    accept=".pdf,.jpg,.png,.jpeg"
                    multiple
                    data-testid="file-artist-rendering"
                  />
                </div>
                <div>
                  <Label htmlFor="geotechnicalReport">Geotechnical Report</Label>
                  <Input
                    id="geotechnicalReport"
                    type="file"
                    onChange={(e) => handleFileChange("geotechnicalReport", e)}
                    accept=".pdf,.doc,.docx"
                    multiple
                    data-testid="file-geotechnical"
                  />
                </div>
                {formData.priorLosses === "yes" && (
                  <div>
                    <Label htmlFor="lossHistoryDoc">Loss History Documents</Label>
                    <Input
                      id="lossHistoryDoc"
                      type="file"
                      onChange={(e) => handleFileChange("lossHistory", e)}
                      accept=".pdf,.doc,.docx"
                      multiple
                      data-testid="file-loss-history"
                    />
                  </div>
                )}
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
                data-testid="textarea-additional-comments"
              />
            </div>
            
            <div>
              <Label htmlFor="additionalDocuments">Additional Documents</Label>
              <Input
                id="additionalDocuments"
                type="file"
                onChange={(e) => handleFileChange("additionalDocuments", e)}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
                multiple
                data-testid="file-additional-documents"
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