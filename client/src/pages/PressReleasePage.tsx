import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, ArrowLeft, MapPin, Mail, Phone } from "lucide-react";
import type { PressRelease } from "@shared/schema";
import ReactMarkdown from "react-markdown";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

export default function PressReleasePage() {
  const [, params] = useRoute("/press-releases/:slug");
  const slug = params?.slug;

  const { data: release, isLoading } = useQuery<PressRelease>({
    queryKey: ["/api/press-releases", slug],
    queryFn: async () => {
      const response = await fetch(`/api/press-releases/${slug}`);
      if (!response.ok) throw new Error("Failed to fetch press release");
      return response.json();
    },
    enabled: !!slug,
  });

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!release) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardContent className="p-12 text-center">
              <h1 className="text-2xl font-bold text-foreground mb-4">Press Release Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The press release you're looking for doesn't exist.
              </p>
              <Link href="/press-releases">
                <Button data-testid="button-back-to-press-releases">
                  <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                  Back to Press Releases
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{release.title} | Casurance Press Release</title>
        <meta name="description" content={release.subtitle || release.title} />
        <link rel="canonical" href={`https://casurance.com/press-releases/${release.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://casurance.com/press-releases/${release.slug}`} />
        <meta property="og:title" content={release.title} />
        <meta property="og:description" content={release.subtitle || release.title} />
        <meta property="article:published_time" content={release.publishedAt?.toString() || ''} />
        <meta property="article:section" content={release.category} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": release.title,
            "datePublished": release.publishedAt,
            "articleSection": release.category,
            "publisher": {
              "@type": "Organization",
              "name": "Casurance Insurance Agency",
              "email": "press@casurance.com"
            }
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <Link href="/press-releases">
          <Button variant="ghost" className="mb-6" data-testid="button-back-to-press-releases">
            <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
            Back to Press Releases
          </Button>
        </Link>

        <article>
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="secondary">{release.category}</Badge>
              {release.location && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" aria-hidden="true" />
                  {release.location}
                </Badge>
              )}
            </div>

            <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-press-release-title">
              {release.title}
            </h1>

            {release.subtitle && (
              <p className="text-xl text-muted-foreground mb-4">
                {release.subtitle}
              </p>
            )}

            <div className="flex items-center gap-2 text-muted-foreground mb-6">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span>{formatDate(release.publishedAt)}</span>
            </div>

            <Separator />
          </header>

          {release.imageUrl && (
            <div className="w-full mb-8 rounded-lg overflow-hidden">
              <img 
                src={release.imageUrl} 
                alt={release.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <div className="text-xl text-foreground mb-8 font-medium">
              {release.excerpt}
            </div>

            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-foreground leading-relaxed mb-4">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 mb-4 text-foreground">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-4 text-foreground">
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li className="ml-4">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                em: ({ children }) => <em className="italic">{children}</em>,
              }}
            >
              {release.content}
            </ReactMarkdown>
          </div>

          <Separator className="my-8" />

          <footer className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {release.tags.map((tag, idx) => (
                <Badge key={idx} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>

            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Media Contact</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-foreground font-medium">{release.contactName}</p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <a href={`mailto:${release.contactEmail}`} className="hover:text-primary">
                      {release.contactEmail}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    <a href={`tel:${release.contactPhone}`} className="hover:text-primary">
                      {release.contactPhone}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </footer>
        </article>
      </div>
      <Footer />
    </div>
    </>
  );
}
