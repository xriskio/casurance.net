import { Helmet } from "react-helmet-async";
import ViolentAttackQuoteForm from "@/components/ViolentAttackQuoteForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ViolentAttackQuote() {
  return (
    <>
      <Helmet>
        <title>Violent Attack Coverage Quote | Casurance</title>
        <meta 
          name="description" 
          content="Request a quote for Violent Attack Coverage insurance. Protect your business against active shooter events, terrorism, and violent incidents with comprehensive liability and property coverage." 
        />
        <meta name="keywords" content="violent attack insurance, active shooter coverage, terrorism insurance, workplace violence coverage, commercial insurance quote" />
        <link rel="canonical" href="https://www.casurance.com/quote/violent-attack-coverage" />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 py-12 px-4 bg-muted/30">
          <div className="container mx-auto">
            <ViolentAttackQuoteForm />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
