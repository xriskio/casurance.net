import { useRoute, useLocation } from "wouter";
import { useEffect } from "react";
import ProductLiabilityQuoteForm from "@/components/ProductLiabilityQuoteForm";

const productTypeRoutes: Record<string, string> = {
  "general": "general-manufacturing",
  "cannabis-hemp": "cannabis-hemp",
  "cannabis-thc": "cannabis-thc",
  "firearms": "firearms",
  "ecig-tobacco": "ecig-tobacco",
  "machine-shop": "machine-shop",
  "amusement-device": "amusement-device",
  "discontinued": "discontinued"
};

export default function ProductLiabilityQuote() {
  const [match, params] = useRoute("/quote/product-liability/:type");
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    if (!match || !params?.type || !productTypeRoutes[params.type]) {
      setLocation("/quote/product-liability");
    }
  }, [match, params, setLocation]);

  if (!match || !params?.type || !productTypeRoutes[params.type]) {
    return null;
  }

  const productType = productTypeRoutes[params.type];

  return <ProductLiabilityQuoteForm productType={productType} />;
}
