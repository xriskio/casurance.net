import EmploymentPracticesQuoteForm from "@/components/EmploymentPracticesQuoteForm";

export default function EmploymentPracticesQuote() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-page-title">
            Employment Practices Liability Insurance Quote
          </h1>
          <p className="text-xl text-muted-foreground" data-testid="text-page-description">
            Protect your business from employee-related claims including wrongful termination, 
            discrimination, harassment, and workplace violations. Complete the application below 
            to receive a comprehensive quote.
          </p>
        </div>
        
        <EmploymentPracticesQuoteForm />
      </div>
    </div>
  );
}
