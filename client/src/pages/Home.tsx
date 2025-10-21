import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InsuranceProducts from "@/components/InsuranceProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import TrustedCarriers from "@/components/TrustedCarriers";
import CallToAction from "@/components/CallToAction";
import ContactInfo from "@/components/ContactInfo";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <InsuranceProducts />
      <WhyChooseUs />
      <TrustedCarriers />
      <CallToAction />
      <ContactInfo />
      <Footer />
    </div>
  );
}
