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
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SERVICE_STATES } from "@shared/constants/states";

export default function HotelQuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // General Information
    agencyName: "",
    agencyCode: "",
    legalEntity: "",
    namedInsured: "",
    physicalAddress: "",
    physicalCity: "",
    physicalState: "",
    physicalZip: "",
    mailingAddress: "",
    mailingCity: "",
    mailingState: "",
    mailingZip: "",
    contactName: "",
    phone: "",
    fax: "",
    email: "",
    website: "",
    yearsInBusiness: "",
    yearsAtLocation: "",
    operations: "",
    managementCompany: "",
    franchisor: "",
    riskManager: "",
    
    // Property Details
    numberOfRooms: "",
    numberOfBuildings: "",
    numberOfStories: "",
    yearBuilt: "",
    lastRenovation: "",
    squareFootage: "",
    propertyValue: "",
    
    // Coverage Information
    propertyLimit: "",
    generalLiabilityLimit: "",
    liquorLiabilityLimit: "",
    umbrellaLimit: "",
    cyberLimit: "",
    employmentPracticesLimit: "",
    
    // Revenue Information
    annualRevenue: "",
    roomRevenue: "",
    foodBeverageRevenue: "",
    otherRevenue: "",
    occupancyRate: "",
    averageDailyRate: "",
    
    // Cyber Security
    cyberIncidentHistory: "",
    antivirusProtection: "",
    firewalls: "",
    accessRestrictions: "",
    regularBackups: "",
    employeeTraining: "",
    monthlyPatching: "",
    dataEncryption: "",
    multiFactorAuth: "",
    endpointDetection: "",
    edrSolution: "",
    
    // Employment Practices
    priorClaims: "",
    eeocCharges: "",
    officerTurnover: "",
    layoffs: "",
    severanceProvided: "",
    hrDepartment: "",
    employeeHandbook: "",
    socialMediaPolicy: "",
    harassmentPolicies: "",
    fmlaAdaPolicies: "",
    disciplinePolicies: "",
    conductPolicies: "",
    harassmentTraining: "",
    flsaGuidelines: "",
    
    // Additional Information
    additionalComments: "",
  });

  const [amenities, setAmenities] = useState({
    bicycleScooterRental: false,
    cigarOxygenBar: false,
    childcareDaycare: false,
    dockMarina: false,
    kitchenettes: false,
    skiExposures: false,
    dogParks: false,
    fitnessCenters: false,
    golf: false,
    grills: false,
    theaters: false,
    evChargingStations: false,
    laundryServices: false,
    recreationalFacilities: false,
    conferenceRooms: false,
    indoorParking: false,
    waterSlides: false,
    casino: false,
    poolsHotTubs: false,
    restaurantsFoodService: false,
    shuttleServices: false,
    valetServices: false,
    salonSpa: false,
  });

  const [checkboxes, setCheckboxes] = useState({
    multipleLocations: false,
    additionalNamedInsured: false,
    subsidiaries: false,
    workersComp: false,
    autoInsurance: false,
    evChargingContract: false,
  });

  const handleAmenityToggle = (amenity: keyof typeof amenities) => {
    setAmenities(prev => ({
      ...prev,
      [amenity]: !prev[amenity]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/hotel-quotes", {
        ...formData,
        payload: { ...formData, amenities, checkboxes }
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
          <h3 className="text-2xl font-bold text-foreground mb-4">Hotel Insurance Quote Request Received!</h3>
          <p className="text-muted-foreground mb-4">
            Thank you for your detailed submission.
          </p>
          <p className="text-lg font-semibold mb-2">
            Reference Number: {referenceNumber}
          </p>
          <p className="text-muted-foreground mb-6">
            Our hotel insurance specialists will review your property information, amenities, and coverage needs. You'll receive a competitive quote within 24-48 hours.
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
        <CardTitle>Hotel Insurance Application</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Complete this comprehensive application for hotel, motel, and hospitality property insurance. Include all amenities, revenue streams, and operational details for accurate pricing.
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
        {/* Step 1: General Information */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">General Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="agencyName">Agency Name</Label>
                <Input
                  id="agencyName"
                  value={formData.agencyName}
                  onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                  placeholder="Agency name"
                  data-testid="input-agency-name"
                />
              </div>
              <div>
                <Label htmlFor="agencyCode">Agency Code</Label>
                <Input
                  id="agencyCode"
                  value={formData.agencyCode}
                  onChange={(e) => setFormData({ ...formData, agencyCode: e.target.value })}
                  placeholder="Agency code"
                  data-testid="input-agency-code"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="legalEntity">Legal Entity Type *</Label>
              <Select
                value={formData.legalEntity}
                onValueChange={(value) => setFormData({ ...formData, legalEntity: value })}
              >
                <SelectTrigger data-testid="select-legal-entity">
                  <SelectValue placeholder="Select entity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corporation">Corporation</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="llc">LLC</SelectItem>
                  <SelectItem value="joint-venture">Joint Venture</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="namedInsured">Full Company Name / First Named Insured *</Label>
              <Input
                id="namedInsured"
                value={formData.namedInsured}
                onChange={(e) => setFormData({ ...formData, namedInsured: e.target.value })}
                placeholder="Legal entity name"
                data-testid="input-company-name"
              />
            </div>

            <div>
              <Label>Primary Physical Location *</Label>
              <Input
                value={formData.physicalAddress}
                onChange={(e) => setFormData({ ...formData, physicalAddress: e.target.value })}
                placeholder="Street address"
                className="mb-2"
                data-testid="input-physical-address"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Input
                  value={formData.physicalCity}
                  onChange={(e) => setFormData({ ...formData, physicalCity: e.target.value })}
                  placeholder="City"
                  data-testid="input-physical-city"
                />
                <Select
                  value={formData.physicalState}
                  onValueChange={(value) => setFormData({ ...formData, physicalState: value })}
                >
                  <SelectTrigger data-testid="select-physical-state">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_STATES.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={formData.physicalZip}
                  onChange={(e) => setFormData({ ...formData, physicalZip: e.target.value })}
                  placeholder="ZIP Code"
                  data-testid="input-physical-zip"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="differentMailing"
                data-testid="checkbox-different-mailing"
              />
              <Label htmlFor="differentMailing" className="font-normal cursor-pointer">
                Mailing address is different from physical location
              </Label>
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
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  data-testid="input-phone"
                />
              </div>
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
                <Label htmlFor="website">Website Address</Label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="yearsAtLocation">Years Operating at This Location *</Label>
                <Input
                  id="yearsAtLocation"
                  type="number"
                  value={formData.yearsAtLocation}
                  onChange={(e) => setFormData({ ...formData, yearsAtLocation: e.target.value })}
                  placeholder="0"
                  data-testid="input-years-location"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="operations">Describe Operations/Services Offered *</Label>
              <Textarea
                id="operations"
                value={formData.operations}
                onChange={(e) => setFormData({ ...formData, operations: e.target.value })}
                placeholder="e.g., Full-service hotel, limited service hotel, boutique hotel, resort, etc."
                rows={3}
                data-testid="textarea-operations"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="managementCompany">Hotel Management Company (if not applicant)</Label>
                <Input
                  id="managementCompany"
                  value={formData.managementCompany}
                  onChange={(e) => setFormData({ ...formData, managementCompany: e.target.value })}
                  placeholder="Management company name"
                  data-testid="input-management-company"
                />
              </div>
              <div>
                <Label htmlFor="franchisor">Franchisor (if applicable)</Label>
                <Input
                  id="franchisor"
                  value={formData.franchisor}
                  onChange={(e) => setFormData({ ...formData, franchisor: e.target.value })}
                  placeholder="e.g., Marriott, Hilton, IHG"
                  data-testid="input-franchisor"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="multipleLocations"
                  checked={checkboxes.multipleLocations}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, multipleLocations: checked as boolean })}
                  data-testid="checkbox-multiple-locations"
                />
                <Label htmlFor="multipleLocations" className="font-normal cursor-pointer">
                  Does the applicant have other locations to insure?
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="additionalNamedInsured"
                  checked={checkboxes.additionalNamedInsured}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, additionalNamedInsured: checked as boolean })}
                  data-testid="checkbox-additional-insured"
                />
                <Label htmlFor="additionalNamedInsured" className="font-normal cursor-pointer">
                  Is there an organization or person to be listed as an additional named insured?
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="subsidiaries"
                  checked={checkboxes.subsidiaries}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, subsidiaries: checked as boolean })}
                  data-testid="checkbox-subsidiaries"
                />
                <Label htmlFor="subsidiaries" className="font-normal cursor-pointer">
                  Does the applicant have any subsidiary companies with different operations?
                </Label>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Property Details & Revenue */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Property Details & Revenue Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numberOfRooms">Number of Guest Rooms *</Label>
                <Input
                  id="numberOfRooms"
                  type="number"
                  value={formData.numberOfRooms}
                  onChange={(e) => setFormData({ ...formData, numberOfRooms: e.target.value })}
                  placeholder="0"
                  data-testid="input-number-rooms"
                />
              </div>
              <div>
                <Label htmlFor="numberOfBuildings">Number of Buildings</Label>
                <Input
                  id="numberOfBuildings"
                  type="number"
                  value={formData.numberOfBuildings}
                  onChange={(e) => setFormData({ ...formData, numberOfBuildings: e.target.value })}
                  placeholder="0"
                  data-testid="input-number-buildings"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numberOfStories">Number of Stories</Label>
                <Input
                  id="numberOfStories"
                  type="number"
                  value={formData.numberOfStories}
                  onChange={(e) => setFormData({ ...formData, numberOfStories: e.target.value })}
                  placeholder="0"
                  data-testid="input-number-stories"
                />
              </div>
              <div>
                <Label htmlFor="squareFootage">Total Square Footage</Label>
                <Input
                  id="squareFootage"
                  type="number"
                  value={formData.squareFootage}
                  onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
                  placeholder="0"
                  data-testid="input-square-footage"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="yearBuilt">Year Built *</Label>
                <Input
                  id="yearBuilt"
                  type="number"
                  value={formData.yearBuilt}
                  onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
                  placeholder="YYYY"
                  data-testid="input-year-built"
                />
              </div>
              <div>
                <Label htmlFor="lastRenovation">Last Major Renovation Year</Label>
                <Input
                  id="lastRenovation"
                  type="number"
                  value={formData.lastRenovation}
                  onChange={(e) => setFormData({ ...formData, lastRenovation: e.target.value })}
                  placeholder="YYYY"
                  data-testid="input-last-renovation"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="propertyValue">Total Property Value ($)</Label>
              <Input
                id="propertyValue"
                type="number"
                value={formData.propertyValue}
                onChange={(e) => setFormData({ ...formData, propertyValue: e.target.value })}
                placeholder="0"
                data-testid="input-property-value"
              />
            </div>

            <h4 className="font-medium mt-6">Revenue Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="annualRevenue">Total Annual Revenue ($) *</Label>
                <Input
                  id="annualRevenue"
                  type="number"
                  value={formData.annualRevenue}
                  onChange={(e) => setFormData({ ...formData, annualRevenue: e.target.value })}
                  placeholder="0"
                  data-testid="input-annual-revenue"
                />
              </div>
              <div>
                <Label htmlFor="roomRevenue">Room Revenue ($)</Label>
                <Input
                  id="roomRevenue"
                  type="number"
                  value={formData.roomRevenue}
                  onChange={(e) => setFormData({ ...formData, roomRevenue: e.target.value })}
                  placeholder="0"
                  data-testid="input-room-revenue"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="foodBeverageRevenue">Food & Beverage Revenue ($)</Label>
                <Input
                  id="foodBeverageRevenue"
                  type="number"
                  value={formData.foodBeverageRevenue}
                  onChange={(e) => setFormData({ ...formData, foodBeverageRevenue: e.target.value })}
                  placeholder="0"
                  data-testid="input-fb-revenue"
                />
              </div>
              <div>
                <Label htmlFor="otherRevenue">Other Revenue ($)</Label>
                <Input
                  id="otherRevenue"
                  type="number"
                  value={formData.otherRevenue}
                  onChange={(e) => setFormData({ ...formData, otherRevenue: e.target.value })}
                  placeholder="0"
                  data-testid="input-other-revenue"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="occupancyRate">Average Occupancy Rate (%)</Label>
                <Input
                  id="occupancyRate"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.occupancyRate}
                  onChange={(e) => setFormData({ ...formData, occupancyRate: e.target.value })}
                  placeholder="0"
                  data-testid="input-occupancy-rate"
                />
              </div>
              <div>
                <Label htmlFor="averageDailyRate">Average Daily Rate ($)</Label>
                <Input
                  id="averageDailyRate"
                  type="number"
                  value={formData.averageDailyRate}
                  onChange={(e) => setFormData({ ...formData, averageDailyRate: e.target.value })}
                  placeholder="0"
                  data-testid="input-adr"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Amenities */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Hotel Amenities</h3>
            <p className="text-sm text-muted-foreground">Please check all amenities that apply to your property</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="poolsHotTubs"
                  checked={amenities.poolsHotTubs}
                  onCheckedChange={() => handleAmenityToggle('poolsHotTubs')}
                  data-testid="checkbox-pools"
                />
                <Label htmlFor="poolsHotTubs" className="font-normal cursor-pointer">
                  Pools or Hot Tubs
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="restaurantsFoodService"
                  checked={amenities.restaurantsFoodService}
                  onCheckedChange={() => handleAmenityToggle('restaurantsFoodService')}
                  data-testid="checkbox-restaurants"
                />
                <Label htmlFor="restaurantsFoodService" className="font-normal cursor-pointer">
                  Restaurants or Food Service
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="fitnessCenters"
                  checked={amenities.fitnessCenters}
                  onCheckedChange={() => handleAmenityToggle('fitnessCenters')}
                  data-testid="checkbox-fitness"
                />
                <Label htmlFor="fitnessCenters" className="font-normal cursor-pointer">
                  Fitness Centers
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="salonSpa"
                  checked={amenities.salonSpa}
                  onCheckedChange={() => handleAmenityToggle('salonSpa')}
                  data-testid="checkbox-spa"
                />
                <Label htmlFor="salonSpa" className="font-normal cursor-pointer">
                  Salon or Spa
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="conferenceRooms"
                  checked={amenities.conferenceRooms}
                  onCheckedChange={() => handleAmenityToggle('conferenceRooms')}
                  data-testid="checkbox-conference"
                />
                <Label htmlFor="conferenceRooms" className="font-normal cursor-pointer">
                  Conference Rooms, Ball Rooms, or Business Centers
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="shuttleServices"
                  checked={amenities.shuttleServices}
                  onCheckedChange={() => handleAmenityToggle('shuttleServices')}
                  data-testid="checkbox-shuttle"
                />
                <Label htmlFor="shuttleServices" className="font-normal cursor-pointer">
                  Shuttle Services
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="valetServices"
                  checked={amenities.valetServices}
                  onCheckedChange={() => handleAmenityToggle('valetServices')}
                  data-testid="checkbox-valet"
                />
                <Label htmlFor="valetServices" className="font-normal cursor-pointer">
                  Valet Services
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="golf"
                  checked={amenities.golf}
                  onCheckedChange={() => handleAmenityToggle('golf')}
                  data-testid="checkbox-golf"
                />
                <Label htmlFor="golf" className="font-normal cursor-pointer">
                  Golf Course
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="indoorParking"
                  checked={amenities.indoorParking}
                  onCheckedChange={() => handleAmenityToggle('indoorParking')}
                  data-testid="checkbox-parking"
                />
                <Label htmlFor="indoorParking" className="font-normal cursor-pointer">
                  Indoor Parking
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="kitchenettes"
                  checked={amenities.kitchenettes}
                  onCheckedChange={() => handleAmenityToggle('kitchenettes')}
                  data-testid="checkbox-kitchenettes"
                />
                <Label htmlFor="kitchenettes" className="font-normal cursor-pointer">
                  Kitchenettes in Rooms
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="laundryServices"
                  checked={amenities.laundryServices}
                  onCheckedChange={() => handleAmenityToggle('laundryServices')}
                  data-testid="checkbox-laundry"
                />
                <Label htmlFor="laundryServices" className="font-normal cursor-pointer">
                  Laundry Services (Dry Cleaning or Self-Service)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="recreationalFacilities"
                  checked={amenities.recreationalFacilities}
                  onCheckedChange={() => handleAmenityToggle('recreationalFacilities')}
                  data-testid="checkbox-recreational"
                />
                <Label htmlFor="recreationalFacilities" className="font-normal cursor-pointer">
                  Recreational Facilities (Tennis Courts, Playgrounds, Rec Rooms)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="waterSlides"
                  checked={amenities.waterSlides}
                  onCheckedChange={() => handleAmenityToggle('waterSlides')}
                  data-testid="checkbox-waterslides"
                />
                <Label htmlFor="waterSlides" className="font-normal cursor-pointer">
                  Waterslides, Diving Boards, or Water Parks
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="dockMarina"
                  checked={amenities.dockMarina}
                  onCheckedChange={() => handleAmenityToggle('dockMarina')}
                  data-testid="checkbox-marina"
                />
                <Label htmlFor="dockMarina" className="font-normal cursor-pointer">
                  Dock/Marina/Pier/Wharf
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="bicycleScooterRental"
                  checked={amenities.bicycleScooterRental}
                  onCheckedChange={() => handleAmenityToggle('bicycleScooterRental')}
                  data-testid="checkbox-bicycle"
                />
                <Label htmlFor="bicycleScooterRental" className="font-normal cursor-pointer">
                  Bicycle/Scooter Rental
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="childcareDaycare"
                  checked={amenities.childcareDaycare}
                  onCheckedChange={() => handleAmenityToggle('childcareDaycare')}
                  data-testid="checkbox-childcare"
                />
                <Label htmlFor="childcareDaycare" className="font-normal cursor-pointer">
                  Childcare/Day Care
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="dogParks"
                  checked={amenities.dogParks}
                  onCheckedChange={() => handleAmenityToggle('dogParks')}
                  data-testid="checkbox-dog-parks"
                />
                <Label htmlFor="dogParks" className="font-normal cursor-pointer">
                  Dog Parks
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="grills"
                  checked={amenities.grills}
                  onCheckedChange={() => handleAmenityToggle('grills')}
                  data-testid="checkbox-grills"
                />
                <Label htmlFor="grills" className="font-normal cursor-pointer">
                  Grills
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="theaters"
                  checked={amenities.theaters}
                  onCheckedChange={() => handleAmenityToggle('theaters')}
                  data-testid="checkbox-theaters"
                />
                <Label htmlFor="theaters" className="font-normal cursor-pointer">
                  Theaters
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="casino"
                  checked={amenities.casino}
                  onCheckedChange={() => handleAmenityToggle('casino')}
                  data-testid="checkbox-casino"
                />
                <Label htmlFor="casino" className="font-normal cursor-pointer">
                  Casino
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cigarOxygenBar"
                  checked={amenities.cigarOxygenBar}
                  onCheckedChange={() => handleAmenityToggle('cigarOxygenBar')}
                  data-testid="checkbox-cigar-bar"
                />
                <Label htmlFor="cigarOxygenBar" className="font-normal cursor-pointer">
                  Cigar Bar/Oxygen Bar
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="skiExposures"
                  checked={amenities.skiExposures}
                  onCheckedChange={() => handleAmenityToggle('skiExposures')}
                  data-testid="checkbox-ski"
                />
                <Label htmlFor="skiExposures" className="font-normal cursor-pointer">
                  Ski Exposures (Ski Routes, Lifts, or Equipment)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="evChargingStations"
                  checked={amenities.evChargingStations}
                  onCheckedChange={() => handleAmenityToggle('evChargingStations')}
                  data-testid="checkbox-ev-charging"
                />
                <Label htmlFor="evChargingStations" className="font-normal cursor-pointer">
                  Electric Vehicle Charging Stations
                </Label>
              </div>
            </div>

            {amenities.evChargingStations && (
              <div className="ml-6 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="evChargingContract"
                    checked={checkboxes.evChargingContract}
                    onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, evChargingContract: checked as boolean })}
                    data-testid="checkbox-ev-contract"
                  />
                  <Label htmlFor="evChargingContract" className="font-normal cursor-pointer text-sm">
                    Does the applicant have a contract with a third party to service EV charging stations?
                  </Label>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Coverage Limits */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Requested Coverages & Limits</h3>
            
            <div>
              <Label htmlFor="propertyLimit">Property Coverage Limit ($)</Label>
              <Input
                id="propertyLimit"
                type="number"
                value={formData.propertyLimit}
                onChange={(e) => setFormData({ ...formData, propertyLimit: e.target.value })}
                placeholder="0"
                data-testid="input-property-limit"
              />
              <p className="text-xs text-muted-foreground mt-1">Statement of Values will be required</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="generalLiabilityLimit">General Liability Limit ($)</Label>
                <Input
                  id="generalLiabilityLimit"
                  type="number"
                  value={formData.generalLiabilityLimit}
                  onChange={(e) => setFormData({ ...formData, generalLiabilityLimit: e.target.value })}
                  placeholder="0"
                  data-testid="input-gl-limit"
                />
              </div>
              <div>
                <Label htmlFor="liquorLiabilityLimit">Liquor Liability Limit ($)</Label>
                <Input
                  id="liquorLiabilityLimit"
                  type="number"
                  value={formData.liquorLiabilityLimit}
                  onChange={(e) => setFormData({ ...formData, liquorLiabilityLimit: e.target.value })}
                  placeholder="0"
                  data-testid="input-liquor-limit"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="umbrellaLimit">Umbrella Limit ($)</Label>
                <Input
                  id="umbrellaLimit"
                  type="number"
                  value={formData.umbrellaLimit}
                  onChange={(e) => setFormData({ ...formData, umbrellaLimit: e.target.value })}
                  placeholder="0"
                  data-testid="input-umbrella-limit"
                />
              </div>
              <div>
                <Label htmlFor="cyberLimit">Cyber Liability Limit ($)</Label>
                <Input
                  id="cyberLimit"
                  type="number"
                  value={formData.cyberLimit}
                  onChange={(e) => setFormData({ ...formData, cyberLimit: e.target.value })}
                  placeholder="0"
                  data-testid="input-cyber-limit"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="employmentPracticesLimit">Employment Practices Liability Limit ($)</Label>
              <Input
                id="employmentPracticesLimit"
                type="number"
                value={formData.employmentPracticesLimit}
                onChange={(e) => setFormData({ ...formData, employmentPracticesLimit: e.target.value })}
                placeholder="0"
                data-testid="input-epl-limit"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="workersComp"
                  checked={checkboxes.workersComp}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, workersComp: checked as boolean })}
                  data-testid="checkbox-workers-comp"
                />
                <Label htmlFor="workersComp" className="font-normal cursor-pointer">
                  Workers' Compensation Coverage Needed (ACORD 130 will be required)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="autoInsurance"
                  checked={checkboxes.autoInsurance}
                  onCheckedChange={(checked) => setCheckboxes({ ...checkboxes, autoInsurance: checked as boolean })}
                  data-testid="checkbox-auto"
                />
                <Label htmlFor="autoInsurance" className="font-normal cursor-pointer">
                  Auto Insurance Coverage Needed (ACORD 137 & 127 will be required)
                </Label>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Cyber & Employment Practices */}
        {step === 5 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Cyber Security & Employment Practices</h3>
            
            <h4 className="font-medium">Cyber Security Questionnaire</h4>
            <div className="space-y-3">
              <div>
                <Label>Have you experienced a cyber incident costing more than $10,000 in the past 36 months?</Label>
                <RadioGroup
                  value={formData.cyberIncidentHistory}
                  onValueChange={(value) => setFormData({ ...formData, cyberIncidentHistory: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="cyber-incident-yes" />
                    <Label htmlFor="cyber-incident-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="cyber-incident-no" />
                    <Label htmlFor="cyber-incident-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Do you use up-to-date anti-virus and anti-malware protection?</Label>
                <RadioGroup
                  value={formData.antivirusProtection}
                  onValueChange={(value) => setFormData({ ...formData, antivirusProtection: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="antivirus-yes" />
                    <Label htmlFor="antivirus-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="antivirus-no" />
                    <Label htmlFor="antivirus-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Are all internet access points secured by firewalls?</Label>
                <RadioGroup
                  value={formData.firewalls}
                  onValueChange={(value) => setFormData({ ...formData, firewalls: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="firewalls-yes" />
                    <Label htmlFor="firewalls-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="firewalls-no" />
                    <Label htmlFor="firewalls-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Do you perform regular backups of business-critical data?</Label>
                <RadioGroup
                  value={formData.regularBackups}
                  onValueChange={(value) => setFormData({ ...formData, regularBackups: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="backups-yes" />
                    <Label htmlFor="backups-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="backups-no" />
                    <Label htmlFor="backups-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Do you have multi-factor authentication for privileged accounts and remote access?</Label>
                <RadioGroup
                  value={formData.multiFactorAuth}
                  onValueChange={(value) => setFormData({ ...formData, multiFactorAuth: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="mfa-yes" />
                    <Label htmlFor="mfa-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="mfa-no" />
                    <Label htmlFor="mfa-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <h4 className="font-medium mt-6">Employment Practices Liability Questionnaire</h4>
            <div className="space-y-3">
              <div>
                <Label>Has any insurer made payments or non-renewed EPL coverage in prior 3 years?</Label>
                <RadioGroup
                  value={formData.priorClaims}
                  onValueChange={(value) => setFormData({ ...formData, priorClaims: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="prior-claims-yes" />
                    <Label htmlFor="prior-claims-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="prior-claims-no" />
                    <Label htmlFor="prior-claims-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Is there an HR department?</Label>
                <RadioGroup
                  value={formData.hrDepartment}
                  onValueChange={(value) => setFormData({ ...formData, hrDepartment: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="hr-yes" />
                    <Label htmlFor="hr-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="hr-no" />
                    <Label htmlFor="hr-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Do you publish and distribute an employee handbook?</Label>
                <RadioGroup
                  value={formData.employeeHandbook}
                  onValueChange={(value) => setFormData({ ...formData, employeeHandbook: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="handbook-yes" />
                    <Label htmlFor="handbook-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="handbook-no" />
                    <Label htmlFor="handbook-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Do you have written policies around sexual harassment and discrimination?</Label>
                <RadioGroup
                  value={formData.harassmentPolicies}
                  onValueChange={(value) => setFormData({ ...formData, harassmentPolicies: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="harassment-yes" />
                    <Label htmlFor="harassment-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="harassment-no" />
                    <Label htmlFor="harassment-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Do you conduct training for all employees on sexual harassment and discrimination?</Label>
                <RadioGroup
                  value={formData.harassmentTraining}
                  onValueChange={(value) => setFormData({ ...formData, harassmentTraining: value })}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="yes" id="training-yes" />
                    <Label htmlFor="training-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="training-no" />
                    <Label htmlFor="training-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Document Upload & Additional Information */}
        {step === 6 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Document Upload & Additional Information</h3>
            
            <h4 className="font-medium">Required Documents</h4>
            <div className="space-y-4">
              <div>
                <Label htmlFor="statementOfValues">Statement of Values *</Label>
                <Input
                  id="statementOfValues"
                  type="file"
                  accept=".pdf,.xls,.xlsx"
                  data-testid="input-sov"
                />
                <p className="text-xs text-muted-foreground mt-1">Include all buildings, equipment, and contents</p>
              </div>

              <div>
                <Label htmlFor="lossRuns">Loss Runs (5 years) *</Label>
                <Input
                  id="lossRuns"
                  type="file"
                  accept=".pdf,.xls,.xlsx"
                  data-testid="input-loss-runs"
                />
                <p className="text-xs text-muted-foreground mt-1">Currently valued company loss runs</p>
              </div>

              <div>
                <Label htmlFor="propertyPhotos">Property Photos</Label>
                <Input
                  id="propertyPhotos"
                  type="file"
                  accept="image/*"
                  multiple
                  data-testid="input-photos"
                />
                <p className="text-xs text-muted-foreground mt-1">Representative photos of buildings and amenities</p>
              </div>

              {checkboxes.workersComp && (
                <div>
                  <Label htmlFor="acord130">ACORD 130 - Workers' Compensation *</Label>
                  <Input
                    id="acord130"
                    type="file"
                    accept=".pdf"
                    data-testid="input-acord130"
                  />
                </div>
              )}

              {checkboxes.autoInsurance && (
                <>
                  <div>
                    <Label htmlFor="acord137">ACORD 137 - Auto Section *</Label>
                    <Input
                      id="acord137"
                      type="file"
                      accept=".pdf"
                      data-testid="input-acord137"
                    />
                  </div>
                  <div>
                    <Label htmlFor="acord127">ACORD 127 - Business Auto *</Label>
                    <Input
                      id="acord127"
                      type="file"
                      accept=".pdf"
                      data-testid="input-acord127"
                    />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="financialStatements">Financial Statements</Label>
                <Input
                  id="financialStatements"
                  type="file"
                  accept=".pdf,.xls,.xlsx"
                  data-testid="input-financial"
                />
              </div>

              <div>
                <Label htmlFor="franchiseAgreement">Franchise Agreement (if applicable)</Label>
                <Input
                  id="franchiseAgreement"
                  type="file"
                  accept=".pdf"
                  data-testid="input-franchise"
                />
              </div>

              <div>
                <Label htmlFor="managementAgreement">Management Agreement (if applicable)</Label>
                <Input
                  id="managementAgreement"
                  type="file"
                  accept=".pdf"
                  data-testid="input-management"
                />
              </div>
            </div>

            <div className="mt-6">
              <Label htmlFor="additionalComments">Additional Comments</Label>
              <Textarea
                id="additionalComments"
                value={formData.additionalComments}
                onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                placeholder="Please provide any additional information about your hotel property, recent renovations, unique amenities, or specific coverage concerns..."
                rows={5}
                data-testid="textarea-additional-comments"
              />
            </div>

            <div className="bg-muted/50 p-4 rounded-md">
              <h4 className="font-medium mb-2">What Happens Next?</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Your submission will be reviewed by our hotel insurance specialists</li>
                <li>We'll analyze your property, amenities, and operational risks</li>
                <li>You'll receive a comprehensive quote within 24-48 hours</li>
                <li>Our team will discuss coverage options specific to hospitality operations</li>
                <li>We can provide risk management guidance for hotels and resorts</li>
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
              Submit Hotel Insurance Application
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}