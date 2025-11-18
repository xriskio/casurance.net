import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, CheckCircle, FileText, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export default function TncRideshareApplicationForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const [lossRunsFile, setLossRunsFile] = useState<File | null>(null);
  const [financialStatementsFile, setFinancialStatementsFile] = useState<File | null>(null);
  const [termsOfServiceFile, setTermsOfServiceFile] = useState<File | null>(null);
  const [vehicleScheduleFile, setVehicleScheduleFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    // Step 1: Company Information
    companyName: "",
    dba: "",
    primaryStreetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    mailingAddress: "",
    mailingCity: "",
    mailingState: "",
    mailingZipCode: "",
    dateEstablished: "",
    website: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    fein: "",
    legalEntityType: "",
    descriptionOfOperations: "",
    
    // Terms of Service
    termsConsistentAcrossInterfaces: false,
    termsAcceptanceMethod: "",
    otherAcceptanceMethod: "",
    usesOtherLegalAgreements: false,
    otherLegalAgreementsDescription: "",
    
    // Revenue
    mostRecentYearRevenue: "",
    mostRecentYearIndependentContractorAllocation: "",
    currentYearRevenue: "",
    currentYearIndependentContractorAllocation: "",
    forecastedGrowth: "",
    operatingBudget: "",
    
    // Step 2: Insurance Details
    hasCurrentInsurance: false,
    currentInsuranceDetails: "",
    extendToIndependentContractors: false,
    
    // General Liability
    requestingGLCoverage: false,
    glCurrentCarrier: "",
    glCurrentExpiration: "",
    glCurrentPremium: "",
    glRequestedLimit: "",
    glSpecialRequests: "",
    
    // Commercial Auto
    requestingAutoCoverage: false,
    autoUsedForVehicleRegistration: false,
    autoCurrentCarrier: "",
    autoCurrentExpiration: "",
    autoIncludesAPD: false,
    autoCurrentPremium: "",
    autoRequestedLimit: "",
    autoSpecialRequests: "",
    
    // Step 3: Controls & Procedures
    performsBackgroundChecks: false,
    backgroundCheckVendor: "",
    backgroundVendorHeldHarmless: false,
    backgroundCheckType: "",
    
    // Criminal Conviction Criteria
    allowsViolentCrime: false,
    allowsAnyFelony: false,
    allowsSexualChildAbuse: false,
    allowsTerrorRelated: false,
    
    // MVR Checks
    performsMVRChecks: false,
    mvrCheckVendor: "",
    mvrVendorHeldHarmless: false,
    
    // MVR Criteria
    allowsMinorViolations: false,
    allowsMajorViolation: false,
    allowsDrivingConvictions: false,
    
    // Identity Verification
    verifiesIdentity: false,
    identityVerificationVendor: "",
    identityVendorHeldHarmless: false,
    
    // Vehicle Requirements
    requiresFourDoors: false,
    requiresPassengerCapacity: false,
    requiresVehicleAge: false,
    requiresInStatePlates: false,
    requiresValidRegistration: false,
    noMarkedTaxisSalvaged: false,
    
    // Delivery Items
    deliversAlcohol: false,
    deliversDrugs: false,
    deliversMedication: false,
    deliversRegulatedItems: false,
    regulatedItemsDescription: "",
    
    otherSafetyMeasures: "",
    
    // Step 4: Platform Activity & Operations
    usesTelematics: false,
    telematicsVendor: "",
    
    // Metrics
    metricType: "",
    mostRecentYearVolume: "",
    currentYearVolume: "",
    nextYearVolume: "",
    
    canReportMonthlyActivity: false,
    
    // Geography & Operations
    geographyOfOperations: "",
    totalAnnualMiles: "",
    statesOfOperation: "",
    
    // City Operations (up to 4)
    city1: "",
    city1Percentage: "",
    city2: "",
    city2Percentage: "",
    city3: "",
    city3Percentage: "",
    city4: "",
    city4Percentage: "",
    
    // Qualification Questions
    hasVehiclesAbove15000lbs: false,
    hasTrailersHeavyTrucks: false,
    hasVehiclesAbove8Passengers: false,
    
    // Transport Operations
    allowsGoodsTransport: false,
    goodsTransportDescription: "",
    
    // Vehicle Ownership
    ownsOrLeasesAutos: false,
    requestingOwnedLeasedCoverage: false,
    driversUseRentalVehicles: false,
    employeesUsePersonalVehicles: false,
    personalVehicleDescription: "",
    requiresDriverInsurance: false,
    insuranceVerificationFrequency: "",
    
    // Step 5: Drivers & Safety
    totalDrivers: "",
    driversAreIndependentContractors: false,
    hasDriverIncentiveProgram: false,
    incentiveProgramDescription: "",
    
    // Driver Hiring Requirements
    requiresMVRReports: false,
    requiresCriminalBackgroundCheck: false,
    requiresDrugCheck: false,
    minimumAge: "",
    requiresWrittenApplication: false,
    minimumYearsLicensed: "",
    otherHiringRequirements: "",
    
    // MVR Review
    mvrReviewFrequency: "",
    mvrAcceptabilityCriteria: "",
    
    // Risk Management
    riskManagementContact: "",
    riskManagementPhone: "",
    riskManagementEmail: "",
    hasClaimsNotLoggedInApp: false,
    claimsNotLoggedDetails: "",
    
    // Safety Meetings
    holdsSafetyMeetings: false,
    safetyMeetingFrequency: "",
    safetyMeetingMandatory: false,
    
    // Step 6: Additional Information
    additionalComments: "",
    
    // Premium History
    currentYearCarrier: "",
    currentYearAutoLiabilityPremium: "",
    currentYearPhysicalDamagePremium: "",
    firstPriorYearCarrier: "",
    firstPriorYearAutoLiabilityPremium: "",
    firstPriorYearPhysicalDamagePremium: "",
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const payload = {
        ...data,
        files: {
          hasLossRuns: !!lossRunsFile,
          hasFinancialStatements: !!financialStatementsFile,
          hasTermsOfService: !!termsOfServiceFile,
          hasVehicleSchedule: !!vehicleScheduleFile,
        },
      };

      const formDataToSend = new FormData();
      formDataToSend.append("applicationData", JSON.stringify(payload));

      if (lossRunsFile) formDataToSend.append("lossRuns", lossRunsFile);
      if (financialStatementsFile) formDataToSend.append("financialStatements", financialStatementsFile);
      if (termsOfServiceFile) formDataToSend.append("termsOfService", termsOfServiceFile);
      if (vehicleScheduleFile) formDataToSend.append("vehicleSchedule", vehicleScheduleFile);

      const response = await fetch("/api/tnc-applications", {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit application");
      }

      return response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Application Submitted",
        description: "Your TNC/Rideshare insurance application has been submitted successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message,
      });
    },
  });

  const handleSubmit = () => {
    mutation.mutate(formData);
  };

  const totalSteps = 6;

  if (submitted) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">Application Submitted Successfully!</h3>
          <p className="text-muted-foreground mb-6">
            Thank you for submitting your TNC/Rideshare insurance application. One of our licensed agents will review your information and contact you within 24-48 hours.
          </p>
          <Button onClick={() => window.location.href = "/"} data-testid="button-return-home">
            Return to Home
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>TNC/Rideshare Insurance Application - Step {step} of {totalSteps}</CardTitle>
        <Progress value={(step / totalSteps) * 100} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Step 1: Company Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="companyName">Company Name (Applicant) *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    required
                    data-testid="input-company-name"
                  />
                </div>

                <div>
                  <Label htmlFor="dba">DBA (if different)</Label>
                  <Input
                    id="dba"
                    value={formData.dba}
                    onChange={(e) => setFormData({ ...formData, dba: e.target.value })}
                    data-testid="input-dba"
                  />
                </div>

                <div>
                  <Label htmlFor="dateEstablished">Date Business Established *</Label>
                  <Input
                    id="dateEstablished"
                    type="date"
                    value={formData.dateEstablished}
                    onChange={(e) => setFormData({ ...formData, dateEstablished: e.target.value })}
                    required
                    data-testid="input-date-established"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="primaryStreetAddress">Primary Street Address *</Label>
                  <Input
                    id="primaryStreetAddress"
                    value={formData.primaryStreetAddress}
                    onChange={(e) => setFormData({ ...formData, primaryStreetAddress: e.target.value })}
                    required
                    data-testid="input-street-address"
                  />
                </div>

                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                    data-testid="input-city"
                  />
                </div>

                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    required
                    data-testid="input-state"
                  />
                </div>

                <div>
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    required
                    data-testid="input-zip"
                  />
                </div>

                <div>
                  <Label htmlFor="fein">Federal EIN *</Label>
                  <Input
                    id="fein"
                    value={formData.fein}
                    onChange={(e) => setFormData({ ...formData, fein: e.target.value })}
                    required
                    data-testid="input-fein"
                  />
                </div>

                <div>
                  <Label htmlFor="legalEntityType">Legal Entity Type *</Label>
                  <Select
                    value={formData.legalEntityType}
                    onValueChange={(value) => setFormData({ ...formData, legalEntityType: value })}
                  >
                    <SelectTrigger data-testid="select-entity-type">
                      <SelectValue placeholder="Select entity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="corporation">Corporation</SelectItem>
                      <SelectItem value="llc">LLC</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://"
                    data-testid="input-website"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="descriptionOfOperations">Description of Operations *</Label>
                  <Textarea
                    id="descriptionOfOperations"
                    value={formData.descriptionOfOperations}
                    onChange={(e) => setFormData({ ...formData, descriptionOfOperations: e.target.value })}
                    placeholder="Describe your platform operations..."
                    rows={3}
                    required
                    data-testid="textarea-operations"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="geographyOfOperations">Geography of Operations *</Label>
                  <Input
                    id="geographyOfOperations"
                    value={formData.geographyOfOperations}
                    onChange={(e) => setFormData({ ...formData, geographyOfOperations: e.target.value })}
                    placeholder="e.g., California, Multi-state, National"
                    required
                    data-testid="input-geography"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactName">Contact Name *</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    required
                    data-testid="input-contact-name"
                  />
                </div>

                <div>
                  <Label htmlFor="contactPhone">Contact Phone *</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    required
                    data-testid="input-contact-phone"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    required
                    data-testid="input-contact-email"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Terms of Service</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="termsConsistentAcrossInterfaces"
                    checked={formData.termsConsistentAcrossInterfaces}
                    onCheckedChange={(checked) => setFormData({ ...formData, termsConsistentAcrossInterfaces: checked as boolean })}
                    data-testid="checkbox-terms-consistent"
                  />
                  <Label htmlFor="termsConsistentAcrossInterfaces" className="cursor-pointer">
                    Are your Terms of Service consistent across all interfaces (website, mobile app, etc.)?
                  </Label>
                </div>

                <div>
                  <Label htmlFor="termsAcceptanceMethod">How do users accept the Terms of Service? *</Label>
                  <Select
                    value={formData.termsAcceptanceMethod}
                    onValueChange={(value) => setFormData({ ...formData, termsAcceptanceMethod: value })}
                  >
                    <SelectTrigger data-testid="select-terms-acceptance">
                      <SelectValue placeholder="Select acceptance method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clickwrap">Clickwrap (explicit "I accept" button)</SelectItem>
                      <SelectItem value="browsewrap">Browsewrap (implicit by use)</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.termsAcceptanceMethod === "other" && (
                  <div>
                    <Label htmlFor="otherAcceptanceMethod">Please describe</Label>
                    <Input
                      id="otherAcceptanceMethod"
                      value={formData.otherAcceptanceMethod}
                      onChange={(e) => setFormData({ ...formData, otherAcceptanceMethod: e.target.value })}
                      data-testid="input-other-acceptance"
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="usesOtherLegalAgreements"
                    checked={formData.usesOtherLegalAgreements}
                    onCheckedChange={(checked) => setFormData({ ...formData, usesOtherLegalAgreements: checked as boolean })}
                    data-testid="checkbox-other-agreements"
                  />
                  <Label htmlFor="usesOtherLegalAgreements" className="cursor-pointer">
                    Are any other legal agreements used in your day-to-day business?
                  </Label>
                </div>

                {formData.usesOtherLegalAgreements && (
                  <div>
                    <Label htmlFor="otherLegalAgreementsDescription">Please describe</Label>
                    <Textarea
                      id="otherLegalAgreementsDescription"
                      value={formData.otherLegalAgreementsDescription}
                      onChange={(e) => setFormData({ ...formData, otherLegalAgreementsDescription: e.target.value })}
                      rows={2}
                      data-testid="textarea-other-agreements"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Revenue Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mostRecentYearRevenue">Most Recent Full Year Revenue (Gross) *</Label>
                  <Input
                    id="mostRecentYearRevenue"
                    value={formData.mostRecentYearRevenue}
                    onChange={(e) => setFormData({ ...formData, mostRecentYearRevenue: e.target.value })}
                    placeholder="$0"
                    required
                    data-testid="input-recent-revenue"
                  />
                </div>

                <div>
                  <Label htmlFor="mostRecentYearIndependentContractorAllocation">Independent Contractor Allocation %</Label>
                  <Input
                    id="mostRecentYearIndependentContractorAllocation"
                    value={formData.mostRecentYearIndependentContractorAllocation}
                    onChange={(e) => setFormData({ ...formData, mostRecentYearIndependentContractorAllocation: e.target.value })}
                    placeholder="0"
                    data-testid="input-recent-ic-allocation"
                  />
                </div>

                <div>
                  <Label htmlFor="currentYearRevenue">Current Year Revenue (Projected) *</Label>
                  <Input
                    id="currentYearRevenue"
                    value={formData.currentYearRevenue}
                    onChange={(e) => setFormData({ ...formData, currentYearRevenue: e.target.value })}
                    placeholder="$0"
                    required
                    data-testid="input-current-revenue"
                  />
                </div>

                <div>
                  <Label htmlFor="currentYearIndependentContractorAllocation">Independent Contractor Allocation %</Label>
                  <Input
                    id="currentYearIndependentContractorAllocation"
                    value={formData.currentYearIndependentContractorAllocation}
                    onChange={(e) => setFormData({ ...formData, currentYearIndependentContractorAllocation: e.target.value })}
                    placeholder="0"
                    data-testid="input-current-ic-allocation"
                  />
                </div>

                <div>
                  <Label htmlFor="operatingBudget">Operating Budget *</Label>
                  <Input
                    id="operatingBudget"
                    value={formData.operatingBudget}
                    onChange={(e) => setFormData({ ...formData, operatingBudget: e.target.value })}
                    placeholder="$0"
                    required
                    data-testid="input-operating-budget"
                  />
                </div>

                <div>
                  <Label htmlFor="forecastedGrowth">Forecasted Growth (Next 12 Months) *</Label>
                  <Select
                    value={formData.forecastedGrowth}
                    onValueChange={(value) => setFormData({ ...formData, forecastedGrowth: value })}
                  >
                    <SelectTrigger data-testid="select-forecasted-growth">
                      <SelectValue placeholder="Select growth forecast" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<25%">Less than 25%</SelectItem>
                      <SelectItem value="25-50%">25% - 50%</SelectItem>
                      <SelectItem value="50-100%">50% - 100%</SelectItem>
                      <SelectItem value=">100%">Greater than 100%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Insurance & Coverage Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Current Insurance Coverage</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasCurrentInsurance"
                    checked={formData.hasCurrentInsurance}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasCurrentInsurance: checked as boolean })}
                    data-testid="checkbox-has-insurance"
                  />
                  <Label htmlFor="hasCurrentInsurance" className="cursor-pointer">
                    Do you have current insurance coverage that extends to your platform activities?
                  </Label>
                </div>

                {formData.hasCurrentInsurance && (
                  <div>
                    <Label htmlFor="currentInsuranceDetails">Provide details (type, limits, deductible, restrictions)</Label>
                    <Textarea
                      id="currentInsuranceDetails"
                      value={formData.currentInsuranceDetails}
                      onChange={(e) => setFormData({ ...formData, currentInsuranceDetails: e.target.value })}
                      rows={3}
                      data-testid="textarea-current-insurance"
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="extendToIndependentContractors"
                    checked={formData.extendToIndependentContractors}
                    onCheckedChange={(checked) => setFormData({ ...formData, extendToIndependentContractors: checked as boolean })}
                    data-testid="checkbox-extend-coverage"
                  />
                  <Label htmlFor="extendToIndependentContractors" className="cursor-pointer">
                    Would you like either the GL or Auto coverage to extend to your independent contractors?
                  </Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">General Liability Coverage</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="requestingGLCoverage"
                    checked={formData.requestingGLCoverage}
                    onCheckedChange={(checked) => setFormData({ ...formData, requestingGLCoverage: checked as boolean })}
                    data-testid="checkbox-requesting-gl"
                  />
                  <Label htmlFor="requestingGLCoverage" className="cursor-pointer font-medium">
                    Requesting General Liability Coverage
                  </Label>
                </div>

                {formData.requestingGLCoverage && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium mb-2">If coverage is currently in place:</p>
                    </div>

                    <div>
                      <Label htmlFor="glCurrentCarrier">Current Carrier</Label>
                      <Input
                        id="glCurrentCarrier"
                        value={formData.glCurrentCarrier}
                        onChange={(e) => setFormData({ ...formData, glCurrentCarrier: e.target.value })}
                        data-testid="input-gl-carrier"
                      />
                    </div>

                    <div>
                      <Label htmlFor="glCurrentExpiration">Current Expiration Date</Label>
                      <Input
                        id="glCurrentExpiration"
                        type="date"
                        value={formData.glCurrentExpiration}
                        onChange={(e) => setFormData({ ...formData, glCurrentExpiration: e.target.value })}
                        data-testid="input-gl-expiration"
                      />
                    </div>

                    <div>
                      <Label htmlFor="glCurrentPremium">Current Premium / Rate</Label>
                      <Input
                        id="glCurrentPremium"
                        value={formData.glCurrentPremium}
                        onChange={(e) => setFormData({ ...formData, glCurrentPremium: e.target.value })}
                        placeholder="$0"
                        data-testid="input-gl-premium"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <p className="text-sm font-medium mb-2 mt-4">If coverage is not currently in place:</p>
                    </div>

                    <div>
                      <Label htmlFor="glRequestedLimit">Requested Limit</Label>
                      <Input
                        id="glRequestedLimit"
                        value={formData.glRequestedLimit}
                        onChange={(e) => setFormData({ ...formData, glRequestedLimit: e.target.value })}
                        placeholder="$1,000,000"
                        data-testid="input-gl-requested-limit"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="glSpecialRequests">Special Coverage Requests</Label>
                      <Textarea
                        id="glSpecialRequests"
                        value={formData.glSpecialRequests}
                        onChange={(e) => setFormData({ ...formData, glSpecialRequests: e.target.value })}
                        rows={2}
                        data-testid="textarea-gl-special"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Commercial Auto Coverage</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="requestingAutoCoverage"
                    checked={formData.requestingAutoCoverage}
                    onCheckedChange={(checked) => setFormData({ ...formData, requestingAutoCoverage: checked as boolean })}
                    data-testid="checkbox-requesting-auto"
                  />
                  <Label htmlFor="requestingAutoCoverage" className="cursor-pointer font-medium">
                    Requesting Commercial Auto Coverage
                  </Label>
                </div>

                {formData.requestingAutoCoverage && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                    <div className="md:col-span-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="autoUsedForVehicleRegistration"
                          checked={formData.autoUsedForVehicleRegistration}
                          onCheckedChange={(checked) => setFormData({ ...formData, autoUsedForVehicleRegistration: checked as boolean })}
                          data-testid="checkbox-auto-registration"
                        />
                        <Label htmlFor="autoUsedForVehicleRegistration" className="cursor-pointer">
                          Would this coverage be used as proof of insurance when registering a vehicle?
                        </Label>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <p className="text-sm font-medium mb-2">If coverage is currently in place:</p>
                    </div>

                    <div>
                      <Label htmlFor="autoCurrentCarrier">Current Carrier</Label>
                      <Input
                        id="autoCurrentCarrier"
                        value={formData.autoCurrentCarrier}
                        onChange={(e) => setFormData({ ...formData, autoCurrentCarrier: e.target.value })}
                        data-testid="input-auto-carrier"
                      />
                    </div>

                    <div>
                      <Label htmlFor="autoCurrentExpiration">Current Expiration Date</Label>
                      <Input
                        id="autoCurrentExpiration"
                        type="date"
                        value={formData.autoCurrentExpiration}
                        onChange={(e) => setFormData({ ...formData, autoCurrentExpiration: e.target.value })}
                        data-testid="input-auto-expiration"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="autoIncludesAPD"
                        checked={formData.autoIncludesAPD}
                        onCheckedChange={(checked) => setFormData({ ...formData, autoIncludesAPD: checked as boolean })}
                        data-testid="checkbox-includes-apd"
                      />
                      <Label htmlFor="autoIncludesAPD" className="cursor-pointer">
                        Includes APD Coverage?
                      </Label>
                    </div>

                    <div>
                      <Label htmlFor="autoCurrentPremium">Current Premium / Rate</Label>
                      <Input
                        id="autoCurrentPremium"
                        value={formData.autoCurrentPremium}
                        onChange={(e) => setFormData({ ...formData, autoCurrentPremium: e.target.value })}
                        placeholder="$0"
                        data-testid="input-auto-premium"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <p className="text-sm font-medium mb-2 mt-4">If coverage is not currently in place:</p>
                    </div>

                    <div>
                      <Label htmlFor="autoRequestedLimit">Requested Limit</Label>
                      <Input
                        id="autoRequestedLimit"
                        value={formData.autoRequestedLimit}
                        onChange={(e) => setFormData({ ...formData, autoRequestedLimit: e.target.value })}
                        placeholder="$1,000,000"
                        data-testid="input-auto-requested-limit"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="autoSpecialRequests">Special Coverage Requests</Label>
                      <Textarea
                        id="autoSpecialRequests"
                        value={formData.autoSpecialRequests}
                        onChange={(e) => setFormData({ ...formData, autoSpecialRequests: e.target.value })}
                        rows={2}
                        data-testid="textarea-auto-special"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Controls & Procedures */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Background Checks</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="performsBackgroundChecks"
                    checked={formData.performsBackgroundChecks}
                    onCheckedChange={(checked) => setFormData({ ...formData, performsBackgroundChecks: checked as boolean })}
                    data-testid="checkbox-background-checks"
                  />
                  <Label htmlFor="performsBackgroundChecks" className="cursor-pointer">
                    Are background checks performed on platform users?
                  </Label>
                </div>

                {formData.performsBackgroundChecks && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                    <div>
                      <Label htmlFor="backgroundCheckVendor">If you use a vendor, which one?</Label>
                      <Input
                        id="backgroundCheckVendor"
                        value={formData.backgroundCheckVendor}
                        onChange={(e) => setFormData({ ...formData, backgroundCheckVendor: e.target.value })}
                        data-testid="input-background-vendor"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="backgroundVendorHeldHarmless"
                        checked={formData.backgroundVendorHeldHarmless}
                        onCheckedChange={(checked) => setFormData({ ...formData, backgroundVendorHeldHarmless: checked as boolean })}
                        data-testid="checkbox-background-harmless"
                      />
                      <Label htmlFor="backgroundVendorHeldHarmless" className="cursor-pointer">
                        Are you held harmless in the event of vendor error?
                      </Label>
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="backgroundCheckType">Type / extent of background check</Label>
                      <div className="space-y-2 mt-2">
                        <Label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.backgroundCheckType.includes("local")}
                            onChange={(e) => {
                              const types = formData.backgroundCheckType.split(',').filter(t => t);
                              setFormData({
                                ...formData,
                                backgroundCheckType: e.target.checked
                                  ? [...types, "local"].join(',')
                                  : types.filter(t => t !== "local").join(',')
                              });
                            }}
                            className="rounded"
                          />
                          <span>Local / County</span>
                        </Label>
                        <Label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.backgroundCheckType.includes("federal")}
                            onChange={(e) => {
                              const types = formData.backgroundCheckType.split(',').filter(t => t);
                              setFormData({
                                ...formData,
                                backgroundCheckType: e.target.checked
                                  ? [...types, "federal"].join(',')
                                  : types.filter(t => t !== "federal").join(',')
                              });
                            }}
                            className="rounded"
                          />
                          <span>Federal</span>
                        </Label>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <p className="text-sm font-medium mb-2">Can approved platform users have any of the following criminal convictions in the last 7 years?</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="allowsViolentCrime"
                            checked={formData.allowsViolentCrime}
                            onCheckedChange={(checked) => setFormData({ ...formData, allowsViolentCrime: checked as boolean })}
                            data-testid="checkbox-violent-crime"
                          />
                          <Label htmlFor="allowsViolentCrime" className="cursor-pointer">
                            Any violent crime
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="allowsAnyFelony"
                            checked={formData.allowsAnyFelony}
                            onCheckedChange={(checked) => setFormData({ ...formData, allowsAnyFelony: checked as boolean })}
                            data-testid="checkbox-any-felony"
                          />
                          <Label htmlFor="allowsAnyFelony" className="cursor-pointer">
                            Any felony
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="allowsSexualChildAbuse"
                            checked={formData.allowsSexualChildAbuse}
                            onCheckedChange={(checked) => setFormData({ ...formData, allowsSexualChildAbuse: checked as boolean })}
                            data-testid="checkbox-sexual-abuse"
                          />
                          <Label htmlFor="allowsSexualChildAbuse" className="cursor-pointer">
                            Any sexual, child abuse, or child endangerment offense
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="allowsTerrorRelated"
                            checked={formData.allowsTerrorRelated}
                            onCheckedChange={(checked) => setFormData({ ...formData, allowsTerrorRelated: checked as boolean })}
                            data-testid="checkbox-terror-related"
                          />
                          <Label htmlFor="allowsTerrorRelated" className="cursor-pointer">
                            Any terror related offense
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Motor Vehicle Record (MVR) Checks</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="performsMVRChecks"
                    checked={formData.performsMVRChecks}
                    onCheckedChange={(checked) => setFormData({ ...formData, performsMVRChecks: checked as boolean })}
                    data-testid="checkbox-mvr-checks"
                  />
                  <Label htmlFor="performsMVRChecks" className="cursor-pointer">
                    Do you conduct Motor Vehicle Record (MVR) checks on platform users?
                  </Label>
                </div>

                {formData.performsMVRChecks && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                    <div>
                      <Label htmlFor="mvrCheckVendor">If you use a vendor, which one?</Label>
                      <Input
                        id="mvrCheckVendor"
                        value={formData.mvrCheckVendor}
                        onChange={(e) => setFormData({ ...formData, mvrCheckVendor: e.target.value })}
                        data-testid="input-mvr-vendor"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="mvrVendorHeldHarmless"
                        checked={formData.mvrVendorHeldHarmless}
                        onCheckedChange={(checked) => setFormData({ ...formData, mvrVendorHeldHarmless: checked as boolean })}
                        data-testid="checkbox-mvr-harmless"
                      />
                      <Label htmlFor="mvrVendorHeldHarmless" className="cursor-pointer">
                        Are you held harmless in the event of vendor error?
                      </Label>
                    </div>

                    <div className="md:col-span-2">
                      <p className="text-sm font-medium mb-2">Will platform users or employees be allowed to operate a vehicle on your behalf if their MVR shows the following:</p>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="allowsMinorViolations"
                            checked={formData.allowsMinorViolations}
                            onCheckedChange={(checked) => setFormData({ ...formData, allowsMinorViolations: checked as boolean })}
                            data-testid="checkbox-minor-violations"
                          />
                          <Label htmlFor="allowsMinorViolations" className="cursor-pointer">
                            No more than 3 minor violations in the last 3 years
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="allowsMajorViolation"
                            checked={formData.allowsMajorViolation}
                            onCheckedChange={(checked) => setFormData({ ...formData, allowsMajorViolation: checked as boolean })}
                            data-testid="checkbox-major-violation"
                          />
                          <Label htmlFor="allowsMajorViolation" className="cursor-pointer">
                            No more than 1 major violation in the last 5 years
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="allowsDrivingConvictions"
                            checked={formData.allowsDrivingConvictions}
                            onCheckedChange={(checked) => setFormData({ ...formData, allowsDrivingConvictions: checked as boolean })}
                            data-testid="checkbox-driving-convictions"
                          />
                          <Label htmlFor="allowsDrivingConvictions" className="cursor-pointer">
                            No driving-related convictions for DUI/DWI, hit-and-run, reckless driving, etc.
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Identity Verification & Vehicle Requirements</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verifiesIdentity"
                    checked={formData.verifiesIdentity}
                    onCheckedChange={(checked) => setFormData({ ...formData, verifiesIdentity: checked as boolean })}
                    data-testid="checkbox-verifies-identity"
                  />
                  <Label htmlFor="verifiesIdentity" className="cursor-pointer">
                    Do you verify the identity of your platform users?
                  </Label>
                </div>

                {formData.verifiesIdentity && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                    <div>
                      <Label htmlFor="identityVerificationVendor">If you use a vendor, which one?</Label>
                      <Input
                        id="identityVerificationVendor"
                        value={formData.identityVerificationVendor}
                        onChange={(e) => setFormData({ ...formData, identityVerificationVendor: e.target.value })}
                        data-testid="input-identity-vendor"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="identityVendorHeldHarmless"
                        checked={formData.identityVendorHeldHarmless}
                        onCheckedChange={(checked) => setFormData({ ...formData, identityVendorHeldHarmless: checked as boolean })}
                        data-testid="checkbox-identity-harmless"
                      />
                      <Label htmlFor="identityVendorHeldHarmless" className="cursor-pointer">
                        Are you held harmless in the event of vendor error?
                      </Label>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <p className="text-sm font-medium mb-3">Do vehicles available for use on your platform comply with the following?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="requiresFourDoors"
                        checked={formData.requiresFourDoors}
                        onCheckedChange={(checked) => setFormData({ ...formData, requiresFourDoors: checked as boolean })}
                        data-testid="checkbox-four-doors"
                      />
                      <Label htmlFor="requiresFourDoors" className="cursor-pointer">
                        Have at least 4 doors
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="requiresPassengerCapacity"
                        checked={formData.requiresPassengerCapacity}
                        onCheckedChange={(checked) => setFormData({ ...formData, requiresPassengerCapacity: checked as boolean })}
                        data-testid="checkbox-passenger-capacity"
                      />
                      <Label htmlFor="requiresPassengerCapacity" className="cursor-pointer">
                        Can carry at least 4 but no more than 7 passengers
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="requiresVehicleAge"
                        checked={formData.requiresVehicleAge}
                        onCheckedChange={(checked) => setFormData({ ...formData, requiresVehicleAge: checked as boolean })}
                        data-testid="checkbox-vehicle-age"
                      />
                      <Label htmlFor="requiresVehicleAge" className="cursor-pointer">
                        Are less than 10 years old
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="requiresInStatePlates"
                        checked={formData.requiresInStatePlates}
                        onCheckedChange={(checked) => setFormData({ ...formData, requiresInStatePlates: checked as boolean })}
                        data-testid="checkbox-in-state-plates"
                      />
                      <Label htmlFor="requiresInStatePlates" className="cursor-pointer">
                        Have in-state license plates
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="requiresValidRegistration"
                        checked={formData.requiresValidRegistration}
                        onCheckedChange={(checked) => setFormData({ ...formData, requiresValidRegistration: checked as boolean })}
                        data-testid="checkbox-valid-registration"
                      />
                      <Label htmlFor="requiresValidRegistration" className="cursor-pointer">
                        Hold a valid registration
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="noMarkedTaxisSalvaged"
                        checked={formData.noMarkedTaxisSalvaged}
                        onCheckedChange={(checked) => setFormData({ ...formData, noMarkedTaxisSalvaged: checked as boolean })}
                        data-testid="checkbox-no-taxis-salvaged"
                      />
                      <Label htmlFor="noMarkedTaxisSalvaged" className="cursor-pointer">
                        Are not marked, taxis, or salvaged
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Items Delivered on Platform</h3>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Are any of these items delivered on your platform?</p>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="deliversAlcohol"
                    checked={formData.deliversAlcohol}
                    onCheckedChange={(checked) => setFormData({ ...formData, deliversAlcohol: checked as boolean })}
                    data-testid="checkbox-delivers-alcohol"
                  />
                  <Label htmlFor="deliversAlcohol" className="cursor-pointer">
                    Alcohol
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="deliversDrugs"
                    checked={formData.deliversDrugs}
                    onCheckedChange={(checked) => setFormData({ ...formData, deliversDrugs: checked as boolean })}
                    data-testid="checkbox-delivers-drugs"
                  />
                  <Label htmlFor="deliversDrugs" className="cursor-pointer">
                    Drugs
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="deliversMedication"
                    checked={formData.deliversMedication}
                    onCheckedChange={(checked) => setFormData({ ...formData, deliversMedication: checked as boolean })}
                    data-testid="checkbox-delivers-medication"
                  />
                  <Label htmlFor="deliversMedication" className="cursor-pointer">
                    Medication
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="deliversRegulatedItems"
                    checked={formData.deliversRegulatedItems}
                    onCheckedChange={(checked) => setFormData({ ...formData, deliversRegulatedItems: checked as boolean })}
                    data-testid="checkbox-delivers-regulated"
                  />
                  <Label htmlFor="deliversRegulatedItems" className="cursor-pointer">
                    Any other regulated items
                  </Label>
                </div>

                {formData.deliversRegulatedItems && (
                  <div>
                    <Label htmlFor="regulatedItemsDescription">Please describe</Label>
                    <Textarea
                      id="regulatedItemsDescription"
                      value={formData.regulatedItemsDescription}
                      onChange={(e) => setFormData({ ...formData, regulatedItemsDescription: e.target.value })}
                      rows={2}
                      data-testid="textarea-regulated-items"
                    />
                  </div>
                )}
              </div>

              <div className="mt-4">
                <Label htmlFor="otherSafetyMeasures">Any other safety measures</Label>
                <Textarea
                  id="otherSafetyMeasures"
                  value={formData.otherSafetyMeasures}
                  onChange={(e) => setFormData({ ...formData, otherSafetyMeasures: e.target.value })}
                  rows={2}
                  data-testid="textarea-other-safety"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Platform Activity & Operations */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Qualification Questions</h3>
              <p className="text-sm text-muted-foreground mb-4">If the answer to any of the following is "Yes," the risk is unacceptable:</p>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasVehiclesAbove15000lbs"
                    checked={formData.hasVehiclesAbove15000lbs}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasVehiclesAbove15000lbs: checked as boolean })}
                    data-testid="checkbox-vehicles-above-15000"
                  />
                  <Label htmlFor="hasVehiclesAbove15000lbs" className="cursor-pointer">
                    Are any vehicles above 15,000 lbs. Gross Vehicle Weight (GVW)?
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasTrailersHeavyTrucks"
                    checked={formData.hasTrailersHeavyTrucks}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasTrailersHeavyTrucks: checked as boolean })}
                    data-testid="checkbox-trailers-heavy-trucks"
                  />
                  <Label htmlFor="hasTrailersHeavyTrucks" className="cursor-pointer">
                    Are there any trailers, heavy trucks, or tractors?
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasVehiclesAbove8Passengers"
                    checked={formData.hasVehiclesAbove8Passengers}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasVehiclesAbove8Passengers: checked as boolean })}
                    data-testid="checkbox-vehicles-above-8-passengers"
                  />
                  <Label htmlFor="hasVehiclesAbove8Passengers" className="cursor-pointer">
                    Are any vehicles above 8-passenger seating capacity?
                  </Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Telematics & Platform Activity Tracking</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="usesTelematics"
                    checked={formData.usesTelematics}
                    onCheckedChange={(checked) => setFormData({ ...formData, usesTelematics: checked as boolean })}
                    data-testid="checkbox-telematics"
                  />
                  <Label htmlFor="usesTelematics" className="cursor-pointer">
                    Telematics/app for tracking platform activity
                  </Label>
                </div>

                {formData.usesTelematics && (
                  <div>
                    <Label htmlFor="telematicsVendor">If you use a vendor, which one?</Label>
                    <Input
                      id="telematicsVendor"
                      value={formData.telematicsVendor}
                      onChange={(e) => setFormData({ ...formData, telematicsVendor: e.target.value })}
                      data-testid="input-telematics-vendor"
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="canReportMonthlyActivity"
                    checked={formData.canReportMonthlyActivity}
                    onCheckedChange={(checked) => setFormData({ ...formData, canReportMonthlyActivity: checked as boolean })}
                    data-testid="checkbox-monthly-activity"
                  />
                  <Label htmlFor="canReportMonthlyActivity" className="cursor-pointer">
                    Can you report monthly platform activity?
                  </Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Projected Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="metricType">Metric Type *</Label>
                  <Select
                    value={formData.metricType}
                    onValueChange={(value) => setFormData({ ...formData, metricType: value })}
                  >
                    <SelectTrigger data-testid="select-metric-type">
                      <SelectValue placeholder="Select metric type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="miles">Miles</SelectItem>
                      <SelectItem value="deliveries">Deliveries</SelectItem>
                      <SelectItem value="trips">Trips</SelectItem>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="totalAnnualMiles">Total Annual Miles</Label>
                  <Input
                    id="totalAnnualMiles"
                    value={formData.totalAnnualMiles}
                    onChange={(e) => setFormData({ ...formData, totalAnnualMiles: e.target.value })}
                    placeholder="0"
                    data-testid="input-annual-miles"
                  />
                </div>

                <div>
                  <Label htmlFor="mostRecentYearVolume">Most Recent Full Year (Actual Volume)</Label>
                  <Input
                    id="mostRecentYearVolume"
                    value={formData.mostRecentYearVolume}
                    onChange={(e) => setFormData({ ...formData, mostRecentYearVolume: e.target.value })}
                    placeholder="0"
                    data-testid="input-recent-volume"
                  />
                </div>

                <div>
                  <Label htmlFor="currentYearVolume">Current Year (Projected Volume)</Label>
                  <Input
                    id="currentYearVolume"
                    value={formData.currentYearVolume}
                    onChange={(e) => setFormData({ ...formData, currentYearVolume: e.target.value })}
                    placeholder="0"
                    data-testid="input-current-volume"
                  />
                </div>

                <div>
                  <Label htmlFor="nextYearVolume">Next Calendar Year (Projected Volume)</Label>
                  <Input
                    id="nextYearVolume"
                    value={formData.nextYearVolume}
                    onChange={(e) => setFormData({ ...formData, nextYearVolume: e.target.value })}
                    placeholder="0"
                    data-testid="input-next-volume"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Exposure Details</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="statesOfOperation">States of Operation *</Label>
                  <Textarea
                    id="statesOfOperation"
                    value={formData.statesOfOperation}
                    onChange={(e) => setFormData({ ...formData, statesOfOperation: e.target.value })}
                    placeholder="List all states where you operate"
                    rows={2}
                    required
                    data-testid="textarea-states-operation"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">City Operations Breakdown (% of operations per city)</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city1">City 1</Label>
                      <Input
                        id="city1"
                        value={formData.city1}
                        onChange={(e) => setFormData({ ...formData, city1: e.target.value })}
                        data-testid="input-city1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city1Percentage">% of Operations</Label>
                      <Input
                        id="city1Percentage"
                        value={formData.city1Percentage}
                        onChange={(e) => setFormData({ ...formData, city1Percentage: e.target.value })}
                        placeholder="0"
                        data-testid="input-city1-percentage"
                      />
                    </div>

                    <div>
                      <Label htmlFor="city2">City 2</Label>
                      <Input
                        id="city2"
                        value={formData.city2}
                        onChange={(e) => setFormData({ ...formData, city2: e.target.value })}
                        data-testid="input-city2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city2Percentage">% of Operations</Label>
                      <Input
                        id="city2Percentage"
                        value={formData.city2Percentage}
                        onChange={(e) => setFormData({ ...formData, city2Percentage: e.target.value })}
                        placeholder="0"
                        data-testid="input-city2-percentage"
                      />
                    </div>

                    <div>
                      <Label htmlFor="city3">City 3</Label>
                      <Input
                        id="city3"
                        value={formData.city3}
                        onChange={(e) => setFormData({ ...formData, city3: e.target.value })}
                        data-testid="input-city3"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city3Percentage">% of Operations</Label>
                      <Input
                        id="city3Percentage"
                        value={formData.city3Percentage}
                        onChange={(e) => setFormData({ ...formData, city3Percentage: e.target.value })}
                        placeholder="0"
                        data-testid="input-city3-percentage"
                      />
                    </div>

                    <div>
                      <Label htmlFor="city4">City 4</Label>
                      <Input
                        id="city4"
                        value={formData.city4}
                        onChange={(e) => setFormData({ ...formData, city4: e.target.value })}
                        data-testid="input-city4"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city4Percentage">% of Operations</Label>
                      <Input
                        id="city4Percentage"
                        value={formData.city4Percentage}
                        onChange={(e) => setFormData({ ...formData, city4Percentage: e.target.value })}
                        placeholder="0"
                        data-testid="input-city4-percentage"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Vehicle & Transport Operations</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allowsGoodsTransport"
                    checked={formData.allowsGoodsTransport}
                    onCheckedChange={(checked) => setFormData({ ...formData, allowsGoodsTransport: checked as boolean })}
                    data-testid="checkbox-goods-transport"
                  />
                  <Label htmlFor="allowsGoodsTransport" className="cursor-pointer">
                    Are drivers allowed to transport goods in lieu of transporting passengers?
                  </Label>
                </div>

                {formData.allowsGoodsTransport && (
                  <p className="text-sm text-muted-foreground pl-6">Note: You must apply for that coverage separately</p>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ownsOrLeasesAutos"
                    checked={formData.ownsOrLeasesAutos}
                    onCheckedChange={(checked) => setFormData({ ...formData, ownsOrLeasesAutos: checked as boolean })}
                    data-testid="checkbox-owns-leases"
                  />
                  <Label htmlFor="ownsOrLeasesAutos" className="cursor-pointer">
                    Do the insured own or lease any autos?
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="requestingOwnedLeasedCoverage"
                    checked={formData.requestingOwnedLeasedCoverage}
                    onCheckedChange={(checked) => setFormData({ ...formData, requestingOwnedLeasedCoverage: checked as boolean })}
                    data-testid="checkbox-requesting-owned-coverage"
                  />
                  <Label htmlFor="requestingOwnedLeasedCoverage" className="cursor-pointer">
                    Are you requesting to insure any vehicles that are owned or leased?
                  </Label>
                </div>

                {formData.requestingOwnedLeasedCoverage && (
                  <p className="text-sm text-muted-foreground pl-6">Note: You must apply for that coverage separately</p>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="driversUseRentalVehicles"
                    checked={formData.driversUseRentalVehicles}
                    onCheckedChange={(checked) => setFormData({ ...formData, driversUseRentalVehicles: checked as boolean })}
                    data-testid="checkbox-rental-vehicles"
                  />
                  <Label htmlFor="driversUseRentalVehicles" className="cursor-pointer">
                    Are drivers allowed to drive vehicles rented or leased by the insured?
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="employeesUsePersonalVehicles"
                    checked={formData.employeesUsePersonalVehicles}
                    onCheckedChange={(checked) => setFormData({ ...formData, employeesUsePersonalVehicles: checked as boolean })}
                    data-testid="checkbox-personal-vehicles"
                  />
                  <Label htmlFor="employeesUsePersonalVehicles" className="cursor-pointer">
                    Do any employees use personal vehicles for business operations?
                  </Label>
                </div>

                {formData.employeesUsePersonalVehicles && (
                  <div>
                    <Label htmlFor="personalVehicleDescription">Please describe</Label>
                    <Textarea
                      id="personalVehicleDescription"
                      value={formData.personalVehicleDescription}
                      onChange={(e) => setFormData({ ...formData, personalVehicleDescription: e.target.value })}
                      rows={2}
                      data-testid="textarea-personal-vehicles"
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="requiresDriverInsurance"
                    checked={formData.requiresDriverInsurance}
                    onCheckedChange={(checked) => setFormData({ ...formData, requiresDriverInsurance: checked as boolean })}
                    data-testid="checkbox-requires-insurance"
                  />
                  <Label htmlFor="requiresDriverInsurance" className="cursor-pointer">
                    Are drivers required to provide evidence of their own Auto Insurance?
                  </Label>
                </div>

                {formData.requiresDriverInsurance && (
                  <div>
                    <Label htmlFor="insuranceVerificationFrequency">How often is it verified that insurance is current?</Label>
                    <Input
                      id="insuranceVerificationFrequency"
                      value={formData.insuranceVerificationFrequency}
                      onChange={(e) => setFormData({ ...formData, insuranceVerificationFrequency: e.target.value })}
                      placeholder="e.g., Monthly, Quarterly, Annually"
                      data-testid="input-verification-frequency"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Drivers & Safety */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Driver Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="totalDrivers">Total Number of Drivers *</Label>
                  <Input
                    id="totalDrivers"
                    type="number"
                    value={formData.totalDrivers}
                    onChange={(e) => setFormData({ ...formData, totalDrivers: e.target.value })}
                    required
                    data-testid="input-total-drivers"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="driversAreIndependentContractors"
                    checked={formData.driversAreIndependentContractors}
                    onCheckedChange={(checked) => setFormData({ ...formData, driversAreIndependentContractors: checked as boolean })}
                    data-testid="checkbox-independent-contractors"
                  />
                  <Label htmlFor="driversAreIndependentContractors" className="cursor-pointer">
                    Are the drivers Independent Contractors?
                  </Label>
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasDriverIncentiveProgram"
                      checked={formData.hasDriverIncentiveProgram}
                      onCheckedChange={(checked) => setFormData({ ...formData, hasDriverIncentiveProgram: checked as boolean })}
                      data-testid="checkbox-incentive-program"
                    />
                    <Label htmlFor="hasDriverIncentiveProgram" className="cursor-pointer">
                      Does the insured have a driver incentive program?
                    </Label>
                  </div>
                </div>

                {formData.hasDriverIncentiveProgram && (
                  <div className="md:col-span-2">
                    <Label htmlFor="incentiveProgramDescription">Describe the incentive program</Label>
                    <Textarea
                      id="incentiveProgramDescription"
                      value={formData.incentiveProgramDescription}
                      onChange={(e) => setFormData({ ...formData, incentiveProgramDescription: e.target.value })}
                      rows={2}
                      data-testid="textarea-incentive-program"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Driver Hiring Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="requiresMVRReports"
                    checked={formData.requiresMVRReports}
                    onCheckedChange={(checked) => setFormData({ ...formData, requiresMVRReports: checked as boolean })}
                    data-testid="checkbox-requires-mvr"
                  />
                  <Label htmlFor="requiresMVRReports" className="cursor-pointer">
                    MVR Reports
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="requiresCriminalBackgroundCheck"
                    checked={formData.requiresCriminalBackgroundCheck}
                    onCheckedChange={(checked) => setFormData({ ...formData, requiresCriminalBackgroundCheck: checked as boolean })}
                    data-testid="checkbox-requires-criminal-check"
                  />
                  <Label htmlFor="requiresCriminalBackgroundCheck" className="cursor-pointer">
                    Criminal Background Check
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="requiresDrugCheck"
                    checked={formData.requiresDrugCheck}
                    onCheckedChange={(checked) => setFormData({ ...formData, requiresDrugCheck: checked as boolean })}
                    data-testid="checkbox-requires-drug-check"
                  />
                  <Label htmlFor="requiresDrugCheck" className="cursor-pointer">
                    Drug Check
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="requiresWrittenApplication"
                    checked={formData.requiresWrittenApplication}
                    onCheckedChange={(checked) => setFormData({ ...formData, requiresWrittenApplication: checked as boolean })}
                    data-testid="checkbox-requires-written-app"
                  />
                  <Label htmlFor="requiresWrittenApplication" className="cursor-pointer">
                    Written Application
                  </Label>
                </div>

                <div>
                  <Label htmlFor="minimumAge">Minimum Age</Label>
                  <Input
                    id="minimumAge"
                    type="number"
                    value={formData.minimumAge}
                    onChange={(e) => setFormData({ ...formData, minimumAge: e.target.value })}
                    placeholder="21"
                    data-testid="input-minimum-age"
                  />
                </div>

                <div>
                  <Label htmlFor="minimumYearsLicensed">Minimum Years Licensed</Label>
                  <Input
                    id="minimumYearsLicensed"
                    type="number"
                    value={formData.minimumYearsLicensed}
                    onChange={(e) => setFormData({ ...formData, minimumYearsLicensed: e.target.value })}
                    placeholder="3"
                    data-testid="input-minimum-years-licensed"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="otherHiringRequirements">Other Requirements</Label>
                  <Textarea
                    id="otherHiringRequirements"
                    value={formData.otherHiringRequirements}
                    onChange={(e) => setFormData({ ...formData, otherHiringRequirements: e.target.value })}
                    rows={2}
                    data-testid="textarea-other-requirements"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">MVR Review & Criteria</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="mvrReviewFrequency">How often does the insured order and review MVRs for drivers?</Label>
                  <Input
                    id="mvrReviewFrequency"
                    value={formData.mvrReviewFrequency}
                    onChange={(e) => setFormData({ ...formData, mvrReviewFrequency: e.target.value })}
                    placeholder="e.g., Annually, At hire only"
                    data-testid="input-mvr-frequency"
                  />
                </div>

                <div>
                  <Label htmlFor="mvrAcceptabilityCriteria">What criteria is used for MVR acceptability?</Label>
                  <Textarea
                    id="mvrAcceptabilityCriteria"
                    value={formData.mvrAcceptabilityCriteria}
                    onChange={(e) => setFormData({ ...formData, mvrAcceptabilityCriteria: e.target.value })}
                    placeholder="e.g., Fewer than 3 moving violations, no major violations within 3 years"
                    rows={3}
                    data-testid="textarea-mvr-criteria"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Risk Management & Claims Reporting</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="riskManagementContact">Contact Person for Risk Management & Claims *</Label>
                  <Input
                    id="riskManagementContact"
                    value={formData.riskManagementContact}
                    onChange={(e) => setFormData({ ...formData, riskManagementContact: e.target.value })}
                    required
                    data-testid="input-risk-contact"
                  />
                </div>

                <div>
                  <Label htmlFor="riskManagementPhone">Phone Number</Label>
                  <Input
                    id="riskManagementPhone"
                    type="tel"
                    value={formData.riskManagementPhone}
                    onChange={(e) => setFormData({ ...formData, riskManagementPhone: e.target.value })}
                    data-testid="input-risk-phone"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="riskManagementEmail">Email Address</Label>
                  <Input
                    id="riskManagementEmail"
                    type="email"
                    value={formData.riskManagementEmail}
                    onChange={(e) => setFormData({ ...formData, riskManagementEmail: e.target.value })}
                    data-testid="input-risk-email"
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasClaimsNotLoggedInApp"
                      checked={formData.hasClaimsNotLoggedInApp}
                      onCheckedChange={(checked) => setFormData({ ...formData, hasClaimsNotLoggedInApp: checked as boolean })}
                      data-testid="checkbox-claims-not-logged"
                    />
                    <Label htmlFor="hasClaimsNotLoggedInApp" className="cursor-pointer">
                      Have there been any claims involving a driver that was not logged into the insured's application?
                    </Label>
                  </div>
                </div>

                {formData.hasClaimsNotLoggedInApp && (
                  <div className="md:col-span-2">
                    <Label htmlFor="claimsNotLoggedDetails">Provide detailed claim summary</Label>
                    <Textarea
                      id="claimsNotLoggedDetails"
                      value={formData.claimsNotLoggedDetails}
                      onChange={(e) => setFormData({ ...formData, claimsNotLoggedDetails: e.target.value })}
                      rows={3}
                      data-testid="textarea-claims-details"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Safety Meetings</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="holdsSafetyMeetings"
                    checked={formData.holdsSafetyMeetings}
                    onCheckedChange={(checked) => setFormData({ ...formData, holdsSafetyMeetings: checked as boolean })}
                    data-testid="checkbox-safety-meetings"
                  />
                  <Label htmlFor="holdsSafetyMeetings" className="cursor-pointer">
                    Does the insured hold regular safety meetings?
                  </Label>
                </div>

                {formData.holdsSafetyMeetings && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                    <div>
                      <Label htmlFor="safetyMeetingFrequency">How often are they held?</Label>
                      <Input
                        id="safetyMeetingFrequency"
                        value={formData.safetyMeetingFrequency}
                        onChange={(e) => setFormData({ ...formData, safetyMeetingFrequency: e.target.value })}
                        placeholder="e.g., Monthly, Quarterly"
                        data-testid="input-safety-frequency"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="safetyMeetingMandatory"
                        checked={formData.safetyMeetingMandatory}
                        onCheckedChange={(checked) => setFormData({ ...formData, safetyMeetingMandatory: checked as boolean })}
                        data-testid="checkbox-safety-mandatory"
                      />
                      <Label htmlFor="safetyMeetingMandatory" className="cursor-pointer">
                        Is attendance mandatory?
                      </Label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Additional Information & File Uploads */}
        {step === 6 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Premium History</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-3">
                  <p className="text-sm text-muted-foreground mb-2">Current Year</p>
                </div>
                <div>
                  <Label htmlFor="currentYearCarrier">Insurance Company</Label>
                  <Input
                    id="currentYearCarrier"
                    value={formData.currentYearCarrier}
                    onChange={(e) => setFormData({ ...formData, currentYearCarrier: e.target.value })}
                    data-testid="input-current-carrier"
                  />
                </div>
                <div>
                  <Label htmlFor="currentYearAutoLiabilityPremium">Auto Liability Premium</Label>
                  <Input
                    id="currentYearAutoLiabilityPremium"
                    value={formData.currentYearAutoLiabilityPremium}
                    onChange={(e) => setFormData({ ...formData, currentYearAutoLiabilityPremium: e.target.value })}
                    placeholder="$0"
                    data-testid="input-current-auto-premium"
                  />
                </div>
                <div>
                  <Label htmlFor="currentYearPhysicalDamagePremium">Physical Damage Premium</Label>
                  <Input
                    id="currentYearPhysicalDamagePremium"
                    value={formData.currentYearPhysicalDamagePremium}
                    onChange={(e) => setFormData({ ...formData, currentYearPhysicalDamagePremium: e.target.value })}
                    placeholder="$0"
                    data-testid="input-current-pd-premium"
                  />
                </div>

                <div className="md:col-span-3 mt-4">
                  <p className="text-sm text-muted-foreground mb-2">1st Prior Year</p>
                </div>
                <div>
                  <Label htmlFor="firstPriorYearCarrier">Insurance Company</Label>
                  <Input
                    id="firstPriorYearCarrier"
                    value={formData.firstPriorYearCarrier}
                    onChange={(e) => setFormData({ ...formData, firstPriorYearCarrier: e.target.value })}
                    data-testid="input-prior-carrier"
                  />
                </div>
                <div>
                  <Label htmlFor="firstPriorYearAutoLiabilityPremium">Auto Liability Premium</Label>
                  <Input
                    id="firstPriorYearAutoLiabilityPremium"
                    value={formData.firstPriorYearAutoLiabilityPremium}
                    onChange={(e) => setFormData({ ...formData, firstPriorYearAutoLiabilityPremium: e.target.value })}
                    placeholder="$0"
                    data-testid="input-prior-auto-premium"
                  />
                </div>
                <div>
                  <Label htmlFor="firstPriorYearPhysicalDamagePremium">Physical Damage Premium</Label>
                  <Input
                    id="firstPriorYearPhysicalDamagePremium"
                    value={formData.firstPriorYearPhysicalDamagePremium}
                    onChange={(e) => setFormData({ ...formData, firstPriorYearPhysicalDamagePremium: e.target.value })}
                    placeholder="$0"
                    data-testid="input-prior-pd-premium"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Required File Uploads</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Please upload the following documents. All files should be in PDF, Excel, or Word format.
              </p>

              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div className="flex-1">
                      <Label htmlFor="termsOfServiceFile" className="text-base font-medium">Terms of Service / Use</Label>
                      <p className="text-sm text-muted-foreground">Final, attorney-reviewed version with user acceptance screenshots</p>
                    </div>
                  </div>
                  <Input
                    id="termsOfServiceFile"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setTermsOfServiceFile(e.target.files?.[0] || null)}
                    className="mt-4"
                    data-testid="input-terms-file"
                  />
                  {termsOfServiceFile && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>{termsOfServiceFile.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setTermsOfServiceFile(null)}
                        data-testid="button-remove-terms-file"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="border-2 border-dashed rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div className="flex-1">
                      <Label htmlFor="financialStatementsFile" className="text-base font-medium">Financial Statements</Label>
                      <p className="text-sm text-muted-foreground">Current and projected financials for the coming year</p>
                    </div>
                  </div>
                  <Input
                    id="financialStatementsFile"
                    type="file"
                    accept=".pdf,.xlsx,.xls"
                    onChange={(e) => setFinancialStatementsFile(e.target.files?.[0] || null)}
                    className="mt-4"
                    data-testid="input-financials-file"
                  />
                  {financialStatementsFile && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>{financialStatementsFile.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setFinancialStatementsFile(null)}
                        data-testid="button-remove-financials-file"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="border-2 border-dashed rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div className="flex-1">
                      <Label htmlFor="lossRunsFile" className="text-base font-medium">Loss Runs</Label>
                      <p className="text-sm text-muted-foreground">Currently valued carrier-issued loss runs or detailed incident descriptions</p>
                    </div>
                  </div>
                  <Input
                    id="lossRunsFile"
                    type="file"
                    accept=".pdf,.xlsx,.xls"
                    onChange={(e) => setLossRunsFile(e.target.files?.[0] || null)}
                    className="mt-4"
                    data-testid="input-loss-runs-file"
                  />
                  {lossRunsFile && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>{lossRunsFile.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setLossRunsFile(null)}
                        data-testid="button-remove-loss-runs-file"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="border-2 border-dashed rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div className="flex-1">
                      <Label htmlFor="vehicleScheduleFile" className="text-base font-medium">Schedule of Vehicles (if applicable)</Label>
                      <p className="text-sm text-muted-foreground">If requested auto coverage would be used as proof of insurance for registration</p>
                    </div>
                  </div>
                  <Input
                    id="vehicleScheduleFile"
                    type="file"
                    accept=".pdf,.xlsx,.xls,.csv"
                    onChange={(e) => setVehicleScheduleFile(e.target.files?.[0] || null)}
                    className="mt-4"
                    data-testid="input-vehicle-schedule-file"
                  />
                  {vehicleScheduleFile && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>{vehicleScheduleFile.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setVehicleScheduleFile(null)}
                        data-testid="button-remove-vehicle-schedule-file"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
              <div>
                <Label htmlFor="additionalComments">Additional Comments or Information</Label>
                <Textarea
                  id="additionalComments"
                  value={formData.additionalComments}
                  onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                  placeholder="Provide any additional information relevant to your application..."
                  rows={4}
                  data-testid="textarea-additional-comments"
                />
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-900 p-4">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>Note:</strong> By submitting this application, you acknowledge that all information provided is accurate and complete. Our underwriting team will review your submission and contact you within 24-48 hours.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              data-testid="button-back"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          {step < totalSteps ? (
            <Button
              onClick={() => setStep(step + 1)}
              className="ml-auto"
              data-testid="button-next"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="ml-auto"
              disabled={mutation.isPending}
              data-testid="button-submit"
            >
              {mutation.isPending ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
