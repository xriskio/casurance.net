const carriers = [
  "Travelers", "Hartford", "Nationwide", "Progressive", "Chubb",
  "Liberty Mutual", "CNA", "Zurich", "AmTrust", "MetLife",
  "Safeco", "Cincinnati", "Arch Insurance", "Berkshire Hathaway"
];

export default function TrustedCarriers() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Partnered with Industry-Leading Carriers
          </h2>
          <p className="text-muted-foreground">
            We work with top-rated insurance companies to find you the best coverage
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center">
          {carriers.map((carrier, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-16 px-4"
              data-testid={`carrier-${index}`}
            >
              <div className="text-center">
                <div className="font-semibold text-sm text-muted-foreground/70">
                  {carrier}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
