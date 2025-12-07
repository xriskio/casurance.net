import { useEffect } from "react";
import { useLocation, useParams, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAgentAuth } from "@/hooks/use-agent-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Printer } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function AgentSubmissionDetail() {
  const [, setLocation] = useLocation();
  const { type, id } = useParams();
  const { isLoading: authLoading, isAuthenticated } = useAgentAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation("/agent/login");
    }
  }, [authLoading, isAuthenticated, setLocation]);

  const { data: submissionsData, isLoading } = useQuery({
    queryKey: ["/api/agent/submissions"],
    enabled: isAuthenticated,
  });

  const markCompleteMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("PATCH", `/api/agent/submissions/${type}/${id}/status`, {
        status: "completed",
        notes: "Marked as complete by agent",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/agent/submissions"] });
      toast({
        title: "Success",
        description: "Submission marked as complete",
      });
    },
  });

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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link href="/agent/portal">
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Submissions
            </Button>
          </Link>
        </div>
      </header>

      <main id="main-content" className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Submission Details</h1>
            <p className="text-muted-foreground">
              Submitted on {submission.createdAt ? format(new Date(submission.createdAt), "MMMM d, yyyy") : "N/A"}
            </p>
          </div>
          <Badge variant={submission.status === "completed" ? "default" : "outline"}>
            {submission.status || "Pending"}
          </Badge>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{submission.contactName || submission.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{submission.email || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{submission.phone || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Business Name</p>
                  <p className="font-medium">{submission.businessName || submission.companyName || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Submission Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(submission).map(([key, value]) => {
                  if (
                    key === "id" ||
                    key === "createdAt" ||
                    key === "submissionType" ||
                    key === "status" ||
                    key === "contactName" ||
                    key === "name" ||
                    key === "email" ||
                    key === "phone" ||
                    key === "businessName" ||
                    key === "companyName"
                  ) {
                    return null;
                  }

                  const displayKey = key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase());

                  let displayValue = value;
                  if (typeof value === "object" && value !== null) {
                    displayValue = JSON.stringify(value, null, 2);
                  } else if (typeof value === "boolean") {
                    displayValue = value ? "Yes" : "No";
                  } else if (!value) {
                    displayValue = "N/A";
                  }

                  return (
                    <div key={key}>
                      <p className="text-sm text-muted-foreground">{displayKey}</p>
                      <p className="font-medium whitespace-pre-wrap">{String(displayValue)}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => markCompleteMutation.mutate()}
              disabled={markCompleteMutation.isPending || submission.status === "completed"}
              data-testid="button-mark-complete"
            >
              {markCompleteMutation.isPending ? "Updating..." : "Mark as Complete"}
            </Button>
            <Button
              variant="outline"
              onClick={handlePrint}
              data-testid="button-print"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print / PDF
            </Button>
            <Button
              variant="outline"
              onClick={() => setLocation("/agent/portal")}
              data-testid="button-back-to-list"
            >
              Back to List
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
