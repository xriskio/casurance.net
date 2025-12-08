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

export const allLocations = [...californiaLocations, ...nevadaLocations];

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
