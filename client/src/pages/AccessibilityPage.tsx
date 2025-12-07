import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Check, Keyboard, Eye, Volume2, MousePointer2, MonitorSmartphone, FileText } from "lucide-react";

const accessibilityFeatures = [
  {
    icon: Keyboard,
    title: "Keyboard Navigation",
    description: "All interactive elements are accessible via keyboard. Use Tab to navigate forward, Shift+Tab to navigate backward, and Enter or Space to activate buttons and links."
  },
  {
    icon: Eye,
    title: "Visual Accessibility",
    description: "Our website maintains a minimum color contrast ratio of 4.5:1 for text content and uses clear, readable fonts. We avoid using color alone to convey meaning."
  },
  {
    icon: Volume2,
    title: "Screen Reader Support",
    description: "All images include descriptive alt text, and we use proper heading hierarchy and ARIA labels to ensure screen readers can accurately convey content."
  },
  {
    icon: MousePointer2,
    title: "Focus Indicators",
    description: "Clear, visible focus indicators help users understand which element is currently selected when navigating with a keyboard."
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive Design",
    description: "Our website works on all screen sizes and supports zoom up to 200% without loss of functionality or content."
  },
  {
    icon: FileText,
    title: "Descriptive Links",
    description: "All links have descriptive text that clearly indicates their destination or purpose, helping users understand where they will be taken."
  }
];

const wcagChecklist = [
  "Descriptive heading structures (H1, H2, etc)",
  "ALT tags for all meaningful images",
  "Descriptive hyperlinks throughout",
  "Site works properly when zoomed",
  "No automatic content or unexpected changes",
  "No automatic video or audio playback",
  "Pages are free of broken code and links",
  "Visual sitemap of site navigation",
  "No dual scrolling issues",
  "Default language set for site",
  "Meaningful and consistent structure",
  "Color alone does not convey meaning",
  "Consistency in icons and buttons",
  "Text color contrast ratio of 4.5:1 or better",
  "No images of text",
  "Site fully navigable via keyboard",
  "Focus is clearly shown throughout site",
  "Skip navigation shows when using keyboard"
];

export default function AccessibilityPage() {
  return (
    <>
      <SEOHead
        title="Accessibility Statement | Casurance Agency"
        description="Casurance is committed to ensuring digital accessibility for all users. Learn about our WCAG 2.1 AA compliance and accessibility features."
        keywords="accessibility, WCAG 2.1, ADA compliance, screen reader, keyboard navigation, accessible insurance website"
        canonical="/accessibility"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content" tabIndex={-1}>
          <section className="py-16 bg-gradient-to-b from-[#0a1628] to-[#142237]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Accessibility Statement
                </h1>
                <p className="text-lg text-white/80">
                  Casurance is committed to ensuring digital accessibility for all users, 
                  including those with disabilities.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="prose prose-lg max-w-none mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Commitment</h2>
                <p className="text-muted-foreground mb-6">
                  Casurance Agency Insurance Services is committed to ensuring that our website is accessible to everyone, 
                  including people with disabilities. We strive to meet or exceed the Web Content Accessibility Guidelines 
                  (WCAG) 2.1 Level AA standards as well as Section 508 requirements.
                </p>
                <p className="text-muted-foreground mb-6">
                  We believe that all users should have equal access to information about our insurance products and 
                  services. Accessibility is an ongoing effort, and we continuously work to improve the user experience 
                  for everyone who visits our website.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-8">Accessibility Features</h2>
              <div className="grid gap-6 md:grid-cols-2 mb-12">
                {accessibilityFeatures.map((feature, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-6">WCAG 2.1 AA Compliance</h2>
              <Card className="p-6 mb-12">
                <p className="text-muted-foreground mb-6">
                  Our website has been designed and developed to meet WCAG 2.1 Level AA standards. 
                  Below is a summary of the accessibility features we have implemented:
                </p>
                <div className="grid gap-2 md:grid-cols-2">
                  {wcagChecklist.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 py-1">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <h2 className="text-2xl font-bold text-foreground mb-4">Browser and Technology Compatibility</h2>
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-muted-foreground mb-6">
                  Our website is designed to be compatible with modern browsers and assistive technologies including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                  <li>Screen readers (JAWS, NVDA, VoiceOver)</li>
                  <li>Screen magnification software</li>
                  <li>Speech recognition software</li>
                  <li>Keyboard-only navigation</li>
                  <li>Modern browsers (Chrome, Firefox, Safari, Edge)</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-4">Keyboard Shortcuts</h2>
              <Card className="p-6 mb-12">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-foreground">Skip to main content</span>
                    <kbd className="px-3 py-1 bg-muted text-sm rounded">Tab</kbd>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-foreground">Navigate forward</span>
                    <kbd className="px-3 py-1 bg-muted text-sm rounded">Tab</kbd>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-foreground">Navigate backward</span>
                    <kbd className="px-3 py-1 bg-muted text-sm rounded">Shift + Tab</kbd>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-foreground">Activate button/link</span>
                    <kbd className="px-3 py-1 bg-muted text-sm rounded">Enter</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Toggle checkbox/switch</span>
                    <kbd className="px-3 py-1 bg-muted text-sm rounded">Space</kbd>
                  </div>
                </div>
              </Card>

              <h2 className="text-2xl font-bold text-foreground mb-4">Feedback and Contact</h2>
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-muted-foreground mb-6">
                  We welcome your feedback on the accessibility of our website. If you encounter any accessibility 
                  barriers or have suggestions for improvement, please contact us:
                </p>
                <Card className="p-6">
                  <div className="space-y-3">
                    <p className="text-foreground">
                      <strong>Phone:</strong>{" "}
                      <a href="tel:18882540089" className="text-primary hover:underline">1-888-254-0089</a>
                    </p>
                    <p className="text-foreground">
                      <strong>Email:</strong>{" "}
                      <a href="mailto:info@casurance.com" className="text-primary hover:underline">info@casurance.com</a>
                    </p>
                    <p className="text-foreground">
                      <strong>Address:</strong> 714 W. Olympic Blvd, Suite 906, Los Angeles, CA 90015
                    </p>
                  </div>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-4">Continuous Improvement</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground mb-6">
                  We are committed to continuously improving the accessibility of our website. We regularly review 
                  our site for accessibility issues and work to address any problems that are identified. Our 
                  accessibility standards are monitored and updated to align with the latest guidelines and best practices.
                </p>
                <p className="text-sm text-muted-foreground">
                  Last updated: December 2024
                </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
