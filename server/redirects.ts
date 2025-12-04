// External domain for location pages
export const LOCATION_DOMAIN = "https://casurance.net";

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
  
  // ===== CALIFORNIA CITY PAGES -> CASURANCE.NET LOCATION PAGES =====
  "/city": `${LOCATION_DOMAIN}/locations`,
  "/city/anaheim-general-liability-insurance": `${LOCATION_DOMAIN}/location/anaheim/general-liability`,
  "/city/anaheim-restaurant-insurance": `${LOCATION_DOMAIN}/location/anaheim/restaurant`,
  "/city/anaheim-workers-compensation-insurance": `${LOCATION_DOMAIN}/location/anaheim/workers-compensation`,
  "/city/dana-point-general-liability-insurance": `${LOCATION_DOMAIN}/location/dana-point/general-liability`,
  "/city/dana-point-restaurant-insurance": `${LOCATION_DOMAIN}/location/dana-point/restaurant`,
  "/city/dana-point-workers-compensation": `${LOCATION_DOMAIN}/location/dana-point/workers-compensation`,
  "/city/el-segundo-general-liability-insurance": `${LOCATION_DOMAIN}/location/el-segundo/general-liability`,
  "/city/el-segundo-restaurant-insurance": `${LOCATION_DOMAIN}/location/el-segundo/restaurant`,
  "/city/el-segundo-rideshare-insurance": `${LOCATION_DOMAIN}/location/el-segundo/rideshare`,
  "/city/el-segundo-workers-compensation": `${LOCATION_DOMAIN}/location/el-segundo/workers-compensation`,
  "/city/fremont-general-liability-insurance": `${LOCATION_DOMAIN}/location/fremont/general-liability`,
  "/city/fremont-restaurant-insurance": `${LOCATION_DOMAIN}/location/fremont/restaurant`,
  "/city/fremont-rideshare-insurance": `${LOCATION_DOMAIN}/location/fremont/rideshare`,
  "/city/fremont-workers-compensation-insurance": `${LOCATION_DOMAIN}/location/fremont/workers-compensation`,
  "/city/huntington-beach-general-liability": `${LOCATION_DOMAIN}/location/huntington-beach/general-liability`,
  "/city/huntington-beach-restaurant-insurance": `${LOCATION_DOMAIN}/location/huntington-beach/restaurant`,
  "/city/huntington-beach-workers-compensation": `${LOCATION_DOMAIN}/location/huntington-beach/workers-compensation`,
  "/city/laguna-beach-general-liability-insurance": `${LOCATION_DOMAIN}/location/laguna-beach/general-liability`,
  "/city/laguna-beach-restaurant-insurance": `${LOCATION_DOMAIN}/location/laguna-beach/restaurant`,
  "/city/laguna-beach-workers-compensation": `${LOCATION_DOMAIN}/location/laguna-beach/workers-compensation`,
  "/city/los-angeles-general-liability-insurance": `${LOCATION_DOMAIN}/location/los-angeles/general-liability`,
  "/city/los-angeles-restaurant-insurance": `${LOCATION_DOMAIN}/location/los-angeles/restaurant`,
  "/city/los-angeles-rideshare-insurance": `${LOCATION_DOMAIN}/location/los-angeles/rideshare`,
  "/city/los-angeles-workers-compensation": `${LOCATION_DOMAIN}/location/los-angeles/workers-compensation`,
  "/city/long-beach-general-liability-insurance": `${LOCATION_DOMAIN}/location/long-beach/general-liability`,
  "/city/long-beach-restaurant-insurance": `${LOCATION_DOMAIN}/location/long-beach/restaurant`,
  "/city/long-beach-workers-compensation": `${LOCATION_DOMAIN}/location/long-beach/workers-compensation`,
  "/city/manhattan-beach-general-liability": `${LOCATION_DOMAIN}/location/manhattan-beach/general-liability`,
  "/city/manhattan-beach-restaurant-insurance": `${LOCATION_DOMAIN}/location/manhattan-beach/restaurant`,
  "/city/manhattan-beach-rideshare-insurance": `${LOCATION_DOMAIN}/location/manhattan-beach/rideshare`,
  "/city/manhattan-beach-workers-compensation": `${LOCATION_DOMAIN}/location/manhattan-beach/workers-compensation`,
  "/city/mountain-view-general-liability": `${LOCATION_DOMAIN}/location/mountain-view/general-liability`,
  "/city/mountain-view-restaurant-insurance": `${LOCATION_DOMAIN}/location/mountain-view/restaurant`,
  "/city/mountain-view-workers-compensation": `${LOCATION_DOMAIN}/location/mountain-view/workers-compensation`,
  "/city/napa-general-liability-insurance": `${LOCATION_DOMAIN}/location/napa/general-liability`,
  "/city/napa-restaurant-insurance": `${LOCATION_DOMAIN}/location/napa/restaurant`,
  "/city/napa-workers-compensation-insurance": `${LOCATION_DOMAIN}/location/napa/workers-compensation`,
  "/city/newport-beach-general-liability": `${LOCATION_DOMAIN}/location/newport-beach/general-liability`,
  "/city/newport-beach-restaurant-insurance": `${LOCATION_DOMAIN}/location/newport-beach/restaurant`,
  "/city/newport-beach-workers-compensation": `${LOCATION_DOMAIN}/location/newport-beach/workers-compensation`,
  "/city/oakland-general-liability-insurance": `${LOCATION_DOMAIN}/location/oakland/general-liability`,
  "/city/oakland-restaurant-insurance": `${LOCATION_DOMAIN}/location/oakland/restaurant`,
  "/city/oakland-workers-compensation": `${LOCATION_DOMAIN}/location/oakland/workers-compensation`,
  "/city/palo-alto-general-liability": `${LOCATION_DOMAIN}/location/palo-alto/general-liability`,
  "/city/palo-alto-restaurant-insurance": `${LOCATION_DOMAIN}/location/palo-alto/restaurant`,
  "/city/palo-alto-rideshare-insurance": `${LOCATION_DOMAIN}/location/palo-alto/rideshare`,
  "/city/palo-alto-workers-compensation-insurance": `${LOCATION_DOMAIN}/location/palo-alto/workers-compensation`,
  "/city/pasadena-general-liability-insurance": `${LOCATION_DOMAIN}/location/pasadena/general-liability`,
  "/city/pasadena-restaurant-insurance": `${LOCATION_DOMAIN}/location/pasadena/restaurant`,
  "/city/pasadena-rideshare-insurance": `${LOCATION_DOMAIN}/location/pasadena/rideshare`,
  "/city/pasadena-workers-compensation-insurance": `${LOCATION_DOMAIN}/location/pasadena/workers-compensation`,
  "/city/redondo-beach-general-liability": `${LOCATION_DOMAIN}/location/redondo-beach/general-liability`,
  "/city/redondo-beach-restaurant-insurance": `${LOCATION_DOMAIN}/location/redondo-beach/restaurant`,
  "/city/redondo-beach-rideshare-insurance": `${LOCATION_DOMAIN}/location/redondo-beach/rideshare`,
  "/city/redondo-beach-workers-compensation": `${LOCATION_DOMAIN}/location/redondo-beach/workers-compensation`,
  "/city/redwood-city-general-liability-insurance": `${LOCATION_DOMAIN}/location/redwood-city/general-liability`,
  "/city/redwood-city-restaurant-insurance": `${LOCATION_DOMAIN}/location/redwood-city/restaurant`,
  "/city/redwood-city-rideshare-insurance": `${LOCATION_DOMAIN}/location/redwood-city/rideshare`,
  "/city/redwood-city-workers-compensation": `${LOCATION_DOMAIN}/location/redwood-city/workers-compensation`,
  "/city/sacramento-general-liability-insurance": `${LOCATION_DOMAIN}/location/sacramento/general-liability`,
  "/city/sacramento-restaurant-insurance": `${LOCATION_DOMAIN}/location/sacramento/restaurant`,
  "/city/sacramento-workers-compensation": `${LOCATION_DOMAIN}/location/sacramento/workers-compensation`,
  "/city/san-diego-general-liability-insurance": `${LOCATION_DOMAIN}/location/san-diego/general-liability`,
  "/city/san-diego-restaurant-insurance": `${LOCATION_DOMAIN}/location/san-diego/restaurant`,
  "/city/san-diego-workers-compensation": `${LOCATION_DOMAIN}/location/san-diego/workers-compensation`,
  "/city/san-francisco-general-liability": `${LOCATION_DOMAIN}/location/san-francisco/general-liability`,
  "/city/san-francisco-restaurant-insurance": `${LOCATION_DOMAIN}/location/san-francisco/restaurant`,
  "/city/san-francisco-rideshare-insurance": `${LOCATION_DOMAIN}/location/san-francisco/rideshare`,
  "/city/san-francisco-workers-compensation": `${LOCATION_DOMAIN}/location/san-francisco/workers-compensation`,
  "/city/san-jose-general-liability-insurance": `${LOCATION_DOMAIN}/location/san-jose/general-liability`,
  "/city/san-jose-restaurant-insurance": `${LOCATION_DOMAIN}/location/san-jose/restaurant`,
  "/city/san-jose-rideshare-insurance": `${LOCATION_DOMAIN}/location/san-jose/rideshare`,
  "/city/san-jose-workers-compensation-insurance": `${LOCATION_DOMAIN}/location/san-jose/workers-compensation`,
  "/city/san-mateo-general-liability-insurance": `${LOCATION_DOMAIN}/location/san-mateo/general-liability`,
  "/city/san-mateo-restaurant-insurance": `${LOCATION_DOMAIN}/location/san-mateo/restaurant`,
  "/city/san-mateo-workers-compensation-insurance": `${LOCATION_DOMAIN}/location/san-mateo/workers-compensation`,
  "/city/santa-monica-general-liability-insurance": `${LOCATION_DOMAIN}/location/santa-monica/general-liability`,
  "/city/santa-monica-restaurant-insurance": `${LOCATION_DOMAIN}/location/santa-monica/restaurant`,
  "/city/santa-monica-rideshare-insurance": `${LOCATION_DOMAIN}/location/santa-monica/rideshare`,
  "/city/santa-monica-workers-compensation": `${LOCATION_DOMAIN}/location/santa-monica/workers-compensation`,
  "/city/santa-rosa-general-liability-insurance": `${LOCATION_DOMAIN}/location/santa-rosa/general-liability`,
  "/city/santa-rosa-restaurant-insurance": `${LOCATION_DOMAIN}/location/santa-rosa/restaurant`,
  "/city/santa-rosa-workers-compensation": `${LOCATION_DOMAIN}/location/santa-rosa/workers-compensation`,
  "/city/torrance-general-liability-insurance": `${LOCATION_DOMAIN}/location/torrance/general-liability`,
  "/city/torrance-restaurant-insurance": `${LOCATION_DOMAIN}/location/torrance/restaurant`,
  "/city/torrance-rideshare-insurance": `${LOCATION_DOMAIN}/location/torrance/rideshare`,
  "/city/torrance-workers-compensation-insurance": `${LOCATION_DOMAIN}/location/torrance/workers-compensation`,
  "/city/woodland-hills-general-liability": `${LOCATION_DOMAIN}/location/woodland-hills/general-liability`,
  "/city/woodland-hills-restaurant-insurance": `${LOCATION_DOMAIN}/location/woodland-hills/restaurant`,
  "/city/woodland-hills-rideshare-insurance": `${LOCATION_DOMAIN}/location/woodland-hills/rideshare`,
  "/city/woodland-hills-workers-compensation": `${LOCATION_DOMAIN}/location/woodland-hills/workers-compensation`,
  "/city/irvine-general-liability-insurance": `${LOCATION_DOMAIN}/location/irvine/general-liability`,
  "/city/irvine-restaurant-insurance": `${LOCATION_DOMAIN}/location/irvine/restaurant`,
  "/city/irvine-workers-compensation": `${LOCATION_DOMAIN}/location/irvine/workers-compensation`,
  "/city/burbank-general-liability-insurance": `${LOCATION_DOMAIN}/location/burbank/general-liability`,
  "/city/burbank-restaurant-insurance": `${LOCATION_DOMAIN}/location/burbank/restaurant`,
  "/city/burbank-workers-compensation": `${LOCATION_DOMAIN}/location/burbank/workers-compensation`,
  "/city/glendale-general-liability-insurance": `${LOCATION_DOMAIN}/location/glendale/general-liability`,
  "/city/glendale-restaurant-insurance": `${LOCATION_DOMAIN}/location/glendale/restaurant`,
  "/city/glendale-workers-compensation": `${LOCATION_DOMAIN}/location/glendale/workers-compensation`,
  "/city/costa-mesa-general-liability-insurance": `${LOCATION_DOMAIN}/location/costa-mesa/general-liability`,
  "/city/costa-mesa-restaurant-insurance": `${LOCATION_DOMAIN}/location/costa-mesa/restaurant`,
  "/city/costa-mesa-workers-compensation": `${LOCATION_DOMAIN}/location/costa-mesa/workers-compensation`,
  
  // ===== NEVADA CITY PAGES -> CASURANCE.NET LOCATION PAGES =====
  "/nevada-Insurance-city-pages": `${LOCATION_DOMAIN}/locations`,
  "/nevada-Insurance-city-pages/henderson-nevada-general-liability-insurance": `${LOCATION_DOMAIN}/location/henderson/general-liability`,
  "/nevada-Insurance-city-pages/henderson-rideshare-insurance": `${LOCATION_DOMAIN}/location/henderson/rideshare`,
  "/nevada-Insurance-city-pages/henderson-nevada-restaurant-insurance": `${LOCATION_DOMAIN}/location/henderson/restaurant`,
  "/nevada-Insurance-city-pages/henderson-workers-compensation-insurance": `${LOCATION_DOMAIN}/location/henderson/workers-compensation`,
  "/nevada-Insurance-city-pages/las-vegas-general-liability-insurance": `${LOCATION_DOMAIN}/location/las-vegas/general-liability`,
  "/nevada-Insurance-city-pages/las-vegas-nevada-restaurant-insurance": `${LOCATION_DOMAIN}/location/las-vegas/restaurant`,
  "/nevada-Insurance-city-pages/las-vegas-rideshare-insurance": `${LOCATION_DOMAIN}/location/las-vegas/rideshare`,
  "/nevada-Insurance-city-pages/las-vegas-workers-compensation-insurance": `${LOCATION_DOMAIN}/location/las-vegas/workers-compensation`,
  "/nevada-Insurance-city-pages/mesquite-general-liability-insurance": `${LOCATION_DOMAIN}/location/mesquite/general-liability`,
  "/nevada-Insurance-city-pages/mesquite-nevada-restaurant-insurance": `${LOCATION_DOMAIN}/location/mesquite/restaurant`,
  "/nevada-Insurance-city-pages/mesquite-rideshare-insurance": `${LOCATION_DOMAIN}/location/mesquite/rideshare`,
  "/nevada-Insurance-city-pages/mesquite-workers-compensation": `${LOCATION_DOMAIN}/location/mesquite/workers-compensation`,
  "/nevada-Insurance-city-pages/north-las-vegas-general-liability": `${LOCATION_DOMAIN}/location/north-las-vegas/general-liability`,
  "/nevada-Insurance-city-pages/north-las-vegas-nevada-restaurant": `${LOCATION_DOMAIN}/location/north-las-vegas/restaurant`,
  "/nevada-Insurance-city-pages/north-las-vegas-rideshare-insurance": `${LOCATION_DOMAIN}/location/north-las-vegas/rideshare`,
  "/nevada-Insurance-city-pages/north-las-vegas-workers-compensation-insurance": `${LOCATION_DOMAIN}/location/north-las-vegas/workers-compensation`,
  "/nevada-Insurance-city-pages/reno-general-liability-insurance": `${LOCATION_DOMAIN}/location/reno/general-liability`,
  "/nevada-Insurance-city-pages/reno-nevada-restaurant-insurance": `${LOCATION_DOMAIN}/location/reno/restaurant`,
  "/nevada-Insurance-city-pages/reno-rideshare-insurance": `${LOCATION_DOMAIN}/location/reno/rideshare`,
  "/nevada-Insurance-city-pages/reno-workers-compensation-insurance": `${LOCATION_DOMAIN}/location/reno/workers-compensation`,
  "/nevada-Insurance-city-pages/sparks-general-liability-insurance": `${LOCATION_DOMAIN}/location/sparks/general-liability`,
  "/nevada-Insurance-city-pages/sparks-restaurant-insurance": `${LOCATION_DOMAIN}/location/sparks/restaurant`,
  "/nevada-Insurance-city-pages/sparks-workers-compensation": `${LOCATION_DOMAIN}/location/sparks/workers-compensation`,
  "/nevada-Insurance-city-pages/boulder-city-general-liability-insurance": `${LOCATION_DOMAIN}/location/boulder-city/general-liability`,
  "/nevada-Insurance-city-pages/boulder-city-restaurant-insurance": `${LOCATION_DOMAIN}/location/boulder-city/restaurant`,
  "/nevada-Insurance-city-pages/boulder-city-workers-compensation": `${LOCATION_DOMAIN}/location/boulder-city/workers-compensation`,
  "/nevada-Insurance-city-pages/carson-city-general-liability-insurance": `${LOCATION_DOMAIN}/location/carson-city/general-liability`,
  "/nevada-Insurance-city-pages/carson-city-restaurant-insurance": `${LOCATION_DOMAIN}/location/carson-city/restaurant`,
  "/nevada-Insurance-city-pages/carson-city-workers-compensation": `${LOCATION_DOMAIN}/location/carson-city/workers-compensation`,

  // ===== INTERNAL LOCATION ROUTES -> CASURANCE.NET =====
  "/locations": `${LOCATION_DOMAIN}/locations`,
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
  
  // Redirect /locations and /location/* routes to casurance.net
  if (normalized === '/locations') {
    return `${LOCATION_DOMAIN}/locations`;
  }
  
  if (normalized.startsWith('/location/')) {
    return `${LOCATION_DOMAIN}${normalized}`;
  }
  
  if (normalized.startsWith('/city/')) {
    const cityMatch = normalized.match(/\/city\/([a-z-]+)-/);
    const citySlug = cityMatch ? cityMatch[1] : null;
    if (citySlug) {
      if (normalized.includes('general-liability')) return `${LOCATION_DOMAIN}/location/${citySlug}/general-liability`;
      if (normalized.includes('restaurant')) return `${LOCATION_DOMAIN}/location/${citySlug}/restaurant`;
      if (normalized.includes('workers-comp')) return `${LOCATION_DOMAIN}/location/${citySlug}/workers-compensation`;
      if (normalized.includes('rideshare')) return `${LOCATION_DOMAIN}/location/${citySlug}/rideshare`;
      if (normalized.includes('trucking')) return `${LOCATION_DOMAIN}/location/${citySlug}/trucking`;
      if (normalized.includes('commercial-auto')) return `${LOCATION_DOMAIN}/location/${citySlug}/commercial-auto`;
      if (normalized.includes('commercial-property')) return `${LOCATION_DOMAIN}/location/${citySlug}/commercial-property`;
      return `${LOCATION_DOMAIN}/location/${citySlug}/general-liability`;
    }
    return `${LOCATION_DOMAIN}/locations`;
  }
  
  if (normalized.startsWith('/nevada-insurance-city-pages/')) {
    const cityMatch = normalized.match(/\/nevada-insurance-city-pages\/([a-z-]+)-/);
    const citySlug = cityMatch ? cityMatch[1] : null;
    if (citySlug) {
      if (normalized.includes('general-liability')) return `${LOCATION_DOMAIN}/location/${citySlug}/general-liability`;
      if (normalized.includes('restaurant')) return `${LOCATION_DOMAIN}/location/${citySlug}/restaurant`;
      if (normalized.includes('workers-comp')) return `${LOCATION_DOMAIN}/location/${citySlug}/workers-compensation`;
      if (normalized.includes('rideshare')) return `${LOCATION_DOMAIN}/location/${citySlug}/rideshare`;
      if (normalized.includes('trucking')) return `${LOCATION_DOMAIN}/location/${citySlug}/trucking`;
      if (normalized.includes('commercial-auto')) return `${LOCATION_DOMAIN}/location/${citySlug}/commercial-auto`;
      if (normalized.includes('commercial-property')) return `${LOCATION_DOMAIN}/location/${citySlug}/commercial-property`;
      return `${LOCATION_DOMAIN}/location/${citySlug}/general-liability`;
    }
    return `${LOCATION_DOMAIN}/locations`;
  }
  
  if (normalized.startsWith('/business-insurance/')) {
    return '/coverages';
  }
  
  if (normalized.startsWith('/personal-insurance/')) {
    return '/coverages';
  }
  
  return null;
}
