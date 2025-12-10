import { useState, useEffect, useRef } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
}

export default function LazyImage({
  src,
  alt,
  className = "",
  placeholderClassName = "bg-muted animate-pulse",
  loading = "lazy",
  decoding = "async"
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "100px",
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {!isLoaded && (
        <div className={`absolute inset-0 ${placeholderClassName}`} />
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding={decoding}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}

export function LazyBackgroundImage({
  src,
  alt,
  className = "",
  children
}: {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "100px",
        threshold: 0.01
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isInView && src) {
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.src = src;
    }
  }, [isInView, src]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={isLoaded ? { backgroundImage: `url(${src})` } : undefined}
      role="img"
      aria-label={alt}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      {children}
    </div>
  );
}
