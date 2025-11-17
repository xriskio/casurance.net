import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAgentAuth } from "@/hooks/use-agent-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, LogOut, FileText, Phone, Mail } from "lucide-react";
import { format } from "date-fns";

export default function AgentPortal() {
  const [, setLocation] = useLocation();
  const { agent, isLoading: authLoading, isAuthenticated, logout } = useAgentAuth();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation("/agent/login");
    }
  }, [authLoading, isAuthenticated, setLocation]);

  const { data: submissionsData, isLoading: submissionsLoading } = useQuery({
    queryKey: ["/api/agent/submissions", { type: typeFilter !== "all" ? typeFilter : undefined, search }],
    enabled: isAuthenticated,
  });

  if (authLoading || submissionsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const submissions = (submissionsData as any)?.submissions || [];

  const getSubmissionTypeBadge = (type: string) => {
    const typeMap: Record<string, { label: string; variant: "default" | "secondary" }> = {
      quote: { label: "Quote", variant: "default" },
      service: { label: "Service", variant: "secondary" },
      "ocean-cargo": { label: "Ocean Cargo", variant: "default" },
      "self-storage": { label: "Self Storage", variant: "default" },
      "film-production": { label: "Film Production", variant: "default" },
      "product-liability": { label: "Product Liability", variant: "default" },
      "security-services": { label: "Security Services", variant: "default" },
    };

    const config = typeMap[type] || { label: type, variant: "default" as const };
    return (
      <Badge variant={config.variant} data-testid={`badge-type-${type}`}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Agent Portal</h1>
            <p className="text-sm text-muted-foreground">
              Welcome, {agent?.fullName}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={logout}
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Submissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by business name, contact, or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-48" data-testid="select-type-filter">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="quote">General Quotes</SelectItem>
                  <SelectItem value="service">Service Requests</SelectItem>
                  <SelectItem value="ocean-cargo">Ocean Cargo</SelectItem>
                  <SelectItem value="self-storage">Self Storage</SelectItem>
                  <SelectItem value="film-production">Film Production</SelectItem>
                  <SelectItem value="product-liability">Product Liability</SelectItem>
                  <SelectItem value="security-services">Security Services</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {submissions.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">No submissions found</p>
                <p className="text-sm text-muted-foreground">
                  Submissions will appear here as they come in
                </p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Business</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Insurance Type</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission: any, index: number) => (
                      <TableRow
                        key={`${submission.submissionType}-${submission.id || index}`}
                        data-testid={`row-submission-${index}`}
                      >
                        <TableCell data-testid={`text-date-${index}`}>
                          {submission.createdAt
                            ? format(new Date(submission.createdAt), "MMM d, yyyy")
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          {getSubmissionTypeBadge(submission.submissionType)}
                        </TableCell>
                        <TableCell data-testid={`text-business-${index}`}>
                          {submission.businessName || submission.companyName || "N/A"}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium" data-testid={`text-contact-name-${index}`}>
                              {submission.contactName || submission.name || "N/A"}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              {submission.email && (
                                <span className="flex items-center gap-1" data-testid={`text-email-${index}`}>
                                  <Mail className="w-3 h-3" />
                                  {submission.email}
                                </span>
                              )}
                              {submission.phone && (
                                <span className="flex items-center gap-1" data-testid={`text-phone-${index}`}>
                                  <Phone className="w-3 h-3" />
                                  {submission.phone}
                                </span>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell data-testid={`text-insurance-type-${index}`}>
                          {submission.insuranceType || submission.submissionType}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" data-testid={`badge-status-${index}`}>
                            {submission.status || "Pending"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
