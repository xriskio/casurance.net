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
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function GolfCountryClubQuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // General Club Information
    clubName: "",
    legalEntity: "",
    physicalAddress: "",
    city: "",
    state: "",
    zip: "",
    mailingAddress: "",
    mailingCity: "",
    mailingState: "",
    mailingZip: "",
    contactName: "",
    title: "",
    phone: "",
    email: "",
    website: "",
    yearsInOperation: "",
    clubType: "",
    ownership: "",
    numberOfMembers: "",
    annualRevenue: "",
    
    // Property Details
    acreage: "",
    numberOfHoles: "",
    parValue: "",
    courseRating: "",
    slopeRating: "",
    clubhouseSquareFootage: "",
    clubhouseValue: "",
    maintenanceFacilityValue: "",
    yearBuilt: "",
    lastRenovation: "",
    constructionType: "",
    roofType: "",
    roofAge: "",
    sprinklerSystem: "",
    securitySystem: "",
    
    // Tee to Green Property Coverage
    teeToGreenCoverage: "",
    coastalExposure: "",
    irrigationSystemValue: "",
    turfType: "",
    treeValue: "",
    pondLakeCount: "",
    
    // Coverage Selections
    propertyLimit: "",
    businessInterruption: "",
    crimeCoverage: "",
    crimeLimit: "",
    floodCoverage: "",
    floodZone: "",
    earthquakeCoverage: "",
    generalLiabilityLimit: "",
    errantGolfBallCoverage: "",
    liquorLiabilityLimit: "",
    professionalLiabilityLimit: "",
    commercialAutoLimit: "",
    hiredNonOwnedAuto: "",
    herbicidePesticideCoverage: "",
    umbrellaLimit: "",
    cyberLiabilityLimit: "",
    eplLimit: "",
    
    // Golf Operations
    annualRounds: "",
    publicPlay: "",
    publicPlayPercentage: "",
    golfCartCount: "",
    golfCartOwnership: "",
    golfCartAge: "",
    drivingRange: "",
    golfShop: "",
    golfShopRevenue: "",
    lessonsOffered: "",
    golfProfessionalCount: "",
    
    // Food & Beverage Operations
    restaurantBar: "",
    seatingCapacity: "",
    liquorLicense: "",
    liquorSalesPercentage: "",
    cateringServices: "",
    outsideCatering: "",
    
    // Tennis & Other Amenities
    tennisCourts: "",
    tennisCourtCount: "",
    tennisProfessionals: "",
    swimmingPool: "",
    poolType: "",
    fitnessFacility: "",
    spaServices: "",
    lodgingRooms: "",
    
    // Tournaments & Events
    tournamentsPerYear: "",
    largestTournamentSize: "",
    charityEvents: "",
    weddingsEvents: "",
    eventsPerYear: "",
    
    // Auto Fleet
    ownedVehicles: "",
    vehicleTypes: "",
    
    // Prior Insurance & Claims
    currentInsurer: "",
    currentPremium: "",
    expirationDate: "",
    claimsLast5Years: "",
    claimsDescription: "",
    priorDenialCancellation: "",
    
    // Risk Management
    safetyProgram: "",
    cartTraining: "",
    weatherPlan: "",
    lightningDetection: "",
    
    // Additional Information
    additionalComments: "",
  });

  const [amenities, setAmenities] = useState({
    practiceGreen: false,
    chippingArea: false,
    bunkerPractice: false,
    proShop: false,
    cartStorage: false,
    lockerRooms: false,
    privateEvents: false,
    weddings: false,
    banquetFacility: false,
    outdoorPatios: false,
    memberDining: false,
    publicDining: false,
    bar: false,
    packageStore: false,
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/golf-country-club-quotes", {
        clubName: formData.clubName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zip,
        clubType: formData.clubType,
        numberOfHoles: formData.numberOfHoles,
        acreage: formData.acreage,
        annualRevenue: formData.annualRevenue,
        generalLiabilityLimit: formData.generalLiabilityLimit,
        payload: { ...formData, amenities },
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted",
        description: "We've received your Golf & Country Club insurance quote request. Our team will review and contact you shortly.",
      });
      setSubmitted(true);
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setAmenities(prev => ({ ...prev, [amenity]: !prev[amenity as keyof typeof amenities] }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.clubName || !formData.contactName || !formData.email || !formData.phone) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields: Club Name, Contact Name, Email, and Phone.",
        variant: "destructive",
      });
      return;
    }

    submitMutation.mutate();
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">Step {step} of 8</span>
        <span className="text-sm text-muted-foreground">{Math.round((step / 8) * 100)}% Complete</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div 
          className="bg-primary rounded-full h-2 transition-all duration-300" 
          style={{ width: `${(step / 8) * 100}%` }}
        />
      </div>
    </div>
  );

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">Application Submitted Successfully!</h3>
          <p className="text-muted-foreground mb-6">
            Thank you for your interest in Golf & Country Club insurance. One of our specialized agents will review your application and contact you within 24 hours with a competitive quote tailored to your club's unique needs.
          </p>
          <Button onClick={() => { setSubmitted(false); setStep(1); }} data-testid="button-submit-another">
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Golf & Country Club Insurance Application</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Complete this comprehensive application to receive a tailored insurance quote for your golf course or country club.
          </p>
        </CardHeader>
        <CardContent>
          {renderProgressBar()}

          {/* Step 1: General Club Information */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">General Club Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="clubName">Club Name *</Label>
                  <Input
                    id="clubName"
                    value={formData.clubName}
                    onChange={(e) => handleInputChange("clubName", e.target.value)}
                    data-testid="input-club-name"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="legalEntity">Legal Entity Name *</Label>
                  <Input
                    id="legalEntity"
                    value={formData.legalEntity}
                    onChange={(e) => handleInputChange("legalEntity", e.target.value)}
                    data-testid="input-legal-entity"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="physicalAddress">Physical Address *</Label>
                  <Input
                    id="physicalAddress"
                    value={formData.physicalAddress}
                    onChange={(e) => handleInputChange("physicalAddress", e.target.value)}
                    data-testid="input-physical-address"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    data-testid="input-city"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="state">State *</Label>
                  <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                    <SelectTrigger id="state" data-testid="select-state">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="NV">Nevada</SelectItem>
                      <SelectItem value="AZ">Arizona</SelectItem>
                      <SelectItem value="OR">Oregon</SelectItem>
                      <SelectItem value="OH">Ohio</SelectItem>
                      <SelectItem value="IL">Illinois</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="NJ">New Jersey</SelectItem>
                      <SelectItem value="PA">Pennsylvania</SelectItem>
                      <SelectItem value="NC">North Carolina</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                      <SelectItem value="AR">Arkansas</SelectItem>
                      <SelectItem value="MO">Missouri</SelectItem>
                      <SelectItem value="CO">Colorado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="zip">ZIP Code *</Label>
                  <Input
                    id="zip"
                    value={formData.zip}
                    onChange={(e) => handleInputChange("zip", e.target.value)}
                    data-testid="input-zip"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contactName">Contact Name *</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange("contactName", e.target.value)}
                    data-testid="input-contact-name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., General Manager, Club President"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    data-testid="input-title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    data-testid="input-phone"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    data-testid="input-email"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://www.yourclub.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    data-testid="input-website"
                  />
                </div>

                <div>
                  <Label htmlFor="clubType">Club Type *</Label>
                  <Select value={formData.clubType} onValueChange={(value) => handleInputChange("clubType", value)}>
                    <SelectTrigger id="clubType" data-testid="select-club-type">
                      <SelectValue placeholder="Select club type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private Country Club</SelectItem>
                      <SelectItem value="semi-private">Semi-Private Golf Club</SelectItem>
                      <SelectItem value="daily-fee">Daily Fee / Public Course</SelectItem>
                      <SelectItem value="resort">Resort Golf Course</SelectItem>
                      <SelectItem value="municipal">Municipal Golf Course</SelectItem>
                      <SelectItem value="golf-community">Golf Course Community</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="ownership">Ownership Structure *</Label>
                  <Select value={formData.ownership} onValueChange={(value) => handleInputChange("ownership", value)}>
                    <SelectTrigger id="ownership" data-testid="select-ownership">
                      <SelectValue placeholder="Select ownership" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member-owned">Member Owned</SelectItem>
                      <SelectItem value="investor-owned">Investor Owned</SelectItem>
                      <SelectItem value="for-profit">For-Profit Corporation</SelectItem>
                      <SelectItem value="non-profit">Non-Profit Corporation</SelectItem>
                      <SelectItem value="municipal">Municipal/Government</SelectItem>
                      <SelectItem value="management-company">Management Company Operated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="yearsInOperation">Years in Operation *</Label>
                  <Input
                    id="yearsInOperation"
                    type="number"
                    value={formData.yearsInOperation}
                    onChange={(e) => handleInputChange("yearsInOperation", e.target.value)}
                    data-testid="input-years-operation"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="numberOfMembers">Number of Members</Label>
                  <Input
                    id="numberOfMembers"
                    type="number"
                    placeholder="For private/semi-private clubs"
                    value={formData.numberOfMembers}
                    onChange={(e) => handleInputChange("numberOfMembers", e.target.value)}
                    data-testid="input-members"
                  />
                </div>

                <div>
                  <Label htmlFor="annualRevenue">Annual Revenue *</Label>
                  <Input
                    id="annualRevenue"
                    type="number"
                    placeholder="Total gross revenue"
                    value={formData.annualRevenue}
                    onChange={(e) => handleInputChange("annualRevenue", e.target.value)}
                    data-testid="input-revenue"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Property & Course Details */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Property & Course Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="acreage">Total Acreage *</Label>
                  <Input
                    id="acreage"
                    type="number"
                    placeholder="e.g., 150"
                    value={formData.acreage}
                    onChange={(e) => handleInputChange("acreage", e.target.value)}
                    data-testid="input-acreage"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="numberOfHoles">Number of Holes *</Label>
                  <Select value={formData.numberOfHoles} onValueChange={(value) => handleInputChange("numberOfHoles", value)}>
                    <SelectTrigger id="numberOfHoles" data-testid="select-holes">
                      <SelectValue placeholder="Select holes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9">9 Holes</SelectItem>
                      <SelectItem value="18">18 Holes</SelectItem>
                      <SelectItem value="27">27 Holes</SelectItem>
                      <SelectItem value="36">36 Holes</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="parValue">Par *</Label>
                  <Input
                    id="parValue"
                    type="number"
                    placeholder="e.g., 72"
                    value={formData.parValue}
                    onChange={(e) => handleInputChange("parValue", e.target.value)}
                    data-testid="input-par"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="courseRating">Course Rating</Label>
                  <Input
                    id="courseRating"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 72.5"
                    value={formData.courseRating}
                    onChange={(e) => handleInputChange("courseRating", e.target.value)}
                    data-testid="input-course-rating"
                  />
                </div>

                <div>
                  <Label htmlFor="slopeRating">Slope Rating</Label>
                  <Input
                    id="slopeRating"
                    type="number"
                    placeholder="e.g., 135"
                    value={formData.slopeRating}
                    onChange={(e) => handleInputChange("slopeRating", e.target.value)}
                    data-testid="input-slope-rating"
                  />
                </div>

                <div>
                  <Label htmlFor="clubhouseSquareFootage">Clubhouse Square Footage *</Label>
                  <Input
                    id="clubhouseSquareFootage"
                    type="number"
                    placeholder="e.g., 15000"
                    value={formData.clubhouseSquareFootage}
                    onChange={(e) => handleInputChange("clubhouseSquareFootage", e.target.value)}
                    data-testid="input-clubhouse-sqft"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="clubhouseValue">Clubhouse Replacement Value *</Label>
                  <Input
                    id="clubhouseValue"
                    type="number"
                    placeholder="Estimated rebuild cost"
                    value={formData.clubhouseValue}
                    onChange={(e) => handleInputChange("clubhouseValue", e.target.value)}
                    data-testid="input-clubhouse-value"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="maintenanceFacilityValue">Maintenance Facility Value</Label>
                  <Input
                    id="maintenanceFacilityValue"
                    type="number"
                    placeholder="Equipment barns, storage"
                    value={formData.maintenanceFacilityValue}
                    onChange={(e) => handleInputChange("maintenanceFacilityValue", e.target.value)}
                    data-testid="input-maintenance-value"
                  />
                </div>

                <div>
                  <Label htmlFor="yearBuilt">Year Built *</Label>
                  <Input
                    id="yearBuilt"
                    type="number"
                    placeholder="e.g., 1985"
                    value={formData.yearBuilt}
                    onChange={(e) => handleInputChange("yearBuilt", e.target.value)}
                    data-testid="input-year-built"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="lastRenovation">Last Major Renovation</Label>
                  <Input
                    id="lastRenovation"
                    type="number"
                    placeholder="Year of last renovation"
                    value={formData.lastRenovation}
                    onChange={(e) => handleInputChange("lastRenovation", e.target.value)}
                    data-testid="input-renovation"
                  />
                </div>

                <div>
                  <Label htmlFor="constructionType">Construction Type *</Label>
                  <Select value={formData.constructionType} onValueChange={(value) => handleInputChange("constructionType", value)}>
                    <SelectTrigger id="constructionType" data-testid="select-construction">
                      <SelectValue placeholder="Select construction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frame">Frame</SelectItem>
                      <SelectItem value="masonry">Masonry</SelectItem>
                      <SelectItem value="fire-resistive">Fire Resistive</SelectItem>
                      <SelectItem value="non-combustible">Non-Combustible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="roofType">Roof Type *</Label>
                  <Select value={formData.roofType} onValueChange={(value) => handleInputChange("roofType", value)}>
                    <SelectTrigger id="roofType" data-testid="select-roof">
                      <SelectValue placeholder="Select roof type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asphalt-shingle">Asphalt Shingle</SelectItem>
                      <SelectItem value="metal">Metal</SelectItem>
                      <SelectItem value="tile">Tile</SelectItem>
                      <SelectItem value="slate">Slate</SelectItem>
                      <SelectItem value="flat-built-up">Flat/Built-Up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="roofAge">Roof Age (Years) *</Label>
                  <Input
                    id="roofAge"
                    type="number"
                    value={formData.roofAge}
                    onChange={(e) => handleInputChange("roofAge", e.target.value)}
                    data-testid="input-roof-age"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="sprinklerSystem">Fire Sprinkler System? *</Label>
                  <RadioGroup value={formData.sprinklerSystem} onValueChange={(value) => handleInputChange("sprinklerSystem", value)}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="sprinkler-yes" data-testid="radio-sprinkler-yes" />
                        <Label htmlFor="sprinkler-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="partial" id="sprinkler-partial" data-testid="radio-sprinkler-partial" />
                        <Label htmlFor="sprinkler-partial">Partial</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="sprinkler-no" data-testid="radio-sprinkler-no" />
                        <Label htmlFor="sprinkler-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="securitySystem">Security System? *</Label>
                  <RadioGroup value={formData.securitySystem} onValueChange={(value) => handleInputChange("securitySystem", value)}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monitored" id="security-monitored" data-testid="radio-security-monitored" />
                        <Label htmlFor="security-monitored">Monitored</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="local" id="security-local" data-testid="radio-security-local" />
                        <Label htmlFor="security-local">Local Only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="none" id="security-none" data-testid="radio-security-none" />
                        <Label htmlFor="security-none">None</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-foreground mb-3">Course Amenities</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(amenities).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`amenity-${key}`}
                        checked={value}
                        onCheckedChange={() => handleAmenityToggle(key)}
                        data-testid={`checkbox-amenity-${key}`}
                      />
                      <Label 
                        htmlFor={`amenity-${key}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Tee to Green & Property Coverage */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Tee to Green & Property Coverage</h3>
              <p className="text-sm text-muted-foreground">
                Specialized coverage for outdoor playing surfaces, turf, trees, and golf course infrastructure.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="teeToGreenCoverage">Tee to Green Coverage Needed? *</Label>
                  <RadioGroup value={formData.teeToGreenCoverage} onValueChange={(value) => handleInputChange("teeToGreenCoverage", value)}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="ttg-yes" data-testid="radio-ttg-yes" />
                        <Label htmlFor="ttg-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="ttg-no" data-testid="radio-ttg-no" />
                        <Label htmlFor="ttg-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="coastalExposure">Coastal Exposure? *</Label>
                  <RadioGroup value={formData.coastalExposure} onValueChange={(value) => handleInputChange("coastalExposure", value)}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="coastal" id="coastal-yes" data-testid="radio-coastal-yes" />
                        <Label htmlFor="coastal-yes">Coastal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="inland" id="coastal-inland" data-testid="radio-coastal-inland" />
                        <Label htmlFor="coastal-inland">Inland</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="irrigationSystemValue">Irrigation System Value *</Label>
                  <Input
                    id="irrigationSystemValue"
                    type="number"
                    placeholder="Replacement cost of irrigation"
                    value={formData.irrigationSystemValue}
                    onChange={(e) => handleInputChange("irrigationSystemValue", e.target.value)}
                    data-testid="input-irrigation-value"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="turfType">Turf Type *</Label>
                  <Input
                    id="turfType"
                    placeholder="e.g., Bentgrass, Bermuda"
                    value={formData.turfType}
                    onChange={(e) => handleInputChange("turfType", e.target.value)}
                    data-testid="input-turf-type"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="treeValue">Estimated Tree Value</Label>
                  <Input
                    id="treeValue"
                    type="number"
                    placeholder="Mature specimen trees"
                    value={formData.treeValue}
                    onChange={(e) => handleInputChange("treeValue", e.target.value)}
                    data-testid="input-tree-value"
                  />
                </div>

                <div>
                  <Label htmlFor="pondLakeCount">Number of Ponds/Lakes</Label>
                  <Input
                    id="pondLakeCount"
                    type="number"
                    value={formData.pondLakeCount}
                    onChange={(e) => handleInputChange("pondLakeCount", e.target.value)}
                    data-testid="input-pond-count"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="propertyLimit">Total Property Limit Requested *</Label>
                  <Select value={formData.propertyLimit} onValueChange={(value) => handleInputChange("propertyLimit", value)}>
                    <SelectTrigger id="propertyLimit" data-testid="select-property-limit">
                      <SelectValue placeholder="Select limit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1000000">$1,000,000</SelectItem>
                      <SelectItem value="2000000">$2,000,000</SelectItem>
                      <SelectItem value="3000000">$3,000,000</SelectItem>
                      <SelectItem value="5000000">$5,000,000</SelectItem>
                      <SelectItem value="10000000">$10,000,000</SelectItem>
                      <SelectItem value="other">Other (specify in comments)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="businessInterruption">Business Interruption Coverage? *</Label>
                  <RadioGroup value={formData.businessInterruption} onValueChange={(value) => handleInputChange("businessInterruption", value)}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="bi-yes" data-testid="radio-bi-yes" />
                        <Label htmlFor="bi-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="bi-no" data-testid="radio-bi-no" />
                        <Label htmlFor="bi-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="crimeCoverage">Crime Coverage? *</Label>
                  <RadioGroup value={formData.crimeCoverage} onValueChange={(value) => handleInputChange("crimeCoverage", value)}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="crime-yes" data-testid="radio-crime-yes" />
                        <Label htmlFor="crime-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="crime-no" data-testid="radio-crime-no" />
                        <Label htmlFor="crime-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {formData.crimeCoverage === "yes" && (
                  <div>
                    <Label htmlFor="crimeLimit">Crime Coverage Limit</Label>
                    <Select value={formData.crimeLimit} onValueChange={(value) => handleInputChange("crimeLimit", value)}>
                      <SelectTrigger id="crimeLimit" data-testid="select-crime-limit">
                        <SelectValue placeholder="Select limit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25000">$25,000</SelectItem>
                        <SelectItem value="50000">$50,000</SelectItem>
                        <SelectItem value="100000">$100,000</SelectItem>
                        <SelectItem value="250000">$250,000</SelectItem>
                        <SelectItem value="500000">$500,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label htmlFor="floodCoverage">Flood Coverage Needed? *</Label>
                  <RadioGroup value={formData.floodCoverage} onValueChange={(value) => handleInputChange("floodCoverage", value)}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="flood-yes" data-testid="radio-flood-yes" />
                        <Label htmlFor="flood-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="flood-no" data-testid="radio-flood-no" />
                        <Label htmlFor="flood-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {formData.floodCoverage === "yes" && (
                  <div>
                    <Label htmlFor="floodZone">Flood Zone</Label>
                    <Input
                      id="floodZone"
                      placeholder="e.g., Zone A, Zone X"
                      value={formData.floodZone}
                      onChange={(e) => handleInputChange("floodZone", e.target.value)}
                      data-testid="input-flood-zone"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="earthquakeCoverage">Earthquake Coverage? *</Label>
                  <RadioGroup value={formData.earthquakeCoverage} onValueChange={(value) => handleInputChange("earthquakeCoverage", value)}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="eq-yes" data-testid="radio-eq-yes" />
                        <Label htmlFor="eq-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="eq-no" data-testid="radio-eq-no" />
                        <Label htmlFor="eq-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Golf Operations */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Golf Operations</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="annualRounds">Annual Rounds Played *</Label>
                  <Input
                    id="annualRounds"
                    type="number"
                    placeholder="e.g., 35000"
                    value={formData.annualRounds}
                    onChange={(e) => handleInputChange("annualRounds", e.target.value)}
                    data-testid="input-annual-rounds"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="publicPlay">Public Play Permitted? *</Label>
                  <RadioGroup value={formData.publicPlay} onValueChange={(value) => handleInputChange("publicPlay", value)}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="public-yes" data-testid="radio-public-yes" />
                        <Label htmlFor="public-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="public-no" data-testid="radio-public-no" />
                        <Label htmlFor="public-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {formData.publicPlay === "yes" && (
                  <div>
                    <Label htmlFor="publicPlayPercentage">Public Play Percentage</Label>
                    <Input
                      id="publicPlayPercentage"
                      type="number"
                      placeholder="e.g., 30"
                      value={formData.publicPlayPercentage}
                      onChange={(e) => handleInputChange("publicPlayPercentage", e.target.value)}
                      data-testid="input-public-percentage"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="golfCartCount">Golf Cart Count *</Label>
                  <Input
                    id="golfCartCount"
                    type="number"
                    value={formData.golfCartCount}
                    onChange={(e) => handleInputChange("golfCartCount", e.target.value)}
                    data-testid="input-cart-count"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="golfCartOwnership">Cart Ownership *</Label>
                  <Select value={formData.golfCartOwnership} onValueChange={(value) => handleInputChange("golfCartOwnership", value)}>
                    <SelectTrigger id="golfCartOwnership" data-testid="select-cart-ownership">
                      <SelectValue placeholder="Select ownership" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owned">Owned</SelectItem>
                      <SelectItem value="leased">Leased</SelectItem>
                      <SelectItem value="both">Both Owned and Leased</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="golfCartAge">Average Cart Age (Years)</Label>
                  <Input
                    id="golfCartAge"
                    type="number"
                    value={formData.golfCartAge}
                    onChange={(e) => handleInputChange("golfCartAge", e.target.value)}
                    data-testid="input-cart-age"
                  />
                </div>

                <div>
                  <Label htmlFor="drivingRange">Driving Range? *</Label>
                  <RadioGroup value={formData.drivingRange} onValueChange={(value) => handleInputChange("drivingRange", value)}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="range-yes" data-testid="radio-range-yes" />
                        <Label htmlFor="range-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="range-no" data-testid="radio-range-no" />
                        <Label htmlFor="range-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="golfShop">Golf Shop/Pro Shop? *</Label>
                  <RadioGroup value={formData.golfShop} onValueChange={(value) => handleInputChange("golfShop", value)}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="shop-yes" data-testid="radio-shop-yes" />
                        <Label htmlFor="shop-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="shop-no" data-testid="radio-shop-no" />
                        <Label htmlFor="shop-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {formData.golfShop === "yes" && (
                  <div>
                    <Label htmlFor="golfShopRevenue">Annual Pro Shop Revenue</Label>
                    <Input
                      id="golfShopRevenue"
                      type="number"
                      value={formData.golfShopRevenue}
                      onChange={(e) => handleInputChange("golfShopRevenue", e.target.value)}
                      data-testid="input-shop-revenue"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="lessonsOffered">Golf Lessons Offered? *</Label>
                  <RadioGroup value={formData.lessonsOffered} onValueChange={(value) => handleInputChange("lessonsOffered", value)}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="lessons-yes" data-testid="radio-lessons-yes" />
                        <Label htmlFor="lessons-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="lessons-no" data-testid="radio-lessons-no" />
                        <Label htmlFor="lessons-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {formData.lessonsOffered === "yes" && (
                  <div>
                    <Label htmlFor="golfProfessionalCount">Number of Golf Professionals</Label>
                    <Input
                      id="golfProfessionalCount"
                      type="number"
                      placeholder="PGA/LPGA professionals"
                      value={formData.golfProfessionalCount}
                      onChange={(e) => handleInputChange("golfProfessionalCount", e.target.value)}
                      data-testid="input-pro-count"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="tournamentsPerYear">Tournaments Per Year</Label>
                  <Input
                    id="tournamentsPerYear"
                    type="number"
                    value={formData.tournamentsPerYear}
                    onChange={(e) => handleInputChange("tournamentsPerYear", e.target.value)}
                    data-testid="input-tournaments"
                  />
                </div>

                <div>
                  <Label htmlFor="largestTournamentSize">Largest Tournament Size</Label>
                  <Input
                    id="largestTournamentSize"
                    type="number"
                    placeholder="Number of participants"
                    value={formData.largestTournamentSize}
                    onChange={(e) => handleInputChange("largestTournamentSize", e.target.value)}
                    data-testid="input-tournament-size"
                  />
                </div>

                <div>
                  <Label htmlFor="charityEvents">Charity Events Hosted?</Label>
                  <RadioGroup value={formData.charityEvents} onValueChange={(value) => handleInputChange("charityEvents", value)}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="charity-yes" data-testid="radio-charity-yes" />
                        <Label htmlFor="charity-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="charity-no" data-testid="radio-charity-no" />
                        <Label htmlFor="charity-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Liability Coverage & Food/Beverage */}
          {step === 5 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Liability Coverage & Food/Beverage Operations</h3>
              
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">General Liability</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="generalLiabilityLimit">General Liability Limit *</Label>
                    <Select value={formData.generalLiabilityLimit} onValueChange={(value) => handleInputChange("generalLiabilityLimit", value)}>
                      <SelectTrigger id="generalLiabilityLimit" data-testid="select-gl-limit">
                        <SelectValue placeholder="Select limit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1000000">$1,000,000</SelectItem>
                        <SelectItem value="2000000">$2,000,000</SelectItem>
                        <SelectItem value="3000000">$3,000,000</SelectItem>
                        <SelectItem value="5000000">$5,000,000</SelectItem>
                        <SelectItem value="10000000">$10,000,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="errantGolfBallCoverage">Errant Golf Ball Coverage? *</Label>
                    <RadioGroup value={formData.errantGolfBallCoverage} onValueChange={(value) => handleInputChange("errantGolfBallCoverage", value)}>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="golfball-yes" data-testid="radio-golfball-yes" />
                          <Label htmlFor="golfball-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="golfball-no" data-testid="radio-golfball-no" />
                          <Label htmlFor="golfball-no">No</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="professionalLiabilityLimit">Professional Liability Limit</Label>
                    <Select value={formData.professionalLiabilityLimit} onValueChange={(value) => handleInputChange("professionalLiabilityLimit", value)}>
                      <SelectTrigger id="professionalLiabilityLimit" data-testid="select-prof-liability">
                        <SelectValue placeholder="For golf/tennis pros" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not-needed">Not Needed</SelectItem>
                        <SelectItem value="500000">$500,000</SelectItem>
                        <SelectItem value="1000000">$1,000,000</SelectItem>
                        <SelectItem value="2000000">$2,000,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="herbicidePesticideCoverage">Herbicide/Pesticide Coverage? *</Label>
                    <RadioGroup value={formData.herbicidePesticideCoverage} onValueChange={(value) => handleInputChange("herbicidePesticideCoverage", value)}>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="pesticide-yes" data-testid="radio-pesticide-yes" />
                          <Label htmlFor="pesticide-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="pesticide-no" data-testid="radio-pesticide-no" />
                          <Label htmlFor="pesticide-no">No</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="umbrellaLimit">Umbrella/Excess Liability *</Label>
                    <Select value={formData.umbrellaLimit} onValueChange={(value) => handleInputChange("umbrellaLimit", value)}>
                      <SelectTrigger id="umbrellaLimit" data-testid="select-umbrella">
                        <SelectValue placeholder="Select limit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not-needed">Not Needed</SelectItem>
                        <SelectItem value="1000000">$1,000,000</SelectItem>
                        <SelectItem value="2000000">$2,000,000</SelectItem>
                        <SelectItem value="5000000">$5,000,000</SelectItem>
                        <SelectItem value="10000000">$10,000,000</SelectItem>
                        <SelectItem value="25000000">$25,000,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium text-foreground">Food & Beverage Operations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="restaurantBar">Restaurant/Bar On-Site? *</Label>
                    <RadioGroup value={formData.restaurantBar} onValueChange={(value) => handleInputChange("restaurantBar", value)}>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="restaurant-yes" data-testid="radio-restaurant-yes" />
                          <Label htmlFor="restaurant-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="restaurant-no" data-testid="radio-restaurant-no" />
                          <Label htmlFor="restaurant-no">No</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.restaurantBar === "yes" && (
                    <>
                      <div>
                        <Label htmlFor="seatingCapacity">Seating Capacity</Label>
                        <Input
                          id="seatingCapacity"
                          type="number"
                          value={formData.seatingCapacity}
                          onChange={(e) => handleInputChange("seatingCapacity", e.target.value)}
                          data-testid="input-seating"
                        />
                      </div>

                      <div>
                        <Label htmlFor="liquorLicense">Liquor License? *</Label>
                        <RadioGroup value={formData.liquorLicense} onValueChange={(value) => handleInputChange("liquorLicense", value)}>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="liquor-yes" data-testid="radio-liquor-yes" />
                              <Label htmlFor="liquor-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="liquor-no" data-testid="radio-liquor-no" />
                              <Label htmlFor="liquor-no">No</Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      {formData.liquorLicense === "yes" && (
                        <>
                          <div>
                            <Label htmlFor="liquorSalesPercentage">Liquor Sales % of Food/Bev Revenue</Label>
                            <Input
                              id="liquorSalesPercentage"
                              type="number"
                              placeholder="e.g., 30"
                              value={formData.liquorSalesPercentage}
                              onChange={(e) => handleInputChange("liquorSalesPercentage", e.target.value)}
                              data-testid="input-liquor-percentage"
                            />
                          </div>

                          <div>
                            <Label htmlFor="liquorLiabilityLimit">Liquor Liability Limit *</Label>
                            <Select value={formData.liquorLiabilityLimit} onValueChange={(value) => handleInputChange("liquorLiabilityLimit", value)}>
                              <SelectTrigger id="liquorLiabilityLimit" data-testid="select-liquor-limit">
                                <SelectValue placeholder="Select limit" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1000000">$1,000,000</SelectItem>
                                <SelectItem value="2000000">$2,000,000</SelectItem>
                                <SelectItem value="3000000">$3,000,000</SelectItem>
                                <SelectItem value="5000000">$5,000,000</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}

                      <div>
                        <Label htmlFor="cateringServices">Catering Services Offered?</Label>
                        <RadioGroup value={formData.cateringServices} onValueChange={(value) => handleInputChange("cateringServices", value)}>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="catering-yes" data-testid="radio-catering-yes" />
                              <Label htmlFor="catering-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="catering-no" data-testid="radio-catering-no" />
                              <Label htmlFor="catering-no">No</Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      <div>
                        <Label htmlFor="outsideCatering">Outside Catering Permitted?</Label>
                        <RadioGroup value={formData.outsideCatering} onValueChange={(value) => handleInputChange("outsideCatering", value)}>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="outside-catering-yes" data-testid="radio-outside-catering-yes" />
                              <Label htmlFor="outside-catering-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="outside-catering-no" data-testid="radio-outside-catering-no" />
                              <Label htmlFor="outside-catering-no">No</Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                    </>
                  )}

                  <div>
                    <Label htmlFor="weddingsEvents">Weddings/Special Events? *</Label>
                    <RadioGroup value={formData.weddingsEvents} onValueChange={(value) => handleInputChange("weddingsEvents", value)}>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="weddings-yes" data-testid="radio-weddings-yes" />
                          <Label htmlFor="weddings-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="weddings-no" data-testid="radio-weddings-no" />
                          <Label htmlFor="weddings-no">No</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.weddingsEvents === "yes" && (
                    <div>
                      <Label htmlFor="eventsPerYear">Events Per Year</Label>
                      <Input
                        id="eventsPerYear"
                        type="number"
                        value={formData.eventsPerYear}
                        onChange={(e) => handleInputChange("eventsPerYear", e.target.value)}
                        data-testid="input-events"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Tennis & Other Amenities */}
          {step === 6 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Tennis & Additional Amenities</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tennisCourts">Tennis Courts? *</Label>
                  <RadioGroup value={formData.tennisCourts} onValueChange={(value) => handleInputChange("tennisCourts", value)}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="tennis-yes" data-testid="radio-tennis-yes" />
                        <Label htmlFor="tennis-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="tennis-no" data-testid="radio-tennis-no" />
                        <Label htmlFor="tennis-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {formData.tennisCourts === "yes" && (
                  <>
                    <div>
                      <Label htmlFor="tennisCourtCount">Number of Tennis Courts</Label>
                      <Input
                        id="tennisCourtCount"
                        type="number"
                        value={formData.tennisCourtCount}
                        onChange={(e) => handleInputChange("tennisCourtCount", e.target.value)}
                        data-testid="input-tennis-count"
                      />
                    </div>

                    <div>
                      <Label htmlFor="tennisProfessionals">Tennis Professionals on Staff?</Label>
                      <RadioGroup value={formData.tennisProfessionals} onValueChange={(value) => handleInputChange("tennisProfessionals", value)}>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="tennis-pro-yes" data-testid="radio-tennis-pro-yes" />
                            <Label htmlFor="tennis-pro-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="tennis-pro-no" data-testid="radio-tennis-pro-no" />
                            <Label htmlFor="tennis-pro-no">No</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="swimmingPool">Swimming Pool? *</Label>
                  <RadioGroup value={formData.swimmingPool} onValueChange={(value) => handleInputChange("swimmingPool", value)}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="pool-yes" data-testid="radio-pool-yes" />
                        <Label htmlFor="pool-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="pool-no" data-testid="radio-pool-no" />
                        <Label htmlFor="pool-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {formData.swimmingPool === "yes" && (
                  <div>
                    <Label htmlFor="poolType">Pool Type</Label>
                    <Select value={formData.poolType} onValueChange={(value) => handleInputChange("poolType", value)}>
                      <SelectTrigger id="poolType" data-testid="select-pool-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="outdoor">Outdoor</SelectItem>
                        <SelectItem value="indoor">Indoor</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label htmlFor="fitnessFacility">Fitness Facility?</Label>
                  <RadioGroup value={formData.fitnessFacility} onValueChange={(value) => handleInputChange("fitnessFacility", value)}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="fitness-yes" data-testid="radio-fitness-yes" />
                        <Label htmlFor="fitness-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="fitness-no" data-testid="radio-fitness-no" />
                        <Label htmlFor="fitness-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="spaServices">Spa Services?</Label>
                  <RadioGroup value={formData.spaServices} onValueChange={(value) => handleInputChange("spaServices", value)}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="spa-yes" data-testid="radio-spa-yes" />
                        <Label htmlFor="spa-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="spa-no" data-testid="radio-spa-no" />
                        <Label htmlFor="spa-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="lodgingRooms">Lodging/Guest Rooms?</Label>
                  <Input
                    id="lodgingRooms"
                    type="number"
                    placeholder="Number of rooms (0 if none)"
                    value={formData.lodgingRooms}
                    onChange={(e) => handleInputChange("lodgingRooms", e.target.value)}
                    data-testid="input-lodging"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Auto Fleet & Prior Insurance */}
          {step === 7 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Commercial Auto Coverage</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ownedVehicles">Club-Owned Vehicles *</Label>
                    <Input
                      id="ownedVehicles"
                      type="number"
                      placeholder="Trucks, maintenance vehicles, shuttles"
                      value={formData.ownedVehicles}
                      onChange={(e) => handleInputChange("ownedVehicles", e.target.value)}
                      data-testid="input-owned-vehicles"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="commercialAutoLimit">Commercial Auto Liability Limit</Label>
                    <Select value={formData.commercialAutoLimit} onValueChange={(value) => handleInputChange("commercialAutoLimit", value)}>
                      <SelectTrigger id="commercialAutoLimit" data-testid="select-auto-limit">
                        <SelectValue placeholder="Select limit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not-needed">Not Needed</SelectItem>
                        <SelectItem value="1000000">$1,000,000</SelectItem>
                        <SelectItem value="2000000">$2,000,000</SelectItem>
                        <SelectItem value="5000000">$5,000,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="vehicleTypes">Vehicle Types</Label>
                    <Textarea
                      id="vehicleTypes"
                      placeholder="e.g., Pickup trucks, maintenance vehicles, member shuttles"
                      value={formData.vehicleTypes}
                      onChange={(e) => handleInputChange("vehicleTypes", e.target.value)}
                      data-testid="textarea-vehicle-types"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="hiredNonOwnedAuto">Hired & Non-Owned Auto? *</Label>
                    <RadioGroup value={formData.hiredNonOwnedAuto} onValueChange={(value) => handleInputChange("hiredNonOwnedAuto", value)}>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="hnoa-yes" data-testid="radio-hnoa-yes" />
                          <Label htmlFor="hnoa-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="hnoa-no" data-testid="radio-hnoa-no" />
                          <Label htmlFor="hnoa-no">No</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold text-foreground">Prior Insurance & Claims History</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentInsurer">Current Insurance Company</Label>
                    <Input
                      id="currentInsurer"
                      placeholder="If currently insured"
                      value={formData.currentInsurer}
                      onChange={(e) => handleInputChange("currentInsurer", e.target.value)}
                      data-testid="input-current-insurer"
                    />
                  </div>

                  <div>
                    <Label htmlFor="currentPremium">Current Annual Premium</Label>
                    <Input
                      id="currentPremium"
                      type="number"
                      placeholder="Total annual premium"
                      value={formData.currentPremium}
                      onChange={(e) => handleInputChange("currentPremium", e.target.value)}
                      data-testid="input-current-premium"
                    />
                  </div>

                  <div>
                    <Label htmlFor="expirationDate">Policy Expiration Date</Label>
                    <Input
                      id="expirationDate"
                      type="date"
                      value={formData.expirationDate}
                      onChange={(e) => handleInputChange("expirationDate", e.target.value)}
                      data-testid="input-expiration"
                    />
                  </div>

                  <div>
                    <Label htmlFor="claimsLast5Years">Claims in Last 5 Years? *</Label>
                    <RadioGroup value={formData.claimsLast5Years} onValueChange={(value) => handleInputChange("claimsLast5Years", value)}>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="claims-yes" data-testid="radio-claims-yes" />
                          <Label htmlFor="claims-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="claims-no" data-testid="radio-claims-no" />
                          <Label htmlFor="claims-no">No</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.claimsLast5Years === "yes" && (
                    <div className="md:col-span-2">
                      <Label htmlFor="claimsDescription">Claims Description</Label>
                      <Textarea
                        id="claimsDescription"
                        placeholder="Please describe each claim: date, type, and amount"
                        value={formData.claimsDescription}
                        onChange={(e) => handleInputChange("claimsDescription", e.target.value)}
                        data-testid="textarea-claims"
                        rows={4}
                      />
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <Label htmlFor="priorDenialCancellation">Prior Denial or Cancellation? *</Label>
                    <RadioGroup value={formData.priorDenialCancellation} onValueChange={(value) => handleInputChange("priorDenialCancellation", value)}>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="denial-yes" data-testid="radio-denial-yes" />
                          <Label htmlFor="denial-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="denial-no" data-testid="radio-denial-no" />
                          <Label htmlFor="denial-no">No</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 8: Risk Management & Additional Info */}
          {step === 8 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Risk Management & Additional Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="safetyProgram">Written Safety Program? *</Label>
                  <RadioGroup value={formData.safetyProgram} onValueChange={(value) => handleInputChange("safetyProgram", value)}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="safety-yes" data-testid="radio-safety-yes" />
                        <Label htmlFor="safety-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="safety-no" data-testid="radio-safety-no" />
                        <Label htmlFor="safety-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="cartTraining">Golf Cart Safety Training? *</Label>
                  <RadioGroup value={formData.cartTraining} onValueChange={(value) => handleInputChange("cartTraining", value)}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="training-yes" data-testid="radio-training-yes" />
                        <Label htmlFor="training-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="training-no" data-testid="radio-training-no" />
                        <Label htmlFor="training-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="weatherPlan">Severe Weather Plan? *</Label>
                  <RadioGroup value={formData.weatherPlan} onValueChange={(value) => handleInputChange("weatherPlan", value)}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="weather-yes" data-testid="radio-weather-yes" />
                        <Label htmlFor="weather-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="weather-no" data-testid="radio-weather-no" />
                        <Label htmlFor="weather-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="lightningDetection">Lightning Detection System? *</Label>
                  <RadioGroup value={formData.lightningDetection} onValueChange={(value) => handleInputChange("lightningDetection", value)}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="lightning-yes" data-testid="radio-lightning-yes" />
                        <Label htmlFor="lightning-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="lightning-no" data-testid="radio-lightning-no" />
                        <Label htmlFor="lightning-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="cyberLiabilityLimit">Cyber Liability Coverage</Label>
                  <Select value={formData.cyberLiabilityLimit} onValueChange={(value) => handleInputChange("cyberLiabilityLimit", value)}>
                    <SelectTrigger id="cyberLiabilityLimit" data-testid="select-cyber">
                      <SelectValue placeholder="Member data protection" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not-needed">Not Needed</SelectItem>
                      <SelectItem value="500000">$500,000</SelectItem>
                      <SelectItem value="1000000">$1,000,000</SelectItem>
                      <SelectItem value="2000000">$2,000,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="eplLimit">Employment Practices Liability</Label>
                  <Select value={formData.eplLimit} onValueChange={(value) => handleInputChange("eplLimit", value)}>
                    <SelectTrigger id="eplLimit" data-testid="select-epl">
                      <SelectValue placeholder="For employee claims" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not-needed">Not Needed</SelectItem>
                      <SelectItem value="1000000">$1,000,000</SelectItem>
                      <SelectItem value="2000000">$2,000,000</SelectItem>
                      <SelectItem value="3000000">$3,000,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="additionalComments">Additional Comments or Coverage Needs</Label>
                  <Textarea
                    id="additionalComments"
                    placeholder="Please provide any additional information that would help us prepare your quote"
                    value={formData.additionalComments}
                    onChange={(e) => handleInputChange("additionalComments", e.target.value)}
                    data-testid="textarea-comments"
                    rows={5}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
                data-testid="button-previous"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
            )}
            {step < 8 ? (
              <Button
                type="button"
                onClick={() => setStep(step + 1)}
                className="ml-auto"
                data-testid="button-next"
              >
                Next Step
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                className="ml-auto"
                data-testid="button-submit"
                disabled={submitMutation.isPending}
              >
                {submitMutation.isPending ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
