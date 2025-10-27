export interface CoverageContent {
  title: string;
  slug: string;
  category: string;
  summary: string;
  description: string;
  whoNeeds: string[];
  coverageIncludes: string[];
  benefits: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export const coverages: CoverageContent[] = [
  // CASUALTY
  {
    title: "Construction Casualty",
    slug: "construction-casualty",
    category: "Casualty",
    summary: "Comprehensive liability coverage for construction operations and contracting businesses.",
    description: "Construction casualty insurance protects contractors, subcontractors, and construction companies from third-party claims of bodily injury and property damage arising from construction operations. This essential coverage addresses the unique risks inherent in building and construction projects.",
    whoNeeds: [
      "General contractors and subcontractors",
      "Commercial builders and residential construction companies",
      "Specialty trade contractors (electrical, plumbing, HVAC)",
      "Renovation and remodeling contractors",
      "Heavy construction and infrastructure projects"
    ],
    coverageIncludes: [
      "Bodily injury liability for third parties",
      "Property damage to non-owned property",
      "Completed operations coverage",
      "Products and completed operations liability",
      "Contractual liability protection",
      "Personal and advertising injury coverage"
    ],
    benefits: [
      "Protection against costly construction-related claims",
      "Coverage for both ongoing and completed work",
      "Meets contractual insurance requirements",
      "Includes defense costs and legal fees",
      "Competitive rates for qualified contractors"
    ]
  },
  {
    title: "Excess Casualty",
    slug: "excess-casualty",
    category: "Casualty",
    summary: "Additional liability limits above primary casualty policies for catastrophic loss protection.",
    description: "Excess casualty insurance provides an additional layer of liability protection above your primary general liability, auto liability, and employer's liability policies. This coverage activates when claims exceed your underlying policy limits, protecting your business assets from catastrophic losses.",
    whoNeeds: [
      "Businesses with significant liability exposure",
      "Companies with high-value contracts requiring elevated limits",
      "Organizations in high-risk industries",
      "Businesses with substantial assets to protect",
      "Companies seeking comprehensive liability protection"
    ],
    coverageIncludes: [
      "Excess liability above primary general liability",
      "Excess coverage over auto liability policies",
      "Excess employer's liability protection",
      "Coverage for catastrophic claims",
      "Broader coverage than underlying policies (in some cases)",
      "Defense cost coverage above primary limits"
    ],
    benefits: [
      "Enhanced protection for significant claims",
      "Meets high contractual liability requirements",
      "Cost-effective way to increase coverage limits",
      "Protects business and personal assets",
      "Peace of mind for large-scale operations"
    ]
  },
  {
    title: "General Casualty",
    slug: "general-casualty",
    category: "Casualty",
    summary: "Core liability protection for businesses against third-party bodily injury and property damage claims.",
    description: "General casualty insurance, commonly known as Commercial General Liability (CGL), is fundamental coverage that protects businesses from liability claims arising from bodily injury, property damage, and personal injury to third parties during normal business operations.",
    whoNeeds: [
      "Virtually all commercial businesses",
      "Retail stores and service providers",
      "Manufacturers and distributors",
      "Office-based businesses",
      "Any business interacting with customers or the public"
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
      "Affordable coverage for businesses of all sizes"
    ]
  },
  {
    title: "Small Business Casualty",
    slug: "small-business-casualty",
    category: "Casualty",
    summary: "Tailored liability coverage designed specifically for small business operations and budgets.",
    description: "Small business casualty insurance offers essential liability protection designed for the unique needs and budget constraints of small businesses. This coverage provides comprehensive protection against common liability risks while maintaining affordable premiums for growing companies.",
    whoNeeds: [
      "Small retail and service businesses",
      "Home-based businesses expanding operations",
      "Start-ups and emerging companies",
      "Sole proprietors and partnerships",
      "Small professional service firms"
    ],
    coverageIncludes: [
      "General liability protection",
      "Product liability coverage",
      "Advertising injury protection",
      "Premises liability",
      "Business property protection options",
      "Flexible coverage limits"
    ],
    benefits: [
      "Affordable rates for small businesses",
      "Simplified application process",
      "Bundling options with property coverage",
      "Scalable coverage as your business grows",
      "Essential protection without breaking the budget"
    ]
  },
  {
    title: "Specialty Casualty",
    slug: "specialty-casualty",
    category: "Casualty",
    summary: "Customized liability solutions for unique or hard-to-place risks and specialized industries.",
    description: "Specialty casualty insurance provides tailored liability coverage for unique business operations, emerging industries, or risks that fall outside standard commercial insurance markets. This flexible coverage addresses the specific exposures of non-traditional or higher-risk business ventures.",
    whoNeeds: [
      "Emerging and innovative industries",
      "Unique or unusual business operations",
      "High-risk ventures and activities",
      "Businesses with specialized equipment or operations",
      "Companies requiring customized coverage solutions"
    ],
    coverageIncludes: [
      "Customized liability protection",
      "Coverage for unique business exposures",
      "Specialized endorsements and extensions",
      "Flexible policy structures",
      "Industry-specific risk coverage",
      "Non-standard operations protection"
    ],
    benefits: [
      "Tailored coverage for unique risks",
      "Access to specialty insurance markets",
      "Expert underwriting for complex risks",
      "Flexible policy terms and conditions",
      "Coverage when standard markets decline"
    ]
  },

  // ENERGY
  {
    title: "Energy",
    slug: "energy",
    category: "Energy",
    summary: "Comprehensive insurance solutions for oil, gas, renewable energy, and power generation operations.",
    description: "Energy insurance provides specialized coverage for companies involved in the exploration, production, transportation, and distribution of energy resources. This includes traditional oil and gas operations, renewable energy projects, utilities, and power generation facilities.",
    whoNeeds: [
      "Oil and gas exploration and production companies",
      "Renewable energy developers (solar, wind, hydroelectric)",
      "Electric utilities and power plants",
      "Pipeline operators and transportation companies",
      "Energy equipment manufacturers and contractors"
    ],
    coverageIncludes: [
      "Operational property damage coverage",
      "Control of well coverage for oil and gas",
      "Environmental liability protection",
      "Equipment breakdown insurance",
      "Business interruption coverage",
      "Third-party liability protection"
    ],
    benefits: [
      "Specialized coverage for energy sector risks",
      "Protection for high-value equipment and operations",
      "Environmental remediation coverage",
      "Expert claims handling for energy losses",
      "Competitive rates for established operators"
    ]
  },

  // ENTERTAINMENT
  {
    title: "Entertainment",
    slug: "entertainment",
    category: "Entertainment",
    summary: "Specialized coverage for film, television, live events, and entertainment production companies.",
    description: "Entertainment insurance protects production companies, venues, performers, and event organizers from the unique risks associated with the entertainment industry. Coverage addresses everything from film production to live concerts and theatrical performances.",
    whoNeeds: [
      "Film and television production companies",
      "Event promoters and concert organizers",
      "Theaters and performance venues",
      "Sports and entertainment facilities",
      "Content creators and streaming platforms"
    ],
    coverageIncludes: [
      "Production liability insurance",
      "Equipment and property coverage",
      "Cast and crew protection",
      "Event cancellation insurance",
      "Errors and omissions liability",
      "General liability for venues and events"
    ],
    benefits: [
      "Protection for high-value productions",
      "Coverage for equipment and props",
      "Event cancellation and postponement coverage",
      "Industry-specific risk management",
      "Quick quote turnaround for time-sensitive projects"
    ]
  },

  // ENVIRONMENTAL
  {
    title: "Environmental",
    slug: "environmental",
    category: "Environmental",
    summary: "Pollution liability and environmental cleanup coverage for businesses with contamination risks.",
    description: "Environmental insurance protects businesses from the costs of pollution, contamination, and environmental cleanup. This coverage is essential for companies that handle hazardous materials, operate industrial facilities, or own property with potential environmental exposure.",
    whoNeeds: [
      "Manufacturing and industrial facilities",
      "Waste management and recycling operations",
      "Chemical processors and distributors",
      "Property owners and developers",
      "Transportation companies handling hazardous materials"
    ],
    coverageIncludes: [
      "Pollution liability coverage",
      "Environmental cleanup costs",
      "Third-party bodily injury from pollution",
      "Property damage from contamination",
      "Regulatory defense costs",
      "Transportation pollution liability"
    ],
    benefits: [
      "Protection against costly environmental claims",
      "Regulatory compliance support",
      "Coverage for gradual and sudden pollution events",
      "Expert environmental risk assessment",
      "Meets lender and regulatory requirements"
    ]
  },

  // LIFE SCIENCES
  {
    title: "Life Sciences",
    slug: "life-sciences",
    category: "Life Sciences",
    summary: "Specialized insurance for pharmaceutical, biotech, and medical device companies.",
    description: "Life sciences insurance provides comprehensive coverage for companies developing, manufacturing, and distributing pharmaceutical products, biotechnology innovations, and medical devices. This coverage addresses the unique regulatory and liability risks in the healthcare and life sciences industries.",
    whoNeeds: [
      "Pharmaceutical manufacturers and developers",
      "Biotechnology research companies",
      "Medical device manufacturers",
      "Clinical research organizations",
      "Healthcare technology companies"
    ],
    coverageIncludes: [
      "Product liability for medical products",
      "Clinical trials liability",
      "Professional liability for researchers",
      "Contamination and recall coverage",
      "Regulatory defense protection",
      "Cyber liability for health data"
    ],
    benefits: [
      "Specialized underwriting for life sciences risks",
      "Coverage throughout product development lifecycle",
      "Regulatory and FDA compliance support",
      "Protection for clinical trials and research",
      "Access to industry-specific expertise"
    ]
  },

  // PRODUCT RECALL
  {
    title: "Product Recall",
    slug: "product-recall",
    category: "Product Recall",
    summary: "Coverage for expenses related to recalling defective or contaminated products from the market.",
    description: "Product recall insurance covers the costs associated with recalling, replacing, or destroying products due to defects, contamination, or safety concerns. This coverage is essential for manufacturers, distributors, and retailers who could face significant financial losses from a product recall.",
    whoNeeds: [
      "Food and beverage manufacturers",
      "Consumer product manufacturers",
      "Pharmaceutical and supplement companies",
      "Automotive and parts manufacturers",
      "Retailers and distributors of consumer goods"
    ],
    coverageIncludes: [
      "Product recall and withdrawal expenses",
      "Notification and communication costs",
      "Destruction and disposal costs",
      "Consultant and crisis management fees",
      "Lost profits during recall period",
      "Product replacement costs"
    ],
    benefits: [
      "Minimizes financial impact of recalls",
      "Covers costs beyond standard liability policies",
      "Crisis management support",
      "Protects brand reputation",
      "First-party coverage for recall expenses"
    ]
  },

  // PRODUCTS LIABILITY
  {
    title: "Products Liability",
    slug: "products-liability",
    category: "Products Liability",
    summary: "Protection against claims arising from defective or harmful products sold or manufactured.",
    description: "Products liability insurance protects manufacturers, distributors, wholesalers, and retailers from claims alleging that their products caused injury or damage. This coverage is essential for any business that makes, sells, or distributes products to consumers or other businesses.",
    whoNeeds: [
      "Product manufacturers of all types",
      "Wholesale distributors and importers",
      "Retail stores selling products",
      "Online merchants and e-commerce businesses",
      "Private label and contract manufacturers"
    ],
    coverageIncludes: [
      "Bodily injury from defective products",
      "Property damage caused by products",
      "Defense costs and legal fees",
      "Completed products liability",
      "Contractual liability coverage",
      "Worldwide coverage options"
    ],
    benefits: [
      "Protection for product-related claims",
      "Coverage throughout distribution chain",
      "Defense even for groundless suits",
      "Meets retailer and distributor requirements",
      "Competitive rates for low-risk products"
    ]
  },

  // PROFESSIONAL LIABILITY - Allied Health
  {
    title: "Allied Health Professional Liability",
    slug: "allied-health",
    category: "Professional Lines",
    summary: "Malpractice coverage for allied health professionals including therapists, technicians, and healthcare support staff.",
    description: "Allied health professional liability insurance protects non-physician healthcare providers from malpractice claims. This includes physical therapists, occupational therapists, respiratory therapists, medical technicians, and other allied health professionals who provide patient care.",
    whoNeeds: [
      "Physical and occupational therapists",
      "Respiratory and radiation therapists",
      "Medical laboratory technicians",
      "Dental hygienists and assistants",
      "Speech-language pathologists"
    ],
    coverageIncludes: [
      "Professional malpractice liability",
      "Defense costs and legal representation",
      "Bodily injury from professional services",
      "HIPAA violation protection",
      "License defense coverage",
      "Disciplinary proceedings coverage"
    ],
    benefits: [
      "Specialized coverage for allied health risks",
      "Affordable premiums for allied health professionals",
      "Occurrence or claims-made options",
      "Coverage for independent contractors",
      "Expert defense attorneys familiar with healthcare"
    ]
  },

  {
    title: "Excess Professional Liability",
    slug: "excess-professional",
    category: "Professional Lines",
    summary: "Additional professional liability limits above primary E&O and malpractice policies.",
    description: "Excess professional liability insurance provides additional coverage limits above your primary professional liability, errors and omissions, or malpractice insurance. This umbrella-style coverage protects professional service providers from catastrophic claims that exceed underlying policy limits.",
    whoNeeds: [
      "Large professional service firms",
      "High-risk professional specialties",
      "Professionals with significant exposure",
      "Firms serving enterprise clients",
      "Healthcare facilities and hospital systems"
    ],
    coverageIncludes: [
      "Excess limits over primary professional liability",
      "Broader coverage enhancements",
      "Coverage for multiple underlying policies",
      "Defense cost coverage above primary",
      "Worldwide coverage territory",
      "Extended reporting period options"
    ],
    benefits: [
      "Enhanced protection for large claims",
      "Cost-effective way to increase limits",
      "Meets client and contractual requirements",
      "Protects professional and personal assets",
      "Single policy covers multiple exposures"
    ]
  },

  {
    title: "Health Care Professional Liability",
    slug: "health-care",
    category: "Professional Lines",
    summary: "Malpractice insurance for physicians, nurses, and healthcare facilities.",
    description: "Healthcare professional liability insurance, also known as medical malpractice insurance, protects healthcare providers and facilities from claims of negligence, errors, or omissions in patient care. This essential coverage defends against allegations of substandard medical treatment.",
    whoNeeds: [
      "Physicians and surgeons",
      "Nurses and nurse practitioners",
      "Hospitals and medical centers",
      "Ambulatory surgery centers",
      "Long-term care facilities"
    ],
    coverageIncludes: [
      "Medical malpractice liability",
      "Defense costs and attorney fees",
      "Settlement and judgment expenses",
      "Medical incident coverage",
      "HIPAA and privacy violation protection",
      "License defense and disciplinary proceedings"
    ],
    benefits: [
      "Comprehensive medical malpractice protection",
      "Expert legal defense specialists",
      "Risk management services included",
      "Coverage for employed and independent providers",
      "Competitive rates for claims-free professionals"
    ]
  },

  {
    title: "Management Liability",
    slug: "management-liability",
    category: "Professional Lines",
    summary: "Protection for directors, officers, and management from lawsuits alleging wrongful acts.",
    description: "Management liability insurance, including Directors & Officers (D&O) coverage, protects company leadership from personal liability arising from their management decisions. This coverage defends against shareholder suits, regulatory actions, and employment-related claims.",
    whoNeeds: [
      "Corporate boards and directors",
      "Executive officers and management",
      "Non-profit organization leaders",
      "Private and public companies",
      "Startups and emerging businesses"
    ],
    coverageIncludes: [
      "Directors and Officers liability",
      "Employment Practices Liability (EPLI)",
      "Fiduciary liability coverage",
      "Entity securities liability",
      "Derivative and shareholder suits",
      "Regulatory defense costs"
    ],
    benefits: [
      "Protects personal assets of leadership",
      "Attracts and retains qualified directors",
      "Comprehensive management protection",
      "Coverage for past, present, and future officers",
      "Critical for fundraising and M&A transactions"
    ]
  },

  {
    title: "Professional Liability",
    slug: "professional-liability",
    category: "Professional Lines",
    summary: "Errors and omissions coverage for professional service providers and consultants.",
    description: "Professional liability insurance, also called Errors & Omissions (E&O) insurance, protects professionals who provide advice, services, or expertise from claims of negligence, errors, or failure to perform. This coverage is essential for consultants, advisors, and service-based businesses.",
    whoNeeds: [
      "Consultants and business advisors",
      "Technology and IT service providers",
      "Architects and engineers",
      "Accountants and financial advisors",
      "Marketing and advertising agencies"
    ],
    coverageIncludes: [
      "Negligence and errors in professional services",
      "Omissions and failure to perform",
      "Misrepresentation and breach of duty",
      "Defense costs and legal fees",
      "Economic damages to clients",
      "Regulatory and disciplinary defense"
    ],
    benefits: [
      "Protection for service-based businesses",
      "Coverage for past and current work",
      "Meets client contractual requirements",
      "Expert defense for professional claims",
      "Affordable premiums for low-risk professions"
    ]
  },

  {
    title: "Public Entity Liability",
    slug: "public-entity",
    category: "Professional Lines",
    summary: "Specialized coverage for municipalities, government agencies, and public organizations.",
    description: "Public entity liability insurance provides comprehensive coverage for governmental entities, municipalities, school districts, and public agencies. This specialized insurance addresses the unique exposures faced by public sector organizations serving their communities.",
    whoNeeds: [
      "Cities, counties, and municipalities",
      "Public school districts and universities",
      "Law enforcement and fire departments",
      "Parks and recreation departments",
      "Public utilities and transit authorities"
    ],
    coverageIncludes: [
      "General liability for public operations",
      "Law enforcement liability",
      "Public officials errors and omissions",
      "Employment practices liability",
      "Civil rights violation coverage",
      "Vehicle and fleet liability"
    ],
    benefits: [
      "Specialized coverage for public entities",
      "Protection for public officials and employees",
      "Defense against civil rights claims",
      "Coverage for government operations",
      "Risk management services for public sector"
    ]
  },

  // MID TO LARGE SIZE BUSINESS
  {
    title: "Mid to Large Size Business",
    slug: "mid-large-business",
    category: "Business Size Programs",
    summary: "Comprehensive commercial insurance solutions for medium to large enterprises with complex risk exposures.",
    description: "Our mid to large size business program provides sophisticated insurance solutions for established companies with complex operations, multiple locations, or significant revenue. We offer broad appetite across numerous industries with customizable coverage, high limits, and specialized risk management services. With access to domestic and multinational markets, we can provide coverage in over 200 countries for global operations.",
    whoNeeds: [
      "Companies with revenues between $10M-$500M+",
      "Multi-location businesses and franchises",
      "Companies with complex supply chains",
      "Businesses with international operations",
      "Enterprises requiring high policy limits",
      "Organizations with specialized risk exposures"
    ],
    coverageIncludes: [
      "Workers' Compensation programs",
      "Commercial Auto and fleet coverage",
      "General Liability with high limits",
      "Commercial Property (all risk)",
      "Umbrella and Excess Liability",
      "Multinational and global programs",
      "Inland Marine and equipment coverage",
      "Ocean Marine for international shipping",
      "Environmental liability",
      "Cyber liability and data breach",
      "Management Liability (D&O, EPLI, Fiduciary)",
      "Professional Liability and E&O",
      "Kidnap & Ransom for executives",
      "Crime and Fidelity coverage"
    ],
    benefits: [
      "Broad industry appetite and specialized expertise",
      "Customizable coverage tailored to your operations",
      "High-limit capacity for significant exposures",
      "Global coverage in 200+ countries",
      "Dedicated risk engineering services",
      "Specialized claims management",
      "Flexible policy structures",
      "Competitive pricing for well-managed risks",
      "Single-source solution for complex programs"
    ]
  },

  // SPECIALTY COVERAGES
  {
    title: "Antique Auto & Collector Vehicle",
    slug: "antique-auto-collector",
    category: "Specialty",
    summary: "Specialized insurance for antique automobiles, classic cars, and collector vehicles.",
    description: "Antique auto and collector vehicle insurance provides agreed value coverage and specialized protection for vintage automobiles, classic cars, and collector vehicles. This coverage is designed for vehicles that appreciate in value and require specialized care and expertise.",
    whoNeeds: [
      "Antique and classic car collectors",
      "Vintage automobile enthusiasts",
      "Classic car restoration businesses",
      "Automobile museums and exhibitions",
      "Classic car dealerships"
    ],
    coverageIncludes: [
      "Agreed value coverage (no depreciation)",
      "Spare parts and accessories coverage",
      "Coverage during restoration and repair",
      "Auto show and event coverage",
      "Flexible usage and mileage options",
      "Worldwide coverage territory"
    ],
    benefits: [
      "Agreed value ensures full replacement cost",
      "Specialized claims handling for classic vehicles",
      "No depreciation on valued vehicles",
      "Coverage for restoration work in progress",
      "Competitive rates for well-maintained vehicles"
    ]
  },

  {
    title: "Business Owners Policy (BOP)",
    slug: "business-owners-policy",
    category: "Specialty",
    summary: "Comprehensive package policy combining property and liability coverage for small to medium businesses.",
    description: "A Business Owners Policy (BOP) packages essential commercial property and liability coverages into a single, cost-effective policy designed specifically for small to medium-sized businesses. This bundled approach provides comprehensive protection at lower premiums than purchasing coverages separately.",
    whoNeeds: [
      "Small retail and office businesses",
      "Professional service firms",
      "Restaurants and food service businesses",
      "Contractors and trade businesses",
      "Technology and consulting companies"
    ],
    coverageIncludes: [
      "Commercial property coverage for buildings and contents",
      "Business liability protection",
      "Business interruption and extra expense",
      "Equipment breakdown coverage",
      "Crime and employee dishonesty protection",
      "Optional coverages and endorsements"
    ],
    benefits: [
      "Comprehensive coverage in one package",
      "Lower premiums than separate policies",
      "Simplified insurance management",
      "Tailored for small business needs",
      "Easy to add endorsements as you grow"
    ]
  },

  {
    title: "Flood Coverage",
    slug: "flood-coverage",
    category: "Specialty",
    summary: "Essential flood insurance for commercial properties in flood-prone areas.",
    description: "Commercial flood insurance protects business properties from flood damage, which is typically excluded from standard commercial property policies. This coverage is essential for businesses in flood zones and provides protection for buildings, contents, and business income losses from flooding events.",
    whoNeeds: [
      "Businesses in FEMA flood zones",
      "Coastal and waterfront properties",
      "Properties near rivers and lakes",
      "Businesses in low-lying areas",
      "Properties with flooding history"
    ],
    coverageIncludes: [
      "Building coverage for structure damage",
      "Contents and business personal property",
      "Debris removal and cleanup costs",
      "Building foundation and systems",
      "Optional excess flood coverage",
      "Loss of income protection available"
    ],
    benefits: [
      "Protection when standard policies exclude flood",
      "Required by lenders in flood zones",
      "Coverage for rising water damage",
      "Access to NFIP and private flood markets",
      "Essential disaster protection"
    ]
  },

  {
    title: "Special Events",
    slug: "special-events",
    category: "Specialty",
    summary: "Short-term liability and event cancellation coverage for concerts, festivals, and special events.",
    description: "Special events insurance provides liability protection, event cancellation coverage, and specialized protections for one-time or recurring events including concerts, festivals, trade shows, weddings, and corporate gatherings. This flexible coverage addresses the unique risks of temporary events.",
    whoNeeds: [
      "Event planners and coordinators",
      "Concert and festival promoters",
      "Trade show and convention organizers",
      "Wedding and party venues",
      "Corporate event managers"
    ],
    coverageIncludes: [
      "General liability for event operations",
      "Liquor liability for alcohol service",
      "Event cancellation and postponement",
      "Weather-related cancellation coverage",
      "Vendor and participant liability",
      "Hired and non-owned auto coverage"
    ],
    benefits: [
      "Flexible short-term coverage options",
      "Protection for weather-related cancellations",
      "Quick quote and binding process",
      "Coverage for one-time or series of events",
      "Meets venue and permit requirements"
    ]
  },

  {
    title: "Surety Bonds",
    slug: "surety-bonds",
    category: "Specialty",
    summary: "Performance, payment, and license bonds for contractors and businesses.",
    description: "Surety bonds provide a financial guarantee that contractors and businesses will fulfill their contractual, licensing, or regulatory obligations. These bonds protect project owners, government agencies, and the public from financial loss if the bonded party fails to perform.",
    whoNeeds: [
      "General contractors and construction companies",
      "Subcontractors and specialty trade contractors",
      "Auto dealers and mortgage brokers",
      "Court-appointed fiduciaries",
      "Businesses requiring license or permit bonds"
    ],
    coverageIncludes: [
      "Bid bonds for contract bidding",
      "Performance bonds guaranteeing project completion",
      "Payment bonds for subcontractors and suppliers",
      "License and permit bonds",
      "Court and fiduciary bonds",
      "Miscellaneous commercial bonds"
    ],
    benefits: [
      "Required for public construction projects",
      "Demonstrates financial stability",
      "Protects project owners and public",
      "Access to bonding capacity",
      "Competitive rates for qualified contractors"
    ]
  },

  {
    title: "Accident & Health",
    slug: "accident-health",
    category: "Specialty",
    summary: "Supplemental accident and health coverage for employees, teams, and organizations.",
    description: "Accident and health insurance provides supplemental coverage for medical expenses, disability income, and accidental death benefits. This coverage complements primary health insurance and provides additional financial protection for accidents, injuries, and specific health events.",
    whoNeeds: [
      "Sports teams and athletic organizations",
      "Schools and educational institutions",
      "Volunteer organizations and non-profits",
      "Event participants and spectators",
      "Businesses seeking employee supplemental coverage"
    ],
    coverageIncludes: [
      "Accidental injury medical expenses",
      "Accidental death and dismemberment (AD&D)",
      "Disability income benefits",
      "Hospital indemnity coverage",
      "Critical illness protection",
      "Team and participant accident coverage"
    ],
    benefits: [
      "Supplements primary health insurance",
      "Affordable protection for groups",
      "Cash benefits paid directly to insured",
      "No deductibles on most plans",
      "Coverage for sports and activities"
    ]
  },

  {
    title: "Storage Tank Environmental Policy (STEP)",
    slug: "storage-tank-environmental",
    category: "Environmental",
    summary: "Pollution liability coverage for underground and aboveground storage tank operations.",
    description: "Storage Tank Environmental Policy (STEP) provides pollution liability coverage specifically for businesses operating underground storage tanks (USTs) or aboveground storage tanks (ASTs). This coverage protects against costs of environmental cleanup, third-party claims, and regulatory action related to fuel and chemical storage.",
    whoNeeds: [
      "Gas stations and convenience stores",
      "Fleet operations with fuel storage",
      "Manufacturing facilities with chemical tanks",
      "Heating oil dealers and distributors",
      "Agricultural operations with fuel storage"
    ],
    coverageIncludes: [
      "Pollution cleanup and remediation costs",
      "Third-party bodily injury from pollution",
      "Third-party property damage from contamination",
      "Regulatory defense and compliance costs",
      "Tank removal and replacement coverage",
      "Legal defense expenses"
    ],
    benefits: [
      "Specialized coverage for tank operations",
      "Meets state UST financial responsibility requirements",
      "Environmental regulatory compliance",
      "Protection for gradual and sudden releases",
      "Expert environmental claims handling"
    ]
  },

  // PERSONAL LINES
  {
    title: "High Value Homeowners",
    slug: "high-value-homeowners",
    category: "Personal Lines",
    summary: "Premium homeowners insurance for luxury homes and high-value properties.",
    description: "High value homeowners insurance provides enhanced coverage for luxury homes, estates, and high-value properties that exceed the limits of standard homeowners policies. This coverage includes higher limits, broader protection, and specialized services for discerning homeowners.",
    whoNeeds: [
      "Owners of luxury homes and estates",
      "Properties valued over $1 million",
      "Homes with custom features and finishes",
      "Vacation homes and second residences",
      "Historic or architecturally significant properties"
    ],
    coverageIncludes: [
      "Replacement cost coverage for luxury homes",
      "High-value personal property protection",
      "Fine art and collectibles coverage",
      "Jewelry and valuables insurance",
      "Additional living expenses",
      "Liability protection with high limits"
    ],
    benefits: [
      "Guaranteed replacement cost coverage",
      "No depreciation on personal property",
      "Specialized claims handling",
      "Concierge services and risk management",
      "Coverage for unique and irreplaceable items"
    ]
  },

  // PROPERTY - Commercial Property
  {
    title: "Commercial Property",
    slug: "commercial-property",
    category: "Property",
    summary: "Coverage for buildings, equipment, and business property against physical damage and loss.",
    description: "Commercial property insurance protects your business buildings, equipment, inventory, and other physical assets from damage or loss due to fire, theft, weather events, and other covered perils. This essential coverage ensures your business can recover from property damage.",
    whoNeeds: [
      "Business property owners",
      "Retail stores and restaurants",
      "Office buildings and warehouses",
      "Manufacturing facilities",
      "Any business with physical assets"
    ],
    coverageIncludes: [
      "Building structure coverage",
      "Business personal property",
      "Equipment and machinery",
      "Inventory and stock",
      "Business interruption coverage",
      "Tenant improvements and betterments"
    ],
    benefits: [
      "Protection for physical business assets",
      "Replacement cost or actual cash value options",
      "Covers multiple locations",
      "Business income protection available",
      "Required by most commercial leases"
    ]
  },

  {
    title: "Small Property",
    slug: "small-property",
    category: "Property",
    summary: "Affordable property coverage designed for small businesses and limited commercial properties.",
    description: "Small property insurance offers essential building and contents coverage tailored for small business operations. This cost-effective solution protects small retail shops, offices, and service businesses from property damage while maintaining affordable premiums.",
    whoNeeds: [
      "Small retail shops and boutiques",
      "Home-based businesses with commercial property",
      "Small office spaces",
      "Service businesses with limited inventory",
      "Start-ups and sole proprietors"
    ],
    coverageIncludes: [
      "Basic building coverage",
      "Business contents and equipment",
      "Limited inventory protection",
      "Fire and theft coverage",
      "Vandalism and malicious mischief",
      "Optional business interruption"
    ],
    benefits: [
      "Affordable rates for small businesses",
      "Simplified underwriting process",
      "Essential property protection",
      "Scalable as your business grows",
      "Bundling discounts available"
    ]
  },

  // HABITATIONAL
  {
    title: "Affordable Housing",
    slug: "affordable-housing",
    category: "Habitational",
    summary: "Specialized property and liability coverage for affordable housing developments and low-income properties.",
    description: "Affordable housing insurance provides comprehensive coverage designed for subsidized housing properties, low-income housing tax credit (LIHTC) developments, and affordable housing communities. This specialized program addresses the unique regulatory and operational requirements of affordable housing.",
    whoNeeds: [
      "LIHTC property owners and developers",
      "Subsidized housing operators",
      "Section 8 housing providers",
      "Affordable housing non-profits",
      "Community development corporations"
    ],
    coverageIncludes: [
      "Property coverage for buildings and improvements",
      "General liability for property operations",
      "Fair housing and discrimination coverage",
      "Loss of rents and income protection",
      "Crime and employee dishonesty",
      "Equipment breakdown coverage"
    ],
    benefits: [
      "Understands affordable housing requirements",
      "Compliance with HUD regulations",
      "Fair housing liability protection",
      "Flexible payment programs",
      "Experience with LIHTC properties"
    ]
  },

  {
    title: "Apartments",
    slug: "apartments",
    category: "Habitational",
    summary: "Comprehensive property and liability insurance for apartment buildings and multifamily residential properties.",
    description: "Apartment insurance provides complete coverage for apartment buildings, multifamily complexes, and residential rental properties. This program addresses property damage, liability risks, loss of income, and the unique exposures of residential property ownership and management.",
    whoNeeds: [
      "Apartment building owners",
      "Multifamily property investors",
      "Property management companies",
      "Student housing operators",
      "Senior living apartment communities"
    ],
    coverageIncludes: [
      "Building and property coverage",
      "General liability for premises",
      "Loss of rents and rental income",
      "Ordinance or law coverage",
      "Fair housing liability protection",
      "Property management errors and omissions"
    ],
    benefits: [
      "Comprehensive apartment property coverage",
      "Loss of income protection",
      "Fair housing claim defense",
      "Multiple location discounts",
      "Flexible replacement cost options"
    ]
  },

  {
    title: "Condominiums",
    slug: "condominiums",
    category: "Habitational",
    summary: "Insurance for condominium associations, master policies, and individual unit owners.",
    description: "Condominium insurance provides coverage for condominium associations (master policies), common areas, and individual unit owners. This specialized coverage addresses the unique property ownership structure and liability exposures of condominium communities.",
    whoNeeds: [
      "Condominium associations and HOAs",
      "Condominium developers and converters",
      "Property management companies for condos",
      "Commercial condo associations",
      "Mixed-use condominium properties"
    ],
    coverageIncludes: [
      "Master policy for common property",
      "General liability for association",
      "Directors and officers liability for board",
      "Loss assessment coverage",
      "Equipment and common area property",
      "Fidelity bond for association funds"
    ],
    benefits: [
      "Comprehensive master policy coverage",
      "Protection for association board members",
      "Assessment coverage for unit owners",
      "Understanding of condo bylaws and documents",
      "Specialized condominium expertise"
    ]
  },

  {
    title: "Homeowners Associations & PUD",
    slug: "homeowners-associations-pud",
    category: "Habitational",
    summary: "Insurance for homeowners associations and planned unit developments managing common property.",
    description: "HOA and PUD insurance provides comprehensive coverage for homeowners associations and planned unit developments responsible for common areas, amenities, and community property. This program protects association assets, board members, and community operations.",
    whoNeeds: [
      "Homeowners associations (HOAs)",
      "Planned unit developments (PUDs)",
      "Community association boards",
      "Property management companies for HOAs",
      "Residential community associations"
    ],
    coverageIncludes: [
      "Common property and amenities coverage",
      "General liability for association operations",
      "Directors and officers liability",
      "Employee dishonesty and crime coverage",
      "Equipment and grounds coverage",
      "Special assessments protection"
    ],
    benefits: [
      "Protects association assets and board members",
      "Coverage for community amenities",
      "Defense costs for lawsuits against board",
      "Fidelity coverage for association funds",
      "Understanding of CC&R requirements"
    ]
  },

  {
    title: "Mobile Home Parks",
    slug: "mobile-home-parks",
    category: "Habitational",
    summary: "Property and liability coverage for mobile home parks and manufactured housing communities.",
    description: "Mobile home park insurance provides specialized coverage for owners and operators of mobile home parks, manufactured housing communities, and RV parks. This program addresses the unique property configurations and liability exposures of mobile home communities.",
    whoNeeds: [
      "Mobile home park owners",
      "Manufactured housing community operators",
      "RV park and campground owners",
      "Seasonal mobile home communities",
      "Mobile home park developers"
    ],
    coverageIncludes: [
      "Property coverage for common buildings",
      "General liability for park operations",
      "Utility infrastructure coverage",
      "Loss of rents and income protection",
      "Equipment breakdown for utilities",
      "Crime and vandalism coverage"
    ],
    benefits: [
      "Specialized mobile home park coverage",
      "Protection for infrastructure and utilities",
      "Seasonal occupancy considerations",
      "Experience with manufactured housing",
      "Competitive rates for well-maintained parks"
    ]
  },

  {
    title: "Resorts & Lodges",
    slug: "resorts-lodges",
    category: "Habitational",
    summary: "Comprehensive insurance for resort properties, lodges, and vacation rental operations.",
    description: "Resorts and lodges insurance provides complete coverage for resort properties, mountain lodges, vacation rental operations, and seasonal hospitality properties. This program addresses property damage, guest liability, seasonal operations, and business income protection.",
    whoNeeds: [
      "Resort and hotel properties",
      "Mountain and ski lodges",
      "Vacation rental property owners",
      "Dude ranches and guest ranches",
      "Seasonal resort operations"
    ],
    coverageIncludes: [
      "Property coverage for buildings and contents",
      "General liability for guest operations",
      "Liquor liability for bars and restaurants",
      "Business interruption for seasonal operations",
      "Equipment breakdown and utilities",
      "Guest property and bailees coverage"
    ],
    benefits: [
      "Comprehensive resort property coverage",
      "Seasonal operations flexibility",
      "Guest liability protection",
      "Business income during closures",
      "Understanding of hospitality operations"
    ]
  },

  // TRANSPORTATION
  {
    title: "Auto Daily Rental",
    slug: "auto-daily-rental",
    category: "Transportation",
    summary: "Commercial auto insurance for daily car rental operations and short-term vehicle rentals.",
    description: "Auto daily rental insurance provides specialized commercial auto coverage for car rental businesses, including liability protection, physical damage coverage, and loss of use protection for rental vehicle fleets. This coverage addresses the high-frequency rental exposures of daily rental operations.",
    whoNeeds: [
      "Car rental agencies and franchises",
      "Airport car rental locations",
      "Truck and van rental operations",
      "Exotic and luxury car rental businesses",
      "Peer-to-peer car sharing platforms"
    ],
    coverageIncludes: [
      "Liability coverage for rental vehicles",
      "Physical damage to rental fleet",
      "Loss of use and diminished value",
      "Non-owned and hired auto liability",
      "Garage keepers liability",
      "Rental agreement coverage gaps"
    ],
    benefits: [
      "Specialized rental vehicle coverage",
      "High-limit capacity for fleets",
      "Loss of rental income protection",
      "Coverage for multiple rental locations",
      "Experience with rental operations"
    ]
  },

  {
    title: "Chauffeured Transportation",
    slug: "chauffeured-transportation",
    category: "Transportation",
    summary: "Commercial auto and liability coverage for limousine services and executive transportation.",
    description: "Chauffeured transportation insurance provides comprehensive coverage for limousine services, executive car services, and chauffeured vehicle operations. This specialized program addresses passenger liability, luxury vehicle protection, and professional transportation services.",
    whoNeeds: [
      "Limousine and sedan services",
      "Executive car and chauffeur companies",
      "Airport shuttle and transfer services",
      "Wedding and event transportation services",
      "Ride-sharing and app-based transportation"
    ],
    coverageIncludes: [
      "Commercial auto liability for chauffeurs",
      "Physical damage for luxury vehicles",
      "Passenger liability and medical payments",
      "Hired and non-owned auto coverage",
      "General liability for transportation services",
      "Professional liability for drivers"
    ],
    benefits: [
      "Specialized luxury vehicle coverage",
      "High passenger liability limits",
      "Protection for premium vehicles",
      "Coverage for commercial transportation",
      "Competitive rates for professional drivers"
    ]
  },

  {
    title: "School Bus Contractor",
    slug: "school-bus-contractor",
    category: "Transportation",
    summary: "Commercial auto insurance for school bus contractors and student transportation services.",
    description: "School bus contractor insurance provides comprehensive coverage for companies providing student transportation services to school districts. This specialized program addresses the unique liability exposures, regulatory requirements, and safety standards of school bus operations.",
    whoNeeds: [
      "School bus contractors and operators",
      "Student transportation service providers",
      "Charter school transportation companies",
      "Special needs student transportation",
      "Activity and field trip bus services"
    ],
    coverageIncludes: [
      "Commercial auto liability for school buses",
      "Physical damage to bus fleet",
      "Student passenger liability protection",
      "Hired and non-owned auto coverage",
      "General liability for transportation operations",
      "Comprehensive safety and compliance coverage"
    ],
    benefits: [
      "Specialized school transportation coverage",
      "High passenger capacity liability limits",
      "Regulatory compliance expertise",
      "Safety program support and training",
      "Experience with school district contracts"
    ]
  },

  {
    title: "Interim Liability & Physical Damage",
    slug: "interim-liability-physical-damage",
    category: "Transportation",
    summary: "Short-term commercial auto coverage during vehicle gaps in coverage or dealer operations.",
    description: "Interim liability and physical damage insurance provides temporary commercial auto coverage for vehicles during gaps in coverage, dealer operations, or short-term needs. This flexible coverage addresses temporary transportation exposures and coverage gaps.",
    whoNeeds: [
      "Auto dealers between policies",
      "Businesses with temporary vehicle needs",
      "Companies during policy transitions",
      "Rental operations with short-term needs",
      "Fleet operators with coverage gaps"
    ],
    coverageIncludes: [
      "Temporary liability coverage",
      "Short-term physical damage protection",
      "Coverage for gaps between policies",
      "Dealer and garage operations",
      "Flexible coverage periods",
      "Quick binding and cancellation"
    ],
    benefits: [
      "Immediate coverage availability",
      "Flexible short-term protection",
      "Prevents coverage gaps",
      "Simple application process",
      "Daily or monthly coverage options"
    ]
  },

  {
    title: "Lessors' Contingent & Excess Coverage",
    slug: "lessors-contingent-excess",
    category: "Transportation",
    summary: "Contingent liability protection for vehicle lessors when lessee coverage is insufficient.",
    description: "Lessors' contingent and excess coverage provides backup liability protection for companies leasing vehicles when the lessee's insurance is insufficient or non-existent. This coverage protects lessor interests and fills coverage gaps in lease agreements.",
    whoNeeds: [
      "Equipment leasing companies",
      "Fleet leasing operations",
      "Truck and trailer lessors",
      "Vehicle financing companies",
      "Commercial vehicle rental operations"
    ],
    coverageIncludes: [
      "Contingent liability for lessor",
      "Excess coverage over lessee's insurance",
      "Physical damage protection for leased assets",
      "Gap coverage when lessee coverage fails",
      "Lessor's contractual liability",
      "Repossession coverage"
    ],
    benefits: [
      "Protects lessor from lessee insurance gaps",
      "Backup protection for lease portfolio",
      "Covers when lessee insurance is inadequate",
      "Protects leased asset value",
      "Essential for equipment leasing operations"
    ]
  },

  {
    title: "Aviation",
    slug: "aviation",
    category: "Transportation",
    summary: "Comprehensive insurance for aircraft owners, operators, and aviation businesses.",
    description: "Aviation insurance provides specialized coverage for aircraft owners, pilots, airports, and aviation-related businesses. This includes hull coverage for aircraft damage, liability protection, and aviation-specific endorsements for unique risks in the aviation industry.",
    whoNeeds: [
      "Aircraft owners and operators",
      "Commercial airlines and charter services",
      "Airports and fixed-base operators",
      "Aviation maintenance and repair facilities",
      "Flight schools and training centers"
    ],
    coverageIncludes: [
      "Aircraft hull damage coverage",
      "Aviation liability protection",
      "Passenger liability",
      "Hangar keeper's liability",
      "Airport liability coverage",
      "Products liability for aviation manufacturers"
    ],
    benefits: [
      "Specialized coverage for aviation risks",
      "Worldwide coverage territory",
      "Expert aviation claims handling",
      "Compliance with FAA requirements",
      "Competitive rates for experienced operators"
    ]
  },

  {
    title: "Commercial Auto",
    slug: "commercial-auto",
    category: "Transportation",
    summary: "Auto liability and physical damage coverage for business vehicles and fleets.",
    description: "Commercial auto insurance protects businesses from liability and physical damage related to vehicles used for business purposes. This coverage is essential for any company that owns, leases, or uses vehicles for business operations, deliveries, or employee transportation.",
    whoNeeds: [
      "Businesses with company vehicles",
      "Delivery and courier services",
      "Sales professionals using vehicles",
      "Service contractors with work trucks",
      "Any business with a vehicle fleet"
    ],
    coverageIncludes: [
      "Auto liability coverage",
      "Physical damage (collision and comprehensive)",
      "Uninsured/underinsured motorist coverage",
      "Medical payments coverage",
      "Hired and non-owned auto liability",
      "Trailer and equipment coverage"
    ],
    benefits: [
      "Protection for business vehicle operations",
      "Coverage for owned and leased vehicles",
      "Flexible deductible options",
      "Fleet discounts available",
      "Meets commercial vehicle requirements"
    ]
  },

  {
    title: "Inland Marine",
    slug: "inland-marine",
    category: "Transportation",
    summary: "Coverage for movable property, equipment in transit, and specialized business property.",
    description: "Inland marine insurance protects property in transit, mobile equipment, and other property that doesn't fit standard commercial property policies. This coverage follows your property wherever it goes, making it essential for contractors, mobile businesses, and companies with valuable portable equipment.",
    whoNeeds: [
      "Contractors and construction companies",
      "Mobile equipment operators",
      "Businesses with property in transit",
      "Installation and service companies",
      "Businesses with high-value portable equipment"
    ],
    coverageIncludes: [
      "Contractor's equipment and tools",
      "Property in transit",
      "Installation floater coverage",
      "Electronic equipment and computers",
      "Valuable papers and records",
      "Accounts receivable coverage"
    ],
    benefits: [
      "Coverage anywhere in the coverage territory",
      "Protection for equipment at job sites",
      "Broader coverage than standard property policies",
      "Essential for mobile operations",
      "Covers mysterious disappearance"
    ]
  },

  {
    title: "Ocean Marine",
    slug: "ocean-marine",
    category: "Transportation",
    summary: "Insurance for vessels, cargo, and maritime operations on navigable waters.",
    description: "Ocean marine insurance provides coverage for ships, cargo, and maritime operations on oceans, seas, and navigable waterways. This specialized coverage protects vessel owners, cargo interests, and maritime businesses from the unique perils of marine transportation.",
    whoNeeds: [
      "Shipping companies and vessel owners",
      "Import/export businesses",
      "Freight forwarders and cargo brokers",
      "Port operators and terminal facilities",
      "Marine contractors and offshore operations"
    ],
    coverageIncludes: [
      "Hull and machinery coverage for vessels",
      "Cargo insurance for goods in transit",
      "Protection and indemnity (P&I) liability",
      "Marine general liability",
      "Terminal operators liability",
      "Freight forwarder's liability"
    ],
    benefits: [
      "Comprehensive maritime risk protection",
      "Worldwide ocean coverage",
      "Specialized marine expertise",
      "Coverage for international shipments",
      "Meets maritime law requirements"
    ]
  },

  {
    title: "Railroad",
    slug: "railroad",
    category: "Transportation",
    summary: "Specialized coverage for railroad operations, rolling stock, and rail transportation businesses.",
    description: "Railroad insurance provides comprehensive coverage for railroad companies, including liability protection, rolling stock coverage, and property insurance for railroad operations. This specialized coverage addresses the unique risks of rail transportation and railroad property.",
    whoNeeds: [
      "Railroad companies and operators",
      "Short line and regional railroads",
      "Railroad contractors and maintenance companies",
      "Rail equipment manufacturers",
      "Freight and passenger rail services"
    ],
    coverageIncludes: [
      "Railroad liability coverage",
      "Rolling stock physical damage",
      "Railroad property insurance",
      "Environmental liability for rail operations",
      "Cargo and freight coverage",
      "FELA (Federal Employers Liability Act) coverage"
    ],
    benefits: [
      "Specialized railroad industry expertise",
      "Compliance with federal regulations",
      "Coverage for owned and leased equipment",
      "Environmental protection for rail operations",
      "Expert claims handling for rail losses"
    ]
  },

  // AGRIBUSINESS
  {
    title: "Agribusiness Casualty",
    slug: "agribusiness-casualty",
    category: "Agribusiness",
    summary: "Liability coverage for farming operations, agricultural businesses, and rural enterprises.",
    description: "Agribusiness casualty insurance protects farms, ranches, and agricultural businesses from liability claims arising from their operations. This coverage addresses the unique liability exposures of agricultural enterprises including farming activities, livestock operations, and agribusiness services.",
    whoNeeds: [
      "Crop farmers and agricultural producers",
      "Livestock and dairy operations",
      "Agricultural processing facilities",
      "Farm equipment dealers and suppliers",
      "Agricultural service providers"
    ],
    coverageIncludes: [
      "Farm liability coverage",
      "Livestock liability protection",
      "Products liability for agricultural products",
      "Pollution liability for farming operations",
      "Equipment and machinery liability",
      "Employer's liability for farm workers"
    ],
    benefits: [
      "Specialized coverage for agricultural risks",
      "Protection for diverse farm operations",
      "Coverage for livestock and crops liability",
      "Affordable rates for established farms",
      "Understanding of agricultural operations"
    ]
  },

  {
    title: "Agribusiness Property",
    slug: "agribusiness-property",
    category: "Agribusiness",
    summary: "Property coverage for farm buildings, equipment, livestock, and agricultural assets.",
    description: "Agribusiness property insurance protects the physical assets of farms and agricultural operations including buildings, equipment, livestock, crops, and stored products. This comprehensive coverage is designed specifically for the property exposures unique to agricultural businesses.",
    whoNeeds: [
      "Farm and ranch owners",
      "Agricultural production facilities",
      "Grain elevators and storage operations",
      "Greenhouse and nursery operations",
      "Livestock and poultry farms"
    ],
    coverageIncludes: [
      "Farm buildings and structures",
      "Agricultural equipment and machinery",
      "Livestock mortality coverage",
      "Crop and grain storage",
      "Harvested crops and products",
      "Business interruption for farms"
    ],
    benefits: [
      "Comprehensive farm property protection",
      "Coverage for specialized agricultural assets",
      "Seasonal coverage adjustments available",
      "Replacement cost for equipment",
      "Understanding of agricultural cycles"
    ]
  }
];

export const industries: CoverageContent[] = [
  {
    title: "Agribusiness",
    slug: "agribusiness-industry",
    category: "Industries",
    summary: "Specialized insurance for farms, ranches, agricultural producers, and agribusiness operations.",
    description: "Agribusiness insurance provides comprehensive coverage for farming operations, ranches, agricultural producers, food processors, and agribusiness enterprises. This specialized program addresses the unique risks of agricultural operations including crop damage, livestock coverage, equipment protection, and liability exposures specific to farming and ranching.",
    whoNeeds: [
      "Crop farmers and grain producers",
      "Livestock ranchers and dairy operations",
      "Agricultural equipment dealers",
      "Food processing and packing facilities",
      "Agribusiness supply and distribution companies"
    ],
    coverageIncludes: [
      "Farm and ranch property coverage",
      "Agricultural equipment and machinery",
      "Livestock mortality and medical coverage",
      "Crop insurance and hail coverage",
      "General liability for farming operations",
      "Products liability for agricultural products",
      "Pollution liability for farming operations",
      "Workers compensation for farm employees"
    ],
    benefits: [
      "Specialized agricultural expertise",
      "Coverage for crops, livestock, and equipment",
      "Protection during harvest and growing seasons",
      "Weather-related loss protection",
      "Understanding of farming operations and cycles"
    ]
  },

  {
    title: "Aerospace",
    slug: "aerospace",
    category: "Industries",
    summary: "Specialized insurance for aerospace manufacturers, suppliers, and aviation service providers.",
    description: "Aerospace insurance provides comprehensive coverage for companies involved in the design, manufacture, and maintenance of aircraft, spacecraft, and aerospace components. This specialized coverage addresses the unique risks and high-value exposures in the aerospace industry.",
    whoNeeds: [
      "Aircraft and spacecraft manufacturers",
      "Aerospace component suppliers",
      "Aviation maintenance and repair facilities",
      "Aerospace engineering firms",
      "Defense contractors and aerospace systems"
    ],
    coverageIncludes: [
      "Products liability for aerospace components",
      "Aviation general liability",
      "Completed operations coverage",
      "Professional liability for engineers",
      "Cyber liability for aerospace technology",
      "Property coverage for manufacturing facilities"
    ],
    benefits: [
      "Expert underwriting for aerospace risks",
      "High-limit capacity for aerospace exposures",
      "Global coverage for international operations",
      "Industry-specific risk management",
      "Compliance with aerospace regulations"
    ]
  },

  {
    title: "Cannabis",
    slug: "cannabis",
    category: "Industries",
    summary: "Comprehensive insurance solutions for licensed cannabis cultivators, processors, and dispensaries.",
    description: "Cannabis insurance provides essential coverage for state-licensed marijuana businesses including cultivators, processors, dispensaries, and ancillary service providers. This emerging industry requires specialized insurance due to unique regulatory requirements and operational risks.",
    whoNeeds: [
      "Cannabis cultivation facilities",
      "Marijuana dispensaries and retailers",
      "Cannabis processing and manufacturing",
      "Cannabis testing laboratories",
      "Ancillary cannabis service providers"
    ],
    coverageIncludes: [
      "General liability for cannabis operations",
      "Product liability for cannabis products",
      "Commercial property for cultivation facilities",
      "Crop coverage for cannabis plants",
      "Professional liability for testing labs",
      "Cyber liability and data breach coverage"
    ],
    benefits: [
      "Coverage designed for cannabis industry",
      "Compliance with state licensing requirements",
      "Specialized claims expertise",
      "Property coverage for high-value crops",
      "Access to admitted insurance markets"
    ]
  },

  {
    title: "Construction",
    slug: "construction",
    category: "Industries",
    summary: "Complete insurance programs for contractors, builders, and construction companies.",
    description: "Construction insurance provides comprehensive coverage for general contractors, subcontractors, and specialty trade contractors. This industry-specific program addresses the liability, property, and equipment risks inherent in construction and building operations.",
    whoNeeds: [
      "General contractors and construction managers",
      "Residential and commercial builders",
      "Specialty trade contractors",
      "Heavy civil construction companies",
      "Renovation and remodeling contractors"
    ],
    coverageIncludes: [
      "General liability for construction operations",
      "Completed operations coverage",
      "Builder's risk for projects under construction",
      "Contractor's equipment and tools",
      "Commercial auto for construction vehicles",
      "Workers compensation for construction employees"
    ],
    benefits: [
      "Industry-specific coverage tailored to construction",
      "Meets contractual insurance requirements",
      "Coverage for all phases of construction",
      "Competitive rates for experienced contractors",
      "Risk management for construction projects"
    ]
  },

  {
    title: "Education",
    slug: "education",
    category: "Industries",
    summary: "Insurance programs for schools, colleges, universities, and educational institutions.",
    description: "Education insurance provides comprehensive coverage for K-12 schools, colleges, universities, and other educational institutions. This specialized program addresses the unique liability, property, and professional risks faced by educational organizations.",
    whoNeeds: [
      "Public and private K-12 schools",
      "Colleges and universities",
      "Preschools and daycare centers",
      "Private tutoring and education centers",
      "Online education providers"
    ],
    coverageIncludes: [
      "General liability for educational premises",
      "Professional liability for educators",
      "School board legal liability",
      "Student accident insurance",
      "Property coverage for school buildings",
      "Cyber liability for student data"
    ],
    benefits: [
      "Specialized coverage for educational institutions",
      "Protection for students, faculty, and staff",
      "Compliance with educational regulations",
      "Sexual abuse and molestation coverage",
      "Crisis management and response services"
    ]
  },

  {
    title: "Entertainment",
    slug: "entertainment-industry",
    category: "Industries",
    summary: "Insurance for production companies, venues, performers, and entertainment businesses.",
    description: "Entertainment industry insurance provides specialized coverage for film and television production, live events, theaters, concert venues, and entertainment companies. This program addresses production risks, event liability, equipment protection, and the unique exposures in the entertainment business.",
    whoNeeds: [
      "Film and television production companies",
      "Concert venues and theaters",
      "Event promoters and festival organizers",
      "Recording studios and music companies",
      "Sports and entertainment arenas"
    ],
    coverageIncludes: [
      "Production liability insurance",
      "Equipment and property coverage",
      "Cast and crew protection",
      "Event cancellation and postponement",
      "Errors and omissions for content",
      "General liability for venues",
      "Non-appearance insurance",
      "Weather-related cancellation coverage"
    ],
    benefits: [
      "Specialized entertainment industry expertise",
      "Protection for high-value productions",
      "Event cancellation coverage",
      "Quick turnaround for time-sensitive projects",
      "Comprehensive entertainment risk management"
    ]
  },

  {
    title: "Financial",
    slug: "financial",
    category: "Industries",
    summary: "Insurance for banks, credit unions, investment firms, and financial services companies.",
    description: "Financial services insurance provides comprehensive coverage for banks, credit unions, investment advisors, mortgage lenders, and other financial institutions. This specialized program addresses professional liability, cyber risks, fidelity protection, and regulatory compliance requirements unique to the financial services industry.",
    whoNeeds: [
      "Banks and credit unions",
      "Investment advisory firms",
      "Mortgage lenders and brokers",
      "Financial planning and wealth management firms",
      "Insurance agencies and brokerages"
    ],
    coverageIncludes: [
      "Professional liability and E&O coverage",
      "Directors and officers liability",
      "Financial institution bonds and fidelity",
      "Cyber liability and data breach coverage",
      "Employment practices liability",
      "Kidnap and ransom for executives",
      "Property and general liability coverage",
      "Regulatory investigation defense"
    ],
    benefits: [
      "Specialized financial services expertise",
      "Regulatory compliance support",
      "High-limit professional liability capacity",
      "Cyber security and data breach protection",
      "Expert claims handling for financial matters"
    ]
  },

  {
    title: "Healthcare",
    slug: "healthcare",
    category: "Industries",
    summary: "Comprehensive insurance for hospitals, clinics, healthcare facilities, and medical providers.",
    description: "Healthcare insurance provides complete coverage for hospitals, medical centers, clinics, long-term care facilities, and healthcare organizations. This comprehensive program addresses medical malpractice, facility operations, regulatory compliance, and the complex risks in healthcare delivery.",
    whoNeeds: [
      "Hospitals and medical centers",
      "Outpatient clinics and surgery centers",
      "Long-term care and nursing facilities",
      "Home health and hospice agencies",
      "Integrated healthcare delivery systems"
    ],
    coverageIncludes: [
      "Medical malpractice liability",
      "General liability for healthcare facilities",
      "Property coverage for medical facilities",
      "Professional liability for all staff",
      "Cyber liability for patient data (HIPAA)",
      "Employment practices liability",
      "Directors and officers liability",
      "Medical equipment coverage"
    ],
    benefits: [
      "Comprehensive healthcare coverage",
      "Expert medical malpractice defense",
      "HIPAA and regulatory compliance",
      "Risk management and patient safety programs",
      "Coverage for all healthcare professionals"
    ]
  },

  {
    title: "Energy",
    slug: "energy-industry",
    category: "Industries",
    summary: "Insurance solutions for energy producers, utilities, and power generation companies.",
    description: "Energy industry insurance provides specialized coverage for traditional and renewable energy companies including oil and gas operators, electric utilities, and alternative energy producers. This comprehensive program addresses the complex risks in energy production and distribution.",
    whoNeeds: [
      "Oil and gas exploration and production",
      "Electric utility companies",
      "Solar and wind energy producers",
      "Pipeline operators",
      "Energy equipment manufacturers"
    ],
    coverageIncludes: [
      "Energy operations liability",
      "Property damage for energy facilities",
      "Environmental liability coverage",
      "Business interruption for energy operations",
      "Control of well coverage",
      "Cyber liability for smart grid systems"
    ],
    benefits: [
      "Expertise in energy sector risks",
      "High-limit capacity for major operations",
      "Environmental risk management",
      "Global coverage for international projects",
      "Regulatory compliance support"
    ]
  },

  {
    title: "Firearms",
    slug: "firearms",
    category: "Industries",
    summary: "Specialized coverage for firearms manufacturers, dealers, ranges, and related businesses.",
    description: "Firearms insurance provides essential coverage for the firearms industry including manufacturers, wholesale distributors, retail dealers, shooting ranges, and firearms training facilities. This specialized program addresses the unique liability and regulatory requirements of the firearms business.",
    whoNeeds: [
      "Firearms manufacturers",
      "Gun shops and firearms dealers",
      "Shooting ranges and gun clubs",
      "Firearms training instructors",
      "Gunsmiths and firearms repair shops"
    ],
    coverageIncludes: [
      "General liability for firearms businesses",
      "Products liability for firearms and ammunition",
      "Shooting range liability",
      "Professional liability for firearms instruction",
      "Property coverage for firearms inventory",
      "Crime coverage for theft of firearms"
    ],
    benefits: [
      "Specialized coverage for firearms industry",
      "Compliance with ATF regulations",
      "High-limit products liability capacity",
      "Expert underwriting for firearms risks",
      "Access to specialty firearms markets"
    ]
  },

  {
    title: "Hospitality",
    slug: "hospitality",
    category: "Industries",
    summary: "Complete insurance programs for hotels, restaurants, bars, and hospitality businesses.",
    description: "Hospitality insurance provides comprehensive coverage for hotels, motels, restaurants, bars, and other hospitality businesses. This industry-specific program addresses the liability, property, and operational risks unique to the hospitality sector.",
    whoNeeds: [
      "Hotels, motels, and resorts",
      "Restaurants and food service establishments",
      "Bars, taverns, and nightclubs",
      "Catering and event services",
      "Bed and breakfasts and vacation rentals"
    ],
    coverageIncludes: [
      "General liability for hospitality operations",
      "Liquor liability for alcohol service",
      "Food contamination and spoilage coverage",
      "Property coverage for buildings and contents",
      "Business interruption coverage",
      "Employee dishonesty and theft"
    ],
    benefits: [
      "Industry-specific hospitality coverage",
      "Liquor liability protection",
      "Food safety and contamination coverage",
      "Equipment breakdown protection",
      "Seasonal coverage adjustments"
    ]
  },

  {
    title: "Life Sciences",
    slug: "life-sciences-industry",
    category: "Industries",
    summary: "Insurance for pharmaceutical, biotech, and medical device companies.",
    description: "Life sciences insurance provides specialized coverage for companies in pharmaceutical development, biotechnology research, medical device manufacturing, and healthcare technology. This program addresses the complex regulatory and product liability risks in the life sciences sector.",
    whoNeeds: [
      "Pharmaceutical manufacturers",
      "Biotechnology research companies",
      "Medical device manufacturers",
      "Clinical research organizations",
      "Healthcare IT and technology companies"
    ],
    coverageIncludes: [
      "Products liability for medical products",
      "Clinical trials liability",
      "Professional liability for researchers",
      "Regulatory investigation defense",
      "Product recall and contamination",
      "Intellectual property protection"
    ],
    benefits: [
      "Specialized life sciences expertise",
      "Coverage throughout product lifecycle",
      "FDA and regulatory compliance support",
      "Global clinical trials coverage",
      "Expert claims handling for complex matters"
    ]
  },

  {
    title: "Manufacturing",
    slug: "manufacturing",
    category: "Industries",
    summary: "Comprehensive insurance for manufacturers and industrial production facilities.",
    description: "Manufacturing insurance provides complete coverage for companies engaged in the production of goods, from light assembly to heavy industrial manufacturing. This program addresses the property, liability, and operational risks faced by manufacturers of all types.",
    whoNeeds: [
      "Light and heavy manufacturers",
      "Assembly and fabrication facilities",
      "Industrial production plants",
      "Contract manufacturers",
      "Food and beverage processors"
    ],
    coverageIncludes: [
      "General liability for manufacturing operations",
      "Products liability for manufactured goods",
      "Commercial property for facilities and equipment",
      "Equipment breakdown coverage",
      "Business interruption and supply chain",
      "Pollution liability for manufacturing"
    ],
    benefits: [
      "Comprehensive manufacturing coverage",
      "Products liability throughout distribution",
      "Equipment and machinery protection",
      "Supply chain risk management",
      "Industry-specific underwriting expertise"
    ]
  },

  {
    title: "Medical Professionals",
    slug: "medical-professionals",
    category: "Industries",
    summary: "Malpractice and liability insurance for physicians, surgeons, and medical practitioners.",
    description: "Medical professionals insurance provides malpractice coverage and comprehensive liability protection for physicians, surgeons, and other medical practitioners. This specialized program is designed to protect healthcare providers from the professional liability risks inherent in patient care.",
    whoNeeds: [
      "Physicians and surgeons",
      "Medical specialists",
      "Physician groups and medical practices",
      "Urgent care and walk-in clinics",
      "Telemedicine providers"
    ],
    coverageIncludes: [
      "Medical malpractice liability",
      "Defense costs and legal representation",
      "Medical incident coverage",
      "License defense coverage",
      "HIPAA violation protection",
      "Cyber liability for patient data"
    ],
    benefits: [
      "Specialized medical malpractice coverage",
      "Expert medical defense attorneys",
      "Risk management and loss prevention",
      "Coverage for multiple specialties",
      "Occurrence or claims-made options"
    ]
  },

  {
    title: "Nonprofit",
    slug: "nonprofit",
    category: "Industries",
    summary: "Specialized insurance for nonprofit organizations, charities, and social service agencies.",
    description: "Nonprofit insurance provides tailored coverage for charitable organizations, foundations, social service agencies, and nonprofit entities. This specialized program addresses the unique liability exposures, volunteer activities, and operational risks faced by nonprofit organizations serving their communities.",
    whoNeeds: [
      "Charitable organizations and foundations",
      "Social service agencies",
      "Arts and cultural nonprofits",
      "Youth development organizations",
      "Community development corporations"
    ],
    coverageIncludes: [
      "General liability for nonprofit operations",
      "Directors and officers liability for board members",
      "Professional liability for services provided",
      "Property coverage for nonprofit facilities",
      "Volunteer accident insurance",
      "Sexual abuse and molestation coverage",
      "Event liability coverage",
      "Employment practices liability"
    ],
    benefits: [
      "Coverage designed for nonprofit budgets",
      "Protection for volunteers and board members",
      "Sexual misconduct coverage",
      "Special event and fundraiser coverage",
      "Understanding of nonprofit operations"
    ]
  },

  {
    title: "Public Sector",
    slug: "public-sector",
    category: "Industries",
    summary: "Insurance for government agencies, municipalities, and public entities.",
    description: "Public sector insurance provides comprehensive coverage for federal, state, and local government agencies, municipalities, public schools, and other governmental entities. This specialized program addresses public entity liability, law enforcement risks, civil rights claims, and the unique exposures of serving the public.",
    whoNeeds: [
      "Cities, counties, and municipalities",
      "Public school districts",
      "Law enforcement and fire departments",
      "Public utilities and transit systems",
      "Parks and recreation departments"
    ],
    coverageIncludes: [
      "General liability for public operations",
      "Law enforcement professional liability",
      "Public officials errors and omissions",
      "Employment practices liability",
      "Civil rights violation coverage",
      "Property coverage for public facilities",
      "Auto liability for public vehicles",
      "Cyber liability for government data"
    ],
    benefits: [
      "Specialized public sector expertise",
      "Protection for elected and appointed officials",
      "Law enforcement liability coverage",
      "Civil rights claim defense",
      "Risk management services for public entities"
    ]
  },

  {
    title: "Real Estate",
    slug: "real-estate",
    category: "Industries",
    summary: "Insurance programs for property owners, developers, and real estate professionals.",
    description: "Real estate insurance provides comprehensive coverage for property owners, real estate developers, property managers, and real estate professionals. This program addresses the property, liability, and professional risks in the real estate industry.",
    whoNeeds: [
      "Commercial property owners and landlords",
      "Real estate developers",
      "Property management companies",
      "Real estate agents and brokers",
      "Real estate investment trusts (REITs)"
    ],
    coverageIncludes: [
      "Commercial property for buildings",
      "General liability for property operations",
      "Professional liability for real estate agents",
      "Errors and omissions for property managers",
      "Builder's risk for development projects",
      "Loss of rents and business income"
    ],
    benefits: [
      "Comprehensive real estate coverage",
      "Protection for all types of properties",
      "Professional liability for agents",
      "Coverage during construction and renovation",
      "Flexible policy structures for portfolios"
    ]
  },

  {
    title: "Religious Organizations",
    slug: "religious-organizations",
    category: "Industries",
    summary: "Specialized insurance for churches, temples, mosques, and religious institutions.",
    description: "Religious organizations insurance provides tailored coverage for churches, synagogues, mosques, temples, and other houses of worship. This specialized program addresses the unique property, liability, and operational risks faced by religious institutions.",
    whoNeeds: [
      "Churches and houses of worship",
      "Religious schools and daycare centers",
      "Religious camps and retreat centers",
      "Denominational organizations",
      "Faith-based charities and missions"
    ],
    coverageIncludes: [
      "Property coverage for worship facilities",
      "General liability for religious activities",
      "Sexual abuse and molestation coverage",
      "Directors and officers liability",
      "Professional liability for clergy",
      "Volunteer accident insurance"
    ],
    benefits: [
      "Coverage designed for religious organizations",
      "Sexual misconduct protection",
      "Special event and activity coverage",
      "Volunteer coverage programs",
      "Understanding of religious institution needs"
    ]
  },

  {
    title: "Retail",
    slug: "retail",
    category: "Industries",
    summary: "Complete insurance programs for retail stores, shops, and merchandise businesses.",
    description: "Retail insurance provides comprehensive coverage for retail businesses of all sizes, from small boutiques to large retail chains. This program addresses the property, liability, and operational risks unique to the retail industry.",
    whoNeeds: [
      "Retail stores and shopping centers",
      "Specialty retail and boutiques",
      "E-commerce and online retailers",
      "Wholesale distributors",
      "Retail franchise operations"
    ],
    coverageIncludes: [
      "General liability for retail premises",
      "Products liability for sold merchandise",
      "Property coverage for buildings and inventory",
      "Business interruption coverage",
      "Crime and employee theft coverage",
      "Cyber liability for payment data"
    ],
    benefits: [
      "Tailored coverage for retail operations",
      "Protection for inventory and merchandise",
      "Seasonal coverage adjustments",
      "E-commerce and online sales coverage",
      "Multiple location discounts available"
    ]
  },

  {
    title: "Sports",
    slug: "sports",
    category: "Industries",
    summary: "Insurance for sports teams, athletic facilities, tournaments, and sports organizations.",
    description: "Sports insurance provides comprehensive coverage for professional and amateur sports organizations, athletic facilities, sports teams, and sporting events. This specialized program addresses participant injuries, spectator liability, facility operations, and the unique risks in sports and recreation.",
    whoNeeds: [
      "Professional and amateur sports teams",
      "Sports facilities and arenas",
      "Youth sports leagues and organizations",
      "Fitness centers and gyms",
      "Tournament and event organizers"
    ],
    coverageIncludes: [
      "General liability for sports operations",
      "Participant accident insurance",
      "Spectator liability coverage",
      "Property coverage for facilities and equipment",
      "Professional liability for coaches and trainers",
      "Event cancellation insurance",
      "Assault and battery coverage",
      "Concussion and head injury coverage"
    ],
    benefits: [
      "Specialized sports industry expertise",
      "Participant and spectator protection",
      "Coverage for contact and non-contact sports",
      "Event cancellation and weather coverage",
      "Risk management and safety programs"
    ]
  },

  {
    title: "Security Services",
    slug: "security-services",
    category: "Industries",
    summary: "Specialized coverage for security guard companies, alarm installers, and security consultants.",
    description: "Security services insurance provides essential coverage for companies providing security guards, electronic security systems, alarm monitoring, and security consulting services. This specialized program addresses the unique liability risks in the security industry.",
    whoNeeds: [
      "Security guard and patrol services",
      "Alarm installation and monitoring companies",
      "Security consulting firms",
      "Private investigation services",
      "Armored car and cash transport services"
    ],
    coverageIncludes: [
      "General liability for security operations",
      "Professional liability for security services",
      "Errors and omissions for alarm companies",
      "Assault and battery coverage",
      "False arrest and detention liability",
      "Workers compensation for security personnel"
    ],
    benefits: [
      "Specialized security industry coverage",
      "Assault and battery protection",
      "Professional liability for security consultants",
      "Coverage for armed and unarmed guards",
      "Competitive rates for experienced firms"
    ]
  },

  {
    title: "Warehousing and Distribution",
    slug: "warehousing-distribution",
    category: "Industries",
    summary: "Insurance for warehouse operators, distribution centers, and logistics companies.",
    description: "Warehousing and distribution insurance provides comprehensive coverage for warehouse operators, distribution centers, third-party logistics providers, and fulfillment centers. This program addresses the property, liability, and cargo risks in the warehousing and logistics industry.",
    whoNeeds: [
      "Warehouse and storage facilities",
      "Distribution centers and fulfillment operations",
      "Third-party logistics (3PL) providers",
      "Cold storage and refrigerated warehouses",
      "E-commerce fulfillment centers"
    ],
    coverageIncludes: [
      "Warehouseman's legal liability",
      "General liability for warehouse operations",
      "Commercial property for buildings and equipment",
      "Cargo and goods in transit",
      "Bailees customers coverage",
      "Business interruption and extra expense"
    ],
    benefits: [
      "Specialized warehouse and logistics coverage",
      "Protection for stored customer goods",
      "Cargo coverage for transportation",
      "Equipment breakdown protection",
      "Understanding of logistics operations"
    ]
  },

  {
    title: "Transportation",
    slug: "transportation",
    category: "Industries",
    summary: "Comprehensive insurance for trucking, logistics, and commercial transportation companies.",
    description: "Transportation insurance provides specialized coverage for trucking companies, freight carriers, logistics providers, and commercial transportation businesses. This program addresses motor carrier liability, cargo protection, physical damage, and the unique regulatory requirements of the transportation industry.",
    whoNeeds: [
      "Trucking and freight carriers",
      "Logistics and transportation companies",
      "For-hire motor carriers",
      "Courier and delivery services",
      "Moving and storage companies"
    ],
    coverageIncludes: [
      "Motor truck cargo insurance",
      "Auto liability for commercial vehicles",
      "Physical damage for truck fleet",
      "General liability for operations",
      "Non-trucking liability coverage",
      "Trailer interchange coverage"
    ],
    benefits: [
      "Specialized transportation coverage",
      "Meets DOT and FMCSA requirements",
      "High-limit cargo capacity",
      "Regulatory compliance expertise",
      "Coverage for interstate and intrastate operations"
    ]
  }
];

export function getCoverageBySlug(slug: string): CoverageContent | undefined {
  return [...coverages, ...industries].find(c => c.slug === slug);
}

export function getCoveragesByCategory(category: string): CoverageContent[] {
  return coverages.filter(c => c.category === category);
}

export const categories = [
  "Business Size Programs",
  "Casualty",
  "Energy",
  "Entertainment",
  "Environmental",
  "Life Sciences",
  "Product Recall",
  "Products Liability",
  "Professional Lines",
  "Personal Lines",
  "Property",
  "Transportation",
  "Agribusiness",
  "Specialty",
  "Habitational"
];
