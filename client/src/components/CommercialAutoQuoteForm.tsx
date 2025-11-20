import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, CheckCircle, Plus, X } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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
  yearsExperience: string;
  dateOfHire: string;
}

export default function CommercialAutoQuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Insured Information
    insuredName: "",
    email: "",
    phone: "",
    dba: "",
    contactName: "",
    businessWebsite: "",
    yearsInBusiness: "",
    businessType: "",
    mailingAddress: "",
    city: "",
    state: "",
    zipCode: "",
    cpucNumber: "",
    tcpNumber: "",
    
    // Coverage Information
    effectiveDate: "",
    liabilityLimit: "",
    currentCarrier: "",
    currentPremium: "",
    policyExpiration: "",
    operatingRadius: "",
    statesOfOperation: "",
    filingsNeeded: [] as string[],
    
    // Loss History
    lossHistory: "",
    
    // Additional Information
    additionalInfo: "",
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { year: "", make: "", model: "", vin: "", seatingCapacity: "", value: "" }
  ]);

  const [drivers, setDrivers] = useState<Driver[]>([
    { fullName: "", dateOfBirth: "", licenseNumber: "", licenseState: "", yearsExperience: "", dateOfHire: "" }
  ]);

  const addVehicle = () => {
    setVehicles([...vehicles, { year: "", make: "", model: "", vin: "", seatingCapacity: "", value: "" }]);
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
    setDrivers([...drivers, { fullName: "", dateOfBirth: "", licenseNumber: "", licenseState: "", yearsExperience: "", dateOfHire: "" }]);
  };

  const removeDriver = (index: number) => {
    setDrivers(drivers.filter((_, i) => i !== index));
  };

  const updateDriver = (index: number, field: keyof Driver, value: string) => {
    const updated = [...drivers];
    updated[index][field] = value;
    setDrivers(updated);
  };

  const handleFilingToggle = (filing: string) => {
    setFormData(prev => ({
      ...prev,
      filingsNeeded: prev.filingsNeeded.includes(filing)
        ? prev.filingsNeeded.filter(f => f !== filing)
        : [...prev.filingsNeeded, filing]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/commercial-auto-quotes", {
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
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">Commercial Auto Quote Request Received!</h3>
          <p className="text-muted-foreground mb-4">
            Thank you for your detailed submission.
          </p>
          <p className="text-lg font-semibold mb-2">
            Reference Number: {referenceNumber}
          </p>
          <p className="text-muted-foreground mb-6">
            One of our commercial auto specialists will review your information and contact you within 24 hours with a competitive quote.
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
        <CardTitle>Commercial Auto Insurance Quote Request</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Complete this comprehensive form to receive an accurate quote for your commercial auto insurance needs.
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
                <Label htmlFor="email">Contact Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                  data-testid="input-contact-email"
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
                <Label htmlFor="businessType">Business Type *</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                >
                  <SelectTrigger data-testid="select-business-type">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="limousine">Limousine Service</SelectItem>
                    <SelectItem value="taxi">Taxi Service</SelectItem>
                    <SelectItem value="tnc">TNC / Rideshare</SelectItem>
                    <SelectItem value="nemt">NEMT</SelectItem>
                    <SelectItem value="bus">Bus / Motorcoach</SelectItem>
                    <SelectItem value="school-bus">School Bus</SelectItem>
                    <SelectItem value="delivery">Delivery Service</SelectItem>
                    <SelectItem value="trucking">Trucking / Freight</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cpucNumber">CPUC Number (if applicable)</Label>
                <Input
                  id="cpucNumber"
                  value={formData.cpucNumber}
                  onChange={(e) => setFormData({ ...formData, cpucNumber: e.target.value })}
                  placeholder="CA CPUC Number"
                  data-testid="input-cpuc-number"
                />
              </div>
              <div>
                <Label htmlFor="tcpNumber">TCP Number (if applicable)</Label>
                <Input
                  id="tcpNumber"
                  value={formData.tcpNumber}
                  onChange={(e) => setFormData({ ...formData, tcpNumber: e.target.value })}
                  placeholder="TCP License Number"
                  data-testid="input-tcp-number"
                />
              </div>
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
                <Label htmlFor="liabilityLimit">Requested Liability Limit *</Label>
                <Select
                  value={formData.liabilityLimit}
                  onValueChange={(value) => setFormData({ ...formData, liabilityLimit: value })}
                >
                  <SelectTrigger data-testid="select-liability-limit">
                    <SelectValue placeholder="Select liability limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500k">$500,000 CSL</SelectItem>
                    <SelectItem value="1m">$1,000,000 CSL</SelectItem>
                    <SelectItem value="1.5m">$1,500,000 CSL</SelectItem>
                    <SelectItem value="2m">$2,000,000 CSL</SelectItem>
                    <SelectItem value="5m">$5,000,000 CSL</SelectItem>
                    <SelectItem value="other">Other Amount</SelectItem>
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
                <Label htmlFor="currentPremium">Current Annual Premium</Label>
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
                <Label htmlFor="operatingRadius">Operating Radius (miles) *</Label>
                <Select
                  value={formData.operatingRadius}
                  onValueChange={(value) => setFormData({ ...formData, operatingRadius: value })}
                >
                  <SelectTrigger data-testid="select-operating-radius">
                    <SelectValue placeholder="Select operating radius" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local (50 miles)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (51-200 miles)</SelectItem>
                    <SelectItem value="long-distance">Long Distance (201+ miles)</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="statesOfOperation">States of Operation *</Label>
              <Input
                id="statesOfOperation"
                value={formData.statesOfOperation}
                onChange={(e) => setFormData({ ...formData, statesOfOperation: e.target.value })}
                placeholder="CA, NV, AZ, etc."
                data-testid="input-states-of-operation"
              />
              <p className="text-xs text-muted-foreground mt-1">Separate multiple states with commas</p>
            </div>

            <div>
              <Label>Filings Needed</Label>
              <div className="space-y-2 mt-2">
                {['MCS-90 (Interstate)', 'Form E (Intrastate)', 'Form H', 'None'].map((filing) => (
                  <div key={filing} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={filing}
                      checked={formData.filingsNeeded.includes(filing)}
                      onChange={() => handleFilingToggle(filing)}
                      className="rounded border-gray-300"
                      data-testid={`checkbox-filing-${filing.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    />
                    <label htmlFor={filing} className="text-sm cursor-pointer">
                      {filing}
                    </label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Hold Ctrl/Cmd to select multiple</p>
            </div>
          </div>
        )}

        {/* Step 3: Vehicle Information */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Vehicle Information</h3>
              <Button type="button" variant="outline" size="sm" onClick={addVehicle} data-testid="button-add-vehicle">
                <Plus className="h-4 w-4 mr-1" />
                Add Vehicle
              </Button>
            </div>

            {vehicles.map((vehicle, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-4">
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
                    <Label>Year *</Label>
                    <Input
                      value={vehicle.year}
                      onChange={(e) => updateVehicle(index, 'year', e.target.value)}
                      placeholder="2024"
                      data-testid={`input-vehicle-year-${index}`}
                    />
                  </div>
                  <div>
                    <Label>Make *</Label>
                    <Input
                      value={vehicle.make}
                      onChange={(e) => updateVehicle(index, 'make', e.target.value)}
                      placeholder="Mercedes"
                      data-testid={`input-vehicle-make-${index}`}
                    />
                  </div>
                  <div>
                    <Label>Model *</Label>
                    <Input
                      value={vehicle.model}
                      onChange={(e) => updateVehicle(index, 'model', e.target.value)}
                      placeholder="Sprinter"
                      data-testid={`input-vehicle-model-${index}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label>VIN *</Label>
                    <Input
                      value={vehicle.vin}
                      onChange={(e) => updateVehicle(index, 'vin', e.target.value)}
                      placeholder="17-character VIN"
                      maxLength={17}
                      data-testid={`input-vehicle-vin-${index}`}
                    />
                  </div>
                  <div>
                    <Label>Seating Capacity *</Label>
                    <Input
                      type="number"
                      value={vehicle.seatingCapacity}
                      onChange={(e) => updateVehicle(index, 'seatingCapacity', e.target.value)}
                      placeholder="8"
                      data-testid={`input-vehicle-seating-${index}`}
                    />
                  </div>
                  <div>
                    <Label>Value *</Label>
                    <Input
                      type="number"
                      value={vehicle.value}
                      onChange={(e) => updateVehicle(index, 'value', e.target.value)}
                      placeholder="50000"
                      data-testid={`input-vehicle-value-${index}`}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Step 4: Driver Information */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Driver Information</h3>
              <Button type="button" variant="outline" size="sm" onClick={addDriver} data-testid="button-add-driver">
                <Plus className="h-4 w-4 mr-1" />
                Add Driver
              </Button>
            </div>

            {drivers.map((driver, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-4">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name *</Label>
                    <Input
                      value={driver.fullName}
                      onChange={(e) => updateDriver(index, 'fullName', e.target.value)}
                      placeholder="John Doe"
                      data-testid={`input-driver-name-${index}`}
                    />
                  </div>
                  <div>
                    <Label>Date of Birth *</Label>
                    <Input
                      type="date"
                      value={driver.dateOfBirth}
                      onChange={(e) => updateDriver(index, 'dateOfBirth', e.target.value)}
                      data-testid={`input-driver-dob-${index}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label>License Number *</Label>
                    <Input
                      value={driver.licenseNumber}
                      onChange={(e) => updateDriver(index, 'licenseNumber', e.target.value)}
                      placeholder="D1234567"
                      data-testid={`input-driver-license-${index}`}
                    />
                  </div>
                  <div>
                    <Label>License State *</Label>
                    <Input
                      value={driver.licenseState}
                      onChange={(e) => updateDriver(index, 'licenseState', e.target.value)}
                      placeholder="CA"
                      maxLength={2}
                      data-testid={`input-driver-state-${index}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label>Years of Commercial Driving Experience *</Label>
                    <Input
                      type="number"
                      value={driver.yearsExperience}
                      onChange={(e) => updateDriver(index, 'yearsExperience', e.target.value)}
                      placeholder="5"
                      data-testid={`input-driver-experience-${index}`}
                    />
                  </div>
                  <div>
                    <Label>Date of Hire *</Label>
                    <Input
                      type="date"
                      value={driver.dateOfHire}
                      onChange={(e) => updateDriver(index, 'dateOfHire', e.target.value)}
                      data-testid={`input-driver-hire-${index}`}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Step 5: Loss History */}
        {step === 5 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Loss History (Last 3 Years)</h3>
            
            <div>
              <Label htmlFor="lossHistory">Please provide details of any claims or losses in the past 3 years</Label>
              <Textarea
                id="lossHistory"
                value={formData.lossHistory}
                onChange={(e) => setFormData({ ...formData, lossHistory: e.target.value })}
                placeholder="Include date, type of loss, claim amount, and current status..."
                rows={6}
                data-testid="textarea-loss-history"
              />
            </div>

            <div>
              <Label htmlFor="lossRuns">Upload Loss Runs (if available)</Label>
              <Input
                id="lossRuns"
                type="file"
                accept=".pdf,.doc,.docx"
                data-testid="input-loss-runs"
              />
              <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or DOCX format</p>
            </div>

            <div>
              <Label htmlFor="mvrs">Upload MVRs (if available)</Label>
              <Input
                id="mvrs"
                type="file"
                accept=".pdf,.doc,.docx"
                multiple
                data-testid="input-mvrs"
              />
              <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or DOCX format - Multiple files allowed</p>
            </div>
          </div>
        )}

        {/* Step 6: Additional Information */}
        {step === 6 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Additional Information</h3>
            
            <div>
              <Label htmlFor="additionalInfo">Any additional information that may help us provide an accurate quote</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                placeholder="Include any special circumstances, coverage requirements, or questions you may have..."
                rows={6}
                data-testid="textarea-additional-info"
              />
            </div>

            <div className="bg-muted/50 p-4 rounded-md">
              <h4 className="font-medium mb-2">What Happens Next?</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Your submission will be reviewed by our commercial auto specialists</li>
                <li>We'll contact you within 24 hours to discuss your needs</li>
                <li>You'll receive a competitive quote tailored to your operation</li>
                <li>Our team will assist with all regulatory filings and certificates</li>
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
              Submit Auto Liability Risk
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
