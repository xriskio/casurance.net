import CoverageDetail from '../CoverageDetail';

const mockCoverage = {
  title: "General Liability",
  slug: "general-liability",
  category: "Casualty",
  summary: "Core liability protection for businesses against third-party bodily injury and property damage claims.",
  description: "General liability insurance protects businesses from liability claims arising from bodily injury, property damage, and personal injury to third parties during normal business operations.",
  whoNeeds: [
    "Virtually all commercial businesses",
    "Retail stores and service providers",
    "Manufacturers and distributors",
    "Office-based businesses",
  ],
  coverageIncludes: [
    "Third-party bodily injury liability",
    "Third-party property damage liability",
    "Personal and advertising injury",
    "Medical payments coverage",
    "Products and completed operations",
    "Premises liability coverage"
  ],
  benefits: [
    "Essential protection for business operations",
    "Required by most commercial leases and contracts",
    "Covers legal defense costs",
    "Protects business assets and reputation",
  ]
};

export default function CoverageDetailExample() {
  return (
    <div className="bg-background">
      <CoverageDetail coverage={mockCoverage} />
    </div>
  );
}
