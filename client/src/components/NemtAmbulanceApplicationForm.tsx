import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Upload, CheckCircle2 } from "lucide-react";

const applicationSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  yearsInBusiness: z.string().optional(),
  numberOfVehicles: z.string().optional(),
  numberOfDrivers: z.string().optional(),
  operatingRadius: z.string().optional(),
  autoLiabilityCoverage: z.string().min(1, "Please select coverage amount"),
  autoPhysicalDamage: z.string(),
  hnoaCoverage: z.string(),
  workersCompensation: z.string(),
  generalLiability: z.string(),
  professionalLiability: z.string(),
  umbrellaCoverage: z.string(),
  excessAutoLiability: z.string(),
  payload: z.any(),
});

type FormData = z.infer<typeof applicationSchema>;

interface Props {
  applicationType: "nemt" | "ambulance";
  onSuccess?: () => void;
}

export default function NemtAmbulanceApplicationForm({ applicationType, onSuccess }: Props) {
  const [step, setStep] = useState(1);
  const [vehicleFile, setVehicleFile] = useState<File | null>(null);
  const [driverFile, setDriverFile] = useState<File | null>(null);
  const [lossRunsFile, setLossRunsFile] = useState<File | null>(null);
  const [customLiabilityAmount, setCustomLiabilityAmount] = useState("");
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      autoPhysicalDamage: "no",
      hnoaCoverage: "no",
      workersCompensation: "no",
      generalLiability: "no",
      professionalLiability: "no",
      umbrellaCoverage: "no",
      excessAutoLiability: "no",
      payload: {},
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const { payload: _unused, ...formFields } = data;
      const payload = { files: { hasVehicleList: !!vehicleFile, hasDriverList: !!driverFile, hasLossRuns: !!lossRunsFile } };
      const applicationData = { ...formFields, payload };
      
      const formData = new FormData();
      formData.append("applicationData", JSON.stringify(applicationData));
      
      if (vehicleFile) formData.append("vehicleList", vehicleFile);
      if (driverFile) formData.append("driverList", driverFile);
      if (lossRunsFile) formData.append("lossRuns", lossRunsFile);

      const endpoint = applicationType === "nemt" ? "/api/nemt-applications" : "/api/ambulance-applications";
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit application");
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: `Your ${applicationType === "nemt" ? "NEMT" : "Ambulance"} insurance application has been submitted successfully.`,
      });
      form.reset();
      setStep(1);
      setVehicleFile(null);
      setDriverFile(null);
      setLossRunsFile(null);
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

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(step);
    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) setStep(step + 1);
  };

  const getFieldsForStep = (currentStep: number): string[] => {
    switch (currentStep) {
      case 1:
        return ["businessName", "contactName", "email", "phone"];
      case 2:
        return ["address", "city", "state", "zipCode", "yearsInBusiness", "numberOfVehicles", "numberOfDrivers", "operatingRadius"];
      case 3:
        return ["autoLiabilityCoverage"];
      default:
        return [];
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="businessName" data-testid="label-business-name">Business Name *</Label>
              <Input id="businessName" {...form.register("businessName")} data-testid="input-business-name" />
              {form.formState.errors.businessName && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.businessName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="contactName" data-testid="label-contact-name">Contact Name *</Label>
              <Input id="contactName" {...form.register("contactName")} data-testid="input-contact-name" />
              {form.formState.errors.contactName && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.contactName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email" data-testid="label-email">Email *</Label>
              <Input id="email" type="email" {...form.register("email")} data-testid="input-email" />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone" data-testid="label-phone">Phone *</Label>
              <Input id="phone" {...form.register("phone")} data-testid="input-phone" />
              {form.formState.errors.phone && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.phone.message}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="address" data-testid="label-address">Address</Label>
              <Input id="address" {...form.register("address")} data-testid="input-address" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city" data-testid="label-city">City</Label>
                <Input id="city" {...form.register("city")} data-testid="input-city" />
              </div>
              <div>
                <Label htmlFor="state" data-testid="label-state">State</Label>
                <Input id="state" {...form.register("state")} data-testid="input-state" />
              </div>
              <div>
                <Label htmlFor="zipCode" data-testid="label-zip">Zip Code</Label>
                <Input id="zipCode" {...form.register("zipCode")} data-testid="input-zip" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="yearsInBusiness" data-testid="label-years">Years in Business</Label>
                <Input id="yearsInBusiness" {...form.register("yearsInBusiness")} data-testid="input-years" />
              </div>
              <div>
                <Label htmlFor="operatingRadius" data-testid="label-radius">Operating Radius (miles)</Label>
                <Input id="operatingRadius" {...form.register("operatingRadius")} data-testid="input-radius" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numberOfVehicles" data-testid="label-vehicles">Number of Vehicles</Label>
                <Input id="numberOfVehicles" {...form.register("numberOfVehicles")} data-testid="input-vehicles" />
              </div>
              <div>
                <Label htmlFor="numberOfDrivers" data-testid="label-drivers">Number of Drivers</Label>
                <Input id="numberOfDrivers" {...form.register("numberOfDrivers")} data-testid="input-drivers" />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="autoLiability" data-testid="label-auto-liability">Auto Liability Coverage Amount *</Label>
              <Select onValueChange={(value) => form.setValue("autoLiabilityCoverage", value)}>
                <SelectTrigger data-testid="select-auto-liability">
                  <SelectValue placeholder="Select coverage amount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1000000" data-testid="option-1m">$1,000,000</SelectItem>
                  <SelectItem value="3000000" data-testid="option-3m">$3,000,000</SelectItem>
                  <SelectItem value="5000000" data-testid="option-5m">$5,000,000</SelectItem>
                  <SelectItem value="custom" data-testid="option-custom">Other Amount</SelectItem>
                </SelectContent>
              </Select>
              {form.watch("autoLiabilityCoverage") === "custom" && (
                <div className="mt-2">
                  <Input
                    placeholder="Enter custom amount"
                    value={customLiabilityAmount}
                    onChange={(e) => {
                      setCustomLiabilityAmount(e.target.value);
                      form.setValue("autoLiabilityCoverage", e.target.value);
                    }}
                    data-testid="input-custom-liability"
                  />
                </div>
              )}
              {form.formState.errors.autoLiabilityCoverage && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.autoLiabilityCoverage.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="autoPhysicalDamage" 
                  checked={form.watch("autoPhysicalDamage") === "yes"}
                  onCheckedChange={(checked) => form.setValue("autoPhysicalDamage", checked ? "yes" : "no")}
                  data-testid="checkbox-physical-damage"
                />
                <Label htmlFor="autoPhysicalDamage" className="cursor-pointer">Auto Physical Damage</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hnoaCoverage" 
                  checked={form.watch("hnoaCoverage") === "yes"}
                  onCheckedChange={(checked) => form.setValue("hnoaCoverage", checked ? "yes" : "no")}
                  data-testid="checkbox-hnoa"
                />
                <Label htmlFor="hnoaCoverage" className="cursor-pointer">HNOA / Hire and Non-Owned Auto (1M CSL)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="workersCompensation" 
                  checked={form.watch("workersCompensation") === "yes"}
                  onCheckedChange={(checked) => form.setValue("workersCompensation", checked ? "yes" : "no")}
                  data-testid="checkbox-workers-comp"
                />
                <Label htmlFor="workersCompensation" className="cursor-pointer">Workers' Compensation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="generalLiability" 
                  checked={form.watch("generalLiability") === "yes"}
                  onCheckedChange={(checked) => form.setValue("generalLiability", checked ? "yes" : "no")}
                  data-testid="checkbox-general-liability"
                />
                <Label htmlFor="generalLiability" className="cursor-pointer">General Liability</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="professionalLiability" 
                  checked={form.watch("professionalLiability") === "yes"}
                  onCheckedChange={(checked) => form.setValue("professionalLiability", checked ? "yes" : "no")}
                  data-testid="checkbox-professional-liability"
                />
                <Label htmlFor="professionalLiability" className="cursor-pointer">Professional Liability</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="umbrellaCoverage" 
                  checked={form.watch("umbrellaCoverage") === "yes"}
                  onCheckedChange={(checked) => form.setValue("umbrellaCoverage", checked ? "yes" : "no")}
                  data-testid="checkbox-umbrella"
                />
                <Label htmlFor="umbrellaCoverage" className="cursor-pointer">Umbrella Coverage</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="excessAutoLiability" 
                  checked={form.watch("excessAutoLiability") === "yes"}
                  onCheckedChange={(checked) => form.setValue("excessAutoLiability", checked ? "yes" : "no")}
                  data-testid="checkbox-excess-auto"
                />
                <Label htmlFor="excessAutoLiability" className="cursor-pointer">Excess Auto Liability (up to $20,000,000)</Label>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">Upload your vehicle list, driver list, and loss runs for the last 5 years. Accepted formats: PDF, Excel (XLS, XLSX), CSV</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="vehicleList" data-testid="label-vehicle-list">Vehicle List (Excel or PDF)</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    id="vehicleList"
                    accept=".pdf,.xlsx,.xls,.csv"
                    onChange={(e) => setVehicleFile(e.target.files?.[0] || null)}
                    className="hidden"
                    data-testid="input-vehicle-file"
                  />
                  <label htmlFor="vehicleList">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover-elevate">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" aria-hidden="true" />
                      <p className="text-sm font-medium">{vehicleFile ? vehicleFile.name : "Click to upload vehicle list"}</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, Excel, or CSV (max 10MB)</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="driverList" data-testid="label-driver-list">Driver List (Excel or PDF)</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    id="driverList"
                    accept=".pdf,.xlsx,.xls,.csv"
                    onChange={(e) => setDriverFile(e.target.files?.[0] || null)}
                    className="hidden"
                    data-testid="input-driver-file"
                  />
                  <label htmlFor="driverList">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover-elevate">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" aria-hidden="true" />
                      <p className="text-sm font-medium">{driverFile ? driverFile.name : "Click to upload driver list"}</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, Excel, or CSV (max 10MB)</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="lossRuns" data-testid="label-loss-runs">Loss Runs (Last 5 Years) (PDF)</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    id="lossRuns"
                    accept=".pdf"
                    onChange={(e) => setLossRunsFile(e.target.files?.[0] || null)}
                    className="hidden"
                    data-testid="input-loss-runs-file"
                  />
                  <label htmlFor="lossRuns">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover-elevate">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" aria-hidden="true" />
                      <p className="text-sm font-medium">{lossRunsFile ? lossRunsFile.name : "Click to upload loss runs"}</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF only (max 10MB)</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {applicationType === "nemt" ? "NEMT & Paratransit" : "Ambulance"} Insurance Application
        </CardTitle>
        <CardDescription>
          Step {step} of 4: {["Business Information", "Operations Details", "Coverage Selection", "Document Upload"][step - 1]}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {renderStep()}

          <div className="flex justify-between pt-6">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)} data-testid="button-previous">
                <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                Previous
              </Button>
            )}
            {step < 4 ? (
              <Button type="button" onClick={nextStep} className="ml-auto" data-testid="button-next">
                Next
                <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
              </Button>
            ) : (
              <Button type="submit" disabled={mutation.isPending} className="ml-auto" data-testid="button-submit">
                {mutation.isPending ? "Submitting..." : (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" aria-hidden="true" />
                    Submit Application
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
