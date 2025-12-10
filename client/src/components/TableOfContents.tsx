import { useState, useEffect } from "react";
import { List, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  title?: string;
}

export default function TableOfContents({ items, title = "In This Article" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  if (items.length < 3) {
    return null;
  }

  return (
    <Card className="mb-8 sticky top-20" data-testid="table-of-contents">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <List className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <nav aria-label="Table of contents">
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
              >
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 text-sm w-full text-left py-1 px-2 rounded-md transition-colors ${
                    activeId === item.id
                      ? "text-primary bg-primary/10 font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  data-testid={`toc-link-${item.id}`}
                >
                  <ChevronRight className={`h-3 w-3 flex-shrink-0 transition-transform ${
                    activeId === item.id ? "rotate-90" : ""
                  }`} />
                  <span className="line-clamp-2">{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </CardContent>
    </Card>
  );
}

export function generateTOCItems(containerSelector: string): TOCItem[] {
  const container = document.querySelector(containerSelector);
  if (!container) return [];

  const headings = container.querySelectorAll("h2, h3");
  const items: TOCItem[] = [];

  headings.forEach((heading) => {
    if (heading.id) {
      items.push({
        id: heading.id,
        title: heading.textContent || "",
        level: heading.tagName === "H2" ? 1 : 2
      });
    }
  });

  return items;
}
