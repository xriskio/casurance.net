import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar } from "lucide-react";
import type { BlogPost } from "@shared/schema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { data: categories = [] } = useQuery<string[]>({
    queryKey: ["/api/blog-categories"],
  });

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts", selectedCategory, searchTerm],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory) params.append("category", selectedCategory);
      if (searchTerm) params.append("search", searchTerm);
      const response = await fetch(`/api/blog-posts?${params}`);
      if (!response.ok) throw new Error("Failed to fetch posts");
      return response.json();
    },
  });

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <SEOHead
        title="Commercial Insurance News & Insights Blog"
        description="Expert commercial insurance guidance, risk management strategies, and industry updates. Stay informed with articles on general liability, workers comp, commercial auto, and business insurance best practices."
        keywords="commercial insurance blog, business insurance news, insurance industry updates, risk management articles, insurance tips, commercial coverage insights"
      />
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
      <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b5998] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4" data-testid="text-blog-title">
              Insurance News & Insights
            </h1>
            <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
              Expert guidance on commercial insurance, risk management, and industry updates
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="flex flex-col gap-6 mb-8">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" aria-hidden="true" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-blog-search"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === "" ? "default" : "outline"}
              className="cursor-pointer hover-elevate active-elevate-2"
              onClick={() => setSelectedCategory("")}
              data-testid="badge-category-all"
            >
              All Articles
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover-elevate active-elevate-2"
                onClick={() => setSelectedCategory(category)}
                data-testid={`badge-category-${category.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="h-64 animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-muted rounded w-full mb-2"></div>
                  <div className="h-3 bg-muted rounded w-5/6"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground text-lg">
                No blog posts found. Try adjusting your search or category filters.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full hover-elevate cursor-pointer transition-all overflow-hidden" data-testid={`card-blog-post-${post.id}`}>
                  {post.imageUrl && (
                    <div className="w-full h-48 overflow-hidden">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-foreground line-clamp-2">
                      {post.title}
                    </h2>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-xs text-muted-foreground">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
    </>
  );
}
