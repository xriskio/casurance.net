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
  }
];

export const californiaLocations: CityLocation[] = [
  { slug: "anaheim", name: "Anaheim", state: "California", stateAbbr: "CA", region: "Orange County", population: "350,000+", businessHighlights: ["Tourism", "Entertainment", "Hospitality"] },
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
