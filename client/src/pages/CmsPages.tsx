import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAgentAuth } from "@/hooks/use-agent-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, FileText, Sparkles, Eye, Edit, Trash2, Plus, Search, Save } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import type { CmsPage, InsertCmsPage, UpdateCmsPage } from "@shared/schema";

export default function CmsPages() {
  const [, setLocation] = useLocation();
  const { logout, agent } = useAgentAuth();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("manage");
  const [search, setSearch] = useState("");
  const [publishedFilter, setPublishedFilter] = useState<string>("all");
  const [editingPage, setEditingPage] = useState<CmsPage | null>(null);
  const [deletingPage, setDeletingPage] = useState<CmsPage | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // AI Generation states
  const [aiTopic, setAiTopic] = useState("");
  const [aiTargetAudience, setAiTargetAudience] = useState("");
  const [aiKeywords, setAiKeywords] = useState("");
  const [aiIncludeCta, setAiIncludeCta] = useState("true");
  const [isGenerating, setIsGenerating] = useState(false);

  // Manual creation states
  const [manualTitle, setManualTitle] = useState("");
  const [manualSlug, setManualSlug] = useState("");
  const [manualMetaDesc, setManualMetaDesc] = useState("");
  const [manualContent, setManualContent] = useState("");
  const [manualAuthor, setManualAuthor] = useState("");
  const [manualPublish, setManualPublish] = useState("false");

  const { data: pagesData, isLoading } = useQuery({
    queryKey: ["/api/cms/pages"],
  });

  const pages = (pagesData as CmsPage[]) || [];

  const filteredPages = pages.filter((page) => {
    const matchesSearch =
      search === "" ||
      page.title.toLowerCase().includes(search.toLowerCase()) ||
      page.slug.toLowerCase().includes(search.toLowerCase()) ||
      (page.content && page.content.toLowerCase().includes(search.toLowerCase()));

    const matchesPublished =
      publishedFilter === "all" ||
      (publishedFilter === "published" && page.isPublished === "true") ||
      (publishedFilter === "draft" && page.isPublished === "false");

    return matchesSearch && matchesPublished;
  });

  const generatePageMutation = useMutation({
    mutationFn: async (data: any) => {
      setIsGenerating(true);
      const response = await apiRequest("POST", "/api/cms/pages/generate", data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/pages"] });
      toast({
        title: "Page generated successfully",
        description: "AI-generated page has been created as a draft. Review and publish when ready.",
      });
      // Reset form
      setAiTopic("");
      setAiTargetAudience("");
      setAiKeywords("");
      setAiIncludeCta("true");
      setIsGenerating(false);
    },
    onError: (error: any) => {
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate page. Please try again.",
        variant: "destructive",
      });
      setIsGenerating(false);
    },
  });

  const createPageMutation = useMutation({
    mutationFn: async (data: InsertCmsPage) => {
      return await apiRequest("POST", "/api/cms/pages", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/pages"] });
      toast({
        title: "Page created successfully",
        description: "Your page has been created.",
      });
      // Reset form
      setManualTitle("");
      setManualSlug("");
      setManualMetaDesc("");
      setManualContent("");
      setManualAuthor("");
      setManualPublish("false");
    },
    onError: (error: any) => {
      toast({
        title: "Creation failed",
        description: error.message || "Failed to create page. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updatePageMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateCmsPage }) => {
      return await apiRequest("PATCH", `/api/cms/pages/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/pages"] });
      toast({
        title: "Page updated successfully",
        description: "Changes have been saved.",
      });
      setShowEditDialog(false);
      setEditingPage(null);
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update page. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deletePageMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/cms/pages/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/pages"] });
      toast({
        title: "Page deleted successfully",
        description: "The page has been permanently removed.",
      });
      setDeletingPage(null);
    },
    onError: (error: any) => {
      toast({
        title: "Deletion failed",
        description: error.message || "Failed to delete page. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAiGenerate = () => {
    if (!aiTopic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic for the page.",
        variant: "destructive",
      });
      return;
    }

    const keywordsArray = aiKeywords
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k);

    generatePageMutation.mutate({
      topic: aiTopic.trim(),
      targetAudience: aiTargetAudience.trim() || undefined,
      keywords: keywordsArray.length > 0 ? keywordsArray : undefined,
      includeCallToAction: aiIncludeCta === "true",
    });
  };

  const handleManualCreate = () => {
    if (!manualTitle.trim() || !manualContent.trim()) {
      toast({
        title: "Required fields missing",
        description: "Please fill in title and content fields.",
        variant: "destructive",
      });
      return;
    }

    createPageMutation.mutate({
      title: manualTitle.trim(),
      slug: manualSlug.trim() ? manualSlug.trim() : undefined,
      metaDescription: manualMetaDesc.trim() ? manualMetaDesc.trim() : undefined,
      content: manualContent.trim(),
      author: manualAuthor.trim() ? manualAuthor.trim() : "Casurance Team",
      isPublished: manualPublish,
      isAiGenerated: "false",
    });
  };

  const handleEdit = (page: CmsPage) => {
    setEditingPage(page);
    setShowEditDialog(true);
  };

  const handleUpdate = () => {
    if (!editingPage) return;

    updatePageMutation.mutate({
      id: editingPage.id,
      data: {
        title: editingPage.title,
        slug: editingPage.slug,
        metaDescription: editingPage.metaDescription || undefined,
        content: editingPage.content,
        author: editingPage.author || undefined,
        isPublished: editingPage.isPublished,
      },
    });
  };

  const handleDelete = () => {
    if (!deletingPage) return;
    deletePageMutation.mutate(deletingPage.id);
  };

  const handleTogglePublish = (page: CmsPage) => {
    updatePageMutation.mutate({
      id: page.id,
      data: {
        isPublished: page.isPublished === "true" ? "false" : "true",
      },
    });
  };

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/agent")}
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">CMS Pages</h1>
              <p className="text-sm text-muted-foreground">
                Manage website pages and content
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={logout} data-testid="button-logout">
            Logout
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Page Management</CardTitle>
            <CardDescription>
              Create, edit, and publish pages for your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="ai" data-testid="tab-ai-generation">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Generate
                </TabsTrigger>
                <TabsTrigger value="manual" data-testid="tab-manual-creation">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Manual
                </TabsTrigger>
                <TabsTrigger value="manage" data-testid="tab-manage-pages">
                  <FileText className="w-4 h-4 mr-2" />
                  Manage Pages
                </TabsTrigger>
              </TabsList>

              {/* AI Generation Tab */}
              <TabsContent value="ai" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ai-topic">Topic *</Label>
                    <Input
                      id="ai-topic"
                      placeholder="e.g., Workers Compensation Insurance for Restaurants"
                      value={aiTopic}
                      onChange={(e) => setAiTopic(e.target.value)}
                      data-testid="input-ai-topic"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ai-audience">Target Audience</Label>
                    <Input
                      id="ai-audience"
                      placeholder="e.g., restaurant owners, contractors"
                      value={aiTargetAudience}
                      onChange={(e) => setAiTargetAudience(e.target.value)}
                      data-testid="input-ai-audience"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ai-keywords">Keywords (comma-separated)</Label>
                    <Input
                      id="ai-keywords"
                      placeholder="e.g., workers comp, employee injury, coverage"
                      value={aiKeywords}
                      onChange={(e) => setAiKeywords(e.target.value)}
                      data-testid="input-ai-keywords"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ai-cta">Include Call-to-Action</Label>
                    <Select
                      value={aiIncludeCta}
                      onValueChange={setAiIncludeCta}
                    >
                      <SelectTrigger id="ai-cta" data-testid="select-ai-cta">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleAiGenerate}
                    disabled={isGenerating}
                    className="w-full"
                    data-testid="button-generate-page"
                  >
                    {isGenerating ? (
                      <>Generating...</>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Page with AI
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              {/* Manual Creation Tab */}
              <TabsContent value="manual" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="manual-title">Title *</Label>
                    <Input
                      id="manual-title"
                      placeholder="Page title"
                      value={manualTitle}
                      onChange={(e) => setManualTitle(e.target.value)}
                      data-testid="input-manual-title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="manual-slug">Slug</Label>
                    <Input
                      id="manual-slug"
                      placeholder="url-friendly-slug (auto-generated if empty)"
                      value={manualSlug}
                      onChange={(e) => setManualSlug(e.target.value)}
                      data-testid="input-manual-slug"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="manual-meta">Meta Description</Label>
                    <Textarea
                      id="manual-meta"
                      placeholder="SEO meta description (150-160 characters)"
                      value={manualMetaDesc}
                      onChange={(e) => setManualMetaDesc(e.target.value)}
                      rows={2}
                      data-testid="input-manual-meta"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="manual-content">Content (HTML) *</Label>
                    <Textarea
                      id="manual-content"
                      placeholder="<h2>Heading</h2><p>Your content here...</p>"
                      value={manualContent}
                      onChange={(e) => setManualContent(e.target.value)}
                      rows={12}
                      data-testid="input-manual-content"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="manual-author">Author</Label>
                    <Input
                      id="manual-author"
                      placeholder="Casurance Team"
                      value={manualAuthor}
                      onChange={(e) => setManualAuthor(e.target.value)}
                      data-testid="input-manual-author"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="manual-publish">Publish Immediately</Label>
                    <Select
                      value={manualPublish}
                      onValueChange={setManualPublish}
                    >
                      <SelectTrigger id="manual-publish" data-testid="select-manual-publish">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="false">Save as Draft</SelectItem>
                        <SelectItem value="true">Publish Now</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleManualCreate}
                    disabled={createPageMutation.isPending}
                    className="w-full"
                    data-testid="button-create-page"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Create Page
                  </Button>
                </div>
              </TabsContent>

              {/* Manage Pages Tab */}
              <TabsContent value="manage" className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search pages..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-10"
                      data-testid="input-search-pages"
                    />
                  </div>
                  <Select value={publishedFilter} onValueChange={setPublishedFilter}>
                    <SelectTrigger className="w-full sm:w-48" data-testid="select-published-filter">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Pages</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Drafts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {isLoading ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading pages...</p>
                  </div>
                ) : filteredPages.length === 0 ? (
                  <div className="text-center py-12 border rounded-md bg-card">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg text-muted-foreground">No pages found</p>
                    <p className="text-sm text-muted-foreground">
                      Create your first page using AI or manual creation
                    </p>
                  </div>
                ) : (
                  <div className="rounded-md border bg-card">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Slug</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Updated</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPages.map((page, index) => (
                          <TableRow key={page.id}>
                            <TableCell className="font-medium">
                              {page.title}
                            </TableCell>
                            <TableCell className="font-mono text-sm">
                              /{page.slug}
                            </TableCell>
                            <TableCell>
                              {page.isPublished === "true" ? (
                                <Badge variant="default">Published</Badge>
                              ) : (
                                <Badge variant="secondary">Draft</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {page.isAiGenerated === "true" ? (
                                <Badge variant="outline" className="gap-1">
                                  <Sparkles className="w-3 h-3" />
                                  AI
                                </Badge>
                              ) : (
                                <Badge variant="outline">Manual</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {page.updatedAt
                                ? format(new Date(page.updatedAt), "MMM d, yyyy")
                                : "N/A"}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleTogglePublish(page)}
                                  data-testid={`button-toggle-publish-${index}`}
                                >
                                  {page.isPublished === "true" ? "Unpublish" : "Publish"}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEdit(page)}
                                  data-testid={`button-edit-${index}`}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setDeletingPage(page)}
                                  data-testid={`button-delete-${index}`}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Page</DialogTitle>
            <DialogDescription>
              Make changes to the page content and settings
            </DialogDescription>
          </DialogHeader>
          {editingPage && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={editingPage.title}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, title: e.target.value })
                  }
                  data-testid="input-edit-title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-slug">Slug</Label>
                <Input
                  id="edit-slug"
                  value={editingPage.slug}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, slug: e.target.value })
                  }
                  data-testid="input-edit-slug"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-meta">Meta Description</Label>
                <Textarea
                  id="edit-meta"
                  value={editingPage.metaDescription || ""}
                  onChange={(e) =>
                    setEditingPage({
                      ...editingPage,
                      metaDescription: e.target.value,
                    })
                  }
                  rows={2}
                  data-testid="input-edit-meta"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-content">Content (HTML)</Label>
                <Textarea
                  id="edit-content"
                  value={editingPage.content}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, content: e.target.value })
                  }
                  rows={12}
                  data-testid="input-edit-content"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-author">Author</Label>
                <Input
                  id="edit-author"
                  value={editingPage.author || ""}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, author: e.target.value })
                  }
                  data-testid="input-edit-author"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-publish">Status</Label>
                <Select
                  value={editingPage.isPublished}
                  onValueChange={(value) =>
                    setEditingPage({ ...editingPage, isPublished: value as "true" | "false" })
                  }
                >
                  <SelectTrigger id="edit-publish" data-testid="select-edit-publish">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">Draft</SelectItem>
                    <SelectItem value="true">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEditDialog(false)}
              data-testid="button-cancel-edit"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              disabled={updatePageMutation.isPending}
              data-testid="button-save-changes"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingPage}
        onOpenChange={() => setDeletingPage(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Page</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingPage?.title}"? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              data-testid="button-confirm-delete"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
