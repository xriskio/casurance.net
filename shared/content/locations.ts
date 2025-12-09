export interface LocationInsuranceType {
  slug: string;
  name: string;
  description: string;
  coveragePoints: string[];
  avgCost?: string;
  quoteLink: string;
}

export interface CityLocation {
  slug: string;
  name: string;
  state: string;
  stateAbbr: string;
  region: string;
  population?: string;
  businessHighlights?: string[];
}

export const insuranceTypes: LocationInsuranceType[] = [
  {
    slug: "general-liability",
    name: "General Liability Insurance",
    description: "General liability insurance protects your business from third-party claims of bodily injury, property damage, and personal injury. This essential coverage is often required for commercial leases and contracts.",
    coveragePoints: [
      "Bodily injury and property damage liability",
      "Personal and advertising injury coverage",
      "Medical payments coverage",
      "Legal defense costs",
      "Products and completed operations",
      "Contractual liability protection"
    ],
    avgCost: "$500-$3,000 per year",
    quoteLink: "/quote/general-liability"
  },
  {
    slug: "workers-compensation",
    name: "Workers' Compensation Insurance",
    description: "Workers' compensation insurance provides wage replacement and medical benefits to employees injured on the job. Most states require this coverage for businesses with employees.",
    coveragePoints: [
      "Medical expense coverage for work injuries",
      "Disability benefits for injured workers",
      "Death benefits for dependents",
      "Rehabilitation and retraining costs",
      "Employer's liability protection",
      "Lost wage replacement"
    ],
    avgCost: "$0.75-$2.50 per $100 of payroll",
    quoteLink: "/quote/workers-compensation"
  },
  {
    slug: "commercial-auto",
    name: "Commercial Auto Insurance",
    description: "Commercial auto insurance protects vehicles used for business purposes including liability, collision, and comprehensive coverage for company cars, trucks, and fleets.",
    coveragePoints: [
      "Liability coverage for accidents",
      "Collision and comprehensive coverage",
      "Uninsured/underinsured motorist protection",
      "Medical payments coverage",
      "Hired and non-owned auto coverage",
      "Cargo and trailer coverage"
    ],
    avgCost: "$1,200-$2,400 per vehicle per year",
    quoteLink: "/quote/commercial-auto"
  },
  {
    slug: "commercial-property",
    name: "Commercial Property Insurance",
    description: "Commercial property insurance protects your business buildings, equipment, inventory, and furniture from covered perils including fire, theft, and natural disasters.",
    coveragePoints: [
      "Building and structure coverage",
      "Business personal property",
      "Equipment and inventory protection",
      "Business interruption coverage",
      "Extra expense coverage",
      "Tenant improvements coverage"
    ],
    avgCost: "$1,000-$3,000 per year",
    quoteLink: "/quote/commercial-property"
  },
  {
    slug: "business-owners-policy",
    name: "Business Owners Policy (BOP)",
    description: "A Business Owners Policy bundles general liability and commercial property insurance into one convenient package, often at a lower cost than purchasing policies separately.",
    coveragePoints: [
      "General liability protection",
      "Commercial property coverage",
      "Business interruption insurance",
      "Equipment breakdown coverage",
      "Data breach protection options",
      "Professional liability add-ons available"
    ],
    avgCost: "$500-$3,500 per year",
    quoteLink: "/quote"
  },
  {
    slug: "professional-liability",
    name: "Professional Liability (E&O)",
    description: "Professional liability insurance, also known as Errors & Omissions (E&O), protects businesses from claims of negligence, mistakes, or failure to perform professional services.",
    coveragePoints: [
      "Protection against negligence claims",
      "Coverage for professional mistakes",
      "Legal defense costs included",
      "Contractual liability protection",
      "Prior acts coverage available",
      "Worldwide coverage options"
    ],
    avgCost: "$500-$5,000 per year",
    quoteLink: "/quote"
  },
  {
    slug: "cyber-liability",
    name: "Cyber Liability Insurance",
    description: "Cyber liability insurance protects your business from data breaches, cyber attacks, and technology-related risks including notification costs, forensics, and liability claims.",
    coveragePoints: [
      "Data breach response costs",
      "Cyber extortion and ransomware",
      "Business interruption from cyber events",
      "Network security liability",
      "Privacy liability protection",
      "Regulatory defense and penalties"
    ],
    avgCost: "$1,000-$7,500 per year",
    quoteLink: "/quote"
  },
  {
    slug: "liquor-liability",
    name: "Liquor Liability Insurance",
    description: "Liquor liability insurance protects businesses that sell, serve, or manufacture alcohol from claims arising from intoxicated patrons causing injury or property damage.",
    coveragePoints: [
      "Third-party bodily injury claims",
      "Property damage by intoxicated persons",
      "Dram shop law protection",
      "Legal defense costs",
      "Assault and battery coverage",
      "Host liquor liability"
    ],
    avgCost: "$1,500-$15,000 per year",
    quoteLink: "/quote"
  },
  {
    slug: "employment-practices-liability",
    name: "Employment Practices Liability (EPLI)",
    description: "Employment practices liability insurance protects employers from claims by employees alleging discrimination, wrongful termination, harassment, and other employment-related issues.",
    coveragePoints: [
      "Wrongful termination claims",
      "Discrimination allegations",
      "Sexual harassment claims",
      "Retaliation lawsuits",
      "Wage and hour disputes",
      "Third-party liability coverage"
    ],
    avgCost: "$800-$5,000 per year",
    quoteLink: "/quote"
  },
  {
    slug: "umbrella-excess",
    name: "Umbrella & Excess Liability",
    description: "Umbrella and excess liability insurance provides additional liability limits above your primary policies, protecting your business from catastrophic claims that exceed base coverage.",
    coveragePoints: [
      "Additional limits over primary policies",
      "Broader coverage than underlying policies",
      "Protection for catastrophic claims",
      "Covers general liability excess",
      "Auto liability excess coverage",
      "Employer's liability excess"
    ],
    avgCost: "$1,000-$10,000 per year",
    quoteLink: "/quote"
  },
  {
    slug: "restaurant",
    name: "Restaurant Insurance",
    description: "Restaurant insurance provides comprehensive protection for food service businesses including coverage for property, liability, liquor liability, and food spoilage.",
    coveragePoints: [
      "Property damage and business interruption",
      "General liability coverage",
      "Liquor liability protection",
      "Food spoilage coverage",
      "Equipment breakdown protection",
      "Workers' compensation coverage"
    ],
    avgCost: "$3,000-$10,000 per year",
    quoteLink: "/quote/restaurant"
  },
  {
    slug: "trucking",
    name: "Trucking Insurance",
    description: "Trucking insurance provides specialized coverage for commercial trucking operations including liability, cargo, physical damage, and motor cargo coverage.",
    coveragePoints: [
      "Primary liability coverage",
      "Motor truck cargo coverage",
      "Physical damage protection",
      "Non-trucking liability",
      "Trailer interchange coverage",
      "Bobtail insurance"
    ],
    avgCost: "$8,000-$15,000 per truck per year",
    quoteLink: "/quote/trucking"
  },
  {
    slug: "rideshare",
    name: "Rideshare & TNC Insurance",
    description: "Rideshare insurance bridges the gap between personal auto policies and TNC coverage, protecting drivers during periods when the app is on but no ride is in progress.",
    coveragePoints: [
      "Period 1, 2, and 3 coverage gaps",
      "Liability protection for rideshare drivers",
      "Collision and comprehensive coverage",
      "Uninsured motorist protection",
      "Medical payments coverage",
      "24/7 claims support"
    ],
    avgCost: "$100-$300 per month",
    quoteLink: "/quote/tnc"
  },
  {
    slug: "contractors",
    name: "Contractors Insurance",
    description: "Contractors insurance provides comprehensive coverage for construction professionals including general liability, tools and equipment, and completed operations protection.",
    coveragePoints: [
      "General liability for contractors",
      "Tools and equipment coverage",
      "Completed operations protection",
      "Installation floater coverage",
      "Builders risk insurance",
      "Subcontractor default insurance"
    ],
    avgCost: "$1,500-$8,000 per year",
    quoteLink: "/quote"
  },
  {
    slug: "builders-risk",
    name: "Builders Risk Insurance",
    description: "Builders risk insurance protects buildings under construction from property damage including fire, theft, vandalism, and weather damage. Coverage applies to new ground-up construction and renovation projects.",
    coveragePoints: [
      "Coverage for buildings under construction",
      "Protection during renovation projects",
      "Materials and supplies coverage",
      "Soft costs and delay in completion",
      "Equipment and temporary structures",
      "Hard-to-insure location coverage"
    ],
    avgCost: "$2,000-$15,000 per project",
    quoteLink: "/quote/builders-risk"
  },
  {
    slug: "products-liability",
    name: "Products Liability Insurance",
    description: "Products liability insurance protects manufacturers, distributors, and retailers from claims arising from defective products that cause injury or property damage.",
    coveragePoints: [
      "Bodily injury from products",
      "Property damage claims",
      "Product recall expense",
      "Manufacturing defect coverage",
      "Design defect protection",
      "Warning label liability"
    ],
    avgCost: "$1,000-$10,000 per year",
    quoteLink: "/quote"
  },
  {
    slug: "directors-officers",
    name: "Directors & Officers (D&O) Insurance",
    description: "Directors and Officers insurance protects company leaders from personal liability for decisions made while managing the company, including defense costs and settlements.",
    coveragePoints: [
      "Personal asset protection",
      "Defense cost coverage",
      "Securities claims protection",
      "Regulatory investigation coverage",
      "Employment claims coverage",
      "Entity coverage options"
    ],
    avgCost: "$2,000-$15,000 per year",
    quoteLink: "/quote"
  },
  {
    slug: "inland-marine",
    name: "Inland Marine Insurance",
    description: "Inland marine insurance covers equipment, tools, and property in transit or stored at job sites that standard property policies may not cover.",
    coveragePoints: [
      "Equipment in transit coverage",
      "Tools at job sites",
      "Contractors equipment floater",
      "Installation coverage",
      "Electronic data processing",
      "Valuable papers coverage"
    ],
    avgCost: "$500-$5,000 per year",
    quoteLink: "/quote"
  },
  {
    slug: "surety-bonds",
    name: "Surety Bonds",
    description: "Surety bonds guarantee that contractual obligations will be fulfilled, protecting project owners and ensuring contractors meet their commitments.",
    coveragePoints: [
      "Bid bonds for contractors",
      "Performance bonds",
      "Payment bonds",
      "License and permit bonds",
      "Fidelity bonds",
      "Court bonds"
    ],
    avgCost: "1-15% of bond amount",
    quoteLink: "/quote"
  },
  {
    slug: "commercial-flood",
    name: "Commercial Flood Insurance",
    description: "Commercial flood insurance protects your business property and contents from flood damage, which is excluded from standard commercial property policies.",
    coveragePoints: [
      "Building flood coverage",
      "Contents and inventory protection",
      "Business interruption options",
      "Excess flood coverage available",
      "NFIP and private options",
      "Basement coverage options"
    ],
    avgCost: "$1,000-$5,000 per year",
    quoteLink: "/quote"
  },
  {
    slug: "commercial-earthquake",
    name: "Commercial Earthquake Insurance",
    description: "Commercial earthquake insurance covers damage to your business property from earthquakes, which is excluded from standard commercial property policies.",
    coveragePoints: [
      "Building damage coverage",
      "Business personal property",
      "Business interruption",
      "Extra expense coverage",
      "Code upgrade coverage",
      "Sprinkler leakage"
    ],
    avgCost: "$1,500-$8,000 per year",
    quoteLink: "/quote"
  },
  {
    slug: "real-estate",
    name: "Real Estate Insurance",
    description: "Real estate insurance provides comprehensive protection for property investors, landlords, and real estate professionals covering buildings, liability, and rental income.",
    coveragePoints: [
      "Building and structure coverage",
      "Rental income protection",
      "Landlord liability coverage",
      "Property management E&O",
      "Tenant discrimination defense",
      "Fair housing violation coverage"
    ],
    avgCost: "$1,000-$5,000 per year",
    quoteLink: "/quote"
  },
  {
    slug: "apartments",
    name: "Apartment Building Insurance",
    description: "Apartment building insurance provides specialized coverage for multifamily residential properties including garden-style apartments, mid-rise, and high-rise buildings.",
    coveragePoints: [
      "Building and property coverage",
      "Loss of rental income",
      "General liability protection",
      "Equipment breakdown coverage",
      "Ordinance or law coverage",
      "Water damage and backup coverage"
    ],
    avgCost: "$2,500-$15,000 per year",
    quoteLink: "/habitational-program"
  },
  {
    slug: "habitational",
    name: "Habitational Insurance Program",
    description: "Habitational insurance provides comprehensive property and liability coverage for residential rental properties including apartments, condos, and multifamily buildings.",
    coveragePoints: [
      "All-risk property coverage",
      "Up to $100M per location limits",
      "Full replacement cost valuation",
      "No co-insurance requirement",
      "Business income protection",
      "Equipment breakdown included"
    ],
    avgCost: "$3,000-$25,000 per year",
    quoteLink: "/habitational-program"
  },
  {
    slug: "condominiums",
    name: "Condominium Insurance",
    description: "Condominium insurance protects condo associations and unit owners with coverage for common areas, liability, and individual unit improvements.",
    coveragePoints: [
      "Master policy coverage",
      "Common area protection",
      "Directors & Officers liability",
      "Fidelity bond coverage",
      "Unit owner improvements",
      "Loss assessment coverage"
    ],
    avgCost: "$1,500-$10,000 per year",
    quoteLink: "/quote"
  },
  {
    slug: "high-value-home",
    name: "High Value Home Insurance",
    description: "High value home insurance provides enhanced coverage for luxury homes and estates up to $30M, including extended replacement cost and specialized personal property protection.",
    coveragePoints: [
      "Extended replacement cost coverage",
      "Agreed value settlements",
      "High-limit jewelry and art coverage",
      "Cash settlement options",
      "Identity theft protection",
      "Personal liability up to $100M"
    ],
    avgCost: "$5,000-$50,000 per year",
    quoteLink: "/high-value-home"
  },
  {
    slug: "wildfire-brush-area",
    name: "Wildfire & Brush Area Insurance",
    description: "Wildfire and brush area insurance provides coverage for homes in high fire risk zones where standard policies may be unavailable or limited.",
    coveragePoints: [
      "Fire and wildfire coverage",
      "Brush zone property protection",
      "Evacuation expense coverage",
      "Debris removal coverage",
      "Extended dwelling protection",
      "Personal property replacement"
    ],
    avgCost: "$3,000-$20,000 per year",
    quoteLink: "/wildfire-brush-area"
  },
  {
    slug: "self-storage",
    name: "Self Storage Insurance",
    description: "Self storage facility insurance provides comprehensive coverage for storage facility operators including property, liability, and customer goods protection.",
    coveragePoints: [
      "Building and property coverage",
      "Customer goods legal liability",
      "Sale and disposal coverage",
      "Business income protection",
      "General liability coverage",
      "Equipment breakdown"
    ],
    avgCost: "$2,000-$15,000 per year",
    quoteLink: "/public-self-storage"
  },
  {
    slug: "high-rise-building",
    name: "High-Rise Building Insurance",
    description: "High-rise building insurance provides specialized coverage for commercial and residential high-rise structures with enhanced limits for complex urban properties.",
    coveragePoints: [
      "High-limit property coverage",
      "Elevator and escalator liability",
      "Ordinance or law coverage",
      "Water damage protection",
      "Building code upgrade coverage",
      "Common area liability"
    ],
    avgCost: "$10,000-$100,000 per year",
    quoteLink: "/habitational-program"
  },
  {
    slug: "bristol-west-commercial",
    name: "Bristol West Commercial Auto",
    description: "Bristol West Commercial Auto insurance through Casurance provides comprehensive coverage for California business vehicles, backed by Farmers Insurance and underwritten by Coast National Insurance Company.",
    coveragePoints: [
      "Liability coverage for business vehicles",
      "Collision and comprehensive protection",
      "Hired auto and non-owned coverage",
      "Medical payments coverage",
      "State and federal filings available",
      "Multi-product and EFT discounts"
    ],
    avgCost: "$1,500-$5,000 per vehicle per year",
    quoteLink: "/bristol-west-commercial-auto"
  },
  {
    slug: "bristol-west-personal",
    name: "Bristol West Private Passenger Auto",
    description: "Bristol West Private Passenger Auto insurance offers affordable coverage for personal vehicles with same-day SR-22 filings, rideshare coverage options, and acceptance for drivers with no prior insurance or DUI history.",
    coveragePoints: [
      "Liability and full coverage options",
      "Same-day SR-22/FR-44 filings",
      "Rideshare coverage for Uber/Lyft",
      "No prior insurance accepted",
      "DUI/DWI coverage available",
      "Rental reimbursement coverage"
    ],
    avgCost: "$1,200-$4,000 per year",
    quoteLink: "/bristol-west-private-passenger"
  },
  {
    slug: "berkshire-hathaway-commercial",
    name: "Berkshire Hathaway Commercial Auto",
    description: "Berkshire Hathaway Homestate Companies (BHHC) Commercial Auto insurance provides A++ rated coverage for trucking, contractors, and specialty commercial vehicles across 35+ states.",
    coveragePoints: [
      "A++ (Superior) AM Best rating",
      "Coverage for trucking and contractors",
      "Fleet coverage for 11+ units",
      "MCS-90 and federal filings",
      "Trailer interchange coverage",
      "Telematics discounts available"
    ],
    avgCost: "$3,000-$15,000 per vehicle per year",
    quoteLink: "/berkshire-hathaway-commercial-auto"
  }
];

export const californiaLocations: CityLocation[] = [
  { slug: "anaheim", name: "Anaheim", state: "California", stateAbbr: "CA", region: "Orange County", population: "350,000+", businessHighlights: ["Tourism", "Entertainment", "Hospitality"] },
  { slug: "beverly-hills", name: "Beverly Hills", state: "California", stateAbbr: "CA", region: "Los Angeles County", population: "33,000+", businessHighlights: ["Luxury Retail", "Entertainment", "Hospitality"] },
  { slug: "cupertino", name: "Cupertino", state: "California", stateAbbr: "CA", region: "Santa Clara County", population: "60,000+", businessHighlights: ["Technology", "Retail", "Professional Services"] },
  { slug: "downtown-los-angeles", name: "Downtown Los Angeles", state: "California", stateAbbr: "CA", region: "Los Angeles County", population: "80,000+", businessHighlights: ["Finance", "Arts & Culture", "Fashion"] },
  { slug: "dana-point", name: "Dana Point", state: "California", stateAbbr: "CA", region: "Orange County", population: "34,000+", businessHighlights: ["Marine", "Tourism", "Retail"] },
  { slug: "el-segundo", name: "El Segundo", state: "California", stateAbbr: "CA", region: "Los Angeles County", population: "17,000+", businessHighlights: ["Aerospace", "Technology", "Media"] },
  { slug: "fremont", name: "Fremont", state: "California", stateAbbr: "CA", region: "Alameda County", population: "230,000+", businessHighlights: ["Technology", "Manufacturing", "Healthcare"] },
  { slug: "huntington-beach", name: "Huntington Beach", state: "California", stateAbbr: "CA", region: "Orange County", population: "200,000+", businessHighlights: ["Oil & Gas", "Tourism", "Retail"] },
  { slug: "laguna-beach", name: "Laguna Beach", state: "California", stateAbbr: "CA", region: "Orange County", population: "23,000+", businessHighlights: ["Art", "Tourism", "Hospitality"] },
  { slug: "los-angeles", name: "Los Angeles", state: "California", stateAbbr: "CA", region: "Los Angeles County", population: "3,900,000+", businessHighlights: ["Entertainment", "Technology", "Manufacturing"] },
  { slug: "long-beach", name: "Long Beach", state: "California", stateAbbr: "CA", region: "Los Angeles County", population: "466,000+", businessHighlights: ["Shipping", "Aerospace", "Tourism"] },
  { slug: "manhattan-beach", name: "Manhattan Beach", state: "California", stateAbbr: "CA", region: "Los Angeles County", population: "35,000+", businessHighlights: ["Retail", "Professional Services", "Hospitality"] },
  { slug: "mountain-view", name: "Mountain View", state: "California", stateAbbr: "CA", region: "Santa Clara County", population: "82,000+", businessHighlights: ["Technology", "Healthcare", "Professional Services"] },
  { slug: "napa", name: "Napa", state: "California", stateAbbr: "CA", region: "Napa County", population: "79,000+", businessHighlights: ["Wine", "Tourism", "Hospitality"] },
  { slug: "newport-beach", name: "Newport Beach", state: "California", stateAbbr: "CA", region: "Orange County", population: "85,000+", businessHighlights: ["Finance", "Real Estate", "Marine"] },
  { slug: "oakland", name: "Oakland", state: "California", stateAbbr: "CA", region: "Alameda County", population: "433,000+", businessHighlights: ["Shipping", "Healthcare", "Technology"] },
  { slug: "palo-alto", name: "Palo Alto", state: "California", stateAbbr: "CA", region: "Santa Clara County", population: "68,000+", businessHighlights: ["Technology", "Venture Capital", "Healthcare"] },
  { slug: "pasadena", name: "Pasadena", state: "California", stateAbbr: "CA", region: "Los Angeles County", population: "138,000+", businessHighlights: ["Education", "Healthcare", "Technology"] },
  { slug: "redondo-beach", name: "Redondo Beach", state: "California", stateAbbr: "CA", region: "Los Angeles County", population: "67,000+", businessHighlights: ["Retail", "Hospitality", "Professional Services"] },
  { slug: "redwood-city", name: "Redwood City", state: "California", stateAbbr: "CA", region: "San Mateo County", population: "84,000+", businessHighlights: ["Technology", "Biotech", "Professional Services"] },
  { slug: "sacramento", name: "Sacramento", state: "California", stateAbbr: "CA", region: "Sacramento County", population: "524,000+", businessHighlights: ["Government", "Healthcare", "Agriculture"] },
  { slug: "san-diego", name: "San Diego", state: "California", stateAbbr: "CA", region: "San Diego County", population: "1,420,000+", businessHighlights: ["Biotech", "Defense", "Tourism"] },
  { slug: "san-francisco", name: "San Francisco", state: "California", stateAbbr: "CA", region: "San Francisco County", population: "874,000+", businessHighlights: ["Technology", "Finance", "Tourism"] },
  { slug: "san-jose", name: "San Jose", state: "California", stateAbbr: "CA", region: "Santa Clara County", population: "1,030,000+", businessHighlights: ["Technology", "Manufacturing", "Healthcare"] },
  { slug: "santa-clara", name: "Santa Clara", state: "California", stateAbbr: "CA", region: "Santa Clara County", population: "127,000+", businessHighlights: ["Technology", "Manufacturing", "Entertainment"] },
  { slug: "san-mateo", name: "San Mateo", state: "California", stateAbbr: "CA", region: "San Mateo County", population: "105,000+", businessHighlights: ["Technology", "Biotech", "Finance"] },
  { slug: "santa-monica", name: "Santa Monica", state: "California", stateAbbr: "CA", region: "Los Angeles County", population: "93,000+", businessHighlights: ["Entertainment", "Technology", "Tourism"] },
  { slug: "santa-rosa", name: "Santa Rosa", state: "California", stateAbbr: "CA", region: "Sonoma County", population: "178,000+", businessHighlights: ["Wine", "Healthcare", "Manufacturing"] },
  { slug: "torrance", name: "Torrance", state: "California", stateAbbr: "CA", region: "Los Angeles County", population: "145,000+", businessHighlights: ["Aerospace", "Retail", "Manufacturing"] },
  { slug: "woodland-hills", name: "Woodland Hills", state: "California", stateAbbr: "CA", region: "Los Angeles County", population: "70,000+", businessHighlights: ["Entertainment", "Healthcare", "Professional Services"] },
  { slug: "irvine", name: "Irvine", state: "California", stateAbbr: "CA", region: "Orange County", population: "307,000+", businessHighlights: ["Technology", "Biotech", "Education"] },
  { slug: "burbank", name: "Burbank", state: "California", stateAbbr: "CA", region: "Los Angeles County", population: "107,000+", businessHighlights: ["Entertainment", "Media", "Aviation"] },
  { slug: "glendale", name: "Glendale", state: "California", stateAbbr: "CA", region: "Los Angeles County", population: "196,000+", businessHighlights: ["Healthcare", "Retail", "Finance"] },
  { slug: "costa-mesa", name: "Costa Mesa", state: "California", stateAbbr: "CA", region: "Orange County", population: "112,000+", businessHighlights: ["Retail", "Arts", "Professional Services"] }
];

export const nevadaLocations: CityLocation[] = [
  { slug: "las-vegas", name: "Las Vegas", state: "Nevada", stateAbbr: "NV", region: "Clark County", population: "641,000+", businessHighlights: ["Gaming", "Tourism", "Entertainment"] },
  { slug: "henderson", name: "Henderson", state: "Nevada", stateAbbr: "NV", region: "Clark County", population: "320,000+", businessHighlights: ["Healthcare", "Manufacturing", "Retail"] },
  { slug: "reno", name: "Reno", state: "Nevada", stateAbbr: "NV", region: "Washoe County", population: "264,000+", businessHighlights: ["Technology", "Gaming", "Distribution"] },
  { slug: "north-las-vegas", name: "North Las Vegas", state: "Nevada", stateAbbr: "NV", region: "Clark County", population: "262,000+", businessHighlights: ["Distribution", "Manufacturing", "Retail"] },
  { slug: "sparks", name: "Sparks", state: "Nevada", stateAbbr: "NV", region: "Washoe County", population: "108,000+", businessHighlights: ["Distribution", "Manufacturing", "Retail"] },
  { slug: "mesquite", name: "Mesquite", state: "Nevada", stateAbbr: "NV", region: "Clark County", population: "20,000+", businessHighlights: ["Tourism", "Retail", "Healthcare"] },
  { slug: "boulder-city", name: "Boulder City", state: "Nevada", stateAbbr: "NV", region: "Clark County", population: "16,000+", businessHighlights: ["Tourism", "Government", "Retail"] },
  { slug: "carson-city", name: "Carson City", state: "Nevada", stateAbbr: "NV", region: "Carson City", population: "58,000+", businessHighlights: ["Government", "Tourism", "Healthcare"] }
];

export const ohioLocations: CityLocation[] = [
  { slug: "columbus", name: "Columbus", state: "Ohio", stateAbbr: "OH", region: "Franklin County", population: "905,000+", businessHighlights: ["Insurance", "Healthcare", "Technology"] },
  { slug: "cleveland", name: "Cleveland", state: "Ohio", stateAbbr: "OH", region: "Cuyahoga County", population: "372,000+", businessHighlights: ["Healthcare", "Manufacturing", "Finance"] },
  { slug: "cincinnati", name: "Cincinnati", state: "Ohio", stateAbbr: "OH", region: "Hamilton County", population: "309,000+", businessHighlights: ["Consumer Goods", "Finance", "Healthcare"] },
  { slug: "toledo", name: "Toledo", state: "Ohio", stateAbbr: "OH", region: "Lucas County", population: "270,000+", businessHighlights: ["Manufacturing", "Healthcare", "Logistics"] },
  { slug: "akron", name: "Akron", state: "Ohio", stateAbbr: "OH", region: "Summit County", population: "190,000+", businessHighlights: ["Polymer Industry", "Healthcare", "Manufacturing"] },
  { slug: "dayton", name: "Dayton", state: "Ohio", stateAbbr: "OH", region: "Montgomery County", population: "137,000+", businessHighlights: ["Aerospace", "Defense", "Healthcare"] },
  { slug: "parma", name: "Parma", state: "Ohio", stateAbbr: "OH", region: "Cuyahoga County", population: "81,000+", businessHighlights: ["Retail", "Healthcare", "Manufacturing"] },
  { slug: "canton", name: "Canton", state: "Ohio", stateAbbr: "OH", region: "Stark County", population: "70,000+", businessHighlights: ["Manufacturing", "Healthcare", "Retail"] },
  { slug: "youngstown", name: "Youngstown", state: "Ohio", stateAbbr: "OH", region: "Mahoning County", population: "60,000+", businessHighlights: ["Manufacturing", "Healthcare", "Education"] },
  { slug: "lorain", name: "Lorain", state: "Ohio", stateAbbr: "OH", region: "Lorain County", population: "65,000+", businessHighlights: ["Steel", "Manufacturing", "Maritime"] }
];

export const arizonaLocations: CityLocation[] = [
  { slug: "phoenix", name: "Phoenix", state: "Arizona", stateAbbr: "AZ", region: "Maricopa County", population: "1,660,000+", businessHighlights: ["Technology", "Healthcare", "Financial Services"] },
  { slug: "tucson", name: "Tucson", state: "Arizona", stateAbbr: "AZ", region: "Pima County", population: "545,000+", businessHighlights: ["Aerospace", "Defense", "Education"] },
  { slug: "mesa", name: "Mesa", state: "Arizona", stateAbbr: "AZ", region: "Maricopa County", population: "508,000+", businessHighlights: ["Aerospace", "Healthcare", "Technology"] },
  { slug: "chandler", name: "Chandler", state: "Arizona", stateAbbr: "AZ", region: "Maricopa County", population: "275,000+", businessHighlights: ["Technology", "Semiconductors", "Data Centers"] },
  { slug: "scottsdale", name: "Scottsdale", state: "Arizona", stateAbbr: "AZ", region: "Maricopa County", population: "260,000+", businessHighlights: ["Tourism", "Healthcare", "Technology"] },
  { slug: "glendale", name: "Glendale", state: "Arizona", stateAbbr: "AZ", region: "Maricopa County", population: "250,000+", businessHighlights: ["Sports", "Retail", "Entertainment"] },
  { slug: "gilbert", name: "Gilbert", state: "Arizona", stateAbbr: "AZ", region: "Maricopa County", population: "275,000+", businessHighlights: ["Technology", "Healthcare", "Retail"] },
  { slug: "tempe", name: "Tempe", state: "Arizona", stateAbbr: "AZ", region: "Maricopa County", population: "185,000+", businessHighlights: ["Education", "Technology", "Aerospace"] },
  { slug: "peoria", name: "Peoria", state: "Arizona", stateAbbr: "AZ", region: "Maricopa County", population: "190,000+", businessHighlights: ["Healthcare", "Retail", "Sports"] },
  { slug: "surprise", name: "Surprise", state: "Arizona", stateAbbr: "AZ", region: "Maricopa County", population: "155,000+", businessHighlights: ["Healthcare", "Retail", "Manufacturing"] }
];

export const texasLocations: CityLocation[] = [
  { slug: "houston", name: "Houston", state: "Texas", stateAbbr: "TX", region: "Harris County", population: "2,300,000+", businessHighlights: ["Energy", "Healthcare", "Aerospace"] },
  { slug: "san-antonio", name: "San Antonio", state: "Texas", stateAbbr: "TX", region: "Bexar County", population: "1,500,000+", businessHighlights: ["Military", "Healthcare", "Tourism"] },
  { slug: "dallas", name: "Dallas", state: "Texas", stateAbbr: "TX", region: "Dallas County", population: "1,340,000+", businessHighlights: ["Technology", "Finance", "Telecommunications"] },
  { slug: "austin", name: "Austin", state: "Texas", stateAbbr: "TX", region: "Travis County", population: "1,000,000+", businessHighlights: ["Technology", "Government", "Entertainment"] },
  { slug: "fort-worth", name: "Fort Worth", state: "Texas", stateAbbr: "TX", region: "Tarrant County", population: "935,000+", businessHighlights: ["Aerospace", "Defense", "Logistics"] },
  { slug: "el-paso", name: "El Paso", state: "Texas", stateAbbr: "TX", region: "El Paso County", population: "680,000+", businessHighlights: ["Manufacturing", "Military", "Trade"] },
  { slug: "arlington", name: "Arlington", state: "Texas", stateAbbr: "TX", region: "Tarrant County", population: "395,000+", businessHighlights: ["Entertainment", "Manufacturing", "Retail"] },
  { slug: "corpus-christi", name: "Corpus Christi", state: "Texas", stateAbbr: "TX", region: "Nueces County", population: "320,000+", businessHighlights: ["Energy", "Port Operations", "Tourism"] },
  { slug: "plano", name: "Plano", state: "Texas", stateAbbr: "TX", region: "Collin County", population: "290,000+", businessHighlights: ["Technology", "Finance", "Corporate HQs"] },
  { slug: "laredo", name: "Laredo", state: "Texas", stateAbbr: "TX", region: "Webb County", population: "260,000+", businessHighlights: ["Trade", "Logistics", "Manufacturing"] }
];

export const coloradoLocations: CityLocation[] = [
  { slug: "denver", name: "Denver", state: "Colorado", stateAbbr: "CO", region: "Denver County", population: "715,000+", businessHighlights: ["Technology", "Aerospace", "Healthcare"] },
  { slug: "colorado-springs", name: "Colorado Springs", state: "Colorado", stateAbbr: "CO", region: "El Paso County", population: "485,000+", businessHighlights: ["Military", "Technology", "Tourism"] },
  { slug: "aurora", name: "Aurora", state: "Colorado", stateAbbr: "CO", region: "Arapahoe County", population: "390,000+", businessHighlights: ["Healthcare", "Aerospace", "Manufacturing"] },
  { slug: "fort-collins", name: "Fort Collins", state: "Colorado", stateAbbr: "CO", region: "Larimer County", population: "170,000+", businessHighlights: ["Technology", "Education", "Brewing"] },
  { slug: "lakewood", name: "Lakewood", state: "Colorado", stateAbbr: "CO", region: "Jefferson County", population: "155,000+", businessHighlights: ["Government", "Healthcare", "Retail"] },
  { slug: "thornton", name: "Thornton", state: "Colorado", stateAbbr: "CO", region: "Adams County", population: "145,000+", businessHighlights: ["Healthcare", "Retail", "Distribution"] },
  { slug: "arvada", name: "Arvada", state: "Colorado", stateAbbr: "CO", region: "Jefferson County", population: "125,000+", businessHighlights: ["Manufacturing", "Healthcare", "Retail"] },
  { slug: "westminster", name: "Westminster", state: "Colorado", stateAbbr: "CO", region: "Adams County", population: "115,000+", businessHighlights: ["Technology", "Healthcare", "Retail"] },
  { slug: "boulder", name: "Boulder", state: "Colorado", stateAbbr: "CO", region: "Boulder County", population: "105,000+", businessHighlights: ["Technology", "Education", "Research"] },
  { slug: "greeley", name: "Greeley", state: "Colorado", stateAbbr: "CO", region: "Weld County", population: "110,000+", businessHighlights: ["Agriculture", "Energy", "Education"] }
];

export const oregonLocations: CityLocation[] = [
  { slug: "portland", name: "Portland", state: "Oregon", stateAbbr: "OR", region: "Multnomah County", population: "650,000+", businessHighlights: ["Technology", "Manufacturing", "Retail"] },
  { slug: "salem", name: "Salem", state: "Oregon", stateAbbr: "OR", region: "Marion County", population: "175,000+", businessHighlights: ["Government", "Agriculture", "Healthcare"] },
  { slug: "eugene", name: "Eugene", state: "Oregon", stateAbbr: "OR", region: "Lane County", population: "175,000+", businessHighlights: ["Education", "Technology", "Healthcare"] },
  { slug: "gresham", name: "Gresham", state: "Oregon", stateAbbr: "OR", region: "Multnomah County", population: "115,000+", businessHighlights: ["Manufacturing", "Healthcare", "Retail"] },
  { slug: "hillsboro", name: "Hillsboro", state: "Oregon", stateAbbr: "OR", region: "Washington County", population: "110,000+", businessHighlights: ["Technology", "Semiconductors", "Manufacturing"] },
  { slug: "beaverton", name: "Beaverton", state: "Oregon", stateAbbr: "OR", region: "Washington County", population: "100,000+", businessHighlights: ["Technology", "Sportswear", "Retail"] },
  { slug: "bend", name: "Bend", state: "Oregon", stateAbbr: "OR", region: "Deschutes County", population: "100,000+", businessHighlights: ["Tourism", "Technology", "Brewing"] },
  { slug: "medford", name: "Medford", state: "Oregon", stateAbbr: "OR", region: "Jackson County", population: "85,000+", businessHighlights: ["Healthcare", "Agriculture", "Retail"] },
  { slug: "springfield", name: "Springfield", state: "Oregon", stateAbbr: "OR", region: "Lane County", population: "62,000+", businessHighlights: ["Manufacturing", "Retail", "Healthcare"] },
  { slug: "corvallis", name: "Corvallis", state: "Oregon", stateAbbr: "OR", region: "Benton County", population: "60,000+", businessHighlights: ["Education", "Technology", "Research"] }
];

export const allLocations = [...californiaLocations, ...nevadaLocations, ...ohioLocations, ...arizonaLocations, ...texasLocations, ...coloradoLocations, ...oregonLocations];

export function getLocationBySlug(slug: string): CityLocation | undefined {
  return allLocations.find(loc => loc.slug === slug);
}

export function getInsuranceTypeBySlug(slug: string): LocationInsuranceType | undefined {
  return insuranceTypes.find(type => type.slug === slug);
}

export function generateLocationSlug(city: CityLocation, insuranceType: LocationInsuranceType): string {
  return `${city.slug}-${insuranceType.slug}`;
}

export function getLocationInsurancePageUrl(citySlug: string, insuranceSlug: string): string {
  return `/location/${citySlug}/${insuranceSlug}`;
}

export function getAllLocationPages(): Array<{city: CityLocation, insurance: LocationInsuranceType, url: string}> {
  const pages: Array<{city: CityLocation, insurance: LocationInsuranceType, url: string}> = [];
  
  for (const city of allLocations) {
    for (const insurance of insuranceTypes) {
      pages.push({
        city,
        insurance,
        url: getLocationInsurancePageUrl(city.slug, insurance.slug)
      });
    }
  }
  
  return pages;
}

export function getLocationsByState(stateAbbr: string): CityLocation[] {
  return allLocations.filter(loc => loc.stateAbbr === stateAbbr);
}

export function getStates(): Array<{abbr: string, name: string}> {
  const statesMap = new Map<string, string>();
  allLocations.forEach(loc => {
    statesMap.set(loc.stateAbbr, loc.state);
  });
  return Array.from(statesMap.entries()).map(([abbr, name]) => ({ abbr, name }));
}
