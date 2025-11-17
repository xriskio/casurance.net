import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilmProductionQuoteForm from "@/components/FilmProductionQuoteForm";

export default function FilmProductionQuote() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <FilmProductionQuoteForm />
      </main>
      <Footer />
    </div>
  );
}
