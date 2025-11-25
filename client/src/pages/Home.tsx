import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InsuranceProducts from "@/components/InsuranceProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import CallToAction from "@/components/CallToAction";
import ContactInfo from "@/components/ContactInfo";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function Home() {
  return (
    <>
      <SEOHead
        title="Commercial Insurance Nationwide"
        description="Get competitive commercial insurance quotes for your business. Serving all 50 states with expert coverage for general liability, commercial auto, workers comp, and 40+ specialized insurance products. Licensed independent agency since 2010."
        keywords="commercial insurance, business insurance, general liability, workers compensation, commercial auto insurance, professional liability, California commercial insurance, independent insurance agency"
        canonical="/"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content">
          <Hero />
          <InsuranceProducts />
          <WhyChooseUs />
          <CallToAction />
          <ContactInfo />
        </main>
        <Footer />
      </div>
    </>
  );
}
