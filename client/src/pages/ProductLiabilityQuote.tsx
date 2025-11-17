import { useRoute } from "wouter";
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
  const [, params] = useRoute("/quote/product-liability/:type");
  
  const productType = params?.type ? productTypeRoutes[params.type] : "general-manufacturing";

  return <ProductLiabilityQuoteForm productType={productType} />;
}
