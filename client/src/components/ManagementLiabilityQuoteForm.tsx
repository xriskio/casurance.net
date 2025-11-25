import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SERVICE_STATES } from "@shared/constants/states";

export default function ManagementLiabilityQuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Company Information
    companyName: "",
    email: "",
    phone: "",
    mailingAddress: "",
    city: "",
    state: "",
    zipCode: "",
    website: "",
    yearsInBusiness: "",
    effectiveDate: "",
    
    // Coverage Information
    coverageType: "",
    doLimit: "",
    eplLimit: "",
    fiduciaryLimit: "",
    crimeLimit: "",
    retentionAmount: "",
    
    // Company Details
    numberOfEmployees: "",
    annualRevenue: "",
    totalAssets: "",
    industryType: "",
    publiclyTraded: "",
    
    // Claims History
    priorClaims: "",
    claimsDetails: "",
    
    // Additional Information
    additionalComments: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/management-liability-quotes", {
        ...formData,
        payload: { ...formData }
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

  const nextStep = () => setStep(Math.min(step + 1, 4));
  const prevStep = () => setStep(Math.max(step - 1, 1));

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Quote Request Submitted!</h2>
          <p className="text-muted-foreground mb-4">
            Thank you for submitting your management liability insurance quote request.
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
          {[1, 2, 3, 4].map((num) => (
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
              {num < 4 && (
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
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  data-testid="input-company-name"
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
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  data-testid="input-website"
                />
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
                  data-testid="input-years-in-business"
                />
              </div>
              <div>
                <Label htmlFor="effectiveDate">Effective Date *</Label>
                <Input
                  id="effectiveDate"
                  name="effectiveDate"
                  type="date"
                  value={formData.effectiveDate}
                  onChange={handleInputChange}
                  required
                  data-testid="input-effective-date"
                />
              </div>
            </div>
            
            <div>
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
            
            <div className="grid md:grid-cols-3 gap-4">
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
                  data-testid="input-zip-code"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Coverage Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="coverageType">Coverage Type *</Label>
              <Select value={formData.coverageType} onValueChange={(value) => handleSelectChange("coverageType", value)}>
                <SelectTrigger id="coverageType" data-testid="select-coverage-type">
                  <SelectValue placeholder="Select coverage type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="d&o">Directors & Officers (D&O)</SelectItem>
                  <SelectItem value="epl">Employment Practices Liability (EPL)</SelectItem>
                  <SelectItem value="fiduciary">Fiduciary Liability</SelectItem>
                  <SelectItem value="crime">Crime Coverage</SelectItem>
                  <SelectItem value="package">Management Liability Package</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="doLimit">D&O Limit</Label>
                <Select value={formData.doLimit} onValueChange={(value) => handleSelectChange("doLimit", value)}>
                  <SelectTrigger id="doLimit" data-testid="select-do-limit">
                    <SelectValue placeholder="Select limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1000000">$1,000,000</SelectItem>
                    <SelectItem value="2000000">$2,000,000</SelectItem>
                    <SelectItem value="5000000">$5,000,000</SelectItem>
                    <SelectItem value="10000000">$10,000,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="eplLimit">EPL Limit</Label>
                <Select value={formData.eplLimit} onValueChange={(value) => handleSelectChange("eplLimit", value)}>
                  <SelectTrigger id="eplLimit" data-testid="select-epl-limit">
                    <SelectValue placeholder="Select limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1000000">$1,000,000</SelectItem>
                    <SelectItem value="2000000">$2,000,000</SelectItem>
                    <SelectItem value="5000000">$5,000,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fiduciaryLimit">Fiduciary Limit</Label>
                <Select value={formData.fiduciaryLimit} onValueChange={(value) => handleSelectChange("fiduciaryLimit", value)}>
                  <SelectTrigger id="fiduciaryLimit" data-testid="select-fiduciary-limit">
                    <SelectValue placeholder="Select limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1000000">$1,000,000</SelectItem>
                    <SelectItem value="2000000">$2,000,000</SelectItem>
                    <SelectItem value="5000000">$5,000,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="crimeLimit">Crime Limit</Label>
                <Select value={formData.crimeLimit} onValueChange={(value) => handleSelectChange("crimeLimit", value)}>
                  <SelectTrigger id="crimeLimit" data-testid="select-crime-limit">
                    <SelectValue placeholder="Select limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500000">$500,000</SelectItem>
                    <SelectItem value="1000000">$1,000,000</SelectItem>
                    <SelectItem value="2000000">$2,000,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="retentionAmount">Retention Amount</Label>
              <Select value={formData.retentionAmount} onValueChange={(value) => handleSelectChange("retentionAmount", value)}>
                <SelectTrigger id="retentionAmount" data-testid="select-retention-amount">
                  <SelectValue placeholder="Select retention" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">$0</SelectItem>
                  <SelectItem value="25000">$25,000</SelectItem>
                  <SelectItem value="50000">$50,000</SelectItem>
                  <SelectItem value="100000">$100,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Company Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numberOfEmployees">Number of Employees *</Label>
                <Input
                  id="numberOfEmployees"
                  name="numberOfEmployees"
                  type="number"
                  value={formData.numberOfEmployees}
                  onChange={handleInputChange}
                  required
                  data-testid="input-number-of-employees"
                />
              </div>
              <div>
                <Label htmlFor="annualRevenue">Annual Revenue *</Label>
                <Input
                  id="annualRevenue"
                  name="annualRevenue"
                  type="number"
                  value={formData.annualRevenue}
                  onChange={handleInputChange}
                  required
                  data-testid="input-annual-revenue"
                />
              </div>
              <div>
                <Label htmlFor="totalAssets">Total Assets *</Label>
                <Input
                  id="totalAssets"
                  name="totalAssets"
                  type="number"
                  value={formData.totalAssets}
                  onChange={handleInputChange}
                  required
                  data-testid="input-total-assets"
                />
              </div>
              <div>
                <Label htmlFor="industryType">Industry Type *</Label>
                <Input
                  id="industryType"
                  name="industryType"
                  value={formData.industryType}
                  onChange={handleInputChange}
                  required
                  data-testid="input-industry-type"
                />
              </div>
            </div>
            
            <div>
              <Label>Publicly Traded?</Label>
              <RadioGroup
                value={formData.publiclyTraded}
                onValueChange={(value) => handleSelectChange("publiclyTraded", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="publicly-traded-yes" data-testid="radio-publicly-traded-yes" />
                  <Label htmlFor="publicly-traded-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="publicly-traded-no" data-testid="radio-publicly-traded-no" />
                  <Label htmlFor="publicly-traded-no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Claims History & Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Prior Claims in Last 5 Years?</Label>
              <RadioGroup
                value={formData.priorClaims}
                onValueChange={(value) => handleSelectChange("priorClaims", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="prior-claims-yes" data-testid="radio-prior-claims-yes" />
                  <Label htmlFor="prior-claims-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="prior-claims-no" data-testid="radio-prior-claims-no" />
                  <Label htmlFor="prior-claims-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.priorClaims === "yes" && (
              <div>
                <Label htmlFor="claimsDetails">Claims Details</Label>
                <Textarea
                  id="claimsDetails"
                  name="claimsDetails"
                  value={formData.claimsDetails}
                  onChange={handleInputChange}
                  placeholder="Please provide details about prior claims..."
                  rows={4}
                  data-testid="textarea-claims-details"
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="additionalComments">Additional Comments</Label>
              <Textarea
                id="additionalComments"
                name="additionalComments"
                value={formData.additionalComments}
                onChange={handleInputChange}
                placeholder="Any additional information you'd like to provide..."
                rows={4}
                data-testid="textarea-additional-comments"
              />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={step === 1 || isLoading}
          data-testid="button-previous"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        {step < 4 ? (
          <Button type="button" onClick={nextStep} data-testid="button-next">
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" disabled={isLoading} data-testid="button-submit">
            {isLoading ? "Submitting..." : "Submit Quote Request"}
          </Button>
        )}
      </div>
    </form>
  );
}
