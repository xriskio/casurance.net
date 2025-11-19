import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAgentAuth } from "@/hooks/use-agent-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Search, LogOut, FileText, Sparkles, NewspaperIcon, PenLine, Shield, Download, Printer } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import type { BlogPost, PressRelease } from "@shared/schema";

interface NormalizedSubmission {
  id: string;
  type: string;
  formName: string;
  name: string;
  location: string;
  date: string;
  status: "complete" | "incomplete";
  referenceNumber?: string;
  rawData: any;
}

function normalizeSubmission(submission: any): NormalizedSubmission {
  const formNameMap: Record<string, string> = {
    quote: "Contact (normal)",
    service: "Service Request",
    contact: "Contact Request",
    "ocean-cargo": "Ocean Cargo Insurance",
    "self-storage": "Self Storage Insurance",
    "film-production": "Film Production Insurance",
    "product-liability": "Product Liability Insurance",
    "security-services": "Security Services Insurance",
    "high-value-home": "High Value Homeowners",
    "commercial-flood": "Commercial Flood Insurance",
    "commercial-earthquake": "Commercial Earthquake Insurance",
    "franchised-dealer": "Franchised Auto/Truck/RV Dealer",
    "garage-service": "Garage & Service Center",
    "auto-dealer-garage": "Auto Dealer & Garage Operations",
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
    referenceNumber: submission.referenceNumber,
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

  const [selectedTopic, setSelectedTopic] = useState<string>("RANDOM");
  const [selectedBlogCategory, setSelectedBlogCategory] = useState<string>("RANDOM");

  const [manualBlogForm, setManualBlogForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    imageUrl: "",
  });

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
        topic: selectedTopic === "RANDOM" ? undefined : selectedTopic,
        category: selectedBlogCategory === "RANDOM" ? undefined : selectedBlogCategory,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      setSelectedTopic("RANDOM");
      setSelectedBlogCategory("RANDOM");
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

  const aiGenerateDraftMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/blog-posts/ai-assist/draft", {
        title: manualBlogForm.title,
        category: manualBlogForm.category,
      });
    },
    onSuccess: (data: any) => {
      setManualBlogForm({
        ...manualBlogForm,
        excerpt: data.excerpt,
        content: data.content,
        tags: data.tags.join(", "),
        imageUrl: data.imageUrl || manualBlogForm.imageUrl,
      });
      toast({
        title: "AI Draft Generated",
        description: "Content, excerpt, and tags have been generated based on your title!",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate AI draft. Please try again.",
      });
    },
  });

  const aiImproveContentMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/blog-posts/ai-assist/improve", {
        content: manualBlogForm.content,
        category: manualBlogForm.category,
      });
    },
    onSuccess: (data: any) => {
      setManualBlogForm({
        ...manualBlogForm,
        content: data.content,
      });
      toast({
        title: "Content Improved",
        description: "Your content has been enhanced by AI!",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to improve content. Please try again.",
      });
    },
  });

  const aiSuggestTagsMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/blog-posts/ai-assist/tags", {
        title: manualBlogForm.title,
        content: manualBlogForm.content,
        category: manualBlogForm.category,
      });
    },
    onSuccess: (data: any) => {
      setManualBlogForm({
        ...manualBlogForm,
        tags: data.tags.join(", "),
      });
      toast({
        title: "Tags Suggested",
        description: "Relevant tags have been generated!",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to suggest tags. Please try again.",
      });
    },
  });

  const createManualBlogPostMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/blog-posts", {
        title: manualBlogForm.title,
        excerpt: manualBlogForm.excerpt,
        content: manualBlogForm.content,
        category: manualBlogForm.category,
        tags: manualBlogForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
        imageUrl: manualBlogForm.imageUrl || undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      setManualBlogForm({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        tags: "",
        imageUrl: "",
      });
      toast({
        title: "Success",
        description: "Blog post created successfully!",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create blog post. Please try again.",
      });
    },
  });

  const [selectedPressTopic, setSelectedPressTopic] = useState<string>("RANDOM");
  const [selectedPressCategory, setSelectedPressCategory] = useState<string>("RANDOM");
  const [selectedPressLocation, setSelectedPressLocation] = useState<string>("RANDOM");

  const [manualPressForm, setManualPressForm] = useState({
    title: "",
    subtitle: "",
    excerpt: "",
    content: "",
    category: "",
    location: "Nationwide",
    tags: "",
    imageUrl: "",
  });

  const { data: pressReleases = [] } = useQuery<PressRelease[]>({
    queryKey: ["/api/press-releases"],
    enabled: isAuthenticated,
  });

  const { data: pressTopics = [] } = useQuery<string[]>({
    queryKey: ["/api/press-topics"],
    enabled: isAuthenticated,
  });

  const { data: pressCategories = [] } = useQuery<string[]>({
    queryKey: ["/api/press-categories"],
    enabled: isAuthenticated,
  });

  const { data: pressLocations = [] } = useQuery<string[]>({
    queryKey: ["/api/press-locations"],
    enabled: isAuthenticated,
  });

  const generatePressReleaseMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/press-releases/generate", {
        topic: selectedPressTopic === "RANDOM" ? undefined : selectedPressTopic,
        category: selectedPressCategory === "RANDOM" ? undefined : selectedPressCategory,
        location: selectedPressLocation === "RANDOM" ? undefined : selectedPressLocation,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/press-releases"] });
      setSelectedPressTopic("RANDOM");
      setSelectedPressCategory("RANDOM");
      setSelectedPressLocation("RANDOM");
      toast({
        title: "Success",
        description: "New press release generated successfully!",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate press release. Please try again.",
      });
    },
  });

  const generatePressDraftMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/press-releases/ai-assist/draft", {
        title: manualPressForm.title,
        category: manualPressForm.category,
        location: manualPressForm.location,
      });
    },
    onSuccess: (data: any) => {
      setManualPressForm({
        ...manualPressForm,
        subtitle: data.subtitle || manualPressForm.subtitle,
        excerpt: data.excerpt,
        content: data.content,
        tags: data.tags.join(", "),
        imageUrl: data.imageUrl || manualPressForm.imageUrl,
      });
      toast({
        title: "AI Draft Generated",
        description: "Content has been generated. Review and edit as needed.",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate draft. Please try again.",
      });
    },
  });

  const improvePressContentMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/press-releases/ai-assist/improve", {
        content: manualPressForm.content,
        category: manualPressForm.category,
      });
    },
    onSuccess: (data: any) => {
      setManualPressForm({
        ...manualPressForm,
        content: data.content,
      });
      toast({
        title: "Content Improved",
        description: "AI has enhanced your content. Review the changes.",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to improve content. Please try again.",
      });
    },
  });

  const suggestPressTagsMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/press-releases/ai-assist/tags", {
        title: manualPressForm.title,
        content: manualPressForm.content,
        category: manualPressForm.category,
      });
    },
    onSuccess: (data: any) => {
      setManualPressForm({
        ...manualPressForm,
        tags: data.tags.join(", "),
      });
      toast({
        title: "Tags Suggested",
        description: "AI has suggested relevant tags for your press release.",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to suggest tags. Please try again.",
      });
    },
  });

  const createManualPressReleaseMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/press-releases", {
        title: manualPressForm.title,
        subtitle: manualPressForm.subtitle || undefined,
        excerpt: manualPressForm.excerpt,
        content: manualPressForm.content,
        category: manualPressForm.category,
        location: manualPressForm.location,
        tags: manualPressForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
        imageUrl: manualPressForm.imageUrl || undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/press-releases"] });
      setManualPressForm({
        title: "",
        subtitle: "",
        excerpt: "",
        content: "",
        category: "",
        location: "Nationwide",
        tags: "",
        imageUrl: "",
      });
      toast({
        title: "Success",
        description: "Press release created successfully!",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create press release. Please try again.",
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

  const exportToCSV = () => {
    if (normalizedSubmissions.length === 0) {
      toast({
        title: "No data to export",
        description: "There are no submissions to export.",
        variant: "destructive",
      });
      return;
    }

    const metadataFields = ["id", "submissionType", "status", "createdAt", "referenceNumber"];
    
    const allKeys = new Set<string>();
    normalizedSubmissions.forEach((sub: NormalizedSubmission) => {
      Object.keys(sub.rawData).forEach((key) => {
        if (!metadataFields.includes(key)) {
          allKeys.add(key);
        }
      });
    });

    const headers = [...metadataFields, ...Array.from(allKeys)];
    
    const csvRows = [];
    csvRows.push(headers.map((h) => `"${h}"`).join(","));

    normalizedSubmissions.forEach((sub: NormalizedSubmission) => {
      const row = headers.map((header) => {
        let value;
        
        if (metadataFields.includes(header)) {
          value = sub.rawData[header];
        } else {
          value = sub.rawData[header];
        }
        
        if (value === null || value === undefined) {
          return '""';
        }
        
        if (typeof value === "object") {
          value = JSON.stringify(value);
        }
        
        const stringValue = String(value).replace(/"/g, '""');
        return `"${stringValue}"`;
      });
      csvRows.push(row.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `casurance_submissions_${format(new Date(), "yyyy-MM-dd_HH-mm")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export successful",
      description: `Downloaded ${normalizedSubmissions.length} submissions as CSV.`,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Submitted Forms for www.casurance.net</h1>
            <p className="text-sm text-muted-foreground">
              Welcome, {agent?.fullName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {agent?.role === "admin" && (
              <Button
                variant="outline"
                onClick={() => setLocation("/admin-panel")}
                data-testid="button-admin-panel"
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin Panel
              </Button>
            )}
            <Button
              variant="outline"
              onClick={logout}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
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
              Create blog posts using AI generation or write your own content with custom images.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="ai" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="ai" data-testid="tab-ai-generation">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Generation
                </TabsTrigger>
                <TabsTrigger value="manual" data-testid="tab-manual-creation">
                  <PenLine className="h-4 w-4 mr-2" />
                  Manual Creation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ai" className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Generate AI-powered blog posts with professional images. Posts appear immediately on the public blog page. Generation takes 30-60 seconds.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ai-topic">Topic (optional)</Label>
                    <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                      <SelectTrigger id="ai-topic" data-testid="select-blog-topic">
                        <SelectValue placeholder="Random topic..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RANDOM">Random topic</SelectItem>
                        {blogTopics.map((topic) => (
                          <SelectItem key={topic} value={topic}>
                            {topic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ai-category">Category (optional)</Label>
                    <Select value={selectedBlogCategory} onValueChange={setSelectedBlogCategory}>
                      <SelectTrigger id="ai-category" data-testid="select-blog-category">
                        <SelectValue placeholder="Random category..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RANDOM">Random category</SelectItem>
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
              </TabsContent>

              <TabsContent value="manual" className="space-y-4">
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">AI Writing Assistance Available</p>
                      <p className="text-xs text-muted-foreground">
                        Use AI to generate drafts, improve content, and suggest tags as you write.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="manual-title">Title *</Label>
                    <Input
                      id="manual-title"
                      placeholder="Enter blog post title..."
                      value={manualBlogForm.title}
                      onChange={(e) => setManualBlogForm({ ...manualBlogForm, title: e.target.value })}
                      data-testid="input-blog-title"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="manual-category">Category *</Label>
                      <Select
                        value={manualBlogForm.category}
                        onValueChange={(value) => setManualBlogForm({ ...manualBlogForm, category: value })}
                      >
                        <SelectTrigger id="manual-category" data-testid="select-manual-category">
                          <SelectValue placeholder="Select category..." />
                        </SelectTrigger>
                        <SelectContent>
                          {blogCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="invisible">Action</Label>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => aiGenerateDraftMutation.mutate()}
                        disabled={
                          aiGenerateDraftMutation.isPending ||
                          !manualBlogForm.title ||
                          !manualBlogForm.category
                        }
                        className="w-full"
                        data-testid="button-ai-generate-draft"
                      >
                        <Sparkles className="h-4 w-4 mr-2" aria-hidden="true" />
                        {aiGenerateDraftMutation.isPending ? "Generating..." : "AI Generate Draft"}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="manual-excerpt">Excerpt *</Label>
                    <Textarea
                      id="manual-excerpt"
                      placeholder="Write a brief summary (2-3 sentences)..."
                      value={manualBlogForm.excerpt}
                      onChange={(e) => setManualBlogForm({ ...manualBlogForm, excerpt: e.target.value })}
                      rows={3}
                      data-testid="textarea-blog-excerpt"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="manual-content">Content * (Markdown supported)</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => aiImproveContentMutation.mutate()}
                        disabled={
                          aiImproveContentMutation.isPending ||
                          !manualBlogForm.content ||
                          !manualBlogForm.category
                        }
                        data-testid="button-ai-improve-content"
                      >
                        <Sparkles className="h-3 w-3 mr-1" aria-hidden="true" />
                        {aiImproveContentMutation.isPending ? "Improving..." : "AI Improve"}
                      </Button>
                    </div>
                    <Textarea
                      id="manual-content"
                      placeholder="Write your blog post content in Markdown..."
                      value={manualBlogForm.content}
                      onChange={(e) => setManualBlogForm({ ...manualBlogForm, content: e.target.value })}
                      rows={12}
                      data-testid="textarea-blog-content"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="manual-tags">Tags * (comma-separated)</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => aiSuggestTagsMutation.mutate()}
                        disabled={
                          aiSuggestTagsMutation.isPending ||
                          (!manualBlogForm.title && !manualBlogForm.content)
                        }
                        data-testid="button-ai-suggest-tags"
                      >
                        <Sparkles className="h-3 w-3 mr-1" aria-hidden="true" />
                        {aiSuggestTagsMutation.isPending ? "Suggesting..." : "AI Suggest"}
                      </Button>
                    </div>
                    <Input
                      id="manual-tags"
                      placeholder="risk management, compliance, insurance..."
                      value={manualBlogForm.tags}
                      onChange={(e) => setManualBlogForm({ ...manualBlogForm, tags: e.target.value })}
                      data-testid="input-blog-tags"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="manual-image">Featured Image URL (optional)</Label>
                    <Input
                      id="manual-image"
                      placeholder="https://example.com/image.jpg"
                      value={manualBlogForm.imageUrl}
                      onChange={(e) => setManualBlogForm({ ...manualBlogForm, imageUrl: e.target.value })}
                      data-testid="input-blog-image"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter a direct image URL or leave blank
                    </p>
                  </div>

                  <Button
                    onClick={() => createManualBlogPostMutation.mutate()}
                    disabled={
                      createManualBlogPostMutation.isPending ||
                      !manualBlogForm.title ||
                      !manualBlogForm.excerpt ||
                      !manualBlogForm.content ||
                      !manualBlogForm.category ||
                      !manualBlogForm.tags
                    }
                    className="w-full"
                    data-testid="button-create-blog-post"
                  >
                    <PenLine className="h-4 w-4 mr-2" aria-hidden="true" />
                    {createManualBlogPostMutation.isPending ? "Creating..." : "Create Blog Post"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="pt-6 mt-6 border-t space-y-2">
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

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle>Press Release Management</CardTitle>
            </div>
            <CardDescription>
              Create press releases using AI generation or write your own announcements with custom images.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="ai" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="ai" data-testid="tab-press-ai-generation">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Generation
                </TabsTrigger>
                <TabsTrigger value="manual" data-testid="tab-press-manual-creation">
                  <PenLine className="h-4 w-4 mr-2" />
                  Manual Creation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ai" className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Generate AI-powered press releases with professional images. Releases appear immediately on the public press releases page. Generation takes 30-60 seconds.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="press-ai-topic">Topic (optional)</Label>
                    <Select value={selectedPressTopic} onValueChange={setSelectedPressTopic}>
                      <SelectTrigger id="press-ai-topic" data-testid="select-press-topic">
                        <SelectValue placeholder="Random topic..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RANDOM">Random topic</SelectItem>
                        {pressTopics.map((topic) => (
                          <SelectItem key={topic} value={topic}>
                            {topic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="press-ai-category">Category (optional)</Label>
                    <Select value={selectedPressCategory} onValueChange={setSelectedPressCategory}>
                      <SelectTrigger id="press-ai-category" data-testid="select-press-category">
                        <SelectValue placeholder="Random category..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RANDOM">Random category</SelectItem>
                        {pressCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="press-ai-location">Location (optional)</Label>
                    <Select value={selectedPressLocation} onValueChange={setSelectedPressLocation}>
                      <SelectTrigger id="press-ai-location" data-testid="select-press-location">
                        <SelectValue placeholder="Random location..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RANDOM">Random location</SelectItem>
                        {pressLocations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={() => generatePressReleaseMutation.mutate()}
                  disabled={generatePressReleaseMutation.isPending}
                  className="w-full"
                  data-testid="button-generate-press-release"
                >
                  <Sparkles className="h-4 w-4 mr-2" aria-hidden="true" />
                  {generatePressReleaseMutation.isPending ? "Generating..." : "Generate New Press Release"}
                </Button>
              </TabsContent>

              <TabsContent value="manual" className="space-y-4">
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">AI Writing Assistance Available</p>
                      <p className="text-xs text-muted-foreground">
                        Use AI to generate drafts, improve content, and suggest tags as you write.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="press-manual-title">Title *</Label>
                    <Input
                      id="press-manual-title"
                      placeholder="Enter press release title..."
                      value={manualPressForm.title}
                      onChange={(e) => setManualPressForm({ ...manualPressForm, title: e.target.value })}
                      data-testid="input-press-title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="press-manual-subtitle">Subtitle (optional)</Label>
                    <Input
                      id="press-manual-subtitle"
                      placeholder="Enter subtitle..."
                      value={manualPressForm.subtitle}
                      onChange={(e) => setManualPressForm({ ...manualPressForm, subtitle: e.target.value })}
                      data-testid="input-press-subtitle"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="press-manual-category">Category *</Label>
                      <Select
                        value={manualPressForm.category}
                        onValueChange={(value) => setManualPressForm({ ...manualPressForm, category: value })}
                      >
                        <SelectTrigger id="press-manual-category" data-testid="select-press-manual-category">
                          <SelectValue placeholder="Select category..." />
                        </SelectTrigger>
                        <SelectContent>
                          {pressCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="press-manual-location">Location *</Label>
                      <Select
                        value={manualPressForm.location}
                        onValueChange={(value) => setManualPressForm({ ...manualPressForm, location: value })}
                      >
                        <SelectTrigger id="press-manual-location" data-testid="select-press-manual-location">
                          <SelectValue placeholder="Select location..." />
                        </SelectTrigger>
                        <SelectContent>
                          {pressLocations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      onClick={() => generatePressDraftMutation.mutate()}
                      disabled={
                        generatePressDraftMutation.isPending ||
                        !manualPressForm.title ||
                        !manualPressForm.category ||
                        !manualPressForm.location
                      }
                      variant="outline"
                      data-testid="button-press-ai-draft"
                    >
                      <Sparkles className="h-3 w-3 mr-1" aria-hidden="true" />
                      {generatePressDraftMutation.isPending ? "Generating..." : "AI Generate Draft"}
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="press-manual-excerpt">Excerpt *</Label>
                    <Textarea
                      id="press-manual-excerpt"
                      placeholder="Brief summary of the press release..."
                      value={manualPressForm.excerpt}
                      onChange={(e) => setManualPressForm({ ...manualPressForm, excerpt: e.target.value })}
                      rows={2}
                      data-testid="textarea-press-excerpt"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="press-manual-content">Content *</Label>
                      <Button
                        onClick={() => improvePressContentMutation.mutate()}
                        disabled={
                          improvePressContentMutation.isPending ||
                          !manualPressForm.content ||
                          !manualPressForm.category
                        }
                        variant="outline"
                        size="sm"
                        data-testid="button-press-ai-improve"
                      >
                        <Sparkles className="h-3 w-3 mr-1" aria-hidden="true" />
                        {improvePressContentMutation.isPending ? "Improving..." : "AI Improve"}
                      </Button>
                    </div>
                    <Textarea
                      id="press-manual-content"
                      placeholder="Full press release content (use Markdown formatting)..."
                      value={manualPressForm.content}
                      onChange={(e) => setManualPressForm({ ...manualPressForm, content: e.target.value })}
                      rows={12}
                      data-testid="textarea-press-content"
                    />
                    <p className="text-xs text-muted-foreground">
                      Markdown supported: **bold**, *italic*, ## Headings, - bullet points
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="press-manual-tags">Tags *</Label>
                      <Button
                        onClick={() => suggestPressTagsMutation.mutate()}
                        disabled={
                          suggestPressTagsMutation.isPending ||
                          (!manualPressForm.title && !manualPressForm.content)
                        }
                        variant="outline"
                        size="sm"
                        data-testid="button-press-ai-suggest-tags"
                      >
                        <Sparkles className="h-3 w-3 mr-1" aria-hidden="true" />
                        {suggestPressTagsMutation.isPending ? "Suggesting..." : "AI Suggest"}
                      </Button>
                    </div>
                    <Input
                      id="press-manual-tags"
                      placeholder="coverage expansion, new program, partnership..."
                      value={manualPressForm.tags}
                      onChange={(e) => setManualPressForm({ ...manualPressForm, tags: e.target.value })}
                      data-testid="input-press-tags"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="press-manual-image">Featured Image URL (optional)</Label>
                    <Input
                      id="press-manual-image"
                      placeholder="https://example.com/image.jpg"
                      value={manualPressForm.imageUrl}
                      onChange={(e) => setManualPressForm({ ...manualPressForm, imageUrl: e.target.value })}
                      data-testid="input-press-image"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter a direct image URL or leave blank
                    </p>
                  </div>

                  <Button
                    onClick={() => createManualPressReleaseMutation.mutate()}
                    disabled={
                      createManualPressReleaseMutation.isPending ||
                      !manualPressForm.title ||
                      !manualPressForm.excerpt ||
                      !manualPressForm.content ||
                      !manualPressForm.category ||
                      !manualPressForm.location ||
                      !manualPressForm.tags
                    }
                    className="w-full"
                    data-testid="button-create-press-release"
                  >
                    <PenLine className="h-4 w-4 mr-2" aria-hidden="true" />
                    {createManualPressReleaseMutation.isPending ? "Creating..." : "Create Press Release"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="pt-6 mt-6 border-t space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total press releases:</span>
                <Badge variant="secondary">{pressReleases.length}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Latest release:</span>
                <span className="text-foreground text-sm truncate max-w-md">
                  {pressReleases.length > 0 
                    ? pressReleases[0]?.title 
                    : "No releases yet"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Form Submissions</h2>
          <div className="flex gap-2">
            <Button
              onClick={exportToCSV}
              variant="outline"
              disabled={normalizedSubmissions.length === 0}
              data-testid="button-export-csv"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button
              onClick={handlePrint}
              variant="outline"
              disabled={normalizedSubmissions.length === 0}
              data-testid="button-print-all"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print / PDF
            </Button>
          </div>
        </div>
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
              <SelectItem value="high-value-home">High Value Home</SelectItem>
              <SelectItem value="commercial-flood">Commercial Flood</SelectItem>
              <SelectItem value="commercial-earthquake">Commercial Earthquake</SelectItem>
              <SelectItem value="franchised-dealer">Franchised Dealer</SelectItem>
              <SelectItem value="garage-service">Garage & Service Center</SelectItem>
              <SelectItem value="auto-dealer-garage">Auto Dealer & Garage</SelectItem>
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
                  <TableHead>Reference #</TableHead>
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
                    <TableCell data-testid={`text-reference-number-${index}`}>
                      <span className="font-mono text-sm font-semibold">
                        {submission.referenceNumber || 'N/A'}
                      </span>
                    </TableCell>
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
