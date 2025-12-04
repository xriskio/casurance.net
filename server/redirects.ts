export const redirectMap: Record<string, string> = {
  // ===== CORE PAGES =====
  "/about": "/about",
  "/customer-support": "/contact",
  "/online-insurance-quotes": "/quote",
  
  // ===== BUSINESS INSURANCE -> COVERAGE/QUOTE PAGES =====
  "/business-insurance": "/coverages",
  "/business-insurance/liability-insurance": "/coverage/general-liability",
  "/business-insurance/workers-comp-insurance": "/coverage/workers-compensation",
  "/business-insurance/commercial-auto-insurance": "/coverage/commercial-auto",
  "/business-insurance/commercial-property-insurance": "/coverage/commercial-property",
  "/business-insurance/restaurant-insurance": "/industry/hospitality",
  "/business-insurance/trucking-insurance": "/coverage/transportation",
  "/business-insurance/limo-insurance": "/quote/limousine",
  "/business-insurance/cyber-liability-insurance": "/coverage/cyber-liability",
  "/business-insurance/cyber-liability": "/coverage/cyber-liability",
  "/business-insurance/directors-officers-insurance": "/coverage/directors-officers",
  "/business-insurance/epli-insurance": "/coverage/employment-practices",
  "/business-insurance/errors-omissions-insurance": "/coverage/professional-liability",
  "/business-insurance/professional-liability-insurance": "/coverage/professional-liability",
  "/business-insurance/business-owners-policy": "/coverage/business-owners-policy",
  "/business-insurance/commercial-umbrella-insurance": "/coverage/excess-casualty",
  "/business-insurance/builders-risk-insurance": "/quote/builders-risk",
  "/business-insurance/contractors-insurance": "/industry/construction",
  "/business-insurance/bond-insurance": "/coverage/surety-bonds",
  "/business-insurance/church-insurance": "/industry/religious-organizations",
  "/business-insurance/hotel-insurance": "/quote/hotel",
  "/business-insurance/apartment-building-insurance": "/coverage/apartments",
  "/business-insurance/apartment-building": "/coverage/apartments",
  "/business-insurance/condo-assoc-owners-insurance": "/coverage/condominiums",
  "/business-insurance/farm-insurance": "/industry/agribusiness-industry",
  "/business-insurance/crop-insurance": "/industry/agribusiness-industry",
  "/business-insurance/agri-business": "/industry/agribusiness-industry",
  "/business-insurance/oil-gas": "/coverage/energy",
  "/business-insurance/cannabis-insurance": "/industry/cannabis",
  "/business-insurance/inland-marine-insurance": "/coverage/inland-marine",
  "/business-insurance/jewelers-insurance": "/coverage/specialty-casualty",
  "/business-insurance/equine-insurance": "/industry/agribusiness-industry",
  "/business-insurance/nonprofit-insurance": "/industry/nonprofit",
  "/business-insurance/outdoor-insurance": "/coverage/special-events",
  "/business-insurance/special-event-insurance": "/coverage/special-events",
  "/business-insurance/videographer-insurance": "/industry/entertainment-industry",
  "/business-insurance/woodworkers-insurance": "/industry/manufacturing",
  "/business-insurance/retail-store-insurance": "/industry/retail",
  "/business-insurance/self-storage": "/industry/public-self-storage",
  "/business-insurance/auto-dealership": "/industry/franchised-dealers",
  "/business-insurance/auto-dealership-insurance": "/industry/franchised-dealers",
  "/business-insurance/auto-body-shop": "/industry/garage-service-centers",
  "/business-insurance/auto-body-shop-insurance": "/industry/garage-service-centers",
  "/business-insurance/commercial-building": "/coverage/commercial-property",
  "/business-insurance/group-health-insurance": "/coverage/accident-health",
  "/business-insurance/group-dental-insurance": "/coverage/accident-health",
  "/business-insurance/group-life-insurance": "/coverage/accident-health",
  "/business-insurance/group-vision-insurance": "/coverage/accident-health",
  "/business-insurance/benefits-insurance": "/coverage/accident-health",
  "/business-insurance/entertainment": "/industry/entertainment-industry",
  "/business-insurance/celebrities-and-entertainers": "/industry/entertainment-industry",
  "/business-insurance/contingency": "/coverage/special-events",
  "/business-insurance/specialty-lines": "/coverages",
  
  // ===== PERSONAL INSURANCE -> COVERAGE PAGES =====
  "/personal-insurance": "/coverages",
  "/personal-insurance/car-insurance": "/coverage/commercial-auto",
  "/personal-insurance/home-insurance": "/coverage/high-value-homeowners",
  "/personal-insurance/earthquake-insurance": "/coverage/commercial-earthquake",
  "/personal-insurance/flood-insurance": "/coverage/flood-coverage",
  "/personal-insurance/collector-car-insurance": "/coverage/antique-auto-collector",
  "/personal-insurance/individual-life-insurance": "/coverage/accident-health",
  "/personal-insurance/long-term-care": "/coverage/accident-health",
  "/personal-insurance/wedding-insurance": "/coverage/special-events",
  "/personal-insurance/landlord-insurance": "/coverage/apartments",
  
  // ===== CALIFORNIA CITY PAGES -> RELEVANT COVERAGE/QUOTE =====
  "/city": "/coverages",
  "/city/anaheim-general-liability-insurance": "/coverage/general-liability",
  "/city/anaheim-restaurant-insurance": "/quote/restaurant",
  "/city/anaheim-workers-compensation-insurance": "/coverage/workers-compensation",
  "/city/dana-point-general-liability-insurance": "/coverage/general-liability",
  "/city/dana-point-restaurant-insurance": "/quote/restaurant",
  "/city/dana-point-workers-compensation": "/coverage/workers-compensation",
  "/city/el-segundo-general-liability-insurance": "/coverage/general-liability",
  "/city/el-segundo-restaurant-insurance": "/quote/restaurant",
  "/city/el-segundo-rideshare-insurance": "/quote/tnc",
  "/city/el-segundo-workers-compensation": "/coverage/workers-compensation",
  "/city/fremont-general-liability-insurance": "/coverage/general-liability",
  "/city/fremont-restaurant-insurance": "/quote/restaurant",
  "/city/fremont-rideshare-insurance": "/quote/tnc",
  "/city/fremont-workers-compensation-insurance": "/coverage/workers-compensation",
  "/city/huntington-beach-general-liability": "/coverage/general-liability",
  "/city/huntington-beach-restaurant-insurance": "/quote/restaurant",
  "/city/huntington-beach-workers-compensation": "/coverage/workers-compensation",
  "/city/laguna-beach-general-liability-insurance": "/coverage/general-liability",
  "/city/laguna-beach-restaurant-insurance": "/quote/restaurant",
  "/city/laguna-beach-workers-compensation": "/coverage/workers-compensation",
  "/city/manhattan-beach-general-liability": "/coverage/general-liability",
  "/city/manhattan-beach-restaurant-insurance": "/quote/restaurant",
  "/city/manhattan-beach-rideshare-insurance": "/quote/tnc",
  "/city/manhattan-beach-workers-compensation": "/coverage/workers-compensation",
  "/city/mountain-view-general-liability": "/coverage/general-liability",
  "/city/mountain-view-restaurant-insurance": "/quote/restaurant",
  "/city/mountain-view-workers-compensation": "/coverage/workers-compensation",
  "/city/napa-general-liability-insurance": "/coverage/general-liability",
  "/city/napa-restaurant-insurance": "/quote/restaurant",
  "/city/napa-workers-compensation-insurance": "/coverage/workers-compensation",
  "/city/newport-beach-general-liability": "/coverage/general-liability",
  "/city/newport-beach-restaurant-insurance": "/quote/restaurant",
  "/city/newport-beach-workers-compensation": "/coverage/workers-compensation",
  "/city/palo-alto-general-liability": "/coverage/general-liability",
  "/city/palo-alto-restaurant-insurance": "/quote/restaurant",
  "/city/palo-alto-rideshare-insurance": "/quote/tnc",
  "/city/palo-alto-workers-compensation-insurance": "/coverage/workers-compensation",
  "/city/pasadena-general-liability-insurance": "/coverage/general-liability",
  "/city/pasadena-restaurant-insurance": "/quote/restaurant",
  "/city/pasadena-rideshare-insurance": "/quote/tnc",
  "/city/pasadena-workers-compensation-insurance": "/coverage/workers-compensation",
  "/city/redondo-beach-general-liability": "/coverage/general-liability",
  "/city/redondo-beach-restaurant-insurance": "/quote/restaurant",
  "/city/redondo-beach-rideshare-insurance": "/quote/tnc",
  "/city/redondo-beach-workers-compensation": "/coverage/workers-compensation",
  "/city/redwood-city-general-liability-insurance": "/coverage/general-liability",
  "/city/redwood-city-restaurant-insurance": "/quote/restaurant",
  "/city/redwood-city-rideshare-insurance": "/quote/tnc",
  "/city/redwood-city-workers-compensation": "/coverage/workers-compensation",
  "/city/sacramento-general-liability-insurance": "/coverage/general-liability",
  "/city/sacramento-restaurant-insurance": "/quote/restaurant",
  "/city/sacramento-workers-compensation": "/coverage/workers-compensation",
  "/city/san-francisco-general-liability": "/coverage/general-liability",
  "/city/san-francisco-restaurant-insurance": "/quote/restaurant",
  "/city/san-francisco-rideshare-insurance": "/quote/tnc",
  "/city/san-francisco-workers-compensation": "/coverage/workers-compensation",
  "/city/san-jose-general-liability-insurance": "/coverage/general-liability",
  "/city/san-jose-restaurant-insurance": "/quote/restaurant",
  "/city/san-jose-rideshare-insurance": "/quote/tnc",
  "/city/san-jose-workers-compensation-insurance": "/coverage/workers-compensation",
  "/city/san-mateo-general-liability-insurance": "/coverage/general-liability",
  "/city/san-mateo-restaurant-insurance": "/quote/restaurant",
  "/city/san-mateo-workers-compensation-insurance": "/coverage/workers-compensation",
  "/city/santa-monica-general-liability-insurance": "/coverage/general-liability",
  "/city/santa-monica-restaurant-insurance": "/quote/restaurant",
  "/city/santa-monica-rideshare-insurance": "/quote/tnc",
  "/city/santa-monica-workers-compensation": "/coverage/workers-compensation",
  "/city/santa-rosa-general-liability-insurance": "/coverage/general-liability",
  "/city/santa-rosa-restaurant-insurance": "/quote/restaurant",
  "/city/santa-rosa-workers-compensation": "/coverage/workers-compensation",
  "/city/torrance-general-liability-insurance": "/coverage/general-liability",
  "/city/torrance-restaurant-insurance": "/quote/restaurant",
  "/city/torrance-rideshare-insurance": "/quote/tnc",
  "/city/torrance-workers-compensation-insurance": "/coverage/workers-compensation",
  "/city/woodland-hills-general-liability": "/coverage/general-liability",
  "/city/woodland-hills-restaurant-insurance": "/quote/restaurant",
  "/city/woodland-hills-rideshare-insurance": "/quote/tnc",
  "/city/woodland-hills-workers-compensation": "/coverage/workers-compensation",
  
  // ===== NEVADA CITY PAGES -> RELEVANT COVERAGE/QUOTE =====
  "/nevada-Insurance-city-pages": "/coverages",
  "/nevada-Insurance-city-pages/henderson-nevada-general-liability-insurance": "/coverage/general-liability",
  "/nevada-Insurance-city-pages/henderson-rideshare-insurance": "/quote/tnc",
  "/nevada-Insurance-city-pages/henderson-nevada-restaurant-insurance": "/quote/restaurant",
  "/nevada-Insurance-city-pages/henderson-workers-compensation-insurance": "/coverage/workers-compensation",
  "/nevada-Insurance-city-pages/las-vegas-general-liability-insurance": "/coverage/general-liability",
  "/nevada-Insurance-city-pages/las-vegas-nevada-restaurant-insurance": "/quote/restaurant",
  "/nevada-Insurance-city-pages/las-vegas-rideshare-insurance": "/quote/tnc",
  "/nevada-Insurance-city-pages/las-vegas-workers-compensation-insurance": "/coverage/workers-compensation",
  "/nevada-Insurance-city-pages/mesquite-general-liability-insurance": "/coverage/general-liability",
  "/nevada-Insurance-city-pages/mesquite-nevada-restaurant-insurance": "/quote/restaurant",
  "/nevada-Insurance-city-pages/mesquite-rideshare-insurance": "/quote/tnc",
  "/nevada-Insurance-city-pages/mesquite-workers-compensation": "/coverage/workers-compensation",
  "/nevada-Insurance-city-pages/north-las-vegas-general-liability": "/coverage/general-liability",
  "/nevada-Insurance-city-pages/north-las-vegas-nevada-restaurant": "/quote/restaurant",
  "/nevada-Insurance-city-pages/north-las-vegas-rideshare-insurance": "/quote/tnc",
  "/nevada-Insurance-city-pages/north-las-vegas-workers-compensation-insurance": "/coverage/workers-compensation",
  "/nevada-Insurance-city-pages/reno-general-liability-insurance": "/coverage/general-liability",
  "/nevada-Insurance-city-pages/reno-nevada-restaurant-insurance": "/quote/restaurant",
  "/nevada-Insurance-city-pages/reno-rideshare-insurance": "/quote/tnc",
  "/nevada-Insurance-city-pages/reno-workers-compensation-insurance": "/coverage/workers-compensation",
};

export function normalizeUrl(url: string): string {
  let normalized = url.toLowerCase();
  if (normalized.endsWith('/') && normalized.length > 1) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
}

export function getRedirectUrl(path: string): string | null {
  const normalized = normalizeUrl(path);
  
  if (redirectMap[normalized]) {
    return redirectMap[normalized];
  }
  
  for (const [oldPath, newPath] of Object.entries(redirectMap)) {
    if (normalizeUrl(oldPath) === normalized) {
      return newPath;
    }
  }
  
  if (normalized.startsWith('/city/')) {
    if (normalized.includes('general-liability')) return '/coverage/general-liability';
    if (normalized.includes('restaurant')) return '/quote/restaurant';
    if (normalized.includes('workers-comp')) return '/coverage/workers-compensation';
    if (normalized.includes('rideshare')) return '/quote/tnc';
    return '/coverages';
  }
  
  if (normalized.startsWith('/nevada-insurance-city-pages/')) {
    if (normalized.includes('general-liability')) return '/coverage/general-liability';
    if (normalized.includes('restaurant')) return '/quote/restaurant';
    if (normalized.includes('workers-comp')) return '/coverage/workers-compensation';
    if (normalized.includes('rideshare')) return '/quote/tnc';
    return '/coverages';
  }
  
  if (normalized.startsWith('/business-insurance/')) {
    return '/coverages';
  }
  
  if (normalized.startsWith('/personal-insurance/')) {
    return '/coverages';
  }
  
  return null;
}
