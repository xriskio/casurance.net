import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, CheckCircle, Plus, X, Car, Users, Shield, Building2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SERVICE_STATES } from "@shared/constants/states";
import SEOHead from "@/components/SEOHead";

interface Vehicle {
  year: string;
  make: string;
  model: string;
  vin: string;
  seatingCapacity: string;
  value: string;
  vehicleType: string;
}

interface Driver {
  fullName: string;
  dateOfBirth: string;
  licenseNumber: string;
  licenseState: string;
  yearsExperience: string;
  dateOfHire: string;
  employmentType: string;
}

const SHARED_ECONOMY_SEGMENTS = [
  { value: "tnc", label: "Transportation Network Company (TNC)" },
  { value: "nemt", label: "Non-Emergency Medical Transit" },
  { value: "student-transport", label: "Student Transport" },
  { value: "dnc", label: "Delivery Network Company (DNC)" },
  { value: "rideshare-rental", label: "Rideshare Rental Operator" },
  { value: "p2p-rental", label: "Peer-to-Peer (P2P) Rental Operations" },
  { value: "vehicle-subscription", label: "Vehicle Subscription Model" },
  { value: "autonomous-vehicle", label: "Autonomous Vehicle Services" },
  { value: "scooter-ebike", label: "Shared Scooter or eBike Platform" },
  { value: "on-demand", label: "On-Demand Service Provider" },
  { value: "cannabis-delivery", label: "Cannabis Delivery" },
  { value: "1099-staffing", label: "1099 Staffing Agency / Aggregator" },
];

const COVERAGE_OPTIONS = [
  "Commercial Auto Insurance",
  "General Liability Insurance",
  "Occupational Accident Insurance",
  "Workers' Compensation",
  "Excess Liability & Umbrella",
  "Cargo Legal Liability",
  "Contingent Liability",
  "Property Insurance",
  "Garage Liability",
  "Garage Keepers Legal Liability",
  "Cyber Liability",
  "Directors & Officers Liability",
  "Employment Practices Liability",
  "Technology E&O",
  "Platform Liability",
];

export default function TNCQuote() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Company Information
    companyName: "",
    dba: "",
    contactName: "",
    email: "",
    phone: "",
    businessWebsite: "",
    yearsInBusiness: "",
    businessSegment: "",
    
    // Business Address
    mailingAddress: "",
    city: "",
    state: "",
    zipCode: "",
    
    // Operations
    operatingStates: [] as string[],
    fleetSize: "",
    activeDrivers: "",
    annualTrips: "",
    averageTripDistance: "",
    operatingHours: "",
    platformName: "",
    
    // Coverage Requested
    requestedCoverages: [] as string[],
    effectiveDate: "",
    liabilityLimit: "",
    currentCarrier: "",
    currentPremium: "",
    policyExpiration: "",
    
    // Technology Platform
    hasDriverApp: "",
    hasRiderApp: "",
    hasGPSTracking: "",
    hasDriverMonitoring: "",
    hasBackgroundChecks: "",
    backgroundCheckProvider: "",
    
    // Risk Management
    driverTrainingProgram: "",
    vehicleInspectionProgram: "",
    incidentReportingSystem: "",
    
    // Loss History
    priorClaims3Years: "",
    lossRunsAttached: "",
    lossHistory: "",
    
    // Additional Information
    additionalInfo: "",
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { year: "", make: "", model: "", vin: "", seatingCapacity: "", value: "", vehicleType: "" }
  ]);

  const [drivers, setDrivers] = useState<Driver[]>([
    { fullName: "", dateOfBirth: "", licenseNumber: "", licenseState: "", yearsExperience: "", dateOfHire: "", employmentType: "" }
  ]);

  const addVehicle = () => {
    if (vehicles.length < 10) {
      setVehicles([...vehicles, { year: "", make: "", model: "", vin: "", seatingCapacity: "", value: "", vehicleType: "" }]);
    }
  };

  const removeVehicle = (index: number) => {
    if (vehicles.length > 1) {
      setVehicles(vehicles.filter((_, i) => i !== index));
    }
  };

  const updateVehicle = (index: number, field: keyof Vehicle, value: string) => {
    const updated = [...vehicles];
    updated[index][field] = value;
    setVehicles(updated);
  };

  const addDriver = () => {
    if (drivers.length < 10) {
      setDrivers([...drivers, { fullName: "", dateOfBirth: "", licenseNumber: "", licenseState: "", yearsExperience: "", dateOfHire: "", employmentType: "" }]);
    }
  };

  const removeDriver = (index: number) => {
    if (drivers.length > 1) {
      setDrivers(drivers.filter((_, i) => i !== index));
    }
  };

  const updateDriver = (index: number, field: keyof Driver, value: string) => {
    const updated = [...drivers];
    updated[index][field] = value;
    setDrivers(updated);
  };

  const handleCoverageToggle = (coverage: string) => {
    setFormData(prev => ({
      ...prev,
      requestedCoverages: prev.requestedCoverages.includes(coverage)
        ? prev.requestedCoverages.filter(c => c !== coverage)
        : [...prev.requestedCoverages, coverage]
    }));
  };

  const handleStateToggle = (state: string) => {
    setFormData(prev => ({
      ...prev,
      operatingStates: prev.operatingStates.includes(state)
        ? prev.operatingStates.filter(s => s !== state)
        : [...prev.operatingStates, state]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/tnc-quotes", {
        ...formData,
        payload: { ...formData, vehicles, drivers }
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

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <SEOHead
          title="TNC & Shared Economy Insurance Quote | Casurance"
          description="Get comprehensive insurance coverage for Transportation Network Companies, rideshare, delivery, and shared economy businesses. Serving all 50 US states."
          canonical="/quote/tnc"
        />
        <Header />
        <main className="flex-1 py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Card>
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Shared Economy Quote Request Received!</h3>
                <p className="text-muted-foreground mb-4">
                  Thank you for your detailed submission.
                </p>
                <p className="text-lg font-semibold mb-2">
                  Reference Number: {referenceNumber}
                </p>
                <p className="text-muted-foreground mb-6">
                  One of our shared economy insurance specialists will review your information and contact you within 24 hours with a competitive quote.
                </p>
                <Button onClick={() => { setSubmitted(false); setStep(1); }} data-testid="button-submit-another">
                  Submit Another Request
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="TNC & Shared Economy Insurance Quote | Casurance"
        description="Get comprehensive insurance coverage for Transportation Network Companies, rideshare, delivery, and shared economy businesses. Serving all 50 US states."
        canonical="/quote/tnc"
      />
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              TNC & Shared Economy Insurance Quote
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get tailored insurance coverage for your Transportation Network Company, rideshare platform, 
              delivery service, or shared economy business. Complete this application to receive a customized quote.
            </p>
          </div>

          {/* Industry Segments Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <Car className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">TNC & Rideshare</p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <Building2 className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Delivery Networks</p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">P2P Platforms</p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">1099 Staffing</p>
            </div>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Shared Economy Insurance Quote Request</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Complete this comprehensive form to receive an accurate quote for your shared economy insurance needs.
              </p>
              <div className="flex gap-2 mt-4">
                {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                  <div
                    key={s}
                    className={`h-2 flex-1 rounded-full ${s <= step ? 'bg-primary' : 'bg-muted'}`}
                    data-testid={`progress-step-${s}`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Step {step} of 7</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Company Information */}
                {step === 1 && (
                  <div className="space-y-4" key="step-1">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      Company Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="Legal business name"
                          required
                          data-testid="input-company-name"
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
                          required
                          data-testid="input-contact-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Contact Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="email@example.com"
                          required
                          data-testid="input-email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Contact Phone *</Label>
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
                        <Label htmlFor="businessWebsite">Business Website</Label>
                        <Input
                          id="businessWebsite"
                          type="url"
                          value={formData.businessWebsite}
                          onChange={(e) => setFormData({ ...formData, businessWebsite: e.target.value })}
                          placeholder="https://www.example.com"
                          data-testid="input-website"
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
                          required
                          data-testid="input-years-in-business"
                        />
                      </div>
                      <div>
                        <Label htmlFor="businessSegment">Business Segment *</Label>
                        <Select
                          value={formData.businessSegment}
                          onValueChange={(value) => setFormData({ ...formData, businessSegment: value })}
                        >
                          <SelectTrigger data-testid="select-business-segment">
                            <SelectValue placeholder="Select your segment" />
                          </SelectTrigger>
                          <SelectContent>
                            {SHARED_ECONOMY_SEGMENTS.map((segment) => (
                              <SelectItem key={segment.value} value={segment.value}>
                                {segment.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="platformName">Platform/App Name</Label>
                      <Input
                        id="platformName"
                        value={formData.platformName}
                        onChange={(e) => setFormData({ ...formData, platformName: e.target.value })}
                        placeholder="e.g., MyRide, QuickDeliver"
                        data-testid="input-platform-name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="mailingAddress">Mailing Address *</Label>
                      <Input
                        id="mailingAddress"
                        value={formData.mailingAddress}
                        onChange={(e) => setFormData({ ...formData, mailingAddress: e.target.value })}
                        placeholder="Street address"
                        required
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
                          required
                          data-testid="input-city"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) => setFormData({ ...formData, state: value })}
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
                        <Label htmlFor="zipCode">Zip Code *</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                          placeholder="12345"
                          required
                          data-testid="input-zip-code"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Operations */}
                {step === 2 && (
                  <div className="space-y-4" key="step-2">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Car className="h-5 w-5 text-primary" />
                      Operations Details
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fleetSize">Fleet Size (Total Vehicles)</Label>
                        <Input
                          id="fleetSize"
                          type="number"
                          value={formData.fleetSize}
                          onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
                          placeholder="e.g., 50"
                          data-testid="input-fleet-size"
                        />
                      </div>
                      <div>
                        <Label htmlFor="activeDrivers">Active Drivers/Contractors</Label>
                        <Input
                          id="activeDrivers"
                          type="number"
                          value={formData.activeDrivers}
                          onChange={(e) => setFormData({ ...formData, activeDrivers: e.target.value })}
                          placeholder="e.g., 100"
                          data-testid="input-active-drivers"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="annualTrips">Annual Trips/Deliveries</Label>
                        <Input
                          id="annualTrips"
                          value={formData.annualTrips}
                          onChange={(e) => setFormData({ ...formData, annualTrips: e.target.value })}
                          placeholder="e.g., 500,000"
                          data-testid="input-annual-trips"
                        />
                      </div>
                      <div>
                        <Label htmlFor="averageTripDistance">Average Trip Distance (miles)</Label>
                        <Input
                          id="averageTripDistance"
                          value={formData.averageTripDistance}
                          onChange={(e) => setFormData({ ...formData, averageTripDistance: e.target.value })}
                          placeholder="e.g., 8"
                          data-testid="input-avg-trip-distance"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="operatingHours">Operating Hours</Label>
                      <Select
                        value={formData.operatingHours}
                        onValueChange={(value) => setFormData({ ...formData, operatingHours: value })}
                      >
                        <SelectTrigger data-testid="select-operating-hours">
                          <SelectValue placeholder="Select operating hours" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24-7">24/7 Operations</SelectItem>
                          <SelectItem value="extended">Extended Hours (5am-2am)</SelectItem>
                          <SelectItem value="daytime">Daytime Only (6am-10pm)</SelectItem>
                          <SelectItem value="business">Business Hours (9am-6pm)</SelectItem>
                          <SelectItem value="custom">Custom Schedule</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="mb-3 block">States of Operation (Select all that apply)</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto border rounded-md p-4">
                        {SERVICE_STATES.map((state) => (
                          <div key={state.value} className="flex items-center space-x-2">
                            <Checkbox
                              id={`state-${state.value}`}
                              checked={formData.operatingStates.includes(state.value)}
                              onCheckedChange={() => handleStateToggle(state.value)}
                              data-testid={`checkbox-state-${state.value}`}
                            />
                            <Label htmlFor={`state-${state.value}`} className="text-sm cursor-pointer">
                              {state.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Vehicles */}
                {step === 3 && (
                  <div className="space-y-4" key="step-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Car className="h-5 w-5 text-primary" />
                        Vehicle Schedule (Up to 10)
                      </h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addVehicle}
                        disabled={vehicles.length >= 10}
                        data-testid="button-add-vehicle"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Vehicle
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      Add representative vehicles from your fleet. For fleets larger than 10 vehicles, 
                      please provide a complete vehicle schedule in the additional information section.
                    </p>

                    {vehicles.map((vehicle, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Vehicle {index + 1}</h4>
                          {vehicles.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeVehicle(index)}
                              data-testid={`button-remove-vehicle-${index}`}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label>Vehicle Type</Label>
                            <Select
                              value={vehicle.vehicleType}
                              onValueChange={(value) => updateVehicle(index, "vehicleType", value)}
                            >
                              <SelectTrigger data-testid={`select-vehicle-type-${index}`}>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sedan">Sedan</SelectItem>
                                <SelectItem value="suv">SUV</SelectItem>
                                <SelectItem value="minivan">Minivan</SelectItem>
                                <SelectItem value="van">Van</SelectItem>
                                <SelectItem value="cargo-van">Cargo Van</SelectItem>
                                <SelectItem value="box-truck">Box Truck</SelectItem>
                                <SelectItem value="motorcycle">Motorcycle</SelectItem>
                                <SelectItem value="ebike">E-Bike</SelectItem>
                                <SelectItem value="scooter">Scooter</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Year</Label>
                            <Input
                              value={vehicle.year}
                              onChange={(e) => updateVehicle(index, "year", e.target.value)}
                              placeholder="2023"
                              data-testid={`input-vehicle-year-${index}`}
                            />
                          </div>
                          <div>
                            <Label>Make</Label>
                            <Input
                              value={vehicle.make}
                              onChange={(e) => updateVehicle(index, "make", e.target.value)}
                              placeholder="Toyota"
                              data-testid={`input-vehicle-make-${index}`}
                            />
                          </div>
                          <div>
                            <Label>Model</Label>
                            <Input
                              value={vehicle.model}
                              onChange={(e) => updateVehicle(index, "model", e.target.value)}
                              placeholder="Camry"
                              data-testid={`input-vehicle-model-${index}`}
                            />
                          </div>
                          <div>
                            <Label>VIN</Label>
                            <Input
                              value={vehicle.vin}
                              onChange={(e) => updateVehicle(index, "vin", e.target.value)}
                              placeholder="17-character VIN"
                              data-testid={`input-vehicle-vin-${index}`}
                            />
                          </div>
                          <div>
                            <Label>Seating Capacity</Label>
                            <Input
                              value={vehicle.seatingCapacity}
                              onChange={(e) => updateVehicle(index, "seatingCapacity", e.target.value)}
                              placeholder="4"
                              data-testid={`input-vehicle-seating-${index}`}
                            />
                          </div>
                          <div>
                            <Label>Stated Value ($)</Label>
                            <Input
                              value={vehicle.value}
                              onChange={(e) => updateVehicle(index, "value", e.target.value)}
                              placeholder="25000"
                              data-testid={`input-vehicle-value-${index}`}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Step 4: Drivers */}
                {step === 4 && (
                  <div className="space-y-4" key="step-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Driver Information (Up to 10)
                      </h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addDriver}
                        disabled={drivers.length >= 10}
                        data-testid="button-add-driver"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Driver
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      For operations with more than 10 drivers, please provide a complete driver roster 
                      in the additional information section.
                    </p>

                    {drivers.map((driver, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Driver {index + 1}</h4>
                          {drivers.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeDriver(index)}
                              data-testid={`button-remove-driver-${index}`}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label>Full Name</Label>
                            <Input
                              value={driver.fullName}
                              onChange={(e) => updateDriver(index, "fullName", e.target.value)}
                              placeholder="John Smith"
                              data-testid={`input-driver-name-${index}`}
                            />
                          </div>
                          <div>
                            <Label>Date of Birth</Label>
                            <Input
                              type="date"
                              value={driver.dateOfBirth}
                              onChange={(e) => updateDriver(index, "dateOfBirth", e.target.value)}
                              data-testid={`input-driver-dob-${index}`}
                            />
                          </div>
                          <div>
                            <Label>Employment Type</Label>
                            <Select
                              value={driver.employmentType}
                              onValueChange={(value) => updateDriver(index, "employmentType", value)}
                            >
                              <SelectTrigger data-testid={`select-driver-employment-${index}`}>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="employee">W-2 Employee</SelectItem>
                                <SelectItem value="contractor">1099 Contractor</SelectItem>
                                <SelectItem value="owner-operator">Owner Operator</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>License Number</Label>
                            <Input
                              value={driver.licenseNumber}
                              onChange={(e) => updateDriver(index, "licenseNumber", e.target.value)}
                              placeholder="DL Number"
                              data-testid={`input-driver-license-${index}`}
                            />
                          </div>
                          <div>
                            <Label>License State</Label>
                            <Select
                              value={driver.licenseState}
                              onValueChange={(value) => updateDriver(index, "licenseState", value)}
                            >
                              <SelectTrigger data-testid={`select-driver-license-state-${index}`}>
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
                            <Label>Years of Commercial Experience</Label>
                            <Input
                              value={driver.yearsExperience}
                              onChange={(e) => updateDriver(index, "yearsExperience", e.target.value)}
                              placeholder="3"
                              data-testid={`input-driver-experience-${index}`}
                            />
                          </div>
                          <div>
                            <Label>Date of Hire</Label>
                            <Input
                              type="date"
                              value={driver.dateOfHire}
                              onChange={(e) => updateDriver(index, "dateOfHire", e.target.value)}
                              data-testid={`input-driver-hire-date-${index}`}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Step 5: Technology & Risk Management */}
                {step === 5 && (
                  <div className="space-y-4" key="step-5">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Technology Platform & Risk Management
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="hasDriverApp">Driver Mobile App</Label>
                        <Select
                          value={formData.hasDriverApp}
                          onValueChange={(value) => setFormData({ ...formData, hasDriverApp: value })}
                        >
                          <SelectTrigger data-testid="select-driver-app">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes - Proprietary App</SelectItem>
                            <SelectItem value="third-party">Yes - Third Party</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="hasRiderApp">Customer/Rider App</Label>
                        <Select
                          value={formData.hasRiderApp}
                          onValueChange={(value) => setFormData({ ...formData, hasRiderApp: value })}
                        >
                          <SelectTrigger data-testid="select-rider-app">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes - Proprietary App</SelectItem>
                            <SelectItem value="third-party">Yes - Third Party</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="hasGPSTracking">GPS Tracking</Label>
                        <Select
                          value={formData.hasGPSTracking}
                          onValueChange={(value) => setFormData({ ...formData, hasGPSTracking: value })}
                        >
                          <SelectTrigger data-testid="select-gps-tracking">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes-all">Yes - All Vehicles</SelectItem>
                            <SelectItem value="yes-some">Yes - Some Vehicles</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="hasDriverMonitoring">Driver Behavior Monitoring</Label>
                        <Select
                          value={formData.hasDriverMonitoring}
                          onValueChange={(value) => setFormData({ ...formData, hasDriverMonitoring: value })}
                        >
                          <SelectTrigger data-testid="select-driver-monitoring">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes-telematics">Yes - Telematics</SelectItem>
                            <SelectItem value="yes-dashcam">Yes - Dashcam</SelectItem>
                            <SelectItem value="yes-both">Yes - Both</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="hasBackgroundChecks">Background Checks</Label>
                        <Select
                          value={formData.hasBackgroundChecks}
                          onValueChange={(value) => setFormData({ ...formData, hasBackgroundChecks: value })}
                        >
                          <SelectTrigger data-testid="select-background-checks">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes-all">Yes - All Drivers</SelectItem>
                            <SelectItem value="yes-new">Yes - New Hires Only</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="backgroundCheckProvider">Background Check Provider</Label>
                        <Input
                          id="backgroundCheckProvider"
                          value={formData.backgroundCheckProvider}
                          onChange={(e) => setFormData({ ...formData, backgroundCheckProvider: e.target.value })}
                          placeholder="e.g., Checkr, Sterling"
                          data-testid="input-background-provider"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="driverTrainingProgram">Driver Training Program</Label>
                      <Select
                        value={formData.driverTrainingProgram}
                        onValueChange={(value) => setFormData({ ...formData, driverTrainingProgram: value })}
                      >
                        <SelectTrigger data-testid="select-driver-training">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="comprehensive">Comprehensive (Initial + Ongoing)</SelectItem>
                          <SelectItem value="initial-only">Initial Training Only</SelectItem>
                          <SelectItem value="online-only">Online Training Only</SelectItem>
                          <SelectItem value="none">No Formal Program</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="vehicleInspectionProgram">Vehicle Inspection Program</Label>
                      <Select
                        value={formData.vehicleInspectionProgram}
                        onValueChange={(value) => setFormData({ ...formData, vehicleInspectionProgram: value })}
                      >
                        <SelectTrigger data-testid="select-vehicle-inspection">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily Pre-Trip Inspection</SelectItem>
                          <SelectItem value="weekly">Weekly Inspection</SelectItem>
                          <SelectItem value="monthly">Monthly Inspection</SelectItem>
                          <SelectItem value="annual">Annual Only</SelectItem>
                          <SelectItem value="none">No Formal Program</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="incidentReportingSystem">Incident Reporting System</Label>
                      <Select
                        value={formData.incidentReportingSystem}
                        onValueChange={(value) => setFormData({ ...formData, incidentReportingSystem: value })}
                      >
                        <SelectTrigger data-testid="select-incident-reporting">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="real-time">Real-Time Digital Reporting</SelectItem>
                          <SelectItem value="same-day">Same-Day Reporting</SelectItem>
                          <SelectItem value="manual">Manual/Paper-Based</SelectItem>
                          <SelectItem value="none">No Formal System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 6: Coverage Requested */}
                {step === 6 && (
                  <div className="space-y-4" key="step-6">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Coverage Requested
                    </h3>
                    
                    <div>
                      <Label className="mb-3 block">Select Coverage Types Needed</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {COVERAGE_OPTIONS.map((coverage) => (
                          <div key={coverage} className="flex items-center space-x-2">
                            <Checkbox
                              id={`coverage-${coverage}`}
                              checked={formData.requestedCoverages.includes(coverage)}
                              onCheckedChange={() => handleCoverageToggle(coverage)}
                              data-testid={`checkbox-coverage-${coverage.replace(/\s+/g, '-').toLowerCase()}`}
                            />
                            <Label htmlFor={`coverage-${coverage}`} className="text-sm cursor-pointer">
                              {coverage}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="effectiveDate">Requested Effective Date *</Label>
                        <Input
                          id="effectiveDate"
                          type="date"
                          value={formData.effectiveDate}
                          onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                          required
                          data-testid="input-effective-date"
                        />
                      </div>
                      <div>
                        <Label htmlFor="liabilityLimit">Desired Liability Limit</Label>
                        <Select
                          value={formData.liabilityLimit}
                          onValueChange={(value) => setFormData({ ...formData, liabilityLimit: value })}
                        >
                          <SelectTrigger data-testid="select-liability-limit">
                            <SelectValue placeholder="Select limit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="500000">$500,000</SelectItem>
                            <SelectItem value="1000000">$1,000,000</SelectItem>
                            <SelectItem value="2000000">$2,000,000</SelectItem>
                            <SelectItem value="5000000">$5,000,000</SelectItem>
                            <SelectItem value="10000000">$10,000,000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="currentCarrier">Current Insurance Carrier</Label>
                        <Input
                          id="currentCarrier"
                          value={formData.currentCarrier}
                          onChange={(e) => setFormData({ ...formData, currentCarrier: e.target.value })}
                          placeholder="Current carrier name"
                          data-testid="input-current-carrier"
                        />
                      </div>
                      <div>
                        <Label htmlFor="currentPremium">Current Annual Premium ($)</Label>
                        <Input
                          id="currentPremium"
                          value={formData.currentPremium}
                          onChange={(e) => setFormData({ ...formData, currentPremium: e.target.value })}
                          placeholder="e.g., 50000"
                          data-testid="input-current-premium"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="policyExpiration">Current Policy Expiration Date</Label>
                      <Input
                        id="policyExpiration"
                        type="date"
                        value={formData.policyExpiration}
                        onChange={(e) => setFormData({ ...formData, policyExpiration: e.target.value })}
                        data-testid="input-policy-expiration"
                      />
                    </div>

                    <div>
                      <Label htmlFor="priorClaims3Years">Claims in Past 3 Years</Label>
                      <Select
                        value={formData.priorClaims3Years}
                        onValueChange={(value) => setFormData({ ...formData, priorClaims3Years: value })}
                      >
                        <SelectTrigger data-testid="select-prior-claims">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="1-2">1-2 Claims</SelectItem>
                          <SelectItem value="3-5">3-5 Claims</SelectItem>
                          <SelectItem value="6+">6 or More Claims</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="lossHistory">Loss History Details</Label>
                      <Textarea
                        id="lossHistory"
                        value={formData.lossHistory}
                        onChange={(e) => setFormData({ ...formData, lossHistory: e.target.value })}
                        placeholder="Please describe any claims or losses in the past 5 years..."
                        rows={4}
                        data-testid="textarea-loss-history"
                      />
                    </div>
                  </div>
                )}

                {/* Step 7: Additional Information */}
                {step === 7 && (
                  <div className="space-y-4" key="step-7">
                    <h3 className="font-semibold text-lg">Additional Information</h3>
                    
                    <div>
                      <Label htmlFor="additionalInfo">Additional Comments or Information</Label>
                      <Textarea
                        id="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                        placeholder="Please provide any additional information that may be helpful for your quote, including complete vehicle schedules, driver rosters, or specific coverage requirements..."
                        rows={6}
                        data-testid="textarea-additional-info"
                      />
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">What happens next?</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>1. Our shared economy insurance specialists will review your submission</li>
                        <li>2. We may contact you for additional information if needed</li>
                        <li>3. You'll receive a customized quote within 24-48 business hours</li>
                        <li>4. A dedicated agent will be assigned to assist with your account</li>
                      </ul>
                    </div>

                    <div className="bg-primary/5 rounded-lg p-4">
                      <p className="text-sm">
                        By submitting this form, you consent to be contacted by Casurance regarding 
                        your insurance needs. Your information will be kept confidential and used solely 
                        for the purpose of providing you with an insurance quote.
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                      data-testid="button-previous"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                  ) : (
                    <div />
                  )}
                  
                  {step < 7 ? (
                    <Button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      data-testid="button-next"
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isLoading}
                      data-testid="button-submit"
                    >
                      {isLoading ? "Submitting..." : "Submit Quote Request"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
