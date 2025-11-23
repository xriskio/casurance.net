import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, CheckCircle, Upload, FileText, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface Props {
  applicationType: "nemt" | "ambulance";
  onSuccess?: () => void;
}

export default function NemtApplicationFormComprehensive({ applicationType, onSuccess }: Props) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string>("");
  const { toast } = useToast();

  const [vehicleFile, setVehicleFile] = useState<File | null>(null);
  const [driverFile, setDriverFile] = useState<File | null>(null);
  const [lossRunsFile, setLossRunsFile] = useState<File | null>(null);

  // Vehicle and Driver arrays
  interface Vehicle {
    year: string;
    make: string;
    model: string;
    vin: string;
    seatingCapacity: string;
    value: string;
  }

  interface Driver {
    fullName: string;
    dateOfBirth: string;
    licenseNumber: string;
    licenseState: string;
    yearsCommercialExperience: string;
    dateOfHire: string;
  }

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const [formData, setFormData] = useState({
    // Step 1: Applicant Information
    applicantName: "",
    mailingAddress: "",
    mailingCity: "",
    mailingState: "",
    mailingZip: "",
    phone: "",
    email: "",
    website: "",
    garagingAddress: "",
    garagingCity: "",
    garagingState: "",
    garagingZip: "",
    dotNumber: "",
    npiNumber: "",
    federalId: "",
    yearEstablished: "",
    yearsCurrentOwnership: "",
    yearsCurrentManagement: "",
    
    // Subsidiaries and Prior Names
    subsidiaryNames: "",
    hasOperatedUnderDifferentName: false,
    priorEntityNames: "",
    
    // Key Personnel
    presidentName: "",
    presidentYearsInPosition: "",
    presidentPhone: "",
    presidentEmail: "",
    safetyDirectorName: "",
    safetyDirectorYearsInPosition: "",
    safetyDirectorPhone: "",
    safetyDirectorEmail: "",
    
    // Step 2: Fleet & Operations
    operationalAmbulances: "",
    standbyAmbulances: "",
    vansMinivansAmbulettes: "",
    buses: "",
    passengerCars: "",
    otherVehicles: "",
    totalFleetMileage: "",
    operatingRadiusMiles: "",
    crossesStateLines: false,
    statesOperated: "",
    metroAreasServed: [] as string[],
    
    // Service Types
    serviceTypes: [] as string[],
    hoursOfOperation: "",
    providesWeekendService: false,
    dispatchedBy: "",
    
    // Call Volume
    emergency911Calls: "",
    nonEmergencyAmbulanceCalls: "",
    wheelchairTransports: "",
    ambulatoryTransports: "",
    schoolTransports: "",
    
    // Trip Percentages
    wheelchairPct: "",
    stretcherPct: "",
    passengerPct: "",
    curbToCurbPct: "",
    doorToDoorPct: "",
    doorThroughDoorPct: "",
    prescheduledPct: "",
    onDemandPct: "",
    emergencyPct: "",
    radius0to50Pct: "",
    radius51to200Pct: "",
    radius200plusPct: "",
    
    // Contracts
    hasWrittenContracts: false,
    contractDetails: "",
    
    // Step 3: Historical Information
    currentYearRevenue: "",
    projectedRevenue: "",
    expiringVehicleCount: "",
    expiringTransports: "",
    firstPriorVehicleCount: "",
    firstPriorTransports: "",
    secondPriorVehicleCount: "",
    secondPriorTransports: "",
    thirdPriorVehicleCount: "",
    thirdPriorTransports: "",
    fourthPriorVehicleCount: "",
    fourthPriorTransports: "",
    
    // Prior Insurance
    currentCarrier: "",
    currentAutoLiabilityPremium: "",
    currentPhysicalDamagePremium: "",
    priorCarrier1: "",
    priorCarrier2: "",
    priorCarrier3: "",
    
    // Claims History
    hasAwareCircumstances: false,
    circumstancesDetails: "",
    hasPriorLosses: false,
    lossesDetails: "",
    
    // Step 4: Drivers & Safety
    totalDrivers: "",
    fullTimeDrivers: "",
    partTimeDrivers: "",
    volunteerDrivers: "",
    backupDrivers: "",
    contractedDrivers: "",
    emtDrivers: "",
    firstResponderDrivers: "",
    paramedicDrivers: "",
    regularDrivers: "",
    driversOver70: "",
    driversUnder23: "",
    driversAdded12Months: "",
    driversReplaced12Months: "",
    
    // Driver Pay & Screening
    driverPayBasis: "",
    mvrCheckFrequency: "",
    reviewsMVRsAnnually: false,
    usesPreestablishedCriteria: false,
    
    // Training Percentages
    generalOrientationPct: "",
    defensiveDrivingPct: "",
    cprPct: "",
    primaryFirstAidPct: "",
    advancedFirstAidPct: "",
    passengerAssistancePct: "",
    emergencyEvacuationPct: "",
    wheelchairSecurementPct: "",
    trainingByMedicalProfessional: false,
    trainingFrequency: "",
    
    // Pre-Employment
    usesWrittenApplication: false,
    usesPhysicalExam: false,
    usesMVRCheck: false,
    usesCriminalBackgroundCheck: false,
    usesWrittenDrivingExam: false,
    usesReferencesCheck: false,
    usesPreemploymentDrugTest: false,
    usesRoadTest: false,
    usesPhysicalAbilitiesTest: false,
    hasWrittenDriverCriteria: false,
    hasExperienceRequirement: false,
    
    // Step 5: Coverage Selection
    autoLiabilityCoverageAmount: "",
    customLiabilityAmount: "",
    autoPhysicalDamage: false,
    hnoaCoverage: false,
    workersCompensation: false,
    generalLiability: false,
    professionalLiability: false,
    umbrellaCoverage: false,
    excessAutoLiability: false,
    excessAutoLiabilityLimit: "",
    
    // Physical Damage Details
    physicalDamageDeductible: "",
    comprehensiveCoverage: false,
    collisionCoverage: false,
    specifiedPerils: false,
    
    // Additional Coverages
    uninsuredMotoristLimit: "",
    medicalPaymentsLimit: "",
    personalInjuryProtection: false,
    hiredAutoLiability: false,
    nonOwnedAutoLiability: false,
    
    // Step 6: Additional Information
    briefOperationDescription: "",
    subcontractsForOthers: false,
    subcontractDetails: "",
    hasWrittenAgreements: false,
    agreementDetails: "",
    borrowsEmployees: false,
    includesCaseWork: false,
    hasRailroadContracts: false,
    otherRevenueStreams: false,
    otherRevenueDetails: "",
    
    // Broker Contracts
    contractsWithModivCare: false,
    contractsWithMTM: false,
    contractsWithHopelink: false,
    contractsWithNationalMedTrans: false,
    contractsWithAccess2Care: false,
    contractsWithVeyo: false,
    contractsWithSoutheastrans: false,
    otherBrokerContracts: "",
    
    additionalComments: "",
  });

  // Helper functions for vehicles and drivers
  const addVehicle = () => {
    if (vehicles.length < 10) {
      setVehicles([...vehicles, {
        year: "",
        make: "",
        model: "",
        vin: "",
        seatingCapacity: "",
        value: "",
      }]);
    }
  };

  const removeVehicle = (index: number) => {
    setVehicles(vehicles.filter((_, i) => i !== index));
  };

  const updateVehicle = (index: number, field: keyof Vehicle, value: string) => {
    const updated = [...vehicles];
    updated[index][field] = value;
    setVehicles(updated);
  };

  const addDriver = () => {
    if (drivers.length < 10) {
      setDrivers([...drivers, {
        fullName: "",
        dateOfBirth: "",
        licenseNumber: "",
        licenseState: "",
        yearsCommercialExperience: "",
        dateOfHire: "",
      }]);
    }
  };

  const removeDriver = (index: number) => {
    setDrivers(drivers.filter((_, i) => i !== index));
  };

  const updateDriver = (index: number, field: keyof Driver, value: string) => {
    const updated = [...drivers];
    updated[index][field] = value;
    setDrivers(updated);
  };

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      // Create the complete payload with all form data including vehicles and drivers
      const completePayload = {
        ...data,
        vehicles,
        drivers,
        files: {
          hasVehicleList: !!vehicleFile,
          hasDriverList: !!driverFile,
          hasLossRuns: !!lossRunsFile,
        },
      };

      // Map form fields to schema fields and convert booleans to strings
      const applicationData = {
        businessName: data.applicantName,
        contactName: data.applicantName, // Using applicant name as contact name
        email: data.email,
        phone: data.phone,
        address: data.mailingAddress,
        city: data.mailingCity,
        state: data.mailingState,
        zipCode: data.mailingZip,
        yearsInBusiness: data.yearEstablished,
        numberOfVehicles: data.totalDrivers, // Approximate from fleet data
        numberOfDrivers: data.totalDrivers,
        operatingRadius: data.operatingRadiusMiles,
        autoLiabilityCoverage: data.autoLiabilityCoverageAmount,
        autoPhysicalDamage: data.autoPhysicalDamage ? "yes" : "no",
        hnoaCoverage: data.hnoaCoverage ? "yes" : "no",
        workersCompensation: data.workersCompensation ? "yes" : "no",
        generalLiability: data.generalLiability ? "yes" : "no",
        professionalLiability: data.professionalLiability ? "yes" : "no",
        umbrellaCoverage: data.umbrellaCoverage ? "yes" : "no",
        excessAutoLiability: data.excessAutoLiability ? "yes" : "no",
        payload: completePayload, // Store everything in payload
      };

      const formDataToSend = new FormData();
      formDataToSend.append("applicationData", JSON.stringify(applicationData));

      if (vehicleFile) formDataToSend.append("vehicleList", vehicleFile);
      if (driverFile) formDataToSend.append("driverList", driverFile);
      if (lossRunsFile) formDataToSend.append("lossRuns", lossRunsFile);

      const endpoint = applicationType === "nemt" ? "/api/nemt-applications" : "/api/ambulance-applications";
      const response = await fetch(endpoint, {
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
    onSuccess: (data: any) => {
      setReferenceNumber(data.referenceNumber);
      setSubmitted(true);
      toast({
        title: "Application Submitted",
        description: `Your ${applicationType === "nemt" ? "NEMT" : "Ambulance"} insurance application has been submitted successfully. Reference: ${data.referenceNumber}`,
      });
      onSuccess?.();
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
          
          {referenceNumber && (
            <div className="bg-primary/10 border-2 border-primary rounded-lg p-6 mb-6 max-w-md mx-auto">
              <p className="text-sm text-muted-foreground mb-2">Your Reference Number</p>
              <p className="text-3xl font-bold text-primary tracking-wider" data-testid="text-reference-number">{referenceNumber}</p>
              <p className="text-xs text-muted-foreground mt-2">Please save this number for future correspondence</p>
            </div>
          )}
          
          <p className="text-muted-foreground mb-6">
            Thank you for submitting your {applicationType === "nemt" ? "NEMT" : "Ambulance"} insurance application. One of our licensed agents will review your information and contact you within 24-48 hours.
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
        <CardTitle>
          {applicationType === "nemt" ? "NEMT & Paratransit" : "Ambulance Services"} Insurance Application
        </CardTitle>
        <div className="flex gap-2 mt-4">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${i + 1 <= step ? 'bg-primary' : 'bg-muted'}`}
              data-testid={`progress-step-${i + 1}`}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-2">Step {step} of {totalSteps}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Step 1: Applicant Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Applicant Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="applicantName">Legal Name of Entity (as it will appear on policy) *</Label>
                  <Input
                    id="applicantName"
                    value={formData.applicantName}
                    onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                    placeholder="First Named Insured"
                    required
                    data-testid="input-applicant-name"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="mailingAddress">Mailing Address *</Label>
                  <Input
                    id="mailingAddress"
                    value={formData.mailingAddress}
                    onChange={(e) => setFormData({ ...formData, mailingAddress: e.target.value })}
                    placeholder="Street Address"
                    required
                    data-testid="input-mailing-address"
                  />
                </div>

                <div>
                  <Label htmlFor="mailingCity">City *</Label>
                  <Input
                    id="mailingCity"
                    value={formData.mailingCity}
                    onChange={(e) => setFormData({ ...formData, mailingCity: e.target.value })}
                    required
                    data-testid="input-mailing-city"
                  />
                </div>

                <div>
                  <Label htmlFor="mailingState">State *</Label>
                  <Input
                    id="mailingState"
                    value={formData.mailingState}
                    onChange={(e) => setFormData({ ...formData, mailingState: e.target.value })}
                    required
                    data-testid="input-mailing-state"
                  />
                </div>

                <div>
                  <Label htmlFor="mailingZip">ZIP Code *</Label>
                  <Input
                    id="mailingZip"
                    value={formData.mailingZip}
                    onChange={(e) => setFormData({ ...formData, mailingZip: e.target.value })}
                    required
                    data-testid="input-mailing-zip"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    required
                    data-testid="input-phone"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="www.example.com"
                    data-testid="input-website"
                  />
                </div>

                <div>
                  <Label htmlFor="dotNumber">DOT Number</Label>
                  <Input
                    id="dotNumber"
                    value={formData.dotNumber}
                    onChange={(e) => setFormData({ ...formData, dotNumber: e.target.value })}
                    data-testid="input-dot-number"
                  />
                </div>

                <div>
                  <Label htmlFor="npiNumber">NPI Number</Label>
                  <Input
                    id="npiNumber"
                    value={formData.npiNumber}
                    onChange={(e) => setFormData({ ...formData, npiNumber: e.target.value })}
                    data-testid="input-npi-number"
                  />
                </div>

                <div>
                  <Label htmlFor="federalId">Federal ID #</Label>
                  <Input
                    id="federalId"
                    value={formData.federalId}
                    onChange={(e) => setFormData({ ...formData, federalId: e.target.value })}
                    data-testid="input-federal-id"
                  />
                </div>

                <div>
                  <Label htmlFor="yearEstablished">Year Established</Label>
                  <Input
                    id="yearEstablished"
                    value={formData.yearEstablished}
                    onChange={(e) => setFormData({ ...formData, yearEstablished: e.target.value })}
                    placeholder="2020"
                    data-testid="input-year-established"
                  />
                </div>

                <div>
                  <Label htmlFor="yearsCurrentOwnership">Years Under Current Ownership</Label>
                  <Input
                    id="yearsCurrentOwnership"
                    value={formData.yearsCurrentOwnership}
                    onChange={(e) => setFormData({ ...formData, yearsCurrentOwnership: e.target.value })}
                    data-testid="input-years-ownership"
                  />
                </div>

                <div>
                  <Label htmlFor="yearsCurrentManagement">Years Under Current Management</Label>
                  <Input
                    id="yearsCurrentManagement"
                    value={formData.yearsCurrentManagement}
                    onChange={(e) => setFormData({ ...formData, yearsCurrentManagement: e.target.value })}
                    data-testid="input-years-management"
                  />
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasOperatedUnderDifferentName"
                    checked={formData.hasOperatedUnderDifferentName}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasOperatedUnderDifferentName: checked as boolean })}
                    data-testid="checkbox-different-name"
                  />
                  <Label htmlFor="hasOperatedUnderDifferentName" className="cursor-pointer">
                    Have you ever operated under a different name?
                  </Label>
                </div>

                {formData.hasOperatedUnderDifferentName && (
                  <div>
                    <Label htmlFor="priorEntityNames">Prior Entity Names</Label>
                    <Input
                      id="priorEntityNames"
                      value={formData.priorEntityNames}
                      onChange={(e) => setFormData({ ...formData, priorEntityNames: e.target.value })}
                      data-testid="input-prior-names"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Key Management Personnel</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="presidentName">President/CEO Name</Label>
                  <Input
                    id="presidentName"
                    value={formData.presidentName}
                    onChange={(e) => setFormData({ ...formData, presidentName: e.target.value })}
                    data-testid="input-president-name"
                  />
                </div>

                <div>
                  <Label htmlFor="presidentYearsInPosition">Years in Position</Label>
                  <Input
                    id="presidentYearsInPosition"
                    value={formData.presidentYearsInPosition}
                    onChange={(e) => setFormData({ ...formData, presidentYearsInPosition: e.target.value })}
                    data-testid="input-president-years"
                  />
                </div>

                <div>
                  <Label htmlFor="presidentPhone">Phone</Label>
                  <Input
                    id="presidentPhone"
                    value={formData.presidentPhone}
                    onChange={(e) => setFormData({ ...formData, presidentPhone: e.target.value })}
                    data-testid="input-president-phone"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="presidentEmail">Email</Label>
                  <Input
                    id="presidentEmail"
                    type="email"
                    value={formData.presidentEmail}
                    onChange={(e) => setFormData({ ...formData, presidentEmail: e.target.value })}
                    data-testid="input-president-email"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="safetyDirectorName">Safety Director Name</Label>
                  <Input
                    id="safetyDirectorName"
                    value={formData.safetyDirectorName}
                    onChange={(e) => setFormData({ ...formData, safetyDirectorName: e.target.value })}
                    data-testid="input-safety-director-name"
                  />
                </div>

                <div>
                  <Label htmlFor="safetyDirectorYearsInPosition">Years in Position</Label>
                  <Input
                    id="safetyDirectorYearsInPosition"
                    value={formData.safetyDirectorYearsInPosition}
                    onChange={(e) => setFormData({ ...formData, safetyDirectorYearsInPosition: e.target.value })}
                    data-testid="input-safety-director-years"
                  />
                </div>

                <div>
                  <Label htmlFor="safetyDirectorPhone">Phone</Label>
                  <Input
                    id="safetyDirectorPhone"
                    value={formData.safetyDirectorPhone}
                    onChange={(e) => setFormData({ ...formData, safetyDirectorPhone: e.target.value })}
                    data-testid="input-safety-director-phone"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Revenue Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentYearRevenue">Current Year Revenues</Label>
                  <Input
                    id="currentYearRevenue"
                    value={formData.currentYearRevenue}
                    onChange={(e) => setFormData({ ...formData, currentYearRevenue: e.target.value })}
                    placeholder="$0"
                    data-testid="input-current-revenue"
                  />
                </div>

                <div>
                  <Label htmlFor="projectedRevenue">Projected Revenues (Next 12 Months)</Label>
                  <Input
                    id="projectedRevenue"
                    value={formData.projectedRevenue}
                    onChange={(e) => setFormData({ ...formData, projectedRevenue: e.target.value })}
                    placeholder="$0"
                    data-testid="input-projected-revenue"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Fleet & Operations */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Fleet Composition</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="operationalAmbulances">Operational Ambulances</Label>
                  <Input
                    id="operationalAmbulances"
                    type="number"
                    value={formData.operationalAmbulances}
                    onChange={(e) => setFormData({ ...formData, operationalAmbulances: e.target.value })}
                    placeholder="0"
                    data-testid="input-operational-ambulances"
                  />
                </div>

                <div>
                  <Label htmlFor="standbyAmbulances">Standby Ambulances</Label>
                  <Input
                    id="standbyAmbulances"
                    type="number"
                    value={formData.standbyAmbulances}
                    onChange={(e) => setFormData({ ...formData, standbyAmbulances: e.target.value })}
                    placeholder="0"
                    data-testid="input-standby-ambulances"
                  />
                </div>

                <div>
                  <Label htmlFor="vansMinivansAmbulettes">Vans/Mini Vans/Ambulettes</Label>
                  <Input
                    id="vansMinivansAmbulettes"
                    type="number"
                    value={formData.vansMinivansAmbulettes}
                    onChange={(e) => setFormData({ ...formData, vansMinivansAmbulettes: e.target.value })}
                    placeholder="0"
                    data-testid="input-vans"
                  />
                </div>

                <div>
                  <Label htmlFor="buses">Buses</Label>
                  <Input
                    id="buses"
                    type="number"
                    value={formData.buses}
                    onChange={(e) => setFormData({ ...formData, buses: e.target.value })}
                    placeholder="0"
                    data-testid="input-buses"
                  />
                </div>

                <div>
                  <Label htmlFor="passengerCars">Passenger Cars</Label>
                  <Input
                    id="passengerCars"
                    type="number"
                    value={formData.passengerCars}
                    onChange={(e) => setFormData({ ...formData, passengerCars: e.target.value })}
                    placeholder="0"
                    data-testid="input-passenger-cars"
                  />
                </div>

                <div>
                  <Label htmlFor="otherVehicles">Other Vehicles</Label>
                  <Input
                    id="otherVehicles"
                    type="number"
                    value={formData.otherVehicles}
                    onChange={(e) => setFormData({ ...formData, otherVehicles: e.target.value })}
                    placeholder="0"
                    data-testid="input-other-vehicles"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Operating Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="totalFleetMileage">Total Fleet Mileage (Last Year)</Label>
                  <Input
                    id="totalFleetMileage"
                    value={formData.totalFleetMileage}
                    onChange={(e) => setFormData({ ...formData, totalFleetMileage: e.target.value })}
                    placeholder="0"
                    data-testid="input-fleet-mileage"
                  />
                </div>

                <div>
                  <Label htmlFor="operatingRadiusMiles">Operating Radius (Miles)</Label>
                  <Input
                    id="operatingRadiusMiles"
                    value={formData.operatingRadiusMiles}
                    onChange={(e) => setFormData({ ...formData, operatingRadiusMiles: e.target.value })}
                    placeholder="25"
                    data-testid="input-operating-radius"
                  />
                </div>

                <div>
                  <Label htmlFor="hoursOfOperation">Hours of Operation</Label>
                  <Input
                    id="hoursOfOperation"
                    value={formData.hoursOfOperation}
                    onChange={(e) => setFormData({ ...formData, hoursOfOperation: e.target.value })}
                    placeholder="24/7 or specify hours"
                    data-testid="input-hours-operation"
                  />
                </div>

                <div>
                  <Label htmlFor="dispatchedBy">Dispatched By</Label>
                  <Input
                    id="dispatchedBy"
                    value={formData.dispatchedBy}
                    onChange={(e) => setFormData({ ...formData, dispatchedBy: e.target.value })}
                    data-testid="input-dispatched-by"
                  />
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="crossesStateLines"
                    checked={formData.crossesStateLines}
                    onCheckedChange={(checked) => setFormData({ ...formData, crossesStateLines: checked as boolean })}
                    data-testid="checkbox-crosses-state-lines"
                  />
                  <Label htmlFor="crossesStateLines" className="cursor-pointer">
                    Does the operating radius cross state lines?
                  </Label>
                </div>

                {formData.crossesStateLines && (
                  <div>
                    <Label htmlFor="statesOperated">States Operated In</Label>
                    <Input
                      id="statesOperated"
                      value={formData.statesOperated}
                      onChange={(e) => setFormData({ ...formData, statesOperated: e.target.value })}
                      placeholder="e.g., CA, NV, AZ"
                      data-testid="input-states-operated"
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="providesWeekendService"
                    checked={formData.providesWeekendService}
                    onCheckedChange={(checked) => setFormData({ ...formData, providesWeekendService: checked as boolean })}
                    data-testid="checkbox-weekend-service"
                  />
                  <Label htmlFor="providesWeekendService" className="cursor-pointer">
                    Provides weekend service
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasWrittenContracts"
                    checked={formData.hasWrittenContracts}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasWrittenContracts: checked as boolean })}
                    data-testid="checkbox-written-contracts"
                  />
                  <Label htmlFor="hasWrittenContracts" className="cursor-pointer">
                    Has written contractual agreements to perform service
                  </Label>
                </div>

                {formData.hasWrittenContracts && (
                  <div>
                    <Label htmlFor="contractDetails">Contract Details</Label>
                    <Textarea
                      id="contractDetails"
                      value={formData.contractDetails}
                      onChange={(e) => setFormData({ ...formData, contractDetails: e.target.value })}
                      placeholder="Describe contractual agreements..."
                      rows={3}
                      data-testid="textarea-contract-details"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Annual Call Volume</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergency911Calls">Emergency (911) Calls</Label>
                  <Input
                    id="emergency911Calls"
                    value={formData.emergency911Calls}
                    onChange={(e) => setFormData({ ...formData, emergency911Calls: e.target.value })}
                    placeholder="0"
                    data-testid="input-emergency-calls"
                  />
                </div>

                <div>
                  <Label htmlFor="nonEmergencyAmbulanceCalls">Non-Emergency Ambulance Calls</Label>
                  <Input
                    id="nonEmergencyAmbulanceCalls"
                    value={formData.nonEmergencyAmbulanceCalls}
                    onChange={(e) => setFormData({ ...formData, nonEmergencyAmbulanceCalls: e.target.value })}
                    placeholder="0"
                    data-testid="input-non-emergency-calls"
                  />
                </div>

                <div>
                  <Label htmlFor="wheelchairTransports">Wheelchair Transports</Label>
                  <Input
                    id="wheelchairTransports"
                    value={formData.wheelchairTransports}
                    onChange={(e) => setFormData({ ...formData, wheelchairTransports: e.target.value })}
                    placeholder="0"
                    data-testid="input-wheelchair-transports"
                  />
                </div>

                <div>
                  <Label htmlFor="ambulatoryTransports">Ambulatory Transports</Label>
                  <Input
                    id="ambulatoryTransports"
                    value={formData.ambulatoryTransports}
                    onChange={(e) => setFormData({ ...formData, ambulatoryTransports: e.target.value })}
                    placeholder="0"
                    data-testid="input-ambulatory-transports"
                  />
                </div>

                <div>
                  <Label htmlFor="schoolTransports">School Transports</Label>
                  <Input
                    id="schoolTransports"
                    value={formData.schoolTransports}
                    onChange={(e) => setFormData({ ...formData, schoolTransports: e.target.value })}
                    placeholder="0"
                    data-testid="input-school-transports"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Trip Percentages (Should Total 100% per Category)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <p className="font-medium text-sm">Passenger Type</p>
                  <div>
                    <Label htmlFor="wheelchairPct">Wheelchair %</Label>
                    <Input
                      id="wheelchairPct"
                      type="number"
                      value={formData.wheelchairPct}
                      onChange={(e) => setFormData({ ...formData, wheelchairPct: e.target.value })}
                      placeholder="0"
                      data-testid="input-wheelchair-pct"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stretcherPct">Stretcher %</Label>
                    <Input
                      id="stretcherPct"
                      type="number"
                      value={formData.stretcherPct}
                      onChange={(e) => setFormData({ ...formData, stretcherPct: e.target.value })}
                      placeholder="0"
                      data-testid="input-stretcher-pct"
                    />
                  </div>
                  <div>
                    <Label htmlFor="passengerPct">Ambulatory/Passenger %</Label>
                    <Input
                      id="passengerPct"
                      type="number"
                      value={formData.passengerPct}
                      onChange={(e) => setFormData({ ...formData, passengerPct: e.target.value })}
                      placeholder="0"
                      data-testid="input-passenger-pct"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="font-medium text-sm">Service Level</p>
                  <div>
                    <Label htmlFor="curbToCurbPct">Curb-to-Curb %</Label>
                    <Input
                      id="curbToCurbPct"
                      type="number"
                      value={formData.curbToCurbPct}
                      onChange={(e) => setFormData({ ...formData, curbToCurbPct: e.target.value })}
                      placeholder="0"
                      data-testid="input-curb-to-curb-pct"
                    />
                  </div>
                  <div>
                    <Label htmlFor="doorToDoorPct">Door-to-Door %</Label>
                    <Input
                      id="doorToDoorPct"
                      type="number"
                      value={formData.doorToDoorPct}
                      onChange={(e) => setFormData({ ...formData, doorToDoorPct: e.target.value })}
                      placeholder="0"
                      data-testid="input-door-to-door-pct"
                    />
                  </div>
                  <div>
                    <Label htmlFor="doorThroughDoorPct">Door-through-Door %</Label>
                    <Input
                      id="doorThroughDoorPct"
                      type="number"
                      value={formData.doorThroughDoorPct}
                      onChange={(e) => setFormData({ ...formData, doorThroughDoorPct: e.target.value })}
                      placeholder="0"
                      data-testid="input-door-through-door-pct"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="font-medium text-sm">Scheduling Type</p>
                  <div>
                    <Label htmlFor="prescheduledPct">Prescheduled %</Label>
                    <Input
                      id="prescheduledPct"
                      type="number"
                      value={formData.prescheduledPct}
                      onChange={(e) => setFormData({ ...formData, prescheduledPct: e.target.value })}
                      placeholder="0"
                      data-testid="input-prescheduled-pct"
                    />
                  </div>
                  <div>
                    <Label htmlFor="onDemandPct">On-Demand %</Label>
                    <Input
                      id="onDemandPct"
                      type="number"
                      value={formData.onDemandPct}
                      onChange={(e) => setFormData({ ...formData, onDemandPct: e.target.value })}
                      placeholder="0"
                      data-testid="input-on-demand-pct"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyPct">Emergency %</Label>
                    <Input
                      id="emergencyPct"
                      type="number"
                      value={formData.emergencyPct}
                      onChange={(e) => setFormData({ ...formData, emergencyPct: e.target.value })}
                      placeholder="0"
                      data-testid="input-emergency-pct"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Details Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Vehicle Details (Optional - Up to 10 Vehicles)</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Enter individual vehicle information here. If you have more than 10 vehicles, you can upload a complete list in Step 6 instead.
              </p>
              
              {vehicles.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground mb-4">No vehicles added yet</p>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={addVehicle}
                    data-testid="button-add-first-vehicle"
                  >
                    Add First Vehicle
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {vehicles.map((vehicle, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-muted/30">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Vehicle #{index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeVehicle(index)}
                          data-testid={`button-remove-vehicle-${index}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor={`vehicle-year-${index}`}>Year</Label>
                          <Input
                            id={`vehicle-year-${index}`}
                            value={vehicle.year}
                            onChange={(e) => updateVehicle(index, 'year', e.target.value)}
                            placeholder="2024"
                            data-testid={`input-vehicle-year-${index}`}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`vehicle-make-${index}`}>Make</Label>
                          <Input
                            id={`vehicle-make-${index}`}
                            value={vehicle.make}
                            onChange={(e) => updateVehicle(index, 'make', e.target.value)}
                            placeholder="Ford"
                            data-testid={`input-vehicle-make-${index}`}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`vehicle-model-${index}`}>Model</Label>
                          <Input
                            id={`vehicle-model-${index}`}
                            value={vehicle.model}
                            onChange={(e) => updateVehicle(index, 'model', e.target.value)}
                            placeholder="Transit"
                            data-testid={`input-vehicle-model-${index}`}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`vehicle-vin-${index}`}>VIN</Label>
                          <Input
                            id={`vehicle-vin-${index}`}
                            value={vehicle.vin}
                            onChange={(e) => updateVehicle(index, 'vin', e.target.value)}
                            placeholder="1FTBW3XM5GKA12345"
                            data-testid={`input-vehicle-vin-${index}`}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`vehicle-seating-capacity-${index}`}>Seating Capacity</Label>
                          <Input
                            id={`vehicle-seating-capacity-${index}`}
                            value={vehicle.seatingCapacity}
                            onChange={(e) => updateVehicle(index, 'seatingCapacity', e.target.value)}
                            placeholder="8"
                            data-testid={`input-vehicle-seating-capacity-${index}`}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`vehicle-value-${index}`}>Value</Label>
                          <Input
                            id={`vehicle-value-${index}`}
                            value={vehicle.value}
                            onChange={(e) => updateVehicle(index, 'value', e.target.value)}
                            placeholder="$50,000"
                            data-testid={`input-vehicle-value-${index}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {vehicles.length < 10 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addVehicle}
                      className="w-full"
                      data-testid="button-add-vehicle"
                    >
                      Add Another Vehicle ({vehicles.length}/10)
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Historical Information & Claims */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Historical Data - Policy Term Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-3">
                  <p className="text-sm text-muted-foreground mb-4">Provide historical vehicle counts and number of transports for each policy period</p>
                </div>

                <div>
                  <Label htmlFor="expiringVehicleCount">Expiring: Vehicle Count</Label>
                  <Input
                    id="expiringVehicleCount"
                    value={formData.expiringVehicleCount}
                    onChange={(e) => setFormData({ ...formData, expiringVehicleCount: e.target.value })}
                    placeholder="0"
                    data-testid="input-expiring-vehicle-count"
                  />
                </div>

                <div>
                  <Label htmlFor="expiringTransports"># of Transports</Label>
                  <Input
                    id="expiringTransports"
                    value={formData.expiringTransports}
                    onChange={(e) => setFormData({ ...formData, expiringTransports: e.target.value })}
                    placeholder="0"
                    data-testid="input-expiring-transports"
                  />
                </div>

                <div></div>

                <div>
                  <Label htmlFor="firstPriorVehicleCount">1st Prior: Vehicle Count</Label>
                  <Input
                    id="firstPriorVehicleCount"
                    value={formData.firstPriorVehicleCount}
                    onChange={(e) => setFormData({ ...formData, firstPriorVehicleCount: e.target.value })}
                    placeholder="0"
                    data-testid="input-first-prior-vehicle-count"
                  />
                </div>

                <div>
                  <Label htmlFor="firstPriorTransports"># of Transports</Label>
                  <Input
                    id="firstPriorTransports"
                    value={formData.firstPriorTransports}
                    onChange={(e) => setFormData({ ...formData, firstPriorTransports: e.target.value })}
                    placeholder="0"
                    data-testid="input-first-prior-transports"
                  />
                </div>

                <div></div>

                <div>
                  <Label htmlFor="secondPriorVehicleCount">2nd Prior: Vehicle Count</Label>
                  <Input
                    id="secondPriorVehicleCount"
                    value={formData.secondPriorVehicleCount}
                    onChange={(e) => setFormData({ ...formData, secondPriorVehicleCount: e.target.value })}
                    placeholder="0"
                    data-testid="input-second-prior-vehicle-count"
                  />
                </div>

                <div>
                  <Label htmlFor="secondPriorTransports"># of Transports</Label>
                  <Input
                    id="secondPriorTransports"
                    value={formData.secondPriorTransports}
                    onChange={(e) => setFormData({ ...formData, secondPriorTransports: e.target.value })}
                    placeholder="0"
                    data-testid="input-second-prior-transports"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Prior Insurance Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="currentCarrier">Current Insurance Carrier</Label>
                  <Input
                    id="currentCarrier"
                    value={formData.currentCarrier}
                    onChange={(e) => setFormData({ ...formData, currentCarrier: e.target.value })}
                    data-testid="input-current-carrier"
                  />
                </div>

                <div>
                  <Label htmlFor="currentAutoLiabilityPremium">Auto Liability Premium</Label>
                  <Input
                    id="currentAutoLiabilityPremium"
                    value={formData.currentAutoLiabilityPremium}
                    onChange={(e) => setFormData({ ...formData, currentAutoLiabilityPremium: e.target.value })}
                    placeholder="$0"
                    data-testid="input-current-al-premium"
                  />
                </div>

                <div>
                  <Label htmlFor="currentPhysicalDamagePremium">Physical Damage Premium</Label>
                  <Input
                    id="currentPhysicalDamagePremium"
                    value={formData.currentPhysicalDamagePremium}
                    onChange={(e) => setFormData({ ...formData, currentPhysicalDamagePremium: e.target.value })}
                    placeholder="$0"
                    data-testid="input-current-pd-premium"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Claims & Loss History</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasPriorLosses"
                    checked={formData.hasPriorLosses}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasPriorLosses: checked as boolean })}
                    data-testid="checkbox-prior-losses"
                  />
                  <Label htmlFor="hasPriorLosses" className="cursor-pointer">
                    Are there any losses in the prior five (5) years?
                  </Label>
                </div>

                {formData.hasPriorLosses && (
                  <div>
                    <Label htmlFor="lossesDetails">Loss Details</Label>
                    <Textarea
                      id="lossesDetails"
                      value={formData.lossesDetails}
                      onChange={(e) => setFormData({ ...formData, lossesDetails: e.target.value })}
                      placeholder="Provide full details of all losses..."
                      rows={4}
                      data-testid="textarea-losses-details"
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasAwareCircumstances"
                    checked={formData.hasAwareCircumstances}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasAwareCircumstances: checked as boolean })}
                    data-testid="checkbox-aware-circumstances"
                  />
                  <Label htmlFor="hasAwareCircumstances" className="cursor-pointer">
                    Are you aware of any circumstances which may result in a claim?
                  </Label>
                </div>

                {formData.hasAwareCircumstances && (
                  <div>
                    <Label htmlFor="circumstancesDetails">Circumstances Details</Label>
                    <Textarea
                      id="circumstancesDetails"
                      value={formData.circumstancesDetails}
                      onChange={(e) => setFormData({ ...formData, circumstancesDetails: e.target.value })}
                      placeholder="Provide full details..."
                      rows={4}
                      data-testid="textarea-circumstances-details"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Drivers & Safety Programs */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Driver Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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

                <div>
                  <Label htmlFor="fullTimeDrivers">Full-Time Drivers</Label>
                  <Input
                    id="fullTimeDrivers"
                    type="number"
                    value={formData.fullTimeDrivers}
                    onChange={(e) => setFormData({ ...formData, fullTimeDrivers: e.target.value })}
                    data-testid="input-full-time-drivers"
                  />
                </div>

                <div>
                  <Label htmlFor="partTimeDrivers">Part-Time Drivers</Label>
                  <Input
                    id="partTimeDrivers"
                    type="number"
                    value={formData.partTimeDrivers}
                    onChange={(e) => setFormData({ ...formData, partTimeDrivers: e.target.value })}
                    data-testid="input-part-time-drivers"
                  />
                </div>

                <div>
                  <Label htmlFor="volunteerDrivers">Volunteer Drivers</Label>
                  <Input
                    id="volunteerDrivers"
                    type="number"
                    value={formData.volunteerDrivers}
                    onChange={(e) => setFormData({ ...formData, volunteerDrivers: e.target.value })}
                    data-testid="input-volunteer-drivers"
                  />
                </div>

                <div>
                  <Label htmlFor="backupDrivers">Backup Drivers</Label>
                  <Input
                    id="backupDrivers"
                    type="number"
                    value={formData.backupDrivers}
                    onChange={(e) => setFormData({ ...formData, backupDrivers: e.target.value })}
                    data-testid="input-backup-drivers"
                  />
                </div>

                <div>
                  <Label htmlFor="contractedDrivers">Contracted Drivers</Label>
                  <Input
                    id="contractedDrivers"
                    type="number"
                    value={formData.contractedDrivers}
                    onChange={(e) => setFormData({ ...formData, contractedDrivers: e.target.value })}
                    data-testid="input-contracted-drivers"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Driver Types & Qualifications</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="emtDrivers">EMT Drivers</Label>
                  <Input
                    id="emtDrivers"
                    type="number"
                    value={formData.emtDrivers}
                    onChange={(e) => setFormData({ ...formData, emtDrivers: e.target.value })}
                    data-testid="input-emt-drivers"
                  />
                </div>

                <div>
                  <Label htmlFor="firstResponderDrivers">First Responder Drivers</Label>
                  <Input
                    id="firstResponderDrivers"
                    type="number"
                    value={formData.firstResponderDrivers}
                    onChange={(e) => setFormData({ ...formData, firstResponderDrivers: e.target.value })}
                    data-testid="input-first-responder-drivers"
                  />
                </div>

                <div>
                  <Label htmlFor="paramedicDrivers">Paramedic Drivers</Label>
                  <Input
                    id="paramedicDrivers"
                    type="number"
                    value={formData.paramedicDrivers}
                    onChange={(e) => setFormData({ ...formData, paramedicDrivers: e.target.value })}
                    data-testid="input-paramedic-drivers"
                  />
                </div>

                <div>
                  <Label htmlFor="regularDrivers">Regular Drivers (Non-Medical)</Label>
                  <Input
                    id="regularDrivers"
                    type="number"
                    value={formData.regularDrivers}
                    onChange={(e) => setFormData({ ...formData, regularDrivers: e.target.value })}
                    data-testid="input-regular-drivers"
                  />
                </div>

                <div>
                  <Label htmlFor="driversOver70">Drivers Over 70</Label>
                  <Input
                    id="driversOver70"
                    type="number"
                    value={formData.driversOver70}
                    onChange={(e) => setFormData({ ...formData, driversOver70: e.target.value })}
                    data-testid="input-drivers-over-70"
                  />
                </div>

                <div>
                  <Label htmlFor="driversUnder23">Drivers Under 23</Label>
                  <Input
                    id="driversUnder23"
                    type="number"
                    value={formData.driversUnder23}
                    onChange={(e) => setFormData({ ...formData, driversUnder23: e.target.value })}
                    data-testid="input-drivers-under-23"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Driver Screening & Monitoring</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mvrCheckFrequency">MVR Check Frequency</Label>
                  <Select
                    value={formData.mvrCheckFrequency}
                    onValueChange={(value) => setFormData({ ...formData, mvrCheckFrequency: value })}
                  >
                    <SelectTrigger data-testid="select-mvr-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hire">At Hire Only</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                      <SelectItem value="semi-annually">Semi-Annually</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="driverPayBasis">Driver Pay Basis</Label>
                  <Select
                    value={formData.driverPayBasis}
                    onValueChange={(value) => setFormData({ ...formData, driverPayBasis: value })}
                  >
                    <SelectTrigger data-testid="select-driver-pay">
                      <SelectValue placeholder="Select pay basis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="trip">Per Trip</SelectItem>
                      <SelectItem value="mileage">Mileage</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="reviewsMVRsAnnually"
                    checked={formData.reviewsMVRsAnnually}
                    onCheckedChange={(checked) => setFormData({ ...formData, reviewsMVRsAnnually: checked as boolean })}
                    data-testid="checkbox-reviews-mvrs"
                  />
                  <Label htmlFor="reviewsMVRsAnnually" className="cursor-pointer">
                    Owner reviews MVRs for all drivers annually
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="usesPreestablishedCriteria"
                    checked={formData.usesPreestablishedCriteria}
                    onCheckedChange={(checked) => setFormData({ ...formData, usesPreestablishedCriteria: checked as boolean })}
                    data-testid="checkbox-preestablished-criteria"
                  />
                  <Label htmlFor="usesPreestablishedCriteria" className="cursor-pointer">
                    Uses pre-established MVR criteria
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasWrittenDriverCriteria"
                    checked={formData.hasWrittenDriverCriteria}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasWrittenDriverCriteria: checked as boolean })}
                    data-testid="checkbox-written-driver-criteria"
                  />
                  <Label htmlFor="hasWrittenDriverCriteria" className="cursor-pointer">
                    Has written driver criteria in place
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasExperienceRequirement"
                    checked={formData.hasExperienceRequirement}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasExperienceRequirement: checked as boolean })}
                    data-testid="checkbox-experience-requirement"
                  />
                  <Label htmlFor="hasExperienceRequirement" className="cursor-pointer">
                    Experience requirement for newly hired drivers
                  </Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Pre-Employment Procedures</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="usesWrittenApplication"
                    checked={formData.usesWrittenApplication}
                    onCheckedChange={(checked) => setFormData({ ...formData, usesWrittenApplication: checked as boolean })}
                    data-testid="checkbox-written-application"
                  />
                  <Label htmlFor="usesWrittenApplication" className="cursor-pointer">
                    Written Application
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="usesPhysicalExam"
                    checked={formData.usesPhysicalExam}
                    onCheckedChange={(checked) => setFormData({ ...formData, usesPhysicalExam: checked as boolean })}
                    data-testid="checkbox-physical-exam"
                  />
                  <Label htmlFor="usesPhysicalExam" className="cursor-pointer">
                    Physical Examination
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="usesMVRCheck"
                    checked={formData.usesMVRCheck}
                    onCheckedChange={(checked) => setFormData({ ...formData, usesMVRCheck: checked as boolean })}
                    data-testid="checkbox-mvr-check"
                  />
                  <Label htmlFor="usesMVRCheck" className="cursor-pointer">
                    Motor Vehicle Record Check
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="usesCriminalBackgroundCheck"
                    checked={formData.usesCriminalBackgroundCheck}
                    onCheckedChange={(checked) => setFormData({ ...formData, usesCriminalBackgroundCheck: checked as boolean })}
                    data-testid="checkbox-criminal-background"
                  />
                  <Label htmlFor="usesCriminalBackgroundCheck" className="cursor-pointer">
                    Criminal Background Check
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="usesWrittenDrivingExam"
                    checked={formData.usesWrittenDrivingExam}
                    onCheckedChange={(checked) => setFormData({ ...formData, usesWrittenDrivingExam: checked as boolean })}
                    data-testid="checkbox-written-driving-exam"
                  />
                  <Label htmlFor="usesWrittenDrivingExam" className="cursor-pointer">
                    Written Driving Exam
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="usesReferencesCheck"
                    checked={formData.usesReferencesCheck}
                    onCheckedChange={(checked) => setFormData({ ...formData, usesReferencesCheck: checked as boolean })}
                    data-testid="checkbox-references-check"
                  />
                  <Label htmlFor="usesReferencesCheck" className="cursor-pointer">
                    References Check
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="usesPreemploymentDrugTest"
                    checked={formData.usesPreemploymentDrugTest}
                    onCheckedChange={(checked) => setFormData({ ...formData, usesPreemploymentDrugTest: checked as boolean })}
                    data-testid="checkbox-drug-test"
                  />
                  <Label htmlFor="usesPreemploymentDrugTest" className="cursor-pointer">
                    Pre-employment Drug Testing
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="usesRoadTest"
                    checked={formData.usesRoadTest}
                    onCheckedChange={(checked) => setFormData({ ...formData, usesRoadTest: checked as boolean })}
                    data-testid="checkbox-road-test"
                  />
                  <Label htmlFor="usesRoadTest" className="cursor-pointer">
                    Road Test
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="usesPhysicalAbilitiesTest"
                    checked={formData.usesPhysicalAbilitiesTest}
                    onCheckedChange={(checked) => setFormData({ ...formData, usesPhysicalAbilitiesTest: checked as boolean })}
                    data-testid="checkbox-physical-abilities-test"
                  />
                  <Label htmlFor="usesPhysicalAbilitiesTest" className="cursor-pointer">
                    Physical Abilities Test
                  </Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Driver Training Programs (% of Drivers Trained)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="generalOrientationPct">General Driver Orientation %</Label>
                  <Input
                    id="generalOrientationPct"
                    type="number"
                    value={formData.generalOrientationPct}
                    onChange={(e) => setFormData({ ...formData, generalOrientationPct: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-orientation-pct"
                  />
                </div>

                <div>
                  <Label htmlFor="defensiveDrivingPct">Defensive Driving %</Label>
                  <Input
                    id="defensiveDrivingPct"
                    type="number"
                    value={formData.defensiveDrivingPct}
                    onChange={(e) => setFormData({ ...formData, defensiveDrivingPct: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-defensive-driving-pct"
                  />
                </div>

                <div>
                  <Label htmlFor="cprPct">CPR %</Label>
                  <Input
                    id="cprPct"
                    type="number"
                    value={formData.cprPct}
                    onChange={(e) => setFormData({ ...formData, cprPct: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-cpr-pct"
                  />
                </div>

                <div>
                  <Label htmlFor="primaryFirstAidPct">Primary First Aid %</Label>
                  <Input
                    id="primaryFirstAidPct"
                    type="number"
                    value={formData.primaryFirstAidPct}
                    onChange={(e) => setFormData({ ...formData, primaryFirstAidPct: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-first-aid-pct"
                  />
                </div>

                <div>
                  <Label htmlFor="passengerAssistancePct">Passenger Assistance %</Label>
                  <Input
                    id="passengerAssistancePct"
                    type="number"
                    value={formData.passengerAssistancePct}
                    onChange={(e) => setFormData({ ...formData, passengerAssistancePct: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-passenger-assistance-pct"
                  />
                </div>

                <div>
                  <Label htmlFor="wheelchairSecurementPct">Wheelchair Securement Procedures %</Label>
                  <Input
                    id="wheelchairSecurementPct"
                    type="number"
                    value={formData.wheelchairSecurementPct}
                    onChange={(e) => setFormData({ ...formData, wheelchairSecurementPct: e.target.value })}
                    placeholder="0-100"
                    data-testid="input-wheelchair-securement-pct"
                  />
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="trainingByMedicalProfessional"
                    checked={formData.trainingByMedicalProfessional}
                    onCheckedChange={(checked) => setFormData({ ...formData, trainingByMedicalProfessional: checked as boolean })}
                    data-testid="checkbox-medical-professional-training"
                  />
                  <Label htmlFor="trainingByMedicalProfessional" className="cursor-pointer">
                    Training provided by Medical Professional and/or Medical Director
                  </Label>
                </div>

                <div>
                  <Label htmlFor="trainingFrequency">Training Frequency</Label>
                  <Select
                    value={formData.trainingFrequency}
                    onValueChange={(value) => setFormData({ ...formData, trainingFrequency: value })}
                  >
                    <SelectTrigger data-testid="select-training-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annually">Annually</SelectItem>
                      <SelectItem value="bi-annually">Bi-Annually</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Driver Details Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Driver Details (Optional - Up to 10 Drivers)</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Enter individual driver information here. If you have more than 10 drivers, you can upload a complete list in Step 6 instead.
              </p>
              
              {drivers.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground mb-4">No drivers added yet</p>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={addDriver}
                    data-testid="button-add-first-driver"
                  >
                    Add First Driver
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {drivers.map((driver, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-muted/30">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Driver #{index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDriver(index)}
                          data-testid={`button-remove-driver-${index}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`driver-full-name-${index}`}>Full Name</Label>
                          <Input
                            id={`driver-full-name-${index}`}
                            value={driver.fullName}
                            onChange={(e) => updateDriver(index, 'fullName', e.target.value)}
                            placeholder="John Doe"
                            data-testid={`input-driver-full-name-${index}`}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`driver-dob-${index}`}>Date of Birth</Label>
                          <Input
                            id={`driver-dob-${index}`}
                            type="date"
                            value={driver.dateOfBirth}
                            onChange={(e) => updateDriver(index, 'dateOfBirth', e.target.value)}
                            placeholder="mm/dd/yyyy"
                            data-testid={`input-driver-dob-${index}`}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`driver-license-number-${index}`}>License Number</Label>
                          <Input
                            id={`driver-license-number-${index}`}
                            value={driver.licenseNumber}
                            onChange={(e) => updateDriver(index, 'licenseNumber', e.target.value)}
                            placeholder="D1234567"
                            data-testid={`input-driver-license-number-${index}`}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`driver-license-state-${index}`}>License State</Label>
                          <Input
                            id={`driver-license-state-${index}`}
                            value={driver.licenseState}
                            onChange={(e) => updateDriver(index, 'licenseState', e.target.value)}
                            placeholder="CA"
                            data-testid={`input-driver-license-state-${index}`}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`driver-years-commercial-${index}`}>Years of Commercial Driving Experience</Label>
                          <Input
                            id={`driver-years-commercial-${index}`}
                            value={driver.yearsCommercialExperience}
                            onChange={(e) => updateDriver(index, 'yearsCommercialExperience', e.target.value)}
                            placeholder="5"
                            data-testid={`input-driver-years-commercial-${index}`}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`driver-date-of-hire-${index}`}>Date of Hire</Label>
                          <Input
                            id={`driver-date-of-hire-${index}`}
                            type="date"
                            value={driver.dateOfHire}
                            onChange={(e) => updateDriver(index, 'dateOfHire', e.target.value)}
                            placeholder="mm/dd/yyyy"
                            data-testid={`input-driver-date-of-hire-${index}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {drivers.length < 10 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addDriver}
                      className="w-full"
                      data-testid="button-add-driver"
                    >
                      Add Another Driver ({drivers.length}/10)
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 5: Coverage Selection */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Coverage Selection</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="autoLiabilityCoverageAmount">Auto Liability Coverage Amount *</Label>
                  <Select
                    value={formData.autoLiabilityCoverageAmount}
                    onValueChange={(value) => setFormData({ ...formData, autoLiabilityCoverageAmount: value })}
                    required
                  >
                    <SelectTrigger data-testid="select-auto-liability-amount">
                      <SelectValue placeholder="Select coverage amount" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1000000">$1,000,000</SelectItem>
                      <SelectItem value="3000000">$3,000,000</SelectItem>
                      <SelectItem value="5000000">$5,000,000</SelectItem>
                      <SelectItem value="custom">Custom Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.autoLiabilityCoverageAmount === "custom" && (
                  <div>
                    <Label htmlFor="customLiabilityAmount">Custom Liability Amount</Label>
                    <Input
                      id="customLiabilityAmount"
                      value={formData.customLiabilityAmount}
                      onChange={(e) => setFormData({ ...formData, customLiabilityAmount: e.target.value })}
                      placeholder="Enter custom amount"
                      data-testid="input-custom-liability-amount"
                    />
                  </div>
                )}

                <div className="space-y-3 mt-6">
                  <p className="font-medium">Additional Coverages</p>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="autoPhysicalDamage"
                      checked={formData.autoPhysicalDamage}
                      onCheckedChange={(checked) => setFormData({ ...formData, autoPhysicalDamage: checked as boolean })}
                      data-testid="checkbox-auto-physical-damage"
                    />
                    <Label htmlFor="autoPhysicalDamage" className="cursor-pointer">
                      Auto Physical Damage
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hnoaCoverage"
                      checked={formData.hnoaCoverage}
                      onCheckedChange={(checked) => setFormData({ ...formData, hnoaCoverage: checked as boolean })}
                      data-testid="checkbox-hnoa"
                    />
                    <Label htmlFor="hnoaCoverage" className="cursor-pointer">
                      HNOA / Hire and Non-Owned Auto (1M CSL)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="workersCompensation"
                      checked={formData.workersCompensation}
                      onCheckedChange={(checked) => setFormData({ ...formData, workersCompensation: checked as boolean })}
                      data-testid="checkbox-workers-comp"
                    />
                    <Label htmlFor="workersCompensation" className="cursor-pointer">
                      Workers' Compensation
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="generalLiability"
                      checked={formData.generalLiability}
                      onCheckedChange={(checked) => setFormData({ ...formData, generalLiability: checked as boolean })}
                      data-testid="checkbox-general-liability"
                    />
                    <Label htmlFor="generalLiability" className="cursor-pointer">
                      General Liability
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="professionalLiability"
                      checked={formData.professionalLiability}
                      onCheckedChange={(checked) => setFormData({ ...formData, professionalLiability: checked as boolean })}
                      data-testid="checkbox-professional-liability"
                    />
                    <Label htmlFor="professionalLiability" className="cursor-pointer">
                      Professional Liability
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="umbrellaCoverage"
                      checked={formData.umbrellaCoverage}
                      onCheckedChange={(checked) => setFormData({ ...formData, umbrellaCoverage: checked as boolean })}
                      data-testid="checkbox-umbrella"
                    />
                    <Label htmlFor="umbrellaCoverage" className="cursor-pointer">
                      Umbrella Coverage
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="excessAutoLiability"
                      checked={formData.excessAutoLiability}
                      onCheckedChange={(checked) => setFormData({ ...formData, excessAutoLiability: checked as boolean })}
                      data-testid="checkbox-excess-auto-liability"
                    />
                    <Label htmlFor="excessAutoLiability" className="cursor-pointer">
                      Excess Auto Liability (up to $20,000,000)
                    </Label>
                  </div>
                </div>

                {formData.excessAutoLiability && (
                  <div className="mt-4">
                    <Label htmlFor="excessAutoLiabilityLimit">Excess Auto Liability Limit *</Label>
                    <Select
                      value={formData.excessAutoLiabilityLimit}
                      onValueChange={(value) => setFormData({ ...formData, excessAutoLiabilityLimit: value })}
                      required
                    >
                      <SelectTrigger data-testid="select-excess-auto-limit">
                        <SelectValue placeholder="Select limit amount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1000000">$1,000,000</SelectItem>
                        <SelectItem value="2000000">$2,000,000</SelectItem>
                        <SelectItem value="3000000">$3,000,000</SelectItem>
                        <SelectItem value="4000000">$4,000,000</SelectItem>
                        <SelectItem value="5000000">$5,000,000</SelectItem>
                        <SelectItem value="10000000">$10,000,000</SelectItem>
                        <SelectItem value="15000000">$15,000,000</SelectItem>
                        <SelectItem value="20000000">$20,000,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {formData.autoPhysicalDamage && (
                  <div className="mt-6 p-4 bg-muted/50 rounded-md space-y-4">
                    <p className="font-medium">Physical Damage Coverage Details</p>
                    
                    <div>
                      <Label htmlFor="physicalDamageDeductible">Deductible</Label>
                      <Select
                        value={formData.physicalDamageDeductible}
                        onValueChange={(value) => setFormData({ ...formData, physicalDamageDeductible: value })}
                      >
                        <SelectTrigger data-testid="select-pd-deductible">
                          <SelectValue placeholder="Select deductible" />
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

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="comprehensiveCoverage"
                          checked={formData.comprehensiveCoverage}
                          onCheckedChange={(checked) => setFormData({ ...formData, comprehensiveCoverage: checked as boolean })}
                          data-testid="checkbox-comprehensive"
                        />
                        <Label htmlFor="comprehensiveCoverage" className="cursor-pointer">
                          Comprehensive
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="collisionCoverage"
                          checked={formData.collisionCoverage}
                          onCheckedChange={(checked) => setFormData({ ...formData, collisionCoverage: checked as boolean })}
                          data-testid="checkbox-collision"
                        />
                        <Label htmlFor="collisionCoverage" className="cursor-pointer">
                          Collision
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="specifiedPerils"
                          checked={formData.specifiedPerils}
                          onCheckedChange={(checked) => setFormData({ ...formData, specifiedPerils: checked as boolean })}
                          data-testid="checkbox-specified-perils"
                        />
                        <Label htmlFor="specifiedPerils" className="cursor-pointer">
                          Specified Perils
                        </Label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 6: File Uploads & Additional Information */}
        {step === 6 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Required File Uploads</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Please upload the following documents to complete your application. Accepted formats: PDF, Excel (.xlsx, .xls), CSV
              </p>

              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div className="flex-1">
                      <Label htmlFor="vehicleList" className="text-base font-medium">Vehicle List / Schedule *</Label>
                      <p className="text-sm text-muted-foreground">Upload complete vehicle schedule with Year, Make, Model, VIN, GVW, Passenger Capacity</p>
                    </div>
                  </div>
                  <Input
                    id="vehicleList"
                    type="file"
                    accept=".pdf,.xlsx,.xls,.csv"
                    onChange={(e) => setVehicleFile(e.target.files?.[0] || null)}
                    className="mt-4"
                    data-testid="input-vehicle-file"
                  />
                  {vehicleFile && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>{vehicleFile.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setVehicleFile(null)}
                        data-testid="button-remove-vehicle-file"
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
                      <Label htmlFor="driverList" className="text-base font-medium">Driver List / Schedule *</Label>
                      <p className="text-sm text-muted-foreground">Upload complete driver schedule with Name, License #, Hire Date, DOB, Qualifications</p>
                    </div>
                  </div>
                  <Input
                    id="driverList"
                    type="file"
                    accept=".pdf,.xlsx,.xls,.csv"
                    onChange={(e) => setDriverFile(e.target.files?.[0] || null)}
                    className="mt-4"
                    data-testid="input-driver-file"
                  />
                  {driverFile && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>{driverFile.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setDriverFile(null)}
                        data-testid="button-remove-driver-file"
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
                      <Label htmlFor="lossRuns" className="text-base font-medium">5-Year Loss Runs *</Label>
                      <p className="text-sm text-muted-foreground">Upload 5-year loss run history from your current or prior insurance carrier</p>
                    </div>
                  </div>
                  <Input
                    id="lossRuns"
                    type="file"
                    accept=".pdf,.xlsx,.xls,.csv"
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
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
              <div>
                <Label htmlFor="briefOperationDescription">Brief Description of Operations</Label>
                <Textarea
                  id="briefOperationDescription"
                  value={formData.briefOperationDescription}
                  onChange={(e) => setFormData({ ...formData, briefOperationDescription: e.target.value })}
                  placeholder="Provide a brief description of your operations..."
                  rows={4}
                  data-testid="textarea-operation-description"
                />
              </div>

              <div className="mt-4">
                <Label htmlFor="additionalComments">Additional Comments or Questions</Label>
                <Textarea
                  id="additionalComments"
                  value={formData.additionalComments}
                  onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                  placeholder="Any additional information you'd like to provide..."
                  rows={4}
                  data-testid="textarea-additional-comments"
                />
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-900 p-4">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>Note:</strong> By submitting this application, you acknowledge that all information provided is accurate and complete to the best of your knowledge. Our underwriting team will review your application and contact you within 24-48 hours.
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
