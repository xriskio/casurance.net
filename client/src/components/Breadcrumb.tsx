import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav 
      aria-label="Breadcrumb navigation" 
      className={`text-sm ${className}`}
      data-testid="nav-breadcrumb"
    >
      <ol className="flex flex-wrap items-center gap-1 text-muted-foreground">
        <li className="flex items-center">
          <Link 
            href="/" 
            className="flex items-center hover:text-primary transition-colors"
            aria-label="Home"
            data-testid="breadcrumb-home"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.url} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" aria-hidden="true" />
              {isLast ? (
                <span 
                  className="text-foreground font-medium truncate max-w-[200px]"
                  aria-current="page"
                  data-testid={`breadcrumb-current-${index}`}
                >
                  {item.name}
                </span>
              ) : (
                <Link 
                  href={item.url}
                  className="hover:text-primary transition-colors truncate max-w-[200px]"
                  data-testid={`breadcrumb-link-${index}`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
