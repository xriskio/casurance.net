const INDEXNOW_KEY = process.env.INDEXNOW_API_KEY || "78eb96aa6f124ceb81a5fbaf32694bd0";
const BING_API_KEY = process.env.BING_WEBMASTER_API_KEY || "";
const HOST = "www.casurance.net";
const SITE_URL = `https://${HOST}`;
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

const ALL_SITE_URLS = [
  "/",
  "/about",
  "/contact",
  "/quote",
  "/quote/thank-you",
  "/service-request",
  "/coverages",
  "/industries",
  "/blog",
  "/press-releases",
  "/get-quote",
  "/workers-comp-california-nevada",
  "/personal-lines",
  "/locations",
  "/middle-market",
  "/builders-risk-insurance",
  "/liquor-store-insurance",
  "/auto-services-insurance",
  "/geico-commercial-auto",
  "/geico-private-passenger",
  "/bristol-west-commercial-auto",
  "/bristol-west-private-passenger",
  "/berkshire-hathaway-commercial-auto",
  "/uber-black-insurance",
  "/industry/auto-services",
  
  "/coverage/commercial-auto",
  "/coverage/general-liability",
  "/coverage/workers-compensation",
  "/coverage/commercial-property",
  "/coverage/builders-risk",
  "/coverage/professional-liability",
  "/coverage/cyber-liability",
  "/coverage/employment-practices",
  "/coverage/habitational",
  "/coverage/hotel-motel",
  "/coverage/restaurant",
  "/coverage/trucking",
  "/coverage/ocean-cargo",
  "/coverage/self-storage",
  "/coverage/film-production",
  "/coverage/product-liability",
  "/coverage/security-services",
  "/coverage/vacant-building",
  "/coverage/crane-riggers",
  "/coverage/commercial-flood",
  "/coverage/commercial-earthquake",
  "/coverage/violent-attack",
  "/coverage/religious-organization",
  "/coverage/uber-black-insurance",
  
  "/industry/golf-country-club",
  "/industry/auto-dealer-garage",
  "/industry/franchised-dealers",
  "/industry/garage-service-centers",
  "/industry/public-transportation",
  "/industry/public-self-storage",
  "/industry/nemt-paratransit",
  "/industry/limousine-transportation",
  
  "/quote/commercial-auto",
  "/quote/general-liability",
  "/quote/workers-compensation",
  "/quote/commercial-property",
  "/quote/builders-risk",
  "/quote/professional-liability",
  "/quote/habitational",
  "/quote/office-building",
  "/quote/hotel",
  "/quote/restaurant",
  "/quote/trucking",
  "/quote/golf-country-club",
  "/quote/personal-lines",
  "/quote/cyber-liability",
  "/quote/employment-practices",
  "/quote/ocean-cargo",
  "/quote/self-storage",
  "/quote/film-production",
  "/quote/product-liability",
  "/quote/security-services",
  "/quote/vacant-building",
  "/quote/crane-riggers",
  "/quote/religious-organization",
  "/quote/construction-casualty",
  "/quote/limousine",
  "/quote/public-transportation",
  "/quote/taxi",
  "/quote/tnc",
  "/quote/shared-economy",
  "/quote/high-value-home",
  "/quote/commercial-flood",
  "/quote/commercial-earthquake",
  "/quote/franchised-dealers",
  "/quote/garage-service-centers",
  "/quote/auto-dealer-garage",
  "/quote/violent-attack",
  
  "/apply/nemt",
  "/apply/ambulance",
  "/apply/tnc-rideshare",
  
  "/lp/workers-comp",
  "/lp/workers-compensation",
  "/lp/commercial-insurance",
  "/lp/insurance",
  
  "/location/california/los-angeles",
  "/location/california/san-francisco",
  "/location/california/san-diego",
  "/location/california/san-jose",
  "/location/california/fresno",
  "/location/california/sacramento",
  "/location/california/long-beach",
  "/location/california/oakland",
  "/location/california/bakersfield",
  "/location/california/anaheim",
  "/location/california/santa-ana",
  "/location/california/riverside",
  "/location/california/stockton",
  "/location/california/irvine",
  "/location/california/chula-vista",
  "/location/california/fremont",
  "/location/california/modesto",
  "/location/california/fontana",
  "/location/california/moreno-valley",
  "/location/california/glendale",
  "/location/california/huntington-beach",
  "/location/california/santa-clarita",
  "/location/california/garden-grove",
  "/location/california/oceanside",
  "/location/california/rancho-cucamonga",
  "/location/california/ontario",
  "/location/california/santa-rosa",
  "/location/california/elk-grove",
  "/location/california/corona",
  "/location/california/lancaster",
  "/location/california/palmdale",
  "/location/california/salinas",
  "/location/california/pomona",
  "/location/california/escondido",
  "/location/california/torrance",
  "/location/california/pasadena",
  "/location/california/orange",
  "/location/california/fullerton",
  "/location/california/thousand-oaks",
  "/location/california/roseville",
  "/location/california/concord",
  "/location/california/simi-valley",
  "/location/california/santa-clara",
  "/location/california/victorville",
  "/location/california/vallejo",
  "/location/california/berkeley",
  "/location/california/el-monte",
  "/location/california/downey",
  "/location/california/costa-mesa",
  "/location/california/inglewood",
  "/location/california/carlsbad",
  "/location/california/san-buenaventura",
  "/location/california/fairfield",
  "/location/california/west-covina",
  "/location/california/murrieta",
  "/location/california/richmond",
  "/location/california/norwalk",
  "/location/california/antioch",
  "/location/california/temecula",
  "/location/california/burbank",
  "/location/california/daly-city",
  "/location/california/rialto",
  "/location/california/el-cajon",
  "/location/california/san-mateo",
  "/location/california/clovis",
  "/location/california/compton",
  "/location/california/jurupa-valley",
  "/location/california/vista",
  "/location/california/south-gate",
  "/location/california/mission-viejo",
  "/location/california/vacaville",
  "/location/california/carson",
  "/location/california/hesperia",
  "/location/california/santa-maria",
  "/location/california/redding",
  "/location/california/westminster",
  "/location/california/santa-barbara",
  "/location/california/chico",
  "/location/california/newport-beach",
  "/location/california/san-leandro",
  "/location/california/san-marcos",
  "/location/california/whittier",
  "/location/california/hawthorne",
  "/location/california/citrus-heights",
  "/location/california/alhambra",
  "/location/california/tracy",
  "/location/california/livermore",
  "/location/california/buena-park",
  "/location/california/menifee",
  "/location/california/hemet",
  "/location/california/lakewood",
  "/location/california/merced",
  "/location/california/chino",
  "/location/california/indio",
  "/location/california/redwood-city",
  "/location/california/lake-forest",
  "/location/california/napa",
  "/location/california/tustin",
  "/location/california/bellflower",
  "/location/california/mountain-view",
  "/location/california/chino-hills",
  "/location/california/baldwin-park",
  "/location/california/alameda",
  "/location/california/upland",
  "/location/california/san-ramon",
  "/location/california/folsom",
  "/location/california/pleasanton",
  "/location/california/lynwood",
  "/location/california/union-city",
  "/location/california/apple-valley",
  "/location/california/redlands",
  "/location/california/turlock",
  "/location/california/perris",
  "/location/california/manteca",
  "/location/california/milpitas",
  "/location/california/redondo-beach",
  "/location/california/davis",
  "/location/california/camarillo",
  "/location/california/yuba-city",
  "/location/california/rancho-cordova",
  "/location/california/palo-alto",
  "/location/california/yorba-linda",
  "/location/california/walnut-creek",
  "/location/california/south-san-francisco",
  "/location/california/san-clemente",
  "/location/california/pittsburg",
  "/location/california/montebello",
  "/location/california/pico-rivera",
  "/location/california/santa-cruz",
  "/location/california/la-habra",
  "/location/california/encinitas",
  "/location/california/tulare",
  "/location/california/monterey-park",
  "/location/california/lodi",
  "/location/california/madera",
  "/location/california/santa-monica",
  "/location/california/la-mesa",
  "/location/california/gilroy",
  "/location/california/national-city",
  "/location/california/san-rafael",
  "/location/california/lake-elsinore",
  "/location/california/la-mirada",
  "/location/california/highland",
  "/location/california/glendora",
  "/location/california/diamond-bar",
  "/location/california/rowland-heights",
  "/location/california/novato",
  "/location/california/brentwood",
  "/location/california/colton",
  "/location/california/cathedral-city",
  "/location/california/delano",
  "/location/california/yucaipa",
  "/location/california/azusa",
  "/location/california/san-luis-obispo",
  "/location/california/cerritos",
  "/location/california/ceres",
  "/location/california/palm-desert",
  "/location/california/cypress",
  "/location/california/covina",
  "/location/california/beaumont",
  "/location/california/cupertino",
  "/location/california/gardena",
  "/location/california/petaluma",
  "/location/california/paramount",
  "/location/california/rocklin",
  "/location/california/porterville",
  "/location/california/santee",
  "/location/california/eastvale",
  "/location/california/rosemead",
  "/location/california/hanford",
  "/location/california/bell-gardens",
  "/location/california/arcadia",
  "/location/california/san-jacinto",
  "/location/california/fountain-valley",
  "/location/california/palm-springs",
  "/location/california/woodland",
  "/location/california/dublin",
  "/location/california/la-quinta",
  "/location/california/brea",
  "/location/california/la-puente",
  "/location/california/west-sacramento",
  "/location/california/morgan-hill",
  "/location/california/san-bruno",
  "/location/california/campbell",
  "/location/california/coachella",
  "/location/california/monrovia",
  "/location/california/lincoln",
  "/location/california/culver-city",
  "/location/california/stanton",
  "/location/california/la-verne",
  "/location/california/watsonville",
  "/location/california/oakley",
  "/location/california/martinez",
  "/location/california/san-gabriel",
  "/location/california/lompoc",
  "/location/california/danville",
  "/location/california/temple-city",
  
  "/location/nevada/las-vegas",
  "/location/nevada/henderson",
  "/location/nevada/reno",
  "/location/nevada/north-las-vegas",
  "/location/nevada/sparks",
  "/location/nevada/carson-city",
  "/location/nevada/fernley",
  "/location/nevada/elko",
  "/location/nevada/mesquite",
  "/location/nevada/boulder-city",
  "/location/nevada/fallon",
  "/location/nevada/winnemucca",
  "/location/nevada/west-wendover",
  "/location/nevada/ely",
  "/location/nevada/yerington",
  "/location/nevada/carlin",
  "/location/nevada/lovelock",
  "/location/nevada/wells",
  "/location/nevada/caliente",
  
  // Location + Coverage combination pages (California cities)
  "/location/downtown-los-angeles/general-liability",
  "/location/downtown-los-angeles/workers-compensation",
  "/location/downtown-los-angeles/commercial-auto",
  "/location/downtown-los-angeles/commercial-property",
  "/location/downtown-los-angeles/apartments",
  "/location/downtown-los-angeles/habitational",
  "/location/downtown-los-angeles/condominiums",
  "/location/downtown-los-angeles/high-value-home",
  "/location/downtown-los-angeles/wildfire-brush-area",
  "/location/downtown-los-angeles/self-storage",
  "/location/downtown-los-angeles/real-estate",
  "/location/downtown-los-angeles/high-rise-building",
  
  "/location/san-francisco/general-liability",
  "/location/san-francisco/workers-compensation",
  "/location/san-francisco/commercial-auto",
  "/location/san-francisco/commercial-property",
  "/location/san-francisco/apartments",
  "/location/san-francisco/habitational",
  "/location/san-francisco/condominiums",
  "/location/san-francisco/high-value-home",
  "/location/san-francisco/wildfire-brush-area",
  "/location/san-francisco/self-storage",
  "/location/san-francisco/real-estate",
  "/location/san-francisco/high-rise-building",
  "/location/san-francisco/bristol-west-commercial",
  "/location/san-francisco/bristol-west-personal",
  "/location/san-francisco/berkshire-hathaway-commercial",
  
  "/location/san-jose/general-liability",
  "/location/san-jose/workers-compensation",
  "/location/san-jose/commercial-auto",
  "/location/san-jose/commercial-property",
  "/location/san-jose/apartments",
  "/location/san-jose/habitational",
  "/location/san-jose/condominiums",
  "/location/san-jose/high-value-home",
  "/location/san-jose/wildfire-brush-area",
  "/location/san-jose/self-storage",
  "/location/san-jose/real-estate",
  "/location/san-jose/high-rise-building",
  
  "/location/sacramento/general-liability",
  "/location/sacramento/workers-compensation",
  "/location/sacramento/commercial-auto",
  "/location/sacramento/commercial-property",
  "/location/sacramento/apartments",
  "/location/sacramento/habitational",
  "/location/sacramento/condominiums",
  "/location/sacramento/high-value-home",
  "/location/sacramento/wildfire-brush-area",
  "/location/sacramento/self-storage",
  "/location/sacramento/real-estate",
  "/location/sacramento/high-rise-building",
  
  "/location/san-diego/general-liability",
  "/location/san-diego/workers-compensation",
  "/location/san-diego/commercial-auto",
  "/location/san-diego/commercial-property",
  "/location/san-diego/apartments",
  "/location/san-diego/habitational",
  "/location/san-diego/condominiums",
  "/location/san-diego/high-value-home",
  "/location/san-diego/wildfire-brush-area",
  "/location/san-diego/self-storage",
  "/location/san-diego/real-estate",
  "/location/san-diego/high-rise-building",
  
  "/location/los-angeles/general-liability",
  "/location/los-angeles/workers-compensation",
  "/location/los-angeles/commercial-auto",
  "/location/los-angeles/commercial-property",
  "/location/los-angeles/apartments",
  "/location/los-angeles/habitational",
  "/location/los-angeles/condominiums",
  "/location/los-angeles/high-value-home",
  "/location/los-angeles/wildfire-brush-area",
  "/location/los-angeles/self-storage",
  "/location/los-angeles/real-estate",
  "/location/los-angeles/bristol-west-commercial",
  "/location/los-angeles/bristol-west-personal",
  "/location/los-angeles/berkshire-hathaway-commercial",
  
  "/location/beverly-hills/general-liability",
  "/location/beverly-hills/commercial-property",
  "/location/beverly-hills/high-value-home",
  "/location/beverly-hills/real-estate",
  "/location/beverly-hills/apartments",
  "/location/beverly-hills/condominiums",
  
  "/location/palo-alto/general-liability",
  "/location/palo-alto/professional-liability",
  "/location/palo-alto/cyber-liability",
  "/location/palo-alto/commercial-property",
  "/location/palo-alto/real-estate",
  
  "/location/santa-clara/general-liability",
  "/location/santa-clara/workers-compensation",
  "/location/santa-clara/commercial-property",
  "/location/santa-clara/real-estate",
  
  "/location/cupertino/general-liability",
  "/location/cupertino/professional-liability",
  "/location/cupertino/commercial-property",
  "/location/cupertino/real-estate",
  
  "/location/mountain-view/general-liability",
  "/location/mountain-view/professional-liability",
  "/location/mountain-view/commercial-property",
  "/location/mountain-view/real-estate",
  
  "/location/oakland/general-liability",
  "/location/oakland/workers-compensation",
  "/location/oakland/commercial-property",
  "/location/oakland/apartments",
  "/location/oakland/habitational",
  "/location/oakland/real-estate",
  
  "/location/long-beach/general-liability",
  "/location/long-beach/workers-compensation",
  "/location/long-beach/commercial-property",
  "/location/long-beach/apartments",
  "/location/long-beach/real-estate",
  
  "/location/anaheim/general-liability",
  "/location/anaheim/commercial-property",
  "/location/anaheim/apartments",
  "/location/anaheim/real-estate",
  
  "/location/irvine/general-liability",
  "/location/irvine/commercial-property",
  "/location/irvine/apartments",
  "/location/irvine/real-estate",
  
  "/location/santa-monica/general-liability",
  "/location/santa-monica/commercial-property",
  "/location/santa-monica/high-value-home",
  "/location/santa-monica/real-estate",
  
  "/location/pasadena/general-liability",
  "/location/pasadena/commercial-property",
  "/location/pasadena/apartments",
  "/location/pasadena/real-estate",
  
  "/location/burbank/general-liability",
  "/location/burbank/commercial-property",
  "/location/burbank/apartments",
  "/location/burbank/real-estate",
  
  "/location/glendale/general-liability",
  "/location/glendale/commercial-property",
  "/location/glendale/apartments",
  "/location/glendale/real-estate",
  
  "/location/torrance/general-liability",
  "/location/torrance/commercial-property",
  "/location/torrance/apartments",
  "/location/torrance/real-estate",
  
  "/location/fremont/general-liability",
  "/location/fremont/commercial-property",
  "/location/fremont/apartments",
  "/location/fremont/real-estate",
  
  "/location/santa-rosa/general-liability",
  "/location/santa-rosa/commercial-property",
  "/location/santa-rosa/wildfire-brush-area",
  "/location/santa-rosa/real-estate",
  
  "/location/napa/general-liability",
  "/location/napa/commercial-property",
  "/location/napa/wildfire-brush-area",
  "/location/napa/real-estate",
  
  "/location/newport-beach/general-liability",
  "/location/newport-beach/commercial-property",
  "/location/newport-beach/high-value-home",
  "/location/newport-beach/real-estate",
  
  "/location/huntington-beach/general-liability",
  "/location/huntington-beach/commercial-property",
  "/location/huntington-beach/apartments",
  "/location/huntington-beach/real-estate",
  
  "/location/laguna-beach/general-liability",
  "/location/laguna-beach/commercial-property",
  "/location/laguna-beach/high-value-home",
  "/location/laguna-beach/real-estate",
  
  "/location/redondo-beach/general-liability",
  "/location/redondo-beach/commercial-property",
  "/location/redondo-beach/apartments",
  "/location/redondo-beach/real-estate",
  
  "/location/manhattan-beach/general-liability",
  "/location/manhattan-beach/commercial-property",
  "/location/manhattan-beach/high-value-home",
  "/location/manhattan-beach/real-estate",
  
  "/location/dana-point/general-liability",
  "/location/dana-point/commercial-property",
  "/location/dana-point/high-value-home",
  "/location/dana-point/real-estate",
  
  "/location/el-segundo/general-liability",
  "/location/el-segundo/commercial-property",
  "/location/el-segundo/real-estate",
  
  "/location/costa-mesa/general-liability",
  "/location/costa-mesa/commercial-property",
  "/location/costa-mesa/apartments",
  "/location/costa-mesa/real-estate",
  
  "/location/san-mateo/general-liability",
  "/location/san-mateo/commercial-property",
  "/location/san-mateo/apartments",
  "/location/san-mateo/real-estate",
  
  "/location/redwood-city/general-liability",
  "/location/redwood-city/commercial-property",
  "/location/redwood-city/real-estate",
  
  "/location/woodland-hills/general-liability",
  "/location/woodland-hills/commercial-property",
  "/location/woodland-hills/wildfire-brush-area",
  "/location/woodland-hills/real-estate",
  
  // Nevada cities with new coverages
  "/location/las-vegas/general-liability",
  "/location/las-vegas/workers-compensation",
  "/location/las-vegas/commercial-auto",
  "/location/las-vegas/commercial-property",
  "/location/las-vegas/apartments",
  "/location/las-vegas/habitational",
  "/location/las-vegas/condominiums",
  "/location/las-vegas/high-value-home",
  "/location/las-vegas/self-storage",
  "/location/las-vegas/real-estate",
  "/location/las-vegas/bristol-west-personal",
  "/location/las-vegas/berkshire-hathaway-commercial",
  
  "/location/henderson/general-liability",
  "/location/henderson/workers-compensation",
  "/location/henderson/commercial-property",
  "/location/henderson/apartments",
  "/location/henderson/real-estate",
  
  "/location/reno/general-liability",
  "/location/reno/workers-compensation",
  "/location/reno/commercial-property",
  "/location/reno/apartments",
  "/location/reno/real-estate",
  
  "/location/north-las-vegas/general-liability",
  "/location/north-las-vegas/commercial-property",
  "/location/north-las-vegas/apartments",
  "/location/north-las-vegas/real-estate",
  
  "/location/sparks/general-liability",
  "/location/sparks/commercial-property",
  "/location/sparks/apartments",
  "/location/sparks/real-estate",
  
  "/location/carson-city/general-liability",
  "/location/carson-city/commercial-property",
  "/location/carson-city/real-estate",
  
  "/location/mesquite/general-liability",
  "/location/mesquite/commercial-property",
  "/location/mesquite/real-estate",
  
  "/location/boulder-city/general-liability",
  "/location/boulder-city/commercial-property",
  "/location/boulder-city/real-estate",
  
  // Ohio cities with carrier partner coverages
  "/location/columbus/general-liability",
  "/location/columbus/workers-compensation",
  "/location/columbus/commercial-auto",
  "/location/columbus/commercial-property",
  "/location/columbus/bristol-west-personal",
  "/location/columbus/berkshire-hathaway-commercial",
  
  "/location/cleveland/general-liability",
  "/location/cleveland/workers-compensation",
  "/location/cleveland/commercial-property",
  "/location/cleveland/bristol-west-personal",
  "/location/cleveland/berkshire-hathaway-commercial",
  
  "/location/cincinnati/general-liability",
  "/location/cincinnati/workers-compensation",
  "/location/cincinnati/commercial-property",
  "/location/cincinnati/bristol-west-personal",
  "/location/cincinnati/berkshire-hathaway-commercial",
  
  "/location/toledo/general-liability",
  "/location/toledo/commercial-property",
  "/location/toledo/bristol-west-personal",
  
  "/location/akron/general-liability",
  "/location/akron/commercial-property",
  "/location/akron/bristol-west-personal",
  
  "/location/dayton/general-liability",
  "/location/dayton/commercial-property",
  "/location/dayton/bristol-west-personal",
  
  // Arizona cities with carrier partner coverages
  "/location/phoenix/general-liability",
  "/location/phoenix/workers-compensation",
  "/location/phoenix/commercial-auto",
  "/location/phoenix/commercial-property",
  "/location/phoenix/berkshire-hathaway-commercial",
  
  "/location/tucson/general-liability",
  "/location/tucson/workers-compensation",
  "/location/tucson/commercial-property",
  "/location/tucson/berkshire-hathaway-commercial",
  
  "/location/mesa/general-liability",
  "/location/mesa/commercial-property",
  "/location/mesa/berkshire-hathaway-commercial",
  
  "/location/scottsdale/general-liability",
  "/location/scottsdale/commercial-property",
  "/location/scottsdale/high-value-home",
  "/location/scottsdale/berkshire-hathaway-commercial",
  
  "/location/chandler/general-liability",
  "/location/chandler/commercial-property",
  "/location/chandler/berkshire-hathaway-commercial",
  
  "/location/gilbert/general-liability",
  "/location/gilbert/commercial-property",
  "/location/gilbert/berkshire-hathaway-commercial",
  
  "/location/tempe/general-liability",
  "/location/tempe/commercial-property",
  "/location/tempe/berkshire-hathaway-commercial",
  
  // Texas cities with carrier partner coverages
  "/location/houston/general-liability",
  "/location/houston/workers-compensation",
  "/location/houston/commercial-auto",
  "/location/houston/commercial-property",
  "/location/houston/berkshire-hathaway-commercial",
  
  "/location/dallas/general-liability",
  "/location/dallas/workers-compensation",
  "/location/dallas/commercial-auto",
  "/location/dallas/commercial-property",
  "/location/dallas/berkshire-hathaway-commercial",
  
  "/location/san-antonio/general-liability",
  "/location/san-antonio/workers-compensation",
  "/location/san-antonio/commercial-property",
  "/location/san-antonio/berkshire-hathaway-commercial",
  
  "/location/austin/general-liability",
  "/location/austin/workers-compensation",
  "/location/austin/commercial-property",
  "/location/austin/berkshire-hathaway-commercial",
  
  "/location/fort-worth/general-liability",
  "/location/fort-worth/commercial-property",
  "/location/fort-worth/berkshire-hathaway-commercial",
  
  "/location/el-paso/general-liability",
  "/location/el-paso/commercial-property",
  "/location/el-paso/berkshire-hathaway-commercial",
  
  "/location/plano/general-liability",
  "/location/plano/commercial-property",
  "/location/plano/berkshire-hathaway-commercial",
  
  // Colorado cities with carrier partner coverages
  "/location/denver/general-liability",
  "/location/denver/workers-compensation",
  "/location/denver/commercial-auto",
  "/location/denver/commercial-property",
  "/location/denver/berkshire-hathaway-commercial",
  
  "/location/colorado-springs/general-liability",
  "/location/colorado-springs/workers-compensation",
  "/location/colorado-springs/commercial-property",
  "/location/colorado-springs/berkshire-hathaway-commercial",
  
  "/location/aurora/general-liability",
  "/location/aurora/commercial-property",
  "/location/aurora/berkshire-hathaway-commercial",
  
  "/location/fort-collins/general-liability",
  "/location/fort-collins/commercial-property",
  "/location/fort-collins/berkshire-hathaway-commercial",
  
  "/location/boulder/general-liability",
  "/location/boulder/commercial-property",
  "/location/boulder/high-value-home",
  "/location/boulder/berkshire-hathaway-commercial",
  
  "/location/lakewood/general-liability",
  "/location/lakewood/commercial-property",
  "/location/lakewood/berkshire-hathaway-commercial",
  
  // Oregon cities with carrier partner coverages
  "/location/portland/general-liability",
  "/location/portland/workers-compensation",
  "/location/portland/commercial-auto",
  "/location/portland/commercial-property",
  "/location/portland/berkshire-hathaway-commercial",
  
  "/location/salem/general-liability",
  "/location/salem/workers-compensation",
  "/location/salem/commercial-property",
  "/location/salem/berkshire-hathaway-commercial",
  
  "/location/eugene/general-liability",
  "/location/eugene/commercial-property",
  "/location/eugene/berkshire-hathaway-commercial",
  
  "/location/hillsboro/general-liability",
  "/location/hillsboro/commercial-property",
  "/location/hillsboro/berkshire-hathaway-commercial",
  
  "/location/beaverton/general-liability",
  "/location/beaverton/commercial-property",
  "/location/beaverton/berkshire-hathaway-commercial",
  
  "/location/bend/general-liability",
  "/location/bend/commercial-property",
  "/location/bend/high-value-home",
  "/location/bend/berkshire-hathaway-commercial",
];

interface SubmissionResult {
  success: boolean;
  statusCode?: number;
  message: string;
}

async function submitToBingWebmaster(urls: string[]): Promise<SubmissionResult> {
  if (!BING_API_KEY) {
    return { success: false, message: "Bing Webmaster API key not configured" };
  }

  if (urls.length === 0) {
    return { success: false, message: "No URLs provided" };
  }

  const fullUrls = urls.map(url => {
    if (url.startsWith("http")) {
      return url;
    }
    return `${SITE_URL}${url.startsWith("/") ? url : "/" + url}`;
  });

  const payload = {
    siteUrl: SITE_URL,
    urlList: fullUrls
  };

  try {
    const response = await fetch(
      `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${BING_API_KEY}`,
      {
        method: "POST",
        headers: { 
          "Content-Type": "application/json; charset=utf-8",
          "User-Agent": "Casurance-Bot/1.0"
        },
        body: JSON.stringify(payload)
      }
    );

    let responseBody = "";
    try {
      responseBody = await response.text();
    } catch {}

    if (response.status !== 200) {
      console.log(`[Bing Webmaster API] Status: ${response.status}, Response: ${responseBody.substring(0, 200)}`);
    }

    return {
      success: response.status === 200,
      statusCode: response.status,
      message: response.status === 200 
        ? `Successfully submitted ${fullUrls.length} URL(s) to Bing Webmaster` 
        : `Bing status ${response.status}: ${responseBody.substring(0, 100)}`
    };
  } catch (error) {
    console.error("[Bing Webmaster API] Error:", error);
    return {
      success: false,
      message: `Error submitting to Bing Webmaster: ${error instanceof Error ? error.message : "Unknown error"}`
    };
  }
}

async function submitToBingContentSubmissionAPI(urls: string[]): Promise<SubmissionResult> {
  if (!BING_API_KEY) {
    return { success: false, message: "Bing API key not configured" };
  }

  if (urls.length === 0) {
    return { success: false, message: "No URLs provided" };
  }

  const fullUrls = urls.map(url => {
    if (url.startsWith("http")) {
      return url;
    }
    return `${SITE_URL}${url.startsWith("/") ? url : "/" + url}`;
  });

  try {
    const response = await fetch(
      `https://www.bing.com/indexnow?url=${encodeURIComponent(fullUrls[0])}&key=${INDEXNOW_KEY}`,
      {
        method: "GET",
        headers: { 
          "User-Agent": "Casurance-Bot/1.0"
        }
      }
    );

    return {
      success: response.status === 200 || response.status === 202,
      statusCode: response.status,
      message: response.status === 200 || response.status === 202
        ? `Successfully notified Bing via IndexNow` 
        : `Bing IndexNow returned status ${response.status}`
    };
  } catch (error) {
    console.error("[Bing IndexNow] Error:", error);
    return {
      success: false,
      message: `Error notifying Bing: ${error instanceof Error ? error.message : "Unknown error"}`
    };
  }
}

async function submitToIndexNow(urls: string[]): Promise<SubmissionResult> {
  if (urls.length === 0) {
    return { success: false, message: "No URLs provided" };
  }

  const fullUrls = urls.map(url => {
    if (url.startsWith("http")) {
      return url;
    }
    return `${SITE_URL}${url.startsWith("/") ? url : "/" + url}`;
  });

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: fullUrls
  };

  try {
    const [indexNowResponse, yandexResponse] = await Promise.all([
      fetch("https://api.indexnow.org/IndexNow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload)
      }),
      fetch("https://yandex.com/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload)
      })
    ]);

    const results = {
      indexNow: indexNowResponse.status,
      yandex: yandexResponse.status
    };

    console.log(`[IndexNow] Results - IndexNow: ${results.indexNow}, Yandex: ${results.yandex}`);

    const success = results.indexNow === 200 || results.indexNow === 202 ||
                    results.yandex === 200 || results.yandex === 202;

    return {
      success,
      statusCode: results.indexNow,
      message: success 
        ? `Successfully submitted ${fullUrls.length} URL(s) to IndexNow/Yandex` 
        : `IndexNow submission returned status ${results.indexNow}`
    };
  } catch (error) {
    console.error("[IndexNow] Error submitting URLs:", error);
    return {
      success: false,
      message: `Error submitting to IndexNow: ${error instanceof Error ? error.message : "Unknown error"}`
    };
  }
}

export async function submitAllSitePages(): Promise<void> {
  console.log("[URL Submission] Starting automatic submission of all site pages...");
  console.log(`[URL Submission] IndexNow API key: ${INDEXNOW_KEY}`);
  console.log(`[URL Submission] Total URLs to submit: ${ALL_SITE_URLS.length}`);
  
  const indexNowBatchSize = 100;
  
  console.log("[URL Submission] Submitting to IndexNow (Bing, Yandex, and other participating search engines)...");
  let indexNowSuccessCount = 0;
  
  for (let i = 0; i < ALL_SITE_URLS.length; i += indexNowBatchSize) {
    const batch = ALL_SITE_URLS.slice(i, i + indexNowBatchSize);
    const batchNum = Math.floor(i / indexNowBatchSize) + 1;
    
    const result = await submitToIndexNow(batch);
    if (result.success) {
      indexNowSuccessCount += batch.length;
    }
    console.log(`[IndexNow] Batch ${batchNum}: ${result.message}`);
    
    if (i + indexNowBatchSize < ALL_SITE_URLS.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log("[URL Submission] Submitting directly to Bing IndexNow endpoint...");
  const bingIndexNowResult = await submitBatchToBingIndexNow(ALL_SITE_URLS.slice(0, 100));
  console.log(`[Bing IndexNow] ${bingIndexNowResult.message}`);
  
  if (BING_API_KEY) {
    console.log("[URL Submission] Submitting priority URLs to Bing Webmaster API...");
    const priorityUrls = ALL_SITE_URLS.slice(0, 10);
    const bingResult = await submitToBingWebmaster(priorityUrls);
    
    if (bingResult.success) {
      console.log(`[Bing Webmaster] Successfully submitted ${priorityUrls.length} priority URLs`);
    } else if (bingResult.message.includes("Quota")) {
      const quotaMatch = bingResult.message.match(/Quota remaining.*?(\d+)/);
      const remaining = quotaMatch ? quotaMatch[1] : "limited";
      console.log(`[Bing Webmaster] Daily quota reached (${remaining} remaining). URLs will be submitted via IndexNow instead.`);
    } else if (bingResult.message.includes("InvalidApiKey")) {
      console.log(`[Bing Webmaster] API key not valid for this site. Please verify site at bing.com/webmasters and generate a new key.`);
    } else {
      console.log(`[Bing Webmaster] ${bingResult.message}`);
    }
  }
  
  console.log(`[URL Submission] Completed! ${indexNowSuccessCount} URLs submitted via IndexNow to Bing, Yandex, and other search engines`);
}

async function submitBatchToBingIndexNow(urls: string[]): Promise<SubmissionResult> {
  const fullUrls = urls.map(url => {
    if (url.startsWith("http")) {
      return url;
    }
    return `${SITE_URL}${url.startsWith("/") ? url : "/" + url}`;
  });

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: fullUrls
  };

  try {
    const response = await fetch("https://www.bing.com/indexnow", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "Casurance-Bot/1.0"
      },
      body: JSON.stringify(payload)
    });

    return {
      success: response.status === 200 || response.status === 202,
      statusCode: response.status,
      message: response.status === 200 || response.status === 202
        ? `Successfully submitted ${fullUrls.length} URLs directly to Bing IndexNow` 
        : `Bing IndexNow returned status ${response.status} (key verification required in production)`
    };
  } catch (error) {
    console.error("[Bing IndexNow] Error:", error);
    return {
      success: false,
      message: `Error submitting to Bing IndexNow: ${error instanceof Error ? error.message : "Unknown error"}`
    };
  }
}

export async function pingGoogleSitemap(): Promise<{ success: boolean; message: string }> {
  const sitemapUrl = encodeURIComponent(`${SITE_URL}/sitemap.xml`);
  const googlePingUrl = `https://www.google.com/ping?sitemap=${sitemapUrl}`;
  
  try {
    console.log("[Google] Pinging sitemap...");
    const response = await fetch(googlePingUrl, {
      method: "GET",
      headers: { "User-Agent": "Casurance-Bot/1.0" }
    });
    
    if (response.ok) {
      console.log("[Google] Sitemap ping successful");
      return { success: true, message: "Successfully pinged Google with sitemap" };
    } else {
      console.log(`[Google] Sitemap ping returned status ${response.status}`);
      return { success: false, message: `Google ping returned status ${response.status}` };
    }
  } catch (error) {
    console.error("[Google] Error pinging sitemap:", error);
    return { 
      success: false, 
      message: `Error pinging Google: ${error instanceof Error ? error.message : "Unknown error"}` 
    };
  }
}

export function initializeIndexNow(): void {
  setTimeout(() => {
    submitAllSitePages().catch(err => {
      console.error("[URL Submission] Failed to submit site pages:", err);
    });
    
    // Also ping Google
    pingGoogleSitemap().catch(err => {
      console.error("[Google] Failed to ping sitemap:", err);
    });
  }, 10000);
}
