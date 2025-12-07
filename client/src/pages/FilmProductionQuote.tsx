import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilmProductionQuoteForm from "@/components/FilmProductionQuoteForm";
import SEOHead from "@/components/SEOHead";

export default function FilmProductionQuote() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Film Production Insurance Quote"
        description="Get comprehensive film and entertainment production insurance. Coverage for cast, crew, equipment, and production liability."
        keywords="film production insurance, entertainment insurance, movie insurance, production liability"
        canonical="/quote/film-production"
      />
      <Header />
      <main id="main-content" className="flex-1">
        <FilmProductionQuoteForm />
      </main>
      <Footer />
    </div>
  );
}
