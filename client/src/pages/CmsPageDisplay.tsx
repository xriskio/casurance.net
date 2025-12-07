import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";
import NotFound from "@/pages/not-found";
import type { CmsPage } from "@shared/schema";

export default function CmsPageDisplay() {
  const { slug } = useParams<{ slug: string }>();

  const { data: page, isLoading, error } = useQuery<CmsPage>({
    queryKey: ['/api/cms/pages/slug', slug],
    queryFn: async () => {
      const response = await fetch(`/api/cms/pages/slug/${slug}`);
      if (!response.ok) throw new Error("Failed to fetch page");
      return response.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <Skeleton className="h-12 w-3/4 mb-6" data-testid="skeleton-title" />
          <Skeleton className="h-64 w-full mt-6" data-testid="skeleton-content" />
        </div>
      </div>
    );
  }

  if (error || !page || page.isPublished !== 'true') {
    return <NotFound />;
  }

  return (
    <>
      <Helmet>
        <title>{page.title} - Casurance</title>
        {page.metaDescription && (
          <meta name="description" content={page.metaDescription} />
        )}
      </Helmet>

      <main id="main-content" tabIndex={-1} className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <article>
            <header className="mb-12">
              <h1 
                className="text-4xl md:text-5xl font-bold mb-4 text-foreground"
                data-testid="text-page-title"
              >
                {page.title}
              </h1>
            </header>

            {page.featuredImage && (
              <div className="mb-12">
                <img
                  src={page.featuredImage}
                  alt={page.title}
                  className="w-full rounded-lg shadow-lg"
                  data-testid="img-featured"
                />
              </div>
            )}

            <div 
              className="prose prose-lg max-w-none dark:prose-invert"
              data-testid="content-body"
            >
              <ReactMarkdown>{page.content}</ReactMarkdown>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
