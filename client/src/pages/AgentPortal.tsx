import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAgentAuth } from "@/hooks/use-agent-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Search, LogOut, FileText, Sparkles, NewspaperIcon } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import type { BlogPost } from "@shared/schema";

interface NormalizedSubmission {
  id: string;
  type: string;
  formName: string;
  name: string;
  location: string;
  date: string;
  status: "complete" | "incomplete";
  rawData: any;
}

function normalizeSubmission(submission: any): NormalizedSubmission {
  const formNameMap: Record<string, string> = {
    quote: "Contact (normal)",
    service: "Service Request",
    "ocean-cargo": "Ocean Cargo Insurance",
    "self-storage": "Self Storage Insurance",
    "film-production": "Film Production Insurance",
    "product-liability": "Product Liability Insurance",
    "security-services": "Security Services Insurance",
  };

  const insuranceTypeMap: Record<string, string> = {
    "commercial-auto": "Commercial Auto",
    "general-liability": "General Liability",
    "workers-compensation": "Workers Compensation",
    habitational: "Habitational",
    trucking: "Trucking",
    hotel: "Hotel Insurance",
    restaurant: "Restaurant Insurance",
    "builders-risk": "Builders Risk",
    "vacant-building": "Vacant Building",
    "crane-riggers": "Crane & Riggers",
    "religious-organization": "Religious Organization",
    "commercial-property": "Commercial Property",
    "cyber-liability": "Cyber Liability",
    "employment-practices": "Employment Practices",
    "professional-liability": "Professional Liability",
    "construction-casualty": "Construction Casualty",
  };

  let formName = formNameMap[submission.submissionType] || submission.submissionType;
  
  if (submission.submissionType === "quote" && submission.insuranceType) {
    formName = insuranceTypeMap[submission.insuranceType] || submission.insuranceType;
  }

  const name = submission.contactName || submission.name || "N/A";
  
  let location = "N/A";
  if (submission.city && submission.state) {
    location = `${submission.city}, ${submission.state}`;
  } else if (submission.businessAddress) {
    const addressParts = submission.businessAddress.split(",");
    if (addressParts.length >= 2) {
      location = addressParts.slice(-2).join(",").trim();
    }
  } else if (submission.location) {
    location = submission.location;
  }

  const date = submission.createdAt
    ? format(new Date(submission.createdAt), "MMM d, yyyy")
    : "N/A";

  const status = submission.status === "read" || submission.status === "completed" 
    ? "complete" 
    : "incomplete";

  return {
    id: submission.id,
    type: submission.submissionType,
    formName,
    name,
    location,
    date,
    status,
    rawData: submission,
  };
}

export default function AgentPortal() {
  const [, setLocation] = useLocation();
  const { agent, isLoading: authLoading, isAuthenticated, logout } = useAgentAuth();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation("/agent/login");
    }
  }, [authLoading, isAuthenticated, setLocation]);

  const { data: submissionsData, isLoading: submissionsLoading } = useQuery({
    queryKey: ["/api/agent/submissions", { type: typeFilter !== "all" ? typeFilter : undefined, search }],
    enabled: isAuthenticated,
    queryFn: async () => {
      const params = new URLSearchParams();
      if (typeFilter !== "all") {
        params.append("type", typeFilter);
      }
      if (search) {
        params.append("search", search);
      }
      const url = `/api/agent/submissions${params.toString() ? `?${params.toString()}` : ""}`;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) {
        throw new Error("Failed to fetch submissions");
      }
      return await res.json();
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async ({ type, id }: { type: string; id: string }) => {
      return await apiRequest("PATCH", `/api/agent/submissions/${type}/${id}/status`, {
        status: "read",
        notes: "Marked as read by agent",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/agent/submissions", { type: typeFilter !== "all" ? typeFilter : undefined, search }] });
      queryClient.invalidateQueries({ queryKey: ["/api/agent/submissions"] });
      toast({
        title: "Success",
        description: "Submission marked as read",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to mark submission as read",
      });
    },
  });

  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedBlogCategory, setSelectedBlogCategory] = useState<string>("");

  const { data: blogPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
    enabled: isAuthenticated,
  });

  const { data: blogTopics = [] } = useQuery<string[]>({
    queryKey: ["/api/blog-topics"],
    enabled: isAuthenticated,
  });

  const { data: blogCategories = [] } = useQuery<string[]>({
    queryKey: ["/api/blog-categories"],
    enabled: isAuthenticated,
  });

  const generateBlogPostMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/blog-posts/generate", {
        topic: selectedTopic || undefined,
        category: selectedBlogCategory || undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      setSelectedTopic("");
      setSelectedBlogCategory("");
      toast({
        title: "Success",
        description: "New blog post generated successfully! This took about 30-60 seconds.",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate blog post. Please try again.",
      });
    },
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
  const normalizedSubmissions = submissions.map(normalizeSubmission);

  const filteredSubmissions = normalizedSubmissions.filter((sub: NormalizedSubmission) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      sub.formName.toLowerCase().includes(searchLower) ||
      sub.name.toLowerCase().includes(searchLower) ||
      sub.location.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Submitted Forms for casurance.com</h1>
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
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <NewspaperIcon className="h-5 w-5 text-primary" />
              <CardTitle>Blog Management</CardTitle>
            </div>
            <CardDescription>
              Generate AI-powered blog posts with professional images. Posts appear immediately on the public blog page. Generation takes 30-60 seconds.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Topic (optional)</label>
                <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                  <SelectTrigger data-testid="select-blog-topic">
                    <SelectValue placeholder="Random topic..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Random topic</SelectItem>
                    {blogTopics.map((topic) => (
                      <SelectItem key={topic} value={topic}>
                        {topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category (optional)</label>
                <Select value={selectedBlogCategory} onValueChange={setSelectedBlogCategory}>
                  <SelectTrigger data-testid="select-blog-category">
                    <SelectValue placeholder="Random category..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Random category</SelectItem>
                    {blogCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={() => generateBlogPostMutation.mutate()}
              disabled={generateBlogPostMutation.isPending}
              className="w-full"
              data-testid="button-generate-blog-post"
            >
              <Sparkles className="h-4 w-4 mr-2" aria-hidden="true" />
              {generateBlogPostMutation.isPending ? "Generating..." : "Generate New Post"}
            </Button>

            <div className="pt-4 border-t space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total blog posts:</span>
                <Badge variant="secondary">{blogPosts.length}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Latest post:</span>
                <span className="text-foreground text-sm truncate max-w-md">
                  {blogPosts.length > 0 
                    ? blogPosts[0]?.title 
                    : "No posts yet"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold mb-4">Form Submissions</h2>
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by form name, contact name, or location..."
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

        {filteredSubmissions.length === 0 ? (
          <div className="text-center py-12 border rounded-md bg-card">
            <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">No submissions found</p>
            <p className="text-sm text-muted-foreground">
              Submissions will appear here as they come in
            </p>
          </div>
        ) : (
          <div className="rounded-md border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Form Name</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission: NormalizedSubmission, index: number) => (
                  <TableRow
                    key={submission.id}
                    data-testid={`row-submission-${index}`}
                  >
                    <TableCell data-testid={`text-form-name-${index}`}>
                      {submission.formName}
                    </TableCell>
                    <TableCell data-testid={`text-name-${index}`}>
                      {submission.name}
                    </TableCell>
                    <TableCell data-testid={`text-location-${index}`}>
                      {submission.location}
                    </TableCell>
                    <TableCell data-testid={`text-date-${index}`}>
                      {submission.date}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={submission.status === "complete" ? "default" : "outline"}
                        data-testid={`badge-status-${index}`}
                      >
                        {submission.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsReadMutation.mutate({ type: submission.type, id: submission.id })}
                        disabled={markAsReadMutation.isPending}
                        data-testid={`button-mark-read-${index}`}
                        className="text-destructive hover:text-destructive px-0"
                      >
                        Mark as Read
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setLocation(`/agent/submission/${submission.type}/${submission.id}`)}
                        data-testid={`button-view-details-${index}`}
                        className="text-destructive hover:text-destructive px-0"
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
}
