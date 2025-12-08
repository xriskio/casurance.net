import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InsuranceProducts from "@/components/InsuranceProducts";
import TrustedCarriers from "@/components/TrustedCarriers";
import SuccessStories from "@/components/SuccessStories";
import WhyChooseUs from "@/components/WhyChooseUs";
import CallToAction from "@/components/CallToAction";
import ContactInfo from "@/components/ContactInfo";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const homeFaqs = [
  {
    question: "What types of commercial insurance does Casurance offer?",
    answer: "Casurance offers a comprehensive range of commercial insurance products including General Liability, Commercial Auto, Workers Compensation, Professional Liability, Commercial Property, Cyber Liability, Employment Practices Liability, and specialized coverage for over 20 industries."
  },
  {
    question: "How do I get a commercial insurance quote from Casurance?",
    answer: "Getting a quote is easy! Simply visit our quote page, select your insurance type, and fill out the quick form with your business information. Our team will review your request and provide competitive quotes within 24-48 hours."
  },
  {
    question: "What industries does Casurance specialize in?",
    answer: "Casurance specializes in commercial insurance for various industries including auto dealers, golf and country clubs, self-storage facilities, transportation companies, restaurants, hotels, construction, manufacturing, healthcare, and technology firms."
  },
  {
    question: "Is Casurance a licensed insurance agency?",
    answer: "Yes, Casurance is a fully licensed and independent commercial insurance agency. We work with multiple top-rated insurance carriers to provide competitive coverage options for businesses of all sizes."
  },
  {
    question: "How long does it take to get commercial insurance coverage?",
    answer: "The timeline varies by coverage type and complexity. Simple policies like general liability can often be bound within 24-48 hours. More complex coverage such as commercial auto fleets or specialty programs may take 5-10 business days for underwriting review."
  }
];

const homeServices = [
  { name: "General Liability Insurance", description: "Comprehensive protection against third-party claims for bodily injury and property damage", url: "/coverage/general-liability" },
  { name: "Commercial Auto Insurance", description: "Fleet and vehicle coverage for business-owned automobiles and trucks", url: "/coverage/commercial-auto" },
  { name: "Workers Compensation Insurance", description: "Employee injury and illness coverage meeting state requirements", url: "/coverage/workers-compensation" },
  { name: "Professional Liability Insurance", description: "Errors and omissions coverage for professional services", url: "/coverage/professional-liability" },
  { name: "Commercial Property Insurance", description: "Protection for buildings, equipment, and inventory", url: "/coverage/commercial-property" },
  { name: "Cyber Liability Insurance", description: "Data breach and cybersecurity incident coverage", url: "/coverage/cyber-liability" }
];

export default function Home() {
  return (
    <>
      <SEOHead
        title="Commercial Insurance Agency"
        description="Get competitive commercial insurance quotes for your business. Expert coverage for general liability, commercial auto, workers comp, and 40+ specialized insurance products. Licensed independent agency with fast quotes."
        keywords="commercial insurance, business insurance, general liability, workers compensation, commercial auto insurance, professional liability, California commercial insurance, independent insurance agency"
        canonical="/"
        faqs={homeFaqs}
        services={homeServices}
        isHomePage={true}
        speakable={true}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <InsuranceProducts />
          <TrustedCarriers />
          <SuccessStories />
          <WhyChooseUs />
          <CallToAction />
          <ContactInfo />
        </main>
        <Footer />
      </div>
    </>
  );
}
