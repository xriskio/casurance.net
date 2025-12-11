import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAgentAuth } from "@/hooks/use-agent-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Printer, Check, Clock, FileText, Send, CheckCircle2, XCircle } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const STATUS_OPTIONS = [
  { value: "new", label: "New Lead", icon: FileText, color: "bg-blue-500" },
  { value: "contacted", label: "Contacted", icon: Send, color: "bg-yellow-500" },
  { value: "quoted", label: "Quote Sent", icon: Clock, color: "bg-purple-500" },
  { value: "follow-up", label: "Follow Up", icon: Clock, color: "bg-orange-500" },
  { value: "completed", label: "Completed/Bound", icon: CheckCircle2, color: "bg-green-500" },
  { value: "declined", label: "Declined/Lost", icon: XCircle, color: "bg-red-500" },
];

function getStatusInfo(status: string) {
  return STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];
}

function formatFieldName(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function renderValue(value: any, depth = 0): JSX.Element {
  if (value === null || value === undefined || value === "") {
    return <span className="text-muted-foreground italic">Not provided</span>;
  }

  if (typeof value === "boolean") {
    return (
      <Badge variant={value ? "default" : "secondary"}>
        {value ? "Yes" : "No"}
      </Badge>
    );
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span className="text-muted-foreground italic">None</span>;
    }
    return (
      <div className="flex flex-wrap gap-2">
        {value.map((item, index) => (
          <Badge key={index} variant="outline" className="font-normal">
            {typeof item === "object" ? JSON.stringify(item) : String(item)}
          </Badge>
        ))}
      </div>
    );
  }

  if (typeof value === "object") {
    return (
      <div className={`${depth > 0 ? "ml-4" : ""} space-y-2`}>
        {Object.entries(value).map(([key, val]) => (
          <div key={key} className="grid grid-cols-[180px_1fr] gap-2 py-1 border-b border-border/50 last:border-0">
            <span className="text-sm text-muted-foreground">{formatFieldName(key)}:</span>
            <div className="text-sm">{renderValue(val, depth + 1)}</div>
          </div>
        ))}
      </div>
    );
  }

  return <span>{String(value)}</span>;
}

function StatusProgressBar({ currentStatus }: { currentStatus: string }) {
  const currentIndex = STATUS_OPTIONS.findIndex(s => s.value === currentStatus);
  const isDeclined = currentStatus === "declined";

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {STATUS_OPTIONS.filter(s => s.value !== "declined").map((status, index) => {
          const isActive = index <= currentIndex && !isDeclined;
          const isCurrent = status.value === currentStatus;
          const StatusIcon = status.icon;

          return (
            <div key={status.value} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isActive ? status.color : "bg-muted"
                } ${isCurrent ? "ring-2 ring-offset-2 ring-primary" : ""}`}
              >
                <StatusIcon className={`w-5 h-5 ${isActive ? "text-white" : "text-muted-foreground"}`} />
              </div>
              <span className={`text-xs mt-1 text-center ${isCurrent ? "font-semibold" : "text-muted-foreground"}`}>
                {status.label}
              </span>
            </div>
          );
        })}
      </div>
      {isDeclined && (
        <div className="flex items-center justify-center mt-2 text-red-500">
          <XCircle className="w-5 h-5 mr-2" />
          <span className="font-medium">Lead Declined/Lost</span>
        </div>
      )}
    </div>
  );
}

export default function AgentSubmissionDetail() {
  const [, setLocation] = useLocation();
  const { type, id } = useParams();
  const { isLoading: authLoading, isAuthenticated } = useAgentAuth();
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation("/agent/login");
    }
  }, [authLoading, isAuthenticated, setLocation]);

  const { data: submissionsData, isLoading } = useQuery({
    queryKey: ["/api/agent/submissions"],
    enabled: isAuthenticated,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ status, notes }: { status: string; notes: string }) => {
      return await apiRequest("PATCH", `/api/agent/submissions/${type}/${id}/status`, {
        status,
        notes,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/agent/submissions"] });
      toast({
        title: "Status Updated",
        description: "Lead status has been updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    const submissions = (submissionsData as any)?.submissions || [];
    const submission = submissions.find(
      (s: any) => s.submissionType === type && s.id === id
    );
    if (submission) {
      setSelectedStatus(submission.status || "new");
      setNotes(submission.notes || "");
    }
  }, [submissionsData, type, id]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const submissions = (submissionsData as any)?.submissions || [];
  const submission = submissions.find(
    (s: any) => s.submissionType === type && s.id === id
  );

  if (!submission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Submission not found</p>
          <Link href="/agent/portal">
            <Button variant="ghost" className="mt-4">
              Back to submissions
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleStatusUpdate = () => {
    updateStatusMutation.mutate({ status: selectedStatus, notes });
  };

  const contactFields = ["contactName", "name", "email", "phone", "businessName", "companyName"];
  const skipFields = ["id", "createdAt", "submissionType", "status", "notes", ...contactFields];

  const groupedFields: Record<string, Record<string, any>> = {};
  const simpleFields: Record<string, any> = {};

  Object.entries(submission).forEach(([key, value]) => {
    if (skipFields.includes(key)) return;

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      groupedFields[key] = value;
    } else {
      simpleFields[key] = value;
    }
  });

  const statusInfo = getStatusInfo(submission.status || "new");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card print:hidden">
        <div className="container mx-auto px-4 py-4">
          <Link href="/agent/portal">
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Submissions
            </Button>
          </Link>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold">Lead Details</h1>
              <Badge className={`${statusInfo.color} text-white`}>
                {statusInfo.label}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Reference: {submission.referenceNumber || submission.id} | Submitted {submission.createdAt ? format(new Date(submission.createdAt), "MMM d, yyyy 'at' h:mm a") : "N/A"}
            </p>
          </div>
          <div className="flex gap-2 print:hidden">
            <Button
              variant="outline"
              onClick={handlePrint}
              data-testid="button-print"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </div>

        {/* Status Progress */}
        <Card className="mb-6 print:hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Lead Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusProgressBar currentStatus={submission.status || "new"} />
          </CardContent>
        </Card>

        {/* Status Update Section */}
        <Card className="mb-6 print:hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Update Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-[1fr_2fr_auto] gap-4 items-end">
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger data-testid="select-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${status.color}`} />
                          {status.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Notes</label>
                <Textarea
                  placeholder="Add notes about this lead..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[40px]"
                  data-testid="input-notes"
                />
              </div>
              <Button
                onClick={handleStatusUpdate}
                disabled={updateStatusMutation.isPending}
                data-testid="button-update-status"
              >
                <Check className="w-4 h-4 mr-2" />
                {updateStatusMutation.isPending ? "Saving..." : "Update"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-[120px_1fr] gap-2 py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Name:</span>
                  <span className="font-medium">{submission.contactName || submission.name || "N/A"}</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-2 py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <a href={`mailto:${submission.email}`} className="font-medium text-primary hover:underline">
                    {submission.email || "N/A"}
                  </a>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-2 py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Phone:</span>
                  <a href={`tel:${submission.phone}`} className="font-medium text-primary hover:underline">
                    {submission.phone || "N/A"}
                  </a>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-2 py-2">
                  <span className="text-sm text-muted-foreground">Business:</span>
                  <span className="font-medium">{submission.businessName || submission.companyName || "N/A"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Submission Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-[120px_1fr] gap-2 py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Type:</span>
                  <Badge variant="outline">{formatFieldName(submission.submissionType || type || "quote")}</Badge>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-2 py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Reference:</span>
                  <span className="font-mono text-sm">{submission.referenceNumber || submission.id}</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-2 py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Submitted:</span>
                  <span>{submission.createdAt ? format(new Date(submission.createdAt), "MMM d, yyyy") : "N/A"}</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-2 py-2">
                  <span className="text-sm text-muted-foreground">Time:</span>
                  <span>{submission.createdAt ? format(new Date(submission.createdAt), "h:mm a") : "N/A"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Simple Fields */}
        {Object.keys(simpleFields).length > 0 && (
          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quote Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-1">
                {Object.entries(simpleFields).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-[180px_1fr] gap-2 py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">{formatFieldName(key)}:</span>
                    <div className="text-sm font-medium">{renderValue(value)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Grouped/Nested Fields */}
        {Object.entries(groupedFields).map(([groupName, groupData]) => (
          <Card key={groupName} className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{formatFieldName(groupName)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-1">
                {Object.entries(groupData).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-[180px_1fr] gap-2 py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">{formatFieldName(key)}:</span>
                    <div className="text-sm font-medium">{renderValue(value)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Agent Notes */}
        {submission.notes && (
          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Agent Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-muted-foreground">{submission.notes}</p>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-8 print:hidden">
          <Button
            variant="outline"
            onClick={() => setLocation("/agent/portal")}
            data-testid="button-back-to-list"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Leads
          </Button>
        </div>
      </main>
    </div>
  );
}
