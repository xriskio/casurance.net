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

export default function RestaurantQuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Basic Information
    businessName: "",
    dba: "",
    effectiveDate: "",
    
    // Contact Information
    contactName: "",
    email: "",
    phone: "",
    businessAddress: "",
    ownershipStructure: "",
    mailingAddress: "",
    
    // Underwriting Information
    fullTimeEmployees: "",
    partTimeEmployees: "",
    yearStarted: "",
    averageHoursDaily: "",
    maximumOccupancy: "",
    classification: "",
    
    // Sales Information
    grossAnnualSales: "",
    percentCatering: "",
    percentAlcohol: "",
    
    // Underwriting Questions
    managementExperience: "",
    multipleLocations: "",
    claimsHistory: "",
    numberOfClaims: "",
    claimsExceed50k: "",
    moreThan6Fryers: "",
    responsibleForParking: "",
    cashOnly: "",
    hasStairs: "",
    hasPlayground: "",
    renovationsPlanned: "",
    
    // Stairs Details
    adequateIllumination: "",
    goodRepair: "",
    slipResistant: "",
    sturdyHandrail: "",
    
    // Fire Safety
    fireAlarmType: "",
    burglarAlarmType: "",
    securityCameras: "",
    hoodCleaningFrequency: "",
    
    // Delivery
    thirdPartyDelivery: "",
    
    // Property Information
    constructionType: "",
    roofType: "",
    sprinkler: "",
    squareFootage: "",
    yearBuilt: "",
    latestRoofUpdate: "",
    latestPlumbingUpdate: "",
    latestElectricalUpdate: "",
    
    // Property Coverages
    buildingLimit: "",
    tenantImprovementsLimit: "",
    businessPersonalPropertyLimit: "",
    propertyDeductible: "",
    windHailDeductible: "",
    
    // Liability Limits
    generalLiabilityLimit: "",
    liquorLiabilityLimit: "",
    hiredNonOwnedAutoLimit: "",
    
    // Location Type
    locationType: "",
    
    // Additional Information
    businessConcept: "",
    websiteUrl: "",
  });

  const [features, setFeatures] = useState({
    happyHourLate: false,
    alcoholMidnight: false,
    alcoholAfterFood: false,
    drinkSpecialsUnder4: false,
    complimentaryDrinks: false,
    hazardousAmusements: false,
    liveConcerts: false,
    doorBouncers: false,
    sportsActivities: false,
    specialEvents: false,
    danceFloor: false,
    atm: false,
    hookah: false,
    flamingFood: false,
  });

  const [exposures, setExposures] = useState({
    foodTruck: false,
    temporaryStand: false,
    ghostKitchen: false,
    virtualBrand: false,
  });

  const [cookingTypes, setCookingTypes] = useState({
    solidFuel: false,
    wok: false,
    charbroiling: false,
  });

  const [businessHistory, setBusinessHistory] = useState({
    felonyConviction: false,
    bankruptcy: false,
    lawsuits: false,
    potentialClaims: false,
    insuranceCanceled: false,
  });

  const handleFeatureToggle = (feature: keyof typeof features) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  const handleExposureToggle = (exposure: keyof typeof exposures) => {
    setExposures(prev => ({
      ...prev,
      [exposure]: !prev[exposure]
    }));
  };

  const handleCookingToggle = (cooking: keyof typeof cookingTypes) => {
    setCookingTypes(prev => ({
      ...prev,
      [cooking]: !prev[cooking]
    }));
  };

  const handleBusinessHistoryToggle = (item: keyof typeof businessHistory) => {
    setBusinessHistory(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleSubmit = () => {
    console.log("Restaurant quote request submitted:", { formData, features, exposures, cookingTypes, businessHistory });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">Restaurant Insurance Quote Request Received!</h3>
          <p className="text-muted-foreground mb-6">
            Thank you for your comprehensive submission. Our restaurant insurance specialists will review your business concept, operations, and risk factors. You'll receive a tailored BOP quote within 24-48 hours.
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
        <CardTitle>Restaurant Business Owners Policy (BOP) Application</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Complete this comprehensive application for restaurant insurance coverage. Include all operational details, cooking methods, and safety features for accurate pricing.
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
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="Legal business name"
                  data-testid="input-business-name"
                />
              </div>
              <div>
                <Label htmlFor="dba">Doing Business As (DBA)</Label>
                <Input
                  id="dba"
                  value={formData.dba}
                  onChange={(e) => setFormData({ ...formData, dba: e.target.value })}
                  placeholder="Optional trade name"
                  data-testid="input-dba"
                />
              </div>
            </div>

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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div>
                <Label htmlFor="ownershipStructure">Business Ownership Structure *</Label>
                <Select
                  value={formData.ownershipStructure}
                  onValueChange={(value) => setFormData({ ...formData, ownershipStructure: value })}
                >
                  <SelectTrigger data-testid="select-ownership">
                    <SelectValue placeholder="Select structure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sole-proprietor">Sole Proprietor</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="llc">LLC</SelectItem>
                    <SelectItem value="corporation">Corporation</SelectItem>
                    <SelectItem value="s-corp">S-Corporation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="businessAddress">Business Address *</Label>
              <Input
                id="businessAddress"
                value={formData.businessAddress}
                onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                placeholder="Street address, City, State, ZIP"
                data-testid="input-business-address"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="differentMailing"
                data-testid="checkbox-different-mailing"
              />
              <Label htmlFor="differentMailing" className="font-normal cursor-pointer">
                Mailing address is different from business address
              </Label>
            </div>

          </div>
        )}

        {/* Step 2: Restaurant Classification & Operations */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Restaurant Classification & Operations</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullTimeEmployees">Full-time Employees *</Label>
                <Input
                  id="fullTimeEmployees"
                  type="number"
                  value={formData.fullTimeEmployees}
                  onChange={(e) => setFormData({ ...formData, fullTimeEmployees: e.target.value })}
                  placeholder="0"
                  data-testid="input-ft-employees"
                />
              </div>
              <div>
                <Label htmlFor="partTimeEmployees">Part-time Employees *</Label>
                <Input
                  id="partTimeEmployees"
                  type="number"
                  value={formData.partTimeEmployees}
                  onChange={(e) => setFormData({ ...formData, partTimeEmployees: e.target.value })}
                  placeholder="0"
                  data-testid="input-pt-employees"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="yearStarted">Year Business Started *</Label>
                <Input
                  id="yearStarted"
                  type="number"
                  value={formData.yearStarted}
                  onChange={(e) => setFormData({ ...formData, yearStarted: e.target.value })}
                  placeholder="YYYY"
                  data-testid="input-year-started"
                />
              </div>
              <div>
                <Label htmlFor="averageHoursDaily">Average Hours Open Daily *</Label>
                <Input
                  id="averageHoursDaily"
                  type="number"
                  value={formData.averageHoursDaily}
                  onChange={(e) => setFormData({ ...formData, averageHoursDaily: e.target.value })}
                  placeholder="0"
                  data-testid="input-hours-daily"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="maximumOccupancy">Maximum Occupancy *</Label>
              <Input
                id="maximumOccupancy"
                type="number"
                value={formData.maximumOccupancy}
                onChange={(e) => setFormData({ ...formData, maximumOccupancy: e.target.value })}
                placeholder="0"
                data-testid="input-max-occupancy"
              />
            </div>

            <div>
              <Label htmlFor="classification">Classification Description *</Label>
              <Select
                value={formData.classification}
                onValueChange={(value) => setFormData({ ...formData, classification: value })}
              >
                <SelectTrigger data-testid="select-classification">
                  <SelectValue placeholder="Select restaurant type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quick-service-commercial">Quick Service / Commercial Cooking</SelectItem>
                  <SelectItem value="full-service-casual">Full Service / Casual Dining Restaurants</SelectItem>
                  <SelectItem value="full-service-fine">Full Service / Fine Dining Restaurants</SelectItem>
                  <SelectItem value="quick-service-limited">Quick Service / Limited Cooking</SelectItem>
                  <SelectItem value="wine-bar">Wine Bars / No Commercial Cooking</SelectItem>
                  <SelectItem value="brew-pub">Brew Pubs / Commercial Cooking</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <h4 className="font-medium mt-6">Restaurant Features</h4>
            <p className="text-sm text-muted-foreground mb-3">Check all that apply to your establishment</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="happyHourLate"
                  checked={features.happyHourLate}
                  onCheckedChange={() => handleFeatureToggle('happyHourLate')}
                  data-testid="checkbox-happy-hour"
                />
                <Label htmlFor="happyHourLate" className="font-normal cursor-pointer">
                  Happy hour between 8pm-close
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="alcoholMidnight"
                  checked={features.alcoholMidnight}
                  onCheckedChange={() => handleFeatureToggle('alcoholMidnight')}
                  data-testid="checkbox-alcohol-midnight"
                />
                <Label htmlFor="alcoholMidnight" className="font-normal cursor-pointer">
                  Serves alcohol between midnight and 5am
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="alcoholAfterFood"
                  checked={features.alcoholAfterFood}
                  onCheckedChange={() => handleFeatureToggle('alcoholAfterFood')}
                  data-testid="checkbox-alcohol-after-food"
                />
                <Label htmlFor="alcoholAfterFood" className="font-normal cursor-pointer">
                  Alcohol service over 2 hours after food service ends
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="drinkSpecialsUnder4"
                  checked={features.drinkSpecialsUnder4}
                  onCheckedChange={() => handleFeatureToggle('drinkSpecialsUnder4')}
                  data-testid="checkbox-drink-specials"
                />
                <Label htmlFor="drinkSpecialsUnder4" className="font-normal cursor-pointer">
                  Alcoholic drink specials under $4
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="complimentaryDrinks"
                  checked={features.complimentaryDrinks}
                  onCheckedChange={() => handleFeatureToggle('complimentaryDrinks')}
                  data-testid="checkbox-complimentary"
                />
                <Label htmlFor="complimentaryDrinks" className="font-normal cursor-pointer">
                  Complimentary drinks or BOGO offers
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hazardousAmusements"
                  checked={features.hazardousAmusements}
                  onCheckedChange={() => handleFeatureToggle('hazardousAmusements')}
                  data-testid="checkbox-hazardous"
                />
                <Label htmlFor="hazardousAmusements" className="font-normal cursor-pointer">
                  Hazardous amusements (mechanical bulls, axe throwing, darts)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="liveConcerts"
                  checked={features.liveConcerts}
                  onCheckedChange={() => handleFeatureToggle('liveConcerts')}
                  data-testid="checkbox-concerts"
                />
                <Label htmlFor="liveConcerts" className="font-normal cursor-pointer">
                  Live concerts with 3+ performers and dance floor
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="doorBouncers"
                  checked={features.doorBouncers}
                  onCheckedChange={() => handleFeatureToggle('doorBouncers')}
                  data-testid="checkbox-bouncers"
                />
                <Label htmlFor="doorBouncers" className="font-normal cursor-pointer">
                  Door bouncers (beyond single ID checker)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sportsActivities"
                  checked={features.sportsActivities}
                  onCheckedChange={() => handleFeatureToggle('sportsActivities')}
                  data-testid="checkbox-sports"
                />
                <Label htmlFor="sportsActivities" className="font-normal cursor-pointer">
                  Sports activities (volleyball, boxing, bowling)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="specialEvents"
                  checked={features.specialEvents}
                  onCheckedChange={() => handleFeatureToggle('specialEvents')}
                  data-testid="checkbox-events"
                />
                <Label htmlFor="specialEvents" className="font-normal cursor-pointer">
                  Hosting special events (street fairs, block parties)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="danceFloor"
                  checked={features.danceFloor}
                  onCheckedChange={() => handleFeatureToggle('danceFloor')}
                  data-testid="checkbox-dance-floor"
                />
                <Label htmlFor="danceFloor" className="font-normal cursor-pointer">
                  Dance floor
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="atm"
                  checked={features.atm}
                  onCheckedChange={() => handleFeatureToggle('atm')}
                  data-testid="checkbox-atm"
                />
                <Label htmlFor="atm" className="font-normal cursor-pointer">
                  ATM on premises
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hookah"
                  checked={features.hookah}
                  onCheckedChange={() => handleFeatureToggle('hookah')}
                  data-testid="checkbox-hookah"
                />
                <Label htmlFor="hookah" className="font-normal cursor-pointer">
                  Hookah service
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flamingFood"
                  checked={features.flamingFood}
                  onCheckedChange={() => handleFeatureToggle('flamingFood')}
                  data-testid="checkbox-flaming"
                />
                <Label htmlFor="flamingFood" className="font-normal cursor-pointer">
                  Flaming food or beverages
                </Label>
              </div>
            </div>

            <h4 className="font-medium mt-6">Additional Exposures</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="foodTruck"
                  checked={exposures.foodTruck}
                  onCheckedChange={() => handleExposureToggle('foodTruck')}
                  data-testid="checkbox-food-truck"
                />
                <Label htmlFor="foodTruck" className="font-normal cursor-pointer">
                  Own and operate a food truck or food cart
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="temporaryStand"
                  checked={exposures.temporaryStand}
                  onCheckedChange={() => handleExposureToggle('temporaryStand')}
                  data-testid="checkbox-temp-stand"
                />
                <Label htmlFor="temporaryStand" className="font-normal cursor-pointer">
                  Operate temporary food stand at events
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ghostKitchen"
                  checked={exposures.ghostKitchen}
                  onCheckedChange={() => handleExposureToggle('ghostKitchen')}
                  data-testid="checkbox-ghost-kitchen"
                />
                <Label htmlFor="ghostKitchen" className="font-normal cursor-pointer">
                  Sublease as a ghost kitchen
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="virtualBrand"
                  checked={exposures.virtualBrand}
                  onCheckedChange={() => handleExposureToggle('virtualBrand')}
                  data-testid="checkbox-virtual-brand"
                />
                <Label htmlFor="virtualBrand" className="font-normal cursor-pointer">
                  Operate a virtual brand
                </Label>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Safety & Underwriting */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Safety & Underwriting Information</h3>
            
            <div>
              <Label>Does management have at least 3 years' experience in managing foodservice establishments? *</Label>
              <RadioGroup
                value={formData.managementExperience}
                onValueChange={(value) => setFormData({ ...formData, managementExperience: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="mgmt-exp-yes" />
                  <Label htmlFor="mgmt-exp-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="mgmt-exp-no" />
                  <Label htmlFor="mgmt-exp-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Does the business have more than one location? *</Label>
              <RadioGroup
                value={formData.multipleLocations}
                onValueChange={(value) => setFormData({ ...formData, multipleLocations: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="multi-loc-yes" />
                  <Label htmlFor="multi-loc-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="multi-loc-no" />
                  <Label htmlFor="multi-loc-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Has the business filed any claims in the past 3 years? *</Label>
              <RadioGroup
                value={formData.claimsHistory}
                onValueChange={(value) => setFormData({ ...formData, claimsHistory: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="claims-yes" />
                  <Label htmlFor="claims-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="claims-no" />
                  <Label htmlFor="claims-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.claimsHistory === "yes" && (
              <>
                <div>
                  <Label htmlFor="numberOfClaims">Number of claims</Label>
                  <Input
                    id="numberOfClaims"
                    type="number"
                    value={formData.numberOfClaims}
                    onChange={(e) => setFormData({ ...formData, numberOfClaims: e.target.value })}
                    placeholder="0"
                    data-testid="input-num-claims"
                  />
                </div>
                <div>
                  <Label>Did the total incurred value of claims exceed $50,000?</Label>
                  <RadioGroup
                    value={formData.claimsExceed50k}
                    onValueChange={(value) => setFormData({ ...formData, claimsExceed50k: value })}
                  >
                    <div className="flex items-center space-x-2 mt-2">
                      <RadioGroupItem value="yes" id="exceed-yes" />
                      <Label htmlFor="exceed-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="exceed-no" />
                      <Label htmlFor="exceed-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </>
            )}

            <div>
              <Label>Does the establishment have more than 6 deep fat fryer units? *</Label>
              <RadioGroup
                value={formData.moreThan6Fryers}
                onValueChange={(value) => setFormData({ ...formData, moreThan6Fryers: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="fryers-yes" />
                  <Label htmlFor="fryers-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="fryers-no" />
                  <Label htmlFor="fryers-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Is the establishment responsible for a parking lot? *</Label>
              <RadioGroup
                value={formData.responsibleForParking}
                onValueChange={(value) => setFormData({ ...formData, responsibleForParking: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="parking-yes" />
                  <Label htmlFor="parking-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="parking-no" />
                  <Label htmlFor="parking-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Is the establishment cash only? *</Label>
              <RadioGroup
                value={formData.cashOnly}
                onValueChange={(value) => setFormData({ ...formData, cashOnly: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="cash-yes" />
                  <Label htmlFor="cash-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="cash-no" />
                  <Label htmlFor="cash-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            <h4 className="font-medium mt-6">Fire Safety & Security</h4>
            
            <div>
              <Label htmlFor="fireAlarmType">Fire Alarm Type *</Label>
              <Select
                value={formData.fireAlarmType}
                onValueChange={(value) => setFormData({ ...formData, fireAlarmType: value })}
              >
                <SelectTrigger data-testid="select-fire-alarm">
                  <SelectValue placeholder="Select fire alarm type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ul-certified">UL with Certificate</SelectItem>
                  <SelectItem value="central-station">Central Station</SelectItem>
                  <SelectItem value="local">Local</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="burglarAlarmType">Burglar Alarm Type *</Label>
              <Select
                value={formData.burglarAlarmType}
                onValueChange={(value) => setFormData({ ...formData, burglarAlarmType: value })}
              >
                <SelectTrigger data-testid="select-burglar-alarm">
                  <SelectValue placeholder="Select burglar alarm type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="central-station">Central Station</SelectItem>
                  <SelectItem value="local">Local</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="securityCameras">Security Cameras *</Label>
              <Select
                value={formData.securityCameras}
                onValueChange={(value) => setFormData({ ...formData, securityCameras: value })}
              >
                <SelectTrigger data-testid="select-cameras">
                  <SelectValue placeholder="Select camera type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="centrally-monitored">Centrally Monitored</SelectItem>
                  <SelectItem value="recording-only">Recording Only</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <h4 className="font-medium mt-6">Cooking Methods</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="solidFuel"
                  checked={cookingTypes.solidFuel}
                  onCheckedChange={() => handleCookingToggle('solidFuel')}
                  data-testid="checkbox-solid-fuel"
                />
                <Label htmlFor="solidFuel" className="font-normal cursor-pointer">
                  Solid fuel cooking
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="wok"
                  checked={cookingTypes.wok}
                  onCheckedChange={() => handleCookingToggle('wok')}
                  data-testid="checkbox-wok"
                />
                <Label htmlFor="wok" className="font-normal cursor-pointer">
                  Wok cooking
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="charbroiling"
                  checked={cookingTypes.charbroiling}
                  onCheckedChange={() => handleCookingToggle('charbroiling')}
                  data-testid="checkbox-charbroiling"
                />
                <Label htmlFor="charbroiling" className="font-normal cursor-pointer">
                  Charbroiling
                </Label>
              </div>
            </div>

            <div>
              <Label htmlFor="hoodCleaningFrequency">Hood/Duct Cleaning Frequency *</Label>
              <Select
                value={formData.hoodCleaningFrequency}
                onValueChange={(value) => setFormData({ ...formData, hoodCleaningFrequency: value })}
              >
                <SelectTrigger data-testid="select-hood-cleaning">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="semi-annually">Semi-annually</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                  <SelectItem value="not-applicable">Not applicable (no commercial cooking)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="thirdPartyDelivery">Third-Party Delivery Services</Label>
              <Select
                value={formData.thirdPartyDelivery}
                onValueChange={(value) => setFormData({ ...formData, thirdPartyDelivery: value })}
              >
                <SelectTrigger data-testid="select-delivery">
                  <SelectValue placeholder="Select delivery type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="app-based">Uber Eats, DoorDash, etc.</SelectItem>
                  <SelectItem value="robotic">Robotic delivery</SelectItem>
                  <SelectItem value="none">No third-party delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 4: Property Information */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Property Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="constructionType">Construction Type *</Label>
                <Select
                  value={formData.constructionType}
                  onValueChange={(value) => setFormData({ ...formData, constructionType: value })}
                >
                  <SelectTrigger data-testid="select-construction">
                    <SelectValue placeholder="Select construction type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frame">Frame</SelectItem>
                    <SelectItem value="joisted-masonry">Joisted Masonry</SelectItem>
                    <SelectItem value="non-combustible">Non-Combustible</SelectItem>
                    <SelectItem value="masonry-non-combustible">Masonry Non-Combustible</SelectItem>
                    <SelectItem value="modified-fire-resistive">Modified Fire Resistive</SelectItem>
                    <SelectItem value="fire-resistive">Fire Resistive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="roofType">Roof Type *</Label>
                <Select
                  value={formData.roofType}
                  onValueChange={(value) => setFormData({ ...formData, roofType: value })}
                >
                  <SelectTrigger data-testid="select-roof">
                    <SelectValue placeholder="Select roof type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shingle">Shingle</SelectItem>
                    <SelectItem value="membrane">Membrane</SelectItem>
                    <SelectItem value="metal">Metal</SelectItem>
                    <SelectItem value="tar-gravel">Tar and Gravel</SelectItem>
                    <SelectItem value="tile">Tile</SelectItem>
                    <SelectItem value="wood-shake">Wood Shake</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Is the building equipped with sprinklers? *</Label>
              <RadioGroup
                value={formData.sprinkler}
                onValueChange={(value) => setFormData({ ...formData, sprinkler: value })}
              >
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="sprinkler-yes" />
                  <Label htmlFor="sprinkler-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="sprinkler-no" />
                  <Label htmlFor="sprinkler-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="squareFootage">Total Square Footage *</Label>
              <Input
                id="squareFootage"
                type="number"
                value={formData.squareFootage}
                onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
                placeholder="0"
                data-testid="input-square-footage"
              />
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
                <Label htmlFor="latestRoofUpdate">Latest Roof Update</Label>
                <Input
                  id="latestRoofUpdate"
                  type="number"
                  value={formData.latestRoofUpdate}
                  onChange={(e) => setFormData({ ...formData, latestRoofUpdate: e.target.value })}
                  placeholder="YYYY"
                  data-testid="input-roof-update"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latestPlumbingUpdate">Latest Plumbing Update</Label>
                <Input
                  id="latestPlumbingUpdate"
                  type="number"
                  value={formData.latestPlumbingUpdate}
                  onChange={(e) => setFormData({ ...formData, latestPlumbingUpdate: e.target.value })}
                  placeholder="YYYY"
                  data-testid="input-plumbing-update"
                />
              </div>
              <div>
                <Label htmlFor="latestElectricalUpdate">Latest Electrical Update</Label>
                <Input
                  id="latestElectricalUpdate"
                  type="number"
                  value={formData.latestElectricalUpdate}
                  onChange={(e) => setFormData({ ...formData, latestElectricalUpdate: e.target.value })}
                  placeholder="YYYY"
                  data-testid="input-electrical-update"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="locationType">Location Type *</Label>
              <Select
                value={formData.locationType}
                onValueChange={(value) => setFormData({ ...formData, locationType: value })}
              >
                <SelectTrigger data-testid="select-location-type">
                  <SelectValue placeholder="Select location type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standalone">Stand alone building</SelectItem>
                  <SelectItem value="strip">Strip shopping center</SelectItem>
                  <SelectItem value="mall">Enclosed mall</SelectItem>
                  <SelectItem value="attached">Attached to habitational structure</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <h4 className="font-medium mt-6">Property Coverages</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="buildingLimit">Building Limit ($)</Label>
                <Input
                  id="buildingLimit"
                  type="number"
                  value={formData.buildingLimit}
                  onChange={(e) => setFormData({ ...formData, buildingLimit: e.target.value })}
                  placeholder="0"
                  data-testid="input-building-limit"
                />
              </div>
              <div>
                <Label htmlFor="tenantImprovementsLimit">Tenant's Improvements ($)</Label>
                <Input
                  id="tenantImprovementsLimit"
                  type="number"
                  value={formData.tenantImprovementsLimit}
                  onChange={(e) => setFormData({ ...formData, tenantImprovementsLimit: e.target.value })}
                  placeholder="0"
                  data-testid="input-tenant-limit"
                />
              </div>
              <div>
                <Label htmlFor="businessPersonalPropertyLimit">Business Personal Property ($)</Label>
                <Input
                  id="businessPersonalPropertyLimit"
                  type="number"
                  value={formData.businessPersonalPropertyLimit}
                  onChange={(e) => setFormData({ ...formData, businessPersonalPropertyLimit: e.target.value })}
                  placeholder="0"
                  data-testid="input-bpp-limit"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="propertyDeductible">Property Deductible</Label>
                <Select
                  value={formData.propertyDeductible}
                  onValueChange={(value) => setFormData({ ...formData, propertyDeductible: value })}
                >
                  <SelectTrigger data-testid="select-property-deductible">
                    <SelectValue placeholder="Select deductible" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500">$500</SelectItem>
                    <SelectItem value="1000">$1,000</SelectItem>
                    <SelectItem value="2500">$2,500</SelectItem>
                    <SelectItem value="5000">$5,000</SelectItem>
                    <SelectItem value="10000">$10,000</SelectItem>
                    <SelectItem value="25000">$25,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="windHailDeductible">Wind/Hail Deductible</Label>
                <Select
                  value={formData.windHailDeductible}
                  onValueChange={(value) => setFormData({ ...formData, windHailDeductible: value })}
                >
                  <SelectTrigger data-testid="select-wind-deductible">
                    <SelectValue placeholder="Select deductible" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no-separate">No separate deductible</SelectItem>
                    <SelectItem value="1-percent">1%</SelectItem>
                    <SelectItem value="2-percent">2%</SelectItem>
                    <SelectItem value="5-percent">5%</SelectItem>
                    <SelectItem value="no-coverage">No coverage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Liability & Sales */}
        {step === 5 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Liability Coverage & Sales Information</h3>
            
            <div>
              <Label htmlFor="generalLiabilityLimit">General Liability Limits *</Label>
              <Select
                value={formData.generalLiabilityLimit}
                onValueChange={(value) => setFormData({ ...formData, generalLiabilityLimit: value })}
              >
                <SelectTrigger data-testid="select-gl-limit">
                  <SelectValue placeholder="Select limits" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500k-1m">$500,000 / $1,000,000</SelectItem>
                  <SelectItem value="1m-2m">$1,000,000 / $2,000,000</SelectItem>
                  <SelectItem value="2m-4m">$2,000,000 / $4,000,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="grossAnnualSales">Gross Annual Sales ($) *</Label>
                <Input
                  id="grossAnnualSales"
                  type="number"
                  value={formData.grossAnnualSales}
                  onChange={(e) => setFormData({ ...formData, grossAnnualSales: e.target.value })}
                  placeholder="0"
                  data-testid="input-annual-sales"
                />
              </div>
              <div>
                <Label htmlFor="percentCatering">Percent from Catering (%)</Label>
                <Input
                  id="percentCatering"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.percentCatering}
                  onChange={(e) => setFormData({ ...formData, percentCatering: e.target.value })}
                  placeholder="0"
                  data-testid="input-percent-catering"
                />
              </div>
              <div>
                <Label htmlFor="percentAlcohol">Percent from Alcohol (%)</Label>
                <Input
                  id="percentAlcohol"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.percentAlcohol}
                  onChange={(e) => setFormData({ ...formData, percentAlcohol: e.target.value })}
                  placeholder="0"
                  data-testid="input-percent-alcohol"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="liquorLiabilityLimit">Liquor Liability Limits</Label>
              <Select
                value={formData.liquorLiabilityLimit}
                onValueChange={(value) => setFormData({ ...formData, liquorLiabilityLimit: value })}
              >
                <SelectTrigger data-testid="select-liquor-limit">
                  <SelectValue placeholder="Select limits" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-coverage">No coverage</SelectItem>
                  <SelectItem value="100k">$100,000 / $100,000</SelectItem>
                  <SelectItem value="300k">$300,000 / $300,000</SelectItem>
                  <SelectItem value="500k">$500,000 / $500,000</SelectItem>
                  <SelectItem value="1m">$1,000,000 / $1,000,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="hiredNonOwnedAutoLimit">Hired and Non-Owned Auto Limit</Label>
              <Select
                value={formData.hiredNonOwnedAutoLimit}
                onValueChange={(value) => setFormData({ ...formData, hiredNonOwnedAutoLimit: value })}
              >
                <SelectTrigger data-testid="select-auto-limit">
                  <SelectValue placeholder="Select limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-coverage">No coverage</SelectItem>
                  <SelectItem value="500k">$500,000</SelectItem>
                  <SelectItem value="1m">$1,000,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-muted/50 rounded-md">
              <p className="text-sm font-medium mb-2">Hired and Non-Owned Auto Acknowledgement</p>
              <p className="text-sm text-muted-foreground">
                Hired and non-owned autos will not be used for delivery of individual orders or catering.
              </p>
            </div>

            <h4 className="font-medium mt-6">Business History</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Does any of the following apply to the business, or any of its officers, owners, or partners?
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="felonyConviction"
                  checked={businessHistory.felonyConviction}
                  onCheckedChange={() => handleBusinessHistoryToggle('felonyConviction')}
                  data-testid="checkbox-felony"
                />
                <Label htmlFor="felonyConviction" className="font-normal cursor-pointer">
                  Been convicted of a felony in the past 5 years
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="bankruptcy"
                  checked={businessHistory.bankruptcy}
                  onCheckedChange={() => handleBusinessHistoryToggle('bankruptcy')}
                  data-testid="checkbox-bankruptcy"
                />
                <Label htmlFor="bankruptcy" className="font-normal cursor-pointer">
                  Declared bankruptcy
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lawsuits"
                  checked={businessHistory.lawsuits}
                  onCheckedChange={() => handleBusinessHistoryToggle('lawsuits')}
                  data-testid="checkbox-lawsuits"
                />
                <Label htmlFor="lawsuits" className="font-normal cursor-pointer">
                  Had business-related lawsuits, mediations, or arbitrations filed against them
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="potentialClaims"
                  checked={businessHistory.potentialClaims}
                  onCheckedChange={() => handleBusinessHistoryToggle('potentialClaims')}
                  data-testid="checkbox-potential-claims"
                />
                <Label htmlFor="potentialClaims" className="font-normal cursor-pointer">
                  Become aware of any losses, accidents, or circumstances that might give rise to a claim
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="insuranceCanceled"
                  checked={businessHistory.insuranceCanceled}
                  onCheckedChange={() => handleBusinessHistoryToggle('insuranceCanceled')}
                  data-testid="checkbox-insurance-canceled"
                />
                <Label htmlFor="insuranceCanceled" className="font-normal cursor-pointer">
                  Had commercial insurance coverage canceled, revoked, or non-renewed in the last 5 years
                </Label>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Additional Information */}
        {step === 6 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Additional Information & Document Upload</h3>
            
            <div>
              <Label htmlFor="businessConcept">Business Concept & Additional Information</Label>
              <Textarea
                id="businessConcept"
                value={formData.businessConcept}
                onChange={(e) => setFormData({ ...formData, businessConcept: e.target.value })}
                placeholder="Please provide a brief narrative of your restaurant concept, unique offerings, target market, and any other information that will help us understand your business..."
                rows={5}
                data-testid="textarea-business-concept"
              />
              <p className="text-xs text-muted-foreground mt-1">
                For new ventures: Include your business plan, menu concept, and experience background
              </p>
            </div>

            <div>
              <Label htmlFor="websiteUrl">Website or Social Media Links</Label>
              <Input
                id="websiteUrl"
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                placeholder="https://www.example.com or social media links"
                data-testid="input-website"
              />
              <p className="text-xs text-muted-foreground mt-1">
                If you don't have a website, provide links to any social media presence
              </p>
            </div>

            <h4 className="font-medium mt-6">Document Upload</h4>
            <div className="space-y-4">
              <div>
                <Label htmlFor="menu">Menu or Service Offerings</Label>
                <Input
                  id="menu"
                  type="file"
                  accept=".pdf,.jpg,.png"
                  data-testid="input-menu"
                />
                <p className="text-xs text-muted-foreground mt-1">Upload your current menu or list of offerings</p>
              </div>

              <div>
                <Label htmlFor="floorPlan">Floor Plan / Seating Layout</Label>
                <Input
                  id="floorPlan"
                  type="file"
                  accept=".pdf,.jpg,.png"
                  data-testid="input-floor-plan"
                />
                <p className="text-xs text-muted-foreground mt-1">Optional: Include dining room and kitchen layout</p>
              </div>

              <div>
                <Label htmlFor="financials">Financial Statements</Label>
                <Input
                  id="financials"
                  type="file"
                  accept=".pdf,.xls,.xlsx"
                  data-testid="input-financials"
                />
                <p className="text-xs text-muted-foreground mt-1">Recent P&L or projections for new businesses</p>
              </div>

              <div>
                <Label htmlFor="lossRuns">Loss Runs (if applicable)</Label>
                <Input
                  id="lossRuns"
                  type="file"
                  accept=".pdf"
                  data-testid="input-loss-runs"
                />
                <p className="text-xs text-muted-foreground mt-1">5 years of loss history if previously insured</p>
              </div>

              <div>
                <Label htmlFor="healthPermit">Health Permit / Licenses</Label>
                <Input
                  id="healthPermit"
                  type="file"
                  accept=".pdf,.jpg,.png"
                  data-testid="input-health-permit"
                />
                <p className="text-xs text-muted-foreground mt-1">Current health department permits and business licenses</p>
              </div>

              <div>
                <Label htmlFor="liquorLicense">Liquor License (if applicable)</Label>
                <Input
                  id="liquorLicense"
                  type="file"
                  accept=".pdf,.jpg,.png"
                  data-testid="input-liquor-license"
                />
                <p className="text-xs text-muted-foreground mt-1">If you serve alcohol, upload your liquor license</p>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-md">
              <h4 className="font-medium mb-2">What Happens Next?</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Your submission will be reviewed by our restaurant insurance specialists</li>
                <li>We'll evaluate your operations, safety measures, and risk factors</li>
                <li>You'll receive a comprehensive BOP quote within 24-48 hours</li>
                <li>Our team can provide risk management guidance specific to restaurants</li>
                <li>We offer competitive rates for establishments with strong safety practices</li>
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
              Submit Restaurant BOP Application
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}